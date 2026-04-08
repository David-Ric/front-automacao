import React, { useEffect, useRef, useState } from 'react';
import './Circular-progress.scss';
import '../../styles/global.scss';
import Paginacao from '../../components/Paginacao/index';
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
import Table from 'react-bootstrap/Table';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { DashGrafico, iDadosUsuario, iUsuarios } from '../../@types';
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
import { ConnectingAirportsOutlined } from '@mui/icons-material';
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
} from '../../provider/PortalContext';
import { loadingDash, loadingDashObserver } from '../../functions/FuncoesDash';
import FooterMobile from '../../components/Footer/FooterMobile';
import { useAppOnlineStatus } from '../../provider/PortalContext';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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

interface Row {
  id: number;
  month: string;
  meta: number;
  actual: number;
  color: string;
}

export default function Dashboard() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [barras, setBarras] = useState(true);
  const [areas, setAreas] = useState(false);
  let [totalPaginas90Cli, setTotalPaginas90Cli] = useState(0);
  const [isExpanded, setExpendState] = useState(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  let [clientes90dias, setclientes90dias] = useState<iCliente90dias[]>([]);
  const [visivel, setvisivel] = useState(false);
  let [pesquisaVendedor, setpesquisaVendedor] = useState(true);
  let [pesquisaParceiro, setpesquisaParceiro] = useState(false);
  let [pesquisaProduto, setpesquisaProduto] = useState(false);
  let [pagina90Cli, setPagina90Cli] = useState(1);
  const [diasSemCompra, setdiasSemCompra] = useState('90');
  const [ufEscolhida, setufEscolhida] = useState(null);
  const [ativo, setAtivo] = useState('1');
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const [sucess, setSucess] = useState(0);
  const [dadosArray, setDadosArray] = useState([]);
  const [qtdePagina, setQtdePagina] = useState(15);
  const [vlanoAnteriorArray, setVlanoAnteriorArray] = useState<Array<number>>(
    []
  );
  const [vlanoAtualArray, setVlanoAtualArray] = useState<Array<number>>([]);
  const [vlanoAtualTotal, setVlanoAtualTotal] = useState(0);
  //=======================================================
  const anoAtual = new Date().getFullYear();

  useEffect(() => {
    Clientes90dias();
    Cli90();
  }, [pagina90Cli]);

  async function AtualizarCli() {
    setPagina90Cli(1);
    pagina90Cli = 1;
    setvisivel(false);
    Clientes90dias();
    Cli90();
  }

  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOnline) {
    } else {
    }
  }, [isOnline]);

  const handleCloseMensageSankhya = () => setShowMensageSankhya(false);
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);

  function handleCloseMensageSankhyaErro() {
    history('/espaco-colaborador');
  }
  const [showMensageSankhyaErro, setShowMensageSankhyaErro] = useState(false);

  loadingDashObserver.subscribe((loadingDashValue: any) => {
    console.log(
      'loadingDash mudou para..............................................',
      loadingDashValue
    );
    setLoading(loadingDashValue);
  });
  const toNumber = (v: any) => {
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    if (v === null || v === undefined) return 0;
    const raw = String(v).trim().replace('R$', '').trim();
    if (!raw) return 0;
    if (raw.includes(',')) {
      const n = Number(raw.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
      return Number.isFinite(n) ? n : 0;
    }
    const n = Number(raw.replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? n : 0;
  };
  const totalAnoAtual = (graficoTotal || []).reduce(
    (acc: number, item: any) => acc + toNumber(item?.AnoAtual),
    0
  );
  const totalAnoAnterior = (graficoTotal || []).reduce(
    (acc: number, item: any) => acc + toNumber(item?.AnoAnterior),
    0
  );
  const totalMetaAno = (vendaXmeta || []).reduce(
    (acc: number, item: any) => acc + toNumber(item?.meta),
    0
  );
  const totalVendasAnoXMeta = (vendaXmeta || []).reduce(
    (acc: number, item: any) => acc + toNumber(item?.actual),
    0
  );

  const formataData = (date: string) => {
    const ano = date?.substr(4, 4);
    const mes = date?.substr(2, 2);
    const dia = date?.substr(0, 2);

    return `${dia}/${mes}/${ano}`;
  };
  //=========get dash ============================================
  interface iGrafico {
    Mes: string;
    AnoAtual: number;
    AnoAnterior: number;
  }
  const [valoresGrafico, setValoresGrafico] = useState<iGrafico[]>([]);

  async function Clientes90dias() {
    try {
      await Cli90();
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function Cli90() {
    const codVendedor = usuario.username;
    setSucess(20);
    setShowMensageSankhya(true);
    console.log('entrou no venda x meta');

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

  function AtualizarDash() {
    limparDadosDash();
    localStorage.removeItem('@Portal/dash/graficoTotal');
    localStorage.removeItem('@Portal/dash/ValorAnterior');
    localStorage.removeItem('@Portal/dash/ValorAtual');
    localStorage.removeItem('@Portal/dash/valorTotalAno');
    localStorage.removeItem('@Portal/dash/VendaXmeta');
    localStorage.removeItem('@Portal/dash/metaMes');
    localStorage.removeItem('@Portal/dash/vendaMes');
    localStorage.removeItem('@Portal/dash/QuantPedidoOrcamento');
    localStorage.removeItem('@Portal/dash/ValorPedidoOrcamento');
    localStorage.removeItem('@Portal/dash/QuantFaturar');
    localStorage.removeItem('@Portal/dash/ValorFaturar');
    localStorage.removeItem('@Portal/dash/QuantPedidos');
    localStorage.removeItem('@Portal/dash/ValorPedidos');
    localStorage.removeItem('@Portal/dash/ClientesSemVenda');
    if (usuario.grupoId == 1) {
      LoginSankhyaDashAdmin();
    } else {
      LoginSankhyaDashRepresentante();
    }
  }
  //=====================================================================================
  async function LoginSankhyaDashAdmin() {
    setLoading(true);
    try {
      await DadosMetaMesValorMesAdmin();
    } catch (error) {
      setShowMensageSankhya(false);
      console.log('erro', error);
      setLoading(false);
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
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
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

        localStorage.setItem('@Portal/dash/VendaXmeta', JSON.stringify(result));
        setSucess(30);
        DadosPedidoOrcamentoAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //===============================================================================================================================

  async function DadosPedidoOrcamentoAdmin() {
    const codVen2 = usuario.username;

    const sql = `SELECT COUNT(DISTINCT NUNOTA) AS QTDNOT,
                    ROUND(SUM(VLRPED) + SUM(VLRBON), 2) AS VLRNOTA
                FROM AD_VPEDAFATURAR PED
                WHERE PED.CODTIPOPER = 3000;`;

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

    const sql = `SELECT COUNT(DISTINCT NUNOTA) AS QTDNOT,
                    ROUND(SUM(VLRPED) + SUM(VLRBON), 2) AS VLRNOTA
                FROM AD_VPEDAFATURAR PED
                WHERE PED.CODTIPOPER <> 3000;
                `;

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
    const sql = `SELECT COUNT(DISTINCT NUNOTA) AS QTDNOT,
                      ROUND(SUM(VLRPED) + SUM(VLRBON), 2) AS VLRNOTA
                  FROM AD_VPEDAFATURAR PED;
                  `;

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

    const sql = `SELECT COUNT(DISTINCT CODPAR) AS QTD
                  FROM AD_VCLIENTES
                  WHERE (DTNEG <= DATEADD(day, -90, GETDATE())
                        AND GERCOD IN (14725, 14699, 14749))
                        OR CODPAR IN (14674);`;

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
        setLoading(false);
        atualizarConstantes();
      })
      .catch((error) => {
        console.log('erro dados', error);
        setLoading(false);
      });
  }

  //=======Funções Sankhya Representante ============================================================

  async function LoginSankhyaDashRepresentante() {
    setLoading(true);
    setSucess(10);
    try {
      await DadosMetaMesValorMesRepresentante();
    } catch (error) {
      setShowMensageSankhya(false);
      console.log('erro', error);
      setLoading(false);
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
        setLoading(false);
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
    const sql = `SELECT ANT.MES AS NMES,
                    LEFT(DATENAME(MONTH, DATEADD(MONTH, ANT.MES - 1, 0)), 3) AS MES,
                    ANT.VLRVEN AS VLRANT,
                    ISNULL(ATU.VLRVEN, 0) AS VLRATU
                FROM (
                SELECT MES, SUM(FIN) AS VLRVEN
                FROM AD_VVENDAS_CLI VEN
                WHERE ANO = ${anoAnterior}
                AND VEN.CODVEND = ${codVen2}
                GROUP BY MES
                ) ANT
                LEFT JOIN (
                SELECT MES, SUM(FIN) AS VLRVEN
                FROM AD_VVENDAS_CLI VEN
                WHERE ANO = ${anoAtual}
                AND VEN.CODVEND = ${codVen2}
                GROUP BY MES
                ) ATU
                ON ATU.MES = ANT.MES
                ORDER BY 1;`;

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
        setLoading(false);
        console.log('erro dados grafico', error);
      });
  }

  //=====================================================================

  async function DadosGraficoVendasxMetaRepresentante() {
    const codVen2 = usuario.username;
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano atual', anoAtual);
    const sql = `SELECT
                      MET.MES AS NMES,
                      LEFT(DATENAME(MONTH, DATEADD(MONTH, MET.MES - 1, 0)), 3) AS MES,
                      MET.VLRMET AS VLRMET,
                      ISNULL(VEN.VLRVEN, 0) AS VLRVEN,
                      CASE
                          WHEN MET.VLRMET > VEN.VLRVEN THEN 'RED'
                          ELSE
                              CASE
                                  WHEN MET.VLRMET = 0 THEN 'GREY'
                                  ELSE 'GREEN'
                              END
                      END AS COLOR
                  FROM (
                      SELECT MONTH(MET.DTREF) AS MES, SUM(MET.PREVREC) AS VLRMET
                      FROM TGFMET MET (NOLOCK)
                      LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
                      LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
                      WHERE YEAR(MET.DTREF) = ${anoAtual}
                      AND MET.CODEMP <> 6
                      AND MET.CODVEND < 30000
                      AND (VDO.CODVEND = ${codVen2})
                      GROUP BY MONTH(MET.DTREF)
                  ) MET
                  LEFT JOIN (
                      SELECT MES, SUM(FIN) AS VLRVEN
                      FROM AD_VVENDAS_CLI VEN
                      WHERE ANO = ${anoAtual}
                      AND (VEN.CODVEND = ${codVen2})
                      GROUP BY MES
                  ) VEN ON VEN.MES = MET.MES
                  ORDER BY 1;`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
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
        setLoading(false);
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosPedidoOrcamentoRepresentante() {
    const codVen2 = usuario.username;

    const sql = `SELECT COUNT(DISTINCT NUNOTA) AS QTDNOT,
                    ROUND(SUM(VLRPED) + SUM(VLRBON), 2) AS VLRNOTA
                FROM AD_VPEDAFATURAR PED
                WHERE PED.CODTIPOPER = 3000
                AND CODVEND = ${codVen2}`;

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
        setLoading(false);
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosPedidoFaturarREpresentante() {
    const codVen2 = usuario.username;
    const sql = `SELECT COUNT(DISTINCT NUNOTA) AS QTDNOT,
                    ROUND(SUM(VLRPED) + SUM(VLRBON), 2) AS VLRNOTA
                FROM AD_VPEDAFATURAR PED
                WHERE PED.CODTIPOPER <> 3000
                AND CODVEND = ${codVen2}
                `;

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
        setLoading(false);
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosQuantidadePedidosRepresentante() {
    const codVen2 = usuario.username;
    const sql = `SELECT COUNT(DISTINCT NUNOTA) AS QTDNOT,
                    ROUND(SUM(VLRPED) + SUM(VLRBON), 2) AS VLRNOTA
                FROM AD_VPEDAFATURAR PED
                WHERE CODVEND = ${codVen2}`;

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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

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
    }, 800);
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
  //===============================================
  useEffect(() => {
    window.scrollTo(0, 0);
    logado();
    GetgrupoUsuarioId();
  }, []);

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
              <div className="titulo-page titulo-page2">
                <h1>Dashboard</h1>
                <div></div>
              </div>
              <div className="contain">
                <div className={display ? 'conteudoDashBlack' : 'conteudoDash'}>
                  <div className="bloco1dash">
                    {barras ? (
                      <>
                        {usuario.grupoId == 2 ? (
                          <>
                            <div
                              className={
                                display ? 'bloco-graficoBlack' : 'bloco-grafico'
                              }
                            >
                              <h1
                                className="textTit"
                                style={{ marginLeft: 20, marginTop: 10 }}
                              >
                                CARD VENDAS ANO ATUAL X ANO ANTERIOR{' '}
                              </h1>
                              <div className="separador"></div>
                              <div
                                className={
                                  'table-responsive table-scroll  tableCoord'
                                }
                              >
                                <div className=" table-wrap">
                                  <Table
                                    responsive
                                    className="table-global table  main-table "
                                  >
                                    <thead>
                                      <tr className="tituloTab">
                                        <th className="th2">Mês</th>
                                        <th
                                          style={{ textAlign: 'right' }}
                                          className="th2"
                                        >
                                          Ano Atual
                                        </th>
                                        <th
                                          style={{ textAlign: 'right' }}
                                          className="th2"
                                        >
                                          Ano Anterior
                                        </th>
                                        <th
                                          style={{ textAlign: 'right' }}
                                          className="th2"
                                        >
                                          Percentual
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {graficoTotal?.map((meta) => (
                                        <tr>
                                          <td className="">{meta?.Mes}</td>
                                          <td
                                            style={{ textAlign: 'right' }}
                                            className=""
                                          >
                                            R$ {moeda(meta?.AnoAtual)}
                                          </td>
                                          <td
                                            style={{ textAlign: 'right' }}
                                            className=""
                                          >
                                            R$ {moeda(meta?.AnoAnterior)}
                                          </td>
                                          <td
                                            style={{ textAlign: 'right' }}
                                            className="th1"
                                          >
                                            {meta?.AnoAtual &&
                                              meta?.AnoAnterior &&
                                              `${(
                                                (meta.AnoAtual /
                                                  meta.AnoAnterior) *
                                                100
                                              ).toFixed(2)}`}
                                            %
                                          </td>
                                        </tr>
                                      ))}
                                      <tr>
                                        <td className=""></td>
                                        <td
                                          style={{
                                            textAlign: 'right',
                                            fontWeight: 'bold',
                                          }}
                                          className=""
                                        >
                                          R$ {moeda(totalAnoAtual)}
                                        </td>
                                        <td
                                          style={{
                                            textAlign: 'right',
                                            fontWeight: 'bold',
                                          }}
                                          className=""
                                        >
                                          R$ {moeda(totalAnoAnterior)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                              <div className="separador"></div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={
                                display ? 'bloco-graficoBlack' : 'bloco-grafico'
                              }
                            >
                              <h1
                                className="textTit"
                                style={{ marginLeft: 20, marginTop: 10 }}
                              >
                                CARD VENDAS ANO ATUAL X ANO ANTERIOR{' '}
                              </h1>
                              <div className="separador"></div>
                              <div
                                className={
                                  'table-responsive table-scroll  tableCoord'
                                }
                              >
                                <div className=" table-wrap">
                                  <Table
                                    responsive
                                    className="table-global table  main-table "
                                  >
                                    <thead>
                                      <tr className="tituloTab">
                                        <th className="th2">Mês</th>
                                        <th
                                          style={{ textAlign: 'right' }}
                                          className="th2"
                                        >
                                          Ano Atual
                                        </th>
                                        <th
                                          style={{ textAlign: 'right' }}
                                          className="th2"
                                        >
                                          Ano Anterior
                                        </th>
                                        <th
                                          style={{ textAlign: 'right' }}
                                          className="th2"
                                        >
                                          Percentual
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {graficoTotal?.map((meta) => (
                                        <tr>
                                          <td className="">{meta?.Mes}</td>
                                          <td
                                            style={{ textAlign: 'right' }}
                                            className=""
                                          >
                                            R$ {moeda(meta?.AnoAtual)}
                                          </td>
                                          <td
                                            style={{ textAlign: 'right' }}
                                            className=""
                                          >
                                            R$ {moeda(meta?.AnoAnterior)}
                                          </td>
                                          <td
                                            style={{ textAlign: 'right' }}
                                            className="th1"
                                          >
                                            {meta?.AnoAtual &&
                                              meta?.AnoAnterior &&
                                              `${(
                                                (meta.AnoAtual /
                                                  meta.AnoAnterior) *
                                                100
                                              ).toFixed(2)}`}
                                            %
                                          </td>
                                        </tr>
                                      ))}
                                      <tr>
                                        <td className=""></td>
                                        <td
                                          style={{
                                            textAlign: 'right',
                                            fontWeight: 'bold',
                                          }}
                                          className=""
                                        >
                                          R$ {moeda(totalAnoAtual)}
                                        </td>
                                        <td
                                          style={{
                                            textAlign: 'right',
                                            fontWeight: 'bold',
                                          }}
                                          className=""
                                        >
                                          R$ {moeda(totalAnoAnterior)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                              <div className="separador"></div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {areas ? (
                      <>
                        <div
                          className={
                            display ? 'bloco-graficoBlack' : 'bloco-grafico'
                          }
                        >
                          <div className="barratotal">
                            <h1
                              className="textTit"
                              style={{ marginLeft: 20, marginTop: 10 }}
                            >
                              CARD - VENDAS - MÊS
                            </h1>
                          </div>
                          <h1
                            className="textTit"
                            style={{
                              marginLeft: 20,
                              marginTop: 10,
                              color: '#3015de',
                            }}
                          >
                            R$ {moeda(valorTotalAno)}
                          </h1>
                          <Chart
                            options={options}
                            series={state.series}
                            type="area"
                            height={340}
                            width={'100%'}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div
                      className={
                        display ? 'bloco-graficoBlack' : 'bloco-grafico'
                      }
                    >
                      <h1
                        className="textTit"
                        style={{ marginLeft: 20, marginTop: 10 }}
                      >
                        VENDAS X META - ANO: {anoAtual}{' '}
                        {usuario.grupoId != 2 ? ' - COORD.: TODOS' : ''}
                      </h1>
                      <div className="separador"></div>
                      <div
                        className={'table-responsive table-scroll  tableCoord'}
                      >
                        <div className=" table-wrap">
                          <Table
                            responsive
                            className="table-global table  main-table "
                          >
                            <thead>
                              <tr className="tituloTab">
                                <th className="th2">Mês</th>
                                <th
                                  style={{ textAlign: 'right' }}
                                  className="th2"
                                >
                                  Vlr. Meta
                                </th>
                                <th
                                  style={{ textAlign: 'right' }}
                                  className="th2"
                                >
                                  Vlr. Vendas
                                </th>
                                <th
                                  style={{ textAlign: 'right' }}
                                  className="th1"
                                >
                                  Percentual
                                </th>
                                <th className="th2">Leg</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vendaXmeta.map((meta) => (
                                <tr>
                                  <td className="">{meta?.month}</td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(meta?.meta)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(meta?.actual)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className="th1"
                                  >
                                    {meta?.actual &&
                                      meta?.meta &&
                                      `${(
                                        (meta.actual / meta.meta) *
                                        100
                                      ).toFixed(2)}`}
                                    %
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    <AiTwotoneCheckCircle
                                      style={{ color: `${meta?.color}` }}
                                    />
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
                                  R$ {moeda(totalMetaAno)}
                                </td>
                                <td
                                  style={{
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                  }}
                                  className=""
                                >
                                  R$ {moeda(totalVendasAnoXMeta)}
                                </td>
                                <td className=""></td>
                                <td className=""></td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                      <div className="separador"></div>
                    </div>
                  </div>
                  <div className="bloco2dash">
                    <div
                      className={
                        display
                          ? 'bloco-graficoBlack bloco-container-valores'
                          : 'bloco-grafico bloco-container-valores'
                      }
                    >
                      <div
                        style={{
                          width: '100%',
                          marginLeft: 10,
                          marginTop: 10,
                          marginBottom: 20,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <h1 className="textTit">VENDAS E PEDIDOS - CARD</h1>
                        {isOnline ? (
                          <>
                            <button
                              className="btn btn-outline-dark"
                              onClick={AtualizarDash}
                            >
                              Atualizar
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="blocoValoresDash">
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Meta de Vendas no Mês:
                        </h2>
                        <h1
                          style={metaMes == null ? { color: 'red' } : {}}
                          className="valorText"
                        >
                          {metaMes == null
                            ? 'Meta ainda não estipulada'
                            : `R$ ${moeda(metaMes)}`}
                        </h1>
                      </div>
                      <div className="blocoValoresDash2">
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Pedidos em Orçamento
                        </h2>
                        <h1 className="valorText">
                          R${' '}
                          {valorPedidoOrcamentoDash == null
                            ? '0,00'
                            : moeda(valorPedidoOrcamentoDash)}
                        </h1>
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Qtd. Ped. {quantPedidoOrcamentoDash}
                        </h2>
                      </div>
                      <div className="blocoValoresDash">
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Vendas no Mês:
                        </h2>
                        <h1
                          style={
                            vendaMes < metaMes
                              ? { color: 'red' }
                              : { color: '#270fd9' }
                          }
                          className="valorText"
                        >
                          R$ {moeda(vendaMes)}
                        </h1>
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                          style={
                            vendaMes < metaMes
                              ? { color: 'red' }
                              : { color: '#270fd9' }
                          }
                        >
                          {vendaMes &&
                            metaMes &&
                            `${((vendaMes / metaMes) * 100).toFixed(2)}%`}
                        </h2>
                      </div>
                      <div className="blocoValoresDash2">
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Pedidos a Faturar
                        </h2>
                        <h1 className="valorText">
                          R${' '}
                          {valorFaturarDash == null
                            ? '0,00'
                            : moeda(valorFaturarDash)}
                        </h1>
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Qtd. Ped. {quantFaturarDash}
                        </h2>
                      </div>
                      {usuario.grupoId == 1 ? (
                        <>
                          <div className="blocoValoresDash2">
                            <h2
                              className={
                                display ? 'textValorBlack' : 'textValor'
                              }
                            >
                              qtd. Clientes S/Vendas 90d
                            </h2>
                            <h1 className="valorText">
                              {clientesSemVendaDash}
                            </h1>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="blocoValoresDash2">
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Total de Pedidos
                        </h2>
                        <h1 className="valorText">
                          R${' '}
                          {valorFaturarDash == null
                            ? '0,00'
                            : moeda(valorPedidoDash)}
                        </h1>
                        <h2
                          className={display ? 'textValorBlack' : 'textValor'}
                        >
                          Qtd. Ped. {quantPedidoDash}
                        </h2>
                      </div>
                    </div>
                    {usuario.grupoId == 2 ? (
                      <>
                        <div
                          className={
                            display ? 'bloco-graficoBlack' : 'bloco-grafico'
                          }
                        >
                          <h1
                            className="textTit"
                            style={{
                              marginLeft: 20,
                              marginTop: 10,
                              marginBottom: 15,
                            }}
                          >
                            CLIENTES SEM COMPRA 90D
                          </h1>
                          {visivel ? (
                            <>
                              <div
                                style={{ marginTop: 10 }}
                                className="barraPesquCoord"
                              >
                                <div className="d-flex">
                                  <div className="bloco-input">
                                    <p className="title-input">
                                      Qtd. Dias sem Vendas
                                    </p>
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
                          <div
                            className={
                              'table-responsive table-scroll  tableCoord'
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
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      D. S/Venda
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Parceiro
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Ult. Nº Nota
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Dt. Negoc.
                                    </th>
                                    <th
                                      style={{ textAlign: 'right' }}
                                      className="th2"
                                    >
                                      Vlr. Nota
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th2"
                                    >
                                      Ativo
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Tip. Neg.
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th2"
                                    >
                                      Tb. Industrial
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th2"
                                    >
                                      Tb. Distribuidora
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      CNPJ / CPF
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      UF
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Cidade
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Endereço
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Complemento
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
                                      Telefone
                                    </th>
                                    <th
                                      style={{ textAlign: 'left' }}
                                      className="th2"
                                    >
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
                                        style={{
                                          textAlign: 'right',
                                          fontWeight: 'bold',
                                        }}
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
                                      <td style={{ textAlign: 'left' }}>
                                        {cli?.uf}
                                      </td>
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
                                      <td style={{ textAlign: 'left' }}>
                                        {cli?.email}
                                      </td>
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
                          <div className="separador"></div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
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
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={handleCloseMensageSankhya}
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
