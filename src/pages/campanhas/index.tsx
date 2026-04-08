import React, { useEffect, useRef, useState } from 'react';
import '../Dashboard/Circular-progress.scss';
import '../../styles/global.scss';
import Paginacao from '../../components/Paginacao/index';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../../assets/ole-logo.png';
import LogoAvatar from '../../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import ChampGif from '../assets/playy.gif';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import Table from 'react-bootstrap/Table';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  DashGrafico,
  iDadosUsuario,
  iDataSelect,
  iUsuarios,
} from '../../@types';
import Chart from 'react-apexcharts';
import { cnpjMask, moeda } from '../../Masks/Masks';

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { FiSun } from 'react-icons/fi';
import { BsFillSunFill } from 'react-icons/bs';
import ReactApexChart from 'react-apexcharts';
import { AiTwotoneCheckCircle } from 'react-icons/ai';
import logoSankhya from '../../assets/logosankhya.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import {
  ConnectingAirportsOutlined,
  RemoveRedEyeSharp,
} from '@mui/icons-material';
import logoAlyne from '../../assets/logo-dark.png';
import {
  graficoTotal,
  valorAnoAnterior,
  valorAnoAtual,
  valorTotalAno,
  vendaMes,
  vendaXmeta,
  metaMes,
  quantPedidoOrcamentoDash,
  valorPedidoOrcamentoDash,
  quantFaturarDash,
  valorFaturarDash,
  quantPedidoDash,
  valorPedidoDash,
  atualizarConstantes,
  clientesSemVendaDash,
  limparDadosDash,
  useAppOnlineStatus,
} from '../../provider/PortalContext';
import { loadingDash, loadingDashObserver } from '../../functions/FuncoesDash';
import FooterMobile from '../../components/Footer/FooterMobile';
import * as XLSX from 'xlsx';
import { SiMicrosoftexcel } from 'react-icons/si';
import { useDownloadExcel } from 'react-export-table-to-excel';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import { GrDocumentPdf } from 'react-icons/gr';
import autoTable from 'jspdf-autotable';
import { TextOptionsLight } from 'jspdf';
import { FaRegEye, FaRegFilePdf } from 'react-icons/fa';
import Select from 'react-select';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';

interface iCliente90dias {
  dias: number;
  codpar: number;
  nomepar: string;
  cgc_cpf: string;
  uf: string;
  nomecid: string;
  endereco: string;
  complemento: string;
  telefone: string;
  email: string;
  ult_nunota: string;
  dtneg: string;
  vlrnota: number;
  ativo: string;
  negociacao: string;
  tabpreco_ind: string;
  tabpreco_dis: string;
}

interface I90dias {
  Gercod: number;
  Gernome: string;
  Vencod: number;
  Vennome: string;
  Cli_90D: number;
}

interface Row {
  id: number;
  month: string;
  meta: number;
  actual: number;
  color: string;
}

interface RowConsult {
  cod: number;
  coord: string;
  codConsut: number;
  consult: string;
  vlrMeta: number;
  vlrVenda: number;
  leg: string;
}

interface RowConsultMes {
  cod: number;
  coord: string;
  vlrMeta: number;
  vlrVenda: number;
  leg: string;
}
interface RowCliente {
  cliente: string;
  quinto: number;
  quarto: number;
  terceiro: number;
  segundo: number;
  primeiro: number;
}
interface RowValor {
  valor: number;
}
interface iGraficoCoord {
  Mes: string;
  AnoAtual: number;
  AnoAnterior: number;
}
interface ICampanhasMes {
  Leg: string;
  Codigo: number;
  Vendedor: string;
  Mes: string;
  Meta: number;
  Valor: number;
}
interface ICampanhaCoordGer {
  Mes: string;
  Meta: number;
  Valor: number;
}

