import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/global.scss';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import api from '../../services/api';
import logoAlyne from '../../assets/logo-dark.png';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { moeda, cnpjMask, cpfMask } from '../../Masks/Masks';
import {
  iDadosUsuario,
  iDataSelect,
  iEmpresa,
  IItemTabelaPreco,
  iTipoNegociacao,
} from '../../@types';
import Paginacao from '../../components/Paginacao/index';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { RiAddLine, RiDeleteBin5Line } from 'react-icons/ri';
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import moment from 'moment-timezone';
import { versaoFront } from '../../data/indexedDB';
import ExcelJS from 'exceljs';

type ItemOrcamentoDraft = {
  produtoId: number;
  descProduto: string;
  quant: number;
  valUnit: number;
  valTotal: number;
  inativo?: string;
  produto: {
    aliIpi: number;
    tipoUnid: string;
    tipoUnid2: string;
    conv: number;
    nome: string;
  };
};

type CabecalhoOrcamentoResumo = {
  id: number;
  pedidoId: string;
  nomeParceiro?: string;
  data?: string;
  valor?: number;
  status?: string;
  ativo?: string;
};

type CabecalhoOrcamentoDetalhe = {
  id: number;
  filial?: string;
  vendedorId: number;
  pedidoId: string;
  tipoNegociacaoId: number;
  tabelaPrecoId?: number;
  cnpjCpf?: string;
  nomeParceiro?: string;
  endParceiro?: string;
  numeroEnd?: string;
  complementoEnd?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  data?: string;
  valor?: number;
  dataEntrega?: string;
  observacao?: string;
  status?: string;
  ativo?: string;
};

