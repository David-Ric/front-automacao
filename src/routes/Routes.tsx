import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import CadUsuarios from '../pages/Usuario';
import Home from '../pages/Home';
import RecuperarSenha from '../pages/Recuperar-Senha';
import { iDadosUsuario, iPaginas } from '../@types';
import RedefinirSenha from '../pages/Redefinir-Senha';
import MeuPerfil from '../pages/Meu-Perfil';
import CadastroGruposProdutos from '../pages/Grupo-Produto';
import CadastroParceiros from '../pages/Parceiro';
import CadastroProdutos from '../pages/Produto';
import CadastroVendedores from '../pages/Vendedor';
import CadastroConcorrentes from '../pages/Concorrentes';
import CadastroProdutosConcorrentes from '../pages/Produto-Concorrente';
import CadastroTipoNegociacao from '../pages/Tipo-Negociacao';
import TabelaPreco from '../pages/Tabela-Preco';
import CadastroTipoEmpresa from '../pages/Empresa';
import CadastroTabelaPrecoCliente from '../pages/Tabela-Preco-Cliente';
import CadastroPaginasBase from '../pages/Pagina-Base';
import MontarMenu from '../pages/Montar-Menu';
import GrupoUsuarios from '../pages/Grupo-Usuario';
import PedidoVendas from '../pages/Pedido';
import Orcamento from '../pages/Orcamento';
import Dashboard from '../pages/Dashboard';
import Configuracoes from '../pages/Configuracao';
import RelatorioVendedor from '../pages/Relatorio-Vendedor';
import AreaColaborador from '../pages/Area-Colaborador';
import AcompanhamentoPedido from '../pages/Acompanhamento-Pedido';
import ComunicacaoInterna from '../pages/Comunicacao-Interna';
import Comissoes from '../pages/Comissoes';
import ComunicacaoComercial from '../pages/Comunicacao-Comercial';
import Chat from '../pages/Chat';
import CadastroTelas from '../pages/Novas-Telas';
import PaginaDefault from '../pages/Pagina-Default';
import Sessoes from '../pages/Sessao';
import LogAcao from '../pages/Log-Acao/LogAcao';
import AcompanhamnetoVendas from '../pages/Acompanhamento-Vendas';
import Etiquetas from '../pages/Etiqueta';
import PedidosProcessar from '../pages/Pedidos-Em-Processo';
import Campanhas from '../pages/campanhas';
import CadastroRdvs from '../pages/Rdvs';
import RelPedNaoSeraFat from '../pages/Relatorio_PedNaoSeraFaturado';
import ConsultaPendencias from '../pages/Consulta-Pendencias';
import ConsultaClientes60d from '../pages/Consulta-Clientes-60d';
import EmailEnvioPedidos from '../pages/Email-Envio-Pedidos';
import AtualizacaoSankhya from '../pages/Atualizacao-Sankhya';
import ConfiguracaoUsuario from '../pages/Configuracao-Usuario';

export interface IApplicationProps {}
const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem('@Portal/usuario') || '{}'
);

const rotas: iPaginas[] = JSON.parse(
  localStorage.getItem('@Portal/paginaDefault') || '{}'
);

const Router: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter basename="/pga">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/meu-perfil" element={<MeuPerfil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/configuracao" element={<ConfiguracaoUsuario />} />
        <Route path="/atualizacao-sankhya" element={<AtualizacaoSankhya />} />
        <Route path="/relatorio-vendedor" element={<RelatorioVendedor />} />
        <Route path="/relpednaoserafat" element={<RelPedNaoSeraFat />} />
        <Route path="/espaco-colaborador" element={<AreaColaborador />} />
        <Route
          path="/acompanhamento-de-pedidos"
          element={<AcompanhamentoPedido />}
        />
        <Route path="/comunicacao-interna" element={<ComunicacaoInterna />} />
        <Route path="/comissoes" element={<Comissoes />} />
        <Route
          path="/comunicacao-interna-comercial"
          element={<ComunicacaoComercial />}
        />
        <Route path="/sessoes-em-uso" element={<Sessoes />} />
        <Route path="/log-acoes" element={<LogAcao />} />
        <Route path="/cadastro-usuarios" element={<CadUsuarios />} />
        <Route
          path="/cadastro-grupos-produtos"
          element={<CadastroGruposProdutos />}
        />
        <Route path="/cadastro-grupo-usuarios" element={<GrupoUsuarios />} />
        <Route path="/cadastro-parceiros" element={<CadastroParceiros />} />
        <Route path="/cadastro-produtos" element={<CadastroProdutos />} />
        <Route
          path="/produtos-concorrentes"
          element={<CadastroProdutosConcorrentes />}
        />
        <Route
          path="/cadastro-concorrentes"
          element={<CadastroConcorrentes />}
        />
        <Route
          path="/cadastro-Rdv"
          element={<CadastroRdvs />}
        />
        <Route path="/cadastro-vendedores" element={<CadastroVendedores />} />
        <Route
          path="/cadastro-tipo-negociacao"
          element={<CadastroTipoNegociacao />}
        />
        <Route path="/tabela-de-preco" element={<TabelaPreco />} />
        <Route
          path="/cadastro-tipo-empresa"
          element={<CadastroTipoEmpresa />}
        />
        <Route
          path="/tabela-de-preco-cliente"
          element={<CadastroTabelaPrecoCliente />}
        />
        <Route path="/cadastro-de-paginas" element={<CadastroPaginasBase />} />
        <Route path="/montar-menu" element={<MontarMenu />} />
        <Route path="/cadastro-telas" element={<CadastroTelas />} />
        <Route path="/tela/:parametro" element={<PaginaDefault />} />
        <Route
          path="/acompanhamento-vendas"
          element={<AcompanhamnetoVendas />}
        />
        <Route path="/etiquetas" element={<Etiquetas />} />
        <Route path="/pedido_vendas" element={<PedidoVendas />} />
        <Route path="/orcamento" element={<Orcamento />} />
        <Route path="/emails-envio-pedidos" element={<EmailEnvioPedidos />} />
        <Route path="/consulta-pendencias" element={<ConsultaPendencias />} />
        <Route
          path="/consulta-clientes-60d"
          element={<ConsultaClientes60d />}
        />
        <Route
          path="/pedidos-em-processamento"
          element={<PedidosProcessar />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/acompanhamento-de-campanhas" element={<Campanhas />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
