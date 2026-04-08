import React, { useState, useEffect, useMemo, useRef } from 'react';
import './SideNavBar.scss';
import {
  MdArrowForwardIos,
  MdGroups,
  MdMenuBook,
  MdOutlineAdminPanelSettings,
  MdOutlinePriceChange,
  MdOutlineRequestPage,
  MdTableView,
} from 'react-icons/md';

import './navbarDashDark.scss';
import { Link, useLocation } from 'react-router-dom';
import {
  AiFillPrinter,
  AiOutlinePieChart,
  AiOutlineUsergroupAdd,
  AiTwotoneBank,
} from 'react-icons/ai';
import {
  ImBriefcase,
  ImNewspaper,
  ImUngroup,
  ImUserPlus,
  ImUsers,
} from 'react-icons/im';
import {
  BsBuilding,
  BsPlusSquare,
  BsFillFileEarmarkRichtextFill,
  BsCardImage,
  BsMenuButtonWideFill,
  BsMap,
  BsCalculator,
  BsArrowUpRightSquareFill,
  BsNewspaper,
  BsSearch,
} from 'react-icons/bs';
import { GoFileSubmodule, GoGraph } from 'react-icons/go';
import { IoIosClose } from 'react-icons/io';
import { BsCoin } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import {
  FaHospitalUser,
  FaLayerGroup,
  FaIndustry,
  FaSearchMinus,
  FaRegAddressCard,
  FaSearchPlus,
  FaRegObjectUngroup,
  FaCogs,
  FaRegCreditCard,
  FaUserTie,
  FaUserTimes,
  FaRegMoneyBillAlt,
  FaUserCheck,
  FaBars,
} from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { useAppOnlineStatus } from '../../../provider/PortalContext';
import { RiPagesLine, RiShoppingBag3Line } from 'react-icons/ri';
import { TbBusinessplan, TbReport, TbReportSearch } from 'react-icons/tb';
import api from '../../../services/api';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../Alert';
import { MdOutlineAppRegistration } from 'react-icons/md';
import {
  IComunicadocomercial,
  iDadosUsuario,
  iGrupoUsuario,
  iMenu,
  IMenuPermissao,
  iPaginaPermissao,
  iPaginas,
  iSubMenuPermissao,
  iTipoNegociacao,
  iUsuarios,
} from '../../../@types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { GrDocumentPerformance, GrTableAdd } from 'react-icons/gr';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
import logoSankhya from '../../../assets/logosankhya.png';
import logoAlyne from '../../../assets/logo-dark.png';
import logoComunicado from '../../../assets/logoComunicado.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { HiRefresh, HiShoppingBag } from 'react-icons/hi';
import { BsGraphUp } from 'react-icons/bs';
import { HiOutlineDocumentChartBar } from 'react-icons/hi2';
import {
  BiIdCard,
  BiLogIn,
  BiMessageDetail,
  BiMessageSquareDots,
  BiMessageSquareEdit,
  BiMoney,
  BiUserVoice,
} from 'react-icons/bi';
import { openDB, DBSchema } from 'idb';

import { criarBancoDados, versao } from '../../../data/indexedDB';

import path from 'path';
interface PostLido {
  comunicadoId: number;
  titulo: string;
  lidoEm: string;
  usuarioID: number;
}

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
  usuarioPermissaoMenu: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
      paginaPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          subMenuPermissaoId: number;
          usuarioId: number;
        }
      ];
      usuarioId: number;
    };
  };
  usuarioPermissaoPagina: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      subMenuPermissaoId: number;
      usuarioId: number;
    };
  };
  grupoPermissaoMenu: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
      paginaPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          subMenuPermissaoId: number;
          grupoUsuarioId: number;
        }
      ];
      grupoUsuarioId: number;
    };
  };
  grupoPermissaoPagina: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      subMenuPermissaoId: number;
      grupoUsuarioId: number;
    };
  };
  grafico: {
    key: number;
    value: {
      id: number;
      Mes: string;
      AnoAtual: number;
      AnoAnterior: number;
    };
  };
  vendaMeta: {
    key: number;
    value: {
      id: number;
      month: string;
      meta: number;
      actual: number;
      color: string;
    };
  };
  valorAnterior: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorAtual: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  metaMes: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  vendaMes: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  quantFaturar: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorFaturar: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  quantPedidoOrcamento: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorPedidoOrcamento: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  quantPedidos: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorTotalAno: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorPedidos: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  clienteSemVenda: {
    key: number;
    value: {
      id: number;
      valor: number;
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
                  ipi: number;
                  grupoProdutoId: number;
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
      ipi: number;
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
      itemTabela: [
        {
          id: number;
          idTabelaPreco: number;
          idProd: number;
          atualizadoEm: string;
          produtos: {
            id: number;
            codigo: string;
            nome: string;
            idGrupo: string;
            nomeGrupo: string;
          };
          preco: number;
        }
      ];
    };
  };
  itemTabela: {
    key: number;
    value: {
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
        ipi: number;
        grupoProduto: {
          id: number;
          nome: string;
          atualizadoEm: string;
        };
        atualizadoEm: string;
      };
      atualizadoEm: string;
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
              ipi: number;
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
      sincronizado?: string;
    };
  };
  itemPedidoVenda: {
    key: number;
    value: {
      id: number;
      vendedorId: number;
      palMPV: string;
      produtoId: number;
      descProduto: string;
      quant: number;
      valUnit: number;
      valTotal: number;
      unidade: string;
      sincronizado?: string;
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
      atualizadoem: string;
    };
  };
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
  sincronizado?: string;
}

interface iItemPedido {
  id: number;
  vendedorId: number;
  palMPV: string;
  produtoId: number;
  descProduto: string;
  quant: number;
  valUnit: number;
  valTotal: number;
  unidade: string;
  sincronizado?: string;
}

