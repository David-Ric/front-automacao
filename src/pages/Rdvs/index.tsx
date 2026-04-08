import React, { useEffect, useRef, useState } from 'react';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../../assets/ole-logo.png';
import PhotoUser from '../../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import ChampGif from '../assets/playy.gif';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
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
import { iRdvs } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iVendedores, iDadosUsuario } from '../../@types';
import { BiSearchAlt } from 'react-icons/bi';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';
import { faL } from '@fortawesome/free-solid-svg-icons';

import { SiMicrosoftexcel } from 'react-icons/si';
import { useDownloadExcel } from 'react-export-table-to-excel';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import { GrDocumentPdf } from 'react-icons/gr';
import autoTable from 'jspdf-autotable';
import { TextOptionsLight } from 'jspdf';



export default function CadastroRdvs() {
  const history = useNavigate();
  const [usuario, setUsuario] = useState('');
  
  const [codVendedor, setCodVendedor] = useState('');
  const [codRdv, setCodRdv] = useState('');
  const [NomeCliente, setNomeCliente] = useState('');
  const [Observacao, setObservacao] = useState('');
  const [Municipio, setMunicipio] = useState('');
  const [Uf, setUf] = useState('');
  const [DataVisita, setDataVisita] = useState('');
  const [Horaini, setHoraini] = useState('');
  const [Horafin, setHorafin] = useState('');
  const [Objetivo, setObjetivo] = useState('');
  const [VendedorId, setVendedorId] = useState('');
  const [km, setKm] = useState('');

  
  const [valor_hora, setValor_hora] = useState(0);
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

  let [rdvs, setRdv] = useState<iRdvs[]>([]);
  let [rdvGetId, setRdvGetId] = useState<iRdvs[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);

  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);

  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  let [search, setSearch] = useState('');
  let [dataEntrega, setDataentrega] = useState('');
  const [codSearch, setCodSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(1000);
  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaStatus, setPesquisaStatus] = useState(false);
  const [pesquisaCod, setPesquisaCod] = useState(false);
  const [pesParceiroNome, setPesParceiroNome] = useState(true);
  const [pesParceiroId, setPesParceiroId] = useState(false);
  const [pesGerenteNome, setPesGerenteNome] = useState(true);
  const [pesGerenteId, setPesGerenteId] = useState(false);
  const [pesFuncionarioNome, setPesFuncionarioNome] = useState(true);
  const [pesFuncionarioId, setPesFuncionarioId] = useState(false);
  const [pesEmpresaNome, setPesEmpresaNome] = useState(true);
  const [pesEmpresaId, setPesEmpresaId] = useState(false);
  const [showloading, setShowloading] = useState(true);
  const handleCloseloading = () => setShowloading(false);
  const [sucess, setSucess] = useState(0);

  let [dataInicial, setDataInicial] = useState('');
  let [dataFinal, setDataFinal] = useState('');

  //===============================================================//
  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const codVen = usuariolog.username;

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
      GetRdvsFilter();
    } else {
      GetRdvs();
    }
  }, [pagina]);

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
    setNomeCliente('');
    setCodRdv('');
        
    setShow(true);
  }

  async function GetRdvs() {
    setFilter(false);
    setSucess(50);
    await api

      .get(`/api/RDV?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setNomeCliente(response.data.data[0].nome);
        setRdv(response.data.data);
        rdvs = response.data.data;
        console.log('vendedor', rdvs);
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        setSucess(100);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setSucess(100);
        setShowloading(false);
      });
  }

  async function GetRdvsFilter() {
    setFilter(true);
    if (pesquisaCod) {
      await api
        .get(
          `/api/Rdv/filter/codigo?pagina=${pagina}&totalpagina=${qtdePagina}&codigo=${search}`
        )
        .then((response) => {
          setRdv(response.data.data);
          rdvs = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa cod', response.data.data);
          console.log('total vendedores', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaNome) {
      await api
        .get(
          `/api/Rdv/filter?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setRdv(response.data.data);
          rdvs = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa', rdvs);
          console.log('total vendedores', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaStatus) {
      await api
        .get(
          `/api/Rdv/filter/status?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setRdv(response.data.data);
          rdvs = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa', rdvs);
          console.log('total vendedores', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  function ShowModalEdit() {
    if (codVen === VendedorId.toString()) {
      setShowEdit(true);
    } else {
      setLoadingUpdate(false);
      handleShowMensage();
      setAlertErroMensage(true);
      setMsgErro('Seu usuário não tem acesso a alterar este Rdv.');
      setShowEdit(false);
    }
    
  }

  //=========== get usuarios por ID ==================================//
  async function GetRdvId(id: any) {
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/Rdv/${id}`)
      .then((response) => {
        setRdvGetId(response.data.id);
        rdvGetId = response.data.id;
        setNomeCliente(response.data.nomeCliente);
        setCodRdv(response.data.id);
        setObservacao(response.data.observacao);
        setMunicipio(response.data.municipio);
        setUf(response.data.uf);
        setDataVisita(response.data.data.substring(0, 10));
        setHoraini(response.data.horaIni);
        setHorafin(response.data.horaFin);
        setObjetivo(response.data.objetivo);
        setVendedorId(response.data.vendedorId);
        setKm(response.data.km);
        console.log('vendedor Id', response.data.substring(0, 10));
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar Usuario ===============================//
  async function editRdv() {
    console.log('id', rdvGetId);
    setLoadingUpdate(true);
    await api
      .put(`/api/RDV/${rdvGetId}`, {
        id: rdvGetId,
        nomeCliente: NomeCliente,
        observacao: Observacao,
        municipio: Municipio,
        uf: Uf,
        data: DataVisita,
        horaIni: Horaini,
        horaFin: Horafin,
        objetivo: Objetivo.toString(),
        vendedorId: codVen,
        km: km
      })
      .then((response) => {
        handleCloseEdit();
        GetRdvs();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados do Rdv atualizados com sucesso.');
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
  //============ Criar Usuario ===============================//
  async function CreateRdv() {
    if (NomeCliente.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('txtnomeCliente');
      document.getElementById('txtnomeCliente')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o nome do cliente.');
      return;
    }

    setLoadingCreate(true);
    await api
      .post('/api/Rdv', {
        id: 0,
        nomeCliente: NomeCliente,
        observacao: Observacao,
        municipio: Municipio,
        uf: Uf,
        data: DataVisita,
        horaIni: Horaini,
        horaFin: Horafin,
        objetivo: 0,
        vendedorId: codVen,
        km: km
      })

      .then((response) => {
        setLoadingCreate(false);
        GetRdvs();
        handleClose();
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados do Rdv criado com sucesso.');

      })
      .catch((error) => {
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
  //==== EXCLUIR GRUPO ======================================
  async function DeleteVendedor(id: any) {
    setLoadingUpdate(true);
    await api
      .delete(`/api/Vendedor/${id}`)
      .then((response) => {
        handleCloseEdit();
        GetRdvs();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Vendedor excluído com sucesso.');
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
    PesquisaNome();
    setPagina(1);
    setFilter(false);
    GetRdvs();
  }

  function PesquisaNome() {
    setSearch('');
    GetRdvs();
    setPesquisaNome(true);
    setPesquisaStatus(false);
    setPesquisaCod(false);
  }

  function PesquisaStatus() {
    setSearch('');
    GetRdvs();
    setPesquisaNome(false);
    setPesquisaStatus(true);
    setPesquisaCod(false);
  }

  function PesquisaCod() {
    setSearch('');
    GetRdvs();
    setPesquisaCod(true);
    setPesquisaNome(false);
    setPesquisaStatus(false);
  }

  //========== pesquisas de insert ============//

  //=======parceiro==================//
  function PesquisaParceiroNome() {
    setPesParceiroNome(true);
    setPesParceiroId(false);
  }

  function PesquisaParceiroCod() {
    setPesParceiroNome(false);
    setPesParceiroId(true);
  }
  //=======gerente==================//
  function PesquisaGerenteNome() {
    setPesGerenteNome(true);
    setPesGerenteId(false);
  }

  function PesquisaGerenteCod() {
    setPesGerenteNome(false);
    setPesGerenteId(true);
  }
  //=====empresa=====================//

  function PesquisaEmpresaNome() {
    setPesEmpresaNome(true);
    setPesEmpresaId(false);
  }

  function PesquisaEmpresaCod() {
    setPesEmpresaNome(false);
    setPesEmpresaId(true);
  }
  //=====funcionario=====================//

  function PesquisaFuncionarioNome() {
    setPesFuncionarioNome(true);
    setPesFuncionarioId(false);
  }

  function PesquisaFuncionarioCod() {
    setPesFuncionarioNome(false);
    setPesFuncionarioId(true);
  }

  //===========================================//
  function Pesquisa(event: any) {
    event.preventDefault();
    if (search != '') {
      setPagina(1);
      GetRdvsFilter();
    }

    if (search == '') {
      LimparPesquisa();
    }
  }


  function formatDate(dateTimeString: any) {
    const datePart = dateTimeString.substr(0, 20);
    const day      = datePart.substr(8, 2);
    const month    = datePart.substr(5, 2);
    const year     = datePart.substr(0, 4);
    const time    = datePart.substr(11, 8);
    return `${day}/${month}/${year}`;
  }

  //==função data retro=====================
  var dataAtu = new Date();
  var dia = String(dataAtu.getDate()).padStart(2, '0');
  var mes = String(dataAtu.getMonth() + 1).padStart(2, '0');
  var ano = dataAtu.getFullYear();
  var dataAtual = ano + '-' + mes + '-' + dia;


  //========verifica data ======================================//
  function verificaDataVisita() {
    if (DataVisita < dataAtual) {
      let senhaconf: any;
      senhaconf = document.getElementById('dataVisita');
      document.getElementById('dataVisita')?.focus();
      setAlertErro(true);
      setMsgErro('Data de visita não pode ser menor que data atual. (*)');

      return;
    }
  }

  //========verifica data ======================================//
  function verificaDataInicial() {
    if (dataInicial < dataFinal) {
      let senhaconf: any;
      senhaconf = document.getElementById('dataEntrega');
      document.getElementById('dataEntrega')?.focus();
      setAlertErro(true);
      setMsgErro('Data de inicla não pode ser menor que data final. (*)');

      return;
    }
  }

  function LimparErro() {
    setAlertErro(false);
  }

  const tableRef = useRef(null);

  //==============excel=============================================================
  const handleDownloadExcel = () => {
    const tableElement = document.querySelector(
      '#MyTable'
    ) as HTMLElement | null;
    if (!tableElement) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const firstHeaderCells = tableElement.querySelectorAll(
      'thead tr:nth-child(1) th'
    );
    firstHeaderCells.forEach((cell, index) => {
      const excelCell = worksheet.getCell(1, index + 1);
      excelCell.value = cell.textContent;
      excelCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCCCCC' },
      };
    });

    const secondHeaderCells = tableElement.querySelectorAll(
      'thead tr:nth-child(2) th'
    );
    secondHeaderCells.forEach((cell, index) => {
      const excelCell = worksheet.getCell(2, index + 1);
      excelCell.value = cell.textContent;
      excelCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCCCCC' },
      };
    });

    const rows = tableElement.querySelectorAll('tbody tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, cellIndex) => {
        const excelCell = worksheet.getCell(rowIndex + 3, cellIndex + 1);
        excelCell.value = cell.textContent;
      });
    });

    worksheet.columns.forEach((column, columnIndex) => {
      if (columnIndex >= 3 && columnIndex <= 8) {
        column.alignment = { horizontal: 'right' };
      }
      if (columnIndex === 1) {
        column.width = 50;
      } else {
        if (column.width) {
          column.width = Math.max(column.width, 20);
        } else {
          column.width = 20;
        }
      }
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const data = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'arquivo.xlsx';
      link.click();
    });
  };


  function Finalizar() {
    setSucess(50);
    setTimeout(function () {
      setLoading(false);
    }, 1000);
  }


  function DataAtual() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    setDataentrega(ano + '-' + mes + '-' + dia);
    dataEntrega = ano + '-' + mes + '-' + dia;
    setDataInicial(ano + mes + dia);
    console.log('data', dataEntrega);
  }

//========verifica data ======================================//
function verificaDataEntrega() {
  if (dataEntrega < dataAtual) {
    let senhaconf: any;
    senhaconf = document.getElementById('dataEntrega');
    document.getElementById('dataEntrega')?.focus();
    setAlertErro(true);
    setMsgErro('Data de entrega não pode ser menor que data atual. (*)');

    return;
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
              <h1>Rdvs</h1>
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
                      <div className="d-flex div-parceiros-pesquisa">
                        <input
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaNome}
                          onChange={PesquisaNome}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Nome</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaCod}
                          onChange={PesquisaCod}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Código</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaStatus}
                          onChange={PesquisaStatus}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Status</p>
                      </div>


                    </div>
                    <OverlayTrigger
                      placement={'top'}
                      delay={{ show: 100, hide: 250 }}
                      overlay={<Tooltip>Novo Rdv</Tooltip>}
                    >
                      <button
                        className="btn btn-dark btn-direito"
                        onClick={handleShow}
                      >
                        Novo{' '}
                        <TfiNewWindow
                          style={{ marginLeft: 8, marginBottom: 5 }}
                        />
                      </button>
                    </OverlayTrigger>
                  </div>
                  
                  <div
                    style={{ marginTop: 10, width: '100%' }}
                    className="conteudo-botoes"
                  >
                    <form onSubmit={Pesquisa} className="bloco-pesquisa-input">
                      {pesquisaCod ? (
                        <>
                          <div className="codPesquisa">
                            <p className="title-input">Código: </p>
                            <input
                              id="input-cod"
                              type="text"
                              className="form-control select inputparceiro input-cod-Pesquisa "
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                search = e.target.value;
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaNome ? (
                        <>
                          <div>
                            <p className="title-input">Nome: </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select inputparceiro "
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                search = e.target.value;
                              }}
                            />
                          </div>
                          
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaStatus ? (
                        <>
                          <div className="div-pesquisa-status">
                            <p className="title-input">Status: </p>
                            <select
                              id="statusPesquisa"
                              className="form-select select inputparceiro  campo-select"
                              aria-label=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                search = e.target.value;
                                setPagina(1);
                                GetRdvsFilter();
                              }}
                            >
                              <option value=""></option>
                              <option value="S">Ativo</option>
                              <option value="N">Inativo</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </form>

                    <div className="pesquisa-div">
                      <button
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-primary btn-pesquisas btn-pesquisar"
                        onClick={() => {
                          setPagina(1);
                          GetRdvsFilter();
                        }}
                      >
                        Pesquisar
                        <FaSearchPlus style={{ marginLeft: 6 }} fontSize={12} />
                      </button>
                      <button
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
                    <div className="div-btn-expRdv">
                        <SiMicrosoftexcel
                          fontSize={35}
                          onClick={handleDownloadExcel}
                          className="btn-Export"
                        />
                      </div>                      


                  </div>
                  <div className="table-responsive table-scroll tabela-responsiva">
                    <div className=" table-wrap">
                      <Table
                        ref={tableRef}
                        id="MyTable"
                        responsive
                        className="table-global table  main-table"
                      >
                        <thead>
                          <tr className="tituloTab">
                            <th
                              style={{ width: 100, textAlign: 'center' }}
                              className="th1 cod-grupo"
                            >
                              Código
                            </th>
                            <th className="th1 Nome-completo td-codigo">
                              Nome Clientes
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              Data da Visita
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              H.Inical
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              H.Final
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              Objetivo da Visita
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              Km Rodados
                            </th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th4 "
                            >
                              Observação
                            </th>
                            <th
                              style={{
                                textAlign: 'center',
                                color: 'transparent',
                              }}
                              className="th4 "
                            >
                              ..........
                            </th>
                            <th
                              style={{
                                textAlign: 'center',
                                color: 'transparent',
                              }}
                              className="th4 "
                            >
                              ..........
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
                          {rdvs.length > 0 ? (
                            <>
                              {rdvs.map((rdvs) => (
                                <tr
                                  onClick={() => {
                                    GetRdvId(rdvs.id);
                                    //console.log('id ', rdvs.id);
                                    //console.log('id ', rdvs.vendedorId);
                                    //ShowModalEdit();
                                    if (codVen === rdvs.vendedorId.toString() || codVen === "admin"  ) {
                                      setShowEdit(true);
                                    } else {
                                      handleShowMensage();
                                      setAlertErroMensage(true);
                                      setMsgErro('Seu usuário não tem acesso a alterar este Rdv.');
                                      setShowEdit(false);
                                    }



                                  }}
                                >
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="td-codigo"
                                  >
                                    {rdvs.id}
                                  </td>
                                  <td className="Nome-completo">
                                    {rdvs.nomeCliente}
                                  </td>

                                  <td
                                    style={
                                      rdvs.observacao == 'S'
                                        ? {
                                            color: '#008000',
                                            textAlign: 'center',
                                          }
                                        : { color: 'red', textAlign: 'center' }
                                    }
                                  >
                                    {formatDate(rdvs.data)}
                                  </td>
                                                                    
                                  <td className="HInicial">
                                    {rdvs.horaIni}
                                  </td>

                                  <td className="HFinal">
                                    {rdvs.horaFin}
                                  </td>

                                  <td style={{ textAlign: 'center' }}>
                                    { rdvs.objetivo == '1'
                                      ? 'Vendas'
                                      : rdvs.objetivo == '2'
                                      ? 'Relacionamento'
                                      : rdvs.objetivo == '3'
                                      ? 'Prospecção'
                                      : rdvs.objetivo == '4'
                                      ? 'Negociação'
                                      : rdvs.objetivo == '5'
                                      ? 'Treinamento'
                                      : rdvs.objetivo == '6'
                                      ? 'Reunião'
                                      : rdvs.objetivo == '7'
                                      ? 'RCA'
                                      : rdvs.objetivo == '8'
                                      ? 'GA'
                                      : rdvs.objetivo == '9'
                                      ? 'Visita PDV'
                                      : rdvs.objetivo == '10'
                                      ? 'Home Office'
                                      : 'Outros'}
                                  </td>

                                  <td style={{ textAlign: 'center' }} className="Km" >
                                    {rdvs.km}
                                  </td>

                                  <td
                                    style={
                                      rdvs.nomeCliente == null ||
                                      rdvs.nomeCliente == ''
                                        ? { color: 'red', textAlign: 'center' }
                                        : { color: '#000', textAlign: 'center' }
                                    }
                                  >
                                    {rdvs.observacao
                                      ? rdvs.observacao
                                      : 'Não informado'}
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
                                          GetRdvId(rdvs.id);
                                          //console.log('id ', rdvs.id);
                                          //console.log('id ', rdvs.vendedorId.toString());
                                          //ShowModalEdit();
                                          if (codVen === rdvs.vendedorId.toString()  || codVen === "admin" ) {
                                            setShowEdit(true);
                                          } else {
                                            handleShowMensage();
                                            setAlertErroMensage(true);
                                            setMsgErro('Seu usuário não tem acesso a alterar este Rdv.');
                                            setShowEdit(false);
                                          }
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
                              className="alert alert-warning alerta-Vendedor"
                              role="alert"
                            >
                              Nenhum RDV encontrado.
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

        {/* ================ Modal Novo Rdv ============================================== */}

        <Modal
          className="modal-novo-rdv"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <h1>Novo de Rdvs</h1>
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
                <div className="form-cadastro-rdv">
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-codigo">
                      <p className="title-input">Código: </p>
                      <input
                        className="form-control select inputparceiro "
                        id="txtCodRdv"
                        type="text"
                        disabled
                        value={codRdv}
                        onChange={(e) => {
                          setCodRdv(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>                    
                    <div className="bloco-input">
                      <p className="title-input">
                        Nome do Cliente: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro"
                        id="txtnomeCliente"
                        type="text"
                        value={NomeCliente}
                        onChange={(e) => {
                          setNomeCliente(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>

                  <div className="coluna-dupla">
                  <div className="bloco-input bloco-tipo">
                      <p className=" title-input">
                        Objetivo da Visita: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <select
                        className="form-select select inputparceiro  campo-select"
                        aria-label=""
                        value={Objetivo}
                        onChange={(e) => {
                          setObjetivo(e.target.value);
                        }}
                      >
                        <option value="1">Venda</option>
                        <option value="2">Relacionamento</option>
                        <option value="3">Prospecção</option>
                        <option value="4">Negociação</option>
                        <option value="5">Treinamento</option>
                        <option value="6">Reunião</option>
                        <option value="7">RCA</option>
                        <option value="8">GA</option>
                        <option value="9">Visita PDV</option>
                        <option value="10">Home Office</option>
                      </select>
                    </div>
                  </div> 
                  <div className="coluna-dupla">    
                      <div className="bloco-input bloco-datavisita">
                        <p className="title-input">Data Visita:</p>
                        <input
                                className="form-control select inputparceiro select-data-pedido"
                              id="dataEntrega"
                              type="date"
                              min={dataAtual}
                              max="2999-12-31"
                              value={DataVisita}
                              onBlur={verificaDataVisita}
                              onChange={(e) => {
                                setDataVisita(e.target.value);
                                dataEntrega = e.target.value;
                                console.log('data visita', DataVisita);
                                LimparErro();
                              }}
                          />
                      </div> 
                      </div> 
                      <div className="coluna-dupla">                      
                        <div className="bloco-input bloco-hinicio">
                          <p className="title-input">H.Inicio: </p>
                          <input
                            //style={{ width: '60px' }}  /* Ajuste o valor para o tamanho desejado */
                            className="form-control sselect inputparceiro"
                            id="txthinicio"
                            type="text"
                            value={Horaini}
                            onChange={(e) => {
                              setHoraini(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                          
                        </div>
                        <div className="bloco-input bloco-hfinal">
                          <p className="title-input">H.Final: </p>
                          <input
                            //style={{ width: '60px' }}  /* Ajuste o valor para o tamanho desejado */
                            className="form-control sselect inputparceiro"
                            id="txthinicio"
                            type="text"
                            value={Horafin}
                            onChange={(e) => {
                              setHorafin(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                        </div>

                    </div>
                    
                  
                  <div className="coluna-dupla">
                  <div className="bloco-input bloco-email">
                          <p className="title-input">Município: </p>
                          <input
                            className="form-control sselect inputparceiro"
                            id="hinicio"
                            type="text"
                            value={Municipio}
                            onChange={(e) => {
                              setMunicipio(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                        </div>

                    <div className="bloco-input bloco-regiao">
                      <p className="title-input">UF: </p>
                      <select
                        className="form-select select inputparceiro  campo-select"
                        aria-label=""
                        value={Uf}
                        onChange={(e) => {
                          setUf(e.target.value);
                        }}
                      >
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">RO</option>
                      </select>
                    </div>
                  </div>

                  <div className="coluna-dupla">
                  <div className="bloco-input bloco-observacao">
                      <p className="title-input">Observação: </p>
                      <input
                        className="form-control sselect inputparceiro"
                        id="observ"
                        type="text"
                        value={Observacao}
                        onChange={(e) => {
                          setObservacao(e.target.value.toLowerCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input bloco-km">
                      <p className="title-input">Km rodado: </p>
                      <input
                        className="form-control sselect inputparceiro"
                        id="km"
                        type="text"
                        value={km}
                        onChange={(e) => {
                          setKm(e.target.value.toLowerCase());
                          LimparTodos();
                        }}
                      />
                    </div>                    
                    </div>

                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-buttom-vendedor">
                      <button
                        disabled={loadingCreate}
                        id=""
                        className="btn btn-cadastrar-vendedor"
                        onClick={CreateRdv}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Edit Rdv ============================================== */}

        <Modal
          className="modal-edit-rdv"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Dados do Rdv</h1>
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
                    <div className="bloco-input bloco-codigo">
                      <p className="title-input">Código: </p>
                      <input
                        className="form-control select inputparceiro "
                        id="txtCodRdv"
                        type="text"
                        disabled
                        value={codRdv}
                        onChange={(e) => {
                          setCodRdv(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input">
                      <p className="title-input">
                        Nome do Cliente: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro "
                        id="txtNomeCliente"
                        type="text"
                        value={NomeCliente}
                        onChange={(e) => {
                          setNomeCliente(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>



                  
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-tipo">
                      <p className=" title-input">Objetivo da Visita: </p>
                      <select
                        className="form-select select inputparceiro campo-select"
                        aria-label=""
                        value={Objetivo}
                        onChange={(e) => {
                          setObjetivo(e.target.value);
                        }}
                      >
                        <option value="1">Venda</option>
                        <option value="2">Relacionamento</option>
                        <option value="3">Prospecção</option>
                        <option value="4">Negociação</option>
                        <option value="5">Treinamento</option>
                        <option value="6">Reunião</option>
                        <option value="7">RCA</option>
                        <option value="8">GA</option>
                        <option value="9">Visita PDV</option>
                        <option value="10">Home Office</option>
                      </select>
                    </div>
                  </div>


                  <div className="coluna-dupla">    
                      <div className="bloco-input bloco-datavisita">
                        <p className="title-input">Data Visita:</p>
                        <input
                              //style={{ width: '600px' }}  /* Ajuste o valor para o tamanho desejado */
                              className="form-control select inputparceiro select-data-pedido"
                              id="dataEntrega"
                              type="date"
                              min={dataAtual}
                              max="2999-12-31"
                              value={DataVisita}
                              onBlur={verificaDataVisita}
                              onChange={(e) => {
                                setDataVisita(e.target.value);
                                dataEntrega = e.target.value;
                                console.log('data visita', DataVisita);
                                LimparErro();
                              }}
                          />
                      </div> 
                      </div> 
                      <div className="coluna-dupla">                      
                        <div className="bloco-input bloco-hinicio">
                          <p className="title-input">H.Inicio: </p>
                          <input
                            //style={{ width: '60px' }}  /* Ajuste o valor para o tamanho desejado */
                            className="form-control sselect inputparceiro"
                            id="txthinicio"
                            type="text"
                            value={Horaini}
                            onChange={(e) => {
                              setHoraini(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                          
                        </div>
                        <div className="bloco-input bloco-hfinal">
                          <p className="title-input">H.Final: </p>
                          <input
                            //style={{ width: '60px' }}  /* Ajuste o valor para o tamanho desejado */
                            className="form-control sselect inputparceiro"
                            id="txthinicio"
                            type="text"
                            value={Horafin}
                            onChange={(e) => {
                              setHorafin(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                        </div>
                    </div>



                    <div className="coluna-dupla">
                  <div className="bloco-input bloco-email">
                          <p className="title-input">Município: </p>
                          <input
                            className="form-control sselect inputparceiro"
                            id="hinicio"
                            type="text"
                            value={Municipio}
                            onChange={(e) => {
                              setMunicipio(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                        </div>

                    <div className="bloco-input bloco-regiao">
                      <p className="title-input">UF: </p>
                      <select
                        className="form-select select inputparceiro  campo-select"
                        aria-label=""
                        value={Uf}
                        onChange={(e) => {
                          setUf(e.target.value);
                        }}
                      >
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">RO</option>
                      </select>
                    </div>
                  </div>


                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-observ">
                      <p className="title-input">Observação: </p>
                      <input
                        className="form-control select inputparceiro "
                        id="txtObservacao"
                        type="text"
                        value={Observacao}
                        onChange={(e) => {
                          setObservacao(e.target.value.toLowerCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input bloco-km">
                      <p className="title-input">Km rodado: </p>
                      <input
                        className="form-control sselect inputparceiro"
                        id="km"
                        type="text"
                        value={km}
                        onChange={(e) => {
                          setKm(e.target.value.toLowerCase());
                          LimparTodos();
                        }}
                      />
                    </div>                    
                    
                    
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-button-edit">
                      <button
                        disabled={loadingUpdate}
                        id=""
                        className="btn btn-cadastrar btn-edit-vend"
                        onClick={editRdv}
                      >
                        Salvar
                      </button>
                      <button
                        disabled={loadingUpdate}
                        id="b"
                        className="btn btn-cancelar btn-edit-vend"
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
          className="modal-confirma"
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
