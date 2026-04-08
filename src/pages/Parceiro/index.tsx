import React, { useEffect, useState, useRef } from 'react';
import '../Usuario/CadastroUser.scss';
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
import {
  iEmpresa,
  iTabelaCliente,
  iTabelaParceiro,
  iTipoNegociacao,
  iUsuarios,
} from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { phoneMask, cpfMask, cnpjMask, revertMask } from '../../Masks/Masks';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iDadosUsuario, iDataSelect, iParceiros, iDocumento } from '../../@types';
import Select from 'react-select';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';
import { Label } from '@mui/icons-material';

export default function CadastroParceiros() {
  const history = useNavigate();
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [idParceiro, setIdParceiro] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('F');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [consultandoCnpj, setConsultandoCnpj] = useState(false);
  const [cnpjUltimaConsulta, setCnpjUltimaConsulta] = useState('');
  const [email, setemail] = useState('');
  const [fone, setFone] = useState('');
  const [canal, setCanal] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [tamanhoLoja, setTamanhoLoja] = useState('');
  let [codVendedor, setCodVendedor] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [uf, setUf] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [status, setStatus] = useState('');
  const [semVisita, setSemVisita] = useState(false);
  const [primeiraSem, setPrimeiraSem] = useState(false);
  const [segundaSem, setSegundaSem] = useState(false);
  const [terceiraSem, setTerceiraSem] = useState(false);
  const [quartaSem, setQuartaSem] = useState(false);
  const [quintaSem, setQuintaSem] = useState(false);
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [tipoNegociacao, setTipoNegociacao] = useState('');
  const [tabNav, setTabNav] = useState('dados');
  const [empresa, setEmpresa] = useState('');
  let [inputVenedor, setInputVenedor] = useState('');
  let [tabela, setTabela] = useState<iTabelaParceiro[]>([]);
  let [idNovoParceiro, setIdNovoParceiro] = useState(0);
  let [placeHolder, setPlaceHolder] = useState('pesquisa por código ou nome');
  const [codParceiro, setCodParceiro] = useState(0);
  let [salvandoTab, setSalvandoTab] = useState(false);
  const [documentos, setDocumentos] = useState<iDocumento[]>([]);
  const [documentoFile, setDocumentoFile] = useState<File | null>(null);
  const [documentoDescricao, setDocumentoDescricao] = useState('');
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [error, setError] = useState('');
  let [tipoVendedor, setTipoVendedor] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  let [excluindo, setExcluindo] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [parceiros, setParceiros] = useState<iParceiros[]>([]);
  const [usuariosget, setUsuariosget] = useState<iUsuarios[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const [idTabela, setIdTabela] = useState(0);
  let [parceiroIdCad, setParceiroIdCad] = useState(0);

  const handleCloseEdit = () => {
    setShowEdit(false);
    setTabNav('dados');
    setDocumentos([]);
    setDocumentoFile(null);
    setDocumentoDescricao('');
  };
  const handleCloseMensage = () => setShowMensage(false);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  let [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  let [filter, setFilter] = useState(false);
  const [codEmpresa, setCodEmpresa] = useState('');
  const [showTabela, setShowTabela] = useState(false);
  let [novaTabela, setNovaTabela] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  let [naoSalvar, setNaoSalvar] = useState(false);
  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaStatus, setPesquisaStatus] = useState(false);
  const [pesquisaCPF, setPesquisaCPF] = useState(false);
  let [selectGrupo, setSelectGrupo] = useState<iDataSelect>();
  const [promotorPesquisa, setPromotorPesquisa] = useState<iDataSelect[]>([]);
  const [parceiroSelect, setparceiroSelect] = useState<iDataSelect[]>([]);
  let [negociacaoTipo, setNegociacaoTipo] = useState<iTipoNegociacao[]>([]);
  let [empresaSelect, setEmpresaSelect] = useState<iEmpresa[]>([]);
  const [tabelaSelect, setTabelaSelect] = useState<iDataSelect[]>([]);
  const [codTabelaPreco, setCodTabelaPreco] = useState('');
  const [showloading, setShowloading] = useState(true);
  const handleCloseloading = () => setShowloading(false);
  const [sucess, setSucess] = useState(0);
  const [tabelaVindoBanco, setTabelaVindoBanco] = useState(
    'Digite ou selecione'
  );
  let [editarTabela, setEditarTabela] = useState(false);

  function handleClose() {
    setShow(false);
    setNaoSalvar(false);
    naoSalvar = false;
    setDocumentos([]);
    setDocumentoFile(null);
    setDocumentoDescricao('');
  }

  function handleCloseTabela() {
    setShowTabela(false);
    setSalvandoTab(false);
    salvandoTab = false;
  }

  const formataData = (date: string) => {
    const dataFormate = date.split('T', 1);
    const newDate = dataFormate[0];
    const d = newDate.split('-');
    const data = `${d[2]}.${d[1]}.${d[0]}`;
    return data;
  };
  //======options dos selects ===================//
  const canalpesq = [
    { value: '1', label: 'Atacarejo' },
    { value: '2', label: 'Especializada' },
    { value: '3', label: 'Farma' },
    { value: '4', label: 'Varejo' },
  ];
  const classificacaopesq = [
    { value: '1', label: 'Diamante' },
    { value: '2', label: 'Ouro' },
    { value: '3', label: 'Prata' },
    { value: '4', label: 'Bronze' },
  ];
  const tamanhopesq = [
    { value: '1', label: 'G G' },
    { value: '2', label: 'G' },
    { value: '3', label: 'M' },
    { value: '4', label: 'P' },
  ];
  const ufpesq = [
    { value: 'AC', label: 'AC' },
    { value: 'AL', label: 'AL' },
    { value: 'AP', label: 'AP' },
    { value: 'AM', label: 'AM' },
    { value: 'BA', label: 'BA' },
    { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' },
    { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' },
    { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' },
    { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' },
    { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' },
    { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' },
    { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' },
    { value: 'RN', label: 'RN' },
    { value: 'RS', label: 'RS' },
    { value: 'RO', label: 'RO' },
    { value: 'RR', label: 'RR' },
    { value: 'SC', label: 'SC' },
    { value: 'SP', label: 'SP' },
    { value: 'SE', label: 'SE' },
    { value: 'TO', label: 'TO' },
  ];
  const empresaPesquisa = [
    { value: '1', label: 'Indústria' },
    { value: '2', label: 'Distribuidora' },
  ];

  const statuspesq = [
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Inativo' },
  ];
  const grupos = [
    { value: '1', label: 'ADMINISTRATIVO' },
    { value: '2', label: 'COMERCIAL' },
    { value: '3', label: 'REPRESENTANTE' },
    { value: '4', label: 'USUÁRIO' },
  ];

  const grupoCreate: iDataSelect[] = [
    { value: '2', label: 'COMERCIAL' },
    { value: '3', label: 'REPRESENTANTE' },
    { value: '4', label: 'USUÁRIO' },
  ];

  async function GetPromotor() {
    await api

      .get(`/api/Vendedor?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
          let promotor = response.data.data.filter(
            (p: any) => p.tipo == 'V' || p.tipo == 'P'
          );
          let options: Array<iDataSelect> = new Array<iDataSelect>();

          promotor.map((promotor: any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(promotor.id);
            rowGrupo.label = String(promotor.id) + ' - ' + promotor.nome;

            options.push(rowGrupo);
            setPromotorPesquisa(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  function ShowModalEdit() {
    setShowEdit(true);
  }

  //================================================//

  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  useEffect(() => {
    logado();
  }, []);

  function logado() {
    if (!usuariolog.token) {
      history('/');
    }
  }

  useEffect(() => {
    setSucess(50);
    window.scrollTo(0, 0);
    GetTipoNegociacao();
    GetPromotor();
    GetTabelaPreco();
    GetEmpresa();
    if (filter) {
      GetParceirosFilter(search);
    } else {
      GetParceiros();
    }
  }, [pagina]);

  useEffect(() => {
    GetParceiroBusca();
  }, []);

  useEffect(() => {
    console.log('parceirosss', parceiroSelect);
  }, [parceiroSelect]);

  async function GetParceiroBusca() {
    await api
      .get(`/api/Parceiro?pagina=1&totalpagina=999`)
      .then((response) => {
        setLoading(false);
        if (response.data.data.length > 0) {
          let promotor = response.data.data;
          let options: Array<iDataSelect> = new Array<iDataSelect>();

          promotor
            .filter((promotor: any) => promotor.status === 'S')
            .map((promotor: any) => {
              let listaPromotor: iDataSelect = {};
              listaPromotor.value = String(promotor.cnpj_Cpf);
              listaPromotor.label = String(promotor.id) + ' - ' + promotor.nome;

              options.push(listaPromotor);
              setparceiroSelect(options);
            });
          setShowloading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('Ocorreu um erro');
      });
  }

  async function GetTabelaPreco() {
    await api

      .get(`/api/TabelaPreco?pagina=1&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((produtos: any) => {
            let rowProd: iDataSelect = {};
            rowProd.value = String(produtos.id);
            rowProd.label = String(produtos.id) + ' - ' + produtos.descricao;

            options.push(rowProd);
            setTabelaSelect(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetEmpresa() {
    await api

      .get(`/api/Empresa?pagina=1&totalpagina=999`)
      .then((response) => {
        setEmpresaSelect(response.data.data);
        empresaSelect = response.data.data;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetTipoNegociacao() {
    setFilter(false);

    await api

      .get(`/api/TipoNegociacao?pagina=1&totalpagina=999`)
      .then((response) => {
        setNegociacaoTipo(response.data.data);
        negociacaoTipo = response.data.data;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

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

  type CnpjLookupResponse = {
    cnpj?: string;
    nome?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  };

  function somenteDigitos(valor: string): string {
    return String(valor || '').replace(/\D/g, '');
  }

  function montaEnderecoCnpj(data: CnpjLookupResponse): string {
    const partes = [data.endereco, data.numero, data.complemento]
      .map((p) => String(p || '').trim())
      .filter(Boolean);
    return partes.join(', ');
  }

  async function BuscarDadosCnpj() {
    const cnpjLimpo = somenteDigitos(cnpjCpf);
    if (cnpjLimpo.length !== 14) return;
    if (cnpjUltimaConsulta === cnpjLimpo) return;
    if (consultandoCnpj) return;

    setConsultandoCnpj(true);
    try {
      const response = await api.get(`/api/CabecalhoOrcamento/cnpj/${cnpjLimpo}`);
      const data = response.data as CnpjLookupResponse;
      const enderecoNovo = montaEnderecoCnpj(data);

      if (!nome) setNome(data.nome || '');
      if (!nomeFantasia) setNomeFantasia(data.nomeFantasia || '');
      if (!endereco) setEndereco(enderecoNovo);
      if (!bairro) setBairro(data.bairro || '');
      if (!municipio) setMunicipio(data.cidade || '');
      if (!uf) setUf(data.uf || '');

      setCnpjUltimaConsulta(cnpjLimpo);
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 404) {
        setAlertErroRegister(true);
        setMsgErro('CNPJ não encontrado.');
      } else if (status === 400) {
        setAlertErroRegister(true);
        setMsgErro('CNPJ inválido.');
      }
    } finally {
      setConsultandoCnpj(false);
    }
  }

  function handleShow() {
    setAlertErroRegister(false);
    setTabela([]);
    setId(0);
    setIdParceiro('');
    setNome('');
    setTipoPessoa('F');
    setNomeFantasia('');
    setCnpjCpf('');
    setCnpjUltimaConsulta('');
    setemail('');
    setFone('');
    setCanal('');
    setClassificacao('');
    setTamanhoLoja('');
    setCodVendedor('');
    setEndereco('');
    setBairro('');
    setMunicipio('');
    setUf('');
    setLat('');
    setLong('');
    setStatus('');
    setEmpresa('');
    setTipoNegociacao('');
    setSemVisita(false);
    setPrimeiraSem(false);
    setSegundaSem(false);
    setTerceiraSem(false);
    setQuartaSem(false);
    setQuintaSem(false);
    setSegunda(false);
    setTerca(false);
    setQuarta(false);
    setQuinta(false);
    setSexta(false);
    setSabado(false);
    setTabNav('dados');

    setShow(true);
  }

  async function GetParceiros() {
    setFilter(false);
    setSucess(80);
    await api

      .get(`/api/Parceiro?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setParceiros(response.data.data);

        parceiros = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));

        setSucess(100);
        setShowloading(false);
      })
      .catch((error) => {
        setShowloading(false);
        console.log('Ocorreu um erro');
        setSucess(100);
      });
  }

  async function GetParceirosFilter(search: any) {
    setFilter(true);

    if (pesquisaStatus) {
      await api
        .get(
          `/api/Parceiro/filter/status?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setParceiros(response.data.data);
          parceiros = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));

          console.log('Parceiros pesquisa', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    } else {
      await api
        .get(
          `/api/Parceiro/filter?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setParceiros(response.data.data);
          parceiros = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));

          console.log('Parceiros pesquisa', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }
  //=========== get Parceiros por ID ==================================//
  async function GetParceiroIdTab() {
    await api
      .get(`/api/Parceiro/${id}`)
      .then((response) => {
        console.log('parceiro id', response.data);
        setId(response.data.id);
        setTabela(response.data.tabelaPrecoParceiro);

        tabela = response.data.tabelaPrecoParceiro;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=========== get Parceiros por ID ==================================//
  async function GetParceiroId(id: any) {
    setId(0);
    setNome('');
    setIdParceiro('');
    setTipoPessoa('F');
    setNomeFantasia('');
    setCnpjCpf('');
    setemail('');
    setFone('');
    setCanal('');
    setClassificacao('');
    setTamanhoLoja('');
    setCodVendedor('');
    setEndereco('');
    setBairro('');
    setMunicipio('');
    setUf('');
    setLat('');
    setLong('');
    setStatus('');
    setEmpresa('');
    setTipoNegociacao('');
    setSemVisita(false);
    setPrimeiraSem(false);
    setSegundaSem(false);
    setTerceiraSem(false);
    setQuartaSem(false);
    setQuintaSem(false);
    setSegunda(false);
    setTerca(false);
    setQuarta(false);
    setQuinta(false);
    setSexta(false);
    setSabado(false);
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/Parceiro/${id}`)
      .then((response) => {
        console.log('parceiro id', response.data);
        setId(response.data.id);
        setIdParceiro(response.data.id);
        setNome(response.data.nome);
        setTipoPessoa(response.data.tipoPessoa);
        setNomeFantasia(response.data.nomeFantasia);
        setCnpjCpf(response.data.cnpj_Cpf);
        setemail(response.data.email);
        setFone(response.data.fone);
        setCanal(response.data.canal);
        setTipoVendedor(response.data.vendedor.tipo);
        tipoVendedor = response.data.vendedor.tipo;
        setClassificacao(response.data.classificacao);
        setTamanhoLoja(response.data.tamanhoLoja);
        setCodVendedor(response.data.vendedorId);
        setInputVenedor(
          response.data.vendedor.id + '-' + response.data.vendedor.nome
        );
        inputVenedor =
          response.data.vendedor.id + '-' + response.data.vendedor.nome;
        setEndereco(response.data.endereco);
        setBairro(response.data.bairro);
        setMunicipio(response.data.municipio);
        setUf(response.data.uf);
        setLat(response.data.lat);
        setLong(response.data.long);
        setStatus(response.data.status);
        setSemVisita(response.data.semVisita);
        setPrimeiraSem(response.data.primeiraSem);
        setSegundaSem(response.data.segundaSem);
        setTerceiraSem(response.data.terceiraSem);
        setQuartaSem(response.data.quartaSem);
        setQuintaSem(response.data.quintaSem);
        setSegunda(response.data.segunda);
        setTerca(response.data.terca);
        setQuarta(response.data.quarta);
        setQuinta(response.data.quinta);
        setSexta(response.data.sexta);
        setSabado(response.data.sabado);
        setEmpresa(response.data.empresa);
        setTipoNegociacao(response.data.tipoNegociacao);
        setTabela(response.data.tabelaPrecoParceiro);
        tabela = response.data.tabelaPrecoParceiro;
        carregarDocumentosParceiro(response.data.id);
        console.log('tipo vendedor', tipoVendedor);
        console.log('tabelas do parceiro', tabela);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar Usuario ===============================//
  async function editParceiro() {
    setLoadingUpdate(true);
    await api
      .put(`/api/Parceiro/${id}`, {
        id: id,
        codParceiro: Number(idParceiro),
        nome: nome,
        tipoPessoa: tipoPessoa,
        nomeFantasia: nomeFantasia,
        cnpj_Cpf: cnpjCpf,
        email: email,
        fone: fone,
        canal: canal,
        classificacao: classificacao,
        tamanhoLoja: tamanhoLoja,
        vendedorId: Number(codVendedor),
        endereco: endereco,
        bairro: bairro,
        municipio: municipio,
        uf: uf,
        lat: lat,
        long: long,
        status: status,
        semVisita: semVisita,
        primeiraSem: primeiraSem,
        segundaSem: segundaSem,
        terceiraSem: terceiraSem,
        quartaSem: quartaSem,
        quintaSem: quintaSem,
        segunda: segunda,
        terca: terca,
        quarta: quarta,
        quinta: quinta,
        sexta: sexta,
        sabado: sabado,
        tipoNegociacao: tipoNegociacao,
        empresa: empresa,
      })
      .then((response) => {
        handleCloseEdit();
        GetParceiros();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados do parceiro atualizados com sucesso.');
      })
      .catch((error) => {
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);

        const { data } = error.response;
        setMsgErro(error.response.data);

        return;
      });
  }

  //============ Criar produto ===============================//
  async function CreateTabela() {
    if (codEmpresa.trim() == '' || codEmpresa == undefined) {
      let senhaconf: any;
      senhaconf = document.getElementById('prinome');
      document.getElementById('prinome')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a empresa.');
      return;
    }

    if (codTabelaPreco.trim() == '' || codTabelaPreco == undefined) {
      let senhaconf: any;
      senhaconf = document.getElementById('prinome');
      document.getElementById('prinome')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a tabela de preço.');
      return;
    }

    setLoadingCreate(true);
    await api
      .post('/api/TabelaPrecoParceiro', {
        empresaId: Number(codEmpresa),
        parceiroId: Number(id),
        tabelaPrecoId: Number(codTabelaPreco),
      })

      .then((response) => {
        setLoadingCreate(false);
        handleCloseTabela();
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Tabela cadastrada com sucesso.');
        setSalvandoTab(false);
        salvandoTab = false;
        GetParceiroIdTab();
      })
      .catch((error) => {
        setAlertErroMensage(true);
        setLoadingCreate(false);
        window.scrollTo(0, 0);
        console.log(error.response);
        handleShowMensage();
        setAlertErroMensage(true);
        const data = error.response.data;
        setMsgErro(error.response.data);

        return;
      });
  }
  //============ Criar Usuario ===============================//
  async function CreateParceiro() {
    console.log('codVendedor', codVendedor);

    if (nome.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('nome');
      document.getElementById('nome')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o nome do parceiro.');
      return;
    }
    if (cnpjCpf.trim() == '') {
      if (tipoPessoa == 'J') {
        let cpf: any;
        cpf = document.getElementById('cnpj');
        document.getElementById('cnpj')?.focus();
        setAlertErroRegister(true);
        setMsgErro(`É obrigatório informar o CNPJ.`);
        return;
      } else {
        let cpf: any;
        cpf = document.getElementById('cpf');
        document.getElementById('cpf')?.focus();
        setAlertErroRegister(true);
        setMsgErro(`É obrigatório informar o CPF.`);
        return;
      }
    }
    if (canal.trim() == '') {
      window.scrollTo(0, 0);
      let senhaconf: any;
      senhaconf = document.getElementById('canal');
      document.getElementById('canal')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o canal.');
      return;
    }
    if (classificacao.trim() == '') {
      window.scrollTo(0, 0);
      let senhaconf: any;
      senhaconf = document.getElementById('classificacao');
      document.getElementById('classificacao')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a classificação.');
      return;
    }
    if (tamanhoLoja.trim() == '') {
      window.scrollTo(0, 0);
      let senhaconf: any;
      senhaconf = document.getElementById('tamanhoLoja');
      document.getElementById('tamanhoLoja')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o tamanho da loja.');
      return;
    }
    if (codVendedor.trim() == '') {
      window.scrollTo(0, 0);
      let senhaconf: any;
      senhaconf = document.getElementById('promotor');
      document.getElementById('promotor')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o promotor.');
      return;
    }
    if (tipoNegociacao.trim() == '') {
      window.scrollTo(0, 0);
      let senhaconf: any;
      senhaconf = document.getElementById('promotor');
      document.getElementById('promotor')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o tipo de negociação.');
      return;
    }

    if (naoSalvar == false) {
      setLoadingCreate(true);
    }

    await api
      .post('/api/Parceiro', {
        codParceiro: Number(idParceiro),
        nome: nome,
        tipoPessoa: tipoPessoa,
        nomeFantasia: nomeFantasia,
        cnpj_Cpf: cnpjCpf,
        email: email,
        fone: fone,
        canal: canal,
        classificacao: classificacao,
        tamanhoLoja: tamanhoLoja,
        vendedorId: Number(codVendedor),
        endereco: endereco,
        bairro: bairro,
        municipio: municipio,
        uf: uf,
        lat: lat,
        long: long,
        status: 'true',
        semVisita: semVisita,
        primeiraSem: primeiraSem,
        segundaSem: segundaSem,
        terceiraSem: terceiraSem,
        quartaSem: quartaSem,
        quintaSem: quintaSem,
        segunda: segunda,
        terca: terca,
        quarta: quarta,
        quinta: quinta,
        sexta: sexta,
        sabado: sabado,
        tipoNegociacao: tipoNegociacao,
        empresa: empresa,
      })

      .then((response) => {
        setLoadingCreate(false);

        if (salvandoTab == true) {
        } else {
          handleClose();
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro('Parceiro criado com sucesso.');
        }
        setIdNovoParceiro(response.data.data);
        idNovoParceiro = response.data.data;
        setId(response.data.data);
        setParceiroIdCad(response.data.data);
        carregarDocumentosParceiro(response.data.data);
        parceiroputId();
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);

        if (error.response.data) {
          setLoadingCreate(false);
          console.log(error.response.data);
          setMsgErro(error.response.data);
        } else {
          setMsgErro(
            'Houve um erro ao tentar criar o usuário. Tente novamente mais tarde.'
          );
        }
        setLoadingCreate(false);

        return;
      });
  }

  async function parceiroputId() {
    await api
      .get(`/api/Parceiro/${idNovoParceiro}`)
      .then((response) => {
        if (
          response.data.codParceiro == null ||
          response.data.codParceiro == ''
        ) {
          criandoCodigo();
        } else {
          GetParceiros();
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function criandoCodigo() {
    await api
      .put(`/api/Parceiro/${idNovoParceiro}`, {
        id: idNovoParceiro,
        codParceiro: idNovoParceiro,
        nome: nome,
        tipoPessoa: tipoPessoa,
        nomeFantasia: nomeFantasia,
        cnpj_Cpf: cnpjCpf,
        email: email,
        fone: fone,
        canal: canal,
        classificacao: classificacao,
        tamanhoLoja: tamanhoLoja,
        vendedorId: Number(codVendedor),
        endereco: endereco,
        bairro: bairro,
        municipio: municipio,
        uf: uf,
        lat: lat,
        long: long,
        status: 'true',
        semVisita: semVisita,
        primeiraSem: primeiraSem,
        segundaSem: segundaSem,
        terceiraSem: terceiraSem,
        quartaSem: quartaSem,
        quintaSem: quintaSem,
        segunda: segunda,
        terca: terca,
        quarta: quarta,
        quinta: quinta,
        sexta: sexta,
        sabado: sabado,
        tipoNegociacao: tipoNegociacao,
        empresa: empresa,
      })
      .then((response) => {
        setIdNovoParceiro(0);
        GetParceiros();
      })
      .catch((error) => {});
  }

  async function carregarDocumentosParceiro(parceiroId: number) {
    setLoadingDocs(true);
    await api
      .get('/api/documentos', { params: { parceiroId } })
      .then((response) => {
        setDocumentos(response.data || []);
      })
      .catch(() => {
        setDocumentos([]);
      })
      .finally(() => {
        setLoadingDocs(false);
      });
  }

  async function uploadDocumentoParceiro() {
    if (!documentoFile) {
      handleShowMensage();
      setAlertErroMensage(true);
      setMsgErro('Selecione um arquivo.');
      return;
    }
    if (!id || id === 0) {
      handleShowMensage();
      setAlertErroMensage(true);
      setMsgErro('Salve o parceiro antes de enviar documentos.');
      return;
    }

    setUploadingDoc(true);
    const formData = new FormData();
    formData.append('parceiroId', String(id));
    formData.append('file', documentoFile);
    if (documentoDescricao) {
      formData.append('descricao', documentoDescricao);
    }

    await api
      .post('/api/documentos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        setDocumentoFile(null);
        setDocumentoDescricao('');
        carregarDocumentosParceiro(id);
      })
      .catch(() => {
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Erro ao enviar documento.');
      })
      .finally(() => {
        setUploadingDoc(false);
      });
  }

  function abrirDocumento(doc: iDocumento) {
    const base = (api.defaults.baseURL || '').replace(/\/$/, '');
    const url = `${base}${doc.urlArquivo}`;
    window.open(url, '_blank');
  }
  const parceiroSelectRef = useRef<Select | null>(null);

  const [vasio, setvasio] = useState(false);
  //==========================================================//
  function LimparPesquisa() {
    setparceiroSelect([]);
    PesquisaNome();
    setSearch('');
    setvasio(true);
    setSearchStatus('');
    setPagina(1);
    setFilter(false);
    GetParceiros();
    GetParceiroBusca();
  }

  function PesquisaNome() {
    setSearch('');
    GetParceiros();
    setPesquisaNome(true);
    setPesquisaStatus(false);
    setPesquisaCPF(false);
    let pesquisa: any;
    let pesquisar: any;
    pesquisar = document.getElementById('nomePesquisa');
    document.getElementById('nomePesquisa')?.focus();
  }

  function PesquisaStatus() {
    setSearch('');
    GetParceiros();
    setPesquisaNome(false);
    setPesquisaStatus(true);
    setPesquisaCPF(false);
    let pesquisa: any;
    pesquisa = document.getElementById('statusPesquisa');
    document.getElementById('statusPesquisa')?.focus();
  }

  function PesquisaCPF() {
    setSearch('');
    GetParceiros();
    setPesquisaNome(false);
    setPesquisaStatus(false);
    setPesquisaCPF(true);
    let pesquisa: any;
    pesquisa = document.getElementById('cpfPesquisa');
    document.getElementById('cpfPesquisa')?.focus();
  }

  function Pesquisa(event: any) {
    event.preventDefault();
    setPagina(1);
    setFilter(true);
    filter = true;
    if (pesquisaNome) {
      GetParceirosFilter(search);
    }
    if (pesquisaStatus) {
      GetParceirosFilter(search);
    }
    if (pesquisaCPF) {
      GetParceirosFilter(search);
    }
    if (search == '') {
      LimparPesquisa();
    }
  }

  function ChecaFone() {
    console.log('caiu no telefone');
    if (fone.length < 14) {
      let senhaconf: any;
      senhaconf = document.getElementById('fone');
      document.getElementById('fone')?.focus();
      setAlertErroRegister(true);
      setMsgErro('O telefone está incompleto');

      return;
    }
  }
  function ChecaCPF() {
    if (cnpjCpf.length < 11) {
      let senhaconf: any;
      senhaconf = document.getElementById('cpf');
      document.getElementById('cpf')?.focus();
      setAlertErroRegister(true);
      setMsgErro('O CPF está incompleto');

      return;
    }
  }
  async function ChecaCNPJ() {
    if (cnpjCpf.length < 14) {
      let senhaconf: any;
      senhaconf = document.getElementById('cnpj');
      document.getElementById('cnpj')?.focus();
      setAlertErroRegister(true);
      setMsgErro('O CNPJ está incompleto');

      return;
    }
    await BuscarDadosCnpj();
  }
  function SemVisitar() {
    setPrimeiraSem(false);
    setSegundaSem(false);
    setTerceiraSem(false);
    setQuartaSem(false);
    setQuintaSem(false);
    setSegunda(false);
    setTerca(false);
    setQuarta(false);
    setQuinta(false);
    setSexta(false);
    setSabado(false);
  }
  //=========== get produto por ID ==================================//
  async function GetTabelaId(id: any) {
    await api
      .get(`/api/TabelaPrecoParceiro/${id}`)
      .then((response) => {
        console.log('tabela id', response.data);
        setCodEmpresa(response.data.empresaId);
        setIdTabela(response.data.id);
        setCodParceiro(response.data.id);
        setTabelaVindoBanco(
          response.data.tabelaPreco.codigo +
            ' - ' +
            response.data.tabelaPreco.descricao
        );
        setCodTabelaPreco(response.data.tabelaPreco.codigo);

        setShowTabela(true);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar produto ===============================//
  async function EditeTabela() {
    setLoadingUpdate(true);
    await api
      .put(`/api/TabelaPrecoParceiro/${idTabela}`, {
        id: idTabela,
        empresaId: Number(codEmpresa),
        parceiroId: Number(codParceiro),
        tabelaPrecoId: Number(codTabelaPreco),
      })
      .then((response) => {
        handleCloseEdit();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Tabela atualizada com sucesso.');
        setEditarTabela(false);
        editarTabela = false;
      })
      .catch((error) => {
        setLoadingUpdate(false);
        handleCloseEdit();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);
        const { data } = error.response;
        setMsgErro(error.response.data);

        return;
      });
  }
  //==== EXCLUIR PRODUTO ======================================
  async function DeleteTabela(id: any) {
    setExcluindo(true);
    excluindo = true;
    await api
      .delete(`/api/TabelaPrecoParceiro/${id}`)
      .then((response) => {
        GetParceiroIdTab();
        setLoadingUpdate(false);
        setTabNav('dados');
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Tabela excluída com sucesso.');
      })
      .catch((error) => {
        setLoadingUpdate(false);
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);
        const { data } = error.response;
        setMsgErro(error.response.data);

        return;
      });
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
              <h1>Cadastro de Parceiros</h1>
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
                    <div className="pesBloco">
                      <div className="title-pesBloco">
                        <span style={{ fontSize: 14 }}>Pesquisar por:</span>
                      </div>
                      <div className="d-flex div-parceiros-pesquisa">
                        <input
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaNome}
                          onChange={PesquisaNome}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Nome</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaCPF}
                          onChange={PesquisaCPF}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>
                          CPF / CNPJ
                        </p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaStatus}
                          onChange={PesquisaStatus}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Status</p>
                      </div>
                    </div>
                    <OverlayTrigger
                      placement={'top'}
                      delay={{ show: 100, hide: 250 }}
                      overlay={<Tooltip>Novo Parceiro</Tooltip>}
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
                  <form
                    onSubmit={Pesquisa}
                    style={{ marginTop: 10, width: '100%' }}
                    className="conteudo-botoes"
                  >
                    <div className="bloco-pesquisa-input">
                      {pesquisaNome ? (
                        <>
                          <div>
                            <p
                              style={{ marginBottom: 10 }}
                              className="title-input"
                            >
                              Pesquisar por código ou nome:{' '}
                            </p>
                            <Select
                              id="parceiroInput"
                              className="inputparceiro"
                              placeholder={placeHolder}
                              onBlur={GetParceirosFilter}
                              noOptionsMessage={() =>
                                'Nenhum cliente encontrado'
                              }
                              options={parceiroSelect}
                              onChange={(value: any) => {
                                setSearch(value.value);
                                GetParceirosFilter(value.value);
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaCPF ? (
                        <>
                          <div>
                            <p className="title-input">
                              Pesquisar por CPF / CNPJ:{' '}
                            </p>
                            <input
                              id="cpfPesquisa"
                              type="text"
                              className="form-control select  inputparceiro"
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(revertMask(e.target.value));
                                GetParceirosFilter(revertMask(e.target.value));
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
                            <p className="title-input">
                              Pesquisar por status:{' '}
                            </p>
                            <select
                              id="statusPesquisa"
                              className="form-select select inputparceiro  campo-select"
                              aria-label=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                search = e.target.value;
                                setPagina(1);
                                GetParceirosFilter(e.target.value);
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
                    </div>
                    <div className="pesquisa-div">
                      <button
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-dark btn-pesquisas btn-pesquisar"
                        onClick={() => {
                          setPagina(1);
                          GetParceirosFilter(search);
                        }}
                      >
                        Pesquisar
                        <FaSearchPlus style={{ marginLeft: 6 }} fontSize={12} />
                      </button>
                      <button
                        type="button"
                        style={{ marginTop: 20, height: 45 }}
                        className="btn btn-danger btn-pesquisas"
                        onClick={LimparPesquisa}
                      >
                        Limpar
                        <AiOutlineClear
                          style={{ marginLeft: 6 }}
                          fontSize={13}
                        />
                      </button>
                    </div>
                  </form>
                  <div className="table-responsive table-scroll tabela-responsiva">
                    <div className=" table-wrap">
                      <Table
                        responsive
                        className="table-global table  main-table"
                      >
                        <thead>
                          <tr className="tituloTab">
                            <th
                              style={{ textAlign: 'center' }}
                              id="codigo-tabela"
                              className="th4 codpar"
                            >
                              Código
                            </th>
                            <th className="th1 Nome-complet">Nome</th>
                            <th style={{ textAlign: 'center' }} className="th2">
                              CNPJ / CPF
                            </th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              Status
                            </th>
                            <th className="th3">Endereço</th>
                            <th className="th3">Bairro</th>
                            <th className="th3">Município</th>
                            <th style={{ textAlign: 'center' }} className="th4">
                              UF
                            </th>
                            <th
                              style={{ color: 'transparent' }}
                              className="th2"
                            >
                              .
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
                          {parceiros.length > 0 ? (
                            <>
                              {parceiros.map((parceiros, index) => (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    setTabNav('dados');
                                    GetParceiroId(parceiros.id);
                                  }}
                                >
                                  <td
                                    style={{ textAlign: 'center' }}
                                    id="codigo-tabela"
                                    className="codpar"
                                  >
                                    {parceiros.id}
                                  </td>
                                  <td id="nome-desc" className="Nome-complet">
                                    {parceiros.nome}
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    {parceiros.cnpj_Cpf
                                      ? parceiros?.tipoPessoa == 'F'
                                        ? cpfMask(parceiros?.cnpj_Cpf)
                                        : cnpjMask(parceiros?.cnpj_Cpf)
                                      : ''}
                                  </td>
                                  <td
                                    style={
                                      parceiros.status == 'S'
                                        ? {
                                            color: '#008000',
                                            textAlign: 'center',
                                          }
                                        : { color: 'red', textAlign: 'center' }
                                    }
                                  >
                                    {parceiros.status == 'S'
                                      ? 'Ativo'
                                      : 'Inativo'}
                                  </td>
                                  <td id="endereco-tabela">
                                    {parceiros.endereco}
                                  </td>
                                  <td>{parceiros.bairro}</td>
                                  <td>{parceiros.municipio}</td>
                                  <td style={{ textAlign: 'center' }}>
                                    {parceiros.uf}
                                  </td>

                                  <td style={{ color: 'transparent' }}>
                                    .............
                                  </td>
                                  <td style={{ color: 'transparent' }}>
                                    .............
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
                                          setTabNav('dados');
                                          GetParceiroId(parceiros.id);
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
                              className="alert alert-warning alerta-parceiro"
                              role="alert"
                            >
                              Nenhum parceiro encontrado.
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
          className="modal-cadastro-parceiro"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <h1>Cadastro de Parceiro</h1>
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
                    <div className="conteudo-cadastro-parceiro">
                      <div className="coluna-dupla">
                        <div className="bloco-input">
                          <p className="title-input">
                            Nome: <span style={{ color: 'red' }}>*</span>
                          </p>
                          <input
                            className="form-control select inputparceiro"
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => {
                              setNome(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input blocoTipo ">
                          <p className="title-input">Pessoa: </p>
                          <select
                            name=""
                            id="tipo"
                            className="form-select select inputparceiro campo-select"
                            value={tipoPessoa}
                            onChange={(e) => {
                              setTipoPessoa(e.target.value);
                              setCnpjCpf('');
                              LimparTodos();
                            }}
                          >
                            <option value="F">Física</option>
                            <option value="J">Jurídica</option>
                          </select>
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        {tipoPessoa == 'J' ? (
                          <>
                            <div className="bloco-input">
                              <p className="title-input">Nome Fantasia: </p>
                              <input
                                className="form-control select inputparceiro"
                                id="nomeFantasia"
                                type="text"
                                value={nomeFantasia}
                                onChange={(e) => {
                                  setNomeFantasia(e.target.value);
                                  LimparTodos();
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input">
                          {tipoPessoa == 'J' ? (
                            <>
                              <p className="title-input">
                                CNPJ: <span style={{ color: 'red' }}>*</span>
                              </p>
                              <input
                                className="form-control select inputparceiro"
                                id="cnpj"
                                type="text"
                                onBlur={ChecaCNPJ}
                                maxLength={18}
                                value={cnpjCpf ? cnpjMask(cnpjCpf) : cnpjCpf}
                                onChange={(e) => {
                                  setCnpjCpf(revertMask(e.target.value));
                                  LimparTodos();
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <p className="title-input">
                                CPF: <span style={{ color: 'red' }}>*</span>
                              </p>
                              <input
                                className="form-control select inputparceiro"
                                id="cpf"
                                type="text"
                                value={cnpjCpf ? cpfMask(cnpjCpf) : cnpjCpf}
                                onBlur={ChecaCPF}
                                onChange={(e) => {
                                  setCnpjCpf(revertMask(e.target.value));
                                  LimparTodos();
                                }}
                              />
                            </>
                          )}
                        </div>
                        <div className="bloco-input ">
                          <p className="title-input">E-mail: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                              setemail(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input">
                          <p className="title-input">Telefone: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="fone"
                            type="text"
                            onBlur={ChecaFone}
                            maxLength={15}
                            value={fone ? phoneMask(fone) : fone}
                            onChange={(e) => {
                              setFone(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input ">
                          <p className="title-input">
                            Canal: <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="canal"
                            className="inputparceiro"
                            placeholder={canal}
                            noOptionsMessage={() => 'Nenhum canal encontrado'}
                            options={canalpesq}
                            onChange={(value: any) => {
                              setCanal(value.label);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input ">
                          <p className="title-input">
                            Classificação:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="classificacao"
                            className="inputparceiro"
                            placeholder={classificacao}
                            noOptionsMessage={() =>
                              'Nenhuma classificação encontrada'
                            }
                            options={classificacaopesq}
                            onChange={(value: any) => {
                              setClassificacao(value.label);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input ">
                          <p className="title-input">
                            Tamanho da loja:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="tamanhoLoja"
                            className="inputparceiro"
                            placeholder={tamanhoLoja}
                            noOptionsMessage={() =>
                              'Nenhuma tamanho encontrada'
                            }
                            options={tamanhopesq}
                            onChange={(value: any) => {
                              setTamanhoLoja(value.label);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input bloco-endereco ">
                          <p className="title-input">Endereço: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="endereco"
                            type="text"
                            value={endereco}
                            onChange={(e) => {
                              setEndereco(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input bloco-bairro ">
                          <p className="title-input">Bairro: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="bairro"
                            type="text"
                            value={bairro}
                            onChange={(e) => {
                              setBairro(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input  bloco-municipio ">
                          <p className="title-input">Município: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="municipio"
                            type="text"
                            value={municipio}
                            onChange={(e) => {
                              setMunicipio(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input bloco-uf ">
                          <p className="title-input">UF: </p>
                          <Select
                            id="uf"
                            className="inputparceiro"
                            placeholder={uf}
                            noOptionsMessage={() =>
                              'Nenhuma tamanho encontrada'
                            }
                            options={ufpesq}
                            onChange={(value: any) => {
                              setUf(value.value);
                              console.log('Select', value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="d-flex boco-lat-log">
                          <div className="bloco-input bloco-lat ">
                            <p className="title-input">Lat: </p>
                            <input
                              className="form-control select inputparceiro"
                              id="lat"
                              type="text"
                              value={lat}
                              onChange={(e) => {
                                setLat(e.target.value);
                                LimparTodos();
                              }}
                            />
                          </div>
                          <div className="bloco-input bloco-lat ">
                            <p className="title-input">Log: </p>
                            <input
                              className="form-control select inputparceiro"
                              id="llo"
                              type="text"
                              value={long}
                              onChange={(e) => {
                                setLong(e.target.value);
                                LimparTodos();
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input bloco-corretor">
                          <p className="title-input">
                            Promotor / Vendedor:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="promotor"
                            className="inputparceiro"
                            noOptionsMessage={() =>
                              'Nenhuma promotor encontrada'
                            }
                            options={promotorPesquisa}
                            onChange={(value: any) => {
                              setCodVendedor(value.value);
                              codVendedor = value.value;
                              console.log('cod vendedor', codVendedor);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input tiponego">
                          <p className="title-input">
                            Tipo Negociação:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>

                          <select
                            className="form-select select inputparceiro"
                            aria-label=""
                            value={tipoNegociacao}
                            onChange={(e) => {
                              setTipoNegociacao(e.target.value);
                              LimparTodos();
                            }}
                          >
                            <option value="0"></option>
                            {negociacaoTipo.length > 0 ? (
                              <>
                                {negociacaoTipo.map((tipo, index) => (
                                  <option value={tipo.id}>
                                    {tipo.descricao}
                                  </option>
                                ))}
                              </>
                            ) : (
                              <>
                                <option value="0">
                                  Nenhum Tipo encontrado
                                </option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="visitas"
                    title="Visitas"
                    style={{ minHeight: 400 }}
                  >
                    <div className="div-visitas">
                      <div className="bloco-visita-geral bloco-visitas">
                        <div style={{ marginBottom: 20 }} className="d-flex">
                          <p style={{ marginRight: 10 }} className="text">
                            SEM VISITA
                          </p>
                          <input
                            type="checkbox"
                            name="grupo"
                            id="grupo"
                            checked={semVisita}
                            onChange={({ target }) => {
                              setSemVisita(target.checked);
                              SemVisitar();
                            }}
                          />
                        </div>
                        <div className="divisao"></div>
                        <div
                          style={{ marginTop: 7 }}
                          className="check-grupo"
                        ></div>
                        <div className="d-flex ">
                          <div className="bloco-interno">
                            <h2>Semana da visita</h2>
                            <div className="check-grupo">
                              <p style={{ marginRight: 16 }} className="text">
                                Primeira
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={primeiraSem}
                                onChange={({ target }) => {
                                  setPrimeiraSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 12 }} className="text">
                                Segunda
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={segundaSem}
                                onChange={({ target }) => {
                                  setSegundaSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 17 }} className="text">
                                Terceira
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={terceiraSem}
                                onChange={({ target }) => {
                                  setTerceiraSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 24 }} className="text">
                                Quarta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quartaSem}
                                onChange={({ target }) => {
                                  setQuartaSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 28 }} className="text">
                                Quinta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quintaSem}
                                onChange={({ target }) => {
                                  setQuintaSem(target.checked);
                                }}
                              />
                            </div>
                          </div>
                          <div className="bloco-interno">
                            <h2>Dia da visita</h2>
                            <div className="check-grupo">
                              <p style={{ marginRight: 16 }} className="text">
                                Segunda
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={segunda}
                                onChange={({ target }) => {
                                  setSegunda(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 38 }} className="text">
                                Terça
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={terca}
                                onChange={({ target }) => {
                                  setTerca(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 26 }} className="text">
                                Quarta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quarta}
                                onChange={({ target }) => {
                                  setQuarta(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 29 }} className="text">
                                Quinta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quinta}
                                onChange={({ target }) => {
                                  setQuinta(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 35 }} className="text">
                                Sexta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={sexta}
                                onChange={({ target }) => {
                                  setSexta(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 21 }} className="text">
                                Sábado
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={sabado}
                                onChange={({ target }) => {
                                  setSabado(target.checked);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="tabelas"
                    title="Tabelas de Preço"
                    style={{ minHeight: 430 }}
                  >
                    <div style={{ height: 60 }} className="div-button-top">
                      <OverlayTrigger
                        placement={'top'}
                        delay={{ show: 100, hide: 250 }}
                        overlay={<Tooltip>Nova Tabela</Tooltip>}
                      >
                        <button
                          style={{ marginTop: 40 }}
                          className="btn btn-dark btn-direito"
                          disabled={
                            nome == '' ||
                            cnpjCpf == '' ||
                            canal == '' ||
                            classificacao == '' ||
                            codVendedor == '' ||
                            tamanhoLoja == '' ||
                            tipoNegociacao == ''
                          }
                          onClick={() => {
                            setCodEmpresa('');
                            setCodTabelaPreco('');
                            setTabelaVindoBanco('Digite ou selecione');
                            setTabNav('tabelas');
                            setShowTabela(true);
                            if (naoSalvar == false) {
                              setSalvandoTab(true);
                              salvandoTab = true;
                              setNaoSalvar(true);
                              naoSalvar = true;
                              CreateParceiro();
                            }
                          }}
                        >
                          Novo{' '}
                          <TfiNewWindow
                            style={{ marginLeft: 8, marginBottom: 5 }}
                          />
                        </button>
                      </OverlayTrigger>
                    </div>
                    <div className="table-responsive table-scroll tabela-responsiva">
                      <div className=" table-wrap">
                        <Table
                          responsive
                          className="table-global table  main-table"
                        >
                          <thead>
                            <tr className="tituloTab">
                              <th className="th1 div-cod-prod">Empresa </th>
                              <th className="th1 Nome-complet">Tabela</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th2 div-cod-prod"
                              >
                                Data inicial
                              </th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th2 div-cod-prod"
                              >
                                Data final
                              </th>
                              <th
                                style={{ color: 'transparent' }}
                                className="th3"
                              >
                                ....
                              </th>

                              <th className="th4">.</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th4 fixed-table"
                              >
                                Ações
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tabela?.length > 0 ? (
                              <>
                                {tabela?.map((tabela, index) => (
                                  <tr key={index} onClick={() => {}}>
                                    <td className="">
                                      {tabela.empresa.id}
                                      {' - '}
                                      {tabela.empresa.descricao}
                                    </td>
                                    <td className="">
                                      {tabela.tabelaPreco.codigo}
                                      {' - '}
                                      {tabela.tabelaPreco.descricao}
                                    </td>
                                    <td
                                      className=""
                                      style={{ textAlign: 'center' }}
                                    >
                                      {formataData(
                                        tabela.tabelaPreco.dataInicial
                                      )}
                                    </td>
                                    <td
                                      className=""
                                      style={{ textAlign: 'center' }}
                                    >
                                      {formataData(
                                        tabela.tabelaPreco.dataFinal
                                      )}
                                    </td>
                                    <td style={{ color: 'transparent' }}>
                                      .............
                                    </td>
                                    <td style={{ color: 'transparent' }}>
                                      .............
                                    </td>
                                    <td
                                      style={{ textAlign: 'center' }}
                                      className="fixed-table td-fixo"
                                    >
                                      <OverlayTrigger
                                        placement={'top'}
                                        delay={{ show: 100, hide: 250 }}
                                        overlay={<Tooltip>Excluir</Tooltip>}
                                      >
                                        <button
                                          onClick={() => {
                                            // ====aqui=============
                                            DeleteTabela(tabela.id);
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
                                className="alert alert-warning alerta-user"
                                role="alert"
                              >
                                Nenhuma tabela encontrada.
                              </div>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="documentos"
                    title="Documentos"
                    style={{ minHeight: 430 }}
                  >
                    <div style={{ padding: 10 }}>
                      <div className="coluna-dupla">
                        <div className="bloco-input">
                          <p className="title-input">Arquivo (PDF ou imagem):</p>
                          <input
                            type="file"
                            accept="application/pdf,image/*"
                            className="form-control"
                            onChange={(e) => {
                              const f = e.target.files && e.target.files[0];
                              setDocumentoFile(f || null);
                            }}
                          />
                        </div>
                        <div className="bloco-input">
                          <p className="title-input">Descrição:</p>
                          <input
                            type="text"
                            className="form-control"
                            value={documentoDescricao}
                            onChange={(e) => setDocumentoDescricao(e.target.value)}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <button
                          className="btn btn-dark btn-acao-sm"
                          disabled={uploadingDoc || id === 0 || !documentoFile}
                          onClick={uploadDocumentoParceiro}
                        >
                          {uploadingDoc ? 'Enviando...' : 'Enviar'}
                        </button>
                      </div>

                      <div style={{ marginTop: 20 }}>
                        {loadingDocs ? (
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status"></div>
                          </div>
                        ) : documentos.length > 0 ? (
                          <div className="table-responsive table-scroll tabela-responsiva">
                            <div className="table-wrap">
                              <Table
                                responsive
                                className="table-global table  main-table"
                              >
                                <thead>
                                  <tr className="tituloTab">
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th style={{ textAlign: 'center' }}>Data</th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="fixed-table"
                                    >
                                      Ações
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {documentos.map((doc) => (
                                    <tr key={doc.id}>
                                      <td>{doc.nomeArquivo}</td>
                                      <td>{doc.contentType}</td>
                                      <td style={{ textAlign: 'center' }}>
                                        {formataData(doc.criadoEm)}
                                      </td>
                                      <td
                                        style={{ textAlign: 'center' }}
                                        className="fixed-table td-fixo"
                                      >
                                        <button
                                          className="btn btn-table btn-edit"
                                          onClick={() => abrirDocumento(doc)}
                                        >
                                          Abrir
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{ width: '100%', marginTop: 10 }}
                            className="alert alert-warning alerta-user"
                            role="alert"
                          >
                            Nenhum documento encontrado.
                          </div>
                        )}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <div className="form-cadastro-user">
                  <div className="div-conteudo-btn">
                    <button
                      disabled={loadingCreate}
                      type="button"
                      id="btn"
                      className="btn btn-dark btn-salvarparceiro"
                      onClick={() => {
                        setTabNav('dados');
                        setId(0);
                        if (naoSalvar) {
                          handleClose();
                        } else {
                          CreateParceiro();
                        }
                      }}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Edit ============================================== */}

        <Modal
          className="modal-cadastro-parceiro"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Dados do Parceiro</h1>
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
                    <div className="conteudo-cadastro-parceiro">
                      <div className="coluna-dupla">
                        <div className="coluna-codigo">
                          <p className="title-input">Código:</p>
                          <input
                            className="form-control select inputparceiro codigo-cadastro"
                            id="nome"
                            type="text"
                            value={idParceiro}
                            disabled
                            onChange={(e) => {
                              setIdParceiro(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input">
                          <p className="title-input">
                            Nome: <span style={{ color: 'red' }}>*</span>
                          </p>
                          <input
                            className="form-control select inputparceiro"
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => {
                              setNome(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input blocoTipo ">
                          <p className="title-input">Status: </p>
                          <select
                            name=""
                            id="tipo"
                            className="form-select select inputparceiro campo-select"
                            value={status}
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                          >
                            <option value="S">Ativo</option>
                            <option value="N">Inativo</option>
                          </select>
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        {tipoPessoa == 'J' ? (
                          <>
                            <div className="bloco-input">
                              <p className="title-input">Nome Fantasia: </p>
                              <input
                                className="form-control select inputparceiro"
                                id="nomeFantasia"
                                type="text"
                                value={nomeFantasia}
                                onChange={(e) => {
                                  setNomeFantasia(e.target.value);
                                  LimparTodos();
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input">
                          {tipoPessoa == 'J' ? (
                            <>
                              <p className="title-input">
                                CNPJ: <span style={{ color: 'red' }}>*</span>
                              </p>
                              <input
                                className="form-control select inputparceiro"
                                id="cnpj"
                                type="text"
                                onBlur={ChecaCNPJ}
                                maxLength={18}
                                value={cnpjCpf ? cnpjMask(cnpjCpf) : cnpjCpf}
                                onChange={(e) => {
                                  setCnpjCpf(revertMask(e.target.value));
                                  LimparTodos();
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <p className="title-input">
                                CPF: <span style={{ color: 'red' }}>*</span>
                              </p>
                              <input
                                className="form-control select inputparceiro"
                                id="cpf"
                                type="text"
                                value={cnpjCpf ? cpfMask(cnpjCpf) : cnpjCpf}
                                onBlur={ChecaCPF}
                                onChange={(e) => {
                                  setCnpjCpf(revertMask(e.target.value));
                                  LimparTodos();
                                }}
                              />
                            </>
                          )}
                        </div>
                        <div className="bloco-input ">
                          <p className="title-input">E-mail: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                              setemail(e.target.value.toLowerCase());
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input">
                          <p className="title-input">Telefone: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="fone"
                            type="text"
                            onBlur={ChecaFone}
                            maxLength={15}
                            value={fone ? phoneMask(fone) : fone}
                            onChange={(e) => {
                              setFone(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input ">
                          <p className="title-input">
                            Canal: <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="canal"
                            className="inputparceiro"
                            placeholder={canal}
                            noOptionsMessage={() => 'Nenhum canal encontrado'}
                            options={canalpesq}
                            onChange={(value: any) => {
                              setCanal(value.label);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input ">
                          <p className="title-input">
                            Classificação:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="classificacao"
                            className="inputparceiro"
                            placeholder={classificacao}
                            noOptionsMessage={() =>
                              'Nenhuma classificação encontrada'
                            }
                            options={classificacaopesq}
                            onChange={(value: any) => {
                              setClassificacao(value.label);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input ">
                          <p className="title-input">
                            Tamanho da loja:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="tamanhoLoja"
                            className="inputparceiro"
                            placeholder={tamanhoLoja}
                            noOptionsMessage={() =>
                              'Nenhuma tamanho encontrada'
                            }
                            options={tamanhopesq}
                            onChange={(value: any) => {
                              setTamanhoLoja(value.label);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input bloco-endereco ">
                          <p className="title-input">Endereço: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="endereco"
                            type="text"
                            value={endereco}
                            onChange={(e) => {
                              setEndereco(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input bloco-bairro ">
                          <p className="title-input">Bairro: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="bairro"
                            type="text"
                            value={bairro}
                            onChange={(e) => {
                              setBairro(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input  bloco-municipio ">
                          <p className="title-input">Município: </p>
                          <input
                            className="form-control select inputparceiro"
                            id="municipio"
                            type="text"
                            value={municipio}
                            onChange={(e) => {
                              setMunicipio(e.target.value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input bloco-uf ">
                          <p className="title-input">UF: </p>
                          <Select
                            id="uf"
                            className="inputparceiro"
                            placeholder={uf}
                            noOptionsMessage={() =>
                              'Nenhuma tamanho encontrada'
                            }
                            options={ufpesq}
                            onChange={(value: any) => {
                              setUf(value.value);
                              console.log('Select', value);
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="d-flex boco-lat-log">
                          <div className="bloco-input bloco-lat ">
                            <p className="title-input">Lat: </p>
                            <input
                              className="form-control select inputparceiro"
                              id="lat"
                              type="text"
                              value={lat}
                              onChange={(e) => {
                                setLat(e.target.value);
                                LimparTodos();
                              }}
                            />
                          </div>
                          <div className="bloco-input bloco-lat ">
                            <p className="title-input">Log: </p>
                            <input
                              className="form-control select inputparceiro"
                              id="llo"
                              type="text"
                              value={long}
                              onChange={(e) => {
                                setLong(e.target.value);
                                LimparTodos();
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="coluna-dupla">
                        <div className="bloco-input bloco-corretor">
                          <p className="title-input">
                            {tipoVendedor == '1' ? 'Vendedor:' : 'Promotor:'}{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <Select
                            id="promotor"
                            className="inputparceiro"
                            placeholder={inputVenedor}
                            noOptionsMessage={() =>
                              'Nenhuma promotor encontrada'
                            }
                            options={promotorPesquisa}
                            onChange={(value: any) => {
                              setCodVendedor(value.value);
                              codVendedor = value.value;
                              LimparTodos();
                            }}
                          />
                        </div>
                        <div className="bloco-input tiponego">
                          <p className="title-input">
                            Tipo Negociação:{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <select
                            className="form-select select inputparceiro"
                            aria-label=""
                            value={tipoNegociacao}
                            onChange={(e) => {
                              setTipoNegociacao(e.target.value);
                            }}
                          >
                            <option value="0"></option>
                            {negociacaoTipo.length > 0 ? (
                              <>
                                {negociacaoTipo.map((tipo, index) => (
                                  <option value={tipo.id}>
                                    {tipo.descricao}
                                  </option>
                                ))}
                              </>
                            ) : (
                              <>
                                <option value="0">
                                  Nenhum Tipo encontrado
                                </option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="visitas"
                    title="Visitas"
                    style={{ minHeight: 400 }}
                  >
                    <div className="div-visitas">
                      <div className="bloco-visita-geral bloco-visitas">
                        <div style={{ marginBottom: 20 }} className="d-flex">
                          <p style={{ marginRight: 10 }} className="text">
                            SEM VISITA
                          </p>
                          <input
                            type="checkbox"
                            name="grupo"
                            id="grupo"
                            checked={semVisita}
                            onChange={({ target }) => {
                              setSemVisita(target.checked);
                              SemVisitar();
                            }}
                          />
                        </div>
                        <div className="divisao"></div>
                        <div
                          style={{ marginTop: 7 }}
                          className="check-grupo"
                        ></div>
                        <div className="d-flex ">
                          <div className="bloco-interno">
                            <h2>Semana da visita</h2>
                            <div className="check-grupo">
                              <p style={{ marginRight: 16 }} className="text">
                                Primeira
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={primeiraSem}
                                onChange={({ target }) => {
                                  setPrimeiraSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 12 }} className="text">
                                Segunda
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={segundaSem}
                                onChange={({ target }) => {
                                  setSegundaSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 17 }} className="text">
                                Terceira
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={terceiraSem}
                                onChange={({ target }) => {
                                  setTerceiraSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 24 }} className="text">
                                Quarta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quartaSem}
                                onChange={({ target }) => {
                                  setQuartaSem(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 28 }} className="text">
                                Quinta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quintaSem}
                                onChange={({ target }) => {
                                  setQuintaSem(target.checked);
                                }}
                              />
                            </div>
                          </div>
                          <div className="bloco-interno">
                            <h2>Dia da visita</h2>
                            <div className="check-grupo">
                              <p style={{ marginRight: 16 }} className="text">
                                Segunda
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={segunda}
                                onChange={({ target }) => {
                                  setSegunda(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 38 }} className="text">
                                Terça
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={terca}
                                onChange={({ target }) => {
                                  setTerca(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 26 }} className="text">
                                Quarta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quarta}
                                onChange={({ target }) => {
                                  setQuarta(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 29 }} className="text">
                                Quinta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={quinta}
                                onChange={({ target }) => {
                                  setQuinta(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 35 }} className="text">
                                Sexta
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={sexta}
                                onChange={({ target }) => {
                                  setSexta(target.checked);
                                }}
                              />
                            </div>
                            <div className="check-grupo">
                              <p style={{ marginRight: 21 }} className="text">
                                Sábado
                              </p>
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                disabled={semVisita}
                                checked={sabado}
                                onChange={({ target }) => {
                                  setSabado(target.checked);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="tabelas"
                    title="Tabelas de Preço"
                    style={{ minHeight: 430 }}
                  >
                    <div style={{ height: 60 }} className="div-button-top">
                      <OverlayTrigger
                        placement={'top'}
                        delay={{ show: 100, hide: 250 }}
                        overlay={<Tooltip>Nova Tabela</Tooltip>}
                      >
                        {/* //  ================aqui================== */}
                        <button
                          style={{ marginTop: 40 }}
                          className="btn btn-dark btn-direito"
                          onClick={() => {
                            setCodEmpresa('');
                            setCodTabelaPreco('');
                            setTabelaVindoBanco('Digite ou selecione');
                            setTabNav('tabelas');
                            setShowTabela(true);
                            setNaoSalvar(false);
                            naoSalvar = false;
                          }}
                        >
                          Novo{' '}
                          <TfiNewWindow
                            style={{ marginLeft: 8, marginBottom: 5 }}
                          />
                        </button>
                      </OverlayTrigger>
                    </div>
                    <div className="table-responsive table-scroll tabela-responsiva">
                      <div className=" table-wrap">
                        <Table
                          responsive
                          className="table-global table  main-table"
                        >
                          <thead>
                            <tr className="tituloTab">
                              <th className="th1 div-cod-prod">Empresa </th>
                              <th className="th1 Nome-complet">Tabela</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th2 div-cod-prod"
                              >
                                Data inicial
                              </th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th2 div-cod-prod"
                              >
                                Data final
                              </th>
                              <th
                                style={{ color: 'transparent' }}
                                className="th3"
                              >
                                ....
                              </th>
                              <th className="th4">.</th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th4 fixed-table"
                              >
                                Ações
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tabela?.length > 0 ? (
                              <>
                                {tabela?.map((tabela, index) => (
                                  <tr key={index} onClick={() => {}}>
                                    <td className="">
                                      {tabela.empresa.id}
                                      {' - '}
                                      {tabela.empresa.descricao}
                                    </td>
                                    <td className="">
                                      {tabela.tabelaPreco.id}
                                      {' - '}
                                      {tabela.tabelaPreco.descricao}
                                    </td>
                                    <td
                                      className=""
                                      style={{ textAlign: 'center' }}
                                    >
                                      {formataData(
                                        tabela.tabelaPreco.dataInicial
                                      )}
                                    </td>
                                    <td
                                      className=""
                                      style={{ textAlign: 'center' }}
                                    >
                                      {formataData(
                                        tabela.tabelaPreco.dataFinal
                                      )}
                                    </td>
                                    <td style={{ color: 'transparent' }}>
                                      .............
                                    </td>
                                    <td style={{ color: 'transparent' }}>
                                      .............
                                    </td>
                                    <td
                                      style={{ textAlign: 'center' }}
                                      className="fixed-table td-fixo"
                                    >
                                      <OverlayTrigger
                                        placement={'top'}
                                        delay={{ show: 100, hide: 250 }}
                                        overlay={<Tooltip>Excluir</Tooltip>}
                                      >
                                        <button
                                          onClick={() => {
                                            DeleteTabela(tabela.id);
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
                                className="alert alert-warning alerta-user"
                                role="alert"
                              >
                                Nenhuma tabela encontrada.
                              </div>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="documentos"
                    title="Documentos"
                    style={{ minHeight: 430 }}
                  >
                    <div style={{ padding: 10 }}>
                      <div className="coluna-dupla">
                        <div className="bloco-input">
                          <p className="title-input">Arquivo (PDF ou imagem):</p>
                          <input
                            type="file"
                            accept="application/pdf,image/*"
                            className="form-control"
                            onChange={(e) => {
                              const f = e.target.files && e.target.files[0];
                              setDocumentoFile(f || null);
                            }}
                          />
                        </div>
                        <div className="bloco-input">
                          <p className="title-input">Descrição:</p>
                          <input
                            type="text"
                            className="form-control"
                            value={documentoDescricao}
                            onChange={(e) => setDocumentoDescricao(e.target.value)}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <button
                          className="btn btn-dark btn-acao-sm"
                          disabled={uploadingDoc || id === 0 || !documentoFile}
                          onClick={uploadDocumentoParceiro}
                        >
                          {uploadingDoc ? 'Enviando...' : 'Enviar'}
                        </button>
                      </div>

                      <div style={{ marginTop: 20 }}>
                        {loadingDocs ? (
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status"></div>
                          </div>
                        ) : documentos.length > 0 ? (
                          <div className="table-responsive table-scroll tabela-responsiva">
                            <div className="table-wrap">
                              <Table
                                responsive
                                className="table-global table  main-table"
                              >
                                <thead>
                                  <tr className="tituloTab">
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th style={{ textAlign: 'center' }}>Data</th>
                                    <th
                                      style={{ textAlign: 'center' }}
                                      className="fixed-table"
                                    >
                                      Ações
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {documentos.map((doc) => (
                                    <tr key={doc.id}>
                                      <td>{doc.nomeArquivo}</td>
                                      <td>{doc.contentType}</td>
                                      <td style={{ textAlign: 'center' }}>
                                        {formataData(doc.criadoEm)}
                                      </td>
                                      <td
                                        style={{ textAlign: 'center' }}
                                        className="fixed-table td-fixo"
                                      >
                                        <button
                                          className="btn btn-table btn-edit"
                                          onClick={() => abrirDocumento(doc)}
                                        >
                                          Abrir
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{ width: '100%', marginTop: 10 }}
                            className="alert alert-warning alerta-user"
                            role="alert"
                          >
                            Nenhum documento encontrado.
                          </div>
                        )}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <div className="div-conteudo-btn divbotoes-edit">
                  <button
                    disabled={loadingUpdate}
                    type="button"
                    id="btn-edit-par"
                    className="btn btn-dark"
                    onClick={editParceiro}
                  >
                    Salvar
                  </button>
                  <button
                    disabled={loadingUpdate}
                    id="btn-edit-par"
                    className="btn btn-danger "
                    onClick={handleCloseEdit}
                  >
                    Cancelar
                  </button>
                </div>
                <div className="form-cadastro-user">
                  <div className="div-conteudo-geral"></div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Tabela de Preço ============================================== */}

        <Modal
          className="modal-cadastro-tabelaparceiro"
          show={showTabela}
          onHide={handleCloseTabela}
        >
          <Modal.Header closeButton>
            <h1>Cadastrar Tabela </h1>
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
                  <div className="d-flex">
                    <div
                      style={{ width: '100%', padding: 10 }}
                      className="bloco-input"
                    >
                      <p className="title-input">
                        Tipo de Empresa:<span style={{ color: 'red' }}>*</span>
                      </p>
                      <select
                        className="form-select select inputparceiro campo-select"
                        aria-label=""
                        value={codEmpresa}
                        onChange={(e) => {
                          setCodEmpresa(e.target.value);
                          LimparTodos();
                        }}
                      >
                        <option value=""></option>
                        {empresaSelect.map((empresa) => (
                          <option value={empresa.id}>
                            {empresa.descricao}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    style={{ flexDirection: 'column' }}
                    className="coluna-dupla"
                  >
                    <div className="bloco-input">
                      <p id="grupos" className=" title-input">
                        Tabela de Preço: <span style={{ color: 'red' }}>*</span>
                      </p>
                      <Select
                        id="tabelaPreco"
                        className=" select-comp"
                        placeholder={tabelaVindoBanco}
                        noOptionsMessage={() => 'Nenhum status encontrado'}
                        options={tabelaSelect}
                        onChange={(value: any) => {
                          setCodTabelaPreco(value.value);
                          LimparTodos();
                          console.log('Select', value);
                        }}
                      />
                      <button
                        disabled={loadingCreate}
                        id="btn-cad-tab"
                        className="btn btn-dark"
                        onClick={() => {
                          if (editarTabela) {
                            EditeTabela();
                          } else {
                            CreateTabela();
                          }
                        }}
                      >
                        {editarTabela ? 'Editar' : 'Salvar'}
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
            {alertErroMensage && (
              <div className="mt-3 mb-0">
                <Alert msg={msgErro} setAlertErro={setAlertErroMensage} />
              </div>
            )}
            <button
              style={{ width: 130 }}
              className="btn btn-dark btn-acao-sm"
              onClick={handleCloseMensage}
            >
              Ok
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
      </div>
      <FooterMobile />
      <Footer />
    </>
  );
}
