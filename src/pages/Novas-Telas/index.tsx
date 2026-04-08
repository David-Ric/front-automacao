import React, { useEffect, useState } from 'react';
import '../Vendedor/CadastroVendedores.scss';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../assets/ole-logo.png';
import PhotoUser from '../../assets/avatar1.png';
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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TfiNewWindow } from 'react-icons/tfi';
import {
  HiOutlineDocumentChartBar,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import { IColunasModulo, IModulo, iDataSelect, iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask } from '../../Masks/Masks';
import { FaIndustry, FaRegEye, FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iVendedores, iDadosUsuario } from '../../@types';
import { BiIdCard, BiMoney, BiSearchAlt } from 'react-icons/bi';
import Select from 'react-select';
import { FiCheckCircle, FiUsers } from 'react-icons/fi';
import { BsCoin, BsEyeSlash, BsNewspaper, BsSearch } from 'react-icons/bs';
import { ImNewspaper, ImUngroup } from 'react-icons/im';
import { TiShoppingCart } from 'react-icons/ti';
import { GrAddCircle, GrObjectUngroup } from 'react-icons/gr';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IoMdAddCircle } from 'react-icons/io';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';

export interface IOpcao {
  valor: string;
  opcao: string;
  nomeCampo: string;
  colunaModuloId?: number;
}

export interface IGetColuna {
  nome: string;
  tipo: string;
}
export interface IGetLigacao {
  campoLigacao: string;
  tabeaLigada: string;
  campoExibir: string;
}

export interface IColunasModulo2 {
  id?: string;
  nome: string;
  tipo: string;
  tipoInput: string;
  tabInput: string;
  valueTabInput: string;
  labelTabInput: string;
  expressao: string;
  chavePrimaria: boolean;
  automatico: boolean;
}

