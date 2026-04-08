import React, { useEffect, useState } from 'react';
import '../../styles/global.scss';
import Table from 'react-bootstrap/Table';
import Paginacao from '../../components/Paginacao';
import api from '../../services/api';
import { iDadosUsuario } from '../../@types';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader';
import Footer from '../../components/Footer/Footer';
import FooterMobile from '../../components/Footer/FooterMobile';
import { moeda } from '../../Masks/Masks';
import { useNavigate } from 'react-router-dom';

export default function ConsultaPendencias() {
  const navigate = useNavigate();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const pageSizeFrontPendEnvio = 10;

  const [listaPendEnvio, setListaPendEnvio] = useState<any[]>([]);
  const [paginaPendEnvio, setPaginaPendEnvio] = useState(1);
  const [totalRegistrosPendEnvio, setTotalRegistrosPendEnvio] = useState(0);
  const [similaresEnviados, setSimilaresEnviados] = useState<{
    [palmpv: string]: any;
  }>({});
  const [parceiroDocs, setParceiroDocs] = useState<{
    [key: string]: { nome: string; cnpj: string };
  }>({});
  const [loadingListaPendEnvio, setLoadingListaPendEnvio] = useState(true);

  function normalizarStatusPedido(status: any) {
    const s = String(status || '').trim().toLowerCase();
    const sNorm = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (sNorm === 'nao enviado') return 'nao_enviado';
    if (sNorm === 'pendente') return 'pendente';
    return '';
  }

  function parseCabecalhoDataMs(v: any) {
    const s = String(v || '').trim();
    if (!s) return null;
    const m =
      /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/.exec(
        s
      );
    if (!m) {
      const d = new Date(s);
      const ms = d.getTime();
      return Number.isNaN(ms) ? null : ms;
    }
    const yyyy = Number(m[1]);
    const mm = Number(m[2]);
    const dd = Number(m[3]);
    const hh = Number(m[4]);
    const mi = Number(m[5]);
    const ss = Number(m[6]);
    const frac = String(m[7] || '');
    const ms = frac ? Number(frac.slice(0, 3).padEnd(3, '0')) : 0;
    const t = new Date(yyyy, mm - 1, dd, hh, mi, ss, ms).getTime();
    return Number.isNaN(t) ? null : t;
  }

  const formatarData = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const d = String(dateStr).split('T', 1)[0];
    const parts = d.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return d;
  };

  const selecionarPedido = (cab: any) => {
    try {
      localStorage.setItem(
        'ClienteEscolhido',
        String(cab?.parceiroId ?? '0')
      );
      localStorage.setItem('ClienteNome', String(cab?.parceiroNome ?? ''));
      localStorage.setItem('PedidoSelecionadoId', String(cab?.id ?? '0'));
      localStorage.setItem(
        'PedidoSelecionadoPALMPV',
        String(cab?.palMPV ?? '')
      );
      localStorage.setItem('PedidoInfoFilial', String(cab?.filial ?? ''));
      localStorage.setItem(
        'PedidoInfoTipoNegociacaoId',
        String(cab?.tipoNegociacaoId ?? '')
      );
      localStorage.setItem('PedidoInfoTipPed', String(cab?.tipPed ?? ''));
      localStorage.setItem(
        'PedidoInfoObservacao',
        String(cab?.observacao ?? '')
      );
      localStorage.setItem('@Portal/PedidoEmDigitacao', 'true');
    } catch {}
    navigate('/pedido_vendas');
  };

  useEffect(() => {
    if (!usuario?.token) {
      window.location.href = '/pga/';
      return;
    }
    setPaginaPendEnvio(1);
  }, []);

  useEffect(() => {
    if (!usuario?.token) return;
    (async () => {
      try {
        setLoadingListaPendEnvio(true);
        const codVendedor = usuario.username;
        const resp = await api.get(
          `/api/CabecalhoPedidoVenda/v2/pendencias/vendedor?pagina=${paginaPendEnvio}&totalpagina=${pageSizeFrontPendEnvio}&codVendedor=${codVendedor}`
        );
        setListaPendEnvio(resp?.data?.data ?? []);
        setTotalRegistrosPendEnvio(Number(resp?.data?.total ?? 0));
        setSimilaresEnviados({});
      } finally {
        setLoadingListaPendEnvio(false);
      }
    })();
  }, [paginaPendEnvio, usuario?.token]);

  useEffect(() => {
    (async () => {
      try {
        const ids = Array.from(
          new Set(
            (Array.isArray(listaPendEnvio) ? listaPendEnvio : [])
              .map((x: any) => x?.parceiroId)
              .filter((x: any) => x !== undefined && x !== null)
          )
        );
        const docsMap: { [key: string]: { nome: string; cnpj: string } } = {};
        await Promise.all(
          ids.map(async (id: any) => {
            try {
              const r = await api.get(`/api/Parceiro/${id}`);
              docsMap[String(id)] = {
                nome: String(r?.data?.nome ?? ''),
                cnpj: String(r?.data?.cnpj_Cpf ?? ''),
              };
            } catch {}
          })
        );
        setParceiroDocs(docsMap);
      } catch {}
    })();
  }, [listaPendEnvio]);

  return (
    <>
      <div className="content-global">
        <div className="conteudo-cotainner">
          <div className="">
            <SideNavBar />
          </div>
          <div>
            <NavbarDashHeader />
            <div className="titulo-page">
              <h1>LISTA DE PEDIDOS PENDENTES / NÃO ENVIADOS</h1>
            </div>
            <div style={{ justifyContent: 'center' }} className="contain d-flex">
              <div className="conteudo">
                <div className="table-responsive  tabela-responsiva-pedido-realizado">
                  <div className=" table-wrap">
                    <Table responsive className="table-global table  main-table">
                      <thead>
                        <tr className="tituloTab">
                          <th className="th1">Nº PALMPV</th>
                          <th style={{ textAlign: 'center' }} className="th1">
                            PED. SANKHYA
                          </th>
                          <th style={{ textAlign: 'center' }} className="th1">
                            VALOR
                          </th>
                          <th className="">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loadingListaPendEnvio ? (
                          <tr>
                            <td
                              colSpan={4}
                              style={{ textAlign: 'center', padding: 20 }}
                            >
                              Carregando dados...
                            </td>
                          </tr>
                        ) : listaPendEnvio?.length > 0 ? (
                          <>
                            {listaPendEnvio?.map(
                              (item: any, index: number) => (
                                <React.Fragment key={String(item?.id ?? index)}>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="bg-primary text-white"
                                    >
                                      {String(item?.parceiroId ?? '')}
                                      {' - '}
                                      {String(
                                        item?.parceiroNome ??
                                          parceiroDocs[String(item?.parceiroId)]
                                            ?.nome ??
                                          ''
                                      )}
                                      {' - '}
                                      {String(
                                        parceiroDocs[String(item?.parceiroId)]
                                          ?.cnpj ?? ''
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{ textAlign: 'center' }}
                                      className="id-grupo"
                                    >
                                      <div>{item?.palMPV}</div>
                                      <div style={{ fontSize: 12 }}>
                                        <span style={{ color: '#000' }}>
                                          Data pedido:{' '}
                                        </span>
                                        <span style={{ color: '#2031ed' }}>
                                          {formatarData(item?.data)}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      style={
                                        item.status?.trim() != 'Enviado' ||
                                        item?.pedido == item?.palMPV
                                          ? { color: 'red' }
                                          : {}
                                      }
                                      className=""
                                    >
                                      {item?.status?.trim() == 'Enviado' &&
                                      item?.pedido != item?.palMPV
                                        ? item.pedido
                                        : 'Nulo'}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                      R$: {moeda(item?.valor)}
                                    </td>
                                    <td className="th1">
                                      {['Processar', 'AProcessar'].includes(
                                        String(item?.status).trim()
                                      ) ? (
                                        <h2 className="textPend2">À Processar</h2>
                                      ) : normalizarStatusPedido(item?.status) ===
                                        'pendente' ? (
                                        <h2 className="textPendente2">Pendente</h2>
                                      ) : (
                                        <h2 className="textNEnviado2">
                                          Não Enviado
                                        </h2>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={4}>
                                      <div
                                        style={{
                                          marginTop: 8,
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          width: '100%',
                                        }}
                                      >
                                        {!!similaresEnviados[
                                          String(item?.palMPV ?? item?.id ?? '')
                                        ] &&
                                        !['Processar', 'AProcessar'].includes(
                                          String(item?.status || '').trim()
                                        ) ? (
                                          <button
                                            type="button"
                                            style={{
                                              backgroundColor: 'transparent',
                                              border: '1px solid #dc3545',
                                              color: '#dc3545',
                                              borderRadius: 12,
                                              padding: '4px 10px',
                                              fontSize: 12,
                                              fontWeight: 600,
                                              whiteSpace: 'nowrap',
                                            }}
                                            onClick={() => {
                                              const enviado =
                                                similaresEnviados[
                                                  String(
                                                    item?.palMPV ??
                                                      item?.id ??
                                                      ''
                                                  )
                                                ];
                                              if (enviado) {
                                                selecionarPedido(enviado);
                                              }
                                            }}
                                          >
                                            Existem pedidos similares ja
                                            enviados!
                                          </button>
                                        ) : (
                                          <div />
                                        )}
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => selecionarPedido(item)}
                                          style={{ width: 100 }}
                                        >
                                          Visualizar
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              )
                            )}
                          </>
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              style={{ textAlign: 'center', padding: 20 }}
                            >
                              Nenhum pedido pendente de envio.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <Paginacao
                      total={totalRegistrosPendEnvio}
                      limit={pageSizeFrontPendEnvio}
                      paginaAtual={paginaPendEnvio}
                      setPagina={setPaginaPendEnvio}
                    />
                  </div>
                </div>
                <button
                  style={{ width: 130, marginTop: 15 }}
                  className="btn btn-primary"
                  onClick={() => navigate('/espaco-colaborador')}
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterMobile />
    </>
  );
}
