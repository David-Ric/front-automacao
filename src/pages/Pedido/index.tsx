import React, { useEffect, useRef, useState } from 'react';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../../assets/ole-logo.png';
import LogoAvatar from '../../assets/avatar1.png';
import Messeger from '../.../assets/messege.png';
import ChampGif from '../../assets/playy.gif';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
import logoSankhya from '../../assets/logo-dark.png';
import logoAlyne from '../../assets/logo-dark.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import { phoneMask, moeda, moedaFloat, cnpjMask } from '../../Masks/Masks';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalPDF from 'react-modal';
import 'font-awesome/css/font-awesome.min.css';
import {
  ICabecalho,
  ICabecalho2,
  iDadosUsuario,
  iDataSelect,
  iEmpresa,
  iGrupos,
  iItemPedidoVenda,
  IItemTabelaPreco,
  IItenPedidoSalvar,
  IItensArrayPedido,
  iParceiros,
  iPedidoVenda,
  iTabelaParceiro,
  iTipoNegociacao,
  iTitulo,
} from '../../@types';
import Paginacao from '../../components/Paginacao/index';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { GrAdd } from 'react-icons/gr';
import { RiAddLine, RiDeleteBin5Line } from 'react-icons/ri';
import { FaRegEye, FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';

import Modal from 'react-bootstrap/Modal';
import { stringify } from 'querystring';
//import { placeholderCSS } from 'react-select/dist/declarations/src/components/Placeholder';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
import { BsCheck2Circle, BsEyeSlash, BsHandIndexThumb } from 'react-icons/bs';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineMotionPhotosPaused } from 'react-icons/md';
import {
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import FooterMobile from '../../components/Footer/FooterMobile';
import moment from 'moment-timezone';
import { openDB, DBSchema } from 'idb';
import { versao, versaoFront, criarBancoDados } from '../../data/indexedDB';
import { Message } from '@mui/icons-material';
import { useAppOnlineStatus } from '../../provider/PortalContext';

interface Props {
  cabecalho: ICabecalho;
  itens: IItensArrayPedido[];
}
//=================ITERFACE DELETE ==============================//

//================ INTERFACE DO DB LOCAL ======================//
interface PgamobileDB extends DBSchema {
  usuario: {
    key: number;
    value: {
      id: number;
      username: string;
      email: string;
      grupoId: number;
      status: string;
      funcao: string;
      password: string;
      nomeCompleto: string;
      token: string;
      imagemURL: string;
      primeiroLoginAdm: boolean;
    };
  };
  vendedor: {
    key: number;
    value: {
      id: number;
      codVendedor: number;
      nome: string;
      status: string;
      regiao: string;
      email: string;
      tipo: string;
      atuaCompras: boolean;
      atualizadoEm: string;
    };
  };
  tipoNegociacao: {
    key: number;
    value: {
      id: number;
      descricao: string;
      atualizadoEm: string;
      Natureza: string;
    };
  };
  parceiro: {
    key: number;
    value: {
      id: number;
      codParceiro: number;
      nome: string;
      tipoPessoa: string;
      nomeFantasia: string;
      cnpj_Cpf: string;
      email: string;
      fone: string;
      canal: string;
      classificacao: string;
      tamanhoLoja: string;
      endereco: string;
      bairro: string;
      municipio: string;
      uf: string;
      lat: string;
      long: string;
      lc: number;
      sc: number;
      status: string;
      semVisita: boolean;
      primeiraSem: boolean;
      segundaSem: boolean;
      terceiraSem: boolean;
      quartaSem: boolean;
      quintaSem: boolean;
      segunda: boolean;
      terca: boolean;
      quarta: boolean;
      quinta: boolean;
      sexta: boolean;
      sabado: boolean;
      tipoNegociacao: string;
      empresa: string;
      vendedorId: number;
      vendedor: {
        id: number;
        nome: string;
        status: string;
        regiao: string;
        email: string;
        tipo: string;
        atuaCompras: boolean;
        atualizadoEm: string;
      };
      descTipoNegociacao: string;
      tabelaPrecoParceiro: [
        {
          id: number;
          empresaId: number;
          empresa: {
            id: number;
            descricao: string;
            atualizadoEm: string;
          };
          parceiroId: number;
          tabelaPrecoId: number;
          tabelaPreco: {
            id: number;
            codigo: number;
            descricao: string;
            dataInicial: string;
            dataFinal: string;
            itemTabela: [
              {
                id: number;
                tabelaPrecoId: number;
                idProd: number;
                preco: number;
                produtos: {
                  id: number;
                  nome: string;
                  tipoUnid: string;
                  tipoUnid2: string;
                  conv: number;
                  grupoProdutoId: number;
                  aliIpi: number;
                  grupoProduto: {
                    id: number;
                    nome: string;
                    atualizadoEm: string;
                  };
                  atualizadoEm: string;
                };
                atualizadoEm: string;
              }
            ];
            atualizadoEm: string;
          };
          atualizadoEm: string;
        }
      ];
      titulo: [
        {
          id: number;
          empresaId: number;
          parceiroId: number;
          nuUnico: number;
          parcela: number;
          dataEmissao: string;
          dataVencim: string;
          valor: number;
        }
      ];
      atualizadoEm: string;
    };
  };
  grupoProduto: {
    key: number;
    value: {
      id: number;
      nome: string;
      atualizadoEm: string;
    };
  };
  produto: {
    key: number;
    value: {
      id: number;
      codigo: string;
      nome: string;
      grupoProdutoId: number;
      aliIpi: number;
      grupoProduto: {
        id: number;
        nome: string;
        atualizadoEm: string;
      };
      atualizadoEm: string;
      conv: number;
      tipoUnid: string;
      tipoUnid2: string;
    };
  };
  tabelaPreco: {
    key: number;
    value: {
      id: number;
      codigo: number;
      descricao: string;
      dataInicial: string;
      dataFinal: string;
      atualizadoEm: string;
    };
  };
  itemTabela: {
    key: number;
    value: {
      id: number;
      tabelaPrecoId: number;
      idProd: number;
      preco: number;
      atualizadoEm?: string;
    };
  };
  tabelaPrecoParceiro: {
    key: number;
    value: {
      id: number;
      empresaId: number;
      empresa: {
        id: number;
        descricao: string;
        atualizadoEm: string;
      };
      parceiroId: number;
      tabelaPrecoId: number;
      tabelaPreco: {
        id: number;
        codigo: number;
        descricao: string;
        dataInicial: string;
        dataFinal: string;
        itemTabela: [
          {
            id: number;
            tabelaPrecoId: number;
            idProd: number;
            preco: number;
            produtos: {
              id: number;
              nome: string;
              tipoUnid: string;
              tipoUnid2: string;
              conv: number;
              grupoProdutoId: number;
              aliIpi: number;
              grupoProduto: {
                id: number;
                nome: string;
                atualizadoEm: string;
              };
              atualizadoEm: string;
            };
            atualizadoEm: string;
          }
        ];
        atualizadoEm: string;
      };
      atualizadoEm: string;
    };
  };
  titulo: {
    key: number;
    value: {
      dataEmissao: string;
      dataVencim: string;
      empresaId: number;
      id: number;
      nuUnico: number;
      parceiroId: number;
      parcela: number;
      valor: number;
    };
  };
  cabecalhoPedidoVenda: {
    key: number;
    value: {
      id: number;
      filial: string;
      lote: string;
      vendedorId: number;
      palMPV: string;
      tipoNegociacaoId: number;
      parceiroId: number;
      data: string;
      valor: number;
      dataEntrega: string;
      observacao: string;
      baixado: string;
      pedido: string;
      status: string;
      tipPed: string;
      ativo: string;
      versao: string;
      sincronizado?: string;
    };
  };

  itemPedidoVenda: {
    key: number;
    value: {
      id: number;
      filial: string;
      vendedorId: number;
      palMPV: string;
      produtoId: number;
      produto: {
        id: number;
        nome: string;
        tipoUnid: string;
        tipoUnid2: string;
        conv: number;
        aliIpi: number;
      };
      grupoProdutoId: number;
      quant: number;
      valUnit: number;
      valTotal: number;
      baixado: string;
      sincronizado: string;
    };
  };
  tabelaPrecoAdicional: {
    key: number;
    value: {
      id: number;
      empresaId: number;
      idProd: number;
      parceiroId: number;
      preco: number;
      produtos: {
        id: number;
        nome: string;
        tipoUnid: string;
        tipoUnid2: string;
        conv: number;
        grupoProdutoId: number;
        aliIpi: number;
        grupoProduto: {
          id: number;
          nome: string;
          atualizadoEm: string;
        };
        atualizadoEm: string;
      };

      atualizadoem?: string;
    };
  };
  deleteList: {
    key: number;
    value: {
      id?: number;
      palMPV: string;
      excluido: string;
    };
  };
}

interface iParceir {
  id: number;
  codParceiro: number;
  nome: string;
  tipoPessoa: string;
  nomeFantasia: string;
  cnpj_Cpf: string;
  email: string;
  fone: string;
  canal: string;
  classificacao: string;
  tamanhoLoja: string;
  endereco: string;
  bairro: string;
  municipio: string;
  uf: string;
  lat: string;
  long: string;
  lc: number;
  status: string;
  semVisita: boolean;
  primeiraSem: boolean;
  segundaSem: boolean;
  terceiraSem: boolean;
  quartaSem: boolean;
  quintaSem: boolean;
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  sabado: boolean;
  tipoNegociacao: string;
  empresa: string;
  vendedorId: number;
  vendedor: {
    id: number;
    nome: string;
    status: string;
    regiao: string;
    email: string;
    tipo: string;
    atuaCompras: boolean;
    atualizadoEm: string;
  };
  descTipoNegociacao: string;
  tabelaPrecoParceiro: [
    {
      id: number;
      empresaId: number;
      empresa: {
        id: number;
        descricao: string;
        atualizadoEm: string;
      };
      parceiroId: number;
      tabelaPrecoId: number;
      tabelaPreco: {
        id: number;
        codigo: number;
        descricao: string;
        dataInicial: string;
        dataFinal: string;
        itemTabela: [
          {
            id: number;
            tabelaPrecoId: number;
            idProd: number;
            preco: number;
            produtos: {
              id: number;
              nome: string;
              tipoUnid: string;
              tipoUnid2: string;
              conv: number;
              grupoProdutoId: number;
              aliIpi: number;
              grupoProduto: {
                id: number;
                nome: string;
                atualizadoEm: string;
              };
              atualizadoEm: string;
            };
            atualizadoEm: string;
          }
        ];
        atualizadoEm: string;
      };
      atualizadoEm: string;
    }
  ];
  titulo: {
    id: number;
    empresaId: number;
    parceiroId: number;
    nuUnico: number;
    parcela: number;
    dataEmissao: string;
    dataVencim: string;
    valor: number;
  }[];
  atualizadoEm: string;
}

interface ICabecalhoDB {
  id: number;
  filial: string;
  lote: string;
  vendedorId: number;
  palMPV: string;
  tipoNegociacaoId: number;
  parceiroId: number;
  data: string;
  valor: number;
  dataEntrega: string;
  observacao: string;
  baixado: string;
  pedido: string;
  status: string;
  tipPed: string;
  ativo: string;
  sincronizado?: string;
}

interface IcabecalhoPedido {
  id: number;
  filial: string;
  lote: string;
  vendedorId: number;
  palMPV: string;
  tipoNegociacaoId: number;
  parceiroId: number;
  data: string;
  valor: number;
  dataEntrega: string;
  observacao: string;
  baixado: string;
  pedido: string;
  status: string;
  tipPed: string;
  ativo: string;
  versao: string;
  sincronizado?: string;
}

interface iItemPedido {
  id: number;
  filial: string;
  vendedorId: number;
  palMPV: string;
  produtoId: number;
  produto: {
    id: number;
    nome: string;
    tipoUnid: string;
    tipoUnid2: string;
    conv: number;
    aliIpi: number;
  };
  grupoProdutoId: number;
  quant: number;
  valUnit: number;
  valTotal: number;
  baixado: string;
  sincronizado: string;
}
export interface ICa {
  id: number;
  vendedorId: number;
  parceiroId: number;
  filial: string;
  palMPV: string;
  status: string;
  tipPed: string;
  tipoNegociacaoId: number;
  data: string;
  pedido: string;
  valor: number;
  dataEntrega: string;
  observacao: string;
  ativo: string;
  versao: string;
}

function PedidoVendas() {
  const history = useNavigate();
  const location = useLocation();
  let [user, setUser] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [msgErro2, setMsgErro2] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [erroPendente, seterroPendente] = useState(false);
  const [loading, setLoading] = useState(false);
  const [realizandopedido, setRealizandopedido] = useState(false);
  let [pesquisaPedido, setPesquisaPedido] = useState(false);
  let [editando, setEditando] = useState(false);
  let [editandoRascunho, setEditandoRascunho] = useState(false);
  let [editandoPedido, setEditandoPedido] = useState(false);
  let [cabecalhoPedido, setCabecalhoPedido] = useState<ICabecalho[]>([]);
  let [cabecalhoRasc, setCabecalhoRasc] = useState<ICa[]>([]);
  let [cabecalhoPesquisa, setCabecalhoPesquisa] = useState<ICabecalho2[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  let [totalPaginasList, setTotalPaginasList] = useState(0);
  let [totalPaginasList2, setTotalPaginasList2] = useState(0);
  let [IpiEscolhido, setIpiEscolhido] = useState(0);
  let [pedidoVendaID, setPedidoVendaID] = useState(0);
  let [idVenda, setidVenda] = useState(0);
  let [pagina, setPagina] = useState(1);
  let [paginaItens, setPaginaItens] = useState(1);
  let [totalPaginasItens, setTotalPaginasItens] = useState(0);
  const [qtdePaginaItens, setQtdePaginaItens] = useState(16);
  let [paginaItens2, setPaginaItens2] = useState(1);
  let [totalPaginasItens2, setTotalPaginasItens2] = useState(0);
  const [qtdePaginaItens2, setQtdePaginaItens2] = useState(16);
  let [paginaList, setPaginaList] = useState(1);
  let [codCliente, setCodCliente] = useState('');
  let [tipoNegocia, setTipoNegocia] = useState('');
  const [condPagtoManual, setCondPagtoManual] = useState(false);
  let [tipPed, setTipPed] = useState('1');
  let [descTipo, setDescTipo] = useState('');
  let [naturezaPadraoEdit, setNaturezaPadraoEdit] = useState('');
  let [dataFormarPedido, setDataFormarPedido] = useState('');

  let [palMPVEscolhido, setpalMPVEscolhido] = useState('');
  let QuantItem: number = 0;
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const vendedorCod = usuario.username;
  const [grupoPesquisa, setGrupoPesquisa] = useState<iDataSelect[]>([]);
  let [OptinosNegocia, setOptinosNegocia] = useState<iDataSelect[]>([]);
  const [OptinosEmpresa, setOptinosEmpresa] = useState<iDataSelect[]>([]);
  
  const [promotorPesquisa, setPromotorPesquisa] = useState<iDataSelect[]>([]);
  const [promotorLoading, setPromotorLoading] = useState(false);

  let [clienteSelecionado, setClienteSelecionado] = useState<iParceir | null>(
    null
  ); //============================
 

  useEffect(() => {
    try {
      const emDigitacao =
        localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
      if (!emDigitacao) {
        localStorage.removeItem('ClienteEscolhido');
        localStorage.removeItem('ClienteNome');
        localStorage.removeItem('@Portal/PedidoEmDigitacao');
        localStorage.removeItem('PedidoSelecionadoId');
        localStorage.removeItem('PedidoSelecionadoPALMPV');
        localStorage.removeItem('PedidoInfoFilial');
        localStorage.removeItem('PedidoInfoTipoNegociacaoId');
        localStorage.removeItem('PedidoInfoTipPed');
        localStorage.removeItem('PedidoInfoObservacao');
        return;
      }
      const escolhido = localStorage.getItem('ClienteEscolhido') || '0';
      const clienteNome = localStorage.getItem('ClienteNome') || '';
      const filial = (localStorage.getItem('PedidoInfoFilial') || '').trim();
      const tipoNegId =
        localStorage.getItem('PedidoInfoTipoNegociacaoId') || '';
      const tipoPed = localStorage.getItem('PedidoInfoTipPed') || '';
      const obs = localStorage.getItem('PedidoInfoObservacao') || '';
      const pedidoIdSel =
        localStorage.getItem('PedidoSelecionadoId') || '0';
      const pedidoPalmpvSel =
        localStorage.getItem('PedidoSelecionadoPALMPV') || '';
      if (
        String(escolhido) === '0' &&
        String(pedidoIdSel) === '0' &&
        String(pedidoPalmpvSel).trim() === ''
      ) {
        localStorage.removeItem('@Portal/PedidoEmDigitacao');
        localStorage.removeItem('ClienteEscolhido');
        localStorage.removeItem('ClienteNome');
        localStorage.removeItem('PedidoSelecionadoId');
        localStorage.removeItem('PedidoSelecionadoPALMPV');
        localStorage.removeItem('PedidoInfoFilial');
        localStorage.removeItem('PedidoInfoTipoNegociacaoId');
        localStorage.removeItem('PedidoInfoTipPed');
        localStorage.removeItem('PedidoInfoObservacao');
        return;
      }
      if (escolhido && String(escolhido) !== '0') {
        setCodCliente(String(escolhido));
        codCliente = String(escolhido);
        setParceiroId(Number(escolhido));
        parceiroId = Number(escolhido);
        setRealizandopedido(true);
        setPlaceHolder(`${escolhido} - ${clienteNome}`);
        placeHolder = `${escolhido} - ${clienteNome}`;
        if (filial) {
          setCodEmpresa(String(filial));
          codEmpresa = String(filial);
          GetTabelaPreco();
        }
        if (tipoNegId) {
          setTipoNegocia(String(tipoNegId));
          tipoNegocia = String(tipoNegId);
        }
        if (tipoPed) {
          setTipPed(String(tipoPed));
          tipPed = String(tipoPed);
        }
        if (obs) {
          setObservacao(String(obs));
          observacao = String(obs);
        }
        (async () => {
          Getcliente(Number(escolhido));
          GetCabecalho();
          GetTresUltimos();
          GetListaCabecalho();
          if (pedidoIdSel && String(pedidoIdSel) !== '0') {
            setCabecalhoId(Number(pedidoIdSel));
            cabecalgoId = Number(pedidoIdSel);
          }
          if (pedidoPalmpvSel) {
            setpalMPVEscolhido(String(pedidoPalmpvSel));
            palMPVEscolhido = String(pedidoPalmpvSel);
          }
        })();
      }
    } catch {}
  }, []);

 

  //============lista de rascunho ===========================================
  const [showlistaRasc, setShowlistaRasc] = useState(false);
  const handleCloselistaRasc = () => setShowlistaRasc(false);
  let [modalList, setmodalList] = useState(false);
  let [modalList2, setmodalList2] = useState(false);
  //===========================================================================

  const [showupdatePromotor, setShowupdatePromotor] = useState(false);
  const handleCloseupdatePromotor = () => setShowupdatePromotor(false);

  const [showlistaPedidos, setShowlistaPedidos] = useState(false);
  const handleCloselistaPedidos = () => setShowlistaPedidos(false);
  const [showlistaPedidosSelec, setShowlistaPedidosSelec] = useState(false);
  const [mobileListaTab, setMobileListaTab] = useState<'api' | 'local'>('api');
  const [listaLoading, setListaLoading] = useState(false);
  const [mostrarTelaPedidoPrincipal, setMostrarTelaPedidoPrincipal] = useState(false);
  const skipPaginaListFetchRef = useRef(false);
  const listaCabecalhoRequestIdRef = useRef(0);

  
  function handleCloselistaPedidosSelec() {
    setmodalList(false);
    modalList = false;
    setShowlistaPedidosSelec(false);
    try {
      localStorage.setItem('PedidoAbrirModalSelec', 'false');
      localStorage.removeItem('PedidoSelecionadoOrigem');
    } catch {}
  }
  async function GetitensPedidoVendaIdListaApiPorId(pedidoId: number) {
    setSucess(70);
    sucess = 70;
    window.scrollTo(0, 0);
    setItensPedidoSelecionado([]);
    itensPedidoSelecionado = [];
    await api
      .get(
        `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${pedidoId}`
      )
      .then((resp) => {
        const itensVindoGet: iItemPedidoVenda[] = resp?.data?.data ?? [];
        setSucess(100);
        sucess = 100;
        setItensPedidoSelecionadoList(itensVindoGet);
        itensPedidoSelecionadoList = itensVindoGet;
        setTotalPaginasItens(Math.ceil(itensVindoGet.length / qtdePaginaItens));
        totalPaginasItens = Math.ceil(itensVindoGet.length / qtdePaginaItens);
        if (totalPaginasItens > 0 && paginaItens > totalPaginasItens) {
          setPaginaItens(totalPaginasItens);
          setLoadingItensPedidoSelecionado(false);
          return;
        }
        setItensPedidoSelecionado(
          itensVindoGet.slice(
            (paginaItens - 1) * qtdePaginaItens,
            paginaItens * qtdePaginaItens
          ) || []
        );
        itensPedidoSelecionado =
          itensVindoGet.slice(
            (paginaItens - 1) * qtdePaginaItens,
            paginaItens * qtdePaginaItens
          ) || [];
        let somaTotalIpiGet = 0;
        itensVindoGet.forEach((item: any) => {
          const valorCalculado = item?.produto?.aliIpi
            ? item.valTotal + item.valTotal * (item.produto?.aliIpi / 100)
            : item.valTotal;
          somaTotalIpiGet += valorCalculado;
        });
        setValorPedidoSelecionado(
          itensVindoGet.reduce(
            (accumulator: any, item: any) => accumulator + item.valTotal,
            0
          )
        );
        valorPedidoSelecionado = itensVindoGet.reduce(
          (accumulator: any, item: any) => accumulator + item.valTotal,
          0
        );
        setIpiEscolhido(somaTotalIpiGet);
        IpiEscolhido = somaTotalIpiGet;
        if (modalList) {
          setShowMensageLoading(false);
          setPesquisaPedido(true);
          pesquisaPedido = true;
        } else {
          setShowMensageLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setShowMensageLoading(false);
      });
  }
  async function carregarNaturezaPadrao(tipoId: string | number) {
    try {
      const tipoStr = String(tipoId ?? '');
      if (tipoStr === '' || tipoStr === '0') {
        setNaturezaPadraoEdit('');
        return;
      }
      try {
        const raw = localStorage.getItem('@Portal/tipoNegociacaoNaturezaPadrao') || '[]';
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length > 0) {
          const ach =
            arr.find((x: any) => String(x?.id) === String(tipoStr)) ??
            arr.find((x: any) => String(x?.Id) === String(tipoStr));
          if (ach && ach?.NaturezaPadrao) {
            setNaturezaPadraoEdit(String(ach.NaturezaPadrao).trim());
            return;
          }
        }
      } catch {}
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const store = db.transaction('tipoNegociacao', 'readonly').objectStore('tipoNegociacao');
      const tipo = await store.get(Number(tipoId));
      try { console.log('TIPO DE NATUREZA', 'IndexedDB', tipo); } catch {}
      if (tipo && (tipo as any)?.Natureza) {
        const nat = String((tipo as any).Natureza).trim();
        setNaturezaPadraoEdit(nat);
        try {
          upsertNaturezaPadraoLocalStorage(tipoId, nat, (tipo as any)?.descricao, (tipo as any)?.atualizadoEm);
        } catch {}
        return;
      }
      try {
        const resp = await api.get(`/api/TipoNegociacao/${tipoId}`);
        try { console.log('TIPO DE NATUREZA', 'API', resp?.data); } catch {}
        const nat = String(resp?.data?.Natureza || '').trim();
        setNaturezaPadraoEdit(nat);
        try {
          upsertNaturezaPadraoLocalStorage(tipoId, nat, resp?.data?.descricao, resp?.data?.atualizadoEm);
        } catch {}
      } catch {
        setNaturezaPadraoEdit('');
      }
    } catch {
      try {
        const resp = await api.get(`/api/TipoNegociacao/${tipoId}`);
        try { console.log('TIPO DE NATUREZA', 'API', resp?.data); } catch {}
        const nat = String(resp?.data?.Natureza || '').trim();
        setNaturezaPadraoEdit(nat);
        try {
          upsertNaturezaPadraoLocalStorage(tipoId, nat, resp?.data?.descricao, resp?.data?.atualizadoEm);
        } catch {}
      } catch {
        setNaturezaPadraoEdit('');
      }
    }
  }
  async function carregarNaturezaPadraoPorDescricao(descricao: string) {
    const normalize = (s: any) =>
      String(s ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toUpperCase();
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const store = db.transaction('tipoNegociacao', 'readonly').objectStore('tipoNegociacao');
      const todos = await store.getAll();
      const alvo = normalize(descricao);
      const item = todos.find((t: any) => normalize(t?.descricao) === alvo);
      if (item && item?.Natureza) {
        setNaturezaPadraoEdit(String(item.Natureza).trim());
        return;
      }
      try {
        const resp = await api.get(`/api/TipoNegociacao/v2/all`);
        const lista = Array.isArray(resp?.data?.data) ? resp.data.data : [];
        const ach = lista.find((t: any) => normalize(t?.descricao) === alvo);
        setNaturezaPadraoEdit(String(ach?.Natureza || '').trim());
      } catch {
        setNaturezaPadraoEdit('');
      }
    } catch {
      try {
        const resp = await api.get(`/api/TipoNegociacao/v2/all`);
        const lista = Array.isArray(resp?.data?.data) ? resp.data.data : [];
        const alvo = normalize(descricao);
        const ach = lista.find((t: any) => normalize(t?.descricao) === alvo);
        setNaturezaPadraoEdit(String(ach?.Natureza || '').trim());
      } catch {
        setNaturezaPadraoEdit('');
      }
    }
  }

  let [dataPedido1, setdataPedido1] = useState('');
  let [dataPedido2, setdataPedido2] = useState('');
  let [dataPedido3, setdataPedido3] = useState('');

  const [nomeCliente, setNomeCliente] = useState('');
  const [bairroCliente, setbairroCliente] = useState('');
  const [cidadeCliente, setcidadeCliente] = useState('');
  const [foneCliente, setfoneCliente] = useState('');
  const [emailCliente, setemailCliente] = useState('');
  const [ufCliente, setufCliente] = useState('');
  const [cnpjCliente, setcnpjCliente] = useState('');
  const [endCliente, setendCliente] = useState('');
  const [codiCliente, setcodiCliente] = useState('');
  const [fantasiaCliente, setfantasiaCliente] = useState('');
  let [tipoNegocSelect, setTipoNegocSelect] = useState<iTipoNegociacao[]>([]);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroMensage2, setAlertErroMensage2] = useState(false);
  const [alertErroMensage1, setAlertErroMensage1] = useState(false);
  let [tipoEmpresaSelect, setTipoEmpresaSelect] = useState<iTabelaParceiro[]>(
    []
  );

  let [dadosTabelaParceiro, setDadosTabelaParceiro] = useState<
    iTabelaParceiro[]
  >([]);

  let [parceiroId, setParceiroId] = useState(0);

  let [tipoEmpresa, setTipoEmpresa] = useState<iEmpresa[]>([]);
  let [itensTabela, setItensTabela] = useState<IItemTabelaPreco[]>([]);
  let [itensTabelaGeral, setItensTabelaGeral] = useState<IItemTabelaPreco[]>(
    []
  );
  interface Inumeros {
    grupoId: number;
  }
  let [itensTabelaTotal, setItensTabelaTotal] = useState<Inumeros[]>([]);
  let [itensPedido, setItensPedido] = useState<iItemPedidoVenda[]>([]);
  let [grupoProdutos, setGrupoProdutos] = useState<iGrupos[]>([]);
  const [arrayPedido, setIArrayPedido] = useState<IItensArrayPedido[]>([]);
  let [arrayPedidoValor, setIArrayPedidoValor] = useState<IItensArrayPedido[]>(
    []
  );
  let [tresUltimos, setTresUltimos] = useState<iPedidoVenda[]>([]);
  function mapArrayPedidoToSalvar(pal: string): IItenPedidoSalvar[] {
    const itensValidos = arrayPedido.filter(
      (item: IItensArrayPedido) => item.valUnit > 0 && item.valTotal > 0
    );
    return itensValidos.map(
      ({ descProduto, unidade, produto, inativo, ...rest }: IItensArrayPedido) => ({
        ...rest,
        palMPV: pal,
        baixado: 'N',
        filial: String(codEmpresa),
        inativo: String(inativo || 'N').toUpperCase() === 'S' ? 'S' : 'N',
      })
    );
  }

  function contarItensAtivos(itens: any[]) {
    return (Array.isArray(itens) ? itens : []).filter(
      (i: any) => String(i?.inativo || 'N').toUpperCase() !== 'S'
    ).length;
  }

  function filtrarItensAtivosLista(itens: any[]) {
    return (Array.isArray(itens) ? itens : []).filter(
      (i: any) => String(i?.inativo ?? i?.Inativo ?? 'N').trim().toUpperCase() !== 'S'
    );
  }

  function validarPedidoComItensAtivos(itens: any[], acao: string) {
    const ativos = contarItensAtivos(itens);
    if (ativos > 0) return true;
    setShowMensage(true);
    setAlertErroMensage(true);
    setMsgErro(`Adicione ao menos 1 item ativo antes de ${acao}.`);
    return false;
  }

  let [pedidoSelecao, setPedidoSelecao] = useState<iPedidoVenda[]>([]);

  let [pedidoCabecalho, setPedidoCabecalho] = useState<ICabecalho[]>([]);

  let [titulo, setTitulo] = useState<iTitulo[]>([]);

  const [qtdePagina, setQtdePagina] = useState(5);
  const [qtdePaginaList, setQtdePaginaList] = useState(10);

  let [descTabelaPreco, setDescTabelaPreco] = useState('');
  let [cnpj, setcnpj] = useState('');
  let [enderecoCliente, setEnderecoCliente] = useState('');
  // ============== usestates do pedido ======================

  let [codEmpresa, setCodEmpresa] = useState('');

  let [descPedido01, setDescPedido01] = useState('');
  let [descSankhya01, setDescSankhya01] = useState('');
  let [descSankhya02, setDescSankhya02] = useState('');
  let [descSankhya03, setDescSankhya03] = useState('');
  let [valorPedido01, setValorPedido01] = useState(0);
  let [descPedido02, setDescPedido02] = useState('');
  let [valorPedido02, setValorPedido02] = useState(0);
  let [descPedido03, setDescPedido03] = useState('');
  let [valorPedido03, setValorPedido03] = useState(0);

  let [pedidoId01, setPedidoId01] = useState(0);
  let [pedidoId02, setPedidoId02] = useState(0);
  let [pedidoId03, setPedidoId03] = useState(0);
  let [prodIDArray, setprodIDArray] = useState(0);
  let [valorTotalComIpi, setvalorTotalComIpi] = useState(0);

  let [status01, setStatus01] = useState('');
  let [status02, setStatus02] = useState('');
  let [status03, setStatus03] = useState('');
  let [pedidoSelecionado, setPedidoSelecionado] = useState(0);

  let [codTabela, setCodTabela] = useState('');

  const [showMensage, setShowMensage] = useState(false);
  const [showMensage2, setShowMensage2] = useState(false);
  const [showMensageDelete, setShowMensageDelete] = useState(false);
  const [showMensagedup, setShowMensagedup] = useState(false);

  //================ PESQUISA LISTA PEDIDSO =========================
  const [todos, settodos] = useState(true);
  const [enviados, setenviados] = useState(false);
  const [pendentes, setpendentes] = useState(false);
  const [nenviados, setnenviados] = useState(false);
  //==================================================================
  let [erroSankhya, setErroSankhya] = useState(false);
  let [pedidosanteriores, setpedidosanteriores] = useState(false);
  let [processou, setprocessossou] = useState(false);

  let [podeDuplicar, setpodeDuplicar] = useState(true);

  let [qtdItensVenc, setQuantItensVenc] = useState(0);
  let [valorItensVenc, setValorItensVenc] = useState(0);
  const [valorTotalNovo, setvalorTotalNovo] = useState(0);

  useEffect(() => {
    if (String(codEmpresa) === '2') {
      setNaturezaPadraoEdit('110102 - Receita de Revenda de Mercadorias');
    } else {
      setNaturezaPadraoEdit('');
    }
  }, [codEmpresa]);
  let [conv, setConv] = useState(0);
  const [observacaoPDF, setobservacaoPDF] = useState('');

  const [showMensageSankhyaErro2, setShowMensageSankhyaErro2] = useState(false);

  const [msgErroSakhya, setMsgErroSankhya] = useState('');
  const [msgErroSakhya2, setMsgErroSankhya2] = useState('');
  const [msgErroSakhya3, setMsgErroSankhya3] = useState('');
  const [msgErroSakhya4, setMsgErroSankhya4] = useState('');
  const [msgErroSakhya5, setMsgErroSankhya5] = useState('');
  const [msgErroSakhya6, setMsgErroSankhya6] = useState('');
  const [msgErroSakhya7, setMsgErroSankhya7] = useState('');
  const [msgErroSakhya8, setMsgErroSankhya8] = useState('');
  const [msgErroSakhya9, setMsgErroSankhya9] = useState('');
  const [msgErroSakhya11, setMsgErroSankhya11] = useState('');
  const [atualiza, setatualiza] = useState(true);

  function handleCloseMensageSankhyaErro() {
    setatualiza(false);
    setShowMensageSankhya(false);
    setShowMensageSankhyaErro(false);
  }
  const [showMensageSankhyaErro, setShowMensageSankhyaErro] = useState(false);

  const [showMensageLoading, setShowMensageLoading] = useState(false);
  const [loadingItensPedidoSelecionado, setLoadingItensPedidoSelecionado] =
    useState(false);
  function handleCloseMensageLoading() {
    setShowMensageLoading(false);
  }

  const [showMensageLoadingDup, setShowMensageLoadingDup] = useState(false);
  function handleCloseMensageLoadingDup() {
    setShowMensageLoadingDup(false);
  }

  function handleCloseMensageSankhyaErro2() {
    setShowMensageSankhyaErro2(false);
  }

  const apagarValor = () => {
    setQuantItem('');
    quantItem = '';
  };

  let [isMobile, setIsMobile] = useState(false);
  const [atualizando, setatualizando] = useState(false);
  const { appOnline } = useAppOnlineStatus();
  const [isOnline, setIsOnline] = useState(() => {
    try {
      return window.navigator.onLine;
    } catch {
      return true;
    }
  });
  const verificarEnvioExecutedRef = useRef(false);

  useEffect(() => {
    setIsOnline(!!appOnline);
  }, [appOnline]);

  useEffect(() => {
    localStorage.setItem('@Portal/sincronizar', 'true');
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
  useEffect(() => {
    if (!isOnline) return;
    if (verificarEnvioExecutedRef.current) return;
    verificarEnvioExecutedRef.current = true;
    //VerificarPedidoEnviado();
  }, [isOnline]);

  useEffect(() => {
    console.log('valores somados', moeda(valorTotalComIpi));
  }, [valorTotalComIpi]);

  useEffect(() => {
    console.log('valores somados IpiEscoliho', moeda(IpiEscolhido));
  }, [IpiEscolhido]);

  function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      out.push(arr.slice(i, i + chunkSize));
    }
    return out;
  }

  function escapeSqlString(v: string) {
    return String(v || '').replace(/'/g, "''");
  }

  async function isVerificarEnvioHabilitado(): Promise<boolean> {
    try {
      const resp = await api.get('/api/Etiqueta/1');
      const titulo = String((resp as any)?.data?.titulo ?? '').trim();
      const nomeTxt = String((resp as any)?.data?.nomeTxt ?? '').trim();
      return titulo === 'Verificar Envio' && nomeTxt === 'Verificar Envio';
    } catch {
      return false;
    }
  }

  async function atualizarCabecalhosLocaisEnviados(palToPedido: Map<string, string>) {
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const tx = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = tx.objectStore('cabecalhoPedidoVenda');
      const allCabecalhos = await store.getAll();

      for (const cab of allCabecalhos) {
        const pal = String(cab?.palMPV || '').trim();
        const pedido = palToPedido.get(pal);
        const ativo = String(cab?.ativo || '').trim().toUpperCase();
        const statusLocal = String(cab?.status || '').trim();
        if (
          pedido &&
          ativo === 'S' &&
          cab?.vendedorId == Number(usuario.username) &&
          (statusLocal === 'AProcessar' ||
            statusLocal === 'Processar' ||
            statusLocal === 'EmEnvio')
        ) {
          cab.status = 'Enviado';
          cab.pedido = pedido;
          await store.put(cab);
        }
      }

      await tx.done;
    } catch {}
  }

  async function VerificarPedidoEnviado() {
    if (!isOnline) return;
    const habilitado = await isVerificarEnvioHabilitado();
    if (!habilitado) return;

    try {
      const resp = await api.get(
        `/api/CabecalhoPedidoVenda/v2/processar/vendedor?pagina=1&totalpagina=200&codVendedor=${usuario.username}`
      );
      const lista: ICabecalho2[] = Array.isArray((resp as any)?.data?.data)
        ? (resp as any).data.data
        : [];

      const candidatos = lista.filter((c) => {
        const ativo = String((c as any)?.ativo || '').trim().toUpperCase();
        return ativo === 'S' && (c as any)?.vendedorId == Number(usuario.username);
      });

      const pals = candidatos
        .map((c) => String((c as any)?.palMPV || '').trim())
        .filter(Boolean);

      if (pals.length === 0) return;

      const palToPedido = new Map<string, string>();
      const chunks = chunkArray(pals, 40);

      for (const chunk of chunks) {
        const inList = chunk.map((p) => `'${escapeSqlString(p)}'`).join(',');
        const sql = `SELECT PALMPV, PEDIDO FROM AD_Z38 WHERE PALMPV IN (${inList}) AND PEDIDO IS NOT NULL`;
        const respSankhya = await api.post(
          `/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`
        );
        const rows = (respSankhya as any)?.data?.responseBody?.rows ?? [];
        for (const row of rows) {
          const pal = String(row?.[0] ?? '').trim();
          const pedido = String(row?.[1] ?? '').trim();
          if (pal && pedido) palToPedido.set(pal, pedido);
        }
      }

      const atualizar = candidatos.filter((cab) => {
        const pal = String((cab as any)?.palMPV || '').trim();
        const pedido = palToPedido.get(pal);
        return Boolean(pedido);
      });

      for (const cab of atualizar) {
        const pal = String((cab as any)?.palMPV || '').trim();
        const pedido = String(palToPedido.get(pal) || '').trim();
        if (!pedido) continue;
        await api.put(`/api/CabecalhoPedidoVenda/${(cab as any).id}`, {
          ...(cab as any),
          id: (cab as any).id,
          pedido,
          status: 'Enviado',
          ativo: 'S',
        });
      }

      if (palToPedido.size > 0) {
        await atualizarCabecalhosLocaisEnviados(palToPedido);
      }
    } catch {}
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      apagarValor();
    }
  };

  useEffect(() => {
    const valor = String(tipoNegocia ?? '');
    if (valor === '' || valor === '0') {
      carregarNaturezaPadraoPorDescricao('');
      return;
    }
    const opt = OptinosNegocia.find(
      (o) => String(o.value) === String(valor)
    );
    const label =
      opt?.label ??
      (valor === '1' ? 'À VISTA' : descTipo);
    carregarNaturezaPadraoPorDescricao(label);
  }, [tipoNegocia, OptinosNegocia, descTipo]);

  useEffect(() => {
    const valor = String(tipoNegocia ?? '');
    if (!valor) return;
    const opt = OptinosNegocia.find((o) => String(o.value) === String(valor));
    const label = opt?.label ? String(opt.label) : '';
    if (label && descTipo !== label) {
      setDescTipo(label);
    }
  }, [tipoNegocia, OptinosNegocia, descTipo]);
  let [isOnlineC, setIsOnlineC] = useState(true);
  useEffect(() => {
    if (isOnline) {
      setIsOnlineC(true);
      isOnlineC = true;
    } else {
      setIsOnlineC(false);
      isOnlineC = false;
    }
  }, [isOnline]);
  interface iCabecalhoDelete {
    palMPV: string;
    excluido: string;
  }

  //==================get pesquisa lista cabecalho ===================================================
  async function OpemModal() {
    window.scrollTo(0, 0);
    const shouldSkipNextPageFetch = paginaList !== 1;
    skipPaginaListFetchRef.current = shouldSkipNextPageFetch;
    const onlineNow = (() => {
      try {
        return isOnline || localStorage.getItem('@Portal/Status') === 'true';
      } catch {
        return isOnline;
      }
    })();
    const tabInicial: 'api' | 'local' = onlineNow ? 'api' : 'local';
    setMobileListaTab(tabInicial);
    setPaginaList(1);
    paginaList = 1;
    settodos(true);
    setenviados(false);
    setpendentes(false);
    setnenviados(false);
    setPendenteErro(false);
    setSearchList('todos');
    searchList = 'todos';
    setShowlistaPedidos(true);
  }
  useEffect(() => {
    if (skipPaginaListFetchRef.current) {
      skipPaginaListFetchRef.current = false;
      return;
    }
    if (!showlistaPedidos) return;
    const onlineNow = (() => {
      try {
        return isOnline || localStorage.getItem('@Portal/Status') === 'true';
      } catch {
        return isOnline;
      }
    })();
    GetListaCabecalho(onlineNow ? mobileListaTab : 'local');
  }, [paginaList]);

  async function GetListaCabecalho(tabOverride?: 'api' | 'local') {
    window.scrollTo(0, 0);
    const requestId = ++listaCabecalhoRequestIdRef.current;
    setListaLoading(true);
    setItensPedidoSelecionado([]);
    itensPedidoSelecionado = [];
    console.log('entrou na busca', searchList);
    setCabecalhoPesquisa([]);
    cabecalhoPesquisa = [];
    let tabAtual = tabOverride ?? mobileListaTab;
    const onlineNow = (() => {
      try {
        return isOnline || localStorage.getItem('@Portal/Status') === 'true';
      } catch {
        return isOnline;
      }
    })();
    if (!onlineNow) tabAtual = 'local';
    const isLocalTab = tabAtual !== 'api';
    try {
      const normalizeStatus = (v: any) =>
        String(v || '')
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      const getTime = (v: any) => {
        const t = Date.parse(String(v || ''));
        return Number.isNaN(t) ? 0 : t;
      };

      if (tabAtual === 'api') {
        const statusBusca = normalizeStatus(searchList);
        let response: any;

        if (statusBusca === 'aprocessar' || statusBusca === 'processar') {
          response = await api.get(
            `/api/CabecalhoPedidoVenda/v2/processar/vendedor?pagina=${paginaList}&totalpagina=${qtdePaginaList}&codVendedor=${usuario.username}&codParceiro=${Number(parceiroId) || 0}&somenteAtivos=true`
          );
        } else {
          response = await api.get(
            `/api/CabecalhoPedidoVenda/v2/filter/status?pagina=${paginaList}&totalpagina=${qtdePaginaList}&codVendedor=${usuario.username}&codParceiro=${Number(parceiroId) || 0}&status=${searchList}`
          );
        }

        const listaPedidosPagina: ICabecalho2[] = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        const ordenada = [...listaPedidosPagina].sort((a: any, b: any) => {
          const ra = normalizeStatus(a?.status) === 'pendente' ? 0 : 1;
          const rb = normalizeStatus(b?.status) === 'pendente' ? 0 : 1;
          if (ra !== rb) return ra - rb;
          const ta = getTime(a?.data);
          const tb = getTime(b?.data);
          if (ta !== tb) return tb - ta;
          return String(b?.palMPV || '').localeCompare(String(a?.palMPV || ''));
        });

        const totalRegistros = Number(response?.data?.total || 0);
        const totalPaginasCalc = Math.ceil(totalRegistros / qtdePaginaList);

        if (requestId !== listaCabecalhoRequestIdRef.current) return;
        setCabecalhoPesquisa(ordenada);
        cabecalhoPesquisa = ordenada;
        setTotalPaginasList(totalPaginasCalc);
      } else {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
        const store = transaction.objectStore('cabecalhoPedidoVenda');
        const cabecalho = await store.getAll();

        const base = cabecalho.filter(
          (item) =>
            item.vendedorId == Number(usuario.username) &&
            item.ativo != 'N' &&
            String(item.sincronizado || '') === 'N'
        );
        const byParceiro =
          Number(parceiroId) > 0
            ? base.filter((item) => item.parceiroId == Number(parceiroId))
            : base;

        const ordenada = [...byParceiro].sort((a: any, b: any) => {
          const ra = normalizeStatus(a?.status) === 'pendente' ? 0 : 1;
          const rb = normalizeStatus(b?.status) === 'pendente' ? 0 : 1;
          if (ra !== rb) return ra - rb;
          const ta = getTime(a?.data);
          const tb = getTime(b?.data);
          if (ta !== tb) return tb - ta;
          return String(b?.palMPV || '').localeCompare(String(a?.palMPV || ''));
        });

        const startIndex = (paginaList - 1) * qtdePaginaList;
        const endIndex = startIndex + qtdePaginaList;
        const paginatedData = ordenada.slice(startIndex, endIndex);
        const totalPaginasCalc = Math.ceil(ordenada.length / qtdePaginaList);

        if (requestId !== listaCabecalhoRequestIdRef.current) return;
        setTotalPaginasList(totalPaginasCalc);
        setCabecalhoPesquisa(paginatedData);
        cabecalhoPesquisa = paginatedData;
      }
    } catch (error) {
      if (requestId !== listaCabecalhoRequestIdRef.current) return;
      if (isLocalTab) setLoading(false);
    } finally {
      if (requestId === listaCabecalhoRequestIdRef.current) {
        setListaLoading(false);
      }
    }
  }

  async function AtualizarPedidosLocaisPeloPalMPVDaApi() {
    if (!isOnline) return;

    try {
      const resp = await api.get(
        `/api/CabecalhoPedidoVenda/v2/filter/status?pagina=1&totalpagina=999&codVendedor=${usuario.username}&codParceiro=${Number(parceiroId) || 0}&status=todos`
      );

      const listaApi: ICabecalho2[] = Array.isArray(resp?.data?.data)
        ? resp.data.data
        : [];

      if (listaApi.length === 0) return;

      const apiByPal = new Map<string, ICabecalho2>();
      for (const it of listaApi) {
        apiByPal.set(String(it?.palMPV || ''), it);
      }

      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      const todosLocal = await store.getAll();

      const locais = todosLocal.filter(
        (item: any) =>
          item.vendedorId == Number(usuario.username) &&
          item.ativo != 'N' &&
          String(item.sincronizado || '') === 'N'
      );

      for (const pedidoLocal of locais as any[]) {
        const pal = String(pedidoLocal?.palMPV || '');
        if (!pal) continue;

        const pedidoApi = apiByPal.get(pal);
        if (!pedidoApi) continue;

        const statusApi = String(pedidoApi?.status || '').trim();
        const statusLocal = String(pedidoLocal?.status || '').trim();

        let mudou = false;
        let novoId: number | null = null;

        if (
          statusLocal === 'Pendente' &&
          (statusApi === 'AProcessar' ||
            statusApi === 'EmEnvio' ||
            statusApi === 'Enviado')
        ) {
          pedidoLocal.status = statusApi;
          mudou = true;
        }

        const sincronizadoAtual = String(pedidoLocal?.sincronizado || '');
        if (sincronizadoAtual !== 'R') {
          const novoSincronizado =
            statusApi === 'AProcessar' ||
            statusApi === 'EmEnvio' ||
            statusApi === 'Enviado'
              ? 'S'
              : 'N';
          if (novoSincronizado !== sincronizadoAtual) {
            pedidoLocal.sincronizado = novoSincronizado;
            mudou = true;
          }
        }

        if (Number(pedidoApi?.id) > 0 && Number(pedidoApi?.id) !== Number(pedidoLocal?.id)) {
          novoId = Number(pedidoApi.id);
        }

        if (novoId) {
          const idAntigo = Number(pedidoLocal.id);
          const existenteMesmoId: any = await store.get(novoId);
          if (existenteMesmoId && String(existenteMesmoId?.palMPV || '') !== pal) {
            await store.delete(existenteMesmoId.id);
          }
          if (idAntigo > 0) {
            await store.delete(idAntigo);
          }
          pedidoLocal.id = novoId;
          mudou = true;
        }

        if (mudou) {
          await store.put(pedidoLocal);
        }
      }

      await transaction.done;

      try {
        const txItem = db.transaction('itemPedidoVenda', 'readwrite');
        const storeItem = txItem.objectStore('itemPedidoVenda');
        const todosItens = await storeItem.getAll();
        for (const item of todosItens as any[]) {
          const pal = String(item?.palMPV || '');
          if (!pal) continue;
          const pedidoApi = apiByPal.get(pal);
          if (!pedidoApi) continue;
          const statusApi = String(pedidoApi?.status || '').trim();
          const sincronizadoAtual = String(item?.sincronizado || '');
          if (sincronizadoAtual === 'R') continue;
          const novoSincronizado =
            statusApi === 'AProcessar' ||
            statusApi === 'EmEnvio' ||
            statusApi === 'Enviado'
              ? 'S'
              : 'N';
          if (novoSincronizado !== sincronizadoAtual) {
            item.sincronizado = novoSincronizado;
            await storeItem.put(item);
          }
        }
        await txItem.done;
      } catch {}
    } catch {}
  }
  useEffect(() => {
    (async () => {
      if (showlistaPedidos) {
        const onlineNow = (() => {
          try {
            return isOnline || localStorage.getItem('@Portal/Status') === 'true';
          } catch {
            return isOnline;
          }
        })();
        if (onlineNow) {
          await AtualizarPedidosLocaisPeloPalMPVDaApi();
        }
        await GetListaCabecalho(onlineNow ? mobileListaTab : 'local');
      }
    })();
  }, [showlistaPedidos]);

  async function GetListaCabecalho2() {
    setCabecalhoPesquisa([]);
    cabecalhoPesquisa = [];
    if (!isMobile) {
      await api

        .get(
          `/api/CabecalhoPedidoVenda/v2/filter/status?pagina=${paginaList}&totalpagina=${qtdePaginaList}&codVendedor=${usuario.username}&codParceiro=${parceiroId}&status=${searchList}`
        )
        .then((response) => {
          console.log('Lista de pedidos', response.data);
          const listaPedidos: ICabecalho2[] = response.data.data;

          const pendentesPrimeiro = response.data.data.filter((it: any) => String(it?.status || '').trim() === 'Pendente');
          const demais = response.data.data.filter((it: any) => String(it?.status || '').trim() !== 'Pendente');
          const ordenada = [...pendentesPrimeiro, ...demais];
          setCabecalhoPesquisa(ordenada);
          cabecalhoPesquisa = ordenada;
          setTotalPaginasList(Math.ceil(response.data.total / qtdePaginaList));
          setShowlistaPedidos(true);
        })
        .catch((error) => {});
    } else {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
        const store = transaction.objectStore('cabecalhoPedidoVenda');

        const cabecalho = await store.getAll();
          let totais: ICabecalho2[];

          const base = cabecalho.filter(
            (item) =>
              item.vendedorId == Number(usuario.username) &&
              item.ativo != 'N' &&
              String(item.sincronizado || '') === 'N'
          );
          const byParceiro =
            Number(parceiroId) > 0
              ? base.filter((item) => item.parceiroId == Number(parceiroId))
              : base;
          if (searchList === 'todos') {
            totais = byParceiro;
          } else {
            totais = byParceiro.filter(
              (item) => item.status.trim() == searchList
            );
          }

        totais.reverse();

        const startIndex = (paginaList - 1) * qtdePaginaList;
        const endIndex = startIndex + qtdePaginaList;
        const paginatedData = totais.slice(startIndex, endIndex);

        setTotalPaginasList(Math.ceil(totais.length / qtdePaginaList));
        setCabecalhoPesquisa(paginatedData);
        cabecalhoPesquisa = paginatedData;
        setShowlistaPedidos(true);
      } catch (error) {
        setLoading(false);
        console.log('Ocorreu um erro', error);
      }
    }
  }

  //=========== BUSCA OS 60 ULTIMOS PEDIDOS DO VENDEDOR =======================================================================================

  async function GetCabecalho() {
    if (isOnline) {
      await api
        .get(
          `/api/CabecalhoPedidoVenda/ultimos/vendedor?codVendedor=${usuario.username}`
        )
        .then((response) => {
          console.log('Cabecalhos centralizar', response.data);

          const cabecalhosParaSincronizar = response.data.cabecalho;

          const itensParaSincronizar = response.data.itens;
          console.log('itens sincronizar', response.data.itens);
          console.log('entrou no receber dados para banco off', isOnline);
          sincronizarCabecalho(cabecalhosParaSincronizar);
          sincronizarItemPedido(itensParaSincronizar);
        })
        .catch((error) => {});
    }
  }
  //============== POPULA OS 60 ULTIMOS PEDIDOS NO BANCO LOCAL  ==========================================

  /*É NECESSARIO POIS O VENDEDOR PODE UTILIZAR TANTO O CELULAR COMO O PC, 
    DESTA FORMA ESTARÃO SEMPRE IGUAIS*/

  async function sincronizarCabecalho(cabecalhoPedido: IcabecalhoPedido[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
    const store = transaction.objectStore('cabecalhoPedidoVenda');

    const allCabecalhos = await store.getAll();

    const deleteCabecalho = allCabecalhos.filter(
      (item) => item.sincronizado === 'S'
    );
    for (const cabecalho of deleteCabecalho) {
      await store.delete(cabecalho.id);
    }

    for (const cabecalho of cabecalhoPedido) {
      cabecalho.sincronizado = 'S';
      await store.add(cabecalho);
    }

    await transaction.done;
  }

  //============== POPULA OS ITENS DOS PEDIDOS VINDOS DA NUVEM NO BANCO LOCAL  ==========================================

  async function sincronizarItemPedido(itemPedido: iItemPedido[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('itemPedidoVenda', 'readwrite');
    const store = transaction.objectStore('itemPedidoVenda');
    const allItens = await store.getAll();

    const hasUnsyncedItem = allItens.some((item) => item.sincronizado === 'N');

    if (hasUnsyncedItem) {
      console.log('Existem itens não sincronizados no banco local.');
    } else {
      const itemsToDelete = allItens.filter(
        (item) => item.sincronizado === 'S'
      );
      for (const item of itemsToDelete) {
        await store.delete(item.id);
      }

      // Adiciona os novos itens
      for (const item of itemPedido) {
        item.sincronizado = 'S';
        await store.add(item);
      }

      await transaction.done;
    }
  }

  async function GetVerificaLogin() {
    try {
      await ListaCabecalhoPedido();
    } catch (error) {
      console.log('erro', error);
    }
  }

  async function ListaCabecalhoPedido() {
    console.log('ENTROU AQUI AGORA');
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      const allCabecalhos = await store.getAll();
      const cabecalhosNaoProcessados = allCabecalhos.filter(
        (obj) =>
          obj.status.trim().toLowerCase() === 'enviado' &&
          (obj.pedido === null ||
            obj.pedido === '' ||
            obj.pedido === 'null' ||
            obj.pedido === obj.palMPV)
      );

      const palMPVList = cabecalhosNaoProcessados
        .slice(0, 1)
        .map((obj) => obj.palMPV);

      console.log('Lista de propriedades palMPV:', palMPVList);
      GetVerificaPEDIDO(palMPVList);
      await transaction.done;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  //============== FUNÇAO PARA RETORNAR OS NUMEROS UNICOS (SUBSTITUIDA PELO BOT)  ==========================================
  interface iPedidoProcessado {
    palMPV: string;
    pedido: string;
  }
  async function GetVerificaPEDIDO(palMPVList: any) {
    const sql = `SELECT TOP 10 PALMPV, PEDIDO FROM AD_Z38 WHERE PALMPV ='${palMPVList}'`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const dadosMontados: iPedidoProcessado[] =
          response.data.responseBody.rows.map((item: any) => ({
            palMPV: item[0],
            pedido: String(item[1]),
          }));
        console.log('testedadosmontados', dadosMontados);
        const pedidosProcessados: iPedidoProcessado[] = dadosMontados.filter(
          (obj) => obj.pedido != null
        );

        console.log('pedidos processados', pedidosProcessados);
      })
      .catch((error) => {
        console.log('erro ao receber dados clientes', error);
      });
  }
  //============== SALVA NUMERO UNICO NO BANCO LOCAL (SUBSTITUIDA PELO BOT)  ==========================================
  async function PopularPedidoProcessado(
    pedidosProcessados: iPedidoProcessado[]
  ) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      const allCabecalhos = await store.getAll();

      const cabecalhosParaProcessar: any[] = [];

      for (const pedidoProcessado of pedidosProcessados) {
        const buscaCabecalho = allCabecalhos.find(
          (cabecalho) => cabecalho.palMPV === pedidoProcessado.palMPV
        );

        if (
          buscaCabecalho &&
          (buscaCabecalho.pedido === null ||
            buscaCabecalho.pedido === '' ||
            buscaCabecalho.pedido === 'null' ||
            buscaCabecalho.pedido === buscaCabecalho.palMPV)
        ) {
          buscaCabecalho.pedido = pedidoProcessado.pedido;
          await store.put(buscaCabecalho);
          cabecalhosParaProcessar.push(buscaCabecalho);
        }
      }

      await transaction.done;
      console.log('Salvou os cabecalhos novos', cabecalhosParaProcessar);
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  async function AddCabecalhoProcess(buscaCabecalho: any[]) {
    const cabecalhoMontado = buscaCabecalho.map((cabecalho) => {
      return {
        Data: cabecalho.data,
        DataEntrega: cabecalho.dataEntrega,
        Filial: cabecalho.filial,
        Observacao: cabecalho.observacao,
        PalMPV: cabecalho.palMPV,
        ParceiroId: cabecalho.parceiroId,
        Pedido: cabecalho.pedido,
        Sincronizado: cabecalho.sincronizado,
        Status: cabecalho.status,
        TipPed: cabecalho.tipPed,
        TipoNegociacaoId: cabecalho.tipoNegociacaoId,
        Valor: cabecalho.valor,
        VendedorId: cabecalho.vendedorId,
      };
    });
  }
  //=====================PDf===========================================================================================

  const styles = StyleSheet.create({
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
      //  borderWidth: 1,
      borderColor: '#000',
      marginBottom: 15,
      borderCollapse: 'collapse', // adicionando esta propriedade
    },
    tableRow: {
      //  margin: 'auto',
      flexDirection: 'row',
      //  borderBottomWidth: 1,
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
  });
  const dataEmissao = new Date();
  const emissao = `${dataEmissao.getDate()}/${
    dataEmissao.getMonth() + 1
  }/${dataEmissao.getFullYear()} ${dataEmissao.getHours()}:${dataEmissao.getMinutes()}`;
  const emissaopedi = `${dataEmissao.getDate()}/${
    dataEmissao.getMonth() + 1
  }/${dataEmissao.getFullYear()}`;

  const PDFFile = () => {
    const itensPdf = pedidosanteriores ? itensPedidoSelecionadoListAtivos : itensNovosPedido;
    const totalProdutosPdf = Array.isArray(itensPdf)
      ? itensPdf.reduce((acc: number, it: any) => acc + (Number(it?.valTotal) || 0), 0)
      : 0;
    const totalIpiPdf =
      ufCliente === 'CE'
        ? 0
        : Array.isArray(itensPdf)
        ? itensPdf.reduce((acc: number, it: any) => {
            const base = Number(it?.valTotal) || 0;
            const ali = Number(it?.produto?.aliIpi) || 0;
            if (!ali) return acc;
            return acc + base * (ali / 100);
          }, 0)
        : 0;
    const valorLiquidoPdf = totalProdutosPdf + totalIpiPdf;

    return (
      <Document>
        <Page style={styles.body}>
        <View style={styles.container}>
          <Text style={styles.textoData}>Emissão: {emissao}</Text>
          <Text style={styles.textoPeddo}>PEDIDO DE VENDA </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.colunaDupla}>
            <Text style={styles.textoComun}>
              {' '}
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                Empresa:
              </Text>{' '}
              CIGEL INDUSTRIAL LTDA
            </Text>
            <Text style={styles.textoComun}>
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                Vendedor:
              </Text>{' '}
              {usuario.username} - {usuario.nomeCompleto}
            </Text>
          </View>
          <View style={styles.colunaDupla}>
            <Text style={styles.textoComun}>
              {' '}
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                Nº. Pedido:
              </Text>
              {pedidosanteriores ? (
                <>{numeroPedidoSelecionado}</>
              ) : (
                <>{numPedido}</>
              )}{' '}
            </Text>
            <Text style={styles.textoComun}>
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                Dt. Neg.:
              </Text>
              {pedidosanteriores ? (
                <>{formataData(dataPedidoSelecionado)}</>
              ) : (
                <>{emissaopedi}</>
              )}{' '}
            </Text>
            <Text style={styles.textoComun}>
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                Dt. Disp. Fat.:
              </Text>
              {pedidosanteriores ? (
                <>{formataData(dataPedidoSelecionado)}</>
              ) : (
                <>{emissaopedi}</>
              )}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.textoComun}>
            <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
              CLIENTE:
            </Text>{' '}
            {codiCliente} - {nomeCliente} | {fantasiaCliente}
          </Text>
          <View style={styles.colunaDupla}>
            <Text style={styles.textoComun}>
              {' '}
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                CNPJ:
              </Text>{' '}
              {cnpjMask(cnpjCliente)}
            </Text>
            <Text style={styles.textoComun}>
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>IE:</Text>{' '}
            </Text>
          </View>
          <View style={styles.colunaDupla}>
            <Text style={styles.textoComun}>
              {' '}
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                END.:
              </Text>{' '}
              {endCliente}
            </Text>
            <Text style={styles.textoComun}>
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                BAIRRO:
              </Text>{' '}
              {bairroCliente}
            </Text>
          </View>
          <View style={styles.colunaDupla}>
            <Text style={styles.textoComun}>
              {' '}
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                CIDADE:
              </Text>{' '}
              {cidadeCliente} - {ufCliente}
            </Text>
            <Text style={styles.textoComun}>
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>CEP:</Text>{' '}
            </Text>
          </View>
          <View style={styles.colunaDupla}>
            <Text style={styles.textoComun}>
              {' '}
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                FONE:
              </Text>{' '}
              {foneCliente}
            </Text>
            <Text style={styles.textoComun}>
              <Text style={[styles.Titulo, { fontWeight: 'bold' }]}>
                EMAIL:
              </Text>{' '}
              {emailCliente}
            </Text>
          </View>
        </View>
        <View style={styles.containertITULO}>
          <Text style={styles.TitulotABLE}>LISTA DE PRODUTOS </Text>
        </View>
        <View>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text
              style={[
                styles.tableCell,
                { width: '8%', borderRightWidth: 1, textAlign: 'center' },
              ]}
            >
              CÓDIGO
            </Text>
            <Text
              style={[
                styles.tableCell,
                { width: '50%', borderRightWidth: 1, textAlign: 'center' },
              ]}
            >
              DESCRIÇÃO
            </Text>
            <Text
              style={[
                styles.tableCell,
                { width: '5%', borderRightWidth: 1, textAlign: 'center' },
              ]}
            >
              UN
            </Text>
            <Text
              style={[
                styles.tableCell,
                { width: '5%', borderRightWidth: 1, textAlign: 'center' },
              ]}
            >
              QTD.
            </Text>
            <Text
              style={[
                styles.tableCell,
                { width: '10%', borderRightWidth: 1, textAlign: 'right' },
              ]}
            >
              VLR. UNIT.
            </Text>
            <Text
              style={[styles.tableCell, { width: '10%', textAlign: 'right' }]}
            >
              VLR. TOT.
            </Text>
            <Text
              style={[styles.tableCell, { width: '10%', textAlign: 'right' }]}
            >
              VLR. IPI
            </Text>
            <Text
              style={[styles.tableCell, { width: '10%', textAlign: 'right' }]}
            >
              VLR. LIQ.
            </Text>
          </View>
          {pedidosanteriores ? (
            <>
              {itensPedidoSelecionadoListAtivos.map((produto) => (
                <View style={styles.tableRow}>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '8%', textAlign: 'center' },
                    ]}
                  >
                    {produto.produtoId}
                  </Text>
                  <Text style={[styles.tableCell, { width: '50%' }]}>
                    {produto.produto?.nome}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '5%', textAlign: 'center' },
                    ]}
                  >
                    UN
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '5%', textAlign: 'center' },
                    ]}
                  >
                    {produto.quant}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {moeda(produto.valUnit)}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {moeda(produto.valTotal)}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {ufCliente !== 'CE' && produto.produto?.aliIpi
                      ? `${moeda(
                          produto.valTotal * (produto.produto?.aliIpi / 100)
                        )}`
                      : moeda(0)}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {ufCliente !== 'CE' && produto.produto?.aliIpi
                      ? `${moeda(
                          produto.valTotal +
                            produto.valTotal * (produto.produto?.aliIpi / 100)
                        )}`
                      : moeda(produto.valTotal)}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <>
              {itensNovosPedido.map((produto) => (
                <View style={styles.tableRow}>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '8%', textAlign: 'center' },
                    ]}
                  >
                    {produto.produtoId}
                  </Text>
                  <Text style={[styles.tableCell, { width: '50%' }]}>
                    {produto.produto?.nome}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '5%', textAlign: 'center' },
                    ]}
                  >
                    UN
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '5%', textAlign: 'center' },
                    ]}
                  >
                    {produto.quant}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {moeda(produto.valUnit)}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {moeda(produto.valTotal)}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {ufCliente !== 'CE' && produto.produto?.aliIpi
                      ? `${moeda(
                          produto.valTotal * (produto.produto?.aliIpi / 100)
                        )}`
                      : moeda(0)}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: '10%', textAlign: 'right' },
                    ]}
                  >
                    {ufCliente !== 'CE' && produto.produto?.aliIpi
                      ? `${moeda(
                          produto.valTotal +
                            produto.valTotal * (produto.produto?.aliIpi / 100)
                        )}`
                      : moeda(produto.valTotal)}
                  </Text>
                </View>
              ))}
            </>
          )}

          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text
              style={[
                styles.tableCell,
                { width: '54.2%', borderRightWidth: 1, textAlign: 'center' },
              ]}
            >
              OBSERVAÇÃO
            </Text>
            <Text
              style={[
                styles.tableCell,
                { width: '46.7%', borderRightWidth: 1, textAlign: 'center' },
              ]}
            >
              TOTAIS
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.tableCell,
                { width: '54.2%', height: '100%', textAlign: 'center' },
              ]}
            >
              {pedidosanteriores ? (
                <>{observacaoPedidoSelecionado}</>
              ) : (
                <>{observacaoPDF}</>
              )}
            </Text>
            <View style={[styles.tableCellFim, { width: '46.7%' }]}>
              <View style={styles.tableRow}>
                <Text
                  style={[
                    styles.tableCell,
                    { width: '50%', textAlign: 'center' },
                  ]}
                >
                  TOTAL PRODUTOS
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: '50%', textAlign: 'right' },
                  ]}
                >
                  {moeda(totalProdutosPdf)}{' '}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[
                    styles.tableCell,
                    { width: '50%', textAlign: 'center' },
                  ]}
                >
                  TOTAL IPI
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: '50%', textAlign: 'right' },
                  ]}
                >
                  {moeda(totalIpiPdf)}{' '}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[
                    styles.tableCell,
                    { width: '50%', textAlign: 'center' },
                  ]}
                >
                  VALOR LIQUIDO
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: '50%', textAlign: 'right' },
                  ]}
                >
                  {ufCliente === 'CE' ? (
                    <>{moeda(totalProdutosPdf)}</>
                  ) : (
                    <>{moeda(valorLiquidoPdf)}</>
                  )}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 8, marginTop: 20 }}>
          Obs.: Este documento não substitui a nota enviada ao seu email, ele
          serve pra uma pré-visualização do seu pedido.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
        </Page>
      </Document>
    );
  };

  //===================================================================================================================

  function handleCloseMensagedup() {
    setShowMensagedup(false);
    setAlertErroMensage(false);
    // setAddItem(false);
    addItem = false;
    setQuantItem('');
    setAdicionandoItem(false);
    adicionandoItem = false;
    setUnidadeEscolhida('');
    unidadeEscolhida = '';
    seNomeProduto('');
    setValorItem(0);
    setUnidade1('');
    setUnidade2('');
    setQuantUnid(0);
    setUnidadeEscolhida('');
    unidadeEscolhida = '';
    setProdutoId(0);
    produtoId = 0;
    setValorUnitario(0);
    valorUnitario = 0;

    //   SetarQuantidade()
    //   LimparPesquisa2()
  }

  let [baixarPDFNovo, setbaixarPDFNovo] = useState(false);

  function handleCloseMensage() {
    setAlertErroMensage2(false);
    setShowMensage(false);
  }
  function handleCloseMensage2() {
    setShowMensage2(false);
    setbaixarPDFNovo(false);
    setAlertErroMensage2(false);
    baixarPDFNovo = false;
    // if(isOnline){
    //   window.location.reload();
    // }

    // setLoading(true);
  }

  function handleCloseMensageDelete() {
    setShowMensageDelete(false);
  }
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);
  const [modoRecebRapidoModal, setModoRecebRapidoModal] = useState(false);
  let [naoEnviando, setNaoEviando] = useState(true);

  const handleCloseMensageSankhya = () => {
    setShowMensageSankhya(false);
    setModoRecebRapidoModal(false);
    try {
      const iniciouRecebimento = localStorage.getItem('RecebendoDadosModal') === 'true';
      const recebendo = localStorage.getItem('RecebendoDados') === 'true';
      if (iniciouRecebimento && !recebendo) {
        localStorage.removeItem('RecebendoDadosModal');
        window.location.reload();
      }
    } catch {}
  };
  const [showOperacao, setShowOperacao] = useState(false);
  const [operacaoMsg, setOperacaoMsg] = useState('');
  const [operacaoProgress, setOperacaoProgress] = useState(0);
  const [operacaoTeveErro, setOperacaoTeveErro] = useState(false);
  const handleCancelarOperacao = () => {
    setShowOperacao(false);
  };
  const handleCloseOperacao = () => {
    setShowOperacao(false);
    if (operacaoProgress >= 100 && !operacaoTeveErro) {
      localStorage.removeItem('@Portal/PedidoEmDigitacao');
      window.location.reload();
    }
  };
  useEffect(() => {
    if (showOperacao) {
      const id = setInterval(() => {
        setOperacaoProgress((p: number) => (p >= 100 ? 100 : p >= 95 ? 5 : p + 5));
      }, 500);
      return () => clearInterval(id);
    }
  }, [showOperacao]);

  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaCod, setPesquisaCod] = useState(false);
  const [pesquisaGrupo, setPesquisaGrupo] = useState(false);

  let [mostrarDiv, setmostrarDiv] = useState(false);

  let [codParceiro1, setcodParceiro1] = useState(0);
  let [codParceiro2, setcodParceiro2] = useState(0);
  let [codParceiro3, setcodParceiro3] = useState(0);

  let [codEmpresa1, setcodEmpresa1] = useState(0);
  let [codEmpresa2, setcodEmpresa2] = useState(0);
  let [codEmpresa3, setcodEmpresa3] = useState(0);

  let [filter, setFilter] = useState(false);
  let [filterGrupo, setFiltergrupo] = useState(false);
  let [itemEnviado, setItemEnviado] = useState(false);

  let [addItem, setAddItem] = useState(true);
  let [titulosVencidos, settitulosVencidos] = useState(false);

  let [search, setSearch] = useState('');
  let [searchList, setSearchList] = useState('todos');
  let [tipPedSelecionado, settipPedSelecionado] = useState('');

  const [valorItem, setValorItem] = useState(0);
  const [unidade1, setUnidade1] = useState('');
  const [unidade2, setUnidade2] = useState('');

  const [descProd, setdescProd] = useState('');
  let [unidadeEscolhida, setUnidadeEscolhida] = useState('');
  const [nomeProduto, seNomeProduto] = useState('');
  let [placeHolder, setPlaceHolder] = useState('pesquisa por código ou nome');
  let [quantItem, setQuantItem] = useState('');
  const [quantUnid, setQuantUnid] = useState(0);
  let [sucess, setSucess] = useState(0);
  useEffect(() => {
    if (showMensageSankhya || showMensage || showMensage2) {
      const id = setInterval(() => {
        setSucess((p: number) => (p >= 95 ? 5 : p + 5));
      }, 500);
      return () => clearInterval(id);
    }
  }, [showMensageSankhya, showMensage, showMensage2]);
  let [pedidoPendente, setPedidoPendente] = useState(false);
  let [adicionandoItem, setAdicionandoItem] = useState(false);
  const [mult, setMult] = useState(true);
  let [emUso, setEmUso] = useState(false);
  //===============dados pedido ===================================
  const [vendedorId, setVendedorId] = useState(0);
  let [palMpv, setpalMpv] = useState('');
  const [tipoNecociacao, setTipoNecociacao] = useState(0);
  const [idInicial, setIdInicial] = useState(14713200223103733);
  const [dataPedido, setTDataPedido] = useState('');
  const [MsgErroNaoEnviar, setMsgErroNaoEnviar] = useState('');

  const [tabelarro, setTabelarro] = useState('');
  const [tabelarro2, setTabelarro2] = useState('');
  const [tabelarro3, setTabelarro3] = useState('');
  const [tabelarro4, setTabelarro4] = useState('');
  const [tabelarro5, setTabelarro5] = useState('');
  const [tabelarro6, setTabelarro6] = useState('');
  const [tabelarro7, setTabelarro7] = useState('');
  const [tabelarro8, setTabelarro8] = useState('');
  const [tabelarro9, setTabelarro9] = useState('');
  const [tabelarro11, setTabelarro11] = useState('');
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
  const [alertErroSankhyaBD11, setAlertErroSankhyaBD11] = useState(false);

  let [dadosRecebidos, setDadosRecebidos] = useState(false);

  const [valorPedido, setValorPedio] = useState('0,00');
  let [dataEntrega, setDataentrega] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  let [tipoPagamento, setTipoPagamento] = useState('');
  let [observacao, setObservacao] = useState('');
  let [numPedido, setnumPedido] = useState('');
  const [status, setStatus] = useState('');
  let [somaTotal, setSomaTotal] = useState(0);
  let [dataPedidoId, setDataPedidoId] = useState('');
  let [valorTotalPedido, setValorTotalPedido] = useState(0);
  // ==========dados itens pedido=================================
  let [cabecalgoId, setCabecalhoId] = useState(0);
  let [itemPedidoId, setItemPedidoId] = useState(0);

  let [produtoId, setProdutoId] = useState(0);
  let [quantidade, setquantidade] = useState(0);
  let [valorUnitario, setValorUnitario] = useState(0);
  let [valorTotal, setValorTotal] = useState(0);
  let [aliIpi, setaliIpi] = useState(0);
  let [aliIpiEdit, setaliIpiEdit] = useState(0);
  //==============================================================
  //========= dados pedidos selecionados ==========================//
  let [idPedidoSelecionado, setIdPedidoSelecionado] = useState(0);
  let [filialPedidoSelecionado, setFilialPedidoSelecionado] = useState('');
  let [numeroPedidoSelecionado, setNumeroPedidoSelecionado] = useState('');
  let [numeroPedidoSankhya, setNumeroPedidoSankhya] = useState('');
  let [statusPedidoSelecionado, setStatusPedidoSelecionado] = useState('');
  let [obsPedidoSelecionado, setobsPedidoSelecionado] = useState('');
  let [parceiroPedidoSelecionadoId, setParceiroPedidoSelecionadoId] =
    useState(0);
  let [parceiroPedidoSelecionado, setParceiroPedidoSelecionado] = useState('');
  let [dataPedidoSelecionado, setDataPedidoSelecionado] = useState('');
  let [dataEntregaPedidoSelecionado, setDataEntregaPedidoSelecionado] =
    useState('');
  let [observacaoPedidoSelecionado, setObservacaoPedidoSelecionado] =
    useState('');
  let [respostaSank, setrespostaSank] = useState('');
  let [tipoNegociacaoPedidoSelecionado, setTipoNegociacaoPedidoSelecionado] =
    useState('');
  let [
    tipoNegociacaoPedidoSelecionadoId,
    setTipoNegociacaoPedidoSelecionadoId,
  ] = useState(0);
  let [naturezaPadraoPedidoSelecionado, setNaturezaPadraoPedidoSelecionado] =
    useState('');
  let [valorPedidoSelecionado, setValorPedidoSelecionado] = useState(0);
  let [itensPedidoSelecionado, setItensPedidoSelecionado] = useState<
    iItemPedidoVenda[]
  >([]);
  let [itensPedidoSelecionadoList, setItensPedidoSelecionadoList] = useState<
    iItemPedidoVenda[]
  >([]);
  let [itensPed, setItensPed] = useState<iItemPedidoVenda[]>([]);

  let [itensNovosPedido, setitensNovosPedido] = useState<iItemPedidoVenda[]>(
    []
  );
  const itensPedidoSelecionadoListAtivos = React.useMemo(
    () => filtrarItensAtivosLista(itensPedidoSelecionadoList as any),
    [itensPedidoSelecionadoList]
  );
  const carregandoModalPedidoSelecionado =
    loadingItensPedidoSelecionado || listaLoading;
  const itensPaginaModal = React.useMemo(() => {
    if (!showlistaPedidosSelec) return [];
    if (!Array.isArray(itensPedidoSelecionadoListAtivos) || itensPedidoSelecionadoListAtivos.length === 0) {
      return [];
    }
    const totalPaginasFront = Math.max(1, Math.ceil(itensPedidoSelecionadoListAtivos.length / qtdePaginaItens));
    const currentPage = Math.min(Math.max(paginaItens, 1), totalPaginasFront);
    const startIndex = (currentPage - 1) * qtdePaginaItens;
    const endIndex = startIndex + qtdePaginaItens;
    return itensPedidoSelecionadoListAtivos.slice(startIndex, endIndex);
  }, [showlistaPedidosSelec, itensPedidoSelecionadoListAtivos, paginaItens, qtdePaginaItens]);
  const [itensLista, setitensLista] = useState<iItemPedidoVenda[]>([]);
  let [lc, setLc] = useState(0);
  let [saldo, setsaldo] = useState(0);
  let [itensDoPedido, setItensDoPedido] = useState(0);
  //====variaveis transitorias=================================//

  let [produtoescolhido, setProdutoescolhido] = useState('');

  useEffect(() => {
    const run = async () => {
      const empSel = Number(filialPedidoSelecionado || 0);
      if (empSel === 2) {
        setNaturezaPadraoPedidoSelecionado('110102 - Receita de Revenda de Mercadorias');
        return;
      }
      if (empSel && empSel !== 2) {
        setNaturezaPadraoPedidoSelecionado('');
        return;
      }
      const valor = String(tipoNegociacaoPedidoSelecionadoId ?? '');
      if (valor === '' || valor === '0') {
        setNaturezaPadraoPedidoSelecionado('');
        return;
      }
      try {
        const raw = localStorage.getItem('@Portal/tipoNegociacaoNaturezaPadrao') || '[]';
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length > 0) {
          const ach =
            arr.find((x: any) => String(x?.id) === String(valor)) ??
            arr.find((x: any) => String(x?.Id) === String(valor));
          if (ach && ach?.NaturezaPadrao) {
            setNaturezaPadraoPedidoSelecionado(String(ach.NaturezaPadrao).trim());
            return;
          }
        }
      } catch {}
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const store = db.transaction('tipoNegociacao', 'readonly').objectStore('tipoNegociacao');
        const tipo = await store.get(Number(valor));
        try { console.log('TIPO DE NATUREZA', 'IndexedDB', tipo); } catch {}
        if (tipo && (tipo as any)?.Natureza) {
          const nat = String((tipo as any).Natureza).trim();
          setNaturezaPadraoPedidoSelecionado(nat);
          try {
            upsertNaturezaPadraoLocalStorage(valor, nat, (tipo as any)?.descricao, (tipo as any)?.atualizadoEm);
          } catch {}
          return;
        }
        try {
          const resp = await api.get(`/api/TipoNegociacao/${valor}`);
          try { console.log('TIPO DE NATUREZA', 'API', resp?.data); } catch {}
          const nat = String(resp?.data?.Natureza || '').trim();
          setNaturezaPadraoPedidoSelecionado(nat);
          try {
            upsertNaturezaPadraoLocalStorage(valor, nat, resp?.data?.descricao, resp?.data?.atualizadoEm);
          } catch {}
        } catch {
          setNaturezaPadraoPedidoSelecionado('');
        }
      } catch {
        try {
          const resp = await api.get(`/api/TipoNegociacao/${valor}`);
          try { console.log('TIPO DE NATUREZA', 'API', resp?.data); } catch {}
          const nat = String(resp?.data?.Natureza || '').trim();
          setNaturezaPadraoPedidoSelecionado(nat);
          try {
            upsertNaturezaPadraoLocalStorage(valor, nat, resp?.data?.descricao, resp?.data?.atualizadoEm);
          } catch {}
        } catch {
          setNaturezaPadraoPedidoSelecionado('');
        }
      }
    };
    run();
  }, [tipoNegociacaoPedidoSelecionadoId]);

  //=============================================================//
  const formataData = (date: string) => {
    if (!date) return '';
    const dataFormate = String(date).split('T', 1);
    const newDate = dataFormate[0] || '';
    if (!newDate) return '';
    const d = newDate.split('-');
    if (d.length < 3) return newDate;
    return `${d[2]}.${d[1]}.${d[0]}`;
  };
  useEffect(() => {
    GetPromotor();
    login();
  }, []);

  useEffect(() => {
    // if (numPedido != "" && arrayPedido.length > 0) {
    //   localStorage.setItem("@Portal/sincronizar","false")
    //   if (isOnline) {
    //     popularCabecalhoRascunho(cabecalho, "S");
    //   } else {
    //     popularCabecalhoRascunho(cabecalho, "N");
    //   }
    //   //  }
    // }
    // console.log("cabecalhoSalvandoRascunho soma", somaTotal);
    // if (somaTotal <= 0) {
    //     DeletePedidoItem0(numPedido)
    // }
  }, [somaTotal]);

  async function login() {
    const senha = localStorage.getItem('@Portal/exit');
    await api
      .post('/api/Auth/login', {
        username: usuario.username,
        password: senha,
      })
      .then((response) => {
        localStorage.removeItem('@Portal/usuario');
        console.log('logou antes de receber dados', response.data);
        localStorage.setItem('@Portal/usuario', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log('erro ao efetuar login');
      });
  }

  //======================================================================================================================
  useEffect(() => {
    if (unidadeEscolhida == 'UN') {
      setMult(true);
    } else {
      setMult(false);
    }
  }, [unidadeEscolhida]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    NumeroPedido();

    DataAtual();
    if (filter) {
      GetiTensTabelaPrecofilterNome();
    } else {
      GetiTensTabelaPreco();
    }

    GetGrupos();
  }, [pagina]);

  function LimparPesquisa() {
    setFilter(false);
    filter = false;
    setSearch('');
    search = '';

    setPagina(1);
    pagina = 1;
    setPesquisaNome(true);
    PesquisaNome();
    setFilter(false);
    GetiTensTabelaPreco();
  }
  function LimparPesquisa2() {
    setFilter(false);
    filter = false;
    setSearch('');
    search = '';
    setPagina(1);
    pagina = 1;
    PesquisaNome();
    setFilter(false);
    GetiTensTabelaPreco();
  }
  //=========editar pedido ao sair ====================//

  async function SalvarDados34() {
    setEditando(false);
    editando = false;
    setItensDoPedido(0);
    itensDoPedido = 0;
    const pal = String(numPedido || palMPVEscolhido || '').trim();
    await api
      .get(
        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(pal))}`
      )
      .then((resp) => {
        const cab = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
        console.log('pedido de venda', cab);
        setDataPedidoId(cab?.data);
        dataPedidoId = cab?.data;
        EnviarDadosPutEdit(cab?.valor);
        setValorTotalPedido(cab?.valor);
        valorTotalPedido = cab?.valor;
        console.log('data entrega id', cab?.dataEntrega);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function EnviarDadosPutEdit(somaPedido: any) {
    setLoading(true);

    await api
      .put(`/api/CabecalhoPedidoVenda/${cabecalgoId}`, {
        vendedorId: obterVendedorIdParaPedido(),
        parceiroId: parceiroId,
        id: cabecalgoId,
        filial: String(codEmpresa),
        palMPV: numPedido,
        tipoNegociacaoId: Number(tipoNegocia),
        data: dataPedidoId,
        pedido: '',
        status: 'Não Enviado',
        tipPed: tipPed,
        valor: somaPedido,
        dataEntrega: dataEntrega,
        ativo: 'S',
        versao: versaoFront,
        observacao: observacao,
      })
      .then((response) => {
        setRealizandopedido(false);
        GetPromotor();
        setCabecalhoId(0);
        setnumPedido('');
        numPedido = '';
        setAddItem(true);
        addItem = true;
        setPlaceHolder('pesquisa por código ou nome');
        placeHolder = 'pesquisa por código ou nome';
        window.scrollTo(0, 0);
        setLoading(false);
        setValorTotal(0);
        valorTotal = 0;
        setCodCliente('');
        codCliente = '';
        setDataentrega('');
        dataEntrega = '';
        setObservacao('');
        observacao = '';

        GetTresUltimos();
        setItemEnviado(false);
        itemEnviado = false;
        setShowMensage2(true);
        setAlertErroMensage(true);
        setMsgErro('Pedido salvo com sucesso!!!!!!');
        setPesquisaPedido(false);
        pesquisaPedido = false;
      })
      .catch((error) => {
        setLoading(false);
        window.scrollTo(0, 0);
        setShowMensage(true);

        setAlertErroMensage(true);
        const { data } = error.response;

        setMsgErro(error.response.data);

        return;
      });
  }

  //===================================================//

  //=============================================================//
  function EnviarDadosPost() {
    // GetPedidoId()
  }

  interface Grupo {
    id: number;
    nome: string;
  }

  async function GetGrupos() {
    console.log(
      'entrou aquiiiii.....................................................................................................'
    );

    if (!isOnline) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction('grupoProduto', 'readonly');
        const store = transaction.objectStore('grupoProduto');

        const grupos = await store.getAll();
        console.log('itensss geraissss', itensTabelaTotal);

        const filteredGrupos = grupos.filter((grupo) =>
          itensTabelaTotal.some((item) => item.grupoId === grupo.id)
        );

        filteredGrupos.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log('itensss geraissss', filteredGrupos);
        const options: iDataSelect[] = filteredGrupos.map((grupo: any) => ({
          value: String(grupo.id),
          label: `${grupo.id} - ${grupo.nome}`,
        }));

        setGrupoPesquisa(options);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Ocorreu um erro', error);
      }
      setLoading(false);
    } else {
      await api

        .get(`/api/GrupoProduto/v2/all`)
        .then((response) => {
          console.log('grupo', response.data.data);

          if (response.data.data.length > 0) {
            // let options: Array<iDataSelect> = new Array<iDataSelect>();
            // setGrupoProdutos(
            //   response.data.data.filter(
            //     (grupos: any) => grupos.id == itensTabela.includes(grupos)
            //   )
            // );
            console.log('grupo fitrado', grupoProdutos);
            response.data.data.sort((a: any, b: any) =>
              a.nome.localeCompare(b.nome)
            );
            console.log('grupo fitrado...options', response.data.data);

            // response.data.data.forEach((grupos: any) => {
            //   let rowGrupo: iDataSelect = {};
            //   rowGrupo.value = String(grupos.id);
            //   rowGrupo.label = String(grupos.id) + " - " + grupos.nome;

            //   options.push(rowGrupo);
            // });

            // setGrupoPesquisa(options);

            const filteredGrupos = response.data.data.filter((grupo: any) =>
              itensTabelaGeral.some(
                (item) => item.produtos.grupoProdutoId === grupo.id
              )
            );

            // Ordenar os grupos pelo nome
            // filteredGrupos.sort((a, b) => a.nome.localeCompare(b.nome));

            const options: iDataSelect[] = filteredGrupos.map((grupo: any) => ({
              value: String(grupo.id),
              label: `${grupo.id} - ${grupo.nome}`,
            }));

            setGrupoPesquisa(options);
          }
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  async function GetGruposbanconuvens() {
    // setFilter(false);

    await api

      .get(`/api/GrupoProduto/v2/all`)
      .then((response) => {
        console.log('grupo', response.data.data);

        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          setGrupoProdutos(
            response.data.data.filter(
              (grupos: any) => grupos.id == itensTabela.includes(grupos)
            )
          );
          console.log('grupo fitrado', grupoProdutos);
          response.data.data.sort((a: any, b: any) =>
            a.nome.localeCompare(b.nome)
          );
          console.log('grupo fitrado...options', response.data.data);

          response.data.data.forEach((grupos: any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(grupos.id);
            rowGrupo.label = String(grupos.id) + ' - ' + grupos.nome;

            options.push(rowGrupo);
          });

          setGrupoPesquisa(options);

          //  response.data.data.map((grupos: any) => {
          //    let rowGrupo: iDataSelect = {};
          //    rowGrupo.value = String(grupos.id);
          //    rowGrupo.label = String(grupos.id) + " - " + grupos.nome;

          //   options.push(rowGrupo);
          //    setGrupoPesquisa(options);

          //  });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
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

  function NumeroPedido() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr.substring(2);
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    var dataFilt = dia + mes + anoFinal + hora + minutos + segundos;
    setDataFormarPedido(dataFilt);
    dataFormarPedido = dataFilt;
    console.log('data filtrada', dataFormarPedido);
  }

  function ipi(valor: any) {
    return valor / 100;
  }

  function calcularTotaisPedidoComIpi(itens: any, uf: any) {
    const lista = Array.isArray(itens) ? itens : [];
    const ufCli = String(uf || '').trim().toUpperCase();
    const totalProdutos = lista.reduce(
      (acc: number, it: any) => acc + (Number(it?.valTotal) || 0),
      0
    );
    const totalIpi =
      ufCli === 'CE'
        ? 0
        : lista.reduce((acc: number, it: any) => {
            const base = Number(it?.valTotal) || 0;
            const ali = Number(
              it?.produto?.aliIpi ?? it?.produto?.produto?.aliIpi ?? 0
            );
            if (!ali) return acc;
            return acc + base * (ali / 100);
          }, 0);
    return { totalProdutos, totalIpi, totalLiquido: totalProdutos + totalIpi };
  }

  function PesquisaNome() {
    setSearch('');
    search = '';
    setPagina(1);
    pagina = 1;
    setFilter(false);
    filter = false;

    GetiTensTabelaPreco();

    setPesquisaNome(true);
    setPesquisaGrupo(false);
    setPesquisaCod(false);
    let pesquisar: any;
  }

  function PesquisaGrupo() {
    setSearch('');
    search = '';
    setFilter(false);
    filter = false;
    setPagina(1);
    pagina = 1;
    GetiTensTabelaPreco();
    setPesquisaNome(false);
    setPesquisaCod(false);
    setPesquisaGrupo(true);
    let pesquisa: any;
  }
  function PesquisaCod() {
    setSearch('');
    search = '';
    setFilter(false);
    setPagina(1);
    pagina = 1;
    filter = false;
    GetiTensTabelaPreco();
    setPesquisaNome(false);
    setPesquisaGrupo(false);
    setPesquisaCod(true);
    let pesquisa: any;
  }

  //=========função para o banco local ===========================================
  async function GetPromotor() {
    setPromotorLoading(true);
    console.log(
      'entrou aquiiiii.....................................................................................................'
    );
    console.log('isMobile', isMobile);

    if (isMobile) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction('parceiro', 'readonly');
        const store = transaction.objectStore('parceiro');
        const promotor = await store.getAll();

        promotor.sort((a, b) => a.nome.localeCompare(b.nome));

        const options: iDataSelect[] = promotor
          .filter(
            (parceiro: any) =>
              parceiro.status === 'S' && parceiro.vendedorId == usuario.username
          )
          .map((parceiro: any) => ({
            value: String(parceiro.id),
            label: `${parceiro.id} - ${parceiro.nome} - CNPJ: ${parceiro.cnpj_Cpf}`,
          }));

        setPromotorPesquisa(options);
        setLoading(false);
        setPromotorLoading(false);
      } catch (error) {
        setLoading(false);
        setPromotorLoading(false);
        console.log('Ocorreu um erro', error);
      }
    } else {
      await api
        .get(
          `/api/Parceiro/filter/Vendedor?pagina=1&totalpagina=1000&codVendedor=${usuario.username}`
        )
        .then((response) => {
          setLoading(false);
          if (response.data.data.length > 0) {
            //  console.log('parceiro',response.data)
            let promotor = response.data.data;
            promotor.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
            let options: Array<iDataSelect> = new Array<iDataSelect>();

            promotor
              .filter((promotor: any) => promotor.status === 'S')
              .map((promotor: any) => {
                let listaPromotor: iDataSelect = {};
                listaPromotor.value = String(promotor.id);
                listaPromotor.label =
                  String(promotor.id) +
                  ' - ' +
                  promotor.nome +
                  ' - CNPJ: ' +
                  promotor.cnpj_Cpf;

                options.push(listaPromotor);
                setPromotorPesquisa(options);
                // console.log("teste",promotorPesquisa)
              });

            // promotor.map((promotor: any) => {
            //   let rowGrupo: iDataSelect = {};
            //   rowGrupo.value = String(promotor.id);
            //   rowGrupo.label = String(promotor.id) + " - " + promotor.nome;

            //   options.push(rowGrupo);
            //   setPromotorPesquisa(options);
            //   //   console.log("teste",promotorPesquisa)
            // });
          }
          setPromotorLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setPromotorLoading(false);
          console.log('Ocorreu um erro');
        });
    }
  }

  async function GetPromotorbancoNuvem() {
    setLoading(true);
    setPromotorLoading(true);
    await api
      .get(
        `/api/Parceiro/filter/Vendedor?pagina=1&totalpagina=1000&codVendedor=${usuario.username}`
      )
      .then((response) => {
        setLoading(false);
        if (response.data.data.length > 0) {
          let promotor = response.data.data;
          promotor.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
          let options: Array<iDataSelect> = new Array<iDataSelect>();

          promotor
            .filter((promotor: any) => promotor.status === 'S')
            .map((promotor: any) => {
              let listaPromotor: iDataSelect = {};
              listaPromotor.value = String(promotor.id);
              listaPromotor.label = String(promotor.id) + ' - ' + promotor.nome;

              options.push(listaPromotor);
              setPromotorPesquisa(options);
            });
        }
        setPromotorLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setPromotorLoading(false);
        console.log('Ocorreu um erro');
      });
  }
  //=============RECEBER DADOS WEB ======================================

  function iniciarRecebimentoGlobal(origem: string): boolean {
    try {
      if (localStorage.getItem('RecebendoDados') === 'true') {
        const startedAtRaw = localStorage.getItem('RecebendoDadosStartedAt');
        const startedAt = startedAtRaw != null ? Number(startedAtRaw) : NaN;
        const stale =
          !Number.isFinite(startedAt) || Date.now() - startedAt > 10 * 60 * 1000;
        if (stale) {
          localStorage.removeItem('RecebendoDados');
          localStorage.removeItem('RecebendoDadosSource');
          localStorage.removeItem('RecebendoDadosStartedAt');
          localStorage.removeItem('RecebendoDadosModal');
        } else {
          return false;
        }
      }
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
      localStorage.removeItem('RecebendoDadosModal');
    } catch {}
  }

  async function receberDadosSankhyaLote() {
    const tabelas =
      'Vendedor,TipoNegociacao,Parceiro,GrupoProduto,Produto,TabelaPreco,TabelaPrecoAdicional,ItemTabela,TabelaPrecoParceiro,Titulo';
    const passos = [
      { msg: 'Atualizando Vendedor...', p: 10 },
      { msg: 'Atualizando TipoNegociacao...', p: 20 },
      { msg: 'Atualizando Parceiro...#Pedido', p: 30 },
      { msg: 'Atualizando GrupoProduto...', p: 40 },
      { msg: 'Atualizando Produto...', p: 50 },
      { msg: 'Atualizando TabelaPreco...', p: 60 },
      { msg: 'Atualizando TabelaPrecoAdicional...', p: 70 },
      { msg: 'Atualizando ItemTabela...', p: 80 },
      { msg: 'Atualizando TabelaPrecoParceiro...', p: 90 },
      { msg: 'Atualizando Titulo...', p: 100 },
    ];
    let idx = 0;
    setSucess(passos[idx].p);
    sucess = passos[idx].p;
    setrespostaSank(passos[idx].msg);
    respostaSank = passos[idx].msg;
    const intervalId = window.setInterval(() => {
      if (idx >= passos.length - 1) {
        try {
          window.clearInterval(intervalId);
        } catch {}
        return;
      }
      idx += 1;
      const step = passos[idx];
      setSucess(step.p);
      sucess = step.p;
      setrespostaSank(step.msg);
      respostaSank = step.msg;
    }, 1200);
    try {
      await api.post(
        `/api/Sankhya/ReceberDadosLote?vendedorId=${vendedorCod}&tabelas=${encodeURIComponent(tabelas)}`
      );
    } catch {
      setErroSankhya(true);
      erroSankhya = true;
    } finally {
      try {
        window.clearInterval(intervalId);
      } catch {}
    }
    setrespostaSank('Verificando dados a serem inclusos no banco...');
    respostaSank = 'Verificando dados a serem inclusos no banco...';
    await new Promise((r) => setTimeout(r, 400));
    setrespostaSank('Inserindo dados no banco local...');
    respostaSank = 'Inserindo dados no banco local...';
  }

  async function receberDadosSankhyaWeb() {
    console.log('recebendo dados', vendedorCod);
    const iniciou = iniciarRecebimentoGlobal('PedidoWeb');
    if (!iniciou) {
      setModoRecebRapidoModal(false);
      setDadosRecebidos(true);
      dadosRecebidos = true;
      setShowMensageSankhya(true);
      setrespostaSank('Já existe um recebimento de dados em andamento. Aguarde finalizar.');
      respostaSank = 'Já existe um recebimento de dados em andamento. Aguarde finalizar.';
      return;
    }
    try {
      localStorage.setItem('RecebendoDadosModal', 'true');
    } catch {}
    setShowMensageLoading(false);
    setShowMensageLoadingDup(false);
    setSucess(0);
    sucess = 0;

    try {
      await criarBancoDados();
    } catch {}
    setShowMensageSankhya(true);
    setrespostaSank('Acessando servidor...');
    respostaSank = 'Acessando servidor...';

    const senha = localStorage.getItem('@Portal/exit');
    await api
      .post('/api/Auth/login', {
        username: usuario.username,
        password: senha,
      })
      .then((response) => {
        localStorage.removeItem('@Portal/usuario');
        console.log('logou antes de receber dados', response.data);
        localStorage.setItem('@Portal/usuario', JSON.stringify(response.data));
        setTimeout(function () {
          LoginSankhyaerro();

          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        setrespostaSank('Você Esta sem conexão de internet...');
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();

        console.log('erro ao efetuar login');
      });
  }
  async function LoginSankhyaerro() {
    console.log('recebendo dados login erro', vendedorCod);
    console.log('entrou no login Sankhya');
    setrespostaSank('Verificando conexão...');
    respostaSank = 'Verificando conexão...';
    try {
      await receberDadosSankhyaLote();
      await popularBancoLocalApiLevePedido(String(usuario.username || '').trim(), 'Inserindo');
    } catch (error) {
      setLoading(false);
      console.log('erro ao efetuar login não mobile');
      setShowMensageSankhya(false);
      setShowMensageSankhyaErro(true);
      finalizarRecebimentoGlobal();
    }
  }

  async function receberDadosSankhyaVendedor() {
    console.log('recebendo dados vendedor', vendedorCod);
    if (isOnline) {
      setErroSankhya(false);
      erroSankhya = false;
      setAlertErroSankhyaBD(false);
      setDadosRecebidos(false);
      dadosRecebidos = false;
      setSucess(10);
      sucess = 10;

      setrespostaSank('Atualizando Vendedor...');
      respostaSank = 'Atualizando Vendedor...';

      await api
        .post(
          `/api/Sankhya/ReceberDados?tabela=Vendedor&vendedorId=${vendedorCod}`
        )
        .then((response) => {
          setAlertErroSankhya(false);

          console.log(response.data);
          setLoading(false);

          if (response.data != 'Sucesso') {
            setErroSankhya(true);
            erroSankhya = true;
            setAlertErroSankhyaBD(true);
            const mensagem = response.data;
            setMsgErroSankhya(mensagem.substring(0, 900));
            setTabelarro('Erro ao receber dados para a tabela Vendedor');
          }

          receberDadosSankhyaTipoNegociacao();
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setAlertErroSankhya(true);
          setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');

          setSucess(0);
          sucess = 0;
        });
    } else {
      setShowupdatePromotor(true);
    }
  }

  //==============================================================
  async function receberDadosSankhyaTipoNegociacao() {
    setSucess(20);
    sucess = 20;

    setrespostaSank('Atualizando TipoNegociacao...');
    respostaSank = 'Atualizando TipoNegociacao...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TipoNegociacao&vendedorId=${vendedorCod}`
      )
      .then(async (response) => {
        console.log(response.data);
        setLoading(false);

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
        setLoading(false);
      });
  }
  async function receberDadosSankhyaParceiro() {
    setSucess(30);
    sucess = 30;

    setrespostaSank('Atualizando Parceiro...#Pedido');
    respostaSank = 'Atualizando Parceiro...#Pedido';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=Parceiro&vendedorId=${vendedorCod}`
      )
      .then((response) => {
        setLoading(false);

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
        setLoading(false);
      });
  }
  async function receberDadosSankhyaGrupoProd() {
    setSucess(40);
    sucess = 40;

    setrespostaSank('Atualizando GrupoProduto...');
    respostaSank = 'Atualizando GrupoProduto...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=GrupoProduto&vendedorId=${vendedorCod}`
      )
      .then((response) => {
        setLoading(false);
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
        setLoading(false);
      });
  }
  async function receberDadosSankhyaProduto() {
    setSucess(50);
    sucess = 50;

    setrespostaSank('Atualizando Produto...');
    respostaSank = 'Atualizando Produto...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=Produto&vendedorId=${vendedorCod}`
      )
      .then((response) => {
        setLoading(false);

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
        setLoading(false);
      });
  }
  async function receberDadosSankhyaTabelaPreco() {
    //  console.log('codigo do vendedor',vendedorCod)
    setSucess(60);
    sucess = 60;
    // Sucess();
    setrespostaSank('Atualizando TabelaPreco...');
    respostaSank = 'Atualizando TabelaPreco...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TabelaPreco&vendedorId=${vendedorCod}`
      )
      .then((response) => {
        setLoading(false);

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

        receberDadosSankhyaTabelaPrecoAdicional();
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  //===================Receber dados tabela adicional =====================
  async function receberDadosSankhyaTabelaPrecoAdicional() {
    setSucess(70);
    sucess = 70;

    setrespostaSank('Atualizando TabelaPrecoAdicional...');
    respostaSank = 'Atualizando TabelaPrecoAdicional...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TabelaPrecoAdicional&vendedorId=${vendedorCod}`
      )
      .then((response) => {
        console.log('TabelaPrecoAdicional', response);
        setLoading(false);

        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD11(true);
          const mensagem11 = response.data;
          setMsgErroSankhya11(mensagem11.substring(0, 900));
          setTabelarro11(
            'Erro ao receber dados para a tabela TabelaPrecoAdicinal'
          );
        }

        receberDadosSankhyaItemTabela();
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  //========================================================================

  async function receberDadosSankhyaItemTabela() {
    setSucess(80);
    sucess = 80;

    setrespostaSank('Atualizando ItemTabela...');
    respostaSank = 'Atualizando ItemTabela...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=ItemTabela&vendedorId=${vendedorCod}`
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);

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
        setLoading(false);
      });
  }
  async function receberDadosSankhyaTabelaPrecoParceiro() {
    console.log('codigo do vendedor', vendedorCod);
    setSucess(90);
    sucess = 90;

    setrespostaSank('Atualizando TabelaPrecoParceiro...');
    respostaSank = 'Atualizando TabelaPrecoParceiro...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TabelaPrecoParceiro&vendedorId=${vendedorCod}`
      )
      .then((response) => {
        console.log('Tabela de Preço Parceiros');
        console.log(response.data);
        setLoading(false);

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
        setLoading(false);
      });
  }
  async function receberDadosSankhyaTitulo() {
    console.log('codigo do vendedor', vendedorCod);
    setSucess(100);
    sucess = 100;

    setrespostaSank('Atualizando Titulo...');
    respostaSank = 'Atualizando Titulo..';
    await api
      .post(`/api/Sankhya/ReceberDados?tabela=Titulo&vendedorId=${vendedorCod}`)
      .then((response) => {
        console.log('Tabela Titulo');
        console.log(response.data);

        console.log('resposta', response);

        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD9(true);
          const mensagem9 = response.data;
          setMsgErroSankhya9(mensagem9.substring(0, 900));
          setTabelarro9('Erro ao receber dados para a tabela Titulo');
        }
        if (erroSankhya == false) {
        }
      })
      .catch((error) => {
        setLoading(false);
      });
    GetParceiro();
  }

  async function GetParceiro() {
    setrespostaSank('Atualizando Banco...');
    respostaSank = 'Atualizando Banco...';
    console.log('entrou no receber dados para banco off');
    await api
      .get(`/api/Parceiro/total?codVendedor=${vendedorCod}`)
      .then((response) => {
        console.log('Parceiro', response.data.data);
        const parceiro = response.data.data.filter(
          (parceiro: any) =>
            parceiro.vendedorId == usuario.username && parceiro.status == 'S'
        );
        popularParceiroWeb(parceiro);

        const parceiroIDs = parceiro.map((parceiro: any) => parceiro.id);

        console.log('IDs do Parceiro', parceiroIDs);
      })
      .catch((error) => {
        setLoading(false);
        setShowMensageSankhya(false);
        finalizarRecebimentoGlobal();
      });
  }

  interface iParceiro {
    id: number;
    codParceiro: number;
    nome: string;
    tipoPessoa: string;
    nomeFantasia: string;
    cnpj_Cpf: string;
    email: string;
    fone: string;
    canal: string;
    classificacao: string;
    tamanhoLoja: string;
    endereco: string;
    bairro: string;
    municipio: string;
    uf: string;
    lat: string;
    long: string;
    lc: number;
    sc: number;
    status: string;
    semVisita: boolean;
    primeiraSem: boolean;
    segundaSem: boolean;
    terceiraSem: boolean;
    quartaSem: boolean;
    quintaSem: boolean;
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
    tipoNegociacao: string;
    empresa: string;
    vendedorId: number;
    vendedor: {
      id: number;
      nome: string;
      status: string;
      regiao: string;
      email: string;
      tipo: string;
      atuaCompras: boolean;
      atualizadoEm: string;
    };
    descTipoNegociacao: string;
    tabelaPrecoParceiro: [
      {
        id: number;
        empresaId: number;
        empresa: {
          id: number;
          descricao: string;
          atualizadoEm: string;
        };
        parceiroId: number;
        tabelaPrecoId: number;
        tabelaPreco: {
          id: number;
          codigo: number;
          descricao: string;
          dataInicial: string;
          dataFinal: string;
          itemTabela: [
            {
              id: number;
              tabelaPrecoId: number;
              idProd: number;
              preco: number;
              produtos: {
                id: number;
                nome: string;
                tipoUnid: string;
                tipoUnid2: string;
                conv: number;
                grupoProdutoId: number;
                aliIpi: number;
                grupoProduto: {
                  id: number;
                  nome: string;
                  atualizadoEm: string;
                };
                atualizadoEm: string;
              };
              atualizadoEm: string;
            }
          ];
          atualizadoEm: string;
        };
        atualizadoEm: string;
      }
    ];
    titulo: [
      {
        id: number;
        empresaId: number;
        parceiroId: number;
        nuUnico: number;
        parcela: number;
        dataEmissao: string;
        dataVencim: string;
        valor: number;
      }
    ];
    atualizadoEm: string;
  }
  async function popularParceiroWeb(parceiros: iParceiro[]) {
    const dataPedidoAtual = new Date();
    const ano = dataPedidoAtual.getFullYear();
    const mes = String(dataPedidoAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataPedidoAtual.getDate()).padStart(2, '0');
    const horas = String(dataPedidoAtual.getHours()).padStart(2, '0');
    const minutos = String(dataPedidoAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataPedidoAtual.getSeconds()).padStart(2, '0');

    const dataPedidoNovo = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('parceiro', 'readwrite');
    const store = transaction.objectStore('parceiro');

    try {
      await store.clear();

      for (const parceiro of parceiros) {
        parceiro.atualizadoEm = dataPedidoNovo;
        await store.add(parceiro);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== parceiros.length) {
        await store.clear();
        for (const parceiro of parceiros) {
          parceiro.atualizadoEm = dataPedidoNovo;
          await store.add(parceiro);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await db.close();
      finalizarRecebimentoGlobal();
      setrespostaSank('Dados Recebidos!');
      respostaSank = 'Dados Recebidos!';
    }
    try {
      await popularTituloApiFromParceiros(parceiros);
    } catch {}
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
  //=============RECEBER DADOS MOBILE ===================================
  async function receberDadosSankhyaMobile() {
    const iniciou = iniciarRecebimentoGlobal('PedidoMobile');
    if (!iniciou) {
      setModoRecebRapidoModal(false);
      setDadosRecebidos(true);
      dadosRecebidos = true;
      setShowMensageSankhya(true);
      setrespostaSank('Já existe um recebimento de dados em andamento. Aguarde finalizar.');
      respostaSank = 'Já existe um recebimento de dados em andamento. Aguarde finalizar.';
      return;
    }
    try {
      localStorage.setItem('RecebendoDadosModal', 'true');
    } catch {}
    setShowMensageLoading(false);
    setShowMensageLoadingDup(false);
    setSucess(0);
    sucess = 0;
    try {
      await criarBancoDados();
    } catch {}
    setShowMensageSankhya(true);
    setrespostaSank('Acessando servidor...');
    respostaSank = 'Acessando servidor...';
    console.log('entrou no receber dados para banco off');
    LogSankhya();
  }
  async function LogSankhya() {
    setSucess(10);
    sucess = 10;
    setrespostaSank('Verificando conexão...');
    respostaSank = 'Verificando conexão...';
    try {
      await receberTipoNeg();
    } catch (error) {
      setLoading(false);
      setShowMensageSankhya(false);
      console.log('erro ao efetuar login não mobile');
      setShowMensageSankhya(false);
      setShowMensageSankhyaErro(true);
      finalizarRecebimentoGlobal();
    }
  }

  async function receberTipoNeg() {
    setSucess(20);
    sucess = 20;

    setrespostaSank('Atualizando TipoNegociacao...');
    respostaSank = 'Atualizando TipoNegociacao...';
    const codVend = usuario.username;
    const sql = `SELECT CPL.SUGTIPNEGSAID Id
    , RTRIM(LTRIM(TPV.DESCRTIPVENDA)) Descricao
    , TPV.DHALTER AtualizadoEm
FROM TGFCPL CPL
LEFT JOIN (
select CODTIPVENDA
, DESCRTIPVENDA
, MAX(DHALTER) AS DHALTER
FROM TGFTPV TPV
GROUP BY  CODTIPVENDA
, DESCRTIPVENDA					
) TPV ON (TPV.CODTIPVENDA = CPL.SUGTIPNEGSAID)
JOIN TGFPAR PAR ON PAR.CODPARC = CPL.CODPARC
WHERE PAR.CODVEND = ${codVend}
AND PAR.ATIVO = 'S'
AND PAR.CLIENTE = 'S'
GROUP BY CPL.SUGTIPNEGSAID 
, RTRIM(LTRIM(TPV.DESCRTIPVENDA))
, TPV.DHALTER`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            descricao: curr[1],
            atualizadoEm: curr[2],
          };
        });
        console.log('dadostipo1', data);
        console.log('dadostipo2', result);
        popularTiponeg(result);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function receberParceiro() {
    setSucess(30);
    sucess = 30;

    setrespostaSank('Atualizando Parceiro...#Pedido');
    respostaSank = 'Atualizando Parceiro...#Pedido';
    const codVend = usuario.username;
    const sql = `SELECT PAR.CODPARC AS Id,
    REPLACE(PAR.RAZAOSOCIAL, CHAR(39),'') AS Nome,
    PAR.TIPPESSOA AS TipoPessoa,
    REPLACE(PAR.NOMEPARC, CHAR(39),'') AS NomeFantasia,
    PAR.CGC_CPF AS Cnpj_Cpf,
    ISNULL(PAR.EMAIL, '') AS Email,
    ISNULL(PAR.TELEFONE, '') AS Fone,
    PAR.CODTIPPARC AS Canal,
    REPLACE(ISNULL(EN1.TIPO +' '+ EN1.NOMEEND, ''), CHAR(39), '') AS Endereco,
    REPLACE(ISNULL(BAI.NOMEBAI, ''), CHAR(39), '') AS Bairro,
    REPLACE(CID.NOMECID, CHAR(39), '') AS Municipio,
    UFS.UF AS UF,
    PAR.ATIVO AS Status,
    ISNULL(CPL.SUGTIPNEGSAID, 0) AS TipoNegociacao,
    PAR.CODVEND AS VendedorId,
    GETDATE() AS AtualizadoEm,
    ISNULL(PAR.LIMCRED,0) as LC,
    ISNULL(PAR.LIMCRED, 0) - ISNULL(PED.VLRPED, 0) - ISNULL(FIN.VLRTIT, 0) AS SC
FROM 
    TGFPAR (NOLOCK) PAR
    JOIN TGFVEN (NOLOCK) VEN ON VEN.CODVEND = PAR.CODVEND AND VEN.CODVEND =  ${codVend}
    JOIN TSICID (NOLOCK) CID ON CID.CODCID = PAR.CODCID
    JOIN TSIUFS (NOLOCK) UFS ON UFS.CODUF = CID.UF
    LEFT JOIN TGFCPL (NOLOCK) CPL ON CPL.CODPARC = PAR.CODPARC
    LEFT JOIN TSIEND (NOLOCK) EN1 ON EN1.CODEND = PAR.CODEND
    LEFT JOIN TSIBAI (NOLOCK) BAI ON BAI.CODBAI = PAR.CODBAI
    LEFT JOIN (
        SELECT 
            CAB.CODPARC,
            SUM(((ITE.QTDNEG-ITE.QTDENTREGUE) * VLRUNIT)) AS VLRPED
        FROM 
            TGFITE ITE 
            JOIN TGFCAB CAB ON CAB.NUNOTA = ITE.NUNOTA
        WHERE 
            (ITE.QTDNEG-ITE.QTDENTREGUE) > 0
            AND ITE.PENDENTE = 'S'
        GROUP BY 
            CAB.CODPARC
    ) PED ON PED.CODPARC = PAR.CODPARC
    LEFT JOIN (
        SELECT 
            CAB.CODPARC,
            SUM(FIN.VLRDESDOB-FIN.VLRDESC-FIN.VLRBAIXA) AS VLRTIT
        FROM 
            TGFCAB CAB
            JOIN TGFFIN FIN ON FIN.NUNOTA = CAB.NUNOTA
        WHERE 
            CAB.TIPMOV = 'V'
            AND FIN.VLRDESDOB-FIN.VLRDESC-FIN.VLRBAIXA > 0
            AND FIN.PROVISAO <> 'S'
            AND ISNULL(FIN.NURENEG, 0) = 0
        GROUP BY 
            CAB.CODPARC
    ) FIN ON FIN.CODPARC = PAR.CODPARC
WHERE 
    PAR.CODPARC > 0
    AND PAR.CODVEND > 0
    AND PAR.CLIENTE = 'S'
    AND PAR.CODVEND =  ${codVend}`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            codParceiro: curr[0],
            nome: curr[1],
            tipoPessoa: curr[2],
            nomeFantasia: curr[3],
            cnpj_Cpf: curr[4],
            email: curr[5],
            fone: curr[6],
            canal: curr[7],
            endereco: curr[8],
            bairro: curr[9],
            municipio: curr[10],
            uf: curr[11],
            status: curr[12],
            tipoNegociacao: curr[13],
            vendedorId: curr[14],
            atualizadoEm: curr[15],
            lc: curr[16],
            sc: curr[17],
          };
        });
        console.log('dadostipo1', data);
        console.log('dadostipo2', result);
        popularParc(result);
        //
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function receberGrupoPrdo() {
    setSucess(40);
    sucess = 40;

    setrespostaSank('Atualizando Grupo de Produto...');
    respostaSank = 'Atualizando Grupo de Produto...';
    const codVend = usuario.username;
    const sql = `SELECT convert(int,SUBSTRING(RTRIM(CODGRUPOPROD),2,5)) Id, 
    RTRIM(LTRIM(REPLACE(ISNULL(DESCRGRUPOPROD,''), CHAR(39),''))) Nome
    FROM sankhya.TGFGRU (NOLOCK)
    WHERE ANALITICO = 'S'
    and SUBSTRING(RTRIM(CODGRUPOPROD),1,3) = '120'`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            nome: curr[1],
            atualizadoEm: '',
          };
        });
        console.log('dadostipo1', data);
        console.log('dadostipo2', result);

        popularGProd(result);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function receberProduto() {
    setSucess(50);
    sucess = 50;

    setrespostaSank('Atualizando Produto...');
    respostaSank = 'Atualizando Produto...';
    const codVend = usuario.username;
    const sql = `SELECT PRO.CODPROD Id, 
    substring(PRO.DESCRPROD,1,60) as Nome,  
    convert(int,SUBSTRING(RTRIM(CODGRUPOPROD),2,5)) GrupoProdutoId,
    PRO.DTALTER AtualizadoEm,
    PRO.CODVOL TipoUnid,
    ISNULL(VOA.CODVOL,'UN') TipoUnid2,
    ISNULL(VOA.QUANTIDADE,1) Conv,
    isnull(IPI.PERCENTUAL,0) as AliIpi
FROM sankhya.TGFPRO (NOLOCK) PRO
LEFT JOIN sankhya.TGFVOA (NOLOCK) VOA ON VOA.CODPROD = PRO.CODPROD AND VOA.ATIVO = 'S' AND VOA.AD_UNCOM = 'S'
LEFT JOIN sankhya.TGFIPI (NOLOCK) IPI ON IPI.CODIPI = PRO.CODIPI AND VOA.ATIVO = 'S'
WHERE PRO.CODPROD <> 0 AND PRO.USOPROD IN ('V','R')`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            nome: curr[1],
            grupoProdutoId: curr[2],
            tipoUnid: curr[4],
            tipoUnid2: curr[5],
            conv: curr[6],
            aliIpi: curr[7],
          };
        });
        console.log('dadostipo1 prod', data);
        console.log('dadostipo2', result);
        popularProd(result);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function receberTabelaPreco() {
    setSucess(60);
    sucess = 60;

    setrespostaSank('Atualizando Tabela de Preço...');
    respostaSank = 'Atualizando Tabela de Preço...';
    const codVend = usuario.username;
    const sql = `SELECT NTA.CODTAB Id, 1 Codigo, RTRIM(LTRIM(NTA.NOMETAB)) Descricao, TAB.DTVIGOR DataInicial, '2070-01-01 01:01:01' DataFinal 
    FROM TGFNTA (NOLOCK) NTA
    JOIN (SELECT CODTAB, MAX(DTVIGOR) DTVIGOR FROM TGFTAB (NOLOCK) GROUP BY CODTAB) TAB ON TAB.CODTAB = NTA.CODTAB
    JOIN TGFPAEM (NOLOCK) PAEM ON PAEM.CODTAB = NTA.CODTAB
    JOIN TGFPAR (NOLOCK) PAR ON PAR.CODPARC = PAEM.CODPARC
    JOIN TGFVEN (NOLOCK) VEN ON VEN.CODVEND = PAR.CODVEND 
                            AND VEN.CODVEND = ${codVend} 
    GROUP BY NTA.CODTAB,TAB.CODTAB,RTRIM(LTRIM(NTA.NOMETAB)),TAB.DTVIGOR 
    ORDER BY 1`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            codigo: curr[1],
            descricao: curr[2],
            dataInicial: curr[3],
            dataFinal: curr[4],
          };
        });
        console.log('dadostipo1 tabela', data);
        console.log('dadostipo2', result);
        popularTabelaPreco(result);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function receberItemTabela() {
    setSucess(70);
    sucess = 70;

    setrespostaSank('Atualizando Item Tabela de Preço...');
    respostaSank = 'Atualizando Item Tabela de Preço...';
    const codVend = usuario.username;
    const sql = `SELECT TAB.CODTAB TabelaPrecoId, EXC.CODPROD IdProd, EXC.VLRVENDA Preco, 
    ISNULL(EXC.AD_DTALTER, '1970-01-01 01:01:02') AtualizadoEm
    FROM TGFTAB TAB
    JOIN TGFNTA NTA ON NTA.CODTAB = TAB.CODTAB
    JOIN TGFEXC EXC ON EXC.NUTAB = TAB.NUTAB
    JOIN TGFPRO PRO ON PRO.CODPROD = EXC.CODPROD
    WHERE TAB.CODTAB IN (	SELECT NTA.CODTAB 
                            FROM TGFNTA (NOLOCK) NTA
                            JOIN TGFPAEM (NOLOCK) PAEM ON PAEM.CODTAB = NTA.CODTAB
                            JOIN TGFPAR (NOLOCK) PAR ON PAR.CODPARC = PAEM.CODPARC
                JOIN TGFVEN (NOLOCK) VEN ON VEN.CODVEND = PAR.CODVEND 
                                                    AND VEN.CODVEND = ${codVend}  
                            GROUP BY NTA.CODTAB,RTRIM(LTRIM(NTA.NOMETAB)))
    AND EXC.NUTAB = (SELECT TOP 1 NUTAB FROM TGFTAB WHERE CODTAB = TAB.CODTAB
                    AND CONVERT(DATE,DTVIGOR) <= CONVERT(DATE,GETDATE())
                    ORDER BY EXC.CODPROD, DTVIGOR DESC)
    --AND ISNULL(EXC.AD_DTALTER, '1970-01-01 01:01:02') > '$AtualizadoEm'
    AND PRO.USOPROD IN ('R','V')
    ORDER BY TAB.CODTAB, PRO.CODPROD`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            tabelaPrecoId: curr[0],
            idProd: curr[1],
            preco: curr[2],
          };
        });
        console.log('dadostipo1', data);
        console.log('dadostipo2', result);

        popularItemTab(result);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function tabelaPrecoParceiro() {
    setSucess(80);
    sucess = 80;

    setrespostaSank('Atualizando Tabela de Preço Parceiro...');
    respostaSank = 'Atualizando Tabela de Preço Parceiro...';
    const codVend = usuario.username;
    const sql = `SELECT PAR.CODPARC ParceiroId, PAEM.CODEMP EmpresaId, PAEM.CODTAB TabelaPrecoId
    FROM TGFPAR (NOLOCK) PAR
    JOIN TGFPAEM (NOLOCK) PAEM ON PAEM.CODPARC = PAR.CODPARC
    JOIN TGFVEN (NOLOCK) VEN ON VEN.CODVEND = PAR.CODVEND
                            AND VEN.CODVEND = ${codVend} 
    WHERE PAR.CLIENTE = 'S' 
    AND PAR.CODPARC > 0 
    AND PAR.CODVEND > 0
    AND PAR.ATIVO = 'S'`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            empresaId: curr[1],
            parceiroId: curr[0],
            tabelaPrecoId: curr[2],
          };
        });
        console.log('dadostipo1 tabela parceiro', data);
        console.log('dadostipo2', result);
        popularTabPrecoParc(result);
        //
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }
  async function recebertitulo() {
    setSucess(98);
    sucess = 98;

    setrespostaSank('Atualizando Títulos...');
    respostaSank = 'Atualizando Títulos...';
    const codVend = usuario.username;
    const sql = `SELECT FIN.CODEMP as EmpresaId
    , FIN.CODPARC as ParceiroId
    , FIN.NUNOTA as NuUnico
    , FIN.DESDOBRAMENTO as Parcela
    , CONVERT(DATE,FIN.DTNEG) as DataEmissao
    , CONVERT(DATE,FIN.DTVENC) as DataVencim
    , FIN.VLRDESDOB as Valor

    FROM TGFFIN FIN 
    JOIN TGFCAB CAB ON CAB.NUNOTA = FIN.NUNOTA
          JOIN TGFPAR PAR ON FIN.CODPARC = PAR.CODPARC
    WHERE (VLRDESDOB-(VLRBAIXA+VLRDESC)) > 0
                  AND PAR.ATIVO = 'S'
      AND PROVISAO = 'N'
      AND FIN.RECDESP = 1
      AND FIN.DHBAIXA IS NULL
      AND FIN.CODTIPTIT IN (0,4)
      AND FIN.CODTIPOPER NOT IN (1020,5016,5019,5029)
      AND CONVERT(DATE,FIN.DTVENC) < convert(date,dateadd(day, -3, getdate()))
      AND FIN.CODVEND = ${codVend}
      AND FIN.CODPARC NOT IN (471,512,589,1293)`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            empresaId: curr[0],
            parceiroId: curr[1],
            nuUnico: curr[2],
            parcela: curr[3],
            dataEmissao: curr[4],
            dataVencim: curr[5],
            valor: curr[6],
          };
        });
        console.log('dadostipo titulo', data);
        console.log('dadostipo1 titulo', result);
        popularTitulo(result);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }
  async function recebertabelaprecoadicional() {
    setSucess(100);
    sucess = 100;

    setrespostaSank('Atualizando Tabela de Preço Adicional...');
    respostaSank = 'Atualizando Tabela de Preço Adicional...';
    const codVend = usuario.username;
    const sql = `Select AD.CODEMP as EmpresaId 
    , AD.CODPARC as ParceiroId 
    , EXC.CODPROD as IdProd
    , EXC.VLRVENDA as Preco
    FROM AD_TABCLI AD 
    JOIN TGFPAR PAR ON PAR.CODPARC = AD.CODPARC 
    JOIN TGFEXC EXC ON EXC.NUTAB = AD.CODTAB 
    WHERE PAR.CODVEND = ${codVend}`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            empresaId: curr[0],
            idProd: curr[2],
            parceiroId: curr[1],
            preco: curr[3],
          };
        });
        console.log('dadostipo1 ', data);
        console.log('dadostipo1 adicional', result);
        setSucess(130);
        sucess = 130;
        popularTabAdicional(result);
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  //============POPULANDO AS TABELAS LOCAIS===========================
  async function popularTiponeg(tipos: iTipoNegociacao[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tipoNegociacao', 'readwrite');
    const store = transaction.objectStore('tipoNegociacao');

    try {
      await store.clear();

      for (const tipo of tipos) {
        await store.add(tipo);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== tipos.length) {
        await store.clear();
        for (const tipo of tipos) {
          await store.add(tipo);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await receberParceiro();
    }
  }
  interface iParc {
    id: number;
    codParceiro: number;
    nome: string;
    tipoPessoa: string;
    nomeFantasia: string;
    cnpj_Cpf: string;
    email: string;
    fone: string;
    canal: string;
    classificacao: string;
    tamanhoLoja: string;
    endereco: string;
    bairro: string;
    municipio: string;
    uf: string;
    lat: string;
    long: string;
    lc: number;
    sc: number;
    status: string;
    semVisita: boolean;
    primeiraSem: boolean;
    segundaSem: boolean;
    terceiraSem: boolean;
    quartaSem: boolean;
    quintaSem: boolean;
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
    tipoNegociacao: string;
    empresa: string;
    vendedorId: number;
    vendedor: {
      id: number;
      nome: string;
      status: string;
      regiao: string;
      email: string;
      tipo: string;
      atuaCompras: boolean;
      atualizadoEm: string;
    };
    descTipoNegociacao: string;
    tabelaPrecoParceiro: [
      {
        id: number;
        empresaId: number;
        empresa: {
          id: number;
          descricao: string;
          atualizadoEm: string;
        };
        parceiroId: number;
        tabelaPrecoId: number;
        tabelaPreco: {
          id: number;
          codigo: number;
          descricao: string;
          dataInicial: string;
          dataFinal: string;
          itemTabela: [
            {
              id: number;
              tabelaPrecoId: number;
              idProd: number;
              preco: number;
              produtos: {
                id: number;
                nome: string;
                tipoUnid: string;
                tipoUnid2: string;
                conv: number;
                grupoProdutoId: number;
                aliIpi: number;
                grupoProduto: {
                  id: number;
                  nome: string;
                  atualizadoEm: string;
                };
                atualizadoEm: string;
              };
              atualizadoEm: string;
            }
          ];
          atualizadoEm: string;
        };
        atualizadoEm: string;
      }
    ];
    titulo: [
      {
        id: number;
        empresaId: number;
        parceiroId: number;
        nuUnico: number;
        parcela: number;
        dataEmissao: string;
        dataVencim: string;
        valor: number;
      }
    ];
    atualizadoEm: string;
  }

  async function popularParc(parceiros: iParc[]) {
    const dataPedidoAtual = new Date();
    const ano = dataPedidoAtual.getFullYear();
    const mes = String(dataPedidoAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataPedidoAtual.getDate()).padStart(2, '0');
    const horas = String(dataPedidoAtual.getHours()).padStart(2, '0');
    const minutos = String(dataPedidoAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataPedidoAtual.getSeconds()).padStart(2, '0');

    const dataPedidoNovo = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('parceiro', 'readwrite');
    const store = transaction.objectStore('parceiro');

    try {
      await store.clear();

      for (const parceiro of parceiros) {
        parceiro.atualizadoEm = dataPedidoNovo;
        await store.add(parceiro);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== parceiros.length) {
        await store.clear();
        for (const parceiro of parceiros) {
          parceiro.atualizadoEm = dataPedidoNovo;
          await store.add(parceiro);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await receberGrupoPrdo();
    }
  }
  interface igrupoProduto {
    id: number;
    nome: string;
    atualizadoEm: string;
  }
  async function popularGProd(grupoProduto: igrupoProduto[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('grupoProduto', 'readwrite');
    const store = transaction.objectStore('grupoProduto');

    try {
      await store.clear();

      for (const grupo of grupoProduto) {
        await store.add(grupo);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== grupoProduto.length) {
        await store.clear();
        for (const grupo of grupoProduto) {
          await store.add(grupo);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await receberProduto();
    }
  }
  interface iproduto {
    id: number;
    codigo: string;
    nome: string;
    grupoProdutoId: number;
    aliIpi: number;
    grupoProduto: {
      id: number;
      nome: string;
      atualizadoEm: string;
    };
    atualizadoEm: string;
    conv: number;
    tipoUnid: string;
    tipoUnid2: string;
  }

  async function popularProd(produto: iproduto[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('produto', 'readwrite');
    const store = transaction.objectStore('produto');
    try {
      await store.clear();

      for (const prod of produto) {
        await store.add(prod);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== produto.length) {
        await store.clear();
        for (const prod of produto) {
          await store.add(prod);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await receberTabelaPreco();
    }
  }

  interface iTabelaPreco {
    id: number;
    codigo: number;
    descricao: string;
    dataInicial: string;
    dataFinal: string;
    atualizadoEm: string;
  }
  async function popularTabelaPreco(tabelaPreco: iTabelaPreco[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tabelaPreco', 'readwrite');
    const store = transaction.objectStore('tabelaPreco');

    try {
      await store.clear();

      for (const tabela of tabelaPreco) {
        await store.add(tabela);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== tabelaPreco.length) {
        await store.clear();
        for (const tabela of tabelaPreco) {
          await store.add(tabela);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await receberItemTabela();
    }
  }

  interface iItemTabela {
    id: number;
    tabelaPrecoId: number;
    idProd: number;
    preco: number;
    atualizadoEm?: string;
  }

  async function popularItemTab(itemTabela: iItemTabela[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('itemTabela', 'readwrite');
    const store = transaction.objectStore('itemTabela');

    try {
      await store.clear();

      let idIncremental = 1;

      for (const tabela of itemTabela) {
        tabela.id = idIncremental++;
        await store.add(tabela);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== itemTabela.length) {
        await store.clear();

        idIncremental = 1;

        for (const tabela of itemTabela) {
          tabela.id = idIncremental++;

          await store.add(tabela);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await tabelaPrecoParceiro();
    }
  }
  interface iTabelaPrecoParceiro {
    id: number;
    empresaId: number;
    empresa: {
      id: number;
      descricao: string;
      atualizadoEm: string;
    };
    parceiroId: number;
    tabelaPrecoId: number;
    tabelaPreco: {
      id: number;
      codigo: number;
      descricao: string;
      dataInicial: string;
      dataFinal: string;
      itemTabela: [
        {
          id: number;
          tabelaPrecoId: number;
          idProd: number;
          preco: number;
          produtos: {
            id: number;
            nome: string;
            tipoUnid: string;
            tipoUnid2: string;
            conv: number;
            grupoProdutoId: number;
            aliIpi: number;
            grupoProduto: {
              id: number;
              nome: string;
              atualizadoEm: string;
            };
            atualizadoEm: string;
          };
          atualizadoEm: string;
        }
      ];
      atualizadoEm: string;
    };
    atualizadoEm: string;
  }
  async function popularTabPrecoParc(
    tabelaPrecoParceiro: iTabelaPrecoParceiro[]
  ) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tabelaPrecoParceiro', 'readwrite');
    const store = transaction.objectStore('tabelaPrecoParceiro');

    try {
      await store.clear();
      let idIncremental = 1;

      for (const tabela of tabelaPrecoParceiro) {
        tabela.id = idIncremental++;
        await store.add(tabela);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== tabelaPrecoParceiro.length) {
        await store.clear();
        for (const tabela of tabelaPrecoParceiro) {
          tabela.id = idIncremental++;
          await store.add(tabela);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await recebertitulo();
    }
  }

  interface iTitulo {
    id: number;
    empresaId: number;
    parceiroId: number;
    nuUnico: number;
    parcela: number;
    dataEmissao: string;
    dataVencim: string;
    valor: number;
  }

  async function popularTitulo(titulo: iTitulo[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('titulo', 'readwrite');
    const store = transaction.objectStore('titulo');

    try {
      await store.clear();
      let idIncremental = 1;

      for (const tabela of titulo) {
        tabela.id = idIncremental++;
        await store.add(tabela);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== titulo.length) {
        await store.clear();
        for (const tabela of titulo) {
          tabela.id = idIncremental++;
          await store.add(tabela);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await recebertabelaprecoadicional();
    }
  }

  interface iTabelaAdicional {
    id: number;
    empresaId: number;
    idProd: number;
    parceiroId: number;
    preco: number;
    produtos: {
      id: number;
      nome: string;
      tipoUnid: string;
      tipoUnid2: string;
      conv: number;
      grupoProdutoId: number;
      aliIpi: number;
      grupoProduto: {
        id: number;
        nome: string;
        atualizadoEm: string;
      };
      atualizadoEm: string;
    };

    atualizadoem?: string;
  }

  async function popularTabAdicional(tabelaAdicional: iTabelaAdicional[]) {
    setSucess(130);
    sucess = 130;
    setShowMensageLoading(false);
    setShowMensageLoadingDup(false);
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tabelaPrecoAdicional', 'readwrite');
    const store = transaction.objectStore('tabelaPrecoAdicional');

    try {
      await store.clear();
      let idIncremental = 1;
      for (const tabela of tabelaAdicional) {
        tabela.id = idIncremental++;
        await store.add(tabela);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== tabelaAdicional.length) {
        await store.clear();
        for (const tabela of tabelaAdicional) {
          tabela.id = idIncremental++;
          await store.add(tabela);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await db.close();
      finalizarRecebimentoGlobal();
      setrespostaSank('Dados Recebidos!');
      respostaSank = 'Dados Recebidos!';
      try {
        const iniciouRecebimento = localStorage.getItem('RecebendoDadosModal') === 'true';
        if (iniciouRecebimento) {
          localStorage.removeItem('RecebendoDadosModal');
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      } catch {}
    }
  }

  //====GET ID VINDO DO BANCO LOCAL ======================================
  function Verifica() {
    console.log('verificando..');
    if (atualiza && isOnline) {
      VerificarDadosRecebidos();
    }
  }

  async function ExisteHoraReceberDadosConfiguracao(): Promise<boolean> {
    try {
      const resp = await api.get(`/api/ConfigUsuario/usuario/${usuario.id}`);
      const raw =
        (resp as any)?.data?.recebRapido ?? (resp as any)?.data?.RecebRapido;
      if (raw == null) return false;
      if (typeof raw === 'boolean') return raw;
      if (typeof raw === 'number') return raw === 1;
      if (typeof raw === 'string') {
        const v = raw.trim().toLowerCase();
        if (['true', '1', 's', 'sim', 'y', 'yes'].includes(v)) return true;
        if (['false', '0', 'n', 'nao', 'não', 'no'].includes(v)) return false;
        return false;
      }
      return false;
    } catch {
      return false;
    }
  }

  async function receberDadosApiLevePedido() {
    const iniciou = iniciarRecebimentoGlobal('PedidoApiLeve');
    if (!iniciou) {
      setModoRecebRapidoModal(false);
      setDadosRecebidos(true);
      dadosRecebidos = true;
      setShowMensageSankhya(true);
      setrespostaSank('Já existe um recebimento de dados em andamento. Aguarde finalizar.');
      respostaSank = 'Já existe um recebimento de dados em andamento. Aguarde finalizar.';
      return;
    }
    try {
      localStorage.setItem('RecebendoDadosModal', 'true');
    } catch {}
    setShowMensageLoading(false);
    setShowMensageLoadingDup(false);
    setShowMensage(false);
    setShowMensage2(false);
    setShowMensageSankhya(true);
    setrespostaSank('Atualizando Banco...');
    respostaSank = 'Atualizando Banco...';
    try {
      await criarBancoDados();
    } catch {}

    const codVendedor = String(usuario.username || '').trim();
    try {
      await popularBancoLocalApiLevePedido(codVendedor, 'Atualizando');
    } catch {
      setrespostaSank('Erro ao atualizar banco.');
      respostaSank = 'Erro ao atualizar banco.';
      finalizarRecebimentoGlobal();
      setTimeout(() => {
        setShowMensageSankhya(false);
      }, 3000);
    }
  }

  async function popularBancoLocalApiLevePedido(
    codVendedor: string,
    prefixo: 'Atualizando' | 'Inserindo' = 'Atualizando'
  ) {
    function msgTabela(nome: string, tag?: string) {
      const sufixo = prefixo === 'Inserindo' ? ' no banco local' : '';
      const extra = tag ? `...${tag}` : '...';
      return `${prefixo} ${nome}${sufixo}${extra}`;
    }

    setSucess(20);
    sucess = 20;
    setrespostaSank(msgTabela('TipoNegociacao'));
    respostaSank = msgTabela('TipoNegociacao');
    const respTipoNeg = await api.get(`/api/TipoNegociacao?pagina=1&totalpagina=999`);
    const tipos = Array.isArray((respTipoNeg as any)?.data?.data)
      ? (respTipoNeg as any).data.data
      : [];
    await popularTipoNegociacaoApi(tipos);

    setSucess(30);
    sucess = 30;
    setrespostaSank(msgTabela('Parceiro', '#Pedido'));
    respostaSank = msgTabela('Parceiro', '#Pedido');
    const respParceiro = await api.get(`/api/Parceiro/total?codVendedor=${codVendedor}`);
    const listaParceiro = Array.isArray((respParceiro as any)?.data?.data)
      ? (respParceiro as any).data.data
      : [];
    const parceiros = listaParceiro.filter(
      (p: any) => String(p?.vendedorId) == codVendedor && p?.status == 'S'
    );
    await popularParceiroApi(parceiros);

    setSucess(40);
    sucess = 40;
    setrespostaSank(msgTabela('GrupoProduto'));
    respostaSank = msgTabela('GrupoProduto');
    const respGrupo = await api.get(`/api/GrupoProduto?pagina=1&totalpagina=999`);
    const grupos = Array.isArray((respGrupo as any)?.data?.data)
      ? (respGrupo as any).data.data
      : [];
    await popularGrupoProdutoApi(grupos);

    setSucess(50);
    sucess = 50;
    setrespostaSank(msgTabela('Produto'));
    respostaSank = msgTabela('Produto');
    const respProd = await api.get(`/api/Produto/total`);
    const produtos = Array.isArray((respProd as any)?.data?.data)
      ? (respProd as any).data.data
      : [];
    await popularProdutoApi(produtos);

    setSucess(60);
    sucess = 60;
    setrespostaSank(msgTabela('TabelaPreco'));
    respostaSank = msgTabela('TabelaPreco');
    const respTabPreco = await api.get(`/api/TabelaPreco/total`);
    const tabelasPreco = Array.isArray((respTabPreco as any)?.data?.data)
      ? (respTabPreco as any).data.data
      : [];
    await popularTabelaPrecoApi(tabelasPreco);

    setSucess(70);
    sucess = 70;
    setrespostaSank(msgTabela('TabelaPrecoAdicional'));
    respostaSank = msgTabela('TabelaPrecoAdicional');
    const respAdicional = await api.get(
      `/api/ItemTabelaPreco/tabelaAdicional?vendedorId=${codVendedor}`
    );
    const adicional = Array.isArray((respAdicional as any)?.data?.data)
      ? (respAdicional as any).data.data
      : [];
    await popularTabelaAdicionalApi(adicional, false);

    setSucess(80);
    sucess = 80;
    setrespostaSank(msgTabela('ItemTabela'));
    respostaSank = msgTabela('ItemTabela');
    const respItemTabela = await api.get(
      `/api/ItemTabelaPreco/ItensTotais?vendedorId=${codVendedor}`
    );
    const itensTabela = Array.isArray((respItemTabela as any)?.data?.data)
      ? (respItemTabela as any).data.data
      : [];
    await popularItemTabelaApi(itensTabela);

    setSucess(90);
    sucess = 90;
    setrespostaSank(msgTabela('TabelaPrecoParceiro'));
    respostaSank = msgTabela('TabelaPrecoParceiro');
    const respTabParc = await api.get(`/api/TabelaPrecoParceiro/total`);
    const tabParc = Array.isArray((respTabParc as any)?.data?.data)
      ? (respTabParc as any).data.data
      : [];
    await popularTabelaPrecoParceiroApi(tabParc);

    await GetCabecalho();

    setSucess(100);
    sucess = 100;
    setrespostaSank(msgTabela('Titulo'));
    respostaSank = msgTabela('Titulo');
    await popularTituloApiFromParceiros(parceiros);

    finalizarRecebimentoGlobal();
    setrespostaSank('Dados Recebidos!');
    respostaSank = 'Dados Recebidos!';
    try {
      const iniciouRecebimento = localStorage.getItem('RecebendoDadosModal') === 'true';
      if (iniciouRecebimento) {
        localStorage.removeItem('RecebendoDadosModal');
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch {}
  }

  async function popularParceiroApi(parceiros: any[]) {
    const dataPedidoAtual = new Date();
    const ano = dataPedidoAtual.getFullYear();
    const mes = String(dataPedidoAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataPedidoAtual.getDate()).padStart(2, '0');
    const horas = String(dataPedidoAtual.getHours()).padStart(2, '0');
    const minutos = String(dataPedidoAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataPedidoAtual.getSeconds()).padStart(2, '0');
    const dataPedidoNovo = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('parceiro', 'readwrite');
    const store = transaction.objectStore('parceiro');
    try {
      await store.clear();
      for (const parceiro of parceiros) {
        if (parceiro) parceiro.atualizadoEm = dataPedidoNovo;
        await store.add(parceiro);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== parceiros.length) {
        await store.clear();
        for (const parceiro of parceiros) {
          if (parceiro) parceiro.atualizadoEm = dataPedidoNovo;
          await store.add(parceiro);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularTituloApiFromParceiros(parceiros: any[]) {
    const titulos: any[] = [];
    for (const parceiro of parceiros) {
      const lista = parceiro?.titulo;
      if (!Array.isArray(lista)) continue;
      for (const t of lista) {
        if (t) titulos.push(t);
      }
    }
    const dedup = new Map<string, any>();
    for (const t of titulos) {
      const key = `${String(t?.id ?? '')}|${String(t?.empresaId ?? '')}|${String(
        t?.parceiroId ?? ''
      )}|${String(t?.nuUnico ?? '')}|${String(t?.parcela ?? '')}`;
      if (!dedup.has(key)) dedup.set(key, t);
    }
    await popularTituloApi(Array.from(dedup.values()));
  }

  async function popularTituloApi(titulo: any[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('titulo', 'readwrite');
    const store = transaction.objectStore('titulo');
    try {
      await store.clear();
      for (const t of titulo) {
        await store.add(t);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== titulo.length) {
        await store.clear();
        for (const t of titulo) {
          await store.add(t);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularTipoNegociacaoApi(tipos: any[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tipoNegociacao', 'readwrite');
    const store = transaction.objectStore('tipoNegociacao');
    try {
      await store.clear();
      for (const tipo of tipos) {
        await store.add(tipo);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== tipos.length) {
        await store.clear();
        for (const tipo of tipos) {
          await store.add(tipo);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularGrupoProdutoApi(grupoProduto: any[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('grupoProduto', 'readwrite');
    const store = transaction.objectStore('grupoProduto');
    try {
      await store.clear();
      for (const grupo of grupoProduto) {
        await store.add(grupo);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== grupoProduto.length) {
        await store.clear();
        for (const grupo of grupoProduto) {
          await store.add(grupo);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularProdutoApi(produto: any[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('produto', 'readwrite');
    const store = transaction.objectStore('produto');
    try {
      await store.clear();
      for (const prod of produto) {
        await store.add(prod);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== produto.length) {
        await store.clear();
        for (const prod of produto) {
          await store.add(prod);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularTabelaPrecoApi(tabelaPreco: any[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tabelaPreco', 'readwrite');
    const store = transaction.objectStore('tabelaPreco');
    try {
      await store.clear();
      for (const tabela of tabelaPreco) {
        await store.add(tabela);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== tabelaPreco.length) {
        await store.clear();
        for (const tabela of tabelaPreco) {
          await store.add(tabela);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularItemTabelaApi(itemTabela: any[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('itemTabela', 'readwrite');
    const store = transaction.objectStore('itemTabela');
    try {
      await store.clear();
      for (const item of itemTabela) {
        await store.add(item);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== itemTabela.length) {
        await store.clear();
        for (const item of itemTabela) {
          await store.add(item);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularTabelaPrecoParceiroApi(tabelaPrecoParceiro: any[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tabelaPrecoParceiro', 'readwrite');
    const store = transaction.objectStore('tabelaPrecoParceiro');
    try {
      await store.clear();
      for (const tabela of tabelaPrecoParceiro) {
        await store.add(tabela);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== tabelaPrecoParceiro.length) {
        await store.clear();
        for (const tabela of tabelaPrecoParceiro) {
          await store.add(tabela);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
    }
  }

  async function popularTabelaAdicionalApi(
    tabelaAdicional: any[],
    finalizarFluxo: boolean = true
  ) {
    if (finalizarFluxo) {
      setSucess(130);
      sucess = 130;
    }
    setShowMensageLoading(false);
    setShowMensageLoadingDup(false);

    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tabelaPrecoAdicional', 'readwrite');
    const store = transaction.objectStore('tabelaPrecoAdicional');
    try {
      await store.clear();
      for (const tabela of tabelaAdicional) {
        await store.add(tabela);
      }
      const registrosInseridos = await store.count();
      if (registrosInseridos !== tabelaAdicional.length) {
        await store.clear();
        for (const tabela of tabelaAdicional) {
          await store.add(tabela);
        }
      }
    } finally {
      await transaction.done;
      await db.close();
      if (finalizarFluxo) {
        finalizarRecebimentoGlobal();
        setrespostaSank('Dados Recebidos!');
        respostaSank = 'Dados Recebidos!';
        try {
          const iniciouRecebimento =
            localStorage.getItem('RecebendoDadosModal') === 'true';
          if (iniciouRecebimento) {
            localStorage.removeItem('RecebendoDadosModal');
            setTimeout(() => {
              window.location.reload();
            }, 800);
          }
        } catch {}
      }
    }
  }

  async function VerificarDadosRecebidos() {
    try {
      const dataPedidoAtual = new Date();
      const anoPedidoAtual = dataPedidoAtual.getFullYear();
      const mesPedidoAtual = dataPedidoAtual.getMonth() + 1;
      const diaPedidoAtual = dataPedidoAtual.getDate();

      const parteDaData1 = `${anoPedidoAtual}-${mesPedidoAtual
        .toString()
        .padStart(2, '0')}-${diaPedidoAtual.toString().padStart(2, '0')}`;

      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('parceiro', 'readonly');
      const store = transaction.objectStore('parceiro');

      const registros = await store.getAll();
      if (registros.length > 0) {
        console.log('registros', registros[0]);
        const parteDaData2 = registros[0].atualizadoEm.split('T')[0];
        console.log(
          'verificar anos',
          parteDaData1,
          'verificar anos Parceiro',
          parteDaData2
        );

        if (parteDaData1 !== parteDaData2) {
          try {
            localStorage.setItem('RecebendoDadosModal', 'true');
          } catch {}
          setShowMensageLoading(false);
          setShowMensageLoadingDup(false);
          setShowMensage(false);
          setShowMensage2(false);
          setShowMensageSankhya(true);
          setrespostaSank('Seus dados podem estar desatualizados...');
          respostaSank = 'Seus dados podem estar desatualizados...';

          const usarFluxoLeve = await ExisteHoraReceberDadosConfiguracao();
          setModoRecebRapidoModal(usarFluxoLeve);
          if (usarFluxoLeve) {
            setTimeout(function () {
              receberDadosApiLevePedido();
            }, 2000);
          } else if (isMobile) {
            console.log('EntrounomobileReceber');
            setTimeout(function () {
              receberDadosSankhyaMobile();
            }, 2000);
          } else {
            setTimeout(function () {
              receberDadosSankhyaWeb();
            }, 2000);
          }
        }
      } else {
        try {
          localStorage.setItem('RecebendoDadosModal', 'true');
        } catch {}
        setShowMensageLoading(false);
        setShowMensageLoadingDup(false);
        setShowMensage(false);
        setShowMensage2(false);
        setShowMensageSankhya(true);
        setrespostaSank('Seus dados podem estar desatualizados...');
        respostaSank = 'Seus dados podem estar desatualizados...';

        const usarFluxoLeve = await ExisteHoraReceberDadosConfiguracao();
        setModoRecebRapidoModal(usarFluxoLeve);
        if (usarFluxoLeve) {
          setTimeout(function () {
            receberDadosApiLevePedido();
          }, 2000);
        } else if (isMobile) {
          console.log('EntrounomobileReceber');
          setTimeout(function () {
            receberDadosSankhyaMobile();
          }, 2000);
        } else {
          setTimeout(function () {
            receberDadosSankhyaWeb();
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar dados:', error);
    }
  }
  //========================================================
  async function GetTipNeg(idCliente: number) {
    if (isMobile) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction(
          ['parceiro', 'tipoNegociacao', 'tabelaPrecoParceiro', 'titulo'],
          'readonly'
        );
        const parceiroStore = transaction.objectStore('parceiro');
        const tituloStore = transaction.objectStore('titulo');
        const tipoNegociacaoStore = transaction.objectStore('tipoNegociacao');
        const tabelaPrecoParceiroStore = transaction.objectStore(
          'tabelaPrecoParceiro'
        );
        const clienteData = await parceiroStore.get(Number(idCliente));

        if (clienteData) {
          const tipoNegociacaoId = clienteData.tipoNegociacao;
          const tiponegociacaoData = await tipoNegociacaoStore.get(
            Number(tipoNegociacaoId)
          );
          console.log('testwTipoNeg', tiponegociacaoData);

          console.log('cliente vindo do banco local:', clienteData);
          const options: iDataSelect[] = [
            {
              value: String(tiponegociacaoData?.id),
              label: tiponegociacaoData?.descricao,
            },
            { value: '1', label: 'À VISTA' },
          ];
          const dedup = new Map<string, iDataSelect>();
          options.forEach((opt) => {
            const key = String(opt.value || '').trim();
            if (key && !dedup.has(key)) dedup.set(key, opt);
          });
          const uniq = Array.from(dedup.values());
          setOptinosNegocia(uniq);
          OptinosNegocia = uniq;
        }
      } catch (error) {
        console.error('Erro ao obter o cliente:', error);
      }
    } else {
      await api
        .get(`/api/Parceiro/${idCliente}`)
        .then((response) => {
          console.log('dados parceiro', response.data);

          const options: iDataSelect[] = [
            {
              value: String(response.data.tipoNegociacao),
              label: response.data.descTipoNegociacao,
            },
            { value: '1', label: 'À VISTA' },
          ];
          const dedup = new Map<string, iDataSelect>();
          options.forEach((opt: iDataSelect) => {
            const key = String(opt.value || '').trim();
            if (key && !dedup.has(key)) dedup.set(key, opt);
          });
          const uniq = Array.from(dedup.values());
          setOptinosNegocia(uniq);
          OptinosNegocia = uniq;
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }

    console.log('total de titulos Vencidos', titulo);
    setLoading(false);
  }

  //========================================================
  async function Getcliente(idCliente: number) {
    console.log('id recebido no getid', idCliente);
    setCondPagtoManual(false);
    setTipoEmpresaSelect([]);
    tipoEmpresaSelect = [];
    setOptinosEmpresa([]);

    if (isMobile) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction(
          ['parceiro', 'tipoNegociacao', 'tabelaPrecoParceiro', 'titulo'],
          'readonly'
        );
        const parceiroStore = transaction.objectStore('parceiro');
        const tituloStore = transaction.objectStore('titulo');
        const tipoNegociacaoStore = transaction.objectStore('tipoNegociacao');
        const tabelaPrecoParceiroStore = transaction.objectStore(
          'tabelaPrecoParceiro'
        );

        const clienteData = await parceiroStore.get(Number(idCliente));
        console.log('cliente vindo do banco local:', clienteData);
        if (clienteData) {
          const clienteSelecionadoData = clienteData as iParceir;
          setClienteSelecionado(clienteSelecionadoData);
          setVendedorId(Number((clienteData as any)?.vendedorId ?? 0) || 0);
            setPlaceHolder(
              `${clienteData.id} - ${clienteData.nome} - ${clienteData.cnpj_Cpf}`
            );
          setsaldo(clienteData.sc);
          setNomeCliente(clienteData.nome);
          setfantasiaCliente(clienteData.nomeFantasia);
          setbairroCliente(clienteData.bairro);
          setendCliente(clienteData.endereco);
          setcidadeCliente(clienteData.municipio);
          setufCliente(clienteData.uf);
          setcnpjCliente(clienteData.cnpj_Cpf);
          setfoneCliente(clienteData.fone);
          setemailCliente(clienteData.email);
          setcodiCliente(String(clienteData.id));

          const tipoNegociacaoId = clienteData.tipoNegociacao;
          const tiponegociacaoData = await tipoNegociacaoStore.get(
            Number(tipoNegociacaoId)
          );

          const títulosDoCliente = (await tituloStore.getAll()).filter(
            (titulo) => titulo.parceiroId === Number(idCliente)
          );

          clienteSelecionadoData.titulo = títulosDoCliente;

          if (tiponegociacaoData) {
            setDescTipo(tiponegociacaoData.descricao);
            descTipo = tiponegociacaoData.descricao;
          } else {
            const descParceiro = String((clienteData as any)?.descTipoNegociacao || '').trim();
            if (descParceiro) {
              setDescTipo(descParceiro);
              descTipo = descParceiro;
            } else {
              setDescTipo('Não possui tipo de negociação');
              descTipo = 'Não possui tipo de negociação';
            }
          }
          try {
            const descParceiro = String((clienteData as any)?.descTipoNegociacao || '').trim();
            const options: iDataSelect[] = [
              {
                value: String(clienteData.tipoNegociacao),
                label: String(descParceiro || tiponegociacaoData?.descricao || ''),
              },
              { value: '1', label: 'À VISTA' },
            ];
            const dedup = new Map<string, iDataSelect>();
            options.forEach((opt) => {
              const key = String(opt.value || '').trim();
              if (key && key !== '0' && !dedup.has(key)) dedup.set(key, opt);
            });
            const uniq = Array.from(dedup.values());
            setOptinosNegocia(uniq);
            OptinosNegocia = uniq;
          } catch {}

          if (
            !condPagtoManual &&
            clienteData.tipoNegociacao &&
            String(clienteData.tipoNegociacao) !== '0'
          ) {
            setTipoNegocia(String(clienteData.tipoNegociacao));
            tipoNegocia = String(clienteData.tipoNegociacao);
          }

          const empresaSelectData = await tabelaPrecoParceiroStore.getAll();

          if (empresaSelectData) {
            const extras: iDataSelect[] = empresaSelectData
              .filter((item) => item.parceiroId === clienteData.id)
              .map((item) => ({
                value: String(item.empresaId),
                label:
                  item.empresaId === 1
                    ? 'Indústria'
                    : item.empresaId === 2
                    ? 'Distribuidora'
                    : item.empresaId === 3
                    ? 'Distrib. - SP'
                    : '',
              }))
              .filter((opt) => opt.label !== '');
            const base: iDataSelect[] = [
              { value: '1', label: 'Indústria' },
              { value: '2', label: 'Distribuidora' },
            ];
            const dedup = new Map<string, iDataSelect>();
            [...base, ...extras].forEach((opt) => {
              const key = String(opt.value || '').trim();
              if (key && !dedup.has(key)) dedup.set(key, opt);
            });
            setOptinosEmpresa(Array.from(dedup.values()));
          }

          console.log('dados do cliente', clienteData);
          setcnpj(clienteData.cnpj_Cpf);
          setLc(clienteData.lc);
          lc = clienteData.lc;
          setTipoEmpresaSelect(clienteData.tabelaPrecoParceiro);
          tipoEmpresaSelect = clienteData.tabelaPrecoParceiro;

          console.log(
            'dados da tabela do cliente',
            clienteData.tabelaPrecoParceiro
          );

          if (!codEmpresa || String(codEmpresa).trim() === '' || String(codEmpresa) === '0') {
            setCodEmpresa(String(empresaSelectData[0].empresaId));
            codEmpresa = String(empresaSelectData[0].empresaId);
          }
          console.log('tabela 1 do cliente', codEmpresa);

          if (clienteData.endereco !== '') {
            setEnderecoCliente(
              `${clienteData.endereco} - ${clienteData.bairro} - ${clienteData.municipio} - ${clienteData.uf}`
            );
            enderecoCliente = `${clienteData.endereco} - ${clienteData.bairro} - ${clienteData.municipio} - ${clienteData.uf}`;
          } else {
            setEnderecoCliente('Endereço não informado');
            enderecoCliente = 'Endereço não informado';
          }

          GetTipoPagamento();
          DataAtual();
          GetTabelaPreco();

          NumeroNovoPedido();

          let qtdItensVenc = 0;
          let totalValorVencido = 0;
          let titulosVencidosTotais: any[] = [];
          const currentDate = new Date();
          let titulosVencidos = false;

          clienteData.titulo.forEach((titulo: any) => {
            const dataVenc = new Date(titulo.dataVencim);
            const differenceInMilliseconds =
              currentDate.getTime() - dataVenc.getTime();
            const differenceInDays =
              differenceInMilliseconds / (1000 * 60 * 60 * 24);

            if (differenceInDays >= 3) {
              titulosVencidos = true;
              qtdItensVenc++;
              totalValorVencido += titulo.valor;
              titulosVencidosTotais.push(titulo);
            }
          });

          if (titulosVencidos) {
            setShowMensage(true);
            setAlertErroMensage(true);
            setMsgErro(
              `O cliente possui títulos vencidos a mais de 3 dias, não poderá enviar pedidos!`
            );
            settitulosVencidos(true);
            setQuantItensVenc(
              clienteData.titulo.filter((titulo: any) => {
                const dataVenc = new Date(titulo.dataVencim);
                const differenceInMilliseconds =
                  currentDate.getTime() - dataVenc.getTime();
                const differenceInDays =
                  differenceInMilliseconds / (1000 * 60 * 60 * 24);
                return differenceInDays >= 3;
              }).length
            );
            setValorItensVenc(totalValorVencido);
            valorItensVenc = totalValorVencido;
            setTitulo(titulosVencidosTotais);
            titulo = titulosVencidosTotais;
          } else {
            console.log('Títulos ok.');
            settitulosVencidos(false);
          }

          setQuantItensVenc(qtdItensVenc);
          qtdItensVenc = qtdItensVenc;
          setValorItensVenc(valorItensVenc);
          valorItensVenc = valorItensVenc;
        } else {
          console.log('Cliente não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao obter o cliente:', error);
      }
    } else {
      setCondPagtoManual(false);
      await api
        .get(`/api/Parceiro/${idCliente}`)
        .then(async (response) => {
          console.log('dados parceiro', response.data);
          setPlaceHolder(
            `${response.data.id} - ${response.data.nome} - ${response.data.cnpj_Cpf}`
          );
          setsaldo(response.data.sc);
          saldo = response.data.sc;
          setClienteSelecionado(response.data);
          clienteSelecionado = response.data;
          setVendedorId(Number(response.data?.vendedorId ?? 0) || 0);

          setNomeCliente(response.data.nome);
          setfantasiaCliente(response.data.nomeFantasia);
          setbairroCliente(response.data.bairro);
          setendCliente(response.data.endereco);
          setcidadeCliente(response.data.municipio);
          setufCliente(response.data.uf);
          setcnpjCliente(response.data.cnpj_Cpf);
          setfoneCliente(response.data.fone);
          setemailCliente(response.data.email);
          setcodiCliente(response.data.id);
          setDescTipo(response.data.descTipoNegociacao);
          descTipo = response.data.descTipoNegociacao;

          if (response.data.tipoNegociacao == '0') {
            setDescTipo('Não possui tipo de negociação');
            descTipo = 'Não possui tipo de negociação';
          }
          const options: iDataSelect[] = [
            {
              value: String(response.data.tipoNegociacao),
              label: response.data.descTipoNegociacao,
            },
            { value: '1', label: 'À VISTA' },
          ];
          const dedup = new Map<string, iDataSelect>();
          options.forEach((opt: iDataSelect) => {
            const key = String(opt.value || '').trim();
            if (key && !dedup.has(key)) dedup.set(key, opt);
          });
          const uniq = Array.from(dedup.values());
          setOptinosNegocia(uniq);
          OptinosNegocia = uniq;

          if (
            !condPagtoManual &&
            response.data.tipoNegociacao &&
            String(response.data.tipoNegociacao) !== '0'
          ) {
            setTipoNegocia(String(response.data.tipoNegociacao));
            tipoNegocia = String(response.data.tipoNegociacao);
          }
          console.log('dados do cliente', clienteSelecionado);
          setLc(response.data.lc);
          lc = response.data.lc;
          setTipoEmpresaSelect(response.data.tabelaPrecoParceiro);
          tipoEmpresaSelect = response.data.tabelaPrecoParceiro;
          console.log(
            'dados da tabela do cliente',
            response.data.tabelaPrecoParceiro
          );
          try {
            const extras: iDataSelect[] = (response.data.tabelaPrecoParceiro || [])
              .map((item: any) => ({
                value: String(item.empresaId),
                label:
                  item?.empresa?.descricao ||
                  (item.empresaId === 1
                    ? 'Indústria'
                    : item.empresaId === 2
                    ? 'Distribuidora'
                    : item.empresaId === 3
                    ? 'Distrib. - SP'
                    : ''),
              }))
              .filter((opt: iDataSelect) => (opt.label || '').trim() !== '');
            const base: iDataSelect[] = [
              { value: '1', label: 'Indústria' },
              { value: '2', label: 'Distribuidora' },
            ];
            const dedup = new Map<string, iDataSelect>();
            [...base, ...extras].forEach((opt) => {
              const key = String(opt.value || '').trim();
              if (key && !dedup.has(key)) dedup.set(key, opt);
            });
            setOptinosEmpresa(Array.from(dedup.values()));
          } catch {}
          setcnpj(response.data.cnpj_Cpf);
          if (!codEmpresa || String(codEmpresa).trim() === '' || String(codEmpresa) === '0') {
            setCodEmpresa(String(response.data.tabelaPrecoParceiro[0].empresaId));
            codEmpresa = String(response.data.tabelaPrecoParceiro[0].empresaId);
          }
          console.log('tabela 1 do cliente', codEmpresa);
          if (response.data.endereco != '') {
            setEnderecoCliente(
              response.data.endereco +
                ' - ' +
                response.data.bairro +
                ' - ' +
                response.data.municipio +
                ' - ' +
                response.data.uf
            );
            enderecoCliente =
              response.data.endereco +
              ' - ' +
              response.data.bairro +
              ' - ' +
              response.data.municipio +
              ' - ' +
              response.data.uf;
          } else {
            setEnderecoCliente('Endereço não informado');
            enderecoCliente = 'Endereço não informado';
          }

          GetTipoPagamento();
          DataAtual();
          GetTabelaPreco();

          NumeroNovoPedido();
          let qtdItensVenc = 0;

          let totalValorVencido = 0;
          let titulosVencidosTotais: any[] = [];
          const currentDate = new Date();
          let titulosVencidos = false;
          response.data.titulo.forEach((titulo: any) => {
            const dataVenc = new Date(titulo.dataVencim);
            const differenceInMilliseconds =
              currentDate.getTime() - dataVenc.getTime();
            const differenceInDays =
              differenceInMilliseconds / (1000 * 60 * 60 * 24);
            if (differenceInDays >= 3) {
              titulosVencidos = true;
              qtdItensVenc++;
              totalValorVencido += titulo.valor;
              titulosVencidosTotais.push(titulo);
            }
          });
          if (titulosVencidos) {
            setShowMensage(true);
            setAlertErroMensage(true);
            setMsgErro(
              `O cliente possui títulos vencidos a mais de 3 dias, não poderá enviar pedidos!`
            );
            settitulosVencidos(true);
            setQuantItensVenc(
              response.data.titulo.filter((titulo: any) => {
                const dataVenc = new Date(titulo.dataVencim);
                const differenceInMilliseconds =
                  currentDate.getTime() - dataVenc.getTime();
                const differenceInDays =
                  differenceInMilliseconds / (1000 * 60 * 60 * 24);
                return differenceInDays >= 3;
              }).length
            );
            setValorItensVenc(totalValorVencido);
            valorItensVenc = totalValorVencido;
            setTitulo(titulosVencidosTotais);
            titulo = titulosVencidosTotais;
          } else {
            console.log('Títulos ok.');
            settitulosVencidos(false);
          }
          setQuantItensVenc(qtdItensVenc);
          qtdItensVenc = qtdItensVenc;
          setValorItensVenc(valorItensVenc);
          valorItensVenc = valorItensVenc;
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }

    console.log('total de titulos Vencidos', titulo);
    setLoading(false);
  }

  async function Getclientebanconuvem(idCliente: any) {
    setTipoEmpresaSelect([]);
    tipoEmpresaSelect = [];
    await api
      .get(`/api/Parceiro/${idCliente}`)
      .then((response) => {
        console.log('dados parceiro', response.data);
        setsaldo(response.data.sc);
        saldo = response.data.sc;
        setClienteSelecionado(response.data);
        clienteSelecionado = response.data;

        setNomeCliente(response.data.nome);
        setfantasiaCliente(response.data.nomeFantasia);
        setbairroCliente(response.data.bairro);
        setendCliente(response.data.endereco);
        setcidadeCliente(response.data.municipio);
        setufCliente(response.data.uf);
        setcnpjCliente(response.data.cnpj_Cpf);
        setfoneCliente(response.data.fone);
        setemailCliente(response.data.email);
        setcodiCliente(response.data.id);
        setDescTipo(response.data.descTipoNegociacao);
        descTipo = response.data.descTipoNegociacao;

        if (response.data.tipoNegociacao == '0') {
          setDescTipo('Não possui tipo de negociação');
          descTipo = 'Não possui tipo de negociação';
        }
        console.log('dados do cliente', clienteSelecionado);
        setTipoNegocia(String(response.data.tipoNegociacao));
        tipoNegocia = response.data.tipoNegociacao;
        setLc(response.data.lc);
        lc = response.data.lc;
        setTipoEmpresaSelect(response.data.tabelaPrecoParceiro);
        tipoEmpresaSelect = response.data.tabelaPrecoParceiro;
        console.log(
          'dados da tabela do cliente',
          response.data.tabelaPrecoParceiro
        );
        try {
          const extras: iDataSelect[] = (response.data.tabelaPrecoParceiro || [])
            .map((item: any) => ({
              value: String(item.empresaId),
              label:
                item?.empresa?.descricao ||
                (item.empresaId === 1
                  ? 'Indústria'
                  : item.empresaId === 2
                  ? 'Distribuidora'
                  : item.empresaId === 3
                  ? 'Distrib. - SP'
                  : ''),
            }))
            .filter((opt: iDataSelect) => (opt.label || '').trim() !== '');
          const base: iDataSelect[] = [
            { value: '1', label: 'Indústria' },
            { value: '2', label: 'Distribuidora' },
          ];
          const dedup = new Map<string, iDataSelect>();
          [...base, ...extras].forEach((opt) => {
            const key = String(opt.value || '').trim();
            if (key && !dedup.has(key)) dedup.set(key, opt);
          });
          setOptinosEmpresa(Array.from(dedup.values()));
        } catch {}
        setcnpj(response.data.cnpj_Cpf);
        if (!codEmpresa || String(codEmpresa).trim() === '' || String(codEmpresa) === '0') {
          setCodEmpresa(String(response.data.tabelaPrecoParceiro[0].empresaId));
          codEmpresa = String(response.data.tabelaPrecoParceiro[0].empresaId);
        }
        console.log('tabela 1 do cliente', codEmpresa);
        if (response.data.endereco != '') {
          setEnderecoCliente(
            response.data.endereco +
              ' - ' +
              response.data.bairro +
              ' - ' +
              response.data.municipio +
              ' - ' +
              response.data.uf
          );
          enderecoCliente =
            response.data.endereco +
            ' - ' +
            response.data.bairro +
            ' - ' +
            response.data.municipio +
            ' - ' +
            response.data.uf;
        } else {
          setEnderecoCliente('Endereço não informado');
          enderecoCliente = 'Endereço não informado';
        }
        GetTipoPagamento();
        DataAtual();
        GetTabelaPreco();
        NumeroNovoPedido();
        let qtdItensVenc = 0;
        let totalValorVencido = 0;
        let titulosVencidosTotais: any[] = [];
        const currentDate = new Date();
        let titulosVencidos = false;
        response.data.titulo.forEach((titulo: any) => {
          const dataVenc = new Date(titulo.dataVencim);
          const differenceInMilliseconds =
            currentDate.getTime() - dataVenc.getTime();
          const differenceInDays =
            differenceInMilliseconds / (1000 * 60 * 60 * 24);
          if (differenceInDays >= 3) {
            titulosVencidos = true;
            qtdItensVenc++;
            totalValorVencido += titulo.valor;
            titulosVencidosTotais.push(titulo);
          }
        });
        if (titulosVencidos) {
          setShowMensage(true);
          setAlertErroMensage(true);
          setMsgErro(
            `O cliente possui títulos vencidos a mais de 3 dias, não poderá enviar pedidos!`
          );
          settitulosVencidos(true);
          setQuantItensVenc(
            response.data.titulo.filter((titulo: any) => {
              const dataVenc = new Date(titulo.dataVencim);
              const differenceInMilliseconds =
                currentDate.getTime() - dataVenc.getTime();
              const differenceInDays =
                differenceInMilliseconds / (1000 * 60 * 60 * 24);
              return differenceInDays >= 3;
            }).length
          );
          setValorItensVenc(totalValorVencido);
          valorItensVenc = totalValorVencido;
          setTitulo(titulosVencidosTotais);
          titulo = titulosVencidosTotais;
        } else {
          console.log('Títulos ok.');
          settitulosVencidos(false);
        }
        setQuantItensVenc(qtdItensVenc);
        qtdItensVenc = qtdItensVenc;
        setValorItensVenc(valorItensVenc);
        valorItensVenc = valorItensVenc;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
    console.log('total de titulos Vencidos', titulo);
  }

  async function GetTipoPagamento() {
    await api
      .get(`/api/TipoNegociacao/${tipoNegocia}`)
      .then((response) => {
        setTipoNegocSelect(response.data);
        tipoNegocSelect = response.data;
        console.log('tipo de negociação', tipoNegocSelect);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //================GET DATA TABELA DE PREÇO =====================================
  async function GetTabelaPrecodataLocal(
    parceiro: any,
    empresa: any,
    dataPedido: any
  ) {
    setpodeDuplicar(true);
    podeDuplicar = true;
    if (isMobile) {
      console.log(
        'entrou na tabela de preço parceiro banco local...................................'
      );
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction(
          ['tabelaPrecoParceiro', 'tabelaPreco'],
          'readonly'
        );
        const store = transaction.objectStore('tabelaPrecoParceiro');
        const storeTabela = transaction.objectStore('tabelaPreco');
        const tabelaPrecoParceiroData = await store.getAll();
        const tabelaPreco = await storeTabela.getAll();
        const tabelaFiltrada = tabelaPrecoParceiroData.filter((item) => {
          return (
            item.parceiroId === Number(parceiro) &&
            item.empresaId === Number(empresa)
          );
        });
        const tabelaPrecoData = tabelaPreco.filter((tabela) => {
          return tabela.id === tabelaFiltrada[0]?.tabelaPrecoId;
        });

        let novaData = '';
        const partes = tabelaPrecoData[0].dataInicial.split(' ');
        const dataPartes = partes[0].match(/(\d{2})(\d{2})(\d{4})/);

        if (dataPartes !== null) {
          novaData = `${dataPartes[3]}-${dataPartes[2]}-${dataPartes[1]}`;
          console.log(novaData);
        } else {
          console.log('Formato de data inválido');
        }

        if (dataPedido.split('T')[0] < novaData) {
          setpodeDuplicar(false);
          podeDuplicar = false;
          console.log('localmente', podeDuplicar);
        } else {
          setpodeDuplicar(true);
          podeDuplicar = true;
          console.log('localmente', podeDuplicar);
        }

        console.log('entrou na tab db');
        console.log('localmente', dataPedido.split('T')[0], novaData);
      } catch (error) {
        console.error(
          'Erro ao obter os valores da tabela TabelaPrecoParceiro:',
          error
        );
      }
    } else {
      console.log('codCliente', codCliente);
      console.log('codEmpresa', codEmpresa);

      await api
        .get(
          `/api/TabelaPrecoParceiro/filter/cliente/empresa?pagina=1&totalpagina=999&codCliente=${parceiro}&codEmpresa=${empresa}`
        )
        .then((response) => {
          console.log(
            'localmente',
            dataPedido.split('T')[0],
            response.data.data[0].tabelaPreco?.dataInicial.split('T')[0]
          );

          if (
            dataPedido.split('T')[0] <
            response.data.data[0].tabelaPreco?.dataInicial.split('T')[0]
          ) {
            setpodeDuplicar(false);
            podeDuplicar = false;
            console.log('localmente', podeDuplicar);
          } else {
            setpodeDuplicar(true);
            podeDuplicar = true;
            console.log('localmente', podeDuplicar);
          }
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  async function GetTabelaPrecodata(
    parceiro: any,
    empresa: any,
    dataPedido: any
  ) {
    setpodeDuplicar(true);
    podeDuplicar = true;
    if (!isOnline) {
      console.log(
        'entrou na tabela de preço parceiro banco local...................................'
      );
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction(
          ['tabelaPrecoParceiro', 'tabelaPreco'],
          'readonly'
        );
        const store = transaction.objectStore('tabelaPrecoParceiro');
        const storeTabela = transaction.objectStore('tabelaPreco');
        const tabelaPrecoParceiroData = await store.getAll();
        const tabelaPreco = await storeTabela.getAll();
        const tabelaFiltrada = tabelaPrecoParceiroData.filter((item) => {
          return (
            item.parceiroId === Number(parceiro) &&
            item.empresaId === Number(empresa)
          );
        });
        const tabelaPrecoData = tabelaPreco.filter((tabela) => {
          return tabela.id === tabelaFiltrada[0]?.tabelaPrecoId;
        });

        let novaData = '';
        const partes = tabelaPrecoData[0].dataInicial.split(' ');
        const dataPartes = partes[0].match(/(\d{2})(\d{2})(\d{4})/);

        if (dataPartes !== null) {
          novaData = `${dataPartes[3]}-${dataPartes[2]}-${dataPartes[1]}`;
          console.log(novaData);
        } else {
          console.log('Formato de data inválido');
        }

        if (dataPedido.split('T')[0] < novaData) {
          setpodeDuplicar(false);
          podeDuplicar = false;
          console.log('localmente', podeDuplicar);
        } else {
          setpodeDuplicar(true);
          podeDuplicar = true;
          console.log('localmente', podeDuplicar);
        }

        console.log('entrou na tab db');
        console.log('localmente', dataPedido.split('T')[0], novaData);
      } catch (error) {
        console.error(
          'Erro ao obter os valores da tabela TabelaPrecoParceiro:',
          error
        );
      }
    } else {
      console.log('codCliente', codCliente);
      console.log('codEmpresa', codEmpresa);

      await api
        .get(
          `/api/TabelaPrecoParceiro/filter/cliente/empresa?pagina=1&totalpagina=999&codCliente=${parceiro}&codEmpresa=${empresa}`
        )
        .then((response) => {
          console.log(
            'localmente',
            dataPedido.split('T')[0],
            response.data.data[0].tabelaPreco?.dataInicial.split('T')[0]
          );

          if (
            dataPedido.split('T')[0] <
            response.data.data[0].tabelaPreco?.dataInicial.split('T')[0]
          ) {
            setpodeDuplicar(false);
            podeDuplicar = false;
            console.log('localmente', podeDuplicar);
          } else {
            setpodeDuplicar(true);
            podeDuplicar = true;
            console.log('localmente', podeDuplicar);
          }
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  //================GET TABELAPREÇO PARCEIRO INDEXEDDB ===========================
  async function GetTabelaPreco() {
    if (isMobile) {
      if (isOnline) {
        await GetTabelaPrecobanconuvem();
        return;
      }
      console.log(
        'entrou na tabela de preço parceiro banco local...................................'
      );
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction(
          ['tabelaPrecoParceiro', 'tabelaPreco'],
          'readonly'
        );
        const store = transaction.objectStore('tabelaPrecoParceiro');
        const storeTabela = transaction.objectStore('tabelaPreco');
        const tabelaPrecoParceiroData = await store.getAll();

        const tabelaFiltrada = tabelaPrecoParceiroData.filter((item) => {
          return (
            item.parceiroId === Number(codCliente) &&
            item.empresaId === Number(codEmpresa)
          );
        });
        setDadosTabelaParceiro(tabelaFiltrada);
        if (!tabelaFiltrada.length) {
          setCodTabela('');
          codTabela = '';
          setDescTabelaPreco('');
          descTabelaPreco = '';
          setItensTabela([]);
          itensTabela = [];
          setTotalPaginas(0);
          totalPaginas = 0;
          return;
        }
        setCodTabela(String(tabelaFiltrada[0]?.tabelaPrecoId));
        codTabela = String(tabelaFiltrada[0]?.tabelaPrecoId);
        const tabelaPrecoData = await storeTabela.get(Number(codTabela));
        if (tabelaPrecoData) {
          setDescTabelaPreco(tabelaPrecoData.descricao);
        }

        console.log('entrou na tab db');
        console.log('tabela preco local', tabelaFiltrada);
        await GetiTensTabelaPreco();
      } catch (error) {
        console.error(
          'Erro ao obter os valores da tabela TabelaPrecoParceiro:',
          error
        );
      }
    } else {
      console.log('codCliente', codCliente);
      console.log('codEmpresa', codEmpresa);

      await api
        .get(
          `/api/TabelaPrecoParceiro/filter/cliente/empresa?pagina=1&totalpagina=999&codCliente=${codCliente}&codEmpresa=${codEmpresa}`
        )
        .then((response) => {
          console.log('tabela preço', response.data.data);
          setDadosTabelaParceiro(response.data.data);
          dadosTabelaParceiro = response.data.data;
          setDescTabelaPreco(response.data.data[0].tabelaPreco.descricao);
          descTabelaPreco = response.data.data[0].tabelaPreco.descricao;

          setCodTabela(response.data.data[0].tabelaPreco.id);
          codTabela = response.data.data[0].tabelaPreco.id;
          GetiTensTabelaPreco();
          GetGeralItens();
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  async function applyEmpresaSelection(empresaId: string) {
    setCodEmpresa(String(empresaId || ''));
    codEmpresa = String(empresaId || '');
    setPagina(1);
    pagina = 1;
    await GetTabelaPreco();
  }

  async function GetTabelaPrecobanconuvem() {
    console.log('codCliente', codCliente);
    console.log('codEmpresa', codEmpresa);

    await api
      .get(
        `/api/TabelaPrecoParceiro/filter/cliente/empresa?pagina=1&totalpagina=999&codCliente=${codCliente}&codEmpresa=${codEmpresa}`
      )
      .then((response) => {
        console.log('tabela preço', response.data.data);
        setDadosTabelaParceiro(response.data.data);
        dadosTabelaParceiro = response.data.data;
        setDescTabelaPreco(response.data.data[0].tabelaPreco.descricao);
        descTabelaPreco = response.data.data[0].tabelaPreco.descricao;

        setCodTabela(response.data.data[0].tabelaPreco.id);
        codTabela = response.data.data[0].tabelaPreco.id;
        (async () => {
          await GetGeralItens();
          await GetiTensTabelaPreco();
        })();
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetiTensTabelaPreco() {
    console.log('Código da tabela de preço bd:', codTabela);
    if (isMobile && !isOnline) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const itemTabelaTransaction = db.transaction(
          ['itemTabela', 'produto', 'tabelaPrecoAdicional'],
          'readonly'
        );
        const itemTabelaStore = itemTabelaTransaction.objectStore('itemTabela');
        const produtoStore = itemTabelaTransaction.objectStore('produto');
        const tabelaPrecoAdicionalStore = itemTabelaTransaction.objectStore(
          'tabelaPrecoAdicional'
        );

        const itemTabelaData = await itemTabelaStore.getAll();

        const itensFiltrados = itemTabelaData.filter((item) => {
          return (
            item.tabelaPrecoId === Number(codTabela) &&
            String(item.idProd).match(new RegExp(`^0*${codEmpresa}`))
          );
        });

        console.log('itens filtrados tabelaitens', itensFiltrados);

        const itensTabelaPrecoRaw = await Promise.all(
          itensFiltrados.map(async (item) => {
            const produtos = await produtoStore.get(item.idProd);
            if (produtos) {
              return {
                idTabelaPreco: item.tabelaPrecoId,
                id: item.id,
                idProd: item.idProd,
                preco: item.preco,
                produtos: {
                  id: produtos.id || 0,
                  nome: produtos.nome || '',
                  tipoUnid: produtos.tipoUnid || '',
                  tipoUnid2: produtos.tipoUnid2 || '',
                  conv: produtos.conv || 0,
                  aliIpi: produtos.aliIpi || 0,
                  grupoProdutoId: produtos.grupoProdutoId || 0,
                  grupoProduto: {
                    id: produtos.grupoProduto?.id || 0,
                    nome: produtos.grupoProduto?.nome || '',
                  },
                  atualizadoEm: produtos.atualizadoEm || '',
                },
                atualizadoEm: '',
              };
            } else {
              console.error(
                `Não foi possível encontrar produtos para o item com id ${item.idProd}`
              );

              return null;
            }
          })
        );
        const itensTabelaPreco = (itensTabelaPrecoRaw as any[]).filter(
          Boolean
        ) as IItemTabelaPreco[];

        itensTabelaPreco.sort((a, b) => {
          const nomeA = a.produtos.nome.toLowerCase() || '';
          const nomeB = b.produtos.nome.toLowerCase() || '';
          return nomeA.localeCompare(nomeB);
        });
        console.log('itensTabelaPreco testeee:', itensTabelaPreco);
        const grupoProdutoIds = itensTabelaPreco.map(
          (item) => item.produtos.grupoProdutoId || 0
        );

        const tabelaPrecoAdicionalData =
          await tabelaPrecoAdicionalStore.getAll();

        const itensTabelaAdicional = tabelaPrecoAdicionalData.filter(
          (tabelaAdicional) => {
            const idProdString = String(tabelaAdicional.idProd);
            const regex = new RegExp(`^0*${codEmpresa}`);

            return (
              tabelaAdicional.empresaId == Number(codEmpresa) &&
              tabelaAdicional.parceiroId == Number(codCliente) &&
              regex.test(idProdString)
            );
          }
        );

        console.log('Itens tabela preço adicional:', itensTabelaAdicional);

        const itensTabelaAdicionalMappedRaw = await Promise.all(
          itensTabelaAdicional.map(async (item) => {
              console.log('Tentando buscar produtos para idProd:', item.idProd);
              const produtos = await produtoStore.get(item.idProd);
              console.log('Produtos encontrados:', produtos);

              if (produtos) {
                return {
                  idTabelaPreco: 0,
                  id: item.id,
                  idProd: item.idProd,
                  preco: item.preco,
                  produtos: {
                    id: produtos.id || 0,
                    nome: produtos.nome || '',
                    tipoUnid: produtos.tipoUnid || '',
                    tipoUnid2: produtos.tipoUnid2 || '',
                    conv: produtos.conv || 0,
                    aliIpi: produtos.aliIpi || 0,
                    grupoProdutoId: produtos.grupoProdutoId || 0,
                    atualizadoEm: produtos.atualizadoEm || '',
                  },
                  atualizadoEm: '',
                };
              } else {
                console.error(
                  `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                );

                return null;
              }
            })
        );
        const itensTabelaAdicionalMapped = (itensTabelaAdicionalMappedRaw as any[]).filter(
          Boolean
        ) as IItemTabelaPreco[];
        console.log('itens adicinais', itensTabelaAdicionalMapped);
        itensTabelaPreco.push(...itensTabelaAdicionalMapped);
        console.log('quant Itens tabela preço:', itensTabelaPreco.length);

        setTotalPaginas(Math.ceil(itensTabelaPreco.length / qtdePagina));
        totalPaginas = Math.ceil(itensTabelaPreco.length / qtdePagina);
        console.log('total paginas:', totalPaginas);
        console.log('Itens tabela preço:', itensTabelaPreco);

        const grupoProdutoIds2 = itensTabelaAdicionalMapped.map(
          (item) => item.produtos.grupoProdutoId || 0
        );

        const combinedIds: Inumeros[] = [
          ...grupoProdutoIds.map((id) => ({ grupoId: id })),
          ...grupoProdutoIds2.map((id) => ({ grupoId: id })),
        ];

        setItensTabelaTotal(combinedIds);

        itensTabelaTotal = combinedIds;
        GetGrupos();
        const pageItens = itensTabelaPreco.slice(
          (pagina - 1) * qtdePagina,
          pagina * qtdePagina
        );
        setItensTabela(pageItens || []);
        itensTabela = pageItens || [];
      } catch (error) {
        console.error(
          'Erro ao obter os valores da tabela ItemTabelaPreco:',
          error
        );
      }
    } else {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
        )
        .then((response) => {
          console.log('itens tabela preço ok................', response.data);

          const filteredItens = response.data.data.filter((item: any) => {
            const idProdString = String(item.idProd);
            const regex = new RegExp(`^0*${codEmpresa}`);
            return regex.test(idProdString);
          });
          GetGrupos();
          setItensTabela(filteredItens);
          itensTabela = filteredItens;

          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          totalPaginas = Math.ceil(response.data.total / qtdePagina);
          console.log('quant por pagina', totalPaginas);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  async function GetGeralItens() {
    console.log('eMpresaId inicial', codEmpresa);
    await api
      .get(
        `/api/ItemTabelaPreco/codTabela?pagina=1&totalpagina=999&codTabela=${codTabela}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
      )
      .then((response) => {
        console.log('itens tabela preço ok................', response.data);

        const filteredItens = response.data.data.filter((item: any) => {
          const idProdString = String(item.idProd);
          const regex = new RegExp(`^0*${codEmpresa}`);
          return regex.test(idProdString);
        });

        setItensTabelaGeral(filteredItens);
        itensTabelaGeral = filteredItens;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=================== itens para tabelas duplicadads ======================================================

  async function GetiTensTabelaPrecoDuplicada() {
    console.log(
      'Código da tabela de preço bd:',
      codTabela,
      'Empresa',
      codEmpresa,
      'Cliente',
      codCliente
    );
    if (isMobile && !isOnline) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const itemTabelaTransaction = db.transaction(
          ['itemTabela', 'produto', 'tabelaPrecoAdicional'],
          'readonly'
        );
        const itemTabelaStore = itemTabelaTransaction.objectStore('itemTabela');
        const produtoStore = itemTabelaTransaction.objectStore('produto');
        const tabelaPrecoAdicionalStore = itemTabelaTransaction.objectStore(
          'tabelaPrecoAdicional'
        );

        const itemTabelaData = await itemTabelaStore.getAll();

        const itensFiltrados = itemTabelaData.filter((item) => {
          return (
            item.tabelaPrecoId === Number(codTabela) &&
            String(item.idProd).match(new RegExp(`^0*${codEmpresa}`))
          );
        });

        console.log('itens filtrados tabelaitens', itensFiltrados);

        const itensTabelaPrecoRaw = await Promise.all(
          itensFiltrados.map(async (item) => {
            const produtos = await produtoStore.get(item.idProd);
            if (produtos) {
              return {
                idTabelaPreco: item.tabelaPrecoId,
                id: item.id,
                idProd: item.idProd,
                preco: item.preco,
                produtos: {
                  id: produtos.id || 0,
                  nome: produtos.nome || '',
                  tipoUnid: produtos.tipoUnid || '',
                  tipoUnid2: produtos.tipoUnid2 || '',
                  conv: produtos.conv || 0,
                  aliIpi: produtos.aliIpi || 0,
                  grupoProdutoId: produtos.grupoProdutoId || 0,
                  grupoProduto: {
                    id: produtos.grupoProduto?.id || 0,
                    nome: produtos.grupoProduto?.nome || '',
                  },
                  atualizadoEm: produtos.atualizadoEm || '',
                },
                atualizadoEm: '',
              };
            } else {
              console.error(
                `Não foi possível encontrar produtos para o item com id ${item.idProd}`
              );

              return null;
            }
          })
        );
        const itensTabelaPreco = (itensTabelaPrecoRaw as any[]).filter(
          Boolean
        ) as IItemTabelaPreco[];

        itensTabelaPreco.sort((a, b) => {
          const nomeA = a.produtos.nome.toLowerCase() || '';
          const nomeB = b.produtos.nome.toLowerCase() || '';
          return nomeA.localeCompare(nomeB);
        });
        console.log('itensTabelaPreco testeee:', itensTabelaPreco);
        const grupoProdutoIds = itensTabelaPreco.map(
          (item) => item.produtos.grupoProdutoId || 0
        );

        const tabelaPrecoAdicionalData =
          await tabelaPrecoAdicionalStore.getAll();

        const itensTabelaAdicional = tabelaPrecoAdicionalData.filter(
          (tabelaAdicional) => {
            const idProdString = String(tabelaAdicional.idProd);
            const regex = new RegExp(`^0*${codEmpresa}`);

            return (
              tabelaAdicional.empresaId == Number(codEmpresa) &&
              tabelaAdicional.parceiroId == Number(codCliente) &&
              regex.test(idProdString)
            );
          }
        );

        console.log('Itens tabela preço adicional:', itensTabelaAdicional);

        const itensTabelaAdicionalMappedRaw = await Promise.all(
          itensTabelaAdicional.map(async (item) => {
              console.log('Tentando buscar produtos para idProd:', item.idProd);
              const produtos = await produtoStore.get(item.idProd);
              console.log('Produtos encontrados:', produtos);

              if (produtos) {
                return {
                  idTabelaPreco: 0,
                  id: item.id,
                  idProd: item.idProd,
                  preco: item.preco,
                  produtos: {
                    id: produtos.id || 0,
                    nome: produtos.nome || '',
                    tipoUnid: produtos.tipoUnid || '',
                    tipoUnid2: produtos.tipoUnid2 || '',
                    conv: produtos.conv || 0,
                    aliIpi: produtos.aliIpi || 0,
                    grupoProdutoId: produtos.grupoProdutoId || 0,
                    atualizadoEm: produtos.atualizadoEm || '',
                  },
                  atualizadoEm: '',
                };
              } else {
                console.error(
                  `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                );
                return null;
              }
            })
        );
        const itensTabelaAdicionalMapped = (itensTabelaAdicionalMappedRaw as any[]).filter(
          Boolean
        ) as IItemTabelaPreco[];
        console.log('itens adicinais', itensTabelaAdicionalMapped);
        itensTabelaPreco.push(...itensTabelaAdicionalMapped);
        console.log('quant Itens tabela preço:', itensTabelaPreco.length);

        //===============================================================================
        console.log('itensVindoAPiMobile', itensTabelaPreco);
        const novoArrayComAtualizacoes = itensPedidoSelecionadoList.map(
          (itemPedido) => {
            const itemCorrespondente = itensTabelaPreco.find(
              (item: any) => item.idProd === itemPedido.produtoId
            );

            if (itemCorrespondente) {
              return {
                ...itemPedido,
                valUnit: itemCorrespondente.preco,
                valTotal: itemPedido.quant * itemCorrespondente.preco,
              };
            } else {
              return itemPedido;
            }
          }
        );
        console.log('itensVindoAPi ValoresNovos1', itensPedidoSelecionadoList);
        console.log('itensVindoAPi ValoresNovos', novoArrayComAtualizacoes);
        if (usuario.username != '14713') {
          setItensPedidoSelecionadoList(novoArrayComAtualizacoes);
          itensPedidoSelecionadoList = novoArrayComAtualizacoes;
        }

        if (
          statusPedidoSelecionado == 'Não Enviado' ||
          statusPedidoSelecionado == 'Pendente' ||
          statusPedidoSelecionado == 'Rascunho' ||
          statusPedidoSelecionado == 'Falhou'
        ) {
          GetItensPedidoEdit();
        } else {
          GetItensPedidoEditDuplicate();
        }
      } catch (error) {
        console.error(
          'Erro ao obter os valores da tabela ItemTabelaPreco:',
          error
        );
      }
    } else {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela?pagina=1&totalpagina=999&codTabela=${codTabela}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
        )
        .then((response) => {
          console.log('itensVindoAPi', response.data);

          const filteredItens = response.data.data.filter((item: any) => {
            const idProdString = String(item.idProd);
            const regex = new RegExp(`^0*${codEmpresa}`);
            return regex.test(idProdString);
          });
          console.log('itensVindoAPi 2', filteredItens);
          console.log('itensVindoAPi Pedido', itensPedidoSelecionadoList);

          

          const novoArrayComAtualizacoes = itensPedidoSelecionadoList.map(
            (itemPedido) => {
              const itemCorrespondente = filteredItens.find(
                (item: any) => item.idProd === itemPedido.produtoId
              );

              if (itemCorrespondente) {
                return {
                  ...itemPedido,
                  valUnit: itemCorrespondente.preco,
                  valTotal: itemPedido.quant * itemCorrespondente.preco,
                };
              } else {
                return itemPedido;
              }
            }
          );
          console.log('itensVindoAPi ValoresNovos', novoArrayComAtualizacoes);
          if (usuario.username != '14713') {
            setItensPedidoSelecionadoList(novoArrayComAtualizacoes);
            itensPedidoSelecionadoList = novoArrayComAtualizacoes;
          }
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Pendente' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            GetItensPedidoEdit();
          } else {
            GetItensPedidoEditDuplicate();
          }
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  //==========================================================================================================

  async function GetiTensTabelaPrecoonline() {
    console.log('eMpresaId inicial', codEmpresa);
    await api
      .get(
        `/api/ItemTabelaPreco/codTabela?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
      )
      .then((response) => {
        console.log('itens tabela preço ok................', response.data);

        const filteredItens = response.data.data.filter((item: any) => {
          const idProdString = String(item.idProd);
          const regex = new RegExp(`^0*${codEmpresa}`);
          return regex.test(idProdString);
        });

        setItensTabela(filteredItens);
        itensTabela = filteredItens;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        totalPaginas = Math.ceil(response.data.total / qtdePagina);
        console.log('quant por pagina', totalPaginas);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetiTensTabelaPrecofilterNome() {
    if (isMobile && !isOnline) {
      if (pesquisaNome) {
        console.log('entrou na pesquisa por nome');
        try {
          const db = await openDB<PgamobileDB>('pgamobile', versao);
          const itemTabelaTransaction = db.transaction(
            ['itemTabela', 'produto', 'tabelaPrecoAdicional'],
            'readonly'
          );
          const itemTabelaStore =
            itemTabelaTransaction.objectStore('itemTabela');
          const produtoStore = itemTabelaTransaction.objectStore('produto');
          const tabelaPrecoAdicionalStore = itemTabelaTransaction.objectStore(
            'tabelaPrecoAdicional'
          );

          const itemTabelaData = await itemTabelaStore.getAll();

          const itensFiltrados = itemTabelaData.filter((item) => {
            return item.tabelaPrecoId === Number(codTabela);
          });

          const itensTabelaPreco: IItemTabelaPreco[] = (await Promise.all(
            itensFiltrados.map(async (item) => {
              const produtos = await produtoStore.get(item.idProd);
              if (produtos) {
                return {
                  idTabelaPreco: item.tabelaPrecoId,
                  id: item.id,
                  idProd: item.idProd,
                  preco: item.preco,
                  produtos: {
                    id: produtos.id || 0,
                    nome: produtos.nome || '',
                    tipoUnid: produtos.tipoUnid || '',
                    tipoUnid2: produtos.tipoUnid2 || '',
                    conv: produtos.conv || 0,
                    aliIpi: produtos.aliIpi || 0,
                    grupoProdutoId: produtos.grupoProdutoId || 0,
                    grupoProduto: {
                      id: produtos.grupoProduto?.id || 0,
                      nome: produtos.grupoProduto?.nome || '',
                    },
                    atualizadoEm: produtos.atualizadoEm || '',
                  },
                  atualizadoEm: '',
                };
              } else {
                console.error(
                  `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                );

                return null;
              }
            })
          )) as IItemTabelaPreco[];

          itensTabelaPreco.sort((a, b) => {
            const nomeA = a.produtos.nome.toLowerCase() || '';
            const nomeB = b.produtos.nome.toLowerCase() || '';
            return nomeA.localeCompare(nomeB);
          });

          const tabelaPrecoAdicionalData =
            await tabelaPrecoAdicionalStore.getAll();

          const itensTabelaAdicional = tabelaPrecoAdicionalData.filter(
            (tabelaAdicional) => {
              const idProdString = String(tabelaAdicional.idProd);
              const regex = new RegExp(`^0*${codEmpresa}`);

              return (
                tabelaAdicional.empresaId == Number(codEmpresa) &&
                tabelaAdicional.parceiroId == Number(codCliente) &&
                regex.test(idProdString)
              );
            }
          );
          console.log('Itens tabela preço adicional:', itensTabelaAdicional);

          const itensTabelaAdicionalMapped: IItemTabelaPreco[] =
            (await Promise.all(
              itensTabelaAdicional.map(async (item) => {
                console.log(
                  'Tentando buscar produtos para idProd:',
                  item.idProd
                );
                const produtos = await produtoStore.get(item.idProd);
                console.log('Produtos encontrados:', produtos);

                if (produtos) {
                  return {
                    idTabelaPreco: 0,
                    id: item.id,
                    idProd: item.idProd,
                    preco: item.preco,
                    produtos: {
                      id: produtos.id || 0,
                      nome: produtos.nome || '',
                      tipoUnid: produtos.tipoUnid || '',
                      tipoUnid2: produtos.tipoUnid2 || '',
                      conv: produtos.conv || 0,
                      aliIpi: produtos.aliIpi || 0,
                      grupoProdutoId: produtos.grupoProdutoId || 0,
                      atualizadoEm: produtos.atualizadoEm || '',
                    },
                    atualizadoEm: '',
                  };
                } else {
                  console.error(
                    `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                  );

                  return null;
                }
              })
            )) as IItemTabelaPreco[];

          itensTabelaPreco.push(...itensTabelaAdicionalMapped);
          console.log('quant Itens tabela preço:', itensTabelaPreco.length);

          const itensFiltradosFinal = itensTabelaPreco.filter((item) => {
            return item.produtos?.nome
              ?.toLowerCase()
              .includes(search.toLowerCase());
          });

          setTotalPaginas(Math.ceil(itensFiltradosFinal.length / 5));
          totalPaginas = Math.ceil(itensFiltradosFinal.length / 5);
          console.log('total paginas:', totalPaginas);
          console.log('Itens tabela preço:', itensFiltradosFinal);
          setItensTabela(
            itensFiltradosFinal.slice(
              (pagina - 1) * qtdePagina,
              pagina * qtdePagina
            ) || []
          );
        } catch (error) {
          console.error(
            'Erro ao obter os valores da tabela ItemTabelaPreco:',
            error
          );
        }
      }
      if (pesquisaCod) {
        console.log('entrou na pesquisa por codigo do produto');
        try {
          const db = await openDB<PgamobileDB>('pgamobile', versao);
          const itemTabelaTransaction = db.transaction(
            ['itemTabela', 'produto', 'tabelaPrecoAdicional'],
            'readonly'
          );
          const itemTabelaStore =
            itemTabelaTransaction.objectStore('itemTabela');
          const produtoStore = itemTabelaTransaction.objectStore('produto');
          const tabelaPrecoAdicionalStore = itemTabelaTransaction.objectStore(
            'tabelaPrecoAdicional'
          );

          const itemTabelaData = await itemTabelaStore.getAll();

          const itensFiltrados = itemTabelaData.filter((item) => {
            return item.tabelaPrecoId === Number(codTabela);
          });

          const itensTabelaPreco: IItemTabelaPreco[] = (await Promise.all(
            itensFiltrados.map(async (item) => {
              const produtos = await produtoStore.get(item.idProd);
              if (produtos) {
                return {
                  idTabelaPreco: item.tabelaPrecoId,
                  id: item.id,
                  idProd: item.idProd,
                  preco: item.preco,
                  produtos: {
                    id: produtos.id || 0,
                    nome: produtos.nome || '',
                    tipoUnid: produtos.tipoUnid || '',
                    tipoUnid2: produtos.tipoUnid2 || '',
                    conv: produtos.conv || 0,
                    aliIpi: produtos.aliIpi || 0,
                    grupoProdutoId: produtos.grupoProdutoId || 0,
                    grupoProduto: {
                      id: produtos.grupoProduto?.id || 0,
                      nome: produtos.grupoProduto?.nome || '',
                    },
                    atualizadoEm: produtos.atualizadoEm || '',
                  },
                  atualizadoEm: '',
                };
              } else {
                console.error(
                  `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                );

                return null;
              }
            })
          )) as IItemTabelaPreco[];

          itensTabelaPreco.sort((a, b) => {
            const nomeA = a.produtos.nome.toLowerCase() || '';
            const nomeB = b.produtos.nome.toLowerCase() || '';
            return nomeA.localeCompare(nomeB);
          });

          const tabelaPrecoAdicionalData =
            await tabelaPrecoAdicionalStore.getAll();

          const itensTabelaAdicional = tabelaPrecoAdicionalData.filter(
            (tabelaAdicional) => {
              const idProdString = String(tabelaAdicional.idProd);
              const regex = new RegExp(`^0*${codEmpresa}`);

              return (
                tabelaAdicional.empresaId == Number(codEmpresa) &&
                tabelaAdicional.parceiroId == Number(codCliente) &&
                regex.test(idProdString)
              );
            }
          );
          console.log('Itens tabela preço adicional:', itensTabelaAdicional);

          const itensTabelaAdicionalMapped: IItemTabelaPreco[] =
            (await Promise.all(
              itensTabelaAdicional.map(async (item) => {
                console.log(
                  'Tentando buscar produtos para idProd:',
                  item.idProd
                );
                const produtos = await produtoStore.get(item.idProd);
                console.log('Produtos encontrados:', produtos);

                if (produtos) {
                  return {
                    idTabelaPreco: 0,
                    id: item.id,
                    idProd: item.idProd,
                    preco: item.preco,
                    produtos: {
                      id: produtos.id || 0,
                      nome: produtos.nome || '',
                      tipoUnid: produtos.tipoUnid || '',
                      tipoUnid2: produtos.tipoUnid2 || '',
                      conv: produtos.conv || 0,
                      aliIpi: produtos.aliIpi || 0,
                      grupoProdutoId: produtos.grupoProdutoId || 0,
                      atualizadoEm: produtos.atualizadoEm || '',
                    },
                    atualizadoEm: '',
                  };
                } else {
                  console.error(
                    `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                  );

                  return null;
                }
              })
            )) as IItemTabelaPreco[];

          itensTabelaPreco.push(...itensTabelaAdicionalMapped);
          console.log('quant Itens tabela preço:', itensTabelaPreco.length);

          const itensFiltradosFinal = itensTabelaPreco.filter((item) => {
            return (
              item.produtos?.id !== undefined &&
              item.produtos?.id.toString().includes(search)
            );
          });

          setTotalPaginas(Math.ceil(itensFiltradosFinal.length / 5));
          totalPaginas = Math.ceil(itensFiltradosFinal.length / 5);
          console.log('total paginas:', totalPaginas);
          console.log('Itens tabela preço:', itensFiltradosFinal);
          setItensTabela(
            itensFiltradosFinal.slice(
              (pagina - 1) * qtdePagina,
              pagina * qtdePagina
            ) || []
          );
        } catch (error) {
          console.error(
            'Erro ao obter os valores da tabela ItemTabelaPreco:',
            error
          );
        }
      }
      if (pesquisaGrupo) {
        console.log('entrou na pesquisa por grupo');
        try {
          const db = await openDB<PgamobileDB>('pgamobile', versao);
          const itemTabelaTransaction = db.transaction(
            ['itemTabela', 'produto', 'tabelaPrecoAdicional'],
            'readonly'
          );
          const itemTabelaStore =
            itemTabelaTransaction.objectStore('itemTabela');
          const produtoStore = itemTabelaTransaction.objectStore('produto');
          const tabelaPrecoAdicionalStore = itemTabelaTransaction.objectStore(
            'tabelaPrecoAdicional'
          );

          const itemTabelaData = await itemTabelaStore.getAll();

          const itensFiltrados = itemTabelaData.filter((item) => {
            return item.tabelaPrecoId === Number(codTabela);
          });

          const itensTabelaPreco: IItemTabelaPreco[] = (await Promise.all(
            itensFiltrados.map(async (item) => {
              const produtos = await produtoStore.get(item.idProd);
              if (produtos) {
                return {
                  idTabelaPreco: item.tabelaPrecoId,
                  id: item.id,
                  idProd: item.idProd,
                  preco: item.preco,
                  produtos: {
                    id: produtos.id || 0,
                    nome: produtos.nome || '',
                    tipoUnid: produtos.tipoUnid || '',
                    tipoUnid2: produtos.tipoUnid2 || '',
                    conv: produtos.conv || 0,
                    aliIpi: produtos.aliIpi || 0,
                    grupoProdutoId: produtos.grupoProdutoId || 0,
                    grupoProduto: {
                      id: produtos.grupoProduto?.id || 0,
                      nome: produtos.grupoProduto?.nome || '',
                    },
                    atualizadoEm: produtos.atualizadoEm || '',
                  },
                  atualizadoEm: '',
                };
              } else {
                console.error(
                  `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                );

                return null;
              }
            })
          )) as IItemTabelaPreco[];

          itensTabelaPreco.sort((a, b) => {
            const nomeA = a.produtos.nome.toLowerCase() || '';
            const nomeB = b.produtos.nome.toLowerCase() || '';
            return nomeA.localeCompare(nomeB);
          });

          const tabelaPrecoAdicionalData =
            await tabelaPrecoAdicionalStore.getAll();

          const itensTabelaAdicional = tabelaPrecoAdicionalData.filter(
            (tabelaAdicional) => {
              const idProdString = String(tabelaAdicional.idProd);
              const regex = new RegExp(`^0*${codEmpresa}`);

              return (
                tabelaAdicional.empresaId == Number(codEmpresa) &&
                tabelaAdicional.parceiroId == Number(codCliente) &&
                regex.test(idProdString)
              );
            }
          );
          console.log('Itens tabela preço adicional:', itensTabelaAdicional);

          const itensTabelaAdicionalMapped: IItemTabelaPreco[] =
            (await Promise.all(
              itensTabelaAdicional.map(async (item) => {
                console.log(
                  'Tentando buscar produtos para idProd:',
                  item.idProd
                );
                const produtos = await produtoStore.get(item.idProd);
                console.log('Produtos encontrados:', produtos);

                if (produtos) {
                  return {
                    idTabelaPreco: 0,
                    id: item.id,
                    idProd: item.idProd,
                    preco: item.preco,
                    produtos: {
                      id: produtos.id || 0,
                      nome: produtos.nome || '',
                      tipoUnid: produtos.tipoUnid || '',
                      tipoUnid2: produtos.tipoUnid2 || '',
                      conv: produtos.conv || 0,
                      aliIpi: produtos.aliIpi || 0,
                      grupoProdutoId: produtos.grupoProdutoId || 0,
                      atualizadoEm: produtos.atualizadoEm || '',
                    },
                    atualizadoEm: '',
                  };
                } else {
                  console.error(
                    `Não foi possível encontrar produtos para o item com id ${item.idProd}`
                  );

                  return null;
                }
              })
            )) as IItemTabelaPreco[];

          itensTabelaPreco.push(...itensTabelaAdicionalMapped);
          console.log('quant Itens tabela preço:', itensTabelaPreco.length);

          const itensFiltradosFinal = itensTabelaPreco.filter((item) => {
            return item.produtos?.grupoProdutoId == Number(search);
          });

          setTotalPaginas(Math.ceil(itensFiltradosFinal.length / 5));
          totalPaginas = Math.ceil(itensFiltradosFinal.length / 5);
          console.log('total paginas:', totalPaginas);
          console.log('Itens tabela preço:', itensFiltradosFinal);
          setItensTabela(
            itensFiltradosFinal.slice(
              (pagina - 1) * qtdePagina,
              pagina * qtdePagina
            ) || []
          );
        } catch (error) {
          console.error(
            'Erro ao obter os valores da tabela ItemTabelaPreco:',
            error
          );
        }
      }
    } else {
      if (pesquisaNome) {
        await api
          .get(
            `/api/ItemTabelaPreco/codTabela/nomeProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&nomeProduto=${search}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
          )
          .then((response) => {
            console.log(
              'itens tabela preço ok .............................',
              response.data.data
            );

            const filteredItens = response.data.data.filter((item: any) => {
              const idProdString = String(item.idProd);
              const regex = new RegExp(`^0*${codEmpresa}`);
              return regex.test(idProdString);
            });

            setItensTabela(filteredItens);
            itensTabela = filteredItens;

            setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
            totalPaginas = Math.ceil(response.data.total / qtdePagina);
            console.log('quant por pagina', totalPaginas);
            
          })
          .catch((error) => {
            console.log('Ocorreu um erro');
          });
      }
      if (pesquisaCod) {
        await api
          .get(
            `/api/ItemTabelaPreco/codTabela/codProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&codProduto=${search}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
          )
          .then((response) => {
            console.log('itens tabela preço', response.data.data);

            const filteredItens = response.data.data.filter((item: any) => {
              const idProdString = String(item.idProd);
              const regex = new RegExp(`^0*${codEmpresa}`);
              return regex.test(idProdString);
            });

            setItensTabela(filteredItens);
            itensTabela = filteredItens;
            setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
            totalPaginas = Math.ceil(response.data.total / qtdePagina);
            console.log('quant por pagina', totalPaginas);
          })
          .catch((error) => {
            console.log('Ocorreu um erro');
          });
      }
      if (pesquisaGrupo) {
        await api
          .get(
            `/api/ItemTabelaPreco/codTabela/grupoId?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&grupoId=${search}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
          )
          .then((response) => {
            console.log('itens tabela preço', response.data.data);

            const filteredItens = response.data.data.filter((item: any) => {
              const idProdString = String(item.idProd);
              const regex = new RegExp(`^0*${codEmpresa}`);
              return regex.test(idProdString);
            });

            setItensTabela(filteredItens);
            itensTabela = filteredItens;
            setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
            totalPaginas = Math.ceil(response.data.total / qtdePagina);
            console.log('quant por pagina', totalPaginas);
          })
          .catch((error) => {
            console.log('Ocorreu um erro');
          });
      }
    }
  }

  async function GetiTensTabelaPrecofilterNomevindobanco() {
    console.log('eMpresaId Filter', codEmpresa);
    if (pesquisaNome) {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela/nomeProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&nomeProduto=${search}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
        )
        .then((response) => {
          console.log(
            'itens tabela preço ok .............................',
            response.data.data
          );

          const filteredItens = response.data.data.filter((item: any) => {
            const idProdString = String(item.idProd);
            const regex = new RegExp(`^0*${codEmpresa}`);
            return regex.test(idProdString);
          });

          setItensTabela(filteredItens);
          itensTabela = filteredItens;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          totalPaginas = Math.ceil(response.data.total / qtdePagina);
          console.log('quant por pagina', totalPaginas);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaCod) {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela/codProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&codProduto=${search}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
        )
        .then((response) => {
          console.log('itens tabela preço', response.data.data);

          const filteredItens = response.data.data.filter((item: any) => {
            const idProdString = String(item.idProd);
            const regex = new RegExp(`^0*${codEmpresa}`);
            return regex.test(idProdString);
          });

          setItensTabela(filteredItens);
          itensTabela = filteredItens;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          totalPaginas = Math.ceil(response.data.total / qtdePagina);
          console.log('quant por pagina', totalPaginas);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaGrupo) {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela/grupoId?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${codTabela}&grupoId=${search}&parceiroId=${codCliente}&empresaId=${codEmpresa}`
        )
        .then((response) => {
          console.log('itens tabela preço', response.data.data);

          const filteredItens = response.data.data.filter((item: any) => {
            const idProdString = String(item.idProd);
            const regex = new RegExp(`^0*${codEmpresa}`);
            return regex.test(idProdString);
          });

          setItensTabela(filteredItens);
          itensTabela = filteredItens;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          totalPaginas = Math.ceil(response.data.total / qtdePagina);
          console.log('quant por pagina', totalPaginas);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  function pesquisaNomeDireto() {
    if (search != '') {
      setFilter(true);
      filter = true;
      GetiTensTabelaPrecofilterNome();
    } else {
      LimparPesquisa();
    }
  }
  function Pesquisa(event: any) {
    event.preventDefault();
    setPagina(1);
    pagina = 1;
    setFilter(true);
    filter = true;
    if (search != '') {
      GetiTensTabelaPrecofilterNome();
    }

    if (search == '') {
      LimparPesquisa();
    }
  }
  function PesquisaGrupoProd() {}

  async function SetarQuantidade() {
    let pesquisar: any;
    pesquisar = document.getElementById('quantidadeEscolhida');
    document.getElementById('quantidadeEscolhida')?.focus();
  }

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

  useEffect(() => {
    function handleTouchMove(e: any) {
      if (
        atualizando &&
        window.scrollY === 0 &&
        e.touches[0].clientY > startY
      ) {
        e.preventDefault();
      }
    }

    function handleTouchStart(e: any) {
      startY = e.touches[0].clientY;
    }

    let startY = 0;

    if (atualizando) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
    }

    return () => {
      if (atualizando) {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, [atualizando]);

  useEffect(() => {
    console.log('Array de pedidos', arrayPedido);
    const itensAtivos = arrayPedido.filter(
      (i) => String((i as any)?.inativo || 'N').toUpperCase() !== 'S'
    );
    const novoTotal = itensAtivos.reduce((total, item) => total + item.valTotal, 0);
    let somaTotalIpi = 0;
    const aplicarIpi = ufCliente !== 'CE';
    itensAtivos.forEach((item) => {
      const ipiPercent = aplicarIpi ? item.produto.aliIpi : 0;
      const valorCalculado = ipiPercent
        ? item.valTotal + item.valTotal * (ipiPercent / 100)
        : item.valTotal;
      somaTotalIpi += valorCalculado;
    });
    setvalorTotalComIpi(somaTotalIpi);
    valorTotalComIpi = somaTotalIpi;
    setSomaTotal(novoTotal);
    somaTotal = novoTotal;
    setItensDoPedido(itensAtivos.length);
  }, [arrayPedido, ufCliente]);

  //===========SALVANDO RASCUNHO====================================
  async function salvarCabecalhoRascunho(novoTotal: number) {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    const cabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: novoTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    const itensSalvar = mapArrayPedidoToSalvar(numPedido);
    if (contarItensAtivos(itensSalvar) === 0) return;
    try {
      await enviarItensEmLotes(itensSalvar, cabecalho, false);
    } catch {}
  }

  async function popularCabecalhoRascunho(
    cabecalho: ICabeca,
    sincronizado: string,
    novoTotal: number
  ) {
    console.log('ListaRascunho populando', cabecalho);
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction(
        ['cabecalhoPedidoVenda', 'itemPedidoVenda'],
        'readwrite'
      );
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const allCabecalho = await store.getAll();

      for (const existingRecord of allCabecalho) {
        if (existingRecord.palMPV === cabecalho.palMPV) {
          await store.delete(existingRecord.id);
        }
      }

      console.log('ListaRascunho populando salvando', cabecalho);
      await store.add({ ...cabecalho, sincronizado });

      await transaction.done;
      salvarCabecalhoRascunho(novoTotal);
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  //====================popular Rascunho Mobile ===============================================
  async function popularCabecalhoRascunhoMobile(
    cabecalho: ICabeca,
    sincronizado: string,
    novoTotal: number
  ) {
    console.log('ListaRascunho populando', cabecalho);
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction(
        ['cabecalhoPedidoVenda', 'itemPedidoVenda'],
        'readwrite'
      );
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const allCabecalho = await store.getAll();

      for (const existingRecord of allCabecalho) {
        if (existingRecord.palMPV === cabecalho.palMPV) {
          await store.delete(existingRecord.id);
        }
      }

      console.log('ListaRascunho populando salvando', cabecalho);
      await store.add({ ...cabecalho, sincronizado });

      await transaction.done;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  //============= CRIAR NOVO RASCUNHO EDITANDO OU DUPLICANDO ==================================
  async function popularCabecalhoRascunhoEdite(
    cabecalho: ICabeca,
    sincronizado: string
  ) {
    console.log('ListaRascunho populando', cabecalho);
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction(
        ['cabecalhoPedidoVenda', 'itemPedidoVenda'],
        'readwrite'
      );
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const allCabecalho = await store.getAll();

      for (const existingRecord of allCabecalho) {
        if (existingRecord.palMPV === cabecalho.palMPV) {
          await store.delete(existingRecord.id);
        }
      }

      console.log('ListaRascunho populando salvando', cabecalho);
      await store.add({ ...cabecalho, sincronizado });

      await transaction.done;
      await popularItem(arrayPedido, 'R');
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  //===========================================================================================
  interface IItenPedidoR {
    id?: number;
    vendedorId: number;
    palMPV: string;
    produtoId: number;
    descProduto: string;
    quant: number;
    valUnit: number;
    valTotal: number;
    unidade: string;
    produto: {
      nome: string;
      aliIpi: number;
      conv: number;
      tipoUnid: string;
      tipoUnid2: string;
    };
  }

  async function popularItemBanco(pedidosSalvar: any) {
    try {
      const itensSalvar = mapArrayPedidoToSalvar(numPedido);
      if (contarItensAtivos(itensSalvar) === 0) return;
      await enviarItensEmLotes(itensSalvar, undefined, false);
    } catch {}
  }

  async function popularItemRascunho(
    itemPedido: IItenPedidoR,
    sincronizado: string
  ) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readwrite');
      const store = transaction.objectStore('itemPedidoVenda');

      const allItens = await store.getAll();

      const itemExistente = allItens.find(
        (item) =>
          item.palMPV === itemPedido.palMPV &&
          item.produtoId === itemPedido.produtoId
      );

      if (itemExistente) {
        await store.delete(itemExistente.id);
      }

      console.log(
        'EntrouPopularEditar',
        itemPedido,
        'Existente',
        itemExistente
      );
      const produto = {
        nome: itemPedido.descProduto,
        aliIpi: itemPedido.produto.aliIpi,
        conv: itemPedido.produto.conv,
        tipoUnid: itemPedido.produto.tipoUnid,
        tipoUnid2: itemPedido.produto.tipoUnid2,
      };

      await store.add({ ...itemPedido, sincronizado, produto });

      await transaction.done;

      popularItemBanco(itemPedido);
      setConv(0);
      conv = 0;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  async function popularItemRascunhoMobile(
    itemPedido: IItenPedidoR,
    sincronizado: string
  ) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readwrite');
      const store = transaction.objectStore('itemPedidoVenda');

      const allItens = await store.getAll();

      const itemExistente = allItens.find(
        (item) =>
          item.palMPV === itemPedido.palMPV &&
          item.produtoId === itemPedido.produtoId
      );

      if (itemExistente) {
        await store.delete(itemExistente.id);
      }

      console.log(
        'EntrouPopularEditar',
        itemPedido,
        'Existente',
        itemExistente
      );
      const produto = {
        nome: itemPedido.descProduto,
        aliIpi: itemPedido.produto.aliIpi,
        conv: itemPedido.produto.conv,
        tipoUnid: itemPedido.produto.tipoUnid,
        tipoUnid2: itemPedido.produto.tipoUnid2,
      };

      await store.add({ ...itemPedido, sincronizado, produto });

      await transaction.done;

      setConv(0);
      conv = 0;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  async function getCabecalhosRascunho() {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const cabecalhos = await store.getAll();

      const cabecalhosSincronizados = cabecalhos.filter(
        (cabecalho) =>
          cabecalho.sincronizado == 'R' && cabecalho.parceiroId == codCliente
      );

      setCabecalhoRasc(cabecalhosSincronizados);
      cabecalhoRasc = cabecalhosSincronizados;
      await transaction.done;
      getItensSincronizados();
      console.log('ListaRascunho', cabecalhosSincronizados);
      return cabecalhosSincronizados;
    } catch (error) {
      console.log('Ocorreu um erro', error);
      return [];
    }
  }
  async function getCabecalhosSincronizadosDelete() {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const cabecalhos = await store.getAll();

      const cabecalhosSincronizados = cabecalhos.filter(
        (cabecalho) => cabecalho.sincronizado == 'R'
      );

      setCabecalhoRasc(cabecalhosSincronizados);
      cabecalhoRasc = cabecalhosSincronizados;
      await transaction.done;
      console.log('ListaRascunho', cabecalhosSincronizados);
      return cabecalhosSincronizados;
    } catch (error) {
      console.log('Ocorreu um erro', error);
      return [];
    }
  }

  async function getItensSincronizados() {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readonly');
      const store = transaction.objectStore('itemPedidoVenda');

      const cabecalhos = await store.getAll();

      const cabecalhosSincronizados = cabecalhos.filter(
        (cabecalho) =>
          cabecalho.sincronizado == 'R' && cabecalho.palMPV == numPedido
      );

      await transaction.done;
      console.log('ListaRascunho itens', cabecalhosSincronizados);
      return cabecalhosSincronizados;
    } catch (error) {
      console.log('Ocorreu um erro', error);
      return [];
    }
  }

  async function DeletarCabecalhoRascunho(palMPV: string) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const allCabecalhos = await store.getAll();

      const cabecalhosFiltrados = allCabecalhos.filter(
        (cabecalho) =>
          cabecalho.palMPV == palMPV && cabecalho.status == 'Rascunho'
      );

      for (const cabecalho of cabecalhosFiltrados) {
        await store.delete(cabecalho.id);
      }

      await transaction.done;

      getCabecalhosSincronizadosDelete();
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  //===============================================================

  function CriarArrayPedidos() {
    localStorage.setItem('@Portal/PedidoEmDigitacao', 'true');

    const novoItem: IItensArrayPedido = {
      vendedorId: obterVendedorIdParaPedido(),
      palMPV: numPedido,
      produtoId: produtoId,
      descProduto: nomeProduto,
      quant: quantidade,
      valUnit: valorUnitario,
      valTotal: valorTotal,
      unidade: unidadeEscolhida,
      produto: {
        nome: nomeProduto,
        aliIpi: aliIpi,
        conv: conv,
        tipoUnid: 'UN',
        tipoUnid2: unidade2,
      },
    };
    if (novoItem.valUnit > 0) {
      setIArrayPedido([...arrayPedido, novoItem]);
      setIArrayPedidoValor([...arrayPedido, novoItem]);
      arrayPedidoValor = [...arrayPedido, novoItem];
      setAdicionandoItem(false);
      adicionandoItem = false;
      seNomeProduto('');
      setValorItem(0);
      setUnidade1('');
      setUnidade2('');
      setQuantUnid(0);
      setQuantItem('');
      quantItem = '';
      setUnidadeEscolhida('');
      unidadeEscolhida = '';
    }
    if (!isMobile) {
      popularItemRascunho(novoItem, 'S');
    } else {
      popularItemRascunhoMobile(novoItem, 'N');
    }
    const novoTotal = arrayPedidoValor
      .filter((i) => String((i as any)?.inativo || 'N').toUpperCase() !== 'S')
      .reduce((total, item) => total + item.valTotal, 0);

    console.log('valoresRecebidos insert', novoTotal);
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    const cabecalho: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: novoTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    if (!isMobile) {
      popularCabecalhoRascunho(cabecalho, 'S', novoTotal);
    } else {
      popularCabecalhoRascunhoMobile(cabecalho, 'N', novoTotal);
    }
  }

  function excluirItemPorProdutoId(produtoId: number) {
    const novoArrayPedido = arrayPedido.map((item) => {
      if (item.produtoId !== produtoId) return item;
      return { ...item, inativo: 'S' };
    });
    setIArrayPedido(novoArrayPedido);
    setIArrayPedidoValor(novoArrayPedido);
    arrayPedidoValor = novoArrayPedido;
    deleteItemByPalMPVAndProdutoId(numPedido, produtoId);
    const novoTotal = arrayPedidoValor
      .filter((i) => String((i as any)?.inativo || 'N').toUpperCase() !== 'S')
      .reduce((total, item) => total + item.valTotal, 0);

    console.log('valoresRecebidos', novoTotal);
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    const cabecalho: ICabecalho = {
      vendedorId: Number(usuario.username),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: novoTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };

    if (novoTotal > 0) {
      if (!isMobile) {
        popularCabecalhoRascunho(cabecalho, 'S', novoTotal);
      } else {
        popularCabecalhoRascunhoMobile(cabecalho, 'N', novoTotal);
      }
    }

    if (novoTotal <= 0) {
      DeletePedidoItem0(numPedido);
    }
  }

  async function deleteItemByPalMPVAndProdutoId(
    palMPV: string,
    produtoId: number
  ) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readwrite');
      const store = transaction.objectStore('itemPedidoVenda');

      const allItens = await store.getAll();

      const itensFiltrados = allItens.filter(
        (item) => item.palMPV === palMPV && item.produtoId === produtoId
      );
      console.log('itens a excluir', itensFiltrados);
      for (const item of itensFiltrados) {
        const proximo = {
          ...item,
          inativo: 'S',
        };
        await store.put(proximo);
      }

      await transaction.done;

      await deleteItemPedi(palMPV, produtoId);
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  async function deleteItemPedi(palMPV: string, produtoId: number) {
    await api
      .put(`/api/ItemPedidoVenda/delete_logico/palmpv/${palMPV}/produto/${produtoId}`)
      .then((response) => {})
      .catch((error) => {});
  }

  function editarItemArrayPedido() {
    const valorTol = valorItem * quantidade;
    const novoItem: IItensArrayPedido = {
      vendedorId: Number(usuario.username),
      palMPV: numPedido,
      produtoId: produtoId,
      descProduto: nomeProduto,
      quant: quantidade,
      valUnit: valorUnitario,
      valTotal: valorTotal,
      unidade: unidadeEscolhida,
      produto: {
        nome: nomeProduto,
        aliIpi: aliIpi,
        conv: conv,
        tipoUnid: 'UN',
        tipoUnid2: unidade2,
      },
    };
    if (!isMobile) {
      popularItemRascunho(novoItem, 'S');
    } else {
      popularItemRascunhoMobile(novoItem, 'N');
    }
    const novoTotal = arrayPedidoValor
      .filter((i) => String((i as any)?.inativo || 'N').toUpperCase() !== 'S')
      .reduce((total, item) => total + item.valTotal, 0);

    console.log('valoresRecebidos Edite', novoTotal);
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    const cabecalho: ICabecalho = {
      vendedorId: Number(usuario.username),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: novoTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    if (!isMobile) {
      popularCabecalhoRascunho(cabecalho, 'S', novoTotal);
    } else {
      popularCabecalhoRascunhoMobile(cabecalho, 'N', novoTotal);
    }
    if (novoTotal <= 0) {
      DeletePedidoItem0(numPedido);
    }

    const novoArrayPedido = arrayPedido.map((item) =>
      item.produtoId === produtoId ? novoItem : item
    );
    console.log('valor do item duplicado', novoItem);
    setIArrayPedido(novoArrayPedido);
    setIArrayPedidoValor(novoArrayPedido);
    arrayPedidoValor = novoArrayPedido;
    setAddItem(true);
    addItem = true;
    seNomeProduto('');
    setValorItem(0);
    setUnidade1('');
    setUnidade2('');
    setQuantUnid(0);
    setQuantItem('');
    setUnidadeEscolhida('');
    unidadeEscolhida = '';
  }

  async function salvarItensDuplicados(itens: IItensArrayPedido[]) {
    if (!isMobile) {
      const itensSalvar: IItenPedidoSalvar[] = itens
        .filter((item) => item.valUnit > 0 && item.valTotal > 0)
        .map(({ descProduto, unidade, produto, inativo, ...rest }) => ({
          ...(rest as any),
          baixado: 'N',
          filial: String(codEmpresa),
          inativo: String(inativo || 'N').toUpperCase() === 'S' ? 'S' : 'N',
        }));
      if (contarItensAtivos(itensSalvar) === 0) {
        popularItem(itens, 'N');
        return;
      }
      try {
        await enviarItensEmLotes(itensSalvar);
      } catch {}
      popularItem(itens, 'N');
    } else {
      popularItem(itens, 'N');
    }
  }

  async function EditarCabecalhoDB(pedido: string) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const index = store.index('pedido');
      const cabecalho = await index.get(pedido);

      if (cabecalho) {
        cabecalho.status = 'Enviado';
        await store.put(cabecalho);
      }

      await transaction.done;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  //====== salvar cabecalho banco local ========================
  interface ICabeca {
    id?: number;
    vendedorId: number;
    parceiroId: number;
    filial: string;
    palMPV: string;
    status: string;
    tipPed: string;
    tipoNegociacaoId: number;
    data: string;
    pedido: string;
    valor: number;
    dataEntrega: string;
    observacao: string;
    ativo: string;
    versao: string;
  }

  async function popularCabecalho(cabecalho: ICabeca, sincronizado: string) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction(
        ['cabecalhoPedidoVenda', 'itemPedidoVenda'],
        'readwrite'
      );
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      const allCabecalho = await store.getAll();

      for (const existingRecord of allCabecalho) {
        if (existingRecord.palMPV === cabecalho.palMPV) {
          await store.delete(existingRecord.id);
        }
      }

      await store.add({ ...cabecalho, sincronizado });
      console.log('cabecalhoSalvandoRascunho', cabecalho, sincronizado);

      await transaction.done;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  async function apagarItems(palMPV: string) {
    console.log('recebido valor', palMPV);
    const db = await openDB('pgamobile', versao);
    const transaction = db.transaction('itemPedidoVenda', 'readwrite');
    const itemStore = transaction.objectStore('itemPedidoVenda');
    const itens = await itemStore.getAll();

    const itemsToDelete = await itens.filter(
      (item: any) => item.palMPV == palMPV
    );
    console.log('recebido valor', itemsToDelete);
    for (const item of itemsToDelete) {
      await itemStore.delete(item.id);
    }
  }

  const [dataPedidoNovo, setdataPedidoNovo] = useState('');
  //===========enviar dados testando retirar ===============================
  async function SalvarItensPedido() {
    try {
      const itensSalvar = mapArrayPedidoToSalvar(numPedido);
      if (!validarPedidoComItensAtivos(itensSalvar, 'salvar o pedido')) return;
      const response = await enviarItensEmLotes(itensSalvar);
      const totalEnviado = itensSalvar.length;
      const totalSalvos = Number(response?.data?.totalSalvos ?? 0);
      if (totalSalvos !== totalEnviado) {
        setAlertErroMensage2(true);
        if (response.data.errors && response.data.errors.length > 0) {
          let errorMsg = '';
          response.data.errors.forEach((error: any) => {
            errorMsg += error + '\n';
          });
          setMsgErro2(`${response.data.message}:\n${errorMsg}`);
        } else {
          setMsgErro2('Nem todos os itens foram salvos. Pedido marcado como Pendente.');
        }
        await SalvarCabecalhoPendente(true);
        return;
      }
      popularItem(arrayPedido, 'N');
      await SalvarCabecalhoEnviar();
    } catch (error) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Pedido falhou ao salvar, tente novamente mais tarde.');
      popularItem(arrayPedido, 'N');
    }
  }
  //==========Salvar como não enviado=========================
  async function SalvarItensPedidoPendente() {
    try {
      const itensSalvar = mapArrayPedidoToSalvar(numPedido);
      if (!validarPedidoComItensAtivos(itensSalvar, 'salvar/enviar o pedido')) return;
      setShowMensageSankhya(true);
      setrespostaSank('Salvando Pedido...');
      const response = await enviarItensEmLotes(itensSalvar);
      const totalEnviado = itensSalvar.length;
      const totalSalvos = Number(response?.data?.totalSalvos ?? 0);
      if (totalSalvos !== totalEnviado) {
        setAlertErroMensage2(true);
        setMsgErro2('Nem todos os itens foram salvos. Pedido marcado como Pendente.');
        await SalvarCabecalhoPendente(true);
        return;
      }
      setAlertErroMensage2(false);
      setMsgErro2('');
      setrespostaSank('Seu pedido está sendo enviado ao Sankhya, aguarde o processamento!');
      setOperacaoProgress(100);
      setShowOperacao(false);
      popularItem(arrayPedido, 'N');
      SalvarComoPendente();
    } catch (error) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Pedido falhou ao salvar, tente novamente mais tarde.');
      popularItem(arrayPedido, 'N');
    }
  }
  //=====Erro ao enviar Sankya ======================================
  async function ErroCabecalhoEnviar() {
    console.log('id cabecalho com erro', idVenda);
    await api
      .put(`/api/CabecalhoPedidoVenda/${idVenda}/status`)
      .then((response) => {
        localStorage.removeItem('@Portal/itensPedido');
        setRealizandopedido(false);
        GetPromotor();
        setCabecalhoId(0);
        setnumPedido('');
        numPedido = '';
        setAddItem(true);
        addItem = true;
        setPlaceHolder('pesquisa por código ou nome');
        placeHolder = 'pesquisa por código ou nome';
        window.scrollTo(0, 0);
        setLoading(false);
        setValorTotal(0);
        valorTotal = 0;
        setDataentrega('');
        dataEntrega = '';
        setObservacao('');
        observacao = '';
        GetTresUltimos();
        setIArrayPedido([]);
        setIArrayPedidoValor([]);
        arrayPedidoValor = [];
        setPedidoCabecalho([]);
        pedidoCabecalho = [];
        setItemEnviado(false);
        itemEnviado = false;
        pesquisaPedido = false;
        localStorage.removeItem('@Portal/cabecalhoPedido');
        setRealizandopedido(false);
        GetPromotor();
        setCabecalhoId(0);
        setAddItem(true);
        addItem = true;
        setPlaceHolder('pesquisa por código ou nome');
        placeHolder = 'pesquisa por código ou nome';
        window.scrollTo(0, 0);
        setLoading(false);
        setValorTotal(0);
        valorTotal = 0;
        setDataentrega('');
        dataEntrega = '';
        setObservacao('');
        observacao = '';
        GetTresUltimos();
        setItemEnviado(false);
        itemEnviado = false;
        setpedidosanteriores(false);
        pedidosanteriores = false;
        setpedidosanteriores(false);
        pedidosanteriores = false;
        setPesquisaPedido(false);
        pesquisaPedido = false;

        GetTresUltimos();
      })
      .catch((error) => {
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro('Pedido falhou ao salvar, tente novamente mais tarde.');
      });
  }

  //=================================================================
  async function SalvarCabecalhoEnviar() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
    const dataPedidoatual = dataFilt2;
    setdataPedidoNovo(String(dataPedidoatual));
    setvalorTotalNovo(somaTotal);
    const pal = gerarPalMPVComData(dataInicial);
    setpalMpv(pal);
    palMpv = pal;

    const cabecalho: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      ativo: 'S',
      versao: versaoFront,
      dataEntrega: dataEntrega,
      observacao: observacao,
    };
    const itensSalvar = mapArrayPedidoToSalvar(numPedido);
    if (!validarPedidoComItensAtivos(itensSalvar, 'salvar o pedido')) return;
    localStorage.removeItem('@Portal/PedidoEmDigitacao');
    try {
      await enviarItensEmLotes(itensSalvar, cabecalho, false);
      try {
        await GetPedidoId();
      } catch {}
      popularCabecalho(cabecalho, 'N');
      localStorage.removeItem('@Portal/itensPedido');
      localStorage.removeItem('@Portal/cabecalhoPedido');
    } catch (error) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('Pedido falhou ao salvar, tente novamente mais tarde.');
      try {
        popularCabecalho(cabecalho, 'N');
      } catch {}
    }
  }

  async function SalvarCabecalhoPendente(preservarDigitacao = false) {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
    const dataPedidoatual = dataFilt2;
    setdataPedidoNovo(String(dataPedidoatual));
    setvalorTotalNovo(somaTotal);
    const pal = gerarPalMPVComData(dataInicial);
    setpalMpv(pal);
    palMpv = pal;

    const cabecalho: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Pendente',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      ativo: 'S',
      versao: versaoFront,
      dataEntrega: dataEntrega,
      observacao: observacao,
    };
    const itensSalvar = mapArrayPedidoToSalvar(numPedido);
    if (!validarPedidoComItensAtivos(itensSalvar, 'salvar o pedido')) return;
    if (!preservarDigitacao) {
      localStorage.removeItem('@Portal/PedidoEmDigitacao');
    } else {
      localStorage.setItem('@Portal/PedidoEmDigitacao', 'true');
    }
    try {
      await enviarItensEmLotes(itensSalvar, { ...cabecalho, status: 'Não Enviado' }, false);
      await api.put(
        `/api/CabecalhoPedidoVenda/statusErroPalMPV?PalMPV=${encodeURIComponent(
          String(numPedido)
        )}`
      );
    } catch {}
    try {
      popularCabecalho(cabecalho, 'N');
    } catch {}
    if (!preservarDigitacao) {
      localStorage.removeItem('@Portal/itensPedido');
      localStorage.removeItem('@Portal/cabecalhoPedido');
    }
  }

  //====== popular item venda ===================================================
  interface IItenPedido {
    id?: number;
    vendedorId: number;
    palMPV: string;
    produtoId: number;
    descProduto: string;
    quant: number;
    valUnit: number;
    valTotal: number;
    unidade: string;
    inativo?: string;
    produto: {
      nome: string;
      aliIpi: number;
      conv: number;
      tipoUnid: string;
      tipoUnid2: string;
    };
  }

  async function popularItem(ItensPedido: IItenPedido[], sincronizado: string) {
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readwrite');
      const store = transaction.objectStore('itemPedidoVenda');

      const allitens = await store.getAll();

      const itensComMesmoPalMPV = allitens.filter((obj) =>
        ItensPedido.some((item) => item.palMPV === obj.palMPV)
      );

      for (const itemAnterior of itensComMesmoPalMPV) {
        await store.delete(itemAnterior.id);
      }

      const total = ItensPedido.length || 1;
      let idx = 0;
      for (const itemPedido of ItensPedido) {
        idx++;
        if (showOperacao) {
          setOperacaoMsg('Enviando itens...');
          const pct = Math.min(100, Math.round((idx / total) * 50));
          setOperacaoProgress(pct);
        } else if (showMensageSankhya || showMensage || showMensage2) {
          setrespostaSank('Salvando itens...');
          const pct = Math.min(100, Math.round((idx / total) * 50));
          setSucess(pct);
        } else {
          setMsgErro('Salvando: ' + itemPedido.descProduto);
        }
        const produto = {
          nome: itemPedido.descProduto,
          aliIpi: itemPedido.produto.aliIpi,
          conv: itemPedido.produto.conv,
          tipoUnid: itemPedido.produto.tipoUnid,
          tipoUnid2: itemPedido.produto.tipoUnid2,
        };
        await store.add({
          ...itemPedido,
          inativo: String(itemPedido?.inativo || 'N').toUpperCase() === 'S' ? 'S' : 'N',
          sincronizado,
          produto,
        });
      }
      //setMsgErro('Itens salvos sucesso!!! Por favor AGUARDE!!! ');
      await transaction.done;
      if (!showMensageSankhya) {
        setMsgErro('Pedido salvo sucesso!!!');
      }
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  async function enviarItensEmLotes(
    itens: IItenPedidoSalvar[],
    cabecalhoOverride?: any,
    envio = false
  ) {
    const total = itens.length || 0;
    if (total === 0) return { data: { totalSalvos: 0 } };
    if (showOperacao) {
      if (total > 50) {
        setOperacaoMsg(
          [
            'Seu pedido tem muitos itens',
            'Enviaremos todos os itens em uma única chamada.',
            `Processando ${total} itens...`,
            'Aguarde, não feche esta tela.'
          ].join('\n')
        );
        setOperacaoProgress(10);
      } else {
        setOperacaoMsg(`Enviando ${total} itens...`);
        setOperacaoProgress(20);
      }
    } else if (showMensageSankhya || showMensage || showMensage2) {
      if (total > 50) {
        setrespostaSank(
          [
            'Seu pedido tem muitos itens',
            'Enviaremos todos os itens em uma única chamada.',
            `Processando ${total} itens...`,
            'Aguarde, não feche esta tela.'
          ].join('\n')
        );
        setSucess(10);
      } else {
        setrespostaSank(`Enviando ${total} itens...`);
        setSucess(20);
      }
    }
    const itensNormalizados = itens.map((i) => ({
      ...i,
      palMPV: String(i?.palMPV || cabecalhoOverride?.palMPV || numPedido),
      baixado: String(i?.baixado || 'N'),
      filial: String((i as any)?.filial || cabecalhoOverride?.filial || codEmpresa),
      inativo:
        String((i as any)?.inativo || 'N').toUpperCase() === 'S' ? 'S' : 'N',
    }));
    const itensParaEnvio = (() => {
      const byProduto = new Map<number, { item: any; idx: number }>();
      for (let idx = 0; idx < itensNormalizados.length; idx++) {
        const item = itensNormalizados[idx];
        const prodId = Number((item as any)?.produtoId ?? (item as any)?.ProdutoId ?? 0);
        if (!prodId) continue;
        byProduto.set(prodId, { item, idx });
      }
      return Array.from(byProduto.values())
        .sort((a, b) => a.idx - b.idx)
        .map((v) => v.item);
    })();

    const quantItensAtivos = itensParaEnvio.filter(
      (i) => String((i as any)?.inativo || 'N').toUpperCase() !== 'S'
    ).length;

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const anoFinal = String(data.getFullYear());
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    const dataPedidoatual = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const pal = String(
      cabecalhoOverride?.palMPV || itensNormalizados?.[0]?.palMPV || numPedido
    );
    const cabecalhoPedidoVenda = {
      vendedorId: Number(cabecalhoOverride?.vendedorId ?? usuario.username),
      parceiroId: Number(cabecalhoOverride?.parceiroId ?? parceiroId),
      filial: String(cabecalhoOverride?.filial ?? codEmpresa),
      palMPV: pal,
      status: String(cabecalhoOverride?.status ?? 'Não Enviado'),
      tipPed: String(cabecalhoOverride?.tipPed ?? tipPed),
      tipoNegociacaoId: Number(
        cabecalhoOverride?.tipoNegociacaoId ?? tipoNegocia
      ),
      data: String(cabecalhoOverride?.data ?? dataPedidoatual),
      pedido: String(cabecalhoOverride?.pedido ?? ''),
      valor: Number(cabecalhoOverride?.valor ?? somaTotal),
      dataEntrega: String(cabecalhoOverride?.dataEntrega ?? dataEntrega),
      observacao: String(cabecalhoOverride?.observacao ?? observacao),
      ativo: String(cabecalhoOverride?.ativo ?? 'S'),
      versao: String(cabecalhoOverride?.versao ?? versaoFront),
      Quant_Itens: quantItensAtivos,
      quant_Itens: quantItensAtivos,
      Log_Envio: cabecalhoOverride?.Log_Envio ?? cabecalhoOverride?.log_Envio ?? null,
      log_Envio: cabecalhoOverride?.Log_Envio ?? cabecalhoOverride?.log_Envio ?? null,
    };

    const resp = await api.post('/api/CabecalhoPedidoVenda/envio', {
      CabecalhoPedidoVenda: cabecalhoPedidoVenda,
      ItensPedidoVenda: itensParaEnvio,
      Envio: envio,
    });
    const totalSalvos = total;
    const parcial = totalSalvos !== total;
    if (showOperacao) {
      setOperacaoMsg(
        `Envio finalizado\n${parcial ? 'Alguns itens falharam' : 'Todos os itens enviados'}\nTotal enviado: ${total}\nTotal salvo: ${totalSalvos}\nAtualize a lista para conferir`
      );
      setOperacaoProgress(100);
    } else if (showMensageSankhya || showMensage || showMensage2) {
      setrespostaSank(
        `Envio finalizado\n${parcial ? 'Alguns itens falharam' : 'Todos os itens enviados'}\nTotal enviado: ${total}\nTotal salvo: ${totalSalvos}\nAtualize a lista para conferir`
      );
      setSucess(100);
    }
    return {
      ...(resp as any),
      data: {
        ...((resp as any)?.data ?? {}),
        totalSalvos,
      },
    };
  }

  //=======================================================
  const [salvo, setsalvo] = useState(false);

  //=========== FUNÇÃO PARA SALVAR PEDIDO COMO NÃO ENVIADO ==================================

  async function SalvarDados(event: any) {
    event.preventDefault();
    setsalvo(false);
    if (nomeProduto !== '') {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro(
        'Você iniciou a inserção de um item e não adicinou, adicione o item antes de salvar!'
      );
      return;
    }
    if (dataEntrega == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('dataEntrega');
      document.getElementById('dataEntrega')?.focus();
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório informar a data de entrega.');
      return;
    }
    setOperacaoTeveErro(false);
    setShowOperacao(true);
    setOperacaoMsg('Processando dados...');
    setOperacaoProgress(0);
    console.log('empresa', codEmpresa);
    console.log('tipooo neg', tipoNegocia);

    const dataPedidoatual = new Date();
    setdataPedidoNovo(String(dataPedidoatual));
    const novoPedido: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: String(dataPedidoatual),
      pedido: '',
      valor: somaTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    setPedidoCabecalho([...pedidoCabecalho, novoPedido]);
    pedidoCabecalho = [...pedidoCabecalho, novoPedido];
    console.log('Array de pedidos', pedidoCabecalho);

    const itensSemValor = arrayPedido.filter((item) => item.valUnit <= 0);

    if (itensSemValor.length > 0) {
      setAlertErroMensage2(true);
      const produtoIdsNaoSalvos = itensSemValor.map((item) => item.produtoId);
      const mensagemErro =
        'Alguns itens não puderam ser salvos. Os seguintes produtos têm valor unitário ou valor total igual a zero: ' +
        produtoIdsNaoSalvos.join(', ');
      setMsgErro2(mensagemErro);
    }

    const itensSalvar = mapArrayPedidoToSalvar(numPedido);
    if (contarItensAtivos(itensSalvar) === 0) {
      setOperacaoTeveErro(true);
      setOperacaoMsg('Adicione ao menos 1 item ativo antes de salvar o pedido.');
      setOperacaoProgress(100);
      return;
    }

    if (isOnline) {
      try {
        const totalEsperado = itensSalvar.length;
        if (totalEsperado > 50) {
          setOperacaoMsg(
            [
              'Seu pedido tem muitos itens',
              'Enviaremos todos os itens em uma única chamada.',
              `Processando ${totalEsperado} itens...`,
              'Aguarde, não feche esta tela.'
            ].join('\n')
          );
        } else {
          setOperacaoMsg(`Enviando ${totalEsperado} itens...`);
        }
        setOperacaoProgress(60);
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var anoStr = String(ano);
        var anoFinal = anoStr;
        var hora = String(data.getHours()).padStart(2, '0');
        var minutos = String(data.getMinutes()).padStart(2, '0');
        var segundos = String(data.getSeconds()).padStart(2, '0');
        `${ano}-${mes}-${dia}`;
        var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
        const dataPedidoatual = dataFilt2;
        setOperacaoMsg('Salvando pedido...');
        setOperacaoProgress(75);
        await enviarItensEmLotes(
          itensSalvar,
          { ...novoPedido, data: dataPedidoatual, valor: somaTotal },
          false
        );
        await popularItem(arrayPedido, 'N');
        setOperacaoMsg('Pedido salvo com sucesso!');
        setOperacaoProgress(100);
        localStorage.removeItem('@Portal/PedidoEmDigitacao');
        localStorage.removeItem('@Portal/itensPedido');
        localStorage.removeItem('@Portal/cabecalhoPedido');
      } catch (error) {
        setOperacaoTeveErro(true);
        setOperacaoMsg('Pedido falhou ao salvar, tente novamente mais tarde.');
        setOperacaoProgress(100);
        try {
          await SalvarCabecalhoPendente(true);
        } catch {}
      }
    } else {
      var data = new Date();
      var dia = String(data.getDate()).padStart(2, '0');
      var mes = String(data.getMonth() + 1).padStart(2, '0');
      var ano = data.getFullYear();
      var anoStr = String(ano);
      var anoFinal = anoStr;
      var hora = String(data.getHours()).padStart(2, '0');
      var minutos = String(data.getMinutes()).padStart(2, '0');
      var segundos = String(data.getSeconds()).padStart(2, '0');
      `${ano}-${mes}-${dia}`;
      var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

      const dataPedidoatual = dataFilt2;
      setdataPedidoNovo(String(dataPedidoatual));
      const pal = gerarPalMPVComData(dataInicial);
      setpalMpv(pal);
      palMpv = pal;

      const cabecalho: ICabecalho = {
        vendedorId: obterVendedorIdParaPedido(),
        parceiroId: Number(parceiroId),
        filial: String(codEmpresa),
        palMPV: numPedido,
        status: 'Não Enviado',
        tipPed: tipPed,
        tipoNegociacaoId: Number(tipoNegocia),
        data: dataPedidoatual,
        pedido: '',
        valor: somaTotal,
        dataEntrega: dataEntrega,
        observacao: observacao,
        ativo: 'S',
        versao: versaoFront,
      };

      popularCabecalho(cabecalho, 'N');
      console.log('entrou no offline salvando', cabecalho);
      console.log('valor dos itens', arrayPedido);
      popularItem(arrayPedido, 'N');
      localStorage.removeItem('@Portal/itensPedido');
      setRealizandopedido(false);
      GetPromotor();
      setCabecalhoId(0);
      setnumPedido('');
      numPedido = '';
      setAddItem(true);
      addItem = true;
      setPlaceHolder('pesquisa por código ou nome');
      placeHolder = 'pesquisa por código ou nome';
      window.scrollTo(0, 0);
      setLoading(false);
      setValorTotal(0);
      valorTotal = 0;
      setDataentrega('');
      dataEntrega = '';
      setObservacao('');
      observacao = '';
      GetTresUltimos();
      setIArrayPedido([]);
      setIArrayPedidoValor([]);
      arrayPedidoValor = [];
      setPedidoCabecalho([]);
      pedidoCabecalho = [];
      setItemEnviado(false);
      itemEnviado = false;
      setOperacaoMsg('Pedido salvo com sucesso!\nSeu pedido foi salvo localmente.');
      setOperacaoProgress(100);
      localStorage.setItem('@Portal/sincronizar', 'true');
    }
    
    GetListaCabecalho();
  }

  async function SalvarCabecalho() {
    setsalvo(true);
    console.log('tipo Pedido escolhido', tipPed);

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    setdataPedidoNovo(String(dataPedidoatual));
    const pal = gerarPalMPVComData(dataInicial);
    setpalMpv(pal);
    palMpv = pal;

    const cabecalho: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };

    // iranildo
    /*
    setMsgErro('Enviando Cabeçalho para nuvens. AGUARDE!!!');
    await api
      .post('/api/CabecalhoPedidoVenda', {
        vendedorId: Number(usuario.username),
        parceiroId: Number(parceiroId),
        filial: String(codEmpresa),
        palMPV: numPedido,
        status: 'Não Enviado',
        tipPed: tipPed,
        tipoNegociacaoId: Number(tipoNegocia),
        data: dataPedidoatual,
        pedido: '',
        valor: somaTotal,
        dataEntrega: dataEntrega,
        observacao: observacao,
        ativo: 'S',
        versao: versaoFront,
      })
      .then((response) => {
        console.log('SalvouoscabecalhosNao', response.data);
        popularCabecalho(cabecalho, 'N');
        setPedidoVendaID(response.data.data.id);
        pedidoVendaID = response.data.data.id;
        localStorage.removeItem('@Portal/itensPedido');
        setRealizandopedido(false);
        GetPromotor();
        setCabecalhoId(0);
        setnumPedido('');
        numPedido = '';
        setAddItem(true);
        addItem = true;
        setPlaceHolder('pesquisa por código ou nome');
        placeHolder = 'pesquisa por código ou nome';
        window.scrollTo(0, 0);
        setLoading(false);
        setValorTotal(0);
        valorTotal = 0;
        setDataentrega('');
        dataEntrega = '';
        setObservacao('');
        observacao = '';
        GetTresUltimos();
        setIArrayPedido([]);
        setIArrayPedidoValor([]);
        arrayPedidoValor = [];
        setPedidoCabecalho([]);
        pedidoCabecalho = [];
        setItemEnviado(false);
        itemEnviado = false;
        setShowMensage(false);
        setShowMensage2(true);
        setAlertErroMensage(true);
        setMsgErro('Pedido salvo com sucesso!!!');
        setPesquisaPedido(false);
        pesquisaPedido = false;
        localStorage.setItem('@Portal/sincronizar', 'true');
        localStorage.removeItem('@Portal/cabecalhoPedido');
      })
      .catch((error) => {
        console.log('entrou no Erro no salvar cabecalho', cabecalho);
        localStorage.removeItem('@Portal/itensPedido');
        popularCabecalho(cabecalho, 'N');
        setRealizandopedido(false);
        GetPromotor();
        setCabecalhoId(0);
        setnumPedido('');
        numPedido = '';
        setAddItem(true);
        addItem = true;
        setPlaceHolder('pesquisa por código ou nome');
        placeHolder = 'pesquisa por código ou nome';
        window.scrollTo(0, 0);
        setLoading(false);
        setValorTotal(0);
        valorTotal = 0;
        setDataentrega('');
        dataEntrega = '';
        setObservacao('');
        observacao = '';
        GetTresUltimos();
        setIArrayPedido([]);
        setIArrayPedidoValor([]);
        arrayPedidoValor = [];
        setPedidoCabecalho([]);
        pedidoCabecalho = [];
        setItemEnviado(false);
        itemEnviado = false;
        setPesquisaPedido(false);
        pesquisaPedido = false;
        //setShowMensage(true);
        //setprocessossou(true);
        //setAlertErroMensage(true);
        //setMsgErro('Pedido salvo com sucesso!!!!');
        setShowMensage(false);
        setprocessossou(true);
        setAlertErroMensage(false);
      });
      */
      
      popularCabecalho(cabecalho, 'N');
      localStorage.removeItem('@Portal/itensPedido');
      setRealizandopedido(false);
      GetPromotor();
      setCabecalhoId(0);
      setnumPedido('');
      numPedido = '';
      setAddItem(true);
      addItem = true;
      setPlaceHolder('pesquisa por código ou nome');
      placeHolder = 'pesquisa por código ou nome';
      window.scrollTo(0, 0);
      setLoading(false);
      setValorTotal(0);
      valorTotal = 0;
      setDataentrega('');
      dataEntrega = '';
      setObservacao('');
      observacao = '';
      GetTresUltimos();
      setIArrayPedido([]);
      setIArrayPedidoValor([]);
      arrayPedidoValor = [];
      setPedidoCabecalho([]);
      pedidoCabecalho = [];
      setItemEnviado(false);
      itemEnviado = false;
      setShowMensage(false);
      setShowMensage2(true);
      setAlertErroMensage(true);
      setMsgErro('Pedido salvo com sucesso!!!');
      setPesquisaPedido(false);
      pesquisaPedido = false;
      localStorage.setItem('@Portal/sincronizar', 'true');
      localStorage.removeItem('@Portal/cabecalhoPedido');
      

  }

  function AddItemPedido2() {
    setValorUnitario(valorItem);

    console.log('entrou em adicionar', quantItem);
    if (quantItem == '0') {
      console.log('é zero');
      setShowMensage(true);

      setAlertErroMensage(true);
      setMsgErro(`A quantidade dos itens tem q ser maior que 0`);
      let pesquisar: any;
      pesquisar = document.getElementById('quantidadeEscolhida');
      document.getElementById('quantidadeEscolhida')?.focus();
    } else {
      if (unidadeEscolhida == 'UN') {
        if (Number(quantItem) % quantUnid == 0) {
          setquantidade(Number(quantItem));
          quantidade = Number(quantItem);
          setValorTotal(valorUnitario * Number(quantItem));
          valorTotal = valorUnitario * Number(quantItem);

          console.log('quantidade', quantidade);
          console.log('valor total', valorTotal);
          console.log('valordoIpi', aliIpi);

          if (addItem) {
            CriarArrayPedidos();
            setItensDoPedido(++itensDoPedido);
          } else {
            editarItemArrayPedido();
          }
        } else {
          setShowMensage(true);
          setAlertErroMensage(true);
          setMsgErro(`A quantidade inserida não é multiplo de ${quantUnid} `);
          let pesquisar: any;
          pesquisar = document.getElementById('quantidadeEscolhida');
          document.getElementById('quantidadeEscolhida')?.focus();
        }
      } else {
        setquantidade(Number(quantItem) * quantUnid);
        quantidade = Number(quantItem) * quantUnid;
        setValorTotal(valorUnitario * quantidade);
        valorTotal = valorUnitario * quantidade;
        console.log('quantidade', quantidade);
        console.log('valor total', valorTotal);
        if (addItem) {
          CriarArrayPedidos();
          setItensDoPedido(++itensDoPedido);
        } else {
          editarItemArrayPedido();
        }
      }
    }

    setQuantItem('');
    quantItem = '';
    setEmUso(false);
    emUso = false;
  }

  function AddItemPedido(event: any) {
    setValorUnitario(valorItem);

    event.preventDefault();
    console.log('entrou em adicionar', quantItem);
    if (quantItem == '0') {
      console.log('é zero');
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro(`A quantidade dos itens tem q ser maior que 0`);
      let pesquisar: any;
      pesquisar = document.getElementById('quantidadeEscolhida');
      document.getElementById('quantidadeEscolhida')?.focus();
    } else {
      if (unidadeEscolhida == 'UN') {
        if (Number(quantItem) % quantUnid == 0) {
          setquantidade(Number(quantItem));
          quantidade = Number(quantItem);
          setValorTotal(valorUnitario * Number(quantItem));
          valorTotal = valorUnitario * Number(quantItem);

          console.log('quantidade', quantidade);
          console.log('valor total', valorTotal);
          console.log('valordoIpi', aliIpi);

          if (addItem) {
            CriarArrayPedidos();
            setItensDoPedido(++itensDoPedido);
          } else {
            editarItemArrayPedido();
          }
        } else {
          setShowMensage(true);
          setAlertErroMensage(true);
          setMsgErro(`A quantidade inserida não é multiplo de ${quantUnid} `);
          let pesquisar: any;
          pesquisar = document.getElementById('quantidadeEscolhida');
          document.getElementById('quantidadeEscolhida')?.focus();
        }
      } else {
        setquantidade(Number(quantItem) * quantUnid);
        quantidade = Number(quantItem) * quantUnid;
        setValorTotal(valorUnitario * quantidade);
        valorTotal = valorUnitario * quantidade;
        console.log('quantidade', quantidade);
        console.log('valor total', valorTotal);
        if (addItem) {
          CriarArrayPedidos();
          setItensDoPedido(++itensDoPedido);
        } else {
          editarItemArrayPedido();
        }
      }
    }

    setQuantItem('');
    quantItem = '';
    setEmUso(false);
    emUso = false;
  }

  function Verificar0() {
    if (quantItem === '0') {
      console.log('é zero');
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro(`A quantidade dos itens tem q ser maior que 0`);
      let pesquisar: any;
      pesquisar = document.getElementById('quantidadeEscolhida');
      document.getElementById('quantidadeEscolhida')?.focus();
    }
  }
  function ApagaData() {}
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

  //===============================================================
  function obterVendedorIdParaPedido(): number {
    const fromState = Number(vendedorId ?? 0) || 0;
    if (fromState > 0) return fromState;

    const usernameStr = String((usuario as any)?.username ?? '').trim();
    const fromUsername = Number(usernameStr);
    if (Number.isFinite(fromUsername) && fromUsername > 0) return fromUsername;

    const fromCliente = Number((clienteSelecionado as any)?.vendedorId ?? 0) || 0;
    if (fromCliente > 0) return fromCliente;

    return 0;
  }

  function gerarPalMPVComData(dataSuffix: string): string {
    const vendedor = obterVendedorIdParaPedido();
    if (!vendedor || vendedor <= 0) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('VendedorId inválido para gerar o PalMPV.');
      throw new Error('VendedorId inválido para gerar o PalMPV.');
    }
    return `${vendedor}${String(dataSuffix || '').trim()}`;
  }

  function NumeroNovoPedido() {
    NumeroPedido();
    const pal = gerarPalMPVComData(dataFormarPedido);
    setnumPedido(pal);
    numPedido = pal;
  }
  async function NovoPedido() {
    if (dataEntrega == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('dataEntrega');
      document.getElementById('dataEntrega')?.focus();
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('É obrigatório informar a data de entrega.');
      return;
    }

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;

    setdataPedidoNovo(String(dataPedidoatual));
    try {
      const palBase = gerarPalMPVComData(dataInicial);
      setpalMpv(palBase);
      palMpv = palBase;
    } catch {
      setLoading(false);
      return;
    }
    console.log('empresa', codEmpresa);

    const vendedorPedido = obterVendedorIdParaPedido();
    if (!vendedorPedido || vendedorPedido <= 0) {
      setLoading(false);
      return;
    }

    const cabecalho: any = {
      vendedorId: vendedorPedido,
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: Number(valorPedidoSelecionado || somaTotal),
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    const itemSalvar: any = {
      vendedorId: vendedorPedido,
      palMPV: numPedido,
      produtoId: Number(produtoId),
      quant: Number(quantidade),
      valUnit: Number(valorUnitario),
      valTotal: Number(valorTotal),
      baixado: 'N',
      filial: String(codEmpresa),
      inativo: 'N',
    };
    try {
      await enviarItensEmLotes([itemSalvar], cabecalho, false);
      await GetPedidoId();
      if (editando) {
        GetItensPedidoEdit();
      } else {
        GetItensPedido();
      }
    } catch {
      setLoading(false);
    }
  }
  //============ novo item novo pedido========================//
  async function NovoItemPedido(pedidoID: any) {
    const valorCabecalho = Number(somaTotal || 0) + Number(valorTotal || 0);
    if (valorCabecalho <= 0) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('O Valor do Pedido não pode ser igual a zero.');
      return;
    }

    const cabecalho: any = {
      vendedorId: Number(usuario.username),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: new Date().toISOString(),
      pedido: '',
      valor: valorCabecalho,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    const itemSalvar: any = {
      vendedorId: obterVendedorIdParaPedido(),
      palMPV: numPedido,
      produtoId: Number(produtoId),
      quant: Number(quantidade),
      valUnit: Number(valorUnitario),
      valTotal: Number(valorTotal),
      baixado: 'N',
      filial: String(codEmpresa),
      inativo: 'N',
    };
    try {
      await enviarItensEmLotes([itemSalvar], cabecalho, false);
      try {
        await GetPedidoId();
      } catch {}

      setAdicionandoItem(false);
      adicionandoItem = false;
      seNomeProduto('');
      setValorItem(0);
      setUnidade1('');
      setUnidade2('');
      setQuantUnid(0);
      setQuantItem('');
      setUnidadeEscolhida('');
      unidadeEscolhida = '';
      if (editando) {
        GetItensPedidoEdit();
      } else {
        GetItensPedido();
      }
    } catch (error: any) {
      setLoading(false);
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro(
        String(error?.response?.data?.message ?? error?.response?.data ?? 'Erro')
      );
    }
  }
  //=========== novo item ==================================//
  async function NovoItem() {
    const valorCabecalho = Number(somaTotal || 0) + Number(valorTotal || 0);
    if (valorCabecalho <= 0) {
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro('O Valor do Pedido não pode ser igual a zero.');
      return;
    }

    const cabecalho: any = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: new Date().toISOString(),
      pedido: '',
      valor: valorCabecalho,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    const itemSalvar: any = {
      vendedorId: obterVendedorIdParaPedido(),
      palMPV: numPedido,
      produtoId: Number(produtoId),
      quant: Number(quantidade),
      valUnit: Number(valorUnitario),
      valTotal: Number(valorTotal),
      baixado: 'N',
      filial: String(codEmpresa),
      inativo: 'N',
    };
    try {
      await enviarItensEmLotes([itemSalvar], cabecalho, false);
      try {
        await GetPedidoId();
      } catch {}

      setAdicionandoItem(false);
      adicionandoItem = false;
      seNomeProduto('');
      setValorItem(0);
      setUnidade1('');
      setUnidade2('');
      setQuantUnid(0);
      setQuantItem('');
      quantItem = '';
      setUnidadeEscolhida('');
      unidadeEscolhida = '';
      if (editando) {
        GetItensPedidoEdit();
      } else {
        GetItensPedido();
      }
    } catch (error: any) {
      setLoading(false);
      setShowMensage(true);
      setAlertErroMensage(true);
      setMsgErro(
        String(error?.response?.data?.message ?? error?.response?.data ?? 'Erro')
      );
    }
  }
  //============get Itens=======================================//
  async function GetItensPedidoinic() {
    await api
      .get(
        `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${cabecalgoId}`
      )
      .then((response) => {
        console.log('itens tabela preço ok', response.data.data);
        const itensAtivos = (response.data.data || []).filter(
          (i: any) =>
            String(i?.inativo ?? i?.Inativo ?? 'N').toUpperCase() !== 'S'
        );
        setItensPedido(itensAtivos);
        itensPedido = itensAtivos;
        if (itensPedido.length > 0) {
          setItemEnviado(true);
          itemEnviado = true;
        } else {
          setItemEnviado(false);
          itemEnviado = false;
        }
        setDataentrega(dataAtual);
        dataEntrega = dataAtual;
        var sum = 0;
        for (var i = 0; i < itensAtivos.length; i++) {
          sum += itensAtivos[i].valTotal;
        }
        setSomaTotal(sum);
        somaTotal = sum;
        console.log('total', somaTotal);
      })
      .catch((error) => {});
  }
  function ZerarDataEntrega() {
    setDataentrega('');
    dataEntrega = '';
  }
  //==========get 03 ultimo pedidos==============================================================

  async function GetTresUltimos() {
    setCodCliente(JSON.parse(localStorage.getItem('ClienteEscolhido') || '0'));
    codCliente = JSON.parse(localStorage.getItem('ClienteEscolhido') || '0');
    console.log('entrou nos 3 ultimos');
    console.log('codigo Clientes', codCliente);
    const vendedor = Number(usuario.username);
    if (!isOnline) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
        const store = transaction.objectStore('cabecalhoPedidoVenda');
        const cabecalho = await store.getAll();

        const tresUltimos = cabecalho.filter(
          (item) =>
            item.vendedorId == vendedor &&
            item.parceiroId == Number(codCliente) &&
            item.status == 'Enviado' &&
            item.ativo != 'N'
        );

        tresUltimos.reverse();
        console.log('testenuevo', tresUltimos);
        setPedidoId01(tresUltimos[0]?.id);
        pedidoId01 = tresUltimos[0]?.id;
        setDescPedido01(tresUltimos[0]?.palMPV);
        descPedido01 = tresUltimos[0]?.palMPV;
        setDescSankhya01(tresUltimos[0]?.pedido);
        descSankhya01 = tresUltimos[0]?.pedido;
        setValorPedido01(tresUltimos[0]?.valor);
        valorPedido01 = tresUltimos[0]?.valor;
        setStatus01(tresUltimos[0]?.status);
        status01 = tresUltimos[0]?.status;
        setcodParceiro1(tresUltimos[0]?.parceiroId);
        codParceiro1 = tresUltimos[0]?.parceiroId;
        setcodEmpresa1(Number(tresUltimos[0]?.filial));
        codEmpresa1 = Number(tresUltimos[0]?.filial);
        setdataPedido1(tresUltimos[0]?.data);
        dataPedido1 = tresUltimos[0]?.data;
        setPedidoId02(tresUltimos[1]?.id);
        pedidoId02 = tresUltimos[1]?.id;
        setDescPedido02(tresUltimos[1]?.palMPV);
        descPedido02 = tresUltimos[1]?.palMPV;
        setDescSankhya02(tresUltimos[1]?.pedido);
        descSankhya02 = tresUltimos[1]?.pedido;
        setValorPedido02(tresUltimos[1]?.valor);
        valorPedido02 = tresUltimos[1]?.valor;
        setStatus02(tresUltimos[1]?.status);
        status02 = tresUltimos[1]?.status;
        setcodParceiro2(tresUltimos[1]?.parceiroId);
        codParceiro2 = tresUltimos[1]?.parceiroId;
        setcodEmpresa2(Number(tresUltimos[1]?.filial));
        codEmpresa2 = Number(tresUltimos[1]?.filial);
        setdataPedido2(tresUltimos[1]?.data);
        dataPedido2 = tresUltimos[1]?.data;
        setPedidoId03(tresUltimos[2]?.id);
        pedidoId03 = tresUltimos[2]?.id;
        setDescPedido03(tresUltimos[2]?.palMPV);
        descPedido03 = tresUltimos[2]?.palMPV;
        setDescSankhya03(tresUltimos[2]?.pedido);
        descSankhya03 = tresUltimos[2]?.pedido;
        setValorPedido03(tresUltimos[2]?.valor);
        valorPedido03 = tresUltimos[2]?.valor;
        setStatus03(tresUltimos[2]?.status);
        status03 = tresUltimos[2]?.status;
        setcodParceiro3(tresUltimos[2]?.parceiroId);
        codParceiro3 = tresUltimos[2]?.parceiroId;
        setcodEmpresa3(Number(tresUltimos[2]?.filial));
        codEmpresa3 = Number(tresUltimos[2]?.filial);
        setdataPedido3(tresUltimos[2]?.data);
        dataPedido3 = tresUltimos[2]?.data;
        console.log('pedidos relaçao reversa', tresUltimos);
        console.log('descPedido', descPedido01);
        console.log('valor Pedido', valorPedido01);
        console.log('status', status01);
      } catch (error) {
        setLoading(false);
        console.log('Ocorreu um erro', error);
      }
    } else {
      await api
        .get(
          `/api/CabecalhoPedidoVenda/ultimos3/vendedor-parceiro?codVendedor=${usuario.username}&codParceiro=${codCliente}`
        )
        .then((response) => {
          setTresUltimos(response.data.data || []);
          tresUltimos = response.data.data || [];
          setPedidoId01(tresUltimos[0]?.id);
          pedidoId01 = tresUltimos[0]?.id;
          setDescPedido01(tresUltimos[0]?.palMPV);
          descPedido01 = tresUltimos[0]?.palMPV;
          setDescSankhya01(tresUltimos[0]?.pedido);
          descSankhya01 = tresUltimos[0]?.pedido;
          setValorPedido01(tresUltimos[0]?.valor);
          valorPedido01 = tresUltimos[0]?.valor;
          setStatus01(tresUltimos[0]?.status);
          status01 = tresUltimos[0]?.status;
          setcodParceiro1(tresUltimos[0]?.parceiroId);
          codParceiro1 = tresUltimos[0]?.parceiroId;
          setcodEmpresa1(Number(tresUltimos[0]?.filial));
          codEmpresa1 = Number(tresUltimos[0]?.filial);
          setdataPedido1(tresUltimos[0]?.data);
          dataPedido1 = tresUltimos[0]?.data;
          setPedidoId02(tresUltimos[1]?.id);
          pedidoId02 = tresUltimos[1]?.id;
          setDescPedido02(tresUltimos[1]?.palMPV);
          descPedido02 = tresUltimos[1]?.palMPV;
          setDescSankhya02(tresUltimos[1]?.pedido);
          descSankhya02 = tresUltimos[1]?.pedido;
          setValorPedido02(tresUltimos[1]?.valor);
          valorPedido02 = tresUltimos[1]?.valor;
          setStatus02(tresUltimos[1]?.status);
          status02 = tresUltimos[1]?.status;
          setcodParceiro2(tresUltimos[1]?.parceiroId);
          codParceiro2 = tresUltimos[1]?.parceiroId;
          setcodEmpresa2(Number(tresUltimos[1]?.filial));
          codEmpresa2 = Number(tresUltimos[1]?.filial);
          setdataPedido2(tresUltimos[1]?.data);
          dataPedido2 = tresUltimos[1]?.data;
          setPedidoId03(tresUltimos[2]?.id);
          pedidoId03 = tresUltimos[2]?.id;
          setDescPedido03(tresUltimos[2]?.palMPV);
          descPedido03 = tresUltimos[2]?.palMPV;
          setDescSankhya03(tresUltimos[2]?.pedido);
          descSankhya03 = tresUltimos[2]?.pedido;
          setValorPedido03(tresUltimos[2]?.valor);
          valorPedido03 = tresUltimos[2]?.valor;
          setStatus03(tresUltimos[2]?.status);
          status03 = tresUltimos[2]?.status;
          setcodParceiro3(tresUltimos[2]?.parceiroId);
          codParceiro3 = tresUltimos[2]?.parceiroId;
          setcodEmpresa3(Number(tresUltimos[2]?.filial));
          codEmpresa3 = Number(tresUltimos[2]?.filial);
          setdataPedido3(tresUltimos[2]?.data);
          dataPedido3 = tresUltimos[2]?.data;
          console.log('pedidos relaçao reversa', tresUltimos);
          console.log('descPedido', descPedido01);
          console.log('valor Pedido', valorPedido01);
          console.log('status', status01);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  async function GetTresUltimosnuvem() {
    console.log('codigo Clientes', codCliente);
    await api
      .get(
        `/api/CabecalhoPedidoVenda/ultimos3/vendedor-parceiro?codVendedor=${usuario.username}&codParceiro=${codCliente}`
      )
      .then((response) => {
        setTresUltimos(response.data.data || []);
        tresUltimos = response.data.data || [];
        setPedidoId01(tresUltimos[0]?.id);
        pedidoId01 = tresUltimos[0]?.id;
        setDescPedido01(tresUltimos[0]?.pedido);
        descPedido01 = tresUltimos[0]?.pedido;
        setValorPedido01(tresUltimos[0]?.valor);
        valorPedido01 = tresUltimos[0]?.valor;
        setStatus01(tresUltimos[0]?.status);
        status01 = tresUltimos[0]?.status;
        setPedidoId02(tresUltimos[1]?.id);
        pedidoId02 = tresUltimos[1]?.id;
        setDescPedido02(tresUltimos[1]?.pedido);
        descPedido02 = tresUltimos[1]?.pedido;
        setValorPedido02(tresUltimos[1]?.valor);
        valorPedido02 = tresUltimos[1]?.valor;
        setStatus02(tresUltimos[1]?.status);
        status02 = tresUltimos[1]?.status;
        setPedidoId03(tresUltimos[2]?.id);
        pedidoId03 = tresUltimos[2]?.id;
        setDescPedido03(tresUltimos[2]?.pedido);
        descPedido03 = tresUltimos[2]?.pedido;
        setValorPedido03(tresUltimos[2]?.valor);
        valorPedido03 = tresUltimos[2]?.valor;
        setStatus03(tresUltimos[2]?.status);
        status03 = tresUltimos[2]?.status;
        console.log('pedidos relaçao reversa', tresUltimos);
        console.log('descPedido', descPedido01);
        console.log('valor Pedido', valorPedido01);
        console.log('status', status01);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=======================================================================================

  function GetItensPedidoEdit(): void {
    const novosItens: IItensArrayPedido[] = [];
    console.log('valoresDaLista', itensPedidoSelecionadoList);
    itensPedidoSelecionadoListAtivos.forEach((item: any) => {
      const novoItem: IItensArrayPedido = {
        vendedorId: item.vendedorId,
        palMPV: item.palMPV,
        produtoId: item.produtoId,
        descProduto: item.produto?.nome ?? '',
        quant: item.quant,
        valUnit: item.valUnit,
        valTotal: item.valTotal,
        unidade: item.produto?.tipoUnid ?? '',
        produto: {
          nome: item.produto?.nome ?? '',
          conv: item.produto?.conv ?? 0,
          aliIpi: item.produto?.aliIpi ?? 0,
          tipoUnid: item.produto?.tipoUnid ?? '',
          tipoUnid2: item.produto?.tipoUnid2 ?? '',
        },
      };
      novosItens.push(novoItem);
    });

    const novoArrayPedido: IItensArrayPedido[] = [...novosItens];

    setIArrayPedido(novoArrayPedido);
    setIArrayPedidoValor(novoArrayPedido);
    arrayPedidoValor = novoArrayPedido;
    console.log('valor redbido', arrayPedido);
    setItensDoPedido(novoArrayPedido.length);
    itensDoPedido = novoArrayPedido.length;
    setShowMensageLoadingDup(false);
  }

  function GetItensPedidoEditDuplicate(): void {
    const novosItens: IItensArrayPedido[] = [];

    itensPedidoSelecionadoListAtivos.forEach((item: any) => {
      const novoItem: IItensArrayPedido = {
        vendedorId: item.vendedorId,
        palMPV: numPedido,
        produtoId: item.produtoId,
        descProduto: item.produto?.nome ?? '',
        quant: item.quant,
        valUnit: item.valUnit,
        valTotal: item.valTotal,
        unidade: item.produto?.tipoUnid ?? '',
        produto: {
          nome: item.produto?.nome ?? '',
          conv: item.produto?.conv ?? 0,
          aliIpi: item.produto?.aliIpi ?? 0,
          tipoUnid: item.produto?.tipoUnid ?? '',
          tipoUnid2: item.produto?.tipoUnid2 ?? '',
        },
      };
      novosItens.push(novoItem);
    });

    const novoArrayPedido: IItensArrayPedido[] = [...novosItens];
    console.log('novo array duplicado:', novoArrayPedido);
    setIArrayPedido(novoArrayPedido);
    setIArrayPedidoValor(novoArrayPedido);
    arrayPedidoValor = novoArrayPedido;

    const novoTotal = novoArrayPedido.reduce(
      (total, item) => total + item.valTotal,
      0
    );

    console.log('valoresRecebidos', novoTotal);
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    const cabecalho: ICabecalho = {
      vendedorId: Number(usuario.username),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: novoTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    if (!isMobile) {
      popularCabecalhoRascunho(cabecalho, 'S', novoTotal);
    } else {
      popularCabecalhoRascunhoMobile(cabecalho, 'N', novoTotal);
    }

    salvarItensDuplicados(novoArrayPedido);
    setItensDoPedido(novoArrayPedido.length);
    itensDoPedido = novoArrayPedido.length;
    setShowMensageLoadingDup(false);
  }

  //========================================================================================

  async function GetItensPedido() {
    console.log('id do cabeçalho editar', cabecalgoId);

    await api
      .get(
        `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${cabecalgoId}`
      )
      .then((response) => {
        console.log('itens tabela preço ok', response.data.data);
        const itensAtivos = (response.data.data || []).filter(
          (i: any) =>
            String(i?.inativo ?? i?.Inativo ?? 'N').toUpperCase() !== 'S'
        );
        setItensPedido(itensAtivos);
        itensPedido = itensAtivos;

        if (itensPedido?.length > 0) {
          setItemEnviado(true);
          itemEnviado = true;
        } else {
          setItemEnviado(false);
          itemEnviado = false;
        }

        var sum = 0;
        for (var i = 0; i < itensAtivos.length; i++) {
          sum += itensAtivos[i].valTotal;
        }
        setSomaTotal(sum);
        somaTotal = sum;
        console.log('total', somaTotal);
        EditeTabelaInsert(somaTotal);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //delete item pedido=======================================
  async function DeleteItem(idOrItem: any) {
    const item =
      typeof idOrItem === 'object'
        ? idOrItem
        : (itensPedido || []).find((i: any) => i?.id === idOrItem);
    const pal = String(item?.palMPV ?? item?.PalMPV ?? numPedido);
    const prodId = Number(item?.produtoId ?? item?.ProdutoId);
    if (!pal || !prodId) return;
    try {
      await deleteItemByPalMPVAndProdutoId(pal, prodId);
    } catch {}
    try {
      GetItensPedido();
      setItensDoPedido(--itensDoPedido);
    } catch {}
  }
  //=====get pedido por id =========================================//
  async function GetPedidoId() {
    const pal = String(numPedido || palMPVEscolhido || '').trim();
    await api
      .get(
        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(pal))}`
      )
      .then((resp) => {
        const cab = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
        console.log('pedido de venda', cab);
        if (cab?.id != null) {
          try {
            setPedidoVendaID(Number(cab.id));
            pedidoVendaID = Number(cab.id);
            setidVenda(Number(cab.id));
            idVenda = Number(cab.id);
          } catch {}
        }
        setDataPedidoId(cab?.data);
        dataPedidoId = cab?.data;

        console.log('data entrega id', cab?.dataEntrega);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //===============Editar erro pedido salvo ====================
  async function EditePedididoError03Ultimos(numeroPedidoSelecionado: any) {
    setLoading(true);

    if (somaTotal > 0) {
      await api
        .put(
          `/api/CabecalhoPedidoVenda/statusErroPalMPV?PalMPV=${numeroPedidoSelecionado}`
        )

        .then((response) => {})
        .catch((error) => {});
    }
  }
  //============ Editar pedido ===============================//
  async function EditePedididoError(numPedido: any) {
    setLoading(true);
    console.log('entrou nesse envio pendente 33');
    if (somaTotal > 0) {
      await api
        .put(`/api/CabecalhoPedidoVenda/statusErroPalMPV?PalMPV=${numPedido}`)

        .then((response) => {})
        .catch((error) => {});
    }
  }
  //============editar ao inserir itens ================================//
  async function EditeTabelaInsert(soma: any) {
    console.log('entrou nesse');

    await api
      .put(`/api/CabecalhoPedidoVenda/${cabecalgoId}`, {
        vendedorId: obterVendedorIdParaPedido(),
        parceiroId: parceiroId,
        id: cabecalgoId,
        filial: String(codEmpresa),
        palMPV: numPedido,
        tipoNegociacaoId: Number(tipoNegocia),
        data: dataPedidoId,
        pedido: '',
        status: 'Não Enviado',
        tipPed: tipPed,
        valor: soma,
        dataEntrega: dataEntrega,
        observacao: observacao,
      })
      .then((response) => {})
      .catch((error) => {
        setLoading(false);
        window.scrollTo(0, 0);
        setShowMensage(true);
        setAlertErroMensage(true);
        const { data } = error.response;
        setMsgErro(error.response.data);
        return;
      });
  }
  function CancelarPedido2() {
    setItensDoPedido(0);
    itensDoPedido = 0;
    setLoading(true);
    setRealizandopedido(false);
    GetPromotor();
    setCabecalhoId(0);
    setAddItem(true);
    addItem = true;
    setPlaceHolder('pesquisa por código ou nome');
    placeHolder = 'pesquisa por código ou nome';
    window.scrollTo(0, 0);
    setItemEnviado(false);
    itemEnviado = false;
    setValorTotal(0);
    valorTotal = 0;
    setDataentrega('');
    dataEntrega = '';
    setObservacao('');
    observacao = '';
    GetTresUltimos();
  }
  //====================================================================

  function CancelarPedidoEditar() {
    localStorage.removeItem('@Portal/PedidoEmDigitacao');
    setIArrayPedido([]);
    setIArrayPedidoValor([]);
    arrayPedidoValor = [];
    setEditandoPedido(false);
    setRealizandopedido(false);
    GetPromotor();
    setCabecalhoId(0);
    setAddItem(true);
    addItem = true;
    setPlaceHolder('pesquisa por código ou nome');
    placeHolder = 'pesquisa por código ou nome';
    window.scrollTo(0, 0);
    setValorTotal(0);
    valorTotal = 0;
    setDataentrega('');
    dataEntrega = '';
    setObservacao('');
    observacao = '';
    GetTresUltimos();
    DeletePedido(numPedido);
  }

  function CancelarPedido() {
    localStorage.removeItem('@Portal/PedidoEmDigitacao');
    setEditando(false);
    setIArrayPedido([]);
    setIArrayPedidoValor([]);
    arrayPedidoValor = [];
    setEditandoPedido(false);
    setRealizandopedido(false);
    GetPromotor();
    setCabecalhoId(0);
    setAddItem(true);
    addItem = true;
    setPlaceHolder('pesquisa por código ou nome');
    placeHolder = 'pesquisa por código ou nome';
    window.scrollTo(0, 0);
    setValorTotal(0);
    valorTotal = 0;
    setDataentrega('');
    dataEntrega = '';
    setObservacao('');
    observacao = '';
    GetTresUltimos();
    DeletePedido(numPedido);
  }

  function FinalizarPedido() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    const cabecalho: ICabecalho = {
      vendedorId: Number(usuario.username),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    popularCabecalhoFinalizar(cabecalho, 'N');
    setEditando(false);
    setIArrayPedido([]);
    setIArrayPedidoValor([]);
    arrayPedidoValor = [];
    setEditandoPedido(false);
    setRealizandopedido(false);
    GetPromotor();
    setCabecalhoId(0);
    setAddItem(true);
    addItem = true;
    setPlaceHolder('pesquisa por código ou nome');
    placeHolder = 'pesquisa por código ou nome';
    window.scrollTo(0, 0);
    setValorTotal(0);
    valorTotal = 0;
    setDataentrega('');
    dataEntrega = '';
    setObservacao('');
    observacao = '';
    setShowMensage2(true);
    setAlertErroMensage(true);
    setMsgErro('Pedido salvo com sucesso!!!!!');
    GetTresUltimos();
  }

  async function popularCabecalhoFinalizar(
    cabecalho: ICabeca,
    sincronizado: string
  ) {
    console.log('ListaRascunho populando', cabecalho);
    try {
      const db = await openDB('pgamobile', versao);
      const transaction = db.transaction(
        ['cabecalhoPedidoVenda', 'itemPedidoVenda'],
        'readwrite'
      );
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const allCabecalho = await store.getAll();

      for (const existingRecord of allCabecalho) {
        if (existingRecord.palMPV === cabecalho.palMPV) {
          await store.delete(existingRecord.id);
        }
      }
      console.log('ListaRascunho populando salvando', cabecalho);
      await store.add({ ...cabecalho, sincronizado });
      await transaction.done;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  async function salvarCabecalhoFinalizar() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    const cabecalho: any = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Não Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    const itensSalvar = mapArrayPedidoToSalvar(numPedido);
    if (!validarPedidoComItensAtivos(itensSalvar, 'finalizar o pedido')) return;
    try {
      await enviarItensEmLotes(itensSalvar, cabecalho, false);
    } catch {}

    setEditando(false);
    setIArrayPedido([]);
    setIArrayPedidoValor([]);
    arrayPedidoValor = [];
    setEditandoPedido(false);
    setRealizandopedido(false);
    GetPromotor();
    setCabecalhoId(0);
    setAddItem(true);
    addItem = true;
    setPlaceHolder('pesquisa por código ou nome');
    placeHolder = 'pesquisa por código ou nome';
    window.scrollTo(0, 0);
    setValorTotal(0);
    valorTotal = 0;
    setDataentrega('');
    dataEntrega = '';
    setObservacao('');
    observacao = '';
    setShowMensage2(true);
    setAlertErroMensage(true);
    setMsgErro('Pedido finalizado com sucesso.');
    GetTresUltimos();
  }

  async function DeletePedidoItem0(NumeroPalMPV: string) {
    setLoading(false);
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
    const store = transaction.objectStore('cabecalhoPedidoVenda');

    const allCabecalhos = await store.getAll();

    for (const cabecalho of allCabecalhos) {
      if (cabecalho.palMPV === NumeroPalMPV) {
        cabecalho.ativo = 'N';
        await store.put(cabecalho);
      }
    }
    await transaction.done;
    DeletePedidoNuvem();
  }
  //====================delete pedido ============================//
  async function DeletePedido(NumeroPalMPV: string) {
    setLoading(false);
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
    const store = transaction.objectStore('cabecalhoPedidoVenda');

    const allCabecalhos = await store.getAll();

    for (const cabecalho of allCabecalhos) {
      if (cabecalho.palMPV === NumeroPalMPV) {
        cabecalho.ativo = 'N';
        await store.put(cabecalho);
      }
    }
    await transaction.done;
    setLoading(false);
    setShowMensage2(true);
    setAlertErroMensage(true);
    setMsgErro('Pedido excluido com sucesso.');
    DeletePedidoNuvem();
  }

  async function DeletePedidoNuvem() {
    await api
      .put(`/api/CabecalhoPedidoVenda/palmpv/${numPedido}`)
      .then((response) => {
        popularListaDelete(numPedido, 'S');
      })
      .catch((error) => {
        popularListaDelete(numPedido, 'N');
      });
  }

  async function DeletePedidoNuvemSelecionado(NumeroPalMPV: string) {
    await api
      .put(`/api/CabecalhoPedidoVenda/palmpv/${NumeroPalMPV}`)
      .then((response) => {
        popularListaDelete(NumeroPalMPV, 'S');
      })
      .catch((error) => {
        popularListaDelete(NumeroPalMPV, 'N');
      });
  }

  async function DeletePedidoSelecionado(NumeroPalMPV: string) {
    setLoading(false);
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
    const store = transaction.objectStore('cabecalhoPedidoVenda');

    const allCabecalhos = await store.getAll();

    for (const cabecalho of allCabecalhos) {
      if (cabecalho.palMPV === NumeroPalMPV) {
        cabecalho.ativo = 'N';
        await store.put(cabecalho);
      }
    }
    await transaction.done;
    setLoading(false);
    setShowMensage2(true);
    setAlertErroMensage(true);
    setMsgErro('Pedido excluido com sucesso.');
    await DeletePedidoNuvemSelecionado(NumeroPalMPV);
  }
  async function popularListaDelete(
    NumeroPalMPV: string,
    sincronizado: string
  ) {
    try {
      setLoading(false);
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const allCabecalhos = await store.getAll();

      for (const cabecalho of allCabecalhos) {
        if (cabecalho.palMPV === NumeroPalMPV) {
          cabecalho.sincronizado = sincronizado;
          await store.put(cabecalho);
        }
      }

      transaction.oncomplete = () => {
        console.log('Transação concluída com sucesso.');
      };

      transaction.onerror = (event) => {
        console.error('Erro na transação:', event);
      };
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  }

  //==========================================================================
  function EditarPedidoPendente03Ultimo() {
    window.scrollTo(0, 0);
    try {
      const clienteIdLS = JSON.parse(
        localStorage.getItem('ClienteEscolhido') || '0'
      );
      const clienteNomeLS = String(
        localStorage.getItem('ClienteNome') || ''
      );
      const filialLS = String(localStorage.getItem('PedidoInfoFilial') || '');
      const pedidoIdLS = Number(
        localStorage.getItem('PedidoSelecionadoId') || '0'
      );
      const palmpvLS = String(
        localStorage.getItem('PedidoSelecionadoPALMPV') || ''
      );
      const tipoNegLS = Number(
        localStorage.getItem('PedidoInfoTipoNegociacaoId') || '0'
      );
      setCodCliente(String(clienteIdLS));
      codCliente = String(clienteIdLS);
      setParceiroPedidoSelecionado(clienteNomeLS);
      setFilialPedidoSelecionado(filialLS);
      setCodEmpresa(filialLS);
      codEmpresa = filialLS;
      if (!idPedidoSelecionado || idPedidoSelecionado == 0) {
        setIdPedidoSelecionado(pedidoIdLS);
        idPedidoSelecionado = pedidoIdLS;
      }
      if (!palMPVEscolhido || palMPVEscolhido == '') {
        setpalMPVEscolhido(palmpvLS);
        palMPVEscolhido = palmpvLS;
      }
      if (tipoNegLS > 0) {
        setTipoNegociacaoPedidoSelecionadoId(tipoNegLS);
        setTipoNegocia(String(tipoNegLS));
        tipoNegocia = String(tipoNegLS);
        setCondPagtoManual(true);
        const opt = OptinosNegocia.find(
          (o) => String(o.value) === String(tipoNegLS)
        );
        if (opt?.label) {
          setDescTipo(opt.label);
          descTipo = opt.label;
        } else {
          const labelSeed =
            tipoNegociacaoPedidoSelecionado ||
            descTipo ||
            'Selecionado';
          const novo = { value: String(tipoNegLS), label: labelSeed };
          if (!OptinosNegocia.some((o) => String(o.value) === String(tipoNegLS))) {
            const novos = [novo, ...OptinosNegocia];
            setOptinosNegocia(novos);
            OptinosNegocia = novos;
          }
          if (!descTipo) {
            setDescTipo(labelSeed);
            descTipo = labelSeed;
          }
        }
      }
    } catch {}
    setEditando(true);
    editando = true;
    setEditandoRascunho(true);
    editandoRascunho = true;
    setEditandoPedido(true);
    GetPedidoEditar03();
  }
  async function GetPedidoEditar03() {
    console.log('codigo ClientesBD', codCliente);
    const vendedor = Number(usuario.username);
    if (!isOnline) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction(
          ['cabecalhoPedidoVenda', 'tipoNegociacao', 'parceiro'],
          'readonly'
        );
        const store = transaction.objectStore('cabecalhoPedidoVenda');
        const parceiroStore = transaction.objectStore('parceiro');
        const tipoNegociacaoStore = transaction.objectStore('tipoNegociacao');
        const cabecalho = await store.getAll();

        const cabecalhoFilterId: ICabecalho2[] = cabecalho.filter(
          (item) => item.id == idPedidoSelecionado
        );
        GetTipNeg(Number(codCliente));
        if (
          statusPedidoSelecionado == 'Não Enviado' ||
          statusPedidoSelecionado == 'Pendente' ||
          statusPedidoSelecionado == 'Rascunho' ||
          statusPedidoSelecionado == 'Falhou'
        ) {
          setCabecalhoId(cabecalhoFilterId[0].id);
          cabecalgoId = cabecalhoFilterId[0].id;
          setnumPedido(cabecalhoFilterId[0].palMPV);
          numPedido = cabecalhoFilterId[0].palMPV;
          setDataPedidoId(cabecalhoFilterId[0].data);
          dataPedidoId = cabecalhoFilterId[0].data;
        } else {
          const pal = gerarPalMPVComData(dataFormarPedido);
          setnumPedido(pal);
          numPedido = pal;
          NumeroNovoPedido();
        }
        const parceiroData = await parceiroStore.get(Number(codCliente));
        const tiponegociacaoData = await tipoNegociacaoStore.get(
          Number(parceiroData?.tipoNegociacao)
        );

        setTipoNegocia(String(cabecalhoFilterId[0].tipoNegociacaoId));
        tipoNegocia = String(cabecalhoFilterId[0].tipoNegociacaoId);
        setCondPagtoManual(true);
        setObservacao(cabecalhoFilterId[0].observacao);
        observacao = cabecalhoFilterId[0].observacao;
        setCodEmpresa(String(cabecalhoFilterId[0].filial));
        codEmpresa = String(cabecalhoFilterId[0].filial);
        setFilialPedidoSelecionado(cabecalhoFilterId[0].filial);
        filialPedidoSelecionado = cabecalhoFilterId[0].filial;
        setParceiroPedidoSelecionadoId(cabecalhoFilterId[0].parceiroId);
        parceiroPedidoSelecionadoId = cabecalhoFilterId[0].parceiroId;
        setParceiroPedidoSelecionado(
          String(localStorage.getItem('ClienteNome') || '')
        );
        setSomaTotal(cabecalhoFilterId[0].valor);
        somaTotal = cabecalhoFilterId[0].valor;
        console.log('data atual 2', cabecalhoFilterId[0].dataEntrega);
        console.log('data pedido', cabecalhoFilterId[0].data);
        setDataentrega(cabecalhoFilterId[0].dataEntrega.substring(0, 10));
        dataEntrega = cabecalhoFilterId[0].dataEntrega.substring(0, 10);
        setPagina(1);
        pagina = 1;
        setFilter(false);
        filter = false;
        await GetTabelaPreco();
        await GetiTensTabelaPrecoDuplicada();
        setPesquisaPedido(false);
        pesquisaPedido = false;
        setTipoNegociacaoPedidoSelecionadoId(
          Number(cabecalhoFilterId[0].tipoNegociacaoId)
        );
        setTipoNegociacaoPedidoSelecionado(
          String(tiponegociacaoData?.descricao || '')
        );
      } catch (error) {
        setLoading(false);
        console.log('Ocorreu um erro', error);
      }
    } else {
      console.log("entrou pra testar")
      const abrirViaListaNaoEnviado =
        String(localStorage.getItem('@Portal/PedidoEmDigitacao') || '') ===
        'true';
      if (abrirViaListaNaoEnviado) {
        const pal = String(palMPVEscolhido || localStorage.getItem('PedidoSelecionadoPALMPV') || '');
        await api
          .get(`/api/CabecalhoPedidoVenda/palmpv/${pal}`)
          .then(async (resp) => {
            const cab = resp?.data?.cabecalho ?? resp?.data ?? {};
            GetTipNeg(Number(codCliente));
            if (
              statusPedidoSelecionado == 'Não Enviado' ||
              statusPedidoSelecionado == 'Pendente' ||
              statusPedidoSelecionado == 'Rascunho' ||
              statusPedidoSelecionado == 'Falhou'
            ) {
              setCabecalhoId(cab?.id);
              cabecalgoId = cab?.id;
              setnumPedido(cab?.palMPV);
              numPedido = cab?.palMPV;
              setDataPedidoId(cab?.data);
              dataPedidoId = cab?.data;
            } else {
              const pal = gerarPalMPVComData(dataFormarPedido);
              setnumPedido(pal);
              numPedido = pal;
              NumeroNovoPedido();
            }
            setTipoNegocia(String(cab?.tipoNegociacaoId));
            tipoNegocia = cab?.tipoNegociacaoId;
            setCondPagtoManual(true);
            setObservacao(cab?.observacao);
            observacao = cab?.observacao;
            setCodEmpresa(String(cab?.filial));
            codEmpresa = String(cab?.filial);
            setFilialPedidoSelecionado(cab?.filial);
            filialPedidoSelecionado = cab?.filial;
            setParceiroPedidoSelecionadoId(cab?.parceiroId);
            parceiroPedidoSelecionadoId = cab?.parceiroId;
            setParceiroPedidoSelecionado(
              String(localStorage.getItem('ClienteNome') || '')
            );
            setSomaTotal(cab?.valor);
            somaTotal = cab?.valor;
            setDataentrega(String(cab?.dataEntrega || '').substring(0, 10));
            dataEntrega = String(cab?.dataEntrega || '').substring(0, 10);
            setPagina(1);
            pagina = 1;
            setFilter(false);
            filter = false;
            await GetTabelaPreco();
            setPesquisaPedido(false);
            pesquisaPedido = false;
            setTipoNegociacaoPedidoSelecionadoId(
              Number(cab?.tipoNegociacaoId || 0)
            );
            const itensVindoGet: iItemPedidoVenda[] =
              (Array.isArray(resp?.data?.itens) ? resp?.data?.itens : []) as any;
            setItensPedidoSelecionadoList(itensVindoGet);
            itensPedidoSelecionadoList = itensVindoGet;
          setItensPedidoSelecionado(itensVindoGet || []);
          itensPedidoSelecionado = itensVindoGet || [];
            const novosItensAPI: IItensArrayPedido[] = [];
            itensVindoGet.forEach((item) => {
              const novoItem: IItensArrayPedido = {
                vendedorId: (item as any).vendedorId,
                palMPV: (item as any).palMPV,
                produtoId: (item as any).produtoId,
                descProduto: (item as any)?.produto?.nome,
                quant: (item as any).quant,
                valUnit: (item as any).valUnit,
                valTotal: (item as any).valTotal,
                unidade: (item as any)?.produto?.tipoUnid,
                produto: {
                  nome: (item as any)?.produto?.nome,
                  conv: (item as any)?.produto?.conv,
                  aliIpi: (item as any)?.produto?.aliIpi,
                  tipoUnid: (item as any)?.produto?.tipoUnid,
                  tipoUnid2: (item as any)?.produto?.tipoUnid2,
                },
              };
              novosItensAPI.push(novoItem);
            });
            const novoArrayPedidoAPI: IItensArrayPedido[] = [...novosItensAPI];
            setIArrayPedido(novoArrayPedidoAPI);
            setIArrayPedidoValor(novoArrayPedidoAPI);
            arrayPedidoValor = novoArrayPedidoAPI;
            setItensDoPedido(novoArrayPedidoAPI.length);
            itensDoPedido = novoArrayPedidoAPI.length;
            console.log(
              'Mobile via modal: arrayPedido preenchido',
              novoArrayPedidoAPI.length,
              'isMobile:',
              isMobile
            );
            if (
              statusPedidoSelecionado == 'Não Enviado' ||
              statusPedidoSelecionado == 'Rascunho' ||
              statusPedidoSelecionado == 'Falhou'
            ) {
              GetItensPedidoEdit();
            } else {
              GetItensPedidoEditDuplicate();
            }
            setShowMensageLoadingDup(false);
          })
          .catch(() => {
            setShowMensageLoadingDup(false);
          });
        return;
      }
      const pal = String(palMPVEscolhido || localStorage.getItem('PedidoSelecionadoPALMPV') || '');
      await api
        .get(`/api/CabecalhoPedidoVenda/palmpv/${pal}`)
        .then(async (response) => {
          const cab = response?.data?.cabecalho ?? response?.data ?? {};
          console.log('pedido de venda a editar', response.data);
          GetTipNeg(Number(codCliente));
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            setCabecalhoId(cab?.id);
            cabecalgoId = cab?.id;
            setnumPedido(cab?.palMPV);
            numPedido = cab?.palMPV;
            setDataPedidoId(cab?.data);
            dataPedidoId = cab?.data;
          } else {
            const pal = gerarPalMPVComData(dataFormarPedido);
            setnumPedido(pal);
            numPedido = pal;
            NumeroNovoPedido();
          }

          setTipoNegocia(String(cab?.tipoNegociacaoId));
          tipoNegocia = cab?.tipoNegociacaoId;
        setCondPagtoManual(true);
          setObservacao(cab?.observacao);
          observacao = cab?.observacao;
          setCodEmpresa(String(cab?.filial));
          codEmpresa = String(cab?.filial);
          setFilialPedidoSelecionado(cab?.filial);
          filialPedidoSelecionado = cab?.filial;
          setParceiroPedidoSelecionadoId(cab?.parceiroId);
          parceiroPedidoSelecionadoId = cab?.parceiroId;
          setParceiroPedidoSelecionado(
            String(localStorage.getItem('ClienteNome') || '')
          );
          setSomaTotal(cab?.valor);
          somaTotal = cab?.valor;
          console.log('data atual 2', cab?.dataEntrega);
          console.log('data pedido', cab?.data);
          setDataentrega(String(cab?.dataEntrega || '').substring(0, 10));
          dataEntrega = String(cab?.dataEntrega || '').substring(0, 10);
          setPagina(1);
          pagina = 1;
          setFilter(false);
          filter = false;
          await GetTabelaPreco();
          setPesquisaPedido(false);
          pesquisaPedido = false;
          setTipoNegociacaoPedidoSelecionadoId(
            Number(cab?.tipoNegociacaoId || 0)
          );
          setTipoNegociacaoPedidoSelecionado(String(tipoNegociacaoPedidoSelecionado || ''));
          setPagina(1);
          pagina = 1;
          setFilter(false);
          filter = false;
          await GetTabelaPreco();
          const itensVindoGet: iItemPedidoVenda[] =
            (Array.isArray(response?.data?.itens) ? response?.data?.itens : []) as any;
          setItensPedidoSelecionadoList(itensVindoGet);
          itensPedidoSelecionadoList = itensVindoGet;
          setItensPedidoSelecionado(itensVindoGet || []);
          itensPedidoSelecionado = itensVindoGet || [];
          const novosItensAPI: IItensArrayPedido[] = [];
          itensVindoGet.forEach((item) => {
            const novoItem: IItensArrayPedido = {
              vendedorId: item.vendedorId,
              palMPV: item.palMPV,
              produtoId: item.produtoId,
              descProduto: item.produto?.nome,
              quant: item.quant,
              valUnit: item.valUnit,
              valTotal: item.valTotal,
              unidade: item.produto?.tipoUnid,
              produto: {
                nome: item.produto?.nome,
                conv: item.produto?.conv,
                aliIpi: item.produto?.aliIpi,
                tipoUnid: item.produto?.tipoUnid,
                tipoUnid2: item.produto?.tipoUnid2,
              },
            };
            novosItensAPI.push(novoItem);
          });
          const novoArrayPedidoAPI: IItensArrayPedido[] = [...novosItensAPI];
          setIArrayPedido(novoArrayPedidoAPI);
          setIArrayPedidoValor(novoArrayPedidoAPI);
          arrayPedidoValor = novoArrayPedidoAPI;
          setItensDoPedido(novoArrayPedidoAPI.length);
          itensDoPedido = novoArrayPedidoAPI.length;
          console.log(
            'Mobile online padrão: arrayPedido preenchido',
            novoArrayPedidoAPI.length,
            'isMobile:',
            isMobile
          );
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Pendente' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            GetItensPedidoEdit();
          } else {
            GetItensPedidoEditDuplicate();
          }
          setShowMensageLoadingDup(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
          setShowMensageLoadingDup(false);
        });
    }
  }

  //=============================================================================

  async function EditarPedidoPendente() {
    window.scrollTo(0, 0);
    
    try {
      console.log('entrou pendente 03')
      const editAllowed =
        statusPedidoSelecionado == 'Não Enviado' ||
        statusPedidoSelecionado == 'Pendente' ||
        statusPedidoSelecionado == 'Rascunho' ||
        statusPedidoSelecionado == 'Falhou';
      const clienteIdLS = JSON.parse(
        localStorage.getItem('ClienteEscolhido') || '0'
      );
      const clienteNomeLS = String(
        localStorage.getItem('ClienteNome') || ''
      );
      const filialLS = String(localStorage.getItem('PedidoInfoFilial') || '');
      const pedidoIdLS = Number(
        localStorage.getItem('PedidoSelecionadoId') || '0'
      );
      const palmpvLS = String(
        localStorage.getItem('PedidoSelecionadoPALMPV') || ''
      );
      const tipoNegLS = Number(
        localStorage.getItem('PedidoInfoTipoNegociacaoId') || '0'
      );
      const obsLS = String(localStorage.getItem('PedidoInfoObservacao') || '');
      const clienteIdFinal =
        Number(clienteIdLS) > 0 ? Number(clienteIdLS) : Number(parceiroPedidoSelecionadoId || 0);
      const clienteNomeFinal = String(clienteNomeLS || parceiroPedidoSelecionado || '');
      setCodCliente(String(clienteIdFinal || '0'));
      codCliente = String(clienteIdFinal || '0');
      setParceiroPedidoSelecionado(clienteNomeFinal);
      try {
        if (clienteIdFinal > 0) {
          localStorage.setItem('ClienteEscolhido', String(clienteIdFinal));
        }
        if (clienteNomeFinal) {
          localStorage.setItem('ClienteNome', String(clienteNomeFinal));
        }
      } catch {}
      setFilialPedidoSelecionado(filialLS);
      if (filialLS) {
        await applyEmpresaSelection(filialLS);
      } else {
        setCodEmpresa(filialLS);
        codEmpresa = filialLS;
      }
      let obsFinal = String(obsLS || '').trim();
      if (!obsFinal) {
        obsFinal = String(observacaoPedidoSelecionado || '').trim();
      }
      if (!obsFinal) {
        try {
          const db = await openDB<PgamobileDB>('pgamobile', versao);
          const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
          const store = transaction.objectStore('cabecalhoPedidoVenda');
          const todosCab = await store.getAll();
          const palAlvo = String(palmpvLS || palMPVEscolhido || '').trim();
          const cab = (todosCab as any[]).find((c: any) => {
            if (palAlvo && String(c?.palMPV || '').trim() === palAlvo) return true;
            if (pedidoIdLS > 0 && Number(c?.id || 0) === Number(pedidoIdLS)) return true;
            return false;
          });
          obsFinal = String(
            cab?.observacao ??
              cab?.Observacao ??
              cab?.observacaoPedido ??
              cab?.observacaoPedidoVenda ??
              cab?.Obs ??
              cab?.obs ??
              ''
          ).trim();
        } catch {}
      }
      setObservacao(obsFinal);
      observacao = obsFinal;
      try {
        localStorage.setItem('PedidoInfoObservacao', String(obsFinal || ''));
      } catch {}
      if (editAllowed) {
        if (palmpvLS) {
          setnumPedido(palmpvLS);
          numPedido = palmpvLS;
        }
        if (!idPedidoSelecionado || idPedidoSelecionado == 0) {
          setIdPedidoSelecionado(pedidoIdLS);
          idPedidoSelecionado = pedidoIdLS;
        }
        if (!palMPVEscolhido || palMPVEscolhido == '') {
          setpalMPVEscolhido(palmpvLS);
          palMPVEscolhido = palmpvLS;
        }
      } else {
        // Duplicação: não levar ID nem PALMPV
        setIdPedidoSelecionado(0);
        idPedidoSelecionado = 0;
        setpalMPVEscolhido('');
        palMPVEscolhido = '';
      }
      if (tipoNegLS > 0) {
        setTipoNegociacaoPedidoSelecionadoId(tipoNegLS);
        setTipoNegocia(String(tipoNegLS));
        tipoNegocia = String(tipoNegLS);
        setCondPagtoManual(true);
        const opt = OptinosNegocia.find(
          (o) => String(o.value) === String(tipoNegLS)
        );
        if (opt?.label) {
          setDescTipo(opt.label);
          descTipo = opt.label;
        } else {
          const labelSeed =
            tipoNegociacaoPedidoSelecionado ||
            descTipo ||
            'Selecionado';
          const novo = { value: String(tipoNegLS), label: labelSeed };
          if (!OptinosNegocia.some((o) => String(o.value) === String(tipoNegLS))) {
            const novos = [novo, ...OptinosNegocia];
            setOptinosNegocia(novos);
            OptinosNegocia = novos;
          }
          if (!descTipo) {
            setDescTipo(labelSeed);
            descTipo = labelSeed;
          }
        }
      }
      console.log('entrou pendente 0333')
    } catch {}
    setPesquisaPedido(false);
    pesquisaPedido = false;
    setRealizandopedido(true);
    setEditando(true);
    editando = true;
    setEditandoRascunho(true);
    editandoRascunho = true;
    setEditandoPedido(true);
    GetPedidoEditar();
  }
  async function GetPedidoEditar() {
    console.log("entrou pra editar o pedido")
    const vendedor = Number(usuario.username);
    const abrirViaListaNaoEnviado =
      String(localStorage.getItem('@Portal/PedidoEmDigitacao') || '') ===
      'true';
    if (
      abrirViaListaNaoEnviado &&
      Array.isArray(itensPedidoSelecionadoList) &&
      filtrarItensAtivosLista(itensPedidoSelecionadoList as any).length > 0
    ) {
      try {
        const obsLS = String(localStorage.getItem('PedidoInfoObservacao') || '');
        const palmpvLS = String(localStorage.getItem('PedidoSelecionadoPALMPV') || '');
        const filialLS = String(localStorage.getItem('PedidoInfoFilial') || '');
        const editAllowed =
          statusPedidoSelecionado == 'Não Enviado' ||
          statusPedidoSelecionado == 'Pendente' ||
          statusPedidoSelecionado == 'Rascunho' ||
          statusPedidoSelecionado == 'Falhou';
        const obsSeed = String(obsLS || observacaoPedidoSelecionado || '').trim();
        if (obsSeed) {
          setObservacao(obsSeed);
          observacao = obsSeed;
        } else {
          try {
            const db = await openDB<PgamobileDB>('pgamobile', versao);
            const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
            const store = transaction.objectStore('cabecalhoPedidoVenda');
            const todosCab = await store.getAll();
            const cab = (todosCab as any[]).find(
              (c: any) => String(c?.palMPV || '').trim() === String(palmpvLS || palMPVEscolhido || '').trim()
            );
            const obsDb = String(
              cab?.observacao ??
                cab?.Observacao ??
                cab?.observacaoPedido ??
                cab?.observacaoPedidoVenda ??
                cab?.Obs ??
                cab?.obs ??
                ''
            ).trim();
            if (obsDb) {
              setObservacao(obsDb);
              observacao = obsDb;
              try {
                localStorage.setItem('PedidoInfoObservacao', String(obsDb));
              } catch {}
            }
          } catch {}
        }
        if (palmpvLS) {
          if (editAllowed) {
            setnumPedido(palmpvLS);
            numPedido = palmpvLS;
          } else {
            const pal = gerarPalMPVComData(dataFormarPedido);
            setnumPedido(pal);
            numPedido = pal;
          }
        } else if (dataFormarPedido) {
          const pal = gerarPalMPVComData(dataFormarPedido);
          setnumPedido(pal);
          numPedido = pal;
        }
        if (filialLS) {
          setCodEmpresa(filialLS);
          codEmpresa = filialLS;
          setFilialPedidoSelecionado(filialLS);
          filialPedidoSelecionado = filialLS;
        }
        setPagina(1);
        pagina = 1;
        setFilter(false);
        filter = false;
        await GetTabelaPreco();
        await GetiTensTabelaPrecoDuplicada();
        setPesquisaPedido(false);
        pesquisaPedido = false;
        const novosItensAPI: IItensArrayPedido[] = [];
        itensPedidoSelecionadoListAtivos.forEach((item: any) => {
          const novoItem: IItensArrayPedido = {
            vendedorId: item.vendedorId,
            palMPV: item.palMPV,
            produtoId: item.produtoId,
            descProduto: item.produto?.nome || item.descProduto,
            quant: item.quant,
            valUnit: item.valUnit,
            valTotal: item.valTotal,
            unidade: item.produto?.tipoUnid || item.unidade,
            produto: {
              nome: item.produto?.nome || item.descProduto,
              conv: item.produto?.conv,
              aliIpi: item.produto?.aliIpi,
              tipoUnid: item.produto?.tipoUnid || item.unidade,
              tipoUnid2: item.produto?.tipoUnid2,
            },
          };
          novosItensAPI.push(novoItem);
        });
        const novoArrayPedidoAPI: IItensArrayPedido[] = [...novosItensAPI];
        setIArrayPedido(novoArrayPedidoAPI);
        setIArrayPedidoValor(novoArrayPedidoAPI);
        arrayPedidoValor = novoArrayPedidoAPI;
        setItensDoPedido(novoArrayPedidoAPI.length);
        itensDoPedido = novoArrayPedidoAPI.length;
        if (
          statusPedidoSelecionado == 'Não Enviado' ||
          statusPedidoSelecionado == 'Rascunho' ||
          statusPedidoSelecionado == 'Falhou'
        ) {
          GetItensPedidoEdit();
        } else {
          GetItensPedidoEditDuplicate();
        }
        setShowMensageLoadingDup(false);
        return;
      } catch {
        setShowMensageLoadingDup(false);
      }
    }
    if (isMobile) {
      const abrirViaListaNaoEnviado =
        String(localStorage.getItem('@Portal/PedidoEmDigitacao') || '') ===
        'true';
      console.log(
        'GetPedidoEditar mobile: abrirViaListaNaoEnviado',
        abrirViaListaNaoEnviado,
        'isOnline',
        isOnline,
        'idPedidoSelecionado',
        idPedidoSelecionado
      );
      if (abrirViaListaNaoEnviado) {
        try {
          const pal = String(
            palMPVEscolhido ||
              localStorage.getItem('PedidoSelecionadoPALMPV') ||
              ''
          ).trim();
          console.log(
            'Mobile via modal: iniciando GET cabecalho',
            pal
          );
          const resp = await api.get(
            `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(pal))}`
          );
          const response = resp?.data?.cabecalho ?? resp?.data ?? {};
          console.log('Mobile via modal: cabecalho OK', response?.palMPV);
          GetTipNeg(Number(codCliente));
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            setCabecalhoId(response?.id);
            cabecalgoId = response?.id;
            setnumPedido(response.palMPV);
            numPedido = response.palMPV;
            setDataPedidoId(response?.data);
            dataPedidoId = response?.data;
          } else {
            const pal = gerarPalMPVComData(dataFormarPedido);
            setnumPedido(pal);
            numPedido = pal;
            NumeroNovoPedido();
          }
          setTipoNegocia(String(response?.tipoNegociacaoId));
          tipoNegocia = response?.tipoNegociacaoId;
          setObservacao(response?.observacao);
          try {
            localStorage.setItem(
              'PedidoInfoObservacao',
              String(response?.observacao || '')
            );
          } catch {}
          observacao = response?.observacao;
          setCodEmpresa(String(response?.filial));
          codEmpresa = String(response?.filial);
          setCodCliente(String(response?.parceiroId || '0'));
          codCliente = String(response?.parceiroId || '0');
          setFilialPedidoSelecionado(response?.filial);
          filialPedidoSelecionado = response?.filial;
          setParceiroPedidoSelecionadoId(response?.parceiroId);
          parceiroPedidoSelecionadoId = response?.parceiroId;
          setParceiroPedidoSelecionado(
            String(localStorage.getItem('ClienteNome') || '')
          );
          setSomaTotal(response.valor);
          somaTotal = response.valor;
          setDataentrega(response?.dataEntrega.substring(0, 10));
          dataEntrega = response?.dataEntrega.substring(0, 10);
          setFilter(false);
          filter = false;
          await applyEmpresaSelection(String(response?.filial || ''));
          await GetiTensTabelaPrecoDuplicada();
          setPesquisaPedido(false);
          pesquisaPedido = false;
          const round2 = (n: number) =>
            Math.round(Number(n || 0) * 100) / 100;
          let itensUsarApi: iItemPedidoVenda[] = Array.isArray((response as any)?.itens)
            ? (((response as any)?.itens as any[]) as iItemPedidoVenda[])
            : [];
          if ((Array.isArray(itensUsarApi) ? itensUsarApi.length : 0) === 0) {
            try {
              const itensResp = await api.get(
                `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${encodeURIComponent(
                  String(response?.palMPV || pal)
                )}`
              );
              const itensVindoGet: iItemPedidoVenda[] = itensResp?.data?.data ?? [];
              itensUsarApi = itensVindoGet;
              if ((Array.isArray(itensVindoGet) ? itensVindoGet.length : 0) === 0) {
                try {
                  const itensResp2 = await api.get(
                    `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${response?.palMPV}`
                  );
                  const itensVindoGet2: iItemPedidoVenda[] =
                    itensResp2?.data?.data ?? [];
                  itensUsarApi = itensVindoGet2;
                } catch {}
              }
            } catch {}
          }
          const itensFiltradosApi = (Array.isArray(itensUsarApi) ? itensUsarApi : []).filter(
            (item: any) =>
              Number(item?.valUnit || 0) > 0 && Number(item?.valTotal || 0) > 0
          ) as iItemPedidoVenda[];
          const somaApi = (itensFiltradosApi || []).reduce(
            (acc: number, item: any) => acc + Number(item?.valTotal || 0),
            0
          );
          const bateApi =
            Math.abs(round2(somaApi) - round2(Number(response?.valor || 0))) < 0.01;
          let itensUsar: iItemPedidoVenda[] = itensFiltradosApi;
          if (!bateApi) {
            try {
              const db = await openDB<PgamobileDB>('pgamobile', versao);
              const store = db.transaction('itemPedidoVenda', 'readonly').objectStore('itemPedidoVenda');
              const alvo = String(response?.palMPV || pal).trim();
              let itensLocal: any[] = [];
              try {
                const idx = (store as any).index('palMPV');
                itensLocal = (await idx.getAll(alvo as any)) as any[];
              } catch {
                const todosItens = await store.getAll();
                itensLocal = (todosItens as any[]).filter(
                  (it: any) =>
                    String(it?.palMPV || it?.palmpv || '').trim() === alvo
                );
              }
              const itensLocalFiltrados = itensLocal.filter(
                (item: any) =>
                  Number(item?.valUnit || 0) > 0 && Number(item?.valTotal || 0) > 0
              ) as iItemPedidoVenda[];
              const somaLocal = (itensLocalFiltrados || []).reduce(
                (acc: number, item: any) => acc + Number(item?.valTotal || 0),
                0
              );
              const bateLocal =
                Math.abs(round2(somaLocal) - round2(Number(response?.valor || 0))) < 0.01;
              if (bateLocal && itensLocalFiltrados.length > 0) {
                itensUsar = itensLocalFiltrados;
              }
            } catch {}
          }
          setItensPedidoSelecionadoList(itensUsar);
          itensPedidoSelecionadoList = itensUsar;
          setItensPedidoSelecionado(itensUsar || []);
          itensPedidoSelecionado = itensUsar || [];
          const novosItensAPI: IItensArrayPedido[] = [];
          itensUsar.forEach((item) => {
            const novoItem: IItensArrayPedido = {
              vendedorId: item.vendedorId,
              palMPV: item.palMPV,
              produtoId: item.produtoId,
              descProduto: item.produto?.nome,
              quant: item.quant,
              valUnit: item.valUnit,
              valTotal: item.valTotal,
              unidade: item.produto?.tipoUnid,
              produto: {
                nome: item.produto?.nome,
                conv: item.produto?.conv,
                aliIpi: item.produto?.aliIpi,
                tipoUnid: item.produto?.tipoUnid,
                tipoUnid2: item.produto?.tipoUnid2,
              },
            };
            novosItensAPI.push(novoItem);
          });
          const novoArrayPedidoAPI: IItensArrayPedido[] = [...novosItensAPI];
          setIArrayPedido(novoArrayPedidoAPI);
          setIArrayPedidoValor(novoArrayPedidoAPI);
          arrayPedidoValor = novoArrayPedidoAPI;
          setItensDoPedido(novoArrayPedidoAPI.length);
          itensDoPedido = novoArrayPedidoAPI.length;
          console.log(
            'Mobile via modal: arrayPedido preenchido',
            novoArrayPedidoAPI.length,
            'isMobile:',
            isMobile
          );
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Pendente' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            GetItensPedidoEdit();
          } else {
            GetItensPedidoEditDuplicate();
          }
          setShowMensageLoadingDup(false);
          return;
        } catch {
          setShowMensageLoadingDup(false);
        }
      }
      if (!isOnline) {
        try {
          const db = await openDB<PgamobileDB>('pgamobile', versao);
          const transaction = db.transaction(
            ['cabecalhoPedidoVenda', 'tipoNegociacao', 'parceiro'],
            'readonly'
          );
          const store = transaction.objectStore('cabecalhoPedidoVenda');
          const parceiroStore = transaction.objectStore('parceiro');
          const tipoNegociacaoStore = transaction.objectStore('tipoNegociacao');
          const cabecalho = await store.getAll();

          const cabecalhoFilterId: ICabecalho2[] = cabecalho.filter(
            (item) => item.id == idPedidoSelecionado
          );
          GetTipNeg(Number(codCliente));
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Pendente' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            setCabecalhoId(cabecalhoFilterId[0].id);
            cabecalgoId = cabecalhoFilterId[0].id;
            setnumPedido(cabecalhoFilterId[0].palMPV);
            numPedido = cabecalhoFilterId[0].palMPV;
            setDataPedidoId(cabecalhoFilterId[0].data);
            dataPedidoId = cabecalhoFilterId[0].data;
          } else {
            const pal = gerarPalMPVComData(dataFormarPedido);
            setnumPedido(pal);
            numPedido = pal;
            NumeroNovoPedido();
          }
          const parceiroData = await parceiroStore.get(Number(codCliente));
          const tiponegociacaoData = await tipoNegociacaoStore.get(
            Number(parceiroData?.tipoNegociacao)
          );

          setTipoNegocia(String(cabecalhoFilterId[0].tipoNegociacaoId));
          tipoNegocia = String(cabecalhoFilterId[0].tipoNegociacaoId);
          setObservacao(cabecalhoFilterId[0].observacao);
          observacao = cabecalhoFilterId[0].observacao;
          setCodEmpresa(String(cabecalhoFilterId[0].filial));
          codEmpresa = String(cabecalhoFilterId[0].filial);
          setSomaTotal(cabecalhoFilterId[0].valor);
          somaTotal = cabecalhoFilterId[0].valor;
          console.log('data atual 2', cabecalhoFilterId[0].dataEntrega);
          console.log('data pedido', cabecalhoFilterId[0].data);
          setDataentrega(cabecalhoFilterId[0].dataEntrega.substring(0, 10));
          dataEntrega = cabecalhoFilterId[0].dataEntrega.substring(0, 10);
          GetTabelaPreco();
          GetiTensTabelaPrecoDuplicada();
          setPesquisaPedido(false);
          pesquisaPedido = false;
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            GetItensPedidoEdit();
          } else {
            GetItensPedidoEditDuplicate();
          }
        } catch (error) {
          setLoading(false);
          console.log('Ocorreu um erro', error);
        }
      } else {
        console.log(
          'Mobile online padrão: iniciando GET cabecalho',
          idPedidoSelecionado
        );
        const pal = String(
          palMPVEscolhido ||
            localStorage.getItem('PedidoSelecionadoPALMPV') ||
            ''
        ).trim();
        await api
          .get(
            `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(pal))}`
          )
          .then(async (resp) => {
            const response = resp?.data?.cabecalho ?? resp?.data ?? {};
            console.log('Mobile online padrão: cabecalho OK', response?.palMPV);
            GetTipNeg(Number(codCliente));
            if (
              statusPedidoSelecionado == 'Não Enviado' ||
              statusPedidoSelecionado == 'Pendente' ||
              statusPedidoSelecionado == 'Rascunho' ||
              statusPedidoSelecionado == 'Falhou'
            ) {
              setCabecalhoId(response?.id);
              cabecalgoId = response?.id;
              setnumPedido(response.palMPV);
              numPedido = response.palMPV;
              setDataPedidoId(response?.data);
              dataPedidoId = response?.data;
            } else {
              const pal = gerarPalMPVComData(dataFormarPedido);
              setnumPedido(pal);
              numPedido = pal;
              NumeroNovoPedido();
            }
            setTipoNegocia(String(response?.tipoNegociacaoId));
            tipoNegocia = response?.tipoNegociacaoId;
            setObservacao(response?.observacao);
            try {
              localStorage.setItem(
                'PedidoInfoObservacao',
                String(response?.observacao || '')
              );
            } catch {}
            observacao = response?.observacao;
            setCodEmpresa(String(response?.filial));
            codEmpresa = String(response?.filial);
            setFilialPedidoSelecionado(response?.filial);
            filialPedidoSelecionado = response?.filial;
            setParceiroPedidoSelecionadoId(response?.parceiroId);
            parceiroPedidoSelecionadoId = response?.parceiroId;
            setParceiroPedidoSelecionado(
              String(localStorage.getItem('ClienteNome') || '')
            );
            setSomaTotal(response.valor);
            somaTotal = response.valor;
            setDataentrega(response?.dataEntrega.substring(0, 10));
            dataEntrega = response?.dataEntrega.substring(0, 10);
            GetTabelaPreco();
            GetiTensTabelaPrecoDuplicada();
            setPesquisaPedido(false);
            pesquisaPedido = false;
            let itensUsar: iItemPedidoVenda[] = Array.isArray((response as any)?.itens)
              ? (((response as any)?.itens as any[]) as iItemPedidoVenda[])
              : [];
            if ((Array.isArray(itensUsar) ? itensUsar.length : 0) === 0) {
              try {
                const itensResp = await api.get(
                  `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${encodeURIComponent(
                    String(response?.palMPV || pal)
                  )}`
                );
                const itensVindoGet: iItemPedidoVenda[] = itensResp?.data?.data ?? [];
                console.log(
                  'Mobile online padrão: itens da API',
                  Array.isArray(itensVindoGet) ? itensVindoGet.length : 0
                );
                itensUsar = itensVindoGet;
                if ((Array.isArray(itensVindoGet) ? itensVindoGet.length : 0) === 0) {
                  try {
                    const itensResp2 = await api.get(
                      `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${response?.palMPV}`
                    );
                    const itensVindoGet2: iItemPedidoVenda[] =
                      itensResp2?.data?.data ?? [];
                    console.log(
                      'Mobile online padrão: fallback itens por palMPV',
                      Array.isArray(itensVindoGet2) ? itensVindoGet2.length : 0
                    );
                    itensUsar = itensVindoGet2;
                  } catch {}
                }
              } catch {}
            }
            setItensPedidoSelecionadoList(itensUsar);
            itensPedidoSelecionadoList = itensUsar;
            setItensPedidoSelecionado(itensUsar || []);
            itensPedidoSelecionado = itensUsar || [];
            const novosItensAPI: IItensArrayPedido[] = [];
            itensUsar.forEach((item) => {
              const novoItem: IItensArrayPedido = {
                vendedorId: item.vendedorId,
                palMPV: item.palMPV,
                produtoId: item.produtoId,
                descProduto: item.produto?.nome,
                quant: item.quant,
                valUnit: item.valUnit,
                valTotal: item.valTotal,
                unidade: item.produto?.tipoUnid,
                produto: {
                  nome: item.produto?.nome,
                  conv: item.produto?.conv,
                  aliIpi: item.produto?.aliIpi,
                  tipoUnid: item.produto?.tipoUnid,
                  tipoUnid2: item.produto?.tipoUnid2,
                },
              };
              novosItensAPI.push(novoItem);
            });
            const novoArrayPedidoAPI: IItensArrayPedido[] = [...novosItensAPI];
            setIArrayPedido(novoArrayPedidoAPI);
            setIArrayPedidoValor(novoArrayPedidoAPI);
            arrayPedidoValor = novoArrayPedidoAPI;
            setItensDoPedido(novoArrayPedidoAPI.length);
            itensDoPedido = novoArrayPedidoAPI.length;
            console.log(
              'Mobile online padrão: arrayPedido preenchido',
              novoArrayPedidoAPI.length,
              'isMobile:',
              isMobile
            );
            if (
              statusPedidoSelecionado == 'Não Enviado' ||
              statusPedidoSelecionado == 'Pendente' ||
              statusPedidoSelecionado == 'Rascunho' ||
              statusPedidoSelecionado == 'Falhou'
            ) {
              GetItensPedidoEdit();
            } else {
              GetItensPedidoEditDuplicate();
            }
            setShowMensageLoadingDup(false);
          })
          .catch(() => {
            setShowMensageLoadingDup(false);
          });
        return;
      }
    } else {
      const pal = String(
        palMPVEscolhido || localStorage.getItem('PedidoSelecionadoPALMPV') || ''
      ).trim();
      await api
        .get(
          `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(pal))}`
        )
        .then((resp) => {
          const response = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
          console.log('pedido de venda a editarentrou', response);
          GetTipNeg(Number(codCliente));
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Pendente' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            setCabecalhoId(response?.id);
            cabecalgoId = response?.id;
            setnumPedido(response.palMPV);
            numPedido = response.palMPV;
            setDataPedidoId(response?.data);
            dataPedidoId = response?.data;
          } else {
            const pal = gerarPalMPVComData(dataFormarPedido);
            setnumPedido(pal);
            numPedido = pal;
            NumeroNovoPedido();
          }

          setTipoNegocia(String(response?.tipoNegociacaoId));
          tipoNegocia = response?.tipoNegociacaoId;
          setObservacao(response?.observacao);
          try {
            localStorage.setItem(
              'PedidoInfoObservacao',
              String(response?.observacao || '')
            );
          } catch {}
          observacao = response?.observacao;
          setCodEmpresa(String(response?.filial));
          codEmpresa = String(response?.filial);
          setSomaTotal(response.valor);
          somaTotal = response.valor;
          console.log('data atual 2', response?.dataEntrega);
          console.log('data pedido', response?.data);
          setDataentrega(response?.dataEntrega.substring(0, 10));
          dataEntrega = response?.dataEntrega.substring(0, 10);
          GetTabelaPreco();
          GetiTensTabelaPrecoDuplicada();
          setPesquisaPedido(false);
          pesquisaPedido = false;
          if (
            statusPedidoSelecionado == 'Não Enviado' ||
            statusPedidoSelecionado == 'Rascunho' ||
            statusPedidoSelecionado == 'Falhou'
          ) {
            GetItensPedidoEdit();
          } else {
            GetItensPedidoEditDuplicate();
          }
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  async function GetPedidoEditarnuvem() {
    const pal = String(
      palMPVEscolhido || localStorage.getItem('PedidoSelecionadoPALMPV') || ''
    ).trim();
    await api
      .get(
        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(pal))}`
      )
      .then((resp) => {
        const response = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
        console.log('pedido de venda a editar', response);
        if (statusPedidoSelecionado == 'Não Enviado' || statusPedidoSelecionado == 'Pendente') {
          setCabecalhoId(response?.id);
          cabecalgoId = response?.id;
          setnumPedido(response.palMPV);
          numPedido = response.palMPV;
          setDataPedidoId(response?.data);
          dataPedidoId = response?.data;
        } else {
          const pal = gerarPalMPVComData(dataFormarPedido);
          setnumPedido(pal);
          numPedido = pal;
          NumeroNovoPedido();
        }
        setTipoNegocia(String(response?.tipoNegociacaoId));
        tipoNegocia = response?.tipoNegociacaoId;
        setObservacao(response?.observacao);
        try {
          localStorage.setItem(
            'PedidoInfoObservacao',
            String(response?.observacao || '')
          );
        } catch {}
        observacao = response?.observacao;
        setCodEmpresa(String(response?.filial));
        codEmpresa = String(response?.filial);
        setSomaTotal(response.valor);
        somaTotal = response.valor;
        console.log('data atual 2', response?.dataEntrega);
        console.log('data pedido', response?.data);
        setDataentrega(response?.dataEntrega.substring(0, 10));
        dataEntrega = response?.dataEntrega.substring(0, 10);
        GetTabelaPreco();
        setPesquisaPedido(false);
        pesquisaPedido = false;
        if (statusPedidoSelecionado == 'Não Enviado' || statusPedidoSelecionado == 'Pendente') {
          GetItensPedidoEdit();
        } else {
          GetItensPedidoEditDuplicate();
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=================get rascunhos================================//
  async function GetPedidoRascunho(pedido: any, cod: any) {
    console.log('pedidooo', cod);
    const vendedor = Number(usuario.username);
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction(
        ['cabecalhoPedidoVenda', 'tipoNegociacao'],
        'readonly'
      );
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      const tipoNegStore = transaction.objectStore('tipoNegociacao');

      const cabecalho = await store.getAll();

      const cabecalhoEscolhido: ICabecalho2[] = cabecalho.filter(
        (item) => item.palMPV == pedido
      );
      console.log('cabecalho escolhidooo', cabecalhoEscolhido);

      setIdPedidoSelecionado(cabecalhoEscolhido[0].id);
      idPedidoSelecionado = cabecalhoEscolhido[0].id;
      setFilialPedidoSelecionado(cabecalhoEscolhido[0].filial);
      filialPedidoSelecionado = cabecalhoEscolhido[0].filial;
      setTipPed(cabecalhoEscolhido[0].tipPed);
      tipPed = cabecalhoEscolhido[0].tipPed;
      settipPedSelecionado(cabecalhoEscolhido[0].tipPed);
      tipPedSelecionado = cabecalhoEscolhido[0].tipPed;
      setDataEntregaPedidoSelecionado(cabecalhoEscolhido[0].dataEntrega);
      dataEntregaPedidoSelecionado = cabecalhoEscolhido[0].dataEntrega;
      setObservacaoPedidoSelecionado(cabecalhoEscolhido[0].observacao);
      observacaoPedidoSelecionado = cabecalhoEscolhido[0].observacao;
      setDataPedidoSelecionado(cabecalhoEscolhido[0].data);
      dataPedidoSelecionado = cabecalhoEscolhido[0].data;
      setNumeroPedidoSelecionado(cabecalhoEscolhido[0].palMPV);
      numeroPedidoSelecionado = cabecalhoEscolhido[0].palMPV;
      setNumeroPedidoSankhya(cabecalhoEscolhido[0].pedido);
      numeroPedidoSankhya = cabecalhoEscolhido[0].pedido;
      setStatusPedidoSelecionado(cabecalhoEscolhido[0].status);
      statusPedidoSelecionado = cabecalhoEscolhido[0].status;
      setParceiroPedidoSelecionadoId(cabecalhoEscolhido[0].parceiroId);
      parceiroPedidoSelecionadoId = cabecalhoEscolhido[0].parceiroId;
      setTipoNegociacaoPedidoSelecionadoId(
        cabecalhoEscolhido[0].tipoNegociacaoId
      );
      tipoNegociacaoPedidoSelecionadoId =
        cabecalhoEscolhido[0].tipoNegociacaoId;
      GetTipoNeg(cabecalhoEscolhido[0].tipoNegociacaoId);
      const tipoNegId = Number(cabecalhoEscolhido[0].tipoNegociacaoId);
      if (tipoNegId == 1) {
        setTipoNegociacaoPedidoSelecionado('A VISTA');
        tipoNegociacaoPedidoSelecionado = 'A VISTA';
      } else {
        const tipoNeg = await tipoNegStore.get(tipoNegId);
        console.log('tipoo neggg.............', tipoNeg);
        if (tipoNeg) {
          setTipoNegociacaoPedidoSelecionado(tipoNeg.descricao);
          tipoNegociacaoPedidoSelecionado = tipoNeg.descricao;
        }
      }

      setValorPedidoSelecionado(cabecalhoEscolhido[0].valor);
      valorPedidoSelecionado = cabecalhoEscolhido[0].valor;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Ocorreu um erro', error);
    }
  }

  //========PEDIDO DE VENDA ID MODAL============================//
  async function GetPedidoVendaIdModal(pedido: any, cod: any) {
    setpalMPVEscolhido('');
    palMPVEscolhido = '';
    setmodalList(true);
    modalList = true;
    setSucess(20);
    sucess = 20;
    setLoadingItensPedidoSelecionado(true);
    setShowlistaPedidosSelec(true);
    setIdPedidoSelecionado(0);
    idPedidoSelecionado = 0;
    setFilialPedidoSelecionado('');
    filialPedidoSelecionado = '';
    setTipPed('');
    tipPed = '';
    settipPedSelecionado('');
    tipPedSelecionado = '';
    setDataEntregaPedidoSelecionado('');
    dataEntregaPedidoSelecionado = '';
    setObservacaoPedidoSelecionado('');
    observacaoPedidoSelecionado = '';
    setDataPedidoSelecionado('');
    dataPedidoSelecionado = '';
    setNumeroPedidoSelecionado('');
    numeroPedidoSelecionado = '';
    setNumeroPedidoSankhya('');
    numeroPedidoSankhya = '';
    setStatusPedidoSelecionado('');
    statusPedidoSelecionado = '';
    setParceiroPedidoSelecionadoId(0);
    parceiroPedidoSelecionadoId = 0;
    setParceiroPedidoSelecionado('');
    parceiroPedidoSelecionado = '';
    setTipoNegociacaoPedidoSelecionadoId(0);
    tipoNegociacaoPedidoSelecionadoId = 0;
    setTipoNegociacaoPedidoSelecionado('');
    tipoNegociacaoPedidoSelecionado = '';
    setNaturezaPadraoPedidoSelecionado('');
    setValorPedidoSelecionado(0);
    valorPedidoSelecionado = 0;
    setItensPedidoSelecionadoList([]);
    itensPedidoSelecionadoList = [];
    setItensPedidoSelecionado([]);
    itensPedidoSelecionado = [];
    setPaginaItens(1);
    paginaItens = 1;
    console.log('valordo Status', statusPedidoSelecionado);
    console.log('pedidoooPalm', pedido);
    console.log('pedidoooPalm Cod', cod);
    const vendedor = Number(usuario.username);
    
    // Função auxiliar para popular estado com dados do IndexedDB
    const populateFromIndexedDB = async (cabecalhoData: ICabecalho2) => {
      try {
        try {
          localStorage.setItem('PedidoSelecionadoOrigem', 'local');
        } catch {}
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction(
          ['cabecalhoPedidoVenda', 'tipoNegociacao'],
          'readonly'
        );
        const tipoNegStore = transaction.objectStore('tipoNegociacao');
        
        setIdPedidoSelecionado(cabecalhoData.id);
        idPedidoSelecionado = cabecalhoData.id;
        setFilialPedidoSelecionado(cabecalhoData.filial);
        filialPedidoSelecionado = cabecalhoData.filial;
        setTipPed(cabecalhoData.tipPed);
        tipPed = cabecalhoData.tipPed;
        settipPedSelecionado(cabecalhoData.tipPed);
        tipPedSelecionado = cabecalhoData.tipPed;
        setDataEntregaPedidoSelecionado(cabecalhoData.dataEntrega);
        dataEntregaPedidoSelecionado = cabecalhoData.dataEntrega;
        setObservacaoPedidoSelecionado(cabecalhoData.observacao);
        observacaoPedidoSelecionado = cabecalhoData.observacao;
        setDataPedidoSelecionado(cabecalhoData.data);
        dataPedidoSelecionado = cabecalhoData.data;
        setNumeroPedidoSelecionado(cabecalhoData.palMPV);
        numeroPedidoSelecionado = cabecalhoData.palMPV;
        setNumeroPedidoSankhya(cabecalhoData.pedido);
        numeroPedidoSankhya = cabecalhoData.pedido;
        setStatusPedidoSelecionado(cabecalhoData.status);
        statusPedidoSelecionado = cabecalhoData.status;
        setParceiroPedidoSelecionadoId(cabecalhoData.parceiroId);
        parceiroPedidoSelecionadoId = cabecalhoData.parceiroId;
        setTipoNegociacaoPedidoSelecionadoId(cabecalhoData.tipoNegociacaoId);
        tipoNegociacaoPedidoSelecionadoId = cabecalhoData.tipoNegociacaoId;
        
        GetTipoNeg(cabecalhoData.tipoNegociacaoId);
        const tipoNegId = Number(cabecalhoData.tipoNegociacaoId);
        if (tipoNegId == 1) {
          setTipoNegociacaoPedidoSelecionado('A VISTA');
          tipoNegociacaoPedidoSelecionado = 'A VISTA';
        } else {
          const tipoNeg = await tipoNegStore.get(tipoNegId);
          console.log('tipoo neggg.............', tipoNeg);
          if (tipoNeg) {
            setTipoNegociacaoPedidoSelecionado(tipoNeg.descricao);
            tipoNegociacaoPedidoSelecionado = tipoNeg.descricao;
          }
        }

        setValorPedidoSelecionado(cabecalhoData.valor);
        valorPedidoSelecionado = cabecalhoData.valor;
        try {
          localStorage.setItem('PedidoSelecionadoId', String(cabecalhoData.id));
          localStorage.setItem(
            'PedidoSelecionadoPALMPV',
            String(cabecalhoData.palMPV)
          );
          localStorage.setItem('PedidoInfoFilial', String(cabecalhoData.filial));
          localStorage.setItem(
            'PedidoInfoTipoNegociacaoId',
            String(cabecalhoData.tipoNegociacaoId)
          );
          localStorage.setItem('PedidoInfoTipPed', String(cabecalhoData.tipPed));
          localStorage.setItem(
            'PedidoInfoObservacao',
            String(cabecalhoData.observacao || '')
          );
        } catch {}
        const tipoNegIdLocal = Number(cabecalhoData.tipoNegociacaoId);
        const tipoNegLocal = tipoNegIdLocal === 1 ? { descricao: 'A VISTA' } : await tipoNegStore.get(tipoNegIdLocal);
        const pedidoObj = {
          id: cabecalhoData.id,
          filial: cabecalhoData.filial,
          vendedorId: cabecalhoData.vendedorId,
          parceiroId: cabecalhoData.parceiroId,
          palMPV: cabecalhoData.palMPV,
          tipoNegociacaoId: cabecalhoData.tipoNegociacaoId,
          tipoNegociacao: {
            id: tipoNegIdLocal,
            descricao: tipoNegLocal?.descricao || ''
          },
          data: cabecalhoData.data,
          valor: cabecalhoData.valor,
          dataEntrega: cabecalhoData.dataEntrega,
          observacao: cabecalhoData.observacao,
          pedido: cabecalhoData.pedido,
          status: cabecalhoData.status
        } as any;
        setPedidoSelecao(pedidoObj);
        setCabecalhoPedido(pedidoObj);
        setIdPedidoSelecionado(cabecalhoData.id);
        idPedidoSelecionado = cabecalhoData.id;
        setpalMPVEscolhido(cabecalhoData.palMPV);
        palMPVEscolhido = cabecalhoData.palMPV;
        setPaginaItens(1);
        paginaItens = 1;
        await GetitensPedidoVendaIdLista();
        setSucess(50);
        sucess = 50;
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        setLoading(false);
        console.log('Erro ao popular do IndexedDB', error);
        throw error;
      }
    };

    const fetchFromAPIByPalmpv = async (palmpv: string) => {
      try {
        const response = await api.get(
          `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(palmpv || ''))}`
        );
        const cab = (response as any)?.data?.cabecalho ?? (response as any)?.data ?? {};
        setPedidoSelecao(cab);
        setCabecalhoPedido(cab);
        pedidoSelecao = cab;
        setIdPedidoSelecionado(cab?.id);
        idPedidoSelecionado = cab?.id;
        setFilialPedidoSelecionado(cab?.filial);
        filialPedidoSelecionado = cab?.filial;
        setTipPed(cab?.tipPed);
        tipPed = cab?.tipPed;
        settipPedSelecionado(cab?.tipPed);
        tipPedSelecionado = cab?.tipPed;
        setDataEntregaPedidoSelecionado(cab?.dataEntrega);
        dataEntregaPedidoSelecionado = cab?.dataEntrega;
        setObservacaoPedidoSelecionado(cab?.observacao);
        observacaoPedidoSelecionado = cab?.observacao;
        setDataPedidoSelecionado(cab?.data);
        dataPedidoSelecionado = cab?.data;
        setNumeroPedidoSelecionado(cab?.palMPV);
        numeroPedidoSelecionado = cab?.palMPV;
        setNumeroPedidoSankhya(cab?.pedido);
        numeroPedidoSankhya = cab?.pedido;
        setStatusPedidoSelecionado(cab?.status);
        statusPedidoSelecionado = cab?.status;
        setParceiroPedidoSelecionadoId(cab?.parceiroId);
        parceiroPedidoSelecionadoId = cab?.parceiroId;
        setTipoNegociacaoPedidoSelecionadoId(
          Number(cab?.tipoNegociacaoId || cab?.tipoNegociacao?.id || 0)
        );
        tipoNegociacaoPedidoSelecionadoId = Number(
          cab?.tipoNegociacaoId || cab?.tipoNegociacao?.id || 0
        );
        setTipoNegociacaoPedidoSelecionado(
          String(cab?.tipoNegociacao?.descricao || '')
        );
        tipoNegociacaoPedidoSelecionado = String(cab?.tipoNegociacao?.descricao || '');
        setValorPedidoSelecionado(cab?.valor);
        valorPedidoSelecionado = cab?.valor;
        setSucess(50);
        sucess = 50;
        setpalMPVEscolhido(String(cab?.palMPV || ''));
        palMPVEscolhido = String(cab?.palMPV || '');
        setPaginaItens(1);
        paginaItens = 1;
        try {
          localStorage.setItem('PedidoSelecionadoId', String(cab?.id || '0'));
          localStorage.setItem('PedidoSelecionadoPALMPV', String(cab?.palMPV || ''));
          localStorage.setItem('PedidoInfoFilial', String(cab?.filial || ''));
          localStorage.setItem(
            'PedidoInfoTipoNegociacaoId',
            String(cab?.tipoNegociacaoId || cab?.tipoNegociacao?.id || '')
          );
          localStorage.setItem('PedidoInfoTipPed', String(cab?.tipPed || ''));
          localStorage.setItem('PedidoInfoObservacao', String(cab?.observacao || ''));
          localStorage.setItem('PedidoSelecionadoOrigem', 'api');
        } catch {}
        const rawItens =
          (Array.isArray((response as any)?.data?.itens)
            ? ((response as any).data.itens as any[])
            : Array.isArray((cab as any)?.itens)
            ? (((cab as any).itens as any[]) as any[])
            : []) || [];
        const itensFinal = rawItens.filter(
          (item: any) =>
            Number(item?.valUnit || 0) > 0 && Number(item?.valTotal || 0) > 0
        ) as iItemPedidoVenda[];
        setSucess(100);
        sucess = 100;
        setItensPedidoSelecionadoList(itensFinal);
        itensPedidoSelecionadoList = itensFinal;
        setTotalPaginasItens(Math.ceil(itensFinal.length / qtdePaginaItens));
        totalPaginasItens = Math.ceil(itensFinal.length / qtdePaginaItens);
        setItensPedidoSelecionado(
          itensFinal.slice(
            (paginaItens - 1) * qtdePaginaItens,
            paginaItens * qtdePaginaItens
          ) || []
        );
        itensPedidoSelecionado =
          itensFinal.slice(
            (paginaItens - 1) * qtdePaginaItens,
            paginaItens * qtdePaginaItens
          ) || [];
        setLoadingItensPedidoSelecionado(false);
        setShowMensageLoading(false);
        setPesquisaPedido(true);
        pesquisaPedido = true;
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        setLoading(false);
        console.log('Erro ao buscar da API por palmpv', error);
        throw error;
      }
    };

    const palAlvo = String(pedido || '').trim();
    let cabLocalEncontrado: any = null;
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const store = db
        .transaction('cabecalhoPedidoVenda', 'readonly')
        .objectStore('cabecalhoPedidoVenda');
      const todos = await store.getAll();
      cabLocalEncontrado =
        (todos as any[]).find((it: any) => Number(it?.id) === Number(cod)) ||
        (todos as any[]).find((it: any) => String(it?.palMPV || '').trim() === palAlvo) ||
        null;
    } catch {}

    const sync = String(cabLocalEncontrado?.sincronizado || '').trim();

    if (!isOnline) {
      if (cabLocalEncontrado) {
        await populateFromIndexedDB(cabLocalEncontrado);
        return;
      }
      setLoading(false);
      setLoadingItensPedidoSelecionado(false);
      setShowMensageLoading(false);
      return;
    }

    if (cabLocalEncontrado && sync === 'N') {
      await populateFromIndexedDB(cabLocalEncontrado);
      return;
    }

    await fetchFromAPIByPalmpv(palAlvo);
  }
  //======Pedido de Venda Id ===================================//
  async function GetPedidoVendaIdModalApi(pedido: any, cod: any) {
    setpalMPVEscolhido('');
    palMPVEscolhido = '';
    setmodalList(true);
    modalList = true;
    setSucess(20);
    sucess = 20;
    setLoadingItensPedidoSelecionado(true);
    setItensPedidoSelecionadoList([]);
    itensPedidoSelecionadoList = [];
    setTotalPaginasItens(0);
    totalPaginasItens = 0;
    setItensPedidoSelecionado([]);
    itensPedidoSelecionado = [];
    try {
      localStorage.setItem('PedidoSelecionadoOrigem', 'api');
    } catch {}
    try {
      const resp = await api.get(`/api/CabecalhoPedidoVenda/palmpv/${pedido}`);
      const cab = resp?.data?.cabecalho ?? resp?.data ?? {};
      setPedidoSelecao(cab);
      setCabecalhoPedido(cab);
      pedidoSelecao = cab;
      setIdPedidoSelecionado(cab?.id);
      idPedidoSelecionado = cab?.id;
      setFilialPedidoSelecionado(cab?.filial);
      filialPedidoSelecionado = cab?.filial;
      setTipPed(cab?.tipPed);
      tipPed = cab?.tipPed;
      settipPedSelecionado(cab?.tipPed);
      tipPedSelecionado = cab?.tipPed;
      setDataEntregaPedidoSelecionado(cab?.dataEntrega);
      dataEntregaPedidoSelecionado = cab?.dataEntrega;
      setObservacaoPedidoSelecionado(cab?.observacao);
      observacaoPedidoSelecionado = cab?.observacao;
      setDataPedidoSelecionado(cab?.data);
      dataPedidoSelecionado = cab?.data;
      setNumeroPedidoSelecionado(cab?.palMPV);
      numeroPedidoSelecionado = cab?.palMPV;
      setNumeroPedidoSankhya(cab?.pedido);
      numeroPedidoSankhya = cab?.pedido;
      setStatusPedidoSelecionado(cab?.status);
      statusPedidoSelecionado = cab?.status;
      setParceiroPedidoSelecionadoId(cab?.parceiroId);
      parceiroPedidoSelecionadoId = cab?.parceiroId;
      if (Number(cab?.filial ?? cab?.empresaId) === 2) {
        setNaturezaPadraoPedidoSelecionado('110102 - Receita de Revenda de Mercadorias');
      } else {
        setNaturezaPadraoPedidoSelecionado('');
      }
      // define tipo negociação (id e descrição) a partir do campo disponível
      const tipoNegIdLocal =
        Number(cab?.tipoNegociacaoId || cab?.tipoNegociacao?.id || 0);
      setTipoNegociacaoPedidoSelecionadoId(tipoNegIdLocal);
      tipoNegociacaoPedidoSelecionadoId = tipoNegIdLocal;
      if (cab?.tipoNegociacao?.descricao) {
        setTipoNegociacaoPedidoSelecionado(String(cab?.tipoNegociacao?.descricao || ''));
      } else {
        try {
          const dbTN = await openDB<PgamobileDB>('pgamobile', versao);
          const stTN = dbTN.transaction('tipoNegociacao', 'readonly').objectStore('tipoNegociacao');
          const tn = await stTN.get(tipoNegIdLocal);
          if (tn?.descricao) {
            setTipoNegociacaoPedidoSelecionado(String(tn.descricao));
          } else {
            try {
              const r = await api.get(`/api/TipoNegociacao/${tipoNegIdLocal}`);
              setTipoNegociacaoPedidoSelecionado(String(r?.data?.descricao || ''));
            } catch {
              setTipoNegociacaoPedidoSelecionado('');
            }
          }
        } catch {
          try {
            const r = await api.get(`/api/TipoNegociacao/${tipoNegIdLocal}`);
            setTipoNegociacaoPedidoSelecionado(String(r?.data?.descricao || ''));
          } catch {
            setTipoNegociacaoPedidoSelecionado('');
          }
        }
      }
      setValorPedidoSelecionado(cab?.valor);
      valorPedidoSelecionado = cab?.valor;
      setSucess(50);
      sucess = 50;
      setpalMPVEscolhido(String(cab?.palMPV || ''));
      palMPVEscolhido = String(cab?.palMPV || '');
      setPaginaItens(1);
      paginaItens = 1;
      setShowlistaPedidosSelec(true);
      setShowMensageLoadingDup(false);
      setPesquisaPedido(true);
      pesquisaPedido = true;
      try {
        localStorage.setItem('PedidoSelecionadoId', String(cab?.id || '0'));
        localStorage.setItem('PedidoSelecionadoPALMPV', String(cab?.palMPV || ''));
        localStorage.setItem('PedidoInfoFilial', String(cab?.filial || ''));
        localStorage.setItem('PedidoInfoTipoNegociacaoId', String(cab?.tipoNegociacaoId || ''));
        localStorage.setItem('PedidoInfoTipPed', String(cab?.tipPed || ''));
        localStorage.setItem('PedidoInfoObservacao', String(cab?.observacao || ''));
        localStorage.setItem('PedidoInfoValor', String(cab?.valor ?? 0));
      } catch {}
      setItensPedidoSelecionado([]);
      itensPedidoSelecionado = [];
      const itensEmb = Array.isArray((resp as any)?.data?.itens) ? (resp as any).data.itens : [];
      if (itensEmb.length > 0) {
        setSucess(70);
        sucess = 70;
        const itensVindoGet: any[] = itensEmb;
        setSucess(100);
        sucess = 100;
        setItensPedidoSelecionadoList(itensVindoGet as any);
        itensPedidoSelecionadoList = itensVindoGet as any;
        setTotalPaginasItens(Math.ceil(itensVindoGet.length / qtdePaginaItens));
        totalPaginasItens = Math.ceil(itensVindoGet.length / qtdePaginaItens);
        if (totalPaginasItens > 0 && paginaItens > totalPaginasItens) {
          setPaginaItens(totalPaginasItens);
          setLoadingItensPedidoSelecionado(false);
          setShowMensageLoading(false);
          return;
        }
        setItensPedidoSelecionado(
          itensVindoGet.slice((paginaItens - 1) * qtdePaginaItens, paginaItens * qtdePaginaItens) || []
        );
        itensPedidoSelecionado =
          itensVindoGet.slice((paginaItens - 1) * qtdePaginaItens, paginaItens * qtdePaginaItens) || [];
        let somaTotalIpiGet = 0;
        itensVindoGet.forEach((item: any) => {
          const valorCalculado = item?.produto?.aliIpi
            ? item.valTotal + item.valTotal * (item.produto?.aliIpi / 100)
            : item.valTotal;
          somaTotalIpiGet += valorCalculado;
        });
        const somaItens = Math.round(
          (itensVindoGet.reduce(
            (accumulator: any, item: any) => accumulator + Number(item?.valTotal || 0),
            0
          ) +
            Number.EPSILON) *
            100
        ) / 100;
        setValorPedidoSelecionado(somaItens);
        valorPedidoSelecionado = somaItens;
        setIpiEscolhido(somaTotalIpiGet);
        IpiEscolhido = somaTotalIpiGet;
        setLoadingItensPedidoSelecionado(false);
        setShowMensageLoading(false);
      } else {
        await GetitensPedidoVendaIdLista(cab?.id);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
      setLoading(false);
      setLoadingItensPedidoSelecionado(false);
      setShowMensageLoading(false);
      console.log('Erro ao buscar da API', error);
    }
  }

  function upsertNaturezaPadraoLocalStorage(tipoId: string | number, natureza: string, descricao?: string, atualizadoEm?: string) {
    try {
      const raw = localStorage.getItem('@Portal/tipoNegociacaoNaturezaPadrao') || '[]';
      const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
      const idStr = String(tipoId);
      const idx = arr.findIndex((x: any) => String(x?.id) === idStr || String(x?.Id) === idStr);
      const novo = {
        id: Number(tipoId),
        descricao: String(descricao || ''),
        atualizadoEm: String(atualizadoEm || ''),
        NaturezaPadrao: String(natureza || ''),
      };
      if (idx >= 0) {
        arr[idx] = { ...arr[idx], ...novo };
      } else {
        arr.push(novo);
      }
      localStorage.setItem('@Portal/tipoNegociacaoNaturezaPadrao', JSON.stringify(arr.map((x: any) => ({
        id: Number(x?.id ?? x?.Id ?? 0),
        descricao: String(x?.descricao ?? x?.Descricao ?? ''),
        atualizadoEm: String(x?.atualizadoEm ?? x?.AtualizadoEm ?? ''),
        NaturezaPadrao: String(x?.NaturezaPadrao ?? ''),
      }))));
    } catch {}
  }

  async function ensureNaturezaPadraoCache() {
    try {
      const raw = localStorage.getItem('@Portal/tipoNegociacaoNaturezaPadrao') || '[]';
      let arr: any[] = [];
      try {
        arr = JSON.parse(raw);
      } catch {
        arr = [];
      }
      const precisaRebuild =
        !Array.isArray(arr) ||
        arr.length === 0 ||
        arr.some((x: any) => x && (x.Id !== undefined || x.Descricao !== undefined));
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const store = db.transaction('tipoNegociacao', 'readonly').objectStore('tipoNegociacao');
      const todos = await store.getAll();
      if (precisaRebuild && Array.isArray(todos) && todos.length > 0) {
        const data = (todos || []).map((t: any) => ({
          id: t?.id,
          descricao: t?.descricao,
          atualizadoEm: t?.atualizadoEm ?? '',
          NaturezaPadrao: t?.Natureza ?? null,
        }));
        try {
          localStorage.setItem('@Portal/tipoNegociacaoNaturezaPadrao', JSON.stringify(data));
        } catch {}
      } else if (!precisaRebuild && Array.isArray(todos) && todos.length > 0) {
        // normalize keys to lowercase if needed, merge NaturezaPadrao missing
        const mapAtual: { [key: string]: any } = {};
        arr.forEach((x: any) => {
          const key = String(x?.id ?? x?.Id);
          if (!key) return;
          mapAtual[key] = {
            id: Number(x?.id ?? x?.Id ?? 0),
            descricao: String(x?.descricao ?? x?.Descricao ?? ''),
            atualizadoEm: String(x?.atualizadoEm ?? x?.AtualizadoEm ?? ''),
            NaturezaPadrao: String(x?.NaturezaPadrao ?? ''),
          };
        });
        for (const t of todos) {
          const key = String(t?.id);
          const existente = mapAtual[key];
          if (!existente || !existente.NaturezaPadrao) {
            mapAtual[key] = {
              id: Number(t?.id ?? 0),
              descricao: String(t?.descricao ?? ''),
              atualizadoEm: String(t?.atualizadoEm ?? ''),
              NaturezaPadrao: String(t?.Natureza ?? ''),
            };
          }
        }
        try {
          localStorage.setItem('@Portal/tipoNegociacaoNaturezaPadrao', JSON.stringify(Object.values(mapAtual)));
        } catch {}
      }
    } catch {}
  }

  useEffect(() => {
    ensureNaturezaPadraoCache();
  }, []);
  async function GetPedidoVendaIdModalLocal(pedido: any, cod: any) {
    setpalMPVEscolhido('');
    palMPVEscolhido = '';
    setmodalList(true);
    modalList = true;
    setSucess(20);
    sucess = 20;
    try {
      localStorage.setItem('PedidoSelecionadoOrigem', 'local');
    } catch {}
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction(
        ['cabecalhoPedidoVenda', 'tipoNegociacao'],
        'readonly'
      );
      const tipoNegStore = transaction.objectStore('tipoNegociacao');
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      const todos = await store.getAll();
      const escolhido =
        todos.find((item: any) => item.id === cod) ||
        todos.find((item: any) => item.palMPV === pedido);
      if (!escolhido) {
        setLoading(false);
        setShowMensageLoading(false);
        return;
      }
      setIdPedidoSelecionado(escolhido.id);
      idPedidoSelecionado = escolhido.id;
      setFilialPedidoSelecionado(escolhido.filial);
      filialPedidoSelecionado = escolhido.filial;
      setTipPed(escolhido.tipPed);
      tipPed = escolhido.tipPed;
      settipPedSelecionado(escolhido.tipPed);
      tipPedSelecionado = escolhido.tipPed;
      setDataEntregaPedidoSelecionado(escolhido.dataEntrega);
      dataEntregaPedidoSelecionado = escolhido.dataEntrega;
      const observacaoLocal = String(
        escolhido?.observacao ??
          (escolhido as any)?.Observacao ??
          (escolhido as any)?.observacaoPedido ??
          (escolhido as any)?.Obs ??
          (escolhido as any)?.obs ??
          ''
      );
      setObservacaoPedidoSelecionado(observacaoLocal);
      observacaoPedidoSelecionado = observacaoLocal;
      setDataPedidoSelecionado(escolhido.data);
      dataPedidoSelecionado = escolhido.data;
      setNumeroPedidoSelecionado(escolhido.palMPV);
      numeroPedidoSelecionado = escolhido.palMPV;
      setNumeroPedidoSankhya(escolhido.pedido);
      numeroPedidoSankhya = escolhido.pedido;
      setStatusPedidoSelecionado(escolhido.status);
      statusPedidoSelecionado = escolhido.status;
      setParceiroPedidoSelecionadoId(escolhido.parceiroId);
      parceiroPedidoSelecionadoId = escolhido.parceiroId;
      setTipoNegociacaoPedidoSelecionadoId(escolhido.tipoNegociacaoId);
      tipoNegociacaoPedidoSelecionadoId = escolhido.tipoNegociacaoId;
      GetTipoNeg(escolhido.tipoNegociacaoId);
      const tipoNegIdLocal = Number(escolhido.tipoNegociacaoId);
      const tipoNegLocal =
        tipoNegIdLocal === 1 ? { descricao: 'A VISTA' } : await tipoNegStore.get(tipoNegIdLocal);
      const pedidoObj = {
        id: escolhido.id,
        filial: escolhido.filial,
        vendedorId: escolhido.vendedorId,
        parceiroId: escolhido.parceiroId,
        palMPV: escolhido.palMPV,
        tipoNegociacaoId: escolhido.tipoNegociacaoId,
        tipoNegociacao: {
          id: tipoNegIdLocal,
          descricao: tipoNegLocal?.descricao || ''
        },
        data: escolhido.data,
        valor: escolhido.valor,
        dataEntrega: escolhido.dataEntrega,
        observacao: observacaoLocal,
        pedido: escolhido.pedido,
        status: escolhido.status
      } as any;
      setPedidoSelecao(pedidoObj);
      setCabecalhoPedido(pedidoObj);
      setpalMPVEscolhido(escolhido.palMPV);
      palMPVEscolhido = escolhido.palMPV;
      try {
        localStorage.setItem('PedidoSelecionadoId', String(escolhido.id));
        localStorage.setItem('PedidoSelecionadoPALMPV', String(escolhido.palMPV));
        localStorage.setItem('PedidoInfoFilial', String(escolhido.filial));
        localStorage.setItem('PedidoInfoTipoNegociacaoId', String(escolhido.tipoNegociacaoId));
        localStorage.setItem('PedidoInfoTipPed', String(escolhido.tipPed));
        localStorage.setItem('PedidoInfoObservacao', String(observacaoLocal || ''));
        localStorage.setItem('PedidoInfoValor', String(escolhido.valor ?? 0));
      } catch {}
      setPaginaItens(1);
      paginaItens = 1;
      setShowlistaPedidosSelec(true);
      setShowMensageLoading(false);
      setShowMensageLoadingDup(false);
      setPesquisaPedido(true);
      pesquisaPedido = true;
      await GetitensPedidoVendaIdLista();
      setSucess(50);
      sucess = 50;
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
      setLoading(false);
      setShowMensageLoading(false);
    }
  }
  async function GetPedidoVendaId(pedido: any, cod: any) {
    setpalMPVEscolhido('');
    palMPVEscolhido = '';
    setPaginaItens2(1);
    paginaItens2 = 1;
    setSucess(10);
    sucess = 10;
    setShowMensageLoading(true);
    setItensPedidoSelecionado([]);
    itensPedidoSelecionado = [];

    console.log('pedidooo', cod);
    const vendedor = Number(usuario.username);
    if (!isOnline) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
        const store = transaction.objectStore('cabecalhoPedidoVenda');

        const cabecalho = await store.getAll();

        const cabecalhoEscolhido: ICabecalho2[] = cabecalho.filter(
          (item) => item.palMPV == pedido
        );
        console.log('cabecalho escolhidooo', cabecalhoEscolhido);
        setIdPedidoSelecionado(cabecalhoEscolhido[0].id);
        idPedidoSelecionado = cabecalhoEscolhido[0].id;
        setFilialPedidoSelecionado(cabecalhoEscolhido[0].filial);
        filialPedidoSelecionado = cabecalhoEscolhido[0].filial;
        setTipPed(cabecalhoEscolhido[0].tipPed);
        tipPed = cabecalhoEscolhido[0].tipPed;
        settipPedSelecionado(cabecalhoEscolhido[0].tipPed);
        tipPedSelecionado = cabecalhoEscolhido[0].tipPed;
        setDataEntregaPedidoSelecionado(cabecalhoEscolhido[0].dataEntrega);
        dataEntregaPedidoSelecionado = cabecalhoEscolhido[0].dataEntrega;
          setObservacaoPedidoSelecionado(cabecalhoEscolhido[0].observacao);
          try {
            localStorage.setItem(
              'PedidoInfoObservacao',
              String(cabecalhoEscolhido[0].observacao || '')
            );
          } catch {}
        observacaoPedidoSelecionado = cabecalhoEscolhido[0].observacao;
        setDataPedidoSelecionado(cabecalhoEscolhido[0].data);
        dataPedidoSelecionado = cabecalhoEscolhido[0].data;
        setNumeroPedidoSelecionado(cabecalhoEscolhido[0].palMPV);
        numeroPedidoSelecionado = cabecalhoEscolhido[0].palMPV;
        setNumeroPedidoSankhya(cabecalhoEscolhido[0].pedido);
        numeroPedidoSankhya = cabecalhoEscolhido[0].pedido;
        setStatusPedidoSelecionado(cabecalhoEscolhido[0].status);
        statusPedidoSelecionado = cabecalhoEscolhido[0].status;
        setParceiroPedidoSelecionadoId(cabecalhoEscolhido[0].parceiroId);
        parceiroPedidoSelecionadoId = cabecalhoEscolhido[0].parceiroId;
        setTipoNegociacaoPedidoSelecionadoId(
          cabecalhoEscolhido[0].tipoNegociacaoId
        );
        tipoNegociacaoPedidoSelecionadoId =
          cabecalhoEscolhido[0].tipoNegociacaoId;

        GetTipoNeg(cabecalhoEscolhido[0].tipoNegociacaoId);
        setValorPedidoSelecionado(cabecalhoEscolhido[0].valor);
        valorPedidoSelecionado = cabecalhoEscolhido[0].valor;
        setSucess(50);
        sucess = 50;
        setpalMPVEscolhido(cabecalhoEscolhido[0].palMPV);
        palMPVEscolhido = cabecalhoEscolhido[0].palMPV;
        GetitensPedidoVendaId();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Ocorreu um erro', error);
      }
    } else {
      await api
        .get(
          `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(
            String(pedido || '').trim()
          )}`
        )
        .then((resp) => {
          const cab = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
          console.log('pedido de venda selecionado aqui', cab);

          setPedidoSelecao(cab);
          setCabecalhoPedido(cab);
          pedidoSelecao = cab;
          setIdPedidoSelecionado(cab?.id);
          idPedidoSelecionado = cab?.id;
          setFilialPedidoSelecionado(cab?.filial);
          filialPedidoSelecionado = cab?.filial;
          setTipPed(cab?.tipPed);
          tipPed = cab?.tipPed;
          settipPedSelecionado(cab?.tipPed);
          tipPedSelecionado = cab?.tipPed;
          setDataEntregaPedidoSelecionado(cab?.dataEntrega);
          dataEntregaPedidoSelecionado = cab?.dataEntrega;
          setObservacaoPedidoSelecionado(cab?.observacao);
          observacaoPedidoSelecionado = cab?.observacao;
          setDataPedidoSelecionado(cab?.data);
          dataPedidoSelecionado = cab?.data;
          console.log('data pedido', cab?.data);
          setNumeroPedidoSelecionado(cab.palMPV);
          numeroPedidoSelecionado = cab.palMPV;
          setNumeroPedidoSankhya(cab.pedido);
          numeroPedidoSankhya = cab.pedido;
          setStatusPedidoSelecionado(cab.status);
          statusPedidoSelecionado = cab.status;
          setParceiroPedidoSelecionadoId(cab.parceiroId);
          parceiroPedidoSelecionadoId = cab.parceiroId;
          setTipoNegociacaoPedidoSelecionadoId(
            cab?.tipoNegociacao?.id ?? cab?.tipoNegociacaoId
          );
          tipoNegociacaoPedidoSelecionadoId =
            cab?.tipoNegociacao?.id ?? cab?.tipoNegociacaoId;
          setTipoNegociacaoPedidoSelecionado(
            cab?.tipoNegociacao?.descricao || ''
          );
          tipoNegociacaoPedidoSelecionado = cab?.tipoNegociacao?.descricao || '';
          setValorPedidoSelecionado(cab.valor);
          valorPedidoSelecionado = cab.valor;
          setSucess(50);
          sucess = 50;
          setpalMPVEscolhido(cab.palMPV);
          palMPVEscolhido = cab.palMPV;
          GetitensPedidoVendaId();
          console.log('itens do pedido', itensPedidoSelecionado);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
          setLoading(false);
        });
    }
  }
  //=========  get tipo negociação ============================
  async function GetTipoNeg(pedido: any) {
    console.log('pedidooo', pedido);
    const vendedor = Number(usuario.username);
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('tipoNegociacao', 'readonly');
      const store = transaction.objectStore('tipoNegociacao');

      const cabecalho = await store.getAll();

      const cabecalhoEscolhido: iTipoNegociacao[] = cabecalho.filter(
        (item) => item.id == pedido
      );
      console.log('cabecalho escolhidooo', cabecalhoEscolhido);
      setTipoPagamento(cabecalhoEscolhido[0].descricao);
      setTipoNegociacaoPedidoSelecionado(cabecalhoEscolhido[0].descricao);
      tipoNegociacaoPedidoSelecionado = cabecalhoEscolhido[0].descricao;
    } catch (error) {
      setLoading(false);
      console.log('Ocorreu um erro', error);
    }
  }

  //===========================================================

  async function GetPedidoVendaIdNuvem(pedido: any) {
    setLoading(true);
    await api
      .get(
        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(
          String(pedido || '').trim()
        )}`
      )
      .then((resp) => {
        const cab = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
        console.log('pedido de venda selecionado', cab);

        setPedidoSelecao(cab);
        setCabecalhoPedido(cab);
        pedidoSelecao = cab;
        setIdPedidoSelecionado(cab?.id);
        idPedidoSelecionado = cab?.id;
        setFilialPedidoSelecionado(cab?.filial);
        filialPedidoSelecionado = cab?.filial;
        setTipPed(cab?.tipPed);
        tipPed = cab?.tipPed;
        settipPedSelecionado(cab?.tipPed);
        tipPedSelecionado = cab?.tipPed;
        setDataEntregaPedidoSelecionado(cab?.dataEntrega);
        dataEntregaPedidoSelecionado = cab?.dataEntrega;
        setObservacaoPedidoSelecionado(cab?.observacao);
        observacaoPedidoSelecionado = cab?.observacao;
        setDataPedidoSelecionado(cab?.data);
        dataPedidoSelecionado = cab?.data;
        console.log('data pedido', cab?.data);
        setNumeroPedidoSelecionado(cab?.palMPV);
        numeroPedidoSelecionado = cab?.palMPV;
        setNumeroPedidoSankhya(cab?.pedido);
        numeroPedidoSankhya = cab?.pedido;
        setStatusPedidoSelecionado(cab?.status);
        statusPedidoSelecionado = cab?.status;
        setParceiroPedidoSelecionadoId(cab?.parceiroId);
        parceiroPedidoSelecionadoId = cab?.parceiroId;
        setTipoNegociacaoPedidoSelecionadoId(
          cab?.tipoNegociacao?.id ?? cab?.tipoNegociacaoId
        );
        tipoNegociacaoPedidoSelecionadoId =
          cab?.tipoNegociacao?.id ?? cab?.tipoNegociacaoId;
        setTipoNegociacaoPedidoSelecionado(
          cab?.tipoNegociacao?.descricao || ''
        );
        tipoNegociacaoPedidoSelecionado = cab?.tipoNegociacao?.descricao || '';
        setValorPedidoSelecionado(cab?.valor);
        valorPedidoSelecionado = cab?.valor;
        console.log('itens do pedido', itensPedidoSelecionado);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setLoading(false);
      });
  }
  interface itemPedidoVenda {
    vendedorId: number;
    palMPV: string;
    produtoId: number;
    descProduto: string;
    quant: number;
    valUnit: number;
    valTotal: number;
    unidade: string;
    sincronizado?: string;
    aliIpi?: number;
  }

  useEffect(() => {
    if (!showlistaPedidosSelec) {
      return;
    }
    const ativos = filtrarItensAtivosLista(itensPedidoSelecionadoList as any);
    if (!Array.isArray(ativos) || ativos.length === 0) {
      setItensPedidoSelecionado([]);
      itensPedidoSelecionado = [];
      return;
    }
    const totalPaginasFront = Math.max(
      1,
      Math.ceil(ativos.length / qtdePaginaItens)
    );
    if (paginaItens > totalPaginasFront) {
      setPaginaItens(totalPaginasFront);
      return;
    }
    const startIndex = (paginaItens - 1) * qtdePaginaItens;
    const endIndex = startIndex + qtdePaginaItens;
    setItensPedidoSelecionado(ativos.slice(startIndex, endIndex) || []);
    itensPedidoSelecionado = ativos.slice(startIndex, endIndex) || [];
  }, [paginaItens, itensPedidoSelecionadoList, showlistaPedidosSelec]);

  useEffect(() => {
    if (showlistaPedidosSelec) {
      return;
    }
    const ativos = filtrarItensAtivosLista(itensPedidoSelecionadoList as any);
    if (!Array.isArray(ativos) || ativos.length === 0) {
      setItensPedidoSelecionado([]);
      itensPedidoSelecionado = [];
      return;
    }
    const totalPaginasFront = Math.max(
      1,
      Math.ceil(ativos.length / qtdePaginaItens2)
    );
    if (paginaItens2 > totalPaginasFront) {
      setPaginaItens2(totalPaginasFront);
      return;
    }
    const startIndex = (paginaItens2 - 1) * qtdePaginaItens2;
    const endIndex = startIndex + qtdePaginaItens2;
    setItensPedidoSelecionado(ativos.slice(startIndex, endIndex) || []);
    itensPedidoSelecionado = ativos.slice(startIndex, endIndex) || [];
  }, [paginaItens2, itensPedidoSelecionadoList, showlistaPedidosSelec]);

  function modallista() {
    if (modalList) {
      setPaginaItens(1);
      paginaItens = 1;
      setShowlistaPedidosSelec(true);
    }
  }

  async function GetitensPedidoVendaIdLista(pedidoId?: number) {
    setSucess(70);
    sucess = 70;
    window.scrollTo(0, 0);
    setLoadingItensPedidoSelecionado(true);
    setItensPedidoSelecionadoList([]);
    itensPedidoSelecionadoList = [];
    setTotalPaginasItens(0);
    totalPaginasItens = 0;
    setItensPedidoSelecionado([]);
    itensPedidoSelecionado = [];

    const vendedor = Number(usuario.username);
    const origemModal = isMobile
      ? String(localStorage.getItem('PedidoSelecionadoOrigem') || '')
      : '';
    const forceLocalOrigem = origemModal === 'local';
    const forceApiOrigem = origemModal === 'api';
    const deveTentarApiMobile = !forceLocalOrigem && isOnline;
    const round2 = (n: number) =>
      Math.round((Number(n || 0) + Number.EPSILON) * 100) / 100;
    const aplicarItens = (itensVindoGet: iItemPedidoVenda[]) => {
      setSucess(100);
      sucess = 100;
      setItensPedidoSelecionadoList(itensVindoGet);
      itensPedidoSelecionadoList = itensVindoGet;
      setTotalPaginasItens(Math.ceil(itensVindoGet.length / qtdePaginaItens));
      totalPaginasItens = Math.ceil(itensVindoGet.length / qtdePaginaItens);
      if (totalPaginasItens > 0 && paginaItens > totalPaginasItens) {
        setPaginaItens(totalPaginasItens);
        setLoadingItensPedidoSelecionado(false);
        return;
      }
      setItensPedidoSelecionado(
        itensVindoGet.slice(
          (paginaItens - 1) * qtdePaginaItens,
          paginaItens * qtdePaginaItens
        ) || []
      );
      itensPedidoSelecionado =
        itensVindoGet.slice(
          (paginaItens - 1) * qtdePaginaItens,
          paginaItens * qtdePaginaItens
        ) || [];

      let somaTotalIpiGet = 0;
      itensVindoGet.forEach((item: any) => {
        const ali = item?.produto?.aliIpi;
        const valorCalculado = ali
          ? Number(item.valTotal || 0) + Number(item.valTotal || 0) * (Number(ali) / 100)
          : Number(item.valTotal || 0);
        somaTotalIpiGet += valorCalculado;
      });

      const somaItens = itensVindoGet.reduce(
        (accumulator: any, item: any) => accumulator + Number(item?.valTotal || 0),
        0
      );
      const somaItens2 = round2(somaItens);
      setValorPedidoSelecionado(somaItens2);
      valorPedidoSelecionado = somaItens2;
      setIpiEscolhido(somaTotalIpiGet);
      IpiEscolhido = somaTotalIpiGet;
      setLoadingItensPedidoSelecionado(false);
      if (modalList) {
        setShowMensageLoading(false);
        setPesquisaPedido(true);
        pesquisaPedido = true;
      } else {
        setShowMensageLoading(false);
      }
    };

    const getItensLocalPorPalmpv = async (palmpv: string) => {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readonly');
      const store = transaction.objectStore('itemPedidoVenda');
      const alvo = String(palmpv || '').trim();
      if (!alvo) return [] as iItemPedidoVenda[];
      try {
        const idx = (store as any).index('palMPV');
        return ((await idx.getAll(alvo as any)) as any) || [];
      } catch {
        const todosItens = await store.getAll();
        return ((todosItens as any[]).filter(
          (item: any) => String(item?.palMPV || item?.palmpv || '').trim() === alvo
        ) as any) || [];
      }
    };

    const getItensApi = async (pedidoIdApi: string | number, palmpvFallback?: string) => {
      try {
        const resp = await api.get(
          `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${encodeURIComponent(
            String(pedidoIdApi ?? '')
          )}`
        );
        let itens: iItemPedidoVenda[] = resp?.data?.data ?? [];
        if ((!Array.isArray(itens) || itens.length === 0) && palmpvFallback) {
          const resp2 = await api.get(
            `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${encodeURIComponent(
              String(palmpvFallback || '')
            )}`
          );
          itens = resp2?.data?.data ?? [];
        }
        return Array.isArray(itens) ? itens : [];
      } catch {
        return [] as iItemPedidoVenda[];
      }
    };

    if (isMobile) {
      const palAtual = String(
        palMPVEscolhido || localStorage.getItem('PedidoSelecionadoPALMPV') || ''
      ).trim();
      const totalPedido = (() => {
        const v1 = Number(valorPedidoSelecionado || 0);
        if (v1 > 0) return v1;
        const v2 = Array.isArray(cabecalhoPedido)
          ? Number(cabecalhoPedido[0]?.valor || 0)
          : Number((cabecalhoPedido as any)?.valor || 0);
        if (v2 > 0) return v2;
        const v3 = Array.isArray(pedidoSelecao)
          ? Number(pedidoSelecao[0]?.valor || 0)
          : Number((pedidoSelecao as any)?.valor || 0);
        if (v3 > 0) return v3;
        try {
          return Number(localStorage.getItem('PedidoInfoValor') || '0');
        } catch {
          return 0;
        }
      })();
      let itensLocal: iItemPedidoVenda[] = [];
      if (palAtual) {
        try {
          itensLocal = await getItensLocalPorPalmpv(palAtual);
        } catch {
          itensLocal = [];
        }
      }
      const somaLocal = itensLocal.reduce(
        (acc, it: any) => acc + Number(it?.valTotal || 0),
        0
      );
      const somaLocal2 = round2(somaLocal);
      const totalPedido2 = round2(totalPedido);
      const bateTotal =
        itensLocal.length > 0 &&
        totalPedido2 > 0 &&
        Math.abs(somaLocal2 - totalPedido2) <= 0.01;

      if (deveTentarApiMobile) {
        const idPreferido = Number(
          pedidoId ??
            idPedidoSelecionado ??
            Number(localStorage.getItem('PedidoSelecionadoId') || '0')
        );
        const pedidoIdEfetivo = idPreferido > 0 ? idPreferido : palAtual;
        const itensApi = await getItensApi(pedidoIdEfetivo, palAtual);
        if (Array.isArray(itensApi) && itensApi.length > 0) {
          aplicarItens(itensApi);
          return;
        }
        if (!forceApiOrigem && bateTotal) {
          aplicarItens(itensLocal);
          return;
        }
        if (itensLocal.length > 0) {
          aplicarItens(itensLocal);
          return;
        }
        aplicarItens(itensApi);
        return;
      }

      if (bateTotal) {
        aplicarItens(itensLocal);
        return;
      }

      aplicarItens(itensLocal);
      return;
    } else {
      try {
        const pedidoIdApi = String(
          palMPVEscolhido ||
            localStorage.getItem('PedidoSelecionadoPALMPV') ||
            pedidoId ||
            idPedidoSelecionado ||
            Number(localStorage.getItem('PedidoSelecionadoId') || '0')
        ).trim();
        const response = await api.get(
          `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${encodeURIComponent(
            pedidoIdApi
          )}`
        );
        let itensVindoGet: iItemPedidoVenda[] = response?.data?.data ?? [];
        if (!Array.isArray(itensVindoGet) || itensVindoGet.length === 0) {
          const palmpvFallback = String(
            palMPVEscolhido || localStorage.getItem('PedidoSelecionadoPALMPV') || ''
          ).trim();
          if (palmpvFallback) {
            try {
              const response2 = await api.get(
                `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${encodeURIComponent(
                  palmpvFallback
                )}`
              );
              itensVindoGet = response2?.data?.data ?? [];
            } catch {}
          }
        }
        if (!Array.isArray(itensVindoGet) || itensVindoGet.length === 0) {
          try {
            const db = await openDB<PgamobileDB>('pgamobile', versao);
            const transaction = db.transaction('itemPedidoVenda', 'readonly');
            const store = transaction.objectStore('itemPedidoVenda');
            const todosItens = await store.getAll();
            const alvo = String(palMPVEscolhido).trim();
            itensVindoGet = (todosItens as any[]).filter((item: any) => {
              const chave =
                item?.palMPV ??
                item?.palmpv ??
                item?.pedidoId ??
                item?.pedido ??
                '';
              return String(chave).trim() === alvo;
            }) as any;
          } catch {}
        }
        setSucess(100);
        sucess = 100;
        setItensPedidoSelecionadoList(itensVindoGet);
        itensPedidoSelecionadoList = itensVindoGet;
        setTotalPaginasItens(Math.ceil(itensVindoGet.length / qtdePaginaItens));
        totalPaginasItens = Math.ceil(itensVindoGet.length / qtdePaginaItens);
        if (totalPaginasItens > 0 && paginaItens > totalPaginasItens) {
          setPaginaItens(totalPaginasItens);
          return;
        }
        setItensPedidoSelecionado(
          itensVindoGet.slice(
            (paginaItens - 1) * qtdePaginaItens,
            paginaItens * qtdePaginaItens
          ) || []
        );
        itensPedidoSelecionado =
          itensVindoGet.slice(
            (paginaItens - 1) * qtdePaginaItens,
            paginaItens * qtdePaginaItens
          ) || [];

        let somaTotalIpiGet = 0;
        itensVindoGet.forEach((item: any) => {
          const ali = item?.produto?.aliIpi;
          const valorCalculado = ali
            ? item.valTotal + item.valTotal * (ali / 100)
            : item.valTotal;
          somaTotalIpiGet += valorCalculado;
        });

        const somaItens = Math.round(
          (itensVindoGet.reduce(
            (accumulator: any, item: any) => accumulator + Number(item?.valTotal || 0),
            0
          ) +
            Number.EPSILON) *
            100
        ) / 100;
        setValorPedidoSelecionado(somaItens);
        valorPedidoSelecionado = somaItens;
        setIpiEscolhido(somaTotalIpiGet);
        IpiEscolhido = somaTotalIpiGet;
        if (modalList) {
          setShowMensageLoading(false);
          setPesquisaPedido(true);
          pesquisaPedido = true;
        } else {
          setShowMensageLoading(false);
        }
        setLoadingItensPedidoSelecionado(false);
      } catch (error) {
        try {
          const db = await openDB<PgamobileDB>('pgamobile', versao);
          const transaction = db.transaction('itemPedidoVenda', 'readonly');
          const store = transaction.objectStore('itemPedidoVenda');
          const todosItens = await store.getAll();
          const alvo = String(palMPVEscolhido).trim();
          const itensVindoGet: iItemPedidoVenda[] = (todosItens as any[]).filter((item: any) => {
            const chave =
              item?.palMPV ??
              item?.palmpv ??
              item?.pedidoId ??
              item?.pedido ??
              '';
            return String(chave).trim() === alvo;
          }) as any;
          setSucess(100);
          sucess = 100;
          setItensPedidoSelecionadoList(itensVindoGet);
          itensPedidoSelecionadoList = itensVindoGet;
          setTotalPaginasItens(Math.ceil(itensVindoGet.length / qtdePaginaItens));
          totalPaginasItens = Math.ceil(itensVindoGet.length / qtdePaginaItens);
          if (totalPaginasItens > 0 && paginaItens > totalPaginasItens) {
            setPaginaItens(totalPaginasItens);
            setLoadingItensPedidoSelecionado(false);
            return;
          }
          setItensPedidoSelecionado(
            itensVindoGet.slice(
              (paginaItens - 1) * qtdePaginaItens,
              paginaItens * qtdePaginaItens
            ) || []
          );
          itensPedidoSelecionado =
            itensVindoGet.slice(
              (paginaItens - 1) * qtdePaginaItens,
              paginaItens * qtdePaginaItens
            ) || [];
          let somaTotalIpiGet = 0;
          itensVindoGet.forEach((item: any) => {
            const ali = item?.produto?.aliIpi;
            const valorCalculado = ali
              ? item.valTotal + item.valTotal * (ali / 100)
              : item.valTotal;
            somaTotalIpiGet += valorCalculado;
          });
          setValorPedidoSelecionado(
            itensVindoGet.reduce(
              (accumulator: any, item: any) => accumulator + item.valTotal,
              0
            )
          );
          valorPedidoSelecionado = itensVindoGet.reduce(
            (accumulator: any, item: any) => accumulator + item.valTotal,
            0
          );
          setIpiEscolhido(somaTotalIpiGet);
          IpiEscolhido = somaTotalIpiGet;
        } catch {
          setLoading(false);
        } finally {
          setShowMensageLoading(false);
          setLoadingItensPedidoSelecionado(false);
        }
      }
    }
  }
  async function GetitensPedidoVendaId() {
    setSucess(70);
    sucess = 70;
    window.scrollTo(0, 0);
    setItensPedidoSelecionado([]);
    itensPedidoSelecionado = [];

    const vendedor = Number(usuario.username);
    if (!isOnline) {
      try {
        const db = await openDB<PgamobileDB>('pgamobile', versao);
        const transaction = db.transaction('itemPedidoVenda', 'readonly');
        const store = transaction.objectStore('itemPedidoVenda');

        const cabecalho = await store.getAll();
        setSucess(100);
        sucess = 100;
        const item: iItemPedidoVenda[] = cabecalho.filter(
          (item) => item.palMPV == palMPVEscolhido
        );
        console.log('cabecalho item escolhidooo', item);

        const itensVindoGet: iItemPedidoVenda[] = item.filter(
          (item: iItemPedidoVenda) => item.valUnit > 0 && item.valTotal > 0
        );
        console.log('itens vindo do get', itensVindoGet);

        setItensPedidoSelecionadoList(itensVindoGet);
        itensPedidoSelecionadoList = itensVindoGet;
        setTotalPaginasItens2(Math.ceil(itensVindoGet.length / qtdePaginaItens2));
        totalPaginasItens2 = Math.ceil(itensVindoGet.length / qtdePaginaItens2);
        if (totalPaginasItens2 > 0 && paginaItens2 > totalPaginasItens2) {
          setPaginaItens2(totalPaginasItens2);
          return;
        }
        console.log('Itens tabela preço:', itensVindoGet);
        setItensPedidoSelecionado(
          itensVindoGet.slice(
            (paginaItens2 - 1) * qtdePaginaItens2,
            paginaItens2 * qtdePaginaItens2
          ) || []
        );
        itensPedidoSelecionado =
          itensVindoGet.slice(
            (paginaItens2 - 1) * qtdePaginaItens2,
            paginaItens2 * qtdePaginaItens2
          ) || [];

        let somaTotalIpiGet = 0;
        itensVindoGet.forEach((item: any) => {
          const valorCalculado = item.produto.aliIpi
            ? item.valTotal + item.valTotal * (item.produto.aliIpi / 100)
            : item.valTotal;
          somaTotalIpiGet += valorCalculado;
        });

        setValorPedidoSelecionado(
          itensVindoGet.reduce(
            (accumulator: any, item: any) => accumulator + item.valTotal,
            0
          )
        );
        valorPedidoSelecionado = itensVindoGet.reduce(
          (accumulator: any, item: any) => accumulator + item.valTotal,
          0
        );
        setIpiEscolhido(somaTotalIpiGet);
        IpiEscolhido = somaTotalIpiGet;
        setShowMensageLoading(false);
        if (modalList2) {
          setPesquisaPedido(true);
          pesquisaPedido = true;
        }
      } catch (error) {
        setLoading(false);
        setShowMensageLoading(false);
        console.log('Ocorreu um erro', error);
      }
    } else {
      const pedidoIdApi = encodeURIComponent(
        String(
          palMPVEscolhido ||
            localStorage.getItem('PedidoSelecionadoPALMPV') ||
            numeroPedidoSelecionado ||
            ''
        ).trim()
      );
      await api
        .get(
          `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${pedidoIdApi}`
        )
        .then((response) => {
          const itensVindoGet: iItemPedidoVenda[] = response.data.data.filter(
            (item: iItemPedidoVenda) => item.valUnit > 0 && item.valTotal > 0
          );
          setSucess(100);
          sucess = 100;

          setItensPedidoSelecionadoList(itensVindoGet);
          itensPedidoSelecionadoList = itensVindoGet;
          setTotalPaginasItens2(Math.ceil(itensVindoGet.length / qtdePaginaItens2));
          totalPaginasItens2 = Math.ceil(itensVindoGet.length / qtdePaginaItens2);
          if (totalPaginasItens2 > 0 && paginaItens2 > totalPaginasItens2) {
            setPaginaItens2(totalPaginasItens2);
            return;
          }
          console.log('Itens tabela preço:', itensVindoGet);
          setItensPedidoSelecionado(
            itensVindoGet.slice(
              (paginaItens2 - 1) * qtdePaginaItens2,
              paginaItens2 * qtdePaginaItens2
            ) || []
          );
          itensPedidoSelecionado =
            itensVindoGet.slice(
              (paginaItens2 - 1) * qtdePaginaItens2,
              paginaItens2 * qtdePaginaItens2
            ) || [];
          console.log('itens do pedidoooooos', response.data.data);
          let somaTotalIpiGet = 0;
          itensVindoGet.forEach((item: any) => {
            const valorCalculado = item.produto.aliIpi
              ? item.valTotal + item.valTotal * (item.produto.aliIpi / 100)
              : item.valTotal;
            somaTotalIpiGet += valorCalculado;
          });

          setValorPedidoSelecionado(
            itensVindoGet.reduce(
              (accumulator: any, item: any) => accumulator + item.valTotal,
              0
            )
          );
          valorPedidoSelecionado = itensVindoGet.reduce(
            (accumulator: any, item: any) => accumulator + item.valTotal,
            0
          );
          setIpiEscolhido(somaTotalIpiGet);
          IpiEscolhido = somaTotalIpiGet;
          setShowMensageLoading(false);
          if (modalList2) {
            setPesquisaPedido(true);
            pesquisaPedido = true;
          }
        })
        .catch((error) => {
          setShowMensageLoading(false);
          setLoading(false);
          console.log('Ocorreu um erro');
        });
    }
  }

  async function GetitensPedidoVendaIdnuvem(pedido: any) {
    await api
      .get(
        `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${pedido}`
      )
      .then((response) => {
        const itensVindoGet: iItemPedidoVenda[] = response.data.data.filter(
          (item: iItemPedidoVenda) => item.valUnit > 0 && item.valTotal > 0
        );
        setItensPedidoSelecionado(itensVindoGet);
        itensPedidoSelecionado = itensVindoGet;
        console.log('itens do pedido', itensPedidoSelecionado);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //==função data retro=====================
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var dataAtual = ano + '-' + mes + '-' + dia;

  //========================================
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
  function LimparErro() {
    setAlertErro(false);
  }
  //===================deletar em caso de erro========================//
  async function DeletarItensdCabecalho(numPedido: any) {
    const sql = `delete from AD_Z39 where PALMPV = '${numPedido}'`;
    console.log('testando delete', sql);
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('resultado do envio', response);

        DeletarCabecalho(numPedido);
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }
  async function DeletarCabecalho(numPedido: any) {
    const sql = `delete from AD_Z38 where PALMPV = '${numPedido}'`;

    console.log('testando delete cab', sql);
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('resultado do envio', response);

        seterroPendente(true);

        setAlertErroMensage(true);

        setMsgErroNaoEnviar(
          `Erro ao enviar pedido! Ele será enviado novamente em minutos.`
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  //=================== verificar envio do pedido ====================//
  async function VerificarEnvio(numPedido: any) {
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=select Z38.PALMPV as id
          , Z38.VALOR as vlrCab
          , SUM(QTDE*PUNIT) as vlrItem
        from AD_Z39 Z39
        join AD_Z38 Z38 ON Z38.PALMPV = Z39.PALMPV
        WHERE Z39.PALMPV = '${numPedido}'
        GROUP BY Z38.PALMPV
          , Z38.VALOR`
      )
      .then((response) => {
        console.log('resultado do envio', response);

        console.log(
          'valor cabecalho ',
          response.data.responseBody.rows[0]?.[1].toFixed(2)
        );
        console.log(
          'valor cabecalho itens',
          response.data.responseBody.rows[0]?.[2].toFixed(2)
        );

        if (
          response.data.responseBody.rows[0]?.[2].toFixed(2) == undefined ||
          response.data.responseBody.rows[0]?.[1].toFixed(2) == undefined
        ) {
          console.log('valores diferentes');
        } else {
          console.log('valores iguais');
        }
        if (
          response.data.responseBody.rows[0]?.[1].toFixed(2) !=
          response.data.responseBody.rows[0]?.[2].toFixed(2)
        ) {
          console.log('valores diferentes');
        } else {
          console.log('valores iguais');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  //==============login sankhya==================================
  async function LoginSankhya(numPedido: any) {
    try {
      setTimeout(() => {}, 3000);
    } catch (error) {
      setLoading(false);
      console.log('erro', error);
    }
  }

  //===========LOGIN SANKHYA PESQUISA SALDO ======================
  async function LoginSankhyaSaldo(codPar: any) {
    try {
      await SaldoLimiteCred(codPar);
    } catch (error) {
      setLoading(false);
      console.log('erro', error);
    }
  }
  async function SaldoLimiteCred(codigoParceiro: any) {
    console.log('codigo do parceiro....', codigoParceiro);
    const codPARC = codigoParceiro;
    const sql = `SELECT PAR.CODPARC
                    , ISNULL(PAR.LIMCRED,0) LIMCRED
                    , ISNULL(PED.VLRPED,0) VLRPED
                    , ISNULL(FIN.VLRTIT,0) VLRFIN
                    , (ISNULL(PAR.LIMCRED,0)-ISNULL(PED.VLRPED,0)-ISNULL(FIN.VLRTIT,0)) LC_SALDO
                  
                  FROM TGFPAR PAR
                  LEFT JOIN (
                    SELECT CAB.CODPARC
                      , SUM(((ITE.QTDNEG-ITE.QTDENTREGUE) * VLRUNIT)) AS VLRPED
                    FROM TGFITE ITE 
                    JOIN TGFCAB CAB ON CAB.NUNOTA = ITE.NUNOTA
                    WHERE (ITE.QTDNEG-ITE.QTDENTREGUE) > 0
                    AND ITE.PENDENTE = 'S'
                    GROUP BY CAB.CODPARC
                  ) PED ON (PED.CODPARC = PAR.CODPARC)
                  LEFT JOIN (
                    SELECT CAB.CODPARC
                      , SUM(FIN.VLRDESDOB-FIN.VLRDESC-FIN.VLRBAIXA) AS VLRTIT
                    FROM TGFCAB CAB
                    JOIN TGFFIN FIN ON FIN.NUNOTA = CAB.NUNOTA
                    WHERE CAB.TIPMOV = 'V'
                    AND FIN.VLRDESDOB-FIN.VLRDESC-FIN.VLRBAIXA > 0
                    AND FIN.PROVISAO <> 'S'
                    AND ISNULL(FIN.NURENEG,0) = 0
                    GROUP BY CAB.CODPARC
                  ) FIN ON (FIN.CODPARC = PAR.CODPARC)
                  WHERE PAR.CODPARC = 6301`;
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20PAR.CODPARC%20%09%2C%20ISNULL%28PAR.LIMCRED%2C0%29%20LIMCRED%20%09%2C%20ISNULL%28PED.VLRPED%2C0%29%20VLRPED%20%09%2C%20ISNULL%28FIN.VLRTIT%2C0%29%20VLRFIN%20%09%2C%20%28ISNULL%28PAR.LIMCRED%2C0%29-ISNULL%28PED.VLRPED%2C0%29-ISNULL%28FIN.VLRTIT%2C0%29%29%20LC_SALDO%20%20FROM%20TGFPAR%20PAR%20LEFT%20JOIN%20%28%20%09SELECT%20CAB.CODPARC%20%09%09%2C%20SUM%28%28%28ITE.QTDNEG-ITE.QTDENTREGUE%29%20%2A%20VLRUNIT%29%29%20AS%20VLRPED%20%09FROM%20TGFITE%20ITE%20%20%09JOIN%20TGFCAB%20CAB%20ON%20CAB.NUNOTA%20%3D%20ITE.NUNOTA%20%09WHERE%20%28ITE.QTDNEG-ITE.QTDENTREGUE%29%20%3E%200%20%09AND%20ITE.PENDENTE%20%3D%20%27S%27%20%09GROUP%20BY%20CAB.CODPARC%20%29%20PED%20ON%20%28PED.CODPARC%20%3D%20PAR.CODPARC%29%20LEFT%20JOIN%20%28%20%09SELECT%20CAB.CODPARC%20%09%09%2C%20SUM%28FIN.VLRDESDOB-FIN.VLRDESC-FIN.VLRBAIXA%29%20AS%20VLRTIT%20%09FROM%20TGFCAB%20CAB%20%09JOIN%20TGFFIN%20FIN%20ON%20FIN.NUNOTA%20%3D%20CAB.NUNOTA%20%09WHERE%20CAB.TIPMOV%20%3D%20%27V%27%20%09AND%20FIN.VLRDESDOB-FIN.VLRDESC-FIN.VLRBAIXA%20%3E%200%20%09AND%20FIN.PROVISAO%20%3C%3E%20%27S%27%20%09AND%20ISNULL%28FIN.NURENEG%2C0%29%20%3D%200%20%09GROUP%20BY%20CAB.CODPARC%20%29%20FIN%20ON%20%28FIN.CODPARC%20%3D%20PAR.CODPARC%29%20WHERE%20PAR.CODPARC%20%3D%20${codPARC}`
      )
      .then((response) => {
        console.log(
          'Saldo Limite de credito..............',
          response.data.responseBody.rows[0]
        );
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }
  //=================================================================
  async function GetPedidosPalmpv(numPedido: any) {
    await api
      .get(
        `/api/ItemPedidoVenda/v2/by-pedidoId?pedidoId=${numPedido}`
      )
      .then((response) => {
        console.log('itens do novo pedido', response.data.data);
        setitensNovosPedido(response.data.data);
        itensNovosPedido = response.data.data;

        let somaTotalIpiGet = 0;
        response.data.data.forEach((item: any) => {
          const valorCalculado = item.produto.aliIpi
            ? item.valTotal + item.valTotal * (item.produto.aliIpi / 100)
            : item.valTotal;
          somaTotalIpiGet += valorCalculado;
        });

        setValorPedidoSelecionado(
          response.data.data.reduce(
            (accumulator: any, item: any) => accumulator + item.valTotal,
            0
          )
        );
        valorPedidoSelecionado = response.data.data.reduce(
          (accumulator: any, item: any) => accumulator + item.valTotal,
          0
        );
        setIpiEscolhido(somaTotalIpiGet);
        IpiEscolhido = somaTotalIpiGet;
      })
      .catch((error) => {});
  }

  //===========enviar dados sankhya =============================//
  async function GetVerificaEnviado(numeroPedido: any) {
    console.log(`verificando envio resposta  ${numeroPedido}`);
  }

  async function GetVerificaEnviado2(numeroPedido: any) {
    const sql = `SELECT * from AD_Z38 where PALMPV = ${numeroPedido}`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('verificando envio resposta', response.data.responseBody);

        if (response.data.responseBody.rows.length > 0) {
          console.log('verificando envio', 'Ok pode enviar');
        } else {
          console.log('verificando envio resposta ENTROU NO EERO ELSE');
        }
        if (
          response.data.responseBody &&
          response.data.responseBody.burstLimit === false
        ) {
          console.log('Verificando envio: ENTROU NO ERRO OU UNDEFINED');
        }
      })
      .catch((error) => {
        console.log('erro ao receber dados clientes', error);
      });
  }
  //=================== salvar como não enviado ===========================
  async function SalvarComoPendente() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    setdataPedidoNovo(String(dataPedidoatual));
    setvalorTotalNovo(somaTotal);
    const pal = gerarPalMPVComData(dataInicial);
    setpalMpv(pal);
    palMpv = pal;
    setShowMensageSankhya(true);
    setrespostaSank('Enviando Pedido...');

    const cabecalho: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'AProcessar',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    try {
      const itensSalvar = mapArrayPedidoToSalvar(numPedido);
      if (!validarPedidoComItensAtivos(itensSalvar, 'enviar o pedido')) {
        setShowMensageSankhya(false);
        return;
      }
      await enviarItensEmLotes(itensSalvar, cabecalho, true);
      console.log('entrouprocessar', cabecalho);
      popularCabecalho(cabecalho, 'N');
      localStorage.removeItem('@Portal/PedidoEmDigitacao');
      localStorage.removeItem('@Portal/itensPedido');
      setRealizandopedido(false);
      GetPromotor();
      setCabecalhoId(0);
      setnumPedido('');
      numPedido = '';
      setAddItem(true);
      addItem = true;
      setPlaceHolder('pesquisa por código ou nome');
      placeHolder = 'pesquisa por código ou nome';
      window.scrollTo(0, 0);
      setLoading(false);
      setValorTotal(0);
      valorTotal = 0;
      setDataentrega('');
      dataEntrega = '';
      setObservacao('');
      observacao = '';
      GetTresUltimos();
      setIArrayPedido([]);
      setIArrayPedidoValor([]);
      arrayPedidoValor = [];
      setPedidoCabecalho([]);
      pedidoCabecalho = [];
      setItemEnviado(false);
      itemEnviado = false;
      pesquisaPedido = false;
      localStorage.removeItem('@Portal/cabecalhoPedido');
      setRealizandopedido(false);
      GetPromotor();
      setCabecalhoId(0);
      setnumPedido('');
      numPedido = '';
      setAddItem(true);
      addItem = true;
      setPlaceHolder('pesquisa por código ou nome');
      placeHolder = 'pesquisa por código ou nome';
      window.scrollTo(0, 0);
      setLoading(false);
      setValorTotal(0);
      valorTotal = 0;
      setDataentrega('');
      dataEntrega = '';
      setObservacao('');
      observacao = '';
      GetTresUltimos();
      setItemEnviado(false);
      localStorage.setItem('@Portal/sincronizar', 'true');
      itemEnviado = false;
      setpedidosanteriores(false);
      pedidosanteriores = false;
      setbaixarPDFNovo(true);
      baixarPDFNovo = true;
      setpedidosanteriores(false);
      pedidosanteriores = false;
      setPesquisaPedido(false);
      pesquisaPedido = false;
      GetTresUltimos();
      setShowMensageSankhya(false);
    } catch {
      console.log('entrouprocessar erro');
      try {
        popularCabecalho(cabecalho, 'N');
      } catch {}
    }

    setMsgErro2(
      'Seu pedido está sendo enviado ao Sankhya, aguarde o processamento!'
    );
  }
  //=======================================================================

  async function SalvarComoEnviado() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    `${ano}-${mes}-${dia}`;
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

    const dataPedidoatual = dataFilt2;
    setdataPedidoNovo(String(dataPedidoatual));
    setvalorTotalNovo(somaTotal);
    setobservacaoPDF(observacao);
    const pal = gerarPalMPVComData(dataInicial);
    setpalMpv(pal);
    palMpv = pal;

    const cabecalho: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'Enviado',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    try {
      const itensSalvar = mapArrayPedidoToSalvar(numPedido);
      if (!validarPedidoComItensAtivos(itensSalvar, 'salvar o pedido')) return;
      await enviarItensEmLotes(itensSalvar, { ...cabecalho, status: 'Não Enviado' }, false);
      const resp = await api.get(
        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(numPedido))}`
      );
      const cabDb = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
      if (cabDb?.id != null) {
        await api.put(`/api/CabecalhoPedidoVenda/${cabDb.id}`, {
          ...cabecalho,
          id: Number(cabDb.id),
        });
      }

      GetPedidosPalmpv(numPedido);

      localStorage.removeItem('@Portal/itensPedido');
      setRealizandopedido(false);
      GetPromotor();
      GetListaCabecalho();
      setCabecalhoId(0);
      setnumPedido('');
      numPedido = '';
      setAddItem(true);
      addItem = true;
      setPlaceHolder('pesquisa por código ou nome');
      placeHolder = 'pesquisa por código ou nome';
      window.scrollTo(0, 0);
      setLoading(false);
      setValorTotal(0);
      valorTotal = 0;
      setDataentrega('');
      dataEntrega = '';
      setObservacao('');
      observacao = '';
      GetTresUltimos();
      setIArrayPedido([]);
      setIArrayPedidoValor([]);
      arrayPedidoValor = [];
      setPedidoCabecalho([]);
      pedidoCabecalho = [];
      setItemEnviado(false);
      itemEnviado = false;
      pesquisaPedido = false;
      localStorage.removeItem('@Portal/cabecalhoPedido');
      setRealizandopedido(false);
      GetPromotor();
      setCabecalhoId(0);
      setnumPedido('');
      numPedido = '';
      setAddItem(true);
      addItem = true;
      setPlaceHolder('pesquisa por código ou nome');
      placeHolder = 'pesquisa por código ou nome';
      window.scrollTo(0, 0);
      setLoading(false);
      setValorTotal(0);
      valorTotal = 0;
      setDataentrega('');
      dataEntrega = '';
      setObservacao('');
      observacao = '';
      GetTresUltimos();
      setItemEnviado(false);
      itemEnviado = false;
      setShowMensage2(true);
      setAlertErroMensage(true);
      setpedidosanteriores(false);
      pedidosanteriores = false;
      setbaixarPDFNovo(true);
      baixarPDFNovo = true;
      setpedidosanteriores(false);
      pedidosanteriores = false;
      setMsgErro('Pedido enviado com sucesso.');
      setPesquisaPedido(false);
      pesquisaPedido = false;
      GetTresUltimos();
      setShowMensageSankhya(false);
      popularCabecalho(cabecalho, 'N');
    } catch (error) {
      console.log(error);
      try {
        popularCabecalho({ ...cabecalho, status: 'Não Enviado' }, 'N');
      } catch {}
    }
  }

  //================================================================//

  // ======= SALVAR PEDIDOS COMO PROCESSAR ===========================

  async function SalvarDadosEnviandoSankhya(event: any) {
    event.preventDefault();

    setShowMensageSankhya(true);
    setAlertErroMensage2(false);
    setMsgErro2('');
    setrespostaSank('Enviando Pedido...');
    respostaSank = 'Enviando Pedido...';

    if (dataEntrega == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('dataEntrega');
      document.getElementById('dataEntrega')?.focus();
      setShowMensage(true);

      setAlertErroMensage(true);
      setMsgErro('É obrigatório informar a data de entrega.');
      return;
    }

    const dataPedidoAtual = new Date();
    const ano = dataPedidoAtual.getFullYear();
    const mes = String(dataPedidoAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataPedidoAtual.getDate()).padStart(2, '0');
    const horas = String(dataPedidoAtual.getHours()).padStart(2, '0');
    const minutos = String(dataPedidoAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataPedidoAtual.getSeconds()).padStart(2, '0');
    const milissegundos = String(dataPedidoAtual.getMilliseconds()).padStart(
      3,
      '0'
    );
    const dataPedidoNovo = `${ano}-${mes}-${dia}`;
    console.log(dataPedidoNovo);
    setdataPedidoNovo(String(dataPedidoNovo));
    setSucess(0);
    sucess = 0;
    Sucess();
    setMsgErro2('Enviando Pedido...');
    setrespostaSank('Enviando Pedido...');
    respostaSank = 'Enviando Pedido...';
    console.log('data do pedido 1', dataPedidoNovo);
    console.log('data de entrega 1', dataEntrega);
    // itens para envio serão derivados de arrayPedido on-demand

    const itensSemValor = arrayPedido.filter((item) => item.valUnit <= 0);

    if (itensSemValor.length > 0) {
      setAlertErroMensage2(true);
      const produtoIdsNaoSalvos = itensSemValor.map((item) => item.produtoId);
      const mensagemErro =
        'Alguns itens não puderam ser salvos. Os seguintes produtos têm valor unitário ou valor total igual a zero: ' +
        produtoIdsNaoSalvos.join(', ');
      setMsgErro2(mensagemErro);
    }

    const itensSalvarPendente = mapArrayPedidoToSalvar(numPedido);
    if (!validarPedidoComItensAtivos(itensSalvarPendente, 'enviar o pedido')) {
      setShowMensageSankhya(false);
      return;
    }

    SalvarItensPedidoPendente();
    // await api
    //   .post(`/api/Sankhya/EnviarDados`, {
    //     ItemPedidoVenda: pedidosSalvar,
    //     CabecalhoPedidoVenda: {
    //       Id: pedidoVendaID,
    //       Filial: String(codEmpresa),
    //       PalmPV: numPedido,
    //       VendedorId: usuario.username,
    //       TipoNegociacaoId: Number(tipoNegocia),
    //       TipPed: tipPed,
    //       ParceiroId: parceiroId,
    //       Data: dataPedidoNovo,
    //       Valor: somaTotal,
    //       DataEntrega: dataEntrega,
    //       Observacao: observacao,
    //     },
    //   })
    //   .then((response) => {
    //     console.log('teste de envio',response.data);
    //     setLoading(false);

    //     console.log("teste de envio", response);
    //     console.log("resposta", response);
    //     if (response.data.response == "Sucesso") {

    //       SalvarItensPedido()
    //       setShowMensageSankhya(false);
    //     } else {
    //       console.log(
    //         "entrou no else...................................................."
    //       );
    //       setSucess(0);
    //       sucess = 0;
    //       setShowMensageSankhya(false);
    //       setShowMensage(true);
    //       seterroPendente(true);
    //       setAlertErroMensage(true);
    //       setMsgErroNaoEnviar(`Erro ao enviar pedido!`);
    //       setMsgErro(
    //         `${response.data.response} Erro de comunicação com o Sankya `
    //       );

    //       setShowMensage(true);
    //       setAlertErroMensage(true);
    //       setMsgErro(
    //         `${response.data.response} Erro de comunicação com o Sankya, Envio Pendente...em alguns minutos enviaremos o pedido via offline!  `
    //       );
    //       SalvarItensPedidoPendente()
    //       //
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('teste de envio',error);
    //     setShowMensageSankhya(false);
    //     setShowMensage(true);
    //     SalvarItensPedidoPendente()
    //    // SalvarComoPendente();
    //     setAlertErroMensage(true);
    //     setMsgErro(
    //       "Erro de comunicação com o Sankya, Envio Pendente...em alguns minutos enviaremos o pedido via offline!"
    //     );
    //     setLoading(false);
    //   });
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

  async function EnvioPedidoSomenteSalvarProcessar() {
    setOperacaoTeveErro(false);
    setShowOperacao(true);
    setAlertErroMensage2(false);
    setMsgErro2('');
    setOperacaoMsg('Preparando envio...');
    setOperacaoProgress(5);

    if (String(dataEntrega).trim() === '') {
      setOperacaoTeveErro(true);
      setOperacaoMsg('É obrigatório informar a data de entrega.');
      setOperacaoProgress(100);
      return;
    }

    if (!numPedido || String(numPedido).trim() === '') {
      const pal = gerarPalMPVComData(dataFormarPedido);
      setnumPedido(pal);
      numPedido = pal;
    }

    setOperacaoProgress(10);
    const itensSalvar = mapArrayPedidoToSalvar(numPedido);

    if (!Array.isArray(itensSalvar) || contarItensAtivos(itensSalvar) === 0) {
      setOperacaoTeveErro(true);
      setOperacaoMsg('Não há itens ativos válidos para enviar.');
      setOperacaoProgress(100);
      return;
    }

    const totalEsperado = itensSalvar.length;
    setOperacaoMsg(`Salvando ${totalEsperado} itens...`);
    setOperacaoProgress(60);

    try {
      const data = new Date();
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const anoFinal = String(data.getFullYear());
      const hora = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');
      const segundos = String(data.getSeconds()).padStart(2, '0');
      const dataPedidoatual = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;

      const cabecalhoBase: ICabecalho = {
        vendedorId: obterVendedorIdParaPedido(),
        parceiroId: Number(parceiroId),
        filial: String(codEmpresa),
        palMPV: numPedido,
        status: 'Processar',
        tipPed: tipPed,
        tipoNegociacaoId: Number(tipoNegocia),
        data: dataPedidoatual,
        pedido: '',
        valor: somaTotal,
        dataEntrega: dataEntrega,
        observacao: observacao,
        ativo: 'S',
        versao: versaoFront,
      };

      await enviarItensEmLotes(itensSalvar, { ...cabecalhoBase, status: 'Não Enviado' }, false);

      const respCab = await api.get(
        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(numPedido))}`
      );
      const cabDb = (respCab as any)?.data?.cabecalho ?? (respCab as any)?.data ?? {};
      if (cabDb?.id != null) {
        await api.put(`/api/CabecalhoPedidoVenda/${cabDb.id}`, {
          ...cabecalhoBase,
          id: Number(cabDb.id),
        });
      }

      localStorage.removeItem('@Portal/PedidoEmDigitacao');
      popularCabecalho(cabecalhoBase, 'S');
      popularItem(arrayPedido, 'S');
      setOperacaoMsg(
        'Seu pedido está sendo enviado ao Sankhya, aguarde o processamento!'
      );
      setOperacaoProgress(100);
    } catch (error: any) {
      setOperacaoTeveErro(true);
      setOperacaoMsg(
        String(
          error?.response?.data?.message ??
            error?.message ??
            'Erro ao comunicar com servidor!'
        )
      );
      setOperacaoProgress(0);
    }
  }

  async function EnviarPedidoComRegraEnvio() {
    const tipo = await ObterTipoEnvioSankhyaConfiguracao();
    if (tipo === 1) {
      await EnvioPedidosProcessarSankhya();
      return;
    }
    await EnvioPedidoSomenteSalvarProcessar();
  }

  async function EnvioPedidosProcessarSankhya() {
    setOperacaoTeveErro(false);
    setShowOperacao(true);
    setAlertErroMensage2(false);
    setMsgErro2('');
    setOperacaoMsg('Preparando envio...');
    setOperacaoProgress(5);
    
    if (String(dataEntrega).trim() === '') {
      setOperacaoTeveErro(true);
      setOperacaoMsg('É obrigatório informar a data de entrega.');
      setOperacaoProgress(100);
      return;
    }
    
    if (!numPedido || String(numPedido).trim() === '') {
      const pal = gerarPalMPVComData(dataFormarPedido);
      setnumPedido(pal);
      numPedido = pal;
    }
    
    setOperacaoProgress(10);
    const itensSalvar = mapArrayPedidoToSalvar(numPedido);
    
    if (!Array.isArray(itensSalvar) || contarItensAtivos(itensSalvar) === 0) {
      setOperacaoTeveErro(true);
      setOperacaoMsg('Não há itens ativos válidos para enviar.');
      setOperacaoProgress(100);
      return;
    }
    
    // 1. ENVIAR TODOS OS ITENS EM UMA ÚNICA CHAMADA
    const totalEsperado = itensSalvar.length;
    if (totalEsperado > 50) {
      setOperacaoMsg(
        [
          'Seu pedido tem muitos itens',
          'Enviaremos todos os itens em uma única chamada.',
          `Processando ${totalEsperado} itens...`,
          'Aguarde, não feche esta tela.'
        ].join('\n')
      );
    } else {
      setOperacaoMsg(`Enviando ${totalEsperado} itens...`);
    }
    setOperacaoProgress(60);
    
    const respItens = await enviarItensEmLotes(itensSalvar);
    const totalSalvos = Number(respItens?.data?.totalSalvos ?? 0);
    if (totalSalvos !== totalEsperado) {
      setOperacaoTeveErro(true);
      setAlertErroMensage2(true);
      setMsgErro2(
        `Nem todos os itens foram salvos.\nItens enviados: ${totalEsperado}\nItens salvos: ${totalSalvos}\nCabeçalho será marcado como Pendente.`
      );
      await SalvarCabecalhoPendente(true);
      setOperacaoMsg(
        [
          'Falha ao salvar todos os itens.',
          `Itens enviados: ${totalEsperado}`,
          `Itens salvos: ${totalSalvos}`
        ].join('\n')
      );
      setOperacaoProgress(100);
      return;
    }

    setOperacaoMsg('Salvando cabeçalho...');
    setOperacaoProgress(75);
    
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var anoStr = String(ano);
    var anoFinal = anoStr;
    var hora = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');
    var dataFilt2 = `${anoFinal}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
    const dataPedidoatual = dataFilt2;
    
    if (!numPedido || String(numPedido).trim() === '') {
      const pal = gerarPalMPVComData(dataFormarPedido);
      setnumPedido(pal);
      numPedido = pal;
    }
    
    const cabecalho: ICabecalho = {
      vendedorId: obterVendedorIdParaPedido(),
      parceiroId: Number(parceiroId),
      filial: String(codEmpresa),
      palMPV: numPedido,
      status: 'AProcessar',
      tipPed: tipPed,
      tipoNegociacaoId: Number(tipoNegocia),
      data: dataPedidoatual,
      pedido: '',
      valor: somaTotal,
      dataEntrega: dataEntrega,
      observacao: observacao,
      ativo: 'S',
      versao: versaoFront,
    };
    
    localStorage.removeItem('@Portal/PedidoEmDigitacao');
    
    try {
      const itensSalvar = mapArrayPedidoToSalvar(numPedido);
      await enviarItensEmLotes(itensSalvar, cabecalho, true);
      popularCabecalho(cabecalho, 'S');
      popularItem(arrayPedido, 'S');
      setOperacaoMsg(
        'Seu pedido está sendo enviado ao Sankhya, aguarde o processamento!'
      );
      setOperacaoProgress(100);
    } catch (error: any) {
      setOperacaoTeveErro(true);
      setOperacaoMsg(
        String(
          error?.response?.data?.message ??
            error?.message ??
            'Erro ao comunicar com servidor!'
        )
      );
      setOperacaoProgress(0);
    }
  }
  //===============verificação de envio de pedido entre os 03 ultimos===========================//
  //===================deletar em caso de erro (NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA)========================//
  async function DeletarItensdCabecalho2(numeroPedidoSelecionado: any) {
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=delete from AD_Z39 where PALMPV = '${numeroPedidoSelecionado}'
`
      )
      .then((response) => {
        console.log('resultado do envio', response);

        DeletarCabecalho2(numeroPedidoSelecionado);
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }
  //============(NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA)==========
  async function DeletarCabecalho2(numeroPedidoSelecionado: any) {
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=delete from AD_Z38 where PALMPV = '${numeroPedidoSelecionado}'`
      )
      .then((response) => {
        console.log('resultado do envio', response);
        seterroPendente(true);

        setAlertErroMensage(true);

        setMsgErroNaoEnviar(
          `Erro ao enviar pedido! Ele será enviado novamente em minutos.`
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  //=================== verificar envio do pedido (NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA) ====================//
  async function VerificarEnvio2(numeroPedidoSelecionado: any) {
    console.log('numero do pedido selecionado', numeroPedidoSelecionado);
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=select Z38.PALMPV as id  , Z38.VALOR as vlrCab  , SUM(QTDE*PUNIT) as vlrItem from AD_Z39 Z39 join AD_Z38 Z38 ON Z38.PALMPV = Z39.PALMPV WHERE Z39.PALMPV = '${numeroPedidoSelecionado}' GROUP BY Z38.PALMPV , Z38.VALOR`
      )
      .then((response) => {
        console.log('resultado do envio', response);

        console.log(
          'valor 1',
          response.data.responseBody.rows[0]?.[1].toFixed(2)
        );
        console.log(
          'valor 2',
          response.data.responseBody.rows[0]?.[2].toFixed(2)
        );
        if (response.data.responseBody.rows[0]?.[1].toFixed(2) == undefined) {
          console.log('valores diferentes');
          DeletarItensdCabecalho2(numeroPedidoSelecionado);
          EditePedididoError03Ultimos(numeroPedidoSelecionado);
        }
        if (response.data.responseBody.rows[0]?.[2].toFixed(2) == undefined) {
          console.log('valores diferentes');
          DeletarItensdCabecalho2(numeroPedidoSelecionado);
          EditePedididoError03Ultimos(numeroPedidoSelecionado);
        }
        if (
          response.data.responseBody.rows[0]?.[1].toFixed(2) !=
          response.data.responseBody.rows[0]?.[2].toFixed(2)
        ) {
          console.log('valores diferentes');
          DeletarItensdCabecalho2(numeroPedidoSelecionado);
          EditePedididoError03Ultimos(numeroPedidoSelecionado);
        } else {
          console.log('valores iguais');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('erro recebimento', error);
      });
  }

  //==============login sankhya (NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA)==================================
  async function LoginSankhya2(numeroPedidoSelecionado: any) {
    setTimeout(() => {
      VerificarEnvio2(numeroPedidoSelecionado);
    }, 8000);
  }

  //=========ENVIANDO DADOS DEPOIS DE SALVOS (NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA) ===================================================//
  async function GetVerificaEnviadoPosSave(numeroPedido: any) {
    await GetVerificaEnviado3(numeroPedido);
  }
  async function GetVerificaEnviado3(numeroPedido: any) {
    const sql = `SELECT * from AD_Z38 where PALMPV =${numeroPedido}`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('verificando envio', response.data.responseBody.rows);

        if (response.data.responseBody.rows.length > 0) {
          console.log('verificando envio', 'Ok pode enviar');
          SalvarComoEnviadoPos();
        }
      })
      .catch((error) => {
        console.log('erro ao receber dados clientes', error);
      });
  }
  //========= (NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA)====================
  async function SalvarComoEnviadoPos() {
    setvalorTotalNovo(somaTotal);

    const cabecalho: ICabecalho = {
      vendedorId: Number(usuario.username),
      parceiroId: parceiroPedidoSelecionadoId,
      filial: filialPedidoSelecionado,
      palMPV: numeroPedidoSelecionado,
      status: 'Enviado',
      tipPed: tipPedSelecionado,
      tipoNegociacaoId: tipoNegociacaoPedidoSelecionadoId,
      data: dataPedidoSelecionado,
      pedido: '',
      valor: valorPedidoSelecionado,
      dataEntrega: dataEntregaPedidoSelecionado,
      observacao: observacaoPedidoSelecionado,
      ativo: 'S',
      versao: versaoFront,
    };
    console.log('entrou no enviar teste', cabecalho);

    const srcItens = itensPedidoSelecionadoList || itensPedidoSelecionado || [];
    const itensBase = (Array.isArray(srcItens) ? srcItens : []).filter(
      (item: any) => String(item?.inativo || 'N').toUpperCase() !== 'S'
    );
    if (!validarPedidoComItensAtivos(itensBase, 'salvar o pedido')) return;
    const totalEnvio = itensBase.length;
    const itensSalvarPos: IItenPedidoSalvar[] = itensBase.map((item: any) => ({
      vendedorId: Number(usuario.username),
      palMPV: String(numeroPedidoSelecionado),
      produtoId: Number(item?.produtoId),
      quant: Number(item?.quant),
      valUnit: Number(item?.valUnit),
      valTotal: Number(item?.valTotal),
      baixado: '',
    }));
    const respItens = await enviarItensEmLotes(
      itensSalvarPos,
      { ...cabecalho, status: 'Não Enviado' },
      false
    );
    const totalSalvos = Number(respItens?.data?.totalSalvos ?? 0);
    const statusHeader = totalSalvos === totalEnvio ? 'Não Enviado' : 'Pendente';
    if (statusHeader === 'Pendente') {
      try {
        await api.put(
          `/api/CabecalhoPedidoVenda/statusErroPalMPV?PalMPV=${encodeURIComponent(
            String(numeroPedidoSelecionado)
          )}`
        );
      } catch {}
    }
    popularCabecalho({ ...cabecalho, status: statusHeader }, 'N');
    setShowMensage(true);
    setAlertErroMensage(true);
    setMsgErro(
      statusHeader === 'Pendente'
        ? 'Pedido salvo como Pendente.'
        : 'Pedido salvo como Não Enviado.'
    );
    setPesquisaPedido(false);
    pesquisaPedido = false;
    GetTresUltimos();
  }

  //=====(NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA)========================

  async function SalvarComoPendentePos() {
    setvalorTotalNovo(somaTotal);

    const cabecalho: ICabecalho = {
      vendedorId: Number(usuario.username),
      parceiroId: parceiroPedidoSelecionadoId,
      filial: filialPedidoSelecionado,
      palMPV: numeroPedidoSelecionado,
      status: 'AProcessar',
      tipPed: tipPedSelecionado,
      tipoNegociacaoId: tipoNegociacaoPedidoSelecionadoId,
      data: dataPedidoSelecionado,
      pedido: '',
      valor: valorPedidoSelecionado,
      dataEntrega: dataEntregaPedidoSelecionado,
      observacao: observacaoPedidoSelecionado,
      ativo: 'S',
      versao: versaoFront,
    };
    console.log('entrou no enviar teste', cabecalho);

    const srcItens = itensPedidoSelecionadoList || itensPedidoSelecionado || [];
    const itensBase = (Array.isArray(srcItens) ? srcItens : []).filter(
      (item: any) => String(item?.inativo || 'N').toUpperCase() !== 'S'
    );
    if (!validarPedidoComItensAtivos(itensBase, 'enviar o pedido')) return;
    const totalEnvio = itensBase.length;
    const itensSalvarPos: IItenPedidoSalvar[] = itensBase.map((item: any) => ({
      vendedorId: Number(usuario.username),
      palMPV: String(numeroPedidoSelecionado),
      produtoId: Number(item?.produtoId),
      quant: Number(item?.quant),
      valUnit: Number(item?.valUnit),
      valTotal: Number(item?.valTotal),
      baixado: '',
    }));
    const respItens = await enviarItensEmLotes(
      itensSalvarPos,
      { ...cabecalho, status: 'Não Enviado' },
      false
    );
    const totalSalvos = Number(respItens?.data?.totalSalvos ?? 0);
    const statusHeader = totalSalvos === totalEnvio ? 'AProcessar' : 'Pendente';
    if (statusHeader === 'AProcessar') {
      try {
        await enviarItensEmLotes(itensSalvarPos, { ...cabecalho, status: 'AProcessar' }, true);
      } catch {}
    } else {
      try {
        await api.put(
          `/api/CabecalhoPedidoVenda/statusErroPalMPV?PalMPV=${encodeURIComponent(
            String(numeroPedidoSelecionado)
          )}`
        );
      } catch {}
    }
    setrespostaSank(
      statusHeader === 'Pendente'
        ? 'Itens parciais salvos. Cabeçalho marcado como Pendente.'
        : 'Seu pedido está sendo enviado ao Sankhya, aguarde o processamento!'
    );
    setOperacaoProgress(100);
    setShowOperacao(false);
    popularCabecalho({ ...cabecalho, status: statusHeader }, 'N');
    setPesquisaPedido(false);
    pesquisaPedido = false;
    GetTresUltimos();
  }
  //=====(NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA)========================
  async function EnviarDadosSankhya03Ultimos() {
    setRealizandopedido(false);
    setSucess(0);
    sucess = 0;
    Sucess();
    setPesquisaPedido(false);
    pesquisaPedido = false;
    setpedidosanteriores(false);
    pedidosanteriores = false;
    setrespostaSank('Enviando Pedido...');
    respostaSank = 'Enviando Pedido...';
    const dataPedidoFormatada = dataPedidoSelecionado.split('T')[0];
    const dataEntregaFormatada = dataEntregaPedidoSelecionado.split('T')[0];

    console.log('data depois de salvo', dataPedidoFormatada);
    console.log('data entrega depois de salvo', dataEntregaFormatada);
    await api
      .post(`/api/Sankhya/EnviarDados`, {
        ItemPedidoVenda: itensPedidoSelecionado,
        CabecalhoPedidoVenda: {
          Id: idPedidoSelecionado,
          Filial: filialPedidoSelecionado,
          PalmPV: numeroPedidoSelecionado,
          VendedorId: usuario.username,
          TipoNegociacaoId: tipoNegociacaoPedidoSelecionadoId,
          tipPed: tipPedSelecionado,
          ParceiroId: parceiroPedidoSelecionadoId,
          Data: dataPedidoSelecionado,
          Valor: valorPedidoSelecionado,
          DataEntrega: dataEntregaPedidoSelecionado,
          Observacao: observacaoPedidoSelecionado,
        },
      })
      .then((response) => {
        console.log(response.data);

        setLoading(false);
        console.log('resposta', response);
        if (response.data.response == 'Sucesso') {
          SalvarComoEnviadoPos();
        } else {
          console.log(
            'entrou no else....................................................'
          );
          setSucess(0);
          sucess = 0;
          console.log(
            'entrou no else....................................................'
          );
          setSucess(0);
          sucess = 0;
          setShowMensage(false);
          setIArrayPedido([]);
          setIArrayPedidoValor([]);
          arrayPedidoValor = [];
          setShowMensageSankhya(true);

          seterroPendente(true);
          setAlertErroMensage(true);
          setMsgErroNaoEnviar(`Erro ao enviar pedido!`);
          setMsgErro(
            `${response.data.response} Erro de comunicação com o Sankya `
          );

          setAlertErroMensage(true);
          setMsgErro(
            `${response.data.response} Erro de comunicação com o Sankya, Envio Pendente...em alguns minutos enviaremos o pedido via offline!  `
          );

          SalvarComoPendentePos();
        }
        GetListaCabecalho();
      })
      .catch((error) => {
        setShowMensage(true);
        SalvarComoPendentePos();
        setAlertErroMensage(true);
        setMsgErro(
          ` Erro de comunicação com o Sankya, Envio Pendente...em alguns minutos enviaremos o pedido via offline!  `
        );
        setLoading(false);
      });
  }
  // //============================================================//
  async function ErroaoEnviarDados(somaPedido: any) {
    console.log('entrou aqui no pendente');
    await api
      .put(`/api/CabecalhoPedidoVenda/${idPedidoSelecionado}/status`)

      .then((response) => {})
      .catch((error) => {
        return;
      });
  }
  //============enviar dados 03 ultimos ========================//
  //=====(NÃO MAIS UTILIZADO ERA QUANDO ERA ENVIADO DIRETAMENTE AO SANKHYA)========================
  async function EnviarDados03UltimosInutilizado() {
    setEditando(false);
    editando = false;

    setShowMensage(true);
    setAlertErroMensage(true);
    setMsgErro(`Enviando Pedido...`);

    setrespostaSank('Enviando Pedido...');
    respostaSank = 'Enviando Pedido...';
    const pal = String(numeroPedidoSelecionado || palMPVEscolhido || '').trim();
    await api
      .get(
        `/api/CabecalhoPedidoVenda/palmpv/${encodeURIComponent(String(pal))}`
      )
      .then((resp) => {
        const cab = (resp as any)?.data?.cabecalho ?? (resp as any)?.data ?? {};
        console.log('pedido de venda', cab);
        setDataPedidoId(cab?.data);
        dataPedidoId = cab?.data;

        EnviarDadosPut03Ultimos(cab?.valor);

        console.log('data entrega id', cab?.dataEntrega);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //==========enviar dados Sankhya ==============================//
  //=====(NÃO MAIS UTILIZADO)========================
  async function EnviarDadosPut03Ultimos(somaPedido: any) {
    setvalorTotalNovo(somaTotal);

    const cabecalho: ICabecalho = {
      vendedorId: Number(usuario.username),
      parceiroId: parceiroPedidoSelecionadoId,
      filial: filialPedidoSelecionado,
      palMPV: numeroPedidoSelecionado,
      status: 'Não Enviado',
      tipPed: tipPedSelecionado,
      tipoNegociacaoId: tipoNegociacaoPedidoSelecionadoId,
      data: dataPedidoSelecionado,
      pedido: '',
      valor: valorPedidoSelecionado,
      dataEntrega: dataEntregaPedidoSelecionado,
      observacao: observacaoPedidoSelecionado,
      ativo: 'S',
      versao: versaoFront,
    };
    console.log('entrou no enviar teste', cabecalho);

    try {
      const srcItens =
        itensPedidoSelecionadoList || itensPedidoSelecionado || [];
      const itensBase = (Array.isArray(srcItens) ? srcItens : []).filter(
        (item: any) => String(item?.inativo || 'N').toUpperCase() !== 'S'
      );
      if (!validarPedidoComItensAtivos(itensBase, 'salvar o pedido')) return;
      const itensSalvarPos: IItenPedidoSalvar[] = itensBase.map((item: any) => ({
        vendedorId: Number(usuario.username),
        palMPV: String(numeroPedidoSelecionado),
        produtoId: Number(item?.produtoId),
        quant: Number(item?.quant),
        valUnit: Number(item?.valUnit),
        valTotal: Number(item?.valTotal),
        baixado: '',
      }));
      await enviarItensEmLotes(itensSalvarPos, cabecalho, false);
      popularCabecalho(cabecalho, 'N');
      EnviarDadosSankhya03Ultimos();
    } catch {
      return;
    }
  }
  //=======================funcao addItem ===================
  function verificaProduto(codigo: number) {
    console.log(`entrou`, codigo);
    console.log(`array`, itensPedido);

    arrayPedido?.forEach((item, index) => {
      if (item.produtoId == codigo) {
        setShowMensagedup(true);
        setAlertErroMensage(true);
        setMsgErro('Este item já foi adicionado ao pedido!');
        setEmUso(false);
        emUso = false;
      } else {
      }
    });
  }

  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  //==========================================================//

  function isValidInput(input: string) {
    return input.length <= 2000;
  }

  async function persistObservacaoCabecalhoLocal(palmpv: string, obs: string) {
    try {
      const alvo = String(palmpv || '').trim();
      if (!alvo) return;
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      const todos = await store.getAll();
      const cab = (todos as any[]).find(
        (c: any) => String(c?.palMPV || '').trim() === alvo
      );
      if (cab) {
        cab.observacao = String(obs || '');
        await store.put(cab);
      }
      await transaction.done;
    } catch {}
  }

  function handleObservacaoChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const inputValue = event.target.value;
    if (isValidInput(inputValue)) {
      setObservacao(inputValue);
      observacao = inputValue;
      try {
        localStorage.setItem('PedidoInfoObservacao', String(inputValue || ''));
      } catch {}
      const palmpvAtual = String(numPedido || palMPVEscolhido || '').trim();
      if (palmpvAtual) {
        persistObservacaoCabecalhoLocal(palmpvAtual, String(inputValue || ''));
      }
    }
  }

  //========================funções pesquisa de pedidos =========================================
  function PesquisaTodos() {
    setPaginaList(1);
    settodos(true);
    setenviados(false);
    setpendentes(false);
    setnenviados(false);
    setSearchList('todos');
    searchList = 'todos';
    GetListaCabecalho(isOnline ? mobileListaTab : 'local');
  }
  function PesquisaEnviados() {
    setPaginaList(1);
    paginaList = 1;
    settodos(false);
    setenviados(true);
    setpendentes(false);
    setnenviados(false);
    setSearchList('Enviado');
    searchList = 'Enviado';
    GetListaCabecalho(isOnline ? mobileListaTab : 'local');
  }
  function PesquisaPendentes() {
    setPaginaList(1);
    paginaList = 1;
    settodos(false);
    setenviados(false);
    setpendentes(true);
    setnenviados(false);
    setSearchList('AProcessar');
    searchList = 'AProcessar';
    GetListaCabecalho(isOnline ? mobileListaTab : 'local');
  }
  function PesquisaNEnviados() {
    setPaginaList(1);
    paginaList = 1;
    settodos(false);
    setenviados(false);
    setpendentes(false);
    setnenviados(true);
    setSearchList('Não Enviado');
    searchList = 'Não Enviado';
    GetListaCabecalho(isOnline ? mobileListaTab : 'local');
  }
  const [pendenteErro, setPendenteErro] = useState(false);
  function PesquisaPendenteErro() {
    setPaginaList(1);
    paginaList = 1;
    settodos(false);
    setenviados(false);
    setpendentes(false);
    setnenviados(false);
    setPendenteErro(true);
    setSearchList('Pendente');
    searchList = 'Pendente';
    GetListaCabecalho(isOnline ? mobileListaTab : 'local');
  }
  //==============================================================================================

  return (
    <>
      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="sid-bar">
            <SideNavBar />
          </div>
          <NavbarDashHeader />
          <div className="titulo-page">
            <h1>Pedidos de Vendas</h1>
          </div>
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
            <div className="contain-pedido d-flex conteinerped-existente">
              {pesquisaPedido && mostrarTelaPedidoPrincipal && !showlistaPedidosSelec ? (
                <>
                  <div className="conteudo-pedido">
                    <div className="conteudo-pedido2">
                      <button
                        id="btn-sankhya5"
                        className="btn btn-voltar-pedido "
                        onClick={() => {
                          setmodalList2(false);
                          modalList2 = false;
                          setPesquisaPedido(false);
                          pesquisaPedido = false;
                          setMostrarTelaPedidoPrincipal(false);
                          setpedidosanteriores(false);
                          pedidosanteriores = false;
                          GetTresUltimos();
                        }}
                      >
                        Voltar
                      </button>
                      <div className="pedido-selec">
                        <div className="cabecalhoPesquisaPedido">
                          <h1 style={{ marginTop: 5 }} className="pedidoNumber">
                            Pedido Nº: {numeroPedidoSelecionado}
                          </h1>
                          <h1 className=" classBot d-flex">
                            <h1 style={{ marginTop: 5, marginBottom: 8 }}>
                              Status:{' '}
                            </h1>
                            <h1
                              style={
                                statusPedidoSelecionado == 'Enviado'
                                  ? {
                                      backgroundColor: '#008000',
                                      color: '#fff',
                                      marginTop: 3,
                                      marginLeft: 5,
                                      width: 80,
                                      padding: 3,
                                      borderRadius: 10,
                                      textAlign: 'center',
                                    }
                                  : statusPedidoSelecionado == 'Pendente'
                                  ? {
                                      backgroundColor: '#FFA500',
                                      color: '#fff',
                                      marginTop: 3,
                                      marginLeft: 5,
                                      width: 90,
                                      padding: 3,
                                      borderRadius: 10,
                                      textAlign: 'center',
                                    }
                                  : {
                                      backgroundColor: '#b3180d',
                                      color: '#fff',
                                      marginTop: 3,
                                      marginLeft: 5,
                                      width: 80,
                                      padding: 3,
                                      borderRadius: 10,
                                      textAlign: 'center',
                                    }
                              }
                              className=""
                            >
                              {statusPedidoSelecionado == 'Não Enviado'
                                ? 'A Enviar'
                                : statusPedidoSelecionado == 'Rascunho'
                                ? 'Rascunho'
                                : statusPedidoSelecionado}
                            </h1>
                          </h1>
                          <h1
                            style={{ marginTop: 5, marginBottom: 8 }}
                            className="classBot "
                          >
                            Ped. Sankhya:{' '}
                            <b
                              style={
                                numeroPedidoSankhya == '' ||
                                statusPedidoSelecionado == 'Não Enviado' ||
                                statusPedidoSelecionado == 'Pendente' ||
                                numeroPedidoSankhya == numeroPedidoSelecionado
                                  ? { color: 'red' }
                                  : {}
                              }
                            >
                              {numeroPedidoSankhya == '' ||
                              statusPedidoSelecionado == 'Não Enviado' ||
                              statusPedidoSelecionado == 'Pendente' ||
                              numeroPedidoSankhya == numeroPedidoSelecionado
                                ? 'Nulo'
                                : numeroPedidoSankhya}
                            </b>
                          </h1>
                          <>
                            {statusPedidoSelecionado == 'AProcessar' ||
                            statusPedidoSelecionado == 'EmEnvio' ||
                            statusPedidoSelecionado == 'Processar' ? (
                              <></>
                            ) : (
                              <>
                                <button
                                  className={
                                    statusPedidoSelecionado == 'Não Enviado'
                                      ? 'btn btn-primary enviar-pedido3'
                                      : 'btn btn-primary enviar-pedido4'
                                  }
                                  onClick={() => {
                                    setShowMensageLoadingDup(true);
                                    localStorage.setItem(
                                      '@Portal/PedidoEmDigitacao',
                                      'true'
                                    );
                                    setmodalList2(false);
                                    modalList2 = false;
                                    //EditarPedidoPendente();
                                    EditarPedidoPendente03Ultimo();
                                  }}
                                >
                                  {statusPedidoSelecionado == 'Não Enviado' ||
                                  statusPedidoSelecionado == 'Rascunho'
                                    ? 'Editar'
                                    : 'Duplicar'}
                                </button>
                              </>
                            )}
                            {statusPedidoSelecionado == 'Não Enviado' ? (
                              <></>
                            ) : (
                              <></>
                            )}
                          </>
                          {statusPedidoSelecionado == 'Enviado' ? (
                            <>
                              <PDFDownloadLink
                                style={{ fontSize: 20 }}
                                document={<PDFFile />}
                                fileName={`nota_${numeroPedidoSelecionado}.pdf`}
                              >
                                Baixar Prévia Pedido
                              </PDFDownloadLink>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <h1
                          style={{ marginTop: 15, marginLeft: 5 }}
                          className="super-sub-texto"
                        >
                          Cliente: {parceiroPedidoSelecionado}
                        </h1>
                        <div className="cabecalhoPesquisaPedido2">
                          <div className="dflexivel">
                            <div className="divisaoCentral">
                              <h1 className="super-sub-texto">
                                Tipo Negociação:{' '}
                              </h1>
                              <h1
                                className="super-sub-texto"
                                style={{ color: '#2031ed' }}
                              >
                                {tipoNegociacaoPedidoSelecionado}
                              </h1>
                              {naturezaPadraoPedidoSelecionado && (
                                <h1 className="super-sub-texto">
                                  Natureza Padrão:{' '}
                                  <span style={{ color: '#2031ed' }}>
                                    {naturezaPadraoPedidoSelecionado}
                                  </span>
                                </h1>
                              )}
                            </div>
                            <div className="divisaoCentral">
                              <h1 className="super-sub-texto">
                                Tipo de pedido:{' '}
                              </h1>
                              <h1
                                className="super-sub-texto"
                                style={{ color: '#2031ed' }}
                              >
                                {tipPedSelecionado == '1'
                                  ? 'Venda'
                                  : 'Bonificação'}
                              </h1>
                            </div>
                            <div className="divisaoCentral">
                              <h1 className="super-sub-texto">
                                Data do pedido:{' '}
                              </h1>
                              <h1
                                className="super-sub-texto"
                                style={{ color: '#2031ed' }}
                              >
                                {formataData(dataPedidoSelecionado)}
                              </h1>
                            </div>
                          <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                            <h1 className="super-sub-texto" style={{ textAlign: 'right' }}>
                              Quant. Itens:{' '}
                              <span style={{ color: '#2031ed' }}>
                                {itensPedidoSelecionadoListAtivos.length > 0
                                  ? itensPedidoSelecionadoListAtivos.reduce((acc: number, it: any) => acc + Number(it?.quant || 0), 0)
                                  : Array.isArray(itensPedidoSelecionado)
                                  ? filtrarItensAtivosLista(itensPedidoSelecionado as any).reduce((acc: number, it: any) => acc + Number(it?.quant || 0), 0)
                                  : 0}
                              </span>
                            </h1>
                          </div>
                          </div>
                          <div className="dflexivel2">
                            <div className="divisaoCentral">
                              <h1 className="super-sub-texto">
                                Valor do pedido:{' '}
                              </h1>

                              <h1
                                style={{ color: '#2031ed', fontWeight: 'bold' }}
                                className="super-texto2"
                              >
                                R$ {moeda(valorPedidoSelecionado)}
                              </h1>
                            </div>
                            <div className="divisaoCentral">
                              <h1 className="super-sub-texto">
                                Valor do pedido C/ Ipi:{' '}
                              </h1>

                              <h1
                                style={{ color: '#2031ed', fontWeight: 'bold' }}
                                className="super-texto2"
                              >
                                R${' '}
                                {moeda(
                                  calcularTotaisPedidoComIpi(
                                    itensPedidoSelecionadoListAtivos.length > 0
                                      ? itensPedidoSelecionadoListAtivos
                                      : Array.isArray(itensPedidoSelecionado)
                                      ? filtrarItensAtivosLista(
                                          itensPedidoSelecionado as any
                                        )
                                      : [],
                                    ufCliente
                                  ).totalLiquido
                                )}
                              </h1>
                            </div>
                            <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                              <h1 className="super-sub-texto" style={{ textAlign: 'right' }}>
                                Quant. Itens:{' '}
                                <span style={{ color: '#2031ed' }}>
                                  {itensPedidoSelecionadoListAtivos.length > 0
                                    ? itensPedidoSelecionadoListAtivos.reduce((acc: number, it: any) => acc + Number(it?.quant || 0), 0)
                                    : Array.isArray(itensPedidoSelecionado)
                                    ? filtrarItensAtivosLista(itensPedidoSelecionado as any).reduce((acc: number, it: any) => acc + Number(it?.quant || 0), 0)
                                    : 0}
                                </span>
                              </h1>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                            <h1 className="super-sub-texto" style={{ textAlign: 'right' }}>
                              Quant. Itens:{' '}
                              <span style={{ color: '#2031ed' }}>
                                {itensPedidoSelecionadoListAtivos.length > 0
                                  ? itensPedidoSelecionadoListAtivos.length
                                  : Array.isArray(itensPedidoSelecionado)
                                  ? filtrarItensAtivosLista(itensPedidoSelecionado as any).length
                                  : 0}
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="separador"></div>
                      <div className="table-responsive  tabela-responsiva-pedido-realizado">
                        <div className=" table-wrap">
                          <Table
                            responsive
                            className="table-global table  main-table"
                          >
                            <thead>
                              <tr className="tituloTab">
                                {isMobile ? (
                                  <>
                                    <th className="th2 nome-grupo paddingPedido">
                                      <h1 style={{ marginLeft: 4 }}>
                                        LISTA DE PRODUTOS ESCOLHIDOS
                                      </h1>
                                    </th>
                                  </>
                                ) : (
                                  <>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1 id-grupo th-tabela-pedido paddingPedido"
                                    >
                                      Código
                                    </th>
                                    <th className="th2 nome-grupo paddingPedido">
                                      Desc. Produto
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th4 th-tabela-pedido paddingPedido "
                                    >
                                      Qtd.
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1 paddingPedido"
                                    >
                                      Prc. Venda
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1 paddingPedido"
                                    >
                                      Valor
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1 paddingPedido"
                                    >
                                      Ipi %
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1 paddingPedido"
                                    >
                                      Item C/Ipi
                                    </th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {itensPedidoSelecionado?.length > 0 ? (
                                <>
                                  {itensPedidoSelecionado?.map(
                                    (item, index) => (
                                      <tr key={index}>
                                        {isMobile ? (
                                          <>
                                            <div className="d-flex paddingPedido4">
                                              <div>
                                                <h2 className="descProdMob3">
                                                  {item.produto?.nome}
                                                </h2>
                                                <h2 className="desccontdMob2">
                                                  Cod.: {item.produtoId}
                                                  <b
                                                    style={{
                                                      marginLeft: 10,
                                                    }}
                                                  ></b>
                                                  Qtd.:{item.quant}
                                                  <b
                                                    style={{
                                                      marginLeft: 10,
                                                    }}
                                                  ></b>
                                                  Vlr.UN: {moeda(item.valUnit)}
                                                  <b
                                                    style={{
                                                      marginLeft: 10,
                                                    }}
                                                  ></b>
                                                </h2>
                                                <h2 className="desccontdMob2">
                                                  Valor R$:{' '}
                                                  {moeda(item.valTotal)}
                                                  <b
                                                    style={{
                                                      marginLeft: 10,
                                                    }}
                                                  ></b>
                                                  Ipi %: {ufCliente === 'CE' ? 0 : item.produto?.aliIpi}
                                                  <b
                                                    style={{
                                                      marginLeft: 10,
                                                    }}
                                                  ></b>
                                                  Item C/Ipi:{' '}
                                                  {ufCliente !== 'CE' && item.produto?.aliIpi
                                                    ? `${moeda(
                                                        item.valTotal +
                                                          item.valTotal *
                                                            (item.produto
                                                              ?.aliIpi /
                                                              100)
                                                      )}`
                                                    : moeda(item.valTotal)}
                                                </h2>
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <td
                                              style={{ textAlign: 'center' }}
                                              className="id-grupo"
                                            >
                                              {item?.produtoId}
                                            </td>
                                            <td className="nome-grupo">
                                              {item.produto?.nome}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                              {item?.quant}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                              {moeda(item?.valUnit)}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                              {moeda(item?.valTotal)}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                              {ufCliente === 'CE' ? 0 : item.produto?.aliIpi}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                              {ufCliente !== 'CE' && item.produto?.aliIpi
                                                ? `${moeda(
                                                    item.valTotal +
                                                      item.valTotal *
                                                        (item.produto?.aliIpi / 100)
                                                  )}`
                                                : moeda(item.valTotal)}
                                            </td>
                                          </>
                                        )}
                                      </tr>
                                    )
                                  )}
                                </>
                              ) : sucess < 100 ? (
                                <div
                                  style={{ margin: 'auto' }}
                                  className="alert alert-warning alerta-item"
                                  role="alert"
                                >
                                  Carregando dados...
                                </div>
                              ) : (
                                <div
                                  style={{ margin: 'auto' }}
                                  className="alert alert-warning alerta-item"
                                  role="alert"
                                >
                                  Nenhum item encontrado.
                                </div>
                              )}
                            </tbody>
                          </Table>
                          <Paginacao
                            total={itensPedidoSelecionadoListAtivos?.length ?? 0}
                            limit={qtdePaginaItens2}
                            paginaAtual={paginaItens2}
                            setPagina={setPaginaItens2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="paddingdiv"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="conteudo-pedido">
                    <div
                      className={
                        realizandopedido
                          ? 'div-nome-vendedor'
                          : 'div-nome-vendedorn'
                      }
                    >
                      <h1 className="nome-vendedor pedidotext-mobile">
                        Vendedor: {usuario.username}
                        {' - '}
                        {usuario.nomeCompleto}
                      </h1>
                      {realizandopedido ? (
                        <>
                          <h1 className="super-texto  pedidotext-mobile2">
                            Pedido Nº: {numPedido}
                          </h1>
                          {arrayPedido.length > 0 ? (
                            <>
                              {pedidoPendente ? (
                                <></>
                              ) : (
                                <>
                                  <div className="diveditavel">
                                    {editandoPedido ? (
                                      <>
                                        {statusPedidoSelecionado ==
                                        'Rascunho' ? (
                                          <></>
                                        ) : (
                                          <></>
                                        )}
                                        <button
                                          id="btn-sankhya6"
                                          className="btn btn-cancelar-pedido "
                                          onClick={CancelarPedidoEditar}
                                        >
                                          Cancelar Pedido
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          disabled={itemEnviado}
                                          id="btn-sankhya3"
                                          className="btn btn-cancelar-pedido "
                                          onClick={CancelarPedido}
                                        >
                                          Cancelar Pedido
                                        </button>
                                      </>
                                    )}
                                    <button
                                      id="btn-sankhya"
                                      className="btn  btn-primary btnSairPedido"
                                      onClick={SalvarDados}
                                    >
                                      Salvar Ped.
                                    </button>
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    {alertErro && (
                      <div className="mt-3 mb-0 alertaErro">
                        <Alert msg={msgErro} setAlertErro={setAlertErro} />
                      </div>
                    )}
                    <div className="coluna-dupla">
                      <div className="bloco-input bloco-parceiro-pedido">
                        <p className="title-input">
                          Cliente: <span style={{ color: 'red' }}>*</span>
                        </p>
                        <Select
                          id="promotor"
                          className="inputparceiro"
                          placeholder={
                            promotorLoading
                              ? 'Procurando lista de Clientes...'
                              : placeHolder
                          }
                          noOptionsMessage={() =>
                            promotorLoading
                              ? 'Procurando lista de Clientes...'
                              : 'Nenhum cliente encontrado! Favor receber dados Sankhya!'
                          }
                          onMenuOpen={Verifica}
                          isDisabled={
                            itemEnviado || arrayPedido?.length > 0 || showlistaPedidosSelec
                          }
                          options={promotorPesquisa}
                          onChange={(value: any) => {
                            localStorage.removeItem('PedidoSelecionadoId');
                            localStorage.removeItem('PedidoSelecionadoPALMPV');
                            localStorage.removeItem('PedidoInfoFilial');
                            localStorage.removeItem('PedidoInfoTipoNegociacaoId');
                            localStorage.removeItem('PedidoInfoTipPed');
                            localStorage.removeItem('PedidoInfoObservacao');
                            setobservacaoPDF('');
                            setvalorTotalNovo(0);
                            setPagina(1);
                            pagina = 1;
                            setItensTabela([]);
                            itensTabela = [];
                            setItensTabelaGeral([]);
                            itensTabelaGeral = [];
                            setItensTabelaTotal([]);
                            itensTabelaTotal = [];
                            setTotalPaginas(0);
                            totalPaginas = 0;
                            setCodTabela('');
                            codTabela = '';
                            setDescTabelaPreco('');
                            descTabelaPreco = '';
                            setCodEmpresa('1');
                            codEmpresa = '1';
                            setTipPed('1');
                            tipPed = '1';
                            setEditando(false);
                            setCodCliente(value.value);
                            localStorage.setItem(
                              'ClienteEscolhido',
                              String(value.value)
                            );
                            codCliente = value.value;
                            setParceiroId(value.value);
                            parceiroId = value.value;
                            console.log('cod vendedor', codCliente);
                            Getcliente(value.value);
                            setRealizandopedido(true);
                            setPlaceHolder(value.label);
                            placeHolder = value.label;
                            GetItensPedidoinic();
                            setItensDoPedido(0);
                            itensDoPedido = 0;
                            GetCabecalho();
                            GetTresUltimos();
                            setFilter(false);
                            filter = false;
                            setSearch('');
                            search = '';
                            setPesquisaNome(true);
                            setPesquisaGrupo(false);
                            setPesquisaCod(false);
                            GetListaCabecalho();
                            setAlertErroMensage(false);
                            seterroPendente(false);
                          }}
                        />
                        {realizandopedido ? (
                          <>
                            <h1
                              className="texto-cnpj"
                              style={{
                                textAlign: 'justify',
                                marginTop: 5,
                                marginLeft: 3,
                              }}
                            >
                              CNPJ: {cnpjMask(cnpj)}
                            </h1>
                            <h1
                              className="texto-endereco"
                              style={{
                                textAlign: 'justify',
                                marginTop: 5,
                                marginLeft: 3,
                              }}
                            >
                              {enderecoCliente}
                            </h1>
                            <div
                              className="limite-credito"
                              onMouseLeave={() => {
                                setmostrarDiv(false);
                                mostrarDiv = false;
                              }}
                              onMouseOver={() => {
                                if (titulosVencidos) {
                                  setmostrarDiv(true);
                                  mostrarDiv = true;
                                }
                              }}
                            >
                              <div className="limitesCredito">
                                <h2 className="texto-limite">
                                  Lim. de Cred.: {moeda(lc)}
                                </h2>
                                <h2 className="texto-limite">
                                  Saldo Lim. de Cred.: {moeda(saldo)}
                                </h2>
                              </div>
                              {titulosVencidos ? (
                                <>
                                  <div className="limitesCredito">
                                    <h2
                                      style={{ marginBottom: 0 }}
                                      className="texto-limite"
                                    >
                                      Qtd. Tit Venc.: {qtdItensVenc}
                                    </h2>
                                    <h2
                                      style={{ marginBottom: 0 }}
                                      className="texto-limite"
                                    >
                                      Vlr. Tit. Venc.: R${' '}
                                      {moeda(valorItensVenc)}{' '}
                                      <FaRegEye
                                        style={{ marginLeft: 10 }}
                                        fontSize={13}
                                      />
                                    </h2>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            {mostrarDiv ? (
                              <>
                                <div className="limite-creditotext">
                                  <div className="table-responsive table-vencido">
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
                                              N. Unico
                                            </th>
                                            <th className="th2 nome-grupo">
                                              Dt. emissão
                                            </th>
                                            <th
                                              style={{ textAlign: 'center' }}
                                              className="th1"
                                            >
                                              Dt. Vencimento
                                            </th>
                                            <th
                                              style={{ textAlign: 'center' }}
                                              className="th4 th-tabela-pedido "
                                            >
                                              Parcela
                                            </th>
                                            <th
                                              style={{ textAlign: 'center' }}
                                              className="th1"
                                            >
                                              Valor
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {titulo?.length > 0 ? (
                                            <>
                                              {titulo?.map((item, index) => (
                                                <tr key={index}>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                    className="id-grupo"
                                                  >
                                                    {item.nuUnico}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                  >
                                                    {formataData(
                                                      item.dataEmissao
                                                    )}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                  >
                                                    {formataData(
                                                      item.dataVencim
                                                    )}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                  >
                                                    {item.parcela}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                  >
                                                    R$ {moeda(item.valor)}
                                                  </td>
                                                </tr>
                                              ))}
                                            </>
                                          ) : (
                                            <div
                                              style={{ margin: 'auto' }}
                                              className="alert alert-warning alerta-item"
                                              role="alert"
                                            >
                                              Nenhum item encontrado.
                                            </div>
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            <div style={{ paddingTop: 9 }} className="d-flex">
                              <p className="title-inputes datainput">
                                Data Disp. Faturamento:
                              </p>
                              <input
                                className="form-control select inputparceiro select-data-pedido"
                                id="dataEntrega"
                                type="date"
                                min={dataAtual}
                                max="2999-12-31"
                                value={dataEntrega}
                                onBlur={verificaDataEntrega}
                                onChange={(e) => {
                                  setDataentrega(e.target.value);
                                  dataEntrega = e.target.value;
                                  console.log('data entrega', dataEntrega);
                                  LimparErro();
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      {realizandopedido ? (
                        <>
                          <div className="bloco-input bloco-tabela-pedido">
                            <div className="">
                              <div className="bloco-input imputTpPed">
                                <p className="title-input">
                                  Tipo Pedido:{' '}
                                  <span style={{ color: 'red' }}>*</span>
                                </p>
                                <select
                                  className="form-select select inputparceiro  campo-select"
                                  aria-label=""
                                  disabled={itemEnviado}
                                  value={tipPed}
                                  onChange={(e) => {
                                    setTipPed(e.target.value);
                                    tipPed = e.target.value;
                                    console.log('tipo de pedido', tipPed);
                                  }}
                                >
                                  <option value="1">Venda</option>
                                  <option value="2">Bonificação</option>
                                </select>
                              </div>
                              <h1 className="titulo-Tabela-pedido">
                                Tabela: {descTabelaPreco}
                              </h1>
                            </div>
                            <div>
                              <div
                                style={{ marginTop: 10 }}
                                className="divisa2"
                              ></div>
                              <p>Observações:</p>
                              <textarea
                                maxLength={240}
                                className="form-control obs-pedido"
                                onChange={handleObservacaoChange}
                                value={observacao}
                              />
                            </div>
                          </div>
                          <div className="classe-tripla">
                            <div className="classe-dupla ">
                              <div className="bloco-input bloco-empresa-pedido">
                                <p className="title-input">
                                  Empresa:{' '}
                                  <span style={{ color: 'red' }}>*</span>
                                </p>
                                {editando ? (
                                  <select
                                    className="form-select select inputparceiro  campo-select"
                                    aria-label=""
                                    disabled={
                                      itemEnviado || arrayPedido?.length > 0
                                    }
                                    value={codEmpresa}
                                    onChange={(e) => {
                                      applyEmpresaSelection(e.target.value);
                                    }}
                                  >
                                    {isMobile
                                      ? (
                                          <>
                                            {OptinosEmpresa?.map((empresa) => (
                                              <option
                                                key={empresa.value}
                                                value={empresa.value}
                                              >
                                                {empresa.label}
                                              </option>
                                            ))}
                                            {!OptinosEmpresa?.some(
                                              (item) =>
                                                String(item?.value) === String(codEmpresa)
                                            ) && (
                                              <option key={`fallback-${codEmpresa}`} value={String(codEmpresa)}>
                                                {String(codEmpresa) === '1'
                                                  ? 'Indústria'
                                                  : String(codEmpresa) === '2'
                                                  ? 'Distribuidora'
                                                  : String(codEmpresa) === '3'
                                                  ? 'Distrib. - SP'
                                                  : ''}
                                              </option>
                                            )}
                                          </>
                                        )
                                      : (
                                          <>
                                            {tipoEmpresaSelect?.map((empresa) => (
                                          <option
                                            key={empresa.empresaId}
                                            value={String(empresa.empresaId)}
                                          >
                                            {empresa.empresa?.descricao}
                                          </option>
                                            ))}
                                            {!tipoEmpresaSelect?.some(
                                              (item) => String(item?.empresaId) === String(codEmpresa)
                                            ) && (
                                              <option key={`fallback-${codEmpresa}`} value={String(codEmpresa)}>
                                                {String(codEmpresa) === '1'
                                                  ? 'Indústria'
                                                  : String(codEmpresa) === '2'
                                                  ? 'Distribuidora'
                                                  : String(codEmpresa) === '3'
                                                  ? 'Distrib. - SP'
                                                  : ''}
                                              </option>
                                            )}
                                          </>
                                        )}
                                  </select>
                                ) : (
                                  <select
                                    className="form-select select inputparceiro  campo-select"
                                    aria-label=""
                                    disabled={
                                      itemEnviado || arrayPedido?.length > 0
                                    }
                                    value={codEmpresa}
                                    onChange={(e) => {
                                      applyEmpresaSelection(e.target.value);
                                    }}
                                  >
                                    {isMobile
                                      ? (
                                          <>
                                            {OptinosEmpresa?.map((empresa) => (
                                              <option
                                                key={empresa.value}
                                                value={empresa.value}
                                              >
                                                {empresa.label}
                                              </option>
                                            ))}
                                            {!OptinosEmpresa?.some(
                                              (item) =>
                                                String(item?.value) === String(codEmpresa)
                                            ) && (
                                              <option key={`fallback-${codEmpresa}`} value={String(codEmpresa)}>
                                                {String(codEmpresa) === '1'
                                                  ? 'Indústria'
                                                  : String(codEmpresa) === '2'
                                                  ? 'Distribuidora'
                                                  : String(codEmpresa) === '3'
                                                  ? 'Distrib. - SP'
                                                  : ''}
                                              </option>
                                            )}
                                          </>
                                        )
                                      : (
                                          <>
                                            {tipoEmpresaSelect?.map((empresa) => (
                                          <option
                                            key={empresa.empresaId}
                                            value={String(empresa.empresaId)}
                                          >
                                            {empresa.empresa?.descricao}
                                          </option>
                                            ))}
                                            {!tipoEmpresaSelect?.some(
                                              (item) => String(item?.empresaId) === String(codEmpresa)
                                            ) && (
                                              <option key={`fallback-${codEmpresa}`} value={String(codEmpresa)}>
                                                {String(codEmpresa) === '1'
                                                  ? 'Indústria'
                                                  : String(codEmpresa) === '2'
                                                  ? 'Distribuidora'
                                                  : String(codEmpresa) === '3'
                                                  ? 'Distrib. - SP'
                                                  : ''}
                                              </option>
                                            )}
                                          </>
                                        )}
                                  </select>
                                )}
                              </div>
                              <div className="bloco-input bloco-condpag-pedido">
                                <p className="title-input">
                                  Cond. Pgto.:{' '}
                                  <span style={{ color: 'red' }}>*</span>
                                </p>
                                {editando ? (
                                  <select
                                    id="condpag"
                                    className="form-select select inputparceiro  campo-select"
                                    aria-label=""
                                    value={tipoNegocia}
                                    onChange={(e) => {
                                    setCondPagtoManual(true);
                                      setTipoPagamento(e.target.value);
                                      setTipoNegocia(e.target.value);
                                      tipoNegocia = e.target.value;
                                      tipoPagamento = e.target.value;
                                      const opt = (e.target as HTMLSelectElement).options[
                                        (e.target as HTMLSelectElement).selectedIndex
                                      ];
                                      console.log(
                                        'Cond. Pagamento selecionada - tipo de Natureza:',
                                        opt?.text
                                      );
                                    carregarNaturezaPadraoPorDescricao(opt?.text || '');
                                    }}
                                  >
                                    {!OptinosNegocia.some(
                                      (o) => String(o.value) === String(tipoNegocia)
                                    ) && (
                                      <option
                                        key={`fallback-${String(tipoNegocia)}`}
                                        value={String(tipoNegocia)}
                                      >
                                        {OptinosNegocia.find(
                                          (o) => String(o.value) === String(tipoNegocia)
                                        )?.label ||
                                          tipoNegociacaoPedidoSelecionado ||
                                          descTipo ||
                                          'Selecionado'}
                                      </option>
                                    )}
                                    {OptinosNegocia.map((tipo) => (
                                      <option key={String(tipo.value)} value={tipo.value}>
                                        {tipo.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <select
                                    id="condpag"
                                    className="form-select select inputparceiro  campo-select"
                                    aria-label=""
                                    value={tipoNegocia}
                                    onChange={(e) => {
                                      setCondPagtoManual(true);
                                      setTipoPagamento(e.target.value);
                                      setTipoNegocia(e.target.value);
                                      tipoNegocia = e.target.value;
                                      tipoPagamento = e.target.value;
                                      const opt = (e.target as HTMLSelectElement).options[
                                        (e.target as HTMLSelectElement).selectedIndex
                                      ];
                                      carregarNaturezaPadraoPorDescricao(opt?.text || '');
                                    }}
                                  >
                                    {!OptinosNegocia.some(
                                      (o) => String(o.value) === String(tipoNegocia)
                                    ) && (
                                      <option
                                        key={`fallback-${String(tipoNegocia)}`}
                                        value={String(tipoNegocia || '')}
                                      >
                                        {OptinosNegocia.find(
                                          (o) => String(o.value) === String(tipoNegocia)
                                        )?.label ||
                                          descTipo ||
                                          'Selecionado'}
                                      </option>
                                    )}
                                    {OptinosNegocia.map((tipo) => (
                                      <option key={String(tipo.value)} value={tipo.value}>
                                        {tipo.label}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            </div>
                            <div className="bloco-input bloco-natureza-padrao-pedido" style={{ width: '100%', marginTop: 8 }}>
                              <p className="title-input" style={{ fontSize: 12 }}>Natureza Padrão:</p>
                              <input
                                id="naturezaPadraoEdit"
                                className="form-control select inputparceiro"
                                value={naturezaPadraoEdit}
                                disabled
                              />
                            </div>
                            <div className="ultimos-pedidos tarjtext">
                              <div className="tarja-3-pedidos d-flex">
                                <h1
                                  className="tarjtext"
                                  style={{ letterSpacing: 1 }}
                                >
                                  ** Ultimos 3 Pedidos Enviados **
                                </h1>
                                <button
                                  className="btn btn-dark"
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    OpemModal();
                                  }}
                                >
                                  Lista de Pedidos
                                </button>
                              </div>
                              <div className="ultimosPedidos ">
                                <div className="ultimos-itens tarjtext">
                                  <h1 className="tarjtext">Nº PalMPV </h1>
                                  <h1
                                    style={{
                                      textAlign: 'center',
                                      marginLeft: 40,
                                    }}
                                    className="tarjtext"
                                  >
                                    Ped. Sankhya{' '}
                                  </h1>
                                  <h1
                                    className="tarjtext"
                                    style={{ marginRight: 22}}
                                  >
                                    {' '}
                                    Valor{' '}
                                  </h1>
                                  <h1
                                    className="tarjtext"
                                    style={{ marginLeft: 10 }}
                                  >
                                    {' '}
                                    Status
                                  </h1>
                                </div>
                                <div className="divisa"></div>
                                <div
                                  style={
                                    status01 == 'A ENVIAR'
                                      ? { backgroundColor: '#FF9912' }
                                      : {}
                                  }
                                  className="ultimos-itens"
                                  onClick={() => {
                                    GetTabelaPrecodata(
                                      codParceiro1,
                                      codEmpresa1,
                                      dataPedido1
                                    );
                                    setmodalList2(true);
                                    modalList2 = true;
                                    setPaginaItens(1);
                                    paginaItens = 1;
                                    setpedidosanteriores(true);
                                    pedidosanteriores = true;

                                    if (itemEnviado == false) {
                                      console.log('pesquisa', pesquisaPedido);
                                      GetPedidoVendaIdModalApi(
                                        descPedido01,
                                        pedidoId01
                                      );
                                    }
                                  }}
                                >
                                  <p className="p12">{descPedido01} </p>
                                  <p
                                    style={
                                      descSankhya01 == 'null' ||
                                      descSankhya01 == '' ||
                                      descSankhya01 == descPedido01
                                        ? { color: 'red' }
                                        : { color: 'blue' }
                                    }
                                    className="p12"
                                  >
                                    {descSankhya01 == 'null' ||
                                    descSankhya01 == '' ||
                                    descSankhya01 == descPedido01 ? (
                                      ' '
                                    ) : (
                                      <>{descSankhya01}</>
                                    )}{' '}
                                  </p>
                                  <p className="p12" style={{ marginLeft: 2 }}>
                                    {valorPedido01 > 0 ? (
                                      <>R$ {moeda(valorPedido01)}</>
                                    ) : (
                                      <></>
                                    )}{' '}
                                  </p>
                                  {valorPedido01 > 0 ? (
                                    <>
                                      {status01 == 'Enviado' ? (
                                        <>
                                          <h2 className="textEnv">Enviado</h2>
                                        </>
                                      ) : status01 == 'Pendente' ? (
                                        <>
                                          <h2 className="textPend">Pendente</h2>
                                        </>
                                      ) : (
                                        <>
                                          <h2 className="textNEnviado">
                                            A Enviar
                                          </h2>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div
                                  style={
                                    status02 == 'A ENVIAR'
                                      ? { backgroundColor: '#FF9912' }
                                      : {}
                                  }
                                  className="ultimos-itens"
                                  onClick={() => {
                                    GetTabelaPrecodata(
                                      codParceiro2,
                                      codEmpresa2,
                                      dataPedido2
                                    );
                                    setmodalList2(true);
                                    modalList2 = true;
                                    setPaginaItens(1);
                                    paginaItens = 1;
                                    setpedidosanteriores(true);
                                    pedidosanteriores = true;
                                    if (itemEnviado == false) {
                                      console.log('pesquisa', pesquisaPedido);
                                      GetPedidoVendaIdModalApi(
                                        descPedido02,
                                        pedidoId02
                                      );
                                    }
                                  }}
                                >
                                  <p className="p12">{descPedido02} </p>
                                  <p
                                    style={
                                      descSankhya02 == 'null' ||
                                      descSankhya02 == '' ||
                                      descSankhya02 == descPedido02
                                        ? { color: 'red' }
                                        : { color: 'blue' }
                                    }
                                    className="p12"
                                  >
                                    {descSankhya02 == 'null' ||
                                    descSankhya02 == '' ||
                                    descSankhya02 == descPedido02 ? (
                                      ' '
                                    ) : (
                                      <>{descSankhya02}</>
                                    )}{' '}
                                  </p>
                                  <p className="p12" style={{ marginLeft: 2 }}>
                                    {' '}
                                    {valorPedido02 > 0 ? (
                                      <>R$ {moeda(valorPedido02)}</>
                                    ) : (
                                      <></>
                                    )}
                                  </p>
                                  {valorPedido02 > 0 ? (
                                    <>
                                      {status02 == 'Enviado' ? (
                                        <>
                                          <h2 className="textEnv">Enviado</h2>
                                        </>
                                      ) : status02 == 'Pendente' ? (
                                        <>
                                          <h2 className="textPend">Pendente</h2>
                                        </>
                                      ) : (
                                        <>
                                          <h2 className="textNEnviado">
                                            A Enviar
                                          </h2>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div
                                  className="ultimos-itens"
                                  style={
                                    status03 == 'A ENVIAR'
                                      ? { backgroundColor: '#FF9912' }
                                      : {}
                                  }
                                  onClick={() => {
                                    GetTabelaPrecodata(
                                      codParceiro3,
                                      codEmpresa3,
                                      dataPedido3
                                    );
                                    setmodalList2(true);
                                    modalList2 = true;
                                    setPaginaItens(1);
                                    paginaItens = 1;
                                    setpedidosanteriores(true);
                                    pedidosanteriores = true;
                                    if (itemEnviado == false) {
                                      console.log('pesquisa', pesquisaPedido);
                                      GetPedidoVendaIdModalApi(
                                        descPedido03,
                                        pedidoId03
                                      );
                                    }
                                  }}
                                >
                                  <p className="p12">{descPedido03} </p>
                                  <p
                                    style={
                                      descSankhya03 == 'null' ||
                                      descSankhya03 == '' ||
                                      descSankhya03 == descPedido03
                                        ? { color: 'red' }
                                        : { color: 'blue' }
                                    }
                                    className="p12"
                                  >
                                    {descSankhya03 == 'null' ||
                                    descSankhya03 == '' ||
                                    descSankhya03 == descPedido03 ? (
                                      ' '
                                    ) : (
                                      <>{descSankhya03}</>
                                    )}{' '}
                                  </p>
                                  <p className="p12" style={{ marginLeft: 2 }}>
                                    {valorPedido03 > 0 ? (
                                      <>R$ {moeda(valorPedido03)}</>
                                    ) : (
                                      <></>
                                    )}
                                  </p>
                                  {valorPedido03 > 0 ? (
                                    <>
                                      {status03 == 'Enviado' ? (
                                        <>
                                          <h2 className="textEnv">Enviado</h2>
                                        </>
                                      ) : status03 == 'Pendente' ? (
                                        <>
                                          <h2 className="textPend">Pendente</h2>
                                        </>
                                      ) : (
                                        <>
                                          <h2 className="textNEnviado">
                                            A Enviar
                                          </h2>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    {realizandopedido ? (
                      <>
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
                                  <p
                                    className={'p12'}
                                    style={{ fontSize: 13, marginLeft: 8 }}
                                  >
                                    Nome
                                  </p>
                                  <input
                                    style={{ marginLeft: 20 }}
                                    name="pesquisa"
                                    type="radio"
                                    checked={pesquisaCod}
                                    onChange={PesquisaCod}
                                  />
                                  <p
                                    className={'p12'}
                                    style={{ fontSize: 13, marginLeft: 8 }}
                                  >
                                    Código
                                  </p>
                                  <input
                                    style={{ marginLeft: 20 }}
                                    name="pesquisa"
                                    type="radio"
                                    checked={pesquisaGrupo}
                                    onChange={PesquisaGrupo}
                                  />
                                  <p
                                    className={'p12'}
                                    style={{ fontSize: 13, marginLeft: 8 }}
                                  >
                                    Grupo
                                  </p>
                                </div>
                              </div>
                              <div
                                style={{ marginTop: 10, width: '100%' }}
                                className="conteudo-botoes"
                              >
                                <div className="bloco-pesquisa-input-pedido">
                                  {pesquisaNome ? (
                                    <>
                                      <div>
                                        <input
                                          id="nomePesquisa"
                                          type="text"
                                          className="form-control select inputparceiro"
                                          name=""
                                          value={search}
                                          onChange={(e) => {
                                            setSearch(e.target.value);
                                            search = e.target.value;
                                            setAdicionandoItem(false);
                                            adicionandoItem = false;
                                          }}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {pesquisaCod ? (
                                    <>
                                      <div>
                                        <input
                                          id="codPesquisa"
                                          type="text"
                                          className="form-control select inputparceiro"
                                          name=""
                                          value={search}
                                          onChange={(e) => {
                                            setSearch(e.target.value);
                                            search = e.target.value;
                                            setAdicionandoItem(false);
                                            adicionandoItem = false;
                                          }}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {pesquisaGrupo ? (
                                    <>
                                      <div className="div-pesquisa">
                                        <Select
                                          id="grupoPesquisa"
                                          className="inputparceiro"
                                          placeholder="Digite ou selecione"
                                          noOptionsMessage={() =>
                                            'Nenhum grupo encontrado'
                                          }
                                          options={grupoPesquisa}
                                          onChange={(value: any) => {
                                            setSearch('');
                                            setSearch(value.value);
                                            search = value.value;
                                            setAdicionandoItem(false);
                                            adicionandoItem = false;
                                            console.log('Select', value, value);
                                            setPagina(1);
                                            setFilter(true);
                                            filter = true;
                                            GetiTensTabelaPrecofilterNome();
                                          }}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="bloco-pesquisa-btn">
                                  <button
                                    className="btn btn-primary btn-pesq-ped  "
                                    onClick={Pesquisa}
                                  >
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
                                <h2>Valor do Pedido:</h2>
                                <h1
                                  style={
                                    somaTotal == 0
                                      ? { color: 'red' }
                                      : { color: '#0000FF' }
                                  }
                                >
                                  R$ {moeda(somaTotal)}
                                </h1>
                              </div>
                              <div className="blocoValores">
                                <OverlayTrigger
                                  placement={"top"}
                                  delay={{ show: 100, hide: 250 }}
                                  overlay={
                                    <Tooltip>Parceiros com origem no CE, não aplicam IPI.</Tooltip>
                                  }
                                >
                                  <h2>Valor do Pedido C / Ipi:</h2>
                                </OverlayTrigger>
                                <h1
                                  style={
                                    somaTotal == 0
                                      ? { color: 'red' }
                                      : { color: '#0000FF' }
                                  }
                                >
                                  R${' '}
                                  {moeda(
                                    calcularTotaisPedidoComIpi(
                                      arrayPedido,
                                      ufCliente
                                    ).totalLiquido
                                  )}
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
                            <div>
                              <button
                                style={
                                  titulosVencidos || !isOnline || atualizando
                                    ? { backgroundColor: 'red' }
                                    : {}
                                }
                                disabled={
                                  itensDoPedido <= 0 ||
                                  titulosVencidos ||
                                  !isOnline ||
                                  atualizando
                                }
                                className="btn btn-dark btn-enviar-pedido "
                                onClick={() => {
                                  // SalvarDadosEnviandoSankhya();
                                  void EnviarPedidoComRegraEnvio();
                                }}
                              >
                                Enviar
                              </button>
                              {titulosVencidos ? (
                                <>
                                  <h1 style={{ color: 'red' }}>
                                    Títulos Vencidos
                                  </h1>
                                </>
                              ) : (
                                <></>
                              )}
                              {!isOnline || atualizando ? (
                                <>
                                  <h1 style={{ color: 'red' }}>
                                    Aplicação Offline
                                  </h1>
                                </>
                              ) : (
                                <></>
                              )}
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
                            <span
                              className={'p12'}
                              style={{ marginTop: 7, marginRight: 8 }}
                            >
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
                              <span style={{ marginTop: 7, marginRight: 8 }}>
                                Vlr. Unit:
                              </span>
                              <input
                                disabled
                                type="text"
                                value={moeda(valorItem)}
                                className="form-control select inputparceiro"
                              />
                            </div>
                            <div className="div-quant-pedido-pesq">
                              <span
                                className="p12"
                                style={{ marginTop: 7, marginRight: 8 }}
                              >
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
                                  const regex = /^[1-9]\d*$/;
                                  if (!regex.test(event.target.value)) {
                                    event.target.value = '';
                                    console.log(
                                      'quantidade de itens',
                                      quantItem
                                    );
                                  } else {
                                    const valor = event.target.value;
                                    setQuantItem(valor);
                                    quantItem = valor;
                                    console.log(
                                      'quantidade de itens else',
                                      quantItem
                                    );
                                  }
                                }}
                                onSubmit={AddItemPedido}
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
                              <span
                                className="p12"
                                style={{ marginTop: 7, marginRight: 8 }}
                              >
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
                                  unidadeEscolhida = e.target.value;
                                  console.log(
                                    'tipo escolhido',
                                    unidadeEscolhida
                                  );
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
                            <Table
                              responsive
                              className="table-global table  main-table"
                            >
                              <thead>
                                <tr className="tituloTab">
                                  {isMobile ? (
                                    <>
                                      <th
                                        style={{
                                          backgroundColor: '#f1eeee',
                                        }}
                                        className="th2 th-tabela-pedido nome-grupo "
                                      >
                                        <h1>LISTA DE PRODUTOS</h1>
                                      </th>
                                    </>
                                  ) : (
                                    <>
                                      <th
                                        style={{
                                          textAlign: 'center',
                                          backgroundColor: '#f1eeee',
                                        }}
                                        className="th1 id-grupo th-tabela-pedido paddingPedido"
                                      >
                                        Código
                                      </th>
                                      <th
                                        style={{ backgroundColor: '#f1eeee' }}
                                        className="th2 nome-grupo paddingPedido"
                                      >
                                        Produto
                                      </th>
                                      <th
                                        style={{
                                          textAlign: 'center',
                                          backgroundColor: '#f1eeee',
                                        }}
                                        className="th4 th-tabela-pedido paddingPedido"
                                      >
                                        Un
                                      </th>
                                      <th
                                        style={{
                                          textAlign: 'center',
                                          backgroundColor: '#f1eeee',
                                        }}
                                        className="th4 th-tabela-pedido paddingPedido"
                                      >
                                        Un2
                                      </th>
                                      <th
                                        style={{
                                          textAlign: 'center',
                                          backgroundColor: '#f1eeee',
                                        }}
                                        className="th4 fatos-conv paddingPedido"
                                      >
                                        Fatos Conv.
                                      </th>
                                      <th
                                        style={{
                                          textAlign: 'center',
                                          backgroundColor: '#f1eeee',
                                        }}
                                        className="th1 paddingPedido"
                                      >
                                        Prc. Venda
                                      </th>

                                      <th
                                        style={{
                                          textAlign: 'center',
                                          backgroundColor: '#f1eeee',
                                        }}
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
                                    {itensTabela?.map((item, index) => (
                                      <tr
                                        className={
                                          arrayPedido.some(
                                            (pedido) =>
                                              pedido.produtoId === item.idProd
                                          )
                                            ? 'produto-adicionado tituloTab'
                                            : 'tituloTab'
                                        }
                                        key={index}
                                        onClick={() => {
                                          if (item.preco > 0) {
                                            setEditandoRascunho(false);
                                            editandoRascunho = false;
                                            setEmUso(true);
                                            emUso = true;
                                            setConv(item.produtos.conv);
                                            conv = item.produtos.conv;
                                            verificaProduto(item.idProd);
                                            setAddItem(true);
                                            addItem = true;
                                            setValorItem(0);
                                            setAdicionandoItem(true);
                                            adicionandoItem = true;
                                            setaliIpi(item.produtos.aliIpi);
                                            aliIpi = item.produtos.aliIpi;
                                            setUnidadeEscolhida(
                                              item.produtos.tipoUnid
                                            );
                                            unidadeEscolhida =
                                              item.produtos.tipoUnid;
                                            seNomeProduto(item.produtos.nome);
                                            setValorItem(item.preco);
                                            setUnidade1(item.produtos.tipoUnid);
                                            setUnidade2(
                                              item.produtos.tipoUnid2
                                            );
                                            setQuantUnid(item.produtos.conv);
                                            setUnidadeEscolhida(
                                              item.produtos.tipoUnid
                                            );
                                            unidadeEscolhida =
                                              item.produtos.tipoUnid;
                                            setProdutoId(item.idProd);
                                            produtoId = item.idProd;
                                            setValorUnitario(item.preco);
                                            valorUnitario = item.preco;
                                            SetarQuantidade();
                                          } else {
                                            setShowMensage(true);
                                            setAlertErroMensage(true);
                                            setMsgErro(
                                              'o valor unitario do produto não pode ser igual a 0,00'
                                            );
                                          }
                                        }}
                                      >
                                        {isMobile ? (
                                          <>
                                            <td
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado id-grupo2 '
                                                  : 'id-grupo2'
                                              }
                                            >
                                              <div className="d-flex paddingPedido2">
                                                <div>
                                                  <h2 className="descProdMob">
                                                    {item.produtos?.nome}
                                                  </h2>
                                                  <h2 className="desccontdMob">
                                                    Cod.: {item.idProd}
                                                    <b
                                                      style={{ marginLeft: 20 }}
                                                    ></b>{' '}
                                                    R$ {moeda(item?.preco)}
                                                    {' | '}{' '}
                                                    {moeda(
                                                      item?.preco *
                                                        item.produtos?.conv
                                                    )}
                                                    <b
                                                      style={{ marginLeft: 20 }}
                                                    ></b>{' '}
                                                    Und.:{'  '}
                                                    {item.produtos?.tipoUnid}
                                                    {' | '}
                                                    {item.produtos?.tipoUnid2}
                                                  </h2>
                                                </div>
                                              </div>
                                            </td>
                                          </>
                                        ) : (
                                          <>
                                            <td
                                              style={{ textAlign: 'center' }}
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado id-grupo paddingPedido'
                                                  : 'id-grupo paddingPedido'
                                              }
                                            >
                                              {item.idProd}
                                            </td>
                                            <td
                                              style={{
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                              }}
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado nome-grupo paddingPedido'
                                                  : 'nome-grupo paddingPedido'
                                              }
                                            >
                                              {item.produtos?.nome}
                                            </td>
                                            <td
                                              style={{
                                                textAlign: 'center',
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                              }}
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado  paddingPedido'
                                                  : 'paddingPedido'
                                              }
                                            >
                                              {item.produtos?.tipoUnid}
                                            </td>
                                            <td
                                              style={{
                                                textAlign: 'center',
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                              }}
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado  paddingPedido'
                                                  : 'paddingPedido'
                                              }
                                            >
                                              {item.produtos?.tipoUnid2}
                                            </td>
                                            <td
                                              style={{
                                                textAlign: 'center',
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                              }}
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado id-valor  paddingPedido'
                                                  : 'paddingPedido id-valor'
                                              }
                                            >
                                              {item.produtos?.conv}
                                            </td>
                                            <td
                                              style={{
                                                textAlign: 'center',
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                              }}
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado id-valor paddingPedido'
                                                  : 'paddingPedido id-valor'
                                              }
                                            >
                                              <h1 className="td-valor">
                                                {moeda(item?.preco)}
                                              </h1>
                                            </td>

                                            <td
                                              style={{ textAlign: 'center' }}
                                              className={
                                                arrayPedido.some(
                                                  (pedido) =>
                                                    pedido.produtoId ===
                                                    item.idProd
                                                )
                                                  ? 'produto-adicionado  paddingPedido'
                                                  : 'paddingPedido'
                                              }
                                            >
                                              <OverlayTrigger
                                                placement={'right'}
                                                delay={{ show: 100, hide: 250 }}
                                                overlay={
                                                  <Tooltip>Selecionar</Tooltip>
                                                }
                                              >
                                                <button
                                                  disabled={
                                                    emUso ||
                                                    arrayPedido.some(
                                                      (pedido) =>
                                                        pedido.produtoId ===
                                                        item.idProd
                                                    )
                                                  }
                                                  className="btn btn-table btn-edit"
                                                  style={{
                                                    marginRight: 15,
                                                    marginLeft: 15,
                                                  }}
                                                  onClick={() => {
                                                    setaliIpiEdit(0);
                                                    aliIpiEdit = 0;
                                                    if (item.preco > 0) {
                                                      setEmUso(true);
                                                      emUso = true;
                                                      verificaProduto(
                                                        item.idProd
                                                      );
                                                      setAddItem(true);
                                                      addItem = true;
                                                      setValorItem(0);

                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      setaliIpi(
                                                        item.produtos.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produtos.aliIpi;
                                                      setUnidadeEscolhida(
                                                        item.produtos.tipoUnid
                                                      );
                                                      unidadeEscolhida =
                                                        item.produtos.tipoUnid;
                                                      seNomeProduto(
                                                        item.produtos.nome
                                                      );
                                                      setValorItem(item.preco);
                                                      setUnidade1(
                                                        item.produtos.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produtos.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produtos.conv
                                                      );
                                                      setUnidadeEscolhida(
                                                        item.produtos.tipoUnid
                                                      );
                                                      unidadeEscolhida =
                                                        item.produtos.tipoUnid;
                                                      setProdutoId(item.idProd);
                                                      produtoId = item.idProd;
                                                      setValorUnitario(
                                                        item.preco
                                                      );
                                                      valorUnitario =
                                                        item.preco;
                                                      SetarQuantidade();
                                                    } else {
                                                      setShowMensage(true);
                                                      setAlertErroMensage(true);
                                                      setMsgErro(
                                                        'o valor unitario do produto não pode ser igual a 0,00'
                                                      );
                                                    }
                                                  }}
                                                >
                                                  <RiAddLine className="btn-add-pedido" />
                                                </button>
                                              </OverlayTrigger>
                                            </td>
                                          </>
                                        )}
                                      </tr>
                                    ))}
                                  </>
                                ) : (
                                  <div
                                    style={{ margin: 'auto' }}
                                    className="alert alert-warning alerta-item"
                                    role="alert"
                                  >
                                    Nenhum item encontrado.
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

                        <div className="separador"></div>
                        {arrayPedido.length > 0 ? (
                          <>
                            <div className="table-responsive  tabela-responsiva-pedido-realizado">
                              <div className=" table-wrap">
                                <Table
                                  responsive
                                  className="table-global table  main-table"
                                >
                                  <thead>
                                    <tr className="tituloTab">
                                      {isMobile ? (
                                        <>
                                          <th className="th2 nome-grupo paddingPedido">
                                            <h1 style={{ marginLeft: 4 }}>
                                              LISTA DE PRODUTOS ESCOLHIDOSs
                                            </h1>
                                          </th>
                                        </>
                                      ) : (
                                        <>
                                          <th
                                            style={{ textAlign: 'center' }}
                                            className="th1 id-grupo th-tabela-pedido paddingPedido"
                                          >
                                            Códigos
                                          </th>
                                          <th className="th2 nome-grupo paddingPedido">
                                            Desc. Produto
                                          </th>
                                          <th
                                            style={{ textAlign: 'center' }}
                                            className="th4 th-tabela-pedido paddingPedido "
                                          >
                                            Qtd.
                                          </th>
                                          <th
                                            style={{ textAlign: 'center' }}
                                            className="th1 paddingPedido"
                                          >
                                            Prc. Venda
                                          </th>

                                          <th
                                            style={{ textAlign: 'center' }}
                                            className="th1 paddingPedido"
                                          >
                                            Valor
                                          </th>
                                          <th
                                            style={{ textAlign: 'center' }}
                                            className="th1 paddingPedido"
                                          >
                                            Ipi %
                                          </th>
                                          <th
                                            style={{ textAlign: 'center' }}
                                            className="th1 paddingPedido"
                                          >
                                            Item C/Ipi
                                          </th>
                                          <th
                                            style={{ textAlign: 'center' }}
                                            className="th4 th-tabela-pedido paddingPedido "
                                          >
                                            Ações
                                          </th>
                                        </>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {arrayPedido?.filter(
                                      (i) => String((i as any)?.inativo || 'N').toUpperCase() !== 'S'
                                    )?.length > 0 ? (
                                      <>
                                        {arrayPedido
                                          ?.filter(
                                            (i) =>
                                              String((i as any)?.inativo || 'N').toUpperCase() !== 'S'
                                          )
                                          ?.map((item, index) => {
                                          return (
                                            <tr key={index}>
                                              {isMobile ? (
                                                <>
                                                  <div className="d-flex paddingPedido3">
                                                    <div
                                                      onClick={() => {
                                                        setMult(true);
                                                        setAddItem(false);
                                                        addItem = false;
                                                        setProdutoId(
                                                          item.produtoId
                                                        );
                                                        produtoId =
                                                          item.produtoId;
                                                        setQuantItem(
                                                          String(item.quant)
                                                        );
                                                        setUnidadeEscolhida(
                                                          'UN'
                                                        );
                                                        unidadeEscolhida = 'UN';
                                                        setAdicionandoItem(
                                                          true
                                                        );
                                                        adicionandoItem = true;
                                                        seNomeProduto(
                                                          item.descProduto
                                                        );
                                                        setaliIpi(
                                                          item.produto.aliIpi
                                                        );
                                                        aliIpi =
                                                          item.produto.aliIpi;
                                                        setValorItem(
                                                          item.valUnit
                                                        );
                                                        setValorUnitario(
                                                          item.valUnit
                                                        );
                                                        setUnidade1(
                                                          item.produto.tipoUnid
                                                        );
                                                        setUnidade2(
                                                          item.produto.tipoUnid2
                                                        );
                                                        setIpiEscolhido(
                                                          item.produto.aliIpi
                                                        );
                                                        IpiEscolhido =
                                                          item.produto.aliIpi;

                                                        setUnidadeEscolhida(
                                                          'UN'
                                                        );
                                                        unidadeEscolhida = 'UN';
                                                        setUnidade1(
                                                          item.produto.tipoUnid
                                                        );
                                                        setUnidade2(
                                                          item.produto.tipoUnid2
                                                        );
                                                        setQuantUnid(
                                                          item.produto.conv
                                                        );
                                                        setConv(
                                                          item.produto.conv
                                                        );
                                                        conv =
                                                          item.produto.conv;
                                                        SetarQuantidade();
                                                        SetarQuantidade();
                                                      }}
                                                    >
                                                      <h2 className="descProdMob3">
                                                        {item.descProduto}
                                                      </h2>
                                                      <h2 className="desccontdMob2">
                                                        Cod.: {item.produtoId}
                                                        <b
                                                          style={{
                                                            marginLeft: 10,
                                                          }}
                                                        ></b>
                                                        Qtd.:{item.quant}
                                                        <b
                                                          style={{
                                                            marginLeft: 10,
                                                          }}
                                                        ></b>
                                                        Vlr.UN:{' '}
                                                        {moeda(item.valUnit)}
                                                        <b
                                                          style={{
                                                            marginLeft: 10,
                                                          }}
                                                        ></b>
                                                      </h2>
                                                      <h2 className="desccontdMob2">
                                                        Valor R$:{' '}
                                                        {moeda(item.valTotal)}
                                                        <b
                                                          style={{
                                                            marginLeft: 10,
                                                          }}
                                                        ></b>
                                                        Ipi %:{' '}
                                                        {ufCliente === 'CE' ? 0 : item.produto.aliIpi}
                                                        <b
                                                          style={{
                                                            marginLeft: 10,
                                                          }}
                                                        ></b>
                                                        Item C/Ipi:{' '}
                                                        {ufCliente !== 'CE' && item.produto.aliIpi
                                                          ? `${moeda(
                                                              item.valTotal +
                                                                item.valTotal *
                                                                  (item.produto
                                                                    .aliIpi /
                                                                    100)
                                                            )}`
                                                          : moeda(
                                                              item.valTotal
                                                            )}
                                                      </h2>
                                                    </div>
                                                    <div className="divbtnPe">
                                                      <button
                                                        onClick={() => {
                                                          excluirItemPorProdutoId(
                                                            item.produtoId
                                                          );
                                                        }}
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
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                    className="id-grupo paddingPedido"
                                                    onClick={() => {
                                                      setMult(true);
                                                      setAddItem(false);
                                                      addItem = false;
                                                      setProdutoId(
                                                        item.produtoId
                                                      );
                                                      produtoId =
                                                        item.produtoId;
                                                      setQuantItem(
                                                        String(item.quant)
                                                      );
                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setaliIpi(
                                                        item.produto.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produto.aliIpi;
                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      seNomeProduto(
                                                        item.descProduto
                                                      );
                                                      setValorItem(
                                                        item.valUnit
                                                      );
                                                      setValorUnitario(
                                                        item.valUnit
                                                      );
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setIpiEscolhido(
                                                        item.produto.aliIpi
                                                      );
                                                      IpiEscolhido =
                                                        item.produto.aliIpi;

                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produto.conv
                                                      );
                                                      setConv(
                                                        item.produto.conv
                                                      );
                                                      conv = item.produto.conv;
                                                      SetarQuantidade();
                                                      SetarQuantidade();
                                                    }}
                                                  >
                                                    {item.produtoId}
                                                  </td>
                                                  <td
                                                    className="nome-grupo paddingPedido"
                                                    onClick={() => {
                                                      setMult(true);
                                                      setAddItem(false);
                                                      addItem = false;
                                                      setProdutoId(
                                                        item.produtoId
                                                      );
                                                      produtoId =
                                                        item.produtoId;
                                                      setQuantItem(
                                                        String(item.quant)
                                                      );
                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setaliIpi(
                                                        item.produto.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produto.aliIpi;
                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      seNomeProduto(
                                                        item.descProduto
                                                      );
                                                      setValorItem(
                                                        item.valUnit
                                                      );
                                                      setValorUnitario(
                                                        item.valUnit
                                                      );
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setIpiEscolhido(
                                                        item.produto.aliIpi
                                                      );
                                                      IpiEscolhido =
                                                        item.produto.aliIpi;

                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produto.conv
                                                      );
                                                      setConv(
                                                        item.produto.conv
                                                      );
                                                      conv = item.produto.conv;
                                                      SetarQuantidade();
                                                      SetarQuantidade();
                                                    }}
                                                  >
                                                    {item.descProduto}
                                                  </td>
                                                  <td
                                                    className="textQuant paddingPedido"
                                                    onClick={() => {
                                                      setMult(true);
                                                      setAddItem(false);
                                                      addItem = false;
                                                      setProdutoId(
                                                        item.produtoId
                                                      );
                                                      produtoId =
                                                        item.produtoId;
                                                      setQuantItem(
                                                        String(item.quant)
                                                      );
                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setaliIpi(
                                                        item.produto.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produto.aliIpi;
                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      seNomeProduto(
                                                        item.descProduto
                                                      );
                                                      setValorItem(
                                                        item.valUnit
                                                      );
                                                      setValorUnitario(
                                                        item.valUnit
                                                      );
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setIpiEscolhido(
                                                        item.produto.aliIpi
                                                      );
                                                      IpiEscolhido =
                                                        item.produto.aliIpi;

                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produto.conv
                                                      );
                                                      setConv(
                                                        item.produto.conv
                                                      );
                                                      conv = item.produto.conv;
                                                      SetarQuantidade();
                                                      SetarQuantidade();
                                                    }}
                                                  >
                                                    {item.quant}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                    className="paddingPedido"
                                                    onClick={() => {
                                                      setMult(true);
                                                      setAddItem(false);
                                                      addItem = false;
                                                      setProdutoId(
                                                        item.produtoId
                                                      );
                                                      produtoId =
                                                        item.produtoId;
                                                      setQuantItem(
                                                        String(item.quant)
                                                      );
                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setaliIpi(
                                                        item.produto.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produto.aliIpi;
                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      seNomeProduto(
                                                        item.descProduto
                                                      );
                                                      setValorItem(
                                                        item.valUnit
                                                      );
                                                      setValorUnitario(
                                                        item.valUnit
                                                      );
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setIpiEscolhido(
                                                        item.produto.aliIpi
                                                      );
                                                      IpiEscolhido =
                                                        item.produto.aliIpi;

                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produto.conv
                                                      );
                                                      setConv(
                                                        item.produto.conv
                                                      );
                                                      conv = item.produto.conv;
                                                      SetarQuantidade();
                                                      SetarQuantidade();
                                                    }}
                                                  >
                                                    {moeda(item.valUnit)}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                    className="paddingPedido"
                                                    onClick={() => {
                                                      setMult(true);
                                                      setAddItem(false);
                                                      addItem = false;
                                                      setProdutoId(
                                                        item.produtoId
                                                      );
                                                      produtoId =
                                                        item.produtoId;
                                                      setQuantItem(
                                                        String(item.quant)
                                                      );
                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setaliIpi(
                                                        item.produto.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produto.aliIpi;
                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      seNomeProduto(
                                                        item.descProduto
                                                      );
                                                      setValorItem(
                                                        item.valUnit
                                                      );
                                                      setValorUnitario(
                                                        item.valUnit
                                                      );
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setIpiEscolhido(
                                                        item.produto.aliIpi
                                                      );
                                                      IpiEscolhido =
                                                        item.produto.aliIpi;

                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produto.conv
                                                      );
                                                      setConv(
                                                        item.produto.conv
                                                      );
                                                      conv = item.produto.conv;
                                                      SetarQuantidade();
                                                      SetarQuantidade();
                                                    }}
                                                  >
                                                    {moeda(item.valTotal)}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                    className="paddingPedido"
                                                    onClick={() => {
                                                      setMult(true);
                                                      setAddItem(false);
                                                      addItem = false;
                                                      setProdutoId(
                                                        item.produtoId
                                                      );
                                                      produtoId =
                                                        item.produtoId;
                                                      setQuantItem(
                                                        String(item.quant)
                                                      );
                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setaliIpi(
                                                        item.produto.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produto.aliIpi;
                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      seNomeProduto(
                                                        item.descProduto
                                                      );
                                                      setValorItem(
                                                        item.valUnit
                                                      );
                                                      setValorUnitario(
                                                        item.valUnit
                                                      );
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setIpiEscolhido(
                                                        item.produto.aliIpi
                                                      );
                                                      IpiEscolhido =
                                                        item.produto.aliIpi;

                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produto.conv
                                                      );
                                                      setConv(
                                                        item.produto.conv
                                                      );
                                                      conv = item.produto.conv;
                                                      SetarQuantidade();
                                                      SetarQuantidade();
                                                    }}
                                                  >
                                                    {ufCliente === 'CE' ? 0 : item.produto.aliIpi}
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                    className="paddingPedido"
                                                    onClick={() => {
                                                      setMult(true);
                                                      setAddItem(false);
                                                      addItem = false;
                                                      setProdutoId(
                                                        item.produtoId
                                                      );
                                                      produtoId =
                                                        item.produtoId;
                                                      setQuantItem(
                                                        String(item.quant)
                                                      );
                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setaliIpi(
                                                        item.produto.aliIpi
                                                      );
                                                      aliIpi =
                                                        item.produto.aliIpi;
                                                      setAdicionandoItem(true);
                                                      adicionandoItem = true;
                                                      seNomeProduto(
                                                        item.descProduto
                                                      );
                                                      setValorItem(
                                                        item.valUnit
                                                      );
                                                      setValorUnitario(
                                                        item.valUnit
                                                      );
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setIpiEscolhido(
                                                        item.produto.aliIpi
                                                      );
                                                      IpiEscolhido =
                                                        item.produto.aliIpi;

                                                      setUnidadeEscolhida('UN');
                                                      unidadeEscolhida = 'UN';
                                                      setUnidade1(
                                                        item.produto.tipoUnid
                                                      );
                                                      setUnidade2(
                                                        item.produto.tipoUnid2
                                                      );
                                                      setQuantUnid(
                                                        item.produto.conv
                                                      );
                                                      setConv(
                                                        item.produto.conv
                                                      );
                                                      conv = item.produto.conv;
                                                      SetarQuantidade();
                                                      SetarQuantidade();
                                                    }}
                                                  >
                                                    {ufCliente !== 'CE' && item.produto.aliIpi
                                                      ? `${moeda(
                                                          item.valTotal +
                                                            item.valTotal *
                                                              (item.produto.aliIpi / 100)
                                                        )}`
                                                      : moeda(item.valTotal)}
                                                  </td>

                                                  <td
                                                    style={{
                                                      textAlign: 'center',
                                                    }}
                                                    className="paddingPedido"
                                                  >
                                                    <OverlayTrigger
                                                      placement={'right'}
                                                      delay={{
                                                        show: 100,
                                                        hide: 250,
                                                      }}
                                                      overlay={
                                                        <Tooltip>
                                                          Excluir
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <button
                                                        onClick={() => {
                                                          excluirItemPorProdutoId(
                                                            item.produtoId
                                                          );
                                                        }}
                                                        className="btn btn-table btn-delete2"
                                                      >
                                                        <RiDeleteBin5Line />
                                                      </button>
                                                    </OverlayTrigger>
                                                  </td>
                                                </>
                                              )}
                                            </tr>
                                          );
                                        })}
                                      </>
                                    ) : (
                                      <div
                                        style={{ margin: 'auto' }}
                                        className="alert alert-warning alerta-item"
                                        role="alert"
                                      >
                                        Nenhuma item encontrado.
                                      </div>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {/* =====================Modal Delete ============================================ */}
        <Modal
          className="modal-confirm"
          show={showMensageDelete}
          onHide={handleCloseMensageDelete}
          backdrop="static"
        >
          <Modal.Body>
            <img
              style={{ marginTop: 20 }}
              id="logoSankhya"
              src={logoAlyne}
              alt=""
            />
            <h1 className="super-texto2">{MsgErroNaoEnviar}</h1>
            {alertErroMensage && (
              <h1 style={{ margin: 10 }} className="super-texto3">
                {msgErro}{' '}
              </h1>
            )}
            {alertErroMensage2 && <h1 className="super-texto4">{msgErro2}</h1>}
            <button
              style={{ width: 130, marginTop: 10 }}
              className="btn btn-primary"
              onClick={() => {
                handleCloseMensageDelete();
                setMsgErroNaoEnviar('');
              }}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>

        {/* ================Modal Cofirmação ============================================== */}
        <Modal
          className="modal-confirm"
          show={showMensage2}
          onHide={handleCloseMensage2}
          backdrop="static"
        >
          <Modal.Body>
            <img
              style={{ marginTop: 20 }}
              id="logoSankhya"
              src={logoAlyne}
              alt=""
            />
            <h1 className="super-texto2">{MsgErroNaoEnviar}</h1>
            {alertErroMensage && (
              <h1 style={{ margin: 10 }} className="super-texto3">
                {msgErro}{' '}
              </h1>
            )}
            {alertErroMensage2 && <h1 className="super-texto4">{msgErro2}</h1>}
            <button
              style={{ width: 130, marginTop: 10 }}
              className="btn btn-primary"
              onClick={handleCloseMensage2}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>
        <Modal
          className="modal-confirm"
          show={showMensage}
          onHide={handleCloseMensage}
          backdrop="static"
        >
          <Modal.Body>
            <img
              style={{ marginTop: 20 }}
              id="logoSankhya"
              src={logoAlyne}
              alt=""
            />
            <h1 className="super-texto2">{MsgErroNaoEnviar}</h1>
            {alertErroMensage && (
              <h1 style={{ margin: 10 }} className="super-texto3">
                {msgErro}{' '}
              </h1>
            )}
            {alertErroMensage2 && <h1 className="super-texto4">{msgErro2}</h1>}
            {baixarPDFNovo ? (
              <>
                <div style={{ width: '100%', marginBottom: 20 }}>
                  <PDFDownloadLink
                    document={<PDFFile />}
                    fileName={`nota_${numPedido}.pdf`}
                  >
                    Baixar Prévia Pedido
                  </PDFDownloadLink>

                </div>
              </>
            ) : (
              <></>
            )}
            <button
              style={{ width: 130, marginTop: 15 }}
              className="btn btn-primary"
              onClick={handleCloseMensage}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>
        {/* //=======================================================================================// */}
        <Modal
          className="modal-confirm"
          show={showMensagedup}
          onHide={handleCloseMensagedup}
          backdrop="static"
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
              onClick={handleCloseMensagedup}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>
        <Modal
          className="modal-confirm"
          show={showOperacao}
          onHide={handleCancelarOperacao}
          backdrop="static"
        >
          <Modal.Body>
            <div className="div-sankhya">
              <img id="logoSankhya" src={logoAlyne} alt="" />
              <h1 style={{ whiteSpace: 'pre-line', fontSize: '14px', lineHeight: '1.4' }}>{operacaoMsg}</h1>
              {operacaoProgress < 100 && (
                <ProgressBar className="progress" animated now={operacaoProgress} />
              )}
            </div>
            <div className="">
              {operacaoProgress < 100 ? (
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-secondary"
                  onClick={handleCancelarOperacao}
                >
                  Cancelar
                </button>
              ) : (
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={handleCloseOperacao}
                >
                  Ok
                </button>
              )}
            </div>
          </Modal.Body>
        </Modal>
        {/* ======================== MODAL DADOS NÃO ENCONTRADROS NO SANKHYA =========================== */}
        {/* =================== modal dados atualizados ================================= */}
        <Modal
          className="modal-confirm"
          show={showupdatePromotor}
          onHide={handleCloseupdatePromotor}
        >
          <Modal.Header closeButton>
            <h1>Aviso Importante!</h1>
          </Modal.Header>
          <Modal.Body>
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 className="h1Promotor">
              Ainda não existem dados recebidos em seu banco local, favor
              receber dados!
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
        {/* =================== modal rascunhos ================================= */}
        <Modal
          className="modal-confirm"
          show={showlistaRasc}
          onHide={handleCloselistaRasc}
        >
          <Modal.Header closeButton>
            <h1>Aviso Importante!</h1>
          </Modal.Header>
          <Modal.Body>
            <h1 className="h1Promotor">
              Existem Pedidos não salvos! clique no pedido para continuar a
              inserção de dados!
            </h1>
            <div style={{ marginTop: 20 }}></div>
            <div className="table-responsive  tabela-responsiva-pedido-realizado">
              <div className=" table-wrap">
                <Table responsive className="table-global table  main-table">
                  <thead>
                    <tr className="tituloTab">
                      <th
                        style={{ textAlign: 'center' }}
                        className="th1 id-grupo th-tabela-pedido paddingPedido"
                      >
                        Cliente
                      </th>
                      <th className="th2 nome-grupo paddingPedido">PalMPV</th>
                      <th
                        style={{ textAlign: 'center' }}
                        className="th4 th-tabela-pedido paddingPedido "
                      >
                        Valor
                      </th>
                      <th
                        style={{
                          textAlign: 'center',
                          backgroundColor: '#f1eeee',
                        }}
                        className="th4 th-tabela-pedido paddingPedido"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cabecalhoRasc?.length > 0 ? (
                      <>
                        {cabecalhoRasc?.map((item, index) => (
                          <tr key={index}>
                            <td
                              style={{ textAlign: 'center' }}
                              className="id-grupo"
                              onClick={() => {
                                GetPedidoRascunho(item?.palMPV, item?.id);
                              }}
                            >
                              {item?.parceiroId}
                            </td>
                            <td
                              className="nome-grupo"
                              onClick={() => {
                                GetPedidoRascunho(item?.palMPV, item?.id);
                              }}
                            >
                              {item.palMPV}
                            </td>
                            <td
                              style={{ textAlign: 'center' }}
                              onClick={() => {
                                GetPedidoRascunho(item?.palMPV, item?.id);
                              }}
                            >
                              {moeda(item?.valor)}
                            </td>
                            <td
                              style={{ textAlign: 'center' }}
                              className="paddingPedido"
                            >
                              <OverlayTrigger
                                placement={'top'}
                                delay={{ show: 100, hide: 250 }}
                                overlay={<Tooltip>Excluir</Tooltip>}
                              >
                                <button
                                  onClick={() => {
                                    DeletarCabecalhoRascunho(item.palMPV);
                                  }}
                                  className="btn btn-table btn-delete2"
                                >
                                  <RiDeleteBin5Line />
                                </button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <div
                        style={{ margin: 'auto' }}
                        className="alert alert-warning "
                        role="alert"
                      >
                        Nenhum rascunho encontrado.
                      </div>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
            <button
              style={{ width: 130, marginTop: 15 }}
              className="btn btn-primary"
              onClick={handleCloselistaRasc}
            >
              Sair
            </button>
          </Modal.Body>
        </Modal>

        {/* =================== modallista de pedidos ================================= */}
        <Modal
          className="modal-confirmLista"
          show={showlistaPedidos}
          onHide={handleCloselistaPedidos}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <h1>LISTA DE PEDIDOS</h1>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              {(() => {
                let onlineNow = isOnline;
                try {
                  onlineNow = onlineNow || localStorage.getItem('@Portal/Status') === 'true';
                } catch {}
                return onlineNow;
              })() && (
                <button
                  className={mobileListaTab === 'api' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={async () => {
                    setMobileListaTab('api');
                    setPaginaList(1);
                    paginaList = 1;
                    settodos(true);
                    setenviados(false);
                    setpendentes(false);
                    setnenviados(false);
                    setPendenteErro(false);
                    setSearchList('todos');
                    searchList = 'todos';
                    await GetListaCabecalho('api');
                  }}
                >
                  Pedidos Sincronizados
                </button>
              )}
              <button
                className={
                  (!(() => {
                    let onlineNow = isOnline;
                    try {
                      onlineNow = onlineNow || localStorage.getItem('@Portal/Status') === 'true';
                    } catch {}
                    return onlineNow;
                  })() ||
                    mobileListaTab === 'local')
                    ? 'btn btn-primary'
                    : 'btn btn-outline-primary'
                }
                onClick={async () => {
                  setMobileListaTab('local');
                  setPaginaList(1);
                  paginaList = 1;
                  settodos(true);
                  setenviados(false);
                  setpendentes(false);
                  setnenviados(false);
                  setPendenteErro(false);
                  setSearchList('todos');
                  searchList = 'todos';
                  await GetListaCabecalho('local');
                }}
              >
                Pedidos Banco Local
              </button>
            </div>
            {(() => {
              let onlineNow = isOnline;
              try {
                onlineNow = onlineNow || localStorage.getItem('@Portal/Status') === 'true';
              } catch {}
              return onlineNow;
            })() &&
              mobileListaTab === 'api' && (
              <div className="blocoLispesqPedidos">
                <div className="divradio" onClick={PesquisaTodos}>
                  <input
                    name="pesquisa"
                    type="radio"
                    checked={todos}
                    onChange={PesquisaTodos}
                  />
                  <p style={{ marginLeft: 8 }}>Todos</p>
                </div>
                <div className="divradio" onClick={PesquisaEnviados}>
                  <input
                    style={{ marginLeft: 20 }}
                    name="pesquisa"
                    type="radio"
                    checked={enviados}
                    onChange={PesquisaEnviados}
                  />
                  <p style={{ marginLeft: 8 }}>Enviados</p>
                </div>
                <div className="divradio" onClick={PesquisaPendentes}>
                  <input
                    style={{ marginLeft: 20 }}
                    name="pesquisa"
                    type="radio"
                    checked={pendentes}
                    onChange={PesquisaPendentes}
                  />
                  <p style={{ marginLeft: 8 }}>À Processar</p>
                </div>
                <div className="divradio" onClick={PesquisaNEnviados}>
                  <input
                    style={{ marginLeft: 20 }}
                    name="pesquisa"
                    type="radio"
                    checked={nenviados}
                    onChange={PesquisaNEnviados}
                  />
                  <p style={{ marginLeft: 8 }}>Á Enviar</p>
                </div>
              </div>
            )}
            <h1 className="h1Promotor"></h1>
            {isMobile ? <></> : <></>}
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
                      <th style={{ textAlign: 'center' }} className="">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaLoading ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img id="logoSankhya" src={logoAlyne} alt="" />
                            <h1 style={{ marginTop: 15 }}>Carregando lista...</h1>
                            <div style={{ width: '100%', maxWidth: 420, marginTop: 12 }}>
                              <ProgressBar className="progress" animated now={sucess} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : cabecalhoPesquisa?.length > 0 ? (
                      <>
                        {cabecalhoPesquisa?.map((item, index) => (
                          <tr
                            key={index}
                            onClick={() => {
                              GetTabelaPrecodataLocal(
                                item.parceiroId,
                                item.filial,
                                item.data
                              );
                              setpedidosanteriores(true);
                              pedidosanteriores = true;
                              if (itemEnviado == false) {
                                if (item.status == 'Rascunho') {
                                  setStatusPedidoSelecionado('Rascunho');
                                  statusPedidoSelecionado = 'Rascunho';
                                }
                                console.log('pesquisa', pesquisaPedido);
                                setPaginaItens(1);
                                paginaItens = 1;
                                GetPedidoVendaIdModal(item?.palMPV, item?.id);
                              }
                            }}
                          >
                            <td
                              style={{ textAlign: 'center' }}
                              className="id-grupo"
                            >
                              {item?.palMPV}
                            </td>
                            <td
                              style={
                                item.status.trim() != 'Enviado' ||
                                item?.pedido == item?.palMPV
                                  ? { color: 'red' }
                                  : {}
                              }
                              className=""
                            >
                              {item?.status.trim() == 'Enviado' &&
                              item?.pedido != item?.palMPV
                                ? item.pedido
                                : 'Nulo'}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              R$: {moeda(item?.valor)}
                            </td>
                            <td style={{ textAlign: 'center' }} className="th1">
                              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                {item?.status == 'Enviado' ? (
                                  <>
                                    <h2 className="textEnv2">Enviado</h2>
                                  </>
                                ) : item?.status == 'Pendente' ? (
                                  <>
                                    <h2
                                      className="textPendente2"
                                      style={{ border: '2px solid red', borderRadius: 10, padding: '2px 6px' }}
                                    >
                                      Pendente
                                    </h2>
                                  </>
                                ) : item?.status == 'AProcessar' ||
                                  item?.status == 'EmEnvio' ||
                                  item?.status == 'Processar' ? (
                                  <>
                                    <h2 className="textPend2">À Processar</h2>
                                  </>
                                ) : item?.status == 'Rascunho' ? (
                                  <>
                                    <h2 className="textPend3">Rascunho</h2>
                                  </>
                                ) : item?.status == 'Não Enviado' ? (
                                  <>
                                    <h2 className="textNEnviado2">A Enviar</h2>
                                  </>
                                ) : (
                                  <>
                                    <h2 className="textNEnviado2">
                                      {item.status}
                                    </h2>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: 12 }}>
                          Nenhum registro encontrado
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
                />
              </div>
            </div>
            <button
              style={{ width: 130, marginTop: 15 }}
              className="btn btn-primary"
              onClick={handleCloselistaPedidos}
            >
              Voltar
            </button>
          </Modal.Body>
        </Modal>
        {/* ============================== modal de pedido id ======================================== */}
        <Modal
          show={showlistaPedidosSelec}
          onHide={handleCloselistaPedidosSelec}
          backdrop="static"
          size="xl"
          centered
          fullscreen="md-down"
        >
          <Modal.Header closeButton>
            <h1>PEDIDO SELECIONADO</h1>
          </Modal.Header>
                  <Modal.Body>
                    {carregandoModalPedidoSelecionado ? (
                      <div className="d-flex justify-content-center total-loading2">
                        <div className="loadingModal">
                          <img id="logoSankhya" src={logoAlyne} alt="" />
                          <h1
                            style={{
                              marginTop: 15,
                              fontSize: 22,
                              fontWeight: 700,
                              color: '#0d6efd',
                              letterSpacing: 0.5,
                              textTransform: 'uppercase',
                            }}
                          >
                            Carregando dados...
                          </h1>
                          <h1 style={{ marginTop: 15 }}></h1>
                          <ProgressBar className="progress" animated now={sucess} />
                        </div>
                      </div>
                    ) : (
                    <div className="pedido-selec">
              <div className="cabecalhoPesquisaPedido">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', flex: 1, minWidth: 0, justifyContent: 'flex-start' }}>
                    <h1 className="classBot d-flex">
                      <h1 style={{ marginTop: 10, marginBottom: 8 }}>Status: </h1>
                      <h1
                        style={
                          statusPedidoSelecionado == 'Enviado'
                            ? { backgroundColor: '#008000', color: '#fff', marginTop: 3, marginLeft: 5, padding: '3px 8px', borderRadius: 10, textAlign: 'center', display: 'inline-flex', alignItems: 'center' }
                            : statusPedidoSelecionado == 'Pendente'
                            ? { backgroundColor: '#FFD54F', color: '#000', marginTop: 3, marginLeft: 5, padding: '4px 8px', borderRadius: 10, border: '2px solid red', textAlign: 'center', display: 'inline-flex', alignItems: 'center', gap: 6 }
                            : statusPedidoSelecionado == 'AProcessar' ||
                              statusPedidoSelecionado == 'EmEnvio' ||
                              statusPedidoSelecionado == 'Processar'
                            ? { backgroundColor: '#FFA500', color: '#fff', marginTop: 3, marginLeft: 5, padding: '3px 8px', borderRadius: 10, textAlign: 'center', display: 'inline-flex', alignItems: 'center' }
                            : statusPedidoSelecionado == 'Rascunho'
                            ? { backgroundColor: '#161615', color: '#fff', marginTop: 3, marginLeft: 5, padding: '3px 8px', borderRadius: 10, textAlign: 'center', display: 'inline-flex', alignItems: 'center' }
                            : { backgroundColor: '#b3180d', color: '#fff', marginTop: 3, marginLeft: 5, padding: '3px 8px', borderRadius: 10, textAlign: 'center', display: 'inline-flex', alignItems: 'center' }
                        }
                        className=""
                        title={statusPedidoSelecionado == 'Pendente' ? 'Ao enviar o pedido, alguns itens não foram enviados (falha de conexão com a base de dados). É recomendável enviar os pedidos utilizando uma rede Wi‑Fi.' : undefined}
                      >
                        {statusPedidoSelecionado == 'Pendente'
                          ? 'Pendente'
                          : statusPedidoSelecionado == 'Não Enviado'
                          ? 'A Enviar'
                          : statusPedidoSelecionado == 'AProcessar' ||
                            statusPedidoSelecionado == 'EmEnvio' ||
                            statusPedidoSelecionado == 'Processar'
                          ? 'À Processar'
                          : statusPedidoSelecionado}
                      </h1>
                    </h1>
                    <h1 style={{ marginTop: 5, marginBottom: 8}} className="classBot ">
                      Ped. Sankhya:{' '}
                      <b style={numeroPedidoSankhya == '' || statusPedidoSelecionado == 'Não Enviado' || statusPedidoSelecionado == 'AProcessar' || statusPedidoSelecionado == 'EmEnvio' || statusPedidoSelecionado == 'Processar' || numeroPedidoSankhya == numeroPedidoSelecionado ? { color: 'red' } : {}}>
                        {numeroPedidoSankhya == '' || statusPedidoSelecionado == 'Não Enviado' || numeroPedidoSankhya == numeroPedidoSelecionado ? '0' : numeroPedidoSankhya}
                      </b>
                    </h1>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      minWidth: 0,
                      justifyContent: 'flex-end',
                      ...(isMobile ? { flex: '0 0 65%', flexWrap: 'wrap' } : { flex: 1, flexWrap: 'wrap' }),
                    }}
                  >
                    {statusPedidoSelecionado != 'AProcessar' &&
                      statusPedidoSelecionado != 'EmEnvio' &&
                      statusPedidoSelecionado != 'Processar' && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: isMobile ? 6 : 8, flexWrap: 'wrap' }}>
                        <button
                          className="btn btn-outline-danger"
                          onClick={async () => {
                            if (numeroPedidoSelecionado) {
                              await DeletePedidoSelecionado(String(numeroPedidoSelecionado));
                              handleCloselistaPedidosSelec();
                              try {
                                setListaLoading(true);
                                await GetListaCabecalho('api');
                                await GetListaCabecalho('local');
                                await GetListaCabecalho(mobileListaTab);
                              } finally {
                                setListaLoading(false);
                              }
                            }
                          }}
                          disabled={carregandoModalPedidoSelecionado}
                        >
                          {carregandoModalPedidoSelecionado ? (
                            <Spinner animation="border" size="sm" role="status" />
                          ) : (
                            'Cancelar'
                          )}
                        </button>
                        <button
                          disabled={
                            carregandoModalPedidoSelecionado ||
                            itensPedidoSelecionadoListAtivos.length === 0
                          }
                          className="btn btn-outline-dark"
                          onClick={() => {
                            localStorage.setItem('@Portal/PedidoEmDigitacao', 'true');
                            try {
                              localStorage.setItem('PedidoAbrirModalSelec', 'false');
                              localStorage.setItem(
                                'PedidoInfoObservacao',
                                String(observacaoPedidoSelecionado || '')
                              );
                              if (Number(parceiroPedidoSelecionadoId || 0) > 0) {
                                localStorage.setItem(
                                  'ClienteEscolhido',
                                  String(parceiroPedidoSelecionadoId || '0')
                                );
                              }
                              if (parceiroPedidoSelecionado) {
                                localStorage.setItem(
                                  'ClienteNome',
                                  String(parceiroPedidoSelecionado || '')
                                );
                              }
                            } catch {}
                            setShowMensageLoadingDup(true);
                            console.log('entrou pendente 1234');
                            setTimeout(() => {
                              setmodalList(false);
                              modalList = false;
                              handleCloselistaPedidosSelec();
                              handleCloselistaPedidos();
                              EditarPedidoPendente();
                            }, 0);
                          }}
                        >
                          {carregandoModalPedidoSelecionado ? (
                            <Spinner animation="border" size="sm" role="status" />
                          ) : statusPedidoSelecionado == 'Não Enviado' ||
                            statusPedidoSelecionado == 'Pendente' ||
                            statusPedidoSelecionado == 'Rascunho' ||
                            statusPedidoSelecionado == 'Falhou' ? (
                            'Editar'
                          ) : (
                            'Duplicar Ped.'
                          )}
                        </button>
                      </div>
                    )}
                    <PDFDownloadLink
                      document={<PDFFile />}
                      fileName={`nota_${numeroPedidoSelecionado}.pdf`}
                    >
                      {(({
                        loading,
                      }: {
                        loading: boolean;
                      }) => (
                        <button className="btn btn-dark" disabled={loading || carregandoModalPedidoSelecionado}>
                          {loading || carregandoModalPedidoSelecionado ? (
                            <Spinner animation="border" size="sm" role="status" />
                          ) : (
                            'Baixar PDF'
                          )}
                        </button>
                      )) as unknown as React.ReactNode}
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
              <div>
                <h1 style={{ marginTop: 5 }} className="pedidoNumber">
                  Pedido Nº: {numeroPedidoSelecionado}
                </h1>
              </div>
              <h1
                style={{ marginTop: 15, marginLeft: 5 }}
                className="super-sub-texto"
              >
                Cliente: <span style={{ color: 'red' }}>*</span> {parceiroPedidoSelecionado}
              </h1>
              <div className="cabecalhoPesquisaPedido2">
                <div className="dflexivel">
                  <div className="divisaoCentral">
                    <h1 className="super-sub-texto">
                      Tipo Negociação: <span style={{ color: 'red' }}>*</span>
                    </h1>
                    <h1
                      className="super-sub-texto"
                      style={{ color: '#2031ed' }}
                    >
                      {tipoNegociacaoPedidoSelecionado}
                    </h1>
                    {naturezaPadraoPedidoSelecionado && (
                      <h1 className="super-sub-texto">
                        Natureza Padrão:{' '}
                        <span style={{ color: '#2031ed' }}>
                          {naturezaPadraoPedidoSelecionado}
                        </span>
                      </h1>
                    )}
                  </div>
                  <div className="divisaoCentral">
                    <h1 className="super-sub-texto">Tipo de pedido: </h1>
                    <h1
                      className="super-sub-texto"
                      style={{ color: '#2031ed' }}
                    >
                      {tipPedSelecionado == '1' ? 'Venda' : 'Bonificação'}
                    </h1>
                  </div>
                  <div className="divisaoCentral">
                    <h1 className="super-sub-texto">Data do pedido: </h1>
                    <h1
                      className="super-sub-texto"
                      style={{ color: '#2031ed' }}
                    >
                      {formataData(dataPedidoSelecionado)}
                    </h1>
                  </div>
                </div>
                <div className="dflexivel2">
                  <div className="divisaoCentral">
                    <h1 className="super-sub-texto">Valor do pedido: </h1>
                    <h1
                      style={{ color: '#2031ed', fontWeight: 'bold' }}
                      className="super-texto2"
                    >
                      R$ {moeda(valorPedidoSelecionado)}
                    </h1>
                  </div>
                  <div className="divisaoCentral">
                    <h1 className="super-sub-texto">
                      Valor do pedido C/ Ipi:{' '}
                    </h1>

                    <h1
                      style={{ color: '#2031ed', fontWeight: 'bold' }}
                      className="super-texto2"
                    >
                      R${' '}
                      {moeda(
                        calcularTotaisPedidoComIpi(
                          itensPedidoSelecionadoListAtivos.length > 0
                            ? itensPedidoSelecionadoListAtivos
                            : Array.isArray(itensPedidoSelecionado)
                            ? filtrarItensAtivosLista(itensPedidoSelecionado as any)
                            : [],
                          ufCliente
                        ).totalLiquido
                      )}
                    </h1>
                  </div>
                </div>
              </div>
              {String(observacaoPedidoSelecionado || '').trim() ? (
                <h1 style={{ marginTop: 10, marginLeft: 5 }} className="super-sub-texto">
                  Observação:{' '}
                  <span style={{ color: '#2031ed' }}>
                    {String(observacaoPedidoSelecionado || '')}
                  </span>
                </h1>
              ) : null}
            <div className="separador"></div>
            <div className="table-responsive  tabela-responsiva-pedido-realizado">
              <div className=" table-wrap">
                <Table responsive className="table-global table  main-table">
                  <thead>
                    <tr className="tituloTab">
                      {isMobile ? (
                        <>
                          <th className="th2 nome-grupo paddingPedido">
                            <h1 style={{ marginLeft: 4 }}>
                              LISTA DE PRODUTOS ESCOLHIDOS
                            </h1>
                          </th>
                        </>
                      ) : (
                        <>
                          <th
                            style={{ textAlign: 'center' }}
                            className="th1 id-grupo th-tabela-pedido paddingPedido"
                          >
                            Código
                          </th>
                          <th className="th2 nome-grupo paddingPedido">
                            Desc. Produto
                          </th>
                          <th
                            style={{ textAlign: 'center' }}
                            className="th4 th-tabela-pedido paddingPedido "
                          >
                            Qtd.
                          </th>
                          <th
                            style={{ textAlign: 'center' }}
                            className="th1 paddingPedido"
                          >
                            Prc. Venda
                          </th>

                          <th
                            style={{ textAlign: 'center' }}
                            className="th1 paddingPedido"
                          >
                            Valor
                          </th>
                          <th
                            style={{ textAlign: 'center' }}
                            className="th1 paddingPedido"
                          >
                            Ipi %
                          </th>
                          <th
                            style={{ textAlign: 'center' }}
                            className="th1 paddingPedido"
                          >
                            Item C/Ipi
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {itensPaginaModal?.length > 0 ? (
                      <>
                        {itensPaginaModal?.map((item, index) => (
                          <tr key={index}>
                            {isMobile ? (
                              <>
                                <div className="d-flex paddingPedido4">
                                  <div>
                                    <h2 className="descProdMob3">
                                      {item.produto?.nome}
                                    </h2>
                                    <h2 className="desccontdMob2">
                                      Cod.: {item.produtoId}
                                      <b
                                        style={{
                                          marginLeft: 10,
                                        }}
                                      ></b>
                                      Qtd.:{item.quant}
                                      <b
                                        style={{
                                          marginLeft: 10,
                                        }}
                                      ></b>
                                      Vlr.UN: {moeda(item.valUnit)}
                                      <b
                                        style={{
                                          marginLeft: 10,
                                        }}
                                      ></b>
                                    </h2>
                                    <h2 className="desccontdMob2">
                                      Valor R$: {moeda(item?.valTotal)}
                                      <b
                                        style={{
                                          marginLeft: 10,
                                        }}
                                      ></b>
                                      Ipi %: {ufCliente === 'CE' ? 0 : item.produto?.aliIpi}
                                      <b
                                        style={{
                                          marginLeft: 10,
                                        }}
                                      ></b>
                                      Item C/Ipi:{' '}
                                      {ufCliente !== 'CE' && item.produto?.aliIpi
                                        ? `${moeda(
                                            item.valTotal +
                                              item.valTotal *
                                                (item.produto?.aliIpi / 100)
                                          )}`
                                        : moeda(item.valTotal)}
                                    </h2>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <td
                                  style={{ textAlign: 'center' }}
                                  className="id-grupo"
                                >
                                  {item?.produtoId}
                                </td>
                                <td className="nome-grupo">
                                  {item.produto?.nome}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {item?.quant}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {moeda(item?.valUnit)}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {moeda(item?.valTotal)}
                                </td>
                        <td style={{ textAlign: 'center' }}>
                          {ufCliente === 'CE' ? 0 : item.produto?.aliIpi}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {ufCliente !== 'CE' && item.produto?.aliIpi
                            ? `${moeda(
                                item.valTotal +
                                  item.valTotal *
                                    (item.produto?.aliIpi / 100)
                              )}`
                            : moeda(item.valTotal)}
                        </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </>
                    ) : sucess < 100 ? (
                      <div
                        style={{ margin: 'auto' }}
                        className="alert alert-warning alerta-item"
                        role="alert"
                      >
                        Carregando dados...
                      </div>
                    ) : (
                      <div
                        style={{ margin: 'auto' }}
                        className="alert alert-warning alerta-item"
                        role="alert"
                      >
                        Nenhum item encontrado.
                      </div>
                    )}
                  </tbody>
                </Table>
                <Paginacao
                  total={itensPedidoSelecionadoListAtivos?.length ?? 0}
                  limit={qtdePaginaItens}
                  paginaAtual={paginaItens}
                  setPagina={setPaginaItens}
                />
              </div>
            </div>
            </div>
                    )}
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{ width: 130, marginTop: 15 }}
              className="btn btn-primary"
              onClick={handleCloselistaPedidosSelec}
            >
              Voltar
            </button>
          </Modal.Footer>
        </Modal>

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
              {modoRecebRapidoModal && (
                <h2 style={{ fontSize: 14, marginTop: 6, marginBottom: 0 }}>
                  Modo Recebimento Rápido
                </h2>
              )}
              {alertErroSankhya ? (
                <>
                  {alertErroSankhya && (
                    <div className="mt-3 mb-0">
                      <Alert msg={msgErro} setAlertErro={setAlertErroSankhya} />
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
                      <ProgressBar className="progress" animated now={sucess} />
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
        <Modal
          className="modal-confirmerror modalerroSankhya"
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
        <Modal
          className="modal-confirmerror modalerroSankhya modalLoad"
          show={showMensageLoading}
          onHide={handleCloseMensageLoading}
          backdrop="static"
        >
          <Modal.Body>
            <div style={{ marginTop: 25 }}></div>
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 style={{ marginTop: 15 }}></h1>
            <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
            <h1 style={{ marginTop: 15 }}></h1>
            <ProgressBar className="progress" animated now={sucess} />
          </Modal.Body>
        </Modal>
        <Modal
          className="modal-confirmerror modalerroSankhya modalLoad"
          show={showMensageLoadingDup}
          onHide={handleCloseMensageLoadingDup}
          backdrop="static"
        >
          <Modal.Body>
            <div style={{ marginTop: 25 }}></div>
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 style={{ marginTop: 15 }}></h1>
            <div>
              <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
              <h1 style={{ marginTop: 15, color: 'red' }}>
                Verificando Valores na Tabela Atual...
              </h1>
            </div>
            <h1 style={{ marginTop: 15 }}></h1>
            <ProgressBar className="progress" animated now={sucess} />
          </Modal.Body>
        </Modal>

      </div>
      <FooterMobile />
      <Footer />
    </>
  );
}
export default PedidoVendas;
