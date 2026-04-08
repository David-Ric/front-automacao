import React, { useEffect, useState } from 'react';
import '../Usuario/CadastroUser.scss';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../assets/ole-logo.png';
import PhotoUser from '../../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import ChampGif from '../assets/playy.gif';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-dark.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TfiNewWindow } from 'react-icons/tfi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import { iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iDadosUsuario, iDataSelect, iProdutos } from '../../@types';
import Select from 'react-select';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function CadastroProdutos() {
  const history = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [idGrupo, setIdGrupo] = useState('');
  const [idProduto, setIdProduto] = useState('');
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [un1, setUn1] = useState('');
  const [un2, setUn2] = useState('');
  const [conv, setConv] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  let [produtos, setProdutos] = useState<iProdutos[]>([]);
  const [limpando, setLimpando] = useState(false);
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  let [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  let [filterGrupo, setFiltergrupo] = useState(false);
  const [un, setUn] = useState('');
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [grupoPesquisa, setGrupoPesquisa] = useState<iDataSelect[]>([]);
  const [grupoPesq, setGrupoPesq] = useState<iDataSelect[]>([]);
  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaCod, setPesquisaCod] = useState(false);
  const [pesquisaGrupo, setPesquisaGrupo] = useState(false);
  let [selectGrupoBanco, setSelectGrupoBanco] = useState<iDataSelect>();
  const [showloading, setShowloading] = useState(true);
  const handleCloseloading = () => setShowloading(false);
  const [sucess, setSucess] = useState(0);
  //=========================================================================

  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  useEffect(() => {
    logado();
  }, []);

  function logado() {
    if (!usuariolog.token) {
      history('/');
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    GetGrupoPesquisa();
    GetGrupos();
    if (filter) {
      GetProdutosFilter();
    } else {
      GetProdutos();
    }
  }, [pagina]);

  function Pesquisa(event: any) {
    event.preventDefault();
    setPagina(1);
    setFilter(true);

    if (pesquisaNome) {
      GetProdutosFilter();
    }

    if (pesquisaGrupo) {
    }
    if (search == '') {
      LimparPesquisa();
    }
  }

  function handleShowMensage() {
    setShowMensage(true);
    setTimeout(function () {}, 1200);
  }

  function LimpaerroSenhaConfirm() {
    setAlertErroRegister(false);
    let senha: any;
    senha = document.getElementById('senha');
    senha.style.backgroundColor = '#ffff';
    let senhaconf: any;
    senhaconf = document.getElementById('confirma');
    senhaconf.style.backgroundColor = '#ffff';
    senhaconf.style.backgroundColor = '#ffff';
  }
  function LimparTodos() {
    setAlertErroRegister(false);
  }
  function handleShow() {
    setIdGrupo('');
    setNome('');
    setUn1('');
    setUn2('');
    setConv('');
    setCodigo('');
    setNomeGrupo('');
    setIdProduto('');
    setShow(true);
    setAlertErroRegister(false);
  }

  async function GetGrupoPesquisa() {
    await api

      .get(`/api/Produto?pagina=1&totalpagina=999`)
      .then((response) => {
        console.log('grupo', response.data.data);

        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((grupos: any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(grupos.idGrupo);
            rowGrupo.label = grupos.nomeGrupo;
            options.push(rowGrupo);
            setGrupoPesq(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetGrupos() {
    await api

      .get(`/api/GrupoProduto?pagina=1&totalpagina=999`)
      .then((response) => {
        console.log('grupo', response.data.data);

        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((grupos: any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(grupos.id);
            rowGrupo.label = String(grupos.id) + ' - ' + grupos.nome;
            options.push(rowGrupo);
            setGrupoPesquisa(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetProdutos() {
    setSucess(60);
    setFilter(false);
    await api

      .get(`/api/Produto?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setProdutos(response.data.data);
        console.log('dados', response.data);
        produtos = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        setSucess(60);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setSucess(60);
        setShowloading(false);
      });
  }

  async function GetProdutosFilter() {
    setFilter(true);
    await api
      .get(
        `/api/Produto/filter?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
      )
      .then((response) => {
        setProdutos(response.data.data);
        produtos = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        console.log('usuarios pesquisa', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  async function GetProdutosFilterGrupo() {
    setFilter(true);
    await api
      .get(
        `/api/Produto/filter/grupo?pagina=${pagina}&totalpagina=${qtdePagina}&grupo=${search}`
      )
      .then((response) => {
        setProdutos(response.data.data);
        produtos = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        console.log('usuarios pesquisa', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=========== get produto por ID ==================================//
  async function GetProdutoId(id: any) {
    setIdGrupo('');
    setNome('');
    setCodigo('');
    setNomeGrupo('');
    setUn1('');
    setUn2('');
    setConv('');
    setIdProduto('');
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/Produto/${id}`)
      .then((response) => {
        setGrupoSelecionado(
          response.data.grupoProdutoId + ' - ' + response.data.grupoProduto.nome
        );
        let banco: iDataSelect = {
          value: response.data.idGrupo,
          label: response.data.nomeGrupo,
        };
        setSelectGrupoBanco(banco);
        setIdProduto(response.data.id);
        setIdProduto(response.data.id);
        setCodigo(response.data.codigo);
        setNome(response.data.nome);
        setIdGrupo(response.data.grupoProdutoId);
        setUn1(response.data.tipoUnid);
        setUn2(response.data.tipoUnid2);
        setConv(response.data.conv);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar produto ===============================//
  async function EditeProduto() {
    setLoadingUpdate(true);
    await api
      .put(`/api/Produto/${idProduto}`, {
        id: Number(idProduto),
        nome: nome,
        tipoUnid: un1,
        conv: Number(conv),
        tipoUnid2: un2,
        grupoProdutoId: Number(idGrupo),
      })
      .then((response) => {
        handleCloseEdit();
        GetProdutos();
        GetGrupoPesquisa();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados do usuário atualizados com sucesso.');
        setLimpando(false);
      })
      .catch((error) => {
        setLimpando(false);
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);
        const { data } = error.response;

        setMsgErro(error.response.data);

        return;
      });
  }
  //============ Criar produto ===============================//
  async function CreateProduto() {
    if (idProduto.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('idproduto');
      document.getElementById('idproduto')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o código do produto.');
      return;
    }

    if (nome.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('descricao');
      document.getElementById('descricao')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a descrição do produto.');
      return;
    }

    if (nomeGrupo.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('grupo-create');
      document.getElementById('grupo-create')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o grupo do produto');
      return;
    }

    setLoadingCreate(true);
    await api
      .post('/api/Produto', {
        id: idProduto,
        nome: nome,
        tipoUnid: un1,
        conv: Number(conv),
        tipoUnid2: un2,
        grupoProdutoId: Number(idGrupo),
      })

      .then((response) => {
        setLoadingCreate(false);
        GetProdutos();
        GetGrupoPesquisa();
        handleClose();
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Produto cadastrado com sucesso.');
      })
      .catch((error) => {
        setAlertErroMensage(true);
        setLoadingCreate(false);
        window.scrollTo(0, 0);
        console.log(error.response);
        handleShowMensage();
        setAlertErroMensage(true);
        const data = error.response.data;
        setMsgErro(data);

        return;
      });
  }
  //==== EXCLUIR PRODUTO ======================================
  async function DeleteProduto(id: any) {
    setLoadingUpdate(true);
    await api
      .delete(`/api/Produto/${id}`)
      .then((response) => {
        handleCloseEdit();
        GetProdutos();
        GetGrupoPesquisa();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Produto excluído com sucesso.');
      })
      .catch((error) => {
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);

        const { data } = error.response;
        setMsgErro(data.message);

        return;
      });
  }
  //==========================================================//
  function ShowModalEdit() {
    setShowEdit(true);
  }
  function LimparPesquisa() {
    setFiltergrupo(false);
    filterGrupo = false;
    setSearch('');
    setSearchStatus('');
    setPagina(1);
    PesquisaNome();
    setFilter(false);
    GetProdutos();
  }

  function PesquisaNome() {
    setPagina(1);
    setSearch('');
    GetProdutos();
    setPesquisaNome(true);
    setPesquisaGrupo(false);
    setPesquisaCod(false);
    let pesquisar: any;
    pesquisar = document.getElementById('nomePesquisa');
    document.getElementById('nomePesquisa')?.focus();
  }

  function PesquisaGrupo() {
    setPagina(1);
    setSearch('');
    GetProdutos();
    setPesquisaNome(false);
    setPesquisaCod(false);
    setPesquisaGrupo(true);
    let pesquisa: any;
    pesquisa = document.getElementById('grupoPesquisa');
    document.getElementById('grupoPesquisa')?.focus();
  }

  function PesquisaCod() {
    setSearch('');
    GetProdutos();
    setPesquisaNome(false);
    setPesquisaGrupo(false);
    setPesquisaCod(true);
    let pesquisa: any;
    pesquisa = document.getElementById('codPesquisa');
    document.getElementById('codPesquisa')?.focus();
  }

  return (
    <>
      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="">
            <SideNavBar />
          </div>
          <div>
            <NavbarDashHeader />
            <div className="titulo-page">
              <h1>Cadastro de Produtos</h1>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center total-loading">
                <div className="div-loading">
                  <div className="spinner-border" role="status"></div>
                  <h2 className="sr-only">Carregando...</h2>
                </div>
              </div>
            ) : (
              <div
                style={{ justifyContent: 'center' }}
                className="contain d-flex"
              >
                <div className="conteudo">
                  <div className="div-button-top">
                    <div className="pesBloco">
                      <div className="title-pesBloco">
                        <span style={{ fontSize: 14 }}>Pesquisar por:</span>
                      </div>
                      <div className="d-flex">
                        <input
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaNome}
                          onChange={PesquisaNome}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Descrição</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaGrupo}
                          onChange={PesquisaGrupo}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Grupo</p>
                      </div>
                    </div>
                    <OverlayTrigger
                      placement={'top'}
                      delay={{ show: 100, hide: 250 }}
                      overlay={<Tooltip>Novo Produto</Tooltip>}
                    >
                      <button
                        className="btn btn-dark btn-direito btn-acao-sm"
                        onClick={handleShow}
                      >
                        Novo{' '}
                        <TfiNewWindow
                          style={{ marginLeft: 8, marginBottom: 5 }}
                        />
                      </button>
                    </OverlayTrigger>
                  </div>
                  <form
                    onSubmit={Pesquisa}
                    style={{ marginTop: 10, width: '100%' }}
                    className="conteudo-botoes"
                  >
                    <div className="bloco-pesquisa-input">
                      {pesquisaNome ? (
                        <>
                          <div>
                            <p className="title-input">
                              Pesquisar por Descrição:{' '}
                            </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select inputparceiro"
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaCod ? (
                        <>
                          <div>
                            <p className="title-input">
                              Pesquisar por código:{' '}
                            </p>
                            <input
                              id="codPesquisa"
                              type="text"
                              className="form-control select inputparceiro"
                              name=""
                              value={search}
                              onChange={(e) => {
                                setFiltergrupo(false);
                                filterGrupo = false;
                                setSearch(e.target.value);
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaGrupo ? (
                        <>
                          <div className="div-pesquisa-status">
                            <p className="title-input">Pesquisar por grupo: </p>

                            <Select
                              id="grupoPesquisa"
                              className="select-comp select "
                              placeholder="Digite ou selecione"
                              noOptionsMessage={() =>
                                'Nenhum status encontrado'
                              }
                              options={grupoPesquisa}
                              onChange={(value: any) => {
                                setFiltergrupo(true);
                                filterGrupo = true;
                                setSearch('');
                                setSearch(value.value);
                                search = value.value;
                                GetProdutosFilterGrupo();
                                console.log('Select', value, value);
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="pesquisa-div">
                      <button
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-dark btn-pesquisas btn-pesquisar"
                        onClick={() => {
                          setPagina(1);
                          if (filterGrupo) {
                            GetProdutosFilterGrupo();
                          } else {
                            GetProdutosFilter();
                          }
                        }}
                      >
                        Pesquisar
                        <FaSearchPlus style={{ marginLeft: 6 }} fontSize={12} />
                      </button>
                      <button
                        type="button"
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-danger btn-pesquisas"
                        onClick={LimparPesquisa}
                      >
                        Limpar
                        <AiOutlineClear
                          style={{ marginLeft: 6 }}
                          fontSize={13}
                        />
                      </button>
                    </div>
                  </form>
                  <div className="table-responsive table-scroll tabela-responsiva">
                    <div className=" table-wrap">
                      <Table
                        responsive
                        className="table-global table  main-table"
                      >
                        <thead>
                          <tr className="tituloTab">
                            <th
                              style={{ textAlign: 'center' }}
                              id="codigo-tabela"
                              className="th1 div-cod-prod"
                            >
                              Código
                            </th>
                            <th className="th1 Nome-completo">Descrição</th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th2 div-cod-prod"
                            >
                              Id Grupo
                            </th>
                            <th className="th3">Desc. Grupo</th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th2 div-cod-prod"
                            >
                              Un
                            </th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th2 div-cod-prod"
                            >
                              Conv.
                            </th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th2 div-cod-prod"
                            >
                              Un2
                            </th>
                            <th
                              style={{ color: 'transparent' }}
                              className="th4"
                            >
                              .
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
                          {produtos.length > 0 ? (
                            <>
                              {produtos.map((produtos, index) => (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    GetProdutoId(produtos.id);
                                    ShowModalEdit();
                                  }}
                                >
                                  <td
                                    className="div-cod-prod"
                                    id="codigo-tabela"
                                    style={{ textAlign: 'center' }}
                                  >
                                    {produtos.id}
                                  </td>
                                  <td
                                    id="produto-tabela"
                                    className="Nome-complet"
                                  >
                                    {produtos.nome}
                                  </td>
                                  <td
                                    className="div-cod-prod"
                                    style={{ textAlign: 'center' }}
                                  >
                                    {produtos?.grupoProdutoId}
                                  </td>
                                  <td className="Nome-complet">
                                    {produtos.grupoProduto?.nome}
                                  </td>
                                  <td
                                    className="div-cod-prod"
                                    style={{ textAlign: 'center' }}
                                  >
                                    {produtos?.tipoUnid}
                                  </td>
                                  <td
                                    className="div-cod-prod"
                                    style={{ textAlign: 'center' }}
                                  >
                                    {produtos?.conv}
                                  </td>
                                  <td
                                    className="div-cod-prod"
                                    style={{ textAlign: 'center' }}
                                  >
                                    {produtos?.tipoUnid2}
                                  </td>

                                  <td style={{ color: 'transparent' }}>
                                    .............
                                  </td>
                                  <td style={{ color: 'transparent' }}>
                                    .............
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="fixed-table td-fixo"
                                  >
                                    <OverlayTrigger
                                      placement={'right'}
                                      delay={{ show: 100, hide: 250 }}
                                      overlay={<Tooltip>Editar</Tooltip>}
                                    >
                                      <button
                                        className="btn btn-table btn-edit"
                                        style={{
                                          marginRight: 15,
                                          marginLeft: 15,
                                        }}
                                        onClick={() => {
                                          GetProdutoId(produtos.id);
                                          ShowModalEdit();
                                        }}
                                      >
                                        <HiOutlinePencilSquare />
                                      </button>
                                    </OverlayTrigger>
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <div
                              style={{ margin: 'auto' }}
                              className="alert alert-warning alerta-prod"
                              role="alert"
                            >
                              Nenhum produto encontrado.
                            </div>
                          )}
                        </tbody>
                      </Table>
                      <Paginacao
                        total={totalPaginas}
                        limit={1}
                        paginaAtual={pagina}
                        setPagina={setPagina}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================Modal Register ============================================== */}

        <Modal className="modal-cadastro-prod" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h1>Cadastro de Produto</h1>
          </Modal.Header>
          <Modal.Body>
            {loadingCreate ? (
              <div className="d-flex justify-content-center total-loading total-loadingCreate">
                <div className="div-loading">
                  <div className="spinner-border" role="status"></div>
                  <h2 className="sr-only">Salvando...</h2>
                </div>
              </div>
            ) : (
              <>
                {alertErroRegister && (
                  <div className="mt-3 mb-0">
                    <Alert msg={msgErro} setAlertErro={setAlertErroRegister} />
                  </div>
                )}
                <div className="form-cadastro-user">
                  <div className="coluna-dupla">
                    <div className="coluna-codigo">
                      <p className="title-input">
                        Código: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro"
                        id="idproduto"
                        type="text"
                        value={idProduto}
                        onChange={(e) => {
                          setIdProduto(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input bloco-prod">
                      <p className="title-input">
                        Descrição:<span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro "
                        id="descricao"
                        type="text"
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input">
                      <p id="grupos" className=" title-input">
                        Grupo: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <Select
                        id="grupo-create"
                        className=" select-comp"
                        placeholder="Digite ou selecione"
                        noOptionsMessage={() => 'Nenhum status encontrado'}
                        options={grupoPesquisa}
                        onChange={(value: any) => {
                          setIdGrupo(value.value);
                          setNomeGrupo(value.label);
                          LimparTodos();
                          console.log('Select', value);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{ marginTop: 10 }}
                    className="coluna-dupla coluna-3-cod"
                  >
                    <div className="coluna-codigo">
                      <p className="title-input">
                        Un 1: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro2"
                        id="un1"
                        type="text"
                        value={un1}
                        onChange={(e) => {
                          setUn1(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="coluna-codigo ">
                      <p className="title-input">
                        Conv: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro2"
                        id="conv"
                        type="number"
                        value={conv}
                        onChange={(e) => {
                          setConv(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="coluna-codigo2">
                      <p className="title-input">
                        Un 2: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro2"
                        id="un2"
                        type="text"
                        value={un2}
                        onChange={(e) => {
                          setUn2(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <button
                    disabled={loadingCreate}
                    id="btn-cad-prod"
                    className="btn btn-dark"
                    onClick={CreateProduto}
                  >
                    Salvar
                  </button>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Edit ============================================== */}

        <Modal
          className="modal-cadastro-prod"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Dados do Produto</h1>
          </Modal.Header>
          <Modal.Body>
            {loadingUpdate ? (
              <div className="d-flex justify-content-center total-loading total-loadingCreate">
                <div className="div-loading">
                  <div className="spinner-border" role="status"></div>
                  <h2 className="sr-only">Carregando...</h2>
                </div>
              </div>
            ) : (
              <>
                <div className="form-cadastro-user">
                  <div className="coluna-dupla">
                    <div className="coluna-codigo">
                      <p className="title-input">Código: </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro"
                        id="nome"
                        type="text"
                        value={idProduto}
                        disabled
                        onChange={(e) => {
                          setIdProduto(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input bloco-prod">
                      <p className="title-input">
                        Descrição:<span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro"
                        id="descricao"
                        type="text"
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input">
                      <p id="grupos" className=" title-input">
                        Grupo: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <Select
                        id="grupo-create"
                        className=" select-comp"
                        placeholder={grupoSelecionado}
                        noOptionsMessage={() => 'Nenhum status encontrado'}
                        options={grupoPesquisa}
                        onChange={(value: any) => {
                          setLimpando(true);
                          setIdGrupo(value.value);
                          setNomeGrupo(value.label);
                          LimparTodos();
                          console.log('Select', value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="coluna-dupla coluna-3-cod">
                    <div className="coluna-codigo">
                      <p className="title-input">
                        Un 1: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro2"
                        id="un1"
                        type="text"
                        value={un1}
                        onChange={(e) => {
                          setUn1(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="coluna-codigo ">
                      <p className="title-input">
                        Conv: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro2"
                        id="conv"
                        type="number"
                        value={conv}
                        onChange={(e) => {
                          setConv(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>

                    <div className="coluna-codigo2">
                      <p className="title-input">
                        Un 2: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro codigo-cadastro2"
                        id="un2"
                        type="text"
                        value={un2}
                        onChange={(e) => {
                          setUn2(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input boco-botoes-grupo">
                      <button
                        disabled={loadingUpdate}
                        id="btn-desc"
                        className="btn btn-dark "
                        onClick={EditeProduto}
                      >
                        Salvar
                      </button>
                      <button
                        disabled={loadingUpdate}
                        id="btn-desc"
                        className="btn btn-danger "
                        onClick={handleCloseEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
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
              className="btn btn-dark btn-acao-sm"
              onClick={handleCloseMensage}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>

        {/* //===================================modal loading ============================================ */}
        <Modal
          className="modalLoading"
          show={showloading}
          onHide={handleCloseloading}
          backdrop="static"
        >
          <Modal.Body>
            <div className="loadingModal">
              <img id="logoSankhya" src={logoAlyne} alt="" />
              <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
              <h1 style={{ marginTop: 15 }}></h1>
              <ProgressBar className="progress" animated now={sucess} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <FooterMobile />
      <Footer />
    </>
  );
}
