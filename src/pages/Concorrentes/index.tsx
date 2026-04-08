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
import { iConcorrentes, iGrupos } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iDadosUsuario } from '../../@types';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function CadastroConcorrentes() {
  const history = useNavigate();
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
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
  let [concorrentes, setConcorrentes] = useState<iConcorrentes[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
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
  const [showloading, setShowloading] = useState(true);
  const handleCloseloading = () => setShowloading(false);
  const [sucess, setSucess] = useState(0);
  const [inInsert, setInInsert] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);

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
    if (filter) {
      GetConcorrentesFilter();
    } else {
      GetConcorrentes();
    }
  }, [pagina]);
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
    setNome('');

    setShow(true);
  }

  async function GetConcorrentes() {
    setFilter(false);
    setSucess(60);
    await api

      .get(`/api/Concorrente?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setConcorrentes(response.data.data);
        console.log('grupo', concorrentes);
        concorrentes = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        setSucess(100);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setShowloading(false);
        setSucess(100);
      });
  }

  async function GetConcorrentesFilter() {
    setFilter(true);
    await api
      .get(
        `/api/Concorrente/filter?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
      )
      .then((response) => {
        setConcorrentes(response.data.data);
        concorrentes = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        console.log('usuarios pesquisa', concorrentes);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=========== get usuarios por ID ==================================//
  async function GetGrupoId(id: any) {
    setSearch('');

    setShowEdit(true);

    await api
      .get(`/api/Concorrente/${id}`)
      .then((response) => {
        setId(response.data.id);
        setNome(response.data.nome);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar Usuario ===============================//
  async function EditConcorrentes() {
    setLoadingUpdate(true);
    await api
      .put(`/api/Concorrente/${id}`, {
        id: id,
        nome: nome,
      })
      .then((response) => {
        handleCloseEdit();
        setSearch('');
        GetConcorrentes();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados do concorrente atualizados com sucesso.');
      })
      .catch((error) => {
        setSearch('');
        console.log(error.response.data);
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);
        const { data } = error.response.data;
        setMsgErro(error.response.data);

        return;
      });
  }
  //============ Criar Concorrente ===============================//
  async function CreateConcorrente() {
    if (search.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('nomegrupoPesquisa');
      document.getElementById('nomegrupoPesquisa')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o nome do concorrente.');
      return;
    }

    setLoading(true);
    await api
      .post('/api/Concorrente', {
        nome: search,
      })

      .then((response) => {
        setLoading(false);
        setSearch('');
        GetConcorrentes();
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Concorrente criado com sucesso.');
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
  async function DeleteConcorrente(id: any) {
    setLoadingUpdate(true);
    await api
      .delete(`/api/Concorrente/${id}`)
      .then((response) => {
        handleCloseEdit();
        GetConcorrentes();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Concorrente excluído com sucesso.');
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
  function LimparPesquisa() {
    setSearch('');
    setPagina(1);
    setFilter(false);
    GetConcorrentes();
  }

  function HandleInsert() {
    setInInsert(true);
    setSearch('');
    let senhaconf: any;
    senhaconf = document.getElementById('nomegrupoPesquisa');
    document.getElementById('nomegrupoPesquisa')?.focus();
  }

  function Pesquisa(event: any) {
    event.preventDefault();
    if (inInsert == false) {
      if (search != '') {
        setPagina(1);
        GetConcorrentesFilter();
      }
      if (search == '') {
        LimparPesquisa();
      }
    }
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
              <h1>Cadastro de Concorrentes</h1>
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
                  <div style={{ height: 60 }} className="div-button-top">
                    {inInsert ? (
                      <>
                        <button
                          style={{ marginRight: 140, color: '#fff' }}
                          className="btn btn-danger btn-direito btn-acao-sm"
                          onClick={() => {
                            setInInsert(false);
                            setAlertErroRegister(false);
                            setSearch('');
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    <OverlayTrigger
                      placement={'top'}
                      delay={{ show: 100, hide: 250 }}
                      overlay={
                        <Tooltip>
                          {inInsert ? 'Salvar grupo' : 'Novo grupo'}
                        </Tooltip>
                      }
                    >
                      <button
                        className="btn btn-dark btn-direito btn-acao-sm"
                        onClick={() => {
                          {
                            inInsert ? CreateConcorrente() : HandleInsert();
                          }
                        }}
                      >
                        {loadingCreate ? (
                          'Carregando '
                        ) : (
                          <>
                            {inInsert ? 'Salvar' : 'Novo'}
                            <TfiNewWindow
                              style={{ marginLeft: 8, marginBottom: 5 }}
                            />
                          </>
                        )}
                        {loading && (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </OverlayTrigger>
                  </div>
                  {alertErroRegister && (
                    <div className="mt-3 mb-0">
                      <Alert
                        msg={msgErro}
                        setAlertErro={setAlertErroRegister}
                      />
                    </div>
                  )}
                  <form
                    onSubmit={Pesquisa}
                    style={{ marginTop: 10, width: '100%' }}
                    className={inInsert ? 'conteudo-input' : 'conteudo-botoes'}
                  >
                    <div className="div-input-grupo">
                      <p className="title-input">
                        {inInsert
                          ? 'Insira o nome do concorrente'
                          : 'Pesquisar por nome:'}{' '}
                      </p>
                      <input
                        id="nomegrupoPesquisa"
                        type="text"
                        className="form-coontrol inputlogin input-grupo-prod"
                        name=""
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                    {inInsert ? (
                      <></>
                    ) : (
                      <>
                        <div className="pesquisa-div">
                          <button
                            style={{ marginTop: 20, height: 45 }}
                            className="btn btn-dark btn-pesquisas btn-pesquisar"
                            onClick={() => {
                              setPagina(1);
                              GetConcorrentesFilter();
                            }}
                          >
                            Pesquisar
                            <FaSearchPlus
                              style={{ marginLeft: 6 }}
                              fontSize={12}
                            />
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
                      </>
                    )}
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
                              className="th1 id-grupo"
                            >
                              ID
                            </th>
                            <th className="th2 nome-grupo">Nome</th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th4 fixed-table"
                            >
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {concorrentes.length > 0 ? (
                            <>
                              {concorrentes.map((concorrentes, index) => (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    GetGrupoId(concorrentes.id);
                                    ShowModalEdit();
                                  }}
                                >
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="id-grupo"
                                  >
                                    {concorrentes.id}
                                  </td>
                                  <td className="nome-grupo">
                                    {concorrentes.nome}
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
                                          GetGrupoId(concorrentes.id);
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
                              className="alert alert-warning alerta-grupo"
                              role="alert"
                            >
                              Nenhum concorrente encontrado.
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
            <h1>Alterar Concorrente</h1>
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
                          Nome:{' '}
                        </p>
                        <input
                          className="form-control inputlogin"
                          id=""
                          type="text"
                          value={nome}
                          onChange={(e) => {
                            setNome(e.target.value.toUpperCase());
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="coluna-dupla"></div>
                  <div className="coluna-dupla">
                    <div className="bloco-input boco-botoes-grupo">
                      <button
                        disabled={loadingUpdate}
                        id="btn-desc"
                        className="btn btn-dark "
                        onClick={EditConcorrentes}
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
