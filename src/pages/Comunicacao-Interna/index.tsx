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
import { IoMdAdd } from 'react-icons/io';

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

export default function ComunicacaoInterna() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showMensage2, setShowMensage2] = useState(false);
  let [comunicadoLista, setcomunicadosLista] = useState<IComunicado[]>([]);
  let [titulo, settitulo] = useState('');
  let [texto, settexto] = useState('');
  const [tabNav, setTabNav] = useState('NovoPost');
  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const [pagina, setPagina] = useState(1);
  const [paginagr, setPaginagr] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [qtdePaginagr, setQtdePaginagr] = useState(10);
  let [totalPaginas, setTotalPaginas] = useState(0);
  let [totalPaginasGr, setTotalPaginasGr] = useState(0);
  let [comunicadoId, setcomunicadoId] = useState('');

  function handleCloseMensage2() {
    setShowMensage2(false);
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

  useEffect(() => {
    getComunicados();
    GetListaComunicado();
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
    setLoading(false);
    setcomunicadosLista([]);
    comunicadoLista = [];
    setTotalPaginas(0);
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!comunicado.titulo) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório inserir um título.');
      return;
    }
    if (!comunicado.texto) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório inserir um texto.');
      return;
    }
    if (imagem == null) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório inserir uma imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', comunicado.titulo);
    formData.append('texto', comunicado.texto);
    formData.append('imagem', imagem);

    try {
      const response = await api.post(
        '/api/comunicado/comunicado-com-imagem',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      getComunicados();
      GetListaComunicado();
      settitulo('');
      titulo = '';
      settexto('');
      texto = '';
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Post criado com sucesso.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Ocorreu um erro ao criar um novo post.');
    }

    setComunicado({ titulo: '', texto: '' });
    setImagem(null);
  };

  async function DeletePost(id: any) {
    setLoading(true);
    await api
      .delete(`/api/Comunicado/${id}`)
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
                <h1>Comunicação Interna</h1>
              </div>
              <div className="contain ">
                <div className="novoPost">
                  <Tabs
                    defaultActiveKey={tabNav}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab
                      eventKey="NovoPost"
                      title="Posts"
                      style={{ minHeight: 400 }}
                    >
                      <div className="conteudo-cadastro-parceiro">
                        <div className="coluna-dupla">
                          <form
                            onSubmit={handleSubmit}
                            className="postGramBloco"
                          >
                            <div className="blocoaddPost3">
                              <h1>CRIAR NOVO POST</h1>
                              <p className="title-input">
                                Título: <span style={{ color: 'red' }}>*</span>
                              </p>
                              <input
                                type="text"
                                className="form-control inputparceiro"
                                defaultValue={comunicado.titulo}
                                onChange={(e) =>
                                  setComunicado({
                                    ...comunicado,
                                    titulo: e.target.value,
                                  })
                                }
                              />
                              <p className="title-input">
                                Texto: <span style={{ color: 'red' }}>*</span>{' '}
                              </p>
                              <textarea
                                name="texto"
                                className="form-control inputparceirotext"
                                style={{ minHeight: 100 }}
                                defaultValue={comunicado.texto}
                                onChange={(
                                  event: React.ChangeEvent<HTMLTextAreaElement>
                                ) =>
                                  setComunicado({
                                    ...comunicado,
                                    texto: event.target.value,
                                  })
                                }
                              />
                              <button
                                style={{ marginTop: 20 }}
                                className="btn btn-primary"
                                type="submit"
                              >
                                Salvar Post
                              </button>
                            </div>
                            <div className="blocoaddPost2">
                              <div className="image-uploader">
                                {imagem ? (
                                  <img
                                    src={URL.createObjectURL(imagem)}
                                    alt="uploaded"
                                  />
                                ) : (
                                  <></>
                                )}
                                <label className="custom-file-upload">
                                  <input
                                    type="file"
                                    id="imagem"
                                    accept="image/*"
                                    name="imagem"
                                    onChange={handleImageChange}
                                  />
                                  <span>
                                    {imagem
                                      ? 'Trocar imagem'
                                      : 'Escolha uma imagem'}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </form>
                          <div className="blocoaddPost">
                            <h1>LISTA DE POSTS</h1>
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
                                        Titulo
                                      </th>
                                      <th
                                        style={{ textAlign: 'left' }}
                                        className="th2 nome-grupo textTi"
                                      >
                                        Texto
                                      </th>
                                      <th
                                        style={{ color: 'transparent' }}
                                        className="th2 nome-grupo"
                                      >
                                        .......
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
                                    {comunicadoLista.length > 0 ? (
                                      <>
                                        {comunicadoLista.map(
                                          (comunicado, index) => (
                                            <tr key={index} onClick={() => {}}>
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
                                                {comunicado.titulo}
                                              </td>
                                              <td
                                                style={{ textAlign: 'left' }}
                                                className="nome-grupo textTi"
                                              >
                                                {comunicado.texto}
                                              </td>
                                              <td
                                                style={{ color: 'transparent' }}
                                                className="th2 nome-grupo"
                                              >
                                                .......
                                              </td>

                                              <td
                                                style={{ textAlign: 'center' }}
                                                className="fixed-table td-fixo"
                                              >
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
                                                      DeletePost(comunicado.id);
                                                    }}
                                                    className="btn btn-table btn-delete"
                                                  >
                                                    <RiDeleteBin5Line />
                                                  </button>
                                                </OverlayTrigger>
                                              </td>
                                            </tr>
                                          )
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
                    </Tab>
                    <Tab
                      eventKey="Permissoes"
                      title="Permissões"
                      style={{ minHeight: 400 }}
                    >
                      <div className="conteudo-cadastro-parceiro">
                        <div className="colunaPost">
                          <div className="postForm">
                            <div className="table-responsive table-scroll tabela-responsiva tabelaPost tabelagrupopost">
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
                                        style={{ color: 'transparent' }}
                                        className="th2 nome-grupo"
                                      >
                                        .......
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
                                    {grupos.length > 0 ? (
                                      <>
                                        {grupos.map((comunicado, index) => (
                                          <tr
                                            key={index}
                                            className={
                                              permissoes.some(
                                                (pedido) =>
                                                  pedido.id === comunicado.id
                                              )
                                                ? 'permiDada'
                                                : ''
                                            }
                                          >
                                            <td
                                              style={{ textAlign: 'center' }}
                                              onClick={() =>
                                                PostPermi(comunicado.id)
                                              }
                                              className="IdPsot"
                                            >
                                              {comunicado.id}
                                            </td>
                                            <td
                                              style={{ textAlign: 'left' }}
                                              onClick={() =>
                                                PostPermi(comunicado.id)
                                              }
                                              className="nome-grupo textTi"
                                            >
                                              {comunicado.nome}
                                            </td>
                                            <td
                                              style={{ color: 'transparent' }}
                                              className="th2 nome-grupo"
                                            >
                                              .......
                                            </td>
                                            <td
                                              style={{ textAlign: 'center' }}
                                              className="fixed-table td-fixo"
                                            >
                                              <OverlayTrigger
                                                placement={'left'}
                                                delay={{ show: 100, hide: 250 }}
                                                overlay={
                                                  <Tooltip>Conceder</Tooltip>
                                                }
                                              >
                                                <button
                                                  type="button"
                                                  style={{ marginRight: 20 }}
                                                  onClick={() => {
                                                    PostPermi(comunicado.id);
                                                  }}
                                                  className="btn btn-table  btn-edit"
                                                >
                                                  <IoMdAdd />
                                                </button>
                                              </OverlayTrigger>
                                              <OverlayTrigger
                                                placement={'right'}
                                                delay={{ show: 100, hide: 250 }}
                                                overlay={
                                                  <Tooltip>Excluir</Tooltip>
                                                }
                                              >
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    DeletePerm(comunicado.id);
                                                  }}
                                                  className="btn btn-table btn-delete"
                                                >
                                                  <RiDeleteBin5Line />
                                                </button>
                                              </OverlayTrigger>
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
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
                <div className="conteudoColaborador">
                  {comunicados.length > 0 ? (
                    <>
                      {comunicados?.map((comunicadoComImagem) => (
                        <div className="posts">
                          <div>
                            <h1>{comunicadoComImagem?.titulo}</h1>

                            <img
                              src={`data:image/jpeg;base64,${comunicadoComImagem?.imagemBase64}`}
                            />
                            <div
                              className="textoPostNovo"
                              style={{ textAlign: 'justify' }}
                              dangerouslySetInnerHTML={{
                                __html: comunicadoComImagem?.texto,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="posts">
                        <img src={Nopost} alt="" />
                      </div>
                    </>
                  )}
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
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
