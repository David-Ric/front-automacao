import axios from 'axios';
import { iDadosUsuario } from '../@types';

const resolveBaseURL = (): string => {
  const prod = 'https://pga.cigel.com.br:8095/';
  const local = 'https://localhost:8095/';
  try {
    if (typeof window === 'undefined') return prod;
    const override = window.localStorage?.getItem('@Portal/apiBaseURL') || '';
    if (override) return override;
    const host = window.location?.hostname || '';
    const isLocalhost =
      host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
    return isLocalhost ? local : prod;
  } catch {
    return prod;
  }
};

const api = axios.create({
  baseURL: 'https://pga.cigel.com.br:8095/',
  //baseURL: 'http://10.0.0.158:8091/',
  //baseURL: resolveBaseURL(),
  //baseURL: 'https://localhost:8095/',
  headers: {
    'Content-type': 'application/json',
  },
});

let pauseDepth = 0;
let pausedForOrder = false;
const pendingResolvers: Array<() => void> = [];
function isCritical(config: any): boolean {
  const url = String(config?.url || '');
  const method = String(config?.method || '').toLowerCase();
  if (method !== 'post') return false;
  return (
    url.includes('/api/ItemPedidoVenda') ||
    url.includes('/api/ItemPedidoVenda/item') ||
    url.includes('/api/CabecalhoPedidoVenda')
  );
}
function flushPending() {
  const resolvers = pendingResolvers.splice(0, pendingResolvers.length);
  resolvers.forEach((r) => {
    try {
      r();
    } catch {}
  });
}

function getToken(): string | null {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );
  const token = usuario.token || null;
  if (token) {
    console.log('Token:', token);
    return token;
  } else {
    console.error('Token não encontrado no localStorage');
    return null;
  }
}

api.interceptors.request.use((config) => {
  const token = getToken();
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (isCritical(config)) {
    pauseDepth += 1;
    pausedForOrder = true;
    return config;
  }
  if (pausedForOrder) {
    return new Promise((resolve) => {
      pendingResolvers.push(() => resolve(config));
    });
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    try {
      if (isCritical(response?.config)) {
        pauseDepth = Math.max(0, pauseDepth - 1);
        if (pauseDepth === 0) {
          pausedForOrder = false;
          flushPending();
        }
      }
    } catch {}
    try {
      const evt = new CustomEvent('api-status', {
        detail: { ok: true, status: response?.status || 200 },
      });
      window.dispatchEvent(evt);
    } catch {}
    return response;
  },
  (error) => {
    try {
      if (isCritical(error?.config)) {
        pauseDepth = Math.max(0, pauseDepth - 1);
        if (pauseDepth === 0) {
          pausedForOrder = false;
          flushPending();
        }
      }
    } catch {}
    try {
      const isTimeout =
        error?.code === 'ECONNABORTED' ||
        String(error?.message || '').toLowerCase().includes('timeout');
      const isNetworkError =
        !error?.response ||
        error?.code === 'ECONNABORTED' ||
        String(error?.message || '').toLowerCase().includes('network error');
      (error as any).isTimeout = !!isTimeout;
      (error as any).isNetworkError = !!isNetworkError;
      const evt = new CustomEvent('api-status', {
        detail: { ok: !isNetworkError, status: error?.response?.status || 0 },
      });
      window.dispatchEvent(evt);
    } catch {}
    return Promise.reject(error);
  }
);

export default api;
