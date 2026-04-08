import React, { useEffect, useMemo, useState } from 'react';
import '../Vendedor/CadastroVendedores.scss';
import '../../styles/global.scss';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Alert from '../../components/Alert';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TfiNewWindow } from 'react-icons/tfi';
import Select from 'react-select';
import { iDadosUsuario, iDataSelect, iUsuarios } from '../../@types';

interface iEmailEnvio {
  id: number;
  usuarioId: number;
  email: string;
  usuarioUsername?: string;
  usuarioNomeCompleto?: string;
}

export default function EmailEnvioPedidos() {
  const history = useNavigate();

  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [msgErro, setMsgErro] = useState('');

  const [show, setShow] = useState(false);
  const [inInsert, setInInsert] = useState(false);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);

  let [emailEnvios, setEmailEnvios] = useState<iEmailEnvio[]>([]);
  let [usuarios, setUsuarios] = useState<iUsuarios[]>([]);

  const [usuarioId, setUsuarioId] = useState(0);
  const [email, setEmail] = useState('');
  const [idEdit, setIdEdit] = useState(0);

  const usuariosSelect = useMemo(() => {
    const options: Array<iDataSelect> = new Array<iDataSelect>();
    (usuarios || []).forEach((u) => {
      const label = `${u.username} - ${u.nomeCompleto}`;
      options.push({ value: String(u.id), label });
    });
    return options;
  }, [usuarios]);

  const emailEnviosFiltrados = useMemo(() => {
    const lista = Array.isArray(emailEnvios) ? emailEnvios : [];
    if (!filter || !search.trim()) {
      return lista;
    }

    const s = search.trim().toLowerCase();
    return lista.filter((e) => {
      const u = (e.usuarioUsername || '').toLowerCase();
      const n = (e.usuarioNomeCompleto || '').toLowerCase();
      return u.includes(s) || n.includes(s);
    });
  }, [emailEnvios, filter, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!usuariolog.token) {
      history('/');
      return;
    }
    GetUsuarios();
    GetEmailEnvios();
  }, []);

  function handleClose() {
    setShow(false);
    setInInsert(false);
    setAlertErroRegister(false);
    LimparForm();
  }

  function handleShow() {
    setShow(true);
  }

  function LimparForm() {
    setUsuarioId(0);
    setEmail('');
    setIdEdit(0);
  }

  function handleNovo() {
    setInInsert(true);
    LimparForm();
    handleShow();
  }

  function handleEditar(item: iEmailEnvio) {
    setInInsert(true);
    setIdEdit(item.id);
    setUsuarioId(item.usuarioId);
    setEmail(item.email || '');
    handleShow();
  }

  function handleShowMensage(mensagem: string) {
    setAlertErroMensage(true);
    setMsgErro(mensagem);
    setTimeout(function () {}, 1200);
  }

  async function GetUsuarios() {
    await api
      .get(`/api/Usuario?pagina=1&totalpagina=999`)
      .then((response) => {
        setUsuarios(response.data.data || []);
        usuarios = response.data.data || [];
      })
      .catch(() => {});
  }

  async function GetEmailEnvios() {
    setLoading(true);
    await api
      .get(`/api/EmailEnvio`)
      .then((response) => {
        setEmailEnvios(response.data || []);
        emailEnvios = response.data || [];
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  async function Salvar() {
    if (usuarioId <= 0) {
      setAlertErroRegister(true);
      setMsgErro('É obrigatório selecionar o usuário.');
      return;
    }
    if (!email.trim()) {
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o email.');
      return;
    }

    setLoadingCreate(true);
    await api
      .post(`/api/EmailEnvio`, {
        id: idEdit,
        usuarioId: usuarioId,
        email: email.trim(),
      })
      .then(() => {
        setLoadingCreate(false);
        handleClose();
        GetEmailEnvios();
        handleShowMensage('Email salvo com sucesso.');
      })
      .catch((error) => {
        setLoadingCreate(false);
        const data = error?.response?.data;
        setAlertErroRegister(true);
        setMsgErro(String(data || 'Não foi possível salvar.'));
      });
  }

  async function Excluir(id: number) {
    await api
      .delete(`/api/EmailEnvio/${id}`)
      .then(() => {
        GetEmailEnvios();
        handleShowMensage('Email excluído com sucesso.');
      })
      .catch((error) => {
        const data = error?.response?.data;
        handleShowMensage(String(data || 'Não foi possível excluir.'));
      });
  }

  function Pesquisar(e: any) {
    e.preventDefault();
    setFilter(true);
  }

  function LimparPesquisa() {
    setSearch('');
    setFilter(false);
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
              <h1>Emails Envio Pedidos</h1>
            </div>

            {alertErroMensage && (
              <div className="mt-3 mb-0">
                <Alert msg={msgErro} setAlertErro={setAlertErroMensage} />
              </div>
            )}

            {loading ? (
              <div className="d-flex justify-content-center total-loading">
                <div className="div-loading">
                  <div className="spinner-border" role="status"></div>
                  <h2 className="sr-only">Carregando...</h2>
                </div>
              </div>
            ) : (
              <div style={{ justifyContent: 'center' }} className="contain d-flex">
                <div className="conteudo">
                  <div className="div-button-top">
                    <div className="pesBloco"></div>
                    <div style={{ height: '40px !important' }} className="div-button-top">
                      <OverlayTrigger
                        placement={'top'}
                        delay={{ show: 100, hide: 250 }}
                        overlay={<Tooltip>Novo</Tooltip>}
                      >
                        <button
                          style={{ marginRight: 15 }}
                          className="btn btn-dark btn-direito btn-acao-sm"
                          onClick={handleNovo}
                        >
                          Novo{' '}
                          <TfiNewWindow
                            style={{ marginLeft: 8, marginBottom: 5 }}
                          />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </div>

                  {alertErroRegister && (
                    <div className="mt-3 mb-0">
                      <Alert msg={msgErro} setAlertErro={setAlertErroRegister} />
                    </div>
                  )}

                  <form
                    onSubmit={Pesquisar}
                    style={{ marginTop: 10, width: '100%' }}
                    className="conteudo-botoes"
                  >
                    <div className="bloco-pesquisa-input blocoGrupoInputs">
                      <div className="divinputNome">
                        <p className="title-input">Pesquisar por nome de usuário:</p>
                        <input
                          id="nomePesquisa"
                          type="text"
                          className="form-control select inputparceiro "
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setAlertErroRegister(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="pesquisa-div">
                      <button
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-dark btn-pesquisas btn-pesquisar"
                        type="submit"
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
                        <AiOutlineClear style={{ marginLeft: 6 }} fontSize={13} />
                      </button>
                    </div>
                  </form>

                  <div className="table-responsive table-scroll tabela-responsiva">
                    <div className=" table-wrap">
                      <Table responsive className="table-global table  main-table">
                        <thead>
                          <tr className="tituloTab">
                            <th className="th1 Nome-completo">Usuário</th>
                            <th className="th1 Nome-completo">Email</th>
                            <th style={{ textAlign: 'center' }} className="th4 fixed-table">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {emailEnviosFiltrados.length > 0 ? (
                            <>
                              {emailEnviosFiltrados.map((item, index) => (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    handleEditar(item);
                                  }}
                                >
                                  <td className="Nome-completo">
                                    {(item.usuarioUsername || '') +
                                      (item.usuarioNomeCompleto
                                        ? ` - ${item.usuarioNomeCompleto}`
                                        : '')}
                                  </td>
                                  <td className="Nome-completo">{item.email}</td>
                                  <td style={{ textAlign: 'center' }} className="fixed-table td-fixo">
                                    <OverlayTrigger
                                      placement={'right'}
                                      delay={{ show: 100, hide: 250 }}
                                      overlay={<Tooltip>Excluir</Tooltip>}
                                    >
                                      <button
                                        className="btn btn-table btn-excluir"
                                        style={{
                                          marginRight: 15,
                                          marginLeft: 15,
                                          backgroundColor: '#dc3545',
                                          borderColor: '#dc3545',
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          Excluir(item.id);
                                        }}
                                      >
                                        <RiDeleteBin5Line color="#fff" />
                                      </button>
                                    </OverlayTrigger>
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <tr>
                              <td colSpan={3}>
                                <div className="alert alert-warning alerta-Vendedor" role="alert">
                                  Nenhum email encontrado.
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal className="modal-cadastro-vendedor" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1>{idEdit > 0 ? 'Editar Email' : 'Novo Email'}</h1>
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
                <div className="coluna-dupla coluna-dupla-menu">
                  <div className="bloco-input bloco-menu-cad">
                    <p className="title-input">
                      Usuário: <span style={{ color: 'red' }}>*</span>
                    </p>
                    <Select
                      id="usuarioId"
                      className="inputparceiro"
                      placeholder="Digite ou selecione"
                      noOptionsMessage={() => 'Nenhum usuário encontrado'}
                      options={usuariosSelect}
                      value={
                        usuarioId > 0
                          ? usuariosSelect.find((o) => String(o.value) === String(usuarioId))
                          : null
                      }
                      onChange={(value: any) => {
                        const id = Number(value?.value || 0);
                        setUsuarioId(id);

                        const existente = (emailEnvios || []).find(
                          (x) => x.usuarioId === id
                        );
                        if (existente?.email) {
                          setIdEdit(existente.id);
                          setEmail(existente.email);
                          return;
                        }

                        const u = (usuarios || []).find((x) => x.id === id);
                        if (u?.email) {
                          setIdEdit(0);
                          setEmail(u.email);
                          return;
                        }

                        setIdEdit(0);
                        setEmail('');
                      }}
                    />
                  </div>

                  <div className="bloco-input bloco-menu-cad">
                    <p className="title-input">
                      Email: <span style={{ color: 'red' }}>*</span>
                    </p>
                    <input
                      id="email-envio"
                      type="text"
                      className="form-control select inputparceiro"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setAlertErroRegister(false);
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-danger btn-acao-sm"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark btn-acao-sm"
                    onClick={Salvar}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
