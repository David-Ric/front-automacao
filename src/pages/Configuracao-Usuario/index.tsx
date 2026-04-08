import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/global.scss';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader';
import Footer from '../../components/Footer/Footer';
import FooterMobile from '../../components/Footer/FooterMobile';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';
import { iDadosUsuario } from '../../@types';
import logoAlyne from '../../assets/logo-dark.png';
import { criarBancoDados, versao } from '../../data/indexedDB';
import { openDB } from 'idb';

type ConfigUsuario = {
  id: number;
  usuarioId: number;
  modo: string | null;
  recebRapido: boolean;
};

export default function ConfiguracaoUsuario() {
  const usuario: iDadosUsuario & { funcao?: string } = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const modoInicial = useMemo(() => {
    const raw = String(usuario?.funcao || '').trim().toUpperCase();
    if (raw === 'R' || raw === 'V') return raw;
    if (raw === 'REPRESENTANTE' || raw.includes('REP')) return 'R';
    if (raw === 'VENDEDOR' || raw.includes('VEND')) return 'V';
    return '';
  }, [usuario?.funcao]);

  const [modo, setModo] = useState<string>(modoInicial);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [resetando, setResetando] = useState(false);
  const [recebRapido, setRecebRapido] = useState(false);

  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');

  const [showErro, setShowErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');

  const [showResetLocalData, setShowResetLocalData] = useState(false);
  const [showResetLocalDataConfirm, setShowResetLocalDataConfirm] =
    useState(false);
  const [resetLocalDataLoading, setResetLocalDataLoading] = useState(false);

  function fecharResetLocalData() {
    setShowResetLocalDataConfirm(false);
    setShowResetLocalData(false);
    setResetLocalDataLoading(false);
  }

  async function deleteIndexedDBDelete() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase('pgamobileDelete');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Erro ao excluir o banco de dados.'));
      request.onblocked = () =>
        reject(new Error('O banco de dados está bloqueado por outra transação.'));
    });
  }

  async function deleteIndexedDB() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase('pgamobile');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Erro ao excluir o banco de dados.'));
      request.onblocked = () =>
        reject(new Error('O banco de dados está bloqueado por outra transação.'));
    });
  }

  async function limparBancoLocal() {
    const db = await openDB<any>('pgamobile', versao);
    try {
      const storeNames = Array.from(db.objectStoreNames);
      if (storeNames.length === 0) return;
      const tx = db.transaction(storeNames, 'readwrite');
      await Promise.all(storeNames.map((s) => tx.objectStore(s).clear()));
      await tx.done;
    } finally {
      try {
        db.close();
      } catch {}
    }
  }

  async function executarResetLocal() {
    try {
      setResetLocalDataLoading(true);
      let resetou = false;
      try {
        await limparBancoLocal();
        resetou = true;
      } catch {}
      if (!resetou) {
        try {
          const db = await openDB<any>('pgamobile', versao);
          db.close();
        } catch {}
        try {
          await deleteIndexedDB();
        } catch {}
      }
      try {
        await deleteIndexedDBDelete();
      } catch {}
      try {
        await criarBancoDados();
      } catch {}
      fecharResetLocalData();
      window.location.reload();
    } finally {
      setResetLocalDataLoading(false);
    }
  }

  async function carregar() {
    try {
      setLoading(true);
      const resp = await api.get<ConfigUsuario>(
        `/api/ConfigUsuario/usuario/${usuario.id}`
      );
      setRecebRapido(Boolean((resp as any)?.data?.recebRapido));
      const modoResp = String((resp as any)?.data?.modo ?? '').trim().toUpperCase();
      if (modoResp) setModo(modoResp);
    } catch {
      setRecebRapido(false);
    } finally {
      setLoading(false);
    }
  }

  async function salvar() {
    try {
      setSalvando(true);
      setShowErro(false);
      setMsgErro('');
      const payload = {
        id: 0,
        usuarioId: usuario.id,
        modo: modo || null,
        recebRapido: Boolean(recebRapido),
      };
      await api.put(`/api/ConfigUsuario/usuario/${usuario.id}`, payload);
      setMsg('Configuração salva.');
      setShowMsg(true);
    } catch {
      setMsgErro('Erro ao salvar configuração.');
      setShowErro(true);
    } finally {
      setSalvando(false);
    }
  }

  async function deleteDb(nome: string) {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(nome);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Erro ao excluir o banco de dados.'));
      request.onblocked = () =>
        reject(new Error('O banco de dados está bloqueado por outra transação.'));
    });
  }

  async function resetarDadosLocais() {
    try {
      setResetando(true);
      try {
        await deleteDb('pgamobileDelete');
      } catch {}
      try {
        await deleteDb('pgamobile');
      } catch {}
      try {
        await criarBancoDados();
      } catch {}
      setMsg('Dados locais resetados.');
      setShowMsg(true);
      window.location.reload();
    } finally {
      setResetando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    async function carregarTipoVendedor() {
      if (modo) return;
      const cod = String(usuario?.username || '').trim();
      if (!cod) return;
      try {
        const resp = await api.get(`/api/Vendedor/${cod}`);
        const tipo = String((resp as any)?.data?.tipo ?? '').trim().toUpperCase();
        if (tipo === 'R' || tipo === 'V') setModo(tipo);
      } catch {}
    }
    carregarTipoVendedor();
  }, [modo, usuario?.username]);

  return (
    <>
      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="">
            <SideNavBar />
          </div>
          <NavbarDashHeader />
          <div className="titulo-page">
            <h1>Configuração</h1>
          </div>
          <div className="contain">
            <div className="conteudo">
              <div className="container-fluid">
                {loading ? (
                  <div className="d-flex justify-content-center total-loading total-loadingCreate">
                    <div className="div-loading">
                      <div className="spinner-border" role="status" />
                      <h2 className="sr-only">Carregando...</h2>
                    </div>
                  </div>
                ) : (
                  <div className="form-cadastro-user">
                    <div className="divApontamento">
                    <div className="div-controles" style={{ width: '100%' }}>
                      <label
                        className="title-input"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={recebRapido}
                          onChange={(e) => setRecebRapido(e.target.checked)}
                          style={{ width: 18, height: 18 }}
                        />
                        Recebimento Rápido
                      </label>
                    </div>
                    </div>

                    <div className="divApontamento">
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => setShowResetLocalData(true)}
                        disabled={resetando || resetLocalDataLoading}
                        style={{ height: 48, marginLeft: 10 }}
                      >
                        {resetando ? 'Resetando...' : 'Resetar dados locais'}
                      </button>
                    </div>

                    <div className="divApontamento">
                      <button
                        className="btn btn-dark btnSalvarConfiguracoes"
                        onClick={salvar}
                        disabled={salvando}
                      >
                        {salvando ? 'Salvando...' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal className="modal-confirm" show={showMsg} onHide={() => setShowMsg(false)} backdrop="static">
        <Modal.Body>
          <div className="div-sankhya">
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 className="super-texto3">{msg}</h1>
            <button
              style={{ width: 130, marginTop: 10 }}
              className="btn btn-primary"
              onClick={() => setShowMsg(false)}
            >
              Ok
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal className="modal-confirm" show={showErro} onHide={() => setShowErro(false)} backdrop="static">
        <Modal.Body>
          <div className="div-sankhya">
            <img id="logoSankhya" src={logoAlyne} alt="" />
            <h1 className="super-texto3">{msgErro}</h1>
            <button
              style={{ width: 130, marginTop: 10 }}
              className="btn btn-primary"
              onClick={() => setShowErro(false)}
            >
              Ok
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="modal-confirm"
        show={showResetLocalData}
        onHide={fecharResetLocalData}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <h1>Configurações</h1>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setShowResetLocalData(false);
                setShowResetLocalDataConfirm(true);
              }}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: 16,
                padding: '10px 14px',
                border: '1px solid #000',
                fontWeight: 600,
              }}
            >
              Resetar dados locais.
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="modal-confirm"
        show={showResetLocalDataConfirm}
        onHide={fecharResetLocalData}
        backdrop="static"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <h1 style={{ fontSize: 18, marginBottom: 0 }}>
            Deseja realmente apagar os dados locais? se existirem pedidos ainda
            nao sincronizados, poderão ser apagados., Salve todos os pedidos
            antes de resetar o banco
          </h1>
          {resetLocalDataLoading && (
            <h2 style={{ fontSize: 16, marginTop: 10, marginBottom: 0 }}>
              Resetando Banco Local...
            </h2>
          )}
          <div
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <button
              type="button"
              onClick={executarResetLocal}
              disabled={resetLocalDataLoading}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: 16,
                padding: '10px 18px',
                border: '1px solid #000',
                fontWeight: 700,
                width: 120,
              }}
            >
              {resetLocalDataLoading ? 'Resetando...' : 'Sim'}
            </button>
            <button
              type="button"
              onClick={fecharResetLocalData}
              disabled={resetLocalDataLoading}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: 16,
                padding: '10px 18px',
                border: '1px solid #000',
                fontWeight: 700,
                width: 120,
              }}
            >
              Não
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <FooterMobile />
      <Footer />
    </>
  );
}
