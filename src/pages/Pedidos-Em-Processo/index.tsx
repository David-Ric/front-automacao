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
import { ICabecalho, ICabecalho2, iEmpresa, iGrupos } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask, moeda } from '../../Masks/Masks';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iDadosUsuario, iTipoNegociacao } from '../../@types';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function PedidosProcessar() {
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
  let [tipoEmpresa, setTipoEmpresa] = useState<ICabecalho2[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const handleCloseloading = () => setShowloading(false);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [loading, setLoading] = useState(false);
  const [vendedor, setVendedor] = useState(true);
  const [palMPV, setPalMPV] = useState(false);
  const [cliente, setCliente] = useState(false);
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
      GetTipoEmpresaFilter();
    } else {
      GetTipoEmpresa();
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
    setDescricao('');
    setShow(true);
  }
  //==========GET INICIAL============================================================
  async function GetTipoEmpresa() {
    setFilter(false);
    setShowloading(true);
    setSucess(50);
    await api

      .get(
        `/api/CabecalhoPedidoVenda/Processar?pagina=${pagina}&totalpagina=${qtdePagina}`
      )
      .then((response) => {
        setTipoEmpresa(response.data.data);
        console.log('grupo', tipoEmpresa);
        tipoEmpresa = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        setSucess(100);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setShowloading(false);
      });
  }

  //==========GET FILTER============================================================
  async function GetTipoEmpresaFilter() {
    setFilter(true);
    if (vendedor) {
      await api
        .get(
          `/api/CabecalhoPedidoVenda/Processar/Vendedor?pagina=${pagina}&totalpagina=${qtdePagina}&codVendedor=${search}`
        )
        .then((response) => {
          setTipoEmpresa(response.data.data);
          tipoEmpresa = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa', tipoEmpresa);
          setShowloading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
          setShowloading(false);
        });
    }
    if (cliente) {
      await api
        .get(
          `/api/CabecalhoPedidoVenda/Processar/Cliente?pagina=${pagina}&totalpagina=${qtdePagina}&codCliente=${search}`
        )
        .then((response) => {
          setTipoEmpresa(response.data.data);
          tipoEmpresa = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa', tipoEmpresa);
          setShowloading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
          setShowloading(false);
        });
    }
    if (palMPV) {
      await api
        .get(
          `/api/CabecalhoPedidoVenda/Processar/PalMPV?pagina=${pagina}&totalpagina=${qtdePagina}&palm=${search}`
        )
        .then((response) => {
          setTipoEmpresa(response.data.data);
          tipoEmpresa = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa', tipoEmpresa);
          setShowloading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
          setShowloading(false);
        });
    }
  }

  //=========== get usuarios por ID ==================================//
  async function GetTipoEmpresaId(id: any) {
    setSearch('');

    setShowEdit(true);

    await api
      .get(`/api/Empresa/${id}`)
      .then((response) => {
        setId(response.data.id);
        setDescricao(response.data.descricao);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
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
        GetTipoEmpresa();
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
  async function CreateEmpresa() {
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
        GetTipoEmpresa();
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
  //============================================================
  async function Falhou(id: number) {
    await api
      .put(`/api/CabecalhoPedidoVenda/${id}/status`)

      .then((response) => {
        setSearch('');
        GetTipoEmpresa();
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Pedido marcado como Falhou');
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
  //==== EXCLUIR EMPRESA ======================================
  async function DeleteTipoEmpresa(id: any) {
    setLoadingUpdate(true);
    await api
      .delete(`/api/Empresa/${id}`)
      .then((response) => {
        handleCloseEdit();
        GetTipoEmpresa();
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
    GetTipoEmpresa();
  }
  function Pesquisa(event: any) {
    event.preventDefault();
    if (inInsert == false) {
      if (search != '') {
        setPagina(1);
        GetTipoEmpresaFilter();
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

  async function GetCabecalhos() {}

  function PesquisaVendedor() {
    setSearch('');
    GetCabecalhos();
    setVendedor(true);
    setPalMPV(false);
    setCliente(false);
  }

  function PesquisaPalMPV() {
    setSearch('');
    GetCabecalhos();
    setVendedor(false);
    setPalMPV(true);
    setCliente(false);
  }

  function PesquisaClientes() {
    setSearch('');
    GetCabecalhos();
    setVendedor(false);
    setPalMPV(false);
    setCliente(true);
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
              <h1>Pedidos em processamento</h1>
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
                  <div
                    style={{ height: 70, marginBottom: 10 }}
                    className="div-button-top"
                  >
                    <div className="pesBloco">
                      <div className="title-pesBloco">
                        <span style={{ fontSize: 14 }}>Pesquisar por:</span>
                      </div>
                      <div className="d-flex div-parceiros-pesquisa">
                        <input
                          name="pesquisa"
                          type="radio"
                          checked={vendedor}
                          onChange={PesquisaVendedor}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Vendedor</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={palMPV}
                          onChange={PesquisaPalMPV}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>PalMPV</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={cliente}
                          onChange={PesquisaClientes}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Cliente</p>
                      </div>
                    </div>
                  </div>
                  {alertErroRegister && (
                    <div className="mt-3 mb-0">
                      <Alert
                        msg={msgErro}
                        setAlertErro={setAlertErroRegister}
                      />
                    </div>
                  )}
                  <div
                    style={{ marginTop: 10, width: '100%' }}
                    className={inInsert ? 'conteudo-input' : 'conteudo-botoes'}
                  >
                    <div className="coluna-cad">
                      {inInsert ? (
                        <>
                          <div className=" input-cod">
                            <p className="title-input">
                              Código: <span style={{ color: 'red' }}>*</span>
                            </p>
                            <input
                              id="codigoGrupo"
                              type="text"
                              className="form-control select inputparceiro input-grupo-prod input-cod "
                              name=""
                              value={codigo}
                              onChange={(e) => {
                                setCodigo(e.target.value);
                                LimparTodos();
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <form onSubmit={Pesquisa} className="div-input-grupo">
                        <p className="title-input">
                          {vendedor
                            ? 'Pesquisar por Vendedor:'
                            : cliente
                            ? 'Pesquisar por Cliente:'
                            : 'Pesquisar por PalMPV:'}{' '}
                        </p>
                        <input
                          id="nomegrupoPesquisa"
                          type="text"
                          className="form-control select  inputparceiro input-grupo-prod "
                          name=""
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value.toUpperCase());
                            LimparTodos();
                          }}
                        />
                      </form>
                    </div>
                    {inInsert ? (
                      <></>
                    ) : (
                      <>
                        <div className="pesquisa-div">
                          <button
                            style={{ marginTop: 20, height: 45 }}
                            className="btn btn-primary btn-pesquisas btn-pesquisar"
                            onClick={() => {
                              setPagina(1);
                              GetTipoEmpresaFilter();
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
                      </>
                    )}
                  </div>
                  <div className="table-responsive table-scroll tabela-responsiva">
                    <div className=" table-wrap">
                      <Table
                        responsive
                        className="table-global table  main-table"
                      >
                        <thead>
                          <tr className="tituloTab">
                            <th
                              style={{ textAlign: 'left' }}
                              className="th2 nome-grupo"
                            >
                              PalMPV
                            </th>
                            <th className="th1">Vendedor</th>
                            <th className="th1">Cliente</th>
                            <th style={{ textAlign: 'right' }} className="th2 ">
                              Valor
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
                          {tipoEmpresa.length > 0 ? (
                            <>
                              {tipoEmpresa.map((tipo, index) => (
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="id-grupo"
                                    onClick={() => {
                                      Falhou(tipo.id);
                                    }}
                                  >
                                    {tipo.palMPV}
                                  </td>
                                  <td
                                    className="id-grupo"
                                    onClick={() => {
                                      Falhou(tipo.id);
                                    }}
                                  >
                                    {tipo.vendedorId}
                                  </td>
                                  <td
                                    className="id-grupo"
                                    onClick={() => {
                                      Falhou(tipo.id);
                                    }}
                                  >
                                    {tipo.parceiroId}
                                  </td>
                                  <td
                                    className="id-grupo"
                                    onClick={() => {
                                      Falhou(tipo.id);
                                    }}
                                  >
                                    {moeda(tipo.valor)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="fixed-table td-fixo"
                                  >
                                    <button
                                      className="btn btn-dark"
                                      style={{
                                        marginRight: 15,
                                        marginLeft: 15,
                                      }}
                                      onClick={() => {
                                        Falhou(tipo.id);
                                      }}
                                    >
                                      Falhou
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <div
                              style={{ margin: 'auto' }}
                              className="alert alert-warning alerta-grupo2"
                              role="alert"
                            >
                              Nenhum Pedido em Pendente.
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
