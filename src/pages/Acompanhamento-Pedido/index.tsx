import React, { useEffect, useState } from 'react';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../assets/ole-logo.png';
import LogoAvatar from '../assets/avatar1.png';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { iDadosUsuario, Lista } from '../../@types';
import Accordion from 'react-bootstrap/Accordion';
import { phoneMask, moeda, moedaFloat } from '../../Masks/Masks';
import Table from 'react-bootstrap/Table';
import logoSankhya from '../../assets/logosankhya.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';
import logoAlyne from '../../assets/logo-dark.png';
import { useAppOnlineStatus } from '../../provider/PortalContext';

export default function AcompanhamentoPedido() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPed, setLoadingPed] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  let [sucess, setSucess] = useState(0);
  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  let [listaPedidos, setlistaPedidos] = useState<Lista[]>([]);
  let [pedidos, setpedidos] = useState<Lista[]>([]);
  let [pedidos2, setpedidos2] = useState<Lista[]>([]);
  const handleClosePedido = () => setShowPedido(false);
  const [showPedido, setShowPedido] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeAccordion2, setActiveAccordion2] = useState<string | null>(null);
  const [activeAccordion3, setActiveAccordion3] = useState<string | null>(null);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;
  const [showupdatePromotor, setShowupdatePromotor] = useState(false);
  const [showMensageSankhyaErro, setShowMensageSankhyaErro] = useState(false);
  function handleCloseupdatePromotor() {
    history('/espaco-colaborador');
  }

  function handleCloseMensageSankhyaErro() {
    history('/espaco-colaborador');
  }

  useEffect(() => {
    LoginSankhyaerro();
  }, []);

  async function LoginSankhyaerro() {
    console.log('entrou no login Sankhya');
    const sql = 'SELECT 1';
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then(() => {})
      .catch((error) => {
        setLoading(false);
        console.log('login sankhya ok F', error);
        setShowMensageSankhyaErro(true);
      });
  }

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOnline) {
      setShowupdatePromotor(false);
    } else {
      setShowupdatePromotor(true);
    }
  }, [isOnline]);

  useEffect(() => {
    window.scrollTo(0, 0);
    logado();
    GetgrupoUsuarioId();
  }, []);

  useEffect(() => {
    LoginSankhya();
  }, []);

  async function LoginSankhya() {
    console.log('entrou no login Sankhya');
    try {
      await ListaCobranca();
    } catch (error) {
      setLoading(false);
      console.log('erro', error);
    }
  }

  async function ListaCobranca() {
    console.log(
      'entrou na lista de cobranças........................................'
    );
    const codVen = usuario.username;
    const sql = `SELECT CODVEND, APELIDO, CODPARC, RAZAOSOCIAL, UF, NOMECID
                , ROUND(SUM(VLRPED),2)  VLRNOTA
                , COUNT(distinct NUNOTA) QTDPED
                FROM AD_VPEDAFATURAR PED
                WHERE CODVEND = ${codVen}
                GROUP BY CODVEND, APELIDO, CODPARC, RAZAOSOCIAL, UF, NOMECID`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('parceiros', response);
        setlistaPedidos(response.data.responseBody.rows);
        listaPedidos = response.data.responseBody.rows;
        console.log('listaPedidos', listaPedidos);
        setTimeout(function () {
          setLoading(false);
        }, 1200);
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  async function Listapedido(CodParc: any) {
    console.log('chamou pedido', CodParc);
    const codVen = usuario.username;
    const sql = ` SELECT AD_PALMPC, 
                    CODEMP, 
                    NUNOTA, 
                    DTNEG, 
                    PESO, 
                    VLRPED, 
                    VLRBON, 
                    CODTIPOPER, 
                    LIBCOM, 
                    LIBFIN, 
                    LIBEST 
                FROM AD_VPEDAFATURAR PED
                WHERE CODPARC = ${CodParc}
                ORDER BY NUNOTA`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('pedidos tot', response);
        setpedidos(response.data.responseBody.rows);
        pedidos = response.data.responseBody.rows;
        console.log('pedidos', pedidos);
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  async function Listapedio2(CodPalm: any) {
    setLoadingPed(true);
    setSucess(40);
    console.log('chamou pedido palm', CodPalm);
    const codVen = usuario.username;
    const sql = `SELECT AD_PALMPC
                      , CODEMP
                      , NUNOTA
                      , DTMOV
                      , FASE
                      
                  FROM sankhya.AD_GET_HIST_PALMPC('${CodPalm}')
                  ORDER BY NUNOTA`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('pedidos tot1', response);
        setpedidos2(response.data.responseBody.rows);
        pedidos2 = response.data.responseBody.rows;
        console.log('lista 2', pedidos2);
      })
      .catch((error) => {
        setLoading(false);
        setSucess(80);
        console.log('erro recebimento', error);
        setLoadingPed(false);
      });
    setLoadingPed(false);
  }

  function logado() {
    if (!usuario.token) {
      history('/');
    }
  }

  async function GetgrupoUsuarioId() {
    setLoading(true);
    await api

      .get(`/api/GrupoUsuario/${usuario.grupoId}`)
      .then((response) => {})
      .catch((error) => {
        console.log('Ocorreu um erro');
        setLoading(false);
      });
  }
  function formatDate(dateTimeString: any) {
    const datePart = dateTimeString.substr(0, 8);
    const day = datePart.substr(0, 2);
    const month = datePart.substr(2, 2);
    const year = datePart.substr(4, 4);
    return `${day}/${month}/${year}`;
  }

  //==========================================================//
  return (
    <>
      {loading ? (
        <div className="loadingGeral">
          <div className="loadingModal">
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
            <h1 style={{ marginTop: 15 }}></h1>
            <ProgressBar className="progress" animated now={sucess} />
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
                <h1>Acompanhamento Pedido</h1>
              </div>
              <div
                style={{ justifyContent: 'center' }}
                className="contain-pedido d-flex conteinerped-existente"
              >
                <div className="conteudo-acompanhamento">
                  <div
                    style={{ paddingLeft: 8, backgroundColor: '#c4c3c3' }}
                    className="conteudoBotalCliente"
                  >
                    <div className="parceiroAc">
                      <p>Parc.</p>
                    </div>
                    <div className="nomeAc">
                      <p>Razão Social</p>
                    </div>
                    <div className="municipioAc">
                      <p>Município</p>
                    </div>
                    <div className="ufAc">
                      <p>UF</p>
                    </div>
                    <div className="valorAc">
                      <p>Valor</p>
                    </div>
                    <div className="pedidoAc">
                      <p>Qtd. Pedidos</p>
                    </div>
                  </div>
                  {listaPedidos?.length > 0 ? (
                    <>
                      {listaPedidos?.map((item, index) => (
                        <Accordion
                          activeKey={
                            activeAccordion === String(index)
                              ? String(index)
                              : null
                          }
                          key={index}
                        >
                          <Accordion.Item eventKey={String(index)}>
                            <Accordion.Header
                              onClick={(prevIndex) => {
                                setActiveAccordion((prevIndex) =>
                                  prevIndex === String(index)
                                    ? null
                                    : String(index)
                                );
                                setActiveAccordion2(null);
                                setActiveAccordion3(null);
                                Listapedido(item[2]);
                              }}
                            >
                              <div className="conteudoBotalCliente">
                                <div className="parceiroAc">
                                  <p>{item[2]}</p>
                                </div>
                                <div className="nomeAc">
                                  <p>{item[3]}</p>
                                </div>
                                <div className="municipioAc">
                                  <p>{item[5]}</p>
                                </div>
                                <div className="ufAc">
                                  <p>{item[4]}</p>
                                </div>
                                <div className="valorAc">
                                  <p>{moeda(item[6])}</p>
                                </div>
                                <div className="pedidoAc">
                                  <p>{item[7]}</p>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{
                                  paddingLeft: 5,
                                  backgroundColor: '#c4c3c3',
                                }}
                                className="conteudoBotalCliente"
                              >
                                <div className="valorAc">
                                  <p>Nº. Pedido</p>
                                </div>
                                <div className="empresaAc">
                                  <p>Empresa</p>
                                </div>
                                <div className="empresaAc">
                                  <p>N. Unico</p>
                                </div>
                                <div className="valorAc">
                                  <p>Dt. Neg.</p>
                                </div>
                                <div className="valorAc">
                                  <p>Valor</p>
                                </div>
                                <div className="valorAc">
                                  <p>Vlr. Bonif.</p>
                                </div>
                                <div className="ufAc">
                                  <p>Top</p>
                                </div>
                              </div>
                              {pedidos?.map((item, index) => (
                                <Accordion
                                  activeKey={
                                    activeAccordion2 === String(index)
                                      ? String(index)
                                      : null
                                  }
                                  key={index}
                                >
                                  <Accordion.Item eventKey={String(index)}>
                                    <Accordion.Header
                                      id="accordionInt1"
                                      onClick={(prevIndex) => {
                                        setActiveAccordion2((prevIndex) =>
                                          prevIndex === String(index)
                                            ? null
                                            : String(index)
                                        );
                                        Listapedio2(item[0]);
                                        setShowPedido(true);
                                      }}
                                    >
                                      <div className="conteudoBotalCliente">
                                        <div className="valorAc">
                                          <p>{item[0]}</p>
                                        </div>
                                        <div className="empresaAc">
                                          <p>{item[1]}</p>
                                        </div>
                                        <div className="empresaAc">
                                          <p>{item[2]}</p>
                                        </div>
                                        <div className="valorAc">
                                          <p>{formatDate(item[3])}</p>
                                        </div>
                                        <div className="valorAc">
                                          <p>{moeda(item[5])}</p>
                                        </div>
                                        <div className="valorAc">
                                          <p>{moeda(item[6])}</p>
                                        </div>
                                        <div className="ufAc">
                                          <p>{item[7]}</p>
                                        </div>
                                      </div>
                                    </Accordion.Header>
                                  </Accordion.Item>
                                </Accordion>
                              ))}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      ))}
                    </>
                  ) : (
                    <>
                      <div
                        style={{ margin: 'auto' }}
                        className="alert alert-warning "
                        role="alert"
                      >
                        <h1 style={{ textAlign: 'center' }}>
                          Nenhum pedido encontrado para acompanhamento.
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* =====================modal sankhya========================================================== */}
            <Modal
              className="modal-acomp"
              show={showPedido}
              onHide={handleClosePedido}
              backdrop="static"
            >
              <Modal.Body>
                {loadingPed ? (
                  <div className="d-flex justify-content-center total-loading2">
                    <div className="loadingModal">
                      <img id="logoSankhya" src={logoSankhya} alt="" />
                      <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
                      <h1 style={{ marginTop: 15 }}></h1>
                      <ProgressBar className="progress" animated now={sucess} />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive  tabelaAcomp ">
                      <div className=" table-wrap">
                        <Table
                          responsive
                          className="table-global table  main-table"
                        >
                          <thead>
                            <tr className="tituloTab">
                              <th
                                style={{ textAlign: 'center' }}
                                className="nomecliente"
                              >
                                Pedido Palm
                              </th>
                              <th className="th1 id-grupo th-tabela-pedido">
                                Empresa
                              </th>
                              <th className=" nomecliente">Nº. Unico</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="valores"
                              >
                                Data Hora
                              </th>
                              <th
                                style={{ textAlign: 'left' }}
                                className="nomecliente"
                              >
                                Histórico
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pedidos2?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="nomecliente"
                                  >
                                    {lista[0]}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {lista[1]}
                                  </td>
                                  <td>{lista[2]}</td>
                                  <td className="nomecliente">{lista[3]}</td>
                                  <td
                                    style={{ textAlign: 'left' }}
                                    className="nomecliente"
                                  >
                                    {lista[4]}
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <button
                      style={{ width: 130, marginTop: 15 }}
                      className="btn btn-primary"
                      onClick={handleClosePedido}
                    >
                      Fechar
                    </button>
                  </>
                )}
              </Modal.Body>
            </Modal>
            {/* =================== modal dados atualizados ================================= */}
            <Modal
              className="modal-confirm"
              show={showupdatePromotor}
              onHide={handleCloseupdatePromotor}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <h1>Aviso Importante!</h1>
              </Modal.Header>
              <Modal.Body>
                <img id="logoSankhya" src={logoAlyne} alt="" />
                <h1 className="h1Promotor">
                  Você está sem conexão com a internet.
                </h1>
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={handleCloseupdatePromotor}
                >
                  Ok
                </button>
              </Modal.Body>
            </Modal>
            <Modal
              className="modal-confirmerror"
              show={showMensageSankhyaErro}
              onHide={handleCloseMensageSankhyaErro}
              backdrop="static"
            >
              <Modal.Body>
                <img id="logoSankhya" src={logoSankhya} alt="" />
                <h1 style={{ marginTop: 15 }}></h1>
                <h1 style={{ marginTop: 15 }}>
                  Erro de comunicação com servidor Sankhya!
                </h1>
                <h1 style={{ marginTop: 15 }}></h1>
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={handleCloseMensageSankhyaErro}
                >
                  Ok
                </button>
              </Modal.Body>
            </Modal>
          </div>
          <FooterMobile />
          <Footer />
        </>
      )}
    </>
  );
}
