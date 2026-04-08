import React, { useEffect, useState } from 'react';
import './RecuperarSenha.scss';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import LogoOle from '../../assets/ole-logo.png';
import LogoAvatar from '../../assets/avatar1.png';
import Messeger from '../../assets/messege.png';
import ChampGif from '../../assets/playy.gif';
import Footer from '../../components/Footer/Footer';
import { RedirectFunction } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-dark.png';
import api from '../../services/api';
import Alert from '../../components/Alert';
import { iDadosUsuario } from '../../@types';
import { BsBackspaceFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import LogoMob from '../../assets/logo-light.png';

export default function RecuperarSenha() {
  const history = useNavigate();
  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [loading, setLoading] = useState(false);
  let [PasswordResetToken, setPasswordResetToken] = useState('');

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  useEffect(() => {
    logado();
    window.scrollTo(0, 0);
  }, []);

  function logado() {}

  function LimparErro() {
    setAlertErro(false);
  }

  function handleCloseMensage() {
    setShowMensage(false);
    history('/');
  }

  //=========== fução login ==================================//
  async function EnviarEmail(event: any) {
    event.preventDefault();
    setLoading(true);
    if (email.trim() == '') {
      let usuario: any;
      usuario = document.getElementById('email');

      document.getElementById('email')?.focus();
      setAlertErro(true);
      setMsgErro('E-mail não informado.');
      return;
    }
    const baseUrl = window.location.origin;
    await api
      .post(`/api/Auth/forgot-password?email=${email}&baseUrl=${baseUrl}`)
      .then((response) => {
        setPasswordResetToken(response.data);
        PasswordResetToken = response.data;
        localStorage.setItem(
          '@Portal/token-reset',
          JSON.stringify(response.data)
        );
        setLoading(false);
        setShowMensage(true);
        setAlertErroMensage(true);
        setMsgErro(
          'Enviamos um email para redefinição de senha, verifique sua caixa de e-mail.'
        );
        setEmail('');
      })
      .catch((error) => {
        setLoading(false);

        if (error.response?.status === 400) {
          document.getElementById('email')?.focus();
          setAlertErro(true);
          const data = error.response.data;
          setMsgErro(data);
          return;
        }
      });
  }

  //========envio de email==================================================//
  async function Redefinir() {
    const baseUrl =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://pga.cigel.com.br';

    const resetPasswordLink = `${baseUrl}/pga/redefinir-senha`;
    setLoading(true);
    await api
      .post('/api/Email', {
        emails: [email],
        subject: 'Redefinição de senha',
        body: `<div ><h2>Falta pouco para redefinir sua senha!!!<a href="${resetPasswordLink}"> Clique aqui para redefinir...</a></h2></br></br>
          <h2 > Utilize este token para recuperar sua senha: <h2></br><span style="color: blue">${PasswordResetToken}</span></br></br></br></br>
          <h2></h2></br></br>
          <img style="marginTop:20" src=\"https://grupoalynecosmeticos.com.br/wp-content/uploads/2021/03/grupoalyne.png" height=\"40\" width=\"100\"></div>`,
        isHtml: true,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem(
          '@Portal/token-reset-now',
          JSON.stringify(response.data)
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setAlertErro(true);
        const data = error.response.data;
        setMsgErro(data);
        return;
      });
  }
  //==========================================================
  return (
    <>
      <Navbar />

      <div className="content-home">
        <div className="contentrec">
          <div className="logo-recuperar"></div>
          <form className="bloco-login" onSubmit={EnviarEmail}>
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
            <div id="bloco-recupera" className="bloco-title ">
              <span
                id="esqueceusenha"
                style={{
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginLeft: 0,
                  marginRight: 12,
                  color: 'red',
                }}
              >
                ESQUECEU SUA SENHA?
              </span>

              <h1
                id="bloco-recupera2"
                style={{
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginLeft: 33,
                }}
              >
                RECUPERAR SENHA
              </h1>
              <h1
                id="bloco-segundo-texto"
                style={{
                  textAlign: 'left',
                  marginLeft: 33,
                  maxWidth: 280,
                  lineHeight: 2,
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                informe seu e-mail cadastrado para recuperar sua senha:
              </h1>
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
              <p className="labelform userHome">E-mail</p>
              <input
                className="form-coontrol inputlogin2"
                id="email"
                type="text"
                name="user"
                value={email}
                onKeyDown={LimparErro}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());
                }}
              />
            </div>
            <button
              style={{ marginTop: 0, marginBottom: 10 }}
              className="btn btn-entrar"
              onClick={EnviarEmail}
              disabled={loading}
            >
              {loading ? 'Enviando... ' : 'Enviar'}
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </button>
            <p className="center register-link">
              <Link to="/">
                Voltar ao login <BsBackspaceFill />{' '}
              </Link>
            </p>
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
