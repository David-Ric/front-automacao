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
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import { IColunasModulo, IModulo, iDataSelect, iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from '../../components/Paginacao/index';
import { moeda, phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { iVendedores, iDadosUsuario } from '../../@types';
import { BiSearchAlt } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { IGetLigacao, IOpcao } from '../Novas-Telas';
import { ChangeEvent } from 'react';
import FooterMobile from '../../components/Footer/FooterMobile';

interface InputValues {
  [name: string]: string | number | boolean | null | undefined | Date;
}

export default function PaginaDefault() {
  const history = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [vendedorId, setVendedorId] = useState(0);
  const [codVendedor, setCodVendedor] = useState('');
  const [nome, setNome] = useState('');
  const [ativo, setAtivo] = useState('');
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
  const [funcionarioId, setFuncionarioId] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [centroR_PadraoId, setCentroR_PadraoId] = useState('');
  const [centroR_Padrao, setCentroR_Padrao] = useState('');
  const [custoVariavel, setCustoVariavel] = useState(0);
  const [atuaComprador, setAtuaComprador] = useState(false);
  const [showloading, setShowloading] = useState(true);
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [filtro1, setfiltro1] = useState(true);
  const [filtro2, setfiltro2] = useState(false);
  const [filtro3, setfiltro3] = useState(false);
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
  const [fieldName, setFieldName] = useState('');
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
  const handleCloseloading = () => setShowloading(false);
  const [sucess, setSucess] = useState(0);
  const [check, setcheck] = useState(false);
  let [tela, settela] = useState<IModulo>();
  let [cabecalho, setcabecalho] = useState<IColunasModulo[]>([]);
  let [expressao, setexpressao] = useState('');
  let [nomeExpressao, setnomeExpressao] = useState('');

  //===============================================================//

  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  let [tabelaDefault, setTabelaDefault] = useState('');
  let [campoLigacao, setCampoLigacao] = useState('');
  let [tabelaLigada, setTabelaLigada] = useState('nao');
  let [campoExibir, setCampoExibir] = useState('');
  const [descricaoPagina, setdescricaoPagina] = useState('');
  const [tabelaData, setTabelaData] = useState<any[]>([]);
  const [opcao, setOpcao] = useState<IOpcao[]>([]);
  const { parametro } = useParams();
  let [tabelaPopular, settabelaPopular] = useState('');
  const [valorFormatado, setValorFormatado] = useState('');
  let [inputs, setInputs] = useState<InputValues>({});
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await GetModuloId(parametro);
      GetTabela();
    }
    fetchData();
  }, [parametro, pagina]);

  useEffect(() => {
    console.log('expressao e valor', nomeExpressao, expressao);
    console.log('cabeçalho do modulo', cabecalho);
  }, [nomeExpressao, expressao]);

  const handleEditClick = (row: any) => {
    console.log('linhasssssssss', row);
    if (Object.values(row).some((value) => value === true)) {
      setcheck(true);
    } else {
      setcheck(false);
    }
    setSelectedRow(row);
    setEdit(true);
    handleShow();
  };

  useEffect(() => {
    if (selectedRow) {
      const newInputs: InputValues = {};
      Object.entries(selectedRow).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const stringValue: string = value;
          if (stringValue.includes('|')) {
            console.log('valor', stringValue);

            const processedValue = stringValue.split('|')[0] || '';
            newInputs[key] = processedValue;
          } else {
            newInputs[key] = stringValue;
          }
        } else {
          newInputs[key] = (value as any)?.toString();
        }
      });
      console.log('newInputs', newInputs);
      setInputs(newInputs);
      inputs = newInputs;
      console.log('inputs', inputs);
    }
  }, [selectedRow]);

  useEffect(() => {
    console.log('valores da linhaaa no rows', selectedRow);
    console.log('valores da linhaaa', inputs);
  }, [selectedRow]);

  function formatMoney(value: any) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(value);
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
          ? 1
          : 0
        : e.target.value;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: value,
    }));
  };

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    const missingFields = [];

    for (const campo of cabecalho) {
      const valor = inputs[campo.nome];

      if (campo.nome && !valor && !campo.chavePrimaria) {
        if (campo.tipo === 'boolean') {
          inputs[campo.nome] = 0;
        } else {
          missingFields.push(campo.nome);
        }
      }
    }

    console.log('valores dos inputs', inputs);
    Popular();
  };

  const handleEdit = () => {
    const missingFields = [];

    for (const campo of cabecalho) {
      const valor = inputs[campo.nome];

      if (campo.nome && !valor && !campo.chavePrimaria) {
        if (campo.tipo === 'boolean') {
          inputs[campo.nome] = 0;
        } else {
          missingFields.push(campo.nome);
        }
      } else if (campo.tipo === 'boolean') {
        if (valor === 'false') {
          inputs[campo.nome] = 0;
        } else if (valor === 'true') {
          inputs[campo.nome] = 1;
        }
      }
    }

    if (missingFields.length > 0) {
      const errorMsg = missingFields
        .map((fieldName) => `O campo ${fieldName} é obrigatório.`)
        .reverse();
      for (const msg of errorMsg) {
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro(msg);
      }
    } else {
      console.log('valores dos inputs', inputs);
      Editar();
    }
  };

  async function Popular() {
    await api
      .post(`/api/CriarTabela/criarTabela${tabelaPopular}`, [inputs])
      .then((response) => {
        setShow(false);
        GetTabela();
        setInputs({});
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro('Registro cadastrado com sucesso');
        console.log('salvou');
      })
      .catch((error) => {
        console.log('nao salvou');
      });
  }
  const [colunaEdit, setcolunaEdit] = useState('');
  const [valorcolunaEdit, setvalorcolunaEdit] = useState('');

  async function Editar() {
    setLoadingUpdate(true);
    await api

      .delete(
        `/api/CriarTabela/deletarRegistros/${tabelaPopular}/${colunaEdit}/${valorcolunaEdit}`
      )
      .then((response) => {
        Editar2();
      })
      .catch((error) => {
        console.log('nao excuiu');
        return;
      });
  }
  async function Editar2() {
    await api
      .post(`/api/CriarTabela/criarTabela${tabelaPopular}`, [inputs])
      .then((response) => {
        setShow(false);
        GetTabela();
        setInputs({});
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro('Registro Editado com sucesso');
        console.log('salvou');
      })
      .catch((error) => {
        console.log('nao salvou');
      });
  }

  async function DeleteValor(coluna: any, valorColuna: any) {
    setLoadingUpdate(true);
    await api

      .delete(
        `/api/CriarTabela/deletarRegistros/${tabelaPopular}/${coluna}/${valorColuna}`
      )
      .then((response) => {
        GetTabela();
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro('Registro excluido com sucesso');
      })
      .catch((error) => {
        console.log('nao excuiu');
        return;
      });
  }

  async function GetModuloId(parametro: any) {
    setShowloading(true);
    setTabelaData([]);
    setexpressao('');
    expressao = '';
    setnomeExpressao('');
    nomeExpressao = '';
    await api
      .get(`/api/Modulo/${parametro}`)
      .then((response) => {
        console.log('resposta do modulo', response.data);
        setcabecalho(response.data.colunaModulo);
        cabecalho = response.data.colunaModulo;
        response.data.colunaModulo.forEach((objeto: any) => {
          if (objeto.expressao) {
            setexpressao(objeto.expressao);
            expressao = objeto.expressao;
            setnomeExpressao(objeto.nome);
            nomeExpressao = objeto.nome;
          }
        });

        setdescricaoPagina(response.data.descricao);
        setShowloading(false);
        settela(response.data);
        tela = response.data;
        settabelaPopular(response.data.tabela);
        tabelaPopular = response.data.tabela;
        console.log('tabela para parametro', tabelaPopular);

        if (
          response.data.ligacaoTabela &&
          response.data.ligacaoTabela.length > 0
        ) {
          setTabelaLigada(response.data.ligacaoTabela[0].tabeaLigada);
          tabelaLigada = response.data.ligacaoTabela[0].tabeaLigada;
          setCampoLigacao(response.data.ligacaoTabela[0].campoLigacao);
          campoLigacao = response.data.ligacaoTabela[0].campoLigacao;
          setCampoExibir(response.data.ligacaoTabela[0].campoExibir);
          campoExibir = response.data.ligacaoTabela[0].campoExibir;
        } else {
          setTabelaLigada('nao');
          tabelaLigada = 'nao';
        }
        response.data.colunaModulo.forEach((obj: any) => {
          const opcaoArray: IOpcao[] = [];
          obj.opcaoCampo.forEach((opcaoObj: IOpcao) => {
            opcaoArray.push(opcaoObj);
          });
          setOpcao((prevOpcao) => [...prevOpcao, ...opcaoArray]);
        });
        GetLigacao(
          response.data.ligacaoTabela[0].tabeaLigada,
          response.data.ligacaoTabela[0].campoExibir
        );
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setShowloading(false);
      });
  }
  const [ligacaoTab, setligacaoTab] = useState<iDataSelect[]>([]);

  async function GetLigacao(tabela: any, parametro: any) {
    setShowloading(true);
    await api
      .get(`/api/CriarTabela/tabela/${tabela}/${parametro}`)
      .then((response) => {
        console.log('resposta da lista de ligação', response.data);
        setligacaoTab(response.data);
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro na ligação');
        setShowloading(false);
      });
  }

  useEffect(() => {
    console.log('opções', opcao);
  }, [opcao]);

  async function GetCamposTabela() {
    setTabelaData([]);
    console.log('entrou no get ligaçao');
    setShowloading(true);
    await api
      .get(
        `/api/CriarTabela/tabela/${tabelaPopular}/${tabelaLigada}/${campoLigacao}/${campoExibir}?pagina=${pagina}&totalpagina=${qtdePagina}`
      )
      .then((response) => {
        console.log('resposta da tabela', response.data);
        setTabelaData(response.data.data);
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        setShowloading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
        setShowloading(false);
      });
  }
  async function GetTabela() {
    setTabelaData([]);
    console.log('entrou no get sem ligaçao');

    if (tabelaLigada == 'nao') {
      await api
        .get(
          `/api/CriarTabela/tabela/${tabelaPopular}?pagina=${pagina}&totalPaginas=${qtdePagina}&campoExpressao=${nomeExpressao}&sqlExpressao=${expressao}`
        )
        .then((response) => {
          console.log('resposta da tabela', response.data);
          setTotalPaginas(Math.ceil(response.data.totalRegistros / qtdePagina));
          setTabelaData(response.data.data);
          setShowloading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro na busca comum');
          setShowloading(false);
        });
    } else {
      await api
        .get(
          `/api/CriarTabela/tabela/${tabelaPopular}/${tabelaLigada}/${campoLigacao}/${campoExibir}?pagina=${pagina}&totalpagina=${qtdePagina}&campoExpressao=${nomeExpressao}&sqlExpressao=${expressao}`
        )
        .then((response) => {
          console.log('resposta da tabela', response.data);
          setTabelaData(response.data.data);
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          setShowloading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro na busca com ligação');
          setShowloading(false);
        });
    }
  }
  async function GetTabelaPesquisa(event: any) {
    event.preventDefault();
    setPagina(1);
    setTabelaData([]);
    console.log('entrou no get sem ligaçao');

    if (tabelaLigada == 'nao') {
      await api
        .get(
          `/api/CriarTabela/tabela/${tabelaPopular}?pagina=${pagina}&totalPaginas=${qtdePagina}&fieldName=${fieldName}&fieldValue=${search}&campoExpressao=${nomeExpressao}&sqlExpressao=${expressao}`
        )
        .then((response) => {
          console.log('resposta da tabela', response.data);
          setTotalPaginas(Math.ceil(response.data.totalRegistros / qtdePagina));
          setTabelaData(response.data.data);
          setShowloading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro na busca comum');
          setShowloading(false);
        });
    } else {
      await api
        .get(
          `/api/CriarTabela/tabela/${tabelaPopular}/${tabelaLigada}/${campoLigacao}/${campoExibir}?pagina=${pagina}&totalpagina=${qtdePagina}&fieldName=${fieldName}&fieldValue=${search}&campoExpressao=${nomeExpressao}&sqlExpressao=${expressao}`
        )
        .then((response) => {
          console.log('resposta da tabela', response.data);
          setTabelaData(response.data.data);
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
          setShowloading(false);
        })
        .catch((error) => {
          console.log('Ocorreu um erro na busca com ligação');
          setShowloading(false);
        });
    }
  }

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
    setNome('');
    setCodVendedor('');
    setAtivo('');
    setRegiao('');
    setTipo('V');
    setComiVenda(0);
    setComiGerencia(0);
    setValor_hora(0);
    setFormaComissao('');
    setCargaHoraria('');
    setEmpresa('');
    setGerenteId('');
    setGerente('');
    setParceiroId('');
    setParceiro('');
    setFuncionarioId('');
    setFuncionario('');
    setCentroR_PadraoId('');
    setCentroR_Padrao('');
    setCustoVariavel(0);
    setEmail('');
    setAtuaComprador(false);
    setShow(true);
  }

  async function GetVendedores() {
    setFilter(false);
    await api

      .get(`/api/Vendedor?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setNome(response.data.data[0].nome);
        setVendedores(response.data.data);
        vendedores = response.data.data;
        console.log('vendedor', vendedores);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetVendedoresFilter() {
    setFilter(true);
    if (pesquisaCod) {
      await api
        .get(
          `/api/Vendedor/filter/codigo?pagina=${pagina}&totalpagina=${qtdePagina}&codigo=${search}`
        )
        .then((response) => {
          setVendedores(response.data.data);
          vendedores = response.data.data;

          console.log('usuarios pesquisa cod', response.data.data);
          console.log('total vendedores', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaNome) {
      await api
        .get(
          `/api/Vendedor/filter?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setVendedores(response.data.data);
          vendedores = response.data.data;

          console.log('usuarios pesquisa', vendedores);
          console.log('total vendedores', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
    if (pesquisaStatus) {
      await api
        .get(
          `/api/Vendedor/filter/status?pagina=${pagina}&totalpagina=${qtdePagina}&filter=${search}`
        )
        .then((response) => {
          setVendedores(response.data.data);
          vendedores = response.data.data;
          console.log('usuarios pesquisa', vendedores);
          console.log('total vendedores', response.data);
        })
        .catch((error) => {
          console.log('Ocorreu um erro');
        });
    }
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
        GetVendedores();
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

  //==== EXCLUIR valor ======================================

  //==========================================================//
  function LimparPesquisa() {
    setSearch('');
    setFieldName('');
    GetTabela();
    setPagina(1);
    setFilter(false);
    setfiltro1(true);
    setfiltro2(false);
    setfiltro3(false);
  }

  function Filtro1() {
    setSearch('');
    setFieldName('');
    GetTabela();
    setfiltro1(true);
    setfiltro2(false);
    setfiltro3(false);
  }

  function Filtro3() {
    setSearch('');
    setFieldName('');
    GetTabela();
    setfiltro1(false);
    setfiltro2(false);
    setfiltro3(true);
  }

  function Filtro2() {
    setSearch('');
    setFieldName('');
    GetTabela();
    setfiltro1(false);
    setfiltro2(true);
    setfiltro3(false);
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
      GetVendedoresFilter();
    }

    if (search == '') {
      LimparPesquisa();
    }
  }

  function formatDate(dateTimeString: string): string {
    const dataAtual = new Date(dateTimeString);
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  function formatarValor(valor: any, tipo: any) {
    switch (tipo) {
      case 'decimal':
        return formatDecimal(valor);
      case 'date':
        return formatDate(valor);
      default:
        return valor;
    }
  }

  function formatDecimal(valor: any) {
    const valorDecimal = (valor / 100).toFixed(2);
    return valorDecimal.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function exibirValor(campoNome: any, valor: any, cabecalho: any) {
    const campo = cabecalho.find((campo: any) => campo.nome === campoNome);
    if (campo && campo.tipo) {
      return (
        <td style={{ textAlign: 'left' }} key={campoNome}>
          {formatarValor(valor, campo.tipo)}
        </td>
      );
    }
    return (
      <td style={{ textAlign: 'left' }} key={campoNome}>
        {valor}
      </td>
    );
  }

  function dinheiro(valor: any) {
    if (!valor) {
      return '';
    }

    valor = valor.replace(/\D/g, '');
    valor = (valor / 100).toFixed(2);

    return valor.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
              <h1>{descricaoPagina}</h1>
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
                    {tela?.filtro1 !== '' ||
                    tela?.filtro2 !== '' ||
                    tela?.filtro3 !== '' ? (
                      <>
                        <div className="pesBloco">
                          <div className="title-pesBloco">
                            <span style={{ fontSize: 14 }}>Pesquisar por:</span>
                          </div>
                          <div className="d-flex div-parceiros-pesquisa">
                            {tela?.filtro1 !== '' ? (
                              <>
                                <input
                                  name="pesquisa"
                                  type="radio"
                                  checked={filtro1}
                                  onChange={Filtro1}
                                />
                                <p style={{ fontSize: 13, marginLeft: 8 }}>
                                  {tela?.filtro1}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                            {tela?.filtro2 !== '' ? (
                              <>
                                <input
                                  style={{ marginLeft: 20 }}
                                  name="pesquisa"
                                  type="radio"
                                  checked={filtro2}
                                  onChange={Filtro2}
                                />
                                <p style={{ fontSize: 13, marginLeft: 8 }}>
                                  {tela?.filtro2}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                            {tela?.filtro3 !== '' ? (
                              <>
                                <input
                                  style={{ marginLeft: 20 }}
                                  name="pesquisa"
                                  type="radio"
                                  checked={filtro3}
                                  onChange={Filtro3}
                                />
                                <p style={{ fontSize: 13, marginLeft: 8 }}>
                                  {tela?.filtro3}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {tela?.insert ? (
                      <>
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 100, hide: 250 }}
                          overlay={<Tooltip>Novo Vendedor</Tooltip>}
                        >
                          <button
                            className="btn btn-dark btn-direito"
                            onClick={() => {
                              setInputs({});
                              setEdit(false);
                              setcheck(false);
                              handleShow();
                            }}
                          >
                            Novo{' '}
                            <TfiNewWindow
                              style={{ marginLeft: 8, marginBottom: 5 }}
                            />
                          </button>
                        </OverlayTrigger>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{ marginTop: 10, width: '100%' }}
                    className="conteudo-botoes"
                  >
                    {tela?.filtro1 !== '' ||
                    tela?.filtro2 !== '' ||
                    tela?.filtro3 !== '' ? (
                      <>
                        <form
                          onSubmit={GetTabelaPesquisa}
                          className="bloco-pesquisa-input"
                        >
                          {filtro1 ? (
                            <>
                              <div>
                                <p className="title-input">{tela?.filtro1}: </p>
                                {cabecalho.find(
                                  (obj) => obj.nome === tela?.filtro1
                                )?.tipoInput == '1' && (
                                  <input
                                    id="nomePesquisa"
                                    type="text"
                                    className="form-control select inputparceiro "
                                    name=""
                                    value={search}
                                    onChange={(e) => {
                                      setFieldName(String(tela?.filtro1));
                                      setSearch(e.target.value);
                                      search = e.target.value;
                                    }}
                                  />
                                )}
                                {cabecalho.find(
                                  (obj) => obj.nome === tela?.filtro1
                                )?.tipoInput == '4' && (
                                  <select
                                    id="statusPesquisa2"
                                    className="form-select select inputparceiro  campo-select"
                                    aria-label=""
                                    value={search}
                                    onChange={(e) => {
                                      setFieldName(String(tela?.filtro1));
                                      setSearch(e.target.value);
                                      search = e.target.value;
                                    }}
                                  >
                                    <option value=""></option>
                                    {opcao
                                      .filter(
                                        (opcaoItem, index, self) =>
                                          index ===
                                          self.findIndex(
                                            (t) => t.opcao === opcaoItem.opcao
                                          )
                                      )
                                      .filter(
                                        (opcaoItem) =>
                                          opcaoItem.nomeCampo === tela?.filtro1
                                      )
                                      .map((opcoes) => (
                                        <option value={opcoes?.valor}>
                                          {opcoes?.opcao}
                                        </option>
                                      ))}
                                    {campoLigacao == tela?.filtro1 ? (
                                      <>
                                        {ligacaoTab.map((ligacao) => (
                                          <option value={ligacao?.value}>
                                            {ligacao?.label}
                                          </option>
                                        ))}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </select>
                                )}
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {filtro2 ? (
                            <>
                              <div>
                                <p className="title-input">{tela?.filtro2}: </p>
                                {cabecalho.find(
                                  (obj) => obj.nome === tela?.filtro2
                                )?.tipoInput == '1' && (
                                  <input
                                    id="nomePesquisa"
                                    type="text"
                                    className="form-control select inputparceiro "
                                    name=""
                                    value={search}
                                    onChange={(e) => {
                                      setFieldName(String(tela?.filtro2));
                                      setSearch(e.target.value);
                                      search = e.target.value;
                                    }}
                                  />
                                )}
                                {cabecalho.find(
                                  (obj) => obj.nome === tela?.filtro2
                                )?.tipoInput == '4' && (
                                  <select
                                    id="statusPesquisa2"
                                    className="form-select select inputparceiro  "
                                    aria-label=""
                                    value={search}
                                    onChange={(e) => {
                                      setFieldName(String(tela?.filtro2));
                                      setSearch(e.target.value);
                                      search = e.target.value;
                                    }}
                                  >
                                    <option value=""></option>
                                    {opcao
                                      .filter(
                                        (opcaoItem, index, self) =>
                                          index ===
                                          self.findIndex(
                                            (t) => t.opcao === opcaoItem.opcao
                                          )
                                      )
                                      .filter(
                                        (opcaoItem) =>
                                          opcaoItem.nomeCampo === tela?.filtro2
                                      )
                                      .map((opcoes) => (
                                        <option value={opcoes?.valor}>
                                          {opcoes?.opcao}
                                        </option>
                                      ))}

                                    {campoLigacao == tela?.filtro2 ? (
                                      <>
                                        {ligacaoTab.map((ligacao) => (
                                          <option value={ligacao?.value}>
                                            {ligacao?.label}
                                          </option>
                                        ))}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </select>
                                )}
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {filtro3 ? (
                            <>
                              <div>
                                <p className="title-input">{tela?.filtro3}: </p>
                                {cabecalho.find(
                                  (obj) => obj.nome === tela?.filtro3
                                )?.tipoInput == '1' && (
                                  <input
                                    id="nomePesquisa"
                                    type="text"
                                    className="form-control select inputparceiro "
                                    name=""
                                    value={search}
                                    onChange={(e) => {
                                      setFieldName(String(tela?.filtro3));
                                      setSearch(e.target.value);
                                      search = e.target.value;
                                    }}
                                  />
                                )}
                                {cabecalho.find(
                                  (obj) => obj.nome === tela?.filtro3
                                )?.tipoInput == '4' && (
                                  <select
                                    id="statusPesquisa2"
                                    className="form-select select inputparceiro  campo-select"
                                    aria-label=""
                                    value={search}
                                    onChange={(e) => {
                                      setFieldName(String(tela?.filtro3));
                                      setSearch(e.target.value);
                                      search = e.target.value;
                                    }}
                                  >
                                    <option value=""></option>
                                    {opcao
                                      .filter(
                                        (opcaoItem, index, self) =>
                                          index ===
                                          self.findIndex(
                                            (t) => t.opcao === opcaoItem.opcao
                                          )
                                      )
                                      .filter(
                                        (opcaoItem) =>
                                          opcaoItem.nomeCampo === tela?.filtro3
                                      )
                                      .map((opcoes) => (
                                        <option value={opcoes?.valor}>
                                          {opcoes?.opcao}
                                        </option>
                                      ))}
                                    {campoLigacao == tela?.filtro3 ? (
                                      <>
                                        {ligacaoTab.map((ligacao) => (
                                          <option value={ligacao?.value}>
                                            {ligacao?.label}
                                          </option>
                                        ))}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </select>
                                )}
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
                            onClick={GetTabelaPesquisa}
                          >
                            Pesquisar
                            <FaSearchPlus
                              style={{ marginLeft: 6 }}
                              fontSize={12}
                            />
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
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="table-responsive table-scroll tabela-responsiva">
                    <div className=" table-wrap">
                      <Table
                        responsive
                        className="table-global table  main-table"
                      >
                        <thead>
                          <tr className="tituloTab">
                            {cabecalho?.map((cabecalho) => (
                              <th
                                style={{ width: 100, textAlign: 'left' }}
                                className="th1 cod-grupo"
                              >
                                {cabecalho.nome.toUpperCase()}
                              </th>
                            ))}

                            <th
                              style={{ textAlign: 'center' }}
                              className="th4 fixed-table"
                            >
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tabelaData.length > 0 ? (
                            <>
                              {tabelaData.map((item) => (
                                <tr key={item.id}>
                                  {Object.keys(item).map((key) => {
                                    const valor = item[key];
                                    const campoNome = key;
                                    const campoOpcao = opcao.find(
                                      (opcao) =>
                                        opcao.valor === valor &&
                                        opcao.nomeCampo === campoNome
                                    )?.opcao;
                                    return exibirValor(
                                      campoNome,
                                      campoOpcao ||
                                        (valor === true
                                          ? 'Sim'
                                          : valor === false
                                          ? 'Não'
                                          : valor),
                                      cabecalho
                                    );
                                  })}
                                  <td
                                    style={{ textAlign: 'center' }}
                                    className="fixed-table td-fixo"
                                  >
                                    {tela?.update ? (
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
                                              const primeiroParametro =
                                                cabecalho[0]?.nome;
                                              const segundoParametro =
                                                Object.values(item)[0];
                                              setcolunaEdit(primeiroParametro);
                                              setvalorcolunaEdit(
                                                String(segundoParametro)
                                              );
                                              handleEditClick(item);
                                            }}
                                          >
                                            <HiOutlinePencilSquare />
                                          </button>
                                        </OverlayTrigger>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {tela?.delete ? (
                                      <>
                                        <OverlayTrigger
                                          placement={'top'}
                                          delay={{ show: 100, hide: 250 }}
                                          overlay={<Tooltip>Excluir</Tooltip>}
                                        >
                                          <button
                                            onClick={() => {
                                              const primeiroParametro =
                                                cabecalho[0]?.nome;
                                              const segundoParametro =
                                                Object.values(item)[0];
                                              DeleteValor(
                                                primeiroParametro,
                                                segundoParametro
                                              );
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
                              className="alert alert-warning alerta-Vendedor"
                              role="alert"
                            >
                              Nenhum {tela?.tabela} encontrado(a).
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
            <h1>
              {edit ? <>Editar {tela?.descricao}</> : <>{tela?.descricao}</>}
            </h1>
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
                  <div className="divCadastrosDefatult">
                    {cabecalho?.map((campos) => (
                      <>
                        {campos?.tipoInput == '1' ? (
                          <>
                            <div className="blocinputDefalt">
                              <p className="title-input">{campos?.nome}: </p>
                              <input
                                style={
                                  campos.chavePrimaria ? { width: 90 } : {}
                                }
                                className="form-control inputparceiro inputDefalt"
                                id="email"
                                type={
                                  campos.tipo === 'varchar(50)'
                                    ? 'text'
                                    : campos.tipo === 'decimal'
                                    ? 'text'
                                    : campos.tipo === 'integer'
                                    ? 'number'
                                    : campos.tipo === 'date'
                                    ? 'date'
                                    : 'text'
                                }
                                disabled={campos?.automatico}
                                value={
                                  campos.tipo === 'decimal'
                                    ? dinheiro(inputs[campos.nome])
                                    : campos.tipo === 'date'
                                    ? (inputs[campos.nome] as string)?.split(
                                        'T'
                                      )[0]
                                    : inputs[campos.nome]
                                }
                                onChange={(e) => {
                                  if (campos.tipo === 'decimal') {
                                    let valor = e.target.value;
                                    const regex = /^[0-9.,]+$/;

                                    if (valor && regex.test(valor)) {
                                      if (valor.includes(',')) {
                                        valor = valor?.replace(',', '.');
                                        valor = valor?.replace(/(?!^)\./g, '');
                                      }
                                      setInputs((prevState) => ({
                                        ...prevState,
                                        [campos.nome]: valor,
                                      }));
                                    }
                                  } else {
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      [campos.nome]: e.target.value,
                                    }));
                                  }
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {campos?.tipoInput == '4' ? (
                          <>
                            <div className="blocinputDefalt">
                              <p className="title-input">{campos?.nome}: </p>
                              <select
                                className="form-select  inputparceiro inputDefalt campo-select"
                                aria-label=""
                                value={String(inputs[campos.nome] || '')}
                                onChange={(e) =>
                                  handleSelectChange(e, campos.nome)
                                }
                              >
                                <option value=""></option>
                                {campos?.opcaoCampo?.length ?? 0 > 0 ? (
                                  <>
                                    {campos.opcaoCampo?.map((opcoes) => (
                                      <option value={opcoes?.valor}>
                                        {opcoes?.opcao}
                                      </option>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    <option value=""></option>
                                    {ligacaoTab.map((ligacao) => (
                                      <option value={ligacao?.value}>
                                        {ligacao?.label}
                                      </option>
                                    ))}
                                  </>
                                )}
                              </select>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {campos?.tipoInput == '2' ? (
                          <>
                            <div
                              style={{ paddingTop: 25 }}
                              className="d-flex blocinputDefalt"
                            >
                              <input
                                type="checkbox"
                                name="grupo"
                                id="grupo"
                                checked={check}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setcheck(true);
                                  } else {
                                    setcheck(false);
                                  }
                                  handleInputChange(e, campos.nome);
                                }}
                              />
                              <p className="text">{campos?.nome}</p>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {campos?.tipoInput == '3' ? (
                          <>
                            <div className="blocinputDefalt">
                              <p className="title-input">{campos?.nome}:</p>
                              <textarea
                                name="texto"
                                value={(inputs[campos.nome] as string) || ''}
                                className="form-control inputparceirotext"
                                style={{ minHeight: 100, textAlign: 'justify' }}
                                onChange={(e) =>
                                  handleTextareaChange(e, campos.nome)
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="divCadastrosDefatult"></div>
                  <div className="coluna-dupla">
                    <div className="bloco-input bloco-buttom-vendedor">
                      <button
                        disabled={loadingCreate}
                        id=""
                        className="btn btn-cadastrar-vendedor"
                        onClick={edit ? handleEdit : handleSubmit}
                      >
                        {edit ? 'Salvar Edição' : 'Salvar'}
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
                          setEmail(e.target.value.toLowerCase());
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
