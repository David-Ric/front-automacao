import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { iDadosUsuario } from '../@types';
import { LoginSankhyaDashAdmin, LoginSankhyaDashRepresentante } from '../functions/FuncoesDash';
import { MetaXRealizado } from '../functions/FuncoesRelatorio';
import api from '../services/api';

interface iGrafico {
  Mes: string;
  AnoAtual: number;
  AnoAnterior: number;
}

interface Row {
  id: number;
  month: string;
  meta: number;
  actual: number;
  color: string;
}

interface Relatorios{
  valor01:any;
  valor02:any;
  valor03:any;
  valor04:any;
  valor05:any;
  valor06:any;
  valor07:any;
  valor08:any;
  valor09:any;
  valor10:any;
  valor11:any;
  valor12:any;
  valor13:any;
  valor14:any;
  valor15:any;
  valor16:any;
  valor17:any;
  valor18:any;
  valor19:any;
}
interface iGraficoRela {
  id: number;
  valor01: number;
  valor02: number;
}

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@Portal/usuario") || "{}"
);

export const PortalContext = createContext({});


export const PortalProvider = ({ children }: { children: React.ReactNode }) => {

  //============= Dashbosrd ==========================================================
  const [graficoTotal, setGraficoTotal] = useState<iGrafico[]>([]);
  const [valorAnoAnterior, setValorAnoAnterior] = useState<any[]>([]);
  const [valorAnoAtual, setValorAnoAtual] = useState<any[]>([]);
  const [valorTotalAno, setValorTotalAno] = useState<number>(0);
  const [vendaXmeta, setVendaXmeta] = useState<Row[]>([]);
  const [metaMes, setMetaMes] = useState<number>(0);
  const [vendaMes, setVendaMes] = useState<number>(0);
  const [quantPedidoOrcamentoDash, setquantPedidoOrcamentoDash] = useState<number>(0);
  const [valorPedidoOrcamentoDash, setvalorPedidoOrcamentoDash] = useState<number>(0);
  const [quantFaturarDash, setquantFaturarDash] = useState<number>(0);
  const [valorFaturarDash, setvalorFaturarDash] = useState<number>(0);
  const [quantPedidoDash, setquantPedidoDash] = useState<number>(0);
  const [valorPedidoDash, setvalorPedidoDash] = useState<number>(0);

  const [online, setOnline] = useState(window.navigator.onLine);
  const [apiOk, setApiOk] = useState(window.navigator.onLine);
  const [lastSuccessTs, setLastSuccessTs] = useState<number>(Date.now());
  const apiCheckInFlightRef = useRef(false);
  const appOnline = online && apiOk;

  useEffect(() => {
    const updateStatus = () => {
      setOnline(window.navigator.onLine);
    };
    updateStatus();
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    const handleApiStatus = (e: any) => {
      const ok = !!(e?.detail?.ok);
      setApiOk(ok);
      if (ok) {
        setLastSuccessTs(Date.now());
      }
    };
    window.addEventListener('api-status', handleApiStatus as any);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      window.removeEventListener('api-status', handleApiStatus as any);
    };
  }, []);

  useEffect(() => {
    if (!online || apiOk) {
      apiCheckInFlightRef.current = false;
      return;
    }

    const tick = async () => {
      if (!window.navigator.onLine) return;
      if (document.visibilityState !== 'visible') return;
      if (apiCheckInFlightRef.current) return;
      apiCheckInFlightRef.current = true;
      try {
        const usuario: any = JSON.parse(
          localStorage.getItem('@Portal/usuario') || '{}'
        );
        const id = usuario?.id;
        if (id) {
          const res = await api.get(`/api/Usuario/${id}`, {
            params: { ts: Date.now() },
            validateStatus: () => true,
          });
          const ok = typeof res?.status === 'number' && res.status > 0;
          if (ok) {
            setApiOk(true);
            setLastSuccessTs(Date.now());
          }
        }
      } catch {
      } finally {
        apiCheckInFlightRef.current = false;
      }
    };

    tick();
    const id = window.setInterval(tick, 5000);
    return () => {
      clearInterval(id);
    };
  }, [online, apiOk, lastSuccessTs]);

  


  useEffect(() => {
    const graficoTotalStorage = JSON.parse(localStorage.getItem("@Portal/dash/graficoTotal") || "{}");
    const valorAnteriorStorage = JSON.parse(localStorage.getItem("@Portal/dash/ValorAnterior") || "{}");
    const valorAtualStorage = JSON.parse(localStorage.getItem("@Portal/dash/ValorAtual") || "{}");
    const valorTotalAnoStorage = JSON.parse(localStorage.getItem("@Portal/dash/valorTotalAno") || "{}");
    const vendaXmetaStorage = JSON.parse(localStorage.getItem("@Portal/dash/VendaXmeta") || "{}");
    const metaMesStorage = Number(localStorage.getItem("@Portal/dash/metaMes")) || 0;
    const vendaMesStorage = Number(localStorage.getItem("@Portal/dash/vendaMes")) || 0;
    console.log('graficoTotalStorage:', graficoTotalStorage);
    console.log('valorAnteriorStorage:', valorAnteriorStorage);
    console.log('valorAtualStorage:', valorAtualStorage);
    console.log('valorTotalAnoStorage:', valorTotalAnoStorage);
    console.log('vendaXmetaStorage:', vendaXmetaStorage);
    console.log('metaMesStorage:', metaMesStorage);
    console.log('vendaMesStorage:', vendaMesStorage);
    if (graficoTotalStorage) {
      setGraficoTotal(graficoTotalStorage);
    }
    if (valorAnteriorStorage) {
      setValorAnoAnterior(valorAnteriorStorage);
    }
    if (valorAtualStorage) {
      setValorAnoAtual(valorAtualStorage);
    }
    if (valorTotalAnoStorage) {
      setValorTotalAno(valorTotalAnoStorage);
    }
    if (vendaXmetaStorage) {
      setVendaXmeta(vendaXmetaStorage);
    }
     if (metaMesStorage) {
       setMetaMes(metaMesStorage);
     }
     if (vendaMesStorage) {
       setVendaMes(vendaMesStorage);
     }
  }, []);


