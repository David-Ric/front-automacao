import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { PortalProvider } from './provider/PortalContext';
import App from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const disableServiceWorkerOnLocalhost = async () => {
  const isLocalhost =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.hostname === '[::1]';
  if (!isLocalhost) return;
  if (!('serviceWorker' in navigator)) return;

  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map((r) => r.unregister()));
  } catch {}

  try {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  } catch {}

  try {
    if (navigator.serviceWorker.controller) {
      const key = 'sw-disabled-reloaded';
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1');
        const emDigitacao =
          localStorage.getItem('@Portal/PedidoEmDigitacao') === 'true';
        const onPedido =
          String(window.location.pathname || '').toLowerCase().includes('pedido');
        if (!(emDigitacao && onPedido)) {
          window.location.reload();
        }
      }
    }
  } catch {}
};

const forceServiceWorkerActivation = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'ACTIVATE_NEW_SW' });
      }
    } catch (error) {
      console.error('Erro ao forçar a ativação do Service Worker:', error);
    }
  }
};

disableServiceWorkerOnLocalhost();
forceServiceWorkerActivation();

root.render(
  // <React.StrictMode>
  <PortalProvider>
    <App />
  </PortalProvider>
  // </React.StrictMode>
);
