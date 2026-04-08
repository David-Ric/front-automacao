import React, { useEffect, useState, useRef } from 'react';
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
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import { iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask } from '../../Masks/Masks';
import { FaEye, FaSearchPlus } from 'react-icons/fa';
import { AiFillPrinter, AiOutlineClear } from 'react-icons/ai';
import { iVendedores, iDadosUsuario } from '../../@types';
import { BiSearchAlt } from 'react-icons/bi';
import logoAlyne from '../../assets/logo-dark.png';
import logoSankhya from '../../assets/logosankhya.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';

interface iEtiqueta {
  id: number;
  titulo: string;
  nomeTxt: string;
  sql: string;
  parametros: [
    {
      id: number;
      descParam: string;
      etiquetaId: number;
    }
  ];
}

interface iParam {
  id?: number;
  descParam: string;
  etiquetaId?: number;
}
interface iParamInit {
  id?: number;
  descParam: string;
  etiquetaId?: number;
}

interface iTxt {
  txt: string;
}
interface iCabeTab {
  description: string;
  name: string;
  order: number;
  userType: string;
}

export default function Etiquetas() {
  const history = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [vendedorId, setVendedorId] = useState(0);
  const [codVendedor, setCodVendedor] = useState('');
  const [nome, setNome] = useState('');
  const [ativo, setAtivo] = useState('');
  const [quant, setQuant] = useState('1');
  const [EnderecoPrint, setEnderecoPrint] = useState('1');
  const [regiao, setRegiao] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('V');
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
  const [nomeTxtesc, setnomeTxtesc] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [centroR_PadraoId, setCentroR_PadraoId] = useState('');
  const [centroR_Padrao, setCentroR_Padrao] = useState('');
  const [custoVariavel, setCustoVariavel] = useState(0);
  const [atuaComprador, setAtuaComprador] = useState(false);
  const [editar, seteditar] = useState(false);
  const [etiquetaId, setetiquetaId] = useState(0);
  const [titulo, settitulo] = useState('');
  const [nomeTxt, setnomeTxt] = useState('');
  const [sql, setsql] = useState('');
  const [etiquetas, setetiquetas] = useState<iEtiqueta[]>([]);
  const [parametros, setparametros] = useState<iParam[]>([]);
  const [nomesTxt, setnomesTxt] = useState<iTxt[]>([]);
  const [nomeParam, setnomeParam] = useState('');
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
  let [vendedores, setVendedores] = useState<iVendedores[]>([]);
  let [vendedorGetId, setVendedorGetId] = useState<iVendedores[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  let [search, setSearch] = useState('');
  const [codSearch, setCodSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaStatus, setPesquisaStatus] = useState(false);
  const [pesquisaCod, setPesquisaCod] = useState(false);
  const [pesParceiroNome, setPesParceiroNome] = useState(true);
  const [pesParceiroId, setPesParceiroId] = useState(false);
  const [pesGerenteNome, setPesGerenteNome] = useState(true);
  const [pesGerenteId, setPesGerenteId] = useState(false);
  const [pesFuncionarioNome, setPesFuncionarioNome] = useState(true);
  const [pesFuncionarioId, setPesFuncionarioId] = useState(false);
  const [pesEmpresaNome, setPesEmpresaNome] = useState(true);
  const [pesEmpresaId, setPesEmpresaId] = useState(false);
  const [showloading, setShowloading] = useState(true);
  const handleCloseloading = () => setShowloading(false);
  const [showloadingzpl, setShowloadingzpl] = useState(false);
  const handleCloseloadingzpl = () => setShowloadingzpl(false);
  const [showloadingzplText, setShowloadingzplText] = useState(false);
  const handleCloseloadingzplText = () => setShowloadingzplText(false);
  const [showloadingdelete, setShowloadingdelete] = useState(false);
  const handleCloseloadingdelete = () => setShowloadingdelete(false);
  const [showloadingdelete2, setShowloadingdelete2] = useState(false);
  const handleCloseloadingdelete2 = () => setShowloadingdelete2(false);
  let [novaString, setNovaString] = useState('');
  const [sucess, setSucess] = useState(0);
  //===============================================================//

  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  useEffect(() => {
    logado();
  }, []);

  useEffect(() => {
    console.log('dados do array parametros', parametros);
  }, [parametros]);

  //==================================================================================

  interface iTipoTab {
    key: string;
    value: string;
  }
  const [corpoTab, setcorpoTab] = useState<iTipoTab[]>([]);
  const [cabecalhoTab, setcabecalhoTab] = useState<iCabeTab[]>([]);

  interface iTipoCab {
    name: string;
    description: string;
    order: number;
    userType: string | undefined;
  }
  const [cabTab, setcabTab] = useState<iTipoCab[]>([]);

  interface iTipoProp {
    [key: string]: any;
  }
  const handleCloseMensageSankhya = () => setShowMensageSankhya(false);
  const [showMensageSankhya, setShowMensageSankhya] = useState(false);
  async function LoginSankhya() {
    setcabecalhoTab([]);
    setcorpoTab([]);
    setShowMensageSankhya(true);
    setSucess(20);

    try {
      setSucess(40);
      await ResultadoSql();
    } catch (error) {
      console.log('erro login Sanhya', error);
      setShowMensageSankhya(false);
    }
  }
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (event: any) => {
    const { id, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleGerarSQL = () => {
    setNovaString('');
    const novoSQL = gerarNovoSQL(parametros, values);

    setNovaString(novoSQL);
    novaString = novoSQL;
    console.log('Nova SQL:', novoSQL);
    LoginSankhya();
  };
  function gerarNovoSQL(parametros: any, values: any) {
    let novoSQL = sql;

    parametros.forEach((variavel: any) => {
      const parametroChave = new RegExp(`\\$${variavel.descParam}\\$`, 'g');
      if (values[variavel.descParam]) {
        novoSQL = novoSQL.replace(parametroChave, values[variavel.descParam]);
      }
    });

    return novoSQL;
  }

  function removeAccentsAndTrailingSpaces(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function formatDateTime(dateTimeStr: string): string {
    const datePart = dateTimeStr.substr(0, 8);
    const timePart = dateTimeStr.substr(9, 5);
    const year = datePart.substr(4, 4);
    const month = datePart.substr(2, 2);
    const day = datePart.substr(0, 2);
    return `${day}/${month}/${year}`;
  }

  function truncateToMaxLength(str: string, maxLength: number): string {
    return str.length <= maxLength ? str : str.substring(0, maxLength);
  }

  async function ResultadoSql() {
    const sql = novaString;
    setSucess(60);
    await api
      .post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
      .then((response) => {
        console.log('cabeçalho', response.data.responseBody.fieldsMetadata);
        console.log('corpo', response.data.responseBody.rows.slice(0, 20));

        const rows2: [] = response.data.responseBody.rows;
        console.log('testesssssssssssss rows', rows2);
        if (rows2.length <= 0) {
          setShowMensageSankhya(false);
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro('Consulta inválida. Verifique os dados informados');
        }
        const data = response.data.responseBody.fieldsMetadata;
        setcabecalhoTab(data);
        setcabTab(response.data.responseBody.fieldsMetadata);

        const fieldsMetadata = response.data.responseBody.fieldsMetadata;
        const rows = response.data.responseBody.rows;

        const dadosArray: { key: string; value: string }[] = [];
        fieldsMetadata.forEach((field: any, index: number) => {
          const key = field.name;
          let value = removeAccentsAndTrailingSpaces(String(rows[0][index]));

          const expedicaoIndex = value.indexOf('EXPEDICAO:');
          if (expedicaoIndex !== -1) {
            value = value.slice(expedicaoIndex + 10).trim();
          }

          if (/^\d{8}\s\d{2}:\d{2}:\d{2}$/.test(value)) {
            value = formatDateTime(value);
          }

          value = truncateToMaxLength(value, 19);

          dadosArray.push({ key, value });
        });

        setcorpoTab(dadosArray);
        console.log('resposta array montado', dadosArray);
        setSucess(100);
        setShowMensageSankhya(false);
      })
      .catch((error) => {
        console.log('erro ao receber dados bi', error);
      });
  }

  //==================================================================================

  function logado() {
    if (!usuariolog.token) {
      history('/');
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (filter) {
      GetEtiquetasFilter();
    } else {
      GetEtiquetas();
    }
  }, [pagina]);

  const adicionarParametro = (sql: string) => {
    const regex = /\$(.*?)\$/g;
    const paramsExtract = sql.match(regex);

    parametros.splice(0);

    if (paramsExtract) {
      for (const paramEx of paramsExtract) {
        const nomeParam = paramEx.slice(1, -1);
        const existeParametro = parametros.some(
          (param) => param.descParam === nomeParam
        );

        if (!existeParametro) {
          const novoParametro = {
            descParam: nomeParam,
          };
          parametros.push(novoParametro);
        } else {
          console.log(`O parâmetro '${nomeParam}' já existe no array.`);
        }
      }
    } else {
      console.log('Nenhum parâmetro foi encontrado na string SQL.');
    }
  };

  function handleShowMensage() {
    setShowMensage(true);
    setTimeout(function () {}, 1200);
  }
  function addParam() {}

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
    seteditar(false);
    GetNomeTxt();
    setEnderecoPrint('');
    settitulo('');
    setetiquetaId(0);
    setsql('');
    setnomeTxt('');
    setnomeParam('');
    setparametros([]);
    setShow(true);
  }
  //================== get txt id =============================
  const [conteudotxt, setconteudotxt] = useState('');

  async function GetTxtNome(nomeTx: string) {
    await api
      .get(`/api/AddTxt/conteudo?nomeArquivo=${nomeTx}`)
      .then((response) => {
        console.log('Valor do Zpl', response.data);
        setconteudotxt(response.data);
        setShowloadingzplText(true);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //===========================================================
  interface iTxt {
    txt: string;
  }
  const [contentTxt, setcontentTxt] = useState<iTxt[]>([]);

  async function GetTXT() {
    await api
      .get(`/api/AddTxt/lista-nomes`)
      .then((response) => {
        setShowloadingzpl(true);
        setcontentTxt(response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //================================================
  async function GetZpl() {
    await api
      .get(`/api/AddTxt/lista-nomes`)
      .then((response) => {
        setcontentTxt(response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //===========================================================
  async function GetEtiquetaId(id: any) {
    seteditar(true);
    GetNomeTxt();

    await api
      .get(`/api/Etiqueta/${id}`)
      .then((response) => {
        setetiquetaId(response.data.id);
        settitulo(response.data.titulo);
        setsql(response.data.sql);
        setnomeTxt(response.data.nomeTxt);
        setparametros(response.data.parametros);
        setEnderecoPrint(response.data.printerAddress);
        console.log('parametros salvos', response.data.parametros);

        setShow(true);
        console.log('Etiqueta pelo ID', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //===========função usada na geração do sql ==========================
  async function GetEtiquetaSqlId(id: any) {
    await api
      .get(`/api/Etiqueta/${id}`)
      .then((response) => {
        setetiquetaId(response.data.id);
        settitulo(response.data.titulo);
        setsql(response.data.sql);
        setnomeTxt(response.data.nomeTxt);
        setparametros(response.data.parametros);
        setEnderecoPrint(response.data.printerAddress);
        console.log('parametros salvos', response.data.parametros);
        ShowModalEdit();
        console.log('Etiqueta pelo ID', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetNomeTxt() {
    await api
      .get(`/api/AddTxt/lista-nomes`)
      .then((response) => {
        setnomesTxt(response.data);
        console.log('txt lista', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetEtiquetas() {
    setFilter(false);
    setSucess(50);
    await api

      .get(`/api/Etiqueta?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setNome(response.data.data[0].nome);
        setetiquetas(response.data.data);
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        setSucess(100);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setSucess(100);
        setShowloading(false);
      });
  }

  async function GetEtiquetasFilter() {
    setFilter(true);

    await api
      .get(
        `/api/Etiqueta/filter/titulo?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
      )
      .then((response) => {
        setetiquetas(response.data.data);
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        console.log('usuarios pesquisa', vendedores);
        console.log('total vendedores', response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  function ShowModalEdit() {
    setShowEdit(true);
  }

  //=========== get usuarios por ID ==================================//
  async function GetVendedorId(id: any) {
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/Vendedor/${id}`)
      .then((response) => {
        setVendedorGetId(response.data.id);
        vendedorGetId = response.data.id;
        setNome(response.data.nome);
        setCodVendedor(response.data.id);
        setAtivo(response.data.status);
        setRegiao(response.data.regiao);
        setTipo(response.data.tipo);
        setEmail(response.data.email);
        setAtuaComprador(response.data.atua_Compras);

        console.log('vendedor Id', response.data);
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
        GetEtiquetas();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
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

  //============== Editar etiqueta ===============================//
  async function PutEtiqueta() {
    if (titulo.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('tituloEtq');
      document.getElementById('tituloEtq')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o titulo da etiqueta.');
      return;
    }
    if (nomeTxt.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('nomeTxt');
      document.getElementById('nomeTxt')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o nome do TXT.');
      return;
    }
    if (sql.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('sql');
      document.getElementById('sql')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o sql.');
      return;
    }

    setLoadingCreate(true);
    await api
      .put(`/api/Etiqueta/${etiquetaId}`, {
        id: etiquetaId,
        titulo: titulo,
        nomeTxt: nomeTxt,
        sql: sql,
        printerAddress: EnderecoPrint,
      })

      .then((response) => {
        setLoadingCreate(false);
        CreateParamsEdit(etiquetaId);
        console.log('resposta do post create etiqueta', response.data);
        GetEtiquetas();
        handleClose();
        handleShowMensage();
        setAlertErroMensage(true);
        window.scrollTo(0, 0);
        setMsgErro('Etiqueta Alterada com Sucesso!');
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log('valor do file', fileInputRef);
  }, [fileInputRef]);

  let [arquivoSelecionado, setArquivoSelecionado] = useState(false);
  const handleFileInputChange = () => {
    setArquivoSelecionado(true);
    arquivoSelecionado = true;
  };

  const AddArquivo = async () => {
    try {
      if (
        fileInputRef.current &&
        fileInputRef.current.files &&
        fileInputRef.current.files.length > 0
      ) {
        const file = fileInputRef.current.files[0];

        const formData = new FormData();
        formData.append('file', file);

        await api.post('/api/AddTxt', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Arquivo salvo com sucesso!');
        console.log('Arquivo salvo com sucesso!');
        setArquivoSelecionado(false);
        arquivoSelecionado = true;
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        } else {
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro('Nenhum arquivo selecionado.');
          console.log('Nenhum arquivo selecionado.');
        }
      }
    } catch (error) {
      handleShowMensage();
      setAlertErroMensage(true);
      setMsgErro(`Erro ao salvar o arquivo. ${error}`);
      console.log('Erro ao salvar o arquivo:', error);
    }

    GetZpl();
  };

  async function EnviarPrint() {
    console.log('dados enviados', corpoTab);

    await api
      .put(
        `/api/AddTxt/conteudo?nomeArquivo=${nomeTxt}&quantPaginas=${quant}&printerAddress=print`,
        corpoTab
      )
      .then((response) => {
        console.log('enviar impressao', response.data);
        imprimirZplContent(response.data, Number(quant), EnderecoPrint);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados enviados para impressora com sucesso!');
      })
      .catch((error) => {
        console.log('não salvou os paramentros');
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Erro ao enviar dados enviados para impressora!');
      });
  }
  //===================print cliente ============================================

  function imprimirZplContent(
    zplContent: string,
    quantPrint: number,
    namePrint: string
  ): void {
    if (!window.print) {
      alert('Seu navegador não suporta a API de impressão.');
      return;
    }

    if (isNaN(quantPrint) || quantPrint <= 0) {
      alert('Por favor, digite uma quantidade válida de cópias.');
      return;
    }

    const options = `silent=${true},copies=${quantPrint},deviceName=${namePrint}`;
    const url = 'about:blank';
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    iframe.onload = () => {
      const iframeWindow = iframe.contentWindow;
      if (iframeWindow) {
        const printDocument = iframeWindow.document;
        printDocument.open();
        printDocument.write(zplContent);
        printDocument.close();
        iframeWindow.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 100);
      }
    };

    iframe.src = url + '?' + options;
  }

  //==============================================================================

  async function CreateParamsEdit(etiquetaId: any) {
    const arrayParams: iParam[] = parametros.map((param) => ({
      ...param,
      etiquetaId: etiquetaId,
    }));
    console.log('id da etiqueta', etiquetaId, 'parametros', arrayParams);

    await api
      .post(`/api/Etiqueta/parametros?etiquetaId=${etiquetaId}`, arrayParams)
      .then((response) => {
        console.log('paramentros salvos com sucesso!');
      })
      .catch((error) => {
        console.log('não salvou os paramentros');
      });
  }
  //============ Criar Etiqueta ===============================//
  async function CreateEtiqueta() {
    if (titulo.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('tituloEtq');
      document.getElementById('tituloEtq')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o titulo da etiqueta.');
      return;
    }
    if (nomeTxt.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('nomeTxt');
      document.getElementById('nomeTxt')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o nome do TXT.');
      return;
    }
    if (sql.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('sql');
      document.getElementById('sql')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o sql.');
      return;
    }

    setLoadingCreate(true);
    await api
      .post('/api/Etiqueta', {
        titulo: titulo,
        nomeTxt: nomeTxt,
        sql: sql,
        printerAddress: EnderecoPrint,
      })

      .then((response) => {
        setLoadingCreate(false);
        CreateParams(response.data.id);
        console.log('resposta do post create etiqueta', response.data);
        GetEtiquetas();
        handleClose();
        handleShowMensage();
        setAlertErroMensage(true);
        window.scrollTo(0, 0);
        setMsgErro('Etiqueta Criada com Sucesso!');
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
  //=========salvar paramentros ============================//
  async function CreateParams(etiquetaId: any) {
    const arrayParams: iParam[] = parametros.map((param) => ({
      ...param,
      etiquetaId: etiquetaId,
    }));
    console.log('id da etiqueta', etiquetaId, 'parametros', arrayParams);
    await api
      .post(`/api/Etiqueta/parametros?etiquetaId=${etiquetaId}`, arrayParams)
      .then((response) => {
        console.log('paramentros salvos com sucesso!');
      })
      .catch((error) => {
        console.log('não salvou os paramentros');
      });
  }

  //============EXCLUIR TXT ==================================
  async function DeleteTxt() {
    setShowloadingdelete2(false);
    setLoadingUpdate(true);
    await api
      .delete(`/api/AddTxt/excluir?nomeArquivo=${nomeTxtesc}`)
      .then((response) => {
        handleCloseEdit();
        GetZpl();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Arquivo ZPL excluído com sucesso.');
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

  //==== EXCLUIR ETIQUETAS ======================================
  async function DeleteEtiqueta() {
    setShowloadingdelete(false);
    setLoadingUpdate(true);
    await api
      .delete(`/api/Etiqueta/${etiquetaId}`)
      .then((response) => {
        handleCloseEdit();
        GetEtiquetas();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Etiqueta excluída com sucesso.');
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
    GetEtiquetas();
  }

  function PesquisaNome() {
    setSearch('');
    GetEtiquetas();
    setPesquisaNome(true);
    setPesquisaStatus(false);
    setPesquisaCod(false);
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
    if (search != '') {
      setPagina(1);
      GetEtiquetasFilter();
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
              <h1>Etiquetas</h1>
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
                  {usuariolog.grupoId == 1 ? (
                    <>
                      <div className="div-button-top">
                        <div className="pesBloco">
                          <div className="title-pesBloco"></div>
                          <div className="d-flex div-parceiros-pesquisa"></div>
                        </div>
                        <button
                          className="btn btn-primary btn-direito2"
                          onClick={GetTXT}
                        >
                          Gerenciar ZPL
                        </button>
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 100, hide: 250 }}
                          overlay={<Tooltip>Nova Etiqueta</Tooltip>}
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
                    </>
                  ) : (
                    <></>
                  )}
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
                            <p className="title-input">Título: </p>
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
                                GetEtiquetasFilter();
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
                          GetEtiquetasFilter();
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
                            <th
                              style={{ width: 100, textAlign: 'center' }}
                              className="th1 cod-grupo"
                            >
                              Id
                            </th>
                            <th className="th1 Nome-completo td-codigo">
                              Título
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              nomeTxt
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              Sql
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
                          {etiquetas?.length > 0 ? (
                            <>
                              {etiquetas?.map((etiqueta, index) => (
                                <tr key={index}>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="td-codigo"
                                    onClick={() => {
                                      GetEtiquetaId(etiqueta.id);
                                      console.log('id ', etiqueta.id);
                                    }}
                                  >
                                    {etiqueta.id}
                                  </td>
                                  <td
                                    className="Nome-completo"
                                    onClick={() => {
                                      GetEtiquetaId(etiqueta.id);
                                      console.log('id ', etiqueta.id);
                                    }}
                                  >
                                    {etiqueta.titulo}
                                  </td>
                                  <td
                                    className="Nome-completo"
                                    onClick={() => {
                                      GetEtiquetaId(etiqueta.id);
                                      console.log('id ', etiqueta.id);
                                    }}
                                  >
                                    {etiqueta.nomeTxt}
                                  </td>
                                  <td
                                    className=""
                                    onClick={() => {
                                      GetEtiquetaId(etiqueta.id);
                                      console.log('id ', etiqueta.id);
                                    }}
                                  >
                                    {etiqueta.sql}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="fixed-table td-fixo"
                                  >
                                    <button
                                      className="btn btn-dark"
                                      style={{
                                        marginRight: 15,
                                        marginLeft: 15,
                                      }}
                                      onClick={() => {
                                        setcorpoTab([]);
                                        GetEtiquetaSqlId(etiqueta.id);
                                        console.log('id ', etiqueta.id);
                                      }}
                                    >
                                      Gerar Etiqueta
                                    </button>
                                    {usuariolog.grupoId == 1 ? (
                                      <>
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
                                              GetEtiquetaId(etiqueta.id);
                                              console.log('id ', etiqueta.id);
                                            }}
                                          >
                                            <HiOutlinePencilSquare />
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement={'top'}
                                          delay={{ show: 100, hide: 250 }}
                                          overlay={<Tooltip>Excluir</Tooltip>}
                                        >
                                          <button
                                            onClick={() => {
                                              setShowloadingdelete(true);
                                              setetiquetaId(etiqueta.id);
                                            }}
                                            className="btn btn-table btn-delete"
                                          >
                                            <RiDeleteBin5Line />
                                          </button>
                                        </OverlayTrigger>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <div
                              style={{ margin: 'auto' }}
                              className="alert alert-warning alerta-vendedor"
                              role="alert"
                            >
                              Nenhuma etiqueta encontrada.
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
          className="modal-cadastro-vendedor"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <h1>{editar ? 'Editar ' : ''}Cadastro de Etiquetas</h1>
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
                {alertErroRegister && (
                  <div className="mt-3 mb-0">
                    <Alert msg={msgErro} setAlertErro={setAlertErroRegister} />
                  </div>
                )}
                <div className="form-cadastro-user">
                  <div className="coluna-dupla">
                    <div className="bloco-input">
                      <p className="title-input">
                        Título: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro"
                        id="tituloEtq"
                        type="text"
                        value={titulo}
                        onChange={(e) => {
                          settitulo(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                    <div className="bloco-input bloco-tipo">
                      <p className=" title-input">
                        Nome TXT: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <select
                        id="nomeTxt"
                        className="form-select select inputparceiro  campo-select"
                        aria-label=""
                        defaultValue={nomeTxt}
                        onChange={(e) => {
                          setnomeTxt(e.target.value);
                          LimparTodos();
                        }}
                      >
                        <option value=""></option>
                        {nomesTxt?.map((nome) => (
                          <option value={nome.txt}>{nome.txt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="bloco-input bloco-tipo">
                      <p className=" title-input">
                        Endereço da Impressora:{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-control select inputparceiro"
                        id="tituloEtq"
                        type="text"
                        value={EnderecoPrint}
                        onChange={(e) => {
                          setEnderecoPrint(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input ">
                      <p className="title-input">
                        Sql: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <textarea
                        id="sql"
                        name="texto"
                        value={sql}
                        className="form-control inputparceirotext2"
                        style={{ textAlign: 'justify' }}
                        onChange={(e) => {
                          setsql(e.target.value);
                          adicionarParametro(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <div className="tarjaEtq">
                    <h1>Parametros do Sql</h1>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input ">
                      <div className="table-responsive table-scroll tabela-responsiva tableParam">
                        <div className=" table-wrap">
                          <Table
                            responsive
                            className="table-global table  main-table"
                          >
                            <thead>
                              <tr className="tituloTab">
                                <th className="th1 Nome-completo td-codigo">
                                  Parametro
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
                              </tr>
                            </thead>
                            <tbody>
                              {parametros?.length > 0 ? (
                                <>
                                  {parametros?.map((etiqueta, index) => (
                                    <tr key={index}>
                                      <td
                                        style={{ textAlign: 'left' }}
                                        className="td-codigo"
                                      >
                                        {etiqueta.descParam}
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              ) : (
                                <div
                                  style={{ margin: 'auto' }}
                                  className="alert alert-warning alertPar"
                                  role="alert"
                                >
                                  Nenhum parametro cadastrado.
                                </div>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-buttom-vendedor">
                      <button
                        disabled={loadingCreate}
                        id=""
                        className="btn btn-cadastrar-vendedor"
                        onClick={editar ? PutEtiqueta : CreateEtiqueta}
                      >
                        {editar ? 'Salvar Edição' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Gerenciamento ============================================== */}

        <Modal
          className="modal-gerenciamento"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Gerar Etiqueta</h1>
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
                <div className="d-flex">
                  <div className="form-Gerencial">
                    <div className="coluna-dupla">
                      <div className="bloco-input">
                        <div style={{ marginTop: 10, marginBottom: 15 }}>
                          <h1>{titulo}</h1>
                        </div>
                        {parametros.map((variavel) => (
                          <div className="divint" key={variavel.descParam}>
                            <label htmlFor={variavel.descParam}>
                              {variavel.descParam}:
                            </label>
                            <input
                              className="form-control select inputeti "
                              type="text"
                              id={variavel.descParam}
                              value={values[variavel.descParam] || ''}
                              onChange={handleChange}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="fimModal"></div>
                    <div className="coluna-dupla">
                      <div className="bloco-input bloco-button-edit">
                        <button
                          disabled={loadingUpdate}
                          id="btnGerar"
                          className="btn btn-dark"
                          onClick={handleGerarSQL}
                        >
                          Gerar Etiqueta
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-Gerencial-dados">
                    <div className="tarjaDados" style={{ marginBottom: 15 }}>
                      <h2>Dados Gerados</h2>
                    </div>
                    {corpoTab.length > 0 ? (
                      <>
                        <div style={{ marginBottom: 20, paddingLeft: 5 }}>
                          {corpoTab?.map((corpo) => (
                            <div style={{ marginBottom: 8 }} className="d-flex">
                              <h1>
                                {corpo.key}: {corpo.value}
                              </h1>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {corpoTab.length > 0 ? (
                      <>
                        <div className="barrrdiv" />
                        <div className="bloco-input bloco-status-vend">
                          <p className="title-input">
                            Quant. Impressões:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <input
                            className="form-control select inputparceiro "
                            id="nomeVendedor"
                            type="number"
                            defaultValue={quant}
                            disabled={corpoTab.length <= 0}
                            onChange={(e) => {
                              setQuant(e.target.value);
                            }}
                          />
                        </div>
                        <div className="coluna-dupla">
                          <div className="bloco-input bloco-button-edit">
                            <button
                              id=""
                              disabled={corpoTab.length <= 0}
                              className="btn btn-cadastrar btn-edit-vend"
                              onClick={EnviarPrint}
                            >
                              <AiFillPrinter fontSize={17} /> Imprimir
                            </button>
                            <button
                              id="b"
                              disabled={corpoTab.length <= 0}
                              className="btn btn-cancelar btn-edit-vend"
                              onClick={handleCloseEdit}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
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
        {/* //===================================modal ZPL ============================================ */}

        <Modal
          className="modal-confirm"
          show={showloadingzpl}
          onHide={handleCloseloadingzpl}
        >
          <Modal.Header closeButton>
            <h1>Gerenciar arquivos ZPL base</h1>
          </Modal.Header>
          <Modal.Body>
            <div className="corpoModalZpl">
              <div className="cardAddZPL">
                <h1>Favor enviar arquivos no formato txt</h1>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
                {arquivoSelecionado && (
                  <button
                    style={{ marginLeft: 10, marginBottom: 10 }}
                    className="btn btn-dark"
                    onClick={AddArquivo}
                  >
                    Enviar Arquivo
                  </button>
                )}
              </div>
            </div>
            <div className="table-responsive table-scroll tabela-responsiva">
              <div className=" table-wrap">
                <Table responsive className="table-global table  main-table">
                  <thead>
                    <tr className="tituloTab">
                      <th
                        style={{ textAlign: 'left' }}
                        className="th1 Nome-completo td-codigo"
                      >
                        Nome do txt
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
                    {contentTxt?.length > 0 ? (
                      <>
                        {contentTxt?.map((txt, index) => (
                          <tr key={index}>
                            <td
                              style={{ textAlign: 'left' }}
                              className="td-codigo"
                              onClick={() => {
                                setnomeTxtesc(txt.txt);
                                GetTxtNome(txt.txt);
                              }}
                            >
                              {txt.txt}
                            </td>
                            <td
                              style={{ textAlign: 'center' }}
                              className="fixed-table td-fixo"
                            >
                              <OverlayTrigger
                                placement={'left'}
                                delay={{ show: 100, hide: 250 }}
                                overlay={<Tooltip>Visualizar</Tooltip>}
                              >
                                <button
                                  className="btn btn-table btn-edit"
                                  style={{
                                    marginRight: 15,
                                    marginLeft: 15,
                                  }}
                                  onClick={() => {
                                    setnomeTxtesc(txt.txt);
                                    GetTxtNome(txt.txt);
                                  }}
                                >
                                  <FaEye />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement={'top'}
                                delay={{ show: 100, hide: 250 }}
                                overlay={<Tooltip>Excluir</Tooltip>}
                              >
                                <button
                                  onClick={() => {
                                    setShowloadingdelete2(true);
                                    setnomeTxtesc(txt.txt);
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
                        className="alert alert-warning alerta-vendedor"
                        role="alert"
                      >
                        Nenhum txt encontrado.
                      </div>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
            <button
              style={{ width: 130, marginTop: 20 }}
              className="btn btn-danger"
              onClick={handleCloseloadingzpl}
            >
              Sair
            </button>
          </Modal.Body>
        </Modal>

        {/* //===================================modal unico zpl  ============================================ */}

        <Modal
          className="modal-confirm3"
          show={showloadingzplText}
          onHide={handleCloseloadingzplText}
        >
          <Modal.Header closeButton>
            <h1>{nomeTxtesc}</h1>
          </Modal.Header>
          <Modal.Body>
            <textarea
              id="sql"
              name="texto"
              value={conteudotxt}
              className="form-control inputparceirotext3"
              style={{ textAlign: 'justify' }}
            />
            <button
              style={{ width: 130, marginTop: 20 }}
              className="btn btn-danger"
              onClick={handleCloseloadingzplText}
            >
              Sair
            </button>
          </Modal.Body>
        </Modal>

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
              <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
              <h1 style={{ marginTop: 15 }}></h1>
              <ProgressBar className="progress" animated now={sucess} />
            </div>
          </Modal.Body>
        </Modal>

        {/* //===================================modal DELETE arquivo zpl ============================================ */}

        <Modal
          className="modal-confirm"
          show={showloadingdelete2}
          onHide={handleCloseloadingdelete2}
          backdrop="static"
        >
          <Modal.Body>
            <div style={{ marginTop: 20 }}>
              <img id="logoSankhya" src={logoAlyne} alt="" />
              <h1 style={{ marginTop: 15 }}></h1>
              <h1 style={{ marginTop: 15 }}>
                Deseja realmente excluir o arquivo {nomeTxtesc}?
              </h1>
              <h1 style={{ marginTop: 15 }}></h1>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              justifyContent: 'space-between',
              paddingLeft: 70,
              paddingRight: 70,
            }}
          >
            <button
              style={{ width: 130 }}
              className="btn btn-danger"
              onClick={DeleteTxt}
            >
              Sim
            </button>
            <button
              style={{ width: 130 }}
              className="btn btn-primary"
              onClick={handleCloseloadingdelete2}
            >
              Não
            </button>
          </Modal.Footer>
        </Modal>

        {/* //===================================modal DELETE ============================================ */}

        <Modal
          className="modal-confirm"
          show={showloadingdelete}
          onHide={handleCloseloadingdelete}
          backdrop="static"
        >
          <Modal.Body>
            <div style={{ marginTop: 20 }}>
              <img id="logoSankhya" src={logoAlyne} alt="" />
              <h1 style={{ marginTop: 15 }}></h1>
              <h1 style={{ marginTop: 15 }}>
                Deseja realmente excluir esta etiqueta?
              </h1>
              <h1 style={{ marginTop: 15 }}></h1>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              justifyContent: 'space-between',
              paddingLeft: 70,
              paddingRight: 70,
            }}
          >
            <button
              style={{ width: 130 }}
              className="btn btn-danger"
              onClick={DeleteEtiqueta}
            >
              Sim
            </button>
            <button
              style={{ width: 130 }}
              className="btn btn-primary"
              onClick={handleCloseloadingdelete}
            >
              Não
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          className="modal-confirm"
          show={showMensageSankhya}
          onHide={handleCloseMensageSankhya}
          backdrop="static"
        >
          <Modal.Body>
            <img id="logoSankhya" src={logoSankhya} alt="" />
            <h1 style={{ marginTop: 15 }}>Carregando dados</h1>
            <h1 style={{ marginTop: 15 }}></h1>
            <ProgressBar className="progress" animated now={sucess} />
            <button
              style={{ width: 130, marginTop: 15 }}
              className="btn btn-primary"
              onClick={handleCloseMensageSankhya}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>
      </div>
      <FooterMobile />
      <Footer />
    </>
  );
}
