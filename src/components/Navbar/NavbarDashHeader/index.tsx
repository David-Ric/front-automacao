import React, { useEffect, useState, useRef } from 'react';
import { ImExit } from 'react-icons/im';
import { BiUserCheck } from 'react-icons/bi';
import './navbarDashHeader.scss';
import { HiArrowCircleDown, HiArrowCircleUp } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { iDadosUsuario, iMenu } from '../../../@types';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import { SiGooglemessages } from 'react-icons/si';
import api from '../../../services/api';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import logoAlyne from '../../../assets/logo-dark.png';
import logoManuten from '../../../assets/sistemamanuten.gif';
import { limparDadosDash, useAppOnlineStatus } from '../../../provider/PortalContext';
import { FaHome } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import moment from 'moment-timezone';
import { openDB, DBSchema } from 'idb';
import { criarBancoDados, versao, versaoFront } from '../../../data/indexedDB';

const atualizacaoImgUrl = `${import.meta.env.BASE_URL}assets/atualização.png`;

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
interface ComunicadoComercial {
  id: number;
  titulo: string;
  texto: string;
  grupoId: number;
  criadoEm: string;
}

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
          atualizadoEm?: string;
        };
        atualizadoEm?: string;
      };
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
      ativo: string;
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
      produtos: {
        id: number;
        codigo: string;
        nome: string;
        idGrupo: string;
        nomeGrupo: string;
      };
      parceiroId: number;
      preco: number;
      atualizadoem?: string;
    };
  };
  deleteList: {
    key: number;
    value: {
      id: number;
      palMPV: string;
      excluido: string;
    };
  };
}

