import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/global.scss';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import Footer from '../../components/Footer/Footer';
import FooterMobile from '../../components/Footer/FooterMobile';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Select from 'react-select';
import api from '../../services/api';
import Alert from '../../components/Alert';
import { iDadosUsuario, iVendedores } from '../../@types';
import logoSankhya from '../../assets/logosankhya.png';
import logoAlyne from '../../assets/logo-dark.png';
import moment from 'moment';
import { cnpjMask, cpfMask, moeda } from '../../Masks/Masks';
import Paginacao from '../../components/Paginacao';

type Option = { value: number; label: string };

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

export default function AtualizacaoSankhya() {

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(30);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalAlertErro, setModalAlertErro] = useState(false);
  const [modalErroMsg, setModalErroMsg] = useState('');

  const [aba, setAba] = useState<'ORCAMENTOS' | 'RECEBER'>('ORCAMENTOS');

  const [vendedores, setVendedores] = useState<iVendedores[]>([]);
  const [vendedoresSelecionados, setVendedoresSelecionados] = useState<Option[]>(
    []
  );

  const [tabelasSelecionadas, setTabelasSelecionadas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<any>(null);

  const [showHistoricoModal, setShowHistoricoModal] = useState(false);
  const [historico, setHistorico] = useState<SankhyaAtualizacaoHistoricoItem[]>(
    []
  );
  const [historicoTotal, setHistoricoTotal] = useState(0);
  const [historicoLoading, setHistoricoLoading] = useState(false);
  const [historicoVendedor, setHistoricoVendedor] = useState<Option | null>(null);
  const [historicoInicio, setHistoricoInicio] = useState('');
  const [historicoFim, setHistoricoFim] = useState('');
  const [paginaHistorico, setPaginaHistorico] = useState(1);
  const qtdePaginaHistorico = 10;
  const historicoFiltrosKeyRef = useRef<string>('');

  type CabecalhoOrcamentoResumo = {
    id: number;
    vendedorId: number;
    pedidoId: string;
    cnpjCpf?: string | null;
    nomeParceiro?: string | null;
    data?: string | null;
    valor?: number | null;
    filial?: string | null;
    tipoNegociacaoId?: number | null;
    tipPed?: string | null;
    ativo?: string | null;
  };
  type ItemOrcamento = {
    id: number;
    produtoId: number;
    produto?: { id: number; nome?: string | null } | null;
    quant?: number | null;
    valUnit?: number | null;
    valTotal?: number | null;
    filial?: string | null;
    inativo?: string | null;
    baixado?: string | null;
  };
  type OrcamentoDetalhe = {
    cabecalho: CabecalhoOrcamentoResumo;
    itens: ItemOrcamento[];
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

  const fecharStatusModal = () => {
    if (loading) return;
    setShowStatusModal(false);
    setModalAlertErro(false);
    setModalErroMsg('');
    setModalMsg('');
  };

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

  const carregarVendedores = async () => {
    try {
      const response = await api.get('/api/Vendedor?pagina=1&totalpagina=9999');
      setVendedores((response?.data?.data ?? []) as iVendedores[]);
    } catch (e: any) {
      setAlertErro(true);
      setMsgErro('Erro ao carregar vendedores.');
    }
  };

  const mapVendedorNome = useMemo(() => {
    const m = new Map<number, string>();
    for (const v of vendedores || []) {
      m.set(Number(v.id), String(v.nome));
    }
    return m;
  }, [vendedores]);

  const [listaOrcamentos, setListaOrcamentos] = useState<CabecalhoOrcamentoResumo[]>([]);
  const [listaLoading, setListaLoading] = useState(false);
  const [paginaList, setPaginaList] = useState(1);
  const [qtdePaginaList, setQtdePaginaList] = useState(10);
  const [totalPaginasList, setTotalPaginasList] = useState(0);

  const carregarListaOrcamentos = async (paginaBusca?: number) => {
    setListaLoading(true);
    setListaOrcamentos([]);
    try {
      const pag = paginaBusca || paginaList;
      const response = await api.get(`/api/CabecalhoOrcamento?pagina=${pag}&totalpagina=${qtdePaginaList}`);
      const dados = (response?.data?.data ?? []) as CabecalhoOrcamentoResumo[];
      const total = Number(response?.data?.total ?? 0);
      const somenteAtivos = (dados || []).filter(
        (d) => String(d?.ativo ?? 'S').toUpperCase() !== 'N'
      );
      setListaOrcamentos(somenteAtivos);
      const maxPages = Math.ceil(total / qtdePaginaList);
      setTotalPaginasList(maxPages);
    } catch {
      setListaOrcamentos([]);
    } finally {
      setListaLoading(false);
    }
  };

  useEffect(() => {
    if (aba === 'ORCAMENTOS') {
      carregarListaOrcamentos();
    }
  }, [aba, paginaList, qtdePaginaList]);

  const [showDetalheSelecionado, setShowDetalheSelecionado] = useState(false);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState<CabecalhoOrcamentoResumo | null>(null);
  const [itensSelecionados, setItensSelecionados] = useState<ItemOrcamento[]>([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [orcamentoTransfer, setOrcamentoTransfer] = useState<CabecalhoOrcamentoResumo | null>(null);

  const selecionarOrcamento = async (pedidoId: string) => {
    try {
      const resp = await api.get(`/api/CabecalhoOrcamento/pedidoId/${encodeURIComponent(pedidoId)}`);
      const cab = resp?.data?.cabecalho as CabecalhoOrcamentoResumo;
      const itens = (resp?.data?.itens ?? []) as ItemOrcamento[];
      setOrcamentoSelecionado(cab);
      setItensSelecionados(itens);
      setShowDetalheSelecionado(true);
    } catch {
      setOrcamentoSelecionado(null);
      setItensSelecionados([]);
    }
  };

  const docMask = (doc?: string | null) => {
    const v = String(doc || '').trim();
    if (v.length <= 11) return cpfMask(v);
    return cnpjMask(v);
  };

  const validarParceiroPorCnpj = async (cnpj: string) => {
    const cnpjLimpo = String(cnpj || '').replace(/\D/g, '');
    const resp = await api.get(`/api/Parceiro/filter?pagina=1&totalpagina=50&filter=${cnpjLimpo}`);
    const lista = (resp?.data?.data ?? []) as any[];
    const encontrado = lista.find((p) => String(p?.cnpj_Cpf || p?.Cnpj_Cpf || '').replace(/\D/g, '') === cnpjLimpo);
    return encontrado || null;
  };

  const abrirTransferencia = async (orc: CabecalhoOrcamentoResumo) => {
    try {
      setAlertErro(false);
      setMsgErro('');
      const doc = String(orc?.cnpjCpf || '').replace(/\D/g, '');
      if (!doc) {
        setAlertErro(true);
        setMsgErro('Documento do orçamento vazio.');
        return;
      }
      const parceiro = await validarParceiroPorCnpj(String(orc.cnpjCpf || ''));
      if (!parceiro) {
        setAlertErro(true);
        setMsgErro('Parceiro não cadastrado.');
        return;
      }
      const ativoRaw = String(parceiro?.ativo ?? parceiro?.Ativo ?? parceiro?.status ?? parceiro?.Status ?? '').trim().toUpperCase();
      const isAtivo = ativoRaw === 'S' || ativoRaw === 'ATIVO' || ativoRaw === '1' || ativoRaw === 'TRUE';
      if (!isAtivo) {
        setAlertErro(true);
        setMsgErro('Parceiro inativo.');
        return;
      }
      setOrcamentoTransfer(orc);
      setShowTransferModal(true);
    } catch (e: any) {
      setAlertErro(true);
      setMsgErro(getAxiosErrorMessage(e));
    }
  };

  const transferirOrcamento = async (status: 'Não Enviado' | 'AProcessar') => {
    if (!orcamentoTransfer) return;
    try {
      setAlertErro(false);
      setMsgErro('');
      const parceiro = await validarParceiroPorCnpj(String(orcamentoTransfer.cnpjCpf || ''));
      if (!parceiro) {
        setAlertErro(true);
        setMsgErro('Parceiro não cadastrado.');
        return;
      }
      const detResp = await api.get(`/api/CabecalhoOrcamento/pedidoId/${encodeURIComponent(String(orcamentoTransfer.pedidoId))}`);
      const cab = detResp?.data?.cabecalho as CabecalhoOrcamentoResumo;
      const itens = (detResp?.data?.itens ?? []) as ItemOrcamento[];
      const agora = new Date();
      const dia = String(agora.getDate()).padStart(2, '0');
      const mes = String(agora.getMonth() + 1).padStart(2, '0');
      const anoFinal = String(agora.getFullYear()).slice(-2);
      const hora = String(agora.getHours()).padStart(2, '0');
      const minutos = String(agora.getMinutes()).padStart(2, '0');
      const segundos = String(agora.getSeconds()).padStart(2, '0');
      const dataFilt = `${dia}${mes}${anoFinal}${hora}${minutos}${segundos}`;
      const vendedorIdGeracao = Number(cab?.vendedorId || (orcamentoTransfer as any)?.vendedorId || usuario.username || 0);
      const pal = `${vendedorIdGeracao}${dataFilt}`;
      const itensParaEnvio = itens.map((i) => ({
        produtoId: Number(i.produtoId),
        quant: Number(i.quant || 0),
        valUnit: Number(i.valUnit || 0),
        valTotal: Number(i.valTotal || 0),
        palMPV: pal,
        filial: String(i.filial || cab.filial || '1'),
        inativo: String(i.inativo || 'N').toUpperCase() === 'S' ? 'S' : 'N',
        baixado: String(i.baixado || 'N'),
      }));
      const quantItensAtivos = itensParaEnvio.filter((i) => String(i.inativo || 'N').toUpperCase() !== 'S').length;
      const dataAtual = moment().toDate();
      const dataIso = moment(dataAtual).toISOString();
      const cabecalhoPedidoVenda = {
        vendedorId: Number(cab?.vendedorId || usuario.username || 0),
        parceiroId: Number(parceiro?.id ?? parceiro?.Id ?? 0),
        filial: String(cab?.filial || '1'),
        palMPV: pal,
        status: status,
        tipPed: String(cab?.tipPed || '1'),
        tipoNegociacaoId: Number(cab?.tipoNegociacaoId || parceiro?.tipoNegociacao || parceiro?.TipoNegociacao || 0),
        data: dataIso,
        pedido: '',
        valor: Number(cab?.valor || 0),
        dataEntrega: String(cab?.data || dataIso),
        observacao: String(cab?.nomeParceiro || ''),
        ativo: 'S',
        versao: '',
        Quant_Itens: quantItensAtivos,
        quant_Itens: quantItensAtivos,
        Log_Envio: null,
        log_Envio: null,
      };
      await api.post('/api/CabecalhoPedidoVenda/envio', {
        CabecalhoPedidoVenda: cabecalhoPedidoVenda,
        ItensPedidoVenda: itensParaEnvio,
        Envio: status === 'AProcessar',
      });

      try {
        await api.put(`/api/CabecalhoOrcamento/pedidoId/${encodeURIComponent(String(orcamentoTransfer.pedidoId))}/cancelar`);
      } catch {
        setAlertErro(true);
        setMsgErro('Pedido criado, mas não foi possível inativar o orçamento.');
        setShowTransferModal(false);
        setOrcamentoTransfer(null);
        await carregarListaOrcamentos(1);
        setPaginaList(1);
        return;
      }

      setShowTransferModal(false);
      setOrcamentoTransfer(null);
      await carregarListaOrcamentos(1);
      setPaginaList(1);
      setAlertErro(true);
      setMsgErro(status === 'AProcessar' ? 'Pedido enviado para processamento.' : 'Pedido salvo como Não Enviado.');
    } catch (e: any) {
      setAlertErro(true);
      setMsgErro(getAxiosErrorMessage(e));
    }
  };

  const executarAtualizacao = async () => {
    setAlertErro(false);
    setMsgErro('');
    setResultado(null);
    setModalAlertErro(false);
    setModalErroMsg('');

    if (tabelasSelecionadas.length === 0) {
      setAlertErro(true);
      setMsgErro('Selecione ao menos uma tabela.');
      return;
    }

    const vendedorIds = (vendedoresSelecionados || [])
      .map((v) => Number(v.value))
      .filter((v) => v > 0);

    setShowStatusModal(true);
    setModalMsg('Atualizando dados...');
    setSucess(20);
    let progressTimer: any = null;
    progressTimer = setInterval(() => {
      setSucess((p) => {
        if (p >= 90) return 90;
        return p + 5;
      });
    }, 500);

    try {
      setLoading(true);
      const response = await api.post('/api/SankhyaAtualizacao/executar', {
        tabelas: tabelasSelecionadas,
        vendedorIds,
      });
      setResultado(response?.data ?? null);
      setSucess(100);
      const falha = Number(response?.data?.falha ?? 0);
      if (falha > 0) setModalMsg('Atualização concluída com falhas.');
      else setModalMsg('Atualização concluída com sucesso.');

    } catch (e: any) {
      setModalMsg('Erro ao atualizar dados.');
      setModalAlertErro(true);
      setModalErroMsg(getAxiosErrorMessage(e));
    } finally {
      if (progressTimer) clearInterval(progressTimer);
      setLoading(false);
      setTimeout(() => setSucess(30), 500);
    }
  };

  useEffect(() => {
    carregarVendedores();
  }, []);

  return (
    <>
      <Modal
        className="modal-confirm"
        show={showStatusModal}
        onHide={fecharStatusModal}
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
            {loading ? (
              <ProgressBar className="progress" animated now={sucess} />
            ) : (
              <>
                {resultado && (
                  <div style={{ fontSize: 14, marginTop: 10 }}>
                    <div>Execuções: {resultado?.totalExecucoes ?? 0}</div>
                    <div>Sucesso: {resultado?.sucesso ?? 0}</div>
                    <div>Falha: {resultado?.falha ?? 0}</div>
                    {Number(resultado?.falha ?? 0) > 0 && (
                      <div style={{ marginTop: 10, color: '#b00020' }}>
                        <div style={{ fontWeight: 700 }}>Erros:</div>
                        {(extrairErrosResultado(resultado) || []).length ? (
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            {(extrairErrosResultado(resultado) || []).join('\n')}
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
                  onClick={fecharStatusModal}
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

      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="">
            <SideNavBar />
          </div>
          <NavbarDashHeader />
          <div className="titulo-page">
            <h1>Gerência Comercial</h1>
          </div>
          <div className="contain">
            <div className="conteudo">
              {/* Mensagens agora usam modal padrão com logo Alyne */}

              <Nav variant="tabs" activeKey={aba} onSelect={(k) => setAba((k as any) || 'ORCAMENTOS')} style={{ marginBottom: 12 }}>
                <Nav.Item>
                  <Nav.Link eventKey="ORCAMENTOS">Gerenciamento de Orçamentos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="RECEBER">Receber dados Sankhya</Nav.Link>
                </Nav.Item>
              </Nav>

              {aba === 'ORCAMENTOS' ? (
                <div className="divApontamento">
                  <div className="table-responsive tabela-responsiva-pedido-realizado">
                    <div className="table-wrap">
                      <Table responsive className="table-global table  main-table">
                        <thead>
                          <tr className="tituloTab">
                            <th>Vendedor</th>
                            <th style={{ textAlign: 'center' }}>CNPJ</th>
                            <th style={{ textAlign: 'center' }}>Data</th>
                            <th style={{ textAlign: 'right' }}>Valor</th>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaLoading ? (
                            <tr>
                              <td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <h1 style={{ marginTop: 15 }}>Carregando...</h1>
                                  <div className="spinner-border" role="status" />
                                </div>
                              </td>
                            </tr>
                          ) : (listaOrcamentos || []).length > 0 ? (
                            <>
                              {listaOrcamentos.map((o) => (
                                <tr key={o.id}>
                                  <td>{mapVendedorNome.get(Number(o.vendedorId)) || o.vendedorId}</td>
                                  <td style={{ textAlign: 'center' }}>{o.cnpjCpf ? docMask(String(o.cnpjCpf)) : ''}</td>
                                  <td style={{ textAlign: 'center' }}>
                                    {o.data ? moment(o.data).format('DD/MM/YYYY HH:mm') : ''}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {moeda(Number(o.valor || 0))}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                                      <button
                                        className="btn btn-sm"
                                        style={{ backgroundColor: '#fff', color: '#000', border: '1px solid #000' }}
                                        onClick={() => selecionarOrcamento(String(o.pedidoId))}
                                      >
                                        Visualizar
                                      </button>
                                      <button
                                        className="btn btn-dark btn-sm"
                                        onClick={() => abrirTransferencia(o)}
                                      >
                                        Transf. Pedido
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <tr>
                              <td colSpan={4} style={{ textAlign: 'center', padding: 18 }}>
                                Nenhum orçamento encontrado.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      <Paginacao
                        total={totalPaginasList * qtdePaginaList}
                        limit={qtdePaginaList}
                        paginaAtual={paginaList}
                        setPagina={setPaginaList}
                        maxPaginas={totalPaginasList}
                      />
                    </div>
                  </div>
                </div>
              ) : (
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
                          disabled={loading}
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
                          {loading ? 'Atualizando...' : 'Atualizar'}
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

                    {resultado && (
                      <div style={{ marginTop: 18 }}>
                        <h1 className="title-input">Resultado:</h1>
                        <div style={{ fontSize: 14 }}>
                          <div>Execuções: {resultado?.totalExecucoes ?? 0}</div>
                          <div>Sucesso: {resultado?.sucesso ?? 0}</div>
                          <div>Falha: {resultado?.falha ?? 0}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
                    return (
                      <tr key={h.id}>
                        <td>
                          {h.createdAtIso
                            ? moment(h.createdAtIso).format('DD/MM/YYYY HH:mm')
                            : ''}
                        </td>
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
        show={showDetalheSelecionado}
        onHide={() => setShowDetalheSelecionado(false)}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h1>PEDIDO SELECIONADO</h1>
        </Modal.Header>
        <Modal.Body>
          {orcamentoSelecionado ? (
            <>
              <div className="row">
                <div className="col-md-4">
                  <div>
                    <strong>PedidoId:</strong> {orcamentoSelecionado.pedidoId}
                  </div>
                  <div>
                    <strong>Cliente:</strong> {orcamentoSelecionado.nomeParceiro || ''}
                  </div>
                  <div>
                    <strong>Cnpj:</strong>{' '}
                    {orcamentoSelecionado.cnpjCpf ? docMask(String(orcamentoSelecionado.cnpjCpf)) : ''}
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <strong>Data:</strong>{' '}
                    {orcamentoSelecionado.data
                      ? moment(orcamentoSelecionado.data).format('DD/MM/YYYY HH:mm')
                      : ''}
                  </div>
                  <div>
                    <strong>Total:</strong> {moeda(Number(orcamentoSelecionado.valor || 0))}
                  </div>
                </div>
                <div
                  className="col-md-4 d-flex"
                  style={{
                    gap: 8,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                  }}
                >
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setShowDetalheSelecionado(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Descrição</th>
                      <th style={{ textAlign: 'right' }}>Qtd</th>
                      <th style={{ textAlign: 'right' }}>Vlr Unit</th>
                      <th style={{ textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(itensSelecionados) ? itensSelecionados : []).map((it: any) => (
                      <tr key={it.id}>
                        <td>{it.produtoId}</td>
                        <td>{it?.produto?.nome || ''}</td>
                        <td style={{ textAlign: 'right' }}>{it.quant}</td>
                        <td style={{ textAlign: 'right' }}>{moeda(Number(it.valUnit || 0))}</td>
                        <td style={{ textAlign: 'right' }}>{moeda(Number(it.valTotal || 0))}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 18 }}>Nenhum orçamento selecionado.</div>
          )}

          <button
            style={{ width: 130, marginTop: 15 }}
            className="btn btn-primary"
            onClick={() => setShowDetalheSelecionado(false)}
          >
            Sair
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        className="modal-confirm"
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        backdrop="static"
        centered
      >
        <Modal.Body>
          <div className="div-sankhya">
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1>Transferir Orçamento para Pedido</h1>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
              <button
                type="button"
                onClick={() => transferirOrcamento('Não Enviado')}
                className="btn btn-outline-dark"
              >
                Salvar como não Enviado
              </button>
              <button
                type="button"
                onClick={() => transferirOrcamento('AProcessar')}
                className="btn btn-dark"
              >
                Enviar
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowTransferModal(false)}
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
              Sair
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="modal-confirm"
        show={alertErro}
        onHide={() => setAlertErro(false)}
        backdrop="static"
      >
        <Modal.Body>
          <div className="div-sankhya">
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 className="super-texto3">{msgErro}</h1>
            <button
              style={{ width: 130, marginTop: 10 }}
              className="btn btn-primary"
              onClick={() => setAlertErro(false)}
            >
              Ok
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <FooterMobile />
      <Footer />
    </>
  );
}