export default function CadastroTelas() {
  const history = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [vendedorId, setVendedorId] = useState(0);
  const [codVendedor, setCodVendedor] = useState('');
  const [nome, setNome] = useState('');
  const [ativo, setAtivo] = useState('');
  const [regiao, setRegiao] = useState('');
  const [email, setEmail] = useState('');
  const [sucess, setSucess] = useState(0);
  const [comiVenda, setComiVenda] = useState(0);
  const [comiGerencia, setComiGerencia] = useState(0);
  const [valor_hora, setValor_hora] = useState(0);
  const [formaComissao, setFormaComissao] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [gerenteId, setGerenteId] = useState('');
  const [gerente, setGerente] = useState('');
  const [parceiroId, setParceiroId] = useState('');
  const [parceiro, setParceiro] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [centroR_PadraoId, setCentroR_PadraoId] = useState('');
  const [centroR_Padrao, setCentroR_Padrao] = useState('');
  const [custoVariavel, setCustoVariavel] = useState(0);
  const [atuaComprador, setAtuaComprador] = useState(false);
  let [colunaId, setcolunaId] = useState(0);
  const [valorExpressao, setvalorExpressao] = useState(false);
  const [alterarOpcao, setalterarOpcao] = useState(false);
  const [tituloTela, settituloTela] = useState('');
  const [menuId, setmenuId] = useState(0);
  const [tabela, settabela] = useState('');
  const [metodoinsert, setmetodoinsert] = useState(false);
  const [metodoupdate, setmetodoupdate] = useState(false);
  const [metododelete, setmetododelete] = useState(false);
  const [filtro01, setfiltro01] = useState('');
  const [filtro02, setfiltro02] = useState('');
  const [filtro03, setfiltro03] = useState('');
  const [parametrosql, setparametrosql] = useState('');
  const [iconeMenu, seticoneMenu] = useState('');
  const [optionMenu, setoptionMenu] = useState<iDataSelect[]>([]);
  const [fechar, setfechar] = useState(true);
  const [adicionarCampos, setadicionarCampos] = useState(false);
  const [placeMenu, setplaceMenu] = useState('Escolha o Menu da tela');
  const [tabNav, setTabNav] = useState('dados');
  const [dados, setDados] = useState<iDataSelect[]>([]);
  const [camposTab, setcamposTab] = useState<iDataSelect[]>([]);
  let [moduloId, setmoduloId] = useState(0);
  const [chave, setchave] = useState(false);
  const [tipo, setTipo] = useState('integer');
  const [tipoInput, settipoInput] = useState('1');
  const [nomeCampo, setnomeCampo] = useState('');
  const [colunasTabela, setcolunasTabela] = useState<IColunasModulo[]>([]);
  const [comandoSql, setcomandoSql] = useState('');
  const [tabInput, settabInput] = useState('');
  const [valuetabInput, setvaluetabInput] = useState('');
  const [labeltabInput, setlabeltabInput] = useState('');
  const [expressao, setexpressao] = useState('');
  const [calculado, setcalculado] = useState(false);
  const [valor, setvalor] = useState('');
  const [opcao, setopcao] = useState('');
  const [acao, setacao] = useState('');
  const [opcoesCampo, setopcoesCampo] = useState<IOpcao[]>([]);
  const [respostaOpcao, setRespostaOpcao] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [modulos, setmodulos] = useState<IModulo[]>([]);
  let [vendedorGetId, setVendedorGetId] = useState<iVendedores[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  let [search, setSearch] = useState('');
  const [codSearch, setCodSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  const [chavePrimariaOk, setchavePrimariaOk] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaStatus, setPesquisaStatus] = useState(false);
  const [pesquisaCod, setPesquisaCod] = useState(false);
  const [existeChave, setexisteChave] = useState(true);
  const [pesParceiroNome, setPesParceiroNome] = useState(true);
  const [pesParceiroId, setPesParceiroId] = useState(false);
  const [pesGerenteNome, setPesGerenteNome] = useState(true);
  const [pesGerenteId, setPesGerenteId] = useState(false);
  const [pesFuncionarioNome, setPesFuncionarioNome] = useState(true);
  const [pesFuncionarioId, setPesFuncionarioId] = useState(false);
  const [pesEmpresaNome, setPesEmpresaNome] = useState(true);
  const [pesEmpresaId, setPesEmpresaId] = useState(false);
  const [erroCampo, seterroCampo] = useState(false);
  const [erroOpcao, seterroOpcao] = useState(false);
  const [checkboxMarcado, setcheckboxMarcado] = useState(false);
  const [opcoesExiste, setopcoesExiste] = useState(true);
  const [colunasTable, setcolunasTable] = useState<IGetColuna[]>([]);
  const [novaOpcao, setnovaOpcao] = useState(true);
  const handleCloseloading = () => setShowloading(false);
  const [showloading, setShowloading] = useState(true);
  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  function handleClose() {
    setShow(false);
    setadicionarCampos(false);
  }

  useEffect(() => {
    logado();
    GetMontarMenu();
    GetTabelasExistentes();
  }, []);

  function SairdoErro() {
    seterroCampo(false);
  }

  //=========criar array de opções ================================================
  function CriarOpcoes(event: any) {
    console.log('nome campo', nomeCampo);
    event.preventDefault();
    if (valor.trim() == '') {
      seterroOpcao(true);
      setRespostaOpcao('É obrigatório informar o valor!');
      return;
    }

    if (opcao.trim() == '') {
      seterroOpcao(true);
      setRespostaOpcao('É obrigatório informar a opção!');
      return;
    }

    const novoItem: IOpcao = {
      valor: valor,
      opcao: opcao,
      nomeCampo: nomeCampo,
    };
    setopcoesCampo([...opcoesCampo, novoItem]);
    console.log('Array deopcaoes', opcoesCampo);
    setvalor('');
    setopcao('');
  }

  function Deleteopcoes(valor: string) {
    const novoArrayOpcoes = opcoesCampo.filter((item) => item.valor !== valor);
    setopcoesCampo([...novoArrayOpcoes]);
  }
  useEffect(() => {
    if (checkboxMarcado && opcoesCampo.length > 0) {
      setcalculado(true);
    } else {
      setcalculado(false);
      setexpressao('');
      setopcoesExiste(false);
    }
  }, [checkboxMarcado, opcoesCampo]);

  async function DeleteOpcao(colunaoduloid: any, campo: any) {
    console.log('id', colunaoduloid, 'campo', campo);

    await api
      .delete(`/api/OpcaoCampo/colunaModulo/${colunaoduloid}/campo/${campo}`)
      .then((response) => {
        console.log('deletou opção');
      })
      .catch((error) => {
        console.log('não deletou opção');
      });
  }

  //================criar array de ligaçao tabela =================================
  const [arrayLigacao, setarrayLigacao] = useState<IGetLigacao[]>([]);
  const [campoLigado, setcampoLigado] = useState('');
  const [tabelaLigada, settabelaLigada] = useState('');
  const [campoexibir, setcampoexibir] = useState('');
  const [erroLigacao, seterroLigacao] = useState(false);
  let [automatico, setautomatico] = useState(false);
  const [erroLig, seterroLig] = useState('');
  const [idColuna, setidColuna] = useState('');

  async function CriarLigacao(event: any) {
    event.preventDefault();
    const campLigExistente = arrayLigacao.some(
      (campo) => campo?.campoLigacao === campoLigado
    );
    const tabelaExist = arrayLigacao.some(
      (campo) => campo?.tabeaLigada === tabelaLigada
    );
    const campoexibirExistente = arrayLigacao.some(
      (campo) => campo?.campoExibir === campoexibir
    );
    if (campoLigado.trim() == '') {
      seterroLigacao(true);

      seterroLig(`É necessario informar o campo de ligação`);
      return;
    }
    if (tabelaLigada.trim() == '') {
      seterroLigacao(true);

      seterroLig(`É necessario informar a tabela ligada`);
      return;
    }

    if (campLigExistente) {
      seterroLigacao(true);

      seterroLig(
        `ja existe ligação com o campo ${campoLigado}, nesta tabela. `
      );
      return;
    }
    if (campoexibirExistente && tabelaExist) {
      seterroLigacao(true);

      seterroLig(
        `O campo ${campoexibir}, ja esta sendo exibido nesta tabela. `
      );
      return;
    }

    const novoItem: IGetLigacao = {
      campoLigacao: campoLigado,
      tabeaLigada: tabelaLigada,
      campoExibir: campoexibir,
    };
    await setarrayLigacao([...arrayLigacao, novoItem]);
    console.log('Array de ligação', arrayLigacao);
    setcampoLigado('0');
    settabelaLigada('0');
    setcampoexibir('0');
  }

  function Deleteligacao(campoLigacao: string) {
    const novoArrayLigacao = arrayLigacao.filter(
      (item) => item.campoLigacao !== campoLigacao
    );
    setarrayLigacao([...novoArrayLigacao]);
  }
  function LimpaLigacao() {
    seterroLigacao(false);
  }
  //============= criar array de campos da tabela =================================

  function CriarCamposTabela(event: any) {
    event.preventDefault();
    setadicionarCampos(false);
    console.log('automatico no array', automatico);
    const novoItem: IColunasModulo = {
      id: Number(idColuna),
      nome: nomeCampo,
      tipo: tipo,
      tipoInput: tipoInput,
      tabInput: tabInput,
      valueTabInput: valuetabInput,
      labelTabInput: labeltabInput,
      expressao: expressao,
      chavePrimaria: chave,
      automatico: automatico,
    };

    const index = colunasTabela.findIndex((campo) => campo.nome === nomeCampo);
    if (index !== -1) {
      const itemExistente = colunasTabela[index];
      const itemAtualizado = { ...itemExistente, ...novoItem };
      const novasColunasTabela = [...colunasTabela];
      novasColunasTabela.splice(index, 1, itemAtualizado);
      setcolunasTabela(novasColunasTabela);
    } else {
      setcolunasTabela([...colunasTabela, novoItem]);
    }

    console.log('Array de pedidos', colunasTabela);
    setnomeCampo('');
    setTipo('integer');
    settipoInput('1');
    setchave(false);
    setcalculado(false);
    setautomatico(false);
    setexpressao('');
    setvalor('');
    setopcao('');
    setvalorExpressao(false);
    const colunasTable = colunasTabela.map((coluna) => ({
      nome: coluna.nome,
      tipo: coluna.tipo,
    }));

    setcolunasTable(colunasTable);
    console.log('column', colunasTabela);
    console.log('id editado', idColuna);
  }

  function Deletecoluna(nome: string) {
    const novoArrayPedido = colunasTabela.filter((item) => item.nome !== nome);
    setcolunasTabela([...novoArrayPedido]);
    const colunasTable = colunasTabela.map((coluna) => ({
      nome: coluna.nome,
      tipo: coluna.tipo,
    }));

    setcolunasTable(colunasTable);
    console.log('column', colunasTable);
  }

  useEffect(() => {
    const existeChavePrimaria = colunasTabela.some(
      (coluna) => coluna.chavePrimaria
    );
    setexisteChave(!existeChavePrimaria);
  }, [colunasTabela]);

  useEffect(() => {
    const colunasTable = colunasTabela.map((coluna) => ({
      nome: coluna.nome,
      tipo: coluna.tipo,
    }));
    setcolunasTable(colunasTable);
    console.log('column', colunasTable);
  }, [colunasTabela]);

  async function GetMontarMenu() {
    setFilter(false);

    await api
      .get(`/api/Menu?pagina=1&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data
            .filter((grupos: any) => grupos.id !== 1) // filtrar id diferente de 1
            .forEach((grupos: any) => {
              let rowGrupo: iDataSelect = {};
              rowGrupo.value = String(grupos.id);
              rowGrupo.label = grupos.nome;
              options.push(rowGrupo);
              setoptionMenu(options);
            });
          console.log('menu', options);
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  useEffect(() => {
    console.log('lista itens Tabela', camposTab);
  }, [camposTab]);

  async function GetTabelasExistentes() {
    setFilter(false);

    await api
      .get(`/api/CriarTabela`)
      .then((response) => {
        const dadosTemporarios = response.data.map((dado: string) => {
          return { value: dado, label: dado };
        });
        setDados(dadosTemporarios);
        console.log('lista de tabelas', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  async function DadosdaTabela(valor: any) {
    setFilter(false);

    await api
      .get(`/api/CriarTabela/${valor}`)
      .then((response) => {
        console.log('resposta itens', response.data);
        const itensTab = response.data.map((dado: any) => {
          return { value: dado.name, label: dado.name };
        });
        setcamposTab(itensTab);
        console.log('lista itens Tabela', camposTab);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  function logado() {
    if (!usuariolog.token) {
      history('/');
    }
  }

  useEffect(() => {
    setShowloading(true);

    window.scrollTo(0, 0);
    if (filter) {
      GetVendedoresFilter();
    } else {
      GetVendedores();
    }
  }, [pagina]);
  function handleShowMensage() {
    setShowMensage(true);
    setTimeout(function () {}, 1200);
  }

  function LimpaerroSenhaConfirm() {
    setAlertErroRegister(false);
    let senha: any;
    senha = document.getElementById('senha');
    senha.style.backgroundColor = '#ffff';
    let senhaconf: any;
    senhaconf = document.getElementById('confirma');
    senhaconf.style.backgroundColor = '#ffff';
    senhaconf.style.backgroundColor = '#ffff';
  }
  function LimparTodos() {
    setAlertErroRegister(false);
  }

  function handleShow() {
    setEdit(false);
    setnomeCampo('');
    setTipo('integer');
    settipoInput('1');
    setchave(false);
    setexisteChave(true);
    setadicionarCampos(false);
    setfechar(true);
    settituloTela('');
    settabela('');
    setmenuId(0);
    seticoneMenu('');
    setmetodoinsert(false);
    setmetodoupdate(false);
    setmetododelete(false);
    setShow(true);
    setfiltro01('');
    setfiltro02('');
    setfiltro03('');
    setcolunaId(0);
    setopcoesCampo([]);
    setcolunasTabela([]);
    setarrayLigacao([]);
    setcalculado(false);
    setplaceMenu('Escolha o Menu da tela');
  }
  //============get name opções==============================

  async function GetColunasId(colunaId: any) {
    console.log('nome campo', nomeCampo);
    setShowloading(true);
    setFilter(false);
    await api
      .get(`/api/OpcaoCampo/ByColunaModuloId/${colunaId}`)
      .then((response) => {
        console.log('lista de oções', response.data);
        setopcoesCampo([]);
        setopcoesCampo((prevOpcoesCampo: any) => {
          const newOpcoesCampo = prevOpcoesCampo.concat(response.data);

          return newOpcoesCampo;
          setEdit(true);
        });
        setShowloading(false);
        setadicionarCampos(true);
      })
      .catch((error) => {
        setShowloading(false);
        console.log('Ocorreu um erro');
      });
  }
  useEffect(() => {
    console.log('lista de opções vindo response', opcoesCampo);
  }, [opcoesCampo]);

  //=========================================================
  async function GetVendedores() {
    setFilter(false);
    setSucess(30);
    await api

      .get(`/api/Modulo?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setmodulos(response.data.data);
        modulos = response.data.data;
        console.log('modulos', modulos);
        setSucess(80);
        setShowloading(false);
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setSucess(80);
        setShowloading(false);
      });
  }

  async function GetVendedoresFilter() {
    setFilter(true);
    setSucess(30);

    await api
      .get(
        `/api/Modulo/filter?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
      )
      .then((response) => {
        setmodulos(response.data.data);
        modulos = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        console.log('usuarios pesquisa cod', response.data.data);
        console.log('total vendedores', response.data);
        setSucess(80);
        setShowloading(false);
      })
      .catch((error) => {
        setSucess(80);
        setShowloading(false);
        console.log('Ocorreu um erro');
      });
  }

  function ShowModalEdit() {
    setShowEdit(true);
  }
  //================coluna modulo nome================================//

  async function GetColunaModuloId(nome: any) {
    setEdit(true);

    await api
      .get(`/api/ColunaModulo/${nome}`)
      .then((response) => {
        console.log('modulo Id', response.data);
        setnomeCampo(response.data.nome);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetColunaModuloId2(nome: any) {
    setEdit(true);
    setexpressao('');
    setautomatico(false);
    automatico = false;
    await api
      .get(`/api/ColunaModulo/${nome}`)
      .then((response) => {
        console.log('coluna selecionada', response.data);
        setnomeCampo(response.data.nome);
        setTipo(response.data.tipo);
        setautomatico(response.data.automatico);
        automatico = response.data.automatico;
        console.log('resposta automatico get', response.data.automatico);
        settipoInput(response.data.tipoInput);
        setexpressao(response.data.expressao);
        console.log('expressao', response.data.expressao);
        if (response.data.chavePrimaria == true) {
          setchave(true);
          setchavePrimariaOk(true);
        } else {
          setchave(false);
          setchavePrimariaOk(false);
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=========== get usuarios por ID ==================================//
  async function GetModuloId(id: any) {
    setEdit(true);

    await api
      .get(`/api/Modulo/${id}`)
      .then((response) => {
        setmoduloId(response.data.id);
        moduloId = response.data.id;
        setmenuId(response.data.menuId);
        settituloTela(response.data.descricao);
        settabela(response.data.tabela);
        setcomandoSql(response.data.getSql);
        setmetodoinsert(response.data.insert);
        setmetodoupdate(response.data.update);
        setmetododelete(response.data.delete);
        setfiltro01(response.data.filtro1);
        setfiltro02(response.data.filtro2);
        setfiltro03(response.data.filtro3);
        seticoneMenu(response.data.icone);

        if (response.data.menuId == 2) {
          setplaceMenu('Cadastros');
        }
        if (response.data.menuId == 3) {
          setplaceMenu('Movimentos');
        }
        if (response.data.menuId == 4) {
          setplaceMenu('Consultas');
        }
        if (response.data.menuId == 5) {
          setplaceMenu('Outros');
        }
        if (response.data.menuId == 10) {
          setplaceMenu('Configurações');
        }
        setShow(true);
        console.log('modulo Id', response.data);
        console.group('colunas do modulo', response.data.colunaModulo);
        setcolunasTabela(response.data.colunaModulo);
        GetLigacaoModuloId();
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============================================================

  async function GetLigacaoModuloId() {
    setEdit(true);
    setarrayLigacao([]);
    await api
      .get(
        `/api/LigacaoTabela/ModuloId?pagina=1&totalpagina=999&ModuloId=${moduloId}`
      )
      .then((response) => {
        console.log('ligações', response.data.data);
        setarrayLigacao(response.data.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //============ Editar Usuario ===============================//
  async function editeVendedor() {
    console.log('id', vendedorGetId);
    setLoadingUpdate(true);
    await api
      .put(`/api/Vendedor/${vendedorGetId}`, {
        id: vendedorGetId,
        nome: nome,
        status: ativo,
        regiao: regiao,
        comissao_Vendas: comiVenda,
        comissao_Gerencia: comiGerencia,
        vrl_hr_Comi_OS: valor_hora,
        form_Comissao: formaComissao,
        cargaHora: cargaHoraria,
        empresa: empresa,
        gerenteId: gerenteId,
        gerenteNome: gerente,
        parceiroId: parceiroId,
        parceiroNome: parceiro,
        funcionarioId: funcionarioId,
        funcionarioNome: funcionario,
        centroR_PadraoID: centroR_PadraoId,
        centroR_PadraoDesc: centroR_Padrao,
        custo_Variavel: custoVariavel,
        email: email,
        tipo: tipo,
        atuaCompras: atuaComprador,
      })
      .then((response) => {
        handleCloseEdit();
        GetVendedores();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErro(true);
        setMsgErro('Dados do vendedor atualizados com sucesso.');
      })
      .catch((error) => {
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);

        const { data } = error.response;
        setMsgErro(data.message);

        return;
      });
  }

  async function ModuloUpdate() {
    setLoadingCreate(true);

    const novoArray = [...colunasTabela];

    const index = novoArray.findIndex((item) => item.chavePrimaria === true);
    if (index !== -1) {
      const chavePrimaria = novoArray[index];
      novoArray.splice(index, 1);
      novoArray.unshift(chavePrimaria);
    }

    const existeChavePrimaria = novoArray.some((item) => item.chavePrimaria);

    if (!existeChavePrimaria) {
      novoArray.unshift({
        nome: 'id',
        tipo: 'integer',
        tipoInput: '1',
        chavePrimaria: true,
        tabInput: '',
        valueTabInput: '',
        labelTabInput: '',
        expressao: '',
        automatico: true,
      });
    }

    const columns = novoArray.map(({ nome, tipo, chavePrimaria }) => ({
      name: nome,
      type: tipo,
      primaryKey: String(chavePrimaria),
    }));

    await api
      .post(`/api/CriarTabela/${tabela}/update`, columns)
      .then((response) => {
        console.log('criar tabela', response.data);
      })
      .catch((error) => {
        console.error(error);
        console.log('Erro ao criar tabela!');
      });
    ModuloUpdate2();
  }
  //=======================Editar Modulo======================//
  async function ModuloUpdate2() {
    setadicionarCampos(false);
    if (tituloTela.trim() == '') {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o titulo da tela.');
      return;
    }
    if (tabela.trim() == '') {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o nome da tabela a ser criada.');
      return;
    }
    if (menuId == 0) {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o menu ao qual pertencerá a tela');
      return;
    }
    if (iconeMenu == '') {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o icone da pagina do menu novo');
      return;
    }
    if (colunasTabela.length <= 0) {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório criar os campos da nova tabela');
      return;
    }

    setLoadingCreate(true);
    await api
      .put(`/api/Modulo/${moduloId}`, {
        id: moduloId,
        menuAdminId: 1,
        subMenuAdminId: menuId - 1,
        menuId: menuId,
        descricao: tituloTela,
        tabela: tabela,
        getSql: comandoSql,
        insert: metodoinsert,
        update: metodoupdate,
        delete: metododelete,
        icone: iconeMenu,
        filtro1: filtro01,
        filtro2: filtro02,
        filtro3: filtro03,
      })

      .then((response) => {
        setLoadingCreate(false);

        CreateCamposModulo(moduloId);
      })
      .catch((error) => {
        setLoadingCreate(false);
        window.scrollTo(0, 0);
        console.log(error.response);
        handleShowMensage();
        setAlertErroMensage(true);
        const data = error.response.data;
        setMsgErro(data);
        return;
      });
  }

  //============ Criar Usuario ===============================//

  async function CreateModulo() {
    setLoadingCreate(true);

    const novoArray = [...colunasTabela];

    const index = novoArray.findIndex((item) => item.chavePrimaria === true);
    if (index !== -1) {
      const chavePrimaria = novoArray[index];
      novoArray.splice(index, 1);
      novoArray.unshift(chavePrimaria);
    }

    const existeChavePrimaria = novoArray.some((item) => item.chavePrimaria);

    if (!existeChavePrimaria) {
      novoArray.unshift({
        nome: 'id',
        tipo: 'integer',
        tipoInput: '1',
        chavePrimaria: true,
        tabInput: '',
        valueTabInput: '',
        labelTabInput: '',
        expressao: '',
        automatico: true,
      });
    }

    const columns = novoArray.map(({ nome, tipo, chavePrimaria }) => ({
      name: nome,
      type: tipo,
      primaryKey: String(chavePrimaria),
    }));

    await api
      .post(`/api/CriarTabela/${tabela}`, columns)
      .then((response) => {
        setLoadingCreate(false);
        console.log('criar tabela', response.data);
      })
      .catch((error) => {
        setLoadingCreate(false);
        console.error(error);
        console.log('Erro ao criar tabela!');
      });
    CreateModulo2();
  }

  let [moduloGetId, setmoduloGetId] = useState(0);
  async function CreateModulo2() {
    setadicionarCampos(false);
    if (tituloTela.trim() == '') {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o titulo da tela.');
      return;
    }
    if (tabela.trim() == '') {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o nome da tabela a ser criada.');
      return;
    }
    if (menuId == 0) {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o menu ao qual pertencerá a tela');
      return;
    }
    if (iconeMenu == '') {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório informar o icone da pagina do menu novo');
      return;
    }
    if (colunasTabela.length <= 0) {
      setShowMensage(true);
      setAlertErro(true);
      setMsgErro('É obrigatório criar os campos da nova tabela');
      return;
    }

    setLoadingCreate(true);
    await api
      .post('/api/Modulo', {
        menuAdminId: 1,
        subMenuAdminId: menuId - 1,
        menuId: menuId,
        descricao: tituloTela,
        tabela: tabela,
        getSql: comandoSql,
        insert: metodoinsert,
        update: metodoupdate,
        delete: metododelete,
        icone: iconeMenu,
        filtro1: filtro01,
        filtro2: filtro02,
        filtro3: filtro03,
      })

      .then((response) => {
        setLoadingCreate(false);
        console.log('resposta do post', response.data);
        CreateCamposModulo(response.data.id);
        setmoduloGetId(response.data.id);
        moduloGetId = response.data.id;
        setmoduloId(response.data.id);
        moduloId = response.data.id;

        console.log('resposta salva', response.data.id);
      })
      .catch((error) => {
        setLoadingCreate(false);
        window.scrollTo(0, 0);
        console.log(error.response);
        handleShowMensage();
        setAlertErro(true);
        const data = error.response.data;
        setMsgErro(data);
        return;
      });
    setSearch('');
  }

  let [listaCamposOpcao, setlistaCamposOpcao] = useState<IColunasModulo[]>([]);
  //===========criar campos modulos ========================

  //=====================================================================

  async function CreateCamposModulo(ModuloId: any) {
    setLoadingCreate(true);

    console.log('como coluna chegou', colunasTabela);

    const novoArray = [...colunasTabela];

    const index = novoArray.findIndex((item) => item.chavePrimaria === true);
    if (index !== -1) {
      const chavePrimaria = novoArray[index];
      novoArray.splice(index, 1);
      novoArray.unshift(chavePrimaria);
    }

    const existeChavePrimaria = novoArray.some((item) => item.chavePrimaria);

    if (!existeChavePrimaria) {
      novoArray.unshift({
        nome: 'id',
        tipo: 'integer',
        tipoInput: '1',
        chavePrimaria: true,
        tabInput: '',
        valueTabInput: '',
        labelTabInput: '',
        expressao: '',
        automatico: true,
      });
    }

    const colunasTabelaComModuloId = novoArray.map((item) => ({
      id: item.id,
      nome: item.nome,
      tipo: item.tipo,
      tipoInput: item.tipoInput,
      tabInput: item.tabInput,
      valueTabInput: item.valueTabInput,
      labelTabInput: item.labelTabInput,
      chavePrimaria: item.chavePrimaria,
      automatico: item.automatico,
      expressao: item.expressao,
      moduloId: ModuloId,
    }));

    console.log(
      'ModuloId',
      ModuloId,
      'array a salvar',
      colunasTabelaComModuloId
    );

    await api
      .post(`/api/ColunaModulo/${ModuloId}`, colunasTabelaComModuloId)
      .then((response) => {
        console.log('colunas salvas', response.data.moduloList);
        setlistaCamposOpcao(response.data.moduloList);
        listaCamposOpcao = response.data.moduloList;
        CreateCamposOpcao();
      })
      .catch((error) => {
        console.log(error);
        setLoadingCreate(false);
      });
  }

  //===========criar lista de opçoes ========================

  async function CreateCamposOpcao() {
    console.log('opçõesssss', opcoesCampo);
    if (alterarOpcao) {
      console.log('lista de campos salva', listaCamposOpcao);
      const colunaModuloIds = listaCamposOpcao.map((campo) => campo.id);
      const opcoesComId = opcoesCampo.map((opcao) => {
        const campo = listaCamposOpcao.find((c) => c.nome === opcao.nomeCampo);
        return {
          ...opcao,
          colunaModuloId: campo?.id,
        };
      });
      await api
        .post('/api/OpcaoCampo', {
          colunaModuloIds,
          opcoesDto: opcoesComId,
        })
        .then((response) => {
          console.log('opções salvas', response.data);
          setalterarOpcao(false);
        })
        .catch((error) => {
          setLoadingCreate(false);
          setalterarOpcao(false);
          console.log(error);
        });
    } else {
      console.log('NÃO SALVOU AS OPÇÕES');
    }
    Createligacao();
  }

  async function Createligacao() {
    console.log('array criacao', arrayLigacao, 'id modulo', moduloId);

    const ligacoes = arrayLigacao.map((item) => ({
      ...item,
      ModuloId: moduloId,
    }));
    console.log('array com moduloId', ligacoes);
    await api
      .post(`/api/LigacaoTabela/${moduloId}`, ligacoes)
      .then((response) => {
        console.log('ligaçoes salvas', response.data);
      })
      .catch((error) => {
        setLoadingCreate(false);
        console.log(error);
        console.log('ligaçoes não salvou');
      });
    if (edit) {
      EditePaginaMenuadmin();
    } else {
      CreatePaginaMenuadmin();
    }
  }

  async function CreatePaginaMenuadmin() {
    await api
      .post('/api/Pagina', {
        nome: tituloTela,
        url: `/tela/${moduloId}`,
        icon: iconeMenu,
        menuId: 1,
        subMenuId: menuId - 1,
      })
      .then((response) => {
        CreatePaginaMenu();
      })
      .catch((error) => {
        setLoadingCreate(false);
        console.log('não salvou pagina do adim ');
        console.log(error);
      });
  }

  async function CreatePaginaMenu() {
    await api
      .post('/api/Pagina', {
        nome: tituloTela,
        url: `/tela/${moduloId}`,
        icon: iconeMenu,
        menuId: menuId,
      })
      .then((response) => {
        GetVendedores();
        handleClose();
        handleShowMensage();
        setAlertErro(true);
        window.scrollTo(0, 0);
        setMsgErro(`Tela criada com sucesso.`);
        setnomeCampo('');
        setTipo('integer');
        settipoInput('1');
        setchave(false);
        setexisteChave(true);
        setadicionarCampos(false);
        setfechar(true);
        settituloTela('');
        settabela('');
        setmenuId(0);
        seticoneMenu('');
        setmetodoinsert(false);
        setmetodoupdate(false);
        setmetododelete(false);
        setfiltro01('');
        setfiltro02('');
        setfiltro03('');
        setcampoLigado('');
        settabelaLigada('');
        setcampoexibir('');
        GetMenu();
        setLoadingCreate(false);
      })
      .catch((error) => {
        setLoadingCreate(false);
        console.log('não salvou pagina ');
        console.log(error);
      });
  }
  //===========editar pagina admin===========================

  async function EditePaginaMenuadmin() {
    await api
      .put(`/api/Pagina/updateAdmin?nome=${tituloTela}`, {
        icon: iconeMenu,
        subMenuId: menuId - 1,
      })
      .then((response) => {
        EditePaginaMenu();
      })
      .catch((error) => {
        setLoadingCreate(false);
        console.log('não salvou pagina do adim ');
        console.log(error);
      });
  }

  async function EditePaginaMenu() {
    await api
      .put(`/api/Pagina/updatePagina?nome=${tituloTela}`, {
        icon: iconeMenu,
        menuId: menuId,
      })
      .then((response) => {
        GetVendedores();
        setnomeCampo('');
        setTipo('integer');
        settipoInput('1');
        setchave(false);
        setexisteChave(true);
        setadicionarCampos(false);
        setfechar(true);
        settituloTela('');
        settabela('');
        setmenuId(0);
        seticoneMenu('');
        setmetodoinsert(false);
        setmetodoupdate(false);
        setmetododelete(false);
        setfiltro01('');
        setfiltro02('');
        setfiltro03('');
        GetMenu();
        setLoadingCreate(false);
      })
      .catch((error) => {
        setLoadingCreate(false);
        console.log('não salvou pagina ');
        console.log(error);
      });
  }
  //=========================================================

  async function GetMenu() {
    localStorage.removeItem('@Portal/menuPrincipal');
    localStorage.removeItem('@Portal/usuario/atualiza-menu');
    await api

      .get(`/api/Menu?pagina=1&totalpagina=999`)
      .then((response) => {
        localStorage.setItem(
          '@Portal/menuPrincipal',
          JSON.stringify(response.data.data)
        );
        handleClose();
        handleShowMensage();
        setAlertErro(true);
        window.scrollTo(0, 0);
        if (edit) {
          setMsgErro(`Tela atualizada com sucesso.`);
        } else {
          setMsgErro(`Tela criada com sucesso.`);
        }
        setLoading(false);
        console.log(response);
        setEdit(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setLoading(false);
        setEdit(false);
      });
  }

  //==== EXCLUIR GRUPO ======================================
  async function DeleteVendedor(id: any) {
    setLoadingUpdate(true);
    await api
      .delete(`/api/Vendedor/${id}`)
      .then((response) => {
        handleCloseEdit();
        GetVendedores();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Vendedor excluído com sucesso.');
      })
      .catch((error) => {
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);
        const { data } = error.response;
        setMsgErro(data.message);

        return;
      });
  }
  //==========================================================//
  function LimparPesquisa() {
    setSearch('');
    PesquisaNome();
    setPagina(1);
    setFilter(false);
    GetVendedores();
  }

  function PesquisaNome() {
    setSearch('');
    GetVendedores();
    setPesquisaNome(true);
    setPesquisaStatus(false);
    setPesquisaCod(false);
  }

  function PesquisaStatus() {
    setSearch('');
    GetVendedores();
    setPesquisaNome(false);
    setPesquisaStatus(true);
    setPesquisaCod(false);
  }

  function PesquisaCod() {
    setSearch('');
    GetVendedores();
    setPesquisaCod(true);
    setPesquisaNome(false);
    setPesquisaStatus(false);
  }

  //========== pesquisas de insert ============//

  //=======parceiro==================//
  function PesquisaParceiroNome() {
    setPesParceiroNome(true);
    setPesParceiroId(false);
  }

  function PesquisaParceiroCod() {
    setPesParceiroNome(false);
    setPesParceiroId(true);
  }
  //=======gerente==================//
  function PesquisaGerenteNome() {
    setPesGerenteNome(true);
    setPesGerenteId(false);
  }

  function PesquisaGerenteCod() {
    setPesGerenteNome(false);
    setPesGerenteId(true);
  }
  //=====empresa=====================//

  function PesquisaEmpresaNome() {
    setPesEmpresaNome(true);
    setPesEmpresaId(false);
  }

  function PesquisaEmpresaCod() {
    setPesEmpresaNome(false);
    setPesEmpresaId(true);
  }
  //=====funcionario=====================//

  function PesquisaFuncionarioNome() {
    setPesFuncionarioNome(true);
    setPesFuncionarioId(false);
  }

  function PesquisaFuncionarioCod() {
    setPesFuncionarioNome(false);
    setPesFuncionarioId(true);
  }
  //===========================================//
  function Pesquisa(event: any) {
    event.preventDefault();
    if (search !== '') {
      setPagina(1);
      GetVendedoresFilter();
    }
    if (search == '') {
      LimparPesquisa();
    }
  }

  return (
    <>
      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="">
            <SideNavBar />
          </div>
          <div>
            <NavbarDashHeader />
            <div className="titulo-page">
              <h1>Cadastro de Telas</h1>
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
                className="contain d-flex"
              >
                <div className="conteudo">
                  <div className="div-button-top">
                    <OverlayTrigger
                      placement={'top'}
                      delay={{ show: 100, hide: 250 }}
                      overlay={<Tooltip>Nova Tela</Tooltip>}
                    >
                      <button
                        className="btn btn-dark btn-direito"
                        onClick={handleShow}
                      >
                        Novo{' '}
                        <TfiNewWindow
                          style={{ marginLeft: 8, marginBottom: 5 }}
                        />
                      </button>
                    </OverlayTrigger>
                  </div>
                  <div
                    style={{ marginTop: 10, width: '100%' }}
                    className="conteudo-botoes"
                  >
                    <form onSubmit={Pesquisa} className="bloco-pesquisa-input">
                      {pesquisaCod ? (
                        <>
                          <div className="codPesquisa">
                            <p className="title-input">Código: </p>
                            <input
                              id="input-cod"
                              type="text"
                              className="form-control select inputparceiro input-cod-Pesquisa "
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                search = e.target.value;
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaNome ? (
                        <>
                          <div>
                            <p className="title-input">Nome: </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select inputparceiro "
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                search = e.target.value;
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaStatus ? (
                        <>
                          <div className="div-pesquisa-status">
                            <p className="title-input">Status: </p>
                            <select
                              id="statusPesquisa"
                              className="form-select select inputparceiro  campo-select"
                              aria-label=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                search = e.target.value;
                                setPagina(1);
                                GetVendedoresFilter();
                              }}
                            >
                              <option value=""></option>
                              <option value="S">Ativo</option>
                              <option value="N">Inativo</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </form>
                    <div className="pesquisa-div">
                      <button
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-primary btn-pesquisas btn-pesquisar"
                        onClick={() => {
                          setPagina(1);
                          GetVendedoresFilter();
                        }}
                      >
                        Pesquisar
                        <FaSearchPlus style={{ marginLeft: 6 }} fontSize={12} />
                      </button>
                      <button
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-primary btn-pesquisas"
                        onClick={LimparPesquisa}
                      >
                        Limpar
                        <AiOutlineClear
                          style={{ marginLeft: 6 }}
                          fontSize={13}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive table-scroll tabela-responsiva">
                    <div className=" table-wrap">
                      <Table
                        responsive
                        className="table-global table  main-table"
                      >
                        <thead>
                          <tr className="tituloTab">
                            <th className="th1 ">Titulo da Tela</th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th1 "
                            >
                              Nome da Tabela
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              Pertence ao Menu
                            </th>
                            <th
                              style={{
                                textAlign: 'center',
                                color: 'transparent',
                              }}
                              className="th4 "
                            >
                              ..........
                            </th>
                            <th
                              style={{
                                textAlign: 'center',
                                color: 'transparent',
                              }}
                              className="th4 "
                            >
                              ..........
                            </th>
                            <th
                              style={{ textAlign: 'center' }}
                              className="th4 fixed-table"
                            >
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulos.length > 0 ? (
                            <>
                              {modulos.map((modulos) => (
                                <tr
                                  onClick={() => {
                                    GetModuloId(modulos.id);
                                  }}
                                >
                                  <td className=" ">{modulos.descricao}</td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {modulos.tabela}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {modulos?.menuId == 2
                                      ? 'Cadastros'
                                      : modulos?.menuId == 3
                                      ? 'Movimentos'
                                      : modulos?.menuId == 4
                                      ? 'Consultas'
                                      : modulos?.menuId == 5
                                      ? 'Outros'
                                      : modulos?.menuId == 10
                                      ? 'Configurações'
                                      : ''}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="fixed-table td-fixo"
                                  >
                                    <OverlayTrigger
                                      placement={'right'}
                                      delay={{ show: 100, hide: 250 }}
                                      overlay={<Tooltip>Editar</Tooltip>}
                                    >
                                      <button
                                        className="btn btn-table btn-edit"
                                        style={{
                                          marginRight: 15,
                                          marginLeft: 15,
                                        }}
                                        onClick={() => {
                                          GetModuloId(modulos.id);
                                        }}
                                      >
                                        <HiOutlinePencilSquare />
                                      </button>
                                    </OverlayTrigger>
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <div
                              style={{ margin: 'auto' }}
                              className="alert alert-warning alerta-Vendedor3"
                              role="alert"
                            >
                              Nenhuma nova tela encontrada.
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
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================Modal Register ============================================== */}

        <Modal
          className="modal-cadastro-telas"
          show={show}
          onHide={handleClose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <h1>{edit ? 'Edição de Tela' : 'Cadastro de Nova Tela'}</h1>
          </Modal.Header>
          <Modal.Body>
            {loadingCreate ? (
              <div className="d-flex justify-content-center total-loading total-loadingCreate">
                <div className="div-loading">
                  <div className="spinner-border" role="status"></div>
                  <h2 className="sr-only">Salvando...</h2>
                </div>
              </div>
            ) : (
              <>
                <div className="form-cadastro-user">
                  <Tabs
                    defaultActiveKey={tabNav}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab
                      eventKey="dados"
                      title="Dados Gerais"
                      style={{ minHeight: 400 }}
                    >
                      <div className="coluna-dupla">
                        <div className="bloco-input">
                          <p className="title-input">
                            Titulo da Tela:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <input
                            className="form-control select inputparceiro"
                            id="nomeVendedor"
                            type="text"
                            value={tituloTela}
                            disabled={edit}
                            onChange={(e) => {
                              settituloTela(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input">
                          <p className="title-input">
                            Nome da Tabela:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <input
                            className="form-control select inputparceiro"
                            id="nomeVendedor"
                            type="text"
                            disabled={edit}
                            value={tabela}
                            onChange={(e) => {
                              settabela(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input">
                          <p className="title-input">
                            Exibir no menu:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="canal"
                            className="inputparceiro"
                            placeholder={placeMenu}
                            noOptionsMessage={() => 'Nenhum canal encontrado'}
                            options={optionMenu}
                            onChange={(value: any) => {
                              setmenuId(value.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla"></div>
                      {menuId > 0 ? (
                        <>
                          <div className="iconeBloco">
                            <p className="title-input">
                              Escolha o Icone:{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <div className=" metodoIcon">
                              <FiUsers
                                className={
                                  iconeMenu == '1'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('1')}
                              />
                              <BiMoney
                                className={
                                  iconeMenu == '2'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('2')}
                              />
                              <HiOutlineDocumentChartBar
                                className={
                                  iconeMenu == '3'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('3')}
                              />
                              <BsNewspaper
                                className={
                                  iconeMenu == '4'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('4')}
                              />
                              <ImNewspaper
                                className={
                                  iconeMenu == '5'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('5')}
                              />
                              <BsSearch
                                className={
                                  iconeMenu == '6'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('6')}
                              />
                              <FaIndustry
                                className={
                                  iconeMenu == '7'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('7')}
                              />
                              <TiShoppingCart
                                className={
                                  iconeMenu == '8'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('8')}
                              />
                              <ImUngroup
                                className={
                                  iconeMenu == '9'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('9')}
                              />
                              <BsCoin
                                className={
                                  iconeMenu == '10'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('10')}
                              />
                              <BiIdCard
                                className={
                                  iconeMenu == '11'
                                    ? 'buttonIconActive'
                                    : 'buttonIcon'
                                }
                                onClick={() => seticoneMenu('11')}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="metodosCadastrados">
                        <div className="d-flex">
                          <div className="modulos bloco1-filtros">
                            <h1>Metodos Utilizados</h1>
                            <div
                              style={{ marginBottom: 10 }}
                              className="d-flex"
                            >
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                checked={metodoinsert}
                                onChange={({ target }) => {
                                  setmetodoinsert(target.checked);
                                }}
                              />
                              <p className="text">Inserir</p>
                            </div>
                            <div
                              style={{ marginBottom: 10 }}
                              className="d-flex "
                            >
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                checked={metodoupdate}
                                onChange={({ target }) => {
                                  setmetodoupdate(target.checked);
                                }}
                              />
                              <p className="text">Editar</p>
                            </div>
                            <div className="d-flex">
                              <input
                                type="checkbox"
                                name=""
                                id="grupo"
                                checked={metododelete}
                                onChange={({ target }) => {
                                  setmetododelete(target.checked);
                                }}
                              />
                              <p className="text">Deletar</p>
                            </div>
                          </div>
                          <div className="modulos bloco2-filtros">
                            <h1>Filtros</h1>
                            <div className="bloco-input d-flexfiltro ">
                              <p className="title-input">Filtro 01: </p>
                              <input
                                className="form-control sselect inputparceiro"
                                id="email"
                                type="text"
                                value={filtro01}
                                onChange={(e) => {
                                  setfiltro01(e.target.value);
                                  LimparTodos();
                                }}
                              />
                            </div>
                            <div className="bloco-input d-flexfiltro">
                              <p className="title-input">Filtro 02: </p>
                              <input
                                className="form-control sselect inputparceiro"
                                id="email"
                                type="text"
                                value={filtro02}
                                onChange={(e) => {
                                  setfiltro02(e.target.value);
                                  LimparTodos();
                                }}
                              />
                            </div>
                            <div className="bloco-input d-flexfiltro ">
                              <p className="title-input">Filtro 03: </p>
                              <input
                                className="form-control sselect inputparceiro"
                                id="email"
                                type="text"
                                value={filtro03}
                                onChange={(e) => {
                                  setfiltro03(e.target.value);
                                  LimparTodos();
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="Campos"
                      title="Campos"
                      style={{ minHeight: 400 }}
                    >
                      <h1 style={{ textAlign: 'center' }}>
                        Adicione os campos da tabela
                      </h1>
                      <div style={{ height: 25 }}></div>
                      <div className={erroCampo ? 'aviso' : 'avisonone'}>
                        <p>Já existe este campo na tabela!</p>
                      </div>
                      <form
                        onSubmit={CriarCamposTabela}
                        style={{ alignItems: 'center' }}
                      >
                        <div className="coluna-dupla">
                          <div className="bloco-input">
                            <p className="title-input">
                              Nome do Campo:{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <input
                              className="form-control select inputparceiro"
                              id="nomeCampo"
                              type="text"
                              disabled={valorExpressao}
                              value={nomeCampo}
                              onChange={(e) => {
                                setnomeCampo(e.target.value);
                                LimparTodos();
                                SairdoErro();
                              }}
                            />
                          </div>
                          <div className="bloco-input bloco-tipo">
                            <p className=" title-input">
                              Tipo de dado:{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <select
                              className="form-select select inputparceiro campo-select"
                              aria-label=""
                              disabled={valorExpressao}
                              value={tipo}
                              onChange={(e) => {
                                setTipo(e.target.value);
                              }}
                            >
                              <option value="int">Número Inteiro</option>
                              <option value="decimal">Número Decimal</option>
                              <option value="varchar(50)">Texto</option>
                              <option value="longtext">Texto Longo</option>
                              <option value="date">Data</option>
                              <option value="datetime">Data e Hora</option>
                              <option value="time">Hora</option>
                              <option value="blob">Conteúdo Binário</option>
                              <option value="boolean">Booleano</option>
                            </select>
                          </div>
                        </div>
                        <div className="coluna-dupla">
                          <div className="bloco-input  blocoApresenta">
                            <p className=" title-input">
                              Apresentação:{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <div className="d-flex">
                              <select
                                className="form-select select inputparceiro campo-select"
                                aria-label=""
                                disabled={valorExpressao}
                                value={tipoInput}
                                onChange={(e) => {
                                  settipoInput(e.target.value);
                                }}
                              >
                                <option value="1">1 - Padrão</option>
                                <option value="2">2 - Checkbox</option>
                                <option value="3">3 - Caixa de Texto</option>
                                <option value="4">4 - Lista de opções</option>
                              </select>
                              {tipoInput == '4' ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-opcoes"
                                    onClick={() => {
                                      setadicionarCampos(true);
                                      setnovaOpcao(true);
                                      if (edit) {
                                      }
                                    }}
                                  >
                                    Opções
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="d-flex">
                            <div
                              style={{ paddingTop: 25 }}
                              className="colunachaveRPimaria"
                            >
                              <input
                                type="checkbox"
                                name=""
                                id="grupo"
                                disabled={opcoesExiste}
                                checked={calculado}
                                onChange={({ target }) => {
                                  setcalculado(target.checked);
                                }}
                              />
                              <p className="text">Campo Calculado</p>
                            </div>
                            {existeChave ? (
                              <>
                                <div
                                  style={{ paddingTop: 25 }}
                                  className="colunachaveRPimaria"
                                >
                                  <input
                                    type="checkbox"
                                    name=""
                                    id="grupo"
                                    checked={chave}
                                    onChange={({ target }) => {
                                      setchave(target.checked);
                                    }}
                                  />
                                  <p className="text">Chave Primária</p>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {chave ? (
                              <>
                                <div
                                  style={{ paddingTop: 25 }}
                                  className="colunachaveRPimaria"
                                >
                                  <input
                                    type="checkbox"
                                    name=""
                                    id="grupo"
                                    checked={automatico == true}
                                    onChange={({ target }) => {
                                      setautomatico(target.checked);
                                      automatico = target.checked;
                                      console.log(
                                        'auto incremento',
                                        automatico
                                      );
                                    }}
                                  />
                                  <p className="text">Auto Incremento</p>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className="metodosCadastrados">
                          <div className="coluna-dupla">
                            <div className="bloco-input blocoExpressao01 ">
                              <p className="title-input">Expressão:</p>
                              <textarea
                                className="form-control select textInput"
                                id="tabInput"
                                disabled={!calculado}
                                value={expressao}
                                onChange={(e) => {
                                  setexpressao(e.target.value);
                                }}
                              />
                            </div>
                            <div className="bloco-input blocoExpressao02 ">
                              <button
                                disabled={loadingCreate}
                                id=""
                                onSubmit={CriarCamposTabela}
                                className="btn btn-cadastrar-coluna2"
                                onClick={CriarCamposTabela}
                              >
                                Adicionar Campo
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      {colunasTabela.length > 0 ? (
                        <>
                          <div className="table-responsive table-scroll tabela-responsiva">
                            <div className=" table-wrap">
                              <Table
                                responsive
                                className="table-global table  main-table"
                              >
                                <thead>
                                  <tr className="tituloTab">
                                    <th className="th1">Nome do Campo</th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1"
                                    >
                                      Tipo do Campo
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1"
                                    >
                                      Apresentação
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1"
                                    >
                                      Chave Primaria
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1"
                                    >
                                      Expressão
                                    </th>
                                    <th
                                      style={{
                                        textAlign: 'center',
                                        color: 'transparent',
                                      }}
                                      className="th4 "
                                    >
                                      ..........
                                    </th>
                                    <th
                                      style={{
                                        textAlign: 'center',
                                        color: 'transparent',
                                      }}
                                      className="th4 "
                                    >
                                      ..........
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th4 fixed-table"
                                    >
                                      Ações
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {colunasTabela.length > 0 ? (
                                    <>
                                      {colunasTabela.map((coluna) => (
                                        <tr>
                                          <td
                                            className=""
                                            onClick={() => {
                                              console.log(
                                                'automatico',
                                                automatico
                                              );
                                              if (
                                                coluna?.chavePrimaria == false
                                              ) {
                                                setchave(false);
                                              }
                                              if (
                                                edit &&
                                                coluna?.tipoInput === '4' &&
                                                arrayLigacao?.some(
                                                  (ligacao) =>
                                                    ligacao.campoLigacao !==
                                                    coluna?.nome
                                                )
                                              ) {
                                                setcolunaId(Number(coluna.id));
                                                setidColuna(String(coluna.id));
                                                colunaId = Number(coluna.id);
                                                setnomeCampo(coluna?.nome);
                                                GetColunasId(coluna.id);
                                                setnovaOpcao(false);
                                                setTipo(coluna.tipo);
                                                settipoInput(coluna.tipoInput);
                                              }
                                              if (coluna.expressao != '') {
                                                GetColunaModuloId2(coluna.nome);
                                                setcalculado(true);
                                                setvalorExpressao(true);
                                                setchave(false);
                                                setautomatico(false);
                                                setidColuna(String(coluna.id));
                                              } else {
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setvalorExpressao(false);
                                              }
                                              if (coluna.chavePrimaria) {
                                                GetColunaModuloId2(coluna.nome);
                                                setchave(true);
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setidColuna(String(coluna.id));
                                              }
                                            }}
                                          >
                                            {coluna?.nome}
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                            onClick={() => {
                                              if (
                                                coluna?.chavePrimaria == false
                                              ) {
                                                setchave(false);
                                              }

                                              if (
                                                edit &&
                                                coluna?.tipoInput === '4' &&
                                                arrayLigacao?.some(
                                                  (ligacao) =>
                                                    ligacao.campoLigacao !==
                                                    coluna?.nome
                                                )
                                              ) {
                                                setcolunaId(Number(coluna.id));
                                                setidColuna(String(coluna.id));
                                                colunaId = Number(coluna.id);
                                                setnomeCampo(coluna?.nome);
                                                GetColunasId(coluna.id);
                                                setnovaOpcao(false);
                                                setTipo(coluna.tipo);
                                                settipoInput(coluna.tipoInput);
                                              }

                                              if (coluna.expressao != '') {
                                                GetColunaModuloId2(coluna.nome);
                                                setcalculado(true);
                                                setvalorExpressao(true);
                                                setchave(false);
                                                setautomatico(false);
                                                setidColuna(String(coluna.id));
                                              } else {
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setvalorExpressao(false);
                                              }
                                              if (coluna.chavePrimaria) {
                                                GetColunaModuloId2(coluna.nome);
                                                setchave(true);
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setidColuna(String(coluna.id));
                                              }
                                            }}
                                          >
                                            {coluna?.tipo}
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                            onClick={() => {
                                              if (
                                                coluna?.chavePrimaria == false
                                              ) {
                                                setchave(false);
                                              }

                                              if (
                                                edit &&
                                                coluna?.tipoInput === '4' &&
                                                arrayLigacao?.some(
                                                  (ligacao) =>
                                                    ligacao.campoLigacao !==
                                                    coluna?.nome
                                                )
                                              ) {
                                                setcolunaId(Number(coluna.id));
                                                setidColuna(String(coluna.id));
                                                colunaId = Number(coluna.id);
                                                setnomeCampo(coluna?.nome);
                                                GetColunasId(coluna.id);
                                                setnovaOpcao(false);
                                                setTipo(coluna.tipo);
                                                settipoInput(coluna.tipoInput);
                                              }
                                              if (coluna.expressao != '') {
                                                GetColunaModuloId2(coluna.nome);
                                                setcalculado(true);
                                                setvalorExpressao(true);
                                                setcalculado(false);
                                                setchave(false);
                                                setidColuna(String(coluna.id));
                                              } else {
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setautomatico(false);
                                                setvalorExpressao(false);
                                              }
                                              if (coluna.chavePrimaria) {
                                                GetColunaModuloId2(coluna.nome);
                                                setchave(true);
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setidColuna(String(coluna.id));
                                              }
                                            }}
                                          >
                                            {coluna?.tipoInput == '1'
                                              ? 'Padrão'
                                              : coluna?.tipoInput == '2'
                                              ? 'Checkbox'
                                              : coluna?.tipoInput == '3'
                                              ? 'Caixa de Texto'
                                              : coluna?.tipoInput == '4'
                                              ? 'Lista de Opções'
                                              : ''}
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                            onClick={() => {
                                              if (
                                                coluna?.chavePrimaria == false
                                              ) {
                                                setchave(false);
                                              }

                                              if (
                                                edit &&
                                                coluna?.tipoInput === '4' &&
                                                arrayLigacao?.some(
                                                  (ligacao) =>
                                                    ligacao.campoLigacao !==
                                                    coluna?.nome
                                                )
                                              ) {
                                                setcolunaId(Number(coluna.id));
                                                setidColuna(String(coluna.id));
                                                colunaId = Number(coluna.id);
                                                setnomeCampo(coluna?.nome);
                                                GetColunasId(coluna.id);
                                                setnovaOpcao(false);
                                                setTipo(coluna.tipo);
                                                settipoInput(coluna.tipoInput);
                                              }

                                              if (coluna.expressao != '') {
                                                GetColunaModuloId2(coluna.nome);
                                                setcalculado(true);
                                                setvalorExpressao(true);
                                                setchave(false);
                                                setautomatico(false);
                                                setidColuna(String(coluna.id));
                                              } else {
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setvalorExpressao(false);
                                              }
                                              if (coluna.chavePrimaria) {
                                                GetColunaModuloId2(coluna.nome);
                                                setchave(true);
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setidColuna(String(coluna.id));
                                              }
                                            }}
                                          >
                                            {coluna?.chavePrimaria ? (
                                              <>
                                                <FiCheckCircle
                                                  fontSize={20}
                                                  style={{ color: '#008000' }}
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                            onClick={() => {
                                              if (
                                                coluna?.chavePrimaria == false
                                              ) {
                                                setchave(false);
                                              }

                                              if (
                                                edit &&
                                                coluna?.tipoInput === '4' &&
                                                arrayLigacao?.some(
                                                  (ligacao) =>
                                                    ligacao.campoLigacao !==
                                                    coluna?.nome
                                                )
                                              ) {
                                                setcolunaId(Number(coluna.id));
                                                setidColuna(String(coluna.id));
                                                colunaId = Number(coluna.id);
                                                setnomeCampo(coluna?.nome);
                                                GetColunasId(coluna.id);
                                                setnovaOpcao(false);
                                                setTipo(coluna.tipo);
                                                settipoInput(coluna.tipoInput);
                                              }

                                              if (coluna.expressao != '') {
                                                GetColunaModuloId2(coluna.nome);
                                                setcalculado(true);
                                                setvalorExpressao(true);
                                                setchave(false);
                                                setautomatico(false);
                                                setidColuna(String(coluna.id));
                                              } else {
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setvalorExpressao(false);
                                              }
                                              if (coluna.chavePrimaria) {
                                                GetColunaModuloId2(coluna.nome);
                                                setchave(true);
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setidColuna(String(coluna.id));
                                              }
                                            }}
                                          >
                                            {coluna?.expressao}
                                          </td>

                                          <td
                                            style={{
                                              textAlign: 'center',
                                              color: 'transparent',
                                            }}
                                            onClick={() => {
                                              if (
                                                coluna?.chavePrimaria == false
                                              ) {
                                                setchave(false);
                                              }
                                              if (
                                                edit &&
                                                coluna?.tipoInput === '4' &&
                                                arrayLigacao?.some(
                                                  (ligacao) =>
                                                    ligacao.campoLigacao !==
                                                    coluna?.nome
                                                )
                                              ) {
                                                setcolunaId(Number(coluna.id));
                                                setidColuna(String(coluna.id));
                                                colunaId = Number(coluna.id);
                                                setnomeCampo(coluna?.nome);
                                                GetColunasId(coluna.id);
                                                setnovaOpcao(false);
                                                setTipo(coluna.tipo);
                                                settipoInput(coluna.tipoInput);
                                              }

                                              if (coluna.expressao != '') {
                                                GetColunaModuloId2(coluna.nome);
                                                setcalculado(true);
                                                setvalorExpressao(true);
                                                setchave(false);
                                                setautomatico(false);
                                                setidColuna(String(coluna.id));
                                              } else {
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setvalorExpressao(false);
                                              }
                                              if (coluna.chavePrimaria) {
                                                GetColunaModuloId2(coluna.nome);
                                                setchave(true);
                                                setexpressao('');
                                                setTipo('integer');
                                                settipoInput('1');
                                                setcalculado(false);
                                                setidColuna(String(coluna.id));
                                              }
                                            }}
                                          >
                                            ..................
                                          </td>
                                          <td
                                            style={{
                                              textAlign: 'center',
                                              color: 'transparent',
                                            }}
                                          >
                                            ..................
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className="fixed-table td-fixo"
                                          >
                                            {edit &&
                                            coluna?.tipoInput == '4' &&
                                            arrayLigacao?.some(
                                              (ligacao) =>
                                                ligacao.campoLigacao !==
                                                coluna?.nome
                                            ) ? (
                                              <>
                                                <OverlayTrigger
                                                  placement={'right'}
                                                  delay={{
                                                    show: 100,
                                                    hide: 250,
                                                  }}
                                                  overlay={
                                                    <Tooltip>Opções</Tooltip>
                                                  }
                                                >
                                                  <button
                                                    className="btn btn-table btn-edit"
                                                    style={{
                                                      marginRight: 15,
                                                      marginLeft: 15,
                                                    }}
                                                    onClick={() => {
                                                      setcolunaId(
                                                        Number(coluna.id)
                                                      );
                                                      setidColuna(
                                                        String(coluna.id)
                                                      );
                                                      colunaId = Number(
                                                        coluna.id
                                                      );
                                                      setnomeCampo(
                                                        coluna?.nome
                                                      );
                                                      GetColunasId(coluna.id);
                                                      setnovaOpcao(false);
                                                      setTipo(coluna.tipo);
                                                      settipoInput(
                                                        coluna.tipoInput
                                                      );
                                                    }}
                                                  >
                                                    <FaRegEye />
                                                  </button>
                                                </OverlayTrigger>
                                              </>
                                            ) : coluna.chavePrimaria ? (
                                              <>
                                                <button
                                                  className="btn btn-table btn-edit"
                                                  style={{
                                                    marginRight: 15,
                                                    marginLeft: 15,
                                                  }}
                                                  onClick={() => {
                                                    GetColunaModuloId2(
                                                      coluna.nome
                                                    );
                                                    setchave(true);
                                                    setexpressao('');
                                                    setnomeCampo('');
                                                    setTipo('integer');
                                                    settipoInput('1');
                                                    setcalculado(false);
                                                    setidColuna(
                                                      String(coluna.id)
                                                    );
                                                  }}
                                                >
                                                  <FaRegEye />
                                                </button>
                                              </>
                                            ) : (
                                              <>
                                                <button
                                                  className="btn btn-table btn-edit2"
                                                  style={{
                                                    marginRight: 15,
                                                    marginLeft: 15,
                                                  }}
                                                >
                                                  <BsEyeSlash />
                                                </button>
                                              </>
                                            )}
                                            <OverlayTrigger
                                              placement={'right'}
                                              delay={{ show: 100, hide: 250 }}
                                              overlay={
                                                <Tooltip>Excluir</Tooltip>
                                              }
                                            >
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  Deletecoluna(coluna.nome);
                                                }}
                                                className="btn btn-table btn-delete"
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
                                      className="alert alert-warning alerta-Vendedor"
                                      role="alert"
                                    >
                                      Nenhum menu encontrado.
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
                    </Tab>
                    <Tab
                      eventKey="ligacoes"
                      title="Ligações"
                      style={{ minHeight: 400 }}
                    >
                      <div className={erroLigacao ? 'aviso' : 'avisonone'}>
                        <p>{erroLig}</p>
                      </div>
                      <form onSubmit={CriarLigacao}>
                        <div className="coluna-dupla">
                          <div className="bloco-input">
                            <p className=" title-input">
                              Campo de ligação:{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <select
                              className="form-select select campo-select"
                              aria-label=""
                              value={campoLigado}
                              onChange={(e) => {
                                setcampoLigado(e.target.value);
                                LimpaLigacao();
                              }}
                            >
                              <option value="0">---</option>
                              {colunasTable.length > 0 ? (
                                <>
                                  {colunasTable?.map((coluna) => (
                                    <option value={coluna?.nome}>
                                      {coluna?.nome}
                                    </option>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <option value="">Não existem campos</option>
                                </>
                              )}
                            </select>
                          </div>
                          <div className="bloco-input">
                            <p className=" title-input">
                              Tabela ligada:{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <select
                              className="form-select select campo-select"
                              aria-label=""
                              value={tabelaLigada}
                              onChange={(e) => {
                                settabelaLigada(e.target.value);
                                DadosdaTabela(e.target.value);
                                LimpaLigacao();
                              }}
                            >
                              <option value="0">---</option>
                              {dados.length > 0 ? (
                                <>
                                  {dados?.map((coluna) => (
                                    <option value={coluna?.value}>
                                      {coluna?.label}
                                    </option>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <option value="">Não existem campos</option>
                                </>
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="coluna-dupla">
                          <div className="bloco-input">
                            <p className=" title-input">
                              Campo a exibir na grid:{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <select
                              className="form-select select campo-select"
                              aria-label=""
                              value={campoexibir}
                              onChange={(e) => {
                                setcampoexibir(e.target.value);

                                DadosdaTabela(e.target.value);
                                LimpaLigacao();
                              }}
                            >
                              <option value="0">---</option>
                              {camposTab.length > 0 ? (
                                <>
                                  {camposTab?.map((coluna) => (
                                    <option value={coluna?.value}>
                                      {coluna?.label}
                                    </option>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <option value="">Não existem campos</option>
                                </>
                              )}
                            </select>
                          </div>
                          <div
                            style={{ marginRight: 10 }}
                            className="bloco-input blocoExpressao02 "
                          >
                            <button
                              disabled={loadingCreate}
                              id=""
                              onSubmit={CriarLigacao}
                              className="btn btn-cadastrar-coluna2"
                              onClick={CriarLigacao}
                            >
                              Adicionar Ligação
                            </button>
                          </div>
                        </div>
                      </form>
                      {arrayLigacao.length > 0 ? (
                        <>
                          <div className="table-responsive table-scroll tabela-responsiva">
                            <div className=" table-wrap">
                              <Table
                                responsive
                                className="table-global table  main-table"
                              >
                                <thead>
                                  <tr className="tituloTab">
                                    <th className="th1">Campo de Ligação</th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1"
                                    >
                                      Tabela Ligada
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th1"
                                    >
                                      Campo a Exibir
                                    </th>
                                    <th
                                      style={{
                                        textAlign: 'center',
                                        color: 'transparent',
                                      }}
                                      className="th4 "
                                    >
                                      ..........
                                    </th>
                                    <th
                                      style={{
                                        textAlign: 'center',
                                        color: 'transparent',
                                      }}
                                      className="th4 "
                                    >
                                      ..........
                                    </th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="th4 fixed-table"
                                    >
                                      Ações
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {arrayLigacao.length > 0 ? (
                                    <>
                                      {arrayLigacao.map((coluna) => (
                                        <tr>
                                          <td className="">
                                            {coluna?.campoLigacao}
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                          >
                                            {coluna?.tabeaLigada}
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                          >
                                            {coluna?.campoExibir}
                                          </td>

                                          <td
                                            style={{
                                              textAlign: 'center',
                                              color: 'transparent',
                                            }}
                                          >
                                            ..................
                                          </td>

                                          <td
                                            style={{
                                              textAlign: 'center',
                                              color: 'transparent',
                                            }}
                                          >
                                            ..................
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className="fixed-table td-fixo"
                                          >
                                            <OverlayTrigger
                                              placement={'right'}
                                              delay={{ show: 100, hide: 250 }}
                                              overlay={
                                                <Tooltip>Excluir</Tooltip>
                                              }
                                            >
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  Deleteligacao(
                                                    coluna.campoLigacao
                                                  );
                                                }}
                                                className="btn btn-table btn-delete"
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
                                      className="alert alert-warning alerta-Vendedor"
                                      role="alert"
                                    >
                                      Nenhum menu encontrado.
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
                    </Tab>
                  </Tabs>
                  <div className="bloco-input bloco-buttom-vendedor2">
                    <button
                      type="button"
                      disabled={loadingCreate}
                      id=""
                      className="btn btn-editar-coluna"
                      onClick={edit ? ModuloUpdate : CreateModulo}
                    >
                      {edit ? 'Salvar Edição' : 'Salvar'}
                    </button>
                  </div>
                  {adicionarCampos ? (
                    <>
                      <div
                        style={{ alignItems: 'center' }}
                        className="metodosCadastradosCampos "
                      >
                        <button
                          disabled={loadingCreate}
                          id="btnvoltar"
                          type="button"
                          className="btn btn btn-outline-secondary"
                          onClick={() => {
                            setadicionarCampos(false);
                            console.log('opcoes', opcoesCampo);
                          }}
                        >
                          Voltar
                        </button>
                        <h1 style={{ textAlign: 'center' }}>OPÇÕES</h1>
                        <div
                          style={{ marginTop: 20 }}
                          className={erroOpcao ? 'aviso' : 'avisonone'}
                        >
                          <p>{respostaOpcao}</p>
                        </div>
                        <form
                          onSubmit={CriarOpcoes}
                          className="metodosCadastrados opcoessave "
                        >
                          <div className="coluna-dupla">
                            <div className="bloco-input">
                              <p className="title-input">Valor:</p>
                              <input
                                className="form-control select inputparceiro"
                                id="nomeVendedor"
                                type="text"
                                value={valor}
                                onChange={(e) => {
                                  setvalor(e.target.value);
                                  seterroOpcao(false);
                                }}
                              />
                            </div>
                            <div className="bloco-input">
                              <p className="title-input">Opção:</p>
                              <input
                                className="form-control select inputparceiro"
                                id="nomeVendedor"
                                type="text"
                                value={opcao}
                                onChange={(e) => {
                                  setopcao(e.target.value);
                                  seterroOpcao(false);
                                }}
                              />
                            </div>
                            <button
                              disabled={loadingCreate}
                              id=""
                              onSubmit={CriarOpcoes}
                              className="btn btn-cadastrar-coluna3"
                              onClick={() => {
                                setalterarOpcao(true);
                                console.log('alterar opção', alterarOpcao);
                              }}
                            >
                              <IoMdAddCircle
                                style={{ color: '#fff' }}
                                fontSize={20}
                              />
                            </button>
                          </div>
                          <div className="coluna-dupla"></div>
                        </form>
                        <div className="table-responsive table-scroll tabela-responsiva">
                          <div className=" table-wrap">
                            <Table
                              responsive
                              className="table-global table  main-table"
                            >
                              <thead>
                                <tr className="tituloTab">
                                  <th className="th1">Valor</th>
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="th1"
                                  >
                                    Opção
                                  </th>
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="th1"
                                  >
                                    Campo
                                  </th>
                                  <th
                                    style={{
                                      textAlign: 'center',
                                      color: 'transparent',
                                    }}
                                    className="th4 "
                                  >
                                    ..........
                                  </th>
                                  <th
                                    style={{
                                      textAlign: 'center',
                                      color: 'transparent',
                                    }}
                                    className="th4 "
                                  >
                                    ..........
                                  </th>
                                  <th
                                    style={{ textAlign: 'center' }}
                                    className="th4 fixed-table"
                                  >
                                    Ações
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {opcoesCampo.length > 0 ? (
                                  <>
                                    {opcoesCampo
                                      .filter((coluna, index, array) => {
                                        if (coluna.nomeCampo !== nomeCampo) {
                                          return false;
                                        }
                                        for (let i = 0; i < index; i++) {
                                          if (
                                            coluna.valor === array[i].valor &&
                                            coluna.opcao === array[i].opcao &&
                                            coluna.nomeCampo ===
                                              array[i].nomeCampo
                                          ) {
                                            return false;
                                          }
                                        }
                                        return true;
                                      })
                                      .map((coluna) => (
                                        <tr>
                                          <td className="">{coluna.valor}</td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                          >
                                            {coluna.opcao}
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className=""
                                          >
                                            {coluna.nomeCampo}
                                          </td>
                                          <td
                                            style={{
                                              textAlign: 'center',
                                              color: 'transparent',
                                            }}
                                          >
                                            ..................
                                          </td>
                                          <td
                                            style={{
                                              textAlign: 'center',
                                              color: 'transparent',
                                            }}
                                          >
                                            ..................
                                          </td>
                                          <td
                                            style={{ textAlign: 'center' }}
                                            className="fixed-table td-fixo"
                                          >
                                            <OverlayTrigger
                                              placement={'right'}
                                              delay={{ show: 100, hide: 250 }}
                                              overlay={
                                                <Tooltip>Excluir</Tooltip>
                                              }
                                            >
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  Deleteopcoes(coluna.valor);
                                                  DeleteOpcao(
                                                    coluna.colunaModuloId,
                                                    coluna.opcao
                                                  );
                                                }}
                                                className="btn btn-table btn-delete"
                                              >
                                                <RiDeleteBin5Line />
                                              </button>
                                            </OverlayTrigger>
                                          </td>
                                        </tr>
                                      ))}
                                  </>
                                ) : (
                                  <>
                                    <div style={{ minHeight: 50 }}></div>
                                  </>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        <div
                          style={{ marginTop: 15 }}
                          className="coluna-dupla"
                        ></div>
                        <div className="bloco-input blocoGeral">
                          <button
                            disabled={loadingCreate}
                            id=""
                            className="btn btn-cadastrar-coluna2"
                            onClick={CriarCamposTabela}
                          >
                            Adicionar Campo
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Edit ============================================== */}

        <Modal
          className="modal-edit-vendedor"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Dados do Vendedor</h1>
          </Modal.Header>
          <Modal.Body>
            {loadingUpdate ? (
              <div className="d-flex justify-content-center total-loading total-loadingCreate">
                <div className="div-loading">
                  <div className="spinner-border" role="status"></div>
                  <h2 className="sr-only">Carregando...</h2>
                </div>
              </div>
            ) : (
              <>
                <div className="form-cadastro-user">
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-codigo">
                      <p className="title-input">Código: </p>
                      <input
                        className="form-control select inputparceiro "
                        id="codVendedor"
                        type="text"
                        disabled
                        value={codVendedor}
                        onChange={(e) => {
                          setCodVendedor(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input">
                      <p className="title-input">
                        Nome: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro "
                        id="nomeVendedor"
                        type="text"
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-tipo">
                      <p className=" title-input">Tipo: </p>
                      <select
                        className="form-select select inputparceiro campo-select"
                        aria-label=""
                        value={tipo}
                        onChange={(e) => {
                          setTipo(e.target.value);
                        }}
                      >
                        <option value="V">VENDEDOR</option>
                        <option value="C">COMPRADOR</option>
                        <option value="A">ASSESSOR</option>
                        <option value="G">GERENTE</option>
                        <option value="R">REPRESENTANTE</option>
                        <option value="S">SUPERVISOR</option>
                        <option value="T">TÉCNICO</option>
                        <option value="P">PROMOTOR</option>
                      </select>
                    </div>
                    <div className="check-grupo atua-comprador">
                      {tipo != '2' ? (
                        <>
                          <input
                            type="checkbox"
                            name="grupo"
                            id="grupo"
                            checked={atuaComprador}
                            onChange={({ target }) => {
                              setAtuaComprador(target.checked);
                            }}
                          />
                          <p className="text">Também é comprador</p>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="bloco-input bloco-status-vend">
                      <p className="title-input">Status </p>
                      <select
                        className="form-select select inputparceiro campo-select"
                        aria-label=""
                        value={ativo}
                        onChange={(e) => {
                          setAtivo(e.target.value);
                        }}
                      >
                        <option value="S">Ativo</option>
                        <option value="N">Inativo</option>
                      </select>
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-email">
                      <p className="title-input">Email: </p>
                      <input
                        className="form-control select inputparceiro "
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input bloco-regiao">
                      <p className="title-input">Região: </p>
                      <select
                        className="form-select select inputparceiro campo-select"
                        aria-label=""
                        value={regiao}
                        onChange={(e) => {
                          setRegiao(e.target.value);
                        }}
                      >
                        <option value="0">SEM REGIÃO</option>
                      </select>
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-button-edit">
                      <button
                        disabled={loadingUpdate}
                        id=""
                        className="btn btn-cadastrar btn-edit-vend"
                        onClick={editeVendedor}
                      >
                        Salvar
                      </button>
                      <button
                        disabled={loadingUpdate}
                        id="b"
                        className="btn btn-cancelar btn-edit-vend"
                        onClick={handleCloseEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
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
            {alertErro && (
              <div className="mt-3 mb-0">
                <Alert msg={msgErro} setAlertErro={setAlertErro} />
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
          className="modalLoading"
          show={showloading}
          onHide={handleCloseloading}
          backdrop="static"
        >
          <Modal.Body>
            <div className="loadingModal">
              <img id="logoSankhya" src={logoAlyne} alt="" />
              <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
              <h1 style={{ marginTop: 15 }}></h1>
              <ProgressBar className="progress" animated now={sucess} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <FooterMobile />
      <Footer />
    </>
  );
}
