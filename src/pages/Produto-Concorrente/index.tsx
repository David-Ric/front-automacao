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
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import {
  iDadosUsuario,
  iDataSelect,
  iProdutos,
  iProdutoConcorrente,
} from '../../@types';
import Select from 'react-select';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function CadastroProdutosConcorrentes() {
  const history = useNavigate();
  const [id, setId] = useState(0);
  const [codProduto, setCodProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [codConcorrente, setCodConcorrente] = useState('');
  const [nomeConcorrente, setNomeConcorrente] = useState('');
  const [codProdutoConcorrente, setCodProdutoConcorrente] = useState('');
  const [nomeProdutoSimilar, setNomeProdutoSimilar] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [idGrupo, setIdGrupo] = useState('');
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  let [produtosConcorrentes, setProdutosConcorrentes] = useState<
    iProdutoConcorrente[]
  >([]);
  const [limpando, setLimpando] = useState(false);
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showMensageDelete, setShowMensageDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const handleCloseMensageDelete = () => setShowMensageDelete(false);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  let [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  let [concorrentefilter, setConcorrentefilter] = useState(false);
  let [idProduto, setIdProduto] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(10);
  const [produtoPesquisa, setProdutoPesquisa] = useState<iDataSelect[]>([]);
  const [concorrentePesquisa, setConcorrentePesquisa] = useState<iDataSelect[]>(
    []
  );
  const [concorrentePesq, setConcorrentePesq] = useState<iDataSelect[]>([]);
  const [produtoCadastro, setProdutoCadastro] = useState<iDataSelect[]>([]);
  const [pesquisaProduto, setPesquisaProduto] = useState(true);
  const [pesquisaSimilar, setPesquisaSimilar] = useState(false);
  const [pesquisaConcorrente, setPesquisaConcorrente] = useState(false);
  let [selectGrupoBanco, setSelectGrupoBanco] = useState<iDataSelect>();
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
    GetProdutos();
    GetConcorrentes();
    GetProdutoSimiliar();
    if (filter) {
      GetProdutosConcorrentesFilter();
    } else {
      GetProdutosConcorrentes();
    }
  }, [pagina]);

  function handleShowMensage() {
    setShowMensage(true);
    setTimeout(function () {}, 1200);
  }

  function LimparTodos() {
    setAlertErroRegister(false);
  }
  function handleShow() {
    setId(0);
    setCodProduto('');
    setNomeProduto('');
    setCodConcorrente('');
    setCodProdutoConcorrente('');
    setNomeConcorrente('');
    setNomeProdutoSimilar('');
    setShow(true);
  }

  //========get select produtos====================================
  async function GetProdutos() {
    await api

      .get(`/api/Produto?pagina=1&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((produtos: any) => {
            let rowProd: iDataSelect = {};
            rowProd.value = String(produtos.id);
            rowProd.label = produtos.nome;
            options.push(rowProd);
            setProdutoCadastro(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //========get select produtos concorrentes====================================
  async function GetProdutoSimiliar() {
    await api

      .get(`/api/ProdutoConcorrente?pagina=1&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
          let optionsprod: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((produtos: any) => {
            let rowProd: iDataSelect = {};
            rowProd.value = String(produtos.codProduto);
            rowProd.label = produtos.nomeProduto;

            optionsprod.push(rowProd);
            setProdutoPesquisa(optionsprod);
          });
        }
        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((concorrentes: any) => {
            let rowConcorrente: iDataSelect = {};
            rowConcorrente.value = String(concorrentes.id);
            rowConcorrente.label = concorrentes.nomeProdutoSimilar;
            options.push(rowConcorrente);
            setConcorrentePesquisa(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //===========get concorrente =================================================//
  async function GetConcorrentes() {
    await api

      .get(`/api/Concorrente?pagina=1&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
          let options: Array<iDataSelect> = new Array<iDataSelect>();
          response.data.data.map((produtos: any) => {
            let rowProd: iDataSelect = {};
            rowProd.value = String(produtos.id);
            rowProd.label = produtos.nome;
            options.push(rowProd);
            setConcorrentePesq(options);
          });
        }
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============================================================================

  async function GetProdutosConcorrentes() {
    setSucess(60);
    setFilter(false);
    await api

      .get(`/api/ProdutoConcorrente?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setProdutosConcorrentes(response.data.data);
        produtosConcorrentes = response.data.data;
        console.log('get', response.data.data);
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

  async function GetProdutosConcorrentesFilter() {
    setFilter(true);
    console.log('entrou produto');
    await api
      .get(
        `/api/ProdutoConcorrente/filter?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
      )
      .then((response) => {
        setProdutosConcorrentes(response.data.data);
        produtosConcorrentes = response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetProdutosConcorrentesConcorrente() {
    console.log('entrou');
    await api
      .get(
        `/api/ProdutoConcorrente/concorrente?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
      )
      .then((response) => {
        setProdutosConcorrentes(response.data.data);
        produtosConcorrentes = response.data.data;
        console.log('conc pesquisa', produtosConcorrentes);
        setConcorrentefilter(false);
        concorrentefilter = false;
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setConcorrentefilter(false);
        concorrentefilter = false;
      });
  }

  //=========== get produto por ID ==================================//
  async function GetProdutoId(id: any) {
    setId(0);
    setCodProduto('');
    setNomeProduto('');
    setCodConcorrente('');
    setCodProdutoConcorrente('');
    setNomeConcorrente('');
    setNomeProdutoSimilar('');
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/ProdutoConcorrente/${id}`)
      .then((response) => {
        setGrupoSelecionado(response.data.nomeGrupo);
        let banco: iDataSelect = {
          value: response.data.idGrupo,
          label: response.data.nomeGrupo,
        };
        setSelectGrupoBanco(banco);
        setId(response.data.id);
        setCodProduto(response.data.codProduto);
        setCodConcorrente(response.data.codConcorrente);
        setNomeConcorrente(response.data.nomeConcorrente);
        setNomeProduto(response.data.nomeProduto);
        setCodProdutoConcorrente(response.data.codProdutoConcorrente);
        setNomeProdutoSimilar(response.data.nomeProdutoSimilar);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar produto ===============================//
  async function EditeProduto() {
    setLoadingUpdate(true);
    await api
      .put(`/api/ProdutoConcorrente/${id}`, {
        id: id,
        codProduto: codProduto,
        nomeProduto: nomeProduto,
        codConcorrente: codConcorrente,
        nomeConcorrente: nomeConcorrente,
        codProdutoConcorrente: codProdutoConcorrente,
        nomeProdutoSimilar: nomeProdutoSimilar,
      })
      .then((response) => {
        handleCloseEdit();
        GetProdutosConcorrentes();
        GetProdutoSimiliar();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Produto similar atualizado com sucesso.');
        setLimpando(false);
      })
      .catch((error) => {
        setLimpando(false);
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
  async function CreateProduto() {
    if (nomeProdutoSimilar.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('prinome');
      document.getElementById('prinome')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a descrição do produto similar.');
      return;
    }

    if (nomeConcorrente.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('email');
      document.getElementById('email')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar a empresa concorrente');
      return;
    }
    if (nomeProduto.trim() == '') {
      let senhaconf: any;
      senhaconf = document.getElementById('email');
      document.getElementById('email')?.focus();
      setAlertErroRegister(true);
      setMsgErro('É obrigatório informar o nosso produto');
      return;
    }

    setLoadingCreate(true);
    await api
      .post('/api/ProdutoConcorrente', {
        nomeProduto: nomeProduto,
        codProduto: codProduto,
        nomeConcorrente: nomeConcorrente,
        codConcorrente: codConcorrente,
        nomeProdutoSimilar: nomeProdutoSimilar,
      })

      .then((response) => {
        setLoadingCreate(false);
        GetProdutosConcorrentes();
        GetProdutoSimiliar();
        handleClose();
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Produto similar cadastrado com sucesso.');
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
  //==== EXCLUIR PRODUTO ======================================
  async function DeleteProdutoConcorrente() {
    setLoadingUpdate(true);
    await api
      .delete(`/api/ProdutoConcorrente/${idProduto}`)
      .then((response) => {
        handleCloseEdit();
        GetProdutosConcorrentes();
        GetProdutoSimiliar();
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Registro excluído com sucesso.');
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
  //==========================================================//
  function ShowModalEdit() {
    setShowEdit(true);
  }
  function LimparPesquisa() {
    setSearch('');
    setConcorrentefilter(false);
    concorrentefilter = false;
    setSearchStatus('');
    setPagina(1);
    PesquisaProduto();
    setFilter(false);
    GetProdutosConcorrentes();
    GetProdutos();
    GetConcorrentes();
    GetProdutoSimiliar();
  }

  function PesquisaProduto() {
    setSearch('');
    setPagina(1);
    setConcorrentefilter(false);
    concorrentefilter = false;
    GetProdutosConcorrentes();
    setPesquisaProduto(true);
    setPesquisaConcorrente(false);
    setPesquisaSimilar(false);
    let pesquisar: any;
    pesquisar = document.getElementById('nomePesquisa');
    document.getElementById('nomePesquisa')?.focus();
  }

  function PesquisaConcorrente() {
    setSearch('');
    setPagina(1);
    setConcorrentefilter(true);
    concorrentefilter = true;
    GetProdutosConcorrentes();
    setPesquisaProduto(false);
    setPesquisaConcorrente(true);
    setPesquisaSimilar(false);
    let pesquisa: any;
    pesquisa = document.getElementById('grupoPesquisa');
    document.getElementById('grupoPesquisa')?.focus();
    console.log('filtrar por', concorrentefilter);
  }

  function PesquisaSimilar() {
    setSearch('');
    setPagina(1);
    setConcorrentefilter(false);
    concorrentefilter = false;
    GetProdutosConcorrentes();
    setPesquisaProduto(false);
    setPesquisaConcorrente(false);
    setPesquisaSimilar(true);
    let pesquisa: any;
    pesquisa = document.getElementById('grupoPesquisa');
    document.getElementById('grupoPesquisa')?.focus();
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
              <h1>Produtos x Concorrentes</h1>
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
                      <div className="d-flex pesquisa-conocorrente">
                        <input
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaProduto}
                          onChange={PesquisaProduto}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>Produto</p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaConcorrente}
                          onChange={PesquisaConcorrente}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>
                          Concorrente
                        </p>
                        <input
                          style={{ marginLeft: 20 }}
                          name="pesquisa"
                          type="radio"
                          checked={pesquisaSimilar}
                          onChange={PesquisaSimilar}
                        />
                        <p style={{ fontSize: 13, marginLeft: 8 }}>
                          Produto Similar
                        </p>
                      </div>
                    </div>
                    <OverlayTrigger
                      placement={'top'}
                      delay={{ show: 100, hide: 250 }}
                      overlay={<Tooltip>Novo Produto</Tooltip>}
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
                  <div
                    style={{ marginTop: 10, width: '100%' }}
                    className="conteudo-botoes"
                  >
                    <div className="bloco-pesquisa-input">
                      {pesquisaProduto ? (
                        <>
                          <div>
                            <p className="title-input">
                              Pesquisar por produto:{' '}
                            </p>

                            <Select
                              id="grupoPesquisa"
                              className="select-comp"
                              placeholder="Digite ou selecione"
                              noOptionsMessage={() =>
                                'Nenhum produto encontrado'
                              }
                              options={produtoPesquisa}
                              onChange={(value: any) => {
                                setSearch(value.label);
                                search = value.label;
                                console.log('Select', value);
                                GetProdutosConcorrentesFilter();
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaConcorrente ? (
                        <>
                          <div>
                            <p className="title-input">
                              Pesquisar por concorrente:{' '}
                            </p>
                            <Select
                              id="grupoPesquisa"
                              className="select-comp"
                              placeholder="Digite ou selecione"
                              noOptionsMessage={() =>
                                'Nenhum concorrente encontrado'
                              }
                              options={concorrentePesq}
                              onChange={(value: any) => {
                                setSearch(value.label);
                                search = value.label;
                                setConcorrentefilter(true);
                                concorrentefilter = true;
                                console.log('Select', value);
                                GetProdutosConcorrentesFilter();
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {pesquisaSimilar ? (
                        <>
                          <div className="">
                            <p className="title-input">
                              Pesquisar por produto similar:{' '}
                            </p>

                            <Select
                              id="grupoPesquisa"
                              className="select-comp"
                              placeholder="Digite ou selecione"
                              noOptionsMessage={() =>
                                'Nenhum concorrente encontrado'
                              }
                              options={concorrentePesquisa}
                              onChange={(value: any) => {
                                setSearch(value.label);
                                search = value.label;
                                console.log('Select', value);
                                GetProdutosConcorrentesConcorrente();
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
                          if (concorrentefilter) {
                            GetProdutosConcorrentesConcorrente();
                          } else {
                            GetProdutosConcorrentesFilter();
                          }
                        }}
                      >
                        Pesquisar
                        <FaSearchPlus style={{ marginLeft: 6 }} fontSize={12} />
                      </button>
                      <button
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
                              id="codigo-tabela"
                              style={{ textAlign: 'center' }}
                              className="th1 div-cod-prod"
                            >
                              Cód{' '}
                            </th>
                            <th className="th1 Nome-complet">
                              Produto Similar
                            </th>
                            <th
                              id="codigo-tabela"
                              style={{ textAlign: 'center' }}
                              className="th2 div-cod-prod"
                            >
                              Cód Conc
                            </th>
                            <th className="th3">Concorrente</th>
                            <th
                              id="codigo-tabela"
                              style={{ textAlign: 'center' }}
                              className="th2 div-cod-prod"
                            >
                              Cód Prod
                            </th>
                            <th className="th3">Produto</th>

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
                          {produtosConcorrentes.length > 0 ? (
                            <>
                              {produtosConcorrentes.map((produtos, index) => (
                                <tr key={index}>
                                  <td
                                    id="codigo-tabela"
                                    className="div-cod-prod"
                                    style={{ textAlign: 'center' }}
                                    onClick={() => {
                                      GetProdutoId(produtos.id);
                                      ShowModalEdit();
                                    }}
                                  >
                                    {produtos.id}
                                  </td>
                                  <td className="Nome-complet">
                                    {produtos.nomeProdutoSimilar}
                                  </td>
                                  <td
                                    id="codigo-tabela"
                                    className="div-cod-prod"
                                    style={{ textAlign: 'center' }}
                                    onClick={() => {
                                      GetProdutoId(produtos.id);
                                      ShowModalEdit();
                                    }}
                                  >
                                    {produtos.codConcorrente}
                                  </td>
                                  <td className="Nome-complet">
                                    {produtos.nomeConcorrente}
                                  </td>
                                  <td
                                    id="codigo-tabela"
                                    className="div-cod-prod"
                                    style={{ textAlign: 'center' }}
                                    onClick={() => {
                                      GetProdutoId(produtos.id);
                                      ShowModalEdit();
                                    }}
                                  >
                                    {produtos.codProduto}
                                  </td>
                                  <td
                                    className="Nome-complet"
                                    onClick={() => {
                                      GetProdutoId(produtos.id);
                                      ShowModalEdit();
                                    }}
                                  >
                                    {produtos.nomeProduto}
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
                                          GetProdutoId(produtos.id);
                                          ShowModalEdit();
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
                                          setIdProduto(produtos.id);
                                          idProduto = produtos.id;
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
                              className="alert alert-warning alerta-prod"
                              role="alert"
                            >
                              Nenhum registro encontrado.
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

        <Modal className="modal-cadastro-prod" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h1>Cadastro de Produto Similar</h1>
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
                    <div className="bloco-input bloco-prod">
                      <p className="title-input">
                        Produto Similar:<span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-coontrol inputlogin"
                        id="descricao"
                        type="text"
                        value={nomeProdutoSimilar}
                        onChange={(e) => {
                          setNomeProdutoSimilar(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{ flexDirection: 'column' }}
                    className="coluna-dupla"
                  >
                    <div className="bloco-input">
                      <p id="grupos" className=" title-input">
                        Concorrente: <span style={{ color: 'red' }}>*</span>
                      </p>

                      <Select
                        id="grupo-create"
                        className=" select-comp"
                        placeholder="Digite ou selecione"
                        noOptionsMessage={() => 'Nenhum concorrente encontrado'}
                        options={concorrentePesq}
                        onChange={(value: any) => {
                          setCodConcorrente(value.value);
                          setNomeConcorrente(value.label);

                          console.log('Select', value);
                        }}
                      />
                    </div>
                    <div className="bloco-input">
                      <p id="grupos" className=" title-input">
                        Nosso Produto: <span style={{ color: 'red' }}>*</span>
                      </p>

                      <Select
                        id="grupo-create"
                        className=" select-comp"
                        placeholder="Digite ou selecione"
                        noOptionsMessage={() => 'Nenhum status encontrado'}
                        options={produtoCadastro}
                        onChange={(value: any) => {
                          setCodProduto(value.value);
                          setNomeProduto(value.label);

                          console.log('Select', value);
                        }}
                      />

                      <button
                        disabled={loadingCreate}
                        id="btn-cad-prod"
                        className="btn btn-dark"
                        onClick={CreateProduto}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        {/* ================Modal Edit ============================================== */}

        <Modal
          className="modal-cadastro-prod"
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <Modal.Header closeButton>
            <h1>Dados do Produto Similar</h1>
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
                    <div className="bloco-input bloco-prod">
                      <p className="title-input">
                        Produto Similar:<span style={{ color: 'red' }}>*</span>
                      </p>
                      <input
                        className="form-coontrol inputlogin"
                        id="descricao"
                        type="text"
                        value={nomeProdutoSimilar}
                        onChange={(e) => {
                          setNomeProdutoSimilar(e.target.value.toUpperCase());
                          LimparTodos();
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{ flexDirection: 'column' }}
                    className="coluna-dupla"
                  >
                    <div className="bloco-input">
                      <p id="grupos" className=" title-input">
                        Concorrente: <span style={{ color: 'red' }}>*</span>
                      </p>

                      <Select
                        id="grupo-create"
                        className=" select-comp"
                        placeholder={nomeConcorrente}
                        noOptionsMessage={() => 'Nenhum concorrente encontrado'}
                        options={concorrentePesq}
                        onChange={(value: any) => {
                          setCodConcorrente(value.value);
                          setNomeConcorrente(value.label);

                          console.log('Select', value);
                        }}
                      />
                    </div>
                    <div className="bloco-input">
                      <p id="grupos" className=" title-input">
                        Nosso Produto: <span style={{ color: 'red' }}>*</span>
                      </p>

                      <Select
                        id="grupo-create"
                        className=" select-comp"
                        placeholder={nomeProduto}
                        noOptionsMessage={() => 'Nenhum status encontrado'}
                        options={produtoCadastro}
                        onChange={(value: any) => {
                          setCodProduto(value.value);
                          setNomeProduto(value.label);

                          console.log('Select', value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="coluna-dupla">
                    <div className="bloco-input boco-botoes-grupo">
                      <button
                        disabled={loadingUpdate}
                        id="btn-desc"
                        className="btn btn-dark "
                        onClick={EditeProduto}
                      >
                        Salvar
                      </button>
                      <button
                        disabled={loadingUpdate}
                        id="btn-desc"
                        className="btn btn-danger "
                        onClick={handleCloseEdit}
                      >
                        Sair
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
              className="btn btn-primary"
              onClick={handleCloseMensage}
            >
              Ok
            </button>
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
                  DeleteProdutoConcorrente();
                  handleCloseMensageDelete();
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