export default function Orcamento() {
  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [tituloAviso, setTituloAviso] = useState('Aviso');
  const [acaoDepoisAviso, setAcaoDepoisAviso] = useState<'pdf' | null>(null);
  const [showloading, setShowloading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [empresaSelect, setEmpresaSelect] = useState<iEmpresa[]>([]);
  const [tabelaSelect, setTabelaSelect] = useState<iDataSelect[]>([]);
  const [tipoNegociacaoSelect, setTipoNegociacaoSelect] = useState<iDataSelect[]>([]);

  const [empresaId, setEmpresaId] = useState<number | null>(null);
  const [canal, setCanal] = useState<
    '' | 'ATACADO' | 'LOJ_ESP' | 'VAREJO' | 'DISTRIBUIDORA' | 'LICITACAO' | 'OUTROS'
  >('');
  const [regionalVendedor, setRegionalVendedor] = useState('');
  const [tabelaPrecoId, setTabelaPrecoId] = useState<number | null>(null);
  const [tipoNegociacaoId, setTipoNegociacaoId] = useState<number | null>(null);

  const [pedidoId, setPedidoId] = useState('');
  const [dataEntrega, setDataEntrega] = useState(moment().format('YYYY-MM-DD'));
  const [observacao, setObservacao] = useState('');

  const [cnpjCpf, setCnpjCpf] = useState('');
  const [nomeParceiro, setNomeParceiro] = useState('');
  const [endParceiro, setEndParceiro] = useState('');
  const [numeroEnd, setNumeroEnd] = useState('');
  const [complementoEnd, setComplementoEnd] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');

  const [isMobile, setIsMobile] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaCod, setPesquisaCod] = useState(false);
  const [pesquisaGrupo, setPesquisaGrupo] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [grupoPesquisa, setGrupoPesquisa] = useState<iDataSelect[]>([]);

  const [itensTabela, setItensTabela] = useState<IItemTabelaPreco[]>([]);
  const [itensTabelaGeral, setItensTabelaGeral] = useState<IItemTabelaPreco[]>([]);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [itensOrcamento, setItensOrcamento] = useState<ItemOrcamentoDraft[]>([]);
  const [itensDoPedido, setItensDoPedido] = useState(0);

  const [adicionandoItem, setAdicionandoItem] = useState(false);
  const [addItem, setAddItem] = useState(true);
  const [emUso, setEmUso] = useState(false);

  const [produtoId, setProdutoId] = useState(0);
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorItem, setValorItem] = useState(0);
  const [valorUnitario, setValorUnitario] = useState(0);
  const [quantItem, setQuantItem] = useState('');
  const [unidade1, setUnidade1] = useState('');
  const [unidade2, setUnidade2] = useState('');
  const [unidadeEscolhida, setUnidadeEscolhida] = useState('');
  const [quantUnid, setQuantUnid] = useState(0);
  const [mult, setMult] = useState(false);
  const [aliIpi, setaliIpi] = useState(0);

  const [listaOrcamentos, setListaOrcamentos] = useState<CabecalhoOrcamentoResumo[]>([]);
  const [listaLoading, setListaLoading] = useState(false);
  const [showlistaOrcamentos, setShowlistaOrcamentos] = useState(false);
  const [paginaList, setPaginaList] = useState(1);
  const [qtdePaginaList, setQtdePaginaList] = useState(10);
  const [totalPaginasList, setTotalPaginasList] = useState(0);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState<CabecalhoOrcamentoDetalhe | null>(null);
  const [itensSelecionados, setItensSelecionados] = useState<any[]>([]);
  const [showDetalheSelecionado, setShowDetalheSelecionado] = useState(false);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [orcamentoPdf, setOrcamentoPdf] = useState<CabecalhoOrcamentoDetalhe | null>(null);
  const [itensPdf, setItensPdf] = useState<any[]>([]);

  const totalOrcamento = useMemo(() => {
    return itensOrcamento
      .filter((it) => String(it?.inativo || 'N').toUpperCase() !== 'S')
      .reduce((acc, it) => acc + (Number(it.valTotal) || 0), 0);
  }, [itensOrcamento]);

  const valorTotalComIpi = useMemo(() => {
    const aplicaIpi = Number(empresaId || 0) === 1;
    return itensOrcamento
      .filter((it) => String(it?.inativo || 'N').toUpperCase() !== 'S')
      .reduce((acc, it) => {
        const base = Number(it.valTotal || 0);
        if (!aplicaIpi) return acc + base;
        const ipi = Number(it?.produto?.aliIpi || 0);
        if (!ipi) return acc + base;
        return acc + base + base * (ipi / 100);
      }, 0);
  }, [itensOrcamento, empresaId]);

  const canalPrefixo = useMemo(() => {
    if (canal === 'ATACADO') return 'A2';
    if (canal === 'LOJ_ESP') return 'E3';
    if (canal === 'VAREJO') return 'V2';
    if (canal === 'DISTRIBUIDORA') return 'D3';
    if (canal === 'LICITACAO') return 'D3';
    if (canal === 'OUTROS') return 'V2';
    return '';
  }, [canal]);

  const regionalFiltroSigla = useMemo(() => {
    const s = String(regionalVendedor || '').trim();
    const m = /\((CE|NE|NO|SU)\)\s*$/i.exec(s);
    return m ? String(m[1] || '').toUpperCase() : '';
  }, [regionalVendedor]);

  const permiteTodasTabelasPorRegional = useMemo(() => {
    const s = String(regionalVendedor || '').trim();
    const norm = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    return norm.includes('VENDAS INTERNAS') || norm.includes('VENDAS INTER');
  }, [regionalVendedor]);

  const ufPermitidasPorRegional = useMemo(() => {
    return {
      CE: new Set(['CE']),
      NE: new Set(['AL', 'BA', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE']),
      NO: new Set(['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO']),
      SU: new Set(['PR', 'SC', 'RS']),
    } as const;
  }, []);

  function getRegionalPorUf(ufValue: string) {
    const ufCli = String(ufValue || '').trim().toUpperCase();
    if (!ufCli || ufCli.length !== 2) return '';
    const mapa = ufPermitidasPorRegional as any;
    const entries = Object.entries(mapa) as Array<[string, Set<string>]>;
    for (const [sigla, set] of entries) {
      if (set?.has?.(ufCli)) return sigla;
    }
    return '';
  }

  function validarUfParceiroPorRegional() {
    const sigla = String(regionalFiltroSigla || '').trim().toUpperCase();
    const ufCli = String(uf || '').trim().toUpperCase();
    if (!ufCli || ufCli.length !== 2) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('UF do cliente é obrigatória.');
      document.getElementById('ufParceiro')?.focus();
      return false;
    }
    if (permiteTodasTabelasPorRegional) return true;
    if (!sigla) return true;
    const mapa = ufPermitidasPorRegional as any;
    const permitidas: Set<string> | undefined = mapa?.[sigla];
    if (!permitidas) return true;
    if (!permitidas.has(ufCli)) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro(`Cliente UF (${ufCli}) não pertence à sua regional (${sigla}).`);
      document.getElementById('ufParceiro')?.focus();
      return false;
    }
    return true;
  }

  const empresaSelectFiltrada = useMemo(() => {
    const base = Array.isArray(empresaSelect) ? empresaSelect : [];
    if (permiteTodasTabelasPorRegional) return base;
    if (!regionalFiltroSigla) return base;
    if (!['CE', 'NE', 'NO'].includes(regionalFiltroSigla)) return base;
    return base.filter((e) => Number(e?.id) !== 3);
  }, [empresaSelect, permiteTodasTabelasPorRegional, regionalFiltroSigla]);

  const tabelaSelectFiltrada = useMemo(() => {
    const emp = Number(empresaId || 0);
    if (!emp) return [];
    const base = Array.isArray(tabelaSelect) ? tabelaSelect : [];
    const prefixoEmpresa = String(emp);
    const baseEmpresa = base.filter((t) =>
      String(t?.value || '').startsWith(prefixoEmpresa)
    );

    const prefixCanal = String(canalPrefixo || '').trim().toUpperCase();
    const baseCanal = !prefixCanal
      ? baseEmpresa
      : baseEmpresa.filter((t) => {
          const label = String(t?.label || '').trim().toUpperCase();
          const desc = label.includes(' - ')
            ? label.split(' - ').slice(1).join(' - ').trim()
            : label.trim();
          const baseDesc = desc || label;
          return baseDesc.startsWith(prefixCanal);
        });

    if (permiteTodasTabelasPorRegional) {
      const siglaCliente = getRegionalPorUf(uf);
      if (!siglaCliente) return [];
      const terminaComRegionalCliente = (t: iDataSelect) => {
        const label = String(t?.label || '').trim().toUpperCase();
        const desc = label.includes(' - ')
          ? label.split(' - ').slice(1).join(' - ').trim()
          : label.trim();
        const baseDesc = desc || label;
        return new RegExp(`\\(${siglaCliente}\\)\\s*$`, 'i').test(baseDesc);
      };
      return baseCanal.filter(terminaComRegionalCliente);
    }
    const sigla = String(regionalFiltroSigla || '').trim().toUpperCase();
    if (!sigla) return baseCanal;

    const terminaComRegional = (t: iDataSelect) => {
      const label = String(t?.label || '').trim().toUpperCase();
      const desc = label.includes(' - ')
        ? label.split(' - ').slice(1).join(' - ').trim()
        : label.trim();
      const baseDesc = desc || label;
      return new RegExp(`\\(${sigla}\\)\\s*$`, 'i').test(baseDesc);
    };

    return baseCanal.filter(terminaComRegional);
  }, [tabelaSelect, empresaId, canalPrefixo, permiteTodasTabelasPorRegional, regionalFiltroSigla, uf]);

  useEffect(() => {
    const codVendedor = String(usuariolog?.username || '').trim();
    const codVendedorNum = Number(codVendedor);
    if (!codVendedor || !Number.isFinite(codVendedorNum)) return;
    (async () => {
      try {
        const sql = `SELECT TOP 1
          COALESCE(LTRIM(RTRIM(GER.APELIDO)), LTRIM(RTRIM(VDO.APELIDO)), '') AS REGIONAL
        FROM TGFVEN VDO (NOLOCK)
        LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
        WHERE VDO.CODVEND = ${codVendedorNum}`;
        const resp = await api.post(
          `/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`
        );
        const rows = (resp as any)?.data?.responseBody?.rows || [];
        const regional = rows?.[0]?.[0] ?? '';
        setRegionalVendedor(String(regional || '').trim());
      } catch {}
    })();
  }, [usuariolog?.username]);

  useEffect(() => {
    if (permiteTodasTabelasPorRegional) return;
    if (!regionalFiltroSigla) return;
    if (Number(empresaId || 0) !== 3) return;
    setEmpresaId(null);
    setCanal('');
    setTabelaPrecoId(null);
  }, [permiteTodasTabelasPorRegional, regionalFiltroSigla, empresaId]);

  useEffect(() => {
    if (!empresaId || !canal) {
      if (tabelaPrecoId !== null) setTabelaPrecoId(null);
      return;
    }
    if (
      tabelaPrecoId &&
      !tabelaSelectFiltrada.some((x) => Number(x.value) === tabelaPrecoId)
    ) {
      setTabelaPrecoId(null);
    }
  }, [empresaId, canal, tabelaPrecoId, tabelaSelectFiltrada]);

  useEffect(() => {
    if (!modoEdicao || canal) return;
    if (!empresaId || !tabelaPrecoId) return;
    const opt =
      tabelaSelect.find((x) => Number(x.value) === Number(tabelaPrecoId)) || null;
    if (!opt) return;
    const label = String(opt.label || '').trim().toUpperCase();
    const desc = label.includes(' - ')
      ? label.split(' - ').slice(1).join(' - ').trim()
      : label.trim();
    const base = desc || label;
    if (base.startsWith('A2')) setCanal('ATACADO');
    else if (base.startsWith('E3')) setCanal('LOJ_ESP');
    else if (base.startsWith('D3')) setCanal('DISTRIBUIDORA');
    else if (base.startsWith('V2')) setCanal('VAREJO');
  }, [modoEdicao, canal, empresaId, tabelaPrecoId, tabelaSelect]);

  useEffect(() => {
    const ativos = itensOrcamento.filter((it) => String(it?.inativo || 'N').toUpperCase() !== 'S').length;
    setItensDoPedido(ativos);
  }, [itensOrcamento]);

  const stylesPdf = useMemo(
    () =>
      StyleSheet.create({
        body: {
          paddingTop: 23,
          paddingBottom: 57,
          paddingHorizontal: 18,
        },
        container: {
          border: 1,
          borderColor: 'black',
          padding: 5,
          width: '100%',
          height: 'auto',
        },
        containertITULO: {
          border: 1,
          borderColor: 'black',
          padding: 5,
          width: '100%',
          height: 'auto',
          backgroundColor: '#9E9E9E',
        },
        pageNumber: {
          position: 'absolute',
          fontSize: 9,
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: 'grey',
        },
        textoPeddo: {
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
        },
        textoData: {
          fontSize: 10,
          textAlign: 'left',
        },
        colunaDupla: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        Titulo: {
          fontWeight: 'bold',
          fontSize: 10,
          marginBottom: 5,
        },
        textoComun: {
          fontSize: 10,
          marginBottom: 5,
        },
        TitulotABLE: {
          fontWeight: 'bold',
          fontSize: 12,
          textAlign: 'center',
        },
        table: {
          display: 'table' as any,
          width: '100%',
          borderStyle: 'solid',
          borderColor: '#000',
          marginBottom: 15,
          borderCollapse: 'collapse',
        },
        tableRow: {
          flexDirection: 'row',
          borderBottomColor: '#000',
          alignItems: 'center',
        },
        tableHeader: {
          backgroundColor: '#ccc',
          fontWeight: 'bold',
          fontSize: 9,
          textAlign: 'center',
        },
        tableCell: {
          padding: 3,
          paddingBottom: 1,
          fontSize: 8,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#000',
        },
        tableCellFim: {
          fontSize: 8,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#000',
        },
      }),
    []
  );

  const dataEmissao = new Date();
  const emissao = `${dataEmissao.getDate()}/${dataEmissao.getMonth() + 1}/${dataEmissao.getFullYear()} ${dataEmissao.getHours()}:${dataEmissao.getMinutes()}`;
  const emissaoData = `${dataEmissao.getDate()}/${dataEmissao.getMonth() + 1}/${dataEmissao.getFullYear()}`;

  const PdfDoc = () => {
    const cab = orcamentoPdf || orcamentoSelecionado;
    const itens = Array.isArray(itensPdf) && itensPdf.length > 0 ? itensPdf : Array.isArray(itensSelecionados) ? itensSelecionados : [];
    const aplicaIpiCab = Number(cab?.filial || 0) === 1;
    const totalProdutos = itens.reduce((acc, it) => acc + (Number(it?.valTotal) || 0), 0);
    const totalIpi = itens.reduce((acc, it) => {
      if (!aplicaIpiCab) return acc;
      const base = Number(it?.valTotal) || 0;
      const ipiAli = Number(it?.produto?.aliIpi) || 0;
      if (!ipiAli) return acc;
      return acc + base * (ipiAli / 100);
    }, 0);
    const valorLiquido = totalProdutos + totalIpi;
    const quantItens = itens.length;
    return (
      <Document>
        <Page style={stylesPdf.body}>
          <View style={stylesPdf.container}>
            <Text style={stylesPdf.textoData}>Emissão: {emissao}</Text>
            <Text style={stylesPdf.textoPeddo}>ORÇAMENTO PARA CLIENTES NÃO CADASTRADOS</Text>
          </View>

          <View style={stylesPdf.container}>
            <View style={stylesPdf.colunaDupla}>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>Empresa:</Text>{' '}
                CIGEL INDUSTRIAL LTDA
              </Text>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>Vendedor:</Text>{' '}
                {usuariolog.username} - {usuariolog.nomeCompleto}
              </Text>
            </View>
            <View style={stylesPdf.colunaDupla}>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>Nº. Orçamento:</Text>{' '}
                {cab?.pedidoId || ''}
              </Text>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>Dt. Neg.:</Text>{' '}
                {cab?.data ? moment(cab.data).format('DD/MM/YYYY') : emissaoData}
              </Text>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>Dt. Disp. Fat.:</Text>{' '}
                {cab?.data ? moment(cab.data).format('DD/MM/YYYY') : emissaoData}
              </Text>
            </View>
          </View>

          <View style={stylesPdf.container}>
            <Text style={stylesPdf.textoComun}>
              <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>CLIENTE:</Text>{' '}
              {cab?.nomeParceiro || ''}
            </Text>
            <View style={stylesPdf.colunaDupla}>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>CPF/CNPJ:</Text>{' '}
                {cab?.cnpjCpf ? docMask(String(cab.cnpjCpf)) : ''}
              </Text>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>IE:</Text>{' '}
              </Text>
            </View>
            <View style={stylesPdf.colunaDupla}>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>END.:</Text>{' '}
                {cab?.endParceiro || ''} {cab?.numeroEnd || ''}{cab?.complementoEnd ? `, ${cab.complementoEnd}` : ''}
              </Text>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>BAIRRO:</Text>{' '}
                {cab?.bairro || ''}
              </Text>
            </View>
            <View style={stylesPdf.colunaDupla}>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>CIDADE:</Text>{' '}
                {cab?.cidade || ''} {cab?.uf ? `- ${cab.uf}` : ''}
              </Text>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>CEP:</Text>{' '}
                {cab?.cep ? cepMaskPonto(String(cab.cep)) : ''}
              </Text>
            </View>
            <View style={stylesPdf.colunaDupla}>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>FONE:</Text>{' '}
              </Text>
              <Text style={stylesPdf.textoComun}>
                <Text style={[stylesPdf.Titulo, { fontWeight: 'bold' }]}>EMAIL:</Text>{' '}
              </Text>
            </View>
          </View>

          <View style={stylesPdf.containertITULO}>
            <Text style={stylesPdf.TitulotABLE}>LISTA DE PRODUTOS</Text>
          </View>

          <View>
            <View style={[stylesPdf.tableRow, stylesPdf.tableHeader]}>
              <Text style={[stylesPdf.tableCell, { width: '8%', borderRightWidth: 1, textAlign: 'center' }]}>
                CÓDIGO
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '50%', borderRightWidth: 1, textAlign: 'center' }]}>
                DESCRIÇÃO
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '5%', borderRightWidth: 1, textAlign: 'center' }]}>
                UN
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '5%', borderRightWidth: 1, textAlign: 'center' }]}>
                QTD.
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '10%', borderRightWidth: 1, textAlign: 'right' }]}>
                VLR. UNIT.
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '10%', textAlign: 'right' }]}>
                VLR. TOT.
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '10%', textAlign: 'right' }]}>
                VLR. IPI
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '10%', textAlign: 'right' }]}>
                VLR. LIQ.
              </Text>
            </View>

            {itens.map((produto: any, idx: number) => {
              const base = Number(produto?.valTotal || 0);
              const ipiAli = Number(produto?.produto?.aliIpi || 0);
              const ipiVlr = aplicaIpiCab && ipiAli ? base * (ipiAli / 100) : 0;
              const liq = base + ipiVlr;
              return (
                <View key={idx} style={stylesPdf.tableRow}>
                  <Text style={[stylesPdf.tableCell, { width: '8%', textAlign: 'center' }]}>
                    {produto?.produtoId ?? ''}
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '50%' }]}>
                    {produto?.produto?.nome || produto?.nomeProduto || ''}
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '5%', textAlign: 'center' }]}>UN</Text>
                  <Text style={[stylesPdf.tableCell, { width: '5%', textAlign: 'center' }]}>
                    {produto?.quant ?? ''}
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '10%', textAlign: 'right' }]}>
                    {moeda(Number(produto?.valUnit || 0))}
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '10%', textAlign: 'right' }]}>
                    {moeda(base)}
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '10%', textAlign: 'right' }]}>
                    {moeda(ipiVlr)}
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '10%', textAlign: 'right' }]}>
                    {moeda(liq)}
                  </Text>
                </View>
              );
            })}

            <View style={[stylesPdf.tableRow, stylesPdf.tableHeader]}>
              <Text style={[stylesPdf.tableCell, { width: '54.2%', textAlign: 'center', borderRightWidth: 1 }]}>
                OBSERVAÇÃO
              </Text>
              <Text style={[stylesPdf.tableCell, { width: '46.7%', textAlign: 'center' }]}>TOTAIS</Text>
            </View>
            <View style={stylesPdf.tableRow}>
              <Text style={[stylesPdf.tableCell, { width: '54.2%', height: '100%', textAlign: 'center' }]}>
                {cab?.observacao || ''}
              </Text>
              <View style={[stylesPdf.tableCellFim, { width: '46.7%' }]}>
                <View style={stylesPdf.tableRow}>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'center' }]}>
                    TOTAL PRODUTOS
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'right' }]}>
                    {moeda(totalProdutos)}
                  </Text>
                </View>
                <View style={stylesPdf.tableRow}>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'center' }]}>
                    TOTAL IPI
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'right' }]}>
                    {moeda(totalIpi)}
                  </Text>
                </View>
                <View style={stylesPdf.tableRow}>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'center' }]}>
                    VALOR LIQUIDO
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'right' }]}>
                    {moeda(valorLiquido)}
                  </Text>
                </View>
                <View style={stylesPdf.tableRow}>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'center' }]}>
                    Quant. Itens
                  </Text>
                  <Text style={[stylesPdf.tableCell, { width: '50%', textAlign: 'right' }]}>
                    {String(quantItens)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const PdfDownloadButton = ({ loading }: any) => (
    <button className="btn btn-dark" disabled={Boolean(loading)}>
      Baixar PDF
    </button>
  );

  useEffect(() => {
    if (!usuariolog?.token) {
      window.location.href = '/pga/';
      return;
    }

    if (
      window.innerWidth <= 1024 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    }

    function updateOnlineStatus() {
      setIsOnline(navigator.onLine);
    }
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    carregarSelects();
    carregarListaOrcamentos(1);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  async function carregarSelects() {
    try {
      const [emp, tab, tn] = await Promise.all([
        api.get(`/api/Empresa?pagina=1&totalpagina=999`),
        api.get(`/api/TabelaPreco?pagina=1&totalpagina=999`),
        api.get(`/api/TipoNegociacao?pagina=1&totalpagina=999`),
      ]);

      setEmpresaSelect(emp.data.data || []);

      const tabelas = Array.isArray(tab.data.data) ? tab.data.data : [];
      const optionsTabela: iDataSelect[] = tabelas.map((t: any) => ({
        value: String(t.id),
        label: `${t.id} - ${t.descricao}`,
      }));
      setTabelaSelect(optionsTabela);

      const tipos: iTipoNegociacao[] = tn.data.data || [];
      const optionsTn: iDataSelect[] = tipos.map((t) => ({
        value: String(t.id),
        label: `${t.id} - ${t.descricao}`,
      }));
      setTipoNegociacaoSelect(optionsTn);
      setTipoNegociacaoId((prev) =>
        prev ?? (optionsTn[0]?.value ? Number(optionsTn[0].value) : null)
      );
    } catch (e: any) {
      setAlertErroMensage(true);
      setMsgErro('Erro ao carregar dados iniciais.');
    }
  }

  async function carregarListaOrcamentos(paginaBusca?: number) {
    const codVendedor = Number(usuariolog.username);
    if (!codVendedor) {
      setListaOrcamentos([]);
      setTotalPaginasList(0);
      return;
    }
    try {
      setListaLoading(true);
      const pag = paginaBusca ?? paginaList;
      const resp = await api.get(
        `/api/CabecalhoOrcamento/filter/vendedor?pagina=${pag}&totalpagina=${qtdePaginaList}&codVendedor=${codVendedor}`
      );
      const dados = resp?.data?.data ?? [];
      setListaOrcamentos(dados);
      const total = Number(resp?.data?.total ?? 0);
      setTotalPaginasList(total > 0 ? Math.ceil(total / qtdePaginaList) : 0);
    } catch {
      setListaOrcamentos([]);
      setTotalPaginasList(0);
    } finally {
      setListaLoading(false);
    }
  }

  async function GetItensTabelaPrecoGeral(empresa: number, tabela: number) {
    try {
      const resp = await api.get(
        `/api/ItemTabelaPreco/codTabela?pagina=1&totalpagina=999&codTabela=${tabela}&parceiroId=0&empresaId=${empresa}`
      );
      const data = resp?.data?.data ?? [];
      const filtrados = Array.isArray(data) ? data : [];
      setItensTabelaGeral(filtrados);
      await GetGrupos(filtrados);
    } catch {
      setItensTabelaGeral([]);
      setGrupoPesquisa([]);
    }
  }

  async function GetItensTabelaPreco() {
    if (!empresaId || !tabelaPrecoId) {
      setItensTabela([]);
      setTotalPaginas(0);
      return;
    }
    setShowloading(true);
    try {
      const resp = await api.get(
        `/api/ItemTabelaPreco/codTabela?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${tabelaPrecoId}&parceiroId=0&empresaId=${empresaId}`
      );
      const data = resp?.data?.data ?? [];
      const filtrados = Array.isArray(data) ? data : [];
      setItensTabela(filtrados);
      const total = Number(resp?.data?.total ?? 0);
      setTotalPaginas(total > 0 ? Math.ceil(total / qtdePagina) : 0);
    } catch {
      setItensTabela([]);
      setTotalPaginas(0);
    } finally {
      setShowloading(false);
    }
  }

  async function GetItensTabelaPrecoFilter() {
    if (!empresaId || !tabelaPrecoId) return;
    const termo = String(search || '').trim();
    if (!termo) return;
    setShowloading(true);
    try {
      const base = `/api/ItemTabelaPreco/codTabela`;
      const url = pesquisaNome
        ? `${base}/nomeProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${tabelaPrecoId}&nomeProduto=${encodeURIComponent(
            termo
          )}&parceiroId=0&empresaId=${empresaId}`
        : pesquisaCod
        ? `${base}/codProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${tabelaPrecoId}&codProduto=${encodeURIComponent(
            termo
          )}&parceiroId=0&empresaId=${empresaId}`
        : `${base}/grupoId?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${tabelaPrecoId}&grupoId=${encodeURIComponent(
            termo
          )}&parceiroId=0&empresaId=${empresaId}`;
      const resp = await api.get(url);
      const data = resp?.data?.data ?? [];
      const filtrados = Array.isArray(data) ? data : [];
      setItensTabela(filtrados);
      const total = Number(resp?.data?.total ?? 0);
      setTotalPaginas(total > 0 ? Math.ceil(total / qtdePagina) : 0);
    } catch {
      setItensTabela([]);
      setTotalPaginas(0);
    } finally {
      setShowloading(false);
    }
  }

  async function GetGrupos(itensBase: IItemTabelaPreco[]) {
    try {
      const resp = await api.get(`/api/GrupoProduto?pagina=1&totalpagina=999`);
      const grupos = Array.isArray(resp?.data?.data) ? resp.data.data : [];
      grupos.sort((a: any, b: any) =>
        String(a.nome || '').localeCompare(String(b.nome || ''))
      );
      const filtrados = grupos.filter((g: any) =>
        itensBase.some(
          (it) =>
            Number(it?.produtos?.grupoProdutoId || 0) === Number(g?.id || 0)
        )
      );
      const options: iDataSelect[] = filtrados.map((g: any) => ({
        value: String(g.id),
        label: `${g.id} - ${g.nome}`,
      }));
      setGrupoPesquisa(options);
    } catch {
      setGrupoPesquisa([]);
    }
  }

  function PesquisaNome() {
    setPesquisaNome(true);
    setPesquisaCod(false);
    setPesquisaGrupo(false);
    setSearch('');
    setPagina(1);
    setFilter(false);
    setAdicionandoItem(false);
    setEmUso(false);
    setAddItem(true);
    setProdutoId(0);
    setNomeProduto('');
    setQuantItem('');
    setValorItem(0);
    setValorUnitario(0);
  }

  function PesquisaCod() {
    setPesquisaNome(false);
    setPesquisaCod(true);
    setPesquisaGrupo(false);
    setSearch('');
    setPagina(1);
    setFilter(false);
    setAdicionandoItem(false);
  }

  function PesquisaGrupo() {
    setPesquisaNome(false);
    setPesquisaCod(false);
    setPesquisaGrupo(true);
    setSearch('');
    setPagina(1);
    setFilter(false);
    setAdicionandoItem(false);
  }

  function LimparPesquisa() {
    setSearch('');
    setPagina(1);
    setFilter(false);
    setAdicionandoItem(false);
    setEmUso(false);
    setAddItem(true);
    GetItensTabelaPreco();
  }

  function Pesquisa(event: any) {
    event.preventDefault();
    setPagina(1);
    setFilter(true);
  }

  async function SetarQuantidade() {
    document.getElementById('quantidadeEscolhida')?.focus();
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      setQuantItem('');
    }
  };

  useEffect(() => {
    if (!empresaId || !tabelaPrecoId) return;
    setPagina(1);
    setFilter(false);
    GetItensTabelaPrecoGeral(empresaId, tabelaPrecoId);
    GetItensTabelaPreco();
  }, [empresaId, tabelaPrecoId]);

  useEffect(() => {
    if (!empresaId || !tabelaPrecoId) return;
    if (filter) {
      GetItensTabelaPrecoFilter();
    } else {
      GetItensTabelaPreco();
    }
  }, [pagina, qtdePagina]);

  useEffect(() => {
    if (!empresaId || !tabelaPrecoId) return;
    if (!filter) return;
    GetItensTabelaPrecoFilter();
  }, [filter]);

  useEffect(() => {
    if (!showlistaOrcamentos) return;
    carregarListaOrcamentos();
  }, [showlistaOrcamentos, paginaList]);

  const [consultandoCnpj, setConsultandoCnpj] = useState(false);
  const [cnpjUltimaConsulta, setCnpjUltimaConsulta] = useState('');

  function somenteDigitos(valor: string) {
    return String(valor || '').replace(/\D/g, '');
  }

  function isCnpjValido(value: string) {
    const cnpj = somenteDigitos(value);
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    const calc = (base: string, pesos: number[]) => {
      let soma = 0;
      for (let i = 0; i < pesos.length; i++) soma += Number(base[i]) * pesos[i];
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
    const d1 = calc(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const d2 = calc(cnpj.slice(0, 12) + String(d1), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    return cnpj.endsWith(`${d1}${d2}`);
  }

  async function consultarCnpj(digitosOverride?: string) {
    const digitos = somenteDigitos(digitosOverride !== undefined ? digitosOverride : cnpjCpf || '');
    if (digitos.length !== 14) return;
    if (!isCnpjValido(digitos)) return;
    if (consultandoCnpj) return;
    if (cnpjUltimaConsulta === digitos) return;
    setConsultandoCnpj(true);
    try {
      const resp = await api.get(`/api/CabecalhoOrcamento/cnpj/${digitos}`);
      const d = resp?.data || {};
      const end = [d?.endereco, d?.numero].filter(Boolean).join(', ');
      if (!String(nomeParceiro || '').trim()) setNomeParceiro(String(d?.nome || ''));
      if (!String(endParceiro || '').trim()) setEndParceiro(String(end || ''));
      if (!String(numeroEnd || '').trim()) setNumeroEnd(String(d?.numero || ''));
      if (!String(complementoEnd || '').trim()) setComplementoEnd(String(d?.complemento || ''));
      if (!String(bairro || '').trim()) setBairro(String(d?.bairro || ''));
      if (!String(cidade || '').trim()) setCidade(String(d?.cidade || ''));
      if (!String(uf || '').trim()) setUf(String(d?.uf || ''));
      if (!String(cep || '').trim()) setCep(String(d?.cep || ''));
      setCnpjUltimaConsulta(digitos);
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 404) {
        setTituloAviso('Aviso');
        setAlertErroMensage(true);
        setMsgErro('CNPJ não encontrado.');
      } else if (status === 400) {
        setTituloAviso('Aviso');
        setAlertErroMensage(true);
        setMsgErro('CNPJ inválido.');
      }
    } finally {
      setConsultandoCnpj(false);
    }
  }

  useEffect(() => {
    const digits = somenteDigitos(cnpjCpf);
    if (digits.length !== 14) return;
    if (!isCnpjValido(digits)) return;
    consultarCnpj(digits);
  }, [cnpjCpf]);

  function docMask(value: string) {
    const digits = String(value || '').replace(/\D/g, '');
    if (digits.length <= 11) return cpfMask(digits);
    return cnpjMask(digits);
  }

  function cepMaskPonto(value: string) {
    return String(value || '')
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2-$3')
      .replace(/(-\d{3})\d+?$/, '$1');
  }

  function limparDadosParceiro() {
    setNomeParceiro('');
    setEndParceiro('');
    setNumeroEnd('');
    setComplementoEnd('');
    setBairro('');
    setCidade('');
    setUf('');
    setCep('');
  }

  function iniciarNovoOrcamentoLimpo() {
    const novoPedidoId = `${usuariolog.username}${moment().format('YYYYMMDDHHmmss')}`;
    setPedidoId(novoPedidoId);
    setModoEdicao(true);
    setOrcamentoSelecionado(null);
    setItensSelecionados([]);
    setItensOrcamento([]);
    setItensDoPedido(0);
    setTabelaPrecoId(null);
    setTipoNegociacaoId(tipoNegociacaoSelect[0]?.value ? Number(tipoNegociacaoSelect[0].value) : null);
    setEmpresaId(null);
    setCanal('');
    setObservacao('');
    setDataEntrega(moment().format('YYYY-MM-DD'));
    setCnpjCpf('');
    limparDadosParceiro();
    setSearch('');
    setFilter(false);
    setItensTabela([]);
    setItensTabelaGeral([]);
    setGrupoPesquisa([]);
    setPagina(1);
    setTotalPaginas(0);
    setAdicionandoItem(false);
    setEmUso(false);
    setAddItem(true);
    setProdutoId(0);
    setNomeProduto('');
    setValorItem(0);
    setValorUnitario(0);
    setQuantItem('');
    setUnidade1('');
    setUnidade2('');
    setUnidadeEscolhida('');
    setQuantUnid(0);
    setMult(false);
    setaliIpi(0);
  }

  function limparTelaParaNovo() {
    setPedidoId('');
    setModoEdicao(false);
    setOrcamentoSelecionado(null);
    setItensSelecionados([]);
    setItensOrcamento([]);
    setItensDoPedido(0);
    setTabelaPrecoId(null);
    setTipoNegociacaoId(tipoNegociacaoSelect[0]?.value ? Number(tipoNegociacaoSelect[0].value) : null);
    setEmpresaId(null);
    setCanal('');
    setObservacao('');
    setDataEntrega(moment().format('YYYY-MM-DD'));
    setCnpjCpf('');
    limparDadosParceiro();
    setSearch('');
    setFilter(false);
    setItensTabela([]);
    setItensTabelaGeral([]);
    setGrupoPesquisa([]);
    setPagina(1);
    setTotalPaginas(0);
    setAdicionandoItem(false);
    setEmUso(false);
    setAddItem(true);
    setProdutoId(0);
    setNomeProduto('');
    setValorItem(0);
    setValorUnitario(0);
    setQuantItem('');
    setUnidade1('');
    setUnidade2('');
    setUnidadeEscolhida('');
    setQuantUnid(0);
    setMult(false);
    setaliIpi(0);
  }

  function fecharAviso() {
    const acao = acaoDepoisAviso;
    setAlertErroMensage(false);
    setMsgErro('');
    setTituloAviso('Aviso');
    setAcaoDepoisAviso(null);
    if (acao === 'pdf') {
      setShowPdf(true);
    }
  }

  async function handleDownloadExcel() {
    const cab = orcamentoPdf || orcamentoSelecionado;
    const itens = Array.isArray(itensPdf) && itensPdf.length > 0 ? itensPdf : Array.isArray(itensSelecionados) ? itensSelecionados : [];
    if (!cab?.pedidoId) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Selecione um orçamento para exportar.');
      return;
    }
    if (itens.length === 0) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Este orçamento não possui itens para exportar.');
      return;
    }

    setLoadingExcel(true);
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Portal Grupo Alyne';
      const worksheet = workbook.addWorksheet(`Orcamento_${String(cab.pedidoId).slice(0, 25)}`);

    const aplicaIpiCab = Number(cab?.filial || 0) === 1;
    const totalProdutos = itens.reduce((acc: number, it: any) => acc + (Number(it?.valTotal) || 0), 0);
      const totalIpi = itens.reduce((acc: number, it: any) => {
      if (!aplicaIpiCab) return acc;
        const base = Number(it?.valTotal) || 0;
        const ali = Number(it?.produto?.aliIpi) || 0;
        return acc + base * (ali / 100);
      }, 0);
      const valorLiquido = totalProdutos + totalIpi;

      const addBoldRow = (cells: any[]) => {
        const r = worksheet.addRow(cells);
        r.eachCell((cell) => {
          cell.font = { ...(cell.font || {}), bold: true };
        });
        return r;
      };

      addBoldRow(['ORÇAMENTO PARA CLIENTES NÃO CADASTRADOS']);
      worksheet.mergeCells(1, 1, 1, 8);
      worksheet.getRow(1).font = { bold: true, size: 14 };
      worksheet.addRow(['Este documento é um orçamento e não representa um pedido confirmado no Sankhya.']);
      worksheet.mergeCells(2, 1, 2, 8);
      worksheet.addRow([]);

      worksheet.addRow(['Nº Orçamento', cab.pedidoId]);
      worksheet.addRow(['Data', cab.data ? moment(cab.data).format('DD/MM/YYYY HH:mm') : '']);
      worksheet.addRow(['Cliente', cab.nomeParceiro || '']);
      worksheet.addRow(['Documento', cab.cnpjCpf ? docMask(String(cab.cnpjCpf)) : '']);
      worksheet.addRow(['UF', cab.uf || '']);
      worksheet.addRow(['Cidade', cab.cidade || '']);
      worksheet.addRow(['Endereço', [cab.endParceiro, cab.numeroEnd].filter(Boolean).join(', ')]);
      worksheet.addRow(['Bairro', cab.bairro || '']);
      worksheet.addRow(['CEP', cab.cep ? cepMaskPonto(String(cab.cep)) : '']);
      worksheet.addRow(['Data Entrega', cab.dataEntrega ? moment(cab.dataEntrega).format('DD/MM/YYYY') : '']);
      worksheet.addRow([]);

      const header = ['Código', 'Descrição', 'Qtd', 'Unid', 'Vlr Unit', 'Total', 'IPI %', 'Total / IPI'];
      const headerRow = worksheet.addRow(header);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE9ECEF' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
          left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
          bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
          right: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        };
      });

      itens.forEach((it: any) => {
        const qtd = Number(it?.quant) || 0;
        const vlrUnit = Number(it?.valUnit) || 0;
        const base = Number(it?.valTotal) || 0;
        const ali = Number(it?.produto?.aliIpi) || 0;
        const ipiVlr = aplicaIpiCab ? base * (ali / 100) : 0;
        const totalComIpi = base + ipiVlr;
        worksheet.addRow([
          Number(it?.produtoId) || 0,
          String(it?.produto?.nome || ''),
          qtd,
          String(it?.produto?.tipoUnid || 'UN'),
          vlrUnit,
          base,
          ali,
          totalComIpi,
        ]);
      });

      const currencyFmt = '"R$"#,##0.00';
      worksheet.getColumn(3).numFmt = '#,##0.####';
      worksheet.getColumn(5).numFmt = currencyFmt;
      worksheet.getColumn(6).numFmt = currencyFmt;
      worksheet.getColumn(7).numFmt = '0.00';
      worksheet.getColumn(8).numFmt = currencyFmt;
      worksheet.getColumn(1).numFmt = '0';

      worksheet.addRow([]);
      const rTot1 = worksheet.addRow(['Total Produtos', '', '', '', '', totalProdutos]);
      const rTot2 = worksheet.addRow(['Total IPI', '', '', '', '', totalIpi]);
      const rTot3 = worksheet.addRow(['Valor Líquido', '', '', '', '', valorLiquido]);
      const rTot4 = worksheet.addRow(['Quant. Itens', '', itens.length]);

      [rTot1, rTot2, rTot3, rTot4].forEach((r) => {
        r.getCell(1).font = { bold: true };
      });
      rTot1.getCell(6).numFmt = currencyFmt;
      rTot2.getCell(6).numFmt = currencyFmt;
      rTot3.getCell(6).numFmt = currencyFmt;

      worksheet.properties.defaultRowHeight = 15;
      worksheet.getColumn(1).width = 10;
      worksheet.getColumn(2).width = 60;
      worksheet.getColumn(3).width = 8;
      worksheet.getColumn(4).width = 7;
      worksheet.getColumn(5).width = 12;
      worksheet.getColumn(6).width = 12;
      worksheet.getColumn(7).width = 8;
      worksheet.getColumn(8).width = 14;

      worksheet.getColumn(1).alignment = { horizontal: 'right' };
      worksheet.getColumn(2).alignment = { horizontal: 'left', shrinkToFit: true };
      worksheet.getColumn(3).alignment = { horizontal: 'right' };
      worksheet.getColumn(4).alignment = { horizontal: 'center' };
      worksheet.getColumn(5).alignment = { horizontal: 'right' };
      worksheet.getColumn(6).alignment = { horizontal: 'right' };
      worksheet.getColumn(7).alignment = { horizontal: 'right' };
      worksheet.getColumn(8).alignment = { horizontal: 'right' };
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.font = { ...(cell.font || {}), size: 10 };
        });
        if (rowNumber === headerRow.number) {
          row.height = 18;
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `orcamento_${cab.pedidoId}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Erro ao exportar para Excel.');
    } finally {
      setLoadingExcel(false);
    }
  }

  function excluirItemPorProdutoId(prodId: number) {
    setItensOrcamento((prev) =>
      prev.map((it) => {
        if (it.produtoId !== prodId) return it;
        return { ...it, inativo: 'S' };
      })
    );
  }

  function editarItemArrayPedido() {
    const qtdDigitada = Number(quantItem || 0);
    const unidade = String(unidadeEscolhida || '').trim().toUpperCase();
    const conv = Number(quantUnid || 0);
    const qtdEfetiva = unidade === 'UN' ? qtdDigitada : qtdDigitada * conv;
    const vlrTotal = Number(valorUnitario || 0) * qtdEfetiva;

    setItensOrcamento((prev) =>
      prev.map((it) => {
        if (it.produtoId !== produtoId) return it;
        return {
          ...it,
          quant: qtdEfetiva,
          valUnit: Number(valorUnitario || 0),
          valTotal: Number(vlrTotal || 0),
        };
      })
    );
  }

  function CriarArrayPedidos() {
    const qtdDigitada = Number(quantItem || 0);
    const unidade = String(unidadeEscolhida || '').trim().toUpperCase();
    const conv = Number(quantUnid || 0);
    const qtdEfetiva = unidade === 'UN' ? qtdDigitada : qtdDigitada * conv;
    const vlrUnit = Number(valorUnitario || 0);
    const vlrTotal = vlrUnit * qtdEfetiva;

    const item: ItemOrcamentoDraft = {
      produtoId: Number(produtoId),
      descProduto: String(nomeProduto || ''),
      quant: qtdEfetiva,
      valUnit: vlrUnit,
      valTotal: Number(vlrTotal || 0),
      inativo: 'N',
      produto: {
        aliIpi: Number(aliIpi || 0),
        tipoUnid: String(unidade1 || ''),
        tipoUnid2: String(unidade2 || ''),
        conv: Number(quantUnid || 0),
        nome: String(nomeProduto || ''),
      },
    };

    setItensOrcamento((prev) => [...prev, item]);
  }

  function AddItemPedido(event: any) {
    event.preventDefault();
    if (!produtoId || !Number(produtoId)) {
      setAlertErroMensage(true);
      setMsgErro('Selecione um produto antes de adicionar.');
      return;
    }
    if (!nomeProduto || !String(nomeProduto).trim()) {
      setAlertErroMensage(true);
      setMsgErro('Selecione um produto antes de adicionar.');
      return;
    }
    const vlrUnit = Number(valorUnitario || 0);
    if (!Number.isFinite(vlrUnit) || vlrUnit <= 0) {
      setAlertErroMensage(true);
      setMsgErro('O valor unitário do produto não pode ser igual a 0,00');
      return;
    }
    const qtdDigitada = Number(quantItem || 0);
    if (!qtdDigitada || qtdDigitada <= 0) {
      setAlertErroMensage(true);
      setMsgErro(`A quantidade dos itens tem q ser maior que 0`);
      SetarQuantidade();
      return;
    }

    const unidade = String(unidadeEscolhida || '').trim().toUpperCase();
    if (unidade === 'UN') {
      if (
        Number(quantUnid || 0) > 0 &&
        qtdDigitada % Number(quantUnid || 0) !== 0
      ) {
        setAlertErroMensage(true);
        setMsgErro(`A quantidade inserida não é multiplo de ${quantUnid} `);
        SetarQuantidade();
        return;
      }
    }

    if (addItem) {
      CriarArrayPedidos();
      setItensDoPedido((prev) => prev + 1);
    } else {
      editarItemArrayPedido();
    }

    setQuantItem('');
    setEmUso(false);
    setAddItem(true);
    setAdicionandoItem(false);
  }

  async function salvarOrcamento(statusOverride?: { status?: string; ativo?: string }) {
    if (!pedidoId || !String(pedidoId).trim()) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('PedidoId é obrigatório.');
      return;
    }
    if (!empresaId || !tabelaPrecoId) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Selecione Empresa e Tabela de Preço.');
      return;
    }
    const cnpjDigits = somenteDigitos(cnpjCpf);
    if (!cnpjDigits) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('CNPJ é obrigatório.');
      document.getElementById('cnpj')?.focus();
      return;
    }
    if (cnpjDigits.length !== 14) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('CNPJ está incompleto.');
      document.getElementById('cnpj')?.focus();
      return;
    }
    if (!isCnpjValido(cnpjDigits)) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('CNPJ inválido.');
      document.getElementById('cnpj')?.focus();
      return;
    }
    if (!validarUfParceiroPorRegional()) return;
    if (!dataEntrega || !String(dataEntrega).trim()) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Data de entrega é obrigatória.');
      return;
    }
    if (!nomeParceiro || !String(nomeParceiro).trim()) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Nome do cliente é obrigatório.');
      return;
    }
    const qtdAtivos = itensOrcamento.filter((it) => String(it?.inativo || 'N').toUpperCase() !== 'S').length;
    if (qtdAtivos === 0) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Adicione ao menos um item no orçamento.');
      return;
    }

    setShowloading(true);
    try {
      const nowIso = moment().toISOString();
      const payload = {
        CabecalhoOrcamento: {
          id: orcamentoSelecionado?.id || 0,
          filial: String(empresaId),
          lote: '',
          vendedorId: Number(usuariolog.username),
          pedidoId: pedidoId,
          tabelaPrecoId: Number(tabelaPrecoId),
          tipoNegociacaoId: Number(tipoNegociacaoId ?? (tipoNegociacaoSelect[0]?.value ? Number(tipoNegociacaoSelect[0].value) : 1)),
          cnpjCpf: cnpjDigits,
          nomeParceiro: String(nomeParceiro || '').trim(),
          endParceiro: String(endParceiro || '').trim(),
          numeroEnd: String(numeroEnd || '').trim(),
          complementoEnd: String(complementoEnd || '').trim(),
          bairro: String(bairro || '').trim(),
          cidade: String(cidade || '').trim(),
          uf: String(uf || '').trim(),
          cep: String(cep || '').trim(),
          data: nowIso,
          valor: Number(totalOrcamento.toFixed(2)),
          dataEntrega: moment(dataEntrega).toISOString(),
          observacao: String(observacao || '').trim(),
          baixado: '',
          orcamento: '',
          status: statusOverride?.status ?? 'Aberto',
          tipPed: '',
          ativo: statusOverride?.ativo ?? 'S',
          versao: versaoFront,
          quant_Itens: qtdAtivos,
          log_Envio: '',
        },
        ItensOrcamento: itensOrcamento.map((it) => ({
          id: 0,
          filial: String(empresaId),
          vendedorId: Number(usuariolog.username),
          pedidoId: pedidoId,
          produtoId: it.produtoId,
          quant: it.quant,
          valUnit: it.valUnit,
          valTotal: it.valTotal,
          baixado: '',
          inativo: String(it?.inativo || 'N').toUpperCase() === 'S' ? 'S' : 'N',
        })),
      };

      await api.post(`/api/CabecalhoOrcamento/envio`, payload);
      setTituloAviso('Sucesso');
      setAlertErroMensage(true);
      setMsgErro('Orçamento salvo com sucesso.');
      try {
        const respSaved = await api.get(`/api/CabecalhoOrcamento/pedidoId/${encodeURIComponent(pedidoId)}`);
        setOrcamentoPdf(respSaved?.data?.cabecalho || null);
        setItensPdf(Array.isArray(respSaved?.data?.itens) ? respSaved.data.itens : []);
      } catch {
        setOrcamentoPdf(null);
        setItensPdf([]);
      }
      await carregarListaOrcamentos();
      iniciarNovoOrcamentoLimpo();
      const deveAbrirPdf = !statusOverride?.status || statusOverride.status !== 'Cancelado';
      setAcaoDepoisAviso(deveAbrirPdf ? 'pdf' : null);
    } catch (e: any) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Erro ao salvar orçamento.');
    } finally {
      setShowloading(false);
    }
  }

  async function cancelarSelecionado() {
    const cab = orcamentoSelecionado;
    if (!cab?.pedidoId) return;
    setShowloading(true);
    try {
      await api.put(
        `/api/CabecalhoOrcamento/pedidoId/${encodeURIComponent(cab.pedidoId)}/cancelar`
      );
      await carregarListaOrcamentos();
      await selecionarOrcamento(cab.pedidoId);
      setModoEdicao(false);
    } catch {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Erro ao cancelar orçamento.');
    } finally {
      setShowloading(false);
    }
  }

  async function cancelarOrcamentoAtual() {
    if (!modoEdicao) return;
    const pedidoAtual = String(pedidoId || '').trim();
    const temRegistroSalvo = Boolean(orcamentoSelecionado?.id);
    setShowloading(true);
    try {
      if (temRegistroSalvo && pedidoAtual) {
        await api.put(
          `/api/CabecalhoOrcamento/pedidoId/${encodeURIComponent(pedidoAtual)}/cancelar`
        );
        await carregarListaOrcamentos();
      }
    } catch {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Erro ao cancelar orçamento.');
    } finally {
      setShowloading(false);
    }
    limparTelaParaNovo();
  }

  async function selecionarOrcamento(pedido: string) {
    try {
      const resp = await api.get(`/api/CabecalhoOrcamento/pedidoId/${encodeURIComponent(pedido)}`);
      const cab = resp?.data?.cabecalho || null;
      const itens = resp?.data?.itens || [];
      setOrcamentoSelecionado(cab);
      setItensSelecionados(itens);
    } catch {
      setOrcamentoSelecionado(null);
      setItensSelecionados([]);
    }
  }

  function editarSelecionado() {
    const cab = orcamentoSelecionado;
    if (!cab) return;

    setModoEdicao(true);
    setPedidoId(String(cab.pedidoId || ''));
    setEmpresaId(cab.filial ? Number(cab.filial) : null);
    setTabelaPrecoId(cab.tabelaPrecoId ? Number(cab.tabelaPrecoId) : null);
    setTipoNegociacaoId(cab.tipoNegociacaoId || null);
    setCnpjCpf(String(cab.cnpjCpf || ''));
    setNomeParceiro(String(cab.nomeParceiro || ''));
    setEndParceiro(String(cab.endParceiro || ''));
    setNumeroEnd(String(cab.numeroEnd || ''));
    setComplementoEnd(String(cab.complementoEnd || ''));
    setBairro(String(cab.bairro || ''));
    setCidade(String(cab.cidade || ''));
    setUf(String(cab.uf || ''));
    setCep(String(cab.cep || ''));
    setObservacao(String(cab.observacao || ''));
    setDataEntrega(
      cab.dataEntrega ? moment(cab.dataEntrega).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
    );

    const itens = Array.isArray(itensSelecionados) ? itensSelecionados : [];
    const mapped: ItemOrcamentoDraft[] = itens.map((it: any) => ({
      produtoId: Number(it?.produtoId || 0),
      descProduto: String(it?.produto?.nome || it?.nomeProduto || ''),
      quant: Number(it?.quant || 0),
      valUnit: Number(it?.valUnit || 0),
      valTotal: Number(it?.valTotal || 0),
      inativo: String(it?.inativo ?? it?.Inativo ?? 'N').toUpperCase() === 'S' ? 'S' : 'N',
      produto: {
        aliIpi: Number(it?.produto?.aliIpi || 0),
        tipoUnid: String(it?.produto?.tipoUnid || 'UN'),
        tipoUnid2: String(it?.produto?.tipoUnid2 || ''),
        conv: Number(it?.produto?.conv || 0),
        nome: String(it?.produto?.nome || it?.nomeProduto || ''),
      },
    }));
    const filtrado = mapped.filter((x) => x.produtoId);
    setItensOrcamento(filtrado);
    setItensDoPedido(filtrado.length);
  }

  function novoOrcamento() {
    const cnpjDigits = somenteDigitos(cnpjCpf);
    if (!cnpjDigits) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('CNPJ é obrigatório.');
      document.getElementById('cnpj')?.focus();
      return;
    }
    if (cnpjDigits.length !== 14) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('CNPJ está incompleto.');
      document.getElementById('cnpj')?.focus();
      return;
    }
    if (!isCnpjValido(cnpjDigits)) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('CNPJ inválido.');
      document.getElementById('cnpj')?.focus();
      return;
    }
    if (!validarUfParceiroPorRegional()) return;
    if (!nomeParceiro || !String(nomeParceiro).trim()) {
      setTituloAviso('Aviso');
      setAlertErroMensage(true);
      setMsgErro('Nome do cliente é obrigatório.');
      return;
    }

    const novoPedidoId = `${usuariolog.username}${moment().format('YYYYMMDDHHmmss')}`;
    setPedidoId(novoPedidoId);
    setModoEdicao(true);
    setOrcamentoSelecionado(null);
    setItensSelecionados([]);
    setItensOrcamento([]);
    setItensDoPedido(0);
    setTabelaPrecoId(null);
    setTipoNegociacaoId(tipoNegociacaoSelect[0]?.value ? Number(tipoNegociacaoSelect[0].value) : null);
    setEmpresaId(null);
    setCanal('');
    setObservacao('');
    setDataEntrega(moment().format('YYYY-MM-DD'));
    setSearch('');
    setFilter(false);
    setItensTabela([]);
    setItensTabelaGeral([]);
    setGrupoPesquisa([]);
    setPagina(1);
    setTotalPaginas(0);
    setAdicionandoItem(false);
    setEmUso(false);
    setAddItem(true);
    setProdutoId(0);
    setNomeProduto('');
    setValorItem(0);
    setValorUnitario(0);
    setQuantItem('');
    setUnidade1('');
    setUnidade2('');
    setUnidadeEscolhida('');
    setQuantUnid(0);
    setMult(false);
    setaliIpi(0);
  }

  function abrirListaOrcamentos() {
    setPaginaList(1);
    setShowlistaOrcamentos(true);
  }

  function handleCloselistaOrcamentos() {
    setShowlistaOrcamentos(false);
  }

  return (
    <>
      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="">
            <SideNavBar />
          </div>
          <div style={{ width: '100%' }}>
            <NavbarDashHeader />
            <div className="titulo-page">
              <h1>Orçamento</h1>
            </div>

            <div className="contain-pedido d-flex conteinerped-existente fundo-branco-mobile">
              <div style={{ width: '100%' }}>
                <div className="ultimos-pedidos tarjtext">
                  <div className="tarja-3-pedidos d-flex">
                    <h1 className="tarjtext" style={{ letterSpacing: 1 }}>
                      ** Orçamentos **
                    </h1>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        abrirListaOrcamentos();
                      }}
                    >
                      Lista de Orçamentos
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 16, border: '1px solid #ddd', borderRadius: 6, padding: 12 }}>
                  <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700 }}>Dados do Orçamento</div>
                    <div className="d-flex" style={{ gap: 8 }}>
                      {modoEdicao ? (
                        <>
                          <button className="btn btn-danger" disabled={showloading} onClick={cancelarOrcamentoAtual}>
                            Cancelar
                          </button>
                          <button
                            className="btn btn-dark"
                            disabled={showloading || itensOrcamento.length === 0}
                            onClick={() => salvarOrcamento()}
                          >
                            Salvar
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-outline-dark" onClick={novoOrcamento}>
                          Novo
                        </button>
                      )}
                    </div>
                  </div>

                  {modoEdicao ? (
                    <>
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontWeight: 700, fontSize: 18 }}>
                          Nº Orçamento: <span style={{ fontWeight: 900 }}>{pedidoId}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontWeight: 700 }}>Total</div>
                        <div
                          style={{
                            fontWeight: 900,
                            fontSize: 24,
                            color: totalOrcamento === 0 ? 'red' : '#0000FF',
                          }}
                        >
                          R$ {moeda(totalOrcamento)}
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div style={{ marginTop: 14, fontWeight: 700 }}>Parceiro (não cadastrado)</div>

              <div className="row" style={{ marginTop: 8 }}>
                <div className="col-md-4">
                      <label>
                        CNPJ <span style={{ color: 'red' }}>*</span>
                      </label>
                  <input
                    id="cnpj"
                    className="form-control"
                        maxLength={18}
                        inputMode="numeric"
                        value={cnpjMask(cnpjCpf)}
                        onChange={(e) => {
                          const digits = somenteDigitos(e.target.value || '').slice(0, 14);
                          setCnpjCpf(digits);
                          if (digits.length < 14) {
                            setCnpjUltimaConsulta('');
                            limparDadosParceiro();
                          }
                        }}
                        onBlur={(e) => {
                          const digits = somenteDigitos((e.currentTarget as HTMLInputElement)?.value || '');
                          if (!digits) return;
                          if (digits.length !== 14) {
                            setTituloAviso('Aviso');
                            setAlertErroMensage(true);
                            setMsgErro('CNPJ está incompleto.');
                            return;
                          }
                          if (!isCnpjValido(digits)) {
                            setTituloAviso('Aviso');
                            setAlertErroMensage(true);
                            setMsgErro('CNPJ inválido.');
                            return;
                          }
                          consultarCnpj(digits);
                        }}
                  />
                </div>
                <div className="col-md-8">
                  <label>
                    Nome do Cliente <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input className="form-control" value={nomeParceiro} onChange={(e) => setNomeParceiro(e.target.value)} />
                </div>
              </div>

                  <div className="row" style={{ marginTop: 8 }}>
                    <div className="col-md-6">
                      <label>Endereço</label>
                      <input className="form-control" value={endParceiro} onChange={(e) => setEndParceiro(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label>Número</label>
                      <input className="form-control" value={numeroEnd} onChange={(e) => setNumeroEnd(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label>Complemento</label>
                      <input className="form-control" value={complementoEnd} onChange={(e) => setComplementoEnd(e.target.value)} />
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: 8 }}>
                    <div className="col-md-4">
                      <label>Bairro</label>
                      <input className="form-control" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label>Cidade</label>
                      <input className="form-control" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label>
                        UF <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input id="ufParceiro" className="form-control" value={uf} onChange={(e) => setUf(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label>CEP</label>
                      <input
                        className="form-control"
                        value={cepMaskPonto(cep)}
                        onChange={(e) => {
                          const digits = String(e.target.value || '').replace(/\D/g, '').slice(0, 8);
                          setCep(digits);
                        }}
                      />
                    </div>
                  </div>

                  {modoEdicao && String(nomeParceiro || '').trim() ? (
                    <>
                      <div className="row" style={{ marginTop: 12 }}>
                        <div className="col-md-4">
                          <label>
                            Empresa <span style={{ color: 'red' }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            value={empresaId ?? ''}
                            onChange={(e) => {
                              const newEmpresaId = e.target.value ? Number(e.target.value) : null;
                              setEmpresaId(newEmpresaId);
                              if (!newEmpresaId) setCanal('');
                              setTabelaPrecoId(null);
                              setSearch('');
                              setPagina(1);
                              setFilter(false);
                              setItensTabela([]);
                              setItensTabelaGeral([]);
                              setGrupoPesquisa([]);
                              setAdicionandoItem(false);
                              setEmUso(false);
                              setAddItem(true);
                              setProdutoId(0);
                              setNomeProduto('');
                              setValorItem(0);
                              setValorUnitario(0);
                              setQuantItem('');
                            }}
                          >
                            <option value="">Selecione</option>
                            {empresaSelectFiltrada.map((e) => (
                              <option key={e.id} value={e.id}>
                                {e.descricao}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label>Canal</label>
                          <select
                            className="form-control"
                            value={canal}
                            disabled={!empresaId}
                            onChange={(e) => {
                              setCanal(e.target.value as any);
                              setTabelaPrecoId(null);
                              setSearch('');
                              setPagina(1);
                              setFilter(false);
                              setItensTabela([]);
                              setItensTabelaGeral([]);
                              setGrupoPesquisa([]);
                              setAdicionandoItem(false);
                              setEmUso(false);
                              setAddItem(true);
                              setProdutoId(0);
                              setNomeProduto('');
                              setValorItem(0);
                              setValorUnitario(0);
                              setQuantItem('');
                            }}
                          >
                            <option value="">Selecione</option>
                            <option value="ATACADO">Atacado</option>
                            <option value="LOJ_ESP">Loj. Esp.</option>
                            <option value="VAREJO">Varejo</option>
                            <option value="DISTRIBUIDORA">Distribuidora</option>
                            <option value="LICITACAO">Licitação</option>
                            <option value="OUTROS">Outros</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label>
                            Tabela de Preço <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Select
                            isDisabled={!empresaId || !canal}
                            options={tabelaSelectFiltrada}
                            value={
                              tabelaPrecoId
                                ? tabelaSelectFiltrada.find((x) => Number(x.value) === tabelaPrecoId) || null
                                : null
                            }
                            onChange={(opt: any) => setTabelaPrecoId(opt?.value ? Number(opt.value) : null)}
                            placeholder={
                              !empresaId
                                ? 'Selecione a empresa'
                                : !canal
                                  ? 'Selecione o canal'
                                  : permiteTodasTabelasPorRegional && !String(uf || '').trim()
                                    ? 'Informe a UF do cliente'
                                    : 'Selecione'
                            }
                          />
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: 12, marginBottom: 12 }}>
                        <div className="col-md-4">
                          <label>Data Entrega</label>
                          <input
                            type="date"
                            className="form-control"
                            value={dataEntrega}
                            onChange={(e) => setDataEntrega(e.target.value)}
                          />
                        </div>
                        <div className="col-md-8">
                          <label>Observação</label>
                          <input className="form-control" value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                        </div>
                      </div>

                      <div className="divisao-pedido"></div>
                      <div className="classe-dupla-pedido">
                        <div className="bloco-pesquisa-pedido">
                          <form onSubmit={Pesquisa} className="pesBloco">
                    <div className="title-pesBloco">
                      <span
                        style={{
                          fontSize: 14,
                          marginTop: 3,
                          marginRight: 8,
                        }}
                      >
                        Pesquisar por:
                      </span>
                      <div className="d-flex">
                        <input
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaNome}
                          onChange={PesquisaNome}
                        />
                        <p className={'p12'} style={{ fontSize: 13, marginLeft: 8 }}>
                          Nome
                        </p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaCod}
                          onChange={PesquisaCod}
                        />
                        <p className={'p12'} style={{ fontSize: 13, marginLeft: 8 }}>
                          Código
                        </p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaGrupo}
                          onChange={PesquisaGrupo}
                        />
                        <p className={'p12'} style={{ fontSize: 13, marginLeft: 8 }}>
                          Grupo
                        </p>
                      </div>
                    </div>

                    <div style={{ marginTop: 10, width: '100%' }} className="conteudo-botoes">
                      <div className="bloco-pesquisa-input-pedido">
                        {pesquisaNome ? (
                          <div>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select inputparceiro"
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setAdicionandoItem(false);
                              }}
                            />
                          </div>
                        ) : null}

                        {pesquisaCod ? (
                          <div>
                            <input
                              id="codPesquisa"
                              type="text"
                              className="form-control select inputparceiro"
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setAdicionandoItem(false);
                              }}
                            />
                          </div>
                        ) : null}

                        {pesquisaGrupo ? (
                          <div className="div-pesquisa">
                            <Select
                              id="grupoPesquisa"
                              className="inputparceiro"
                              placeholder="Digite ou selecione"
                              noOptionsMessage={() => 'Nenhum grupo encontrado'}
                              options={grupoPesquisa}
                              onChange={(value: any) => {
                                setSearch('');
                                setSearch(value?.value || '');
                                setAdicionandoItem(false);
                                setPagina(1);
                                setFilter(true);
                              }}
                            />
                          </div>
                        ) : null}
                      </div>

                      <div className="bloco-pesquisa-btn">
                        <button className="btn btn-primary btn-pesq-ped" onClick={Pesquisa}>
                          <FaSearchPlus fontSize={12} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-pesq-ped"
                          onClick={LimparPesquisa}
                        >
                          <AiOutlineClear fontSize={14} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="bloco-valor-pedido">
                  <div className="conteudoBloco">
                    <div className="blocoValores">
                      <h2>Valor do Orçamento:</h2>
                      <h1 style={totalOrcamento === 0 ? { color: 'red' } : { color: '#0000FF' }}>
                        R$ {moeda(totalOrcamento)}
                      </h1>
                    </div>
                    <div className="blocoValores">
                      <OverlayTrigger
                        placement={'top'}
                        delay={{ show: 100, hide: 250 }}
                          overlay={<Tooltip>Pedidos para Distribuidora não geram IPI</Tooltip>}
                      >
                        <h2>Valor do Orçamento C / Ipi:</h2>
                      </OverlayTrigger>
                      <h1 style={totalOrcamento === 0 ? { color: 'red' } : { color: '#0000FF' }}>
                        R$ {moeda(valorTotalComIpi)}
                      </h1>
                    </div>
                    <div className="blocoValores">
                      <h2>Qtd. Itens:</h2>
                      <h1
                        style={
                          itensDoPedido > 0
                            ? { color: '#2031ed', fontWeight: 'bold' }
                            : { color: 'red', fontWeight: 'bold' }
                        }
                      >
                        {itensDoPedido}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <form
                id="meuForm"
                ref={formRef}
                onSubmit={AddItemPedido}
                className="titulo-tabela-responsiva-pedido"
              >
                <div className="div-produto-pedido-pesq">
                  <span className={'p12'} style={{ marginTop: 7, marginRight: 8 }}>
                    Produto:
                  </span>
                  <input
                    disabled
                    type="text"
                    value={nomeProduto}
                    className="form-control select inputparceiro"
                  />
                </div>
                <div className="dados-do-item">
                  <div className="div-valor-pedido-pesq">
                    <span style={{ marginTop: 7, marginRight: 8 }}>Vlr. Unit:</span>
                    <input
                      disabled
                      type="text"
                      value={moeda(valorItem)}
                      className="form-control select inputparceiro"
                    />
                  </div>

                  <div className="div-quant-pedido-pesq">
                    <span className="p12" style={{ marginTop: 7, marginRight: 8 }}>
                      Quant.:
                    </span>
                    <input
                      min={1}
                      inputMode="numeric"
                      value={quantItem}
                      onKeyDown={handleKeyDown}
                      autoComplete="off"
                      id="quantidadeEscolhida"
                      onChange={(event: any) => {
                        const digitsOnly = String(event.target.value || '').replace(/\D/g, '');
                        setQuantItem(digitsOnly);
                      }}
                      type="text"
                      className="form-control select inputparceiro input-without-spinner"
                    />
                    <span
                      className="mult"
                      id={quantUnid > 0 ? 'multiplo' : 'multiplon'}
                      style={{ marginTop: 7, marginRight: 8 }}
                    >
                      {mult ? <>Múltiplo de {quantUnid}</> : <></>}
                    </span>
                  </div>

                  <div className="div-unid-pedido-pesq">
                    <span className="p12" style={{ marginTop: 7, marginRight: 8 }}>
                      Unid.:
                    </span>
                    <select
                      disabled={adicionandoItem == false}
                      value={unidadeEscolhida}
                      className="form-select select inputparceiro campo-select"
                      aria-label=""
                      onChange={(e) => {
                        setQuantItem('');
                        setUnidadeEscolhida(e.target.value);
                      }}
                    >
                      <option className="input-unit" value={unidade1}>
                        {unidade1}
                      </option>
                      <option className="input-unit" value={unidade2}>
                        {unidade2}
                      </option>
                    </select>
                  </div>

                  <div className="div-adicionar-pedido-pesq">
                    <button
                      type="submit"
                      disabled={quantItem == '' || nomeProduto == ''}
                      className="btn btn-primary btn-add"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </form>

              <div className="table-responsive  tabela-responsiva-pedido">
                <div className=" table-wrap">
                  <Table responsive className="table-global table  main-table">
                    <thead>
                      <tr className="tituloTab">
                        {isMobile ? (
                          <th
                            style={{ backgroundColor: '#f1eeee' }}
                            className="th2 th-tabela-pedido nome-grupo "
                          >
                            <h1>LISTA DE PRODUTOS</h1>
                          </th>
                        ) : (
                          <>
                            <th
                              style={{ textAlign: 'center', backgroundColor: '#f1eeee' }}
                              className="th1 id-grupo th-tabela-pedido paddingPedido"
                            >
                              Código
                            </th>
                            <th style={{ backgroundColor: '#f1eeee' }} className="th2 nome-grupo paddingPedido">
                              Produto
                            </th>
                            <th
                              style={{ textAlign: 'center', backgroundColor: '#f1eeee' }}
                              className="th4 th-tabela-pedido paddingPedido"
                            >
                              Un
                            </th>
                            <th
                              style={{ textAlign: 'center', backgroundColor: '#f1eeee' }}
                              className="th4 th-tabela-pedido paddingPedido"
                            >
                              Un2
                            </th>
                            <th
                              style={{ textAlign: 'center', backgroundColor: '#f1eeee' }}
                              className="th4 fatos-conv paddingPedido"
                            >
                              Fatos Conv.
                            </th>
                            <th
                              style={{ textAlign: 'center', backgroundColor: '#f1eeee' }}
                              className="th1 paddingPedido"
                            >
                              Prc. Venda
                            </th>
                            <th
                              style={{ textAlign: 'center', backgroundColor: '#f1eeee' }}
                              className="th4 th-tabela-pedido paddingPedido"
                            >
                              Ações
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {itensTabela?.length > 0 ? (
                        <>
                          {itensTabela.map((item, index) => (
                            (() => {
                              const jaAdicionado = itensOrcamento.some((p) => p.produtoId === item.idProd);
                              return (
                            <tr
                              className={
                                jaAdicionado
                                  ? 'produto-adicionado tituloTab'
                                  : 'tituloTab'
                              }
                              key={index}
                              onClick={() => {
                                if (jaAdicionado) return;
                                if (Number(item.preco || 0) <= 0) {
                                  setAlertErroMensage(true);
                                  setMsgErro('o valor unitario do produto não pode ser igual a 0,00');
                                  return;
                                }
                                setEmUso(true);
                                setAddItem(true);
                                setValorItem(Number(item.preco || 0));
                                setValorUnitario(Number(item.preco || 0));
                                setAdicionandoItem(true);
                                setaliIpi(Number(item?.produtos?.aliIpi || 0));
                                setUnidade1(String(item?.produtos?.tipoUnid || ''));
                                setUnidade2(String(item?.produtos?.tipoUnid2 || ''));
                                setQuantUnid(Number(item?.produtos?.conv || 0));
                                setMult(true);
                                setUnidadeEscolhida(String(item?.produtos?.tipoUnid || ''));
                                setProdutoId(Number(item.idProd || 0));
                                setNomeProduto(String(item?.produtos?.nome || ''));
                                SetarQuantidade();
                              }}
                            >
                              {isMobile ? (
                                <td
                                  className={
                                    jaAdicionado
                                      ? 'produto-adicionado id-grupo2 '
                                      : 'id-grupo2'
                                  }
                                >
                                  <div className="d-flex paddingPedido2">
                                    <div>
                                      <h2 className="descProdMob">{item.produtos?.nome}</h2>
                                      <h2 className="desccontdMob">
                                        Cod.: {item.idProd}
                                        <b style={{ marginLeft: 20 }}></b> R$ {moeda(item?.preco)}
                                        {' | '}{' '}
                                        {moeda(Number(item?.preco || 0) * Number(item?.produtos?.conv || 0))}
                                        <b style={{ marginLeft: 20 }}></b> Und.:{' '}
                                        {item.produtos?.tipoUnid}
                                        {' | '}
                                        {item.produtos?.tipoUnid2}
                                      </h2>
                                    </div>
                                  </div>
                                </td>
                              ) : (
                                <>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className={
                                      jaAdicionado
                                        ? 'produto-adicionado id-grupo paddingPedido'
                                        : 'id-grupo paddingPedido'
                                    }
                                  >
                                    {item.idProd}
                                  </td>
                                  <td
                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                    className={
                                      jaAdicionado
                                        ? 'produto-adicionado nome-grupo paddingPedido'
                                        : 'nome-grupo paddingPedido'
                                    }
                                  >
                                    {item.produtos?.nome}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
                                    className={jaAdicionado ? 'produto-adicionado paddingPedido' : 'paddingPedido'}
                                  >
                                    {item.produtos?.tipoUnid}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
                                    className={jaAdicionado ? 'produto-adicionado paddingPedido' : 'paddingPedido'}
                                  >
                                    {item.produtos?.tipoUnid2}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
                                    className={
                                      jaAdicionado ? 'produto-adicionado paddingPedido id-valor' : 'paddingPedido id-valor'
                                    }
                                  >
                                    {item.produtos?.conv}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
                                    className={
                                      jaAdicionado ? 'produto-adicionado paddingPedido id-valor' : 'paddingPedido id-valor'
                                    }
                                  >
                                    <h1 className={jaAdicionado ? 'produto-adicionado td-valor' : 'td-valor'}>
                                      {moeda(item?.preco)}
                                    </h1>
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className={jaAdicionado ? 'produto-adicionado paddingPedido' : 'paddingPedido'}
                                  >
                                    <OverlayTrigger
                                      placement={'right'}
                                      delay={{ show: 100, hide: 250 }}
                                      overlay={<Tooltip>Selecionar</Tooltip>}
                                    >
                                      <button
                                        disabled={
                                          emUso ||
                                          jaAdicionado
                                        }
                                        className="btn btn-table btn-edit"
                                        style={{ marginRight: 15, marginLeft: 15 }}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          if (jaAdicionado) return;
                                          if (Number(item.preco || 0) <= 0) {
                                            setAlertErroMensage(true);
                                            setMsgErro('o valor unitario do produto não pode ser igual a 0,00');
                                            return;
                                          }
                                          setEmUso(true);
                                          setAddItem(true);
                                          setValorItem(Number(item.preco || 0));
                                          setValorUnitario(Number(item.preco || 0));
                                          setAdicionandoItem(true);
                                          setaliIpi(Number(item?.produtos?.aliIpi || 0));
                                          setUnidade1(String(item?.produtos?.tipoUnid || ''));
                                          setUnidade2(String(item?.produtos?.tipoUnid2 || ''));
                                          setQuantUnid(Number(item?.produtos?.conv || 0));
                                          setMult(true);
                                          setUnidadeEscolhida(String(item?.produtos?.tipoUnid || ''));
                                          setProdutoId(Number(item.idProd || 0));
                                          setNomeProduto(String(item?.produtos?.nome || ''));
                                          SetarQuantidade();
                                        }}
                                      >
                                        <RiAddLine className="btn-add-pedido" />
                                      </button>
                                    </OverlayTrigger>
                                  </td>
                                </>
                              )}
                            </tr>
                              );
                            })()
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={isMobile ? 1 : 7} style={{ textAlign: 'center', padding: 18 }}>
                            Nenhum produto encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  <Paginacao
                    total={totalPaginas * qtdePagina}
                    limit={qtdePagina}
                    paginaAtual={pagina}
                    setPagina={setPagina}
                    maxPaginas={totalPaginas}
                  />
                </div>
              </div>

                      <div className="separador"></div>
                      {itensOrcamento.filter(
                        (it) => String(it?.inativo || 'N').toUpperCase() !== 'S'
                      ).length > 0 ? (
                        <div className="table-responsive  tabela-responsiva-pedido-realizado">
                          <div className=" table-wrap">
                            <Table responsive className="table-global table  main-table">
                      <thead>
                        <tr className="tituloTab">
                          {isMobile ? (
                            <th className="th2 nome-grupo paddingPedido">
                              <h1 style={{ marginLeft: 4 }}>LISTA DE PRODUTOS ESCOLHIDOS</h1>
                            </th>
                          ) : (
                            <>
                              <th style={{ textAlign: 'center' }} className="th1 id-grupo th-tabela-pedido paddingPedido">
                                Códigos
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
                              <th style={{ textAlign: 'center' }} className="th4 th-tabela-pedido paddingPedido ">
                                Ações
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {itensOrcamento
                          .filter((it) => String(it?.inativo || 'N').toUpperCase() !== 'S')
                          .map((item, index) => (
                          <tr key={index}>
                            {isMobile ? (
                              <>
                                <div className="d-flex paddingPedido3">
                                  <div
                                    onClick={() => {
                                      setMult(true);
                                      setAddItem(false);
                                      setProdutoId(item.produtoId);
                                      setQuantItem(String(item.quant));
                                      setUnidadeEscolhida('UN');
                                      setAdicionandoItem(true);
                                      setNomeProduto(item.descProduto);
                                      setaliIpi(item.produto.aliIpi);
                                      setValorItem(item.valUnit);
                                      setValorUnitario(item.valUnit);
                                      setUnidade1(item.produto.tipoUnid);
                                      setUnidade2(item.produto.tipoUnid2);
                                      setQuantUnid(item.produto.conv);
                                      SetarQuantidade();
                                      SetarQuantidade();
                                    }}
                                  >
                                    <h2 className="descProdMob3">{item.descProduto}</h2>
                                    <h2 className="desccontdMob2">
                                      Cod.: {item.produtoId}
                                      <b style={{ marginLeft: 10 }}></b>
                                      Qtd.:{item.quant}
                                      <b style={{ marginLeft: 10 }}></b>
                                      Vlr.UN: {moeda(item.valUnit)}
                                      <b style={{ marginLeft: 10 }}></b>
                                    </h2>
                                    <h2 className="desccontdMob2">
                                      Valor R$: {moeda(item.valTotal)}
                                      <b style={{ marginLeft: 10 }}></b>
                                      Ipi %: {Number(empresaId || 0) === 1 ? item.produto.aliIpi : 0}
                                      <b style={{ marginLeft: 10 }}></b>
                                      Item C/Ipi:{' '}
                                      {Number(empresaId || 0) === 1 && item.produto.aliIpi
                                        ? `${moeda(item.valTotal + item.valTotal * (item.produto.aliIpi / 100))}`
                                        : moeda(item.valTotal)}
                                    </h2>
                                  </div>
                                  <div className="divbtnPe">
                                    <button
                                      onClick={() => excluirItemPorProdutoId(item.produtoId)}
                                      className="btn btn-table btn-delete2"
                                    >
                                      <RiDeleteBin5Line />
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <td
                                  style={{ textAlign: 'center' }}
                                  className="id-grupo paddingPedido"
                                  onClick={() => {
                                    setMult(true);
                                    setAddItem(false);
                                    setProdutoId(item.produtoId);
                                    setQuantItem(String(item.quant));
                                    setUnidadeEscolhida('UN');
                                    setAdicionandoItem(true);
                                    setNomeProduto(item.descProduto);
                                    setaliIpi(item.produto.aliIpi);
                                    setValorItem(item.valUnit);
                                    setValorUnitario(item.valUnit);
                                    setUnidade1(item.produto.tipoUnid);
                                    setUnidade2(item.produto.tipoUnid2);
                                    setQuantUnid(item.produto.conv);
                                    SetarQuantidade();
                                    SetarQuantidade();
                                  }}
                                >
                                  {item.produtoId}
                                </td>
                                <td className="nome-grupo paddingPedido">{item.descProduto}</td>
                                <td style={{ textAlign: 'center' }} className="paddingPedido">
                                  {item.quant}
                                </td>
                                <td style={{ textAlign: 'center' }} className="paddingPedido id-valor">
                                  {moeda(item.valUnit)}
                                </td>
                                <td style={{ textAlign: 'center' }} className="paddingPedido id-valor">
                                  {moeda(item.valTotal)}
                                </td>
                                <td style={{ textAlign: 'center' }} className="paddingPedido id-valor">
                                  {Number(empresaId || 0) === 1 ? item.produto.aliIpi : 0}
                                </td>
                                <td style={{ textAlign: 'center' }} className="paddingPedido id-valor">
                                  {Number(empresaId || 0) === 1 && item.produto.aliIpi
                                    ? `${moeda(item.valTotal + item.valTotal * (item.produto.aliIpi / 100))}`
                                    : moeda(item.valTotal)}
                                </td>
                                <td style={{ textAlign: 'center' }} className="paddingPedido">
                                  <button
                                    onClick={() => excluirItemPorProdutoId(item.produtoId)}
                                    className="btn btn-table btn-delete2"
                                  >
                                    <RiDeleteBin5Line />
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}
            </div>
          </div>
        </div>
      </div>
              </div>
            </div>

            <Modal
              className="modal-confirm"
              show={alertErroMensage}
              onHide={fecharAviso}
              backdrop="static"
            >
              <Modal.Body>
                <img style={{ marginTop: 20 }} id="logoSankhya" src={logoAlyne} alt="" />
                <h1 className="super-texto2">{tituloAviso}</h1>
                <h1 style={{ margin: 10 }} className="super-texto3">
                  {msgErro}
                </h1>
                <button
                  style={{ width: 130, marginTop: 10 }}
                  className="btn btn-primary"
                  onClick={fecharAviso}
                >
                  Ok
                </button>
              </Modal.Body>
            </Modal>

      <Modal
        className="modal-confirmLista"
        show={showlistaOrcamentos}
        onHide={handleCloselistaOrcamentos}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <h1>LISTA DE ORÇAMENTOS</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive  tabela-responsiva-pedido-realizado">
            <div className=" table-wrap">
              <Table responsive className="table-global table  main-table">
                <thead>
                  <tr className="tituloTab">
                    <th className="th1">PEDIDOID</th>
                    <th style={{ textAlign: 'center' }} className="th1">
                      CLIENTE
                    </th>
                    <th style={{ textAlign: 'center' }} className="th1">
                      VALOR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listaLoading ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: 24 }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <h1 style={{ marginTop: 15 }}>Carregando lista...</h1>
                          <div className="spinner-border" role="status" />
                        </div>
                      </td>
                    </tr>
                  ) : listaOrcamentos?.length > 0 ? (
                    <>
                      {listaOrcamentos.map((o) => (
                        <tr
                          key={o.id}
                          onClick={async () => {
                            setShowloading(true);
                            try {
                              await selecionarOrcamento(String(o.pedidoId));
                              setShowDetalheSelecionado(true);
                              handleCloselistaOrcamentos();
                            } finally {
                              setShowloading(false);
                            }
                          }}
                        >
                          <td style={{ textAlign: 'center' }} className="id-grupo">
                            {o.pedidoId}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {o.nomeParceiro || ''}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {moeda(Number(o.valor || 0))}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: 18 }}>
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

          <button
            style={{ width: 130, marginTop: 15 }}
            className="btn btn-primary"
            onClick={handleCloselistaOrcamentos}
          >
            Sair
          </button>
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
                    className="btn btn-outline-danger"
                    onClick={async () => {
                      await cancelarSelecionado();
                      setShowDetalheSelecionado(false);
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => {
                      editarSelecionado();
                      setShowDetalheSelecionado(false);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setShowDetalheSelecionado(false);
                      setShowPdf(true);
                    }}
                  >
                    Gerar PDF
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

      <Modal show={showloading} centered>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showPdf} onHide={() => setShowPdf(false)} size="lg" centered fullscreen="md-down">
        <Modal.Header
          closeButton
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <Modal.Title style={{ marginRight: 'auto' }}>PDF Orçamento</Modal.Title>
          <div className="d-flex" style={{ flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            <PDFDownloadLink document={<PdfDoc />} fileName={`orcamento_${(orcamentoPdf || orcamentoSelecionado)?.pedidoId || ''}.pdf`}>
              <PdfDownloadButton />
            </PDFDownloadLink>
            <button className="btn btn-success btn-sm" onClick={handleDownloadExcel} disabled={loadingExcel}>
              Excel
            </button>
          </div>
        </Modal.Header>
        <Modal.Body style={{ height: isMobile ? '70vh' : 600 }}>
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <PdfDoc />
          </PDFViewer>
        </Modal.Body>
      </Modal>
    </>
  );
}
