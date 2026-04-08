import React, { useEffect, useState } from 'react';
import '../Grupo-Produto/CadastroGrupoProd.scss';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../assets/ole-logo.png';
import PhotoUser from '../../assets/avatar1.png';
import Messeger from '../../assets/messege.png';
import ChampGif from '../../assets/playy.gif';
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
import { iEmpresa, iGrupos } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iDadosUsuario, iTipoNegociacao } from '../../@types';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';
import { HiStatusOnline } from 'react-icons/hi';

interface iLogAcao {
  id: number;
  userName: string;
  tabela: string;
  metodo: string;
  codigo: string;
  obs: string;
  data: '2023-06-06T11:43:23.646Z';
}

export default function LogAcao() {
  const history = useNavigate();
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [sucess, setSucess] = useState(0);
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showloading, setShowloading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [logAcao, setlogAcao] = useState<iLogAcao[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const handleCloseloading = () => setShowloading(false);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  let [editar, setEditar] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [inInsert, setInInsert] = useState(false);
  const [usuarioLog, setusuarioLog] = useState('');
  const [tabelaLog, settabelaLog] = useState('');
  const [codigoLog, setcodigoLog] = useState('');
  const [dataLog, setdataLog] = useState('');
  const [observacao, setObservacao] = useState('');
  const [LogId, setLogId] = useState(0);
  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaTabela, setPesquisaTabela] = useState(false);
  const [pesquisaMetodo, setPesquisaMetodo] = useState(false);
  const [pesquisaData, setPesquisaData] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);

  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

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
    GetSessao();
  }, [pagina]);

  function PesquisaNome() {
    setSearch('');
    GetSessao();
    setPesquisaNome(true);
    setPesquisaMetodo(false);
    setPesquisaTabela(false);
    setPesquisaData(false);
  }

  function PesquisaMetodo() {
    setSearch('');
    GetSessao();
    setPesquisaNome(false);
    setPesquisaMetodo(true);
    setPesquisaTabela(false);
    setPesquisaData(false);
  }
  function PesquisaTabela() {
    setSearch('');
    GetSessao();
    setPesquisaNome(false);
    setPesquisaMetodo(false);
    setPesquisaTabela(true);
    setPesquisaData(false);
  }
  function PesquisaData() {
    setSearch('');
    GetSessao();
    setPesquisaNome(false);
    setPesquisaMetodo(false);
    setPesquisaTabela(false);
    setPesquisaData(true);
  }

  function handleShowMensage() {
    setShowMensage(true);
    setTimeout(function () {}, 1200);
  }

  function ShowModalEdit() {
    setShowEdit(true);
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
    setDescricao('');
    setShow(true);
  }

  async function GetSessao() {
    setFilter(false);
    setShowloading(true);
    setSucess(50);
    await api

      .get(`/api/LogAcao?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setlogAcao(response.data.data);
        console.log('grupo', logAcao);
        logAcao = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        setSucess(100);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setShowloading(false);
      });
  }

  //======= GET LOG ID =============================================/
  async function GetLogPut(id: any) {
    setLoadingUpdate(true);
    await api
      .get(`/api/LogAcao/${id}`)
      .then((response) => {
        console.log('log id', response.data);
        setLogId(response.data.id);
        setusuarioLog(response.data.userName);
        settabelaLog(response.data.tabela);
        setcodigoLog(response.data.codigo);
        setdataLog(response.data.data);
        setObservacao(response.data.obs);
        ShowModalEdit();
        setLoadingUpdate(false);
      })
      .catch((error) => {
        setSearch('');
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

  //============ Editar Usuario ===============================//
  async function LogPut() {
    setLoadingUpdate(true);
    await api
      .patch(`/api/LogAcao/${LogId}`, observacao)
      .then((response) => {
        handleCloseEdit();
        setSearch('');
        GetSessao();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Observação inserida com sucesso!');
      })
      .catch((error) => {
        setSearch('');
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
  //============ Criar Grupo ===============================//
  async function CreateGrupo() {
    if (codigo.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('codigoGrupo');
      document.getElementById('codigoGrupo')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a descrição.');
      return;
    }
    if (search.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('nomegrupoPesquisa');
      document.getElementById('nomegrupoPesquisa')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a descrição.');
      return;
    }

    await api
      .post('/api/Empresa', {
        id: Number(codigo),
        descricao: search,
      })

      .then((response) => {
        setSearch('');
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Empresa criada com sucesso.');
      })
      .catch((error) => {
        setSearch('');
        setLoading(false);

        console.log(error.response);

        handleShowMensage();
        setAlertErroMensage(true);
        const data = error.response.data;
        setMsgErro(data);
        return;
      });
    setInInsert(false);
  }
  //==== EXCLUIR GRUPO ======================================
  async function DeletelogAcao(id: any) {
    setLoadingUpdate(true);
    await api
      .delete(`/api/Empresa/${id}`)
      .then((response) => {
        handleCloseEdit();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Empresa excluída com sucesso.');
      })
      .catch((error) => {
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);
        console.log(error);
        const { data } = error.response;
        setMsgErro(data);

        return;
      });
  }
  //==========================================================//
  function LimparPesquisa() {
    setCodigo('');
    setSearch('');
    setPagina(1);
    setFilter(false);
    GetSessao();
  }

  function Pesquisa(event: any) {
    event.preventDefault();
    if (inInsert == false) {
      if (search != '') {
        setPagina(1);
        GetLogFilter();
      }
      if (search == '') {
        LimparPesquisa();
      }
    }
  }

  async function GetLogFilter() {
    setFilter(true);
    if (pesquisaNome) {
      await api
        .get(
          `/api/LogAcao/filter/Usuario?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setlogAcao(response.data.data);
          logAcao = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa por nome', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaTabela) {
      await api
        .get(
          `/api/LogAcao/filter/Tabela?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setlogAcao(response.data.data);
          logAcao = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa por tabela', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaMetodo) {
      await api
        .get(
          `/api/LogAcao/filter/Metodo?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setlogAcao(response.data.data);
          logAcao = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa por tabela', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaData) {
      await api
        .get(
          `/api/LogAcao/filter/Data?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setlogAcao(response.data.data);
          logAcao = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa por tabela', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  function HandleInsert() {
    setInInsert(true);
    setCodigo('');
    setSearch('');

    let senhaconf: any;
    senhaconf = document.getElementById('codigoGrupo');
    document.getElementById('codigoGrupo')?.focus();
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
              <h1>Log de ações usuarios</h1>
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
                  <div style={{ height: 70 }} className="div-button-top">
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
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Usuario</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaTabela}
                          onChange={PesquisaTabela}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Tabela</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaMetodo}
                          onChange={PesquisaMetodo}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Metodo</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaData}
                          onChange={PesquisaData}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Data</p>
                      </div>
                    </div>
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
                              Pesquisar por Usuário:{' '}
                            </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select  inputparceiro"
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
                      {pesquisaTabela ? (
                        <>
                          <div>
                            <p className="title-input">
                              Pesquisar por Tabela:{' '}
                            </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select  inputparceiro"
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
                      {pesquisaMetodo ? (
                        <>
                          <div>
                            <p className="title-input">
                              Pesquisar por Metodo:{' '}
                            </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select  inputparceiro"
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
                      {pesquisaData ? (
                        <>
                          <div>
                            <p className="title-input">Pesquisar por Data: </p>
                            <input
                              id="nomePesquisa"
                              type="date"
                              className="form-control select  inputparceiro"
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
                    </div>
                    <div className="pesquisa-div">
                      <button
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-primary btn-pesquisas btn-pesquisar"
                        onClick={() => {
                          setPagina(1);
                        }}
                      >
                        Pesquisar
                        <FaSearchPlus style={{ marginLeft: 6 }} fontSize={12} />
                      </button>
                      <button
                        type="button"
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-primary btn-pesquisas"
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
                  {alertErroRegister && (
                    <div className="mt-3 mb-0">
                      <Alert
                        msg={msgErro}
                        setAlertErro={setAlertErroRegister}
                      />
                    </div>
                  )}
                  <div className="table-responsive table-scroll tabela-responsiva-sessao">
                    <div className=" table-wrap">
                      <Table
                        responsive
                        className="table-global table  main-table"
                      >
                        <thead>
                          <tr className="tituloTab">
                            <th className="th2 nome-grupo">Usuário:</th>
                            <th className="th2 nome-grupo">Tabela:</th>
                            <th className="th2 nome-grupo">Metodo:</th>
                            <th className="th2 nome-grupo">Código:</th>
                            <th className="th2 nome-grupo">Data:</th>
                            <th className="th2 nome-grupo">Obs:</th>
                            <th className="th2 nome-grupo"></th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th4 fixed-table"
                            >
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {logAcao.length > 0 ? (
                            <>
                              {logAcao.map((tipo, index) => (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    GetLogPut(tipo.id);
                                  }}
                                >
                                  <td className="nome-grupo">
                                    {tipo.userName}
                                  </td>
                                  <td className="nome-grupo">{tipo.tabela}</td>
                                  <td className="nome-grupo">{tipo.metodo}</td>
                                  <td className="nome-grupo">{tipo.codigo}</td>
                                  <td className="nome-grupo">
                                    {formatDate(tipo.data)}
                                  </td>
                                  <td className="nome-grupo">{tipo.obs}</td>
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
                                      placement={'top'}
                                      delay={{ show: 100, hide: 250 }}
                                      overlay={<Tooltip>Editar Log</Tooltip>}
                                    >
                                      <button
                                        className="btn btn-table btn-edit"
                                        style={{
                                          marginRight: 15,
                                          marginLeft: 15,
                                        }}
                                        onClick={() => {
                                          GetLogPut(tipo.id);
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
                              className="alert alert-warning "
                              role="alert"
                            >
                              Nenhum Log de Ação encontrado.
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

        {/* ================Modal Edit ============================================== */}

        <Modal
          className="modal-confirm"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Inserir Observação</h1>
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
                    <div className="bloco-input">
                      <div>
                        <p
                          className="title-input"
                          style={{ textAlign: 'justify' }}
                        >
                          Usuario:{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro inputlogin"
                          id=""
                          type="text"
                          disabled={true}
                          value={usuarioLog}
                        />
                      </div>
                    </div>
                    <div className="bloco-input">
                      <div>
                        <p
                          className="title-input"
                          style={{ textAlign: 'justify' }}
                        >
                          Tabela:{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro inputlogin"
                          id=""
                          type="text"
                          disabled={true}
                          value={tabelaLog}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input">
                      <div>
                        <p
                          className="title-input"
                          style={{ textAlign: 'justify' }}
                        >
                          Código:{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro inputlogin"
                          id=""
                          type="text"
                          disabled={true}
                          value={codigoLog}
                        />
                      </div>
                    </div>
                    <div className="bloco-input">
                      <div>
                        <p
                          className="title-input"
                          style={{ textAlign: 'justify' }}
                        >
                          Data:{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro inputlogin"
                          id=""
                          type="text"
                          disabled={true}
                          value={formatDate(dataLog)}
                          onChange={(e) => {
                            setDescricao(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p style={{ marginTop: 15 }} className="title-input">
                      Observação:
                    </p>
                    <textarea
                      className="form-control select textInput"
                      id="tabInput"
                      value={observacao}
                      onChange={(e) => {
                        setObservacao(e.target.value);
                      }}
                    />
                  </div>
                  <div className="coluna-dupla"></div>
                  <div className="coluna-dupla">
                    <div className="bloco-input boco-botoes-grupo">
                      <button
                        disabled={loadingUpdate}
                        id="btn-desc"
                        className="btn btn-cadastrar "
                        onClick={LogPut}
                      >
                        Salvar
                      </button>
                      <button
                        disabled={loadingUpdate}
                        id="btn-desc"
                        className="btn btn-cancelar "
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
              className="btn btn-primary"
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
