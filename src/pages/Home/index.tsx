import React, { useEffect, useState } from 'react';
import './Home.scss';
import '../../styles/global.scss';
import LogoOle from '../../assets/ole-logo.png';
import LogoAvatar from '../../assets/avatar1.png';
import Messeger from '../../assets/messege.png';
import ChampGif from '../../assets/playy.gif';
import { RedirectFunction } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
import LogoMob from '../../assets/logo-light.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import { iDadosUsuario } from '../../@types';
import { Si1Password } from 'react-icons/si';
import { FaSearch } from 'react-icons/fa';
import Loading from '../../components/Loading';
import axios from 'axios';
import logoAlyne from '../../assets/logo-dark.png';
import logoAlyne2 from '../../assets/logo-light.png';
import LogoHome from '../../assets/logo-home.webp';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import { MetaXRealizado } from '../../functions/FuncoesRelatorio';
import {
  atualizaCartaoHome,
  atualizarConstantes,
} from '../../provider/PortalContext';
import { criarBancoDados, versao, versaoFront } from '../../data/indexedDB';
import { openDB, DBSchema } from 'idb';


interface iGrafico {
  Mes: string;
  AnoAtual: number;
  AnoAnterior: number;
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
          subMenuPermissaoId?: number;
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
      subMenuPermissaoId?: number;
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
          subMenuPermissaoId?: number;
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
      subMenuPermissaoId?: number;
      grupoUsuarioId: number;
    };
  };
  grafico: {
    key: number;
    value: {
      id?: number;
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
      id?: number;
      valor: number;
    };
  };
  valorAtual: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  metaMes: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  vendaMes: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  quantFaturar: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  valorFaturar: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  quantPedidoOrcamento: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  valorPedidoOrcamento: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  quantPedidos: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  valorTotalAno: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  valorPedidos: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
  clienteSemVenda: {
    key: number;
    value: {
      id?: number;
      valor: number;
    };
  };
}
interface PgamobileUsuario {
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
}

