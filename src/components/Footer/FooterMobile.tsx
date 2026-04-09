import './Footer.scss';
import '../../styles/global.scss';
import { BsChatDots, BsCoin, BsFacebook, BsGear } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { ICabecalho, iDadosUsuario, iTipoNegociacao } from '../../@types';
import { TbChartInfographic, TbDatabaseImport, TbReport } from 'react-icons/tb';
import Modal from 'react-bootstrap/Modal';
import logoSankhya from '../../assets/logosankhya.png';
import logoSank from '../assets/logosank.png';
import { GrConfigure } from 'react-icons/gr';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { matchPath } from 'react-router';
import { BiUserVoice } from 'react-icons/bi';
import { openDB, DBSchema } from 'idb';
import { criarBancoDados, versao } from '../../data/indexedDB';
import { useAppOnlineStatus } from '../../provider/PortalContext';

// import { criarBancoDadosDelete } from "../../data/indexedDBDelete";
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
      endereco: string;
      bairro: string;
      municipio: string;
      uf: string;
      lc: number;
      sc: number;
      status: string;
      tipoNegociacao: string;
      vendedorId: number;
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
      id?: number;
      tabelaPrecoId: number;
      idProd: number;
      preco: number;
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

export default function FooterMobile() {
  const history = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');
  let [versaoAPI, setversaoAPI] = useState('');
  let [versaoFront, setversaoFront] = useState('');
  let [dataFront, setdataFront] = useState('');
  let [dataAPI, setdataAPI] = useState('');
  const [naoLida, setnaoLida] = useState('');

  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMensage, setShowMensage] = useState(false);
  let [sucess, setSucess] = useState(0);
  const handleCloseMensage = () => setShowMensage(false);
  // const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [permitido, setpermitido] = useState(false);
  const [effectExecuted, setEffectExecuted] = useState(false);
  const [naotemImage, setnaotemImage] = useState(false);
  const [showComunicado, setShowComunicado] = useState(false);
  let [isMobile, setIsMobile] = useState(false);
  const handleCloseComunicado = () => setShowComunicado(false);

  const [alertErroMensage, setAlertErroMensage] = useState(false);

  const [showMensageSankhya, setShowMensageSankhya] = useState(false);
  const [modoRecebRapidoModal, setModoRecebRapidoModal] = useState(false);
  const [avisoRecebimentoEmAndamento, setAvisoRecebimentoEmAndamento] =
    useState(false);
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

  function handleCloseMensageSankhya() {
    setShowMensageSankhya(false);
    setModoRecebRapidoModal(false);
    if (avisoRecebimentoEmAndamento) {
      setAvisoRecebimentoEmAndamento(false);
      return;
    }
    const emDigitacao =
      localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
    const onPedido =
      String(window.location.pathname || '').toLowerCase().includes('pedido');
    if (!(emDigitacao && onPedido)) {
      window.location.reload();
    }
  }

  // const handleCloseMensageSankhya = () => setShowMensageSankhya(false);
  let [respostaSank, setrespostaSank] = useState('');
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;

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

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   const checkOnlineStatus = () => {
  //     setIsOnline(window.navigator.onLine);
  //   };

  //   checkOnlineStatus();

  //   const intervalId = setInterval(checkOnlineStatus, 3000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

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

  useEffect(() => {
    if (isOnline) {
      //   alert('Você está online!');
    } else {
      //   alert('Você está offline!');
    }
  }, [isOnline]);

  useEffect(() => {
    console.log('onde estou', location.pathname);
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    //GetApiVersao();
  }, []);
  useEffect(() => {
    atualizarMensagensNaoLidas();
  });
  useEffect(() => {
    NaoLidas();
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
  function handleCloseMensageSankhyaErro() {
    setShowMensageSankhyaErro(false);
    // history('/espaco-colaborador')
  }
  const [showMensageSankhyaErro, setShowMensageSankhyaErro] = useState(false);

  function handleCloseMensageSankhyaErro2() {
    setShowMensageSankhyaErro2(false);
    // history('/espaco-colaborador')
  }
  const [showMensageSankhyaErro2, setShowMensageSankhyaErro2] = useState(false);

  // useEffect(() => {
  //   Verifica();
  //   const intervalId = setInterval(Verifica, 300000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isOnline]);

  function Verifica() {
    history('/pedido_vendas');
    // console.log("verificando..");
    if (location.pathname == '/pedido_vendas') {
      if (isOnline && isMobile) {
        VerificarDadosRecebidos();
      }
    }
  }

  async function VerificarDadosRecebidos() {
    try {
      const dataPedidoAtual = new Date();
      const anoPedidoAtual = dataPedidoAtual.getFullYear();
      const mesPedidoAtual = dataPedidoAtual.getMonth() + 1;
      const diaPedidoAtual = dataPedidoAtual.getDate();

      // Construa a parte da data no formato "YYYY-MM-DD"
      const parteDaData1 = `${anoPedidoAtual}-${mesPedidoAtual
        .toString()
        .padStart(2, '0')}-${diaPedidoAtual.toString().padStart(2, '0')}`;

      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('parceiro', 'readonly');
      const store = transaction.objectStore('parceiro');

      const registros = await store.getAll();
      if (registros.length > 0) {
        // console.log("registros", registros[0]);
        const parteDaData2 = registros[0].atualizadoEm.split('T')[0];
        // console.log(
        //   "verificar anos",
        //   parteDaData1,
        //   "anos Parceiro",
        //   parteDaData2
        // );

        if (parteDaData1 !== parteDaData2) {
          setShowMensageSankhya(true);
          setrespostaSank('Seus dados podem estar desatualizados...');
          respostaSank = 'Seus dados podem estar desatualizados...';

          setTimeout(function () {
            receberDadosSankhya();
          }, 2000);
        }
      } else {
        setShowMensageSankhya(true);
        setrespostaSank('Seus dados podem estar desatualizados...');
        respostaSank = 'Seus dados podem estar desatualizados...';

        setTimeout(function () {
          receberDadosSankhya();
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao verificar dados:', error);
    }
  }

  //populando tabelas locais============================================================
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
    endereco: string;
    bairro: string;
    municipio: string;
    uf: string;
    lc: number;
    sc: number;
    status: string;
    tipoNegociacao: string;
    vendedorId: number;
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
    ipi: number;
    atualizadoEm: string;
    conv: number;
    tipoUnid: string;
    tipoUnid2: string;
  }



  /*
  async function popularProd(produto: iproduto[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('produto', 'readwrite');
    const store = transaction.objectStore('produto');
    try {
      await store.clear();
      

      for (const prod of produto) {
        console.error('Erro ao popular dados:', prod.id);
        //await store.add(prod);
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
      //await GetTabelaPreco();
      await receberTabelaPreco();
    }
  }
*/
async function popularProd(produto: iproduto[]) {
  const db = await openDB<PgamobileDB>('pgamobile', versao);
  const transaction = db.transaction('produto', 'readwrite');
  const store = transaction.objectStore('produto');
  
  try {
      await store.clear();
      
      for (const prod of produto) {
          try {
              await store.add(prod);
          } catch (error) {
              console.error('Erro ao adicionar produto:', prod.id, error);
          }
      }
      
      const registrosInseridos = await store.count();
      
      if (registrosInseridos !== produto.length) {
          await store.clear();
          
          for (const prod of produto) {
              try {
                  await store.add(prod);
              } catch (error) {
                  console.error('Erro ao adicionar produto na segunda tentativa:', prod.id, error);
              }
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
    id?: number;
    tabelaPrecoId: number;
    idProd: number;
    preco: number;
    atualizadoEm: string;
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
    empresaId: number;
    parceiroId: number;
    tabelaPrecoId: number;
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
    atualizadoem: string;
  }

  async function popularTabAdicional(tabelaAdicional: iTabelaAdicional[]) {
    setSucess(130);
    sucess = 130;
    finalizarRecebimentoGlobal();
    setrespostaSank('Dados Recebidos!');
    respostaSank = 'Dados Recebidos!';
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
      try {
        localStorage.setItem(
          '@Portal/RecebimentoLocal/ultimoSucessoEm',
          new Date().toISOString()
        );
        localStorage.setItem('@Portal/RecebimentoLocal/tabelasComErro', '[]');
      } catch {}
      window.location.reload();
    }
  }

  //============RECEBER DADOS MOBILE==============================
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

  function falharRecebimentoRapido(mensagem: string) {
    finalizarRecebimentoGlobal();
    setLoading(false);
    setShowMensageSankhya(false);
    setShowMensageSankhyaErro2(true);
    setrespostaSank(mensagem);
    respostaSank = mensagem;
  }

  async function receberDadosSankhya() {
    const iniciou = iniciarRecebimentoGlobal('FooterMobile');
    if (!iniciou) {
      setModoRecebRapidoModal(false);
      setDadosRecebidos(true);
      dadosRecebidos = true;
      setShowMensageSankhya(true);
      setrespostaSank('Já existe um recebimento de dados em andamento. Aguarde finalizar.');
      respostaSank = 'Já existe um recebimento de dados em andamento. Aguarde finalizar.';
      setAvisoRecebimentoEmAndamento(true);
      return;
    }
    const usarFluxoLeve = await ExisteHoraReceberDadosConfiguracao();
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
      await GetParceiro();
      return;
    }

    setSucess(0);
    sucess = 0;
    try {
      await deleteIndexedDBDelete();
    } catch {}
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
      console.log('erro ao efetuar login não mobile');
      setShowMensageSankhya(false);
      setShowMensageSankhyaErro(true);
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
      .then(async (response) => {
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
    setrespostaSank('Atualizando Parceiro...#FooterMobile');
    respostaSank = 'Atualizando Parceiro...#FooterMobile';
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
                JOIN sankhya.TGFVOA (NOLOCK) VOA ON VOA.CODPROD = PRO.CODPROD AND VOA.ATIVO = 'S' AND VOA.AD_UNCOM = 'S'
                JOIN sankhya.TGFIPI (NOLOCK) IPI ON IPI.CODIPI = PRO.CODIPI AND VOA.ATIVO = 'S'
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
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const tabelaTx = db.transaction('tabelaPreco', 'readonly');
      const tabelaStore = tabelaTx.objectStore('tabelaPreco');
      const tabelas = await tabelaStore.getAll();
      await tabelaTx.done;

      const tabelaIds = (tabelas || [])
        .map((t: any) => Number(t?.id))
        .filter((id) => Number.isFinite(id) && id > 0);

      const result: iItemTabela[] = [];

      for (const codTab of tabelaIds) {
        const sql = `SELECT TAB.CODTAB TabelaPrecoId, EXC.CODPROD IdProd, EXC.VLRVENDA Preco, 
                            ISNULL(EXC.AD_DTALTER, '1970-01-01 01:01:02') AtualizadoEm
                        FROM TGFTAB TAB
                        JOIN TGFNTA NTA ON NTA.CODTAB = TAB.CODTAB
                        JOIN TGFEXC EXC ON EXC.NUTAB = TAB.NUTAB
                        JOIN TGFPRO PRO ON PRO.CODPROD = EXC.CODPROD
                        WHERE TAB.CODTAB = ${codTab}
                        AND EXC.NUTAB = (SELECT TOP 1 NUTAB FROM TGFTAB WHERE CODTAB = TAB.CODTAB
                                        AND CONVERT(DATE,DTVIGOR) <= CONVERT(DATE,GETDATE())
                                        ORDER BY EXC.CODPROD, DTVIGOR DESC)
                        AND PRO.USOPROD IN ('R','V')
                        ORDER BY PRO.CODPROD`;
        const response = await api.post(
          `/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`
        );
        const data = response?.data?.responseBody?.rows ?? [];
        for (const curr of data) {
          result.push({
            tabelaPrecoId: Number(curr[0]),
            idProd: Number(curr[1]),
            preco: Number(curr[2]),
            atualizadoEm: String(curr[3] ?? ''),
          });
        }
      }

      console.log('dadostipo2 itemTabela total:', result.length);
      popularItemTab(result);
    } catch (error) {
      console.log('erro ao receber dados coordenador', error);
    }
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
  //======dados do sankhya  ===================================
  async function receberDadosSankhyaTestando() {
    const usarFluxoLeve = await ExisteHoraReceberDadosConfiguracao();
    setModoRecebRapidoModal(usarFluxoLeve);
    if (usarFluxoLeve) {
      localStorage.setItem('RecebendoDados', 'true');
      setSucess(0);
      sucess = 0;
      Sucess();
      deleteIndexedDBDelete();
      criarBancoDados();
      setShowMensageSankhya(true);
      setrespostaSank('Atualizando Banco...');
      respostaSank = 'Atualizando Banco...';
      await GetParceiro();
      return;
    }

    localStorage.setItem('RecebendoDados', 'true');
    setSucess(0);
    sucess = 0;
    Sucess();
    deleteIndexedDBDelete();

    criarBancoDados();

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
        setrespostaSank('Erro de conexão com Api PGA...');
        respostaSank = 'Erro de conexão com Api PGA...';
        Erro();
        console.log('erro ao efetuar login');
      });
  }
  function Erro() {
    setTimeout(function () {
      setShowMensageSankhya(false);
    }, 3000);
  }
  async function LoginSankhyaerro() {
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

  async function receberDadosSankhyaVendedor() {
    setErroSankhya(false);
    erroSankhya = false;
    setAlertErroSankhyaBD(false);
    setDadosRecebidos(false);
    dadosRecebidos = false;
    setSucess(0);
    sucess = 0;
    Sucess();

    setrespostaSank('Atualizando Vendedor...');
    respostaSank = 'Atualizando Vendedor...';

    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=Vendedor&vendedorId=${usuario.username}`
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
          setMsgErroSankhya(mensagem.substring(0, 300));
          setTabelarro('Erro ao receber dados para a tabela Vendedor');
        }
        VerificaRepresentante();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setAlertErroSankhya(true);
        setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');

        setSucess(0);
        sucess = 0;
      });
  }

  async function VerificaRepresentante() {
    await api
      .get(`/api/Vendedor/${usuario.username}`)
      .then((response) => {
        console.log(
          'dados do vendedor.........................',
          response.data.tipo
        );
        if (response.data.tipo == 'R' || response.data.tipo == 'V') {
          receberDadosSankhyaTipoNegociacao();
        } else {
          setAlertErroSankhya(true);
          setMsgErro('Erro ao receber dados Sankhya, erro de conexão!');
        }
      })
      .catch((error) => {});
  }

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
        setLoading(false);

        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD2(true);
          const mensagem2 = response.data;
          setMsgErroSankhya2(mensagem2.substring(0, 300));
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
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando Parceiro...');
    respostaSank = 'Atualizando Parceiro...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=Parceiro&vendedorId=${usuario.username}`
      )
      .then((response) => {
        setLoading(false);

        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD3(true);
          const mensagem3 = response.data;
          setMsgErroSankhya3(mensagem3.substring(0, 300));
          setTabelarro3('Erro ao receber dados para a tabela Parceiro');
        }

        receberDadosSankhyaGrupoProd();
      })
      .catch((error) => {
        setLoading(false);
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
        setLoading(false);
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD4(true);
          const mensagem4 = response.data;
          setMsgErroSankhya4(mensagem4.substring(0, 300));
          setTabelarro4('Erro ao receber dados para a tabela GrupoProduto');
        }

        receberDadosSankhyaProduto();
      })
      .catch((error) => {
        setLoading(false);
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
        setLoading(false);
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD5(true);
          const mensagem5 = response.data;
          setMsgErroSankhya5(mensagem5.substring(0, 300));
          setTabelarro5('Erro ao receber dados para a tabela Produto');
        }
        receberDadosSankhyaTabelaPreco();
      })
      .catch((error) => {
        setLoading(false);
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
        setLoading(false);
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD6(true);
          const mensagem6 = response.data;
          setMsgErroSankhya6(mensagem6.substring(0, 300));
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
    setSucess(0);
    sucess = 0;
    Sucess();
    setrespostaSank('Atualizando TabelaPrecoAdicional...');
    respostaSank = 'Atualizando TabelaPrecoAdicional...';
    await api
      .post(
        `/api/Sankhya/ReceberDados?tabela=TabelaPrecoAdicional&vendedorId=${usuario.username}`
      )
      .then((response) => {
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
        setLoading(false);
        console.log('resposta', response);
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD7(true);
          const mensagem7 = response.data;
          setMsgErroSankhya7(mensagem7.substring(0, 300));
          setTabelarro7('Erro ao receber dados para a tabela ItemTabela');
        }
        receberDadosSankhyaTabelaPrecoParceiro();
      })
      .catch((error) => {
        setLoading(false);
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
        setLoading(false);
        console.log('resposta', response);
        setrespostaSank(response.data);
        respostaSank = response.data;
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD8(true);
          const mensagem8 = response.data;
          setMsgErroSankhya8(mensagem8.substring(0, 300));
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
      .then((response) => {
        console.log('Tabela Titulo');
        console.log(response.data);
        console.log('resposta', response);
        if (response.data != 'Sucesso') {
          setErroSankhya(true);
          erroSankhya = true;
          setAlertErroSankhyaBD9(true);
          const mensagem9 = response.data;
          setMsgErroSankhya9(mensagem9.substring(0, 300));
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
  //====== GET PARA INSERT NO BANCO INDEXEDDB =====================//

  const [parceiros, setParceiro] = useState<iParceiro[]>([]);
  async function GetParceiro() {
    setrespostaSank('Atualizando Banco...');
    respostaSank = 'Atualizando Banco...';
    console.log('entrou no receber dados para banco off');
    try {
      const response = await api.get(
        `/api/Parceiro/total?codVendedor=${usuario.username}`
      );
      console.log('Parceiro', response.data.data);
      const parceiro = response.data.data.filter(
        (p: any) => p.vendedorId == usuario.username && p.status == 'S'
      );
      await popularParceiro(parceiro);
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
      await popularTabelaPrecoApi(response.data.data);
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
      console.log('quantidade ItemTabela', response.data.data.length);
      console.log('quantidade total', response.data.total);
      await popularItemTabela(response.data.data);
    } catch {
      falharRecebimentoRapido('Falha ao carregar Itens de Tabela de Preço.');
    }
  }

  async function GetTabelaPrecoParceiro() {
    try {
      const response = await api.get('/api/TabelaPrecoParceiro/total');
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
      try {
        const titulos: iTitulo[] = [];
        for (const parceiro of parceiros) {
          const lista = (parceiro as any)?.titulo;
          if (!Array.isArray(lista)) continue;
          for (const t of lista) {
            if (!t) continue;
            titulos.push(t);
          }
        }
        const dedup = new Map<string, iTitulo>();
        for (const t of titulos) {
          const key = `${String((t as any)?.id ?? '')}|${String(
            (t as any)?.empresaId ?? ''
          )}|${String((t as any)?.parceiroId ?? '')}|${String(
            (t as any)?.nuUnico ?? ''
          )}|${String((t as any)?.parcela ?? '')}`;
          if (!dedup.has(key)) dedup.set(key, t);
        }
        await popularTituloApi(Array.from(dedup.values()));
      } catch {}
      await GetTipoNegociacao();
    }
  }

  async function popularTituloApi(titulo: iTitulo[]) {
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
    } catch {} finally {
      await transaction.done;
      await db.close();
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
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
      try {
        await db.close();
      } catch {}
      await GetItemTabela();
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
  async function limparTabelaPreco() {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('tabelaPreco', 'readwrite');
    const store = transaction.objectStore('tabelaPreco');

    try {
      await store.clear();
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      setrespostaSank('Erro ao popular dados.');
      respostaSank = 'Erro ao popular dados.';
    } finally {
      await transaction.done;
    }
  }

  //=========== ITEM TABELA PRECO ===================================
  interface iItemTabelaCompleto {
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
        nome: string;
        atualizadoEm: string;
      };
      atualizadoEm: string;
    };
    atualizadoEm: string;
  }
  async function popularItemTabela(itemTabela: iItemTabelaCompleto[]) {
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
    finalizarRecebimentoGlobal();
    setrespostaSank('Dados Recebidos!');
    respostaSank = 'Dados Recebidos!';
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
      try {
        localStorage.setItem(
          '@Portal/RecebimentoLocal/ultimoSucessoEm',
          new Date().toISOString()
        );
        localStorage.setItem('@Portal/RecebimentoLocal/tabelasComErro', '[]');
      } catch {}
      window.location.reload();
    }
  }

  function ReloadReceber() {
    setLoading(false);
    setDadosRecebidos(true);
    dadosRecebidos = true;
  }

  //==================== popular Cabecalho ===================================
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

  function atualizarMensagensNaoLidas() {
    const valor = localStorage.getItem('@Portal/chat-mensagems-lidas');
    if (valor == 'true') {
      NaoLidas();
    }
  }

  async function NaoLidas() {
    await api
      .get(`/api/Chat/mensagens-nao-lidas?id=${usuario.id}`)
      .then((response) => {
        console.log('não lidas footer ', response.data);
        setnaoLida(response.data);
      })
      .catch((error) => {});
  }

  function formatDate(dateTimeString: string): string {
    const dataAtual = new Date(dateTimeString);
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <>
      <div className="content-footer-mobile">
        <Link
          to="/espaco-colaborador"
          className={
            location.pathname == '/espaco-colaborador'
              ? 'botoes-nav-inferior-active'
              : 'botoes-nav-inferior'
          }
        >
          <AiOutlineHome fontSize={25} />
          <h1>Home</h1>
        </Link>
        {usuario.grupoId == 1 ||
        usuario.grupoId == 2 ||
        usuario.grupoId == 6 ? (
          <>
            <Link
              to={isOnline ? '/dashboard' : ''}
              className={
                location.pathname == '/dashboard'
                  ? 'botoes-nav-inferior-active'
                  : isOnline
                  ? 'botoes-nav-inferior'
                  : 'botoes-nav-inferior-off'
              }
            >
              <TbChartInfographic fontSize={25} />
              <h1>Dash</h1>
            </Link>
          </>
        ) : (
          <></>
        )}
        {usuario.grupoId == 1 ? (
          <>
            <Link
              to={isOnline ? '/acompanhamento-vendas' : ''}
              className={
                location.pathname == '/acompanhamento-vendas'
                  ? 'botoes-nav-inferior-active'
                  : isOnline
                  ? 'botoes-nav-inferior'
                  : 'botoes-nav-inferior-off'
              }
            >
              <TbReport fontSize={26} />
              <h1>Vendas</h1>
            </Link>
            <Link
              to={isOnline ? '/sessoes-em-uso' : ''}
              className={
                location.pathname == '/sessoes-em-uso'
                  ? 'botoes-nav-inferior-active'
                  : isOnline
                  ? 'botoes-nav-inferior'
                  : 'botoes-nav-inferior-off'
              }
            >
              <BiUserVoice fontSize={25} />
              <h1>Sessões</h1>
            </Link>
          </>
        ) : (
          <></>
        )}
        {usuario.grupoId == 2 ? (
          <>
            <div
              className={isOnline ? 'botoes-nav-inferior' : 'botoes-nav-inferior-off'}
              onClick={() => {
                if (isOnline) {
                  receberDadosSankhya();
                }
              }}
            >
              <TbDatabaseImport fontSize={25} />
              <h1>Sankhya</h1>
            </div>
            <Link
              to="/pedido_vendas"
              className={
                location.pathname == '/pedido_vendas'
                  ? 'botoes-nav-inferior-active'
                  : 'botoes-nav-inferior'
              }
            >
              <BsCoin fontSize={25} />
              <h1>Pedido</h1>
            </Link>
          </>
        ) : (
          <></>
        )}
        {usuario.grupoId == 5 || usuario.grupoId == 6 ? (
          <>
            <Link
              to={isOnline ? '/acompanhamento-vendas' : ''}
              className={
                location.pathname == '/acompanhamento-vendas'
                  ? 'botoes-nav-inferior-active'
                  : isOnline
                  ? 'botoes-nav-inferior'
                  : 'botoes-nav-inferior-off'
              }
            >
              <TbReport fontSize={26} />
              <h1>Vendas</h1>
            </Link>
          </>
        ) : (
          <></>
        )}
        <Link
          to={isOnline ? '/chat' : ''}
          className={
            location.pathname === '/chat'
              ? 'botoes-nav-inferior-active'
              : isOnline
              ? 'botoes-nav-inferior'
              : 'botoes-nav-inferior-off'
          }
        >
          {naoLida != '0' && naoLida != '' ? (
            <>
              <div className="naoLidasDivHeader">
                <h1>{naoLida}</h1>
              </div>
            </>
          ) : (
            <></>
          )}
          <BsChatDots fontSize={25} />
          <h1>chat</h1>
        </Link>
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
    </>
  );
}
