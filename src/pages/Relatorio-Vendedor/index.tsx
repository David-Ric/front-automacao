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
import logoAlyne from '../../assets/logo-dark.png';
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
import {
  metaXrealizado,
  pedidoFaturar,
  listaCobranca,
  vendaClientesCrescimento,
  vendaClientesQueda,
  vendaProdutoCrescimento,
  vendaProdutoQueda,
  atualizarRelatorios,
  limparDadosRelatorios,
  useAppOnlineStatus,
} from '../../provider/PortalContext';
import { loadingRelatorioObserver } from '../../functions/FuncoesRelatorio';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function RelatorioVendedor() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMensage, setShowMensage] = useState(false);
  let [cobranca, setCobranca] = useState<iResponseBody[]>([]);
  const handleCloseMensageSankhya = () => setShowMensageSankhya(false);
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);

  function formatDate(dateTimeString: any) {
    const datePart = dateTimeString.substr(0, 8);
    const day = datePart.substr(0, 2);
    const month = datePart.substr(2, 2);
    const year = datePart.substr(4, 4);
    return `${day}/${month}/${year}`;
  }

  let [sucess, setSucess] = useState(0);
  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOnline) {
    } else {
    }
  }, [isOnline]);

  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const [listas, setListas] = useState<Lista[][]>([]);

  function handleCloseMensageSankhyaErro() {
    history('/espaco-colaborador');
  }
  const [showMensageSankhyaErro, setShowMensageSankhyaErro] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    logado();
    Finalizar();
  }, []);

  function Finalizar() {
    atualizarRelatorios();
    setSucess(50);
    if (
      metaXrealizado &&
      metaXrealizado.length > 0 &&
      pedidoFaturar &&
      pedidoFaturar.length > 0 &&
      listaCobranca &&
      listaCobranca.length > 0 &&
      vendaClientesCrescimento &&
      vendaClientesCrescimento.length > 0 &&
      vendaClientesQueda &&
      vendaClientesQueda.length > 0 &&
      vendaProdutoCrescimento &&
      vendaProdutoCrescimento.length > 0 &&
      vendaProdutoQueda &&
      vendaProdutoQueda.length > 0
    ) {
      atualizarRelatorios();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  function logado() {
    if (!usuario.token) {
      history('/');
    }
  }

  function AtualizarRelatorio() {
    limparDadosRelatorios();
    localStorage.removeItem('@Portal/Relatorio/MetaXrealizado');
    localStorage.removeItem('@Portal/Relatorio/PedidoFaturar');
    localStorage.removeItem('@Portal/Relatorio/ListaCobranca');
    localStorage.removeItem('@Portal/Relatorio/VendaClientesCrescimento');
    localStorage.removeItem('@Portal/Relatorio/VendaProdutoCrescimento');
    localStorage.removeItem('@Portal/Relatorio/VendaClienteQueda');
    localStorage.removeItem('@Portal/Relatorio/VendaProdutoQueda');
    LoginSankhyaRelatorio();
  }
  //===================================================================================

  async function LoginSankhyaRelatorio() {
    setLoading(true);
    setSucess(10);
    sucess = 10;
    try {
      await MetaXRealizado();
    } catch (error) {
      setLoading(false);
      setShowMensageSankhyaErro(true);
    }
  }

  async function MetaXRealizado() {
    setSucess(30);
    sucess = 30;

    console.log(
      'Entrou nos Relatorios...................................................................'
    );
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT MET.MES, MET.VLRMET VLRMET, ISNULL(VEN.VLRVEN,0) VLRVEN
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
        const result = response.data.responseBody.rows.map((curr: any) => {
          return {
            id: curr[0],
            valor01: curr[1],
            valor02: curr[2],
          };
        });
        localStorage.setItem(
          '@Portal/Relatorio/MetaXrealizado',
          JSON.stringify(result)
        );
        console.log('Meta x Realizado', result);
        ListaCobranca();
        setSucess(40);
        sucess = 40;
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //==================================================================
  async function ListaCobranca() {
    setSucess(50);
    sucess = 50;
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20DISTINCT%20%09%20%27TI%40CIGEL.COM.BR%27%20AS%20EMAIL%20%09%2C%20FIN.CODEMP%20AS%20CODEMP%20%09%2C%20FIN.CODPARC%20AS%20CODPARC%20%09%2C%20FIN.DTNEG%20AS%20DATINI%20%09%2C%20FIN.DTVENC%20AS%20DATINI%20%09%2C%20CASE%20%09%09%09WHEN%20CAB.NUMNFSE%20IS%20NOT%20NULL%20THEN%20CAB.NUMNFSE%20%09%09%09ELSE%20CONVERT%28VARCHAR%2810%29%2CFIN.NUMNOTA%29%20%09%09END%20AS%20Nro_Nota%20%09%2C%20FIN.DESDOBRAMENTO%20AS%20Parce%20%09%2C%20CONVERT%28VARCHAR%2810%29%2CFIN.CODPARC%29%2B%27-%27%2BPAR.RAZAOSOCIAL%20as%20Clientes%20%09%2C%20FIN.DTNEG%20AS%20Emissao%20%09%2C%20FIN.DTVENC%20AS%20Dt_Venc%20%09%2C%20DATEDIFF%28DAY%2CFIN.DTVENC%2CGETDATE%28%29%29%20as%20Dias_Atr%20%09%2C%20%28FIN.VLRDESDOB%20-%20ISNULL%28FIN.VLRJUROEMBUT%2C0%29%20-%20ISNULL%28FIN.VLRMULTAEMBUT%2C0%29%29%20%2A%20FIN.RECDESP%20AS%20Valor%20%09%2C%20%28%20%28FIN.VLRDESDOB%20-%20ISNULL%28FIN.VLRJUROEMBUT%2C0%29%20-%20ISNULL%28FIN.VLRMULTAEMBUT%2C0%29%29%20%2A%20FIN.RECDESP%20%2A%20%09%20%20%20%28SELECT%20NUMDEC%20FROM%20TSIPAR%20WHERE%20CHAVE%20%3D%20%27TAXADIAATRASO%27%29%20%2A%20%09%20%20%20DATEDIFF%28DAY%2CFIN.DTVENC%2CGETDATE%28%29%29%20%2F100%20%29%20AS%20Juros%20%09%2C%20%28%20%28FIN.VLRDESDOB%20-%20ISNULL%28FIN.VLRJUROEMBUT%2C0%29%20-%20ISNULL%28FIN.VLRMULTAEMBUT%2C0%29%29%20%2A%20FIN.RECDESP%20%2A%20%09%20%20%20%28SELECT%20NUMDEC%20FROM%20TSIPAR%20WHERE%20CHAVE%20%3D%20%27PERCMULTA%27%29%20%09%20%20%20%20%2F100%20%29%20AS%20Multa%20%09%2C%20VEN.APELIDO%20%20FROM%20TGFFIN%20FIN%20LEFT%20JOIN%20TGFPAR%20PAR%20ON%20%28FIN.CODPARC%20%3D%20PAR.CODPARC%29%20LEFT%20JOIN%20TGFCAB%20CAB%20ON%20%28CAB.NUNOTA%20%3D%20FIN.NUNOTA%29%20LEFT%20JOIN%20TGFVEN%20VEN%20ON%20%28VEN.CODVEND%20%3D%20FIN.CODVEND%29%20WHERE%20%09FIN.DHBAIXA%20IS%20NULL%20%20AND%20%09CONVERT%28date%2CFIN.DTVENC%29%20%3C%3D%20CONVERT%28date%2C%20getdate%28%29-2%29%20AND%20%09FIN.RECDESP%20%3D%201%20AND%20%09FIN.PROVISAO%20%3D%20%27N%27%20AND%20%09VEN.EMAIL%20IS%20NOT%20NULL%20AND%20%09PAR.CODVEND%20%3D%20${codVen}%20ORDER%20BY%20Dias_Atr%20DESC`
      )
      .then((response) => {
        console.log('lista de cobrança', response.data.responseBody.rows);
        const result = response.data.responseBody.rows.map((curr: any) => {
          return {
            valor01: curr[0],
            valor02: curr[1],
            valor03: curr[2],
            valor04: curr[3],
            valor05: curr[4],
            valor06: curr[5],
            valor07: curr[6],
            valor08: curr[7],
            valor09: curr[8],
            valor10: curr[9],
            valor11: curr[10],
            valor12: curr[11],
            valor13: curr[12],
            valor14: curr[13],
            valor15: curr[14],
            valor16: curr[15],
            valor17: curr[16],
            valor18: curr[17],
            valor19: curr[18],
          };
        });
        localStorage.setItem(
          '@Portal/Relatorio/ListaCobranca',
          JSON.stringify(result)
        );
        setSucess(60);
        sucess = 60;
        VendasClientesQueda();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //=======================================================

  async function VendasClientesQueda() {
    setSucess(70);
    sucess = 70;
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20SELECT%20%20VEN.UF%20%09%2C%09ISNULL%28PAR.CODPARC%2C%27%27%29%20CODCLI%20%09%2C%20%09ISNULL%28PAR.RAZAOSOCIAL%2C%27%27%29%20CLIENTE%20%09%2C%09%28SELECT%20MAX%28DTNEG%29%20FROM%20TGFFIN%20WHERE%20CODPARC%20%3D%20PAR.CODPARC%29%20ULTFAT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20MESA%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT1%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT2%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT3%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOANT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOATU%20FROM%20AD_VVENDAS12%20VEN%20LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20AND%20PAR.CODVEND%20%3D%20${codVen}%20AND%20PAR.ATIVO%20%3D%20%27S%27%20GROUP%20BY%20VDO.APELIDO%2C%20VEN.UF%2C%20PAR.CODPARC%2C%20PAR.RAZAOSOCIAL%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3C%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC%3B`
      )
      .then((response) => {
        console.log('Vendas Clientes Queda', response.data.responseBody.rows);
        const result = response.data.responseBody.rows.map((curr: any) => {
          return {
            valor01: curr[0],
            valor02: curr[1],
            valor03: curr[2],
            valor04: curr[3],
            valor05: curr[4],
            valor06: curr[5],
            valor07: curr[6],
            valor08: curr[7],
            valor09: curr[8],
            valor10: curr[9],
            valor11: curr[10],
            valor12: curr[11],
            valor13: curr[12],
            valor14: curr[13],
            valor15: curr[14],
            valor16: curr[15],
            valor17: curr[16],
            valor18: curr[17],
            valor19: curr[18],
          };
        });
        localStorage.setItem(
          '@Portal/Relatorio/VendaClienteQueda',
          JSON.stringify(result)
        );
        setSucess(80);
        sucess = 80;
        VendasClientesCrescimento();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //===============================================================================================

  async function VendasClientesCrescimento() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20SELECT%20%20VEN.UF%20%09%2C%09ISNULL%28PAR.CODPARC%2C%27%27%29%20CODCLI%20%09%2C%20%09ISNULL%28PAR.RAZAOSOCIAL%2C%27%27%29%20CLIENTE%20%09%2C%09%28SELECT%20MAX%28DTNEG%29%20FROM%20TGFFIN%20WHERE%20CODPARC%20%3D%20PAR.CODPARC%29%20ULTFAT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20MESA%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT1%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT2%20%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.FIN%20ELSE%200%20END%29%20ANT3%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOANT%20%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09VEN.FIN%20%09%09%09ELSE%20%09%09%09%090%20%09%09%09END%29%20ANOATU%20FROM%20AD_VVENDAS12%20VEN%20LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20AND%20PAR.CODVEND%20%3D%20${codVen}%20AND%20PAR.ATIVO%20%3D%20%27S%27%20GROUP%20BY%20VDO.APELIDO%2C%20VEN.UF%2C%20PAR.CODPARC%2C%20PAR.RAZAOSOCIAL%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3E%3D%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC%3B`
      )
      .then((response) => {
        console.log(
          'Venda clientes crescimento',
          response.data.responseBody.rows
        );
        const result = response.data.responseBody.rows.map((curr: any) => {
          return {
            valor01: curr[0],
            valor02: curr[1],
            valor03: curr[2],
            valor04: curr[3],
            valor05: curr[4],
            valor06: curr[5],
            valor07: curr[6],
            valor08: curr[7],
            valor09: curr[8],
            valor10: curr[9],
            valor11: curr[10],
            valor12: curr[11],
            valor13: curr[12],
            valor14: curr[13],
            valor15: curr[14],
            valor16: curr[15],
            valor17: curr[16],
            valor18: curr[17],
            valor19: curr[18],
          };
        });
        localStorage.setItem(
          '@Portal/Relatorio/VendaClientesCrescimento',
          JSON.stringify(result)
        );
        setSucess(85);
        sucess = 85;
        VendasProdutosQueda();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //============================================================================================

  async function VendasProdutosQueda() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20%09SELECT%20%20ISNULL%28GRU.CODGRUPOPROD%2C%27%27%29%20CODGRUPOPROD%20%09%09%2C%20%09ISNULL%28GRU.DESCRGRUPOPROD%2C%27%27%29%20DESCRGRUPOPROD%20%09%09%2C%09PRO.CODVOL%20UNID2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20MESA%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT1%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT3%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOANT%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOATU%20%20%09FROM%20AD_VVENDAS12%20VEN%20%09LEFT%20JOIN%20TGFPRO%20PRO%20%28NOLOCK%29%20ON%20CONVERT%28VARCHAR%2C%20PRO.CODPROD%29%20%3D%20%271%27%2BVEN.CODPROD%20%09LEFT%20JOIN%20TGFGRU%20GRU%20%28NOLOCK%29%20ON%20GRU.CODGRUPOPROD%20%3D%20PRO.CODGRUPOPROD%20%09LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20%09WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20%09AND%20PAR.CODVEND%20%3D%20${codVen}%20%20%09AND%20GRU.ATIVO%20%3D%20%27S%27%20%09GROUP%20BY%20GRU.CODGRUPOPROD%2C%20GRU.DESCRGRUPOPROD%2C%20PRO.CODVOL%20%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3E%3D%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC`
      )
      .then((response) => {
        console.log('Vendas Produtos queda', response.data.responseBody.rows);
        const result = response.data.responseBody.rows.map((curr: any) => {
          return {
            valor01: curr[0],
            valor02: curr[1],
            valor03: curr[2],
            valor04: curr[3],
            valor05: curr[4],
            valor06: curr[5],
            valor07: curr[6],
            valor08: curr[7],
            valor09: curr[8],
            valor10: curr[9],
            valor11: curr[10],
            valor12: curr[11],
            valor13: curr[12],
            valor14: curr[13],
            valor15: curr[14],
            valor16: curr[15],
            valor17: curr[16],
            valor18: curr[17],
            valor19: curr[18],
          };
        });
        localStorage.setItem(
          '@Portal/Relatorio/VendaProdutoQueda',
          JSON.stringify(result)
        );
        setSucess(90);
        sucess = 90;
        VendasProdutosCrescimento();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //================================================================================================

  async function VendasProdutosCrescimento() {
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20QRY.%2A%2C%20CASE%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%2A%20100%20CRESC%20FROM%20%28%20%09SELECT%20%20ISNULL%28GRU.CODGRUPOPROD%2C%27%27%29%20CODGRUPOPROD%20%09%09%2C%20%09ISNULL%28GRU.DESCRGRUPOPROD%2C%27%27%29%20DESCRGRUPOPROD%20%09%09%2C%09PRO.CODVOL%20UNID2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-00%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20MESA%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-01%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT1%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-02%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT2%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.ANOMES%20%3D%20CONVERT%28VARCHAR%286%29%2CDATEADD%28mm%2C-03%2CGETDATE%28%29%29%2C%20112%29%20THEN%20VEN.QTD%20END%29%20ANT3%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29-1%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOANT%20%09%09%2C%09SUM%28CASE%20WHEN%20VEN.DTEMISSAO%20BETWEEN%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20%27-01-01%27%29%20%09%09%09AND%20CONVERT%28DATE%2C%20CONVERT%28VARCHAR%2C%20YEAR%28GETDATE%28%29%29%29%20%2B%20SUBSTRING%28CONVERT%28VARCHAR%2CCONVERT%28DATE%2C%20GETDATE%28%29%29%29%2C5%2C6%29%29%20THEN%20%09%09%09%09%09VEN.QTD%20%09%09%09%09ELSE%20%09%09%09%09%090%20%09%09%09%09END%29%20ANOATU%20%20%09FROM%20AD_VVENDAS12%20VEN%20%09LEFT%20JOIN%20TGFPRO%20PRO%20%28NOLOCK%29%20ON%20CONVERT%28VARCHAR%2C%20PRO.CODPROD%29%20%3D%20%271%27%2BVEN.CODPROD%20%09LEFT%20JOIN%20TGFGRU%20GRU%20%28NOLOCK%29%20ON%20GRU.CODGRUPOPROD%20%3D%20PRO.CODGRUPOPROD%20%09LEFT%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CGC_CPF%20%3D%20VEN.CGC_CPF%20AND%20PAR.CLIENTE%20%3D%20%27S%27%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20PAR.CODVEND%20%09WHERE%20SUBSTRING%28VEN.ANOMES%2C1%2C4%29%20%3E%3D%20YEAR%28GETDATE%28%29%29-1%20%09AND%20PAR.CODVEND%20%3D%20${codVen}%20%09AND%20GRU.ATIVO%20%3D%20%27S%27%20%09GROUP%20BY%20GRU.CODGRUPOPROD%2C%20GRU.DESCRGRUPOPROD%2C%20PRO.CODVOL%20%20%29%20QRY%20WHERE%20CASE%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3E%200%20THEN%201%20%09%09%09WHEN%20QRY.ANOANT%20%3D%200%20AND%20QRY.ANOATU%20%3D%200%20THEN%200%20%09%09%09ELSE%20%28QRY.ANOATU%2FQRY.ANOANT%29-1%20END%20%3E%3D%200%20ORDER%20BY%20CRESC%2C%20ANOANT%20DESC`
      )
      .then((response) => {
        console.log(
          'Venda produto crescimento',
          response.data.responseBody.rows
        );
        const result = response.data.responseBody.rows.map((curr: any) => {
          return {
            valor01: curr[0],
            valor02: curr[1],
            valor03: curr[2],
            valor04: curr[3],
            valor05: curr[4],
            valor06: curr[5],
            valor07: curr[6],
            valor08: curr[7],
            valor09: curr[8],
            valor10: curr[9],
            valor11: curr[10],
            valor12: curr[11],
            valor13: curr[12],
            valor14: curr[13],
            valor15: curr[14],
            valor16: curr[15],
            valor17: curr[16],
            valor18: curr[17],
            valor19: curr[18],
          };
        });
        localStorage.setItem(
          '@Portal/Relatorio/VendaProdutoCrescimento',
          JSON.stringify(result)
        );

        PedidoFaturar();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //============================================================================================

  async function PedidoFaturar() {
    setSucess(100);
    sucess = 100;
    const codVen = usuario.username;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20CAB.CODVEND%2C%20VEN.APELIDO%2C%20CAB.CODPARC%2C%20PAR.RAZAOSOCIAL%2C%20UFS.UF%2C%20CID.NOMECID%2C%20%09CAB.CODEMP%2C%20ITE.NUNOTA%2C%20%09CAB.DTNEG%2C%20CAB.DTENTSAI%2C%20%09DATEDIFF%28DAY%2C%20CAB.DTENTSAI%2C%20GETDATE%28%29%29%20ATRASO%2C%20%20%20%20%20SUM%28ITE.QTDNEG%29%20QTDNEG%2C%20%20%20%20%20SUM%28ITE.QTDNEG-ITE.QTDENTREGUE%29%20QTDSLD%2C%20%20%20%20%20ROUND%28SUM%28%28ITE.QTDNEG-ITE.QTDENTREGUE%29%20%2A%20PRO.PESOLIQ%29%2C2%29%20PESO%2C%20%20%20%20%09CASE%20WHEN%20TOP1.ATUALFIN%3D1%20THEN%20ROUND%28SUM%28%28ITE.QTDNEG-ITE.QTDENTREGUE%29%2AITE.VLRUNIT%29%2C2%29%20ELSE%200%20END%20VLRPED%2C%20%20%20%20%09CASE%20WHEN%20TOP1.ATUALFIN%3D1%20THEN%200%20ELSE%20ROUND%28SUM%28%28ITE.QTDNEG-ITE.QTDENTREGUE%29%2AITE.VLRUNIT%29%2C2%29%20END%20VLRBON%2C%20%09CASE%20WHEN%20CAB.CODTIPOPER%20%3D%203000%20THEN%20%27NAO%27%20ELSE%20%27SIM%27%20END%20LIBCOM%2C%20%09CASE%20WHEN%20LIBE.VLRLIBERADO%20IS%20NULL%20OR%20LIBE.VLRLIBERADO%20%3C%20LIBE.VLRATUAL%20THEN%20%27NAO%27%20ELSE%20%27SIM%27%20END%20LIBEST%2C%20%09CASE%20WHEN%20LIBF.VLRLIBERADO%20IS%20NULL%20OR%20LIBF.VLRLIBERADO%20%3C%20LIBF.VLRATUAL%20THEN%20%27NAO%27%20ELSE%20%27SIM%27%20END%20LIBFIN%20FROM%20TGFITE%20ITE%20%28NOLOCK%29%20JOIN%20TGFCAB%20CAB%20%28NOLOCK%29%20ON%20CAB.NUNOTA%20%3D%20ITE.NUNOTA%20JOIN%20TGFVEN%20VEN%20%28NOLOCK%29%20ON%20VEN.CODVEND%20%3D%20CAB.CODVEND%20JOIN%20TGFPAR%20PAR%20%28NOLOCK%29%20ON%20PAR.CODPARC%20%3D%20CAB.CODPARC%20JOIN%20TSICID%20%28NOLOCK%29%20CID%20ON%20CID.CODCID%20%3D%20PAR.CODCID%20JOIN%20TSIUFS%20%28NOLOCK%29%20UFS%20ON%20UFS.CODUF%20%3D%20CID.UF%20JOIN%20TGFPRO%20PRO%20%28NOLOCK%29%20ON%20PRO.CODPROD%20%3D%20ITE.CODPROD%20JOIN%20TGFTOP%20TOP1%20%28NOLOCK%29%20ON%20TOP1.CODTIPOPER%20%3D%20CAB.CODTIPOPER%20AND%20CAB.DHTIPOPER%20%3D%20TOP1.DHALTER%20LEFT%20JOIN%20TSILIB%20LIBE%20%28NOLOCK%29%20ON%20LIBE.TABELA%20%3D%20%27TGFCAB%27%20AND%20LIBE.NUCHAVE%20%3D%20CAB.NUNOTA%20AND%20LIBE.EVENTO%20%3D%2044%20LEFT%20JOIN%20TSILIB%20LIBF%20%28NOLOCK%29%20ON%20LIBF.TABELA%20%3D%20%27TGFCAB%27%20AND%20LIBF.NUCHAVE%20%3D%20CAB.NUNOTA%20AND%20LIBF.EVENTO%20%3D%2063%20WHERE%20CAB.TIPMOV%20%3D%20%27P%27%20AND%20CAB.CODTIPOPER%20BETWEEN%203000%20AND%203999%20AND%20CAB.CODPARC%20NOT%20IN%20%28471%2C512%2C1293%29%20AND%20CAB.DTENTSAI%20%3E%3D%20%272018-01-01%27%20AND%20CAB.CODVEND%20%3D%20${codVen}%20AND%20SUBSTRING%28CONVERT%28VARCHAR%2CITE.CODPROD%29%2C2%2C2%29%3D%2720%27%20AND%20ITE.PENDENTE%20%3D%20%27S%27%20GROUP%20BY%20CAB.CODVEND%2CVEN.APELIDO%2CCAB.CODPARC%2CPAR.RAZAOSOCIAL%2CUFS.UF%2CCID.NOMECID%2CCAB.CODEMP%2CITE.NUNOTA%2CCAB.DTNEG%2CCAB.DTENTSAI%2CCAB.CODTIPOPER%2CTOP1.ATUALFIN%2CLIBE.VLRLIBERADO%2CLIBE.VLRATUAL%2CLIBF.VLRLIBERADO%2CLIBF.VLRATUAL%20ORDER%20BY%20VEN.APELIDO%2CCAB.DTNEG`
      )
      .then((response) => {
        console.log('Pedido Faturar', response.data.responseBody.rows);
        const result = response.data.responseBody.rows.map((curr: any) => {
          return {
            valor01: curr[0],
            valor02: curr[1],
            valor03: curr[2],
            valor04: curr[3],
            valor05: curr[4],
            valor06: curr[5],
            valor07: curr[6],
            valor08: curr[7],
            valor09: curr[8],
            valor10: curr[9],
            valor11: curr[10],
            valor12: curr[11],
            valor13: curr[12],
            valor14: curr[13],
            valor15: curr[14],
            valor16: curr[15],
            valor17: curr[16],
            valor18: curr[17],
            valor19: curr[18],
          };
        });
        localStorage.setItem(
          '@Portal/Relatorio/PedidoFaturar',
          JSON.stringify(result)
        );

        atualizarRelatorios();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  //====================================================================================

  loadingRelatorioObserver.subscribe((loadingRelatorioValue: any) => {
    console.log(
      'loadingRelatorio mudou para..............................................',
      loadingRelatorioValue
    );
    setLoading(loadingRelatorioValue);
  });

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
                <h1>Relatorio Vendedor</h1>
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
                  className="contain-pedido2 d-flex conteinerped-existente"
                >
                  <div className="conteudo-relatorio">
                    {isOnline ? (
                      <>
                        <button
                          className="btn btn-outline-dark botaoAtuRelat"
                          onClick={AtualizarRelatorio}
                        >
                          Atualizar
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    <h1
                      className="textTit"
                      style={{ marginLeft: 20, marginTop: 10 }}
                    >
                      VENDAS X META{' '}
                    </h1>
                    <div className="table-responsive  tabela-responsiva-relatorio2">
                      <div className=" table-wrap">
                        <div className="cabecalhoTabRelarorio">
                          <h1 className="mes">Mês</h1>
                          <h1 className="valorVenda"> Meta</h1>
                          <h1 className="valorVenda">Vendas</h1>
                          <h1 className="valorVenda">Percentual</h1>
                        </div>
                        {Array.isArray(metaXrealizado) &&
                          metaXrealizado.map((meta) => (
                            <div className={'corpotab'}>
                              <h1 className="mes">
                                {meta.id == 1
                                  ? 'Jan'
                                  : meta.id == 2
                                  ? 'Fev'
                                  : meta.id == 3
                                  ? 'Mar'
                                  : meta.id == 4
                                  ? 'Abr'
                                  : meta.id == 5
                                  ? 'Mai'
                                  : meta.id == 6
                                  ? 'Jun'
                                  : meta.id == 7
                                  ? 'Jul'
                                  : meta.id == 8
                                  ? 'Ago'
                                  : meta.id == 9
                                  ? 'Set'
                                  : meta.id == 10
                                  ? 'Out'
                                  : meta.id == 11
                                  ? 'Nov'
                                  : meta.id == 12
                                  ? 'Dez'
                                  : ''}
                              </h1>
                              <h1 className="valorVenda">
                                R$ {moeda(meta.valor01)}
                              </h1>
                              <h1 className="valorVenda">
                                R$ {moeda(meta.valor02)}
                              </h1>
                              <h1 className="valorVenda">
                                {meta.valor02 &&
                                  meta.valor01 &&
                                  `${(
                                    (meta.valor02 / meta.valor01) *
                                    100
                                  ).toFixed(2)}`}
                                %
                              </h1>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="divisor"></div>
                    <div style={{ marginTop: 20 }} className="divisao"></div>
                    <div className="divisor"></div>
                    <h1
                      className="textTit"
                      style={{ marginLeft: 20, marginTop: 10 }}
                    >
                      Lista de Cobrança{' '}
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
                                className="th1 id-grupo th-tabela-pedido"
                              >
                                Nro.
                              </th>
                              <th className="th1 id-grupo th-tabela-pedido">
                                Parc.
                              </th>
                              <th className=" nomecliente">Cliente</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="valores"
                              >
                                Emissão
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
                                Atz.
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
                                Juros
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Multa
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Vlr.Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {listaCobranca?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="id-grupo"
                                  >
                                    {lista.valor06}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="id-grupo"
                                  >
                                    {lista.valor07}
                                  </td>
                                  <td className="nomecliente">
                                    {lista.valor08}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista.valor09)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista.valor10)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="id-grupo"
                                  >
                                    {lista.valor11}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista.valor12)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista.valor13)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista.valor14)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R${' '}
                                    {moeda(
                                      lista.valor12 +
                                        lista.valor13 +
                                        lista.valor14
                                    )}
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                        <h1 className="textoTotal">
                          Total: R${' '}
                          {listaCobranca.length > 0
                            ? moeda(
                                listaCobranca.reduce(
                                  (total, linha) =>
                                    total +
                                    linha.valor12 +
                                    linha.valor13 +
                                    linha.valor14,
                                  0
                                )
                              )
                            : '0,00'}
                        </h1>
                      </div>
                    </div>
                    <div className="divisor"></div>
                    <div style={{ marginTop: 20 }} className="divisao"></div>
                    <div className="divisor"></div>
                    <h1
                      className="textTit"
                      style={{ marginLeft: 20, marginTop: 10 }}
                    >
                      Vendas para Clientes em Queda{' '}
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
                                className="th1 id-grupo th-tabela-pedido"
                              >
                                UF
                              </th>
                              <th className="nomecliente">Cliente</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th4"
                              >
                                Ult. Fatura
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Atual
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant1
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant2
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant3
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Média
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Ano Anterior
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Ano Atual
                              </th>
                              <th style={{ textAlign: 'right' }}>Cresc.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vendaClientesQueda?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="id-grupo"
                                  >
                                    {lista.valor01}
                                  </td>
                                  <td className="nomecliente">
                                    {lista.valor02 + ' - ' + lista.valor03}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista.valor04)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista.valor05)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {' '}
                                    R$ {moeda(lista.valor06)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor07)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor08)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R${' '}
                                    {moeda(
                                      (lista.valor06 +
                                        lista.valor07 +
                                        lista.valor08) /
                                        3
                                    )}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor09)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor10)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {lista.valor11 === -100
                                      ? lista.valor11
                                      : lista.valor11 % 1 !== 0 &&
                                        lista.valor11.toFixed(2).length >
                                          lista.valor11.toString().length
                                      ? parseFloat(lista.valor11.toFixed(2))
                                      : lista.valor11.toFixed(2)}{' '}
                                    %
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                        <div className="textoTotal">
                          <h1 className="" style={{ marginRight: 10 }}>
                            {vendaClientesQueda
                              ? moeda(
                                  vendaClientesQueda.reduce(
                                    (total, lista) =>
                                      total +
                                      (lista.valor06 +
                                        lista.valor07 +
                                        lista.valor08) /
                                        3,
                                    0
                                  )
                                )
                              : '-'}
                          </h1>
                          <h1 style={{ marginRight: 10 }}>
                            {' '}
                            R$
                            {vendaClientesQueda.length > 0
                              ? moeda(
                                  vendaClientesQueda.reduce(
                                    (total, linha) => total + linha.valor09,
                                    0
                                  )
                                )
                              : '0,00'}
                          </h1>
                          <h1 className="">
                            R$
                            {vendaClientesQueda.length > 0
                              ? moeda(
                                  vendaClientesQueda.reduce(
                                    (total, linha) => total + linha.valor10,
                                    0
                                  )
                                )
                              : '0,00'}
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
                      Vendas para Clientes em Crescimento{' '}
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
                                className="th1 id-grupo th-tabela-pedido"
                              >
                                UF
                              </th>
                              <th className="nomecliente">Cliente</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th4"
                              >
                                Ult. Fatura
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Atual
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant1
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant2
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant3
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Média
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Ano Anterior
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Ano Antual
                              </th>
                              <th style={{ textAlign: 'right' }}>Cresc.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vendaClientesCrescimento?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="id-grupo"
                                  >
                                    {lista.valor01}
                                  </td>
                                  <td className="nomecliente">
                                    {lista.valor03 + ' - ' + lista.valor03}
                                  </td>

                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista.valor04)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    R$ {moeda(lista.valor05)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {' '}
                                    R$ {moeda(lista.valor06)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor07)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor08)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R${' '}
                                    {moeda(
                                      (lista.valor06 +
                                        lista.valor07 +
                                        lista.valor08) /
                                        3
                                    )}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor09)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R$ {moeda(lista.valor10)}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {lista.valor11 === -100
                                      ? lista.valor11
                                      : lista.valor11 % 1 !== 0 &&
                                        lista.valor11.toFixed(2).length >
                                          lista.valor11.toString().length
                                      ? parseFloat(lista.valor11.toFixed(2))
                                      : lista.valor11.toFixed(2)}{' '}
                                    %
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="divisor"></div>
                    <div className="divisor"></div>
                    <div style={{ marginTop: 20 }} className="divisao"></div>
                    <div className="divisor"></div>
                    <h1
                      className="textTit"
                      style={{ marginLeft: 20, marginTop: 10 }}
                    >
                      Vendas de Produtos em Crescimento{' '}
                    </h1>
                    <div className="table-responsive   tabela-relat ">
                      <div className=" table-wrap">
                        <Table
                          responsive
                          className="table-global table  main-table"
                        >
                          <thead>
                            <tr className="tituloTab">
                              <th className="nomecliente">Grupo Produto</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th4"
                              >
                                Unid
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Atual
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant1
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant2
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Mês Ant3
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Média
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Ano Anterior
                              </th>
                              <th
                                style={{ textAlign: 'right' }}
                                className="valores"
                              >
                                Ano Antual
                              </th>
                              <th style={{ textAlign: 'right' }}>Cresc.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vendaProdutoCrescimento?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td className="nomecliente">
                                    {lista.valor01 + ' - ' + lista.valor02}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {' '}
                                    {lista.valor03}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor04 == null
                                      ? 'R$ 0,00'
                                      : `R$ ${moeda(lista.valor04)}`}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor05 == null
                                      ? 'R$ 0,00'
                                      : `R$ ${moeda(lista.valor05)}`}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor06 == null
                                      ? 'R$ 0,00'
                                      : `R$ ${moeda(lista.valor06)}`}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor07 == null
                                      ? 'R$ 0,00'
                                      : `R$ ${moeda(lista.valor07)}`}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    R${' '}
                                    {moeda(
                                      (lista.valor05 +
                                        lista.valor06 +
                                        lista.valor07) /
                                        3
                                    )}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor08 == null
                                      ? 'R$ 0,00'
                                      : `R$ ${moeda(lista.valor08)}`}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor09 == null
                                      ? 'R$ 0,00'
                                      : `R$ ${moeda(lista.valor09)}`}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor10 == null
                                      ? '0,00'
                                      : ` ${moeda(lista.valor10)}`}{' '}
                                    %
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>

                    <div className="divisor"></div>
                    <div style={{ marginTop: 20 }} className="divisao"></div>
                    <div className="divisor"></div>

                    <h1
                      className="textTit"
                      style={{ marginLeft: 20, marginTop: 10 }}
                    >
                      Pedidos a Faturar{' '}
                    </h1>

                    <div className="table-responsive   tabela-relat ">
                      <div className=" table-wrap">
                        <Table
                          responsive
                          className="table-global table  main-table"
                        >
                          <thead>
                            <tr className="tituloTab">
                              <th style={{ textAlign: 'center' }}>Código</th>
                              <th className="nomecliente">Parceiro</th>
                              <th style={{ textAlign: 'center' }} className="">
                                UF
                              </th>
                              <th style={{ textAlign: 'center' }} className="">
                                Município
                              </th>
                              <th style={{ textAlign: 'center' }} className="">
                                Pedido
                              </th>
                              <th style={{ textAlign: 'center' }} className="">
                                Emissão
                              </th>
                              <th style={{ textAlign: 'center' }} className="">
                                Entrega
                              </th>
                              <th
                                style={{ textAlign: 'left', paddingLeft: 0 }}
                                className=""
                              >
                                Atr.
                              </th>
                              <th
                                style={{ textAlign: 'right', paddingRight: 0 }}
                                className=""
                              >
                                Quant.
                              </th>
                              <th
                                style={{ textAlign: 'right', paddingRight: 0 }}
                              >
                                Peso
                              </th>
                              <th
                                style={{ textAlign: 'right', paddingRight: 0 }}
                              >
                                Valor
                              </th>
                              <th
                                style={{ textAlign: 'right', paddingRight: 0 }}
                              >
                                Vr. Bonif.
                              </th>
                              <th
                                style={{ textAlign: 'center', paddingRight: 0 }}
                              >
                                Com.
                              </th>
                              <th
                                style={{ textAlign: 'center', paddingRight: 0 }}
                              >
                                Fim.
                              </th>
                              <th
                                style={{ textAlign: 'center', paddingRight: 0 }}
                              >
                                Est.
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pedidoFaturar?.map((lista, index) => (
                              <>
                                <tr key={index}>
                                  <td style={{ textAlign: 'center' }}>
                                    {' '}
                                    {lista.valor03}
                                  </td>
                                  <td className="nomecliente">
                                    {lista.valor04}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {' '}
                                    {lista.valor05}
                                  </td>
                                  <td
                                    style={{ textAlign: 'left' }}
                                    className=""
                                  >
                                    {lista.valor06}
                                  </td>
                                  <td
                                    style={{ textAlign: 'left' }}
                                    className=""
                                  >
                                    {lista.valor07} - {lista.valor08}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista.valor09)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formatDate(lista.valor10)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'left' }}
                                    className=""
                                  >
                                    {lista.valor11}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor12}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >
                                    {lista.valor14}
                                  </td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >{`R$ ${moeda(lista.valor15)}`}</td>
                                  <td
                                    style={{ textAlign: 'right' }}
                                    className=""
                                  >{`R$ ${moeda(lista.valor16)}`}</td>
                                  <td style={{ textAlign: 'center' }}>
                                    {' '}
                                    {lista.valor17}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {' '}
                                    {lista.valor18}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {' '}
                                    {lista.valor19}
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                        <div className="textoTotal">
                          <h1 className="">Total: </h1>
                          <h1 style={{ marginRight: 20, marginLeft: 20 }}>
                            Quant. Total:{' '}
                            {pedidoFaturar.length > 0
                              ? pedidoFaturar.reduce(
                                  (total, linha) => total + linha.valor12,
                                  0
                                )
                              : '0,00'}
                          </h1>
                          <h1 style={{ marginRight: 20 }}>
                            Peso Total:{' '}
                            {pedidoFaturar.length > 0
                              ? pedidoFaturar
                                  .reduce(
                                    (total, linha) => total + linha.valor14,
                                    0
                                  )
                                  .toFixed(2)
                              : '0,00'}
                          </h1>
                          <h1 style={{ marginRight: 20 }}>
                            Vrl. Total:{' '}
                            {pedidoFaturar.length > 0
                              ? moeda(
                                  pedidoFaturar.reduce(
                                    (total, linha) => total + linha.valor15,
                                    0
                                  )
                                )
                              : '0,00'}
                          </h1>
                          <h1 style={{ marginRight: 0 }} className="">
                            Vrl. Bonif. Total: R${' '}
                            {pedidoFaturar.length > 0
                              ? moeda(
                                  pedidoFaturar.reduce(
                                    (total, linha) => total + linha.valor16,
                                    0
                                  )
                                )
                              : '0,00'}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =====================modal sankhya========================================================== */}
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
