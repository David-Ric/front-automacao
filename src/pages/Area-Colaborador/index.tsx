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
import { DashGrafico, iDadosUsuario, iPaginaPermissao } from '../../@types';
import Img1 from '../assets/COMUNICADO.jpeg';
import Img2 from '../assets/ANIVERSARIANTES.jpeg';
import Nopost from '../assets/nenhumpost.png';
import PhotoUser from '../../assets/avatar1.png';
import logoAlyne from '../../assets/logo-dark.png';
import logoSankhya from '../../assets/logosankhya.png';
import logoSank from '../../assets/logosank.png';
import logoDash from '../../assets/dashLogo.png';
import logoRest from './assets/restart.jpg';
import logoConfig from '../../assets/conifg.png';
import logoVendas from '../../assets/vendas.jpg';
import placeholderURL from '../../assets/user.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Paginacao from '../../components/Paginacao/index';
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
  atualizaCartaoHome,
  atualizarRelatorios,
  useAppOnlineStatus,
} from '../../provider/PortalContext';

import { FormDataVisitorHelpers } from 'axios';
import {
  LoginSankhyaDashAdmin,
  LoginSankhyaDashRepresentante,
  metaMesDObserver,
} from '../../functions/FuncoesDash';
import {
  LoginSankhyaRelatorio,
  MetaXRealizado,
} from '../../functions/FuncoesRelatorio';
import { moeda } from '../../Masks/Masks';
import FooterMobile from '../../components/Footer/FooterMobile';
import { Circle } from 'rc-progress';
import { AiFillCheckCircle } from 'react-icons/ai';
import { versaoFront } from '../../data/indexedDB';
import { BiFontSize } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ChatBotinho from '../../components/ChatBotinho/ChatBotinho';

interface Comunicado {
  id: number;
  titulo: string;
  imagemURL: string;
  texto: string;
  imagem: string;
}

interface ComunicadoComImagem {
  id: number;
  texto: string;
  titulo: string;
}
interface PostLido {
  comunicadoId: number;
  titulo: string;
  lidoEm: string;
  usuarioID: number;
}
interface iGrafico {
  Mes: string;
  AnoAtual: number;
  AnoAnterior: number;
}
interface ICampanhaGeral {
  Campanha: string;
  Color: string;
  Meta: number;
  Valor: number;
}
interface ICampanhaMes {
  Mes: number;
  Color: string;
  Meta: number;
  Valor: number;
}
interface ICampanhaMesCoord {
  Campanha: string;
  Mes: string;
  Meta: number;
  Valor: number;
}

