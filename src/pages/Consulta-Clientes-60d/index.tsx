import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/global.scss';
import Table from 'react-bootstrap/Table';
import Paginacao from '../../components/Paginacao';
import api from '../../services/api';
import { iDadosUsuario } from '../../@types';
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader';
import Footer from '../../components/Footer/Footer';
import FooterMobile from '../../components/Footer/FooterMobile';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { moeda } from '../../Masks/Masks';

export default function ConsultaClientes60d() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@Portal/usuario') || '{}'
  );

  const [todosItens, setTodosItens] = useState<any[]>([]);
  const [lista, setLista] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const pageSizeFront = 10;

  const [visivelFiltros, setVisivelFiltros] = useState(false);
  const [diasSemCompra, setDiasSemCompra] = useState('');
  const [loading, setLoading] = useState(true);

  const normalizarDias = (v: string) => {
    const t = String(v || '').trim();
    if (!t) return '';
    const n = Number(t);
    if (!Number.isFinite(n) || n <= 0) return '';
    return String(Math.trunc(n));
  };

  const filtrados = useMemo(() => {
    return todosItens;
  }, [todosItens]);

  useEffect(() => {
    if (!usuario?.token) {
      window.location.href = '/pga/';
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const codVendedor = usuario.username;
        const filtroDias =
          !diasSemCompra || isNaN(Number(diasSemCompra))
            ? 'dias >= 60'
            : `dias = ${Number(diasSemCompra)}`;
        const sql = `SELECT * FROM AD_VCLIENTES
          WHERE ${filtroDias}
           AND (VENCOD = ${codVendedor} OR ${codVendedor} IS NULL)
           AND VENCOD <> 0
           AND ATIVO = 1
           ORDER BY DIAS ASC`;
        const response = await api.post(
          `/api/Sankhya/DadosDashSankhya?sql=${encodeURIComponent(sql)}`
        );
        const data = response?.data?.responseBody?.rows || [];
        const result = data.map((curr: any) => {
          return {
            dias: curr[16],
            codpar: curr[4],
            nomepar: curr[5],
            cgc_cpf: curr[6],
            uf: curr[8],
            nomecid: curr[9],
            endereco: curr[10],
            complemento: curr[11],
            telefone: curr[12],
            email: curr[13],
            ult_nunota: curr[14],
            dtneg: curr[15],
            vlrnota: curr[17],
          };
        });
        setTodosItens(result);
      } finally {
        setLoading(false);
      }
    })();
  }, [diasSemCompra]);

  useEffect(() => {
    const startIndex = (pagina - 1) * pageSizeFront;
    const endIndex = startIndex + pageSizeFront;
    const paginated = filtrados.slice(startIndex, endIndex);
    setLista(paginated);
    setTotalPaginas(Math.max(1, Math.ceil(filtrados.length / pageSizeFront)));
  }, [filtrados, pagina]);

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
              <h1>CLIENTES SEM COMPRA 60D</h1>
            </div>
            <div style={{ justifyContent: 'center' }} className="contain d-flex">
              <div className="conteudo">
                <div className="pedido-selec">
                  <h1 style={{ marginTop: 5 }} className="pedidoNumber18">
                    Estes clientes estão há 60 dias sem compra. Em 30 dias poderão
                    ser inativados para venda.
                  </h1>
                </div>
                <div style={{ marginTop: 5 }} className="divbuttondrop">
                  <button
                    className="buttondropTitle"
                    onClick={() => setVisivelFiltros(!visivelFiltros)}
                  >
                    Filtros{' '}
                    {visivelFiltros ? (
                      <IoIosArrowUp fontSize={20} />
                    ) : (
                      <IoIosArrowDown fontSize={20} />
                    )}
                  </button>
                </div>
                {visivelFiltros ? (
                  <div style={{ marginTop: 10 }} className="barraPesquCoord">
                    <div className="d-flex">
                      <div className="bloco-input">
                        <p className="title-input">Qtd. Dias sem Vendas</p>
                        <input
                          className="form-control select inputparceiro  inputlogin"
                          type="num"
                          value={diasSemCompra}
                          placeholder="ex.: 60, 90, 96"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              setDiasSemCompra(
                                normalizarDias(
                                  (e.currentTarget as HTMLInputElement).value
                                )
                              );
                            }
                          }}
                          onChange={(e) => setDiasSemCompra(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-outline-dark btnCoord2"
                        onClick={() => setDiasSemCompra(normalizarDias(diasSemCompra))}
                      >
                        Atualizar
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="table-responsive  tabela-responsiva-pedido-realizado">
                  <div className=" table-wrap">
                    <Table responsive className="table-global table  main-table">
                      <thead>
                        <tr className="tituloTab">
                          <th className="th1">Dias</th>
                          <th className="th1">Código</th>
                          <th className="th1">Cliente</th>
                          <th className="th1">Última Compra</th>
                          <th className="th1">Valor</th>
                          <th className="th1">UF</th>
                          <th className="th1">Cidade</th>
                          <th className="th1">Telefone</th>
                          <th className="th1">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td
                              colSpan={9}
                              style={{ textAlign: 'center', padding: 20 }}
                            >
                              Carregando dados...
                            </td>
                          </tr>
                        ) : lista.length > 0 ? (
                          <>
                            {lista.map((item: any, idx: number) => (
                              <tr key={idx}>
                                <td
                                  className="th1"
                                  style={{ textAlign: 'right' }}
                                >
                                  {String(item?.dias ?? '')}
                                </td>
                                <td className="th1">
                                  {String(item?.codpar ?? '')}
                                </td>
                                <td className="th1">
                                  {String(item?.nomepar ?? '')}
                                </td>
                                <td className="th1">
                                  {String(item?.dtneg ?? '')}
                                </td>
                                <td className="th1">
                                  R$: {moeda(item?.vlrnota)}
                                </td>
                                <td className="th1">{String(item?.uf ?? '')}</td>
                                <td className="th1">
                                  {String(item?.nomecid ?? '')}
                                </td>
                                <td className="th1">
                                  {String(item?.telefone ?? '')}
                                </td>
                                <td className="th1">
                                  {String(item?.email ?? '')}
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={9}>
                              <div className="alert alert-warning" role="alert">
                                Nenhum registro encontrado.
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <Paginacao
                      total={totalPaginas}
                      limit={1}
                      paginaAtual={pagina}
                      setPagina={setPagina}
                    />
                  </div>
                </div>
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
