import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MeuPerfil.scss';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../../assets/ole-logo.png';
import LogoAvatar from '../../assets/avatar1.png';
import Messeger from '../../assets/messege.png';
import ChampGif from '../../assets/playy.gif';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import { iUsuarios, iDadosUsuario, IFile, iGrupoUsuario } from '../../@types';
import PhotoUser from '../../assets/avatar1.png';
import { phoneMask } from '../../Masks/Masks';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Perfil from '../../components/UploadArquivos/Perfil';
import { VoidExpression } from 'typescript';
import FooterMobile from '../../components/Footer/FooterMobile';

export default function MeuPerfil() {
  const userLog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const history = useNavigate();
  let [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(false);
  let [grupoUsuarioSelec, setGrupoUsuarioSelec] = useState<iGrupoUsuario[]>([]);
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [senhaConfirm, setSenhaConfirm] = useState('');
  const [urlPerfil, setUrlPerfil] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ativo, setAtivo] = useState('1');
  const [funcao, setFuncao] = useState('');
  const [grupo, setGrupo] = useState('');
  const [admin, setAdmin] = useState(false);
  const [comercial, setComercial] = useState(false);
  const [representante, setRepresentante] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(false);
  const [redefinir, setRedefinir] = useState(false);
  const [senhaAtual, setsenhaAtual] = useState('');
  const [novaSenha, setnovaSenha] = useState('');
  const [error2, setError2] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  let [usuarios, setUsuarios] = useState<iUsuarios[]>([]);
  const [usuariosget, setUsuariosget] = useState<iUsuarios[]>([]);
  let [usuariosCount, setUsuariosCount] = useState<iUsuarios[]>([]);
  let [usuariosFilter, setUsuariosFilter] = useState<iUsuarios[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseMensage = () => setShowMensage(false);
  const handleClosePhoto = () => setShowPhoto(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [search, setSearch] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [filter, setFilter] = useState(false);
  let [idUsuario, setIdUsuario] = useState(0);
  const [image, setImagem] = useState('');
  const [file, setFile] = useState<any>();
  const handleUploadFile = (e: any) => setFile(e.target.files[0]);
  const formRef = useRef();
  const [imgURL, setImgURL] = useState('');
  const [progress, setProgress] = useState(0);
  const [userInfo, setuserInfo] = useState('');
  const [userImageEdit, setUserImageEdit] = useState(false);
  const [imgUser, setImgUser] = useState<any>({});
  let [imgPerfil, setImgPerfil] = useState<IFile>();
  const [newImgPerfil, setNewImgPerfil] = useState(false);
  const [naotemImage, setnaotemImage] = useState(false);

  useEffect(() => {
    logado();
    window.scrollTo(0, 0);
    GetUsuarioId();
    GetGrupoUsuario();
  }, []);

  function logado() {
    if (!usuariolog.token) {
      history('/');
    }
  }

  const handleEmailBlur = () => {
    const regex = new RegExp(
      /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/
    );

    const isValidEmail = regex.test(email);

    if (!isValidEmail) {
      let senhaconf: any;
      senhaconf = document.getElementById('email');
      document.getElementById('email')?.focus();
      setAlertErroRegister(true);
      setMsgErro('Email inválido!');
    }
  };

  async function GetGrupoUsuario() {
    await api
      .get(`/api/GrupoUsuario?pagina=1&totalpagina=60`)
      .then((response) => {
        setGrupoUsuarioSelec(response.data.data.filter((e: any) => e.id != 1));
        grupoUsuarioSelec = response.data.data.filter((e: any) => e.id != 1);
        console.log('grupo filtrado', grupoUsuarioSelec);
      })
      .catch((error) => {});
  }

  function handleShowMensage() {
    setShowMensage(true);
    setTimeout(function () {}, 1200);
  }

  const handleImgChange = useCallback((file: File) => {
    setUserImageEdit(false);

    let preview = URL.createObjectURL(file);
    console.log('file', file);
    setImgUser({
      preview,
      raw: file,
    });
    const newUploadedFiles: IFile = {
      file: file,
      preview,
      progress: 0,
      uploaded: false,
      error: false,
      url: '',
    };
    imgPerfil = newUploadedFiles;

    setImgPerfil(newUploadedFiles);

    if (!userImageEdit) {
      setNewImgPerfil(true);
      setImageURL(imgPerfil.preview);
      setUrlPerfil(imgPerfil.preview);
    }

    const formData = new FormData();
    formData.append('FormFile', file);
    console.log('imagem', file);
    SalvarFoto(formData);
    handleClosePhoto();
  }, []);
  async function SalvarFoto(formData: any) {
    setnaotemImage(false);
    await api
      .post(`/api/Usuario/UploadImage/?name=${userLog.username}`, formData, {
        headers: {
          'Content-type': `multipart/form-data`,
        },
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //============ get usuario por userName ============================//

  useEffect(() => {
    async function loadImage() {
      try {
        const uniqueQueryParam = new Date().getTime();
        const response = await api.get(
          `/api/usuario/imagem/${userLog.username}?${uniqueQueryParam}`,
          { responseType: 'blob' }
        );
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = () => setImageURL(reader.result as string);
        console.log('imagem', response.data.size);
        if (response.data.size == 0) {
          setnaotemImage(true);
        } else {
          setnaotemImage(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadImage();
  }, [userLog.username]);

  //=========== get usuario por ID ==================================//
  async function GetUsuarioId() {
    setLoading(true);
    const id = userLog.id;
    console.log(id);
    setPrimeiroNome('');
    setUltimoNome('');
    setNomeUsuario('');
    setUsuario('');
    setEmail('');
    setSenha('');
    setSenhaConfirm('');
    setUrlPerfil('');
    setTelefone('');
    setAtivo('Ativo');
    setFuncao('');
    setGrupo('');
    setIdUser(0);
    setAdmin(false);
    setComercial(false);
    setRepresentante(false);
    setTipoUsuario(false);
    setEdit(true);
    setShowEdit(true);

    await api
      .get(`/api/Usuario/${id}`)
      .then((response) => {
        setUsuariosget(response.data);
        setIdUser(response.data.id);
        setPrimeiroNome(response.data.nomeCompleto);
        setEmail(response.data.email);
        setNomeUsuario(response.data.username);
        setUsuario(response.data.username);
        setUrlPerfil(response.data.imagemURL);
        setTelefone(response.data.telefone);
        setAtivo(response.data.status);
        setFuncao(response.data.funcao);
        setGrupo(String(response.data.grupoId));
        setAdmin(response.data.admin);
        setComercial(response.data.comercial);
        setRepresentante(response.data.representante);
        setTipoUsuario(response.data.usuario);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('Ocorreu um erro');
      });
  }
  //============ Editar Usuario ===============================//
  async function editUser() {
    setLoading(true);
    setLoadingUpdate(true);
    await api
      .put(`/api/Usuario/${idUser}`, {
        id: idUser,
        username: usuario,
        password: senha,
        nomeCompleto: primeiroNome,
        email: email,
        telefone: telefone,
        grupoId: Number(grupo),
        status: ativo,
        funcao: funcao,
        admin: admin,
        usuario: tipoUsuario,
        comercial: comercial,
        representante: representante,
        imagemURL: urlPerfil,
      })
      .then((response) => {
        handleCloseEdit();
        GetUsuarioId();
        setLoading(false);
        setLoadingUpdate(false);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Dados do usuário atualizados com sucesso.');
      })
      .catch((error) => {
        setLoading(false);
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

  function SelecionarImg() {
    document.getElementById('dropimg')?.click();
  }

  //======== salvado imagem ==================================================//

  const handleInputChange = (event: any) => {
    setuserInfo(event.target.files[0]);
  };
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData();
    console.log('foto', file);

    await api
      .post(`/api/Usuario/${usuario}/imagem`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Ocorreu um erro', error);
      });
  }
  //====================================aqui salvar ===============================================

  const UploadImage = async (event: any) => {
    event.preventDefault();
    console.log('imagem teste');
    console.log('imagem', image);
    const formData = new FormData();

    console.log('imagem', formData);
    await api
      .post(`/api/Usuario/UploadImage/?name=${usuario}`, {
        formData,
      })

      .then((response) => {
        console.log(response.data);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setAlertErro(true);
        const data = error.response.data;
        setMsgErro(data);
        return;
      });
  };

  const handlerImagem = (e: any) => {
    setImagem(e.target.files[0]);
  };

  const Enviar = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', image);
    try {
      api.post(`/api/Usuario/UploadImage/?name=${usuario}`, data, {
        headers: {
          'Content-type': `multipart/form-data`,
        },
      });
    } catch (error) {}
  };

  //============redefinr senha=================================//
  async function RedefinirSenha(event: any) {
    event.preventDefault();

    if (senhaAtual.trim() == '') {
      handleShowMensage();
      setAlertErroMensage(true);
      setMsgErro('É obrigatório fornecer a senha atual!');
      return;
    }
    if (novaSenha.trim() == '') {
      handleShowMensage();
      setAlertErroMensage(true);
      setMsgErro('É obrigatório fornecer a nova senha!');
      return;
    }

    await api
      .post(
        `/api/Auth/alterar-senha?id=${usuariolog.id}&currentPassword=${senhaAtual}&newPassword=${novaSenha}`
      )
      .then((response) => {
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro('Senha redefinida com sucesso!');
        setRedefinir(false);
        localStorage.setItem('@Portal/exit', novaSenha);
        setnovaSenha('');
        setsenhaAtual('');
      })
      .catch((error) => {
        console.log('Ocorreu um erro', error.response.data);
        handleShowMensage();
        setAlertErroMensage(true);
        setMsgErro(error.response.data);
      });
  }

  //==========================================================//
  return (
    <>
      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="">
            <SideNavBar />
          </div>
          <NavbarDashHeader />
          <div className="titulo-page">
            <h1>Meu Perfil</h1>
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
              className="containPerfil d-flex"
            >
              <div className="logo-perfil"></div>
              <div
                className={
                  redefinir ? 'conteudo-perfil-redefinir' : 'conteudo-perfil'
                }
              >
                <div className="titulo-page3">
                  <h1>Meus dados</h1>
                </div>
                <div className="conteudo-per">
                  <form onSubmit={Enviar} className="conteudo-usercad">
                    {naotemImage ? (
                      <img
                        src={PhotoUser}
                        alt=""
                        className="imagem-user-name"
                        onClick={() => setShowPhoto(true)}
                      />
                    ) : (
                      <img
                        src={imageURL}
                        alt=""
                        className="imagem-user-name"
                        onClick={() => setShowPhoto(true)}
                      />
                    )}
                    <p className="img-user">Clique na imagem para altera-la</p>
                    <div className="divRede2"> </div>
                  </form>
                  <div className="form-cadastro-perfil">
                    <div className="coluna-dupla">
                      <div className="bloco-input">
                        <p className="title-input">Nome Completo: </p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          id=""
                          type="text"
                          value={primeiroNome}
                          onChange={(e) => {
                            setPrimeiroNome(e.target.value);
                          }}
                        />
                      </div>
                      <div className="bloco-input">
                        <p className="title-input">Usuário: </p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          id=""
                          type="text"
                          value={nomeUsuario}
                          onChange={(e) => {
                            setNomeUsuario(e.target.value);
                          }}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="coluna-dupla">
                      <div className="bloco-input">
                        <p className="title-input">Função: </p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          id=""
                          type="text"
                          value={funcao}
                          onChange={(e) => {
                            setFuncao(e.target.value);
                          }}
                          disabled
                        />
                      </div>
                      <div className="bloco-input">
                        <p className="title-input">Telefone: </p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          id=""
                          type="text"
                          maxLength={15}
                          value={telefone ? phoneMask(telefone) : telefone}
                          onChange={(e) => {
                            setTelefone(e.target.value.toLowerCase());
                          }}
                        />
                      </div>
                    </div>
                    <div className="coluna-dupla">
                      <div className="bloco-input">
                        <p className=" title-input">
                          Grupo de Acesso:{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </p>
                        {grupo == '1' ? (
                          <>
                            <select
                              className="form-select select inputparceiro  campo-select"
                              aria-label=""
                              value={grupo}
                              disabled
                              onChange={(e) => {
                                setGrupo(e.target.value);
                              }}
                            >
                              <option value="">---</option>
                              <option value="1">Administrativo</option>
                            </select>
                          </>
                        ) : (
                          <>
                            <select
                              className="form-select select inputparceiro  campo-select"
                              aria-label=""
                              value={grupo}
                              disabled
                              onChange={(e) => {
                                setGrupo(e.target.value);
                              }}
                            >
                              <option value="">---</option>
                              {grupoUsuarioSelec?.map((grupo) => (
                                <>
                                  <option value={grupo.id}>{grupo.nome}</option>
                                </>
                              ))}
                            </select>
                          </>
                        )}
                      </div>
                      <div className="bloco-input">
                        <p className="title-input">
                          Email:<span style={{ color: 'red' }}>*</span>{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro inputlogin"
                          id="email"
                          type="text"
                          value={email}
                          onBlur={handleEmailBlur}
                          onChange={(e) => {
                            setEmail(e.target.value.toLowerCase());
                          }}
                        />
                      </div>
                    </div>
                    <div className="coluna-dupla">
                      <div className="bloco-input">
                        <button
                          disabled={loadingUpdate}
                          style={{ marginTop: 20 }}
                          id="btn-desck"
                          className="btn btn-cadastrar "
                          onClick={editUser}
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                    <button
                      disabled={loadingUpdate}
                      type="button"
                      id="btn-mob"
                      className="btn btn-cadastrar"
                      onClick={editUser}
                    >
                      Salvar
                    </button>
                    <div className={redefinir ? 'naoRecuperar' : 'divRede'}>
                      <button
                        className=" btn btn-outline-dark"
                        onClick={() => setRedefinir(true)}
                      >
                        Redefinir Senha
                      </button>
                    </div>
                    <form
                      onSubmit={RedefinirSenha}
                      className={redefinir ? 'divRecuperar' : 'naoRecuperar'}
                    >
                      <div className="bloco-input">
                        <p className="title-input">
                          Senha Atual:<span style={{ color: 'red' }}>*</span>{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          id="SenhaAtual"
                          type="password"
                          maxLength={15}
                          value={senhaAtual}
                          onChange={(e) => {
                            setsenhaAtual(e.target.value);
                          }}
                        />
                      </div>
                      <div className="bloco-input">
                        <p className="title-input">
                          Nova Senha:<span style={{ color: 'red' }}>*</span>{' '}
                        </p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          id="SenhaNova"
                          type="password"
                          onSubmit={RedefinirSenha}
                          maxLength={15}
                          onChange={(e) => {
                            setnovaSenha(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          onSubmit={RedefinirSenha}
                          style={{ marginTop: 10 }}
                          className=" btn btn-outline-dark"
                        >
                          Redefinir
                        </button>
                        <button
                          style={{ marginTop: 10, marginLeft: 20 }}
                          type="button"
                          className=" btn btn-outline-danger"
                          onClick={() => setRedefinir(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
        <Modal className="modal-img" show={showPhoto} onHide={handleClosePhoto}>
          <Modal.Header closeButton>
            <h1 style={{ fontSize: 25 }}>Atualizar foto Perfil</h1>
          </Modal.Header>
          <Modal.Body>
            <Perfil ref={fileRef} onChange={handleImgChange} />
          </Modal.Body>
        </Modal>
      </div>
      <FooterMobile />
      <Footer />
    </>
  );
}
