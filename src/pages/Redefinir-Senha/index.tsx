import React, { useEffect, useState } from 'react';
import '../Recuperar-Senha/RecuperarSenha.scss';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../assets/ole-logo.png';
import LogoAvatar from '../../assets/avatar1.png';
import Messeger from '../../assets/messege.png';
import ChampGif from '../../assets/playy.gif';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import { iDadosUsuario } from '../../@types';
import { BsBackspaceFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import LogoMob from '../../assets/logo-light.png';

export default function RedefinirSenha() {
  const history = useNavigate();
  let [confirmaSenha, setConfirmaSenha] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [tokenRecebido, settokenRecebido] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  let [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const token: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/token-reset') || '{}'
  );
  const tokenReset = JSON.parse(
    localStorage.getItem('@Portal/token-reset-now') || '{}'
  );
  useEffect(() => {
    logado();
    window.scrollTo(0, 0);
    if (tokenReset != 'portalgrupoalyne') {
    }
  }, []);

  function logado() {}

  function LimparErro() {
    setAlertErro(false);
  }

  function handleCloseMensage() {
    setShowMensage(false);
    Login();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    GetPaginas();
    GetMontarMenu();
  }, []);

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

  //=========== fução login ==================================//
  async function Redefinir(event: any) {
    event.preventDefault();
    if (senha != confirmaSenha) {
      setAlertErro(true);
      setMsgErro('As senhas não conferem.');
      return;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    await api
      .post('/api/Auth/reset-password', {
        token: token,
        password: senha,
        confirmPassword: confirmaSenha,
      })
      .then((response) => {
        setUsername(response.data.data);
        username = response.data.data.username;
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro(response.data.resposta);
      })
      .catch((error) => {
        setAlertErro(true);
        const data = error.response.data;
        setMsgErro(data);
        return;
      });
  }

  //============Logar Direto==========================================//
  async function Login() {
    localStorage.getItem('@Portal/token-reset-now');
    localStorage.removeItem('@Portal/token-reset');
    await api
      .post('/api/Auth/login', {
        username: username,
        password: senha,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == '1') {
          localStorage.setItem(
            '@Portal/usuario',
            JSON.stringify(response.data)
          );
        }
        GetUsuarioId(response.data.id);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response?.status === 400) {
          document.getElementById('user')?.focus();
          setAlertErro(true);
          const data = error.response.data;
          setMsgErro(data);

          return;
        }
      });
  }

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
        GetgrupoUsuarioId(response.data.grupoId);
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  async function GetgrupoUsuarioId(grupoId: any) {
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
        history('/espaco-colaborador');
      })
      .catch((error) => {
        console.log('Ocorreu um erro');
      });
  }

  //==========================================================
  return (
    <>
      <Navbar />
      <div className="content-home">
        <div className="contentrec">
          <div className="logo-redefinir"></div>
          <form className="bloco-login" onSubmit={Redefinir}>
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
                id="esqueceusenha"
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',

                  fontSize: 18,
                  color: 'red',
                }}
              >
                REDEFINIR SENHA
              </span>
            </div>
            {alertErro && (
              <div className="mt-3 mb-0">
                <Alert msg={msgErro} setAlertErro={setAlertErro} />
              </div>
            )}
            <div
              style={{ marginBottom: 20, marginTop: 10 }}
              className="bloco-input"
            >
              <p className="labelform userHome">Nova senha</p>
              <input
                className="form-coontrol inputlogin2"
                id="senha"
                type="password"
                name="password"
                value={senha}
                onKeyDown={LimparErro}
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
              />
            </div>
            <div
              style={{ marginBottom: 20, marginTop: 10 }}
              className="bloco-input"
            >
              <p className="labelform userHome">Repetir senha</p>
              <input
                className="form-coontrol inputlogin2"
                id="confirmaSenha"
                type="password"
                name="password"
                value={confirmaSenha}
                onKeyDown={LimparErro}
                onChange={(e) => {
                  setConfirmaSenha(e.target.value);
                }}
              />
            </div>
            <button
              style={{ marginTop: 0, marginBottom: 10 }}
              className="btn btn-entrar"
              onClick={Redefinir}
            >
              Redefinir
            </button>
          </form>
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
      </div>
      <Footer />
    </>
  );
}