export default function SideNavBar() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const COD_PAGINA_ATUALIZACAO_SANKHYA = 5000;

  const menuPrincipal: iMenu[] = JSON.parse(
    localStorage.getItem('@Portal/menuPrincipal') || '{}'
  );
  const permissoes: iMenu[] = JSON.parse(
    localStorage.getItem('@Portal/usuarioPermissaoMenu') || '{}'
  );

  const subMenuPermissoes: iSubMenuPermissao[] = JSON.parse(
    localStorage.getItem('@Portal/usuarioPermissaoSubMenu') || '{}'
  );

  const pagPermissoes: iPaginaPermissao[] = JSON.parse(
    localStorage.getItem('@Portal/usuarioPermissaoPagina') || '{}'
  );

  const grupopermissoes: iMenu[] = JSON.parse(
    localStorage.getItem('@Portal/grupoPermissaoMenu') || '{}'
  );

  const subMenugrupoPermissoes: iSubMenuPermissao[] = JSON.parse(
    localStorage.getItem('@Portal/grupoPermissaoSubMenu') || '{}'
  );

  const paggrupoPermissoes: iPaginaPermissao[] = JSON.parse(
    localStorage.getItem('@Portal/grupoPermissaoPagina') || '{}'
  );
  const location = useLocation();
  const userId = usuario.id;
  const vendedorCod = usuario.username;
  const history = useNavigate();
  const [isExpanded, setExpendState] = useState(false);
  const [espand, setespand] = useState(false);
  const [menuExpanded, setmenuExpendState] = useState(false);
  const [menuBar, setMenuBar] = useState(false);
  const [menuFotos, setmenuFotos] = useState(false);
  const [textMenu, settextMenu] = useState(true);
  const [active, setMode] = useState(false);
  const [openTrade, setOpenTrade] = useState(false);
  const [filter, setFilter] = useState(false);
  const [ismobile, setismobile] = useState(false);
  let [isMobile, setIsMobile] = useState(false);
  let [menuPermitido, setMenuPermitido] = useState<iMenu[]>([]);
  let [paginasMenu, setPaginasMenu] = useState<iPaginas[]>([]);
  let [paginasPermitidas, setPaginasPermitidas] = useState<iPaginas[]>([]);
  let [usuarioPermissao, setUsuarioPermissao] = useState<iUsuarios[]>([]);
  let [grupoPermissao, setGrupoPermissao] = useState<iGrupoUsuario[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeAccordionAdmin, setActiveAccordionAdmin] = useState<
    string | null
  >(null);
  const handleCloseloading = () => setShowloading(false);
  const [showloading, setShowloading] = useState(false);
  const handleCloseloadingApi = () => setShowloadingApi(false);
  const [showloadingApi, setShowloadingApi] = useState(false);
  const [showupdatePromotor, setShowupdatePromotor] = useState(false);
  const [vendedorTipo, setVendedorTipo] = useState('');
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const menuGet = localStorage.getItem('@Portal/usuario/atualiza-menu');
  const [icone, setIcone] = useState('fa fa-eye');
  const [loading, setLoading] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [showComunicado, setShowComunicado] = useState(false);
  const handleCloseComunicado = () => setShowComunicado(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);
  const [modoRecebRapidoModal, setModoRecebRapidoModal] = useState(false);
  const [showMensageDelete, setShowMensageDelete] = useState(false);
  const [showResetLocalData, setShowResetLocalData] = useState(false);
  const [showResetLocalDataConfirm, setShowResetLocalDataConfirm] =
    useState(false);
  const [resetLocalDataLoading, setResetLocalDataLoading] = useState(false);
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
  const [showMensageSankhyaErro, setShowMensageSankhyaErro] = useState(false);
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
  let [respostaSank, setrespostaSank] = useState('');
  let [sucess, setSucess] = useState(0);
  let [utilizando, setUtulizando] = useState(false);
  let [permitirMenu, setUPermitirMenu] = useState(false);
  let [permitirPagina, setUPermitirPagina] = useState(false);
  let [permitirMenuGrupo, setUPermitirMenuGrupo] = useState(false);
  let [permitirPaginaGrupo, setUPermitirPaginaGrupo] = useState(false);
  let [postLidos, setPostLidos] = useState<PostLido[]>([]);
  let [comunicadoLista, setcomunicadosLista] = useState<IComunicadocomercial[]>(
    []
  );
  const navbarRef = useRef<HTMLDivElement>(null);

  function handleCloseupdatePromotor() {
    setShowupdatePromotor(false);
  }

  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;

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

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOnline) {
    } else {
    }
  }, [isOnline]);

  useEffect(() => {
    async function carregarTipoVendedor() {
      try {
        const resp = await api.get(`/api/Vendedor/${vendedorCod}`);
        setVendedorTipo(String(resp?.data?.tipo ?? '').trim());
      } catch {}
    }
    if (vendedorCod) {
      carregarTipoVendedor();
    }
  }, [vendedorCod]);

  const validPagina = [
    ...(pagPermissoes?.length
      ? pagPermissoes.slice(0, pagPermissoes.length).map((p) => p?.codigo)
      : []),
    ...(paggrupoPermissoes?.length
      ? paggrupoPermissoes
          .slice(0, paggrupoPermissoes.length)
          .map((p) => p?.codigo)
      : []),
  ];

  const funcaoUsuario = String(usuario?.funcao || '').trim().toUpperCase();
  const isRepresentante =
    usuario?.grupoId === 3 ||
    funcaoUsuario === 'R' ||
    funcaoUsuario === 'REPRESENTANTE' ||
    funcaoUsuario.includes('REP') ||
    String(vendedorTipo || '').trim().toUpperCase() === 'R';

  const validPaginaFinal = useMemo(() => {
    const base = [
      ...validPagina,
      207,
      ...(usuario?.grupoId === 1 ? [COD_PAGINA_ATUALIZACAO_SANKHYA] : []),
    ];
    return Array.from(new Set(base));
  }, [isRepresentante, validPagina, usuario?.grupoId]);

  const podeVerAcompanhamentos = useMemo(() => {
    return isRepresentante || usuario?.id === 1;
  }, [isRepresentante, usuario?.id]);

  const menuPrincipalFinal = useMemo(() => {
    const menuArray = Array.isArray(menuPrincipal) ? menuPrincipal : [];

    return menuArray.map((m) => {
      if (usuario?.id === 1 && m?.id === 1) {
        const subMenus = Array.isArray(m.subMenu) ? m.subMenu : [];
        const idxCad = subMenus.findIndex((s) => s?.id === 1);
        if (idxCad >= 0) {
          const sub = subMenus[idxCad];
          const paginas = Array.isArray(sub.pagina) ? sub.pagina : [];
          const jaExiste = paginas.some((p) => p?.codigo === 44);
          if (!jaExiste) {
            const novo = {
              id: 208,
              codigo: 44,
              nome: 'Emails Envio Pedidos',
              url: '/emails-envio-pedidos',
              icon: 'fa fa-envelope',
              menuId: 1,
              subMenuId: 1,
            };

            return {
              ...m,
              subMenu: subMenus.map((s, i) =>
                i === idxCad
                  ? {
                      ...s,
                      pagina: [...paginas, novo],
                    }
                  : s
              ),
            };
          }
        }
      }

      if (usuario?.grupoId === 1 && false) {
        const subMenus = Array.isArray(m.subMenu) ? m.subMenu : [];
        const idxConfig = subMenus.findIndex((s) => {
          const nome = String(s?.nome || '').toUpperCase();
          return s?.id === 10 || (nome.includes('CONFIGURA') && nome.includes('AVAN'));
        });
        if (idxConfig >= 0) {
          const sub = subMenus[idxConfig];
          const paginas = Array.isArray(sub.pagina) ? sub.pagina : [];
          const jaExiste = paginas.some(
            (p) => p?.codigo === COD_PAGINA_ATUALIZACAO_SANKHYA
          );
          if (!jaExiste) {
            const novo = {
              id: 209,
              codigo: COD_PAGINA_ATUALIZACAO_SANKHYA,
                  nome: 'Gerência Comercial',
              url: '/atualizacao-sankhya',
              icon: 'fa fa-refresh',
              menuId: m?.id,
              subMenuId: 10,
            };

            return {
              ...m,
              subMenu: subMenus.map((s, i) =>
                i === idxConfig
                  ? {
                      ...s,
                      pagina: [...paginas, novo],
                    }
                  : s
              ),
            };
          }
        }
      }

      if (m?.id !== 3) {
        return m;
      }

      const paginas = Array.isArray(m.pagina) ? m.pagina : [];
      const jaExiste = paginas.some((p) => p?.codigo === 207);
      if (jaExiste) {
        return m;
      }

      return {
        ...m,
        pagina: [
          ...paginas,
          {
            id: 207,
            codigo: 207,
            nome: 'Orçamento',
            url: '/orcamento',
            icon: 'fa fa-file-text-o',
            menuId: 3,
            subMenuId: 0,
          },
        ],
      };
    });
  }, [menuPrincipal, usuario?.id, usuario?.grupoId]);

  const validSubMenu = [
    ...(subMenuPermissoes?.length
      ? subMenuPermissoes
          .slice(0, subMenuPermissoes.length)
          .map((p) => p?.codigo)
      : []),
    ...(subMenugrupoPermissoes?.length
      ? subMenugrupoPermissoes
          .slice(0, subMenugrupoPermissoes.length)
          .map((p) => p?.codigo)
      : []),
  ];

  const validMenu = [
    ...(permissoes.length
      ? permissoes.slice(0, permissoes.length).map((p) => p?.codigo)
      : []),
    ...(grupopermissoes?.length
      ? grupopermissoes.slice(0, grupopermissoes.length).map((p) => p?.codigo)
      : []),
  ];

  function handleCloseMensageSankhyaErro2() {
    setShowMensageSankhyaErro2(false);
  }

  function handleCloseMensageSankhyaErro() {
    setShowMensageSankhyaErro(false);
  }
  function handleCloseMensageSankhya() {
    setShowMensageSankhya(false);
    setModoRecebRapidoModal(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: MouseEvent) {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setExpendState(false);
      setespand(false);
      setActiveAccordion(null);
      setActiveAccordionAdmin(null);
    }
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
        const emDigitacao =
          localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
        const onPedido =
          String(window.location.pathname || '').toLowerCase().includes('pedido');
        if (!(emDigitacao && onPedido)) {
          window.location.reload();
        }
        setLoading(false);
        console.log(response);

        setShowupdate(true);
        setAlertErroMensage(true);
        setMsgErro('Dados atualizados com sucesso!!!');
        console.log('menu', response.data.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setLoading(false);
      });
  }

  const ToggleMode = () => {
    setMode(!active);
  };
  useEffect(() => {
    setTimeout(function () {}, 5000);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('paginas', validPagina);
    console.log('menus', menuPrincipal);
    PostsLidos();
  }, []);

  async function getComunicados() {
    setcomunicadosLista([]);
    comunicadoLista = [];
    setShowComunicado(false);
  }

  const handleMarcarComLidos = async () => {
    try {
      const postsLidos: PostLido[] = comunicadoLista.map((comunicado) => ({
        comunicadoId: comunicado.id,
        titulo: comunicado.titulo,
        lidoEm: new Date().toISOString(),
        usuarioID: usuario.id,
      }));

      const response = await api.post('/api/ComunicadoLido', postsLidos);
      console.log(response.data);
      setShowComunicado(false);
      PostsLidos();
    } catch (error) {
      console.error(error);
    }
  };
  async function PostsLidos() {
    setLoading(true);
    setSucess(30);
    await api
      .get(`/api/Usuario/${usuario.id}`)
      .then((response) => {
        console.log('dados do usuario', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  function debounce(func: Function, wait: number) {
    let timeout: any;
    return function executedFunction(...args: any[]) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  let timeoutID: any;
  const inactivityTime = 60000;

  const resetTimer = () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {}, inactivityTime);

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('mousedown', resetTimer);
    document.addEventListener('keypress', resetTimer);
  };

  useEffect(() => {
    resetTimer();

    return () => {
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('mousedown', resetTimer);
      document.removeEventListener('keypress', resetTimer);
    };
  }, []);

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

  function Verifica() {
    console.log('verificando..');
    if (location.pathname == '/pedido_vendas') {
      if (isOnline && !isMobile) {
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
          setTimeout(function () {}, 2000);
        }
      } else {
        setTimeout(function () {}, 2000);
      }
    } catch (error) {
      console.error('Erro ao verificar dados:', error);
    }
  }
  async function deleteIndexedDBDelete() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase('pgamobileDelete');

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error('Erro ao excluir o banco de dados.'));
      };

      request.onblocked = () => {
        reject(
          new Error('O banco de dados está bloqueado por outra transação.')
        );
      };
    });
  }

  async function deleteIndexedDB() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase('pgamobile');

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error('Erro ao excluir o banco de dados.'));
      };

      request.onblocked = () => {
        reject(new Error('O banco de dados está bloqueado por outra transação.'));
      };
    });
  }

  function fecharResetLocalData() {
    setShowResetLocalDataConfirm(false);
    setShowResetLocalData(false);
    setResetLocalDataLoading(false);
  }

  async function limparBancoLocal() {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    try {
      const storeNames = Array.from(db.objectStoreNames);
      if (storeNames.length === 0) {
        return;
      }
      const tx = db.transaction(storeNames, 'readwrite');
      await Promise.all(storeNames.map((s) => tx.objectStore(s).clear()));
      await tx.done;
    } finally {
      try {
        db.close();
      } catch {}
    }
  }

  async function resetarDadosLocais() {
    try {
      setResetLocalDataLoading(true);
      let resetou = false;
      try {
        await limparBancoLocal();
        resetou = true;
      } catch {}
      if (!resetou) {
        try {
          const db = await openDB<PgamobileDB>('pgamobile', versao);
          db.close();
        } catch {}
        try {
          await deleteIndexedDB();
        } catch {}
      }
      try {
        await deleteIndexedDBDelete();
      } catch {}
      try {
        await criarBancoDados();
      } catch {}
      fecharResetLocalData();
      window.location.reload();
    } finally {
      setResetLocalDataLoading(false);
    }
  }

  async function usarRecebimentoRapido(): Promise<boolean> {
    try {
      const usuarioId = Number((usuario as any)?.id ?? 0);
      if (!usuarioId) return false;

      const resp = await api.get(`/api/ConfigUsuario/usuario/${usuarioId}`);
      const data = (resp as any)?.data;

      if (!data) return false;
      if (data?.usuarioId != null && Number(data.usuarioId) !== usuarioId) {
        return false;
      }

      const raw = data?.recebRapido ?? data?.RecebRapido;
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

  function falharRecebimentoRapido(mensagem: string) {
    finalizarRecebimentoGlobal();
    setLoading(false);
    setShowMensageSankhya(false);
    setShowMensageSankhyaErro2(true);
    setrespostaSank(mensagem);
    respostaSank = mensagem;
  }

  async function receberDadosSankhya() {
    const iniciou = iniciarRecebimentoGlobal('SideNavBar');
    if (!iniciou) {
      return;
    }
    const usarFluxoLeve = await usarRecebimentoRapido();
    setModoRecebRapidoModal(usarFluxoLeve);
    if (usarFluxoLeve) {
      setSucess(0);
      sucess = 0;
      try {
        await deleteIndexedDBDelete();
      } catch {}
      try {
        await criarBancoDados();
      } catch {}
      setShowMensageSankhya(true);
      setrespostaSank('Atualizando Banco...');
      respostaSank = 'Atualizando Banco...';
      await GetTipoNegociacao();
      return;
    }

    console.log('recebendo dados', vendedorCod);
    setSucess(0);
    sucess = 0;
    try {
      await criarBancoDados();
    } catch {}
    try {
      await deleteIndexedDBDelete();
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
      await receberDadosSankhyaVendedor();
    } catch (error) {
      setLoading(false);
      if (isMobile) {
        setShowMensageSankhyaErro2(true);
        GetParceiro();
      } else {
        console.log('erro ao efetuar login não mobile');
        setShowMensageSankhya(false);
        setShowMensageSankhyaErro(true);
      }
    }
  }

  function ReceberDadosAutomatico() {
    const iniciou = iniciarRecebimentoGlobal('SideNavBarAuto');
    if (!iniciou) {
      return;
    }
    setShowMensageSankhya(true);
    setrespostaSank('Você Recebeu dados a mais de 12hs...');
    respostaSank = 'Você Recebeu dados a mais de 12hs...';
    setTimeout(function () {
      receberDadosSankhyaVendedorAuto();
    }, 3000);
  }

  async function receberDadosSankhyaVendedorAuto() {
    setrespostaSank('Acessando Servidor...');
    respostaSank = 'Acessando Servidor...';
    if (isOnline) {
      setErroSankhya(false);
      erroSankhya = false;
      setAlertErroSankhyaBD(false);
      setDadosRecebidos(false);
      dadosRecebidos = false;
      setrespostaSank('Atualizando Vendedor...');
      respostaSank = 'Atualizando Vendedor...';

      VerificaRepresentante();
    } else {
      setShowupdatePromotor(true);
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

      VerificaRepresentante();
    } else {
      setShowupdatePromotor(true);
      finalizarRecebimentoGlobal();
    }
  }

  async function VerificaRepresentante() {
    await api
      .get(`/api/Vendedor/${vendedorCod}`)
      .then((response) => {
        setVendedorTipo(String(response?.data?.tipo ?? '').trim());
        console.log(
          'dados do vendedor.........................',
          response.data.tipo
        );
        if (response.data.tipo == 'R' || response.data.tipo == 'V') {
          receberDadosSankhyaLote();
        } else {
          setAlertErroSankhya(true);
          setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
          finalizarRecebimentoGlobal();
        }
      })
      .catch((error) => {
        setLoading(false);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        finalizarRecebimentoGlobal();
      });
  }
  //==============================================================
  async function receberDadosSankhyaLote() {
    setrespostaSank('Atualizando dados (lote)...');
    respostaSank = 'Atualizando dados (lote)...';
    try {
      const response = await api.post(
        `/api/Sankhya/ReceberDadosLote?vendedorId=${vendedorCod}`
      );
      const data = (response as any)?.data;
      const resultados = Array.isArray(data?.resultados) ? data.resultados : [];
      const teveErro = resultados.some((r: any) => r && r.sucesso === false);
      if (teveErro) {
        setErroSankhya(true);
        erroSankhya = true;
      }
    } catch (error) {
      setErroSankhya(true);
      erroSankhya = true;
    } finally {
      await GetTipoNegociacao();
    }
  }

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
        try { console.log('TIPO DE NATUREZA', 'SANKHYA SQL rows', rows); } catch {}
        const data = Array.isArray(rows)
          ? rows.map((r: any) => ({
              id: Array.isArray(r) ? r[0] : r?.Id ?? r?.ID ?? r?.id,
              descricao: Array.isArray(r) ? r[1] : r?.Descricao ?? '',
              atualizadoEm: Array.isArray(r) ? r[2] : r?.AtualizadoEm ?? '',
              NaturezaPadrao:
                Array.isArray(r) ? r[3] : r?.NaturezaPadrao ?? null,
            }))
          : [];
        try { console.log('TIPO DE NATUREZA', 'SANKHYA mapped', data); } catch {}
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
    setSucess(30);
    sucess = 30;

    setrespostaSank('Atualizando Parceiro...#NavBar');
    respostaSank = 'Atualizando Parceiro...#NavBar';
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
    setSucess(60);
    sucess = 60;

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
      })
      .catch((error) => {
        setLoading(false);
      });

    if (erroSankhya == false) {
      await GetTipoNegociacao();
    }
  }
  //====== GET PARA INSERT NO BANCO INDEXEDDB =====================//

  const [parceiros, setParceiro] = useState<iParceiro[]>([]);
  const [idParceiros, setidParceiros] = useState<Number[]>([]);

  async function GetParceiro() {
    setrespostaSank('Atualizando Banco...');
    respostaSank = 'Atualizando Banco...';
    console.log('entrou no receber dados para banco off');
    try {
      const response = await api.get(
        `/api/Parceiro/total?codVendedor=${vendedorCod}`
      );
      console.log('Parceiro', response.data.data);
      const parceiro = response.data.data.filter(
        (parceiro: any) =>
          parceiro.vendedorId == usuario.username && parceiro.status == 'S'
      );
      await popularParceiro(parceiro);

      const parceiroIDs = parceiro.map((parceiro: any) => parceiro.id);
      console.log('IDs do Parceiro', parceiroIDs);
    } catch {
      falharRecebimentoRapido('Falha ao carregar Parceiros.');
    }
  }

  async function GetTipoNegociacao() {
    console.log('entrou no receber dados para banco off');
    try {
      const response = await api.get(`/api/TipoNegociacao?pagina=1&totalpagina=999`);
      console.log('tipo nrgocio', response.data.data);
      await popularTipoNegociacao(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar TipoNegociacao.');
    }
  }

  async function GetGrupoProduto() {
    try {
      const response = await api.get('/api/GrupoProduto?pagina=1&totalpagina=999');
      console.log('GrupoProduto', response.data.data);
      await popularGrupoProd(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar GrupoProduto.');
    }
  }

  async function GetProduto() {
    try {
      const response = await api.get('/api/Produto/total');
      console.log('Produto', response.data.data);
      await popularProduto(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar Produto.');
    }
  }

  async function GetTabelaPreco() {
    try {
      const response = await api.get('/api/TabelaPreco/total');
      console.log('TabelaPreco', response.data.data);
      await popularTabelaPreco(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar TabelaPreco.');
    }
  }

  async function GetItemTabela() {
    try {
      const response = await api.get(
        `/api/ItemTabelaPreco/ItensTotais?vendedorId=${usuario.username}`
      );
      console.log('ItemTabela', response.data.data);
      console.log('quantidade ItemTabela....', response.data.data.length);
      console.log('quantidade total', response.data.total);
      await popularItemTabela(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar Itens de Tabela de Preço.');
    }
  }

  async function GetTabelaPrecoParceiro() {
    try {
      const response = await api.get(`/api/TabelaPrecoParceiro/total`);
      console.log('TabelaPrecoParceiro', response.data.data);
      await popularTabelaPrecoParceiro(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar TabelaPrecoParceiro.');
    }
  }

  async function GetCabecalho() {
    console.log('entrou no receber dados para banco off');
    try {
      const response = await api.get(
        `/api/CabecalhoPedidoVenda/ultimos/vendedor?codVendedor=${usuario.username}`
      );
      console.log('Cabecalhos', response.data.data);
      await popularCabecalho(response.data.cabecalho, response.data.itens);
    } catch {
      falharRecebimentoRapido('Falha ao carregar últimos pedidos.');
    }
  }

  async function GetItemPedido() {
    console.log('entrou no receber dados para banco off');
    await api
      .get(
        `/api/ItemPedidoVenda/filter/vendedorId?codVendedor=${usuario.username}`
      )
      .then((response) => {
        console.log('itens pedidos venda', response.data.data);
      })
      .catch((error) => {});
  }
  async function GetTabelaAdicional() {
    try {
      const response = await api.get(
        `/api/ItemTabelaPreco/tabelaAdicional?vendedorId=${usuario.username}`
      );
      console.log('ItemPedidoVenda', response.data.data);
      await popularTabelaAdicional(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar Tabela de Preço Adicional.');
    }
  }

  //=================== popular =================================//
  //==============popular pedidos ==========================================
  async function popularCabecalho(
    cabecalhoPedido: IcabecalhoPedido[],
    itemPedido: iItemPedido[]
  ) {
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
    await popularItemPedido(itemPedido);
  }

  async function popularItemPedido(itemPedido: iItemPedido[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('itemPedidoVenda', 'readwrite');
    const store = transaction.objectStore('itemPedidoVenda');

    const allItens = await store.getAll();

    const deleteItens = allItens.filter((item) => item.sincronizado === 'S');
    for (const item of deleteItens) {
      await store.delete(item.id);
    }

    for (const item of itemPedido) {
      item.sincronizado = 'S';
      await store.add(item);
    }

    await transaction.done;
    await GetTabelaAdicional();
  }

  //========================================================================
  //=========== PARCEIRO ===================================
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
                ipi: number;
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
  async function popularParceiro(parceiros: iParceiro[]) {
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
      const emDigitacao =
        localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
      const onPedido = String(window.location.pathname || '')
        .toLowerCase()
        .includes('pedido');
      if (!(emDigitacao && onPedido)) {
        window.location.reload();
      }
    }
  }

  async function popularTipoNegociacao(tipos: iTipoNegociacao[]) {
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
      await GetGrupoProduto();
    }
  }

  //============GRUPO PRODUTO ==============================//

  interface igrupoProduto {
    id: number;
    nome: string;
    atualizadoEm: string;
  }
  async function popularGrupoProd(grupoProduto: igrupoProduto[]) {
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
      await GetProduto();
    }
  }

  //====== PRODUTO ===============================

  interface iproduto {
    id: number;
    codigo: string;
    nome: string;
    grupoProdutoId: number;
    ipi: number;
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
  async function popularProduto(produto: iproduto[]) {
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
      await GetTabelaPreco();
    }
  }
  //=========== TABELA PRECO ===================================
  interface iTabelaPreco {
    id: number;
    codigo: number;
    descricao: string;
    dataInicial: string;
    dataFinal: string;
    atualizadoEm: string;
    itemTabela: [
      {
        id: number;
        idTabelaPreco: number;
        idProd: number;
        atualizadoEm: string;
        produtos: {
          id: number;
          codigo: string;
          nome: string;
          idGrupo: string;
          nomeGrupo: string;
        };
        preco: number;
      }
    ];
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
      await GetItemTabela();
    }
  }

  //=========== ITEM TABELA PRECO ===================================
  interface iItemTabela {
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
      ipi: number;
      grupoProduto: {
        id: number;
        nome: string;
        atualizadoEm: string;
      };
      atualizadoEm: string;
    };
    atualizadoEm: string;
  }
  async function popularItemTabela(itemTabela: iItemTabela[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('itemTabela', 'readwrite');
    const store = transaction.objectStore('itemTabela');

    try {
      await store.clear();

      for (const tabela of itemTabela) {
        await store.add(tabela);
      }

      const registrosInseridos = await store.count();

      if (registrosInseridos !== itemTabela.length) {
        await store.clear();
        for (const tabela of itemTabela) {
          await store.add(tabela);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await GetTabelaPrecoParceiro();
    }
  }

  //=========== ITEM TABELA PRECO PARCEIRO ===================================
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
            ipi: number;
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
  async function popularTabelaPrecoParceiro(
    tabelaPrecoParceiro: iTabelaPrecoParceiro[]
  ) {
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
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await GetTitulo();
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

  async function GetTitulo() {
    try {
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
      const response = await api.post(
        `/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`
      );
      const rows = (response as any)?.data?.responseBody?.rows ?? [];
      const result: iTitulo[] = rows.map((curr: any, idx: number) => {
        return {
          id: idx + 1,
          empresaId: curr[0],
          parceiroId: curr[1],
          nuUnico: curr[2],
          parcela: curr[3],
          dataEmissao: curr[4],
          dataVencim: curr[5],
          valor: curr[6],
        };
      });
      await popularTitulo(result);
    } catch {}
  }

  async function popularTitulo(titulo: iTitulo[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('titulo', 'readwrite');
    const store = transaction.objectStore('titulo');

    try {
      await store.clear();
      let idIncremental = 1;
      for (const t of titulo) {
        t.id = idIncremental++;
        await store.add(t);
      }

      const registrosInseridos = await store.count();
      if (registrosInseridos !== titulo.length) {
        await store.clear();
        idIncremental = 1;
        for (const t of titulo) {
          t.id = idIncremental++;
          await store.add(t);
        }
      }
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await GetCabecalho();
    }
  }

  //=========== POPULAR TABELA ADICIONAL ============================
  interface iTabelaAdicional {
    id: number;
    empresaId: number;
    idProd: number;
    parceiroId: number;
    preco: number;
    atualizadoem: string;
  }

  async function popularTabelaAdicional(tabelaAdicional: iTabelaAdicional[]) {
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
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      await db.close();
      await GetParceiro();
    }
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
      .catch((error) => {
        setLoading(false);
      });
  }

  //============usuario autenticado ==========================//
  async function GetUsuarioIdLog() {
    await api

      .get(`/api/Vendedor?pagina=1&totalpagina=99`)
      .then((response) => {
        console.log('token ok');
      })
      .catch((error) => {
        console.log('token expirou');
        if (error.response?.status === 401) {
          console.log('token expirou');
          setShowloading(true);
        }
      });
  }

  function VoltaRlogin(event: any) {
    event.preventDefault();
    localStorage.removeItem('@Portal/usuario');
    history('/');
  }
  //=============get usuario id ==========================================//

  function MenuMob() {
    if (!menuExpanded) {
      setmenuExpendState(true);
    } else {
      setmenuExpendState(false);
    }
  }

  function textVisual() {
    if (!isExpanded) {
      setTimeout(function () {
        setespand(true);
      }, 300);
    } else {
      setespand(false);
    }
  }

  function TextMenu() {
    if (!isExpanded) {
      setTimeout(function () {
        setespand(true);
      }, 300);
    } else {
    }
  }

  function sumirtexto() {
    if (menuBar) {
      settextMenu(true);
    } else {
      settextMenu(false);
    }
  }
  function Trade() {
    if (openTrade) {
      setOpenTrade(false);
    } else {
      setOpenTrade(true);
    }
  }

  return (
    <div
      id="menuLateral"
      className={menuExpanded ? 'menuEspand' : 'menuNoEspand'}
      ref={navbarRef}
    >
      <div
        style={
          usuario.id == 1
            ? { height: 960, maxHeight: 960 }
            : { height: 1020, maxHeight: 1020 }
        }
        className={
          isExpanded
            ? 'side-nav-container slad-nav-active'
            : 'side-nav-container side-nav-container-NX slad-nav-active '
        }
      >
        {isOnline ? (
          <>
            <label
              id="sidebarToggleTop "
              htmlFor="sidebar-toogle"
              className="btn btn-link menu-mobiledmin"
              onClick={() => {
                MenuMob();
                setExpendState(false);
                setespand(false);
                setOpenTrade(false);
                textVisual();
                setActiveAccordion(null);
                setActiveAccordionAdmin(null);
              }}
            >
              {menuExpanded ? (
                <>
                  {' '}
                  <IoIosClose fontSize={45} style={{ color: '#fff' }} />
                </>
              ) : (
                <>
                  <FaBars fontSize={30} style={{ color: '#000' }} />
                </>
              )}
            </label>
          </>
        ) : (
          <></>
        )}
        <div className="nav-upper">
          <div className="nav-heading">
            <label
              onClick={sumirtexto}
              htmlFor="sidebar-toogle"
              className="arrow-bar"
            >
              <MdArrowForwardIos fontSize={24} color={'#7A7A7A'} />
            </label>
            <button
              className={
                isExpanded
                  ? ' arrow-bar  hamburger-in'
                  : 'arrow-bar hamburger-out'
              }
              onClick={() => {
                setExpendState(!isExpanded);
                textVisual();
                setOpenTrade(false);
                setActiveAccordion(null);
                setActiveAccordionAdmin(null);
                if (isExpanded) {
                  localStorage.setItem('@Portal/barra', 'false');
                } else {
                  localStorage.setItem('@Portal/barra', 'true');
                }
              }}
            >
              <MdArrowForwardIos fontSize={24} color={'#7A7A7A'} />
            </button>
          </div>

          <div className="sidebar-menu">
            <ul>
              {usuario.grupoId == 3 ? (
                <>
                  <li className="menuInterativo">
                    <ul>
                      <li style={{ marginTop: 30 }}>
                        <Accordion
                          className={isExpanded ? 'menuAberto' : 'menuFechado'}
                          flush
                        >
                          <Accordion.Item eventKey="0">
                            <Accordion.Header
                              onClick={() => {
                                setExpendState(true);
                                TextMenu();
                              }}
                            >
                              <span className="menus-nav">
                                <FaCogs id="icon-menu" />
                                {espand && (
                                  <span className="nome-menu">
                                    Configurações
                                  </span>
                                )}
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div>
                                <Link
                                  style={{
                                    display: 'flex',
                                    marginLeft: 10,
                                  }}
                                  to="/atualizacao-sankhya"
                                >
                                  <span className="menus-nav">
                                    <span
                                      id="icon-menu-pages"
                                      className="fa fa-refresh"
                                    />
                                    {espand && (
                                      <span className="nome-menu-pages" style={{ marginLeft: 8 }}>
                                        Gerência Comercial
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </li>
                    </ul>
                  </li>
                </>
              ) : usuario.grupoId == 1 && usuario.id != 1 ? (
                <>
                  <li className="menuInterativo">
                    <ul>
                      <li style={{ marginTop: 30 }}>
                        <Accordion
                          className={isExpanded ? 'menuAberto' : 'menuFechado'}
                          flush
                        >
                          <Accordion.Item eventKey="0">
                            <Accordion.Header
                              onClick={() => {
                                setExpendState(true);
                                TextMenu();
                              }}
                            >
                              <span className="menus-nav">
                                <FaCogs id="icon-menu" />
                                {espand && (
                                  <span className="nome-menu">
                                    Configurações
                                  </span>
                                )}
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div>
                                <Link
                                  style={{
                                    display: 'flex',
                                    marginLeft: 10,
                                  }}
                                  to="/atualizacao-sankhya"
                                >
                                  <span className="menus-nav">
                                    <span
                                      id="icon-menu-pages"
                                      className="fa fa-refresh"
                                    />
                                    {espand && (
                                      <span className="nome-menu-pages" style={{ marginLeft: 8 }}>
                                        Gerência Comercial
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </li>
                    </ul>
                  </li>
                </>
              ) : usuario.id == 1 ? (
                <>
                  {/* ============inicio do menu ==================================================== */}

                  <li className="menuInterativo">
                    {menuPrincipalFinal?.length > 0 ? (
                      <>
                        {menuPrincipalFinal?.map((menu, index) => (
                          <>
                            {menu.id == 1 ? (
                              <>
                                <li style={{ marginTop: 30 }}>
                                  <Accordion
                                    className={
                                      isExpanded ? 'menuAberto' : 'menuFechado'
                                    }
                                    activeKey={
                                      activeAccordionAdmin === String(index)
                                        ? String(index)
                                        : null
                                    }
                                    flush
                                    key={index}
                                  >
                                    <Accordion.Item eventKey={String(index)}>
                                      <Accordion.Header
                                        onClick={() => {
                                          setExpendState(true);
                                          TextMenu();
                                          setActiveAccordionAdmin((prevIndex) =>
                                            prevIndex === String(index)
                                              ? null
                                              : String(index)
                                          );
                                          setActiveAccordion(null);
                                        }}
                                      >
                                        <span className="menus-nav">
                                          <AiTwotoneBank
                                            id="icon-menu"
                                            color="#fff"
                                          />
                                          {espand && (
                                            <span className="nome-menu">
                                              {menu?.nome}
                                            </span>
                                          )}
                                        </span>
                                      </Accordion.Header>

                                      <Accordion.Body>
                                        {/* ========================================== inicio subMenu =============================================== */}
                                        {menu.subMenu[0]?.codigo > 0 ? (
                                          <>
                                            {menu.subMenu?.map(
                                              (menu, index) => (
                                                <>
                                                  <Accordion
                                                    className={
                                                      isExpanded
                                                        ? 'menuAberto'
                                                        : 'menuFechado'
                                                    }
                                                    activeKey={
                                                      activeAccordion ===
                                                      String(index)
                                                        ? String(index)
                                                        : null
                                                    }
                                                    key={index}
                                                    flush
                                                  >
                                                    <Accordion.Item
                                                      eventKey={String(index)}
                                                    >
                                                      <Accordion.Header
                                                        onClick={() => {
                                                          setExpendState(true);
                                                          TextMenu();
                                                          setActiveAccordion(
                                                            (prevIndex) =>
                                                              prevIndex ===
                                                              String(index)
                                                                ? null
                                                                : String(index)
                                                          );
                                                        }}
                                                      >
                                                        <span className="menus-nav">
                                                          {menu?.id == 1 ? (
                                                            <>
                                                              <FaRegAddressCard id="icon-menu" />
                                                            </>
                                                          ) : menu?.id == 2 ? (
                                                            <>
                                                              <BsMap id="icon-menu" />
                                                            </>
                                                          ) : menu?.id == 3 ? (
                                                            <>
                                                              <FaSearchPlus id="icon-menu" />
                                                            </>
                                                          ) : menu?.id == 4 ? (
                                                            <>
                                                              <FaRegObjectUngroup id="icon-menu" />
                                                            </>
                                                          ) : menu?.id == 10 ? (
                                                            <>
                                                              <FaCogs id="icon-menu" />
                                                            </>
                                                          ) : (
                                                            <>
                                                              {menu?.icon ? (
                                                                <span
                                                                  id="icon-sub-menu"
                                                                  className={
                                                                    menu?.icon
                                                                  }
                                                                />
                                                              ) : (
                                                                <></>
                                                              )}
                                                            </>
                                                          )}
                                                          {espand && (
                                                            <span className="nome-menu">
                                                              {menu?.nome}
                                                            </span>
                                                          )}
                                                        </span>
                                                      </Accordion.Header>

                                                      <Accordion.Body>
                                                        <div>
                                                          {menu.pagina?.map(
                                                            (pagina, index) => (
                                                              <>
                                                                <Link
                                                                  style={{
                                                                    display:
                                                                      'flex',
                                                                    marginLeft: 10,
                                                                  }}
                                                                  to={
                                                                    pagina?.url
                                                                  }
                                                                  onClick={() => {
                                                                    if (
                                                                      pagina.codigo ==
                                                                      24
                                                                    ) {
                                                                      receberDadosSankhya();
                                                                    }
                                                                    if (
                                                                      pagina.codigo ==
                                                                      26
                                                                    ) {
                                                                      setShowMensageDelete(
                                                                        true
                                                                      );
                                                                      setAlertErroMensage(
                                                                        true
                                                                      );
                                                                      setMsgErro(
                                                                        'Deseja realmente atualizar os dados?'
                                                                      );
                                                                    }
                                                                    setExpendState(
                                                                      false
                                                                    );
                                                                    setespand(
                                                                      false
                                                                    );
                                                                    setActiveAccordion(
                                                                      null
                                                                    );
                                                                    setActiveAccordionAdmin(
                                                                      null
                                                                    );
                                                                    const urlParts =
                                                                      pagina.url.split(
                                                                        '/'
                                                                      );
                                                                    const moduloId =
                                                                      parseInt(
                                                                        urlParts[
                                                                          urlParts.length -
                                                                            1
                                                                        ],
                                                                        10
                                                                      );
                                                                    //   GetModulo(moduloId);
                                                                  }}
                                                                  key={index}
                                                                >
                                                                  <span className="menus-nav">
                                                                    {/* <span
                                                                      id="icon-sub-menu"
                                                                      className={
                                                                        pagina?.icon
                                                                      }
                                                                    />  */}
                                                                    {pagina?.id ==
                                                                    1 ? (
                                                                      <>
                                                                        <ImBriefcase id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      2 ? (
                                                                      <>
                                                                        <ImUserPlus id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      3 ? (
                                                                      <>
                                                                        <FaRegCreditCard id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      4 ? (
                                                                      <>
                                                                        <FaUserTie id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      5 ? (
                                                                      <>
                                                                        <HiShoppingBag id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      6 ? (
                                                                      <>
                                                                        <TiShoppingCart id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      7 ? (
                                                                      <>
                                                                        <FaUserTimes id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      8 ? (
                                                                      <>
                                                                        <FaUserTimes id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      9 ? (
                                                                      <>
                                                                        <BsCalculator id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      11 ? (
                                                                      <>
                                                                        <BsGraphUp id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      207 ? (
                                                                      <>
                                                                        <TbBusinessplan id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      33 ? (
                                                                      <>
                                                                        <GoGraph id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      34 ? (
                                                                      <>
                                                                        <GoGraph id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      37 ? (
                                                                      <>
                                                                        <TbReportSearch id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      38 ? (
                                                                      <>
                                                                        <TbReportSearch id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      39 ? (
                                                                      <>
                                                                        <HiOutlineDocumentChartBar id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      40 ? (
                                                                      <>
                                                                        <HiOutlineDocumentChartBar id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      47 ? (
                                                                      <>
                                                                        <FaRegMoneyBillAlt id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      48 ? (
                                                                      <>
                                                                        <FaRegMoneyBillAlt id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      12 ? (
                                                                      <>
                                                                        <FaUserCheck id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      27 ? (
                                                                      <>
                                                                        <FaUserCheck id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      13 ? (
                                                                      <>
                                                                        <ImUsers id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      28 ? (
                                                                      <>
                                                                        <ImUsers id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      16 ? (
                                                                      <>
                                                                        <BsArrowUpRightSquareFill id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      31 ? (
                                                                      <>
                                                                        <BsArrowUpRightSquareFill id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      42 ? (
                                                                      <>
                                                                        <BiMessageSquareEdit id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      43 ? (
                                                                      <>
                                                                        <BiMessageSquareDots id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      44 ? (
                                                                      <>
                                                                        <BiMessageSquareDots id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      45 ? (
                                                                      <>
                                                                        <BiMessageDetail id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      46 ? (
                                                                      <>
                                                                        <BiMessageDetail id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      29 ? (
                                                                      <>
                                                                        <HiRefresh id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      32 ? (
                                                                      <>
                                                                        <HiRefresh id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      35 ? (
                                                                      <>
                                                                        <FaCogs id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      36 ? (
                                                                      <>
                                                                        <FaCogs id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.id ==
                                                                      49 ? (
                                                                      <>
                                                                        <GoFileSubmodule id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '1' ? (
                                                                      <>
                                                                        <FiUsers id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '2' ? (
                                                                      <>
                                                                        <BiMoney id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '3' ? (
                                                                      <>
                                                                        <HiOutlineDocumentChartBar id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '4' ? (
                                                                      <>
                                                                        <BsNewspaper id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '5' ? (
                                                                      <>
                                                                        <ImNewspaper id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '6' ? (
                                                                      <>
                                                                        <BsSearch id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '7' ? (
                                                                      <>
                                                                        <FaIndustry id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '8' ? (
                                                                      <>
                                                                        <TiShoppingCart id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '9' ? (
                                                                      <>
                                                                        <ImUngroup id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '10' ? (
                                                                      <>
                                                                        <BsCoin id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.icon ==
                                                                      '11' ? (
                                                                      <>
                                                                        <BiIdCard id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.codigo ==
                                                                      38 ? (
                                                                      <>
                                                                        <BiUserVoice id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.codigo ==
                                                                      39 ? (
                                                                      <>
                                                                        <BiLogIn id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.codigo ==
                                                                      37 ? (
                                                                      <>
                                                                        <TbReport id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.codigo ==
                                                                      40 ? (
                                                                      <>
                                                                        <AiFillPrinter id="icon-menu" />
                                                                      </>
                                                                    ) : pagina?.codigo ==
                                                                      42 ? (
                                                                      <>
                                                                        <MdOutlineRequestPage id="icon-menu" />
                                                                      </>
                                                                    ) : (
                                                                    <>
                                                                      {pagina?.icon ? (
                                                                        <span
                                                                          id="icon-sub-menu"
                                                                          className={
                                                                            pagina?.icon
                                                                          }
                                                                        />
                                                                      ) : (
                                                                        <></>
                                                                      )}
                                                                    </>
                                                                    )}

                                                                    <span className="visivel">
                                                                      {
                                                                        pagina?.nome
                                                                      }
                                                                    </span>
                                                                  </span>
                                                                </Link>
                                                              </>
                                                            )
                                                          )}
                                                        </div>
                                                      </Accordion.Body>
                                                    </Accordion.Item>
                                                  </Accordion>
                                                </>
                                              )
                                            )}

                                            {/* ========================================== fim =============================================== */}
                                          </>
                                        ) : (
                                          <>
                                            {/* =================================inicio so paginas ============================================== */}
                                            {menu.pagina.map(
                                              (pagina, index) => (
                                                <Link
                                                  key={index}
                                                  style={{
                                                    display: 'flex',
                                                    marginLeft: 10,
                                                  }}
                                                  to={pagina?.url}
                                                  onClick={() => {
                                                    if (pagina.codigo == 24) {
                                                      receberDadosSankhya();
                                                    }
                                                    if (pagina.codigo == 26) {
                                                      setShowMensageDelete(
                                                        true
                                                      );
                                                      setAlertErroMensage(true);
                                                      setMsgErro(
                                                        'Deseja realmente atualizar os dados?'
                                                      );
                                                    }
                                                    setExpendState(false);
                                                    setespand(false);
                                                    setActiveAccordion(null);
                                                    setActiveAccordionAdmin(
                                                      null
                                                    );
                                                    const urlParts =
                                                      pagina.url.split('/');
                                                    const moduloId = parseInt(
                                                      urlParts[
                                                        urlParts.length - 1
                                                      ],
                                                      10
                                                    );
                                                  }}
                                                >
                                                  <span className="menus-nav">
                                                    {pagina?.id == 1 ? (
                                                      <>
                                                        <ImBriefcase id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 2 ? (
                                                      <>
                                                        <ImUserPlus id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 17 ? (
                                                      <>
                                                        <ImBriefcase id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 18 ? (
                                                      <>
                                                        <ImUserPlus id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 3 ? (
                                                      <>
                                                        <FaRegCreditCard id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 4 ? (
                                                      <>
                                                        <FaUserTie id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 5 ? (
                                                      <>
                                                        <HiShoppingBag id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 6 ? (
                                                      <>
                                                        <TiShoppingCart id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 7 ? (
                                                      <>
                                                        <FaUserTimes id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 8 ? (
                                                      <>
                                                        <FaUserTimes id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 9 ? (
                                                      <>
                                                        <BsCalculator id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 11 ? (
                                                      <>
                                                        <BsGraphUp id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 33 ? (
                                                      <>
                                                        <GoGraph id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 34 ? (
                                                      <>
                                                        <GoGraph id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 37 ? (
                                                      <>
                                                        <TbReportSearch id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 38 ? (
                                                      <>
                                                        <TbReportSearch id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 39 ? (
                                                      <>
                                                        <HiOutlineDocumentChartBar id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 40 ? (
                                                      <>
                                                        <HiOutlineDocumentChartBar id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 47 ? (
                                                      <>
                                                        <FaRegMoneyBillAlt id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 48 ? (
                                                      <>
                                                        <FaRegMoneyBillAlt id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 12 ? (
                                                      <>
                                                        <FaUserCheck id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 27 ? (
                                                      <>
                                                        <FaUserCheck id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 13 ? (
                                                      <>
                                                        <ImUsers id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 28 ? (
                                                      <>
                                                        <ImUsers id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 16 ? (
                                                      <>
                                                        <BsArrowUpRightSquareFill id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 31 ? (
                                                      <>
                                                        <BsArrowUpRightSquareFill id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 42 ? (
                                                      <>
                                                        <BiMessageSquareEdit id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 43 ? (
                                                      <>
                                                        <BiMessageSquareDots id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 44 ? (
                                                      <>
                                                        <BiMessageSquareDots id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 45 ? (
                                                      <>
                                                        <BiMessageDetail id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 46 ? (
                                                      <>
                                                        <BiMessageDetail id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 29 ? (
                                                      <>
                                                        <HiRefresh id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 32 ? (
                                                      <>
                                                        <HiRefresh id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 35 ? (
                                                      <>
                                                        <FaCogs id="icon-menu" />
                                                      </>
                                                    ) : pagina?.id == 36 ? (
                                                      <>
                                                        <FaCogs id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '1' ? (
                                                      <>
                                                        <FiUsers id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '2' ? (
                                                      <>
                                                        <BiMoney id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '3' ? (
                                                      <>
                                                        <HiOutlineDocumentChartBar id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '4' ? (
                                                      <>
                                                        <BsNewspaper id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '5' ? (
                                                      <>
                                                        <ImNewspaper id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '6' ? (
                                                      <>
                                                        <BsSearch id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '7' ? (
                                                      <>
                                                        <FaIndustry id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '8' ? (
                                                      <>
                                                        <TiShoppingCart id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '9' ? (
                                                      <>
                                                        <ImUngroup id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '10' ? (
                                                      <>
                                                        <BsCoin id="icon-menu" />
                                                      </>
                                                    ) : pagina?.icon == '11' ? (
                                                      <>
                                                        <BiIdCard id="icon-menu" />
                                                      </>
                                                    ) : pagina?.codigo == 38 ? (
                                                      <>
                                                        <BiUserVoice id="icon-menu" />
                                                      </>
                                                    ) : pagina?.codigo == 39 ? (
                                                      <>
                                                        <BiLogIn id="icon-menu" />
                                                      </>
                                                    ) : pagina?.codigo == 37 ? (
                                                      <>
                                                        <TbReport id="icon-menu" />
                                                      </>
                                                    ) : pagina?.codigo == 40 ? (
                                                      <>
                                                        <AiFillPrinter id="icon-menu" />
                                                      </>
                                                    ) : pagina?.codigo == 42 ? (
                                                      <>
                                                        <MdOutlineRequestPage id="icon-menu" />
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    <span
                                                      style={{ fontSize: 17 }}
                                                      className="visivel"
                                                    >
                                                      {pagina?.nome}
                                                    </span>
                                                  </span>
                                                </Link>
                                              )
                                            )}
                                            {/* ========================================== fim =============================================== */}
                                          </>
                                        )}
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </li>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </li>

                  {/* ======================================================================================= */}
                </>
              ) : (
                <>
                  {/* ============inicio do menu ==================================================== */}

                  <li className="menuInterativo">
                    {menuPrincipalFinal?.length > 0 ? (
                      <>
                        {menuPrincipalFinal?.map((menu, index) => {
                          return validMenu.includes(menu.codigo) ? (
                            <>
                              <ul>
                                <li style={{ marginTop: 30 }}>
                                  <Accordion
                                    className={
                                      isExpanded ? 'menuAberto' : 'menuFechado'
                                    }
                                    activeKey={
                                      activeAccordion === String(index)
                                        ? String(index)
                                        : null
                                    }
                                    flush
                                    key={index}
                                  >
                                    <Accordion.Item eventKey={String(index)}>
                                      <Accordion.Header
                                        onClick={() => {
                                          setExpendState(true);
                                          TextMenu();
                                          setActiveAccordion((prevIndex) =>
                                            prevIndex === String(index)
                                              ? null
                                              : String(index)
                                          );
                                        }}
                                      >
                                        <span className="menus-nav">
                                          {menu?.id == 1 ? (
                                            <>
                                              <AiTwotoneBank id="icon-menu" />
                                            </>
                                          ) : menu?.id == 2 ? (
                                            <>
                                              <FaRegAddressCard id="icon-menu" />
                                            </>
                                          ) : menu?.id == 3 ? (
                                            <>
                                              <BsMap id="icon-menu" />
                                            </>
                                          ) : menu?.id == 4 ? (
                                            <>
                                              <FaSearchPlus id="icon-menu" />
                                            </>
                                          ) : menu?.id == 5 ? (
                                            <>
                                              <FaRegObjectUngroup id="icon-menu" />
                                            </>
                                          ) : menu?.id == 10 ? (
                                            <>
                                              <FaCogs id="icon-menu" />
                                            </>
                                          ) : (
                                            <></>
                                          )}

                                          {espand && (
                                            <span className="nome-menu">
                                              {menu?.nome}
                                            </span>
                                          )}
                                        </span>
                                      </Accordion.Header>

                                      <Accordion.Body>
                                        {/* ========================================== inicio subMenu =============================================== */}
                                        {menu.subMenu[0]?.codigo > 0 ? (
                                          <>
                                            {menu.subMenu?.map((menu, index) =>
                                              validSubMenu.includes(
                                                menu.codigo
                                              ) ? (
                                                <>
                                                  <Accordion
                                                    className={
                                                      isExpanded
                                                        ? 'menuAberto'
                                                        : 'menuFechado'
                                                    }
                                                    defaultActiveKey="0"
                                                    key={index}
                                                    flush
                                                  >
                                                    <Accordion.Item eventKey="">
                                                      <Accordion.Header
                                                        onClick={() => {
                                                          setExpendState(true);
                                                          TextMenu();
                                                        }}
                                                      >
                                                        <span className="menus-nav">
                                                          <span
                                                            id="icon-sub-menu"
                                                            className={
                                                              menu?.icon
                                                            }
                                                          />
                                                          {espand && (
                                                            <span className="nome-menu">
                                                              {menu?.nome}
                                                            </span>
                                                          )}
                                                        </span>
                                                      </Accordion.Header>

                                                      <Accordion.Body>
                                                        <div>
                                                          {menu.pagina?.map(
                                                            (pagina, index) =>
                                                              validPaginaFinal.includes(
                                                                pagina.codigo
                                                              ) ? (
                                                                <>
                                                                  <Link
                                                                    style={{
                                                                      display:
                                                                        'flex',
                                                                      marginLeft: 10,
                                                                    }}
                                                                    to={
                                                                      pagina?.url
                                                                    }
                                                                    onClick={() => {
                                                                      if (
                                                                        pagina.codigo ==
                                                                        24
                                                                      ) {
                                                                        receberDadosSankhya();
                                                                      }
                                                                      if (
                                                                        pagina.codigo ==
                                                                        26
                                                                      ) {
                                                                        setShowMensageDelete(
                                                                          true
                                                                        );
                                                                        setAlertErroMensage(
                                                                          true
                                                                        );
                                                                        setMsgErro(
                                                                          'Deseja realmente atualizar os dados?'
                                                                        );
                                                                      }
                                                                      setExpendState(
                                                                        false
                                                                      );
                                                                      setespand(
                                                                        false
                                                                      );
                                                                      setActiveAccordion(
                                                                        null
                                                                      );
                                                                      setActiveAccordionAdmin(
                                                                        null
                                                                      );
                                                                      const urlParts =
                                                                        pagina.url.split(
                                                                          '/'
                                                                        );
                                                                      const moduloId =
                                                                        parseInt(
                                                                          urlParts[
                                                                            urlParts.length -
                                                                              1
                                                                          ],
                                                                          10
                                                                        );
                                                                    }}
                                                                    key={index}
                                                                  >
                                                                    <span className="menus-nav">
                                                                      {pagina?.id ==
                                                                      1 ? (
                                                                        <>
                                                                          <ImBriefcase id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        17 ? (
                                                                        <>
                                                                          <ImBriefcase id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        18 ? (
                                                                        <>
                                                                          <ImUserPlus id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        2 ? (
                                                                        <>
                                                                          <ImUserPlus id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        3 ? (
                                                                        <>
                                                                          <FaRegCreditCard id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        4 ? (
                                                                        <>
                                                                          <FaUserTie id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        5 ? (
                                                                        <>
                                                                          <HiShoppingBag id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        6 ? (
                                                                        <>
                                                                          <TiShoppingCart id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        7 ? (
                                                                        <>
                                                                          <FaUserTimes id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        8 ? (
                                                                        <>
                                                                          <FaUserTimes id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        9 ? (
                                                                        <>
                                                                          <BsCalculator id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        11 ? (
                                                                        <>
                                                                          <BsGraphUp id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        207 ? (
                                                                        <>
                                                                          <TbBusinessplan id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        33 ? (
                                                                        <>
                                                                          <GoGraph id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        34 ? (
                                                                        <>
                                                                          <GoGraph id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        37 ? (
                                                                        <>
                                                                          <TbReportSearch id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        38 ? (
                                                                        <>
                                                                          <TbReportSearch id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        39 ? (
                                                                        <>
                                                                          <HiOutlineDocumentChartBar id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        40 ? (
                                                                        <>
                                                                          <HiOutlineDocumentChartBar id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        47 ? (
                                                                        <>
                                                                          <FaRegMoneyBillAlt id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        48 ? (
                                                                        <>
                                                                          <FaRegMoneyBillAlt id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        12 ? (
                                                                        <>
                                                                          <FaUserCheck id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        27 ? (
                                                                        <>
                                                                          <FaUserCheck id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        13 ? (
                                                                        <>
                                                                          <ImUsers id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        28 ? (
                                                                        <>
                                                                          <ImUsers id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        16 ? (
                                                                        <>
                                                                          <BsArrowUpRightSquareFill id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        31 ? (
                                                                        <>
                                                                          <BsArrowUpRightSquareFill id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        42 ? (
                                                                        <>
                                                                          <BiMessageSquareEdit id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        43 ? (
                                                                        <>
                                                                          <BiMessageSquareDots id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        44 ? (
                                                                        <>
                                                                          <BiMessageSquareDots id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        45 ? (
                                                                        <>
                                                                          <BiMessageDetail id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        46 ? (
                                                                        <>
                                                                          <BiMessageDetail id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        29 ? (
                                                                        <>
                                                                          <HiRefresh id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        32 ? (
                                                                        <>
                                                                          <HiRefresh id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        35 ? (
                                                                        <>
                                                                          <FaCogs id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.id ==
                                                                        36 ? (
                                                                        <>
                                                                          <FaCogs id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '1' ? (
                                                                        <>
                                                                          <FiUsers id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '2' ? (
                                                                        <>
                                                                          <BiMoney id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '3' ? (
                                                                        <>
                                                                          <HiOutlineDocumentChartBar id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '4' ? (
                                                                        <>
                                                                          <BsNewspaper id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '5' ? (
                                                                        <>
                                                                          <ImNewspaper id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '6' ? (
                                                                        <>
                                                                          <BsSearch id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '7' ? (
                                                                        <>
                                                                          <FaIndustry id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '8' ? (
                                                                        <>
                                                                          <TiShoppingCart id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '9' ? (
                                                                        <>
                                                                          <ImUngroup id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '10' ? (
                                                                        <>
                                                                          <BsCoin id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.icon ==
                                                                        '11' ? (
                                                                        <>
                                                                          <BiIdCard id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.codigo ==
                                                                        37 ? (
                                                                        <>
                                                                          <TbReport id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.codigo ==
                                                                        40 ? (
                                                                        <>
                                                                          <AiFillPrinter id="icon-menu" />
                                                                        </>
                                                                      ) : pagina?.codigo ==
                                                                        42 ? (
                                                                        <>
                                                                          <MdOutlineRequestPage id="icon-menu" />
                                                                        </>
                                                                      ) : (
                                                                        <>
                                                                          {pagina?.icon ? (
                                                                            <span
                                                                              id="icon-sub-menu"
                                                                              className={
                                                                                pagina?.icon
                                                                              }
                                                                            />
                                                                          ) : (
                                                                            <></>
                                                                          )}
                                                                        </>
                                                                      )}
                                                                      <span className="visivel">
                                                                        {
                                                                          pagina?.nome
                                                                        }
                                                                      </span>
                                                                    </span>
                                                                  </Link>
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </div>
                                                      </Accordion.Body>
                                                    </Accordion.Item>
                                                  </Accordion>
                                                </>
                                              ) : (
                                                <></>
                                              )
                                            )}
                                            {/* ========================================== fim =============================================== */}
                                          </>
                                        ) : (
                                          <>
                                            {/* =================================inicio so paginas ============================================== */}
                                            {menu.pagina.map((pagina, index) =>
                                              validPaginaFinal.includes(
                                                pagina.codigo
                                              ) ? (
                                                <>
                                                  <Link
                                                    style={{
                                                      display: 'flex',
                                                      marginLeft: 10,
                                                    }}
                                                    to={pagina?.url}
                                                    onClick={() => {
                                                      if (pagina.codigo == 24) {
                                                        receberDadosSankhya();
                                                      }
                                                      if (pagina.codigo == 26) {
                                                        setShowMensageDelete(
                                                          true
                                                        );
                                                        setAlertErroMensage(
                                                          true
                                                        );
                                                        setMsgErro(
                                                          'Deseja realmente atualizar os dados?'
                                                        );
                                                      }
                                                      setExpendState(false);
                                                      setespand(false);
                                                      setActiveAccordion(null);
                                                      setActiveAccordionAdmin(
                                                        null
                                                      );
                                                      const urlParts =
                                                        pagina.url.split('/');
                                                      const moduloId = parseInt(
                                                        urlParts[
                                                          urlParts.length - 1
                                                        ],
                                                        10
                                                      );
                                                    }}
                                                    key={index}
                                                  >
                                                    <span className="menus-nav">
                                                      {pagina?.id == 1 ? (
                                                        <>
                                                          <ImBriefcase id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 17 ? (
                                                        <>
                                                          <ImBriefcase id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 18 ? (
                                                        <>
                                                          <ImUserPlus id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 2 ? (
                                                        <>
                                                          <ImUserPlus id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 3 ? (
                                                        <>
                                                          <FaRegCreditCard id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 19 ? (
                                                        <>
                                                          <FaRegCreditCard id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 4 ? (
                                                        <>
                                                          <FaUserTie id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 20 ? (
                                                        <>
                                                          <FaUserTie id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 5 ? (
                                                        <>
                                                          <HiShoppingBag id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 21 ? (
                                                        <>
                                                          <HiShoppingBag id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 6 ? (
                                                        <>
                                                          <TiShoppingCart id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 22 ? (
                                                        <>
                                                          <TiShoppingCart id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 7 ? (
                                                        <>
                                                          <FaUserTimes id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 23 ? (
                                                        <>
                                                          <FaUserTimes id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 8 ? (
                                                        <>
                                                          <FaUserTimes id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 24 ? (
                                                        <>
                                                          <FaUserTimes id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 9 ? (
                                                        <>
                                                          <BsCalculator id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 25 ? (
                                                        <>
                                                          <BsCalculator id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 11 ? (
                                                        <>
                                                          <BsGraphUp id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 26 ? (
                                                        <>
                                                          <BsGraphUp id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 207 ? (
                                                        <>
                                                          <TbBusinessplan id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 33 ? (
                                                        <>
                                                          <GoGraph id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 34 ? (
                                                        <>
                                                          <GoGraph id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 37 ? (
                                                        <>
                                                          <TbReportSearch id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 38 ? (
                                                        <>
                                                          <TbReportSearch id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 39 ? (
                                                        <>
                                                          <HiOutlineDocumentChartBar id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 40 ? (
                                                        <>
                                                          <HiOutlineDocumentChartBar id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 47 ? (
                                                        <>
                                                          <FaRegMoneyBillAlt id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 48 ? (
                                                        <>
                                                          <FaRegMoneyBillAlt id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 12 ? (
                                                        <>
                                                          <FaUserCheck id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 27 ? (
                                                        <>
                                                          <FaUserCheck id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 13 ? (
                                                        <>
                                                          <ImUsers id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 28 ? (
                                                        <>
                                                          <ImUsers id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 16 ? (
                                                        <>
                                                          <BsArrowUpRightSquareFill id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 31 ? (
                                                        <>
                                                          <BsArrowUpRightSquareFill id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 42 ? (
                                                        <>
                                                          <BiMessageSquareEdit id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 43 ? (
                                                        <>
                                                          <BiMessageSquareDots id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 44 ? (
                                                        <>
                                                          <BiMessageSquareDots id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 45 ? (
                                                        <>
                                                          <BiMessageDetail id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 46 ? (
                                                        <>
                                                          <BiMessageDetail id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 29 ? (
                                                        <>
                                                          <HiRefresh id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 32 ? (
                                                        <>
                                                          <HiRefresh id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 35 ? (
                                                        <>
                                                          <FaCogs id="icon-menu" />
                                                        </>
                                                      ) : pagina?.id == 36 ? (
                                                        <>
                                                          <FaCogs id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '1' ? (
                                                        <>
                                                          <FiUsers id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '2' ? (
                                                        <>
                                                          <BiMoney id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '3' ? (
                                                        <>
                                                          <HiOutlineDocumentChartBar id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '4' ? (
                                                        <>
                                                          <BsNewspaper id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '5' ? (
                                                        <>
                                                          <ImNewspaper id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '6' ? (
                                                        <>
                                                          <BsSearch id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '7' ? (
                                                        <>
                                                          <FaIndustry id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '8' ? (
                                                        <>
                                                          <TiShoppingCart id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '9' ? (
                                                        <>
                                                          <ImUngroup id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '10' ? (
                                                        <>
                                                          <BsCoin id="icon-menu" />
                                                        </>
                                                      ) : pagina?.icon ==
                                                        '11' ? (
                                                        <>
                                                          <BiIdCard id="icon-menu" />
                                                        </>
                                                      ) : pagina?.codigo ==
                                                        37 ? (
                                                        <>
                                                          <TbReport id="icon-menu" />
                                                        </>
                                                      ) : pagina?.codigo ==
                                                        40 ? (
                                                        <>
                                                          <AiFillPrinter id="icon-menu" />
                                                        </>
                                                      ) : pagina?.codigo ==
                                                        42 ? (
                                                        <>
                                                          <MdOutlineRequestPage id="icon-menu" />
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      <span
                                                        style={{
                                                          fontSize: 17,
                                                        }}
                                                        className="visivel"
                                                      >
                                                        {pagina?.nome}
                                                      </span>
                                                    </span>
                                                  </Link>
                                                </>
                                              ) : (
                                                <></>
                                              )
                                            )}
                                            {/* ========================================== fim =============================================== */}
                                          </>
                                        )}
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </li>
                              </ul>
                            </>
                          ) : (
                            <></>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </li>

                  {usuario.grupoId == 2 &&
                  !(
                    funcaoUsuario === 'R' ||
                    funcaoUsuario === 'V' ||
                    ['R', 'V'].includes(
                      String(vendedorTipo || '').trim().toUpperCase()
                    )
                  ) ? (
                    <li className="menuInterativo">
                      <button
                        type="button"
                        onClick={() => setShowResetLocalData(true)}
                        style={{
                          width: '100%',
                          backgroundColor: 'transparent',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 0',
                        }}
                      >
                        <span className="menus-nav">
                          <FaCogs id="icon-menu" />
                        </span>
                      </button>
                    </li>
                  ) : (
                    <></>
                  )}

                  {podeVerAcompanhamentos ? (
                    <li className="menuInterativo" style={{ marginTop: 10 }}>
                      <Accordion
                        className={isExpanded ? 'menuAberto' : 'menuFechado'}
                        flush
                      >
                        <Accordion.Item eventKey="acompanhamentos">
                          <Accordion.Header
                            onClick={() => {
                              setExpendState(true);
                              TextMenu();
                            }}
                          >
                            <span className="menus-nav">
                              <FaSearchPlus id="icon-menu" />
                              {espand && (
                                <span className="nome-menu">
                                  Acompanhamentos
                                </span>
                              )}
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Link
                              style={{ display: 'flex', marginLeft: 10 }}
                              to={'/consulta-pendencias'}
                              onClick={() => {
                                setExpendState(false);
                                setespand(false);
                                setActiveAccordion(null);
                                setActiveAccordionAdmin(null);
                              }}
                            >
                              <span className="menus-nav">
                                <TbReportSearch id="icon-menu" />
                                <span className="visivel">
                                  Pedidos Pendentes de Envio
                                </span>
                              </span>
                            </Link>
                            <Link
                              style={{ display: 'flex', marginLeft: 10 }}
                              to={'/consulta-clientes-60d'}
                              onClick={() => {
                                setExpendState(false);
                                setespand(false);
                                setActiveAccordion(null);
                                setActiveAccordionAdmin(null);
                              }}
                            >
                              <span className="menus-nav">
                                <TbReportSearch id="icon-menu" />
                                <span className="visivel">
                                  Clientes sem Compra 60D
                                </span>
                              </span>
                            </Link>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </li>
                  ) : (
                    <></>
                  )}

                  {/* ======================================================================================= */}
                </>
              )}

              {(usuario?.id ?? 0) !== 1 &&
              usuario?.grupoId !== 3 &&
              !(usuario?.grupoId === 1 && usuario?.id !== 1) &&
              (funcaoUsuario === 'R' ||
                funcaoUsuario === 'V' ||
                ['R', 'V'].includes(
                  String(vendedorTipo || '').trim().toUpperCase()
                )) ? (
                <li className="menuInterativo">
                  <Link
                    style={{ display: 'flex', marginLeft: 10 }}
                    to={'/configuracao'}
                    onClick={() => {
                      setExpendState(false);
                      setespand(false);
                      setActiveAccordion(null);
                      setActiveAccordionAdmin(null);
                    }}
                  >
                    <span className="menus-nav">
                      <FaCogs id="icon-menu" />
                      {espand && <span className="nome-menu">Configuração</span>}
                    </span>
                  </Link>
                </li>
              ) : (
                <></>
              )}

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
            </ul>
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
        {/* =================modal confirma atualização ============================== */}
        <Modal
          className="modal-confirm"
          show={showMensageDelete}
          onHide={handleCloseMensageDelete}
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
            <div style={{ justifyContent: 'space-around' }} className="d-flex">
              <button
                style={{ width: 130 }}
                className="btn btn-cadastrar"
                onClick={() => {
                  setAlertErroMensage(false);
                  AtualizarDados();
                  handleCloseMensageDelete();
                }}
              >
                Sim
              </button>
              <button
                style={{ width: 130 }}
                className="btn btn-cancelar"
                onClick={() => {
                  setAlertErroMensage(false);
                  handleCloseMensageDelete();
                }}
              >
                Não
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          className="modal-confirm"
          show={showResetLocalData}
          onHide={fecharResetLocalData}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <h1>Configurações</h1>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setShowResetLocalData(false);
                  setShowResetLocalDataConfirm(true);
                }}
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: 16,
                  padding: '10px 14px',
                  border: '1px solid #000',
                  fontWeight: 600,
                }}
              >
                Resetar dados locais.
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          className="modal-confirm"
          show={showResetLocalDataConfirm}
          onHide={fecharResetLocalData}
          backdrop="static"
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <h1 style={{ fontSize: 18, marginBottom: 0 }}>
              Deseja realmente apagar os dados locais? se existirem pedidos ainda
              nao sincronizados, poderão ser apagados., Salve todos os pedidos
              antes de resetar o banco
            </h1>
            {resetLocalDataLoading && (
              <h2 style={{ fontSize: 16, marginTop: 10, marginBottom: 0 }}>
                Resetando Banco Local...
              </h2>
            )}
            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <button
                type="button"
                onClick={resetarDadosLocais}
                disabled={resetLocalDataLoading}
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: 16,
                  padding: '10px 18px',
                  border: '1px solid #000',
                  fontWeight: 700,
                  width: 120,
                }}
              >
                {resetLocalDataLoading ? 'Resetando...' : 'Sim'}
              </button>
              <button
                type="button"
                onClick={fecharResetLocalData}
                disabled={resetLocalDataLoading}
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: 16,
                  padding: '10px 18px',
                  border: '1px solid #000',
                  fontWeight: 700,
                  width: 120,
                }}
              >
                Não
              </button>
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
        {/* ===================== Modal Comunicados ===================================== */}
        <Modal
          className="modal-comunicado"
          show={showComunicado}
          onHide={handleCloseComunicado}
          backdrop="static"
        >
          <Modal.Body>
            <div className="corpo comunic">
              {comunicadoLista.length > 0 ? (
                <>
                  {comunicadoLista?.map((comunicadoComImagem, index) => (
                    <div className="conteudoNovoComunicado " key={index}>
                      <img id="logoComunicado" src={logoComunicado} alt="" />
                      <div className="conteuDoComunica">
                        <h1>{comunicadoComImagem?.titulo}</h1>
                        <div
                          className="textoPostNovo"
                          style={{
                            textAlign: 'justify',
                            wordWrap: 'break-word',
                          }}
                          dangerouslySetInnerHTML={{
                            __html: comunicadoComImagem?.texto,
                          }}
                        />
                      </div>
                    </div>
                  ))}{' '}
                </>
              ) : (
                <></>
              )}
              <div></div>
            </div>
            <div className="comunicadoLidos">
              <input
                type="checkbox"
                name="grupo"
                id="postLido"
                onChange={handleMarcarComLidos}
              />
              <p>Comunicados lidos.</p>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          className="modalLoading"
          show={showloading}
          onHide={handleCloseloading}
          backdrop="static"
        >
          <Modal.Body>
            <div className="loadingModal">
              <img id="logoSankhya" src={logoAlyne} alt="" />
              <h1 style={{ marginTop: 25, color: 'red' }}>
                Seu Token expirou, favor fazer login novamente!
              </h1>
              <form onSubmit={VoltaRlogin}>
                <button
                  style={{ width: 130, marginTop: 20 }}
                  className="btn btn-primary"
                >
                  Ok
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {/* ================================================== */}
        <Modal
          className="modalLoading"
          show={showloadingApi}
          onHide={handleCloseloadingApi}
          backdrop="static"
        >
          <Modal.Body>
            <div className="loadingModal">
              <img id="logoSankhya" src={logoAlyne} alt="" />
              <h1 style={{ marginTop: 25, color: 'red' }}>
                Erro de conexão com a API,favor entrar em contato com
                departamento de TI!
              </h1>
              <div>
                <button
                  style={{ width: 130, marginTop: 20 }}
                  className="btn btn-primary"
                  onClick={handleCloseloadingApi}
                >
                  Ok
                </button>
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
        <Modal
          className="modal-confirmerror"
          show={showMensageSankhyaErro2}
          onHide={handleCloseMensageSankhyaErro2}
          backdrop="static"
        >
          <Modal.Body>
            <img id="logoSankhya" src={logoSankhya} alt="" />
            <h1 style={{ marginTop: 15 }}></h1>
            <h1 style={{ marginTop: 15 }}>
              Erro de comunicação com servidor Sankhya!você receberá os últimos
              dados baixados nas nuvens.
            </h1>
            <h1 style={{ marginTop: 15 }}></h1>
            <button
              style={{ width: 130, marginTop: 15 }}
              className="btn btn-primary"
              onClick={handleCloseMensageSankhyaErro2}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
