import React, { useEffect, useMemo, useRef, useState } from 'react';
import './chatBotinho.scss';
import chatbotIcon from '../../assets/chatbot.png';
import api from '../../services/api';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: number;
};

const DEFAULT_GREETING = 'Olá sou botinho da Alyne, no que posso te ajudar?';

function isMobileNow() {
  return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
}

function getUserIdFromStorage(): number | null {
  try {
    const raw = window.localStorage.getItem('@Portal/usuario') || '';
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const id = Number(parsed?.id);
    return Number.isFinite(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

async function sendToApi(message: string) {
  const userId = getUserIdFromStorage();
  const resp = await api.post('/api/ia/chat', { message, userId });
  const data = (resp as any)?.data ?? {};
  const reply = data?.reply ?? data?.Reply ?? '';
  return String(reply || '');
}

export default function ChatBotinho() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [mobile, setMobile] = useState(() => (typeof window !== 'undefined' ? isMobileNow() : false));
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'greeting',
      role: 'assistant',
      text: DEFAULT_GREETING,
      createdAt: Date.now(),
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setShowBubble(false), 5000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onResize = () => setMobile(isMobileNow());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, messages.length]);

  const canSend = useMemo(() => input.trim().length > 0 && !sending, [input, sending]);

  function openChat() {
    setShowBubble(false);
    setOpen(true);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;
    setError('');
    setInput('');
    setSending(true);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const reply = await sendToApi(text);
      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: reply || 'Não consegui responder agora. Tenta novamente.',
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      const isNetworkError = Boolean(e?.isNetworkError || e?.response == null);
      const status = Number(e?.response?.status || 0);
      const msg = isNetworkError
        ? 'Falha de conexão com o servidor. Verifique sua internet e tente novamente.'
        : status >= 500
        ? 'A IA está indisponível no momento. Tenta novamente em alguns instantes.'
        : String(e?.message || 'Falha ao responder');
      setError(msg);
      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: 'Tive um problema para responder agora. Tenta novamente daqui a pouco.',
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <>
      {open && (
        <>
          <div className="botinho-overlay" onClick={() => setOpen(false)} />
          <div className={`botinho-chat ${mobile ? 'botinho-chat--mobile' : 'botinho-chat--desktop'}`}>
            <div className="botinho-chat__header">
              <div className="botinho-chat__title">Botinho da Alyne</div>
              <button className="botinho-chat__close" onClick={() => setOpen(false)} aria-label="Fechar">
                ×
              </button>
            </div>

            <div className="botinho-chat__messages" ref={listRef}>
              {messages.map((m) => (
                <div key={m.id} className={`botinho-msg botinho-msg--${m.role}`}>
                  {m.role === 'assistant' ? (
                    <img className="botinho-msg__avatar" src={chatbotIcon} alt="Bot" />
                  ) : null}
                  <div className="botinho-msg__bubble">{m.text}</div>
                </div>
              ))}
            </div>

            <div className="botinho-chat__footer">
              {error ? <div className="botinho-chat__error">{error}</div> : null}
              <div className="botinho-chat__inputRow">
                <input
                  ref={inputRef}
                  className="botinho-chat__input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua pergunta..."
                  disabled={sending}
                />
                <button className="botinho-chat__send" onClick={handleSend} disabled={!canSend}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {!open ? (
        <div className="botinho-fab">
          {showBubble ? (
            <div className="botinho-fab__bubble" onClick={openChat} role="button" tabIndex={0}>
              {DEFAULT_GREETING}
            </div>
          ) : null}
          <button
            className="botinho-fab__button"
            onClick={openChat}
            onMouseEnter={() => setShowBubble(true)}
            onMouseLeave={() => setShowBubble(false)}
            aria-label="Abrir chat"
          >
            <img className="botinho-fab__icon" src={chatbotIcon} alt="Bot" />
          </button>
        </div>
      ) : null}
    </>
  );
}