export default function AreaColaborador() {
  const history = useNavigate();
  let [campanhaGeral, setcampanhaGeral] = useState<ICampanhaGeral[]>([]);
  let [campanhaMes, setcampanhaMes] = useState<ICampanhaMes[]>([]);
  let [campanhaMesCoord, setcampanhaMesCoord] = useState<ICampanhaMesCoord[]>(
    []
  );
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dadosAtualizadosEm, setDadosAtualizadosEm] = useState('');
  const [tabelasComErroSankhya, setTabelasComErroSankhya] = useState<string[]>(
    []
  );
  const [showMensage, setShowMensage] = useState(false);
  let [sucess, setSucess] = useState(0);
  const handleCloseMensage = () => setShowMensage(false);
  const [permitido, setpermitido] = useState(false);
  const [effectExecuted, setEffectExecuted] = useState(false);
  const [naotemImage, setnaotemImage] = useState(false);
  const [showComunicado, setShowComunicado] = useState(false);
  const handleCloseComunicado = () => setShowComunicado(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);
  const [showMensageDelete, setShowMensageDelete] = useState(false);
  let [erroSankhya, setErroSankhya] = useState(false);
  const handleCloseMensageDelete = () => setShowMensageDelete(false);
  const [showupdate, setShowupdate] = useState(false);
  const handleCloseupdate = () => setShowupdate(false);
  const [tabelarro, setTabelarro] = useState('');
  const [tabelarro2, setTabelarro2] = useState('');
  const [tabelarro3, setTabelarro3] = useState('');
  const [tabelarro4, setTabelarro4] = useState('');
  const [tabelarro5, setTabelarro5] = useState('');
  const [tabelarro6, setTabelarro6] = useState('');
  const [tabelarro7, setTabelarro7] = useState('');
  const [tabelarro8, setTabelarro8] = useState('');
  const [tabelarro9, setTabelarro9] = useState('');
  const [alertErroSankhya, setAlertErroSankhya] = useState(false);
  const [alertErroSankhya2, setAlertErroSankhya2] = useState(false);
  const [alertErroSankhya3, setAlertErroSankhya3] = useState(false);
  const [alertErroSankhya4, setAlertErroSankhya4] = useState(false);
  const [alertErroSankhya5, setAlertErroSankhya5] = useState(false);
  const [alertErroSankhya6, setAlertErroSankhya6] = useState(false);
  const [alertErroSankhya7, setAlertErroSankhya7] = useState(false);
  const [alertErroSankhya8, setAlertErroSankhya8] = useState(false);
  const [alertErroSankhyaBD, setAlertErroSankhyaBD] = useState(false);
  const [alertErroSankhyaBD2, setAlertErroSankhyaBD2] = useState(false);
  const [alertErroSankhyaBD3, setAlertErroSankhyaBD3] = useState(false);
  const [alertErroSankhyaBD4, setAlertErroSankhyaBD4] = useState(false);
  const [alertErroSankhyaBD5, setAlertErroSankhyaBD5] = useState(false);
  const [alertErroSankhyaBD6, setAlertErroSankhyaBD6] = useState(false);
  const [alertErroSankhyaBD7, setAlertErroSankhyaBD7] = useState(false);
  const [alertErroSankhyaBD8, setAlertErroSankhyaBD8] = useState(false);
  const [alertErroSankhyaBD9, setAlertErroSankhyaBD9] = useState(false);
  let [dadosRecebidos, setDadosRecebidos] = useState(false);
  const [msgErroSakhya, setMsgErroSankhya] = useState('');
  const [msgErroSakhya2, setMsgErroSankhya2] = useState('');
  const [msgErroSakhya3, setMsgErroSankhya3] = useState('');
  const [msgErroSakhya4, setMsgErroSankhya4] = useState('');
  const [msgErroSakhya5, setMsgErroSankhya5] = useState('');
  const [msgErroSakhya6, setMsgErroSankhya6] = useState('');
  const [msgErroSakhya7, setMsgErroSankhya7] = useState('');
  const [msgErroSakhya8, setMsgErroSankhya8] = useState('');
  const [msgErroSakhya9, setMsgErroSankhya9] = useState('');
  let [isMobile, setIsMobile] = useState(false);
  let [comunicados, setComunicados] = useState<ComunicadoComImagem[]>([]);
  let [grupopermis, setgrupopermis] = useState<iPaginaPermissao[]>([]);
  let [userpermis, setuserpermis] = useState<iPaginaPermissao[]>([]);
  let [postLidos, setPostLidos] = useState<PostLido[]>([]);
  let [permissaoRH, setpermissaoRH] = useState(false);
  const [blurhashLoaded, setBlurhashLoaded] = useState(false);
  const handleCloseMensageSankhya = () => setShowMensageSankhya(false);
  let [respostaSank, setrespostaSank] = useState('');
  let [utilizando, setUtulizando] = useState(false);
  let [imageURL, setImageURL] = useState('');
  let [MetaDoMes, setMetaDoMes] = useState(0);
  let [VendaDoMes, setVendaDoMes] = useState(0);
  let [NovomesAtual, setNovomesAtual] = useState<iGrafico[]>([]);
  const [showPendEnvio, setShowPendEnvio] = useState(false);
  const [showListaPendEnvio, setShowListaPendEnvio] = useState(false);
  const [listaPendEnvio, setListaPendEnvio] = useState<any[]>([]);
  const [pendentesCount, setPendentesCount] = useState(0);
  const [naoEnviadosCount, setNaoEnviadosCount] = useState(0);
  const [processarAtrasadosCount, setProcessarAtrasadosCount] = useState(0);
  let [paginaPendEnvio, setPaginaPendEnvio] = useState(1);
  const [loadingListaPendEnvio, setLoadingListaPendEnvio] = useState(false);
  let [totalPaginasPendEnvio, setTotalPaginasPendEnvio] = useState(0);
  const [parceiroDocs, setParceiroDocs] = useState<{
    [key: string]: { nome: string; cnpj: string }
  }>({});
  const [qtdePaginaPendEnvio, setQtdePaginaPendEnvio] = useState(9999);
  const pageSizeFrontPendEnvio = 10;
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [palmpvToCancel, setPalmpvToCancel] = useState<string>('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showVisualizarPend, setShowVisualizarPend] = useState(false);
  const [pedidoVisualizar, setPedidoVisualizar] = useState<any | null>(null);
  const [similaresEnviados, setSimilaresEnviados] = useState<{ [palmpv: string]: any }>({});
  const [visualizarSomente, setVisualizarSomente] = useState(false);
  const [enviarLoading, setEnviarLoading] = useState(false);
  const [itensVisualizar, setItensVisualizar] = useState<any[]>([]);
  const [empresaDesc, setEmpresaDesc] = useState<string>('');
  const [tipoNegDesc, setTipoNegDesc] = useState<string>('');
  const [qtdItens, setQtdItens] = useState<number>(0);
  const [empresaId, setEmpresaId] = useState<number | null>(null);
  const [ufCliente, setUfCliente] = useState<string>('');
  const [parceiroCodigo, setParceiroCodigo] = useState<string>('');
  const [parceiroCnpj, setParceiroCnpj] = useState<string>('');
  const [parceiroNome, setParceiroNome] = useState<string>('');
  const [showEnviarStatus, setShowEnviarStatus] = useState(false);
  const [enviarStatusIsDelete, setEnviarStatusIsDelete] = useState(false);
  const [enviarStatusMsg, setEnviarStatusMsg] = useState('');
  const [enviarStatusErro, setEnviarStatusErro] = useState(false);
  const [showInatividadeAlert, setShowInatividadeAlert] = useState(false);
  const [showListaInativos, setShowListaInativos] = useState(false);
  const [diasSemCompra, setDiasSemCompra] = useState('');
  const [clientesInativosAll, setClientesInativosAll] = useState<any[]>([]);
  const [clientesInativos, setClientesInativos] = useState<any[]>([]);
  const [paginaInativos, setPaginaInativos] = useState(1);
  const [totalPaginasInativos, setTotalPaginasInativos] = useState(0);
  const qtdePaginaInativos = 5;
  const [visivelInativos, setVisivelInativos] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (showVisualizarPend && pedidoVisualizar?.palMPV) {
          const filtrarAtivos = (arr: any[]) =>
            (Array.isArray(arr) ? arr : []).filter(
              (it: any) =>
                String(it?.inativo ?? 'N').trim().toUpperCase() !== 'S'
            );
          const db = await (await import('idb')).openDB('pgamobile', (await import('../../data/indexedDB')).versao);
          let carregouViaApi = false;
          try {
            const resp = await api.get(`/api/CabecalhoPedidoVenda/palmpv/${pedidoVisualizar?.palMPV}`);
            const cab = (resp as any)?.data || {};
            const itensEmb = Array.isArray(cab?.itens) ? cab.itens : [];
            if (itensEmb.length > 0) {
              const itensFiltrados = filtrarAtivos(itensEmb);
              setItensVisualizar(itensFiltrados);
              setQtdItens(itensFiltrados.length);
              try {
                setEmpresaDesc(String(cab?.empresa?.descricao || cab?.empresaDescricao || ''));
              } catch {}
              try {
                const tnDesc = cab?.tipoNegociacao?.descricao || cab?.tipoNegociacaoDescricao || '';
                setTipoNegDesc(String(tnDesc || ''));
              } catch {}
              carregouViaApi = true;
            }
          } catch {}
          if (!carregouViaApi) {
            const tx = db.transaction('itemPedidoVenda', 'readonly');
            const store = tx.objectStore('itemPedidoVenda');
            const allItens = await store.getAll();
            const itens = allItens.filter((i: any) => String(i?.palMPV) === String(pedidoVisualizar?.palMPV));
            const itensFiltrados = filtrarAtivos(itens);
            setItensVisualizar(itensFiltrados);
            setQtdItens(itensFiltrados.length);
            await tx.done;
          }
          try {
            const tx2 = db.transaction('tabelaPrecoParceiro', 'readonly');
            const store2 = tx2.objectStore('tabelaPrecoParceiro');
            const allTP = await store2.getAll();
            const tpParceiro = allTP.find((t: any) => Number(t?.parceiroId) === Number(pedidoVisualizar?.parceiroId));
            setEmpresaDesc(String(tpParceiro?.empresa?.descricao || ''));
            setEmpresaId(Number(tpParceiro?.empresaId || tpParceiro?.empresa?.id || 0) || null);
            await tx2.done;
          } catch {}
          try {
            const tx3 = db.transaction('parceiro', 'readonly');
            const store3 = tx3.objectStore('parceiro');
            const parceiro = await store3.get(Number(pedidoVisualizar?.parceiroId));
            setUfCliente(String(parceiro?.uf || '').toUpperCase());
            setParceiroCodigo(String(parceiro?.codParceiro ?? pedidoVisualizar?.parceiroId ?? ''));
            setParceiroCnpj(String(parceiro?.cnpj_Cpf ?? ''));
            setParceiroNome(String(parceiro?.nome ?? pedidoVisualizar?.parceiroNome ?? ''));
            await tx3.done;
          } catch {}
          try {
            const tx4 = db.transaction('tipoNegociacao', 'readonly');
            const store4 = tx4.objectStore('tipoNegociacao');
            const tipo = await store4.get(Number(pedidoVisualizar?.tipoNegociacaoId));
            setTipoNegDesc(String(tipo?.descricao || ''));
            await tx4.done;
            if (!tipo) {
              try {
                const resp = await api.get(`/api/TipoNegociacao/${pedidoVisualizar?.tipoNegociacaoId}`);
                setTipoNegDesc(String(resp?.data?.descricao || ''));
              } catch {
                setTipoNegDesc('');
              }
            }
          } catch {
            try {
              const resp = await api.get(`/api/TipoNegociacao/${pedidoVisualizar?.tipoNegociacaoId}`);
              setTipoNegDesc(String(resp?.data?.descricao || ''));
            } catch {
              setTipoNegDesc('');
            }
          }
        } else {
          setItensVisualizar([]);
          setQtdItens(0);
          setEmpresaDesc('');
          setTipoNegDesc('');
          setParceiroCodigo('');
          setParceiroCnpj('');
          setParceiroNome('');
        }
      } catch {}
    })();
  }, [showVisualizarPend, pedidoVisualizar]);
  const formatarData = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const d = String(dateStr).split('T', 1)[0];
    const parts = d.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return d;
  };

  useEffect(() => {
    if (
      window.innerWidth <= 1024 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
      isMobile = true;
      console.log('estou no mobile.....', isMobile);
    }
  }, []);

  const currentCacheVersion = parseInt(
    localStorage.getItem('cachedVersion') || '0'
  );

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const GrupoPermissoes: iPaginaPermissao[] = JSON.parse(
    localStorage.getItem('@Portal/grupoPermissaoPagina') || '[]'
  );
  const UsuarioPermissoes: iPaginaPermissao[] = JSON.parse(
    localStorage.getItem('@Portal/usuarioPermissaoPagina') || '[]'
  );

  const AnoAnterior: number = JSON.parse(
    localStorage.getItem('@Portal/dash/valorTotalAnoAnterior') || '0'
  );

  //============= gets cards ====================================================

  let metaMes1: number = JSON.parse(
    localStorage.getItem('@Portal/dash/metaMesHome') || '0'
  );

  let valorMes1: number = JSON.parse(
    localStorage.getItem('@Portal/dash/vendaMesHome') || '0'
  );

  let valorAnterio1: number = JSON.parse(
    localStorage.getItem('@Portal/dash/valorAnteriorHome') || '0'
  );

  console.log('valor vindo do context valor', valorTotalAno);

  useEffect(() => {
    localStorage.removeItem('@Portal/PedidoEmDigitacao');

    const hasReloaded = localStorage.getItem('hasReloaded');

    if (!hasReloaded) {
      localStorage.setItem('hasReloaded', 'true');
    }
  }, []);

  function formatarDataHoraSP(iso: string): string | null {
    const dt = new Date(iso);
    if (Number.isNaN(dt.getTime())) return null;
    const data = dt.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const hora = dt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });
    return `${data} ${hora}`;
  }

  function lerRecebimentoLocal(): { iso: string | null; tabelasComErro: string[] } {
    try {
      const iso = localStorage.getItem('@Portal/RecebimentoLocal/ultimoSucessoEm');
      const raw = localStorage.getItem('@Portal/RecebimentoLocal/tabelasComErro');
      const tabelasComErro = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
      return { iso, tabelasComErro };
    } catch {
      return { iso: null, tabelasComErro: [] };
    }
  }

  function parseMs(iso: string | null): number {
    if (!iso) return NaN;
    const t = new Date(iso).getTime();
    return Number.isNaN(t) ? NaN : t;
  }

  async function carregarStatusUltimoRecebimento() {
    const vendedorId = Number(usuario.username);
    if (!Number.isFinite(vendedorId) || vendedorId <= 0) return;

    let apiIso: string | null = null;
    let apiErros: string[] = [];
    try {
      const response = await api.get(
        `/api/Sankhya/RecebimentoLog/ultimo?vendedorId=${vendedorId}`
      );
      apiIso = response?.data?.ultimoSucessoEm || response?.data?.ultimoRegistroEm || null;
      apiErros = Array.isArray(response?.data?.tabelasComErro) ? response.data.tabelasComErro : [];
    } catch {}

    const local = lerRecebimentoLocal();
    const apiMs = parseMs(apiIso);
    const localMs = parseMs(local.iso);

    const usarLocal =
      Number.isFinite(localMs) && (!Number.isFinite(apiMs) || localMs > apiMs);

    const isoFinal = usarLocal ? local.iso : apiIso;
    const errosFinal = usarLocal ? local.tabelasComErro : apiErros;

    setTabelasComErroSankhya(Array.isArray(errosFinal) ? errosFinal : []);
    if (!isoFinal) return;
    const texto = formatarDataHoraSP(isoFinal);
    if (texto) setDadosAtualizadosEm(texto);
  }

  useEffect(() => {
    (async () => {
      await carregarStatusUltimoRecebimento();
    })();
  }, []);
  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOnline) {
    } else {
    }
  }, [isOnline]);

  useEffect(() => {
    function handleTouchMove(e: any) {
      if (!isOnline && window.scrollY === 0 && e.touches[0].clientY > startY) {
        e.preventDefault();
      }
    }

    function handleTouchStart(e: any) {
      startY = e.touches[0].clientY;
    }

    let startY = 0;

    if (!isOnline) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
    }

    return () => {
      if (!isOnline) {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, [isOnline]);

  // useEffect(() => {
  //   Login();
  //   LoginSank();
  //   const interval = setInterval(LoginSank, 20000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    if (!isOnline) {
      return;
    }
    Login();
    LoginSank();
    const interval = setInterval(LoginSank, 20000);
    return () => {
      clearInterval(interval);
    };
  }, [isOnline]);

  useEffect(() => {
    VerificarPedidosPendentes();
  }, []);

  function normalizarStatusPedido(status: any) {
    const s = String(status || '').trim().toLowerCase();
    const sNorm = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (sNorm === 'nao enviado') return 'nao_enviado';
    if (sNorm === 'pendente') return 'pendente';
    return '';
  }

  async function ObterTipoEnvioSankhyaConfiguracao(): Promise<0 | 1> {
    try {
      const resp = await api.get(`/api/Configuracao/1`);
      const raw =
        (resp as any)?.data?.envio ??
        (resp as any)?.data?.Envio ??
        (resp as any)?.data?.configuracao?.envio ??
        (resp as any)?.data?.configuracao?.Envio ??
        0;
      const v = Number(raw);
      return v === 1 ? 1 : 0;
    } catch {
      return 0;
    }
  }

  function parseCabecalhoDataMs(v: any) {
    const s = String(v || '').trim();
    if (!s) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/.exec(
      s
    );
    if (!m) {
      const d = new Date(s);
      const ms = d.getTime();
      return Number.isNaN(ms) ? null : ms;
    }
    const yyyy = Number(m[1]);
    const mm = Number(m[2]);
    const dd = Number(m[3]);
    const hh = Number(m[4]);
    const mi = Number(m[5]);
    const ss = Number(m[6]);
    const frac = String(m[7] || '');
    const ms = frac ? Number(frac.slice(0, 3).padEnd(3, '0')) : 0;
    const t = new Date(yyyy, mm - 1, dd, hh, mi, ss, ms).getTime();
    return Number.isNaN(t) ? null : t;
  }

  function isCabecalhoMesAtual(x: any) {
    const ms = parseCabecalhoDataMs(x?.data);
    if (ms == null) return false;
    const d = new Date(ms);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    );
  }

  async function VerificarPedidosPendentes() {
    try {
      const usuarioLocal: iDadosUsuario = JSON.parse(
        localStorage.getItem('@Portal/usuario') || '{}'
      );
      const codVendedor = usuarioLocal.username;
      const resp = await api.get(
        `/api/CabecalhoPedidoVenda/v2/pendencias/vendedor?pagina=1&totalpagina=1&codVendedor=${codVendedor}`
      );
      const totalPendentes = Number(resp?.data?.totalPendentes ?? 0);
      const totalNaoEnviados = Number(resp?.data?.totalNaoEnviados ?? 0);
      const total = Number(resp?.data?.total ?? totalPendentes + totalNaoEnviados);
      setPendentesCount(totalPendentes);
      setNaoEnviadosCount(totalNaoEnviados);
      setProcessarAtrasadosCount(0);
      setListaPendEnvio([]);
      setTotalPaginasPendEnvio(total);
      if (totalPendentes > 0 || totalNaoEnviados > 0) {
        setShowPendEnvio(true);
      }
    } catch {}
  }

  async function VerificarClientesInativos60Dias(
    showAlertOnResult: boolean = true,
    diasOverride?: string
  ) {
    try {
      const usuarioLocal: iDadosUsuario = JSON.parse(
        localStorage.getItem('@Portal/usuario') || '{}'
      );
      const codVendedor = usuarioLocal.username;
      const diasFiltro = String(
        diasOverride !== undefined ? diasOverride : diasSemCompra
      ).trim();
      const diasNum = Number(diasFiltro);
      const condDias =
        !diasFiltro || isNaN(diasNum) ? 'dias >= 60' : `dias = ${diasNum}`;
      const sql = `SELECT * FROM AD_VCLIENTES
          WHERE ${condDias}
           AND (VENCOD = ${codVendedor} OR ${codVendedor} IS NULL)
           AND VENCOD <> 0
           AND ATIVO = 1
           ORDER BY DIAS ASC`;
      const response = await api.post(
        `/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`
      );
      const data = response?.data?.responseBody?.rows || [];
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
        };
      });
      setTotalPaginasInativos(
        Math.ceil((result || []).length / qtdePaginaInativos)
      );
      setClientesInativosAll(result);
      if (
        Array.isArray(result) &&
        result.length > 0 &&
        showAlertOnResult &&
        !showListaInativos
      ) {
        setShowInatividadeAlert(true);
      }
    } catch {}
  }

  function AtualizarInativos(diasOverride?: string) {
    setPaginaInativos(1);
    VerificarClientesInativos60Dias(false, diasOverride);
  }

  useEffect(() => {
    const arr = Array.isArray(clientesInativosAll) ? clientesInativosAll : [];
    setClientesInativos(
      arr.slice(
        (paginaInativos - 1) * qtdePaginaInativos,
        paginaInativos * qtdePaginaInativos
      ) || []
    );
  }, [paginaInativos, clientesInativosAll]);

  async function AbrirListaPendentes() {
    try {
      setShowListaPendEnvio(true);
      console.log('setShowListaPendEnvio')
      setLoadingListaPendEnvio(true);
      setProcessarAtrasadosCount(0);
      const usuarioLocal: iDadosUsuario = JSON.parse(
        localStorage.getItem('@Portal/usuario') || '{}'
      );
      const codVendedor = usuarioLocal.username;
      const resp = await api.get(
        `/api/CabecalhoPedidoVenda/v2/pendencias/vendedor?pagina=${paginaPendEnvio}&totalpagina=${pageSizeFrontPendEnvio}&codVendedor=${codVendedor}`
      );

      const total = Number(resp?.data?.total ?? 0);
      const totalPagesFront = Math.max(
        1,
        Math.ceil(total / pageSizeFrontPendEnvio)
      );
      if (paginaPendEnvio > totalPagesFront) {
        setPaginaPendEnvio(totalPagesFront);
        setLoadingListaPendEnvio(false);
        return;
      }

      const pageData = resp?.data?.data ?? [];
      setListaPendEnvio(pageData);
      setTotalPaginasPendEnvio(total);
      setSimilaresEnviados({});
      try {
        const ids = Array.from(
          new Set(
            pageData
              .map((x: any) => x?.parceiroId)
              .filter((x: any) => x !== undefined && x !== null)
          )
        );
        const docsMap: {
          [key: string]: { nome: string; cnpj: string };
        } = {};
        await Promise.all(
          ids.map(async (id: any) => {
            try {
              const r = await api.get(`/api/Parceiro/${id}`);
              docsMap[String(id)] = {
                nome: String(r?.data?.nome ?? ''),
                cnpj: String(r?.data?.cnpj_Cpf ?? ''),
              };
            } catch {}
          })
        );
        setParceiroDocs(docsMap);
      } catch {}
      setShowListaPendEnvio(true);
      setLoadingListaPendEnvio(false);
    } catch {
      setShowListaPendEnvio(true);
      setLoadingListaPendEnvio(false);
    }
  }

  useEffect(() => {
    if (showListaPendEnvio) {
      AbrirListaPendentes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginaPendEnvio]);
  // efeito unificado de LoginSankhya controlado por isOnline acima

  async function Finalizar() {
    console.log('entrou');
    metaMes1 = JSON.parse(
      localStorage.getItem('@Portal/dash/metaMesHome') || '0'
    );
    valorMes1 = JSON.parse(
      localStorage.getItem('@Portal/dash/vendaMesHome') || '0'
    );
    valorAnterio1 = JSON.parse(
      localStorage.getItem('@Portal/dash/valorAnteriorHome') || '0'
    );
    console.log(
      'Meta mes',
      metaMes1,
      'valorMes1',
      valorMes1,
      'valorAnterior1',
      valorAnterio1
    );
  }

  //=================teste================================
  async function Login() {
    try {
      await teste();
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function teste() {
    const codGer = usuario.username;
    const sql = `SELECT 	TOP 10 * FROM TGFPRO
`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('PRODUTOS...', response.data.responseBody);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  //======================================================

  async function LoginSank() {
    try {
      if (usuario.grupoId == 2) {
        await DadosMetaMesValorMesRepresentante();
      } else if (usuario.grupoId == 5) {
        await DadosMetaMesValorMesCoordenador();
      } else {
        await DadosMetaMesValorMesAdmin();
      }
    } catch (error) {
      console.log('erro', error);
    }
  }
  function obterNumeroMesAtual(): number {
    const dataAtual = new Date();
    const numeroMes = dataAtual.getMonth() + 1;
    return numeroMes;
  }

  //===========funções coordenador======================================
  async function DadosMetaMesValorMesCoordenador() {
    console.log('entrou aqui no coord');
    const codGer = usuario.username;
    const numeroMesAtual = obterNumeroMesAtual();
    console.log(`O número do mês atual é: ${numeroMesAtual}`);

    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('anoAtualOk', anoAtual);
    // const sql = `SELECT 	ISNULL(MET.CODGER, VEN.CODGER) CODGER,
    //                       ISNULL(MET.NOMEGER, VEN.NOMEGER) NOMEGER,
    //                       ISNULL(MET.VLRMET, 0) VLRMET,
    //                       ISNULL(VEN.VLRVEN,0) VLRVEN,
    //                       CASE WHEN MET.VLRMET > 0 THEN
    //                       CASE WHEN VEN.VLRVEN / MET.VLRMET < 0.8 THEN 'RED'
    //                            WHEN VEN.VLRVEN / MET.VLRMET >= 0.8 AND VEN.VLRVEN / MET.VLRMET < 1 THEN 'YELLOW'
    //                            WHEN VEN.VLRVEN / MET.VLRMET >= 1 THEN 'GREEN'
    //                       END
    //                       ELSE
    //                         'GREY'
    //                       END COLOR
    //                       FROM (
    //                       SELECT VDO.CODGER, GER.APELIDO NOMEGER, SUM(MET.PREVREC) VLRMET
    //                       FROM TGFMET MET (NOLOCK)
    //                       LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
    //                       LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
    //                       WHERE YEAR(MET.DTREF) = YEAR(GETDATE())
    //                       AND RIGHT('0' + CAST(MONTH(MET.DTREF) AS VARCHAR(2)), 1) = RIGHT('0' + CAST(MONTH(GETDATE()) AS VARCHAR(2)), 1) -- Verifica o mês
    //                       AND (VDO.CODGER = ${codGer} OR ${codGer} IS NULL)
    //                       GROUP BY VDO.CODGER, GER.APELIDO
    //                       ) MET
    //                       FULL JOIN (
    //                       SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, SUM(FIN) VLRVEN
    //                       FROM AD_VVENDAS_CLI VEN
    //                       WHERE VEN.ANO = YEAR(GETDATE())
    //                       AND RIGHT('0' + CAST(VEN.MES AS VARCHAR(2)), 1) = RIGHT('0' + CAST(MONTH(GETDATE()) AS VARCHAR(2)), 1) -- Verifica o mês
    //                       AND (VEN.CODGER = ${codGer} OR ${codGer} IS NULL)
    //                       GROUP BY VEN.CODGER, VEN.APELIDOG
    //                       ) VEN ON VEN.CODGER = MET.CODGER
    //                       ORDER BY 1,3`;

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
  WHERE YEAR(MET.DTREF) = ${anoAtual}
  AND MET.CODEMP <> 6 
  AND MET.CODVEND < 30000
  AND (MONTH(DTREF) = ${numeroMesAtual} OR ${numeroMesAtual} = 0)
  AND (VDO.CODGER = ${codGer} OR ${codGer} IS NULL)
  GROUP BY VDO.CODGER, GER.APELIDO
) MET
FULL JOIN (
  SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, SUM(FIN) VLRVEN
  FROM AD_VVENDAS_CLI VEN
  WHERE VEN.ANO = ${anoAtual}
  AND (MES = ${numeroMesAtual} OR ${numeroMesAtual} = 0)
  AND (VEN.CODGER = ${codGer} OR ${codGer} IS NULL)
  GROUP BY VEN.CODGER, VEN.APELIDOG
) VEN ON VEN.CODGER = MET.CODGER
ORDER BY 1,3`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log(
          'meta de vendas coordenador',
          response.data.responseBody.rows
        );

        if (response.data.responseBody.rows[0]?.[2] != undefined) {
          localStorage.setItem(
            '@Portal/dash/metaMesHome',
            response.data.responseBody.rows[0]?.[2]
          );
        } else {
          localStorage.setItem('@Portal/dash/metaMesHome', '0');
        }
        if (response.data.responseBody.rows[0]?.[3] != undefined) {
          localStorage.setItem(
            '@Portal/dash/vendaMesHome',
            response.data.responseBody.rows[0]?.[3]
          );
        } else {
          localStorage.setItem('@Portal/dash/vendaMesHome', '0');
        }

        DadosGraficoCoord();
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
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
                        ORDER BY 1`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));

        const dataAtual = new Date();
        const mesNumero = dataAtual.getMonth();

        const nomesMeses = [
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

        const mesAtual = nomesMeses[mesNumero];
        const valorAnoant: iGrafico[] = dadosArray.filter(
          (dados: iGrafico) => dados.Mes == mesAtual
        );

        const valorAnterior: Number = valorAnoant[0].AnoAnterior;
        console.log('valor do mes anterior', valorAnterior);

        localStorage.setItem(
          '@Portal/dash/valorAnteriorHome',
          String(valorAnterior)
        );
        console.log('mes atual', mesAtual);

        DadosSelectCampanhaCoord();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }
  async function DadosSelectCampanhaCoord() {
    console.log('entrou no venda x meta');

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

        console.log('valoresadquiridosVendedorCampanhaAtual', result[0].value);

        CaapnhaDadosMesAMaesCoord(result[0].value);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function CaapnhaDadosMesAMaesCoord(codCampanha: number) {
    const codVen2 = usuario.username;

    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
    const sql = `SELECT CAM.CODMETA
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

    //   const sql = `SELECT CAM.CODMETA
    //   , DESCRMETA
    //   , case when MONTH(MET.DATAMET) = 1 then 'Jan'
    //        when MONTH(MET.DATAMET) = 2 then 'Fev'
    //        when MONTH(MET.DATAMET) = 3 then 'Mar'
    //        when MONTH(MET.DATAMET) = 4 then 'Abr'
    //        when MONTH(MET.DATAMET) = 5 then 'Mai'
    //        when MONTH(MET.DATAMET) = 6 then 'Jun'
    //        when MONTH(MET.DATAMET) = 7 then 'Jul'
    //        when MONTH(MET.DATAMET) = 8 then 'Ago'
    //        when MONTH(MET.DATAMET) = 9 then 'Set'
    //        when MONTH(MET.DATAMET) = 10 then 'Out'
    //        when MONTH(MET.DATAMET) = 11 then 'Nov'
    //        when MONTH(MET.DATAMET) = 12 then 'Dez'

    //     else 'Out' end MES
    //   , SUM(MET.VLRMET) META
    //   , SUM(MET.VLRREA) REAL

    // FROM AD_CAMPANHA CAM
    // JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
    // JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
    // WHERE CONVERT(DATE, DTINI) >= DATEADD (DAY, 1, EOMONTH (GETDATE (), -1))
    //   AND CONVERT(DATE, DTFIN) >= EOMONTH (GETDATE())
    //   AND VEN.CODGER = ${codVen2}
    // GROUP BY CAM.CODMETA
    //   , DESCRMETA
    //   , MONTH(MET.DATAMET)`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Campanha: item[1],
          Mes: item[2],
          Meta: item[3],
          Valor: item[4],
        }));
        const somaMeta = dadosArray.reduce(
          (acc: any, curr: any) => acc + curr.Meta,
          0
        );
        const somaAtual = dadosArray.reduce(
          (acc: any, curr: any) => acc + curr.Valor,
          0
        );
        if (dadosArray != undefined) {
          setcampanhaMesCoord(dadosArray);
          campanhaMesCoord = dadosArray;
          setcampanhaGeral([
            { Campanha: '', Color: '', Meta: somaMeta, Valor: somaAtual },
          ]);
          campanhaGeral = [
            { Campanha: '', Color: '', Meta: somaMeta, Valor: somaAtual },
          ];
        }

        console.log('dadosGeraisCampanhaMesCoord', dadosArray);
        Finalizar();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  //===========funções vendedor=========================================

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

        console.log('metaMes', response.data.responseBody.rows[0]?.[1]);

        console.log('vendaMes', response.data.responseBody.rows[0]?.[2]);
        if (response.data.responseBody.rows[0]?.[1] != undefined) {
          localStorage.setItem(
            '@Portal/dash/metaMesHome',
            response.data.responseBody.rows[0]?.[1]
          );
        } else {
          localStorage.setItem('@Portal/dash/metaMesHome', '0');
        }
        if (response.data.responseBody.rows[0]?.[2] != undefined) {
          localStorage.setItem(
            '@Portal/dash/vendaMesHome',
            response.data.responseBody.rows[0]?.[2]
          );
        } else {
          localStorage.setItem('@Portal/dash/vendaMesHome', '0');
        }

        DadosGraficoRepresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  async function DadosGraficoRepresentante() {
    const codVen2 = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);

    const sql = `SELECT
                  ANT.MES AS NMES,
                  LEFT(DATENAME(MONTH, DATEADD(MONTH, ANT.MES - 1, 0)), 3) AS MES,
                  ANT.VLRVEN AS VLRANT,
                  ISNULL(ATU.VLRVEN, 0) AS VLRATU
                FROM
                (
                  SELECT
                      MES,
                      SUM(FIN) AS VLRVEN
                  FROM
                      AD_VVENDAS_CLI VEN
                  WHERE
                      ANO = ${anoAnterior} 
                      AND (VEN.CODVEND = ${codVen2}) 
                  GROUP BY
                      MES
                ) ANT
                LEFT JOIN
                (
                  SELECT
                      MES,
                      SUM(FIN) AS VLRVEN
                  FROM
                      AD_VVENDAS_CLI VEN
                  WHERE
                      ANO = ${anoAtual}
                      AND (VEN.CODVEND = ${codVen2}) 
                  GROUP BY
                      MES
                ) ATU
                ON ATU.MES = ANT.MES
                ORDER BY 1;`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));
        const dataAtual = new Date();
        const mesNumero = dataAtual.getMonth();

        const nomesMeses = [
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

        const mesAtual = nomesMeses[mesNumero];
        const valorAnoant: iGrafico[] = dadosArray.filter(
          (dados: iGrafico) => dados.Mes == mesAtual
        );

        const valorAnterior: Number = valorAnoant[0].AnoAnterior;
        console.log('valor do mes anterior', valorAnterior);

        localStorage.setItem(
          '@Portal/dash/valorAnteriorHome',
          String(valorAnterior)
        );
        console.log('mes atual', mesAtual);
        DadosSelectCampanha();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  async function DadosSelectCampanha() {
    console.log('entrou no venda x meta');
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

        console.log('valoresadquiridosVendedorCampanhaAtual', result[0].value);

        CaapnhaDadosGerais(result[0].value);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function CaapnhaDadosGerais(codCampanha: number) {
    const codVen2 = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
    const sql = `SELECT 
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
                  , CAM.DESCRMETA 
                FROM AD_CAMPANHA CAM
                JOIN AD_CAMPANHAMETAS MET ON MET.CODMETA = CAM.CODMETA
                JOIN TGFVEN VEN ON VEN.CODVEND = MET.CODVEND
                where CAM.CODMETA = ${codCampanha} AND VEN.CODVEND = ${usuario.username}
                GROUP BY MET.CODVEND
                  , VEN.APELIDO, CAM.DESCRMETA`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Color: item[0],
          Meta: item[3],
          Valor: item[4],
          Campanha: item[5],
        }));
        console.log('campanhaGeralHome', response.data.responseBody);
        if (dadosArray != undefined) {
          setcampanhaGeral(dadosArray);
          campanhaGeral = dadosArray;
        } else {
        }

        console.log('dadosGeraisCampanha', dadosArray[0]);

        CaapnhaDadosMesAMaes(codCampanha);
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  async function CaapnhaDadosMesAMaes(codCampanha: number) {
    const codVen2 = usuario.username;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior capm', anoAnterior, 'campa',codCampanha);

    const sql = `SELECT MONTH(MET.DATAMET) MES1
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

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[0],
          Color: item[1],
          Meta: item[5],
          Valor: item[6],
        }));

        if (dadosArray != undefined) {
          setcampanhaMes(dadosArray);
          campanhaMes = dadosArray;
        }
        console.log('dadosGeraisCampanhaMes', dadosArray);
        Finalizar();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }
  //===========funções admin e diretoria ===============================

  async function DadosMetaMesValorMesAdmin() {
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

        console.log('vendaMes', response.data.responseBody.rows[0]?.[2]);

        if (response.data.responseBody.rows[0]?.[1] != undefined) {
          localStorage.setItem(
            '@Portal/dash/metaMesHome',
            response.data.responseBody.rows[0]?.[1]
          );
        } else {
          localStorage.setItem('@Portal/dash/metaMesHome', '0');
        }
        if (response.data.responseBody.rows[0]?.[2] != undefined) {
          localStorage.setItem(
            '@Portal/dash/vendaMesHome',
            response.data.responseBody.rows[0]?.[2]
          );
        } else {
          localStorage.setItem('@Portal/dash/vendaMesHome', '0');
        }

        DadosGraficoAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //==============================================================================================

  async function DadosGraficoAdmin() {
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
                GROUP BY MES
                ) ANT
                LEFT JOIN (
                SELECT MES, SUM(FIN) AS VLRVEN
                FROM AD_VVENDAS_CLI VEN
                WHERE ANO = ${anoAtual}
                GROUP BY MES
                ) ATU
                ON ATU.MES = ANT.MES
                ORDER BY 1;`;

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

        const dataAtual = new Date();
        const mesNumero = dataAtual.getMonth();

        const nomesMeses = [
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

        const mesAtual = nomesMeses[mesNumero];
        const valorAnoant: iGrafico[] = dadosArray.filter(
          (dados: iGrafico) => dados.Mes == mesAtual
        );

        const valorAnterior: Number = valorAnoant[0].AnoAnterior;
        console.log('valor do mes anterior', valorAnterior);
        console.log('mes atual', mesAtual);

        localStorage.setItem(
          '@Portal/dash/valorAnteriorHome',
          String(valorAnterior)
        );
        Finalizar();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  //=====================================================================

  useEffect(() => {
    function obterMesAtual(): string {
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

      const dataAtual = new Date();
      const mesAtual = dataAtual.getMonth();

      return meses[mesAtual];
    }

    const mesAtual = obterMesAtual();
    const itemMesAtual = graficoTotal.find(
      (item: iGrafico) => item.Mes === mesAtual
    );

    if (itemMesAtual) {
      setNovomesAtual([itemMesAtual]);
      NovomesAtual = [itemMesAtual];
    } else {
      setNovomesAtual([]);
    }
    LoginSankhyaRelatorio();
  }, []);

  //================Relatorio================================================================

  async function LoginSankhyaRelatorio() {
    try {
      await MetaXRealizado();
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function MetaXRealizado() {
    console.log(
      'Entrou nos Relatorios...................................................................'
    );
    const codVen = usuario.username;

    const sql = `SELECT MET.MES, MET.VLRMET VLRMET, ISNULL(VEN.VLRVEN,0) VLRVEN
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
    ORDER BY 1`;

    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
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
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //==================================================================
  async function ListaCobranca() {
    const codVen = usuario.username;

    const sql = `SELECT DISTINCT
                  'TI@CIGEL.COM.BR' AS EMAIL,
                  FIN.CODEMP AS CODEMP,
                  FIN.CODPARC AS CODPARC,
                  FIN.DTNEG AS DATINI,
                  FIN.DTVENC AS DATINI,
                  CASE
                      WHEN CAB.NUMNFSE IS NOT NULL THEN CAB.NUMNFSE
                      ELSE CONVERT(VARCHAR(10), FIN.NUMNOTA)
                  END AS Nro_Nota,
                  FIN.DESDOBRAMENTO AS Parce,
                  CONVERT(VARCHAR(10), FIN.CODPARC) + '-' + PAR.RAZAOSOCIAL AS Clientes,
                  FIN.DTNEG AS Emissao,
                  FIN.DTVENC AS Dt_Venc,
                  DATEDIFF(DAY, FIN.DTVENC, GETDATE()) AS Dias_Atr,
                  ((FIN.VLRDESDOB - ISNULL(FIN.VLRJUROEMBUT, 0) - ISNULL(FIN.VLRMULTAEMBUT, 0)) * FIN.RECDESP) AS Valor,
                  (((FIN.VLRDESDOB - ISNULL(FIN.VLRJUROEMBUT, 0) - ISNULL(FIN.VLRMULTAEMBUT, 0)) * FIN.RECDESP) *
                      (SELECT NUMDEC FROM TSIPAR WHERE CHAVE = 'TAXADIAATRASO') *
                      DATEDIFF(DAY, FIN.DTVENC, GETDATE()) / 100) AS Juros,
                  (((FIN.VLRDESDOB - ISNULL(FIN.VLRJUROEMBUT, 0) - ISNULL(FIN.VLRMULTAEMBUT, 0)) * FIN.RECDESP) *
                      (SELECT NUMDEC FROM TSIPAR WHERE CHAVE = 'PERCMULTA')) / 100 AS Multa,
                  VEN.APELIDO
              FROM TGFFIN FIN
              LEFT JOIN TGFPAR PAR ON (FIN.CODPARC = PAR.CODPARC)
              LEFT JOIN TGFCAB CAB ON (CAB.NUNOTA = FIN.NUNOTA)
              LEFT JOIN TGFVEN VEN ON (VEN.CODVEND = FIN.CODVEND)
              WHERE
                  FIN.DHBAIXA IS NULL
                  AND CONVERT(date, FIN.DTVENC) <= CONVERT(date, GETDATE() - 2)
                  AND FIN.RECDESP = 1
                  AND FIN.PROVISAO = 'N'
                  AND VEN.EMAIL IS NOT NULL
                  AND PAR.CODVEND = ${codVen}
              ORDER BY Dias_Atr DESC;`;

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
        VendasClientesQueda();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //=======================================================

  async function VendasClientesQueda() {
    const codVen = usuario.username;
    const sql = `SELECT QRY.*, CASE
                      WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                      WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                      ELSE (QRY.ANOATU/QRY.ANOANT)-1 END * 100 CRESC
                  FROM (
                  SELECT  VEN.UF
                  ,	ISNULL(PAR.CODPARC,'') CODCLI
                  , 	ISNULL(PAR.RAZAOSOCIAL,'') CLIENTE
                  ,	(SELECT MAX(DTNEG) FROM TGFFIN WHERE CODPARC = PAR.CODPARC) ULTFAT
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-00,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) MESA
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-01,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) ANT1
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-02,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) ANT2
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-03,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) ANT3
                  ,	SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())-1) + '-01-01')
                  AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())-1) + SUBSTRING(CONVERT(VARCHAR,CONVERT(DATE, GETDATE())),5,6)) THEN
                      VEN.FIN
                    ELSE
                      0
                    END) ANOANT
                  ,	SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + '-01-01')
                  AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + SUBSTRING(CONVERT(VARCHAR,CONVERT(DATE, GETDATE())),5,6)) THEN
                      VEN.FIN
                    ELSE
                      0
                    END) ANOATU
                  FROM AD_VVENDAS12 VEN
                  LEFT JOIN TGFPAR PAR (NOLOCK) ON PAR.CGC_CPF = VEN.CGC_CPF AND PAR.CLIENTE = 'S'
                  LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = PAR.CODVEND
                  WHERE SUBSTRING(VEN.ANOMES,1,4) >= YEAR(GETDATE())-1
                  AND PAR.CODVEND = ${codVen}
                  AND PAR.ATIVO = 'S'
                  GROUP BY VDO.APELIDO, VEN.UF, PAR.CODPARC, PAR.RAZAOSOCIAL
                  ) QRY
                  WHERE CASE	WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                    WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                    ELSE (QRY.ANOATU/QRY.ANOANT)-1 END < 0
                  ORDER BY CRESC, ANOANT DESC;
                  `;

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

        VendasClientesCrescimento();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //===============================================================================================

  async function VendasClientesCrescimento() {
    const codVen = usuario.username;
    const sql = `SELECT QRY.*, CASE
                      WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                      WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                      ELSE (QRY.ANOATU/QRY.ANOANT)-1 END * 100 CRESC
                  FROM (
                  SELECT  VEN.UF
                  ,	ISNULL(PAR.CODPARC,'') CODCLI
                  , 	ISNULL(PAR.RAZAOSOCIAL,'') CLIENTE
                  ,	(SELECT MAX(DTNEG) FROM TGFFIN WHERE CODPARC = PAR.CODPARC) ULTFAT
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-00,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) MESA
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-01,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) ANT1
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-02,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) ANT2
                  ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-03,GETDATE()), 112) THEN VEN.FIN ELSE 0 END) ANT3
                  ,	SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())-1) + '-01-01')
                  AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())-1) + SUBSTRING(CONVERT(VARCHAR,CONVERT(DATE, GETDATE())),5,6)) THEN
                      VEN.FIN
                    ELSE
                      0
                    END) ANOANT
                  ,	SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + '-01-01')
                  AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + SUBSTRING(CONVERT(VARCHAR,CONVERT(DATE, GETDATE())),5,6)) THEN
                      VEN.FIN
                    ELSE
                      0
                    END) ANOATU
                  FROM AD_VVENDAS12 VEN
                  LEFT JOIN TGFPAR PAR (NOLOCK) ON PAR.CGC_CPF = VEN.CGC_CPF AND PAR.CLIENTE = 'S'
                  LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = PAR.CODVEND
                  WHERE SUBSTRING(VEN.ANOMES,1,4) >= YEAR(GETDATE())-1
                  AND PAR.CODVEND = ${codVen}
                  AND PAR.ATIVO = 'S'
                  GROUP BY VDO.APELIDO, VEN.UF, PAR.CODPARC, PAR.RAZAOSOCIAL
                  ) QRY
                  WHERE CASE	WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                    WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                    ELSE (QRY.ANOATU/QRY.ANOANT)-1 END >= 0
                  ORDER BY CRESC, ANOANT DESC;`;
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
        VendasProdutosQueda();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //============================================================================================

  async function VendasProdutosQueda() {
    const codVen = usuario.username;

    const sql = `SELECT QRY.*,
                    CASE
                        WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                        WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                        ELSE ((QRY.ANOATU / QRY.ANOANT) - 1) * 100
                    END AS CRESC
                FROM (
                    SELECT
                        ISNULL(GRU.CODGRUPOPROD, '') CODGRUPOPROD,
                        ISNULL(GRU.DESCRGRUPOPROD, '') DESCRGRUPOPROD,
                        PRO.CODVOL UNID2,
                        SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6), DATEADD(mm, -00, GETDATE()), 112) THEN VEN.QTD END) MESA,
                        SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6), DATEADD(mm, -01, GETDATE()), 112) THEN VEN.QTD END) ANT1,
                        SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6), DATEADD(mm, -02, GETDATE()), 112) THEN VEN.QTD END) ANT2,
                        SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6), DATEADD(mm, -03, GETDATE()), 112) THEN VEN.QTD END) ANT3,
                        SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE()) - 1) + '-01-01') 
                                AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE()) - 1) + SUBSTRING(CONVERT(VARCHAR, GETDATE()), 5, 6)) 
                                THEN VEN.QTD ELSE 0 END) ANOANT,
                        SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + '-01-01') 
                                AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + SUBSTRING(CONVERT(VARCHAR, GETDATE()), 5, 6)) 
                                THEN VEN.QTD ELSE 0 END) ANOATU
                    FROM AD_VVENDAS12 VEN
                    LEFT JOIN TGFPRO PRO (NOLOCK) ON CONVERT(VARCHAR, PRO.CODPROD) = '1' + VEN.CODPROD
                    LEFT JOIN TGFGRU GRU (NOLOCK) ON GRU.CODGRUPOPROD = PRO.CODGRUPOPROD
                    LEFT JOIN TGFPAR PAR (NOLOCK) ON PAR.CGC_CPF = VEN.CGC_CPF AND PAR.CLIENTE = 'S'
                    LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = PAR.CODVEND
                    WHERE SUBSTRING(VEN.ANOMES, 1, 4) >= CONVERT(VARCHAR, YEAR(GETDATE()) - 1)
                        AND PAR.CODVEND = ${codVen}
                        AND GRU.ATIVO = 'S'
                    GROUP BY GRU.CODGRUPOPROD, GRU.DESCRGRUPOPROD, PRO.CODVOL
                ) QRY
                WHERE CASE
                        WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                        WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                        ELSE ((QRY.ANOATU / QRY.ANOANT) - 1)
                    END >= 0
                ORDER BY CRESC, ANOANT DESC;`;

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
        VendasProdutosCrescimento();
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //================================================================================================

  async function VendasProdutosCrescimento() {
    const codVen = usuario.username;
    const sql = `SELECT QRY.*, CASE
                    WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                    WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                    ELSE (QRY.ANOATU/QRY.ANOANT)-1 END * 100 CRESC
                FROM (
                SELECT  ISNULL(GRU.CODGRUPOPROD,'') CODGRUPOPROD
                , 	ISNULL(GRU.DESCRGRUPOPROD,'') DESCRGRUPOPROD
                ,	PRO.CODVOL UNID2
                ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-00,GETDATE()), 112) THEN VEN.QTD END) MESA
                ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-01,GETDATE()), 112) THEN VEN.QTD END) ANT1
                ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-02,GETDATE()), 112) THEN VEN.QTD END) ANT2
                ,	SUM(CASE WHEN VEN.ANOMES = CONVERT(VARCHAR(6),DATEADD(mm,-03,GETDATE()), 112) THEN VEN.QTD END) ANT3
                ,	SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())-1) + '-01-01')
                  AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())-1) + SUBSTRING(CONVERT(VARCHAR,CONVERT(DATE, GETDATE())),5,6)) THEN
                      VEN.QTD
                    ELSE
                      0
                    END) ANOANT
                ,	SUM(CASE WHEN VEN.DTEMISSAO BETWEEN CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + '-01-01')
                  AND CONVERT(DATE, CONVERT(VARCHAR, YEAR(GETDATE())) + SUBSTRING(CONVERT(VARCHAR,CONVERT(DATE, GETDATE())),5,6)) THEN
                      VEN.QTD
                    ELSE
                      0
                    END) ANOATU

                FROM AD_VVENDAS12 VEN
                LEFT JOIN TGFPRO PRO (NOLOCK) ON CONVERT(VARCHAR, PRO.CODPROD) = '1'+VEN.CODPROD
                LEFT JOIN TGFGRU GRU (NOLOCK) ON GRU.CODGRUPOPROD = PRO.CODGRUPOPROD
                LEFT JOIN TGFPAR PAR (NOLOCK) ON PAR.CGC_CPF = VEN.CGC_CPF AND PAR.CLIENTE = 'S'
                LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = PAR.CODVEND
                WHERE SUBSTRING(VEN.ANOMES,1,4) >= YEAR(GETDATE())-1
                AND PAR.CODVEND = ${codVen} 
                AND GRU.ATIVO = 'S'
                GROUP BY GRU.CODGRUPOPROD, GRU.DESCRGRUPOPROD, PRO.CODVOL

                ) QRY
                WHERE CASE	WHEN QRY.ANOANT = 0 AND QRY.ANOATU > 0 THEN 1
                  WHEN QRY.ANOANT = 0 AND QRY.ANOATU = 0 THEN 0
                  ELSE (QRY.ANOATU/QRY.ANOANT)-1 END >= 0
                ORDER BY CRESC, ANOANT DESC;`;
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
    const codVen = usuario.username;
    const sql = `SELECT CAB.CODVEND, VEN.APELIDO, CAB.CODPARC, PAR.RAZAOSOCIAL, UFS.UF, CID.NOMECID, 
                    CAB.CODEMP, ITE.NUNOTA, CAB.DTNEG, CAB.DTENTSAI, 
                    DATEDIFF(DAY, CAB.DTENTSAI, GETDATE()) AS ATRASO,
                    SUM(ITE.QTDNEG) AS QTDNEG, 
                    SUM(ITE.QTDNEG - ITE.QTDENTREGUE) AS QTDSLD, 
                    ROUND(SUM((ITE.QTDNEG - ITE.QTDENTREGUE) * PRO.PESOLIQ), 2) AS PESO, 
                    CASE WHEN TOP1.ATUALFIN = 1 THEN ROUND(SUM((ITE.QTDNEG - ITE.QTDENTREGUE) * ITE.VLRUNIT), 2) ELSE 0 END AS VLRPED, 
                    CASE WHEN TOP1.ATUALFIN = 1 THEN 0 ELSE ROUND(SUM((ITE.QTDNEG - ITE.QTDENTREGUE) * ITE.VLRUNIT), 2) END AS VLRBON, 
                    CASE WHEN CAB.CODTIPOPER = 3000 THEN 'NAO' ELSE 'SIM' END AS LIBCOM, 
                    CASE WHEN LIBE.VLRLIBERADO IS NULL OR LIBE.VLRLIBERADO < LIBE.VLRATUAL THEN 'NAO' ELSE 'SIM' END AS LIBEST, 
                    CASE WHEN LIBF.VLRLIBERADO IS NULL OR LIBF.VLRLIBERADO < LIBF.VLRATUAL THEN 'NAO' ELSE 'SIM' END AS LIBFIN 
                FROM TGFITE ITE (NOLOCK) 
                JOIN TGFCAB CAB (NOLOCK) ON CAB.NUNOTA = ITE.NUNOTA 
                JOIN TGFVEN VEN (NOLOCK) ON VEN.CODVEND = CAB.CODVEND 
                JOIN TGFPAR PAR (NOLOCK) ON PAR.CODPARC = CAB.CODPARC 
                JOIN TSICID CID (NOLOCK) ON CID.CODCID = PAR.CODCID 
                JOIN TSIUFS UFS (NOLOCK) ON UFS.CODUF = CID.UF 
                JOIN TGFPRO PRO (NOLOCK) ON PRO.CODPROD = ITE.CODPROD 
                JOIN TGFTOP TOP1 (NOLOCK) ON TOP1.CODTIPOPER = CAB.CODTIPOPER AND CAB.DHTIPOPER = TOP1.DHALTER 
                LEFT JOIN TSILIB LIBE (NOLOCK) ON LIBE.TABELA = 'TGFCAB' AND LIBE.NUCHAVE = CAB.NUNOTA AND LIBE.EVENTO = 44 
                LEFT JOIN TSILIB LIBF (NOLOCK) ON LIBF.TABELA = 'TGFCAB' AND LIBF.NUCHAVE = CAB.NUNOTA AND LIBF.EVENTO = 63 
                WHERE CAB.TIPMOV = 'P' AND CAB.CODTIPOPER BETWEEN 3000 AND 3999 
                    AND CAB.CODPARC NOT IN (471, 512, 1293) 
                    AND CAB.DTENTSAI >= '2018-01-01' 
                    AND CAB.CODVEND = ${codVen} 
                    AND SUBSTRING(CONVERT(VARCHAR, ITE.CODPROD), 2, 2) = '20' 
                    AND ITE.PENDENTE = 'S' 
                GROUP BY CAB.CODVEND, VEN.APELIDO, CAB.CODPARC, PAR.RAZAOSOCIAL, UFS.UF, CID.NOMECID, CAB.CODEMP, ITE.NUNOTA, CAB.DTNEG, CAB.DTENTSAI, CAB.CODTIPOPER, TOP1.ATUALFIN, LIBE.VLRLIBERADO, LIBE.VLRATUAL, LIBF.VLRLIBERADO, LIBF.VLRATUAL 
                ORDER BY VEN.APELIDO, CAB.DTNEG;`;
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
      })
      .catch((error) => {
        console.log('erro recebimento', error);
      });
  }

  //=========================================================================================

  useEffect(() => {
    atualizaCartaoHome();
    if (valorTotalAno <= 0) {
      if (usuario.grupoId == 2) {
        LoginSankhyaDashRepresentante();
        MetaXRealizado();
      } else if (usuario.grupoId == 5) {
      } else {
        LoginSankhyaDashAdmin();
      }
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    if (valorMes1 > 0) {
      setLoading(false);
    } else {
      setTimeout(function () {
        setLoading(false);
      }, 3000);
    }
  }, [valorMes1]);

  metaMesDObserver.subscribe((metaValue: any) => {
    console.log('meta mudou para..................................');
    setTimeout(function () {}, 6000);
  });

  function Sucess() {
    setTimeout(function () {
      setSucess(20);
      sucess = 20;
      Sucess2();
    }, 1200);
  }
  function Sucess2() {
    setTimeout(function () {
      setSucess(40);
      sucess = 40;
      Sucess3();
    }, 1000);
  }
  function Sucess3() {
    setTimeout(function () {
      setSucess(100);
      sucess = 100;
      Sucess();
    }, 1000);
  }
  //======dados do sankhya  ===================================
  function iniciarRecebimentoGlobal(origem: string): boolean {
    try {
      if (localStorage.getItem('RecebendoDados') === 'true') return false;
      localStorage.setItem('RecebendoDados', 'true');
      localStorage.setItem('RecebendoDadosSource', origem);
      localStorage.setItem('RecebendoDadosStartedAt', String(Date.now()));
      return true;
    } catch {
      return true;
    }
  }

  function finalizarRecebimentoGlobal() {
    try {
      localStorage.removeItem('RecebendoDados');
      localStorage.removeItem('RecebendoDadosSource');
      localStorage.removeItem('RecebendoDadosStartedAt');
    } catch {}
  }

  async function receberDadosSankhya() {
    const iniciou = iniciarRecebimentoGlobal('AreaColaborador');
    if (!iniciou) {
      return;
    }
    setErroSankhya(false);
    erroSankhya = false;
    setAlertErroSankhyaBD(false);
    setTabelasComErroSankhya([]);
    setDadosRecebidos(false);
    dadosRecebidos = false;
    setSucess(0);
    sucess = 0;
    Sucess();

    setShowMensageSankhya(true);
    setrespostaSank('Atualizando dados (lote)...');
    respostaSank = 'Atualizando dados (lote)...';

    try {
      const response = await api.post(
        `/api/Sankhya/ReceberDadosLote?vendedorId=${usuario.username}`
      );
      const data = (response as any)?.data;
      const resultados = Array.isArray(data?.resultados) ? data.resultados : [];
      const teveErro = resultados.some((r: any) => r && r.sucesso === false);
      const tabelasErro = Array.from(
        new Set(
          resultados
            .filter((r: any) => r && r.sucesso === false)
            .map((r: any) =>
              String(r?.tabela ?? r?.nomeTabela ?? r?.nome ?? r?.tag ?? '')
                .trim()
                .replace(/^#/, '')
            )
            .filter((t: string) => t.length > 0)
        )
      );
      setTabelasComErroSankhya(tabelasErro);
      if (teveErro) {
        setErroSankhya(true);
        erroSankhya = true;
        setAlertErroSankhyaBD(true);
        setTabelarro('Erro ao receber dados (lote)');
      }
      setSucess(100);
      sucess = 100;
      setrespostaSank('Dados Recebidos!');
      respostaSank = 'Dados Recebidos!';
      setDadosRecebidos(true);
      dadosRecebidos = true;
      try {
        const isoNow = new Date().toISOString();
        localStorage.setItem('@Portal/RecebimentoLocal/ultimoSucessoEm', isoNow);
        localStorage.setItem(
          '@Portal/RecebimentoLocal/tabelasComErro',
          JSON.stringify(tabelasErro)
        );
        const texto = formatarDataHoraSP(isoNow);
        if (texto) setDadosAtualizadosEm(texto);
      } catch {}
      try {
        await carregarStatusUltimoRecebimento();
      } catch {}
      if (erroSankhya == false) {
        setShowMensageSankhya(false);
      }
    } catch (error) {
      console.log(error);
      setAlertErroSankhya(true);
      setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
      setSucess(0);
      sucess = 0;
    } finally {
      finalizarRecebimentoGlobal();
    }
  }
  //==============================================================
  async function receberDadosSankhyaTipoNegociacao() {
    setSucess(0);
    sucess = 0;
    Sucess();

    setrespostaSank('Atualizando TipoNegociacao...');
    respostaSank = 'Atualizando TipoNegociacao...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TipoNegociacao&vendedorId=${usuario.username}`
      )
      .then(async (response) => {
        console.log(response.data);

        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD2(true);
          const mensagem2 = response.data;
          setMsgErroSankhya2(mensagem2.substring(0, 900));
          setTabelarro2('Erro ao receber dados para a tabela TipoNegociacao');
        }

        receberDadosSankhyaParceiro();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }
  async function SalvarNaturezaPadraoTipoNegociacao(codVend: string | number) {
    const sql = `SELECT 
         CPL.SUGTIPNEGSAID AS Id, 
         RTRIM(LTRIM(TPV.DESCRTIPVENDA)) AS Descricao, 
         TPV.DHALTER AS AtualizadoEm, 
         CAST(NAT.CODNAT AS VARCHAR) + ' - ' + NAT.DESCRNAT AS NaturezaPadrao 
       FROM TGFCPL CPL 
       LEFT JOIN ( 
         SELECT 
           CODTIPVENDA, 
           DESCRTIPVENDA, 
           MAX(DHALTER) AS DHALTER 
         FROM TGFTPV 
         GROUP BY CODTIPVENDA, DESCRTIPVENDA 
       ) TPV ON TPV.CODTIPVENDA = CPL.SUGTIPNEGSAID 
       JOIN TGFPAR PAR ON PAR.CODPARC = CPL.CODPARC 
       LEFT JOIN TGFPPG PPG ON PPG.CODTIPVENDA = TPV.CODTIPVENDA 
       LEFT JOIN TGFNAT NAT ON NAT.CODNAT = PPG.CODNATPAD 
       WHERE PAR.CODVEND = ${codVend} 
         AND PAR.ATIVO = 'S' 
         AND PAR.CLIENTE = 'S'
         AND NAT.CODNAT = 110102 
       GROUP BY 
         CPL.SUGTIPNEGSAID, 
         RTRIM(LTRIM(TPV.DESCRTIPVENDA)), 
         TPV.DHALTER, 
         NAT.CODNAT, 
         NAT.DESCRNAT`;
    const sqlEncoded = encodeURIComponent(sql);
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${sqlEncoded}`)
      .then((response) => {
        const rows = response?.data?.responseBody?.rows || [];
        const data = Array.isArray(rows)
          ? rows.map((r: any) => ({
              id: Array.isArray(r) ? r[0] : r?.Id ?? r?.ID ?? r?.id,
              descricao: Array.isArray(r) ? r[1] : r?.Descricao ?? '',
              atualizadoEm: Array.isArray(r) ? r[2] : r?.AtualizadoEm ?? '',
              NaturezaPadrao:
                Array.isArray(r) ? r[3] : r?.NaturezaPadrao ?? null,
            }))
          : [];
        try {
          localStorage.setItem(
            '@Portal/tipoNegociacaoNaturezaPadrao',
            JSON.stringify(data)
          );
        } catch {}
      })
      .catch(() => {});
  }
  async function receberDadosSankhyaParceiro() {
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando Parceiro...#NavBar');
    respostaSank = 'Atualizando Parceiro...#NavBar';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=Parceiro&vendedorId=${usuario.username}`
      )
      .then((response) => {
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD3(true);
          const mensagem3 = response.data;
          setMsgErroSankhya3(mensagem3.substring(0, 900));
          setTabelarro3('Erro ao receber dados para a tabela Parceiro');
        }

        receberDadosSankhyaGrupoProd();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }

  async function receberDadosSankhyaGrupoProd() {
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando GrupoProduto...');
    respostaSank = 'Atualizando GrupoProduto...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=GrupoProduto&vendedorId=${usuario.username}`
      )
      .then((response) => {
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD4(true);
          const mensagem4 = response.data;
          setMsgErroSankhya4(mensagem4.substring(0, 900));
          setTabelarro4('Erro ao receber dados para a tabela GrupoProduto');
        }

        receberDadosSankhyaProduto();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }

  async function receberDadosSankhyaProduto() {
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando Produto...');
    respostaSank = 'Atualizando Produto...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=Produto&vendedorId=${usuario.username}`
      )
      .then((response) => {
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD5(true);
          const mensagem5 = response.data;
          setMsgErroSankhya5(mensagem5.substring(0, 900));
          setTabelarro5('Erro ao receber dados para a tabela Produto');
        }

        receberDadosSankhyaTabelaPreco();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }

  async function receberDadosSankhyaTabelaPreco() {
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando TabelaPreco...');
    respostaSank = 'Atualizando TabelaPreco...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TabelaPreco&vendedorId=${usuario.username}`
      )
      .then((response) => {
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD6(true);
          const mensagem6 = response.data;
          setMsgErroSankhya6(mensagem6.substring(0, 900));
          setTabelarro6('Erro ao receber dados para a tabela TabelaPreco');
        }

        receberDadosSankhyaItemTabela();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }

  async function receberDadosSankhyaItemTabela() {
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando ItemTabela...');
    respostaSank = 'Atualizando ItemTabela...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=ItemTabela&vendedorId=${usuario.username}`
      )
      .then((response) => {
        console.log(response.data);
        console.log('resposta', response);
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD7(true);
          const mensagem7 = response.data;
          setMsgErroSankhya7(mensagem7.substring(0, 900));
          setTabelarro7('Erro ao receber dados para a tabela ItemTabela');
        }
        receberDadosSankhyaTabelaPrecoParceiro();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }

  async function receberDadosSankhyaTabelaPrecoParceiro() {
    console.log('codigo do vendedor', usuario.username);
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando TabelaPrecoParceiro...');
    respostaSank = 'Atualizando TabelaPrecoParceiro...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TabelaPrecoParceiro&vendedorId=${usuario.username}`
      )
      .then((response) => {
        console.log('Tabela de Preço Parceiros');
        console.log(response.data);

        console.log('resposta', response);
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD8(true);
          const mensagem8 = response.data;
          setMsgErroSankhya8(mensagem8.substring(0, 900));
          setTabelarro8(
            'Erro ao receber dados para a tabela TabelaPrecoParceiro'
          );
        }
        receberDadosSankhyaTitulo();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }

  async function receberDadosSankhyaTitulo() {
    console.log('codigo do vendedor', usuario.username);
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando Titulo...');
    respostaSank = 'Atualizando Titulo..';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=Titulo&vendedorId=${usuario.username}`
      )
      .then(async (response) => {
        console.log('Tabela Titulo');
        console.log(response.data);
        setSucess(100);
        sucess = 100;
        console.log('resposta', response);
        setrespostaSank('Dados Recebidos!');
        respostaSank = 'Dados Recebidos!';
        setDadosRecebidos(true);
        dadosRecebidos = true;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD9(true);
          const mensagem9 = response.data;
          setMsgErroSankhya9(mensagem9.substring(0, 900));
          setTabelarro9('Erro ao receber dados para a tabela Titulo');
        }
        try {
          const isoNow = new Date().toISOString();
          localStorage.setItem('@Portal/RecebimentoLocal/ultimoSucessoEm', isoNow);
          localStorage.setItem(
            '@Portal/RecebimentoLocal/tabelasComErro',
            JSON.stringify(erroSankhya ? tabelasComErroSankhya : [])
          );
          const texto = formatarDataHoraSP(isoNow);
          if (texto) setDadosAtualizadosEm(texto);
          if (!erroSankhya) setTabelasComErroSankhya([]);
        } catch {}
        try {
          await carregarStatusUltimoRecebimento();
        } catch {}
        if (erroSankhya == false) {
          setShowMensageSankhya(false);
        }
        finalizarRecebimentoGlobal();
      })
      .catch((error) => {
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
        setSucess(0);
        sucess = 0;
      });
  }

  async function AtualizarDados() {
    setLoading(true);
    setShowupdate(true);
    setSucess(0);
    sucess = 0;
    Sucess();
    setAlertErroMensage(true);
    setMsgErro('Atualizando dados...');
    await api
      .post('/api/RestaurarMenu')
      .then((response) => {
        GetMontarMenu();
      })
      .catch((error) => {});
  }

  async function GetMontarMenu() {
    localStorage.removeItem('@Portal/menuPrincipal');
    localStorage.removeItem('@Portal/usuario/atualiza-menu');
    await api

      .get(`/api/Menu?pagina=1&totalpagina=999`)
      .then((response) => {
        localStorage.setItem(
          '@Portal/menuPrincipal',
          JSON.stringify(response.data.data)
        );
        window.location.reload();

        console.log(response);

        setShowupdate(true);
        setAlertErroMensage(true);
        setMsgErro('Dados atualizados com sucesso!!!');
        console.log('menu', response.data.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //=============================================================================================

  useEffect(() => {
    if (valorTotalAno > 0) {
    } else {
      setTimeout(function () {}, 3000);
    }
  }, [valorTotalAno]);

  useEffect(() => {
    window.scrollTo(0, 0);
    logado();
    GetUsuarioByName();
  }, []);

  async function GetUsuarioByName() {
    try {
      const uniqueQueryParam = new Date().getTime();
      const response = await api.get(
        `/api/usuario/imagem/${usuario.username}?${uniqueQueryParam}`,
        { responseType: 'blob' }
      );
      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onload = () => setImageURL(reader.result as string);
      console.log('imagem', response.data.size);
      if (response.data.size == 0) {
        setnaotemImage(true);
      } else {
        setnaotemImage(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //===================================================================================

  async function Getgrupo() {
    await api

      .get(`/api/GrupoUsuario/${usuario.grupoId}`)
      .then((response) => {
        console.log('entrou');
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  function VerificarPermissao() {
    console.log('grupo usuario', usuario.grupoId);
    if (usuario.grupoId != 1) {
      const permitir =
        UsuarioPermissoes.some((item) => item.codigo === 32) ||
        GrupoPermissoes.some((item) => item.codigo === 32);
      console.log('permi', permitir);
      if (permitir) {
        setpermitido(true);
      } else {
        setpermitido(false);
      }
    } else {
      setpermitido(true);
    }
  }
  function logado() {
    if (!usuario.token) {
      history('/');
    }
  }

  useEffect(() => {}, []);

  async function GetgLog() {
    await api

      .get(`/api/Log`)
      .then((response) => {
        console.log(' logado com sucesso');
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log(' Sem autorização');
        }
      });
  }

  //==========================================================//
  return (
    <>
      <div className="">
        <SideNavBar />
      </div>
      <NavbarDashHeader />
      {usuario.grupoId == 1 ? <ChatBotinho /> : null}
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
          <div className="content-global-mobile">
            <div className="conteudo-cotainner-mobile" style={{ position: 'relative' }}>
              {isMobile && campanhaGeral.length > 0 ? (
                <>
                  <div className="testeds2">
                    {naotemImage ? (
                      <>
                        <img
                          style={{
                            width: 80,
                            height: 80,
                            position: 'absolute',
                          }}
                          id="fotoArea"
                          src={PhotoUser}
                          alt=""
                          className="imagem-user-name2"
                        />
                        <img
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                          }}
                          id="fotoArea2"
                          src={placeholderURL}
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <img
                          style={{
                            width: 80,
                            height: 80,
                            position: 'absolute',
                          }}
                          id="fotoArea"
                          src={imageURL}
                          alt=""
                          className="imagem-user-name2"
                        />
                        <img
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                          }}
                          id="fotoArea2"
                          src={placeholderURL}
                          alt=""
                        />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="espaco-mobile1"></div>
              <div
                className="titulo-page titulo-page4"
                style={{ position: 'relative' }}
              >
                {isMobile && campanhaGeral.length > 0 ? (
                  <>
                    <div className="dadosUsers">
                      <div>
                        <div className="textoUsuario">
                          <h1 className="">
                            Bem-vindo(a), {usuario.nomeCompleto} -{' '}
                            {usuario.username} -
                          </h1>
                          <h1 className="textFrontcod"> </h1>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1>HOME - PORTAL GRUPO ALYNE</h1>
                  </>
                )}
              </div>
              <div className="contain-mobile ">
                <div
                  className={
                    usuario.grupoId == 1 ||
                    usuario.grupoId == 2 ||
                    usuario.grupoId == 5 ||
                    usuario.grupoId == 6
                      ? 'conteudoColaborador'
                      : 'conteudoColaborador3'
                  }
                >
                  <div className="plano-fundo-usuario2" style={{ position: 'relative' }}>
                    {isMobile && campanhaGeral.length > 0 ? (
                      <></>
                    ) : (
                      <>
                        <div
                          className="testeds"
                          style={{ position: 'relative' }}
                        >
                          {naotemImage ? (
                            <>
                              <img
                                style={{
                                  width: 120,
                                  height: 120,
                                  position: 'absolute',
                                }}
                                id="fotoArea"
                                src={PhotoUser}
                                alt=""
                                className="imagem-user-name2"
                              />
                              <img
                                style={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: '50%',
                                }}
                                id="fotoArea2"
                                src={placeholderURL}
                                alt=""
                              />
                            </>
                          ) : (
                            <>
                              <img
                                style={{
                                  width: 120,
                                  height: 120,
                                  position: 'absolute',
                                }}
                                id="fotoArea"
                                src={imageURL}
                                alt=""
                                className="imagem-user-name2"
                              />
                              <img
                                style={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: '50%',
                                }}
                                id="fotoArea2"
                                src={placeholderURL}
                                alt=""
                              />
                            </>
                          )}
                        </div>
                        <h1 className="textFront">
                          Bem-vindo(a), {usuario.nomeCompleto}
                        </h1>
                        <h1 className="textFrontcod">
                          - {usuario.username} -{' '}
                        </h1>
                        {isMobile ? (
                          <>
                            <div className="espacamento"></div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                    {dadosAtualizadosEm ? (
                      <div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          bottom: isMobile ? 62 : 52,
                          color: '#fff',
                          fontSize: 13,
                          zIndex: 2,
                          textAlign: 'center',
                          pointerEvents: 'auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                          whiteSpace: 'nowrap',
                        }}
                        title={
                          tabelasComErroSankhya.length > 0
                            ? `Falha ao receber: ${tabelasComErroSankhya.join(', ')}`
                            : ''
                        }
                      >
                        Dados atualizados em: {dadosAtualizadosEm}{' '}
                        {tabelasComErroSankhya.length > 0 ? (
                          <span
                            style={{
                              marginLeft: 8,
                              display: 'inline-block',
                              fontSize: 16,
                              lineHeight: 1,
                              verticalAlign: 'middle',
                            }}
                          >
                            ⚠
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    <div className="blocosDashHome">
                      <div className="bloco2Dash">
                        {(valorMes1 >= 0 && usuario.grupoId == 1) ||
                        usuario.grupoId == 2 ||
                        usuario.grupoId == 5 ||
                        usuario.grupoId == 6 ? (
                          <>
                            {usuario.grupoId == 1 ||
                            usuario.grupoId == 2 ||
                            usuario.grupoId == 6 ? (
                              <>
                                <div className="div-faturamento-meta-vendas">
                                  <div className="tarja-valor-meta">
                                    <h1>VALOR MENSAL X META</h1>
                                  </div>
                                  <div className="totFlexGrafic">
                                    <div className="graficoTotalMes">
                                      <div className="cardGrafic">
                                        <div className="barraTotalMes">
                                          <div
                                            style={
                                              valorMes1 > metaMes1
                                                ? { width: '100%' }
                                                : {
                                                    width: `${(
                                                      (valorMes1 / metaMes1) *
                                                      100
                                                    ).toFixed(0)}%`,
                                                  }
                                            }
                                            className="barraParcialMes"
                                          />
                                        </div>
                                        <h1 style={{ marginTop: 5 }}>
                                          Valor Mensal:
                                        </h1>
                                        <h1>R$ {moeda(valorMes1)}</h1>
                                      </div>
                                      <div className="cardGrafic">
                                        <div className="barraTotalMes">
                                          <div
                                            style={
                                              valorMes1 < metaMes1
                                                ? { width: '100%' }
                                                : {
                                                    width: `${(
                                                      (metaMes1 / valorMes1) *
                                                      100
                                                    ).toFixed(0)}%`,
                                                  }
                                            }
                                            className="barraParcialMesAnt"
                                          />
                                        </div>
                                        <h1 style={{ marginTop: 5 }}>
                                          Meta do Mes:
                                        </h1>
                                        <h1>
                                          {' '}
                                          {metaMes1 == null || metaMes1 == 0
                                            ? 'Meta ainda não definida'
                                            : `R$ ${moeda(metaMes1)}`}
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="cardGrafiPorcento">
                                      <Circle
                                        percent={
                                          Number(
                                            (
                                              (valorMes1 / metaMes1) *
                                              100
                                            ).toFixed(2)
                                          ) > 100
                                            ? 100
                                            : Number(
                                                (
                                                  (valorMes1 / metaMes1) *
                                                  100
                                                ).toFixed(2)
                                              )
                                        }
                                        strokeColor="#00588b"
                                        strokeWidth={8}
                                        trailColor="#878787"
                                        trailWidth={8}
                                      />
                                      <h1 className="textporcent">
                                        {valorMes1 && metaMes1
                                          ? (
                                              (valorMes1 / metaMes1) *
                                              100
                                            ).toFixed(2)
                                          : 0}
                                        %
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                                <div className="div-faturamento-meta-vendas">
                                  <div className="tarja-valor-meta">
                                    <h1>VALOR MENSAL X MÊS ANO ANTERIOR</h1>
                                  </div>
                                  <div className="d-flex">
                                    <div className="cardMeta">
                                      <h1>Valor Mes Atual</h1>
                                      <h1
                                        style={
                                          valorMes1 > valorAnterio1
                                            ? { color: '#00588b' }
                                            : { color: 'red' }
                                        }
                                      >
                                        R${' '}
                                        {valorMes1 == null
                                          ? '0,00'
                                          : moeda(valorMes1)}
                                      </h1>
                                    </div>
                                    <div className="cardMeta">
                                      <h1>Mes Ano Anterior</h1>
                                      <h1>
                                        R${' '}
                                        {valorAnterio1 == null ||
                                        valorAnterio1 == 0
                                          ? '0,00'
                                          : moeda(valorAnterio1)}
                                      </h1>
                                    </div>
                                  </div>
                                  <h1
                                    style={
                                      valorMes1 > valorAnterio1
                                        ? { color: '#00588b' }
                                        : { color: 'red' }
                                    }
                                  >
                                    {' '}
                                    {valorMes1 &&
                                      valorAnterio1 &&
                                      `${(
                                        (Number(valorMes1.toFixed(2)) /
                                          Number(valorAnterio1.toFixed(2))) *
                                        100
                                      ).toFixed(2)}`}
                                    % do valor do mesmo mes no ano anterior
                                  </h1>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {usuario.grupoId == 5 ? (
                              <>
                                <div className="div-faturamento-meta-vendas">
                                  <div className="tarja-valor-meta">
                                    <h1>VALOR MENSAL X META</h1>
                                  </div>
                                  <div className="totFlexGrafic">
                                    <div className="graficoTotalMes">
                                      <div className="cardGrafic">
                                        <div className="barraTotalMes">
                                          <div
                                            style={
                                              valorMes1 > metaMes1
                                                ? { width: '100%' }
                                                : {
                                                    width: `${(
                                                      (valorMes1 / metaMes1) *
                                                      100
                                                    ).toFixed(0)}%`,
                                                  }
                                            }
                                            className="barraParcialMes"
                                          />
                                        </div>
                                        <h1 style={{ marginTop: 5 }}>
                                          Valor Mes Atual:
                                        </h1>
                                        <h1>R$ {moeda(valorMes1)}</h1>
                                      </div>
                                      <div className="cardGrafic">
                                        <div className="barraTotalMes">
                                          <div
                                            style={
                                              valorMes1 < metaMes1
                                                ? { width: '100%' }
                                                : {
                                                    width: `${(
                                                      (metaMes1 / valorMes1) *
                                                      100
                                                    ).toFixed(0)}%`,
                                                  }
                                            }
                                            className="barraParcialMesAnt"
                                          />
                                        </div>
                                        <h1 style={{ marginTop: 5 }}>
                                          Meta do Mes:
                                        </h1>
                                        <h1>
                                          {' '}
                                          {metaMes1 == null || metaMes1 == 0
                                            ? 'Meta ainda não definida'
                                            : `R$ ${moeda(metaMes1)}`}
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="cardGrafiPorcento">
                                      <Circle
                                        percent={
                                          Number(
                                            (
                                              (valorMes1 / metaMes1) *
                                              100
                                            ).toFixed(2)
                                          ) > 100
                                            ? 100
                                            : Number(
                                                (
                                                  (valorMes1 / metaMes1) *
                                                  100
                                                ).toFixed(2)
                                              )
                                        }
                                        strokeColor="#00588b"
                                        strokeWidth={8}
                                        trailColor="#878787"
                                        trailWidth={8}
                                      />
                                      <h1 className="textporcent">
                                        {valorMes1 && metaMes1
                                          ? (
                                              (valorMes1 / metaMes1) *
                                              100
                                            ).toFixed(2)
                                          : 0}
                                        %
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                                <div className="div-faturamento-meta-vendas">
                                  <div className="tarja-valor-meta">
                                    <h1>VALOR MENSAL X MÊS ANO ANTERIOR</h1>
                                  </div>
                                  <div className="d-flex">
                                    <div className="cardMeta">
                                      <h1>Valor Mes Atual</h1>
                                      <h1
                                        style={
                                          valorMes1 > valorAnterio1
                                            ? { color: '#00588b' }
                                            : { color: 'red' }
                                        }
                                      >
                                        R${' '}
                                        {valorMes1 == null
                                          ? '0,00'
                                          : moeda(valorMes1)}
                                      </h1>
                                    </div>
                                    <div className="cardMeta">
                                      <h1>Valor Mes Ano Anterior</h1>
                                      <h1>
                                        R${' '}
                                        {valorAnterio1 == null ||
                                        valorAnterio1 == 0
                                          ? '0,00'
                                          : moeda(valorAnterio1)}
                                      </h1>
                                    </div>
                                  </div>
                                  <h1
                                    style={
                                      valorMes1 > valorAnterio1
                                        ? { color: '#00588b' }
                                        : { color: 'red' }
                                    }
                                  >
                                    {' '}
                                    {valorMes1 &&
                                      valorAnterio1 &&
                                      `${(
                                        (Number(valorMes1.toFixed(2)) /
                                          Number(valorAnterio1.toFixed(2))) *
                                        100
                                      ).toFixed(2)}`}
                                    % do valor do mesmo mes no ano anterior
                                  </h1>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="espaco-mobile3"></div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      {campanhaGeral.length > 0 ? (
                        <>
                          <div className="bloco2Dash">
                            {usuario.grupoId == 2 ? (
                              <>
                                <div className="div-faturamento-meta-vendas1">
                                <div className="tarja-valor-meta">
                                    <span className="titleCamp">- ACOMPANHAMENTO DE CAMPANHA -</span>
                                  </div>
                                  <div className="tarja-valor-meta">
                                    <h1>CAMPANHA: {campanhaGeral[0]?.Campanha}</h1>
                                  </div>
                                  <div className="">
                                    <div className="cardIntCamp">
                                      <div className="targ2">
                                        <h1 className="titulo">MES Á MES</h1>
                                      </div>
                                      {campanhaMes.length > 0 ? (
                                        <>
                                          {campanhaMes?.map((camp) => (
                                            <div className="barraDados">
                                              <div className="barrainf"></div>
                                              <div
                                                style={{ textAlign: 'center' }}
                                              >
                                                <h1 className="tit">Mes</h1>
                                                <h1>
                                                  {camp?.Mes == 1
                                                    ? 'Jan'
                                                    : camp?.Mes == 2
                                                    ? 'Fev'
                                                    : camp?.Mes == 3
                                                    ? 'Mar'
                                                    : camp?.Mes == 4
                                                    ? 'Abr'
                                                    : camp?.Mes == 5
                                                    ? 'Mai'
                                                    : camp?.Mes == 6
                                                    ? 'Jun'
                                                    : camp?.Mes == 7
                                                    ? 'Jul'
                                                    : camp?.Mes == 8
                                                    ? 'Ago'
                                                    : camp?.Mes == 9
                                                    ? 'Set'
                                                    : camp?.Mes == 10
                                                    ? 'Out'
                                                    : camp?.Mes == 11
                                                    ? 'Nov'
                                                    : 'Dez'}
                                                </h1>
                                              </div>
                                              <div
                                                style={{ textAlign: 'right' }}
                                              >
                                                <h1 className="tit">Meta</h1>
                                                <h1>R$ {moeda(camp?.Meta)}</h1>
                                              </div>
                                              <div
                                                style={{ textAlign: 'right' }}
                                              >
                                                <h1 className="tit">Valor</h1>
                                                <h1>R$ {moeda(camp.Valor)}</h1>
                                              </div>
                                              <div
                                                style={{ textAlign: 'right' }}
                                              >
                                                <h1 className="tit">
                                                  Percent.
                                                </h1>
                                                <h1
                                                  style={{ color: camp?.Color }}
                                                >
                                                  {camp?.Mes &&
                                                    camp?.Valor &&
                                                    `${(
                                                      (Number(
                                                        camp?.Valor.toFixed(2)
                                                      ) /
                                                        Number(
                                                          camp?.Meta.toFixed(2)
                                                        )) *
                                                      100
                                                    ).toFixed(2)} %`}
                                                </h1>
                                              </div>
                                            </div>
                                          ))}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="cardIntCamp">
                                      <div className="targ2">
                                        <h1 className="titulo">
                                          VALORES POR CAMPANHA
                                        </h1>
                                      </div>
                                      <div className="totFlexGrafic">
                                        <div className="graficoTotalMes2">
                                          <div className="d-flex">
                                            <div className="cardGrafic">
                                              <h1>Valor Geral:</h1>
                                              <h1
                                                style={
                                                  campanhaGeral[0]?.Valor <
                                                  campanhaGeral[0]?.Meta
                                                    ? { color: 'red' }
                                                    : { color: '#008b27' }
                                                }
                                              >
                                                R${' '}
                                                {moeda(campanhaGeral[0]?.Valor)}
                                              </h1>
                                            </div>
                                            <div className="cardGrafic">
                                              <h1>
                                                Meta Geral:{' '}
                                                {campanhaGeral[0]?.Meta ==
                                                  null ||
                                                campanhaGeral[0]?.Meta == 0
                                                  ? 'Meta ainda não definida'
                                                  : `R$ ${moeda(
                                                      campanhaGeral[0]?.Meta
                                                    )}`}
                                              </h1>
                                            </div>
                                          </div>
                                          <Link
                                            to={'/acompanhamento-de-campanhas'}
                                            className="btn btn-dark btVisuCamp"
                                          >
                                            <span>Visualizar Campanhas</span>
                                          </Link>
                                        </div>
                                        <div className="cardGrafiPorcento2">
                                          <Circle
                                            percent={
                                              Number(
                                                (
                                                  (campanhaGeral[0]?.Valor /
                                                    campanhaGeral[0]?.Meta) *
                                                  100
                                                ).toFixed(2)
                                              ) > 100
                                                ? 100
                                                : Number(
                                                    (
                                                      (campanhaGeral[0]?.Valor /
                                                        campanhaGeral[0]
                                                          ?.Meta) *
                                                      100
                                                    ).toFixed(2)
                                                  )
                                            }
                                            strokeColor={
                                              campanhaGeral[0]?.Valor <
                                              campanhaGeral[0]?.Meta
                                                ? '#c80606'
                                                : '#008b27'
                                            }
                                            strokeWidth={8}
                                            trailColor="#878787"
                                            trailWidth={8}
                                          />
                                          <h1 className="textporcent">
                                            {campanhaGeral[0]?.Valor &&
                                            campanhaGeral[0]?.Meta
                                              ? (
                                                  (campanhaGeral[0]?.Valor /
                                                    campanhaGeral[0]?.Meta) *
                                                  100
                                                ).toFixed(2)
                                              : 0}
                                            %
                                          </h1>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="espacoGer"></div>
                              </>
                            ) : (
                              <>
                                <div className="div-faturamento-meta-vendas1">
                                  <div className="tarja-valor-meta">
                                    <h1>{campanhaMesCoord[0]?.Campanha}</h1>
                                  </div>
                                  <div className="">
                                    <div className="cardIntCamp">
                                      <div className="targ2">
                                        <h1 className="titulo">MES Á MES</h1>
                                      </div>
                                      {campanhaMesCoord.length > 0 ? (
                                        <>
                                          {campanhaMesCoord?.map((camp) => (
                                            <div className="barraDados">
                                              <div className="barrainf"></div>
                                              <div
                                                style={{ textAlign: 'center' }}
                                              >
                                                <h1 className="tit">Mes</h1>
                                                <h1>{camp?.Mes}</h1>
                                              </div>
                                              <div
                                                style={{ textAlign: 'right' }}
                                              >
                                                <h1 className="tit">Meta</h1>
                                                <h1>R$ {moeda(camp?.Meta)}</h1>
                                              </div>
                                              <div
                                                style={{ textAlign: 'right' }}
                                              >
                                                <h1 className="tit">Valor</h1>
                                                <h1>R$ {moeda(camp.Valor)}</h1>
                                              </div>
                                              <div
                                                style={{ textAlign: 'right' }}
                                              >
                                                <h1 className="tit">
                                                  Percent.
                                                </h1>
                                                <h1
                                                  style={
                                                    camp.Valor < camp.Meta
                                                      ? { color: 'red' }
                                                      : {}
                                                  }
                                                >
                                                  {camp?.Mes &&
                                                    camp?.Valor &&
                                                    `${(
                                                      (Number(
                                                        camp?.Valor.toFixed(2)
                                                      ) /
                                                        Number(
                                                          camp?.Meta.toFixed(2)
                                                        )) *
                                                      100
                                                    ).toFixed(2)} %`}
                                                </h1>
                                              </div>
                                            </div>
                                          ))}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="cardIntCamp">
                                      <div className="targ2">
                                        <h1 className="titulo">
                                          VALORES POR CAMPANHA
                                        </h1>
                                      </div>
                                      <div className="totFlexGrafic">
                                        <div className="graficoTotalMes2">
                                          <div className="d-flex">
                                            <div className="cardGrafic">
                                              <h1>Valor Geral:</h1>
                                              <h1
                                                style={
                                                  campanhaGeral[0]?.Valor <
                                                  campanhaGeral[0]?.Meta
                                                    ? { color: 'red' }
                                                    : { color: '#008b27' }
                                                }
                                              >
                                                R${' '}
                                                {moeda(campanhaGeral[0]?.Valor)}
                                              </h1>
                                            </div>
                                            <div className="cardGrafic">
                                              <h1>
                                                Meta Geral:{' '}
                                                {campanhaGeral[0]?.Meta ==
                                                  null ||
                                                campanhaGeral[0]?.Meta == 0
                                                  ? 'Meta ainda não definida'
                                                  : `R$ ${moeda(
                                                      campanhaGeral[0]?.Meta
                                                    )}`}
                                              </h1>
                                            </div>
                                          </div>
                                          <Link
                                            to={'/acompanhamento-de-campanhas'}
                                            className="btn btn-dark btVisuCamp"
                                          >
                                            <span>Visualizar Campanhas</span>
                                          </Link>
                                        </div>
                                        <div className="cardGrafiPorcento2">
                                          <Circle
                                            percent={
                                              Number(
                                                (
                                                  (campanhaGeral[0]?.Valor /
                                                    campanhaGeral[0]?.Meta) *
                                                  100
                                                ).toFixed(2)
                                              ) > 100
                                                ? 100
                                                : Number(
                                                    (
                                                      (campanhaGeral[0]?.Valor /
                                                        campanhaGeral[0]
                                                          ?.Meta) *
                                                      100
                                                    ).toFixed(2)
                                                  )
                                            }
                                            strokeColor={
                                              campanhaGeral[0]?.Valor <
                                              campanhaGeral[0]?.Meta
                                                ? '#c80606'
                                                : '#008b27'
                                            }
                                            strokeWidth={8}
                                            trailColor="#878787"
                                            trailWidth={8}
                                          />
                                          <h1 className="textporcent">
                                            {campanhaGeral[0]?.Valor &&
                                            campanhaGeral[0]?.Meta
                                              ? (
                                                  (campanhaGeral[0]?.Valor /
                                                    campanhaGeral[0]?.Meta) *
                                                  100
                                                ).toFixed(2)
                                              : 0}
                                            %
                                          </h1>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="espacoGer"></div>
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* =====================modal sankhya========================================================== */}
            <Modal
              className="modal-confirm"
              show={showMensageSankhya}
              onHide={handleCloseMensageSankhya}
              backdrop="static"
            >
              <Modal.Body>
                <div className="div-sankhya">
                  <img id="logoSankhya" src={logoSankhya} alt="" />
                  {alertErroSankhya ? (
                    <>
                      {alertErroSankhya && (
                        <div className="mt-3 mb-0">
                          <Alert
                            msg={msgErro}
                            setAlertErro={setAlertErroSankhya}
                          />
                        </div>
                      )}
                      <button
                        style={{ width: 130, marginTop: 15 }}
                        className="btn btn-primary"
                        onClick={handleCloseMensageSankhya}
                      >
                        Ok
                      </button>
                    </>
                  ) : (
                    <>
                      <h1>{respostaSank}</h1>
                      {dadosRecebidos ? (
                        <></>
                      ) : (
                        <>
                          <ProgressBar
                            className="progress"
                            animated
                            now={sucess}
                          />
                        </>
                      )}
                    </>
                  )}
                  {erroSankhya ? (
                    <>
                      {alertErroSankhyaBD && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro}
                          </h2>
                          <Alert
                            msg={msgErroSakhya}
                            setAlertErro={setAlertErroSankhyaBD}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD2 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro2}
                          </h2>
                          <Alert
                            msg={msgErroSakhya2}
                            setAlertErro={setAlertErroSankhyaBD2}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD3 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro3}
                          </h2>
                          <Alert
                            msg={msgErroSakhya3}
                            setAlertErro={setAlertErroSankhyaBD3}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD4 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro4}
                          </h2>
                          <Alert
                            msg={msgErroSakhya4}
                            setAlertErro={setAlertErroSankhyaBD4}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD5 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro5}
                          </h2>
                          <Alert
                            msg={msgErroSakhya5}
                            setAlertErro={setAlertErroSankhyaBD5}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD6 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro6}
                          </h2>
                          <Alert
                            msg={msgErroSakhya6}
                            setAlertErro={setAlertErroSankhyaBD6}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD7 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro7}
                          </h2>
                          <Alert
                            msg={msgErroSakhya7}
                            setAlertErro={setAlertErroSankhyaBD7}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD8 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro8}
                          </h2>
                          <Alert
                            msg={msgErroSakhya8}
                            setAlertErro={setAlertErroSankhyaBD8}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      {alertErroSankhyaBD9 && (
                        <div className="mt-3 mb-0 respostaErroSankhya">
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            {tabelarro9}
                          </h2>
                          <Alert
                            msg={msgErroSakhya9}
                            setAlertErro={setAlertErroSankhyaBD9}
                          />
                          <h2 style={{ color: 'red' }} className="erroTabela">
                            Favor entrar em contato com departamento de TI
                          </h2>
                        </div>
                      )}
                      <button
                        style={{ width: 130, marginTop: 15 }}
                        className="btn btn-primary"
                        onClick={() => {
                          handleCloseMensageSankhya();
                          setErroSankhya(false);
                          erroSankhya = false;
                          setAlertErroSankhyaBD(false);
                        }}
                      >
                        Ok
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ width: 200 }}></div>
              </Modal.Body>
            </Modal>

            {/* =================== modal dados atualizados ================================= */}
            <Modal
              className="modal-confirm"
              show={showupdate}
              onHide={handleCloseupdate}
            >
              <Modal.Header closeButton>
                <h1>Status da solicitação</h1>
              </Modal.Header>
              <Modal.Body>
                <img id="logoSankhya" src={logoAlyne} alt="" />
                {alertErroMensage && (
                  <div className="mt-3 mb-0">
                    <Alert msg={msgErro} setAlertErro={setAlertErroMensage} />
                  </div>
                )}
                <ProgressBar className="progress" animated now={sucess} />
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={handleCloseupdate}
                >
                  Ok
                </button>
              </Modal.Body>
            </Modal>
            <Modal
              className="modal-confirm"
              show={showPendEnvio}
              onHide={() => {
                setShowPendEnvio(false);
              }}
            >
              <Modal.Header closeButton>
                <h1>Pedidos Pendentes</h1>
              </Modal.Header>
              <Modal.Body>
                <div className="pedido-selec">
                  <h1 style={{ marginTop: 5 }} className="pedidoNumber2">
                    {(() => {
                      const itens: string[] = [];
                      if (processarAtrasadosCount > 0) {
                        itens.push(
                          `${processarAtrasadosCount} pedidos em processamento a mais de 1 hora`
                        );
                      }
                      if (pendentesCount > 0) {
                        itens.push(
                          `${pendentesCount} pedidos com erro de processamento (Status: Pendente)`
                        );
                      }
                      if (naoEnviadosCount > 0) {
                        itens.push(`${naoEnviadosCount} pedidos não enviados`);
                      }
                      return `Existem ${itens.join(' e ')}, deseja verificar?`;
                    })()}
                  </h1>
                  <div style={{ marginTop: 15 }}>
                    <button
                      style={{ width: 120, marginRight: 10 }}
                      className="btn btn-primary"
                      onClick={() => {
                        setShowPendEnvio(false);
                      setShowListaPendEnvio(true);
                      setLoadingListaPendEnvio(true);
                      AbrirListaPendentes();
                      }}
                    >
                      Sim
                    </button>
                    <button
                      style={{ width: 120 }}
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowPendEnvio(false);
                      }}
                    >
                      Não
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              className="modal-confirm"
              show={showInatividadeAlert}
              onHide={() => setShowInatividadeAlert(false)}
            >
              <Modal.Header closeButton>
                <h1>Gestão de Clientes</h1>
              </Modal.Header>
              <Modal.Body>
                <div className="pedido-selec">
                  <h1
                    style={{ marginTop: 5 }}
                    className="pedidoNumber18"
                  >
                    Identificamos clientes em sua carteira que estão há 60 dias
                    sem realizar compras. Caso não haja novos pedidos, esses
                    cadastros poderão ser inativados em até 30 dias.
                  </h1>
                  <h1
                    style={{ marginTop: 10 }}
                    className="pedidoNumber18"
                  >
                    Solicitamos que revise a lista e priorize ações de contato
                    para manter os clientes ativos e gerar novas oportunidades
                    de negócio.
                  </h1>
                  <h1
                    style={{ marginTop: 15 }}
                    className="pedidoNumber18"
                  >
                    Deseja visualizar a lista?
                  </h1>
                  <div style={{ marginTop: 15 }}>
                    <button
                      style={{ width: 120, marginRight: 10 }}
                      className="btn btn-primary"
                      onClick={() => {
                        setShowInatividadeAlert(false);
                        setShowListaInativos(true);
                      }}
                    >
                      Sim
                    </button>
                    <button
                      style={{ width: 120 }}
                      className="btn btn-secondary"
                      onClick={() => setShowInatividadeAlert(false)}
                    >
                      Não
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              className="modal-confirmLista modal-clientes-60d"
              show={showListaInativos}
              onHide={() => setShowListaInativos(false)}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <h1 style={{ fontSize: 18, margin: 0 }}>CLIENTES SEM COMPRA 60D</h1>
              </Modal.Header>
              <Modal.Body>
                <div className="pedido-selec">
                  <h1 style={{ marginTop: 5 }} className="pedidoNumber18">
                    Estes clientes estão há 60 dias sem compra. Em 30 dias
                    poderão ser inativados para venda.
                  </h1>
                </div>
                <div style={{ marginTop: 5 }} className="divbuttondrop">
                  <button
                    className="buttondropTitle"
                    onClick={() => setVisivelInativos(!visivelInativos)}
                  >
                    Filtros{' '}
                    {visivelInativos ? (
                      <IoIosArrowUp fontSize={20} />
                    ) : (
                      <IoIosArrowDown fontSize={20} />
                    )}
                  </button>
                </div>
                {visivelInativos ? (
                  <div style={{ marginTop: 10 }} className="barraPesquCoord">
                    <div className="d-flex">
                      <div className="bloco-input">
                        <p className="title-input">Qtd. Dias sem Vendas</p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          type="num"
                          value={diasSemCompra}
                          placeholder="ex.: 90 ou 96"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              AtualizarInativos(
                                (e.currentTarget as HTMLInputElement).value
                              );
                            }
                          }}
                          onChange={(e) => setDiasSemCompra(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-outline-dark btnCoord2"
                        onClick={() => AtualizarInativos(diasSemCompra)}
                      >
                        Atualizar
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="table-responsive  tabela-responsiva-pedido-realizado">
                  <div className=" table-wrap">
                    <Table responsive className="table-global table  main-table">
                      <thead>
                        <tr className="tituloTab">
                          <th className="th1">Dias</th>
                          <th className="th1">Código</th>
                          <th className="th1">Cliente</th>
                          <th className="th1">Última Compra</th>
                          <th className="th1">Valor</th>
                          <th className="th1">UF</th>
                          <th className="th1">Cidade</th>
                          <th className="th1">Telefone</th>
                          <th className="th1">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientesInativos?.length > 0 ? (
                          <>
                            {clientesInativos?.map(
                              (item: any, index: number) => (
                                <tr key={index}>
                                  <td className="th1">{item?.dias}</td>
                                  <td className="th1">{item?.codpar}</td>
                                  <td className="th1">{item?.nomepar}</td>
                                  <td className="th1">{item?.dtneg}</td>
                                  <td className="th1">
                                    R$: {moeda(item?.vlrnota)}
                                  </td>
                                  <td className="th1">{item?.uf}</td>
                                  <td className="th1">{item?.nomecid}</td>
                                  <td className="th1">{item?.telefone}</td>
                                  <td className="th1">{item?.email}</td>
                                </tr>
                              )
                            )}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={9}>
                              <div
                                style={{ margin: 'auto' }}
                                className="alert alert-warning "
                                role="alert"
                              >
                                Nenhum cliente encontrado.
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <Paginacao
                      total={totalPaginasInativos}
                      limit={1}
                      paginaAtual={paginaInativos}
                      setPagina={setPaginaInativos}
                    />
                  </div>
                </div>
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={() => setShowListaInativos(false)}
                >
                  Voltar
                </button>
              </Modal.Body>
            </Modal>
            <Modal
              className="modal-confirmLista"
              show={showListaPendEnvio}
              onHide={() => {
                setShowListaPendEnvio(false);
              }}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <h1>LISTA DE PEDIDOS PENDENTES / NÃO ENVIADOS</h1>
              </Modal.Header>
              <Modal.Body>
                <div className="table-responsive  tabela-responsiva-pedido-realizado">
                  <div className=" table-wrap">
                    <Table responsive className="table-global table  main-table">
                      <thead>
                        <tr className="tituloTab">
                          <th className="th1">Nº PALMPV</th>
                          <th style={{ textAlign: 'center' }} className="th1">
                            PED. SANKHYA
                          </th>
                          <th style={{ textAlign: 'center' }} className="th1">
                            VALOR
                          </th>
                          <th className="">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                    {loadingListaPendEnvio ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>
                          Carregando dados...
                        </td>
                      </tr>
                    ) : listaPendEnvio?.length > 0 ? (
                          <>
                            {listaPendEnvio?.map((item: any, index: number) => (
                              <>
                              <tr key={`hdr-${index}`}>
                                <td colSpan={4} className="bg-primary text-white">
                                  {String(item?.parceiroId ?? '')}
                                  {' - '}
                                  {String(
                                    item?.parceiroNome ??
                                      parceiroDocs[String(item?.parceiroId)]?.nome ??
                                      ''
                                  )}
                                  {' - '}
                                  {String(parceiroDocs[String(item?.parceiroId)]?.cnpj ?? '')}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ textAlign: 'center' }}
                                  className="id-grupo"
                                >
                                  <div>{item?.palMPV}</div>
                                  <div style={{ fontSize: 12 }}>
                                    <span style={{ color: '#000' }}>Data pedido: </span>
                                    <span style={{ color: '#2031ed' }}>{formatarData(item?.data)}</span>
                                  </div>
                                </td>
                                <td
                                  style={
                                    item.status?.trim() != 'Enviado' ||
                                    item?.pedido == item?.palMPV
                                      ? { color: 'red' }
                                      : {}
                                  }
                                  className=""
                                >
                                  {item?.status?.trim() == 'Enviado' &&
                                  item?.pedido != item?.palMPV
                                    ? item.pedido
                                    : 'Nulo'}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  R$: {moeda(item?.valor)}
                                </td>
                                <td className="th1">
                                  {['Processar', 'AProcessar'].includes(
                                    String(item?.status).trim()
                                  ) ? (
                                    <h2 className="textPend2">À Processar</h2>
                                  ) : normalizarStatusPedido(item?.status) ===
                                    'pendente' ? (
                                    <h2 className="textPendente2">Pendente</h2>
                                  ) : (
                                    <h2 className="textNEnviado2">Não Enviado</h2>
                                  )}
                                </td>
                              </tr>
                              <tr key={`actions-${index}`}>
                                <td colSpan={4}>
                                  <div
                                    style={{
                                      marginTop: 8,
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      width: '100%',
                                    }}
                                  >
                                    {!!similaresEnviados[String(item?.palMPV ?? item?.id ?? '')] &&
                                    !['Processar', 'AProcessar'].includes(
                                      String(item?.status || '').trim()
                                    ) ? (
                                      <button
                                        type="button"
                                        style={{
                                          backgroundColor: 'transparent',
                                          border: '1px solid #dc3545',
                                          color: '#dc3545',
                                          borderRadius: 12,
                                          padding: '4px 10px',
                                          fontSize: 12,
                                          fontWeight: 600,
                                          whiteSpace: 'nowrap',
                                        }}
                                        onClick={() => {
                                          const enviado =
                                            similaresEnviados[String(item?.palMPV ?? item?.id ?? '')];
                                          if (enviado) {
                                            setVisualizarSomente(true);
                                            setPedidoVisualizar(enviado);
                                            setShowVisualizarPend(true);
                                          }
                                        }}
                                      >
                                        Existem pedidos similares ja enviados!
                                      </button>
                                    ) : (
                                      <div />
                                    )}
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        setVisualizarSomente(false);
                                        setPedidoVisualizar(item);
                                        setShowVisualizarPend(true);
                                      }}
                                      style={{ width: 100 }}
                                    >
                                      Visualizar
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              </>
                            ))}
                          </>
                        ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>
                          Nenhum pedido pendente de envio.
                        </td>
                      </tr>
                        )}
                      </tbody>
                    </Table>
                    <Paginacao
                      total={totalPaginasPendEnvio}
                      limit={pageSizeFrontPendEnvio}
                      paginaAtual={paginaPendEnvio}
                      setPagina={setPaginaPendEnvio}
                    />
                  </div>
                </div>
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={() => setShowListaPendEnvio(false)}
                >
                  Voltar
                </button>
                <Modal show={showConfirmCancel} onHide={() => setShowConfirmCancel(false)} backdrop="static">
                  <Modal.Header closeButton>
                    <h1>Confirmar Cancelamento</h1>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Deseja realmente cancelar o pedido: {palmpvToCancel}?</p>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button className="btn btn-secondary" onClick={() => setShowConfirmCancel(false)} disabled={cancelLoading}>
                        Não
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          try {
                            setCancelLoading(true);
                            try {
                              const db = await (await import('idb')).openDB('pgamobile', (await import('../../data/indexedDB')).versao);
                              const tx = db.transaction('cabecalhoPedidoVenda', 'readwrite');
                              const store = tx.objectStore('cabecalhoPedidoVenda');
                              const all = await store.getAll();
                              for (const cab of all) {
                                if (String(cab?.palMPV) === String(palmpvToCancel)) {
                                  cab.ativo = 'N';
                                  await store.put(cab);
                                }
                              }
                              await tx.done;
                            } catch {}
                            try {
                              await api.put(`/api/CabecalhoPedidoVenda/palmpv/${palmpvToCancel}`);
                              try {
                                const db2 = await (await import('idb')).openDB('pgamobile', (await import('../../data/indexedDB')).versao);
                                const tx2 = db2.transaction('cabecalhoPedidoVenda', 'readwrite');
                                const store2 = tx2.objectStore('cabecalhoPedidoVenda');
                                const all2 = await store2.getAll();
                                for (const cab2 of all2) {
                                  if (String(cab2?.palMPV) === String(palmpvToCancel)) {
                                    cab2.sincronizado = 'S';
                                    await store2.put(cab2);
                                  }
                                }
                                await tx2.done;
                              } catch {}
                            } catch {
                              try {
                                const db3 = await (await import('idb')).openDB('pgamobile', (await import('../../data/indexedDB')).versao);
                                const tx3 = db3.transaction('cabecalhoPedidoVenda', 'readwrite');
                                const store3 = tx3.objectStore('cabecalhoPedidoVenda');
                                const all3 = await store3.getAll();
                                for (const cab3 of all3) {
                                  if (String(cab3?.palMPV) === String(palmpvToCancel)) {
                                    cab3.sincronizado = 'N';
                                    await store3.put(cab3);
                                  }
                                }
                                await tx3.done;
                              } catch {}
                            }
                            setListaPendEnvio((prev) => prev.filter((x: any) => String(x?.palMPV) !== String(palmpvToCancel)));
                            setShowConfirmCancel(false);
                            setShowVisualizarPend(false);
                            setEnviarStatusErro(false);
                            setEnviarStatusMsg('Pedido excluído com sucesso!!!');
                            setEnviarStatusIsDelete(true);
                            setShowEnviarStatus(true);
                          } finally {
                            setCancelLoading(false);
                          }
                        }}
                        disabled={cancelLoading}
                      >
                        Sim, cancelar
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
                <Modal
                  show={showVisualizarPend}
                  onHide={() => {
                    setShowVisualizarPend(false);
                    setVisualizarSomente(false);
                  }}
                  backdrop="static"
                  size="xl"
                >
                  <Modal.Header closeButton>
                    <h1>
                      {visualizarSomente ||
                      String(pedidoVisualizar?.status).trim().toLowerCase() === 'enviado'
                        ? 'DETALHES DO PEDIDO ENVIADO'
                        : 'LISTA DE PEDIDO À ENVIAR'}
                    </h1>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="pedido-selec" style={{ width: '100%', margin: '0 auto' }}>
                      {(() => {
                        const st = String(pedidoVisualizar?.status || '').trim().toLowerCase();
                        const bloqueado = visualizarSomente || st === 'enviado';
                        return (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        {!bloqueado && (
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setPalmpvToCancel(String(pedidoVisualizar?.palMPV ?? ''));
                              setShowConfirmCancel(true);
                            }}
                            disabled={enviarLoading}
                          >
                            Cancelar Pedido
                          </button>
                        )}
                          {!bloqueado &&
                            normalizarStatusPedido(pedidoVisualizar?.status) !== 'pendente' && (
                            <button
                              className="btn btn-dark"
                              onClick={async () => {
                                try {
                                  setEnviarLoading(true);
                                  setEnviarStatusErro(false);
                                  setEnviarStatusMsg(
                                    'Seu pedido está sendo enviado ao Sankhya, aguarde o processamento!'
                                  );
                                  setEnviarStatusIsDelete(false);
                                  setShowEnviarStatus(true);
                                  const palmpv = String(
                                    pedidoVisualizar?.palMPV ?? ''
                                  );
                                  const db = await (await import('idb')).openDB(
                                    'pgamobile',
                                    (await import('../../data/indexedDB')).versao
                                  );
                                  let cabLocal: any | null = null;
                                  let itensLocal: any[] = [];
                                  try {
                                    const tx = db.transaction(
                                      'cabecalhoPedidoVenda',
                                      'readonly'
                                    );
                                    const store = tx.objectStore(
                                      'cabecalhoPedidoVenda'
                                    );
                                    const all = await store.getAll();
                                    cabLocal =
                                      all.find(
                                        (c: any) =>
                                          String(c?.palMPV) === palmpv
                                      ) || null;
                                    await tx.done;
                                  } catch {}
                                  try {
                                    const tx = db.transaction(
                                      'itemPedidoVenda',
                                      'readonly'
                                    );
                                    const store = tx.objectStore(
                                      'itemPedidoVenda'
                                    );
                                    const all = await store.getAll();
                                    itensLocal =
                                      all.filter(
                                        (i: any) =>
                                          String(i?.palMPV) === palmpv
                                      ) || [];
                                    await tx.done;
                                  } catch {}

                                  const hasLocal =
                                    !!cabLocal &&
                                    Array.isArray(itensLocal) &&
                                    itensLocal.length > 0;

                                  const payloadBase = {
                                    vendedorId: usuario.username,
                                    parceiroId:
                                      cabLocal?.parceiroId ??
                                      pedidoVisualizar?.parceiroId,
                                    id: pedidoVisualizar?.id,
                                    filial:
                                      cabLocal?.filial ?? pedidoVisualizar?.filial,
                                    palMPV: palmpv,
                                    tipoNegociacaoId:
                                      cabLocal?.tipoNegociacaoId ??
                                      pedidoVisualizar?.tipoNegociacaoId,
                                    data: cabLocal?.data ?? pedidoVisualizar?.data,
                                    pedido: '',
                                    tipPed: cabLocal?.tipPed ?? pedidoVisualizar?.tipPed,
                                    valor: cabLocal?.valor ?? pedidoVisualizar?.valor,
                                    dataEntrega:
                                      cabLocal?.dataEntrega ??
                                      pedidoVisualizar?.dataEntrega,
                                    observacao:
                                      cabLocal?.observacao ??
                                      pedidoVisualizar?.observacao,
                                    ativo: 'S',
                                    versao: versaoFront,
                                  };

                                  const normalizarSN = (v: any) =>
                                    String(v ?? 'N').trim().toUpperCase() === 'S'
                                      ? 'S'
                                      : 'N';
                                  const num = (v: any) => Number(v ?? 0) || 0;

                                  let itensOrigem: any[] = [];
                                  if (hasLocal) {
                                    itensOrigem = Array.isArray(itensLocal) ? itensLocal : [];
                                  } else {
                                    try {
                                      const resp = await api.get(
                                        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(
                                          palmpv
                                        )}`
                                      );
                                      const cab = (resp as any)?.data || {};
                                      const itensEmb = Array.isArray(cab?.itens)
                                        ? cab.itens
                                        : [];
                                      if (itensEmb.length === 0) {
                                        const msg =
                                          'Pedido sem itens no servidor. Não é possível enviar ao Sankhya.';
                                        setEnviarStatusErro(true);
                                        setEnviarStatusMsg(msg);
                                        throw new Error(msg);
                                      }
                                      itensOrigem = itensEmb;
                                    } catch (error: any) {
                                      const msg = String(
                                        error?.response?.data?.message ??
                                          error?.message ??
                                          'Erro ao validar itens no servidor!'
                                      );
                                      setEnviarStatusErro(true);
                                      setEnviarStatusMsg(msg);
                                      throw error;
                                    }
                                  }

                                  const itensEnviarAll = itensOrigem
                                    .map(({ id, sincronizado, produto, ...rest }: any) => {
                                      const produtoId = Number(
                                        rest?.produtoId ?? produto?.id ?? 0
                                      );
                                      return {
                                        filial: payloadBase?.filial,
                                        vendedorId: Number(payloadBase?.vendedorId),
                                        palMPV: String(palmpv),
                                        produtoId,
                                        quant: num(rest?.quant),
                                        valUnit: num(rest?.valUnit),
                                        valTotal: num(rest?.valTotal),
                                        baixado: rest?.baixado ?? 'N',
                                        inativo: normalizarSN(rest?.inativo),
                                      };
                                    })
                                    .filter(
                                      (it: any) =>
                                        Number(it?.produtoId || 0) > 0 &&
                                        Number(it?.valUnit || 0) > 0 &&
                                        Number(it?.valTotal || 0) > 0
                                    );

                                  const itensAtivos = itensEnviarAll.filter(
                                    (it: any) => normalizarSN(it?.inativo) !== 'S'
                                  );
                                  const cabecalhoEnviar: any = {
                                    ...payloadBase,
                                    status: 'Não Enviado',
                                    quant_Itens: itensAtivos.length,
                                    log_Envio: null,
                                  };

                                  let tipoEnvioSankhya: 0 | 1 = 0;
                                  try {
                                    tipoEnvioSankhya =
                                      await ObterTipoEnvioSankhyaConfiguracao();
                                    await api.post('/api/CabecalhoPedidoVenda/envio', {
                                      cabecalhoPedidoVenda: cabecalhoEnviar,
                                      itensPedidoVenda: itensEnviarAll,
                                      envio: false,
                                    });
                                    if (tipoEnvioSankhya === 1) {
                                      await api.post('/api/CabecalhoPedidoVenda/envio', {
                                        cabecalhoPedidoVenda: {
                                          ...cabecalhoEnviar,
                                          status: 'AProcessar',
                                        },
                                        itensPedidoVenda: itensEnviarAll,
                                        envio: true,
                                      });
                                    } else {
                                      const respCab = await api.get(
                                        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(
                                          String(palmpv)
                                        )}`
                                      );
                                      const cabDb =
                                        (respCab as any)?.data?.cabecalho ??
                                        (respCab as any)?.data ??
                                        {};
                                      const idSrv = Number(
                                        cabDb?.id ?? pedidoVisualizar?.id ?? 0
                                      );
                                      if (!idSrv) {
                                        throw new Error(
                                          'Pedido não encontrado no servidor.'
                                        );
                                      }
                                      await api.put(
                                        `/api/CabecalhoPedidoVenda/${idSrv}`,
                                        {
                                          ...payloadBase,
                                          id: idSrv,
                                          status: 'Processar',
                                        }
                                      );
                                      setEnviarStatusMsg(
                                        'Seu pedido está sendo enviado ao Sankhya, aguarde o processamento!'
                                      );
                                    }
                                  } catch (error: any) {
                                    const msg = String(
                                      error?.response?.data?.message ??
                                        error?.message ??
                                        'Erro ao comunicar com servidor Sankhya!'
                                    );
                                    setEnviarStatusErro(true);
                                    setEnviarStatusMsg(msg);
                                    throw error;
                                  }
                                  try {
                                    if (hasLocal) {
                                      try {
                                        const tx = db.transaction(
                                          'itemPedidoVenda',
                                          'readwrite'
                                        );
                                        const store = tx.objectStore(
                                          'itemPedidoVenda'
                                        );
                                        const all = await store.getAll();
                                        for (const item of all) {
                                          if (
                                            String(item?.palMPV) === palmpv
                                          ) {
                                            item.sincronizado = 'S';
                                            await store.put(item);
                                          }
                                        }
                                        await tx.done;
                                      } catch {}
                                    }
                                    try {
                                      const tx = db.transaction(
                                        'cabecalhoPedidoVenda',
                                        'readwrite'
                                      );
                                      const store = tx.objectStore(
                                        'cabecalhoPedidoVenda'
                                      );
                                      const all = await store.getAll();
                                      for (const cab of all) {
                                        if (String(cab?.palMPV) === palmpv) {
                                          if (hasLocal) {
                                            cab.sincronizado = 'S';
                                          }
                                          cab.status =
                                            tipoEnvioSankhya === 1
                                              ? 'AProcessar'
                                              : 'Processar';
                                          await store.put(cab);
                                        }
                                      }
                                      await tx.done;
                                    } catch {}
                                  } catch {}
                                  setListaPendEnvio((prev) =>
                                    prev.filter(
                                      (x: any) =>
                                        String(x?.palMPV) !==
                                        String(pedidoVisualizar?.palMPV)
                                    )
                                  );
                                  setShowVisualizarPend(false);
                                } finally {
                                  setEnviarLoading(false);
                                }
                              }}
                              disabled={enviarLoading}
                            >
                              Enviar Sankhya
                            </button>
                          )}
                      </div>
                        );
                      })()}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginTop: 6 }}>
                        <h1 style={{ marginTop: 5, marginBottom: 8 }}>Status: </h1>
                        {String(pedidoVisualizar?.status).trim() === 'Enviado' ? (
                          <h2 className="textEnv2">Enviado</h2>
                        ) : ['Processar', 'AProcessar'].includes(
                          String(pedidoVisualizar?.status).trim()
                        ) ? (
                          <h2 className="textPend2">À Processar</h2>
                        ) : normalizarStatusPedido(pedidoVisualizar?.status) ===
                          'pendente' ? (
                          <h2 className="textPendente2">Pendente</h2>
                        ) : normalizarStatusPedido(pedidoVisualizar?.status) ===
                          'nao_enviado' ? (
                          <h2 className="textNEnviado2">A Enviar</h2>
                        ) : (
                          <h2 className="textNEnviado2">
                            {String(pedidoVisualizar?.status || '')}
                          </h2>
                        )}
                      </div>
                      <h1
                        style={{
                          marginTop: 12,
                          fontWeight: 'bold',
                          color: '#000',
                          fontSize: '30px !important',
                        }}
                        className="pedidoNumber"
                      >
                        Pedido Nº: {pedidoVisualizar?.palMPV}
                      </h1>
                      <h1 style={{ marginTop: 15, marginLeft: 5 }} className="super-sub-texto">
                        Cliente: {parceiroCodigo} - {parceiroNome} - {parceiroCnpj}
                      </h1>
                      <div className="cabecalhoPesquisaPedido2">
                        <div className="dflexivel" style={{ width: '100%' }}>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Tipo Negociação: </h1>
                            <h1 className="super-sub-texto" style={{ color: '#2031ed' }}>
                              {tipoNegDesc || pedidoVisualizar?.tipoNegociacaoId}
                            </h1>
                          </div>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Tipo de pedido: </h1>
                            <h1 className="super-sub-texto" style={{ color: '#2031ed' }}>
                              {String(pedidoVisualizar?.tipPed) === '1' ? 'Venda' : 'Bonificação'}
                            </h1>
                          </div>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Data do pedido: </h1>
                            <h1 className="super-sub-texto" style={{ color: '#2031ed' }}>
                              {formatarData(pedidoVisualizar?.data)}
                            </h1>
                          </div>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Data Entrega: </h1>
                            <h1 className="super-sub-texto" style={{ color: '#2031ed' }}>
                              {formatarData(pedidoVisualizar?.dataEntrega)}
                            </h1>
                          </div>
                        </div>
                        <div className="dflexivel2" style={{ width: '100%' }}>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Valor do pedido: </h1>
                            <h1 style={{ color: '#2031ed', fontWeight: 'bold' }} className="super-texto2">
                              R$ {moeda(pedidoVisualizar?.valor)}
                            </h1>
                          </div>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Valor do pedido C/ Ipi: </h1>
                            <h1 style={{ color: '#2031ed', fontWeight: 'bold' }} className="super-texto2">
                              R$ {moeda(pedidoVisualizar?.valor)}
                            </h1>
                          </div>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Empresa: </h1>
                            <h1 className="super-sub-texto" style={{ color: '#2031ed' }}>
                              {empresaId === 2
                                ? 'Distribuidora'
                                : empresaId === 1
                                ? 'Indústria'
                                : empresaDesc
                                ? empresaDesc
                                : String(pedidoVisualizar?.filial) === '2'
                                ? 'Distribuidora'
                                : String(pedidoVisualizar?.filial) === '1'
                                ? 'Indústria'
                                : String(pedidoVisualizar?.filial || '')}
                            </h1>
                          </div>
                          <div className="divisaoCentral">
                            <h1 className="super-sub-texto">Quant. Itens: </h1>
                            <h1 className="super-sub-texto" style={{ color: '#2031ed' }}>
                              {qtdItens}
                            </h1>
                          </div>
                        </div>
                        
                        {String(pedidoVisualizar?.observacao || '').trim() ? (
                          <div style={{ marginTop: 5 }}>
                            <h1 className="super-sub-texto">Observação:</h1>
                            <h1 className="super-sub-texto" style={{ color: '#2031ed' }}>
                              {String(pedidoVisualizar?.observacao || '')}
                            </h1>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="separador"></div>
                      <div className="table-responsive  tabela-responsiva-pedido-realizado" style={{ marginTop: 10, width: '100%' }}>
                        <div className=" table-wrap">
                          <Table responsive className="table-global table  main-table">
                            <thead>
                              <tr className="tituloTab">
                                <th style={{ textAlign: 'center' }} className="th1 id-grupo th-tabela-pedido paddingPedido">
                                  Código
                                </th>
                                <th className="th2 nome-grupo paddingPedido">Desc. Produto</th>
                                <th style={{ textAlign: 'center' }} className="th4 th-tabela-pedido paddingPedido ">
                                  Qtd.
                                </th>
                                <th style={{ textAlign: 'center' }} className="th1 paddingPedido">
                                  Prc. Venda
                                </th>
                                <th style={{ textAlign: 'center' }} className="th1 paddingPedido">
                                  Valor
                                </th>
                                <th style={{ textAlign: 'center' }} className="th1 paddingPedido">
                                  Ipi %
                                </th>
                                <th style={{ textAlign: 'center' }} className="th1 paddingPedido">
                                  Item C/Ipi
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(itensVisualizar) && itensVisualizar.length > 0 ? (
                                itensVisualizar.map((it: any, idx: number) => (
                                  <tr key={`it-${idx}`}>
                                    <td style={{ textAlign: 'center' }} className="id-grupo">
                                      {it?.produtoId}
                                    </td>
                                    <td className="nome-grupo">{it?.descProduto}</td>
                                    <td style={{ textAlign: 'center' }}>{it?.quant}</td>
                                    <td style={{ textAlign: 'center' }}>R$ {moeda(it?.valUnit)}</td>
                                    <td style={{ textAlign: 'center' }}>R$ {moeda(it?.valTotal)}</td>
                                    <td style={{ textAlign: 'center' }}>{ufCliente === 'CE' ? 0 : it?.aliIpi ?? 0}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      {ufCliente !== 'CE' && it?.aliIpi
                                        ? `R$ ${moeda(it.valTotal + it.valTotal * (it.aliIpi / 100))}`
                                        : `R$ ${moeda(it.valTotal)}`}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={7} style={{ textAlign: 'center', padding: 16 }}>
                                    Nenhum item encontrado para este pedido.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                <Modal className="modal-confirmerror" show={showEnviarStatus} onHide={() => setShowEnviarStatus(false)} backdrop="static">
                  <Modal.Body>
                    <img id="logoSankhya" src={enviarStatusIsDelete ? logoAlyne : logoSankhya} alt="" />
                    <h1 style={{ marginTop: 15 }}></h1>
                    <h1 style={{ marginTop: 15, color: enviarStatusErro ? 'red' : undefined }}>{enviarStatusMsg}</h1>
                    <h1 style={{ marginTop: 15 }}></h1>
                    <button style={{ width: 130, marginTop: 15 }} className="btn btn-primary" onClick={() => setShowEnviarStatus(false)}>
                      Ok
                    </button>
                  </Modal.Body>
                </Modal>
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
