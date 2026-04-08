import React, { useEffect, useState, useRef } from 'react';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../../assets/ole-logo.png';
import LogoAvatar from '../../assets/avatar1.png';
import Messeger from '../../assets/messege.png';
import ChampGif from '../../assets/playy.gif';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  IComunicado,
  IComunicadocomercial,
  iDadosUsuario,
  iGrupoUsuario,
  IPermissoesRH,
} from '../../@types';
import Img1 from '../../assets/COMUNICADO.jpeg';
import Img2 from '../../assets/ANIVERSARIANTES.jpeg';
import Paginacao from '../../components/Paginacao/index';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Nopost from '../../assets/nenhumpost.png';
import { versaoFront } from '../../data/indexedDB';

interface Comunicado {
  titulo: string;
  texto: string;
}

interface ComunicadoComImagem {
  id: number;
  imagem: string;
  imagemBase64: string;
  imagemURL: string;
  texto: string;
  titulo: string;
}

interface IComunicadoAgrupadoComercial {
  titulo: string;
  texto: string;
  criadoEm: string;
  registros: IComunicadocomercial[];
}

export default function ComunicacaoComercial() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showMensage2, setShowMensage2] = useState(false);
  let [editarMens, seteditarMens] = useState(false);
  let [comunicadoLista, setcomunicadosLista] = useState<IComunicadocomercial[]>(
    []
  );
  let [titulo, settitulo] = useState('');
  let [texto, settexto] = useState('');
  const [tabNav, setTabNav] = useState('NovoPost');
  const [showComunicado, setShowComunicado] = useState(false);
  const [comunicadoVisualizar, setComunicadoVisualizar] =
    useState<IComunicadoAgrupadoComercial | null>(null);
  const [showModalGrupos, setShowModalGrupos] = useState(false);
  const [selectedGrupoIdsEdicao, setSelectedGrupoIdsEdicao] = useState<
    number[]
  >([]);
  const handleCloseMensage = () => setShowMensage(false);
  const handleCloseComunicado = () => {
    setShowComunicado(false);
    setComunicadoVisualizar(null);
    setSelectedGrupoIdsEdicao([]);
  };

  function handleCloseMensage2() {
    setShowMensage2(false);
  }

  const [alertErroMensage, setAlertErroMensage] = useState(false);

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const canLancarAtualizacao =
    usuario?.id === 1 || usuario?.username?.toLowerCase() === 'admin';

  const [pagina, setPagina] = useState(1);
  const [paginagr, setPaginagr] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [qtdePaginagr, setQtdePaginagr] = useState(10);
  let [totalPaginas, setTotalPaginas] = useState(0);
  let [totalPaginasGr, setTotalPaginasGr] = useState(0);
  let [comunicadoId, setcomunicadoId] = useState('');
  let [grupoId, setgrupoId] = useState(0);

  function formatDate(dateTimeString: string): string {
    const dataAtual = new Date(dateTimeString);
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    GetPermiss();
    logado();
    GetgrupoUsuarioId();
  }, []);
  function logado() {
    if (!usuario.token) {
      history('/');
    }
  }

  let [comunicados, setComunicados] = useState<ComunicadoComImagem[]>([]);
  const [grupos, setgrupos] = useState<iGrupoUsuario[]>([]);
  const [permissoes, setpermissoes] = useState<IPermissoesRH[]>([]);
  const [grupo, setGrupo] = useState<iGrupoUsuario[]>([]);
  const [selectedGrupoIds, setSelectedGrupoIds] = useState<number[]>([]);
  useEffect(() => {
    GetListaComunicado();
    Getgrupo();
  }, [pagina]);

  useEffect(() => {
    GetgrupoUsuarios();
  }, [paginagr]);

  async function getComunicados() {
    setLoading(false);
    setComunicados([]);
    comunicados = [];
  }
  async function GetListaComunicado() {
    await api

      .get(
        `/api/ComunicadoComercial?pagina=${pagina}&totalpagina=${qtdePagina}`
      )
      .then((response) => {
        setLoading(false);
        const listaBruta = response?.data?.data ?? [];
        const updateTitle = 'Opa... tem nova atualização do PGA';
        const listaFiltrada = listaBruta.filter(
          (item: IComunicadocomercial) =>
            !item?.titulo?.includes(updateTitle)
        );
        setcomunicadosLista(listaFiltrada);
        comunicadoLista = listaFiltrada;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setLoading(false);
      });
  }

  async function CreateComunicado() {
    if (titulo.trim() == '') {
      setAlertErroMensage(true);
      setMsgErro('É obrigatório inserir um título.');
      return;
    }

    setLoading(true);
    await api
      .post('/api/Comunicado', {
        titulo: titulo,
        texto: texto,
      })

      .then((response) => {
        setcomunicadoId(response.data.data);
        comunicadoId = response.data.data;
        console.log('id', comunicadoId);
        salvarImagem(response.data.data);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error.response);
        setShowMensage(true);
        setMsgErro('Erro ao criar post.');
        return;
      });
  }
  const salvarImagem = async (idComunicado: number) => {
    const formData = new FormData();
    console.log(formData.get('image'));
    console.log(formData.get('image'));

    try {
      await api.post(`/api/Comunicado/${idComunicado}/Imagem`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Imagem salva com sucesso!');
      setLoading(false);
    } catch (error) {
      console.error('Erro ao salvar a imagem:', error);
      setLoading(false);
    }
  };

  async function GetgrupoUsuarioId() {
    await api

      .get(`/api/GrupoUsuario/${usuario.grupoId}`)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function Getgrupo() {
    await api
      .get(`/api/GrupoUsuario?pagina=1&totalpagina=99`)
      .then((response) => {
        console.log('grupo geral', response.data.data);
        setGrupo(response.data.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  const grupoMap: { [id: number]: string } = {};
  grupos.forEach((grupo) => {
    grupoMap[grupo.id] = grupo.nome;
  });

  async function GetgrupoUsuarios() {
    await api
      .get(`/api/GrupoUsuario?pagina=${paginagr}&totalpagina=${qtdePaginagr}`)
      .then((response) => {
        console.log('grupo de user', response.data);
        setgrupos(response.data.data);
        setTotalPaginasGr(Math.ceil(response.data.total / qtdePaginagr));
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  const [file, setFile] = useState<File | null>(null);

  //=================================================================
  const [comunicado, setComunicado] = useState<Comunicado>({
    titulo: '',
    texto: '',
  });
  const [imagem, setImagem] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setComunicado({ ...comunicado, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImagem(event.target.files[0]);
  };
  const handleSubmit = async () => {
    if (titulo.trim() == '') {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório inserir um título.');
      return;
    }
    if (texto.trim() == '') {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório inserir um texto.');
      return;
    }
    if (selectedGrupoIds.length === 0) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório selecionar ao menos um grupo.');
      return;
    }
    const dataAtual = new Date();
    try {
      await Promise.all(
        selectedGrupoIds.map((gid) =>
          api.post('/api/ComunicadoComercial', {
            titulo: titulo,
            texto: texto,
            grupoId: gid,
            criadoEm: dataAtual,
          })
        )
      );
      settitulo('');
      titulo = '';
      settexto('');
      texto = '';
      setgrupoId(0);
      grupoId = 0;
      setSelectedGrupoIds([]);
      setLoading(false);
      getComunicados();
      GetListaComunicado();
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Comunicados criados com sucesso.');
    } catch (error) {
      setLoading(false);
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Erro ao tentar criar comunicados.');
    }
  };

  async function LancarAtualizacao() {
    const titulo = 'Opa... tem nova atualização do PGA por aqui!';
    const texto = `Olá, temos uma nova atualização do PGA pra você, entre m contato como comercial e saiba das novidades desta versão ${versaoFront}, Para atualizar clique no aceite`;
    setLoading(true);
    try {
      let gruposAlvo = grupo;
      if (!gruposAlvo || gruposAlvo.length === 0) {
        const resp = await api.get(`/api/GrupoUsuario?pagina=1&totalpagina=999`);
        gruposAlvo = resp?.data?.data ?? [];
      }

      if (!gruposAlvo || gruposAlvo.length === 0) {
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro('Nenhum grupo de usuário encontrado para lançar atualização.');
        return;
      }

      const dataAtual = new Date();
      await Promise.all(
        gruposAlvo.map((g) =>
          api.post('/api/ComunicadoComercial', {
            titulo,
            texto,
            grupoId: g.id,
            criadoEm: dataAtual,
          })
        )
      );

      await GetListaComunicado();
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Atualização lançada para todos os grupos de usuários.');
    } catch (error) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Erro ao lançar atualização.');
    } finally {
      setLoading(false);
    }
  }

  async function DeletePost(id: any) {
    setLoading(true);
    await api
      .delete(`/api/ComunicadoComercial/${id}`)
      .then((response) => {
        const index = comunicados.findIndex(
          (comunicado) => comunicado.id === id
        );
        const newComunicados = [...comunicados];
        newComunicados.splice(index, 1);
        setComunicados(newComunicados);
        console.log('excluido com sucesso');
        setLoading(false);
        getComunicados();
        GetListaComunicado();
        setShowMensage2(true);
        setAlertErroMensage(true);
        setMsgErro('Post excluido com sucesso.');
        console.log('comun', comunicados);
      })
      .catch((error) => {
        setLoading(false);
        console.log('ocorreu um erro');
      });
  }

  async function DeletePostAgrupado(agrupado: IComunicadoAgrupadoComercial) {
    setLoading(true);
    try {
      const ids = (agrupado?.registros ?? []).map((r) => r.id);
      if (ids.length === 0) {
        setLoading(false);
        return;
      }
      await Promise.all(
        ids.map((id) => api.delete(`/api/ComunicadoComercial/${id}`))
      );
      setLoading(false);
      getComunicados();
      GetListaComunicado();
      setShowMensage2(true);
      setAlertErroMensage(true);
      setMsgErro('Post excluido com sucesso.');
    } catch (error) {
      setLoading(false);
      setShowMensage2(true);
      setAlertErroMensage(true);
      setMsgErro('Erro ao tentar excluir comunicado.');
    }
  }
  const [value, setValue] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  async function DeletePerm(id: any) {
    await api
      .delete(`/api/PermissaoRH/${id}`)
      .then((response) => {
        GetPermiss();
        setShowMensage2(true);
        setAlertErroMensage(true);
        setMsgErro('Permissão removida!');
      })
      .catch((error) => {
        console.log('ocorreu um erro');
      });
  }

  async function PostPermi(grupoId: any) {
    await api
      .post(`/api/PermissaoRH`, {
        id: grupoId,
        grupoId: grupoId,
      })
      .then((response) => {
        setShowMensage2(true);
        setAlertErroMensage(true);
        setMsgErro('Permissões concedidas com sucesso!');
        GetPermiss();
      })
      .catch((error) => {
        setShowMensage2(true);
        setAlertErroMensage(true);
        setMsgErro(error.response.data);
        console.log('ocorreu um erro');
      });
  }

  async function GetPermiss() {
    await api
      .get(`/api/PermissaoRH`)
      .then((response) => {
        console.log('permissoes', response.data);
        setpermissoes(response.data);
      })
      .catch((error) => {
        console.log('ocorreu um erro');
      });
  }

  function toggleGrupoSelecionado(id: number) {
    setSelectedGrupoIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function toggleGrupoEdicao(id: number) {
    setSelectedGrupoIdsEdicao((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const comunicadosAgrupadosMap: {
    [key: string]: IComunicadoAgrupadoComercial;
  } = {};

  comunicadoLista.forEach((item) => {
    const chave = `${item.titulo}|||${item.texto}`;
    if (!comunicadosAgrupadosMap[chave]) {
      comunicadosAgrupadosMap[chave] = {
        titulo: item.titulo,
        texto: item.texto,
        criadoEm: item.criadoEm,
        registros: [],
      };
    }
    comunicadosAgrupadosMap[chave].registros.push(item);
  });

  const comunicadosAgrupados = Object.values(comunicadosAgrupadosMap);

  function abrirModalVisualizar(agrupado: IComunicadoAgrupadoComercial) {
    setComunicadoVisualizar(agrupado);
    const gruposSelecionados = agrupado.registros.map((r) => r.grupoId);
    setSelectedGrupoIdsEdicao(gruposSelecionados);
    setShowComunicado(true);
  }

  async function handleSalvarGrupos() {
    if (!comunicadoVisualizar) {
      setShowModalGrupos(false);
      return;
    }

    const registros = comunicadoVisualizar.registros;
    const gruposOriginais = registros.map((r) => r.grupoId);

    const idsPorGrupo: { [key: number]: number[] } = {};
    registros.forEach((r) => {
      if (!idsPorGrupo[r.grupoId]) {
        idsPorGrupo[r.grupoId] = [];
      }
      idsPorGrupo[r.grupoId].push(r.id);
    });

    const paraAdicionar = selectedGrupoIdsEdicao.filter(
      (id) => !gruposOriginais.includes(id)
    );
    const paraRemover = gruposOriginais.filter(
      (id) => !selectedGrupoIdsEdicao.includes(id)
    );

    if (paraAdicionar.length === 0 && paraRemover.length === 0) {
      setShowModalGrupos(false);
      return;
    }

    try {
      setLoading(true);
      const dataAtual = new Date();
      const requisicoes: Promise<any>[] = [];

      paraAdicionar.forEach((grupoIdAdicionar) => {
        requisicoes.push(
          api.post('/api/ComunicadoComercial', {
            titulo: comunicadoVisualizar.titulo,
            texto: comunicadoVisualizar.texto,
            grupoId: grupoIdAdicionar,
            criadoEm: dataAtual,
          })
        );
      });

      paraRemover.forEach((grupoIdRemover) => {
        const ids = idsPorGrupo[grupoIdRemover] || [];
        ids.forEach((idRegistro) => {
          requisicoes.push(
            api.delete(`/api/ComunicadoComercial/${idRegistro}`)
          );
        });
      });

      if (requisicoes.length > 0) {
        await Promise.all(requisicoes);
      }

      await getComunicados();
      await GetListaComunicado();

      setMsgErro('Grupos atualizados com sucesso.');
      setAlertErroMensage(true);
      setShowMensage(true);
      setShowModalGrupos(false);
      setShowComunicado(false);
      setComunicadoVisualizar(null);
      setSelectedGrupoIdsEdicao([]);
    } catch (error) {
      console.log('Ocorreu um erro ao atualizar grupos');
      setMsgErro('Erro ao atualizar grupos do comunicado.');
      setAlertErroMensage(true);
      setShowMensage(true);
    } finally {
      setLoading(false);
    }
  }

  //==========================================================//
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center total-loading">
          <div className="div-loading">
            <div className="spinner-border" role="status"></div>
            <h2 className="sr-only">Carregando...</h2>
          </div>
        </div>
      ) : (
        <>
          <div className="content-global">
            <div className="conteudo-cotainner">
              <div className="">
                <SideNavBar />
              </div>
              <NavbarDashHeader />
              <div className="titulo-page">
                <h1>Comunicação Interna - Comercial</h1>
              </div>
              <div className="contain ">
                <div className="novoPost">
                  <div className="conteudo-cadastro-parceiro">
                    <div className="coluna-dupla">
                      <div className="blocoaddPost3">
                        <h1>CRIAR NOVO COMUNICADO</h1>
                        {canLancarAtualizacao ? (
                          <div
                            style={{
                              marginTop: 20,
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <button
                              style={{
                                minWidth: 220,
                                backgroundColor: '#000',
                                color: '#fff',
                                borderColor: '#000',
                              }}
                              className="btn"
                              type="button"
                              onClick={LancarAtualizacao}
                            >
                              Lançar Atualização
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                        <p className="title-input">
                          Título: <span style={{ color: 'red' }}>*</span>
                        </p>
                        <input
                          type="text"
                          className="form-control inputparceiro"
                          value={titulo}
                          onChange={(e) => {
                            settitulo(e.target.value);
                            titulo = e.target.value;
                          }}
                        />
                        <p className="title-input">
                          Texto: <span style={{ color: 'red' }}>*</span>
                        </p>
                        <textarea
                          name="texto"
                          value={texto}
                          className="form-control inputparceirotext"
                          style={{ minHeight: 100, textAlign: 'justify' }}
                          onChange={(e) => {
                            settexto(e.target.value);
                            texto = e.target.value;
                          }}
                        />
                        <p className="title-input">
                          Grupo: <span style={{ color: 'red' }}>*</span>
                        </p>
                        <div className="table-responsive table-scroll  tabelaPost tabelagrupopost">
                          <div className=" table-wrap">
                            <Table
                              responsive
                              className="table-global table  main-table"
                            >
                              <thead>
                                <tr className="tituloTab">
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="IdPsot"
                                  >
                                    Id
                                  </th>
                                  <th
                                    style={{ textAlign: 'left' }}
                                    className="th2 nome-grupo textTi"
                                  >
                                    Nome
                                  </th>
                                  <th
                                        style={{ textAlign: 'center' }}
                                        className="th4 fixed-table"
                                  >
                                        Selecionar
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {grupos.length > 0 ? (
                                  <>
                                    {grupos.map((comunicado, index) => (
                                          <tr key={index}>
                                        <td
                                          style={{ textAlign: 'center' }}
                                          className="IdPsot"
                                        >
                                          {comunicado.id}
                                        </td>
                                        <td
                                          style={{ textAlign: 'left' }}
                                          className="nome-grupo textTi"
                                        >
                                          {comunicado.nome}
                                        </td>
                                        <td
                                          style={{ textAlign: 'center' }}
                                          className="fixed-table td-fixo"
                                        >
                                              <input
                                                type="checkbox"
                                                checked={selectedGrupoIds.includes(comunicado.id)}
                                                onChange={() => toggleGrupoSelecionado(comunicado.id)}
                                              />
                                        </td>
                                      </tr>
                                    ))}
                                  </>
                                ) : (
                                  <div
                                    style={{ margin: 'auto' }}
                                    className="alert alert-warning alertaComu"
                                    role="alert"
                                  >
                                    Nenhum grupo encontrado.
                                  </div>
                                )}
                              </tbody>
                            </Table>
                            <Paginacao
                              total={totalPaginasGr}
                              limit={qtdePaginagr}
                              paginaAtual={paginagr}
                              setPagina={setPaginagr}
                            />
                          </div>
                        </div>
                        <button
                          style={{ marginTop: 20 }}
                          className="btn btn-primary"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Salvar Post
                        </button>
                        {editarMens ? (
                          <>
                            <button
                              style={{ marginTop: 20, marginLeft: 20 }}
                              className="btn btn-danger"
                              type="button"
                              onClick={() => {
                                settitulo('');
                                titulo = '';
                                settexto('');
                                texto = '';
                                setgrupoId(0);
                                grupoId = 0;
                                seteditarMens(false);
                                editarMens = false;
                              }}
                            >
                              voltar
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="blocoaddPost5">
                        <h1>LISTA DE COMUNICADOS</h1>
                        <div className="table-responsive table-scroll tabela-responsiva tabelaPost">
                          <div className=" table-wrap">
                            <Table
                              responsive
                              className="table-global table  main-table"
                            >
                              <thead>
                                <tr className="tituloTab">
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="IdPsot"
                                  >
                                    Id
                                  </th>
                                  <th
                                    style={{ textAlign: 'left' }}
                                    className="th2 nome-grupo textTi"
                                  >
                                    Grupo
                                  </th>
                                  <th
                                    style={{ textAlign: 'left' }}
                                    className="th2 nome-grupo textTi"
                                  >
                                    Data de criação
                                  </th>
                                  <th
                                    style={{ textAlign: 'left' }}
                                    className="th2 nome-grupo"
                                  >
                                    Título
                                  </th>
                                  <th
                                    style={{ color: 'transparent' }}
                                    className="th2 nome-grupo"
                                  >
                                    .......
                                  </th>
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="th4 fixed-table"
                                  >
                                    Ações
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {comunicadosAgrupados.length > 0 ? (
                                  <>
                                    {comunicadosAgrupados.map(
                                      (agrupado, index) => {
                                        const registroPrincipal =
                                          agrupado.registros[0];
                                        const nomesGruposUnicos =
                                          Array.from(
                                            new Set(
                                              agrupado.registros.map(
                                                (r) =>
                                                  grupoMap[r.grupoId] ||
                                                  r.grupoId
                                              )
                                            )
                                          ).join(', ');

                                        return (
                                          <tr key={index}>
                                            <td
                                              style={{ textAlign: 'center' }}
                                              className="IdPsot"
                                              onClick={() => {
                                                settitulo(agrupado.titulo);
                                                titulo = agrupado.titulo;
                                                settexto(agrupado.texto);
                                                texto = agrupado.texto;
                                                setgrupoId(
                                                  registroPrincipal.grupoId
                                                );
                                                grupoId =
                                                  registroPrincipal.grupoId;
                                                seteditarMens(true);
                                                editarMens = true;
                                              }}
                                            >
                                              {registroPrincipal.id}
                                            </td>
                                            <td
                                              style={{ textAlign: 'left' }}
                                              className="nome-grupo textTi"
                                              onClick={() => {
                                                settitulo(agrupado.titulo);
                                                titulo = agrupado.titulo;
                                                settexto(agrupado.texto);
                                                texto = agrupado.texto;
                                                setgrupoId(
                                                  registroPrincipal.grupoId
                                                );
                                                grupoId =
                                                  registroPrincipal.grupoId;
                                                seteditarMens(true);
                                                editarMens = true;
                                              }}
                                            >
                                              {nomesGruposUnicos}
                                            </td>
                                            <td
                                              style={{ textAlign: 'center' }}
                                              className="nome-grupo textTi"
                                              onClick={() => {
                                                settitulo(agrupado.titulo);
                                                titulo = agrupado.titulo;
                                                settexto(agrupado.texto);
                                                texto = agrupado.texto;
                                                setgrupoId(
                                                  registroPrincipal.grupoId
                                                );
                                                grupoId =
                                                  registroPrincipal.grupoId;
                                                seteditarMens(true);
                                                editarMens = true;
                                              }}
                                            >
                                              {formatDate(agrupado.criadoEm)}
                                            </td>
                                            <td
                                              style={{ textAlign: 'left' }}
                                              className="th2 nome-grupo"
                                            >
                                              {agrupado.titulo}
                                            </td>

                                            <td
                                              style={{ textAlign: 'center' }}
                                              className="fixed-table td-fixo"
                                            >
                                              <OverlayTrigger
                                                placement={'left'}
                                                delay={{
                                                  show: 100,
                                                  hide: 250,
                                                }}
                                                overlay={
                                                  <Tooltip>Visualizar</Tooltip>
                                                }
                                              >
                                                <button
                                                  type="button"
                                                  style={{ marginRight: 15 }}
                                                  onClick={() =>
                                                    abrirModalVisualizar(
                                                      agrupado
                                                    )
                                                  }
                                                  className="btn btn-table  btn-edit"
                                                >
                                                  Visualizar
                                                </button>
                                              </OverlayTrigger>
                                              <OverlayTrigger
                                                placement={'right'}
                                                delay={{
                                                  show: 100,
                                                  hide: 250,
                                                }}
                                                overlay={
                                                  <Tooltip>Excluir</Tooltip>
                                                }
                                              >
                                                <button
                                                  onClick={() => {
                                                    DeletePostAgrupado(agrupado);
                                                  }}
                                                  className="btn btn-table btn-delete"
                                                >
                                                  <RiDeleteBin5Line />
                                                </button>
                                              </OverlayTrigger>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </>
                                ) : (
                                  <div
                                    style={{ margin: 'auto' }}
                                    className="alert alert-warning alertaComu"
                                    role="alert"
                                  >
                                    Nenhum comunicado encontrado.
                                  </div>
                                )}
                              </tbody>
                            </Table>
                            <Paginacao
                              total={totalPaginas}
                              limit={qtdePagina}
                              paginaAtual={pagina}
                              setPagina={setPagina}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ================Modal Cofirmação ============================================== */}

            <Modal
              className="modal-confirm"
              show={showMensage}
              onHide={handleCloseMensage}
            >
              <Modal.Header closeButton>
                <h1>Status da solicitação</h1>
              </Modal.Header>
              <Modal.Body>
                {alertErroMensage && (
                  <div className="mt-3 mb-0">
                    <Alert msg={msgErro} setAlertErro={setAlertErroMensage} />
                  </div>
                )}
                <button
                  style={{ width: 130 }}
                  className="btn btn-primary"
                  onClick={handleCloseMensage}
                >
                  Ok
                </button>
              </Modal.Body>
            </Modal>
            {/* //============= modal confirmação 2 ============================ */}

            <Modal
              className="modal-confirm"
              show={showMensage2}
              onHide={handleCloseMensage2}
            >
              <Modal.Header closeButton>
                <h1>Status da solicitação</h1>
              </Modal.Header>
              <Modal.Body>
                {alertErroMensage && (
                  <div className="mt-3 mb-0">
                    <Alert msg={msgErro} setAlertErro={setAlertErroMensage} />
                  </div>
                )}
                <button
                  style={{ width: 130 }}
                  className="btn btn-primary"
                  onClick={handleCloseMensage2}
                >
                  Ok
                </button>
              </Modal.Body>
            </Modal>

            {/* ==================== Modal Visualizar Comunicado ================================= */}
            <Modal
              className="modal-confirm"
              show={showComunicado}
              onHide={handleCloseComunicado}
            >
              <Modal.Header closeButton>
                <h1>Visualizar comunicado</h1>
              </Modal.Header>
              <Modal.Body>
                {comunicadoVisualizar && (
                  <>
                    <h2 style={{ marginBottom: 15 }}>
                      {comunicadoVisualizar.titulo}
                    </h2>
                    <textarea
                      className="form-control inputparceirotext"
                      style={{
                        minHeight: 120,
                        textAlign: 'justify',
                        marginBottom: 15,
                      }}
                      value={comunicadoVisualizar.texto}
                      readOnly
                    />
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ flexWrap: 'wrap', gap: 8 }}
                    >
                      <div>
                        {Array.from(
                          new Set(
                            comunicadoVisualizar.registros.map(
                              (r) => grupoMap[r.grupoId]
                            )
                          )
                        )
                          .filter(Boolean)
                          .map((nomeGrupo, idx) => (
                            <span key={idx} className="tag-grupo">
                              {nomeGrupo}
                            </span>
                          ))}
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModalGrupos(true)}
                      >
                        Adicionar novo grupo
                      </button>
                    </div>
                  </>
                )}
              </Modal.Body>
            </Modal>

            {/* ==================== Modal Grupos do Comunicado ================================= */}
            <Modal
              className="modal-confirm"
              show={showModalGrupos}
              onHide={() => setShowModalGrupos(false)}
            >
              <Modal.Header closeButton>
                <h1>Grupos do comunicado</h1>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  {selectedGrupoIdsEdicao.length} grupo(s) selecionado(s) em todas as páginas
                </div>
              </Modal.Header>
              <Modal.Body>
                <div style={{ fontSize: '13px', color: '#28a745', marginBottom: '10px', padding: '8px', backgroundColor: '#f8fff9', borderRadius: '4px' }}>
                  <strong>💡 Dica:</strong> As seleções são mantidas ao navegar entre páginas. Use a paginação para selecionar grupos em diferentes páginas.
                </div>
                <div className="table-responsive table-scroll tabela-responsiva tabelaPost">
                  <div className=" table-wrap">
                    <Table
                      responsive
                      className="table-global table  main-table"
                    >
                      <thead>
                        <tr className="tituloTab">
                          <th
                            style={{ textAlign: 'center' }}
                            className="IdPsot"
                          >
                            Id
                          </th>
                          <th
                            style={{ textAlign: 'left' }}
                            className="th2 nome-grupo textTi"
                          >
                            Grupo
                          </th>
                          <th
                            style={{ textAlign: 'center' }}
                            className="th4 fixed-table"
                          >
                            Selecionar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {grupos.length > 0 ? (
                          <>
                            {grupos.map((grupoLinha, index) => (
                              <tr key={index}>
                                <td
                                  style={{ textAlign: 'center' }}
                                  className="IdPsot"
                                >
                                  {grupoLinha.id}
                                </td>
                                <td
                                  style={{ textAlign: 'left' }}
                                  className="nome-grupo textTi"
                                >
                                  {grupoLinha.nome}
                                </td>
                                <td
                                  style={{ textAlign: 'center' }}
                                  className="fixed-table td-fixo"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedGrupoIdsEdicao.includes(
                                      grupoLinha.id
                                    )}
                                    onChange={() =>
                                      toggleGrupoEdicao(grupoLinha.id)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={3} style={{ textAlign: 'center' }}>
                              Nenhum grupo encontrado.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <Paginacao
                      total={totalPaginasGr}
                      limit={1}
                      paginaAtual={paginagr}
                      setPagina={setPaginagr}
                    />
                  </div>
                </div>
                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: 15 }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSalvarGrupos}
                  >
                    Salvar
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
