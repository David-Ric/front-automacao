
import { iDadosUsuario } from "../@types";
import api from "../services/api";
import {limparDadosDash,atualizarConstantes,atualizaCartaoHome} from '../provider/PortalContext'
import Observer from './observer';


const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );
//======FUNÇÃO OBSERVER PARA LOADING TELA DASH ==============
export let loadingDash: boolean = false
export const loadingDashObserver = new Observer();
//======= FUNÇÃO OBSERVER PARA GET COLABORADOR ================================================

export const metaMesDObserver = new Observer();
//===============================================================
//=======Funções Sankhya dash Admin ============================================================
export async function LoginSankhyaDashAdmin() {

  loadingDash = true
  loadingDashObserver.notify(loadingDash);
  try {
    await DadosMetaMesValorMesAdmin()
  } catch (error) {
    console.log("erro", error);
  }
  loadingDash = false
  loadingDashObserver.notify(loadingDash);
}
//==========================================================================================

async function DadosMetaMesValorMesAdmin() {
  const codVen = usuario.username;
  const sql = `SELECT MET.MES, MET.VLRMET VLRMET, ISNULL(VEN.VLRVEN,0) VLRVEN
                      FROM (
                        SELECT MONTH(DTREF) MES, SUM(PREVREC) VLRMET
                        FROM TGFMET (NOLOCK)
                        WHERE YEAR(DTREF) = YEAR(GETDATE())
                        AND MONTH(DTREF) = MONTH(GETDATE())
                        AND CODEMP <> 6
                        AND CODVEND < 30000
                        GROUP BY MONTH(DTREF)
                      ) MET 
                      LEFT JOIN ( 
                        SELECT MES,  SUM(FIN) VLRVEN
                        FROM AD_VVENDAS_CLI
                        WHERE ANO = YEAR(GETDATE())
                        AND MES = MONTH(GETDATE())
                        GROUP BY MES
                      ) VEN ON VEN.MES = MET.MES`;
  await api
    .post(`/api/Sankhya/DadosDashSankhya?sql=${sql}`)
    .then((response) => {
      console.log("meta de vendas", response.data.responseBody.rows[0]?.[1]);
     
      localStorage.setItem("@Portal/dash/metaMes",response.data.responseBody.rows[0]?.[1])
      console.log("valor mes", response.data.responseBody.rows[0]?.[2]);
    
      localStorage.setItem("@Portal/dash/vendaMes",response.data.responseBody.rows[0]?.[2])
      DadosGraficoAdmin();   
     
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}

//==============================================================================================

async function DadosGraficoAdmin() {


  function obterMesAtual(): string {
    const meses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
  
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
  
    return meses[mesAtual];
  }
 
  const mesAtual = obterMesAtual();

  atualizaCartaoHome()
  metaMesDObserver.notify(atualizaCartaoHome);
  const codVen2 = usuario.username;
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);
  const anoAnterior = lastYear.getFullYear();
  const agora = new Date();
  const anoAtual = agora.getFullYear();
  console.log("ano anterior", anoAnterior);
  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20ANT.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20ANT.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20ANT.VLRVEN%20VLRANT%20%09%2C%20ISNULL%28ATU.VLRVEN%2C0%29%20VLRATU%20%09%20%20FROM%20%28%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAnterior}%20%09GROUP%20BY%20MES%20%29%20ANT%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09GROUP%20BY%20MES%20%29%20ATU%20ON%20ATU.MES%20%3D%20ANT.MES%20ORDER%20BY%201`
    )
    .then((response) => {
      console.log("faturamento", response);
      //=======================================================
     

      const dadosArray = response.data.responseBody.rows.map((item: any) => ({
        Mes: item[1],
        AnoAtual: item[3],
        AnoAnterior: item[2]
      }));
    
      localStorage.setItem(
        "@Portal/dash/valorTotalAno",dadosArray.reduce((accumulator:any, item:any) => accumulator + item.AnoAtual, 0))
      
        const mesAtual = obterMesAtual();
        const itemMesAtual = dadosArray.find((item: any) => item.Mes === mesAtual);
        
        if (itemMesAtual) {
          const valorMesGrafico = JSON.stringify(itemMesAtual);
          localStorage.setItem("@Portal/dash/ValorMesGrafico", valorMesGrafico);
        }
        
        

    
      localStorage.setItem(
        "@Portal/dash/graficoTotal",
        JSON.stringify(dadosArray)
      );
   
      const vlanoAnteriorArray = dadosArray.map((item:any) => item.AnoAnterior);
      const vlanoAtualArray = dadosArray.map((item:any) => item.AnoAtual);
     
      localStorage.setItem(
        "@Portal/dash/ValorAnterior",
        JSON.stringify(vlanoAnteriorArray)
      );
      
      localStorage.setItem(
        "@Portal/dash/ValorAtual",
        JSON.stringify(vlanoAtualArray)
      );
      
  
        DadosGraficoVendasxMetaAdmin()
      
    })
    .catch((error) => {
      console.log("erro dados grafico", error);
    });
}


//==============================================================================================

async function DadosGraficoVendasxMetaAdmin() {
  const codVen2 = usuario.username;
  const agora = new Date();
  const anoAtual = agora.getFullYear();
  console.log("ano atual", anoAtual);

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20MET.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20MET.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20MET.VLRMET%20VLRMET%20%09%2C%20ISNULL%28VEN.VLRVEN%2C0%29%20VLRVEN%20%09%2C%20CASE%20WHEN%20MET.VLRMET%20%3E%20VEN.VLRVEN%20THEN%20%27RED%27%20ELSE%20CASE%20WHEN%20MET.VLRMET%20%3D%200%20THEN%20%27GREY%27%20ELSE%20%27GREEN%27%20END%20END%20COLOR%20%20FROM%20%28%20%09SELECT%20MONTH%28MET.DTREF%29%20MES%2C%20SUM%28MET.PREVREC%29%20VLRMET%20%09FROM%20TGFMET%20MET%20%28NOLOCK%29%20%09LEFT%20JOIN%20TGFVEN%20VDO%20%28NOLOCK%29%20ON%20VDO.CODVEND%20%3D%20MET.CODVEND%20%09LEFT%20JOIN%20TGFVEN%20GER%20%28NOLOCK%29%20ON%20GER.CODVEND%20%3D%20VDO.CODGER%20%09WHERE%20YEAR%28MET.DTREF%29%20%3D%20${anoAtual}%20%09GROUP%20BY%20MONTH%28MET.DTREF%29%20%29%20MET%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20GROUP%20BY%20MES%20%29%20VEN%20ON%20VEN.MES%20%3D%20MET.MES%20ORDER%20BY%201`
    )
    .then((response) => {
      console.log("vendas x metas", response);
      console.log("vendas x metas rows", response.data.responseBody.rows);
      const data = response.data.responseBody.rows;
const result = data.map((curr:any) => {
  return {
    id: curr[0],
    month: curr[1],
    meta: curr[2],
    actual: curr[3],
    color: curr[4]
  };
});

localStorage.setItem(
  "@Portal/dash/VendaXmeta",
  JSON.stringify(result)
);

DadosPedidoOrcamentoAdmin()
 
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}




//===============================================================================================================================

async function DadosPedidoOrcamentoAdmin() {
  const codVen2 = usuario.username;

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3D%203000`
    )
    .then((response) => {
      console.log("pedidos e orçamento", response);
     
      localStorage.setItem("@Portal/dash/QuantPedidoOrcamento",response.data.responseBody.rows[0]?.[0]);
     
      localStorage.setItem("@Portal/dash/ValorPedidoOrcamento",response.data.responseBody.rows[0]?.[1]);
      DadosPedidoFaturarAdmin() 
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}


//=============================================================================================================


async function DadosPedidoFaturarAdmin() {
  const codVen2 = usuario.username;

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3C%3E%203000`
    )
    .then((response) => {
      console.log("pedidos a faturar", response);
      
      localStorage.setItem("@Portal/dash/QuantFaturar",response.data.responseBody.rows[0]?.[0]);
     
      localStorage.setItem("@Portal/dash/ValorFaturar",response.data.responseBody.rows[0]?.[1]);
      
      DadosQuantidadePedidosAdmin();
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}


//==================================================================================================


async function DadosQuantidadePedidosAdmin() {
  const codVen2 = usuario.username;

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED`
    )
    .then((response) => {
      console.log("pedidos a faturar", response);
      
      localStorage.setItem("@Portal/dash/QuantPedidos",response.data.responseBody.rows[0]?.[0]);
     
      localStorage.setItem("@Portal/dash/ValorPedidos",response.data.responseBody.rows[0]?.[1]);
      DadosClientesSemVendaAdmin() 
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}


//================================================================================================

async function DadosClientesSemVendaAdmin() {
  const codVen2 = usuario.username;

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28DISTINCT%20CODPAR%29%20as%20QTD%20FROM%20AD_VCLIENTES%20%20%20%20WHERE%20DTNEG%20%3C%3D%20%28GETDATE%28%29-90%29%20%20%20%20and%20GERCOD%20IN%20%2814725%2C%2014699%2C%2014749%29%20%20%20%20or%20codpar%20in%20%2814674%29`
    )
    .then((response) => {
     
      localStorage.setItem("@Portal/dash/ClientesSemVenda",response.data.responseBody.rows[0]);
      atualizarConstantes()
      loadingDash = false
      loadingDashObserver.notify(loadingDash);
    })
    .catch((error) => {
      console.log("erro dados", error);
      loadingDash = false
      loadingDashObserver.notify(loadingDash);
    });
}


//=======Funções Sankhya Representante ============================================================

export async function LoginSankhyaDashRepresentante() {
  loadingDash = true
  loadingDashObserver.notify(loadingDash);
  try {
    await DadosMetaMesValorMesRepresentante()
  } catch (error) {
    console.log("erro", error);
  }
    
}
//====================================================================================

async function DadosMetaMesValorMesRepresentante() {
  const codVen = usuario.username;
  const sql = `SELECT MET.MES, MET.VLRMET VLRMET, ISNULL(VEN.VLRVEN,0) VLRVEN
                      FROM (
                        SELECT MONTH(DTREF) MES, SUM(PREVREC) VLRMET
                        FROM TGFMET (NOLOCK)
                        WHERE YEAR(DTREF) = YEAR(GETDATE())
                        AND MONTH(DTREF) = MONTH(GETDATE())
                        AND CODEMP <> 6
                        AND CODVEND < 30000
                        AND CODVEND = ${codVen}
                        GROUP BY MONTH(DTREF)
                      ) MET 
                      LEFT JOIN ( 
                        SELECT MES,  SUM(FIN) VLRVEN
                        FROM AD_VVENDAS_CLI
                        WHERE ANO = YEAR(GETDATE())
                        AND MES = MONTH(GETDATE())
                        AND CODVEND = ${codVen}
                        GROUP BY MES
                      ) VEN ON VEN.MES = MET.MES`;
  await api
    .post(`/api/Sankhya/DadosDashSankhya?sql=${sql}`)
    .then((response) => {
      console.log("meta de vendas", response.data.responseBody.rows);
     
      localStorage.setItem("@Portal/dash/metaMes",response.data.responseBody.rows[0]?.[1])
      console.log("valor mes", response.data.responseBody.rows[0]?.[2]);
    
      localStorage.setItem("@Portal/dash/vendaMes",response.data.responseBody.rows[0]?.[2])
     
      DadosGraficoRepresentante()
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}
//==============================================================================

async function DadosGraficoRepresentante() {
 
  
  metaMesDObserver.notify(atualizaCartaoHome);
  const codVen2 = usuario.username;
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);
  const anoAnterior = lastYear.getFullYear();
  const agora = new Date();
  const anoAtual = agora.getFullYear();
  console.log("ano anterior", anoAnterior);
  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20ANT.MES%20NMES%20%09%2C%20LEFT%28DATENAME%28MONTH%2C%20DATEADD%28MONTH%2C%20ANT.MES%20-%201%2C%200%29%29%2C3%29%20MES%20%09%2C%20ANT.VLRVEN%20VLRANT%20%09%2C%20ISNULL%28ATU.VLRVEN%2C0%29%20VLRATU%20%09%20%20FROM%20%28%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAnterior}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20ANT%20%20LEFT%20JOIN%20%28%20%20%09SELECT%20MES%2C%20%20SUM%28FIN%29%20VLRVEN%20%09FROM%20AD_VVENDAS_CLI%20VEN%20%09WHERE%20ANO%20%3D%20${anoAtual}%20%09AND%20%28VEN.CODVEND%20%3D%20${codVen2}%29%20%09GROUP%20BY%20MES%20%29%20ATU%20ON%20ATU.MES%20%3D%20ANT.MES%20ORDER%20BY%201`
    )
    .then((response) => {
      console.log("faturamento", response);
      //=======================================================
      

      const dadosArray = response.data.responseBody.rows.map((item: any) => ({
        Mes: item[1],
        AnoAtual: item[3],
        AnoAnterior: item[2]
      }));
    
      localStorage.setItem(
        "@Portal/dash/valorTotalAno",dadosArray.reduce((accumulator:any, item:any) => accumulator + item.AnoAtual, 0))
      
      localStorage.setItem(
        "@Portal/dash/graficoTotal",
        JSON.stringify(dadosArray)
      );
   
      const vlanoAnteriorArray = dadosArray.map((item:any) => item.AnoAnterior);
      const vlanoAtualArray = dadosArray.map((item:any) => item.AnoAtual);
     
      localStorage.setItem(
        "@Portal/dash/ValorAnterior",
        JSON.stringify(vlanoAnteriorArray)
      );
      
      localStorage.setItem(
        "@Portal/dash/ValorAtual",
        JSON.stringify(vlanoAtualArray)
      );
      
  
        DadosGraficoVendasxMetaRepresentante()
      
    })
    .catch((error) => {
  
      console.log("erro dados grafico", error);
    });

}

//=====================================================================

async function DadosGraficoVendasxMetaRepresentante() {
  const codVen2 = usuario.username;
  const agora = new Date();
  const anoAtual = agora.getFullYear();
  console.log("ano atual", anoAtual);

  const sql = `SELECT MET.MES NMES
  , LEFT(DATENAME(MONTH, DATEADD(MONTH, MET.MES - 1, 0)),3) MES
  , MET.VLRMET VLRMET
  , ISNULL(VEN.VLRVEN,0) VLRVEN
  , CASE WHEN MET.VLRMET > VEN.VLRVEN THEN 'RED' ELSE CASE WHEN MET.VLRMET = 0 THEN 'GREY' ELSE 'GREEN' END END COLOR
FROM (
  SELECT MONTH(MET.DTREF) MES, SUM(MET.PREVREC) VLRMET
  FROM TGFMET MET (NOLOCK)
  LEFT JOIN TGFVEN VDO (NOLOCK) ON VDO.CODVEND = MET.CODVEND
  LEFT JOIN TGFVEN GER (NOLOCK) ON GER.CODVEND = VDO.CODGER
  WHERE YEAR(MET.DTREF) = ${anoAtual}
  AND MET.CODEMP <> 6 
  AND MET.CODVEND < 30000
  AND (VDO.CODVEND = ${codVen2})
  GROUP BY MONTH(MET.DTREF)
) MET
LEFT JOIN (
  SELECT MES,  SUM(FIN) VLRVEN
  FROM AD_VVENDAS_CLI VEN
  WHERE ANO = ${anoAtual}
  AND (VEN.CODVEND = ${codVen2})
  GROUP BY MES
) VEN ON VEN.MES = MET.MES
ORDER BY 1`;
  await api.post(`/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`)
    .then((response) => {
      console.log("vendas x metas", response);
      console.log("vendas x metas rows", response.data.responseBody.rows);
      const data = response.data.responseBody.rows;
const result = data.map((curr:any) => {
  return {
    id: curr[0],
    month: curr[1],
    meta: curr[2],
    actual: curr[3],
    color: curr[4]
  };
});


localStorage.setItem(
  "@Portal/dash/VendaXmeta",
  JSON.stringify(result)
);
DadosPedidoOrcamentoRepresentante()
     
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}





//====================================================================================

async function DadosPedidoOrcamentoRepresentante() {
  const codVen2 = usuario.username;

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%20%20%20%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20%20FROM%20AD_VPEDAFATURAR%20PED%20%20WHERE%20PED.CODTIPOPER%20%3D%203000%20AND%20CODVEND%20%3D${codVen2}`
    )
    .then((response) => {
      console.log("pedidos e orçamento", response);
     
      localStorage.setItem("@Portal/dash/QuantPedidoOrcamento",response.data.responseBody.rows[0]?.[0]);
     
      localStorage.setItem("@Portal/dash/ValorPedidoOrcamento",response.data.responseBody.rows[0]?.[1]);
      DadosPedidoFaturarREpresentante() 
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}


//====================================================================================

async function DadosPedidoFaturarREpresentante() {
  const codVen2 = usuario.username;

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%09%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20FROM%20AD_VPEDAFATURAR%20PED%20WHERE%20PED.CODTIPOPER%20%3C%3E%203000%20%20AND%20CODVEND%20%3D${codVen2}`
    )
    .then((response) => {
      console.log("pedidos a faturar", response);
      
      localStorage.setItem("@Portal/dash/QuantFaturar",response.data.responseBody.rows[0]?.[0]);
     
      localStorage.setItem("@Portal/dash/ValorFaturar",response.data.responseBody.rows[0]?.[1]);
      
      DadosQuantidadePedidosRepresentante();
    })
    .catch((error) => {
      console.log("erro dados", error);
    });
}

//====================================================================================

async function DadosQuantidadePedidosRepresentante() {
  const codVen2 = usuario.username;

  await api
    .post(
      `/api/Sankhya/DadosDashSankhya?sql=SELECT%20COUNT%28distinct%20NUNOTA%29%20QTDNOT%20%09%2C%20ROUND%28SUM%28VLRPED%29%20%2B%20SUM%28VLRBON%29%2C2%29%20%20VLRNOTA%09%20FROM%20AD_VPEDAFATURAR%20PED%20wHERE%20CODVEND%3D${codVen2}`
    )
    .then((response) => {
      console.log("pedidos a faturar", response);
      
      localStorage.setItem("@Portal/dash/QuantPedidos",response.data.responseBody.rows[0]?.[0]);
     
      localStorage.setItem("@Portal/dash/ValorPedidos",response.data.responseBody.rows[0]?.[1]);
      
      atualizarConstantes()
      
         loadingDash = false
         loadingDashObserver.notify(loadingDash);
    

    })
    .catch((error) => {
      console.log("erro dados", error);
     
         loadingDash = false
         loadingDashObserver.notify(loadingDash);
    
      
    });
}