interface iItemPedidoVenda {
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
interface iCabecalhoPedidoVendaBD {
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
  ativo: string;
}

const NavbarDashHeader = () => {
  const history = useNavigate();
  const location = useLocation();
  const [active, setMode] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const [naoLida, setnaoLida] = useState('');
  const [sucess, setSucess] = useState(0);
  const handleCloseloading = () => setShowloading(false);
  const [showloading, setShowloading] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');
  const [showSessao, setShowSessao] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [atualizando, setatualizando] = useState(false);
  const [showComunicadoComercial, setShowComunicadoComercial] = useState(false);
  const [comunicadosComerciais, setComunicadosComerciais] = useState<
    ComunicadoComercial[]
  >([]);
  const [ackComercial, setAckComercial] = useState(false);
  const [comunicadoAtualizacao, setComunicadoAtualizacao] =
    useState<ComunicadoComercial | null>(null);
  const [tempoAcesso, settempoAcesso] = useState(true);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [temporizado, settemporizado] = useState(0);
  const [deslogar, setDeslogar] = useState(true);
  const temporizadorRef = useRef<any>(null);
  let [isMobile, setIsMobile] = useState(false);
  const { online, apiOk, appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;
  const isApiDown = online && !apiOk;
  const minutos: number = JSON.parse(
    localStorage.getItem('@Portal/TempoSessao') || '15'
  );

  let [comunicados, setComunicados] = useState<ComunicadoComImagem[]>([]);
  let [postLidos, setPostLidos] = useState<PostLido[]>([]);
  const [showDownL, setShowDownL] = useState(false);
  const handleCloseDownL = () => setShowDownL(false);
  const [versaoDb, setVersaoDb] = useState<string>('');

  function handleCloseDownLUp() {
    setShowDownL(false);
    try {
      if (versaoDb && versaoDb.trim() !== '' && usuario?.username !== 'admin') {
        localStorage.setItem('@Portal/updateModalLastDbVersion', versaoDb);
      }
    } catch {}
    const emDigitacao =
      localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
    const onPedido =
      String(window.location.pathname || '').toLowerCase().includes('pedido');
    if (!(emDigitacao && onPedido)) {
      window.location.reload();
    }
  }

  useEffect(() => {
    criarBancoDados();
  }, []);

  useEffect(() => {
    const detect = () => {
      const mobile =
        window.innerWidth <= 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    };
    detect();
    window.addEventListener('resize', detect);
    return () => {
      window.removeEventListener('resize', detect);
    };
  }, []);

  async function PostsLidos() {
    await api

      .get(`/api/Usuario/${usuario.id}`)
      .then((response) => {
        console.log('dados do usuario', response.data);
        console.log('posts lidos', response.data.postLido);
        setPostLidos(response.data.postLido);
        postLidos = response.data.postLido;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function getComunicados() {
    setComunicados([]);
    comunicados = [];
    setShowDownL(false);
  }

  const handleMarcarComLidos = async () => {
    try {
      const dataLocalBrasil = new Intl.DateTimeFormat('pt-BR').format(
        new Date()
      );
      const comunicadosNaoLidos = comunicados.filter(
        (comunicado) =>
          !postLidos.some((postLido) => postLido.comunicadoId === comunicado.id)
      );

      const lidos: PostLido[] = comunicadosNaoLidos.map((comunicado) => ({
        comunicadoId: comunicado.id,
        titulo: comunicado.titulo,
        lidoEm: new Date().toISOString(),
        usuarioID: usuario.id,
      }));

      console.log('posts lidos', lidos);
      const response = await api.post('/api/PostLidos', lidos);
      console.log(response.data);
      handleCloseDownLUp();
    } catch (error) {
      console.error(error);
    }
  };

  //=======================================================

  const [mensagem, setMensagem] = useState(
    `Você está há mais de ${minutos} ${
      minutos === 1 ? 'minuto' : 'minutos'
    } sem atividade. Deseja continuar nesta sessão?`
  );

  function minutosParaSegundos(minutos: any) {
    return minutos * 60;
  }

  function handleCloseSessao() {
    setDeslogar(false);
    console.log('parou deslogar', deslogar);
    setShowSessao(false);
    settempoAcesso(true);
    clearInterval(temporizadorRef.current);
    ReiniciarCont();
  }

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const nome = usuario?.username;
  const nomeUser = usuario?.username;

  useEffect(() => {
    return () => {
      clearInterval(temporizadorRef.current);
    };
  }, []);

  useEffect(() => {
    console.log('onde estou', location.pathname);
    setActiveRoute(location.pathname);
    IniciarSeguirSessao();

    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      EncerrarSessao();
    };

    return () => {};
  }, []);

  const handleVisibilityChange = () => {
    if (inactiveTime >= 30) {
      settempoAcesso(false);
      console.log('Pagina Ina');
    }
  };

  const handleResetInactiveTime = () => {
    setInactiveTime(0);
  };

  useEffect(() => {
    const handleActivity = () => {
      handleResetInactiveTime();
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);

    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setInactiveTime((prevInactiveTime) => prevInactiveTime + 1);
      // }, 1000);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const segundos = minutosParaSegundos(minutos);

  useEffect(() => {
    console.log('minutos', minutos);
    console.log('tempo inativo', inactiveTime);
    if (
      window.innerWidth <= 1024 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
      console.log(
        'entrou no mobile agora........................................................'
      );
      if (inactiveTime >= minutos && tempoAcesso) {
        console.log(
          'passou do tempo especificado..................................................'
        );
        EncerrarSessao();
      }
    } else {
      if (inactiveTime >= minutos && tempoAcesso) {
        temporizadorRef.current = setTimeout(() => {
          console.log('deslogar', deslogar);
          if (deslogar) {
            Deslog();
          }
        }, 10000);

        settempoAcesso(false);
        setShowSessao(true);
        iniciarContador();
        console.log('Pagina Inativa');
      }
    }
  }, [inactiveTime, tempoAcesso, deslogar]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  function FecharSessao() {
    setTimeout(function () {
      console.log('deslogar', deslogar);
      if (deslogar == true) {
        Deslog();
      }
    }, 15000);
  }

  async function IniciarSeguirSessao() {
    const user: iDadosUsuario = JSON.parse(
      localStorage.getItem('@Portal/usuario') || '{}'
    );
    const dataAtual = moment()
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DDTHH:mm:ss');
    await api
      .post(`/api/Sessao/iniciar-sessao`, {
        nome: user.username,
        url: location.pathname,
        HoraAcesso: dataAtual,
      })
      .then((response) => {
        console.log('Sessão iniciada', response.data);
        IniciarSeguirSessao2();
      })
      .catch((error) => {
        console.log('Erro ao iniciar sessão', error);
      });
  }

  async function IniciarSeguirSessao2() {
    const user: iDadosUsuario = JSON.parse(
      localStorage.getItem('@Portal/usuario') || '{}'
    );
    const dataAtual = moment()
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DDTHH:mm:ss');
    await api
      .post(`/api/Sessao/iniciar-sessao`, {
        nome: user.username,
        url: location.pathname,
        HoraAcesso: dataAtual,
      })
      .then((response) => {
        console.log('Sessão iniciada', response.data);
      })
      .catch((error) => {
        console.log('Erro ao iniciar sessão', error);
      });
  }

  async function EncerrarSessao() {
    const user: iDadosUsuario = JSON.parse(
      localStorage.getItem('@Portal/usuario') || '{}'
    );
    await api
      .post(`/api/Sessao/encerrar-sessao`, {
        nome: user.username,
      })
      .then((response) => {
        console.log('Sessão encerrada', response.data);
      })
      .catch((error) => {
        console.log('Erro ao encerrar sessão', error);
      });
  }

  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    if (location.pathname === '/espaco-colaborador') {
      CarregarPostLidos().then(() => VerificarComunicadoComercial());
      return;
    }

    localStorage.setItem('atualizando', 'false');
    setatualizando(false);

    VerificarAtualizacao();
    CheckDbVersion();
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsOffline(false);
      return;
    }

    if (!online) {
      const t = window.setTimeout(() => {
        if (!window.navigator.onLine) {
          setIsOffline(true);
        }
      }, 800);
      return () => clearTimeout(t);
    }

    setIsOffline(false);
  }, [online, isMobile]);

  

  async function VerificarComunicadoComercial() {
    try {
      const vFront = String(versaoFront || '').trim();
      let vDbLocal = String(versaoDb || '').trim();
      if (!vDbLocal) {
        const vdLocal =
          (localStorage.getItem('@Portal/VersaoDb') || '').trim();
        vDbLocal = vdLocal;
      }
      if (vFront && vDbLocal && vFront === vDbLocal) {
        setComunicadoAtualizacao(null);
        setComunicadosComerciais([]);
        setShowComunicadoComercial(false);
        return;
      }
    } catch {}
    await api
      .get(`/api/ComunicadoComercial?pagina=1&totalpagina=999`)
      .then((response) => {
        console.log('verificar comunicado comercial', response.data.data);
        const lista = (response?.data?.data ?? []) as ComunicadoComercial[];
        const comunicados = Array.isArray(lista) ? lista : [];
        const updateTitle = 'Opa... tem nova atualização do PGA por aqui!';
        const comunicadosParaUsuario = comunicados.filter(
          (c) => c?.grupoId == 0 || c?.grupoId == usuario.grupoId
        );
        const idsLidosLocal = getLidosLocal();
        const idsLidosBackend = Array.isArray(postLidos)
          ? postLidos
              .filter(
                (p) =>
                  typeof p.comunicadoId === 'number' && p.usuarioID === usuario.id
              )
              .map((p) => p.comunicadoId)
          : [];
        const idsLidos = Array.from(new Set([...idsLidosLocal, ...idsLidosBackend]));
        const updatesNaoLidos = comunicadosParaUsuario.filter(
          (c) => c?.titulo === updateTitle && !idsLidos.includes(c.id)
        );
        const comunicadosSemAtualizacao = comunicadosParaUsuario.filter(
          (c) => c?.titulo !== updateTitle
        );
        const comunicadosNaoLidos = comunicadosSemAtualizacao.filter(
          (c) => !idsLidos.includes(c.id)
        );
        localStorage.setItem('atualizando', 'false');
        setatualizando(false);

        if (updatesNaoLidos.length > 0 && usuario.username != 'admin') {
          const ultimoUpdate = updatesNaoLidos[updatesNaoLidos.length - 1];
          setComunicadoAtualizacao(ultimoUpdate);
          setComunicadosComerciais([]);
          setShowComunicadoComercial(true);
        } else if (comunicadosNaoLidos.length > 0 && usuario.username != 'admin') {
          setComunicadoAtualizacao(null);
          setComunicadosComerciais(comunicadosNaoLidos);
          setShowComunicadoComercial(true);
        } else {
          setComunicadoAtualizacao(null);
          setComunicadosComerciais([]);
          setShowComunicadoComercial(false);
        }
      })
      .catch((error) => {
        console.log('verificar atualização', error);
        localStorage.setItem('atualizando', 'false');
        setatualizando(false);
        setComunicadosComerciais([]);
        setShowComunicadoComercial(false);
      });
  }

  async function VerificarAtualizacao() {
    localStorage.setItem('offline', 'false');
    if (isOnline) {
      setIsOffline(false);
    }
  }

  async function CheckDbVersion() {
    try {
      const resp = await api.get(`/api/Configuracao/1`);
      const vdb =
        resp?.data?.versao ??
        resp?.data?.Versao ??
        resp?.data?.versaoApp ??
        '';
      const vd = String(vdb || '').trim();
      setVersaoDb(vd);
      if (!vd) return;
      const vFront = String(versaoFront || '').trim();
      const lastShown = localStorage.getItem('@Portal/updateModalLastDbVersion') || '';
      const isAdmin = usuario?.username === 'admin';
      const shouldShow = isAdmin ? vd !== vFront : vd !== vFront && vd !== lastShown;
      if (shouldShow) {
        setShowDownL(true);
        if (!isAdmin) {
          try {
            localStorage.setItem('@Portal/updateModalLastDbVersion', vd);
          } catch {}
        }
      }
    } catch (e) {
      console.log('erro ao obter versão de configuração', e);
    }
  }

  const handleConfirmarComunicadoComercial = async (
    selecionados?: ComunicadoComercial[]
  ) => {
    try {
      const base = selecionados ?? comunicadosComerciais;
      const updateTitle = 'Opa... tem nova atualização do PGA por aqui!';
      const isUpdate = base.some((c) => c?.titulo === updateTitle);
      const postsLidos: PostLido[] = base.map((c) => ({
        comunicadoId: c.id,
        titulo: c.titulo,
        lidoEm: new Date().toISOString(),
        usuarioID: usuario.id,
      }));
      await api.post('/api/ComunicadoLido', postsLidos);
      addLidosLocal(base.map((c) => c.id));
      setShowComunicadoComercial(false);
      setAckComercial(false);
      setComunicadoAtualizacao(null);
      await CarregarPostLidos();
      if (isUpdate) {
        const emDigitacao =
          localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
        const onPedido =
          String(window.location.pathname || '')
            .toLowerCase()
            .includes('pedido');
        if (!(emDigitacao && onPedido)) {
          window.location.reload();
        }
      }
    } catch {}
  };

  

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isOnline) {
        console.log('entrou no sincronizar....');
        criarBancoDados();
        const emDigitacao =
          localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
        const envioEmProgresso =
          localStorage.getItem('@Portal/EnvioEmProgresso') === 'true';
        if (!emDigitacao && !envioEmProgresso && false) {
          // METODO DESATIVADO POR ERROS
          //GetCabecalhoNaoSincronizados();
        }

        localStorage.setItem('@Portal/Status', 'true');
        if (!isMobile) {
          setIsOffline(false);
        }
      } else {
        localStorage.setItem('@Portal/Status', 'false');
        if (!isMobile) {
          setIsOffline(true);
        }
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isOnline, isMobile]);
  



  let [cabecalhoBDPS, setcabecalhoBDPS] = useState<iCabecalhoPedidoVendaBD[]>(
    []
  );

  //=============== delete de cabecalhos nas nuvens ===================//
  async function GetDeleteCabecalhos() {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
    const store = transaction.objectStore('cabecalhoPedidoVenda');

    const ListaDelete = await store.getAll();

    for (const item of ListaDelete) {
      if (item.ativo == 'N' && item.sincronizado != 'S') {
        await DeletePedidoNuvem(item.palMPV);
      }
    }
  }

  async function DeletePedidoNuvem(palMPV: string) {
    await api
      .put(`/api/CabecalhoPedidoVenda/palmpv/${palMPV}`)
      .then((response) => {
        popularListaDelete(palMPV, 'S');
      })
      .catch((error) => {});
  }
  async function popularListaDelete(
    NumeroPalMPV: string,
    sincronizado: string
  ) {
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
    await transaction.done;
  }
  //===================================================================//

  // METODO DESATIVADO POR ERROS
  async function GetCabecalhoNaoSincronizados() {
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readonly');
      const store = transaction.objectStore('cabecalhoPedidoVenda');
      console.log('Entrou no Sincronizar Pedidos GetCabecalhoNaoSincronizados');
      const cabecalho = await store.getAll();

      const cabecalhoBD = cabecalho.filter(
        (c: any) =>
          c.sincronizado === 'N' &&
          c.ativo !== 'N' &&
          String(c.vendedorId) === String(usuario.username)
      );
      const cabecalhoSemId = cabecalhoBD.map(({ id, ...rest }) => rest);

      if (cabecalhoSemId.length > 0) {
        const primeiroCabecalho = cabecalhoSemId[0];
        console.log('cabecalho não sincronizado', primeiroCabecalho);
        setcabecalhoBDPS(cabecalhoBD);
        cabecalhoBDPS = cabecalhoBD;
        AddCabecalho(primeiroCabecalho);
      }
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  const [arrayitem, setarrayitem] = useState<iItemPedidoVenda[]>([]);
  let [arrayitemPs, setarrayitemPs] = useState<iItemPedidoVenda[]>([]);
  
  async function GetItensNaoSincronizados(PalMPV: string) {
    console.log('total de itens salvos palmpv no get sincronizar', PalMPV);
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readonly');
      const store = transaction.objectStore('itemPedidoVenda');

      const itens = await store.getAll();

      const arrayitem = itens.filter(
        (c: any) =>
          c.palMPV === PalMPV &&
          String(c.vendedorId) === String(usuario.username)
      );
      const itensSemId = arrayitem.map(({ id, ...rest }) => rest);

      setarrayitemPs(arrayitem);
      arrayitemPs = arrayitem;
      const totalItensSalvar = itensSemId.length;
      console.log('total de itens salvos a sincronizar', arrayitemPs);
      AddItens(itensSemId, PalMPV, totalItensSalvar);
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  }

  /*
    post para enviar os itens do pedido
  */
  async function AddItens(itens: any, PalMPV: string, total: number) {
    await api
      .post('/api/ItemPedidoVenda/Lista', itens)
      .then((response) => {
        console.log('Salvou os itens', response.data);
        // chama a verificação dos itens
        VerificaItens(PalMPV, total);
      })
      .catch((error) => {
        console.log('Erro do post /api/ItemPedidoVenda/Lista ', error.response.data);
      });
  }

  async function VerificaItens(PalMPV: string, total: number) {
    console.log('total de itens salvos palmpv', PalMPV);
    await api
      .get(
        `/api/ItemPedidoVenda/filter/pedidoId?pagina=1&totalpagina=999&pedidoId=${PalMPV}`
      )
      .then((response) => {
        console.log(
          'total de itens salvos',
          response.data.total,
          'total do banco',
          total
        );
        const totalSalvos = response.data.total;
        if (totalSalvos == total) {
          atualizarSincronizacaoItens(PalMPV);
        } else {
          console.log('total de itens salvos não iguais');
        }
      })
      .catch((error) => {
        console.log('total de itens salvos erro');
      });
  }

  async function atualizarSincronizacaoItens(PalMPV: string) {
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('itemPedidoVenda', 'readwrite');
      const store = transaction.objectStore('itemPedidoVenda');

      console.log('total de itens salvos sincronizados', arrayitemPs);
      for (const item of arrayitemPs) {
        item.sincronizado = 'S';
        await store.put(item);
      }

      await transaction.done;
      atualizarSincronizacaoCabecalhos(PalMPV);
      console.log('Itens sincronizados com sucesso!');
    } catch (error) {
      console.log('Ocorreu um erro ao sincronizar os itens', error);
    }
  }

  /*
    post para enviar os Pedidos usando a API
  */
  async function AddCabecalho(cabecalho: any) {
    await api
      .post('/api/CabecalhoPedidoVenda', {
        data: cabecalho.data,
        dataEntrega: cabecalho.dataEntrega,
        filial: cabecalho.filial,
        observacao: cabecalho.observacao,
        palMPV: cabecalho.palMPV,
        parceiroId: cabecalho.parceiroId,
        pedido: '',
        sincronizado: cabecalho.sincronizado,
        status: 'Não Enviado',
        tipPed: cabecalho.tipPed,
        tipoNegociacaoId: cabecalho.tipoNegociacaoId,
        valor: cabecalho.valor,
        vendedorId: cabecalho.vendedorId,
        ativo: cabecalho.ativo,
        versao: versaoFront,
      })
      .then((response) => {
        console.log('Salvou o cabecalhos', response.data);
        // seleciona os itens do pedidos
        GetItensNaoSincronizados(cabecalho.palMPV);
      })
      .catch((error) => {
        console.log('Erro do post /api/CabecalhoPedidoVenda ', error.response.data);
      });

  }

  async function atualizarSincronizacaoCabecalhos(palMPV: string) {
    try {
      const db = await openDB<PgamobileDB>('pgamobile', versao);
      const transaction = db.transaction('cabecalhoPedidoVenda', 'readwrite');
      const store = transaction.objectStore('cabecalhoPedidoVenda');

      const cabecalhos = await store.getAll();

      cabecalhos.forEach(async (cabecalho) => {
        if (cabecalho.palMPV === palMPV) {
          cabecalho.sincronizado = 'S';
          await store.put(cabecalho);
        }
      });

      await transaction.done;

      console.log('Cabecalhos sincronizados com sucesso!');
    } catch (error) {
      console.log('Ocorreu um erro ao sincronizar os Cabecalhos', error);
    }
  }

  useEffect(() => {
    // Verifica ao iniciar e a cada 30 segundos
    atualizarMensagensNaoLidas();
    NaoLidas();

    const interval = setInterval(() => {
      atualizarMensagensNaoLidas();
      NaoLidas();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function iniciarContador() {
    settemporizado(1);
    let segundos = 1;

    const interval = setInterval(() => {
      settemporizado(segundos);
      segundos++;

      if (segundos > 10) {
        clearInterval(interval);
      }
    }, 1000);
  }

  function ReiniciarCont() {
    setTimeout(function () {
      console.log('deslogar', deslogar);
      setDeslogar(true);
    }, 10000);
  }

  function atualizarMensagensNaoLidas() {
    const valor = localStorage.getItem('@Portal/chat-mensagems-lidas');
    if (valor == 'true') {
      NaoLidas();
    }
  }

  // Removendo efeito redundante
  // useEffect(() => {
  //   NaoLidas();
  // }, []);

  // Removendo efeito sem dependência que roda a cada render
  // useEffect(() => {
  //   setTimeout(function () {
  //     GetUsuarioIdLog();
  //   }, 5000);
  // });

  useEffect(() => {
    GetUsuarioIdLog();
  }, []);

  async function GetUsuarioIdLog() {
    console.log('verificando a validade do token');
    await api
      .get(`/api/Vendedor?pagina=1&totalpagina=99`)
      .then((response) => {
        console.log('token ok');
      })
      .catch((error) => {
        console.log('token expirou');
        if (error.response?.status === 401) {
          LoginMobile();
        }
      });
  }

  //============Novo Logim Mobile ==========================================//
  async function LoginMobile() {
    const senha = localStorage.getItem('@Portal/exit');
    await api
      .post('/api/Auth/login', {
        username: usuario.username,
        password: senha,
      })
      .then((response) => {
        localStorage.removeItem('@Portal/usuario');

        localStorage.setItem('@Portal/usuario', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log('erro ao efetuar login');
      });
  }

  async function Deslog() {
    setShowloading(true);
    setSucess(20);
    EncerrarSessao();
    await api
      .post(`/api/Auth/logout/${usuario.id}`)
      .then((response) => {
        AtivaDrop();
        setSucess(60);
        setShowloading(false);
        limparDadosDash();
        localStorage.clear();
        history('/');
      })
      .catch((error) => {
        setSucess(60);
        setShowloading(false);
        const menuPrincipal: string | null =
          localStorage.getItem('@Portal/menuPrincipal') ?? null;
        localStorage.clear();
        if (menuPrincipal) {
          localStorage.setItem('@Portal/menuPrincipal', menuPrincipal);
        }
        history('/');
      });
  }

  const ToggleMode = () => {
    setMode(!active);
  };

  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = dia + '/' + mes + '/' + ano;

  function handleCloseComunicadoComercial() {
    setShowComunicadoComercial(false);
    setAckComercial(false);
  }

  async function CarregarPostLidos() {
    await api
      .get(`/api/Usuario/${usuario.id}`)
      .then((response) => {
        const dadosUsuario = response.data || {};
        const arrays = Object.values(dadosUsuario).filter((v: any) =>
          Array.isArray(v)
        ) as any[];
        const itens = arrays.flat();
        const lidos: PostLido[] = itens
          .filter(
            (x: any) =>
              x &&
              typeof x.comunicadoId === 'number' &&
              typeof x.usuarioID === 'number'
          )
          .map((x: any) => ({
            comunicadoId: x.comunicadoId,
            titulo: String(x.titulo ?? ''),
            lidoEm: String(x.lidoEm ?? ''),
            usuarioID: x.usuarioID,
          }));
        setPostLidos(lidos);
        postLidos = lidos;
      })
      .catch(() => {});
  }

  function getLidosLocal(): number[] {
    try {
      const raw = localStorage.getItem('@Portal/comunicadoComercialLidos') || '{}';
      const mapa = JSON.parse(raw);
      const ids: number[] = Array.isArray(mapa?.[usuario.id]) ? mapa[usuario.id] : [];
      return ids;
    } catch {
      return [];
    }
  }
  function addLidosLocal(ids: number[]) {
    try {
      const raw = localStorage.getItem('@Portal/comunicadoComercialLidos') || '{}';
      const mapa = JSON.parse(raw);
      const atuais: number[] = Array.isArray(mapa?.[usuario.id]) ? mapa[usuario.id] : [];
      const merged = Array.from(new Set([...atuais, ...ids]));
      const novoMapa = { ...mapa, [usuario.id]: merged };
      localStorage.setItem('@Portal/comunicadoComercialLidos', JSON.stringify(novoMapa));
    } catch {}
  }

  function AtivaDrop() {
    if (!dropActive) {
      setDropActive(true);
    } else {
      setDropActive(false);
    }
  }
  function AtivaDropFalse() {}

  function MeuPerfil() {
    setDropActive(false);
    history('/meu-perfil');
  }

  async function NaoLidas() {
    await api
      .get(`/api/Chat/mensagens-nao-lidas?id=${usuario.id}`)
      .then((response) => {
        console.log('não lidas ', response.data);
        setnaoLida(response.data);
      })
      .catch((error) => {});
  }

  return (
    <header id="navbar-header-dashboard">
      {atualizando && isMobile ? (
        <>
          <div className="div-atialuzandomobile">
            <div className="divOffline">
              <h1>Atualizando</h1>
            </div>
            <h1 className="versao2"> Versão: {versaoFront}</h1>
            <OverlayTrigger
              placement={'left'}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Mais ações</Tooltip>}
            >
              <h1 className="usuario-logado" onClick={AtivaDrop}>
                Perfil / Logout
                {dropActive ? (
                  <>
                    <HiArrowCircleUp fontSize={23} style={{ marginLeft: 5 }} />
                  </>
                ) : (
                  <>
                    <HiArrowCircleDown
                      fontSize={23}
                      style={{ marginLeft: 5 }}
                    />
                  </>
                )}
              </h1>
            </OverlayTrigger>
            <div className={dropActive ? 'dropdow' : 'no-dropdow'}>
              <ul>
                <li onClick={MeuPerfil}>
                  Perfil
                  <BiUserCheck fontSize={22} style={{ marginLeft: 6 }} />
                </li>
                <li onClick={Deslog}>
                  Sair
                  <ImExit style={{ marginLeft: 6 }} />
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={AtivaDropFalse}
            className="container-fluid d-flex flex-wrap flex-xl-nowrap justify-content-between align-content-center py-4 px-xl-4 px-0 mb-4 conteudo-nav"
          >
            <div className="d-flex content-user"></div>
            <ul className="navbar-nav ms-auto"></ul>
            <div className="d-flex align-items-center alinhamentoDropD"></div>
            {atualizando && !isMobile ? (
              <>
                <div className="geralOffline">
                  <img
                    style={{ marginTop: 200 }}
                    id="logoSankhya"
                    src={logoManuten}
                    alt=""
                  />
                  <h1 className="h1PromotorOffAt">Atualização do Sistema!</h1>
                  <h1 className="h1Promotorat">
                    Estamos atualizando o sistema, se você estava no meio de um
                    processo importante,
                  </h1>
                  <h1 className="h1Promotorat">
                    por favor não feche o navegador, após a atualização você
                    poderá continuar de onde parou.
                  </h1>
                </div>
              </>
            ) : (
              <></>
            )}
            {isOffline ? (
              <div className="geralOffline">
                <img
                  style={{ marginTop: 200 }}
                  id="logoSankhya"
                  src={logoAlyne}
                  alt=""
                />
                <h1 className="h1PromotorOff">Conecte-se à Internet</h1>
                <h1 className="h1Promotor">
                  Você está off-line. Verifique sua conexão.
                </h1>
                {!apiOk ? (
                  <h1 style={{ color: 'red', marginTop: 15 }}>
                    Erro de comunicação com a Api. Verificar com suporte!
                  </h1>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {(() => {
              const text = isOnline ? 'Online' : 'Offline';
              const cls = isOnline ? 'divOline' : 'divOffline';
              return (
                <div
                  className={cls}
                  onClick={() => {
                    const emDigitacao =
                      localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
                    const onPedido =
                      String(window.location.pathname || '')
                        .toLowerCase()
                        .includes('pedido');
                    if (!(emDigitacao && onPedido)) {
                      window.location.reload();
                    }
                  }}
                >
                  <h1>{text}</h1>
                </div>
              );
            })()}
            <h1 className="versao2"> Versão: {versaoFront}</h1>
            <div className="logo-lik2">
              <Link className="logo-b d-flex" to="/espaco-colaborador">
                <h1 className="d-flex">
                  HOME <FaHome style={{ marginLeft: 7 }} fontSize={20} />
                </h1>
              </Link>
            </div>
            {location.pathname == '/chat' ? (
              <></>
            ) : (
              <>
                <Link
                  id="divChatLogo"
                  style={{ marginRight: 100, paddingTop: 7 }}
                  to="/chat"
                >
                  <span className="d-flex">
                    <h1 className="d-flex">
                      CHAT{' '}
                      <BsChatDots style={{ marginLeft: 7 }} fontSize={20} />
                    </h1>

                    {naoLida != '0' && naoLida != '' ? (
                      <>
                        <div className="naoLidasDivHeader1">
                          <h1>{naoLida}</h1>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                </Link>
              </>
            )}
            <OverlayTrigger
              placement={'left'}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Mais ações</Tooltip>}
            >
              <h1 className="usuario-logado" onClick={AtivaDrop}>
                Perfil / Logout
                {dropActive ? (
                  <>
                    <HiArrowCircleUp fontSize={23} style={{ marginLeft: 5 }} />
                  </>
                ) : (
                  <>
                    <HiArrowCircleDown
                      fontSize={23}
                      style={{ marginLeft: 5 }}
                    />
                  </>
                )}
              </h1>
            </OverlayTrigger>
            <div className={dropActive ? 'dropdow' : 'no-dropdow'}>
              <ul>
                <li onClick={MeuPerfil}>
                  Perfil
                  <BiUserCheck fontSize={22} style={{ marginLeft: 6 }} />
                </li>
                <li onClick={Deslog}>
                  Sair
                  <ImExit style={{ marginLeft: 6 }} />
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      {/* //===================================modal loading ============================================ */}
      <Modal
        className="modalLoading"
        show={showloading}
        onHide={handleCloseloading}
        backdrop="static"
      >
        <Modal.Body>
          <div className="loadingModal">
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 style={{ marginTop: 15 }}>Efetuando logoff...</h1>
            <h1 style={{ marginTop: 15 }}></h1>
            <ProgressBar className="progress" animated now={sucess} />
          </div>
        </Modal.Body>
      </Modal>

      {/* //===================================modal loading ============================================ */}
      <Modal
        className="modalLoading"
        show={showSessao}
        onHide={handleCloseSessao}
        backdrop="static"
      >
        <Modal.Body>
          <div className="loadingModal">
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 style={{ marginTop: 15 }}>{mensagem}</h1>
            <h1 style={{ marginTop: 15 }}></h1>
            <button
              style={{ width: 130 }}
              className="btn btn-primary"
              onClick={handleCloseSessao}
            >
              Sim
            </button>
            <h1 className="texto-temporizado">
              Em 10 segundos a sessão será encerrada.
            </h1>
            <h1 className="temporizado">{temporizado}</h1>
          </div>
        </Modal.Body>
      </Modal>
      {/* //===================================modal update ============================================ */}
      <Modal
        className="modalUpd"
        show={
          showDownL &&
          (activeRoute === '/' ||
            String(activeRoute || '').toLowerCase().includes('home'))
        }
        onHide={handleCloseDownL}
        backdrop="static"
      >
        <Modal.Body>
          <div className="modalUpdt">
            <h1 style={{ marginTop: 5, fontWeight: 'bold' }}>Nova Versão</h1>
            <h1 style={{ marginTop: 5 }}>
              {versaoDb && versaoDb.trim() !== ''
                ? `Versão disponível: ${versaoDb}`
                : 'Está disponível uma nova versão do'}
            </h1>
            <h1>aplicativo. Deseja atualizar agora?</h1>
            <div style={{ marginTop: 15 }} className="d-flex">
              <button
                style={{ width: 130, marginRight: 10 }}
                className="btn btn-outline-dark"
                onClick={handleCloseDownL}
              >
                Depois
              </button>
              <button
                style={{ width: 130 }}
                className="btn btn-outline-dark"
                onClick={handleMarcarComLidos}
              >
                Atualizar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="modalUpd"
        show={showComunicadoComercial}
        onHide={handleCloseComunicadoComercial}
        backdrop="static"
      >
        <Modal.Body>
          <div className="modalUpdt">
            <h1 style={{ marginTop: 5, fontWeight: 'bold' }}>
              Comunicado comercial
            </h1>
            {comunicadoAtualizacao ? (
              <>
                <div
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <h1
                      style={{
                        marginTop: 5,
                        marginBottom: 12,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      {comunicadoAtualizacao.titulo}
                    </h1>
                    {comunicadoAtualizacao.texto.includes(versaoFront) ? (
                      <h1 style={{ marginTop: 5 }}>
                        {comunicadoAtualizacao.texto.split(versaoFront)[0]}
                        <span style={{ fontWeight: 'bold' }}>{versaoFront}</span>
                        {comunicadoAtualizacao.texto
                          .split(versaoFront)
                          .slice(1)
                          .join(versaoFront)}
                      </h1>
                    ) : (
                      <h1 style={{ marginTop: 5 }}>
                        {comunicadoAtualizacao.texto}
                      </h1>
                    )}
                  </div>
                  <img
                    src={atualizacaoImgUrl}
                    alt="Atualização"
                    style={{ width: 80, height: 80, objectFit: 'contain' }}
                  />
                </div>
                <div style={{ marginTop: 15 }} className="d-flex">
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={ackComercial}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setAckComercial(v);
                        if (v && comunicadoAtualizacao) {
                          handleConfirmarComunicadoComercial([
                            comunicadoAtualizacao,
                          ]);
                        }
                      }}
                      style={{ marginRight: 8 }}
                    />
                    Ok entendi!
                  </label>
                </div>
              </>
            ) : (
              <>
                {comunicadosComerciais.map((c) => (
                  <div key={c.id} style={{ marginTop: 10 }}>
                    <h1 style={{ marginTop: 5 }}>{c.titulo}</h1>
                    <h1 style={{ marginTop: 5 }}>{c.texto}</h1>
                  </div>
                ))}
                <div style={{ marginTop: 15 }} className="d-flex">
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={ackComercial}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setAckComercial(v);
                        if (v) {
                          handleConfirmarComunicadoComercial();
                        }
                      }}
                      style={{ marginRight: 8 }}
                    />
                    Ok entendi!
                  </label>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default NavbarDashHeader;
