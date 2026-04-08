import React, { useEffect, useState } from 'react';

import '../../styles/global.scss';
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
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { iDadosUsuario, iResponseBody, Lista, ResponseAPI } from '../../@types';
import Table from 'react-bootstrap/Table';
import { phoneMask, moeda, moedaFloat } from '../../Masks/Masks';
import logoSankhya from '../../assets/logosankhya.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Paginacao from '../../components/Paginacao/index';
import Chart from 'react-apexcharts';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { FiSun } from 'react-icons/fi';
import { BsFillSunFill } from 'react-icons/bs';
import ReactApexChart from 'react-apexcharts';
import { AiTwotoneCheckCircle } from 'react-icons/ai';
import numeral from 'numeral';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function Comissoes() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  let [cobranca, setCobranca] = useState<iResponseBody[]>([]);
  const handleCloseMensageSankhya = () => setShowMensageSankhya(false);
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);
  const itensPorPagina = 20;
  function formatDate(dateTimeString: any) {
    const datePart = dateTimeString.substr(0, 8); // extrai a parte da data (ddmmyyyy)
    const day = datePart.substr(0, 2);
    const month = datePart.substr(2, 2);
    const year = datePart.substr(4, 4);
    return `${day}/${month}/${year}`;
  }

  const [barras, setBarras] = useState(true);
  const [areas, setAreas] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(20);
  let [mes01, setmes01] = useState('');
  let [meta01, setmeta01] = useState(0);
  let [valor01, setvalor01] = useState(0);
  let [mes02, setmes02] = useState('');
  let [meta02, setmeta02] = useState(0);
  let [valor02, setvalor02] = useState(0);
  let [mes03, setmes03] = useState('');
  let [meta03, setmeta03] = useState(0);
  let [valor03, setvalor03] = useState(0);
  let [mes04, setmes04] = useState('');
  let [meta04, setmeta04] = useState(0);
  let [valor04, setvalor04] = useState(0);
  let [mes05, setmes05] = useState('');
  let [meta05, setmeta05] = useState(0);
  let [valor05, setvalor05] = useState(0);
  let [mes06, setmes06] = useState('');
  let [meta06, setmeta06] = useState(0);
  let [valor06, setvalor06] = useState(0);
  let [mes07, setmes07] = useState('');
  let [meta07, setmeta07] = useState(0);
  let [valor07, setvalor07] = useState(0);
  let [mes08, setmes08] = useState('');
  let [meta08, setmeta08] = useState(0);
  let [valor08, setvalor08] = useState(0);
  let [mes09, setmes09] = useState('');
  let [meta09, setmeta09] = useState(0);
  let [valor09, setvalor09] = useState(0);
  let [mes10, setmes10] = useState('');
  let [meta10, setmeta10] = useState(0);
  let [valor10, setvalor10] = useState(0);
  let [mes11, setmes11] = useState('');
  let [meta11, setmeta11] = useState(0);
  let [valor11, setvalor11] = useState(0);
  let [mes12, setmes12] = useState('');
  let [meta12, setmeta12] = useState(0);
  let [valor12, setvalor12] = useState(0);
  let [percentual01, setpercentual01] = useState(0);
  let [percentual02, setpercentual02] = useState(0);
  let [percentual03, setpercentual03] = useState(0);
  let [percentual04, setpercentual04] = useState(0);
  let [percentual05, setpercentual05] = useState(0);
  let [percentual06, setpercentual06] = useState(0);
  let [percentual07, setpercentual07] = useState(0);
  let [percentual08, setpercentual08] = useState(0);
  let [percentual09, setpercentual09] = useState(0);
  let [percentual10, setpercentual10] = useState(0);
  let [percentual11, setpercentual11] = useState(0);
  let [percentual12, setpercentual12] = useState(0);
  let [valorTotalListaCob, setvalorTotalListaCob] = useState(0);
  let [anoAnterior, setanoAnterior] = useState(0);
  let [anoAtual, setanoAtual] = useState(0);
  let [media, setmedia] = useState(0);
  let [sucess, setSucess] = useState(0);
  let [quantPedido, setquantPedido] = useState(0);
  let [peso, setpeso] = useState(0);
  let [valor, setvalor] = useState(0);
  let [bonifica, setbonifica] = useState(0);
  let [listagemCobranca, setListagemCobranca] = useState<Lista[]>([]);
  let [listagem, setListagem] = useState<Lista[]>([]);
  let [listagemCrescimento, setListagemCrescimento] = useState<Lista[]>([]);
  let [produtoQueda, setprodutoQueda] = useState<Lista[]>([]);
  let [produtoCrescimento, setprodutoCrescimento] = useState<Lista[]>([]);
  let [pedidoFaturar, setpedidoFaturar] = useState<Lista[]>([]);
  let [valor201, setvalor201] = useState(0);
  let [valor202, setvalor202] = useState(0);
  let [valor203, setvalor203] = useState(0);
  let [valor204, setvalor204] = useState(0);
  let [valor205, setvalor205] = useState(0);
  let [valor206, setvalor206] = useState(0);
  let [valor207, setvalor207] = useState(0);
  let [valor208, setvalor208] = useState(0);
  let [valor209, setvalor209] = useState(0);
  let [valor210, setvalor210] = useState(0);
  let [valor211, setvalor211] = useState(0);
  let [valor212, setvalor212] = useState(0);
  let [valor301, setvalor301] = useState(0);
  let [valor302, setvalor302] = useState(0);
  let [valor303, setvalor303] = useState(0);
  let [valor304, setvalor304] = useState(0);
  let [valor305, setvalor305] = useState(0);
  let [valor306, setvalor306] = useState(0);
  let [valor307, setvalor307] = useState(0);
  let [valor308, setvalor308] = useState(0);
  let [valor309, setvalor309] = useState(0);
  let [valor310, setvalor310] = useState(0);
  let [valor311, setvalor311] = useState(0);
  let [valor312, setvalor312] = useState(0);
  let [somaTotal, setsomaTotal] = useState(0);

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

  const anoAtualVR: number[] = [
    200, 300, 100, 500, 1000, 700, 80, 100, 90, 100, 120, 1000,
  ];
  const anoAnteriorVR: number[] = [
    100, 500, 600, 400, 900, 300, 200, 300, 100, 500, 1000, 700,
  ];

  const meses = [
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

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  const valorFormatado = formatter.format(valor);

  const ValoresGrafico: {
    Mes: string;
    AnoAtual: number;
    AnoAnterior: number;
  }[] = [
    { Mes: 'Jan', AnoAtual: valor301, AnoAnterior: valor201 },
    { Mes: 'Fev', AnoAtual: valor302, AnoAnterior: valor202 },
    { Mes: 'Mar', AnoAtual: valor303, AnoAnterior: valor203 },
    { Mes: 'Abr', AnoAtual: valor304, AnoAnterior: valor204 },
    { Mes: 'Mai', AnoAtual: valor305, AnoAnterior: valor205 },
    { Mes: 'Jun', AnoAtual: valor306, AnoAnterior: valor206 },
    { Mes: 'Jul', AnoAtual: valor307, AnoAnterior: valor207 },
    { Mes: 'Ago', AnoAtual: valor308, AnoAnterior: valor208 },
    { Mes: 'Set', AnoAtual: valor309, AnoAnterior: valor209 },
    { Mes: 'Out', AnoAtual: valor310, AnoAnterior: valor210 },
    { Mes: 'Nov', AnoAtual: valor311, AnoAnterior: valor211 },
    { Mes: 'Dez', AnoAtual: valor312, AnoAnterior: valor212 },
  ];
  //==================================================================//
  const maxValor = Math.max(
    ...ValoresGrafico.map((val) => Math.max(val.AnoAtual, val.AnoAnterior))
  );
  const alturaMax = 220;
  const proporcao = alturaMax / maxValor;

  numeral.locale('pt-br');
  const state = {
    series: [
      {
        name: 'Ano Atual',
        data: [
          valor301,
          valor302,
          valor303,
          valor304,
          valor305,
          valor306,
          valor307,
          valor308,
          valor309,
          valor310,
          valor311,
          valor312,
        ].map((valor) =>
          parseFloat(formatter.format(valor).replace(/[^\d.-]/g, ''))
        ),
      },
      {
        name: 'Ano Anterior',
        data: [
          valor201,
          valor202,
          valor203,
          valor204,
          valor205,
          valor206,
          valor207,
          valor208,
          valor209,
          valor210,
          valor211,
          valor212,
        ].map((valor) =>
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
        labels: {
          formatter: function (value: any) {
            return numeral(value).format('0.0.00');
          },
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (value: any) {
          return numeral(value).format('0,0.00');
        },
      },
    },
  };
  //=======================================================

  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [display, setDisplay] = useState(false);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  let [lista, setlista] = useState<Lista[]>([]);
  let [valorTotal, setvalorTotal] = useState(0);
  let [valorTotalC, setvalorTotalC] = useState(0);
  let [lista01, setlista01] = useState<Lista[]>([]);
  let [valorTotal01, setvalorTotal01] = useState(0);
  let [valorTotalC01, setvalorTotalC01] = useState(0);
  let [lista02, setlista02] = useState<Lista[]>([]);
  const [listas, setListas] = useState<Lista[][]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    LoginSankhya();
    logado();
    setShowMensageSankhya(true);
  }, []);
  function logado() {
    if (!usuario.token) {
      history('/');
    }
  }
  async function LoginSankhya() {
    try {
      await Relat();
      await Relat01();
      await Relat02();
      setSucess(0);
      sucess = 0;
    } catch (error) {
      setLoading(false);
      setShowMensageSankhya(false);
      console.log('erro', error);
    }
  }

  //=================== verificar envio do pedido ====================//
  async function MetaXRealizado() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=
        SELECT MET.MES, MET.VLRMET VLRMET, ISNULL(VEN.VLRVEN,0) VLRVEN
              FROM (
                  SELECT MONTH(DTREF) MES, SUM(PREVREC) VLRMET
                  FROM TGFMET (NOLOCK)
                  WHERE YEAR(DTREF) = YEAR(GETDATE())
                  AND CODEMP <> 6
                  AND CODVEND < 30000
                  AND CODVEND = ${codVen}
                  GROUP BY MONTH(DTREF)
              ) MET
              LEFT JOIN (
                  SELECT MONTH(DTEMISSAO) MES,  SUM(FIN) VLRVEN
                  FROM AD_VVENDAS
                  WHERE YEAR(DTEMISSAO) = YEAR(GETDATE())
                  AND CODVEND = ${codVen}
                  GROUP BY MONTH(DTEMISSAO)
              ) VEN ON VEN.MES = MET.MES
              ORDER BY 1`
      )
      .then((response) => {
        console.log('resultado do envio', response);

        setmes01(response.data.responseBody.rows[0]?.[0]);
        mes01 = response.data.responseBody.rows[0]?.[0];
        setmeta01(response.data.responseBody.rows[0]?.[1].toFixed(2));
        meta01 = response.data.responseBody.rows[0]?.[1].toFixed(2);
        setvalor01(response.data.responseBody.rows[0]?.[2].toFixed(2));
        valor01 = response.data.responseBody.rows[0]?.[2].toFixed(2);

        if (valor01 > 0) {
          setpercentual01(Math.round((valor01 * 100) / meta01));
          percentual01 = Math.round((valor01 * 100) / meta01);
        }

        setmes02(response.data.responseBody.rows[1]?.[0]);
        mes02 = response.data.responseBody.rows[1]?.[0];
        setmeta02(response.data.responseBody.rows[1]?.[1].toFixed(2));
        meta02 = response.data.responseBody.rows[1]?.[1].toFixed(2);
        setvalor02(response.data.responseBody.rows[1]?.[2].toFixed(2));
        valor02 = response.data.responseBody.rows[1]?.[2].toFixed(2);

        if (valor02 > 0) {
          setpercentual02(Math.round((valor02 * 100) / meta02));
          percentual02 = Math.round((valor02 * 100) / meta02);
        }

        setmes03(response.data.responseBody.rows[2]?.[0]);
        mes03 = response.data.responseBody.rows[2]?.[0];
        setmeta03(response.data.responseBody.rows[2]?.[1].toFixed(2));
        meta03 = response.data.responseBody.rows[2]?.[1].toFixed(2);
        setvalor03(response.data.responseBody.rows[2]?.[2].toFixed(2));
        valor03 = response.data.responseBody.rows[2]?.[2].toFixed(2);

        if (valor03 > 0) {
          setpercentual03(Math.round((valor03 * 100) / meta03));
          percentual03 = Math.round((valor03 * 100) / meta03);
        }

        setmes04(response.data.responseBody.rows[3]?.[0]);
        mes04 = response.data.responseBody.rows[3]?.[0];
        setmeta04(response.data.responseBody.rows[3]?.[1].toFixed(2));
        meta04 = response.data.responseBody.rows[3]?.[1].toFixed(2);
        setvalor04(response.data.responseBody.rows[3]?.[2].toFixed(2));
        valor04 = response.data.responseBody.rows[3]?.[2].toFixed(2);

        if (valor04 > 0) {
          setpercentual04(Math.round((valor04 * 100) / meta04));
          percentual04 = Math.round((valor04 * 100) / meta04);
        }
        setmes05(response.data.responseBody.rows[4]?.[0]);
        mes05 = response.data.responseBody.rows[4]?.[0];
        setmeta05(response.data.responseBody.rows[4]?.[1].toFixed(2));
        meta05 = response.data.responseBody.rows[4]?.[1].toFixed(2);
        setvalor05(response.data.responseBody.rows[4]?.[2].toFixed(2));
        valor05 = response.data.responseBody.rows[4]?.[2].toFixed(2);

        if (valor05 > 0) {
          setpercentual05(Math.round((valor05 * 100) / meta05));
          percentual05 = Math.round((valor05 * 100) / meta05);
        }

        setmes06(response.data.responseBody.rows[5]?.[0]);
        mes06 = response.data.responseBody.rows[5]?.[0];
        setmeta06(response.data.responseBody.rows[5]?.[1].toFixed(2));
        meta06 = response.data.responseBody.rows[5]?.[1].toFixed(2);
        setvalor06(response.data.responseBody.rows[5]?.[2].toFixed(2));
        valor06 = response.data.responseBody.rows[5]?.[2].toFixed(2);

        if (valor06 > 0) {
          setpercentual06(Math.round((valor06 * 100) / meta06));
          percentual06 = Math.round((valor06 * 100) / meta06);
        }

        setmes07(response.data.responseBody.rows[6]?.[0]);
        mes07 = response.data.responseBody.rows[6]?.[0];
        setmeta07(response.data.responseBody.rows[6]?.[1].toFixed(2));
        meta07 = response.data.responseBody.rows[6]?.[1].toFixed(2);
        setvalor07(response.data.responseBody.rows[6]?.[2].toFixed(2));
        valor07 = response.data.responseBody.rows[6]?.[2].toFixed(2);

        if (valor07 > 0) {
          setpercentual07(Math.round((valor07 * 100) / meta07));
          percentual07 = Math.round((valor07 * 100) / meta07);
        }

        setmes08(response.data.responseBody.rows[7]?.[0]);
        mes08 = response.data.responseBody.rows[7]?.[0];
        setmeta08(response.data.responseBody.rows[7]?.[1].toFixed(2));
        meta08 = response.data.responseBody.rows[7]?.[1].toFixed(2);
        setvalor08(response.data.responseBody.rows[7]?.[2].toFixed(2));
        valor08 = response.data.responseBody.rows[7]?.[2].toFixed(2);

        if (valor08 > 0) {
          setpercentual08(Math.round((valor08 * 100) / meta08));
          percentual08 = Math.round((valor08 * 100) / meta08);
        }
        setmes09(response.data.responseBody.rows[8]?.[0]);
        mes09 = response.data.responseBody.rows[8]?.[0];
        setmeta09(response.data.responseBody.rows[8]?.[1].toFixed(2));
        meta09 = response.data.responseBody.rows[8]?.[1].toFixed(2);
        setvalor09(response.data.responseBody.rows[8]?.[2].toFixed(2));
        valor09 = response.data.responseBody.rows[8]?.[2].toFixed(2);

        if (valor09 > 0) {
          setpercentual09(Math.round((valor09 * 100) / meta09));
          percentual09 = Math.round((valor09 * 100) / meta09);
        }
        setmes10(response.data.responseBody.rows[9]?.[0]);
        mes10 = response.data.responseBody.rows[9]?.[0];
        setmeta10(response.data.responseBody.rows[9]?.[1].toFixed(2));
        meta10 = response.data.responseBody.rows[9]?.[1].toFixed(2);
        setvalor10(response.data.responseBody.rows[9]?.[2].toFixed(2));
        valor10 = response.data.responseBody.rows[9]?.[2].toFixed(2);

        if (valor10 > 0) {
          setpercentual10(Math.round((valor10 * 100) / meta10));
          percentual10 = Math.round((valor10 * 100) / meta10);
        }
        setmes11(response.data.responseBody.rows[10]?.[0]);
        mes11 = response.data.responseBody.rows[10]?.[0];
        setmeta11(response.data.responseBody.rows[10]?.[1]);
        meta11 = response.data.responseBody.rows[10]?.[1];
        setvalor11(response.data.responseBody.rows[10]?.[2].toFixed(2));
        valor11 = response.data.responseBody.rows[10]?.[2].toFixed(2);

        if (valor11 > 0) {
          setpercentual11(Math.round((valor11 * 100) / meta11));
          percentual11 = Math.round((valor11 * 100) / meta11);
        }

        setmes12(response.data.responseBody.rows[11]?.[0]);
        mes12 = response.data.responseBody.rows[11]?.[0];
        setmeta12(response.data.responseBody.rows[11]?.[1]);
        meta12 = response.data.responseBody.rows[11]?.[1];
        setvalor12(response.data.responseBody.rows[11]?.[2].toFixed(2));
        valor12 = response.data.responseBody.rows[11]?.[2].toFixed(2);

        if (valor12 > 0) {
          setpercentual12(Math.round((valor12 * 100) / meta12));
          percentual12 = Math.round((valor12 * 100) / meta12);
        }
        setSucess(20);
        sucess = 20;
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  //==================================================================
  async function Relat() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=select%20CAB.AD_PALMPC%20%09%2C%20CAB.CODPARC%20%09%2C%20PAR.NOMEPARC%20%09%2C%20FIN.DTNEG%20%09%2C%20FIN.DTVENC%20%09%2C%20FIN.VLRDESDOB%20%09%2C%20FIN.VLRDESC%20%09%2C%20CAB.COMISSAO%20%09%2C%20FIN.VLRDESC%20%20%09%2C%20FIN.VLRDESDOB%20%2A%20%28CAB.COMISSAO%2F100%29%20AS%20VLRCOM%20%09%20from%20TGFFIN%20FIN%20join%20TGFCAB%20CAB%20ON%20CAB.NUNOTA%20%3D%20FIN.NUNOTA%20join%20TGFPAR%20PAR%20ON%20FIN.CODPARC%20%3D%20PAR.CODPARC%20where%20CAB.TIPMOV%20%3D%20%27P%27%20AND%20CAB.CODTIPOPER%20%3C%3E%203000%20AND%20FIN.CODVEND%20%3D%20${codVen}%20AND%20FIN.DHBAIXA%20IS%20NULL%20AND%20ISNULL%28CAB.AD_PALMPC%2C%27%27%29%20%3C%3E%27%27`
      )
      .then((response) => {
        console.log('lista ', response);

        let valorTotal = 0;
        setlista(response.data.responseBody.rows);
        lista = response.data.responseBody.rows;
        console.log('resposta lista', lista);
        const valorAtual = lista?.reduce((acumulado, lista) => {
          return acumulado + lista[5];
        }, 0);
        setvalorTotal(valorAtual);
        valorTotal = valorAtual;
        const valorCom = lista?.reduce((acumulado, lista) => {
          return acumulado + lista[9];
        }, 0);
        setvalorTotalC(valorCom);
        valorTotalC = valorCom;
        setSucess(100);
        setShowMensageSankhya(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  async function Relat01() {
    setSucess(20);
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=select%20CAB.NUMNOTA%20%09%2C%20CAB.CODPARC%20%09%2C%20PAR.NOMEPARC%20%09%2C%20FIN.DTNEG%20%09%2C%20FIN.DTVENC%20%09%2C%20FIN.DHBAIXA%20%09%2C%20FIN.VLRDESDOB%20%09%2C%20FIN.VLRDESC%20%09%2C%20VEN.COMVENDA%20%09%2C%20%28FIN.VLRDESDOB-FIN.VLRDESC%29%20%2A%20%28VEN.COMVENDA%2F100%29%20AS%20VLRCOM%20%09%20from%20TGFFIN%20FIN%20join%20TGFCAB%20CAB%20ON%20CAB.NUNOTA%20%3D%20FIN.NUNOTA%20join%20TGFPAR%20PAR%20ON%20FIN.CODPARC%20%3D%20PAR.CODPARC%20join%20TGFVEN%20VEN%20ON%20VEN.CODVEND%20%3D%20FIN.CODVEND%20where%20CAB.TIPMOV%20%3D%20%27V%27%20and%20FIN.CODVEND%20%3D%20${codVen}%20and%20FIN.DHBAIXA%20IS%20NULL`
      )
      .then((response) => {
        console.log('lista 01', response);

        let valorTotal = 0;
        setlista01(response.data.responseBody.rows);
        lista01 = response.data.responseBody.rows;
        console.log('resposta lista01', lista01);
        const valorAtual = lista01?.reduce((acumulado, lista) => {
          return acumulado + lista[6];
        }, 0);
        setvalorTotal01(valorAtual);
        valorTotal01 = valorAtual;

        const valorCom = lista01?.reduce((acumulado, lista) => {
          return acumulado + lista[9];
        }, 0);
        setvalorTotalC01(valorCom);
        valorTotalC01 = valorCom;
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }
  const listaExibida = lista01
    ? lista01.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina)
    : [];

  const totalPaginas = lista01 ? Math.ceil(lista01.length / itensPorPagina) : 0;

  async function Relat02() {
    setSucess(70);
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=select%20FORMAT%28FIN.DHBAIXA%2C%20%27MMMM%27%2C%20%27pt-BR%27%29%20as%20mes%20%09%2C%20SUM%28case%20when%20year%28FIN.DHBAIXA%29%20%3D%20year%28GETDATE%28%29%29-1%20then%20%28%28FIN.VLRDESDOB-FIN.VLRDESC%29%20%2A%20%28VEN.COMVENDA%2F100%29%29%20else%200%20end%29%20Com_Ant%20%09%2C%20SUM%28case%20when%20year%28FIN.DHBAIXA%29%20%3D%20year%28GETDATE%28%29%29%20then%20%28%28FIN.VLRDESDOB-FIN.VLRDESC%29%20%2A%20%28VEN.COMVENDA%2F100%29%29%20else%200%20end%29%20Com_Atu%20%09%20from%20TGFFIN%20FIN%20join%20TGFCAB%20CAB%20ON%20CAB.NUNOTA%20%3D%20FIN.NUNOTA%20join%20TGFPAR%20PAR%20ON%20FIN.CODPARC%20%3D%20PAR.CODPARC%20join%20TGFVEN%20VEN%20ON%20VEN.CODVEND%20%3D%20FIN.CODVEND%20where%20CAB.TIPMOV%20%3D%20%27V%27%20and%20FIN.CODVEND%20%3D%20${codVen}%20and%20FIN.DHBAIXA%20IS%20not%20NULL%20group%20by%20FORMAT%28FIN.DHBAIXA%2C%20%27MMMM%27%2C%20%27pt-BR%27%29%20%09%2C%20MONTH%28FIN.DHBAIXA%29%20order%20by%20MONTH%28FIN.DHBAIXA%29`
      )
      .then((response) => {
        console.log('Lista 02', response);

        let valorTotal = 0;
        setlista02(response.data.responseBody.rows);
        lista02 = response.data.responseBody.rows;
        console.log('resposta lista02', lista02);
        setvalor201(response.data.responseBody.rows[0]?.[1].toFixed(2));
        valor201 = response.data.responseBody.rows[0]?.[1].toFixed(2);

        setvalor301(response.data.responseBody.rows[0]?.[2].toFixed(2));
        valor301 = response.data.responseBody.rows[0]?.[2].toFixed(2);

        setvalor202(response.data.responseBody.rows[1]?.[1].toFixed(2));
        valor202 = response.data.responseBody.rows[1]?.[1].toFixed(2);

        setvalor302(response.data.responseBody.rows[1]?.[2].toFixed(2));
        valor302 = response.data.responseBody.rows[1]?.[2].toFixed(2);

        setvalor203(response.data.responseBody.rows[2]?.[1].toFixed(2));
        valor203 = response.data.responseBody.rows[2]?.[1].toFixed(2);

        setvalor303(response.data.responseBody.rows[2]?.[2].toFixed(2));
        valor303 = response.data.responseBody.rows[2]?.[2].toFixed(2);

        setvalor204(response.data.responseBody.rows[3]?.[1].toFixed(2));
        valor204 = response.data.responseBody.rows[3]?.[1].toFixed(2);

        setvalor304(response.data.responseBody.rows[3]?.[2].toFixed(2));
        valor304 = response.data.responseBody.rows[3]?.[2].toFixed(2);

        setvalor205(response.data.responseBody.rows[4]?.[1].toFixed(2));
        valor205 = response.data.responseBody.rows[4]?.[1].toFixed(2);

        setvalor305(response.data.responseBody.rows[4]?.[2].toFixed(2));
        valor305 = response.data.responseBody.rows[4]?.[2].toFixed(2);

        setvalor206(response.data.responseBody.rows[5]?.[1].toFixed(2));
        valor206 = response.data.responseBody.rows[5]?.[1].toFixed(2);

        setvalor306(response.data.responseBody.rows[5]?.[2].toFixed(2));
        valor306 = response.data.responseBody.rows[5]?.[2].toFixed(2);

        setvalor207(response.data.responseBody.rows[6]?.[1].toFixed(2));
        valor207 = response.data.responseBody.rows[6]?.[1].toFixed(2);

        setvalor307(response.data.responseBody.rows[6]?.[2].toFixed(2));
        valor307 = response.data.responseBody.rows[6]?.[2].toFixed(2);

        setvalor208(response.data.responseBody.rows[7]?.[1].toFixed(2));
        valor208 = response.data.responseBody.rows[7]?.[1].toFixed(2);

        setvalor308(response.data.responseBody.rows[7]?.[2].toFixed(2));
        valor308 = response.data.responseBody.rows[7]?.[2].toFixed(2);

        setvalor209(response.data.responseBody.rows[8]?.[1].toFixed(2));
        valor209 = response.data.responseBody.rows[8]?.[1].toFixed(2);

        setvalor309(response.data.responseBody.rows[8]?.[2].toFixed(2));
        valor309 = response.data.responseBody.rows[8]?.[2].toFixed(2);

        setvalor210(response.data.responseBody.rows[9]?.[1].toFixed(2));
        valor210 = response.data.responseBody.rows[9]?.[1].toFixed(2);

        setvalor310(response.data.responseBody.rows[9]?.[2].toFixed(2));
        valor310 = response.data.responseBody.rows[9]?.[2].toFixed(2);

        setvalor211(response.data.responseBody.rows[10]?.[1].toFixed(2));
        valor211 = response.data.responseBody.rows[10]?.[1].toFixed(2);

        setvalor311(response.data.responseBody.rows[10]?.[2].toFixed(2));
        valor311 = response.data.responseBody.rows[10]?.[2].toFixed(2);

        setvalor212(response.data.responseBody.rows[11]?.[1].toFixed(2));
        valor212 = response.data.responseBody.rows[11]?.[1].toFixed(2);

        setvalor312(response.data.responseBody.rows[11]?.[2].toFixed(2));
        valor312 = response.data.responseBody.rows[11]?.[2].toFixed(2);
        if (valor301 > 0) {
          setsomaTotal(
            Number(valor301) +
              Number(valor302) +
              Number(valor303) +
              Number(valor304) +
              Number(valor305) +
              Number(valor306) +
              Number(valor307) +
              Number(valor308) +
              Number(valor309) +
              Number(valor310) +
              Number(valor311) +
              Number(valor312)
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        setShowMensageSankhya(false);
        console.log('erro recebimento', error);
      });
  }

  async function VendasClientesQueda() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20SELECT%20%20VEN.UF%20%09%2C%09ISNULL%28PAR.CODPARC%2C%27%27%29%20CODCLI%20%09%2C%20%09ISNULL%28PAR.RAZAOSOCIAL%2C%27%27%29%20CLIENTE%20%09%2C%09%28SELECT%20MAX%28DTNEG%29%20FROM%20TGFFIN%20WHERE%20CODPARC%20%3D%20PAR.CODPARC%29%20ULTFAT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20MESA%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT1%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT2%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT3%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOANT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOATU%20FROM%20AD_VVENDAS12%20VEN%20LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20AND%20PAR.CODVEND%20%3D%20${codVen}%20AND%20PAR.ATIVO%20%3D%20%27S%27%20GROUP%20BY%20VDO.APELIDO%2C%20VEN.UF%2C%20PAR.CODPARC%2C%20PAR.RAZAOSOCIAL%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3C%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC%3B`
      )
      .then((response) => {
        setListagem(response.data.responseBody.rows);
        listagem = response.data.responseBody.rows;
        const lista: Lista = response.data.responseBody.rows;
        console.log('resposta cliente Queda', listagem);

        const valorAnterior = listagem?.reduce((acumulado, lista) => {
          return acumulado + lista[8];
        }, 0);

        setanoAnterior(valorAnterior);
        anoAnterior = valorAnterior;

        const valorAtual = listagem?.reduce((acumulado, lista) => {
          return acumulado + lista[9];
        }, 0);
        setanoAtual(valorAtual);
        anoAtual = valorAtual;

        let soma = 0;
        listagem?.forEach((lista) => {
          soma += lista[5] + lista[6] + lista[7];
        });
        const media2 = soma / (listagem ? listagem.length * 3 : 0);
        setmedia(soma / 3);
        media = soma / 3;
        setSucess(40);
        sucess = 40;
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }
  async function VendasClientesCrescimento() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20SELECT%20%20VEN.UF%20%09%2C%09ISNULL%28PAR.CODPARC%2C%27%27%29%20CODCLI%20%09%2C%20%09ISNULL%28PAR.RAZAOSOCIAL%2C%27%27%29%20CLIENTE%20%09%2C%09%28SELECT%20MAX%28DTNEG%29%20FROM%20TGFFIN%20WHERE%20CODPARC%20%3D%20PAR.CODPARC%29%20ULTFAT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20MESA%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT1%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT2%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT3%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOANT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOATU%20FROM%20AD_VVENDAS12%20VEN%20LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20AND%20PAR.CODVEND%20%3D%20${codVen}%20AND%20PAR.ATIVO%20%3D%20%27S%27%20GROUP%20BY%20VDO.APELIDO%2C%20VEN.UF%2C%20PAR.CODPARC%2C%20PAR.RAZAOSOCIAL%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3E%3D%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC%3B`
      )
      .then((response) => {
        setListagemCrescimento(response.data.responseBody.rows);
        listagemCrescimento = response.data.responseBody.rows;
        const lista: Lista = response.data.responseBody.rows;
        console.log('resposta cliente Crescimento', listagemCrescimento);

        setSucess(60);
        sucess = 60;
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }
  async function VendasProdutosQueda() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20%09SELECT%20%20ISNULL%28GRU.CODGRUPOPROD%2C%27%27%29%20CODGRUPOPROD%20%09%09%2C%20%09ISNULL%28GRU.DESCRGRUPOPROD%2C%27%27%29%20DESCRGRUPOPROD%20%09%09%2C%09PRO.CODVOL%20UNID2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20MESA%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT1%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT3%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOANT%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOATU%20%20%09FROM%20AD_VVENDAS12%20VEN%20%09LEFT%20JOIN%20TGFPRO%20PRO%20%28NOLOCK%29%20ON%20CONVERT%28VARCHAR%2C%20PRO.CODPROD%29%20%3D%20%271%27%2BVEN.CODPROD%20%09LEFT%20JOIN%20TGFGRU%20GRU%20%28NOLOCK%29%20ON%20GRU.CODGRUPOPROD%20%3D%20PRO.CODGRUPOPROD%20%09LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20%09WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20%09AND%20PAR.CODVEND%20%3D%20${codVen}%20%20%09AND%20GRU.ATIVO%20%3D%20%27S%27%20%09GROUP%20BY%20GRU.CODGRUPOPROD%2C%20GRU.DESCRGRUPOPROD%2C%20PRO.CODVOL%20%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3E%3D%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC`
      )
      .then((response) => {
        setprodutoQueda(response.data.responseBody.rows);
        produtoQueda = response.data.responseBody.rows;
        const lista: Lista = response.data.responseBody.rows;
        console.log('resposta produto Queda', produtoQueda);
        if (produtoQueda.length > 0) {
          setShowMensageSankhya(false);
        }

        const valorAnterior = listagem?.reduce((acumulado, lista) => {
          return acumulado + lista[8];
        }, 0);

        setanoAnterior(valorAnterior);
        anoAnterior = valorAnterior;

        const valorAtual = listagem?.reduce((acumulado, lista) => {
          return acumulado + lista[9];
        }, 0);
        setanoAtual(valorAtual);
        anoAtual = valorAtual;

        let soma = 0;
        listagem?.forEach((lista) => {
          soma += lista[5] + lista[6] + lista[7];
        });
        const media2 = soma / (listagem ? listagem.length * 3 : 0);
        setmedia(soma / 3);
        media = soma / 3;
        setSucess(90);
        sucess = 90;
      })
      .catch((error) => {
        setLoading(false);
        setShowMensageSankhya(false);
        console.log('erro recebimento', error);
      });
  }

  async function VendasProdutosCrescimento() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20%09SELECT%20%20ISNULL%28GRU.CODGRUPOPROD%2C%27%27%29%20CODGRUPOPROD%20%09%09%2C%20%09ISNULL%28GRU.DESCRGRUPOPROD%2C%27%27%29%20DESCRGRUPOPROD%20%09%09%2C%09PRO.CODVOL%20UNID2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20MESA%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT1%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT3%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOANT%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOATU%20%20%09FROM%20AD_VVENDAS12%20VEN%20%09LEFT%20JOIN%20TGFPRO%20PRO%20%28NOLOCK%29%20ON%20CONVERT%28VARCHAR%2C%20PRO.CODPROD%29%20%3D%20%271%27%2BVEN.CODPROD%20%09LEFT%20JOIN%20TGFGRU%20GRU%20%28NOLOCK%29%20ON%20GRU.CODGRUPOPROD%20%3D%20PRO.CODGRUPOPROD%20%09LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20%09WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20%09AND%20PAR.CODVEND%20%3D%20${codVen}%20%09AND%20GRU.ATIVO%20%3D%20%27S%27%20%09GROUP%20BY%20GRU.CODGRUPOPROD%2C%20GRU.DESCRGRUPOPROD%2C%20PRO.CODVOL%20%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3E%3D%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC`
      )
      .then((response) => {
        setprodutoCrescimento(response.data.responseBody.rows);
        produtoCrescimento = response.data.responseBody.rows;
        const lista: Lista = response.data.responseBody.rows;
        console.log('resposta produto Crescimento', produtoCrescimento);

        const valorAnterior = listagem?.reduce((acumulado, lista) => {
          return acumulado + lista[8];
        }, 0);

        setanoAnterior(valorAnterior);
        anoAnterior = valorAnterior;

        const valorAtual = listagem?.reduce((acumulado, lista) => {
          return acumulado + lista[9];
        }, 0);
        setanoAtual(valorAtual);
        anoAtual = valorAtual;

        let soma = 0;
        listagem?.forEach((lista) => {
          soma += lista[5] + lista[6] + lista[7];
        });
        const media2 = soma / (listagem ? listagem.length * 3 : 0);
        setmedia(soma / 3);
        media = soma / 3;
        setSucess(100);
        sucess = 100;
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }
  async function PedidoFaturar() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20CAB.CODVEND%2C%20VEN.APELIDO%2C%20CAB.CODPARC%2C%20PAR.RAZAOSOCIAL%2C%20UFS.UF%2C%20CID.NOMECID%2C%20%09CAB.CODEMP%2C%20ITE.NUNOTA%2C%20%09CAB.DTNEG%2C%20CAB.DTENTSAI%2C%20%09DATEDIFF%28DAY%2C%20CAB.DTENTSAI%2C%20GETDATE%28%29%29%20ATRASO%2C%20%20%20%20%20SUM%28ITE.QTDNEG%29%20QTDNEG%2C%20%20%20%20%20SUM%28ITE.QTDNEG-ITE.QTDENTREGUE%29%20QTDSLD%2C%20%20%20%20%20ROUND%28SUM%28%28ITE.QTDNEG-ITE.QTDENTREGUE%29%20%2A%20PRO.PESOLIQ%29%2C2%29%20PESO%2C%20%20%20%20%09CASE%20WHEN%20TOP1.ATUALFIN%3D1%20THEN%20ROUND%28SUM%28%28ITE.QTDNEG-ITE.QTDENTREGUE%29%2AITE.VLRUNIT%29%2C2%29%20ELSE%200%20END%20VLRPED%2C%20%20%20%20%09CASE%20WHEN%20TOP1.ATUALFIN%3D1%20THEN%200%20ELSE%20ROUND%28SUM%28%28ITE.QTDNEG-ITE.QTDENTREGUE%29%2AITE.VLRUNIT%29%2C2%29%20END%20VLRBON%2C%20%09CASE%20WHEN%20CAB.CODTIPOPER%20%3D%203000%20THEN%20%27NAO%27%20ELSE%20%27SIM%27%20END%20LIBCOM%2C%20%09CASE%20WHEN%20LIBE.VLRLIBERADO%20IS%20NULL%20OR%20LIBE.VLRLIBERADO%20%3C%20LIBE.VLRATUAL%20THEN%20%27NAO%27%20ELSE%20%27SIM%27%20END%20LIBEST%2C%20%09CASE%20WHEN%20LIBF.VLRLIBERADO%20IS%20NULL%20OR%20LIBF.VLRLIBERADO%20%3C%20LIBF.VLRATUAL%20THEN%20%27NAO%27%20ELSE%20%27SIM%27%20END%20LIBFIN%20FROM%20TGFITE%20ITE%20%28NOLOCK%29%20JOIN%20TGFCAB%20CAB%20%28NOLOCK%29%20ON%20CAB.NUNOTA%20%3D%20ITE.NUNOTA%20JOIN%20TGFVEN%20VEN%20%28NOLOCK%29%20ON%20VEN.CODVEND%20%3D%20CAB.CODVEND%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CODPARC%20%3D%20CAB.CODPARC%20JOIN%20TSICID%20%28NOLOCK%29%20CID%20ON%20CID.CODCID%20%3D%20PAR.CODCID%20JOIN%20TSIUFS%20%28NOLOCK%29%20UFS%20ON%20UFS.CODUF%20%3D%20CID.UF%20JOIN%20TGFPRO%20PRO%20%28NOLOCK%29%20ON%20PRO.CODPROD%20%3D%20ITE.CODPROD%20JOIN%20TGFTOP%20TOP1%20%28NOLOCK%29%20ON%20TOP1.CODTIPOPER%20%3D%20CAB.CODTIPOPER%20AND%20CAB.DHTIPOPER%20%3D%20TOP1.DHALTER%20LEFT%20JOIN%20TSILIB%20LIBE%20%28NOLOCK%29%20ON%20LIBE.TABELA%20%3D%20%27TGFCAB%27%20AND%20LIBE.NUCHAVE%20%3D%20CAB.NUNOTA%20AND%20LIBE.EVENTO%20%3D%2044%20LEFT%20JOIN%20TSILIB%20LIBF%20%28NOLOCK%29%20ON%20LIBF.TABELA%20%3D%20%27TGFCAB%27%20AND%20LIBF.NUCHAVE%20%3D%20CAB.NUNOTA%20AND%20LIBF.EVENTO%20%3D%2063%20WHERE%20CAB.TIPMOV%20%3D%20%27P%27%20AND%20CAB.CODTIPOPER%20BETWEEN%203000%20AND%203999%20AND%20CAB.CODPARC%20NOT%20IN%20%28471%2C512%2C1293%29%20AND%20CAB.DTENTSAI%20%3E%3D%20%272018-01-01%27%20AND%20CAB.CODVEND%20%3D%20${codVen}%20AND%20SUBSTRING%28CONVERT%28VARCHAR%2CITE.CODPROD%29%2C2%2C2%29%3D%2720%27%20AND%20ITE.PENDENTE%20%3D%20%27S%27%20GROUP%20BY%20CAB.CODVEND%2CVEN.APELIDO%2CCAB.CODPARC%2CPAR.RAZAOSOCIAL%2CUFS.UF%2CCID.NOMECID%2CCAB.CODEMP%2CITE.NUNOTA%2CCAB.DTNEG%2CCAB.DTENTSAI%2CCAB.CODTIPOPER%2CTOP1.ATUALFIN%2CLIBE.VLRLIBERADO%2CLIBE.VLRATUAL%2CLIBF.VLRLIBERADO%2CLIBF.VLRATUAL%20ORDER%20BY%20VEN.APELIDO%2CCAB.DTNEG`
      )
      .then((response) => {
        setpedidoFaturar(response.data.responseBody.rows);
        pedidoFaturar = response.data.responseBody.rows;
        const lista: Lista = response.data.responseBody.rows;
        console.log('pedido a Faturar', pedidoFaturar);

        const quant = pedidoFaturar?.reduce((acumulado, lista) => {
          return acumulado + lista[11];
        }, 0);

        setquantPedido(quant);
        quantPedido = quant;

        const peso1 = pedidoFaturar?.reduce((acumulado, lista) => {
          return acumulado + lista[13];
        }, 0);

        setpeso(Number(peso1.toFixed(2)));
        peso = Number(peso1.toFixed(2));

        const valor1 = pedidoFaturar?.reduce((acumulado, lista) => {
          return acumulado + lista[14];
        }, 0);

        setvalor(valor1);
        valor = valor1;

        const boni = pedidoFaturar?.reduce((acumulado, lista) => {
          return acumulado + lista[15];
        }, 0);

        setbonifica(boni);
        bonifica = boni;
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  //==========================================================//
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center total-loading">
          <div className="div-loading">
            <div className="spinner-border" role="status"></div>
            <h2 className="sr-only">Carregando...</h2>
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
                <h1>Comissões</h1>
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
                  className="contain-pedido d-flex conteinerped-existente"
                >
                  <div className="conteudo-relatorio">
                    <div className="bloco1dash">
                      <div className="btbGraficos">
                        <div
                          className="tipoBar"
                          onClick={() => {
                            setBarras(true);
                            setAreas(false);
                            console.log('barras', barras);
                          }}
                        />
                        <div
                          className="tipoArea"
                          onClick={() => {
                            setBarras(false);
                            setAreas(true);
                            console.log('area', barras);
                          }}
                        />
                      </div>
                      {barras ? (
                        <div className="bloco-grafico2">
                          <div className="barratotal">
                            <h1
                              className="textTit"
                              style={{ marginLeft: 20, marginTop: 10 }}
                            >
                              COMISSÕES REALIZADAS MÊS A MÊS
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
                            R$ {moeda(somaTotal)}
                          </h1>
                          <div className="conteudo-grafico2">
                            <div className="valoresGrafMax">
                              <div className="valoresK">
                                <h1 className="stif2">50 K</h1>
                                <div className="divisa3"></div>
                              </div>
                              <div className="valoresK">
                                <h1 className="stif2">25 K </h1>
                                <div className="divisa3"></div>
                              </div>
                              <div className="valoresK">
                                <h1 className="stif">0</h1>
                                <div className="divisa4"></div>
                              </div>
                            </div>
                            <div className="GeralGraf">
                              <div className="GraficoEst">
                                {ValoresGrafico.map((graf, index) => (
                                  <>
                                    <div>
                                      <div className="Mes">
                                        <OverlayTrigger
                                          placement={'right'}
                                          delay={{ show: 100, hide: 250 }}
                                          overlay={
                                            <Tooltip>
                                              <div
                                                style={{
                                                  alignItems: 'initial',
                                                }}
                                              >
                                                Mes: {graf.Mes}
                                                <div className="divValorG">
                                                  <div className="circular1"></div>
                                                  <h1>
                                                    Ano Atual - R${' '}
                                                    {moeda(graf.AnoAtual)}
                                                  </h1>
                                                </div>
                                              </div>
                                            </Tooltip>
                                          }
                                        >
                                          <div
                                            className="barraValor1"
                                            style={{
                                              height:
                                                graf.AnoAtual / 220 + 'px',
                                            }}
                                          />
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement={'right'}
                                          delay={{ show: 100, hide: 250 }}
                                          overlay={
                                            <Tooltip>
                                              <div
                                                style={{
                                                  alignItems: 'initial',
                                                }}
                                              >
                                                Mes: {graf.Mes}
                                                <div className="divValorG">
                                                  <div className="circular2"></div>
                                                  <h1>
                                                    Ano Anterior - R${' '}
                                                    {moeda(graf.AnoAnterior)}
                                                  </h1>
                                                </div>
                                              </div>
                                            </Tooltip>
                                          }
                                        >
                                          <div
                                            className="barraValor2"
                                            style={{
                                              height:
                                                graf.AnoAnterior / 220 + 'px',
                                            }}
                                          />
                                        </OverlayTrigger>
                                      </div>
                                      <p>{graf.Mes}</p>
                                    </div>
                                  </>
                                ))}
                              </div>
                              <div className="d-flex di-valores">
                                <div
                                  style={{ alignItems: 'center' }}
                                  className="d-flex"
                                >
                                  {' '}
                                  <div className="circular1"></div>
                                  <h1>Ano Atual</h1>
                                </div>
                                <div
                                  style={{ alignItems: 'center' }}
                                  className="d-flex"
                                >
                                  {' '}
                                  <div className="circular2"></div>
                                  <h1>Ano Anterior</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                                COMISSÕES REALIZADAS MÊS A MÊS
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
                              R$ {moeda(somaTotal)}
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
                    </div>
                    <div style={{ marginTop: 20 }} className="divisao"></div>
                    <div className="divisor"></div>
                    <h1
                      className="textTit"
                      style={{ marginLeft: 20, marginTop: 10 }}
                    >
                      Previsão de Comissão em Pedido de Vendas{' '}
                    </h1>
                    <div className="table-responsive   tabela-relat ">
                      <div className=" table-wrap">
                        <Table
                          responsive
                          className="table-global table  main-table"
                        >
                          <thead>
                            <tr className="tituloTab">
                              <th
                                style={{ textAlign: 'center' }}
                                className="th1  th-tabela-pedido"
                              >
                                PALMPC
                              </th>
                              <th className="nomecliente">Parceiro</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="valores"
                              >
                                Dt. Neg.
                              </th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="valores"
                              >
                                Dt. Ven.
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Valor
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Vlr. Desc.
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Comissão
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Vlr.Com.
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {lista?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {lista[0]}
                                  </td>
                                  <td className="nomecliente">
                                    {lista[1]} - {lista[2]}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista[3])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista[4])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista[5])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista[6])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista[7]} %
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista[9])}
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                        <div className="textoTotal3">
                          <h1 className="textoh1Tot31">
                            Valor Total: R$ {moeda(valorTotal) + ' '}{' '}
                          </h1>
                          <h1 className="">
                            Total Com.: R$ {moeda(valorTotalC) + ' '}{' '}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="divisor"></div>
                    <div style={{ marginTop: 20 }} className="divisao"></div>
                    <div className="divisor"></div>
                    <h1
                      className="textTit"
                      style={{ marginLeft: 20, marginTop: 10 }}
                    >
                      Previsão de Comissão em Faturamento{' '}
                    </h1>
                    <div className="table-responsive   tabela-relat ">
                      <div className=" table-wrap">
                        <Table
                          responsive
                          className="table-global table  main-table"
                        >
                          <thead>
                            <tr className="tituloTab">
                              <th
                                style={{ textAlign: 'center' }}
                                className="th1  th-tabela-pedido"
                              >
                                Nº. Nota
                              </th>
                              <th className="nomecliente">Parceiro</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="valores"
                              >
                                Dt. Neg.
                              </th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="valores"
                              >
                                Dt. Ven.
                              </th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="valores"
                              >
                                Dt. Baixa
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Valor
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Vlr. Desc.
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Comissão
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Vlr.Com.
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {listaExibida?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {lista[0]}
                                  </td>
                                  <td className="nomecliente">
                                    {lista[1]} - {lista[2]}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista[3])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista[4])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {lista[5]}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista[6])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista[7])}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista[8]} %
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista[9])}
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                        <div className="textoTotal3">
                          <h1 className="textoh1Tot3">
                            Valor Total: R$ {moeda(valorTotal01) + ' '}{' '}
                          </h1>
                          <h1 className="">
                            Total Com.: R$ {moeda(valorTotalC01) + ' '}{' '}
                          </h1>
                        </div>
                        <Paginacao
                          total={totalPaginas}
                          limit={1}
                          paginaAtual={pagina}
                          setPagina={setPagina}
                        />
                        <div className="divisor"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ===================== modal sankhya ========================================================== */}
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
          </div>
          <FooterMobile />
          <Footer />
        </>
      )}
    </>
  );
}