export default function Home() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [capsLockAtivo, setCapsLockAtivo] = useState(false);
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [sucess, setSucess] = useState(0);
  const [sucess2, setSucess2] = useState(60);
  const handleCloseloading = () => setShowloading(false);
  const [showloading, setShowloading] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const handleCloseloadingOff = () => setShowloadingOff(false);
  const [showloadingOff, setShowloadingOff] = useState(false);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const token: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/token-reset') || '{}'
  );
  const tokenReset = JSON.parse(
    localStorage.getItem('@Portal/token-reset-now') || '{}'
  );
  let [username, setUsername] = useState('');
  let [isMobile, setIsMobile] = useState(false);
  const [logoHomeReady, setLogoHomeReady] = useState(false);

  useEffect(() => {
    setSucess2(100);
    console.log('Entrou no useEffect');

    const handleResize = () => {
      if (
        window.innerWidth <= 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        console.log('Estou em um dispositivo móvel');
        setIsMobile(true);
        if (usuario.token) {
          setLoading2(false);
          history('/espaco-colaborador');
        } else {
          setLoading2(false);
        }
      } else {
        setLoading2(false);
        setIsMobile(false);
      }
    };

    const interval = setInterval(handleResize, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = LogoHome;

    if (img.complete) {
      setLogoHomeReady(true);
      return;
    }

    img.onload = () => setLogoHomeReady(true);
    return () => {
      img.onload = null;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await criarBancoDados();
      await GetMontarMenu();
      await montarMenu2();
      await PutSessao();
    })();
  }, []);

  async function GetIntegracao() {
    const Sql = `SELECT PAR.CODPARC AS Id,
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
        PAR.DTALTER AS AtualizadoEm,
        ISNULL(PAR.LIMCRED,0) as LC,
        ISNULL(PAR.LIMCRED, 0) - ISNULL(PED.VLRPED, 0) - ISNULL(FIN.VLRTIT, 0) AS SC
    FROM 
        TGFPAR (NOLOCK) PAR
        JOIN TGFVEN (NOLOCK) VEN ON VEN.CODVEND = PAR.CODVEND AND VEN.CODVEND =  $VendedorId
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
        AND PAR.CODVEND =  $VendedorId`;
    await api
      .get(`/api/Configuracao/integracao3?novoValor=${encodeURIComponent(Sql)}`)
      .then((response) => {
        console.log('atualizou tabela parceiro', response.data);
        AtualizarTabela();
      })
      .catch((error) => {
        console.log('Ocorreu um erro', error);
      });
  }
  //==========atualizar Tabela Iintegração ================================================

  async function AtualizarTabela() {
    await api
      .post('/api/RestaurarMenu/atualizar-tabela-integracao')
      .then((response) => {
        console.log('entrou no atualizar tabela, resposta:', response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  async function PutSessao() {
    await api
      .put(`/api/Configuracao/UpdateSessao`)
      .then((response) => {
        console.log('alterou sessao', response.data);
        GetSessao();
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao alterar sessão');

        GetSessao();
      });
  }
  async function GetSessao() {
    await api

      .get(`/api/Configuracao/1`)
      .then((response) => {
        localStorage.setItem('@Portal/TempoSessao', response.data.tempoSessao);
        try {
          const vdb =
            response?.data?.versao ??
            response?.data?.Versao ??
            response?.data?.versaoApp ??
            '';
          if (vdb) {
            localStorage.setItem('@Portal/VersaoDb', String(vdb));
          }
        } catch {}
      })
      .catch((error) => {
        console.log('Ocorreu um erro', error);
      });
  }


  function montarMenu2() {
    setTimeout(function () {
      GetMontarMenu();
    }, 5000);
  }

  async function GetMontarMenu() {
    localStorage.removeItem('@Portal/usuario/atualiza-menu');
    await api

      .get(`/api/Menu?pagina=1&totalpagina=999`)
      .then((response) => {
        localStorage.setItem(
          '@Portal/menuPrincipal',
          JSON.stringify(response.data.data)
        );
        console.log('menu', response.data.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setLoading(false);
      });
  }

  async function GetPaginas() {
    await api

      .get(`/api/PaginaBase/Get-Codigo?pagina=1&totalpagina=999&Codigo=23`)
      .then((response) => {
        console.log('resposta', response.data);
        if (response.data.data.lenght > 0) {
          console.log('existe');
        } else {
          console.log('não existe');
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  function logado() {
    if (usuario.token) {
      history('/espaco-colaborador');
    }
  }

  function LimparErro() {
    setAlertErro(false);
  }
  function AtualizaCapsLock(e: any) {
    try {
      if (typeof e?.getModifierState === 'function') {
        setCapsLockAtivo(Boolean(e.getModifierState('CapsLock')));
        return;
      }
    } catch {}
    setCapsLockAtivo(false);
  }
  function Entrar() {
    history('/login');
  }
  function submitName(e: any) {
    if (e.code === 'Enter') {
      document.getElementById('btn-login')?.click();
    }
  }

  function Logar() {
    setTimeout(function () {}, 30000);
  }

  //=========== fução login ==================================//
  async function Login(event: any) {
    event.preventDefault();
    localStorage.removeItem('@Portal/usuario');
    console.log('user', user);
    setLoading(true);
    if (user == 'sup' && senha == 'Sync550v') {
      localStorage.setItem('@Portal/superusuario', 'true');
      history('/configuracoes');
    }
    if (user == 'reset' && senha == 'cigel@123') {
      deleteIndexedDB();
      deleteIndexedDBDelete();
    }
    if (user.trim() == '') {
      setLoading(false);
      let usuario: any;
      usuario = document.getElementById('user');

      document.getElementById('user')?.focus();
      setAlertErro(true);
      setMsgErro('Usuario não informado.');
      return;
    }
    if (senha.trim() == '') {
      setLoading(false);
      let usuario: any;
      usuario = document.getElementById('senha');
      document.getElementById('senha')?.focus();
      setAlertErro(true);
      setMsgErro('Senha não informada.');
      return;
    }

    await api
      .post('/api/Auth/login', {
        username: user,
        password: senha,
      })
      .then((response) => {
        const usuario = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          grupoId: response.data.grupoId,
          status: response.data.status,
          funcao: 'não informado',
          password: senha,
          nomeCompleto: response.data.nomeCompleto,
          token: response.data.token,
          imagemURL: 'não informado',
          primeiroLoginAdm: false,
        };
        inserirUsuario(usuario);
        console.log(response.data);
        localStorage.setItem('@Portal/exit', senha);
        if (response.data.status == '1') {
          localStorage.setItem(
            '@Portal/usuario',
            JSON.stringify(response.data)
          );
          setShowloading(true);
          setSucess(20);

          GetUsuarioId(response.data.id);
          if (response.data.grupoId == 2) {
            LoginSankhyaDashRepresentante();
            MetaXRealizado();
            console.log(
              'entrou login sankhya provider vendedor........................................................................................'
            );
          } else if (response.data.grupoId == 5) {
            LoginSankhyaDashCoordenador();

            console.log(
              'entrou login sankhya provider coordenador........................................................................................'
            );
          } else {
            console.log(
              'entrou login sankhya provider admin..............................................................................................'
            );
            LoginSankhyaDashAdmin();
          }
        } else {
          setUser('');
          user = '';
          setSenha('');
          senha = '';
          document.getElementById('user')?.focus();
          setAlertErro(true);
          setMsgErro('Usúario inativado, entre em contato com o suporte.');
          return;
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          setAlertErro(true);
          setUser('');
          user = '';
          setSenha('');
          senha = '';
          document.getElementById('user')?.focus();

          setMsgErro(`Erro ${error.response.status}: ${error.response.data}`);
          return;
        } else {
          if (isMobile) {
            setSucess(30);
            setShowloadingOff(true);
            setAlertErro(false);
            setTimeout(function () {
              LoginOffline();
            }, 4000);
          } else {
            setAlertErro(true);
            setUser('');
            user = '';
            setSenha('');
            senha = '';
            document.getElementById('user')?.focus();
            setMsgErro(
              'Erro de comunicação com a API. entre em contado com o departamento de TI.'
            );
            return;
          }
        }
      });
  }

  async function LoginOffline() {
    setSucess(100);
    console.log('Entrou aqui no modo offline devido ao erro da API');
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('usuario', 'readonly');
    const store = transaction.objectStore('usuario');

    const usuarios = await store.getAll();
    console.log('usuariooos....', usuarios);
    let userFound = false;

    for (const usuario of usuarios) {
      if (usuario.username === user && usuario.password === senha) {
        localStorage.setItem('@Portal/usuario', JSON.stringify(usuario));
        obterUserPermissao();
        userFound = true;
        break;
      }
    }

    if (!userFound) {
      setShowloadingOff(false);
      setLoading(false);
      setAlertErro(true);
      setUser('');
      user = '';
      setSenha('');
      senha = '';
      document.getElementById('user')?.focus();
      setMsgErro('Usuário ou senha inválidos!');
    }

    await transaction.done;
  }

  async function obterUserPermissao(): Promise<void> {
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(30);
    const transaction = db.transaction('usuarioPermissaoMenu', 'readonly');
    const store = transaction.objectStore('usuarioPermissaoMenu');

    try {
      const usuarioPermissaoMenuData = await store.getAll();
      const arraysusuarioPermissaoMenu = usuarioPermissaoMenuData.map(
        (item) => item
      );
      localStorage.setItem(
        '@Portal/usuarioPermissaoMenu',
        JSON.stringify(arraysusuarioPermissaoMenu[0])
      );
      obterUserPermissaoPagina();
    } catch (error) {
      console.error(
        'Erro ao obter os arrays da tabela usuarioPermissaoMenu:',
        error
      );
      obterUserPermissaoPagina();
    }
  }
  async function obterUserPermissaoPagina(): Promise<void> {
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(30);
    const transaction = db.transaction('usuarioPermissaoPagina', 'readonly');
    const store = transaction.objectStore('usuarioPermissaoPagina');

    try {
      const usuarioPermissaoMenuData = await store.getAll();
      const arraysusuarioPermissaoMenu = usuarioPermissaoMenuData.map(
        (item) => item
      );
      localStorage.setItem(
        '@Portal/usuarioPermissaoPagina',
        JSON.stringify(arraysusuarioPermissaoMenu[0])
      );
      obterGrupoPermissao();
    } catch (error) {
      console.error(
        'Erro ao obter os arrays da tabela usuarioPermissaoPagina:',
        error
      );
      obterGrupoPermissao();
    }
  }

  async function obterGrupoPermissao(): Promise<void> {
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(30);
    const transaction = db.transaction('grupoPermissaoMenu', 'readonly');
    const store = transaction.objectStore('grupoPermissaoMenu');

    try {
      const grupoPermissaoMenuData = await store.getAll();
      const arraysgrupoPermissaoMenu = grupoPermissaoMenuData.map(
        (item) => item
      );
      localStorage.setItem(
        '@Portal/grupoPermissaoMenu',
        JSON.stringify(arraysgrupoPermissaoMenu[0])
      );
      obterGrupoPermissaoPagina();
    } catch (error) {
      console.error(
        'Erro ao obter os arrays da tabela grupoPermissaoMenu:',
        error
      );
      obterGrupoPermissaoPagina();
    }
  }

  async function obterGrupoPermissaoPagina(): Promise<void> {
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(30);
    const transaction = db.transaction('grupoPermissaoPagina', 'readonly');
    const store = transaction.objectStore('grupoPermissaoPagina');

    try {
      const grupoPermissaoMenuData = await store.getAll();
      const arraysgrupoPermissaoMenu = grupoPermissaoMenuData.map(
        (item) => item
      );
      localStorage.setItem(
        '@Portal/grupoPermissaoPagina',
        JSON.stringify(arraysgrupoPermissaoMenu[0])
      );
      history('/espaco-colaborador');
    } catch (error) {
      console.error(
        'Erro ao obter os arrays da tabela grupoPermissaoPagina:',
        error
      );
    }
  }

  async function obterValoresVendaMes(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(20);
    const transaction = db.transaction('vendaMes', 'readonly');
    const store = transaction.objectStore('vendaMes');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem('@Portal/dash/vendaMes', valor.toString());
      obterValorTotalAno();
    } catch (error) {
      console.error('Erro ao obter valores da tabela vendaMes:', error);
      obterValorTotalAno();
    }
  }
  async function obterValorTotalAno(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);

    const transaction = db.transaction('valorTotalAno', 'readonly');
    const store = transaction.objectStore('valorTotalAno');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem('@Portal/dash/valorTotalAno', valor.toString());

      obterValoresMetaMes();
    } catch (error) {
      console.error('Erro ao obter valores da tabela vendaMes:', error);
      obterValoresMetaMes();
    }
  }
  async function obterValoresMetaMes(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);

    const transaction = db.transaction('metaMes', 'readonly');
    const store = transaction.objectStore('metaMes');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem('@Portal/dash/metaMes', valor.toString());

      obterArraysGrafico();
    } catch (error) {
      console.error('Erro ao obter valores da tabela vendaMes:', error);
      obterArraysGrafico();
    }
  }

  async function obterArraysGrafico(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(30);
    const transaction = db.transaction('grafico', 'readonly');
    const store = transaction.objectStore('grafico');

    try {
      const graficoData = await store.getAll();
      const arraysGrafico = graficoData.map(({ id, ...item }) => item);

      localStorage.setItem(
        '@Portal/dash/graficoTotal',
        JSON.stringify(arraysGrafico)
      );
      obterVendaXMeta();
    } catch (error) {
      console.error('Erro ao obter os arrays da tabela grafico:', error);
      obterVendaXMeta();
    }
  }

  async function obterVendaXMeta(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(40);
    const transaction = db.transaction('vendaMeta', 'readonly');
    const store = transaction.objectStore('vendaMeta');

    try {
      const graficoData = await store.getAll();
      const arraysGrafico = graficoData.map((item) => item);

      localStorage.setItem(
        '@Portal/dash/VendaXmeta',
        JSON.stringify(arraysGrafico)
      );
      obterValorAnterior();
    } catch (error) {
      console.error('Erro ao obter os arrays da tabela grafico:', error);
      obterValorAnterior();
    }
  }
  async function obterValorAnterior(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(50);
    const transaction = db.transaction('valorAnterior', 'readonly');
    const store = transaction.objectStore('valorAnterior');

    try {
      const graficoData = await store.getAll();
      const arraysGrafico = graficoData.map((item) => item);

      localStorage.setItem(
        '@Portal/dash/ValorAnterior',
        JSON.stringify(arraysGrafico[0])
      );
      atualizaCartaoHome();

      obterValorAtual();
    } catch (error) {
      console.error('Erro ao obter valores da tabela ValorAnterior:', error);
      obterValorAtual();
    }
  }

  async function obterValorAtual(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(60);
    const transaction = db.transaction('valorAtual', 'readonly');
    const store = transaction.objectStore('valorAtual');

    try {
      const graficoData = await store.getAll();
      const arraysGrafico = graficoData.map((item) => item);

      localStorage.setItem(
        '@Portal/dash/ValorAtual',
        JSON.stringify(arraysGrafico[0])
      );
      atualizarConstantes();
      obterQuantFaturar();
    } catch (error) {
      console.error('Erro ao obter valores da tabela ValorAtual:', error);
      atualizarConstantes();
      obterQuantFaturar();
    }
  }

  async function obterQuantFaturar(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(70);
    const transaction = db.transaction('quantFaturar', 'readonly');
    const store = transaction.objectStore('quantFaturar');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem('@Portal/dash/QuantFaturar', valor.toString());

      obterValorPedidoOrcamento();
    } catch (error) {
      console.error('Erro ao obter valores da tabela QuantFaturar:', error);
      obterValorPedidoOrcamento();
    }
  }

  async function obterValorPedidoOrcamento(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(80);
    const transaction = db.transaction('vendaMes', 'readonly');
    const store = transaction.objectStore('vendaMes');

    try {
      const vendaMesData = await store.getAll();

      if (vendaMesData && vendaMesData.length > 0) {
        const primeiroItem = vendaMesData[0];
        const valor = primeiroItem.valor;

        if (valor !== null && valor !== undefined) {
          localStorage.setItem(
            '@Portal/dash/ValorPedidoOrcamento',
            String(valor)
          );
        } else {
          console.error('O valor na tabela vendaMes é nulo ou indefinido.');
        }
      } else {
        console.error('A tabela vendaMes está vazia.');
      }

      obterQuantPedidos();
    } catch (error) {
      console.error(
        'Erro ao obter valores da tabela alorPedidoOrcamento:',
        error
      );
      obterQuantPedidos();
    }
  }

  async function obterQuantPedidos(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('quantPedidos', 'readonly');
    const store = transaction.objectStore('quantPedidos');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem('@Portal/dash/QuantPedidos', valor.toString());

      obterValorPedidos();
    } catch (error) {
      console.error('Erro ao obter valores da tabela QuantPedidos:', error);
      obterValorPedidos();
    }
  }

  async function obterValorPedidos(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorPedidos', 'readonly');
    const store = transaction.objectStore('valorPedidos');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];

      if (primeiroItem !== null && primeiroItem !== undefined) {
        const valor = primeiroItem.valor;

        localStorage.setItem('@Portal/dash/ValorPedidos', valor.toString());

        obterValorFaturar();
      } else {
        console.error('Não há valores na tabela valorPedidos');
        obterValorFaturar();
      }
    } catch (error) {
      console.error('Erro ao obter valores da tabela valorPedidos:', error);
      obterValorFaturar();
    }
  }

  async function obterValorFaturar(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorFaturar', 'readonly');
    const store = transaction.objectStore('valorFaturar');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem('@Portal/dash/ValorFaturar', valor.toString());

      obterQuantPedidoOrcamento();
    } catch (error) {
      console.error('Erro ao obter valores da tabela valorFaturar:', error);
      obterQuantPedidoOrcamento();
    }
  }

  async function obterQuantPedidoOrcamento(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    setSucess(85);
    const transaction = db.transaction('quantPedidoOrcamento', 'readonly');
    const store = transaction.objectStore('quantPedidoOrcamento');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem(
        '@Portal/dash/QuantPedidoOrcamento',
        valor.toString()
      );
      atualizarConstantes();
      obterClienteSemVenda();
    } catch (error) {
      console.error(
        'Erro ao obter valores da tabela quantPedidoOrcamento:',
        error
      );
      atualizarConstantes();
      obterClienteSemVenda();
    }
  }

  async function obterClienteSemVenda(): Promise<void> {
    const db = await openDB<PgamobileDB>('pgamobile', versao);

    const transaction = db.transaction('clienteSemVenda', 'readonly');
    const store = transaction.objectStore('clienteSemVenda');

    try {
      const vendaMesData = await store.getAll();
      const primeiroItem = vendaMesData[0];
      const valor = primeiroItem.valor;

      localStorage.setItem('@Portal/dash/ClientesSemVenda', valor.toString());

      SucessOff();
    } catch (error) {
      console.error('Erro ao obter valores da tabela clienteSemVenda:', error);
      SucessOff();
    }
  }
  async function deleteIndexedDBDelete() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase('pgamobileDelete');

      request.onsuccess = () => {
        resolve();
        window.location.reload();
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
        window.location.reload();
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

  function SucessOff() {
    setSucess(100);
    history('/espaco-colaborador');
  }

  //=============função criar usuario do indexdDB ===============

  async function inserirUsuario(usuario: {
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
  }) {
    const { password, ...usuarioSemSenha } = usuario;
    console.log(
      'Entrou no salvar usuário banco offline...................................................'
    );

    const usuarioSemHash = {
      ...usuarioSemSenha,
      password: password,
    };

    const db = await openDB<PgamobileDB>('pgamobile', versao)
      .then((db) => {
        const transaction = db.transaction('usuario', 'readwrite');
        const store = transaction.objectStore('usuario');

        store
          .clear()
          .then(() => {
            store
              .add(usuarioSemHash)
              .then(() => {
                transaction.done
                  .then(() => {
                    console.log('Usuário inserido com sucesso');
                  })
                  .catch((err) => {
                    console.error('Erro ao finalizar a transação', err);
                  });
              })
              .catch((err) => {
                console.error('Erro ao adicionar o usuário', err);
              });
          })
          .catch((err) => {
            console.error('Erro ao limpar os registros', err);
          });
      })
      .catch((err) => {
        console.error('Erro ao abrir o banco de dados', err);
      });
  }

  //========= função popular grafico ============================
  interface iGrafico {
    id?: number;
    Mes: string;
    AnoAtual: number;
    AnoAnterior: number;
  }
  async function popularGrafico(graficos: iGrafico[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('grafico', 'readwrite');
    const store = transaction.objectStore('grafico');

    await store.clear();

    for (const grafico of graficos) {
      await store.add(grafico);
    }

    await transaction.done;
  }

  //==== função popular valor Ano anterior ===========================
  interface ValorAnterior {
    id?: number;
    valor: number;
  }

  async function popularValorAnterior(valor: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorAnterior', 'readwrite');
    const store = transaction.objectStore('valorAnterior');

    await store.clear();

    await store.add(valor);

    await transaction.done;
  }

  //==========função popular valor ano Atual ===================
  async function popularValorAtual(valor: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorAtual', 'readwrite');
    const store = transaction.objectStore('valorAtual');

    await store.clear();

    await store.add(valor);

    await transaction.done;
  }

  //==========função popular Venda X Meta ===================
  interface VendaMeta {
    id: number;
    month: string;
    meta: number;
    actual: number;
    color: string;
  }

  async function PopularVendaMeta(vendaMetas: VendaMeta[]) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('vendaMeta', 'readwrite');
    const store = transaction.objectStore('vendaMeta');

    await store.clear();

    for (const vendaMeta of vendaMetas) {
      await store.add(vendaMeta);
    }

    await transaction.done;
  }
  //==========função popular meta Mes ===================
  interface MetaMes {
    id?: number;
    valor: number;
  }

  async function popularMetaMes(meta: MetaMes) {
    console.log('valor de entrada da meta...................', meta);
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('metaMes', 'readwrite');
    const store = transaction.objectStore('metaMes');

    await store.clear();

    await store.add(meta);

    await transaction.done;
  }

  //==========função popular venda Mes ===================
  interface VendaMes {
    id?: number;
    valor: number;
  }
  async function popularVendaMes(venda: VendaMes) {
    console.log('valor de entrada da venda...................', venda);
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('vendaMes', 'readwrite');
    const store = transaction.objectStore('vendaMes');

    await store.clear();

    await store.add(venda);

    await transaction.done;
  }

  //==========função popular quantPopular ===================
  async function popularQuantFaturar(faturar: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('quantFaturar', 'readwrite');
    const store = transaction.objectStore('quantFaturar');

    await store.clear();

    await store.add(faturar);

    await transaction.done;
  }

  //==========função popular quantPopular ===================
  async function popularValorFaturar(valorfaturar: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorFaturar', 'readwrite');
    const store = transaction.objectStore('valorFaturar');

    await store.clear();

    await store.add(valorfaturar);

    await transaction.done;
  }

  //==========função popular quantPedidos ===================
  async function popularQuantPedidos(pedidos: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('quantPedidos', 'readwrite');
    const store = transaction.objectStore('quantPedidos');

    await store.clear();

    await store.add(pedidos);

    await transaction.done;
  }

  //==========função popular quantPedidos ===================
  async function popularvalorPedido(valorPedidos: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorPedidos', 'readwrite');
    const store = transaction.objectStore('valorPedidos');

    await store.clear();

    await store.add(valorPedidos);

    await transaction.done;
  }

  //==========função popular valor Pedidos orcamento ===================
  async function popularvalorPedidoOcamento(
    valorPedidoOrcamento: ValorAnterior
  ) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorPedidoOrcamento', 'readwrite');
    const store = transaction.objectStore('valorPedidoOrcamento');

    await store.clear();

    await store.add(valorPedidoOrcamento);

    await transaction.done;
  }

  //==========função popular quant Pedidos Orcamento ===================
  async function popularQuantPedidoOrcamento(
    valorPedidoOrcamento: ValorAnterior
  ) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('quantPedidoOrcamento', 'readwrite');
    const store = transaction.objectStore('quantPedidoOrcamento');

    await store.clear();

    await store.add(valorPedidoOrcamento);

    await transaction.done;
  }

  //==========função popular quant valor total ano ===================
  async function popularValorTotalAno(valorTotalAno: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('valorTotalAno', 'readwrite');
    const store = transaction.objectStore('valorTotalAno');

    await store.clear();

    await store.add(valorTotalAno);

    await transaction.done;
  }

  //==========função popular quant valor total ano ===================
  async function popularClienteSemVenda(clienteSemVenda: ValorAnterior) {
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('clienteSemVenda', 'readwrite');
    const store = transaction.objectStore('clienteSemVenda');

    await store.clear();

    await store.add(clienteSemVenda);

    await transaction.done;
  }
  //===========permissoes por usuario ====================================================//
  async function GetUsuarioId(userId: any) {
    const usuario: iDadosUsuario = JSON.parse(
      localStorage.getItem('@Portal/usuario') || '{}'
    );

    console.log('id usuario', usuario.id);
    console.log('grupo id', usuario.grupoId);
    await api

      .get(`/api/Usuario/${userId}`)
      .then((response) => {
        localStorage.setItem(
          '@Portal/usuarioPermissaoMenu',
          JSON.stringify(response.data.menuPermissao)
        );
        localStorage.setItem(
          '@Portal/usuarioPermissaoSubMenu',
          JSON.stringify(response.data.subMenuPermissao)
        );

        localStorage.setItem(
          '@Portal/usuarioPermissaoPagina',
          JSON.stringify(response.data.paginaPermissao)
        );
        popularusuarioPermissaoMenu(response.data.menuPermissao);
        popularusuarioPermissaoPagina(response.data.paginaPermissao);
        setSucess(60);
        if (response.data.tempoSessao === undefined) {
          const tempoSessao = 0;
          console.log('tempo de sessão usuario', tempoSessao);
          GetgrupoUsuarioId(response.data.grupoId, tempoSessao);
        } else {
          const tempoSessao = response.data.tempoSessao;
          console.log('tempo de sessão usuario', tempoSessao);
          GetgrupoUsuarioId(response.data.grupoId, tempoSessao);
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetgrupoUsuarioId(grupoId: any, tempoSessaoUser: number) {
    await api

      .get(`/api/GrupoUsuario/${grupoId}`)
      .then((response) => {
        localStorage.setItem(
          '@Portal/grupoPermissaoMenu',
          JSON.stringify(response.data.menuPermissao)
        );
        localStorage.setItem(
          '@Portal/grupoPermissaoSubMenu',
          JSON.stringify(response.data.subMenuPermissao)
        );
        localStorage.setItem(
          '@Portal/grupoPermissaoPagina',
          JSON.stringify(response.data.paginaPermissao)
        );
        populargrupoPermissaoMenu(response.data.menuPermissao);
        populargrupoPermissaoPagina(response.data.paginaPermissao);
        if (response.data.tempoSessao === undefined) {
          const tempoSessao = 0;
          console.log('tempo de sessão grupo de usuario', tempoSessao);
          if (tempoSessao || tempoSessaoUser > 0) {
            if (tempoSessao > tempoSessaoUser) {
              localStorage.setItem('@Portal/TempoSessao', String(tempoSessao));
            } else {
              localStorage.setItem(
                '@Portal/TempoSessao',
                String(tempoSessaoUser)
              );
            }
          }
        } else {
          const tempoSessao = response.data.tempoSessao;
          console.log('tempo de sessão grupo de usuario', tempoSessao);
          if (tempoSessao || tempoSessaoUser > 0) {
            if (tempoSessao > tempoSessaoUser) {
              localStorage.setItem('@Portal/TempoSessao', String(tempoSessao));
            } else {
              localStorage.setItem(
                '@Portal/TempoSessao',
                String(tempoSessaoUser)
              );
            }
          }
        }

        setSucess(90);
        if (usuario.grupoId == 2) {
          setTimeout(function () {
            history('/espaco-colaborador');
          }, 5000);
        } else {
          setTimeout(function () {
            history('/espaco-colaborador');
          }, 5000);
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
    Logar();
  }

  //===========pupular permissao menu usuario ==================
  interface usuarioPermissaoMenu {
    id: number;
    codigo: number;
    nome: string;
    paginaPermissao: [
      {
        id: number;
        codigo: number;
        nome: string;
        menuPermissaoId: number;
        subMenuPermissaoId?: number;
        usuarioId: number;
      }
    ];
    usuarioId: number;
  }

  async function popularusuarioPermissaoMenu(meta: usuarioPermissaoMenu) {
    console.log('valor de entrada da meta...................', meta);
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('usuarioPermissaoMenu', 'readwrite');
    const store = transaction.objectStore('usuarioPermissaoMenu');

    await store.clear();

    await store.add(meta);

    await transaction.done;
  }

  //===========pupular permissao Pagina usuario ==================
  interface usuarioPermissaoPagina {
    id: number;
    codigo: number;
    nome: string;
    menuPermissaoId: number;
    subMenuPermissaoId?: number;
    usuarioId: number;
  }

  async function popularusuarioPermissaoPagina(meta: usuarioPermissaoPagina) {
    console.log('valor de entrada da meta...................', meta);
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('usuarioPermissaoPagina', 'readwrite');
    const store = transaction.objectStore('usuarioPermissaoPagina');

    await store.clear();

    await store.add(meta);

    await transaction.done;
  }

  //===========pupular permissao menu grupo ==================
  interface grupoPermissaoMenu {
    id: number;
    codigo: number;
    nome: string;
    paginaPermissao: [
      {
        id: number;
        codigo: number;
        nome: string;
        menuPermissaoId: number;
        subMenuPermissaoId?: number;
        grupoUsuarioId: number;
      }
    ];
    grupoUsuarioId: number;
  }

  async function populargrupoPermissaoMenu(meta: grupoPermissaoMenu) {
    console.log('valor de entrada da meta...................', meta);
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('grupoPermissaoMenu', 'readwrite');
    const store = transaction.objectStore('grupoPermissaoMenu');

    await store.clear();

    await store.add(meta);

    await transaction.done;
  }

  //===========pupular permissao Pagina grupo ==================
  interface grupoPermissaoPagina {
    id: number;
    codigo: number;
    nome: string;
    menuPermissaoId: number;
    subMenuPermissaoId?: number;
    grupoUsuarioId: number;
  }

  async function populargrupoPermissaoPagina(meta: grupoPermissaoPagina) {
    console.log('valor de entrada da meta...................', meta);
    await criarBancoDados();
    const db = await openDB<PgamobileDB>('pgamobile', versao);
    const transaction = db.transaction('grupoPermissaoPagina', 'readwrite');
    const store = transaction.objectStore('grupoPermissaoPagina');

    await store.clear();

    await store.add(meta);

    await transaction.done;
  }

  async function LoginSankhyaDashAdmin() {
    try {
      await DadosMetaMesValorMesAdmin();
    } catch (error) {
      console.log('erro', error);
    }
  }
  //==========================================================================================

  async function DadosMetaMesValorMesAdmin() {
    const codVen = user;
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
      .post(`/api/Sankhya/DadosDashSankhya?sql=${sql}`)
      .then((response) => {
        console.log('meta de vendas', response.data.responseBody.rows[0]?.[1]);

        if (response.data.responseBody.rows[0]?.[1] != undefined) {
          localStorage.setItem(
            '@Portal/dash/metaMes',
            response.data.responseBody.rows[0]?.[1]
          );
        } else {
          localStorage.setItem('@Portal/dash/metaMes', '0');
        }
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
        if (response.data.responseBody.rows[0]?.[2] != undefined) {
          localStorage.setItem(
            '@Portal/dash/vendaMes',
            response.data.responseBody.rows[0]?.[2]
          );
        } else {
          localStorage.setItem('@Portal/dash/vendaMes', '0');
        }

        DadosGraficoAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //==============================================================================================

  async function DadosGraficoAdmin() {
    const codVen2 = user;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
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

        localStorage.setItem(
          '@Portal/dash/valorTotalAno',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/graficoTotal',
          JSON.stringify(dadosArray)
        );

        const vlanoAnteriorArray = dadosArray.map(
          (item: any) => item.AnoAnterior
        );
        const vlanoAtualArray = dadosArray.map((item: any) => item.AnoAtual);

        localStorage.setItem(
          '@Portal/dash/ValorAnterior',
          JSON.stringify(vlanoAnteriorArray)
        );

        localStorage.setItem(
          '@Portal/dash/ValorAtual',
          JSON.stringify(vlanoAtualArray)
        );
        localStorage.setItem(
          '@Portal/dash/valorAtualCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/valorAnteriorCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAnterior,
            0
          )
        );

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

        atualizarConstantes();
        DadosGraficoVendasxMetaAdmin();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  //==============================================================================================

  async function DadosGraficoVendasxMetaAdmin() {
    const codVen2 = user;
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano atual', anoAtual);

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20MET.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20MET.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20MET.VLRMET%20VLRMET%20%09%2C%20ISNULL%28VEN.VLRVEN%2C0%29%20VLRVEN%20%09%2C%20CASE%20WHEN%20MET.VLRMET%20%3E%20VEN.VLRVEN%20THEN%20%27RED%27%20ELSE%20CASE%20WHEN%20MET.VLRMET%20%3D%200%20THEN%20%27GREY%27%20ELSE%20%27GREEN%27%20END%20END%20COLOR%20%20FROM%20%28%20%09SELECT%20MONTH%28MET.DTREF%29%20MES%2C%20SUM%28MET.PREVREC%29%20VLRMET%20%09FROM%20TGFMET%20MET%20%28NOLOCK%29%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20MET.CODVEND%20%09LEFT%20JOIN%20TGFVEN%20GER%20%28NOLOCK%29%20ON%20GER.CODVEND%20%3D%20VDO.CODGER%20%09WHERE%20YEAR%28MET.DTREF%29%20%3D%20${anoAtual}%20%09GROUP%20BY%20MONTH%28MET.DTREF%29%20%29%20MET%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20GROUP%20BY%20MES%20%29%20VEN%20ON%20VEN.MES%20%3D%20MET.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('vendas x metas', response);
        console.log('vendas x metas rows', response.data.responseBody.rows);

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            month: curr[1],
            meta: curr[2],
            actual: curr[3],
            color: curr[4],
          };
        });
        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.meta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.actual,
          0
        );
        localStorage.setItem('@Portal/dash/SomaMeta', String(somaMeta));
        localStorage.setItem('@Portal/dash/SomaVrlAtual', String(somaAtual));

        localStorage.setItem('@Portal/dash/VendaXmeta', JSON.stringify(result));

        DadosPedidoOrcamentoAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //===============================================================================================================================

  async function DadosPedidoOrcamentoAdmin() {
    const codVen2 = user;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3D%203000`
      )
      .then((response) => {
        console.log('pedidos e orçamento', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidoOrcamento',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidoOrcamento',
          response.data.responseBody.rows[0]?.[1]
        );
        DadosPedidoFaturarAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //=============================================================================================================

  async function DadosPedidoFaturarAdmin() {
    const codVen2 = user;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3C%3E%203000`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantFaturar',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorFaturar',
          response.data.responseBody.rows[0]?.[1]
        );

        DadosQuantidadePedidosAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //==================================================================================================

  async function DadosQuantidadePedidosAdmin() {
    const codVen2 = user;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidos',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidos',
          response.data.responseBody.rows[0]?.[1]
        );
        DadosClientesSemVendaAdmin();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //================================================================================================

  async function DadosClientesSemVendaAdmin() {
    const codVen2 = user;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28DISTINCT%20CODPAR%29%20as%20QTD%20FROM%20AD_VCLIENTES%20%20%20%20WHERE%20DTNEG%20%3C%3D%20%28GETDATE%28%29-90%29%20%20%20%20and%20GERCOD%20IN%20%2814725%2C%2014699%2C%2014749%29%20%20%20%20or%20codpar%20in%20%2814674%29`
      )
      .then((response) => {
        localStorage.setItem(
          '@Portal/dash/ClientesSemVenda',
          response.data.responseBody.rows[0]
        );
        atualizarConstantes();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }
  //=======Funções Sankhya Coordenador ======================================================
  async function LoginSankhyaDashCoordenador() {
    try {
      await DadosMetaMesValorMesCoordenador();
    } catch (error) {
      console.log('erro', error);
    }
  }

  function obterNumeroMesAtual(): number {
    const dataAtual = new Date();
    const numeroMes = dataAtual.getMonth() + 1;
    return numeroMes;
  }

  async function DadosMetaMesValorMesCoordenador() {
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('anoAtualOk', anoAtual);
    const codGer = user;
    const numeroMesAtual = obterNumeroMesAtual();
    console.log(`O número do mês atual é: ${numeroMesAtual}`);
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
    // const sql = `SELECT 	ISNULL(MET.CODGER, VEN.CODGER) CODGER,
    //           ISNULL(MET.NOMEGER, VEN.NOMEGER) NOMEGER,
    //           ISNULL(MET.VLRMET, 0) VLRMET,
    //           ISNULL(VEN.VLRVEN,0) VLRVEN,
    //           CASE WHEN MET.VLRMET > 0 THEN
    //             CASE WHEN VEN.VLRVEN / MET.VLRMET < 0.8 THEN 'RED'
    //               WHEN VEN.VLRVEN / MET.VLRMET >= 0.8 AND VEN.VLRVEN / MET.VLRMET < 1 THEN 'YELLOW'
    //               WHEN VEN.VLRVEN / MET.VLRMET >= 1 THEN 'GREEN'
    //             END
    //           ELSE
    //             'GREY'
    //           END COLOR
    //       FROM (
    //         SELECT VDO.CODGER, GER.APELIDO NOMEGER, SUM(MET.PREVREC) VLRMET
    //         FROM TGFMET MET (NOLOCK)
    //         LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
    //         LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
    //         WHERE YEAR(MET.DTREF) = YEAR(GETDATE())
    //         AND RIGHT('0' + CAST(MONTH(MET.DTREF) AS VARCHAR(2)), 1) = RIGHT('0' + CAST(MONTH(GETDATE()) AS VARCHAR(2)), 1)
    //         AND (VDO.CODGER = ${codGer} OR ${codGer} IS NULL)
    //         GROUP BY VDO.CODGER, GER.APELIDO
    //       ) MET
    //       FULL JOIN (
    //         SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, SUM(FIN) VLRVEN
    //         FROM AD_VVENDAS_CLI VEN
    //         WHERE VEN.ANO = YEAR(GETDATE())
    //         AND RIGHT('0' + CAST(VEN.MES AS VARCHAR(2)), 1) = RIGHT('0' + CAST(MONTH(GETDATE()) AS VARCHAR(2)), 1)
    //         AND (VEN.CODGER = ${codGer} OR ${codGer} IS NULL)
    //         GROUP BY VEN.CODGER, VEN.APELIDOG
    //       ) VEN ON VEN.CODGER = MET.CODGER
    //       ORDER BY 1,3
    //       `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('meta de vendas coordenador2', response.data);

        if (response.data.responseBody.rows[0]?.[2] != undefined) {
          localStorage.setItem(
            '@Portal/dash/metaMes',
            response.data.responseBody.rows[0]?.[2]
          );
        } else {
          localStorage.setItem('@Portal/dash/metaMes', '0');
        }
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
        if (response.data.responseBody.rows[0]?.[3] != undefined) {
          localStorage.setItem(
            '@Portal/dash/vendaMes',
            response.data.responseBody.rows[0]?.[3]
          );
        } else {
          localStorage.setItem('@Portal/dash/vendaMes', '0');
        }

        DadosMesAtualMesAnoPassadoCoordenador();
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function DadosMesAtualMesAnoPassadoCoordenador() {
    const codGer = usuario.username;
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
              WHERE YEAR(MET.DTREF) = YEAR(DATEADD(YEAR, -1, GETDATE()))
              AND MET.CODEMP <> 6 
              AND MET.CODVEND < 30000
              AND RIGHT('0' + CAST(MONTH(MET.DTREF) AS VARCHAR(2)), 1) = RIGHT('0' + CAST(MONTH(GETDATE()) AS VARCHAR(2)), 1) 
              AND (VDO.CODGER = ${codGer} OR ${codGer} IS NULL)
              GROUP BY VDO.CODGER, GER.APELIDO
            ) MET 
            FULL JOIN (
              SELECT VEN.CODGER, VEN.APELIDOG NOMEGER, SUM(FIN) VLRVEN
              FROM AD_VVENDAS_CLI VEN
              WHERE VEN.ANO = YEAR(DATEADD(YEAR, -1, GETDATE()))
              AND RIGHT('0' + CAST(VEN.MES AS VARCHAR(2)), 1) = RIGHT('0' + CAST(MONTH(GETDATE()) AS VARCHAR(2)), 1)
              AND (VEN.CODGER = ${codGer} OR ${codGer} IS NULL)
              GROUP BY VEN.CODGER, VEN.APELIDOG
            ) VEN ON VEN.CODGER = MET.CODGER
            ORDER BY 1,3
            `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log(
          'mes atual e mes ano anterior coordenador',
          response.data.responseBody.rows
        );

        localStorage.setItem(
          '@Portal/dash/valorTotalAnoAnterior',
          response.data.responseBody.rows[0]?.[3]
        );

        DadosGrafico();
      })
      .catch((error) => {
        console.log('erro ao receber dados coordenador', error);
      });
  }

  async function DadosGrafico() {
    const codGer = user;
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
        ORDER BY 1
      `;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('faturamento', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));

        localStorage.setItem(
          '@Portal/dash/graficoTotal',
          JSON.stringify(dadosArray)
        );

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

        DadosPedidoOrcamentoCoord();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }
  async function DadosPedidoOrcamentoCoord() {
    const codGer = user;
    const sql = `SELECT COUNT(DISTINCT PED.NUNOTA) AS QTDNOT,
    ROUND(SUM(PED.VLRPED) + SUM(PED.VLRBON), 2) AS VLRNOTA
    FROM AD_VPEDAFATURAR PED
    WHERE PED.CODTIPOPER = 3000
    AND PED.CODVEND IN (
    SELECT CODVEND
    FROM TGFVEN
    WHERE CODGER = ${codGer})`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('pedidos e orçamento', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidoOrcamento',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidoOrcamento',
          response.data.responseBody.rows[0]?.[1]
        );
        DadosPedidoFaturarCoord();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //=============================================================================================================

  async function DadosPedidoFaturarCoord() {
    const codGer = user;
    const sql = `SELECT COUNT(distinct NUNOTA) AS QTDNOT
          , ROUND(SUM(VLRPED) + SUM(VLRBON),2) AS VLRNOTA	
        FROM AD_VPEDAFATURAR PED
      WHERE PED.CODTIPOPER <> 3000
      AND PED.CODVEND IN (
        SELECT CODVEND
        FROM TGFVEN
        WHERE CODGER = ${codGer})`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantFaturar',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorFaturar',
          response.data.responseBody.rows[0]?.[1]
        );

        DadosQuantidadePedidosCoord();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //==================================================================================================

  async function DadosQuantidadePedidosCoord() {
    const codGer = user;
    const sql = `SELECT COUNT(distinct NUNOTA) AS QTDNOT
      , ROUND(SUM(VLRPED) + SUM(VLRBON),2) AS VLRNOTA	
    FROM AD_VPEDAFATURAR PED
    WHERE PED.CODVEND IN (
    SELECT CODVEND
    FROM TGFVEN
    WHERE CODGER = ${codGer})`;
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidos',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidos',
          response.data.responseBody.rows[0]?.[1]
        );

        atualizarConstantes();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //=======Funções Sankhya Representante ============================================================

  async function LoginSankhyaDashRepresentante() {
    try {
      await DadosMetaMesValorMesRepresentante();
    } catch (error) {
      console.log('erro', error);
    }
  }
  //====================================================================================

  async function DadosMetaMesValorMesRepresentante() {
    const codVen = user;
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
      .post(`/api/Sankhya/DadosDashSankhya?sql=${sql}`)
      .then((response) => {
        console.log('meta de vendas', response.data.responseBody.rows);

        if (response.data.responseBody.rows[0]?.[1] != undefined) {
          localStorage.setItem(
            '@Portal/dash/metaMes',
            response.data.responseBody.rows[0]?.[1]
          );
        } else {
          localStorage.setItem('@Portal/dash/metaMes', '0');
        }
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
        if (response.data.responseBody.rows[0]?.[2] != undefined) {
          localStorage.setItem(
            '@Portal/dash/vendaMes',
            response.data.responseBody.rows[0]?.[2]
          );
        } else {
          localStorage.setItem('@Portal/dash/vendaMes', '0');
        }

        DadosGraficoRepresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //==============================================================================

  async function DadosGraficoRepresentante() {
    const codVen2 = user;
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const anoAnterior = lastYear.getFullYear();
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano anterior', anoAnterior);
    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20ANT.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20ANT.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20ANT.VLRVEN%20VLRANT%20%09%2C%20ISNULL%28ATU.VLRVEN%2C0%29%20VLRATU%20%09%20%20FROM%20%28%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAnterior}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20ANT%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20ATU%20ON%20ATU.MES%20%3D%20ANT.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('faturamento', response);
        //=======================================================

        const dadosArray = response.data.responseBody.rows.map((item: any) => ({
          Mes: item[1],
          AnoAtual: item[3],
          AnoAnterior: item[2],
        }));

        localStorage.setItem(
          '@Portal/dash/valorTotalAno',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/graficoTotal',
          JSON.stringify(dadosArray)
        );

        const vlanoAnteriorArray = dadosArray.map(
          (item: any) => item.AnoAnterior
        );
        const vlanoAtualArray = dadosArray.map((item: any) => item.AnoAtual);

        localStorage.setItem(
          '@Portal/dash/ValorAnterior',
          JSON.stringify(vlanoAnteriorArray)
        );

        localStorage.setItem(
          '@Portal/dash/ValorAtual',
          JSON.stringify(vlanoAtualArray)
        );

        localStorage.setItem(
          '@Portal/dash/valorAtualCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAtual,
            0
          )
        );

        localStorage.setItem(
          '@Portal/dash/valorAnteriorCoord',
          dadosArray.reduce(
            (accumulator: any, item: any) => accumulator + item.AnoAnterior,
            0
          )
        );
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

        atualizarConstantes();
        DadosGraficoVendasxMetaRepresentante();
      })
      .catch((error) => {
        console.log('erro dados grafico', error);
      });
  }

  //=====================================================================

  async function DadosGraficoVendasxMetaRepresentante() {
    const codVen2 = user;
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    console.log('ano atual', anoAtual);

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20MET.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20MET.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20MET.VLRMET%20VLRMET%20%09%2C%20ISNULL%28VEN.VLRVEN%2C0%29%20VLRVEN%20%09%2C%20CASE%20WHEN%20MET.VLRMET%20%3E%20VEN.VLRVEN%20THEN%20%27RED%27%20ELSE%20CASE%20WHEN%20MET.VLRMET%20%3D%200%20THEN%20%27GREY%27%20ELSE%20%27GREEN%27%20END%20END%20COLOR%20%20FROM%20%28%20%09SELECT%20MONTH%28MET.DTREF%29%20MES%2C%20SUM%28MET.PREVREC%29%20VLRMET%20%09FROM%20TGFMET%20MET%20%28NOLOCK%29%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20MET.CODVEND%20%09LEFT%20JOIN%20TGFVEN%20GER%20%28NOLOCK%29%20ON%20GER.CODVEND%20%3D%20VDO.CODGER%20%09WHERE%20YEAR%28MET.DTREF%29%20%3D%20${anoAtual}%20%09AND%20%28VDO.CODVEND%20%3D%20${codVen2}%20%29%20%09GROUP%20BY%20MONTH%28MET.DTREF%29%20%29%20MET%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20VEN%20ON%20VEN.MES%20%3D%20MET.MES%20ORDER%20BY%201`
      )
      .then((response) => {
        console.log('vendas x metas', response);
        console.log('vendas x metas rows', response.data.responseBody.rows);

        const data = response.data.responseBody.rows;
        const result = data.map((curr: any) => {
          return {
            id: curr[0],
            month: curr[1],
            meta: curr[2],
            actual: curr[3],
            color: curr[4],
          };
        });
        const somaMeta = result.reduce(
          (acc: any, curr: any) => acc + curr.meta,
          0
        );
        const somaAtual = result.reduce(
          (acc: any, curr: any) => acc + curr.actual,
          0
        );
        localStorage.setItem('@Portal/dash/SomaMeta', String(somaMeta));
        localStorage.setItem('@Portal/dash/SomaVrlAtual', String(somaAtual));

        localStorage.setItem('@Portal/dash/VendaXmeta', JSON.stringify(result));
        DadosPedidoOrcamentoRepresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosPedidoOrcamentoRepresentante() {
    const codVen2 = user;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3D%203000%20AND%20CODVEND%20%3D${codVen2}`
      )
      .then((response) => {
        console.log('pedidos e orçamento', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidoOrcamento',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidoOrcamento',
          response.data.responseBody.rows[0]?.[1]
        );
        atualizaCartaoHome();
        DadosPedidoFaturarREpresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosPedidoFaturarREpresentante() {
    const codVen2 = user;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%09%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20FROM%20AD_VPEDAFATURAR%20PED%20WHERE%20PED.CODTIPOPER%20%3C%3E%203000%20%20AND%20CODVEND%20%3D${codVen2}`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantFaturar',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorFaturar',
          response.data.responseBody.rows[0]?.[1]
        );

        DadosQuantidadePedidosRepresentante();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //====================================================================================

  async function DadosQuantidadePedidosRepresentante() {
    const codVen2 = user;

    await api
      .post(
        `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%09%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20FROM%20AD_VPEDAFATURAR%20PED%20wHERE%20CODVEND%3D${codVen2}`
      )
      .then((response) => {
        console.log('pedidos a faturar', response);

        localStorage.setItem(
          '@Portal/dash/QuantPedidos',
          response.data.responseBody.rows[0]?.[0]
        );

        localStorage.setItem(
          '@Portal/dash/ValorPedidos',
          response.data.responseBody.rows[0]?.[1]
        );

        atualizarConstantes();
      })
      .catch((error) => {
        console.log('erro dados', error);
      });
  }

  //======================================================================================//

  async function VerificaPrimeirAcessoAdm() {
    await api

      .get(`/api/Usuario/userName?name=adm`)
      .then((response) => {
        if (response.data[0].primeiroLoginAdm == true) {
          EnviarEmail();
        } else {
          setUser('');
          user = '';
          setSenha('');
          senha = '';
          document.getElementById('user')?.focus();
          setAlertErro(true);
          setMsgErro('Usúario ou senha invalidos.');
          return;
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function EnviarEmail() {
    await api
      .post(`/api/Auth/forgot-password?email=nfe@grupoalyne.com.br`)
      .then((response) => {
        Redefinir(response.data);
      })
      .catch((error) => {
        setLoading(false);

        if (error.response?.status === 400) {
        }
      });
  }

  async function Redefinir(tokenres: any) {
    await api
      .post('/api/Auth/reset-password', {
        token: tokenres,
        password: 'Sync550v',
        confirmPassword: 'Sync550v',
      })
      .then((response) => {
        LoginAdm();
      })
      .catch((error) => {});
  }

  async function LoginAdm() {
    localStorage.getItem('@Portal/token-reset-now');
    localStorage.removeItem('@Portal/token-reset');
    await api
      .post('/api/Auth/login', {
        username: 'admin',
        password: 'Sync550v',
      })
      .then((response) => {
        localStorage.setItem('@Portal/usuario', JSON.stringify(response.data));
        editUser();
      })
      .catch((error) => {});
  }
  async function editUser() {
    await api
      .put(`/api/Usuario/${1}`, {
        id: 1,
        username: 'admin',
        nomeCompleto: 'Administrador Grupo Alyne',
        email: 'nfe@grupoalyne.com.br',
        telefone: '(85) 3521-8888',
        grupoId: 1,
        status: '1',
        funcao: 'Administrador do Sistema',
        imagemURL: '',
        primeiroLoginAdm: false,
      })
      .then((response) => {
        history('/espaco-colaborador');
      })
      .catch((error) => {});
  }

  //==========================================================//
  return (
    <>
      {loading2 ? (
        <div className="d-flex justify-content-center total-loading content-home2">
          <div className="alinharMod">
            <img id="logoSankhya" src={logoAlyne2} alt="" />
            <div>
              <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
              <h1 style={{ marginTop: 15 }}></h1>
              <ProgressBar className="progress" animated now={sucess2} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="content-home">
            <form className="content" onSubmit={Login}>
              <div className="content-banner">
                <img
                  className="content-banner-img"
                  src={LogoHome}
                  alt=""
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  onLoad={() => setLogoHomeReady(true)}
                  style={{
                    opacity: logoHomeReady ? 1 : 0,
                    transition: 'none',
                  }}
                />
              </div>
              <div className="bloco-login">
                <img
                  id="imgLoginDesk"
                  src={Logo}
                  alt=""
                  width={140}
                  style={{ marginBottom: 10 }}
                />
                <img
                  id="imgLoginMob"
                  src={LogoMob}
                  alt=""
                  width={250}
                  style={{ marginBottom: 20 }}
                />
                <div className="bloco-title">
                  <span
                    id="logoIdHome"
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                  >
                    LOGIN
                  </span>
                </div>
                {alertErro && (
                  <div className="mt-3 mb-0">
                    <Alert msg={msgErro} setAlertErro={setAlertErro} />
                  </div>
                )}
                <div style={{ marginBottom: 20 }} className="bloco-input">
                  <p className="labelform userHome">Usuario</p>
                  <input
                    className="form-coontrol  inputlogin2"
                    id="user"
                    type="text"
                    name="user"
                    value={user}
                    onKeyDown={LimparErro}
                    onChange={(e) => {
                      setUser(e.target.value.toLowerCase());
                    }}
                  />
                </div>
                <div className="bloco-input">
                  <p className="labelform userHome">Senha</p>
                  <input
                    className="form-coontrol  inputlogin2"
                    id="senha"
                    type="password"
                    name="password"
                    value={senha}
                    onKeyDown={(e) => {
                      LimparErro();
                      AtualizaCapsLock(e);
                    }}
                    onKeyUp={AtualizaCapsLock}
                    onFocus={AtualizaCapsLock}
                    onBlur={() => setCapsLockAtivo(false)}
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                  />
                  {capsLockAtivo && (
                    <p
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 6,
                        marginBottom: 0,
                      }}
                    >
                      Caps Lock está ativado
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  id="btn-login"
                  className="btn btn-entrar"
                  disabled={loading}
                >
                  {loading ? 'Carregando ' : 'Entrar '}
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <p className="center register-link">
                  <Link to="/recuperar-senha">
                    Esqueci minha senha <Si1Password />{' '}
                  </Link>
                </p>
                <div
                  style={{
                    marginTop: 10,
                    color:
                      typeof window !== 'undefined' && window.innerWidth <= 1280
                        ? '#f0f3fb'
                        : '#121213',
                  }}
                  className="versao"
                >
                  Versão: {localStorage.getItem('@Portal/VersaoDb') || versaoFront}
                </div>
              </div>
            </form>

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
                  <h1 style={{ marginTop: 15 }}>Efetuando login...</h1>
                  <h1 style={{ marginTop: 15 }}></h1>
                  <ProgressBar className="progress" animated now={sucess} />
                </div>
              </Modal.Body>
            </Modal>
            {/* //===================================modal loading offline ============================================ */}
            <Modal
              className="modalLoading"
              show={showloadingOff}
              onHide={handleCloseloadingOff}
              backdrop="static"
            >
              <Modal.Body>
                <div className="loadingModal">
                  <img id="logoSankhya" src={logoAlyne} alt="" />
                  <h1 style={{ marginTop: 15, color: 'red' }}>
                    Efetuando login offline...
                  </h1>
                  <h1 style={{ marginTop: 15 }}></h1>
                  <ProgressBar className="progress" animated now={sucess} />
                </div>
              </Modal.Body>
            </Modal>
          </div>
          
        </>
      )}
    </>
  );
}