//===============================================================================
  return (
    <PortalContext.Provider
      value={{
        graficoTotal,
        setGraficoTotal,
        valorAnoAnterior,
        setValorAnoAnterior,
        valorAnoAtual,
        setValorAnoAtual,
        valorTotalAno,
        setValorTotalAno,
        vendaXmeta,
        setVendaXmeta,
        metaMes,
        setMetaMes,
        vendaMes,
        setVendaMes,
        online,
        apiOk,
        appOnline,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

 export const online = window.navigator.onLine;
 export let graficoTotal: iGrafico[] = JSON.parse(localStorage.getItem("@Portal/dash/graficoTotal") || "[]");
 export let valorAnoAnterior: any[] = JSON.parse(localStorage.getItem("@Portal/dash/ValorAnterior") || "[]");
 export let valorAnoAtual: any[] = JSON.parse(localStorage.getItem("@Portal/dash/ValorAtual") || "[]");
 export let valorTotalAno: number = JSON.parse(localStorage.getItem("@Portal/dash/valorTotalAno") || "0");
 export let vendaXmeta: Row[] = JSON.parse(localStorage.getItem("@Portal/dash/VendaXmeta") || "[]");
 export let metaMes: number = Number(localStorage.getItem("@Portal/dash/metaMes")) || 0;
 export let vendaMes: number = Number(localStorage.getItem("@Portal/dash/vendaMes")) || 0;
 export let quantPedidoOrcamentoDash: number = JSON.parse(localStorage.getItem("@Portal/dash/QuantPedidoOrcamento") || "0");
 export let valorPedidoOrcamentoDash: number = JSON.parse(localStorage.getItem("@Portal/dash/ValorPedidoOrcamento") || "0");
 export let quantFaturarDash: number = JSON.parse(localStorage.getItem("@Portal/dash/QuantFaturar") || "0");
 export let valorFaturarDash: number = JSON.parse(localStorage.getItem("@Portal/dash/ValorFaturar") || "0");
 export let quantPedidoDash: number = JSON.parse(localStorage.getItem("@Portal/dash/QuantPedidos") || "0");
 export let valorPedidoDash: number = JSON.parse(localStorage.getItem("@Portal/dash/ValorPedidos") || "0");
 export let clientesSemVendaDash: number = JSON.parse(localStorage.getItem("@Portal/dash/ClientesSemVenda") || "0");

 //======RELATORIOS REPRESENTANTE =====================================================================================================
 
 export let metaXrealizado: iGraficoRela [] = JSON.parse(localStorage.getItem("@Portal/Relatorio/MetaXrealizado") || "[]");
 export let pedidoFaturar: Relatorios[] = JSON.parse(localStorage.getItem("@Portal/Relatorio/PedidoFaturar") || "[]");
 export let listaCobranca: Relatorios[] = JSON.parse(localStorage.getItem("@Portal/Relatorio/ListaCobranca") || "[]");
 export let vendaClientesCrescimento: Relatorios[] = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaClientesCrescimento") || "[]");
 export let vendaProdutoCrescimento: Relatorios[] = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaProdutoCrescimento") || "[]");
 export let vendaClientesQueda: Relatorios[] = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaClienteQueda") || "[]");
 export let vendaProdutoQueda: Relatorios[] = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaProdutoQueda") || "[]");

//======================================================================================================================================
 export const limparDadosDash = () => {
  graficoTotal = [];
  valorAnoAnterior = [];
  valorAnoAtual = [];
  valorTotalAno = 0;
  vendaXmeta = [];
  metaMes = 0;
  vendaMes = 0;
  quantPedidoOrcamentoDash = 0;
  valorPedidoOrcamentoDash = 0;
  quantFaturarDash = 0;
  valorFaturarDash = 0;
  quantPedidoDash = 0;
  valorPedidoDash = 0;
  clientesSemVendaDash = 0;
  console.log("limpando dados do dash")
}
export const limparDadosRelatorios = () => {
   metaXrealizado = [];
   pedidoFaturar = [];
   listaCobranca = [];
   vendaClientesCrescimento = [];
   vendaProdutoCrescimento = [];
   vendaClientesQueda = [];
   vendaProdutoQueda = [];
   console.log("limpando dados dos relatorios")
}

export const atualizaCartaoHome =() =>{
  console.log("entrou no atualizar cartão")
  const metaMesString = localStorage.getItem("@Portal/dash/metaMes")|| "0";
  const metaMes = metaMesString && isJSONString(metaMesString) ? JSON.parse(metaMesString) : 0;
  
  const vendaMesString = localStorage.getItem("@Portal/dash/vendaMes")|| "0";
  const vendaMes = vendaMesString && isJSONString(vendaMesString) ? JSON.parse(vendaMesString) : 0;

  function isJSONString(str:any) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

}

let salvarDashTimer: any = null;
let salvarDashUltimaChave = "";

const obterUsuarioAtual = () => {
  try {
    return JSON.parse(localStorage.getItem("@Portal/usuario") || "{}") as iDadosUsuario;
  } catch {
    return {} as iDadosUsuario;
  }
};

const salvarDashNoBanco = async () => {
  const u = obterUsuarioAtual();
  const codVendedor = (u?.username || "").trim();
  if (!codVendedor) return;

  const graficoPayload = (graficoTotal || []).map((g: any) => ({
    codVendedor,
    mes: g?.Mes,
    anoAtual: g?.AnoAtual,
    anoAnterior: g?.AnoAnterior,
  }));

  const vendaxMetaPayload = (vendaXmeta || []).map((v: any) => ({
    codVendedor,
    month: v?.month,
    meta: v?.meta,
    actual: v?.actual,
    color: v?.color,
  }));

  const cardPayload = {
    codVendedor,
    metaMes: metaMes || 0,
    vendaMes: vendaMes || 0,
    vaorTotalAno: valorTotalAno || 0,
    quantFaturar: quantFaturarDash || 0,
    valorFaturar: valorFaturarDash || 0,
    quantPedidoOrcamento: quantPedidoOrcamentoDash || 0,
    valorPedidoOrcamento: valorPedidoOrcamentoDash || 0,
    quantPedido: quantPedidoDash || 0,
    valorPedido: valorPedidoDash || 0,
    clienteSemVenda: clientesSemVendaDash || 0,
  };

  const chave = JSON.stringify([graficoPayload, vendaxMetaPayload, cardPayload]);
  if (chave === salvarDashUltimaChave) return;
  salvarDashUltimaChave = chave;

  try {
    if (graficoPayload.length > 0) {
      await api.post("/api/Dashboard/grafico", graficoPayload);
    }
    if (vendaxMetaPayload.length > 0) {
      await api.post("/api/Dashboard/VendaxMeta", vendaxMetaPayload);
    }
    await api.post("/api/Dashboard/cardDash", cardPayload);
  } catch {}
};

const agendarSalvarDashNoBanco = () => {
  try {
    if (salvarDashTimer) clearTimeout(salvarDashTimer);
  } catch {}
  salvarDashTimer = setTimeout(() => {
    salvarDashNoBanco();
  }, 800);
};

export const atualizarConstantes = () => {
  graficoTotal = JSON.parse(localStorage.getItem("@Portal/dash/graficoTotal") || "[]");
  valorAnoAnterior = JSON.parse(localStorage.getItem("@Portal/dash/ValorAnterior") || "[]");
  valorAnoAtual = JSON.parse(localStorage.getItem("@Portal/dash/ValorAtual") || "[]");
  valorTotalAno = JSON.parse(localStorage.getItem("@Portal/dash/valorTotalAno") || "0");
  vendaXmeta = JSON.parse(localStorage.getItem("@Portal/dash/VendaXmeta") || "[]");
  metaMes = JSON.parse(localStorage.getItem("@Portal/dash/metaMes") || "0");
  vendaMes = JSON.parse(localStorage.getItem("@Portal/dash/vendaMes") || "0");
  quantPedidoOrcamentoDash = JSON.parse(localStorage.getItem("@Portal/dash/QuantPedidoOrcamento") || "0");
  valorPedidoOrcamentoDash = JSON.parse(localStorage.getItem("@Portal/dash/ValorPedidoOrcamento") || "0");
  quantFaturarDash = JSON.parse(localStorage.getItem("@Portal/dash/QuantFaturar") || "0");
  valorFaturarDash = JSON.parse(localStorage.getItem("@Portal/dash/ValorFaturar") || "0");
  quantPedidoDash = JSON.parse(localStorage.getItem("@Portal/dash/QuantPedidos") || "0");
  valorPedidoDash = JSON.parse(localStorage.getItem("@Portal/dash/ValorPedidos") || "0");
  clientesSemVendaDash = JSON.parse(localStorage.getItem("@Portal/dash/ClientesSemVenda") || "0")
  agendarSalvarDashNoBanco();
}

 export const atualizarRelatorios = () => {
   console.log("entrou na função .....................................................................")
   metaXrealizado = JSON.parse(localStorage.getItem("@Portal/Relatorio/MetaXrealizado") || "[]");
   pedidoFaturar = JSON.parse(localStorage.getItem("@Portal/Relatorio/PedidoFaturar") || "[]");
   listaCobranca = JSON.parse(localStorage.getItem("@Portal/Relatorio/ListaCobranca") || "[]");
   vendaClientesCrescimento = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaClientesCrescimento") || "[]");
   vendaProdutoCrescimento = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaProdutoCrescimento") || "[]");
   vendaClientesQueda = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaClienteQueda") || "[]");
   vendaProdutoQueda = JSON.parse(localStorage.getItem("@Portal/Relatorio/VendaProdutoQueda") || "[]");
 }

 export const useOnlineStatus = () => {
  const [online, setOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const updateStatus = () => {
      setOnline(window.navigator.onLine);
    };

    updateStatus();
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    const intervalId = setInterval(updateStatus, 3000);

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      clearInterval(intervalId);
    };
  }, []);

  return online;
};

export const useAppOnlineStatus = () => {
  const ctx = useContext(PortalContext) as any;
  return { online: ctx.online, apiOk: ctx.apiOk, appOnline: ctx.appOnline };
};








  
 