export default function Campanhas() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [nomeCampanha, setNomeCampanha] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMensage, setShowMensage] = useState(false);
  const [barras, setBarras] = useState(true);
  const [areas, setAreas] = useState(false);
  const [isExpanded, setExpendState] = useState(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [vendaXmeta, setVendaXmeta] = useState<Row[]>([]);
  const [vendaXmetaConsut, setVendaXmetaConsut] = useState<RowConsult[]>([]);
  const [vendaXmetaConsutAdm, setVendaXmetaConsutAdm] = useState<RowConsult[]>(
    []
  );
  const [totalGraficoCoord, settotalGraficoCoord] = useState<iGraficoCoord[]>(
    []
  );
  const [campanhaMes, setcampanhaMes] = useState<ICampanhasMes[]>([]);
  const [campanhaGeral, setcampanhaGeral] = useState<ICampanhasMes[]>([]);
  const [campanhaGeralCoord, setcampanhaGeralCoord] = useState<
    ICampanhaCoordGer[]
  >([]);
  const [totalGraficoCd, settotalGraficoCd] = useState<iGraficoCoord[]>([]);
  const [cli90D, setcli90D] = useState<I90dias[]>([]);
  const [vendaXmetaConsutMes, setMesVendaXmetaConsutMes] = useState<
    RowConsultMes[]
  >([]);
  const [consultorPesquisa, setconsultorPesquisa] = useState<iDataSelect[]>([]);
  const [clienteVendaMeta, setClienteVendaMeta] = useState<RowCliente[]>([]);
  let [clientes90dias, setclientes90dias] = useState<iCliente90dias[]>([]);
  const [MetaVendedor, setMetaVendedor] = useState<RowValor[]>([]);
  const [ValorVendedor, setValorVendedor] = useState<RowValor[]>([]);
  let [placeHolder, setPlaceHolder] = useState('TODOS');
  const [nomeConsultor, setNomeConsultor] = useState('');
  const [nomeConsultorDefault, setNomeConsultorDefault] = useState('TODOS');
  let [nomeConsultorEsc, setNomeConsultorEsc] = useState('TODOS');
  const [nomeVendedor, setNomeVendedor] = useState('');
  let [pesquisaVendedor, setpesquisaVendedor] = useState(true);
  let [pesquisaParceiro, setpesquisaParceiro] = useState(false);
  let [pesquisaProduto, setpesquisaProduto] = useState(false);
  const [visivel, setvisivel] = useState(false);
  const [visivel2, setvisivel2] = useState(false);
  let [totalPaginas, setTotalPaginas] = useState(0);
  let [totalPaginas90, setTotalPaginas90] = useState(0);
  let [totalPaginas90Cli, setTotalPaginas90Cli] = useState(0);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const [sucess, setSucess] = useState(0);

  const [showupdatePromotor, setShowupdatePromotor] = useState(false);
  function handleCloseupdatePromotor() {
    history('/espaco-colaborador');
  }

  function handleCloseMensageSankhyaErro() {
    history('/espaco-colaborador');
  }
  const [showMensageSankhyaErro, setShowMensageSankhyaErro] = useState(false);

  useEffect(() => {
    LoginSankhya();
  }, []);

  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOnline) {
      setShowupdatePromotor(false);
    } else {
      setShowupdatePromotor(true);
    }
  }, [isOnline]);

  const [dadosArray, setDadosArray] = useState([]);
  const [vlanoAnteriorArray, setVlanoAnteriorArray] = useState<Array<number>>(
    []
  );
  const [vlanoAtualArray, setVlanoAtualArray] = useState<Array<number>>([]);
  const [vlanoAtualTotal, setVlanoAtualTotal] = useState(0);
  const [mesEscolhido, setmesEscolhido] = useState('0');
  const [mesAescolhido, setmesAescolhido] = useState('0');
  let [Anoescolhido, setAnoescolhido] = useState('');
  let [AnoFilter, setAnoFilter] = useState('');
  const anoAtual = new Date().getFullYear();
  const anoAnterior = anoAtual - 1;
  const [valorTotalAnoConsult, setvalorTotalAnoConsult] = useState(0);
  const [valorTotalMetaConsult, setvalorTotalMetaConsult] = useState(0);
  let [pagina, setPagina] = useState(1);
  let [pagina90, setPagina90] = useState(1);
  let [pagina90Cli, setPagina90Cli] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(15);
  const [valorTotalAnoTot, setvalorTotalAnoTot] = useState(0);
  const [valorTotalMetaTot, setvalorTotalMetaTot] = useState(0);
  let [valorTotalMetaCamp, setvalorTotalMetaCamp] = useState(0);
  let [valorTotalValorCamp, setvalorTotalValorCamp] = useState(0);
  let [valorTotalMetaCampGer, setvalorTotalMetaCampGer] = useState(0);
  let [valorTotalValorCampGer, setvalorTotalValorCampGer] = useState(0);

  const [valorTotalFaltou, setvalorTotalFaltou] = useState(0);
  const [valorTotalPassou, setvalorTotalPassou] = useState(0);
  const [codGerente, setcodGerente] = useState('');
  const valorTotalAno: number = JSON.parse(
    localStorage.getItem('@Portal/dash/SomaVrlAtual') || '0'
  );

  const valorTotalMeta: number = JSON.parse(
    localStorage.getItem('@Portal/dash/SomaMeta') || '0'
  );

  function getMonths() {
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const result = [];
    for (let i = 4; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      result.push(months[monthIndex]);
    }

    return result.reverse();
  }

  const months = getMonths();

  const handleCloseMensageSankhya = () => setShowMensageSankhya(false);
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);

  const handleCloseModalVendaXMeta = () => setShowModalVendaXMeta(false);
  const [showModalVendaXMeta, setShowModalVendaXMeta] = useState(false);

  function handleCloseModal90dias() {
    setShowModal90dias(false);
    setPagina90Cli(1);
    setclientes90dias([]);
    clientes90dias = [];
  }
  const [showModal90dias, setShowModal90dias] = useState(false);

  loadingDashObserver.subscribe((loadingDashValue: any) => {
    console.log(
      'loadingDash mudou para..............................................',
      loadingDashValue
    );
    setLoading(loadingDashValue);
  });
  const valorAnoAtualC = JSON.parse(
    localStorage.getItem('@Portal/dash/valorAtualCoord') || '{}'
  );
  const valorAnoAnteriorC = JSON.parse(
    localStorage.getItem('@Portal/dash/valorAnteriorCoord') || '{}'
  );
  //=========get dash ============================================
  interface iGrafico {
    Mes: string;
    AnoAtual: number;
    AnoAnterior: number;
  }
  const [valoresGrafico, setValoresGrafico] = useState<iGrafico[]>([]);

  function AtualizarDash(codCamp: any) {
    setPagina(1);
    pagina = 1;
    setPagina90(1);
    pagina90 = 1;
    LoginSankhyaFilter(codCamp);
  }

  const formataData = (date: string) => {
    const ano = date?.substr(4, 4);
    const mes = date?.substr(2, 2);
    const dia = date?.substr(0, 2);

    return `${dia}/${mes}/${ano}`;
  };
  //=====================================================================================

  async function LoginSankhyaDashAdmin() {
    setLoading(true);

    try {
      await DadosMetaMesValorMesAdmin();
    } catch (error) {
      console.log('erro', error);
    }
  }
  //==========================================================================================

  async function DadosMetaMesValorMesAdmin() {
    const codVen = usuario.username;
    const sql = `SELECT MET.MES, MET.VLRMET VLRMET, ISNULL(VEN.VLRVEN,0) VLRVEN
                  FROM (
                    SELECT MONTH(DTREF) MES, SUM(PREVREC) VLRMET
                    FROM TGFMET (NOLOCK)
                    WHERE YEAR(DTREF) = YEAR(GETDATE())
                    AND MONTH(DTREF) = MONTH(GETDATE())
                    AND CODEMP <> 6
                    AND CODVEND < 30000
                    GROUP BY MONTH(DTREF)
                  ) MET
                  LEFT JOIN (
                    SELECT MES,  SUM(FIN) VLRVEN
                    FROM AD_VVENDAS_CLI
                    WHERE ANO = YEAR(GETDATE())
                    AND MES = MONTH(GETDATE())
                    GROUP BY MES
                  ) VEN ON VEN.MES = MET.MES`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${sql}`)
      .then((response) => {
        console.log('meta de vendas', response.data.responseBody.rows[0]?.[1]);

        localStorage.setItem(
          '@Portal/dash/metaMes',
          response.data.responseBody.rows[0]?.[1]
        );
        console.log('valor mes', response.data.responseBody.rows[0]?.[2]);

        localStorage.setItem(
          '@Portal/dash/vendaMes',
          response.data.responseBody.rows[0]?.[2]
        );
        setSucess(10);
        DadosGraficoAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //==============================================================================================

  async function DadosGraficoAdmin() {
    const codVen2 = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20ANT.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20ANT.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20ANT.VLRVEN%20VLRANT%20%09%2C%20ISNULL%28ATU.VLRVEN%2C0%29%20VLRATU%20%09%20%20FROM%20%28%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAnterior}%20%09GROUP%20BY%20MES%20%29%20ANT%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09GROUP%20BY%20MES%20%29%20ATU%20ON%20ATU.MES%20%3D%20ANT.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('faturamento', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));

        localStorage.setItem(
          '@Portal/dash/valorTotalAno',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/graficoTotal',
          JSON.stringify(dadosArray)
        );

        const vlanoAnteriorArray = dadosArray.map(
          (item: any) => item.AnoAnterior
        );
        const vlanoAtualArray = dadosArray.map((item: any) => item.AnoAtual);

        localStorage.setItem(
          '@Portal/dash/ValorAnterior',
          JSON.stringify(vlanoAnteriorArray)
        );

        localStorage.setItem(
          '@Portal/dash/ValorAtual',
          JSON.stringify(vlanoAtualArray)
        );

        setSucess(20);
        DadosGraficoVendasxMetaAdmin();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  //==============================================================================================

  async function DadosGraficoVendasxMetaAdmin() {
    const codVen2 = usuario.username;
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano atual', anoAtual);

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20MET.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20MET.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20MET.VLRMET%20VLRMET%20%09%2C%20ISNULL%28VEN.VLRVEN%2C0%29%20VLRVEN%20%09%2C%20CASE%20WHEN%20MET.VLRMET%20%3E%20VEN.VLRVEN%20THEN%20%27RED%27%20ELSE%20CASE%20WHEN%20MET.VLRMET%20%3D%200%20THEN%20%27GREY%27%20ELSE%20%27GREEN%27%20END%20END%20COLOR%20%20FROM%20%28%20%09SELECT%20MONTH%28MET.DTREF%29%20MES%2C%20SUM%28MET.PREVREC%29%20VLRMET%20%09FROM%20TGFMET%20MET%20%28NOLOCK%29%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20MET.CODVEND%20%09LEFT%20JOIN%20TGFVEN%20GER%20%28NOLOCK%29%20ON%20GER.CODVEND%20%3D%20VDO.CODGER%20%09WHERE%20YEAR%28MET.DTREF%29%20%3D%20${anoAtual}%20%09GROUP%20BY%20MONTH%28MET.DTREF%29%20%29%20MET%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20GROUP%20BY%20MES%20%29%20VEN%20ON%20VEN.MES%20%3D%20MET.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('vendas x metas', response);
        console.log('vendas x metas rows', response.data.responseBody.rows);

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            month: curr[1],
            meta: curr[2],
            actual: curr[3],
            color: curr[4],
          };
        });

        setVendaXmeta(result);

        setSucess(30);
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //===============================================================================================================================

  async function DadosPedidoOrcamentoAdmin() {
    const codVen2 = usuario.username;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3D%203000`
      )
      .then((response) => {
        console.log('pedidos e orçamento', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidoOrcamento',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidoOrcamento',
          response.data.responseBody.rows[0]?.[1]
        );
        setSucess(40);
        DadosPedidoFaturarAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //=============================================================================================================

  async function DadosPedidoFaturarAdmin() {
    const codVen2 = usuario.username;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3C%3E%203000`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantFaturar',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorFaturar',
          response.data.responseBody.rows[0]?.[1]
        );

        setSucess(60);

        DadosQuantidadePedidosAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //==================================================================================================

  async function DadosQuantidadePedidosAdmin() {
    const codVen2 = usuario.username;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidos',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidos',
          response.data.responseBody.rows[0]?.[1]
        );
        setSucess(80);

        DadosClientesSemVendaAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //================================================================================================

  async function DadosClientesSemVendaAdmin() {
    const codVen2 = usuario.username;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28DISTINCT%20CODPAR%29%20as%20QTD%20FROM%20AD_VCLIENTES%20%20%20%20WHERE%20DTNEG%20%3C%3D%20%28GETDATE%28%29-90%29%20%20%20%20and%20GERCOD%20IN%20%2814725%2C%2014699%2C%2014749%29%20%20%20%20or%20codpar%20in%20%2814674%29`
      )
      .then((response) => {
        localStorage.setItem(
          '@Portal/dash/ClientesSemVenda',
          response.data.responseBody.rows[0]
        );
        setSucess(100);

        atualizarConstantes();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //=======Funções Sankhya Representante ============================================================

  async function LoginSankhyaDashRepresentante() {
    setLoading(true);
    setSucess(10);

    try {
      await DadosMetaMesValorMesRepresentante();
    } catch (error) {
      console.log('erro', error);
    }
  }
  //====================================================================================

  async function DadosMetaMesValorMesRepresentante() {
    const codVen = usuario.username;
    const sql = `SELECT MET.MES, MET.VLRMET VLRMET, ISNULL(VEN.VLRVEN,0) VLRVEN
          FROM (
            SELECT MONTH(DTREF) MES, SUM(PREVREC) VLRMET
            FROM TGFMET (NOLOCK)
            WHERE YEAR(DTREF) = YEAR(GETDATE())
            AND MONTH(DTREF) = MONTH(GETDATE())
            AND CODEMP <> 6
            AND CODVEND < 30000
            AND CODVEND = ${codVen}
            GROUP BY MONTH(DTREF)
          ) MET
          LEFT JOIN (
            SELECT MES,  SUM(FIN) VLRVEN
            FROM AD_VVENDAS_CLI
            WHERE ANO = YEAR(GETDATE())
            AND MES = MONTH(GETDATE())
            AND CODVEND = ${codVen}
            GROUP BY MES
          ) VEN ON VEN.MES = MET.MES`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('meta de vendas', response.data.responseBody.rows);

        localStorage.setItem(
          '@Portal/dash/metaMes',
          response.data.responseBody.rows[0]?.[1]
        );
        console.log('valor mes', response.data.responseBody.rows[0]?.[2]);

        localStorage.setItem(
          '@Portal/dash/vendaMes',
          response.data.responseBody.rows[0]?.[2]
        );

        DadosGraficoRepresentante();
        setSucess(20);
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }
  //==============================================================================

  async function DadosGraficoRepresentante() {
    const codVen2 = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20ANT.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20ANT.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20ANT.VLRVEN%20VLRANT%20%09%2C%20ISNULL%28ATU.VLRVEN%2C0%29%20VLRATU%20%09%20%20FROM%20%28%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAnterior}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20ANT%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20ATU%20ON%20ATU.MES%20%3D%20ANT.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('faturamento', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));

        localStorage.setItem(
          '@Portal/dash/valorTotalAno',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/graficoTotal',
          JSON.stringify(dadosArray)
        );

        const vlanoAnteriorArray = dadosArray.map(
          (item: any) => item.AnoAnterior
        );
        const vlanoAtualArray = dadosArray.map((item: any) => item.AnoAtual);

        localStorage.setItem(
          '@Portal/dash/ValorAnterior',
          JSON.stringify(vlanoAnteriorArray)
        );

        localStorage.setItem(
          '@Portal/dash/ValorAtual',
          JSON.stringify(vlanoAtualArray)
        );

        setSucess(30);
        DadosGraficoVendasxMetaRepresentante();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  //=====================================================================

  async function DadosGraficoVendasxMetaRepresentante() {
    const codVen2 = usuario.username;
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano atual', anoAtual);

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20MET.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20MET.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20MET.VLRMET%20VLRMET%20%09%2C%20ISNULL%28VEN.VLRVEN%2C0%29%20VLRVEN%20%09%2C%20CASE%20WHEN%20MET.VLRMET%20%3E%20VEN.VLRVEN%20THEN%20%27RED%27%20ELSE%20CASE%20WHEN%20MET.VLRMET%20%3D%200%20THEN%20%27GREY%27%20ELSE%20%27GREEN%27%20END%20END%20COLOR%20%20FROM%20%28%20%09SELECT%20MONTH%28MET.DTREF%29%20MES%2C%20SUM%28MET.PREVREC%29%20VLRMET%20%09FROM%20TGFMET%20MET%20%28NOLOCK%29%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20MET.CODVEND%20%09LEFT%20JOIN%20TGFVEN%20GER%20%28NOLOCK%29%20ON%20GER.CODVEND%20%3D%20VDO.CODGER%20%09WHERE%20YEAR%28MET.DTREF%29%20%3D%20${anoAtual}%20%09AND%20%28VDO.CODVEND%20%3D%20${codVen2}%20%29%20%09GROUP%20BY%20MONTH%28MET.DTREF%29%20%29%20MET%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20VEN%20ON%20VEN.MES%20%3D%20MET.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('vendas x metas', response);
        console.log('vendas x metas rows', response.data.responseBody.rows);
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            month: curr[1],
            meta: curr[2],
            actual: curr[3],
            color: curr[4],
          };
        });

        localStorage.setItem('@Portal/dash/VendaXmeta', JSON.stringify(result));
        setSucess(50);
        DadosPedidoOrcamentoRepresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosPedidoOrcamentoRepresentante() {
    const codVen2 = usuario.username;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3D%203000%20AND%20CODVEND%20%3D${codVen2}`
      )
      .then((response) => {
        console.log('pedidos e orçamento', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidoOrcamento',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidoOrcamento',
          response.data.responseBody.rows[0]?.[1]
        );

        setSucess(70);
        DadosPedidoFaturarREpresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosPedidoFaturarREpresentante() {
    const codVen2 = usuario.username;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%09%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20FROM%20AD_VPEDAFATURAR%20PED%20WHERE%20PED.CODTIPOPER%20%3C%3E%203000%20%20AND%20CODVEND%20%3D${codVen2}`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantFaturar',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorFaturar',
          response.data.responseBody.rows[0]?.[1]
        );
        setSucess(80);
        DadosQuantidadePedidosRepresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosQuantidadePedidosRepresentante() {
    const codVen2 = usuario.username;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%09%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20FROM%20AD_VPEDAFATURAR%20PED%20wHERE%20CODVEND%3D${codVen2}`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidos',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidos',
          response.data.responseBody.rows[0]?.[1]
        );
        setSucess(100);
        atualizarConstantes();
      })
      .catch((error) => {});
  }

  //======================================================================================

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Tabela Cliente Consultor',
    sheet: 'Tabela Cliente Consultor',
  });
  //=============PDF =============================================================

  const handleDownloadPDF = () => {
    const tableElement = document.querySelector(
      '#MyTable'
    ) as HTMLElement | null;
    if (!tableElement) {
      return;
    }

    const doc = new jsPDF('landscape');
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin;
    const columnOffset = 75;
    const column2Offset = 7;
    const column3Margin = 39;

    const header1Cells = tableElement.querySelectorAll(
      'thead tr:nth-child(1) th'
    );
    const header1Width = pageWidth;
    const header1Height = 10;
    doc.setFillColor(204, 204, 204);

    doc.rect(margin, 15, header1Width, header1Height, 'F');

    header1Cells.forEach((cell, index) => {
      const text = cell.textContent || '';
      let cellWidth = index === 0 ? pageWidth / 16 : (pageWidth - 40) / 8;
      if (index >= 3 && index <= 8) {
        cellWidth -= 5;
      }
      const xPosition = margin + index * cellWidth;
      const adjustedXPosition =
        index >= 3 ? xPosition + columnOffset : xPosition;

      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      doc.text(text, adjustedXPosition + 2, 22, {
        align: index >= 3 ? 'right' : 'left',
      });
    });

    const header2Cells = tableElement.querySelectorAll(
      'thead tr:nth-child(2) th'
    );
    const header2Width = pageWidth;
    const header2Height = 10;
    doc.setFillColor(204, 204, 204);

    doc.rect(margin, 25, header2Width, header2Height, 'F');
    header2Cells.forEach((cell, index) => {
      const text = cell.textContent || '';
      let cellWidth = index === 0 ? pageWidth / 16 : (pageWidth - 40) / 8;
      if (index >= 3 && index <= 8) {
        cellWidth -= 5;
      }
      const xPosition = margin + index * cellWidth;
      const adjustedXPosition =
        index >= 3 ? xPosition + columnOffset : xPosition;

      if (index === 2) {
        doc.text(text, adjustedXPosition + 2 + column3Margin, 32, {
          align: 'left',
        });
      } else {
        doc.setFontSize(7);
        doc.setTextColor(0, 0, 0);
        doc.text(
          text,
          adjustedXPosition + 2 - (index === 1 ? column2Offset - 6 : 0),
          32,
          { align: index >= 3 ? 'right' : 'left' }
        );
      }
    });

    let currentY = 42;
    const rows = tableElement.querySelectorAll('tbody tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      const cellWidth = pageWidth / 8;
      cells.forEach((cell, cellIndex) => {
        const text = cell.textContent || '';
        let adjustedCellWidth = cellIndex >= 3 ? cellWidth - 5 : cellWidth;
        if (cellIndex >= 3 && cellIndex <= 8) {
          adjustedCellWidth -= 5;
        }
        const xPosition = margin + cellIndex * adjustedCellWidth;
        let adjustedXPosition =
          cellIndex >= 3 ? xPosition + columnOffset : xPosition;

        doc.setFontSize(7);
        doc.setTextColor(0, 0, 0);
        doc.text(
          text,
          adjustedXPosition + 2 - (cellIndex === 1 ? column2Offset : 0),
          currentY,
          { align: cellIndex >= 3 ? 'right' : 'left' }
        );
      });

      currentY += 10;

      if (currentY > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        currentY = margin;
      }
    });

    doc.save('arquivo.pdf');
  };

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

  useEffect(() => {
    console.log('valor do seect coorenador', codGerente);
  }, [codGerente]);

  useEffect(() => {
    if (valorTotalAno <= 0) {
      setLoading(true);
    }
    Finalizar();
    window.scrollTo(0, 0);
  }, []);
  function Finalizar() {
    setSucess(50);
    setTimeout(function () {
      setLoading(false);
    }, 1000);
  }

  //=========================================================================
  async function DadosSankhya07adm() {
    setSucess(100);
    const codVen2 = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20ANT.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20ANT.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20ANT.VLRVEN%20VLRANT%20%09%2C%20ISNULL%28ATU.VLRVEN%2C0%29%20VLRATU%20%09%20%20FROM%20%28%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAnterior}%20%09GROUP%20BY%20MES%20%29%20ANT%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09GROUP%20BY%20MES%20%29%20ATU%20ON%20ATU.MES%20%3D%20ANT.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('faturamento', response);
        //=======================================================
        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));
        setVlanoAtualTotal(
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        setValoresGrafico(dadosArray);

        setShowMensageSankhya(false);
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }
  //==========================================================================

  //===========graficos=============================
  interface iDadosGraficos {
    name: string;
    value: number;
  }

  const [series, setSeries] = useState([
    {
      name: 'Valores',
      data: [10000, 20000, 30000, 70000, 50000, 10000, 90000],
    },
  ]);
  const [options, setObject] = useState({
    chart: {
      id: 'Índice Geral de Preços do Mercado (IGP-M)',
    },
    xaxis: {
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60px !important',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    yaxis: {},
    fill: {
      opacity: 1,
    },
  });
  let totalValores: any;
  totalValores = 13000;
  let total: number;
  total = 0;
  let total1: any;
  total1 = 1000;
  let total2: any;
  total2 = 2000;
  let total3: any;
  total3 = 3000;
  let total4: any;
  total4 = 7000;

  const [mesesPesquisa, setMesesPesquisa] = useState<iDataSelect[]>([]);

  const Meses: iDataSelect[] = [
    { value: '1', label: 'JAN' },
    { value: '2', label: 'FEV' },
    { value: '3', label: 'MAR' },
    { value: '4', label: 'ABR' },
    { value: '5', label: 'MAI' },
    { value: '6', label: 'JUN' },
    { value: '7', label: 'JUL' },
    { value: '8', label: 'AGO' },
    { value: '9', label: 'SET' },
    { value: '10', label: 'OUT' },
    { value: '11', label: 'NOV' },
    { value: '12', label: 'DEZ' },
  ];
  //===============================================
  useEffect(() => {
    setMesesPesquisa(obterMesesExibidos());
    setAnoescolhido(String(anoAtual));
    Anoescolhido = String(anoAtual);
    setAnoFilter(String(anoAtual));
    AnoFilter = String(anoAtual);
    console.log('anoooooo.....', Anoescolhido);
    window.scrollTo(0, 0);
    logado();
    GetgrupoUsuarioId();
  }, []);

  function obterMesesExibidos(): iDataSelect[] {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;

    if (Number(AnoFilter) === anoAtual) {
      return Meses.slice(0, mesAtual);
    } else {
      return Meses;
    }
  }

  //============acompanhamento vendedor filtrado =============================
  async function LoginSankhyaFilter(codCamp: any) {
    setShowMensageSankhya(true);
    setmesAescolhido(mesEscolhido);
    setAnoescolhido(AnoFilter);
    Anoescolhido = AnoFilter;
    try {
      if (usuario.grupoId == 2) {
        await AcompanhametoMesaMesFilter(codCamp);
      } else {
        await AcompanhametoMesaMes(codCamp);
      }
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function AcompanhametoMesaMesFilter(codCampanha: any) {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codigo = usuario.username;
    let sql = '';
    if (usuario.grupoId == 2) {
      sql = `SELECT MONTH(MET.DATAMET) MES1
              , CASE WHEN SUM(MET.VLRMET) > 0 THEN
                    CASE WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) < 0.8 THEN 'RED' 
                      WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 0.8 AND SUM(MET.VLRREA) / SUM(MET.VLRMET) < 1 THEN 'YELLOW' 
                      WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 1 THEN 'GREEN'
                    END
                  ELSE
                    'GREY'
                  END COLOR
              
                , MET.CODVEND
                , VEN.APELIDO
                , case when MONTH(MET.DATAMET) = 1 then 'Jan'
                    when MONTH(MET.DATAMET) = 2 then 'Fev'
                    when MONTH(MET.DATAMET) = 3 then 'Mar'
                    when MONTH(MET.DATAMET) = 4 then 'Abr'
                    when MONTH(MET.DATAMET) = 5 then 'Mai'
                    when MONTH(MET.DATAMET) = 6 then 'Jun'
                    when MONTH(MET.DATAMET) = 7 then 'Jul'
                    when MONTH(MET.DATAMET) = 8 then 'Ago'
                    when MONTH(MET.DATAMET) = 9 then 'Set'
                    when MONTH(MET.DATAMET) = 10 then 'Out'
                    when MONTH(MET.DATAMET) = 11 then 'Nov'
                    when MONTH(MET.DATAMET) = 12 then 'Dez'
              
                  else 'Out' end MES	
                  , SUM(MET.VLRMET) META
                , SUM(MET.VLRREA) REAL
                
              FROM AD_CAMPANHA CAM
              JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
              JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
              where CAM.CODMETA = ${codCampanha} AND VEN.CODVEND = ${usuario.username}
              GROUP BY MONTH(MET.DATAMET)
                , MET.CODVEND
                , VEN.APELIDO
              order by 3,1`;
    }

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            Leg: curr[1],
            Codigo: curr[2],
            Vendedor: curr[3],
            Mes: curr[4],
            Meta: curr[5],
            Valor: curr[6],
          };
        });
        console.log(
          'valoresadquiridosVendedor DESC',
          response.data.responseBody.rows
        );
        setcampanhaMes(result);

        AcompanhamentoGeralFilter(codCampanha);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }
  async function AcompanhamentoGeralFilter(codCampanha: any) {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codigo = usuario.username;
    let sql = '';
    if (usuario.grupoId == 2) {
      sql = `SELECT 
                CASE WHEN SUM(MET.VLRMET) > 0 THEN
                  CASE WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) < 0.8 THEN 'RED' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 0.8 AND SUM(MET.VLRREA) / SUM(MET.VLRMET) < 1 THEN 'YELLOW' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 1 THEN 'GREEN'
                  END
                ELSE
                  'GREY'
                END COLOR
            
              , MET.CODVEND
              , VEN.APELIDO
              , SUM(MET.VLRMET) META
              , SUM(MET.VLRREA) REAL
            FROM AD_CAMPANHA CAM
            JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
            JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
            where CAM.CODMETA = ${codCampanha} AND VEN.CODVEND = ${usuario.username}
            GROUP BY MET.CODVEND
              , VEN.APELIDO`;
    }

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            Leg: curr[0],
            Codigo: curr[1],
            Vendedor: curr[2],
            Meta: curr[3],
            Valor: curr[4],
          };
        });
        console.log(
          'valoresadquiridosVendedor ger',
          response.data.responseBody.rows
        );
        setcampanhaGeral(result);

        DescMeta(codCampanha);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }
  async function DescMeta(codCampanha: any) {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codigo = usuario.username;
    let sql = '';
    if (usuario.grupoId == 2) {
      sql = `SELECT DESCRMETA AS DESCR
      FROM AD_CAMPANHA WHERE CODMETA =${codCampanha} `;
    }

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        console.log(
          'valoresadquiridosVendedor name',
          response.data.responseBody.rows
        );
        setNomeCampanha(response.data.responseBody.rows[0]);
        setShowMensageSankhya(false);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  //===========ACOMPANHAMENTO DE CAMPANHAS VENDEDOR ===========================
  async function LoginSankhya() {
    setShowMensageSankhya(true);
    setmesAescolhido(mesEscolhido);
    setAnoescolhido(AnoFilter);
    Anoescolhido = AnoFilter;
    try {
      await DadosSelectCampanha();
    } catch (error) {
      setLoading(false);
      setShowMensageSankhyaErro(true);
    }
  }

  async function DadosSelectCampanha() {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codigo = usuario.username;
    let sql = '';
    if (usuario.grupoId == 2) {
      sql = `SELECT DISTINCT 
                    META.CODMETA AS VALUE
                    ,DESCRMETA AS LABEL
              FROM AD_CAMPANHAMETAS META
              JOIN AD_CAMPANHA CAMP 
              ON META.CODMETA = CAMP.CODMETA
              WHERE META.CODVEND = ${codigo}
              ORDER BY META.CODMETA DESC;`;
    }
    if (usuario.grupoId == 5) {
      sql = `SELECT DISTINCT 
                  META.CODMETA AS VALUE
                  ,DESCRMETA AS LABEL
            FROM AD_CAMPANHAMETAS META
            JOIN AD_CAMPANHA CAMP 
            ON META.CODMETA = CAMP.CODMETA
            JOIN TGFVEN VEN ON VEN.CODVEND = META.CODVEND
	          WHERE VEN.CODGER = ${codigo}
            ORDER BY META.CODMETA DESC`;
    }

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('vendas x metas', response.data.responseBody.rows);
        console.log(
          'valoresadquiridosVendedorCampanha',
          response.data.responseBody.rows
        );
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            value: curr[0],
            label: curr[1],
          };
        });
        setconsultorPesquisa(result);
        setcodGerente(result[0].value);
        AcompanhametoMesaMes(result[0].value);
        console.log('valoresadquiridosVendedor', result[0].value);
        setNomeCampanha(result[0].label);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function AcompanhametoMesaMes(codCampanha: any) {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codigo = usuario.username;
    let sql = '';
    if (usuario.grupoId == 2) {
      sql = `SELECT MONTH(MET.DATAMET) MES1
            , CASE WHEN SUM(MET.VLRMET) > 0 THEN
                  CASE WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) < 0.8 THEN 'RED' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 0.8 AND SUM(MET.VLRREA) / SUM(MET.VLRMET) < 1 THEN 'YELLOW' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 1 THEN 'GREEN'
                  END
                ELSE
                  'GREY'
                END COLOR
            
              , MET.CODVEND
              , VEN.APELIDO
              , case when MONTH(MET.DATAMET) = 1 then 'Jan'
                  when MONTH(MET.DATAMET) = 2 then 'Fev'
                  when MONTH(MET.DATAMET) = 3 then 'Mar'
                  when MONTH(MET.DATAMET) = 4 then 'Abr'
                  when MONTH(MET.DATAMET) = 5 then 'Mai'
                  when MONTH(MET.DATAMET) = 6 then 'Jun'
                  when MONTH(MET.DATAMET) = 7 then 'Jul'
                  when MONTH(MET.DATAMET) = 8 then 'Ago'
                  when MONTH(MET.DATAMET) = 9 then 'Set'
                  when MONTH(MET.DATAMET) = 10 then 'Out'
                  when MONTH(MET.DATAMET) = 11 then 'Nov'
                  when MONTH(MET.DATAMET) = 12 then 'Dez'
            
                else 'Out' end MES	
                , SUM(MET.VLRMET) META
              , SUM(MET.VLRREA) REAL
            
            FROM AD_CAMPANHA CAM
            JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
            JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
            where CAM.CODMETA = ${codCampanha} AND VEN.CODVEND = ${usuario.username}
            GROUP BY MONTH(MET.DATAMET)
              , MET.CODVEND
              , VEN.APELIDO
            order by 3,1`;
    }
    if (usuario.grupoId == 5) {
      sql = `SELECT MONTH(MET.DATAMET) MES1
            , CASE WHEN SUM(MET.VLRMET) > 0 THEN
                  CASE WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) < 0.8 THEN 'RED' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 0.8 AND SUM(MET.VLRREA) / SUM(MET.VLRMET) < 1 THEN 'YELLOW' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 1 THEN 'GREEN'
                  END
                ELSE
                  'GREY'
                END COLOR
            
              , MET.CODVEND
              , VEN.APELIDO
              , case when MONTH(MET.DATAMET) = 1 then 'Jan'
                  when MONTH(MET.DATAMET) = 2 then 'Fev'
                  when MONTH(MET.DATAMET) = 3 then 'Mar'
                  when MONTH(MET.DATAMET) = 4 then 'Abr'
                  when MONTH(MET.DATAMET) = 5 then 'Mai'
                  when MONTH(MET.DATAMET) = 6 then 'Jun'
                  when MONTH(MET.DATAMET) = 7 then 'Jul'
                  when MONTH(MET.DATAMET) = 8 then 'Ago'
                  when MONTH(MET.DATAMET) = 9 then 'Set'
                  when MONTH(MET.DATAMET) = 10 then 'Out'
                  when MONTH(MET.DATAMET) = 11 then 'Nov'
                  when MONTH(MET.DATAMET) = 12 then 'Dez'
            
                else 'Out' end MES	
                , SUM(MET.VLRMET) META
              , SUM(MET.VLRREA) REAL
            
            FROM AD_CAMPANHA CAM
            JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
            JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
            where CAM.CODMETA = ${codCampanha}
            GROUP BY MONTH(MET.DATAMET)
              , MET.CODVEND
              , VEN.APELIDO
            order by 3,1`;
    }

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            Leg: curr[1],
            Codigo: curr[2],
            Vendedor: curr[3],
            Mes: curr[4],
            Meta: curr[5],
            Valor: curr[6],
          };
        });
        console.log('valoresadquiridosVendedor', result);
        setcampanhaMes(result);

        AcompanhamentoGeral(codCampanha);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }
  async function AcompanhamentoGeral(codCampanha: any) {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codigo = usuario.username;
    let sql = '';
    if (usuario.grupoId == 2) {
      sql = `SELECT 
                CASE WHEN SUM(MET.VLRMET) > 0 THEN
                  CASE WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) < 0.8 THEN 'RED' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 0.8 AND SUM(MET.VLRREA) / SUM(MET.VLRMET) < 1 THEN 'YELLOW' 
                    WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 1 THEN 'GREEN'
                  END
                ELSE
                  'GREY'
                END COLOR
            
              , MET.CODVEND
              , VEN.APELIDO
              , SUM(MET.VLRMET) META
              , SUM(MET.VLRREA) REAL
            
            FROM AD_CAMPANHA CAM
            JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
            JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
            where CAM.CODMETA = ${codCampanha} AND VEN.CODVEND = ${usuario.username}
            GROUP BY MET.CODVEND
              , VEN.APELIDO`;
    }
    if (usuario.grupoId == 5) {
      sql = `SELECT 
            CASE WHEN SUM(MET.VLRMET) > 0 THEN
              CASE WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) < 0.8 THEN 'RED' 
                WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 0.8 AND SUM(MET.VLRREA) / SUM(MET.VLRMET) < 1 THEN 'YELLOW' 
                WHEN SUM(MET.VLRREA) / SUM(MET.VLRMET) >= 1 THEN 'GREEN'
              END
            ELSE
              'GREY'
            END COLOR
        
          , MET.CODVEND
          , VEN.APELIDO
          , SUM(MET.VLRMET) META
          , SUM(MET.VLRREA) REAL
        
        FROM AD_CAMPANHA CAM
        JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
        JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
        where CAM.CODMETA = ${codCampanha}
        GROUP BY MET.CODVEND
          , VEN.APELIDO
        `;
    }

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            Leg: curr[0],
            Codigo: curr[1],
            Vendedor: curr[2],
            Meta: curr[3],
            Valor: curr[4],
          };
        });
        console.log(
          'valoresadquiridosVendedor ger',
          response.data.responseBody.rows
        );
        setcampanhaGeral(result);

        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.Meta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.Valor,
          0
        );

        setvalorTotalMetaCamp(somaMeta);
        valorTotalMetaCamp = somaMeta;

        setvalorTotalValorCamp(somaAtual);
        valorTotalValorCamp = somaAtual;

        if (usuario.grupoId != 2) {
          AcompanhamentoGer(codCampanha);
        }
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }
  async function AcompanhamentoGer(codCampanha: any) {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codigo = usuario.username;
    let sql = '';

    sql = `SELECT CAM.CODMETA
            , DESCRMETA
            , case when MONTH(MET.DATAMET) = 1 then 'Jan'
                when MONTH(MET.DATAMET) = 2 then 'Fev'
                when MONTH(MET.DATAMET) = 3 then 'Mar'
                when MONTH(MET.DATAMET) = 4 then 'Abr'
                when MONTH(MET.DATAMET) = 5 then 'Mai'
                when MONTH(MET.DATAMET) = 6 then 'Jun'
                when MONTH(MET.DATAMET) = 7 then 'Jul'
                when MONTH(MET.DATAMET) = 8 then 'Ago'
                when MONTH(MET.DATAMET) = 9 then 'Set'
                when MONTH(MET.DATAMET) = 10 then 'Out'
                when MONTH(MET.DATAMET) = 11 then 'Nov'
                when MONTH(MET.DATAMET) = 12 then 'Dez'
          
              else 'Out' end MES
            , SUM(MET.VLRMET) META
            , SUM(MET.VLRREA) REAL
          
          FROM AD_CAMPANHA CAM
          JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
          where CAM.CODMETA = ${codCampanha}
          GROUP BY CAM.CODMETA
            , DESCRMETA
            , MONTH(MET.DATAMET)`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            Campanha: curr[1],
            Mes: curr[2],
            Meta: curr[3],
            Valor: curr[4],
          };
        });
        console.log(
          'valoresadquiridosVendedor gerall',
          response.data.responseBody.rows
        );
        setcampanhaGeralCoord(result);

        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.Meta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.Valor,
          0
        );

        setvalorTotalMetaCampGer(somaMeta);
        valorTotalMetaCampGer = somaMeta;
        setvalorTotalValorCampGer(somaAtual);
        valorTotalValorCampGer = somaAtual;
        setNomeCampanha(result[0]?.Campanha);
        setShowMensageSankhya(false);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  //=========== DASH COORD DEFAULT ============================================
  async function LoginSankhyaDashCoordenador() {
    setShowMensageSankhya(true);
    setmesAescolhido(mesEscolhido);
    setAnoescolhido(AnoFilter);
    Anoescolhido = AnoFilter;

    try {
      ListaCoord();
      if (usuario.grupoId == 5) {
        console.log(
          'ENTROU COMO COORDENADOR================================'
        );
        await DadosVendasXMeta();
      } else {
        console.log(
          'NÃO É COORDENADOR======================================='
        );
        await DadosVendasXMetaAdm();
      }
    } catch (error) {
      console.log('erro', error);
      if (usuario.grupoId == 5) {
        console.log(
          'ENTROU COMO COORDENADOR================================'
        );
        await DadosVendasXMeta();
      } else {
        console.log(
          'NÃO É COORDENADOR======================================='
        );
        ListaCoord();
      }
    }
  }

  async function DadosVendasXMeta() {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codGer = usuario.username;
    const sql = `SELECT MET.MES NMES
                  , LEFT(DATENAME(MONTH, DATEADD(MONTH, MET.MES - 1, 0)),3) MES
                  , MET.VLRMET VLRMET
                  , ISNULL(VEN.VLRVEN,0) VLRVEN
                  , CASE WHEN MET.VLRMET > VEN.VLRVEN THEN 'RED' ELSE CASE WHEN MET.VLRMET = 0 THEN 'GREY' ELSE 'GREEN' END END COLOR
                FROM (
                  SELECT MONTH(MET.DTREF) MES, SUM(MET.PREVREC) VLRMET
                  FROM TGFMET MET (NOLOCK)
                  LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                  LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                  WHERE YEAR(MET.DTREF) = ${AnoFilter}
                  AND MET.CODVEND < 30000
                  AND VDO.CODGER = ${codGer}
                  GROUP BY MONTH(MET.DTREF)
                ) MET
                LEFT JOIN (
                  SELECT MES,  SUM(FIN) VLRVEN
                  FROM AD_VVENDAS_CLI VEN
                  WHERE ANO = ${AnoFilter}
                  AND VEN.CODGER = ${codGer}
                  GROUP BY MES
                ) VEN ON VEN.MES = MET.MES
                ORDER BY 1
                `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('vendas x metas', response.data.responseBody.rows);

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            month: curr[1],
            meta: curr[2],
            actual: curr[3],
            color: curr[4],
          };
        });

        setVendaXmeta(result);
        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.meta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.actual,
          0
        );
        localStorage.setItem('@Portal/dash/SomaMeta', String(somaMeta));
        localStorage.setItem('@Portal/dash/SomaVrlAtual', String(somaAtual));

        localStorage.setItem('@Portal/dash/VendaXmeta', JSON.stringify(result));
        localStorage.setItem('@Portal/dash/AnoEscolhido', String(AnoFilter));

        console.log('criando array', result);

        VendasXMetaConsult();
      })
      .catch((error) => {
        VendasXMetaConsult();

        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function VendasXMetaConsult() {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codGer = usuario.username;
    const sql = `SELECT 	ISNULL(MET.CODGER, VEN.CODGER) CODGER,
                          ISNULL(MET.NOMEGER, VEN.NOMEGER) NOMEGER,
                          ISNULL(MET.CODVEND, VEN.CODVEND) CODVEND,
                          ISNULL(MET.NOMEVEND, VEN.NOMEVEND) NOMEVEND,
                          ISNULL(MET.VLRMET, 0) VLRMET,
                          ISNULL(VEN.VLRVEN,0) VLRVEN,
                          CASE WHEN MET.VLRMET > 0 THEN
                            CASE WHEN VEN.VLRVEN / MET.VLRMET < 0.8 THEN 'RED'
                              WHEN VEN.VLRVEN / MET.VLRMET >= 0.8 AND VEN.VLRVEN / MET.VLRMET < 1 THEN 'YELLOW'
                              WHEN VEN.VLRVEN / MET.VLRMET >= 1 THEN 'GREEN'
                            END
                          ELSE
                            'GREY'
                          END COLOR
                      FROM (
                        SELECT VDO.CODGER, GER.APELIDO NOMEGER, MET.CODVEND, VDO.APELIDO NOMEVEND, SUM(MET.PREVREC) VLRMET
                        FROM TGFMET MET (NOLOCK)
                        LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                        LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                        WHERE YEAR(MET.DTREF) = ${AnoFilter}
                        AND MET.CODEMP <> 6 
                        AND MET.CODVEND < 30000
                        AND (MONTH(DTREF) = ${mesEscolhido} OR ${mesEscolhido} = 0)
                        AND (VDO.CODGER = ${codGer} OR ${codGer} IS NULL)
                        GROUP BY VDO.CODGER, GER.APELIDO, MET.CODVEND, VDO.APELIDO
                      ) MET
                      FULL JOIN (
                        SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, VEN.CODVEND, VEN.APELIDOV NOMEVEND, SUM(FIN) VLRVEN
                        FROM AD_VVENDAS_CLI VEN
                        WHERE ANO = ${AnoFilter}
                        AND (MES = ${mesEscolhido} OR ${mesEscolhido} = 0)
                          AND (VEN.CODGER = ${codGer} OR ${codGer} IS NULL)
                        GROUP BY VEN.CODGER, VEN.APELIDOG, VEN.CODVEND, VEN.APELIDOV
                      ) VEN ON VEN.CODVEND = MET.CODVEND
                      ORDER BY 1,3
                      `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log(
          'vendas x metas Consutores',
          response.data.responseBody.rows
        );

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            cod: curr[0],
            coord: curr[1],
            codConsut: curr[2],
            consult: curr[3],
            vlrMeta: curr[4],
            vlrVenda: curr[5],
            leg: curr[6],
          };
        });
        setVendaXmetaConsut(result);
        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrMeta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrVenda,
          0
        );
        setvalorTotalAnoConsult(somaAtual);
        setvalorTotalMetaConsult(somaMeta);
        let totalFaltou = 0;
        let totalPassou = 0;

        result.forEach((item: any) => {
          const diferenca = item.vlrMeta - item.vlrVenda;

          if (diferenca > 0) {
            totalFaltou += diferenca;
          } else if (diferenca < 0) {
            totalPassou += Math.abs(diferenca);
          }
        });

        console.log('Total que faltou:', totalFaltou);
        console.log('Total que passou:', totalPassou);
        setvalorTotalFaltou(totalFaltou);
        setvalorTotalPassou(totalPassou);
        console.log('criando array consutores', result);
        setSucess(50);

        VendasXMetaMes();
      })
      .catch((error) => {
        VendasXMetaMes();

        console.log('erro ao receber dados vendas x metas Consutores', error);
      });
  }
  async function VendasXMetaMes() {
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);
    const codGer = usuario.username;
    const sql = `SELECT 	ISNULL(MET.CODGER, VEN.CODGER) CODGER,
                          ISNULL(MET.NOMEGER, VEN.NOMEGER) NOMEGER,
                          ISNULL(MET.VLRMET, 0) VLRMET,
                          ISNULL(VEN.VLRVEN,0) VLRVEN,
                          CASE WHEN MET.VLRMET > 0 THEN
                            CASE WHEN VEN.VLRVEN / MET.VLRMET < 0.8 THEN 'RED'
                              WHEN VEN.VLRVEN / MET.VLRMET >= 0.8 AND VEN.VLRVEN / MET.VLRMET < 1 THEN 'YELLOW'
                              WHEN VEN.VLRVEN / MET.VLRMET >= 1 THEN 'GREEN'
                            END
                          ELSE
                            'GREY'
                          END COLOR
                      FROM (
                        SELECT VDO.CODGER, GER.APELIDO NOMEGER, SUM(MET.PREVREC) VLRMET
                        FROM TGFMET MET (NOLOCK)
                        LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                        LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                        WHERE YEAR(MET.DTREF) = ${AnoFilter}
                        AND MET.CODEMP <> 6 
                        AND MET.CODVEND < 30000
                        AND (MONTH(DTREF) = ${mesEscolhido} OR ${mesEscolhido} = 0)
                        AND (VDO.CODGER = ${codGer} OR ${codGer} IS NULL)
                        GROUP BY VDO.CODGER, GER.APELIDO
                      ) MET
                      FULL JOIN (
                        SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, SUM(FIN) VLRVEN
                        FROM AD_VVENDAS_CLI VEN
                        WHERE VEN.ANO = ${AnoFilter}
                        AND (MES = ${mesEscolhido} OR ${mesEscolhido} = 0)
                        AND (VEN.CODGER = ${codGer} OR ${codGer} IS NULL)
                        GROUP BY VEN.CODGER, VEN.APELIDOG
                      ) VEN ON VEN.CODGER = MET.CODGER
                      ORDER BY 1,3
                      `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log(
          'vendas x metas Consutores',
          response.data.responseBody.rows
        );

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            cod: curr[0],
            coord: curr[1],
            vlrMeta: curr[2],
            vlrVenda: curr[3],
            leg: curr[4],
          };
        });
        setMesVendaXmetaConsutMes(result);
        data.map((curr: any) => {
          setNomeConsultor(curr[1]);
        });
        setSucess(100);

        DadosGraficoCoord();
      })
      .catch((error) => {
        setLoading(false);

        DadosGraficoCoord();

        console.log('erro ao receber dados vendas x metas Consutores', error);
      });
  }
  async function DadosGraficoCoord() {
    const codGer = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
    const sql = `SELECT ANT.MES NMES, LEFT(DATENAME(MONTH, DATEADD(MONTH, ANT.MES - 1, 0)), 3) MES, ANT.VLRVEN VLRANT, ISNULL(ATU.VLRVEN, 0) VLRATU
                        FROM (
                            SELECT MES, SUM(FIN) VLRVEN
                            FROM AD_VVENDAS_CLI VEN
                            WHERE ANO = YEAR(DATEADD(YEAR, -1, GETDATE()))
                            AND VEN.CODGER = ${codGer}
                            GROUP BY MES
                        ) ANT
                        LEFT JOIN (
                            SELECT MES, SUM(FIN) VLRVEN
                            FROM AD_VVENDAS_CLI VEN
                            WHERE ANO = YEAR(GETDATE())
                            AND VEN.CODGER = ${codGer}
                            GROUP BY MES
                        ) ATU ON ATU.MES = ANT.MES
                        ORDER BY 1
                      `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('faturamento', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));

        settotalGraficoCd(dadosArray);

        localStorage.setItem(
          '@Portal/dash/valorAtualCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/valorAnteriorCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAnterior,
            0
          )
        );
        clientesSemVendaCoord();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  async function clientesSemVendaCoord() {
    const codGer = usuario.username;
    const sql = `
    SELECT GERCOD, GERNOME, VENCOD, VENNOME, COUNT(*) AS CLI_90D
          FROM AD_VCLIENTES 
          WHERE DIAS >= 90
              AND GERCOD IN (14725, 14699, 14749) 
              AND (GERCOD = ${codGer} OR ${codGer} IS NULL)
              AND ATIVO = 1
          GROUP BY GERCOD, GERNOME, VENCOD, VENNOME
          ORDER BY CLI_90D DESC`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('clientes 90 dias sem venda', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Gercod: item[0],
          Gernome: item[1],
          Vencod: item[2],
          Vennome: item[3],
          Cli_90D: item[4],
        }));

        setTotalPaginas90(Math.ceil(dadosArray.length / 15));
        totalPaginas90 = Math.ceil(dadosArray.length / 15);
        console.log('total paginas:', totalPaginas90);
        console.log('Itens tabela preço:', dadosArray);
        setcli90D(
          dadosArray.slice(
            (pagina90 - 1) * qtdePagina,
            pagina90 * qtdePagina
          ) || []
        );

        console.log('dados montados 90 dias', dadosArray);

        setShowMensageSankhya(false);
      })
      .catch((error) => {
        setvisivel(false);
        setShowMensageSankhya(false);

        console.log('erro dados grafico', error);
      });
  }

  //==================funções para adm ============================================================================
  async function ListaCoord() {
    console.log('entrou noA LISTA DOS COORDENADORES');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT CODVEND, APELIDO
        FROM TGFVEN where TIPVEND = 'G'`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('lista de coordenadores', response.data.responseBody.rows);
        const data = response.data.responseBody.rows;
        const consultor = data.map((curr: any) => {
          return {
            id: curr[0],
            nome: curr[1],
          };
        });

        let options: Array<iDataSelect> = new Array<iDataSelect>();

        consultor
          .filter(
            (promotor: any) =>
              promotor?.id == 14699 ||
              promotor?.id == 14725 ||
              promotor?.id == 14749 ||
              promotor?.id == 14771
          )
          .map((consultor: any) => {
            let listaconsultor: iDataSelect = {};
            listaconsultor.value = String(consultor.id);
            listaconsultor.label =
              String(consultor.id) + ' - ' + consultor.nome;

            options.push(listaconsultor);
          });

        setShowMensageSankhya(false);
      })
      .catch((error) => {
        setShowMensageSankhya(false);
        console.log('erro ao receber dados coordenador', error);
      });
  }

  useEffect(() => {
    LoginSankhyaAdm();
    VendasXMetaConsultAdm2();
  }, [pagina]);

  async function AtualizarCli() {
    setPagina90Cli(1);
    pagina90Cli = 1;
    setvisivel2(false);
    Clientes90dias();
    Cli90();
  }

  async function VendasXMetaConsultAdm2() {
    console.log('entrou no venda x meta ADM');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT 	ISNULL(MET.CODGER, VEN.CODGER) CODGER,
                              ISNULL(MET.NOMEGER, VEN.NOMEGER) NOMEGER,
                              ISNULL(MET.CODVEND, VEN.CODVEND) CODVEND,
                              ISNULL(MET.NOMEVEND, VEN.NOMEVEND) NOMEVEND,
                              ISNULL(MET.VLRMET, 0) VLRMET,
                              ISNULL(VEN.VLRVEN,0) VLRVEN,
                              CASE WHEN MET.VLRMET > 0 THEN
                                CASE WHEN VEN.VLRVEN / MET.VLRMET < 0.8 THEN 'RED'
                                  WHEN VEN.VLRVEN / MET.VLRMET >= 0.8 AND VEN.VLRVEN / MET.VLRMET < 1 THEN 'YELLOW'
                                  WHEN VEN.VLRVEN / MET.VLRMET >= 1 THEN 'GREEN'
                                END
                              ELSE
                                'GREY'
                              END COLOR
                          FROM (
                            SELECT VDO.CODGER, GER.APELIDO NOMEGER, MET.CODVEND, VDO.APELIDO NOMEVEND, SUM(MET.PREVREC) VLRMET
                            FROM TGFMET MET (NOLOCK)
                            LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                            LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                            WHERE YEAR(MET.DTREF) = ${AnoFilter}
                            AND MET.CODEMP <> 6 
                            AND MET.CODVEND < 30000
                            AND (MONTH(DTREF) = ${mesEscolhido} OR ${mesEscolhido} = 0)
                            AND (VDO.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VDO.CODGER IN (14699, 14725, 14749, 14771)))
                            GROUP BY VDO.CODGER, GER.APELIDO, MET.CODVEND, VDO.APELIDO
                          ) MET
                          FULL JOIN (
                            SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, VEN.CODVEND, VEN.APELIDOV NOMEVEND, SUM(FIN) VLRVEN
                            FROM AD_VVENDAS_CLI VEN
                            WHERE ANO = ${AnoFilter}
                            AND (MES = ${mesEscolhido} OR ${mesEscolhido} = 0)
                            AND (VEN.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VEN.CODGER IN (14699, 14725, 14749, 14771)))
                            GROUP BY VEN.CODGER, VEN.APELIDOG, VEN.CODVEND, VEN.APELIDOV
                          ) VEN ON VEN.CODVEND = MET.CODVEND
                          ORDER BY 1,3
                          `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log(
          'vendas x metas Consutores',
          response.data.responseBody.rows
        );

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            cod: curr[0],
            coord: curr[1],
            codConsut: curr[2],
            consult: curr[3],
            vlrMeta: curr[4],
            vlrVenda: curr[5],
            leg: curr[6],
          };
        });

        setTotalPaginas(Math.ceil(result.length / 15));
        totalPaginas = Math.ceil(result.length / 15);
        console.log('total paginas:', totalPaginas);
        console.log('Itens tabela preço:', result);
        setVendaXmetaConsutAdm(
          result.slice((pagina - 1) * qtdePagina, pagina * qtdePagina) || []
        );

        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrMeta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrVenda,
          0
        );
        setvalorTotalAnoConsult(somaAtual);
        setvalorTotalMetaConsult(somaMeta);
        let totalFaltou = 0;
        let totalPassou = 0;

        result.forEach((item: any) => {
          const diferenca = item.vlrMeta - item.vlrVenda;

          if (diferenca > 0) {
            totalFaltou += diferenca;
          } else if (diferenca < 0) {
            totalPassou += Math.abs(diferenca);
          }
        });

        console.log('Total que faltou:', totalFaltou);
        console.log('Total que passou:', totalPassou);
        setvalorTotalFaltou(totalFaltou);
        setvalorTotalPassou(totalPassou);
        console.log('criando array consutores', result);
        setSucess(90);
        setvisivel(false);

        setShowMensageSankhya(false);
      })
      .catch((error) => {
        setvisivel(false);
        setShowMensageSankhya(false);

        console.log('erro ao receber dados vendas x metas Consutores', error);
      });
  }

  async function LoginSankhyaAdm() {
    setNomeConsultorEsc(nomeConsultorDefault);
    nomeConsultorEsc = nomeConsultorDefault;
    setShowMensageSankhya(true);
    setmesAescolhido(mesEscolhido);
    setAnoescolhido(AnoFilter);
    Anoescolhido = AnoFilter;
  }

  async function LoginSankhyaPagina() {
  }

  async function LoginSankhyaDashAdm() {
    setNomeConsultorEsc(nomeConsultorDefault);
    nomeConsultorEsc = nomeConsultorDefault;
    setShowMensageSankhya(true);
    setmesAescolhido(mesEscolhido);
    setAnoescolhido(AnoFilter);
    Anoescolhido = AnoFilter;
    try {
      await DadosVendasXMetaAdm();
    } catch (error) {
      console.log('erro', error);
      await DadosVendasXMetaAdm();
    }
  }

  async function DadosVendasXMetaAdm() {
    console.log('entrou no venda x meta ADM');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT MET.MES NMES
                      , LEFT(DATENAME(MONTH, DATEADD(MONTH, MET.MES - 1, 0)),3) MES
                      , MET.VLRMET VLRMET
                      , ISNULL(VEN.VLRVEN,0) VLRVEN
                      , CASE WHEN MET.VLRMET > VEN.VLRVEN THEN 'RED' ELSE CASE WHEN MET.VLRMET = 0 THEN 'GREY' ELSE 'GREEN' END END COLOR
                    FROM (
                      SELECT MONTH(MET.DTREF) MES, SUM(MET.PREVREC) VLRMET
                      FROM TGFMET MET (NOLOCK)
                      LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                      LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                      WHERE YEAR(MET.DTREF) = ${AnoFilter}
                      AND MET.CODEMP <> 6
                      AND MET.CODVEND < 30000 
                      AND (VDO.CODGER = ${codGerente} OR ${codGerente} IS NULL )
                      GROUP BY MONTH(MET.DTREF)
                    ) MET
                    LEFT JOIN (
                      SELECT MES,  SUM(FIN) VLRVEN
                      FROM AD_VVENDAS_CLI VEN
                      WHERE ANO = ${AnoFilter}
                      AND (VEN.CODGER = ${codGerente} OR ${codGerente} IS NULL )
                      GROUP BY MES
                    ) VEN ON VEN.MES = MET.MES
                    ORDER BY 1
                  `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('vendas x metas', response.data.responseBody.rows);

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            month: curr[1],
            meta: curr[2],
            actual: curr[3],
            color: curr[4],
          };
        });

        setVendaXmeta(result);
        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.meta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.actual,
          0
        );
        localStorage.setItem('@Portal/dash/SomaMeta', String(somaMeta));
        localStorage.setItem('@Portal/dash/SomaVrlAtual', String(somaAtual));

        console.log('criando array', result);

        DadosGraficoAdm();
      })
      .catch((error) => {
        DadosGraficoAdm();
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function DadosGraficoAdm() {
    const codGer = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
    const sql = `SELECT ANT.MES NMES, LEFT(DATENAME(MONTH, DATEADD(MONTH, ANT.MES - 1, 0)), 3) MES, ANT.VLRVEN VLRANT, ISNULL(ATU.VLRVEN, 0) VLRATU
                          FROM (
                              SELECT MES, SUM(FIN) VLRVEN
                              FROM AD_VVENDAS_CLI VEN
                              WHERE ANO = YEAR(DATEADD(YEAR, -1, GETDATE()))
                              AND (VEN.CODGER = ${codGerente} OR ${codGerente} IS NULL )
                              GROUP BY MES
                          ) ANT
                          LEFT JOIN (
                              SELECT MES, SUM(FIN) VLRVEN
                              FROM AD_VVENDAS_CLI VEN
                              WHERE ANO = YEAR(GETDATE())
                              AND (VEN.CODGER = ${codGerente} OR ${codGerente} IS NULL )
                              GROUP BY MES
                          ) ATU ON ATU.MES = ANT.MES
                          ORDER BY 1`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('faturamento', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));

        settotalGraficoCd(dadosArray);

        localStorage.setItem(
          '@Portal/dash/valorAtualCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/valorAnteriorCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAnterior,
            0
          )
        );
        VendasXMetaConsultAdm();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  async function VendasXMetaConsultAdm() {
    console.log('entrou no venda x meta ADM');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT 	ISNULL(MET.CODGER, VEN.CODGER) CODGER,
                              ISNULL(MET.NOMEGER, VEN.NOMEGER) NOMEGER,
                              ISNULL(MET.CODVEND, VEN.CODVEND) CODVEND,
                              ISNULL(MET.NOMEVEND, VEN.NOMEVEND) NOMEVEND,
                              ISNULL(MET.VLRMET, 0) VLRMET,
                              ISNULL(VEN.VLRVEN,0) VLRVEN,
                              CASE WHEN MET.VLRMET > 0 THEN
                                CASE WHEN VEN.VLRVEN / MET.VLRMET < 0.8 THEN 'RED'
                                  WHEN VEN.VLRVEN / MET.VLRMET >= 0.8 AND VEN.VLRVEN / MET.VLRMET < 1 THEN 'YELLOW'
                                  WHEN VEN.VLRVEN / MET.VLRMET >= 1 THEN 'GREEN'
                                END
                              ELSE
                                'GREY'
                              END COLOR
                          FROM (
                            SELECT VDO.CODGER, GER.APELIDO NOMEGER, MET.CODVEND, VDO.APELIDO NOMEVEND, SUM(MET.PREVREC) VLRMET
                            FROM TGFMET MET (NOLOCK)
                            LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                            LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                            WHERE YEAR(MET.DTREF) = ${AnoFilter}
                            AND MET.CODEMP <> 6 
                            AND MET.CODVEND < 30000
                            AND (MONTH(DTREF) = ${mesEscolhido} OR ${mesEscolhido} = 0)
                            AND (VDO.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VDO.CODGER IN (14699, 14725, 14749, 14771)))
                            GROUP BY VDO.CODGER, GER.APELIDO, MET.CODVEND, VDO.APELIDO
                          ) MET
                          FULL JOIN (
                            SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, VEN.CODVEND, VEN.APELIDOV NOMEVEND, SUM(FIN) VLRVEN
                            FROM AD_VVENDAS_CLI VEN
                            WHERE ANO = ${AnoFilter}
                            AND (MES = ${mesEscolhido} OR ${mesEscolhido} = 0)
                            AND (VEN.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VEN.CODGER IN (14699, 14725, 14749, 14771)))
                            GROUP BY VEN.CODGER, VEN.APELIDOG, VEN.CODVEND, VEN.APELIDOV
                          ) VEN ON VEN.CODVEND = MET.CODVEND
                          ORDER BY 1,3`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log(
          'vendas x metas Consutores',
          response.data.responseBody.rows
        );

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            cod: curr[0],
            coord: curr[1],
            codConsut: curr[2],
            consult: curr[3],
            vlrMeta: curr[4],
            vlrVenda: curr[5],
            leg: curr[6],
          };
        });

        setTotalPaginas(Math.ceil(result.length / 15));
        totalPaginas = Math.ceil(result.length / 15);
        console.log('total paginas:', totalPaginas);
        console.log('Itens tabela preço:', result);
        setVendaXmetaConsutAdm(
          result.slice((pagina - 1) * qtdePagina, pagina * qtdePagina) || []
        );

        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrMeta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrVenda,
          0
        );
        setvalorTotalAnoConsult(somaAtual);
        setvalorTotalMetaConsult(somaMeta);
        let totalFaltou = 0;
        let totalPassou = 0;

        result.forEach((item: any) => {
          const diferenca = item.vlrMeta - item.vlrVenda;

          if (diferenca > 0) {
            totalFaltou += diferenca;
          } else if (diferenca < 0) {
            totalPassou += Math.abs(diferenca);
          }
        });

        console.log('Total que faltou:', totalFaltou);
        console.log('Total que passou:', totalPassou);
        setvalorTotalFaltou(totalFaltou);
        setvalorTotalPassou(totalPassou);
        console.log('criando array consutores', result);
        setSucess(50);

        VendasXMetaMesAdm();
      })
      .catch((error) => {
        VendasXMetaMesAdm();

        console.log('erro ao receber dados vendas x metas Consutores', error);
      });
  }
  async function VendasXMetaMesAdm() {
    console.log('entrou no venda x meta ADM');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT 	ISNULL(MET.CODGER, VEN.CODGER) CODGER,
                              ISNULL(MET.NOMEGER, VEN.NOMEGER) NOMEGER,
                              ISNULL(MET.VLRMET, 0) VLRMET,
                              ISNULL(VEN.VLRVEN,0) VLRVEN,
                              CASE WHEN MET.VLRMET > 0 THEN
                                CASE WHEN VEN.VLRVEN / MET.VLRMET < 0.8 THEN 'RED'
                                  WHEN VEN.VLRVEN / MET.VLRMET >= 0.8 AND VEN.VLRVEN / MET.VLRMET < 1 THEN 'YELLOW'
                                  WHEN VEN.VLRVEN / MET.VLRMET >= 1 THEN 'GREEN'
                                END
                              ELSE
                                'GREY'
                              END COLOR
                          FROM (
                            SELECT VDO.CODGER, GER.APELIDO NOMEGER, SUM(MET.PREVREC) VLRMET
                            FROM TGFMET MET (NOLOCK)
                            LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                            LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                            WHERE YEAR(MET.DTREF) = ${AnoFilter}
                            AND MET.CODEMP <> 6 
                            AND MET.CODVEND < 30000
                            AND (MONTH(DTREF) = ${mesEscolhido} OR ${mesEscolhido} = 0)
                            AND (VDO.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VDO.CODGER IN (14699, 14725, 14749, 14771)))
                            GROUP BY VDO.CODGER, GER.APELIDO
                          ) MET
                          FULL JOIN (
                            SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, SUM(FIN) VLRVEN
                            FROM AD_VVENDAS_CLI VEN
                            WHERE VEN.ANO = ${AnoFilter}
                            AND (MES = ${mesEscolhido} OR ${mesEscolhido} = 0)
                            AND (VEN.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VEN.CODGER IN (14699, 14725, 14749, 14771)))
                            GROUP BY VEN.CODGER, VEN.APELIDOG
                          ) VEN ON VEN.CODGER = MET.CODGER
                          ORDER BY 1,3`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log(
          'vendas x metas Consutores',
          response.data.responseBody.rows
        );

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            cod: curr[0],
            coord: curr[1],
            vlrMeta: curr[2],
            vlrVenda: curr[3],
            leg: curr[4],
          };
        });
        setMesVendaXmetaConsutMes(result);
        data.map((curr: any) => {
          setNomeConsultor(curr[1]);
        });
        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrMeta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.vlrVenda,
          0
        );
        setvalorTotalAnoTot(somaAtual);
        setvalorTotalMetaTot(somaMeta);
        setSucess(100);

        DadosGraficoAdmCoord();
      })
      .catch((error) => {
        console.log('erro ao receber dados vendas x metas Consutores', error);
      });
  }

  async function DadosGraficoAdmCoord() {
    const sql = `SELECT ANT.MES NMES, LEFT(DATENAME(MONTH, DATEADD(MONTH, ANT.MES - 1, 0)), 3) MES, ANT.VLRVEN VLRANT, ISNULL(ATU.VLRVEN, 0) VLRATU
                            FROM (
                                SELECT MES, SUM(FIN) VLRVEN
                                FROM AD_VVENDAS_CLI VEN
                                WHERE ANO = YEAR(DATEADD(YEAR, -1, GETDATE()))
                                AND (VEN.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VEN.CODGER IN (14699, 14725, 14749, 14771)))
                                GROUP BY MES
                            ) ANT
                            LEFT JOIN (
                                SELECT MES, SUM(FIN) VLRVEN
                                FROM AD_VVENDAS_CLI VEN
                                WHERE ANO = YEAR(GETDATE())
                                AND (VEN.CODGER = ${codGerente} OR (${codGerente} IS NULL AND VEN.CODGER IN (14699, 14725, 14749, 14771)))
                                GROUP BY MES
                            ) ATU ON ATU.MES = ANT.MES
                            ORDER BY 1`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('resposta do grafico', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));
        settotalGraficoCoord(dadosArray);
        console.log('dados montados', dadosArray);

        clientesSemVenda();
      })
      .catch((error) => {
        clientesSemVenda();

        console.log('erro dados grafico', error);
      });
  }
  //================VENDEDORES COM CLIENTES COM MAIS DE 90 DIAS SEM VENDA =================================

  async function clientesSemVenda() {
    const sql = `
        SELECT GERCOD, GERNOME, VENCOD, VENNOME, COUNT(*) AS CLI_90D
        FROM AD_VCLIENTES 
        WHERE DTNEG >= DATEADD(day, -90, GETDATE()) 
        AND GERCOD IN (14725, 14699, 14749) 
        AND (GERCOD = ${codGerente} OR ${codGerente} IS NULL)
        AND ATIVO = 1
        GROUP BY GERCOD, GERNOME,VENCOD, VENNOME
        ORDER BY CLI_90D DESC
      `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('clientes 90 dias sem venda', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Gercod: item[0],
          Gernome: item[1],
          Vencod: item[2],
          Vennome: item[3],
          Cli_90D: item[4],
        }));

        setTotalPaginas90(Math.ceil(dadosArray.length / 15));
        totalPaginas90 = Math.ceil(dadosArray.length / 15);
        console.log('total paginas:', totalPaginas90);
        console.log('Itens tabela preço:', dadosArray);
        setcli90D(
          dadosArray.slice(
            (pagina90 - 1) * qtdePagina,
            pagina90 * qtdePagina
          ) || []
        );

        console.log('dados montados 90 dias', dadosArray);

        setShowMensageSankhya(false);
      })
      .catch((error) => {
        setvisivel(false);
        setShowMensageSankhya(false);

        console.log('erro dados grafico', error);
      });
  }

  //===============================================================================================================

  const [somaMedia, setSomaMedia] = useState(0);
  //=========funç~es de pesquisa dos cliente ==========================================================
  function obterMesAtual() {
    var data = new Date();
    var mes = data.getMonth() + 1;

    return mes;
  }

  var mesAtual = obterMesAtual();
  console.log('mes atual', mesAtual);

  //=================CONSULTA CLIENTES 90 DIAS ================================
  let [diasSemCompra, setdiasSemCompra] = useState('90');
  const [ufEscolhida, setufEscolhida] = useState(null);
  const [ativo, setAtivo] = useState('1');
  let [codVendedor, setcodVendedor] = useState(0);

  async function Clientes90dias() {
    try {
      await Cli90();
    } catch (error) {
      console.log('erro', error);
    }
  }
  async function Cli90() {
    setSucess(20);
    setShowMensageSankhya(true);
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT * FROM AD_VCLIENTES
                        WHERE dias >= ${diasSemCompra}
                        AND (VENCOD  = ${codVendedor} OR ${codVendedor} IS NULL)
                        AND (CODUF  = ${ufEscolhida} OR ${ufEscolhida} IS NULL)
                            AND VENCOD <> 0
                        AND (ATIVO  = ${ativo} OR ${ativo} IS NULL)
                        ORDER BY DIAS DESC`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('vendas clientes 90 dias', response.data.responseBody);

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            dias: curr[16],
            codpar: curr[4],
            nomepar: curr[5],
            cgc_cpf: curr[6],
            uf: curr[8],
            nomecid: curr[9],
            endereco: curr[10],
            complemento: curr[11],
            telefone: curr[12],
            email: curr[13],
            ult_nunota: curr[14],
            dtneg: curr[15],
            vlrnota: curr[17],
            ativo: curr[18],
            negociacao: curr[20],
            tabpreco_ind: curr[21],
            tabpreco_dis: curr[22],
          };
        });

        setTotalPaginas90Cli(Math.ceil(result.length / 15));
        totalPaginas90Cli = Math.ceil(result.length / 15);
        console.log('total paginas:', totalPaginas90Cli);
        console.log('Itens tabela preço:', result);
        setclientes90dias(
          result.slice(
            (pagina90Cli - 1) * qtdePagina,
            pagina90Cli * qtdePagina
          ) || []
        );
        clientes90dias =
          result.slice(
            (pagina90Cli - 1) * qtdePagina,
            pagina90Cli * qtdePagina
          ) || [];
        setShowMensageSankhya(false);
      })
      .catch((error) => {
        setShowMensageSankhya(false);

        console.log('erro ao receber dados clientes', error);
      });
  }
  //===========================================================================

  async function VendasClientes(codVend: any) {
    try {
      await VendasCli(codVend);
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function VendasCli(codVend: any) {
    setSucess(20);
    setShowMensageSankhya(true);
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT CODVEND, CONCAT(UF, '-', CLIENTE) AS CLIENTR, CODPARC,
                      SUM(CASE WHEN MES = ${mesAtual} THEN FIN ELSE 0 END) AS ULTIMO_MES,
                      SUM(CASE WHEN MES = ${mesAtual} - 1 THEN FIN ELSE 0 END) AS PENULTIMO_MES,
                      SUM(CASE WHEN MES = ${mesAtual} - 2 THEN FIN ELSE 0 END) AS ANTEPENULTIMO_MES,
                      SUM(CASE WHEN MES = ${mesAtual} - 3 THEN FIN ELSE 0 END) AS QUARTO_MES,
                      SUM(CASE WHEN MES = ${mesAtual} - 4 THEN FIN ELSE 0 END) AS QUINTO_MES
                    FROM AD_VVENDAS_CLI
                    WHERE ANO = ${AnoFilter}
                    AND MES >= ${mesAtual} - 4 AND MES <= ${mesAtual}
                    AND CODVEND = ${codVend}
                    GROUP BY CODVEND, CONCAT(UF, '-', CLIENTE), CODPARC
                    ORDER BY CONCAT(UF, '-', CLIENTE) ASC`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('vendas clientes', response.data.responseBody.rows);

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            cliente: curr[1],
            quinto: curr[3],
            quarto: curr[4],
            terceiro: curr[5],
            segundo: curr[6],
            primeiro: curr[7],
          };
        });

        setClienteVendaMeta(result);
        VendasMetaConsult(codVend);
        const somaMedias = result.reduce((acc: any, meta: any) => {
          const valores = [
            meta?.quarto,
            meta?.terceiro,
            meta?.segundo,
            meta?.primeiro,
          ];
          const soma = valores.reduce(
            (acc, valor) => acc + (parseFloat(valor) || 0),
            0
          );
          const media = valores.length > 0 ? soma / valores.length : 0;
          return acc + parseFloat(media.toFixed(2));
        }, 0);

        setSomaMedia(somaMedias);
      })
      .catch((error) => {
        console.log('erro ao receber dados clientes', error);
      });
  }

  let [meta0, setmeta0] = useState(0);
  let [meta1, setmeta1] = useState(0);
  let [meta2, setmeta2] = useState(0);
  let [meta3, setmeta3] = useState(0);
  let [meta4, setmeta4] = useState(0);
  let [valor0, setvalor0] = useState(0);
  let [valor1, setvalor1] = useState(0);
  let [valor2, setvalor2] = useState(0);
  let [valor3, setvalor3] = useState(0);
  let [valor4, setvalor4] = useState(0);

  async function VendasMetaConsult(codVend: any) {
    setSucess(60);
    console.log('entrou no venda x meta');
    console.log('ano escolhid', AnoFilter);

    const sql = `SELECT MET.MES,
                        SUM(CASE WHEN MET.MES = ${mesAtual} THEN MET.VLRMET ELSE 0 END) AS META_ULTIMO_MES,
                        SUM(CASE WHEN MET.MES = ${mesAtual} - 1 THEN MET.VLRMET ELSE 0 END) AS META_PENULTIMO_MES,
                        SUM(CASE WHEN MET.MES = ${mesAtual} - 2 THEN MET.VLRMET ELSE 0 END) AS META_ANTEPENULTIMO_MES,
                        SUM(CASE WHEN MET.MES = ${mesAtual} - 3 THEN MET.VLRMET ELSE 0 END) AS META_QUARTO_MES,
                        SUM(CASE WHEN MET.MES = ${mesAtual} - 4 THEN MET.VLRMET ELSE 0 END) AS META_QUINTO_MES,
                        SUM(CASE WHEN VEN.MES = ${mesAtual} THEN VEN.VLRVEN ELSE 0 END) AS VLRVEN_ULTIMO_MES,
                        SUM(CASE WHEN VEN.MES = ${mesAtual} - 1 THEN VEN.VLRVEN ELSE 0 END) AS VLRVEN_PENULTIMO_MES,
                        SUM(CASE WHEN VEN.MES = ${mesAtual} - 2 THEN VEN.VLRVEN ELSE 0 END) AS VLRVEN_ANTEPENULTIMO_MES,
                        SUM(CASE WHEN VEN.MES = ${mesAtual} - 3 THEN VEN.VLRVEN ELSE 0 END) AS VLRVEN_QUARTO_MES,
                        SUM(CASE WHEN VEN.MES = ${mesAtual} - 4 THEN VEN.VLRVEN ELSE 0 END) AS VLRVEN_QUINTO_MES
                      FROM (
                      SELECT MONTH(DTREF) MES, SUM(PREVREC) VLRMET
                      FROM TGFMET (NOLOCK)
                      WHERE YEAR(DTREF) = ${AnoFilter}
                      AND MONTH(DTREF) >= ${mesAtual} - 4 AND MONTH(DTREF) <= ${mesAtual}
                      AND CODVEND = ${codVend}
                      AND CODEMP <> 6 
                      AND CODVEND < 30000
                      GROUP BY MONTH(DTREF)
                      ) MET
                      LEFT JOIN (
                      SELECT MES, SUM(FIN) VLRVEN
                      FROM AD_VVENDAS_CLI
                      WHERE ANO = ${AnoFilter}
                      AND MES >= ${mesAtual} - 4 AND MES <= ${mesAtual}
                      AND CODVEND = ${codVend}
                      GROUP BY MES
                      ) VEN ON VEN.MES = MET.MES
                      GROUP BY MET.MES`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('cabecalho', response.data.responseBody);
        console.log('vendas x metas vendedor', response.data.responseBody.rows);

        const data = response.data.responseBody.rows.map(
          (valores: number[]) => {
            return valores.filter((valor) => valor !== 0);
          }
        );

        console.log('valores a exibir', data);
        const meta4 = response.data.responseBody.rows[0][5];
        setmeta4(meta4);
        const valor4 = response.data.responseBody.rows[0][10];
        setvalor4(valor4);
        const meta3 = response.data.responseBody.rows[1][4];
        setmeta3(meta3);
        const valor3 = response.data.responseBody.rows[1][9];
        setvalor3(valor3);
        const meta2 = response.data.responseBody.rows[2][3];
        setmeta2(meta2);
        const valor2 = response.data.responseBody.rows[2][8];
        setvalor2(valor2);
        const meta1 = response.data.responseBody.rows[3][2];
        setmeta1(meta1);
        const valor1 = response.data.responseBody.rows[3][7];
        setvalor1(valor1);
        const meta0 = response.data.responseBody.rows[4][1];
        setmeta0(meta0);
        const valor0 = response.data.responseBody.rows[4][6];
        setvalor0(valor0);

        const result1 = data.map((curr: any) => {
          return {
            valor: curr[1],
          };
        });
        const result2 = data.map((curr: any) => {
          return {
            valor: curr[2],
          };
        });
        setMetaVendedor(result1);
        setValorVendedor(result2);
        setSucess(100);
        setvisivel(false);
        setShowMensageSankhya(false);
        setShowModalVendaXMeta(true);
      })
      .catch((error) => {
        setSucess(100);
        setvisivel(false);
        setShowMensageSankhya(false);
        console.log('erro ao receber dados clientes', error);
      });
  }

  //====================================================================================================

  function logado() {
    if (!usuario.token) {
      history('/');
    }
  }

  async function GetgrupoUsuarioId() {
    await api

      .get(`/api/GrupoUsuario/${usuario.grupoId}`)
      .then((response) => {})
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const state = {
    series: [
      {
        name: 'Ano Atual',
        data: valorAnoAtual.map((valor) =>
          parseFloat(formatter.format(valor).replace(/[^\d.-]/g, ''))
        ),
      },
      {
        name: 'Ano Anterior',
        data: valorAnoAnterior.map((valor) =>
          parseFloat(formatter.format(valor).replace(/[^\d.-]/g, ''))
        ),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 330,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20px',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    },
  };

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
              <SideNavBar />
              <NavbarDashHeader />
              <div className="titulo-page titulo-page3">
                <h1>ACOMPANHAMENTO DE CAMAPANHAS</h1>
                <div></div>
              </div>
              <div className="contain2">
                {visivel ? (
                  <>
                    <div className="barraPesquCoord">
                      <div className="columDupla">
                        <div className=" divcontinp">
                          <div className="bloco-input blocoCamp ">
                            <p
                              style={{ marginBottom: 10 }}
                              className="title-input"
                            >
                              Campanhas:
                            </p>
                            <select
                              className="form-select select campo-select"
                              id="grupo-create"
                              aria-label=""
                              onChange={(e) => {
                                setcodGerente(e.target.value);

                                AtualizarDash(e.target.value);
                              }}
                            >
                              {consultorPesquisa.map((camp) => (
                                <option value={camp.value}>{camp.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="divBloc"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="divbuttondrop">
                  <button
                    className="buttondropTitle"
                    onClick={() => {
                      if (!visivel) {
                        setvisivel(true);
                      } else {
                        setvisivel(false);
                      }
                    }}
                  >
                    Filtros{' '}
                    {visivel ? (
                      <IoIosArrowUp fontSize={20} />
                    ) : (
                      <IoIosArrowDown fontSize={20} />
                    )}{' '}
                  </button>
                </div>
                <div className="tarjaCamp">
                  <h1
                    className="titull"
                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                  >
                    {nomeCampanha}
                  </h1>
                </div>
                {campanhaMes.length > 0 ? (
                  <>
                    <div
                      className={
                        display
                          ? 'conteudoDashBlackCoord'
                          : 'conteudoDashCoordC'
                      }
                    >
                      {usuario.grupoId == 5 ? (
                        <>
                          <div
                            className={
                              display
                                ? 'bloco-graficoBlackCoord2'
                                : 'bloco-graficoC'
                            }
                          >
                            <h1
                              className="textTit"
                              style={{
                                marginLeft: 20,
                                marginTop: 10,
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              VALORES POR CAMPANHA
                            </h1>
                            <div className="separador2"></div>
                            <div
                              className={
                                'table-responsive table-scroll  tablecamp'
                              }
                            >
                              <div className=" table-wrap">
                                <Table
                                  responsive
                                  className="table-global table  main-table "
                                >
                                  <thead>
                                    <tr className="tituloTab">
                                      <th
                                        style={{ textAlign: 'center' }}
                                        className="th1"
                                      >
                                        Mês
                                      </th>
                                      <th
                                        style={{ textAlign: 'right' }}
                                        className="th1"
                                      >
                                        Meta
                                      </th>
                                      <th
                                        style={{ textAlign: 'right' }}
                                        className="th1"
                                      >
                                        Real
                                      </th>
                                      <th
                                        style={{ textAlign: 'right' }}
                                        className="th1"
                                      >
                                        Passou
                                      </th>
                                      <th
                                        style={{ textAlign: 'right' }}
                                        className="th1"
                                      >
                                        Faltou
                                      </th>
                                      <th
                                        style={{ textAlign: 'right' }}
                                        className="th1"
                                      >
                                        Percent.
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {campanhaGeralCoord.map((camp) => (
                                      <tr>
                                        <td
                                          style={{ textAlign: 'center' }}
                                          className=""
                                        >
                                          {camp?.Mes}
                                        </td>
                                        <td
                                          style={{ textAlign: 'right' }}
                                          className=""
                                        >
                                          R$ {moeda(camp?.Meta)}
                                        </td>
                                        <td
                                          style={{ textAlign: 'right' }}
                                          className=""
                                        >
                                          R$ {moeda(camp?.Valor)}
                                        </td>
                                        <td
                                          style={{ textAlign: 'right' }}
                                          className=""
                                        >
                                          R${' '}
                                          {camp?.Valor - camp.Meta > 0
                                            ? moeda(camp?.Valor - camp.Meta)
                                            : '0,00'}
                                        </td>
                                        <td
                                          style={{ textAlign: 'right' }}
                                          className=""
                                        >
                                          R${' '}
                                          {camp?.Meta - camp.Valor > 0
                                            ? moeda(camp?.Meta - camp.Valor)
                                            : '0,00'}
                                        </td>
                                        <td
                                          style={
                                            camp.Valor < camp.Meta
                                              ? {
                                                  textAlign: 'right',
                                                  color: 'red',
                                                }
                                              : {
                                                  textAlign: 'right',
                                                  color: '#198754',
                                                }
                                          }
                                          className="th1"
                                        >
                                          {camp?.Valor &&
                                            camp?.Meta &&
                                            `${(
                                              (camp?.Valor / camp?.Meta) *
                                              100
                                            ).toFixed(2)}`}
                                          %
                                        </td>
                                      </tr>
                                    ))}
                                    <tr id="trBody">
                                      <td className=""></td>
                                      <td
                                        style={{
                                          textAlign: 'right',
                                          fontWeight: 'bold',
                                        }}
                                        className=""
                                      >
                                        R$ {moeda(valorTotalMetaCampGer)}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: 'right',
                                          fontWeight: 'bold',
                                        }}
                                        className=""
                                      >
                                        R$ {moeda(valorTotalValorCampGer)}
                                      </td>
                                      <td className=""></td>
                                      <td className=""></td>
                                      <td className=""></td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                            <div className="separador"></div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div
                        className={
                          display
                            ? 'bloco-graficoBlackCoord2'
                            : 'bloco-graficoC'
                        }
                      >
                        <h1
                          className="textTit"
                          style={{
                            marginLeft: 20,
                            marginTop: 10,
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}
                        >
                          {usuario.grupoId == 2
                            ? 'VALORES POR CAMPANHA'
                            : 'VALORES VENDEDORES POR CAMPANHA'}
                        </h1>
                        <div className="separador2"></div>
                        <div
                          className={'table-responsive table-scroll  tablecamp'}
                        >
                          <div className=" table-wrap">
                            <Table
                              responsive
                              className="table-global table  main-table "
                            >
                              <thead>
                                <tr className="tituloTab">
                                  {usuario.grupoId != 2 ? (
                                    <>
                                      <th
                                        style={{ textAlign: 'center' }}
                                        className="th2"
                                      >
                                        Código
                                      </th>
                                      <th
                                        style={{ textAlign: 'left' }}
                                        className="th1"
                                      >
                                        Vendedor
                                      </th>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Meta
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Real
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Percent.
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Passou
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Faltou
                                  </th>
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="th2"
                                  >
                                    Leg
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {campanhaGeral.map((camp) => (
                                  <tr>
                                    {usuario.grupoId != 2 ? (
                                      <>
                                        <td
                                          style={{ textAlign: 'center' }}
                                          className=""
                                        >
                                          {camp?.Codigo}
                                        </td>
                                        <td
                                          style={{ textAlign: 'left' }}
                                          className=""
                                        >
                                          {camp?.Vendedor}
                                        </td>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R$ {moeda(camp?.Meta)}
                                    </td>
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R$ {moeda(camp?.Valor)}
                                    </td>
                                    <td
                                      style={
                                        camp.Valor < camp.Meta
                                          ? { textAlign: 'right', color: 'red' }
                                          : {
                                              textAlign: 'right',
                                              color: '#198754',
                                            }
                                      }
                                      className="th1"
                                    >
                                      {camp?.Valor &&
                                        camp?.Meta &&
                                        `${(
                                          (camp?.Valor / camp?.Meta) *
                                          100
                                        ).toFixed(2)}`}
                                      %
                                    </td>
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R${' '}
                                      {camp?.Valor - camp.Meta > 0
                                        ? moeda(camp?.Valor - camp.Meta)
                                        : '0,00'}
                                    </td>
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R${' '}
                                      {camp?.Meta - camp.Valor > 0
                                        ? moeda(camp?.Meta - camp.Valor)
                                        : '0,00'}
                                    </td>
                                    <td
                                      style={{ textAlign: 'center' }}
                                      className=""
                                    >
                                      <AiTwotoneCheckCircle
                                        style={{ color: `${camp?.Leg}` }}
                                      />
                                    </td>
                                  </tr>
                                ))}
                                {usuario.grupoId != 2 ? (
                                  <>
                                    <tr id="trBody">
                                      <td className=""></td>
                                      <td className=""></td>
                                      <td
                                        style={{
                                          textAlign: 'right',
                                          fontWeight: 'bold',
                                        }}
                                        className=""
                                      >
                                        R$ {moeda(valorTotalMetaCamp)}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: 'right',
                                          fontWeight: 'bold',
                                        }}
                                        className=""
                                      >
                                        R$ {moeda(valorTotalValorCamp)}
                                      </td>
                                      <td className=""></td>
                                      <td className=""></td>
                                      <td className=""></td>
                                      <td className=""></td>
                                    </tr>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        <div className="separador"></div>
                      </div>
                      <div
                        className={
                          display
                            ? 'bloco-graficoBlackCoord2'
                            : 'bloco-graficoC'
                        }
                      >
                        <h1
                          className="textTit"
                          style={{
                            marginLeft: 20,
                            marginTop: 10,
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}
                        >
                          MES À MES
                        </h1>
                        <div className="separador2"></div>
                        <div
                          className={'table-responsive table-scroll  tablecamp'}
                        >
                          <div className=" table-wrap">
                            <Table
                              responsive
                              className="table-global table  main-table "
                            >
                              <thead>
                                <tr className="tituloTab">
                                  {usuario.grupoId != 2 ? (
                                    <>
                                      <th
                                        style={{ textAlign: 'center' }}
                                        className="th2"
                                      >
                                        Código
                                      </th>
                                      <th
                                        style={{ textAlign: 'left' }}
                                        className="th1"
                                      >
                                        Vendedor
                                      </th>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="th1"
                                  >
                                    Mês
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Meta
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Real
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Percent.
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Passou
                                  </th>
                                  <th
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    Faltou
                                  </th>
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="th2"
                                  >
                                    Leg
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {campanhaMes.map((camp) => (
                                  <tr>
                                    {usuario.grupoId != 2 ? (
                                      <>
                                        <td
                                          style={{ textAlign: 'center' }}
                                          className=""
                                        >
                                          {camp?.Codigo}
                                        </td>
                                        <td
                                          style={{ textAlign: 'left' }}
                                          className=""
                                        >
                                          {camp?.Vendedor}
                                        </td>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    <td
                                      style={{ textAlign: 'center' }}
                                      className=""
                                    >
                                      {camp?.Mes}
                                    </td>
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R$ {moeda(camp?.Meta)}
                                    </td>
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R$ {moeda(camp?.Valor)}
                                    </td>
                                    <td
                                      style={
                                        camp.Valor < camp.Meta
                                          ? { textAlign: 'right', color: 'red' }
                                          : {
                                              textAlign: 'right',
                                              color: '#198754',
                                            }
                                      }
                                      className="th1"
                                    >
                                      {camp?.Valor &&
                                        camp?.Meta &&
                                        `${(
                                          (camp?.Valor / camp?.Meta) *
                                          100
                                        ).toFixed(2)}`}
                                      %
                                    </td>
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R${' '}
                                      {camp?.Valor - camp.Meta > 0
                                        ? moeda(camp?.Valor - camp.Meta)
                                        : '0,00'}
                                    </td>
                                    <td
                                      style={{ textAlign: 'right' }}
                                      className=""
                                    >
                                      R${' '}
                                      {camp?.Meta - camp.Valor > 0
                                        ? moeda(camp?.Meta - camp.Valor)
                                        : '0,00'}
                                    </td>
                                    <td
                                      style={{ textAlign: 'center' }}
                                      className=""
                                    >
                                      <AiTwotoneCheckCircle
                                        style={{ color: `${camp?.Leg}` }}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        <div className="separador"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{ margin: 'auto' }}
                      className="alert alert-warning "
                      role="alert"
                    >
                      Nenhum resultado encontrado.
                    </div>
                  </>
                )}
              </div>
            </div>
            <Modal
              className="modal-confirm"
              show={showMensageSankhya}
              onHide={handleCloseMensageSankhya}
              backdrop="static"
            >
              <Modal.Body>
                <img id="logoSankhya" src={logoSankhya} alt="" />
                <h1 style={{ marginTop: 15 }}>Carregando dados</h1>
                <h1 style={{ marginTop: 15 }}></h1>
                <ProgressBar className="progress" animated now={sucess} />
              </Modal.Body>
            </Modal>
            <Modal
              className="modal-vendaxmeta"
              show={showModalVendaXMeta}
              onHide={handleCloseModalVendaXMeta}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <h1> VENDAS X META CLIENTES DO CONSULTOR : {nomeVendedor}</h1>
              </Modal.Header>
              <Modal.Body>
                <div style={{ marginTop: 25 }}></div>
                <div className="div-btn-export">
                  <SiMicrosoftexcel
                    fontSize={35}
                    onClick={handleDownloadExcel}
                    className="btn-Export"
                  />
                  <FaRegFilePdf
                    fontSize={35}
                    onClick={handleDownloadPDF}
                    className="btn-ExportpDF"
                  />
                </div>
                <div className="separador"></div>
                <div className={'table-responsive table-scroll  tableCoord3'}>
                  <div className=" table-wrap">
                    <Table
                      ref={tableRef}
                      id="MyTable"
                      responsive
                      className="table-global table  main-table "
                    >
                      <thead>
                        <tr className="tituloTab">
                          <th
                            style={{ textAlign: 'center', display: 'none' }}
                            className="th2"
                          ></th>
                          <th
                            style={{
                              textAlign: 'center',
                              color: 'transparent',
                              display: 'none',
                            }}
                            className="th2"
                          ></th>
                          <th
                            style={{
                              textAlign: 'center',
                              color: 'transparent',
                            }}
                            className="th2"
                          ></th>
                          <th style={{ textAlign: 'right' }}>0</th>
                          <th style={{ textAlign: 'right' }} className="th2">
                            - 1
                          </th>
                          <th style={{ textAlign: 'right' }} className="th2">
                            - 2
                          </th>
                          <th style={{ textAlign: 'right' }} className="th2">
                            - 3
                          </th>
                          <th style={{ textAlign: 'right' }} className="th2">
                            - 4
                          </th>
                          <th
                            style={{
                              textAlign: 'center',
                              color: 'transparent',
                            }}
                            className="th2"
                          ></th>
                        </tr>
                        <tr className="tituloTab">
                          <th
                            style={{ textAlign: 'left', display: 'none' }}
                            className="th2"
                          >
                            Vendedor
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Nome Cliente
                          </th>
                          <th
                            style={{ textAlign: 'left', display: 'none' }}
                            className="th2"
                          >
                            Plano de Ativação Cliente
                          </th>
                          {months?.map((mes) => (
                            <th style={{ textAlign: 'right' }} className="th2">
                              {mes}
                            </th>
                          ))}
                          <th style={{ textAlign: 'right' }} className="th2">
                            Média 4 ultimos
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clienteVendaMeta.map((meta) => {
                          const valores = [
                            meta?.quarto,
                            meta?.terceiro,
                            meta?.segundo,
                            meta?.primeiro,
                          ];
                          const soma = valores.reduce(
                            (acc, valor) => acc + (valor || 0),
                            0
                          );
                          const media =
                            valores.length > 0 ? soma / valores.length : 0;
                          return (
                            <tr>
                              <td
                                style={{ textAlign: 'left', display: 'none' }}
                              >
                                {nomeVendedor}
                              </td>
                              <td style={{ textAlign: 'left' }}>
                                {meta?.cliente}
                              </td>
                              <td
                                style={{ textAlign: 'left', display: 'none' }}
                              >
                                .
                              </td>
                              <td
                                style={
                                  meta?.quinto == 0
                                    ? { color: 'red', textAlign: 'right' }
                                    : { textAlign: 'right' }
                                }
                              >
                                R$ {moeda(meta?.quinto)}
                              </td>
                              <td
                                style={
                                  meta?.quarto == 0
                                    ? { color: 'red', textAlign: 'right' }
                                    : { textAlign: 'right' }
                                }
                              >
                                R$ {moeda(meta?.quarto)}
                              </td>
                              <td
                                style={
                                  meta?.terceiro == 0
                                    ? { color: 'red', textAlign: 'right' }
                                    : { textAlign: 'right' }
                                }
                              >
                                R$ {moeda(meta?.terceiro)}
                              </td>
                              <td
                                style={
                                  meta?.segundo == 0
                                    ? { color: 'red', textAlign: 'right' }
                                    : { textAlign: 'right' }
                                }
                              >
                                R$ {moeda(meta?.segundo)}
                              </td>
                              <td
                                style={
                                  meta?.primeiro == 0
                                    ? { color: 'red', textAlign: 'right' }
                                    : { textAlign: 'right' }
                                }
                              >
                                R$ {moeda(meta?.primeiro)}
                              </td>
                              <td
                                style={
                                  media == 0
                                    ? { color: 'red', textAlign: 'right' }
                                    : { textAlign: 'right' }
                                }
                              >
                                R$ {moeda(media)}
                              </td>
                            </tr>
                          );
                        })}
                        <tr id="trBody2" style={{ fontWeight: 'bold' }}>
                          <td style={{ display: 'none' }} className=""></td>
                          <td className="">TOTAL</td>
                          <td style={{ display: 'none' }} className=""></td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(valor0) == '' ? '0,00' : moeda(valor0)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(valor1) == '' ? '0,00' : moeda(valor1)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(valor2) == '' ? '0,00' : moeda(valor2)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(valor3) == '' ? '0,00' : moeda(valor3)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(valor4) == '' ? '0,00' : moeda(valor4)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(somaMedia)}
                          </td>
                        </tr>
                        <tr
                          style={{
                            fontWeight: 'bold',
                            backgroundColor: '#ffff00',
                          }}
                        >
                          <td style={{ display: 'none' }} className=""></td>
                          <td className="">META</td>
                          <td style={{ display: 'none' }} className=""></td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(meta0) == '' ? '0,00' : moeda(meta0)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(meta1) == '' ? '0,00' : moeda(meta1)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(meta2) == '' ? '0,00' : moeda(meta2)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(meta3) == '' ? '0,00' : moeda(meta3)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R$ {moeda(meta4) == '' ? '0,00' : moeda(meta4)}
                          </td>
                          <td className=""></td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                          <td style={{ display: 'none' }} className=""></td>
                          <td className="">%</td>
                          <td style={{ display: 'none' }} className=""></td>
                          <td style={{ textAlign: 'right' }} className="">
                            {isNaN(valor0) || isNaN(meta0) || meta0 === 0
                              ? '0,00%'
                              : (
                                  (Number(valor0.toFixed(2)) /
                                    Number(meta0.toFixed(2))) *
                                  100
                                ).toFixed(2) + '%'}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            {isNaN(valor1) || isNaN(meta1) || meta1 === 0
                              ? '0,00%'
                              : (
                                  (Number(valor1.toFixed(2)) /
                                    Number(meta1.toFixed(2))) *
                                  100
                                ).toFixed(2) + '%'}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            {isNaN(valor2) || isNaN(meta2) || meta2 === 0
                              ? '0,00%'
                              : (
                                  (Number(valor2.toFixed(2)) /
                                    Number(meta2.toFixed(2))) *
                                  100
                                ).toFixed(2) + '%'}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            {isNaN(valor3) || isNaN(meta3) || meta3 === 0
                              ? '0,00%'
                              : (
                                  (Number(valor3.toFixed(2)) /
                                    Number(meta3.toFixed(2))) *
                                  100
                                ).toFixed(2) + '%'}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            {isNaN(valor4) || isNaN(meta4) || meta4 === 0
                              ? '0,00%'
                              : (
                                  (Number(valor4.toFixed(2)) /
                                    Number(meta4.toFixed(2))) *
                                  100
                                ).toFixed(2) + '%'}
                          </td>
                          <td className=""></td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                          <td style={{ display: 'none' }} className=""></td>
                          <td className="">PASSA / FALTA</td>
                          <td style={{ display: 'none' }} className=""></td>
                          <td style={{ textAlign: 'right' }} className="">
                            R${' '}
                            {moeda(valor0 - meta0) == 'NaN'
                              ? '0,00'
                              : moeda(valor0 - meta0)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R${' '}
                            {moeda(valor1 - meta1) == 'NaN'
                              ? '0,00'
                              : moeda(valor1 - meta1)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R${' '}
                            {moeda(valor2 - meta2) == 'NaN'
                              ? '0,00'
                              : moeda(valor2 - meta2)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R${' '}
                            {moeda(valor3 - meta3) == 'NaN'
                              ? '0,00'
                              : moeda(valor3 - meta3)}
                          </td>
                          <td style={{ textAlign: 'right' }} className="">
                            R${' '}
                            {moeda(valor4 - meta4) == 'NaN'
                              ? '0,00'
                              : moeda(valor4 - meta4)}
                          </td>
                          <td className=""></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            {/* ========================modal clientes 90 dias sem venda ================================================ */}
            <Modal
              className="modal-vendaxmeta"
              show={showModal90dias}
              onHide={handleCloseModal90dias}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <h1>
                  {' '}
                  CLIENTES SEM COMPRA 90D - CONSULTOR(A): {nomeVendedor}{' '}
                </h1>
              </Modal.Header>
              <Modal.Body>
                {visivel2 ? (
                  <>
                    <div style={{ marginTop: 10 }} className="barraPesquCoord">
                      <div className="d-flex">
                        <div className="bloco-input">
                          <p className="title-input">Qtd. Dias sem Vendas</p>
                          <input
                            className="form-control select inputparceiro  inputlogin"
                            id=""
                            type="num"
                            value={diasSemCompra}
                            onChange={(e) => {
                              setdiasSemCompra(e.target.value);
                            }}
                          />
                        </div>
                        <button
                          className="btn btn-outline-dark btnCoord2"
                          onClick={AtualizarCli}
                        >
                          Atualizar
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div style={{ marginTop: 5 }} className="divbuttondrop">
                  <button
                    className="buttondropTitle"
                    onClick={() => {
                      if (!visivel2) {
                        setvisivel2(true);
                      } else {
                        setvisivel2(false);
                      }
                    }}
                  >
                    Filtros{' '}
                    {visivel2 ? (
                      <IoIosArrowUp fontSize={20} />
                    ) : (
                      <IoIosArrowDown fontSize={20} />
                    )}{' '}
                  </button>
                </div>
                <div className={'table-responsive table-scroll  tableCoord3'}>
                  <div className=" table-wrap">
                    <Table
                      ref={tableRef}
                      id="MyTable"
                      responsive
                      className="table-global table  main-table "
                    >
                      <thead>
                        <tr className="tituloTab">
                          <th style={{ textAlign: 'left' }} className="th2">
                            D. S/Venda
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Parceiro
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Ult. Nº Nota
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Dt. Negoc.
                          </th>
                          <th style={{ textAlign: 'right' }} className="th2">
                            Vlr. Nota
                          </th>
                          <th style={{ textAlign: 'center' }} className="th2">
                            Ativo
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Tip. Neg.
                          </th>
                          <th style={{ textAlign: 'center' }} className="th2">
                            Tb. Industrial
                          </th>
                          <th style={{ textAlign: 'center' }} className="th2">
                            Tb. Distribuidora
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            CNPJ / CPF
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            UF
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Cidade
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Endereço
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Complemento
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Telefone
                          </th>
                          <th style={{ textAlign: 'left' }} className="th2">
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientes90dias?.map((cli) => (
                          <tr>
                            <td
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {cli?.dias}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.codpar} - {cli?.nomepar}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.ult_nunota != '0'
                                ? cli?.ult_nunota
                                : 'Não Inform.'}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.dtneg != null
                                ? formataData(cli?.dtneg)
                                : 'Não inform.'}
                            </td>
                            <td
                              style={{ textAlign: 'right', fontWeight: 'bold' }}
                            >
                              R${' '}
                              {cli?.vlrnota != null
                                ? moeda(cli?.vlrnota)
                                : '0,00'}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {cli?.ativo == '1' ? 'Sim' : 'Não'}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.negociacao}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {cli?.tabpreco_ind}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {cli?.tabpreco_dis}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cnpjMask(cli?.cgc_cpf)}
                            </td>
                            <td style={{ textAlign: 'left' }}>{cli?.uf}</td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.nomecid}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.endereco}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.complemento}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              {cli?.telefone}
                            </td>
                            <td style={{ textAlign: 'left' }}>{cli?.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Paginacao
                      total={totalPaginas90Cli}
                      limit={1}
                      paginaAtual={pagina90Cli}
                      setPagina={setPagina90Cli}
                    />
                  </div>
                </div>
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
