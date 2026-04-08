import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { iDadosUsuario, iVendedores } from '../../@types';
import axios from 'axios';
import logoSankhya from '../../assets/logosankhya.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';
import { versaoFront as versaoFrontConst } from '../../data/indexedDB';
import Select from 'react-select';
import Nav from 'react-bootstrap/Nav';
import Paginacao from '../../components/Paginacao';

type Apontamento = {
  id: number;
  title: string;
};

export default function Configuracoes() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  let [producao, setProducao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  let [tipoApont, settipoApont] = useState('');
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const [showupdate, setShowupdate] = useState(false);
  const [verificarEnvio, setVerificarEnvio] = useState(false);
  const handleCloseupdate = () => setShowupdate(false);
  const [fixo1, setFixo1] = useState(true);
  const [fixo2, setFixo2] = useState(true);
  const [mostrarDadosConexaoSankhya, setMostrarDadosConexaoSankhya] =
    useState(false);
  const [sankhyaServidorV1, setSankhyaServidorV1] = useState('');
  const [sankhyaGatewayServidor, setSankhyaGatewayServidor] = useState('');
  const [usuarioSankhya, setusuarioSankhya] = useState('');
  const [senhaSankhya, setsenhaSankhya] = useState('');
  const [sankhyaLoginModelo, setSankhyaLoginModelo] = useState<'v1' | 'v2'>(
    'v1'
  );
  const [sankhyaUrlToken, setSankhyaUrlToken] = useState('');
  const [sankhyaToken, setSankhyaToken] = useState('');
  const [sankhyaClientId, setSankhyaClientId] = useState('');
  const [sankhyaSecret, setSankhyaSecret] = useState('');
  const [configuracaoDb, setConfiguracaoDb] = useState<any>(null);
  const [tempoSessao, setTempoSessao] = useState(0);
  const [tipoEnvioSankhya, setTipoEnvioSankhya] = useState<number>(1);
  const [hrReceberDados, setHrReceberDados] = useState('');
  const [sql, setsql] = useState('');
  let [sucess, setSucess] = useState(0);

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File>();
  const [showVersaoModal, setShowVersaoModal] = useState(false);
  const [novaVersao, setNovaVersao] = useState('');
  const [versaoDb, setVersaoDb] = useState('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = () => {
        const fileContent = reader.result as string;
        const jsonContent = JSON.parse(fileContent);
        setTitle(jsonContent.title);
      };
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const aplicarConfiguracao = (dataRaw: any) => {
    const data = dataRaw ?? {};
    setConfiguracaoDb(data);

    const getStr = (camelKey: string, pascalKey: string) => {
      const v = data?.[camelKey] ?? data?.[pascalKey] ?? '';
      return String(v ?? '');
    };

    setSankhyaServidorV1(getStr('sankhyaServidor', 'SankhyaServidor'));
    setusuarioSankhya(getStr('sankhyaUsuario', 'SankhyaUsuario'));
    setsenhaSankhya(getStr('sankhyaSenha', 'SankhyaSenha'));

    setSankhyaGatewayServidor(
      getStr('sankhyaGatewayServidor', 'SankhyaGatewayServidor')
    );
    setSankhyaUrlToken(getStr('sankhyaUrlToken', 'SankhyaUrlToken'));
    setSankhyaToken(getStr('sankhyaToken', 'SankhyaToken'));
    setSankhyaClientId(getStr('sankhyaClientId', 'SankhyaClientId'));
    setSankhyaSecret(getStr('sankhyaSecret', 'SankhyaSecret'));
    setHrReceberDados(getStr('hr_Receber_Dados', 'Hr_Receber_Dados'));

    const modeloDbRaw = getStr('sankhyaLoginModelo', 'SankhyaLoginModelo');
    const modeloDb = String(modeloDbRaw || '').trim().toLowerCase();
    setSankhyaLoginModelo(modeloDb === 'v2' ? 'v2' : 'v1');

    try {
      setTempoSessao(Number(data?.tempoSessao ?? data?.TempoSessao ?? 0));
    } catch {}
    try {
      const envioRaw = data?.envio ?? data?.Envio;
      const envioNum = Number(envioRaw);
      setTipoEnvioSankhya(envioNum === 0 ? 0 : 1);
    } catch {}
    try {
      const vdb = data?.versao ?? data?.Versao ?? data?.versaoApp ?? '';
      const v = String(vdb || '');
      setVersaoDb(v);
      setNovaVersao(v);
    } catch {}
  };

  const RecarregarConfiguracao = async () => {
    try {
      const resp = await api.get(`/api/Configuracao/1`);
      aplicarConfiguracao(resp?.data ?? {});
    } catch {}
  };

  type Option = { value: number; label: string };
  type SankhyaAtualizacaoHistoricoItem = {
    id: string;
    createdAtIso: string;
    usuarioId: number;
    usuarioUsername: string;
    vendedorIds: number[];
    tabelas: string[];
    totalExecucoes?: number;
    sucesso?: number;
    falha?: number;
    erros?: string[];
    erroMsg?: string;
  };
  const TABELAS_DISPONIVEIS = [
    { value: 'Vendedor', label: 'Vendedor' },
    { value: 'TipoNegociacao', label: 'Tipo de Negociação' },
    { value: 'Parceiro', label: 'Parceiro' },
    { value: 'GrupoProduto', label: 'Grupo de Produtos' },
    { value: 'Produto', label: 'Produto' },
    { value: 'TabelaPreco', label: 'Tabela de Preço' },
    { value: 'ItemTabela', label: 'Item da Tabela' },
    { value: 'TabelaPrecoParceiro', label: 'Tabela de Preço (Parceiro)' },
    { value: 'Titulo', label: 'Título' },
  ] as const;
  const [aba, setAba] = useState<'GERAL' | 'SANKHYA'>('GERAL');
  const [sankhyaLoading, setSankhyaLoading] = useState(false);
  const [sankhyaSucess, setSankhyaSucess] = useState(30);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalAlertErro, setModalAlertErro] = useState(false);
  const [modalErroMsg, setModalErroMsg] = useState('');
  const [vendedores, setVendedores] = useState<iVendedores[]>([]);
  const [vendedoresSelecionados, setVendedoresSelecionados] = useState<Option[]>([]);
  const [tabelasSelecionadas, setTabelasSelecionadas] = useState<string[]>([]);
  const [resultadoAtualizacao, setResultadoAtualizacao] = useState<any>(null);
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);
  const [historico, setHistorico] = useState<SankhyaAtualizacaoHistoricoItem[]>([]);
  const [historicoTotal, setHistoricoTotal] = useState(0);
  const [historicoLoading, setHistoricoLoading] = useState(false);
  const [historicoVendedor, setHistoricoVendedor] = useState<Option | null>(null);
  const [historicoInicio, setHistoricoInicio] = useState('');
  const [historicoFim, setHistoricoFim] = useState('');
  const [paginaHistorico, setPaginaHistorico] = useState(1);
  const qtdePaginaHistorico = 10;
  const historicoFiltrosKeyRef = useRef<string>('');
  const opcoesVendedores: Option[] = useMemo(() => {
    return (vendedores || []).map((v) => ({
      value: Number(v.id),
      label: `${v.id} - ${v.nome}`,
    }));
  }, [vendedores]);

  const historicoFiltrosKey = useMemo(() => {
    const vend = historicoVendedor?.value ?? '';
    return `${vend}|${historicoInicio}|${historicoFim}`;
  }, [historicoVendedor, historicoInicio, historicoFim]);

  const carregarHistorico = async () => {
    try {
      setHistoricoLoading(true);
      const params: any = {
        pagina: paginaHistorico,
        totalpagina: qtdePaginaHistorico,
      };
      if (historicoVendedor?.value) params.vendedorId = Number(historicoVendedor.value);
      if (historicoInicio) params.inicio = new Date(historicoInicio).toISOString();
      if (historicoFim) params.fim = new Date(historicoFim).toISOString();
      const resp = await api.get('/api/SankhyaAtualizacao/historico', { params });
      setHistorico((resp?.data?.data ?? []) as SankhyaAtualizacaoHistoricoItem[]);
      setHistoricoTotal(Number(resp?.data?.total ?? 0) || 0);
    } catch {
      setHistorico([]);
      setHistoricoTotal(0);
    } finally {
      setHistoricoLoading(false);
    }
  };
  useEffect(() => {
    if (!showHistoricoModal) {
      historicoFiltrosKeyRef.current = '';
      return;
    }
    const filtrosMudaram =
      historicoFiltrosKeyRef.current !== '' &&
      historicoFiltrosKeyRef.current !== historicoFiltrosKey;
    historicoFiltrosKeyRef.current = historicoFiltrosKey;
    if (filtrosMudaram && paginaHistorico !== 1) {
      setPaginaHistorico(1);
      return;
    }
    carregarHistorico();
  }, [showHistoricoModal, paginaHistorico, historicoFiltrosKey]);
  const todasTabelasSelecionadas =
    tabelasSelecionadas.length === TABELAS_DISPONIVEIS.length;
  const toggleTabela = (tabela: string, checked: boolean) => {
    setTabelasSelecionadas((prev) => {
      const set = new Set(prev);
      if (checked) set.add(tabela);
      else set.delete(tabela);
      return Array.from(set);
    });
  };
  const toggleTodas = (checked: boolean) => {
    if (checked) {
      setTabelasSelecionadas(TABELAS_DISPONIVEIS.map((t) => t.value));
    } else {
      setTabelasSelecionadas([]);
    }
  };
  const getAxiosErrorMessage = (e: any) => {
    const data = e?.response?.data;
    if (typeof data === 'string' && data.trim().length > 0) return data;
    if (data && typeof data === 'object') {
      const msg =
        data?.message ||
        data?.erro ||
        data?.error ||
        data?.title ||
        data?.detail;
      if (typeof msg === 'string' && msg.trim().length > 0) return msg;
      try {
        const json = JSON.stringify(data);
        if (json && json !== '{}' && json !== '[]') return json;
      } catch {}
    }
    const status = e?.response?.status;
    if (typeof status === 'number') return `Erro HTTP ${status}.`;
    const message = e?.message;
    if (typeof message === 'string' && message.trim().length > 0) return message;
    return 'Erro ao executar atualização. Tente novamente.';
  };
  const extrairErrosResultado = (data: any): string[] => {
    const erros: string[] = [];
    const push = (v: any) => {
      if (v == null) return;
      if (typeof v === 'string' && v.trim()) erros.push(v.trim());
      else if (typeof v === 'object') {
        try {
          const json = JSON.stringify(v);
          if (json && json !== '{}' && json !== '[]') erros.push(json);
        } catch {}
      }
    };
    if (Array.isArray(data?.erros)) for (const e of data.erros) push(e);
    if (Array.isArray(data?.errors)) for (const e of data.errors) push(e);
    if (Array.isArray(data?.resultados)) {
      for (const r of data.resultados) {
        if (r && r.sucesso === false) {
          const tabela = r?.tabela ? String(r.tabela) : '';
          const vendedorId = r?.vendedorId != null ? String(r.vendedorId) : '';
          const resposta = r?.resposta ? String(r.resposta) : '';
          const msg = `${tabela}${vendedorId ? ` (Vendedor ${vendedorId})` : ''}: ${resposta}`.trim();
          if (msg && msg !== ':') erros.push(msg);
        }
      }
    }
    push(data?.erro);
    push(data?.error);
    return Array.from(new Set(erros));
  };
  const carregarVendedores = async () => {
    try {
      const response = await api.get('/api/Vendedor?pagina=1&totalpagina=9999');
      setVendedores((response?.data?.data ?? []) as iVendedores[]);
    } catch (e: any) {}
  };
  const executarAtualizacao = async () => {
    setResultadoAtualizacao(null);
    setModalAlertErro(false);
    setModalErroMsg('');
    if (tabelasSelecionadas.length === 0) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Selecione ao menos uma tabela.');
      return;
    }
    const vendedorIds = (vendedoresSelecionados || [])
      .map((v) => Number(v.value))
      .filter((v) => v > 0);
    setShowStatusModal(true);
    setModalMsg('Atualizando dados...');
    setSankhyaSucess(20);
    let progressTimer: any = null;
    progressTimer = setInterval(() => {
      setSankhyaSucess((p) => {
        if (p >= 90) return 90;
        return p + 5;
      });
    }, 500);
    try {
      setSankhyaLoading(true);
      const response = await api.post('/api/SankhyaAtualizacao/executar', {
        tabelas: tabelasSelecionadas,
        vendedorIds,
      });
      setResultadoAtualizacao(response?.data ?? null);
      setSankhyaSucess(100);
      const falha = Number(response?.data?.falha ?? 0);
      if (falha > 0) setModalMsg('Atualização concluída com falhas.');
      else setModalMsg('Atualização concluída com sucesso.');
    } catch (e: any) {
      setModalMsg('Erro ao atualizar dados.');
      setModalAlertErro(true);
      setModalErroMsg(getAxiosErrorMessage(e));
    } finally {
      if (progressTimer) clearInterval(progressTimer);
      setSankhyaLoading(false);
      setTimeout(() => setSankhyaSucess(30), 500);
    }
  };
  useEffect(() => {
    if (aba !== 'SANKHYA') return;
    carregarVendedores();
  }, [aba]);

  useEffect(() => {
    window.scrollTo(0, 0);
    logado();
    GetapontamentoId();
    CarregarVerificarEnvio();
  }, []);

  useEffect(() => {
    if (!configuracaoDb) return;
    aplicarConfiguracao(configuracaoDb);
  }, [configuracaoDb]);

  function logado() {
    if (
      localStorage.getItem('@Portal/superusuario') == 'true' ||
      usuario.username == 'admin'
    ) {
      setLoading(false);
    } else {
      history('/');
    }
  }
  async function AtivarVerificarEnvio() {
    try {
      const existing = await api.get('/api/Etiqueta/1');
      await api.put('/api/Etiqueta/1', {
        id: 1,
        titulo: 'Verificar Envio',
        nomeTxt: 'Verificar Envio',
        sql: 'Verificar Envio',
        zpl: 'Verificar Envio',
        printerAddress: 'Verificar Envio',
      });
      setVerificarEnvio(true);
    } catch {
      try {
        const form = new FormData();
        form.append('Id', '1');
        form.append('Titulo', 'Verificar Envio');
        form.append('NomeTxt', 'Verificar Envio');
        form.append('Sql', 'Verificar Envio');
        form.append('Zpl', 'Verificar Envio');
        form.append('PrinterAddress', 'Verificar Envio');
        const pngBase64 =
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6Xb+QAAAABJRU5ErkJggg==';
        const bytes = Uint8Array.from(atob(pngBase64), (c) =>
          c.charCodeAt(0)
        );
        const blob = new Blob([bytes], { type: 'image/png' });
        form.append(
          'File',
          new File([blob], 'verificar-envio.png', { type: 'image/png' })
        );
        await api.post('/api/Etiqueta', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setVerificarEnvio(true);
      } catch {
        setLoading(false);
      }
    }
  }

  async function DesativarVerificarEnvio() {
    await api
      .delete('/api/Etiqueta/1')
      .then(() => {
        setVerificarEnvio(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  async function CarregarVerificarEnvio() {
    try {
      const resp = await api.get('/api/Etiqueta/1');
      const titulo = String((resp as any)?.data?.titulo ?? '').trim();
      const nomeTxt = String((resp as any)?.data?.nomeTxt ?? '').trim();
      setVerificarEnvio(titulo === 'Verificar Envio' && nomeTxt === 'Verificar Envio');
    } catch {
      setVerificarEnvio(false);
    }
  }

  async function GetapontamentoId() {
    setLoading(true);
    setSucess(20);
    await api

      .get(`/api/Configuracao/1`)
      .then((response) => {
        const data = response?.data ?? {};
        console.log('apontamento', (data as any)?.sankhyaServidor);
        aplicarConfiguracao(data);
        setSucess(80);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setLoading(false);
      });
  }

  async function SalvarConfiguracoesGerais() {
    const cfg = configuracaoDb ?? {};
    const getCfg = (camelKey: string, pascalKey: string) =>
      cfg?.[camelKey] ?? cfg?.[pascalKey];
    const payload = {
      Id: 1,
      SankhyaServidor: sankhyaServidorV1,
      SankhyaUsuario: usuarioSankhya,
      SankhyaSenha: senhaSankhya,
      SankhyaUsuarioRD: String(getCfg('sankhyaUsuarioRD', 'SankhyaUsuarioRD') ?? ''),
      SankhyaSenhaRD: String(getCfg('sankhyaSenhaRD', 'SankhyaSenhaRD') ?? ''),
      SankhyaLoginModelo: sankhyaLoginModelo,
      SankhyaUrlToken: sankhyaUrlToken,
      SankhyaToken: sankhyaToken,
      SankhyaClientId: sankhyaClientId,
      SankhyaClientIdRD: String(getCfg('sankhyaClientIdRD', 'SankhyaClientIdRD') ?? ''),
      SankhyaSecret: sankhyaSecret,
      SankhyaGatewayServidor: sankhyaGatewayServidor,
      TempoSessao: tempoSessao,
      Envio: tipoEnvioSankhya,
      Versao: String(getCfg('versao', 'Versao') ?? ''),
      Hr_Receber_Dados: hrReceberDados,
    };
    await api
      .put(`/api/Configuracao/1`, payload)
      .then(async (response) => {
        console.log('apontamento editado', response.data);
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro('Configurações salvas com sucesso!');
        localStorage.setItem('@Portal/TempoSessao', String(tempoSessao));
        await RecarregarConfiguracao();
        setMostrarDadosConexaoSankhya(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function EnviarSql() {
    await api
      .post(`/api/InjecaoSQL/executar-sql?sql=${sql}`)
      .then((response) => {
        setsql('');
        console.log('slq', response.data);
        setShowMensage(true);
        setAlertErroMensage(true);
        const data = response?.data;
        const msg =
          typeof data === 'string'
            ? data
            : data?.title || data?.message || 'Comando executado com sucesso';
        setMsgErro(msg);
      })
      .catch((error) => {
        console.log(error.respose);
        setShowMensage(true);
        setAlertErroMensage(true);
        const data = error?.response?.data;
        const msg =
          typeof data === 'string'
            ? data
            : data?.title || data?.message || 'Erro ao executar SQL';
        setMsgErro(msg);
        return;
      });
  }

  async function AtualizarVersao() {
    try {
      const cfgResp = await api.get(`/api/Configuracao/1`);
      const cfgAtual = { ...(cfgResp?.data || {}) };
      cfgAtual.Versao = novaVersao;
      cfgAtual.versao = novaVersao;
      cfgAtual.versaoApp = novaVersao;
      await api.put(`/api/Configuracao/1`, cfgAtual);
      try {
        const tituloUpdate = 'Opa... tem nova atualização do PGA por aqui!';
        const textoUpdate = `Olá, temos uma nova atualização do PGA pra você, entre m contato como comercial e saiba das novidades desta versão ${novaVersao}, Para atualizar clique no aceite`;
        const dataAtual = new Date();
        const resp = await api.get(`/api/GrupoUsuario?pagina=1&totalpagina=999`);
        const gruposAlvo = Array.isArray(resp?.data?.data)
          ? resp.data.data
          : Array.isArray(resp?.data)
          ? resp.data
          : [];
        if (gruposAlvo && gruposAlvo.length > 0) {
          await Promise.all(
            gruposAlvo.map((g: any) =>
              api.post('/api/ComunicadoComercial', {
                titulo: tituloUpdate,
                texto: textoUpdate,
                grupoId: g.id,
                criadoEm: dataAtual,
              })
            )
          );
        }
      } catch (e) {}
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Versão atualizada com sucesso!');
      setShowVersaoModal(false);
    } catch (error: any) {
      setShowMensage(true);
      setAlertErroMensage(true);
      const data = error?.response?.data;
      const msg =
        typeof data === 'string'
          ? data
          : data?.title || data?.message || 'Erro ao atualizar a versão';
      setMsgErro(msg);
    }
  }

  async function AtualizarDados() {
    setShowupdate(true);
    setSucess(0);
    sucess = 0;
    Sucess();
    setAlertErroMensage(true);
    setMsgErro('Atualizando dados...');
    await api
      .post('/api/RestaurarMenu')
      .then((response) => {
        window.location.reload();
        setLoading(false);
        console.log(response);
        setShowupdate(true);
        setAlertErroMensage(true);
        setMsgErro('Dados atualizados com sucesso!!!');
      })
      .catch((error) => {
        setLoading(false);
      });
  }
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

  async function CreateComunicado() {
    setLoading(true);
    await api
      .post('/api/Comunicado', {
        titulo: 'ATUALIZAÇÃO',
        texto: 'NOVA ATUALIZAÇÃO',
      })

      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        setShowMensage(true);
        setMsgErro('Erro ao criar post.');
        return;
      });
  }

  //==========================================================//
  return (
    <>
      {loading ? (
        <div className="loadingGeral">
          <div className="loadingModal">
            <img id="logoSankhya" src={logoSankhya} alt="" />
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
                <h1>{aba === 'GERAL' ? 'Configurações Gerais' : 'Sankhya'}</h1>
              </div>
              <div className="contain" style={{ display: aba === 'GERAL' ? 'block' : 'none' }}>
                <div className="conteudo">
                  <Nav variant="tabs" activeKey={aba} onSelect={(k) => setAba((k as any) || 'GERAL')} style={{ marginBottom: 12 }}>
                    <Nav.Item>
                      <Nav.Link eventKey="GERAL">Configurações Gerais</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="SANKHYA">Sankhya</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="divApontamento">
                    <div
                      className={`div-controles ${
                        sankhyaLoginModelo === 'v2'
                          ? 'div-controles-sankhya-v2'
                          : 'div-controles-sankhya-v1'
                      }`}
                    >
                      {!mostrarDadosConexaoSankhya ? (
                        <button
                          className="btn btn-dark btnAlterarConexaoSankhya"
                          onClick={async () => {
                            await RecarregarConfiguracao();
                            setMostrarDadosConexaoSankhya(true);
                          }}
                        >
                          Alterar dados de conexão Sankhya
                        </button>
                      ) : (
                        <>
                          <div style={{ marginTop: 12 }}>
                            <h1 className="title-input">Modelo de login Sankhya:</h1>
                            <select
                              className="form-control select inputparceiro inputApont"
                              value={sankhyaLoginModelo}
                              onChange={(e) => {
                                const v = String(e.target.value || '').toLowerCase();
                                setSankhyaLoginModelo(v === 'v2' ? 'v2' : 'v1');
                              }}
                            >
                              <option value="v1">v1 (url/usuario/senha)</option>
                              <option value="v2">v2 (token)</option>
                            </select>
                          </div>
                          {sankhyaLoginModelo === 'v1' && (
                            <>
                              <div style={{ marginTop: 12 }}>
                                <h1 className="title-input">Apontamento Sankhya:</h1>
                                <input
                                  id="sankhya"
                                  value={sankhyaServidorV1}
                                  type="text"
                                  className="form-control select inputparceiro inputApont"
                                  onChange={(e) => {
                                    setSankhyaServidorV1(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="d-flex" style={{ marginTop: 12 }}>
                                <div>
                                  <h1 className="title-input">Usuario Sankhya:</h1>
                                  <input
                                    id="sankhya"
                                    value={usuarioSankhya}
                                    type="text"
                                    className="form-control select inputparceiro inputApont"
                                    onChange={(e) => {
                                      setusuarioSankhya(e.target.value);
                                    }}
                                  />
                                </div>
                                <div style={{ marginLeft: 20 }}>
                                  <h1 className="title-input">Senha Sankhya:</h1>
                                  <input
                                    id="sankhya"
                                    value={senhaSankhya}
                                    type="password"
                                    className="form-control select inputparceiro inputApont"
                                    onChange={(e) => {
                                      setsenhaSankhya(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          {sankhyaLoginModelo === 'v2' && (
                            <div style={{ marginTop: 12 }}>
                              <h1 className="title-input">Gateway Sankhya:</h1>
                              <input
                                value={sankhyaGatewayServidor}
                                type="text"
                                className="form-control select inputparceiro inputApontV2"
                                onChange={(e) =>
                                  setSankhyaGatewayServidor(e.target.value)
                                }
                              />
                              <h1 className="title-input">URL Token:</h1>
                              <input
                                value={sankhyaUrlToken}
                                type="text"
                                className="form-control select inputparceiro inputApontV2"
                                onChange={(e) => setSankhyaUrlToken(e.target.value)}
                              />
                              <div style={{ marginTop: 12 }}>
                                <h1 className="title-input">X-Token:</h1>
                                <input
                                  value={sankhyaToken}
                                  type="text"
                                  className="form-control select inputparceiro inputApontV2"
                                  onChange={(e) => setSankhyaToken(e.target.value)}
                                />
                              </div>
                              <div style={{ marginTop: 12 }}>
                                <h1 className="title-input">ClientId:</h1>
                                <input
                                  value={sankhyaClientId}
                                  type="text"
                                  className="form-control select inputparceiro inputApontV2"
                                  onChange={(e) =>
                                    setSankhyaClientId(e.target.value)
                                  }
                                />
                              </div>
                              <div style={{ marginTop: 12 }}>
                                <h1 className="title-input">Secret:</h1>
                                <input
                                  value={sankhyaSecret}
                                  type="text"
                                  className="form-control select inputparceiro inputApontV2"
                                  onChange={(e) => setSankhyaSecret(e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                          <div style={{ marginTop: 12 }}>
                            <h1 className="title-input">Tipo de envio Sankhya:</h1>
                            <select
                              className="form-control select inputparceiro inputApont"
                              value={String(tipoEnvioSankhya)}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setTipoEnvioSankhya(v === 0 ? 0 : 1);
                              }}
                            >
                              <option value="0">Bot</option>
                              <option value="1">Api</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="divApontamento">
                    <div className="div-controles">
                      <h1 className="title-input">Tempo de Sessão Geral:</h1>
                      <div className="d-flex">
                        <input
                          id="sankhya-sessao"
                          value={tempoSessao}
                          type="number"
                          className="form-control select inputparceiro inputApontSessao"
                          onChange={(e) => {
                            setTempoSessao(Number(e.target.value));
                          }}
                        />
                        <h1 className="title-input">Minutos</h1>
                      </div>
                    </div>
                  </div>
                  <div className="divApontamento">
                    <div className="div-controles">
                      <h1 className="title-input">Horário receber dados (Sankhya):</h1>
                      <div className="d-flex" style={{ alignItems: 'center' }}>
                        <input
                          id="hr-receber-dados"
                          value={hrReceberDados}
                          type="time"
                          className="form-control select inputparceiro inputApontSessao"
                          onChange={(e) => setHrReceberDados(e.target.value)}
                        />
                        <h1 className="title-input" style={{ marginLeft: 10 }}>
                          (vazio desativa)
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="divApontamento">
                    <button
                      className="btn btn-dark btnSalvarConfiguracoes"
                      onClick={SalvarConfiguracoesGerais}
                    >
                      Salvar
                    </button>
                  </div>
                  <div className="divApontamento">
                    <div className="div-controles">
                      <h1 className="title-input">Injeção SQL:</h1>
                      <input
                        id="sistema"
                        value={sql}
                        type="text"
                        className="form-control select inputparceiro inputApont"
                        onChange={(e) => {
                          setsql(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-primary editarUrul"
                      onClick={EnviarSql}
                    >
                      Enviar
                    </button>
                  </div>
                  <div className="divApontamento">
                    <div className="div-controles">
                      <h1 className="title-input">Versão do App:</h1>
                      <div className="d-flex" style={{ alignItems: 'center' }}>
                        <input
                          id="versao-front"
                          value={novaVersao}
                          type="text"
                          className="form-control select inputparceiro inputApont"
                          style={{ maxWidth: 200 }}
                          onChange={(e) => setNovaVersao(e.target.value)}
                        />
                        <button
                          style={{ marginLeft: 10 }}
                          className="btn btn-dark"
                          onClick={AtualizarVersao}
                        >
                          Atualizar versão
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="divApontamento">
                    <div className="div-controles">
                      <h1 className="title-input">Verificar Envio:</h1>
                      <div
                        className="d-flex"
                        style={{ alignItems: 'center', marginTop: 15 }}
                      >
                        <input
                          type="checkbox"
                          checked={verificarEnvio}
                          onChange={async (e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              await AtivarVerificarEnvio();
                            } else {
                              await DesativarVerificarEnvio();
                            }
                          }}
                        />
                        <h1 style={{ marginLeft: 10 }}>
                          {verificarEnvio ? 'Ativo' : 'Inativo'}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {aba === 'SANKHYA' ? (
                <div className="contain">
                  <div className="conteudo">
                    <Nav variant="tabs" activeKey={aba} onSelect={(k) => setAba((k as any) || 'SANKHYA')} style={{ marginBottom: 12 }}>
                      <Nav.Item>
                        <Nav.Link eventKey="GERAL">Configurações Gerais</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="SANKHYA">Sankhya</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <div className="divApontamento">
                      <div className="div-controles">
                        <div style={{ marginTop: 12 }}>
                          <h1 className="title-input">Vendedores (opcional):</h1>
                          <Select
                            isMulti
                            options={opcoesVendedores}
                            value={vendedoresSelecionados}
                            onChange={(v) => setVendedoresSelecionados((v as any) || [])}
                            placeholder="Se não selecionar nenhum, atualiza todos"
                          />
                        </div>
                        <div style={{ marginTop: 18 }}>
                          <h1 className="title-input">Tabelas:</h1>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={todasTabelasSelecionadas}
                              onChange={(e) => toggleTodas(e.target.checked)}
                              id="tb-todos"
                            />
                            <label className="form-check-label" htmlFor="tb-todos">
                              Todos
                            </label>
                          </div>
                          {TABELAS_DISPONIVEIS.map((t) => {
                            const checked = tabelasSelecionadas.includes(t.value);
                            const id = `tb-${t.value}`;
                            return (
                              <div className="form-check" key={t.value}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => toggleTabela(t.value, e.target.checked)}
                                  id={id}
                                />
                                <label className="form-check-label" htmlFor={id}>
                                  {t.label}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ marginTop: 18 }}>
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              onClick={executarAtualizacao}
                              disabled={sankhyaLoading}
                              style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                borderRadius: 16,
                                padding: '10px 18px',
                                border: '1px solid #000',
                                fontWeight: 700,
                                width: 140,
                              }}
                            >
                              {sankhyaLoading ? 'Atualizando...' : 'Atualizar'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPaginaHistorico(1);
                                setShowHistoricoModal(true);
                              }}
                              style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                borderRadius: 16,
                                padding: '10px 18px',
                                border: '1px solid #000',
                                fontWeight: 700,
                                width: 140,
                              }}
                            >
                              Histórico
                            </button>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
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
                  <div className="mt-3 mb-0  mensagemErropadrao">
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

          <Modal
            className="modal-confirm"
            show={showHistoricoModal}
            onHide={() => setShowHistoricoModal(false)}
            backdrop="static"
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <h1>Histórico</h1>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ minWidth: 240, flex: 1 }}>
                  <h1 className="title-input">Vendedor:</h1>
                  <Select
                    isClearable
                    options={opcoesVendedores}
                    value={historicoVendedor}
                    onChange={(v) => setHistoricoVendedor((v as any) || null)}
                    placeholder="Todos"
                  />
                </div>
                <div style={{ minWidth: 200 }}>
                  <h1 className="title-input">Início:</h1>
                  <input
                    className="form-control"
                    type="datetime-local"
                    value={historicoInicio}
                    onChange={(e) => setHistoricoInicio(e.target.value)}
                  />
                </div>
                <div style={{ minWidth: 200 }}>
                  <h1 className="title-input">Fim:</h1>
                  <input
                    className="form-control"
                    type="datetime-local"
                    value={historicoFim}
                    onChange={(e) => setHistoricoFim(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setHistoricoVendedor(null);
                      setHistoricoInicio('');
                      setHistoricoFim('');
                    }}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                      borderRadius: 16,
                      padding: '10px 18px',
                      border: '1px solid #000',
                      fontWeight: 700,
                    }}
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 15 }}>
                <Table responsive className="table-global table main-table">
                  <thead>
                    <tr className="tituloTab">
                      <th>Data/Hora</th>
                      <th>Vendedores</th>
                      <th>Tabelas</th>
                      <th style={{ textAlign: 'center' }}>Sucesso</th>
                      <th style={{ textAlign: 'center' }}>Falha</th>
                      <th>Erros</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicoLoading ? (
                      <tr>
                        <td colSpan={6} style={{ padding: 16, textAlign: 'center' }}>
                          Carregando...
                        </td>
                      </tr>
                    ) : historico.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: 16, textAlign: 'center' }}>
                          Nenhum registro.
                        </td>
                      </tr>
                    ) : (
                      historico.map((h) => {
                        const falha = Number(h?.falha ?? 0);
                        const erros = Array.isArray(h?.erros) ? h.erros : [];
                        const dt = h.createdAtIso ? new Date(h.createdAtIso) : null;
                        const dtLabel = dt ? dt.toLocaleString('pt-BR') : '';
                        return (
                          <tr key={h.id}>
                            <td>{dtLabel}</td>
                            <td>{(h.vendedorIds || []).length ? (h.vendedorIds || []).join(', ') : 'Todos'}</td>
                            <td>{(h.tabelas || []).join(', ')}</td>
                            <td style={{ textAlign: 'center' }}>{h.sucesso ?? 0}</td>
                            <td style={{ textAlign: 'center' }}>{h.falha ?? 0}</td>
                            <td style={{ color: falha > 0 ? '#b00020' : undefined, whiteSpace: 'pre-wrap', maxWidth: 420 }}>
                              {falha > 0
                                ? (erros.length ? erros.join('\n') : h.erroMsg || 'Sem detalhes.')
                                : ''}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
                {historicoTotal > qtdePaginaHistorico && (
                  <Paginacao
                    total={historicoTotal}
                    limit={qtdePaginaHistorico}
                    paginaAtual={paginaHistorico}
                    setPagina={setPaginaHistorico}
                  />
                )}
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            className="modal-confirm"
            show={showStatusModal}
            onHide={() => {
              if (sankhyaLoading) return;
              setShowStatusModal(false);
              setModalAlertErro(false);
              setModalErroMsg('');
              setModalMsg('');
            }}
            backdrop="static"
          >
            <Modal.Body>
              <div className="div-sankhya">
                <img id="logoSankhya" src={logoSankhya} alt="" />
                <h1>{modalMsg}</h1>
                {modalAlertErro && (
                  <div className="mt-3 mb-0">
                    <Alert msg={modalErroMsg} setAlertErro={setModalAlertErro} />
                  </div>
                )}
                {sankhyaLoading ? (
                  <>
                    <ProgressBar className="progress" animated now={sankhyaSucess} />
                  </>
                ) : (
                  <>
                    {resultadoAtualizacao && (
                      <div style={{ fontSize: 14, marginTop: 10 }}>
                        <div>Execuções: {resultadoAtualizacao?.totalExecucoes ?? 0}</div>
                        <div>Sucesso: {resultadoAtualizacao?.sucesso ?? 0}</div>
                        <div>Falha: {resultadoAtualizacao?.falha ?? 0}</div>
                        {Number(resultadoAtualizacao?.falha ?? 0) > 0 && (
                          <div style={{ marginTop: 10, color: '#b00020' }}>
                            <div style={{ fontWeight: 700 }}>Erros:</div>
                            {(extrairErrosResultado(resultadoAtualizacao) || []).length ? (
                              <div style={{ whiteSpace: 'pre-wrap' }}>
                                {(extrairErrosResultado(resultadoAtualizacao) || []).join('\n')}
                              </div>
                            ) : (
                              <div>Sem detalhes.</div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setShowStatusModal(false);
                        setModalAlertErro(false);
                        setModalErroMsg('');
                        setModalMsg('');
                      }}
                      style={{
                        backgroundColor: '#000',
                        color: '#fff',
                        borderRadius: 16,
                        padding: '10px 18px',
                        border: '1px solid #000',
                        fontWeight: 700,
                        width: 120,
                        marginTop: 15,
                      }}
                    >
                      Ok
                    </button>
                  </>
                )}
              </div>
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
          </div>
            <Modal
              className="modal-confirm"
              show={showVersaoModal}
              onHide={() => setShowVersaoModal(false)}
            >
              <Modal.Header closeButton>
                <h1>Atualizar Versão</h1>
              </Modal.Header>
              <Modal.Body>
                <div className="form-cadastro-user">
                  <div className="bloco-input">
                    <div>
                      <p className="title-input" style={{ textAlign: 'justify' }}>
                        Nova versão:
                      </p>
                      <input
                        className="form-control select inputparceiro"
                        type="text"
                        value={novaVersao}
                        onChange={(e) => setNovaVersao(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="bloco-input boco-botoes-grupo" style={{ marginTop: 15 }}>
                    <button className="btn btn-cadastrar" onClick={AtualizarVersao}>
                      Salvar
                    </button>
                    <button
                      className="btn btn-cancelar"
                      onClick={() => setShowVersaoModal(false)}
                      style={{ marginLeft: 10 }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          <FooterMobile />
          <Footer />
        </>
      )}
    </>
  );
}
