import React, { useEffect, useState } from 'react';
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
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TfiNewWindow } from 'react-icons/tfi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import {
  IItemTabelaPreco,
  ITabelaPreco,
  iGrupos,
  iUsuarios,
} from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao';
import { phoneMask, moeda, moedaFloat } from '../../Masks/Masks';
import { FaEye, FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iDadosUsuario, iDataSelect, iProdutos } from '../../@types';
import Select from 'react-select';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function TabelaPreco() {
  const history = useNavigate();
  const [idTabelaPreco, setIdTabelaPreco] = useState(0);
  const [codigoTabela, setCodigoTabela] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  let [idProduto, setIdProduto] = useState('');
  let [idProdutoEdit, setIdProdutoEdit] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  let [descProduto, setDescProduto] = useState('');
  let [codProduto, setcodProduto] = useState('');
  const [nome, setNome] = useState('');
  const [idGrupo, setIdGrupo] = useState('');
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [idItem, setIdItem] = useState('');
  let [tabelaPreco, setTabelaPreco] = useState<ITabelaPreco[]>([]);
  let [itensTabela, setItensTabela] = useState<IItemTabelaPreco[]>([]);
  const [limpando, setLimpando] = useState(false);
  const [editarTabela, setEditarTabela] = useState(false);
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [alertErroCadastroItem, setAlertErroCadastroItem] = useState(false);
  const [alertErroEditItem, setAlertErroEditItem] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showCadastroItem, setShowCadastroItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showMensageDelete, setShowMensageDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [totalPaginas, setTotalPaginas] = useState(0);
  let [idItemDelete, setIdItemDelete] = useState(0);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const handleCloseMensageDelete = () => setShowMensageDelete(false);
  const handleCloseCadastroItem = () => setShowCadastroItem(false);
  const handleCloseEditItem = () => setShowEditItem(false);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [search, setSearch] = useState('');
  let [search2, setSearch2] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  let [filterGrupo, setFiltergrupo] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [grupoPesquisa, setGrupoPesquisa] = useState<iDataSelect[]>([]);
  const [grupoPesq, setGrupoPesq] = useState<iDataSelect[]>([]);
  const [pesquisaNome, setPesquisaNome] = useState(true);
  const [pesquisaCod, setPesquisaCod] = useState(false);
  const [pesquisaGrupo, setPesquisaGrupo] = useState(false);
  const [pesquisaNomeItens, setPesquisaNomeItens] = useState(true);
  const [pesquisaCodItens, setPesquisaCodItens] = useState(false);
  const [pesquisaGrupoItens, setPesquisaGrupoItens] = useState(false);
  const [produtoCadastroItens, setProdutoCadastroItens] = useState<
    iDataSelect[]
  >([]);
  const [produtoCadastro, setProdutoCadastro] = useState<iDataSelect[]>([]);
  let [selectGrupoBanco, setSelectGrupoBanco] = useState<iDataSelect>();
  let [prodExist, setProdExist] = useState(false);
  let [idItemEdit, setIdItemEdit] = useState(0);
  const [showloading, setShowloading] = useState(true);
  const handleCloseloading = () => setShowloading(false);
  const [sucess, setSucess] = useState(0);
  //=========================================================================

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
    window.scrollTo(0, 0);
    GetGrupos();
    GetProdutos();
    if (filter) {
      GettabelaPrecoFilter();
    } else {
      GettabelaPreco();
    }
  }, [pagina]);

  let [grupoProdutos, setGrupoProdutos] = useState<iGrupos[]>([]);

  async function GetGrupos() {
    await api

      .get(`/api/GrupoProduto?pagina=1&totalpagina=999`)
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

          response.data.data.map((grupos: any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(grupos.id);
            rowGrupo.label = String(grupos.id) + ' - ' + grupos.nome;

            options.push(rowGrupo);
            setGrupoPesquisa(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  function handleShowMensage() {
    setShowMensage(true);
    setTimeout(function () {}, 1200);
  }

  function Pesquisa(event: any) {
    event.preventDefault();
    setPagina(1);
    setFilter(true);
    if (pesquisaNome) {
      GettabelaPrecoFilter();
    }
    if (pesquisaCod) {
      GettabelaPrecoFilter();
    }
    if (search == '') {
      LimparPesquisa();
    }
  }

  function Pesquisa2(event: any) {
    event.preventDefault();
    setPagina(1);
    setFilter(true);
    if (search2 != '') {
      GetiTensTabelaPrecofilterNome();
    }
    if (search2 == '') {
      LimparPesquisaItens();
    }
  }

  async function GetiTensTabelaPrecofilterNome() {
    if (pesquisaNomeItens) {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela/nomeProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${idTabelaPreco}&nomeProduto=${search2}&parceiroId=0&empresaId=0`
        )
        .then((response) => {
          console.log('itens tabela preço', response.data.data);
          setItensTabela(response.data.data);
          itensTabela = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          totalPaginas = Math.ceil(response.data.total / qtdePagina);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaCodItens) {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela/codProduto?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${idTabelaPreco}&codProduto=${search2}&parceiroId=0&empresaId=0`
        )
        .then((response) => {
          console.log('itens tabela preço', response.data.data);
          setItensTabela(response.data.data);
          itensTabela = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          totalPaginas = Math.ceil(response.data.total / qtdePagina);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaGrupoItens) {
      await api
        .get(
          `/api/ItemTabelaPreco/codTabela/grupoId?pagina=${pagina}&totalpagina=${qtdePagina}&codTabela=${idTabelaPreco}&grupoId=${search2}&parceiroId=0&empresaId=0`
        )
        .then((response) => {
          console.log('itens tabela preço', response.data.data);
          setItensTabela(response.data.data);
          itensTabela = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          totalPaginas = Math.ceil(response.data.total / qtdePagina);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
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
    setAlertErroCadastroItem(false);
    setAlertErroEditItem(false);
  }

  function handleShow() {
    setAlertErroRegister(false);
    setIdTabelaPreco(0);
    setCodigo('');
    setDescricao('');
    setDataInicial('');
    setDataFinal('');
    setIdProduto('');
    setPreco('');
    setShow(true);
  }

  function handleShowCadastroItem() {
    setIdItem('');
    setPreco('');
    setIdProduto('');
    setAlertErroMensage(false);
    setAlertErroRegister(false);
    setAlertErroCadastroItem(false);
    setAlertErroEditItem(false);
    setShowCadastroItem(true);
  }

  async function GetProdutos() {
    setFilter(false);

    await api

      .get(`/api/Produto?pagina=1&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((produtos: any) => {
            let rowProd: iDataSelect = {};
            rowProd.value = String(produtos.id);
            rowProd.label = String(produtos.id) + ' - ' + produtos.nome;
            options.push(rowProd);
            setProdutoCadastro(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GettabelaPreco() {
    setFilter(false);
    setSucess(60);
    await api

      .get(`/api/TabelaPreco?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setTabelaPreco(response.data.data);
        tabelaPreco = response.data.data;
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

  async function GettabelaPrecoFilter() {
    setFilter(true);
    if (pesquisaNome) {
      await api
        .get(
          `/api/TabelaPreco/filter/nome?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setTabelaPreco(response.data.data);
          tabelaPreco = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa por nome', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaCod) {
      await api
        .get(
          `/api/TabelaPreco/filter/codigo?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setTabelaPreco(response.data.data);
          tabelaPreco = response.data.data;
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          console.log('usuarios pesquisa codigo', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
  }

  function VerificaProduto() {
    console.log('tabela', itensTabela);
  }

  //=============get edite item =====================================//
  async function GetitensEditId(idIt: any) {
    handleCloseCadastroItem();
    setEdit(true);
    setShowEditItem(true);

    await api
      .get(`/api/ItemTabelaPreco/${idIt}`)
      .then((response) => {
        setPreco(response.data.preco);
        setIdProdutoEdit(response.data.idProd);
        idProdutoEdit = response.data.idProd;
        setIdItemEdit(response.data.id);
        idItemEdit = response.data.id;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //=================================================================//

  async function GetitensId() {
    handleCloseCadastroItem();
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/TabelaPreco/${idTabelaPreco}`)
      .then((response) => {
        console.log('itens da tabela', response.data);
        setGrupoSelecionado(response.data.nomeGrupo);
        setItensTabela(response.data.itemTabela);
        itensTabela = response.data.itemTabela;
        setIdTabelaPreco(response.data.id);
        setCodigo(response.data.id);
        const res = response.data;

        if (res.dataInicial) {
          const dtInicial = res.dataInicial
            ? res.dataInicial.substring(0, (res.dataInicial + ' ').indexOf('T'))
            : null;

          setDataInicial(dtInicial);
        }
        if (res.dataFinal) {
          const dtFinal = res.dataFinal
            ? res.dataFinal.substring(0, (res.dataInicial + ' ').indexOf('T'))
            : null;

          setDataFinal(dtFinal);
        }
        setIdProduto(response.data.idProduto);
        setPreco(response.data.preco);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //=========== get tabela de preço por ID ==================================//
  async function GetTabelaPrecoId(id: any) {
    setIdTabelaPreco(0);
    setCodigo('');
    setDataInicial('');
    setDataFinal('');
    setIdProduto('');
    setPreco('');
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/TabelaPreco/${id}`)
      .then((response) => {
        console.log('itens da tabela', response.data);
        setGrupoSelecionado(response.data.nomeGrupo);
        setItensTabela(response.data.itemTabela);
        itensTabela = response.data.itemTabela;
        setIdTabelaPreco(response.data.id);
        setDescricao(response.data.descricao);
        setCodigo(response.data.id);
        const res = response.data;

        if (res.dataInicial) {
          const dtInicial = res.dataInicial
            ? res.dataInicial.substring(0, (res.dataInicial + ' ').indexOf('T'))
            : null;

          setDataInicial(dtInicial);
        }
        if (res.dataFinal) {
          const dtFinal = res.dataFinal
            ? res.dataFinal.substring(0, (res.dataInicial + ' ').indexOf('T'))
            : null;

          setDataFinal(dtFinal);
        }
        setIdProduto(response.data.idProduto);
        setPreco(response.data.preco);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar tabela de preço ===============================//
  async function EditeTabelaPreco() {
    setLoadingUpdate(true);
    setEditarTabela(true);
    await api
      .put(`/api/TabelaPreco/${idTabelaPreco}`, {
        id: idTabelaPreco,
        codigo: Number(codigo),
        descricao: descricao,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
      })
      .then((response) => {
        GettabelaPreco();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Tabela de preço atualizada com sucesso.');
        setLimpando(false);
        setEditarTabela(false);
      })
      .catch((error) => {
        setLimpando(false);
        setLoadingUpdate(false);
        window.scrollTo(0, 0);
        handleShowMensage();
        setEditarTabela(false);
        setAlertErroMensage(true);
        const { data } = error.response;
        setMsgErro(error.response.data);

        return;
      });
  }
  //============ Editar item ===================================================//
  async function EditarItem() {
    if (preco == undefined || preco == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('precoEdit');
      document.getElementById('precoEdit')?.focus();
      setAlertErroEditItem(true);
      setMsgErro('É obrigatório informar o valor do produto.');
      return;
    }

    await api
      .put(`/api/ItemTabelaPreco/${idItemEdit}`, {
        id: idItemEdit,
        tabelaPrecoId: idTabelaPreco,
        idProd: idProdutoEdit,
        preco: Number(parseFloat(moedaFloat(String(preco)))),
      })
      .then((response) => {
        setShowEditItem(false);
        GettabelaPreco();
        setLoadingUpdate(false);
        CreateLogSecaoEdite(idItemEdit);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Item Editado com sucesso.');
        setLimpando(false);
        setEditarTabela(false);
        GetitensId();
      })
      .catch((error) => {
        setLimpando(false);
        setLoadingUpdate(false);
        window.scrollTo(0, 0);
        handleShowMensage();
        setEditarTabela(false);
        setAlertErroMensage(true);
        const { data } = error.response;
        setMsgErro(error.response.data);
        setShowEditItem(false);
        return;
      });
  }

  //============= POST LOG AÇÃO PUT ===============================//
  async function CreateLogSecaoEdite(codigo: any) {
    const user: iDadosUsuario = JSON.parse(
      localStorage.getItem('@Portal/usuario') || '{}'
    );

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    const milissegundos = String(data.getMilliseconds()).padStart(3, '0');
    const dataLog = `${ano}-${mes}-${dia}`;
    console.log(dataLog);
    const obs = `produto:${codProduto} - ${descProduto}, editado na tabela de preço ${codigo} - ${descricao}`;
    await api
      .post(`/api/LogAcao`, {
        userName: user.username,
        tabela: 'ItemTabela',
        metodo: 'Edit',
        codigo: String(codigo),
        obs: obs ? obs : null,
        data: dataLog,
      })
      .then((response) => {
        console.log('Log Criado com sucesso', response.data);
        setDescProduto('');
        descProduto = '';
      })
      .catch((error) => {
        console.log('Erro ao criar Log', error);
        setDescProduto('');
        descProduto = '';
      });
  }
  //============ Adicionar itens tabela de preço ===============================//
  async function AddItemTabelaPreco() {
    console.log('idProd', idProduto);
    console.log('id Tabela', idTabelaPreco);
    setProdExist(true);
    prodExist = true;

    if (idProduto.trim() == undefined) {
      let senhaconf: any;
      senhaconf = document.getElementById('codigo');
      document.getElementById('codigo')?.focus();
      setAlertErroCadastroItem(true);
      setMsgErro('É obrigatório informar o produto.');
      return;
    }
    if (preco.trim() == undefined) {
      let senhaconf: any;
      senhaconf = document.getElementById('preco');
      document.getElementById('preco')?.focus();
      setAlertErroCadastroItem(true);
      setMsgErro('É obrigatório informar o valor do produto.');
      return;
    }
    itensTabela.filter((produto) => {
      console.log('produto', produto);
      if (produto.idProd == Number(idProduto)) {
        setAlertErroCadastroItem(true);
        setMsgErro('Produto já existente nesta tabela');
        setProdExist(false);
        prodExist = false;
      }
    });
    if (prodExist) {
      await api
        .post(`/api/ItemTabelaPreco`, {
          tabelaPrecoId: idTabelaPreco,
          idProd: Number(idProduto),
          preco: Number(parseFloat(moedaFloat(String(preco)))),
        })
        .then((response) => {
          GettabelaPreco();
          setLoadingUpdate(false);
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro('Item adicionado com sucesso.');
          setLimpando(false);
          setEditarTabela(false);
          GetitensId();
          CreateLogSecaoInsert();
        })
        .catch((error) => {
          setLimpando(false);
          setLoadingUpdate(false);
          window.scrollTo(0, 0);
          handleShowMensage();
          setEditarTabela(false);
          setAlertErroMensage(true);
          const { data } = error.response;
          setMsgErro(error.response.data);

          return;
        });
    }
  }
  //============ Criar tabela de preço ===============================//
  async function CreateTabelaPreco() {
    if (codigo.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('codigo');
      document.getElementById('codigo')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o código da tabela de preço.');
      return;
    }
    if (descricao.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('descricao');
      document.getElementById('descricao')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a descrição da tabela de preço.');
      return;
    }

    if (dataInicial.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('dataInicial');
      document.getElementById('dataInicial')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a data inicial');
      return;
    }
    if (dataFinal.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('dataFinal');
      document.getElementById('dataFinal')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a data final');
      return;
    }

    setLoadingCreate(true);
    await api
      .post('/api/TabelaPreco', {
        id: Number(codigo),
        codigo: Number(codigo),
        descricao: descricao,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
      })

      .then((response) => {
        setLoadingCreate(false);
        GettabelaPreco();
        handleClose();
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Tabela de preço cadastrada com sucesso.');
      })
      .catch((error) => {
        setAlertErroMensage(true);
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
  //==== EXCLUIR PRODUTO ======================================
  async function DeleteItem() {
    setLoadingUpdate(true);
    handleCloseMensageDelete();
    await api
      .delete(`/api/ItemTabelaPreco/${idItemDelete}`)
      .then((response) => {
        GettabelaPreco();
        GetitensId();
        CreateLogSecaoDelete(idItemDelete);
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Item excluído com sucesso.');
      })
      .catch((error) => {
        setLoadingUpdate(false);
        GetitensId();
        window.scrollTo(0, 0);
        handleShowMensage();
        setAlertErroMensage(true);

        const { data } = error.response;
        setMsgErro(data.message);

        return;
      });
  }
  //============= POST LOG AÇÃO ===============================//
  async function CreateLogSecaoInsert() {
    const user: iDadosUsuario = JSON.parse(
      localStorage.getItem('@Portal/usuario') || '{}'
    );

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    const milissegundos = String(data.getMilliseconds()).padStart(3, '0');
    const dataLog = `${ano}-${mes}-${dia}`;
    console.log(dataLog);
    const obs = `produto:${descProduto}, inserido na tabela de preço ${codigo} - ${descricao}`;
    await api
      .post(`/api/LogAcao`, {
        userName: user.username,
        tabela: 'ItemTabela',
        metodo: 'Insert',
        codigo: String(codigo),
        obs: obs ? obs : null,
        data: dataLog,
      })
      .then((response) => {
        console.log('Log Criado com sucesso', response.data);
        setDescProduto('');
        descProduto = '';
      })
      .catch((error) => {
        console.log('Erro ao criar Log', error);
        setDescProduto('');
        descProduto = '';
      });
  }
  //============= POST LOG AÇÃO ===============================//
  async function CreateLogSecaoDelete(codigo: any) {
    const user: iDadosUsuario = JSON.parse(
      localStorage.getItem('@Portal/usuario') || '{}'
    );

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    const milissegundos = String(data.getMilliseconds()).padStart(3, '0');
    const dataLog = `${ano}-${mes}-${dia}`;
    console.log(dataLog);
    const obs = `produto:${codProduto} - ${descProduto}, deletado da tabela de preço ${codigo} - ${descricao}`;
    await api
      .post(`/api/LogAcao`, {
        userName: user.username,
        tabela: 'ItemTabela',
        metodo: 'Delete',
        codigo: String(codigo),
        obs: obs ? obs : null,
        data: dataLog,
      })
      .then((response) => {
        console.log('Log Criado com sucesso', response.data);
        setDescProduto('');
        descProduto = '';
      })
      .catch((error) => {
        console.log('Erro ao criar Log', error);
        setDescProduto('');
        descProduto = '';
      });
  }
  //==========================================================//
  function ShowModalEdit() {
    setShowEdit(true);
  }

  function LimparPesquisa() {
    setFiltergrupo(false);
    filterGrupo = false;
    setSearch('');
    setSearchStatus('');
    setPagina(1);
    PesquisaNome();
    setFilter(false);
    GettabelaPreco();
  }

  function LimparPesquisaItens() {
    setFiltergrupo(false);
    filterGrupo = false;
    setSearch2('');
    setPagina(1);
    setFilter(false);
    GetitensId();
    LimparPesquisa();
  }

  //===========pesquisa dos itens===============
  function PesquisaNomeItens() {
    setSearch2('');
    GetitensId();
    setPesquisaNomeItens(true);
    setPesquisaGrupoItens(false);
    setPesquisaCodItens(false);
  }

  function PesquisaGrupoItens() {
    setSearch2('');
    GetitensId();
    setPesquisaNomeItens(false);
    setPesquisaCodItens(false);
    setPesquisaGrupoItens(true);
  }

  function PesquisaCodItens() {
    setSearch2('');
    GetitensId();
    setPesquisaNomeItens(false);
    setPesquisaGrupoItens(false);
    setPesquisaCodItens(true);
  }
  //============================================

  function PesquisaNome() {
    setSearch('');
    GettabelaPreco();
    setPesquisaNome(true);
    setPesquisaGrupo(false);
    setPesquisaCod(false);
    let pesquisar: any;
    pesquisar = document.getElementById('nomePesquisa');
    document.getElementById('nomePesquisa')?.focus();
  }

  function PesquisaGrupo() {
    setSearch('');
    GettabelaPreco();
    setPesquisaNome(false);
    setPesquisaCod(false);
    setPesquisaGrupo(true);
    let pesquisa: any;
    pesquisa = document.getElementById('grupoPesquisa');
    document.getElementById('grupoPesquisa')?.focus();
  }

  function PesquisaCod() {
    setSearch('');
    GettabelaPreco();
    setPesquisaNome(false);
    setPesquisaGrupo(false);
    setPesquisaCod(true);
    let pesquisa: any;
    pesquisa = document.getElementById('codPesquisa');
    document.getElementById('codPesquisa')?.focus();
  }

  const formataData = (date: string) => {
    const dataFormate = date.split('T', 1);
    const newDate = dataFormate[0];
    const d = newDate.split('-');
    const data = `${d[2]}.${d[1]}.${d[0]}`;
    return data;
  };

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
              <h1>TABELA DE PREÇO</h1>
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
                  <div style={{ height: 70 }} className="div-button-top">
                    <div className="pesBloco">
                      <div className="title-pesBloco">
                        <span style={{ fontSize: 14 }}>Pesquisar por:</span>
                      </div>
                      <div className="d-flex">
                        <input
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaNome}
                          onChange={PesquisaNome}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Descrição</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaCod}
                          onChange={PesquisaCod}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Código</p>
                      </div>
                    </div>
                    <OverlayTrigger
                      placement={'top'}
                      delay={{ show: 100, hide: 250 }}
                      overlay={<Tooltip>Nova Tabela de Preço</Tooltip>}
                    >
                      <button
                        className="btn btn-dark btn-direito btn-acao-sm"
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
                            <p className="title-input">
                              Pesquisar por Descrição:{' '}
                            </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select  inputparceiro"
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
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
                            <p className="title-input">
                              Pesquisar por Código:{' '}
                            </p>
                            <input
                              id="nomePesquisa"
                              type="text"
                              className="form-control select  inputparceiro"
                              name=""
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                              }}
                            />
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
                              className="th1 div-cod-prod"
                            >
                              Código
                            </th>
                            <th id="nome-tabela" className="">
                              Descrição
                            </th>
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
                              className="th4"
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
                          {tabelaPreco.length > 0 ? (
                            <>
                              {tabelaPreco.map((tabelaPreco, index) => (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    GetTabelaPrecoId(tabelaPreco.id);
                                    ShowModalEdit();
                                  }}
                                >
                                  <td
                                    id="codigo-tabela"
                                    style={{ textAlign: 'center' }}
                                    className="divi-cod-prod"
                                  >
                                    {tabelaPreco.id}
                                  </td>
                                  <td id="nome-tabela" className="">
                                    {tabelaPreco.descricao}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formataData(tabelaPreco.dataInicial)}
                                  </td>
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className=""
                                  >
                                    {formataData(tabelaPreco.dataFinal)}
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
                                      overlay={
                                        <Tooltip>Visualizar Tabela</Tooltip>
                                      }
                                    >
                                      <button
                                        className="btn btn-table btn-edit"
                                        style={{
                                          marginRight: 15,
                                          marginLeft: 15,
                                        }}
                                        onClick={() => {
                                          GetTabelaPrecoId(tabelaPreco.id);
                                          ShowModalEdit();
                                        }}
                                      >
                                        <FaEye />
                                      </button>
                                    </OverlayTrigger>
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <div
                              style={{ margin: 'auto' }}
                              className="alert alert-warning alerta-prod"
                              role="alert"
                            >
                              Nenhuma tabela de preço encontrado.
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
          className="modal-cadastro-tabela"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <h1>Cadastro de Tabela de Preço</h1>
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
                    <div className="bloco-input bloco-data bloco-codTab">
                      <p className="title-input titulo-cod-tabelaPrice">
                        Código:<span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-coontrol inputdataTab"
                        id="codigo"
                        type="Text"
                        value={codigo}
                        onChange={(e) => {
                          setCodigo(e.target.value);
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>
                  <div className="bloco-input bloco-data">
                    <p className="title-input titulo-cod-tabelaPrice">
                      Descrição:<span style={{ color: 'red' }}>*</span>
                    </p>
                    <input
                      className="form-coontrol inputdataTab"
                      id="descricao"
                      type="Text"
                      value={descricao}
                      onChange={(e) => {
                        setDescricao(e.target.value);
                        LimparTodos();
                      }}
                    />
                  </div>
                  <div className="bloco-input bloco-data">
                    <p className="title-input">
                      Data Inicial:<span style={{ color: 'red' }}>*</span>
                    </p>
                    <input
                      className="form-coontrol inputdataTab"
                      id="dataInicial"
                      type="date"
                      value={dataInicial}
                      onChange={(e) => {
                        setDataInicial(e.target.value);
                        LimparTodos();
                      }}
                    />
                  </div>
                  <div className="bloco-input bloco-data">
                    <p className="title-input">
                      Data Final:<span style={{ color: 'red' }}>*</span>
                    </p>
                    <input
                      className="form-coontrol inputdataTab"
                      id="dataFinal"
                      type="date"
                      value={dataFinal}
                      onChange={(e) => {
                        setDataFinal(e.target.value);
                        LimparTodos();
                      }}
                    />
                  </div>
                  <button
                    disabled={loadingCreate}
                    id="btn-cad-prod"
                    className="btn btn-dark"
                    onClick={CreateTabelaPreco}
                  >
                    Salvar
                  </button>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Edit ============================================== */}

        <Modal
          className="modal-cadastro-tabela-edit"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Tabela de Preço</h1>
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
                  <div className="bloco-tabelaPreco">
                    <div
                      style={{ justifyContent: 'space-between' }}
                      className="coluna-dupla"
                    >
                      <div className="div-dados-tabela-preco">
                        <div className="cod-desc-Tabela">
                          <p
                            style={{ marginRight: 20 }}
                            className="title-input titulo-cod-tabelaPrice"
                          >
                            Código:
                            <span style={{ marginLeft: 5, color: '#000' }}>
                              {codigo}
                            </span>{' '}
                          </p>
                          <p className="title-input titulo-cod-tabelaPrice">
                            Descrição:{' '}
                            <span style={{ marginLeft: 5, color: '#000' }}>
                              {descricao}
                            </span>
                          </p>
                        </div>
                        <div className="coluna-dupla">
                          <div className=" bloco-data-edit">
                            <p className="title-input">
                              Data Inicial:
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                            <input
                              className="form-control inputdataTab"
                              id="dataInicial"
                              type="date"
                              value={dataInicial}
                              onChange={(e) => {
                                setDataInicial(e.target.value);
                                LimparTodos();
                              }}
                            />
                          </div>
                          <div className=" bloco-data-edit">
                            <p className="title-input">
                              Data Final:<span style={{ color: 'red' }}>*</span>
                            </p>
                            <input
                              className="form-control inputdataTab"
                              id="dataFinal"
                              type="date"
                              value={dataFinal}
                              onChange={(e) => {
                                setDataFinal(e.target.value);
                                LimparTodos();
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bloco-acoes-tabelaPreco bloco-data-edit">
                        <button
                          disabled={loadingUpdate}
                          id="btn"
                          className="btn btn-editartab"
                          onClick={EditeTabelaPreco}
                        >
                          Editar Tabela{' '}
                          <HiOutlinePencilSquare
                            style={{ marginLeft: 5, marginBottom: 5 }}
                            fontSize={18}
                          />
                        </button>
                        <button
                          style={{ marginTop: 8 }}
                          disabled={loadingUpdate}
                          id="btn"
                          className="btn btn-novotab"
                          onClick={handleShowCadastroItem}
                        >
                          Novo Ítem
                          <TfiNewWindow
                            style={{ marginLeft: 8, marginBottom: 5 }}
                            fontSize={17}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={{ paddingTop: 0 }} className="bloco-tabelaPreco">
                    <div className="bloco-pesquisa-tabela">
                      <div className="pesBloc">
                        <div className="title-pesBloco">
                          <span
                            style={{
                              fontSize: 14,
                              marginTop: 7,
                              marginRight: 8,
                            }}
                          >
                            Pesquisar por:
                          </span>
                          <div className="d-flex">
                            <input
                              name="pesquisa2"
                              type="radio"
                              checked={pesquisaNomeItens}
                              onChange={PesquisaNomeItens}
                            />
                            <p style={{ fontSize: 13, marginLeft: 8 }}>Nome</p>
                            <input
                              style={{ marginLeft: 20 }}
                              name="pesquisa2"
                              type="radio"
                              checked={pesquisaCodItens}
                              onChange={PesquisaCodItens}
                            />
                            <p style={{ fontSize: 13, marginLeft: 8 }}>
                              Código
                            </p>
                            <input
                              style={{ marginLeft: 20 }}
                              name="pesquisa2"
                              type="radio"
                              checked={pesquisaGrupoItens}
                              onChange={PesquisaGrupoItens}
                            />
                            <p style={{ fontSize: 13, marginLeft: 8 }}>Grupo</p>
                          </div>
                        </div>
                        <form
                          onSubmit={Pesquisa2}
                          style={{ marginTop: 10, width: '100%' }}
                          className="conteudo-botoes"
                        >
                          <div className="bloco-pesquisa-input-pedido">
                            {pesquisaNomeItens ? (
                              <>
                                <div>
                                  <input
                                    id="nomePesquisa"
                                    type="text"
                                    className="form-control select inputparceiro"
                                    name=""
                                    value={search2}
                                    onChange={(e) => {
                                      setSearch2(e.target.value);
                                      search2 = e.target.value;
                                    }}
                                  />
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {pesquisaCodItens ? (
                              <>
                                <div>
                                  <input
                                    id="codPesquisa"
                                    type="text"
                                    className="form-control select inputparceiro"
                                    name=""
                                    value={search2}
                                    onChange={(e) => {
                                      setSearch2(e.target.value);
                                      search2 = e.target.value;
                                    }}
                                  />
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {pesquisaGrupoItens ? (
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
                                      setSearch2('');
                                      setSearch2(value.value);
                                      search2 = value.value;
                                      console.log('Select', value, value);
                                      setPagina(1);
                                      setFilter(true);
                                      setPesquisaGrupoItens(true);
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
                              onClick={Pesquisa2}
                            >
                              <FaSearchPlus fontSize={12} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary btn-pesq-ped"
                              onClick={LimparPesquisaItens}
                            >
                              <AiOutlineClear fontSize={14} />
                            </button>
                          </div>
                        </form>
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
                                style={{ textAlign: 'center' }}
                                id="codigo-tabela"
                                className="th1 div-cod-prod"
                              >
                                Cod. Prod.
                              </th>
                              <th
                                id="item-tabela-tb"
                                className="th1 Nome-completo"
                              >
                                Descrição
                              </th>
                              <th
                                style={{ textAlign: 'center' }}
                                className="th2 div-cod-prod"
                              >
                                Preço
                              </th>

                              <th
                                style={{ color: 'transparent' }}
                                className="th4"
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
                            {itensTabela.length > 0 ? (
                              <>
                                {itensTabela.map((itensTabela, index) => (
                                  <tr key={index}>
                                    <td
                                      id="codigo-tabela"
                                      style={{ textAlign: 'center' }}
                                      className="divi-cod-prod"
                                    >
                                      {itensTabela.idProd}
                                    </td>
                                    <td id="item-tabela-tb" className="">
                                      {itensTabela.produtos.nome}
                                    </td>
                                    <td
                                      style={{ textAlign: 'center' }}
                                      className=""
                                    >
                                      {moeda(itensTabela.preco)}
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
                                        overlay={<Tooltip>Editar Item</Tooltip>}
                                      >
                                        <button
                                          className="btn btn-table btn-edit"
                                          style={{
                                            marginRight: 15,
                                            marginLeft: 15,
                                          }}
                                          onClick={() => {
                                            setcodProduto(
                                              String(itensTabela?.produtos.id)
                                            );
                                            codProduto = String(
                                              itensTabela?.produtos.id
                                            );
                                            setDescProduto(
                                              itensTabela?.produtos.nome
                                            );
                                            descProduto =
                                              itensTabela?.produtos.nome;
                                            GetitensEditId(itensTabela.id);
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
                                            setShowMensageDelete(true);
                                            setIdItemDelete(itensTabela.id);
                                            setcodProduto(
                                              String(itensTabela?.produtos.id)
                                            );
                                            codProduto = String(
                                              itensTabela?.produtos.id
                                            );
                                            setDescProduto(
                                              itensTabela?.produtos.nome
                                            );
                                            descProduto =
                                              itensTabela?.produtos.nome;
                                            idItemDelete = itensTabela.id;
                                            setAlertErroMensage(true);
                                            setMsgErro(
                                              'Deseja realmente excluir esse registro?'
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
                                className="alert alert-warning alerta-item"
                                role="alert"
                              >
                                Nenhuma ítem encontrado.
                              </div>
                            )}
                          </tbody>
                        </Table>
                      </div>
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
              className="btn btn-primary"
              onClick={handleCloseMensage}
            >
              Ok
            </button>
          </Modal.Body>
        </Modal>
        {/* ================Modal Editar Item ============================================== */}

        <Modal
          className="modal-confirm"
          show={showEditItem}
          onHide={handleCloseEditItem}
        >
          <Modal.Header closeButton>
            <h1>Status da solicitação</h1>
          </Modal.Header>
          <Modal.Body>
            {alertErroEditItem && (
              <div className="mt-3 mb-0">
                <Alert msg={msgErro} setAlertErro={setAlertErroEditItem} />
              </div>
            )}
            <div className="bloco-input bloco-item ">
              <p className="title-input titulo-cod-tabelaPrice">
                Preço do Produto:<span style={{ color: 'red' }}>*</span>
              </p>
              <input
                className="form-coontrol inputdataTab"
                id="precoEdit"
                type="Text"
                value={moeda(preco)}
                onChange={(e) => {
                  setPreco(e.target.value);
                  LimparTodos();
                }}
              />
            </div>
            <div className="botoes-item-tabela">
              <button
                className="btn btn-cadastrar btn-itens"
                onClick={EditarItem}
              >
                Salvar
              </button>
              <button
                className="btn  btn-cancelar btn-itens"
                onClick={handleCloseEditItem}
              >
                Cancelar
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* ================Modal adicionar item ============================================== */}

        <Modal
          className="modal-confirm modal-item"
          show={showCadastroItem}
          onHide={handleCloseCadastroItem}
        >
          <Modal.Header closeButton>
            <h1>Adicionar Ítem</h1>
          </Modal.Header>
          <Modal.Body>
            {alertErroCadastroItem && (
              <div className="mt-3 mb-0">
                <Alert msg={msgErro} setAlertErro={setAlertErroCadastroItem} />
              </div>
            )}
            <div className="bloco-input bloco-item">
              <p className="title-input titulo-item">
                Selecione o produto:<span style={{ color: 'red' }}>*</span>
              </p>
              <Select
                id="idProduto"
                className="select-comp"
                placeholder="Digite ou selecione"
                noOptionsMessage={() => 'Nenhum produto encontrado'}
                options={produtoCadastro}
                onChange={(value: any) => {
                  setIdProduto(value.value);
                  idProduto = value.value;
                  setDescProduto(value.label);
                  descProduto = value.label;
                  LimparTodos();
                }}
              />
            </div>
            <div className="bloco-input bloco-item ">
              <p className="title-input titulo-cod-tabelaPrice">
                Preço do Produto:<span style={{ color: 'red' }}>*</span>
              </p>
              <input
                className="form-coontrol inputdataTab"
                id="preco"
                type="Text"
                value={moeda(preco)}
                onChange={(e) => {
                  setPreco(e.target.value);
                  LimparTodos();
                }}
              />
            </div>
            <div className="botoes-item-tabela">
              <button
                className="btn btn-cadastrar btn-itens"
                onClick={AddItemTabelaPreco}
              >
                Salvar
              </button>
              <button
                className="btn  btn-cancelar btn-itens"
                onClick={handleCloseCadastroItem}
              >
                Cancelar
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* =================modal confirma deleção============================== */}
        <Modal
          className="modal-confirm"
          show={showMensageDelete}
          onHide={handleCloseMensageDelete}
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
                className="btn btn-dark"
                onClick={() => {
                  setAlertErroMensage(false);
                  DeleteItem();
                }}
              >
                Sim
              </button>
              <button
                style={{ width: 130 }}
                className="btn btn-danger"
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
