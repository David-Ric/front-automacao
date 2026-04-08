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
import moment from 'moment-timezone';

interface iSessao {
  nome: string;
  url: string;
  horaAcesso: string;
  online: string;
}

export default function Sessoes() {
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
  let [tipoEmpresa, setTipoEmpresa] = useState<iSessao[]>([]);
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
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);

  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  function formatarDataHora(dataHora: any) {
    const dataFormatada = moment(dataHora).format('DD/MM/YYYY');
    const horaFormatada = moment(dataHora).format('HH:mm');

    return `${dataFormatada} às ${horaFormatada}`;
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

    const dataAtual = moment()
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DDTHH:mm:ss');
    await api

      .get(`/api/Sessao?pagina=1&totalpagina=999`)
      .then((response) => {
        console.log('sessoes ok', response.data);

        console.log('grupo', tipoEmpresa);

        const sessao: Array<iSessao> = response.data.data.filter(
          (sessao: any) =>
            sessao?.online == 'S' &&
            sessao?.nome &&
            sessao.horaAcesso.split('T')[0] == dataAtual.split('T')[0]
        );

        setTotalPaginas(Math.ceil(sessao.length / qtdePagina));
        totalPaginas = Math.ceil(sessao.length / qtdePagina);
        console.log('total paginas:', totalPaginas);
        console.log('Itens sessoes:', dataAtual);
        console.log('Itens sessoes:', sessao);
        setTipoEmpresa(
          sessao.slice((pagina - 1) * qtdePagina, pagina * qtdePagina) || []
        );
        tipoEmpresa =
          sessao.slice((pagina - 1) * qtdePagina, pagina * qtdePagina) || [];
        setSucess(100);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setShowloading(false);
      });
  }

  //============ Editar Usuario ===============================//
  async function EditTipoNegociacao() {
    setLoadingUpdate(true);
    await api
      .put(`/api/Empresa/${id}`, {
        id: id,
        descricao: descricao,
      })
      .then((response) => {
        handleCloseEdit();
        setSearch('');
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados da Empresa atualizados com sucesso.');
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
  async function DeleteTipoEmpresa(id: any) {
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
  }

  function Pesquisa(event: any) {
    event.preventDefault();
    if (inInsert == false) {
      if (search != '') {
        setPagina(1);
      }
      if (search == '') {
        LimparPesquisa();
      }
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
              <h1>SESSÕES EM USO</h1>
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
                          className="btn btn-danger btn-direito"
                          onClick={() => {
                            setInInsert(false);
                            setAlertErroRegister(false);
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    <button
                      className="btn btn-dark btn-direito"
                      onClick={GetSessao}
                    >
                      Atualizar
                      {loading && (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
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
                            <th className="th2 nome-grupo">Usuario:</th>
                            <th className="th2 nome-grupo">Página em uso:</th>
                            <th className="th2 nome-grupo">
                              Data e hora do acesso:
                            </th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th2 "
                            >
                              Status:
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tipoEmpresa.length > 0 ? (
                            <>
                              {tipoEmpresa.map((tipo, index) => (
                                <tr key={index}>
                                  <td className="nome-grupo" onClick={() => {}}>
                                    {tipo.nome}
                                  </td>
                                  <td className="nome-grupo" onClick={() => {}}>
                                    {tipo.url}
                                  </td>
                                  <td className="nome-grupo" onClick={() => {}}>
                                    {formatarDataHora(tipo?.horaAcesso)}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    <HiStatusOnline
                                      fontSize={25}
                                      style={{ color: '#008000' }}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <div
                              style={{ margin: 'auto' }}
                              className="alert alert-warning aletSessao "
                              role="alert"
                            >
                              Nenhuma sessão aberta.
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
            <h1>Alterar Empresa</h1>
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
                          Descrição:{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro inputlogin"
                          id=""
                          type="text"
                          value={descricao}
                          onChange={(e) => {
                            setDescricao(e.target.value);
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
                        className="btn btn-cadastrar "
                        onClick={EditTipoNegociacao}
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
