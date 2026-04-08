import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { iDadosUsuario, iGrupoUsuario } from '../../@types';
import PhotoUser from '../../assets/avatar1.png';
import PhotoGroup from '../../assets/IMGGROUP.png';
import { MdSend } from 'react-icons/md';
import { BiMessageAltDetail } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai';
import {
  BsArrowLeftCircle,
  BsArrowLeftCircleFill,
  BsCheckAll,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import moment from 'moment-timezone';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader/index';
import logoSankhya from '../../assets/logo-dark.png';
import logoAlyne from '../../assets/logo-dark.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Picker from 'emoji-picker-react';
import FooterMobile from '../../components/Footer/FooterMobile';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiGlobalLine } from 'react-icons/ri';
import Modal from 'react-bootstrap/Modal';
import { useAppOnlineStatus } from '../../provider/PortalContext';

interface IMessage {
  id: number;
  senderId: number;
  receiverId: number;
  body: string;
  lida: boolean;
  naoLidas: number;
  date: string;
}

interface IChatProps {
  userId: string;
}
interface Usuarioconectado {
  id: number;
  username: string;
  nomeCompleto: string;
  imagemBase64: string;
  imagemURL: string;
  conectado: boolean;
}

export default function Chat() {
  const history = useNavigate();
  let [messages, setMessages] = useState<IMessage[]>([]);
  let [mensagens, setMensagens] = useState<IMessage[]>([]);
  let [messagesGerais, setMessagesGerais] = useState<IMessage[]>([]);
  let [messagesGeraisPesq, setMessagesGeraisPesq] = useState<IMessage[]>([]);
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [connection, setConnection] = useState<signalR.HubConnection>();
  let [listaUsuarios, setlistaUsuarios] = useState<Usuarioconectado[]>([]);
  let [listaGrupos, setlistaGrupos] = useState<iGrupoUsuario[]>([]);
  let [destinatarioId, setdestinatarioId] = useState('');
  let [remetenteId, setremetenteId] = useState('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  let [destinoEcolhido, setdestinoEcolhido] = useState<boolean>(false);
  const [showMensage, setShowMensage] = useState(false);
  let [sucess, setSucess] = useState(0);
  const handleCloseMensage = () => setShowMensage(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [finalizarPesquisa, setfinalizarPesquisa] = useState(true);
  const [comecaMens, setcomecaMens] = useState(false);
  const [pesquisa, setpesquisa] = useState(false);
  let [mensagensGroup, setmensagensGroup] = useState(false);
  let [destinoEcolhidoConectado, setdestinoEcolhidoConectado] =
    useState<boolean>(false);
  let [fotoUsuarioConec, setfotoUsuarioConec] = useState('');
  let [fotoUsuarioEsc, setfotoUsuarioEsc] = useState('');
  let [nomeUsuarioEsc, setnomeUsuarioEsc] = useState('');
  const [connectionState, setConnectionState] = useState(false);
  const [iniciarConversa, setiniciarConversa] = useState(false);
  let [senderId, setsenderId] = useState('');
  let [mensagensNaolida, setmensagensNaolida] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  let [openPEsq, setopenPEsq] = useState(false);
  let [openPEsqGrupo, setopenPEsqGrupo] = useState(false);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const userId = usuario.id;
  const usuarioId = usuario.id;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [buscarMesnag, setbuscarMesnag] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [rolagem, setrolagem] = useState(false);
  const togglePicker = () => {
    setShowPicker((prevState) => !prevState);
  };

  const handleEmojiClick = (emojiObject: any) => {
    setCurrentMessage(currentMessage + emojiObject.emoji);
    setSelectedEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    if (chatBoxRef.current && rolagem) {
      const { scrollHeight, clientHeight } = chatBoxRef.current;
      chatBoxRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }

  const [showupdatePromotor, setShowupdatePromotor] = useState(false);
  function handleCloseupdatePromotor() {
    history('/espaco-colaborador');
  }
  const { appOnline } = useAppOnlineStatus();
  const isOnline = appOnline;

  useEffect(() => {}, []);

  useEffect(() => {
    if (isOnline) {
      setShowupdatePromotor(false);
    } else {
      setShowupdatePromotor(true);
    }
  }, [isOnline]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setSucess(10);
    UsuariosConectados();
    ChatAtivo();
  }, []);

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!isOnline) return;
    const intervalId = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      ChatAtivo();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [isOnline]);

  useEffect(() => {
    if (!isOnline) return;
    const intervalId = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      if (!mensagensGroup) {
        MemsagensChat(remetenteId, destinatarioId);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isOnline, remetenteId, destinatarioId]);

  useEffect(() => {
    if (!isOnline) return;
    if (!senderId) return;
    if (document.visibilityState !== 'visible') return;
    try {
      MarcarLidas(senderId);
    } catch {}
  }, [isOnline, senderId]);

  useEffect(() => {
    FotoIDUser();

    if (!mensagensGroup) {
      MemsagensChat(remetenteId, destinatarioId);
    }
  }, [currentMessage]);

  async function ChatAtivo() {
    try {
      const response = await api.get(`/api/Chat/mensagens/${userId}`);
      console.log('todas as mensagens', response.data);

      const messages = response.data
        .filter(
          (msg: any) => msg.senderId === userId || msg.receiverId === userId
        )
        .reduce((acc: any, curr: any) => {
          const index = acc.findIndex(
            (msg: any) =>
              (msg.receiverId === curr.receiverId &&
                msg.senderId === curr.senderId) ||
              (msg.senderId === curr.receiverId &&
                msg.receiverId === curr.senderId)
          );
          if (index === -1) {
            return [...acc, curr];
          } else {
            acc[index] = curr;
            return acc;
          }
        }, [])
        .sort((a: any, b: any) => b.id - a.id);

      setMessagesGerais(messages);
      messagesGerais = messages;
      console.log('mensagens totais não filter', messagesGerais);
      setLoading(false);
      setSucess(100);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (buscarMesnag == '') {
      setpesquisa(false);
      ChatAtivo();
    }
    try {
      const response = await api.get(
        `/api/Chat/mensagens/busca?busca=${buscarMesnag}&id=${userId}`
      );
      console.log('todas as mensagens', response.data);

      const messages = response.data
        .filter(
          (msg: any) => msg.senderId === userId || msg.receiverId === userId
        )
        .reduce((acc: any, curr: any) => {
          const index = acc.findIndex(
            (msg: any) =>
              (msg.receiverId === curr.receiverId &&
                msg.senderId === curr.senderId) ||
              (msg.senderId === curr.receiverId &&
                msg.receiverId === curr.senderId)
          );
          if (index === -1) {
            return [...acc, curr];
          } else {
            acc[index] = curr;
            return acc;
          }
        }, [])
        .sort((a: any, b: any) => b.id - a.id);
      setpesquisa(true);
      setMessagesGeraisPesq(messages);
      messagesGeraisPesq = messages;
      console.log('mensagens totais filter', messagesGerais);
      setLoading(false);
      setSucess(100);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function MemsagensChat(remetenteId: any, destinatarioId: any) {
    console.log('sender', remetenteId);
    console.log('receiver', destinatarioId);

    try {
      const response = await api.get(
        `/api/Chat/mensagens?senderId=${remetenteId}&receiverId=${destinatarioId}`
      );

      if (response.data !== messages) {
        console.log('Mensagens foram atualizadas');
        setMessages(response.data);
        messages = response.data;
        console.log('mensagens', messages);
        scrollToBottom();
      } else {
        console.log('Não houve alteração nas mensagens');
      }
    } catch (error) {}
  }

  //===============marcar como lidas============================================================================
  async function MarcarLidas(senderId: any) {
    console.log('marcando como lidas');
    console.log('sender', senderId);
    console.log('receiver', usuarioId);
    api
      .get(`/api/Chat/mensagens-recebidas?id=${usuarioId}&senderId=${senderId}`)
      .then((response) => {
        localStorage.setItem('@Portal/chat-mensagems-lidas', 'true');
      })
      .catch((error) => {});
  }
  //===========================================================================================

  function formatDate(date: any) {
    const currentDate = new Date();
    const messageDate = new Date(date);
    const messageDay = messageDate.getDate().toString().padStart(2, '0');
    const messageMonth = (messageDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const messageYear = messageDate.getFullYear().toString();
    const messageHour = messageDate.getHours().toString().padStart(2, '0');
    const messageMinute = messageDate.getMinutes().toString().padStart(2, '0');

    if (
      currentDate.getFullYear() === messageDate.getFullYear() &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getDate() === messageDate.getDate()
    ) {
      return `${messageHour}:${messageMinute}`;
    } else {
      return `${messageDay}-${messageMonth}-${messageYear}`;
    }
  }

  function formatDate2(date: any) {
    const currentDate = new Date();
    const messageDate = new Date(date);
    const messageDay = messageDate.getDate();
    const messageMonth = messageDate.getMonth();
    const messageYear = messageDate.getFullYear();
    const messageHour = messageDate.getHours().toString().padStart(2, '0');
    const messageMinute = messageDate.getMinutes().toString().padStart(2, '0');

    if (
      currentDate.getFullYear() === messageYear &&
      currentDate.getMonth() === messageMonth &&
      currentDate.getDate() === messageDay
    ) {
      return `${messageHour}:${messageMinute}`;
    } else {
      const dayString = messageDay.toString().padStart(2, '0');
      const monthString = (messageMonth + 1).toString().padStart(2, '0');
      const yearString = messageYear.toString();
      return `${dayString}/${monthString}/${yearString} - ${messageHour}:${messageMinute}`;
    }
  }

  const handleSendMessage = async (event: any) => {
    event.preventDefault();
    const dataMessage = moment()
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DDTHH:mm:ss');
    console.log('data e hora atual:', dataMessage);
    console.log('id do usuario', userId);
    console.log('id do destinatario', destinatarioId);
    console.log('mensagem', currentMessage);
    if (mensagensGroup) {
      console.log(
        'entrou no salvar grupo...................................................'
      );
      api
        .post(`/api/Chat/mensagens-grupo?groupId=${destinatarioId}`, {
          senderId: userId,
          body: currentMessage,
          date: dataMessage,
        })
        .then((response) => {
          setmensagensGroup(false);
          mensagensGroup = false;
          setCurrentMessage('');
          Rolagem();
        })
        .catch((error) => {
          setmensagensGroup(false);
          mensagensGroup = false;
          console.log('ocorreu um erro');
        });
    } else {
      console.log(
        'entrou no salvar mensagem para usuario...................................................'
      );
      api
        .post(`/api/Chat`, {
          senderId: userId,
          receiverId: destinatarioId,
          body: currentMessage,
          date: dataMessage,
        })
        .then((response) => {
          setCurrentMessage('');
          Rolagem();
        })
        .catch((error) => {
          console.log('ocorreu um erro');
        });
    }
  };

  useEffect(() => {
    api
      .get(`/api/usuario/${userId}`)
      .then((response) => {
        const mensagensNaoLidas = response.data.mensagensRecebidas.filter(
          (msg: any) => !msg.lida
        );
        console.log('Mensagens não lidas:', mensagensNaoLidas);
        setMessages(mensagensNaoLidas);
      })
      .catch((error) =>
        console.log('Erro ao obter mensagens não lidas:', error)
      );
  }, [userId]);

  async function UsuariosConectados() {
    setSucess(70);
    await api
      .get(`/api/Usuario/conectados`)
      .then((response) => {
        const usuarios = response.data.filter(
          (usuario: any) => usuario.id !== userId
        );
        setlistaUsuarios(usuarios);
        listaUsuarios = usuarios;
      })
      .catch((error) => {});
  }

  async function GetGrupos() {
    setSucess(70);
    await api
      .get(`/api/GrupoUsuario?pagina=1&totalpagina=999`)
      .then((response) => {
        setlistaGrupos(response.data.data);
        listaGrupos = response.data.data;
      })
      .catch((error) => {});
  }

  const [buscarUsers, setbuscarUsers] = useState('');

  async function BuscaUsuarios(event: any) {
    event.preventDefault();
    setSucess(70);
    if (buscarUsers != '') {
      await api
        .get(`/api/Usuario/buscaUsuarios?searchTerm=${buscarUsers}`)
        .then((response) => {
          const usuarios = response.data.filter(
            (usuario: any) => usuario.id !== userId
          );
          setlistaUsuarios(usuarios);
          listaUsuarios = usuarios;
        })
        .catch((error) => {});
    } else {
      await api
        .get(`/api/Usuario/conectados`)
        .then((response) => {
          const usuarios = response.data.filter(
            (usuario: any) => usuario.id !== userId
          );
          setlistaUsuarios(usuarios);
          listaUsuarios = usuarios;
        })
        .catch((error) => {});
    }
  }

  async function UsuariosEscolhido() {
    console.log('destinatario', destinatarioId);
    api
      .get(`/api/Usuario/conectado/${destinatarioId}`)
      .then((response) => {
        setfotoUsuarioEsc(response.data.imagemBase64);
        fotoUsuarioEsc = response.data.imagemBase64;
        setnomeUsuarioEsc(
          response.data.username + ' - ' + response.data.nomeCompleto
        );
        nomeUsuarioEsc =
          response.data.username + ' - ' + response.data.nomeCompleto;
        if (response.data.conectado == true) {
          setdestinoEcolhidoConectado(true);
          destinoEcolhidoConectado = true;
        } else {
          setdestinoEcolhidoConectado(false);
          destinoEcolhidoConectado = false;
        }
        setopenPEsq(false);
        openPEsq = false;
        setdestinoEcolhido(true);
        destinoEcolhido = true;
      })
      .catch((error) => {});
  }

  async function FotoIDUser() {
    api
      .get(`/api/Usuario/conectado/${userId}`)
      .then((response) => {
        setfotoUsuarioConec(response.data.imagemBase64);
        fotoUsuarioConec = response.data.imagemBase64;
      })
      .catch((error) => {});
  }

  function Rolagem() {
    setrolagem(true);
    setTimeout(function () {
      setrolagem(false);
    }, 1000);
  }

  return (
    <>
      {loading ? (
        <div className="loadingGeral">
          <div className="loadingModal">
            <img id="logoSankhya" src={logoSankhya} alt="" />
            <h1 style={{ marginTop: 15 }}>Carregando dados...</h1>
            <h1 style={{ marginTop: 15 }}></h1>
            <ProgressBar className="progress" animated now={sucess} />
          </div>
        </div>
      ) : (
        <>
          <div>
            <NavbarDashHeader />
            <div className="classeChatTotal">
              <div className="conteudoChat">
                <div
                  className={
                    openPEsqGrupo
                      ? 'usuariosChat2 chatGrupo'
                      : 'usuariosChatnot'
                  }
                >
                  <div className="topoChat top1 d-flex">
                    <BsArrowLeftCircleFill
                      fontSize={30}
                      className="linksChat"
                      color="#fff"
                      onClick={() => {
                        setopenPEsqGrupo(false);
                        openPEsqGrupo = false;
                        UsuariosConectados();
                      }}
                    />
                    <h1 style={{ color: '#fff' }}>Grupos</h1>
                  </div>

                  <div className="conteudoUss">
                    {listaGrupos?.map((usuario) => {
                      return (
                        <div
                          className="divisaUserChat"
                          onClick={() => {
                            Rolagem();
                            setdestinatarioId(String(usuario.id));
                            destinatarioId = String(usuario.id);
                            setopenPEsqGrupo(false);
                            openPEsqGrupo = false;
                            setdestinoEcolhido(true);
                            destinoEcolhido = true;
                            setmensagensGroup(true);
                            mensagensGroup = true;
                            setMessages([]);
                            messages = [];
                            setnomeUsuarioEsc(usuario?.nome);
                            nomeUsuarioEsc = usuario?.nome;
                            setiniciarConversa(true);
                            setcomecaMens(true);
                            setremetenteId(String(userId));
                            remetenteId = String(userId);
                          }}
                        >
                          <>
                            <img
                              src={PhotoGroup}
                              alt=""
                              className={'imagemChat'}
                            />
                          </>
                          <h1 className="textoChat">
                            {usuario.id} - {usuario.nome}
                          </h1>
                        </div>
                      );
                    })}
                    <div
                      className="divisaUserChat"
                      style={{ backgroundColor: '#2572e8' }}
                      onClick={() => {
                        Rolagem();
                        setdestinatarioId('');
                        destinatarioId = '';
                        setopenPEsqGrupo(false);
                        openPEsqGrupo = false;
                        setdestinoEcolhido(true);
                        setmensagensGroup(true);
                        mensagensGroup = true;
                        destinoEcolhido = true;
                        setnomeUsuarioEsc('Todos os Grupos');
                        nomeUsuarioEsc = 'Todos os Grupos';
                        setiniciarConversa(true);
                        setcomecaMens(true);
                        setremetenteId(String(userId));
                        remetenteId = String(userId);
                      }}
                    >
                      <>
                        <img src={PhotoGroup} alt="" className={'imagemChat'} />
                      </>
                      <h1 className="textoChat">Mensagem Geral</h1>
                    </div>
                  </div>
                </div>
                {/* ============ CONTATOS ========================================== */}
                <div className={openPEsq ? 'usuariosChat2' : 'usuariosChatnot'}>
                  <div className="topoChat top1 d-flex">
                    <BsArrowLeftCircleFill
                      fontSize={30}
                      className="linksChat"
                      color="#fff"
                      onClick={() => {
                        setopenPEsq(false);
                        openPEsq = false;
                        UsuariosConectados();
                      }}
                    />
                    <h1 style={{ color: '#fff' }}>Contatos</h1>
                  </div>
                  <form onSubmit={BuscaUsuarios} className="divBusca">
                    <AiOutlineSearch fontSize={12} style={{ marginRight: 5 }} />
                    <input
                      className="inputChatpesq"
                      placeholder="Pesquisar contatos 1"
                      type="text"
                      value={buscarUsers}
                      onSubmit={BuscaUsuarios}
                      onChange={(e: any) => setbuscarUsers(e.target.value)}
                    />
                  </form>
                  <div className="conteudoUss">
                    {listaUsuarios?.map((usuario) => {
                      return (
                        <div
                          className="divisaUserChat"
                          onClick={() => {
                            Rolagem();
                            setmensagensGroup(false);
                            mensagensGroup = false;
                            setdestinatarioId(String(usuario.id));
                            destinatarioId = String(usuario.id);
                            UsuariosEscolhido();
                            setiniciarConversa(true);
                            setcomecaMens(true);
                            setremetenteId(String(userId));
                            remetenteId = String(userId);
                            MemsagensChat(remetenteId, destinatarioId);
                          }}
                        >
                          {!usuario.imagemBase64 ? (
                            <>
                              <img
                                src={PhotoUser}
                                alt=""
                                className={
                                  usuario.conectado == true
                                    ? 'imagemChat-on'
                                    : 'imagemChat'
                                }
                              />
                            </>
                          ) : (
                            <>
                              <img
                                className={
                                  usuario.conectado == true
                                    ? 'imagemChat-on'
                                    : 'imagemChat'
                                }
                                src={`data:image/jpeg;base64,${usuario?.imagemBase64}`}
                              />
                            </>
                          )}
                          <h1 className="textoChat">
                            {usuario.username} - {usuario.nomeCompleto}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={
                    comecaMens
                      ? 'usuariosChat mensagemEscolihda'
                      : 'usuariosChat'
                  }
                >
                  <div className="topoChat">
                    {fotoUsuarioConec != '' ? (
                      <>
                        <img
                          className="imagemChat2"
                          src={`data:image/jpeg;base64,${fotoUsuarioConec}`}
                        />
                      </>
                    ) : (
                      <>
                        <img src={PhotoUser} alt="" className="imagemChat2" />
                      </>
                    )}
                    <div
                      className="linksChat"
                      onClick={() => {
                        setopenPEsqGrupo(true);
                        openPEsqGrupo = true;
                        setbuscarUsers('');
                        setbuscarUsers('');
                        GetGrupos();
                      }}
                    >
                      <HiOutlineUserGroup
                        fontSize={30}
                        style={{ marginRight: 5 }}
                        className="linksChat"
                      />
                      Grupos
                    </div>
                    <div
                      className="linksChat"
                      onClick={() => {
                        setopenPEsq(true);
                        openPEsq = true;
                        setbuscarUsers('');
                        setbuscarUsers('');
                        UsuariosConectados();
                      }}
                    >
                      <AiOutlineUserAdd
                        fontSize={30}
                        style={{ marginRight: 5 }}
                        className="linksChat"
                      />
                      Contatos
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="divBusca">
                    <AiOutlineSearch fontSize={12} style={{ marginRight: 5 }} />
                    <input
                      id="buscaMesagens"
                      className="inputChatpesq"
                      placeholder="Pesquisar contatos"
                      type="text"
                      value={buscarMesnag}
                      onSubmit={handleSubmit}
                      onChange={(e: any) => {
                        setbuscarMesnag(e.target.value);
                      }}
                    />
                  </form>
                  {pesquisa ? (
                    <>
                      <div className="conteudoUss">
                        {messagesGeraisPesq.length > 0 ? (
                          <>
                            {messagesGeraisPesq?.map((usuario) => {
                              const user = listaUsuarios.find(
                                (u) =>
                                  u.id === usuario.receiverId ||
                                  u.id === usuario.senderId
                              );
                              const nomeUsuario = user
                                ? user.username + ' - ' + user.nomeCompleto
                                : '';
                              const fotoUsu = user ? user.imagemBase64 : '';
                              const conect = user ? user.conectado : '';

                              return (
                                <div
                                  className="divisaUserChat "
                                  onClick={() => {
                                    console.log('receiver', usuario.senderId);
                                    setmensagensGroup(false);
                                    mensagensGroup = false;
                                    if (usuario.senderId == userId) {
                                      setdestinatarioId(
                                        String(usuario.receiverId)
                                      );
                                      destinatarioId = String(
                                        usuario.receiverId
                                      );
                                      setremetenteId(String(usuario.senderId));
                                      remetenteId = String(usuario.senderId);
                                      console.log('sou remetente');
                                    } else {
                                      setdestinatarioId(
                                        String(usuario.senderId)
                                      );
                                      destinatarioId = String(usuario.senderId);
                                      setremetenteId(
                                        String(usuario.receiverId)
                                      );
                                      remetenteId = String(usuario.receiverId);
                                      console.log(
                                        'destinatario map',
                                        usuario.receiverId
                                      );
                                      console.log('sou destinatario');
                                    }
                                    setbuscarMesnag('');
                                    setpesquisa(false);
                                    Rolagem();
                                    UsuariosEscolhido();
                                    setcomecaMens(true);
                                    setiniciarConversa(true);
                                    MemsagensChat(remetenteId, destinatarioId);
                                    setsenderId(String(usuario.senderId));
                                    senderId = String(usuario.senderId);
                                    MarcarLidas(String(usuario.senderId));
                                    scrollToBottom();
                                  }}
                                >
                                  {!fotoUsu ? (
                                    <>
                                      <img
                                        src={PhotoUser}
                                        alt=""
                                        className={
                                          conect == true
                                            ? 'imagemChat-on'
                                            : 'imagemChat'
                                        }
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        className={
                                          conect == true
                                            ? 'imagemChat-on'
                                            : 'imagemChat'
                                        }
                                        src={`data:image/jpeg;base64,${fotoUsu}`}
                                      />
                                    </>
                                  )}
                                  <div className="mensagens">
                                    <div className="textNome">
                                      <h1
                                        className={
                                          usuario.naoLidas > 0
                                            ? 'dataMensagem naolidas'
                                            : 'dataMensagem'
                                        }
                                      >
                                        {formatDate(usuario.date)}
                                      </h1>
                                      <h1 className="textoChat">
                                        {nomeUsuario}{' '}
                                      </h1>
                                    </div>
                                    <div className="divtextoNaolido">
                                      <h1 className="textoMensagem">
                                        {usuario.body}
                                      </h1>
                                      {usuario.naoLidas > 0 ? (
                                        <>
                                          <div className="naoLidasDiv">
                                            <h1>{usuario.naoLidas}</h1>
                                          </div>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="conteudoUss">
                        {messagesGerais.length > 0 ? (
                          <>
                            {messagesGerais?.map((usuario) => {
                              const user = listaUsuarios.find(
                                (u) =>
                                  u.id === usuario.receiverId ||
                                  u.id === usuario.senderId
                              );
                              const nomeUsuario = user
                                ? user.username + ' - ' + user.nomeCompleto
                                : '';
                              const fotoUsu = user ? user.imagemBase64 : '';
                              const conect = user ? user.conectado : '';
                              return (
                                <div
                                  className="divisaUserChat"
                                  onClick={() => {
                                    console.log('receiver', usuario.senderId);
                                    if (usuario.senderId == userId) {
                                      setdestinatarioId(
                                        String(usuario.receiverId)
                                      );
                                      destinatarioId = String(
                                        usuario.receiverId
                                      );
                                      setremetenteId(String(usuario.senderId));
                                      remetenteId = String(usuario.senderId);
                                      console.log('sou remetente');
                                    } else {
                                      setdestinatarioId(
                                        String(usuario.senderId)
                                      );
                                      destinatarioId = String(usuario.senderId);
                                      setremetenteId(
                                        String(usuario.receiverId)
                                      );
                                      remetenteId = String(usuario.receiverId);
                                      console.log(
                                        'destinatario map',
                                        usuario.receiverId
                                      );
                                      console.log('sou destinatario');
                                    }
                                    setmensagensGroup(false);
                                    mensagensGroup = false;
                                    setbuscarMesnag('');
                                    setfinalizarPesquisa(true);
                                    setcomecaMens(true);
                                    Rolagem();
                                    UsuariosEscolhido();
                                    setiniciarConversa(true);
                                    MemsagensChat(remetenteId, destinatarioId);
                                    setsenderId(String(usuario.senderId));
                                    senderId = String(usuario.senderId);
                                    MarcarLidas(String(usuario.senderId));
                                    scrollToBottom();
                                  }}
                                >
                                  {!fotoUsu ? (
                                    <>
                                      <img
                                        src={PhotoUser}
                                        alt=""
                                        className={
                                          conect == true
                                            ? 'imagemChat-on'
                                            : 'imagemChat'
                                        }
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        className={
                                          conect == true
                                            ? 'imagemChat-on'
                                            : 'imagemChat'
                                        }
                                        src={`data:image/jpeg;base64,${fotoUsu}`}
                                      />
                                    </>
                                  )}
                                  <div className="mensagens">
                                    <div className="textNome">
                                      <h1
                                        className={
                                          usuario.naoLidas > 0
                                            ? 'dataMensagem naolidas'
                                            : 'dataMensagem'
                                        }
                                      >
                                        {formatDate(usuario.date)}
                                      </h1>
                                      <h1 className="textoChat">
                                        {nomeUsuario}{' '}
                                      </h1>
                                    </div>
                                    <div className="divtextoNaolido">
                                      <h1 className="textoMensagem">
                                        {usuario.body}
                                      </h1>
                                      {usuario.naoLidas > 0 ? (
                                        <>
                                          <div className="naoLidasDiv">
                                            <h1>{usuario.naoLidas}</h1>
                                          </div>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="mensagensChat">
                  <div className="topoChat">
                    {destinoEcolhido ? (
                      <>
                        <div className="divisaUserChat2">
                          <BsArrowLeftCircle
                            className="voltar-mobile"
                            style={{ marginRight: 10 }}
                            fontSize={25}
                            onClick={() => {
                              setcomecaMens(false);
                            }}
                          />
                          {fotoUsuarioEsc != '' ? (
                            <>
                              {mensagensGroup ? (
                                <>
                                  <img
                                    src={PhotoGroup}
                                    alt=""
                                    className={
                                      destinoEcolhidoConectado
                                        ? 'imagemChat-on img2'
                                        : 'imagemChat img2'
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    className={
                                      destinoEcolhidoConectado
                                        ? 'imagemChat-on img2'
                                        : 'imagemChat img2'
                                    }
                                    src={`data:image/jpeg;base64,${fotoUsuarioEsc}`}
                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {mensagensGroup ? (
                                <>
                                  <img
                                    src={PhotoGroup}
                                    alt=""
                                    className={
                                      destinoEcolhidoConectado
                                        ? 'imagemChat-on img2'
                                        : 'imagemChat img2'
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src={PhotoUser}
                                    alt=""
                                    className={
                                      destinoEcolhidoConectado
                                        ? 'imagemChat-on img2'
                                        : 'imagemChat img2'
                                    }
                                  />
                                </>
                              )}
                            </>
                          )}
                          <div>
                            <h1 className="textoChat">{nomeUsuarioEsc}</h1>
                            {destinoEcolhidoConectado ? (
                              <>
                                <h1 className="userOn">online</h1>
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
                  </div>
                  <div
                    className="divmensagemInterna"
                    style={{ overflowY: 'auto' }}
                    ref={chatBoxRef}
                  >
                    {messages.map((message) => (
                      <div
                        className={
                          message.senderId == userId
                            ? 'menssagensChatOK'
                            : 'menssagensChatOK2'
                        }
                        key={message.id}
                      >
                        <h1 className="Menss">{message.body}</h1>
                        <h1 className="dateMens">
                          {formatDate2(message.date)}
                          {message.senderId == userId ? (
                            <>
                              <span>
                                <BsCheckAll
                                  fontSize={20}
                                  className={
                                    message.lida ? 'checkLida' : 'checkNaoLida'
                                  }
                                />
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </h1>
                      </div>
                    ))}
                  </div>
                  {iniciarConversa ? (
                    <>
                      <form
                        onSubmit={handleSendMessage}
                        className="pesquisaChat"
                      >
                        <div style={{ position: 'relative' }}>
                          {showPicker && (
                            <div
                              className="emoj"
                              style={{
                                position: 'absolute',
                                top: '-420px',
                                left: '-10px',
                              }}
                            >
                              <span
                                className="fecharEmoji"
                                onClick={togglePicker}
                              >
                                x
                              </span>
                              <Picker onEmojiClick={handleEmojiClick} />
                            </div>
                          )}
                          <button
                            className="botaoEmoj"
                            type="button"
                            onClick={togglePicker}
                            style={{ fontSize: '30px !important' }}
                          >
                            😊
                          </button>
                        </div>
                        <input
                          className="inputChat"
                          placeholder="Mensagem"
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <BsFillArrowRightCircleFill
                          className="arrowChat"
                          onClick={handleSendMessage}
                        />
                      </form>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {/* =================== modal dados atualizados ================================= */}
            <Modal
              className="modal-confirm"
              show={showupdatePromotor}
              onHide={handleCloseupdatePromotor}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <h1>Aviso Importante!</h1>
              </Modal.Header>
              <Modal.Body>
                <img id="logoSankhya" src={logoAlyne} alt="" />
                <h1 className="h1Promotor">
                  Você está sem conexão com a internet.
                </h1>
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={handleCloseupdatePromotor}
                >
                  Ok
                </button>
              </Modal.Body>
            </Modal>
          </div>
          <FooterMobile />
        </>
      )}
    </>
  );
}
