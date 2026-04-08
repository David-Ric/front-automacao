import internal from 'stream';

export interface iDadosUsuario {
  id: number;
  username: string;
  email: string;
  grupoId: number;
  status: string;
  funcao: string;
  password: string;
  nomeCompleto: string;
  token: string;
  imagemURL: string;
  primeiroLoginAdm: boolean;
  tempoSessao: number;
}
export interface iUsuarios {
  id: number;
  username: string;
  nomeCompleto: string;
  grupoId: number;
  funcao: string;
  email: string;
  telefone: string;
  imagemURL: string;
  status: string;
  primeiroLoginAdm: boolean;
  tempoSessao: number;
  grupoUsuario: {
    id: number;
    nome: string;
  };
  menuPermissao: [
    {
      id: number;
      usuarioId: number;
      codigo: number;
      nome: string;
      subMenuPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          usuarioId: number;
          paginaPermissao: [
            {
              id: number;
              codigo: number;
              nome: string;
              menuPermissaoId: number;
              subMenuPermissaoId: number;
              usuarioId: number;
            }
          ];
        }
      ];
      paginaPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          subMenuPermissaoId: number;
          usuarioId: number;
        }
      ];
    }
  ];
}

export interface iGrupos {
  id: number;
  nome: string;
}

export interface iTipoNegociacao {
  id: number;
  descricao: string;
  atualizadoEm: string;
  Natureza: string;
}
export interface iConcorrentes {
  id: number;
  nome: string;
  atualizadoEm: string;
}
export interface iProdutoConcorrente {
  id: number;
  codProduto: string;
  nomeProduto: string;
  codConcorrente: string;
  nomeConcorrente: string;
  codProdutoConcorrente: string;
  nomeProdutoSimilar: string;
  atualizadoEm: string;
}
export interface iParceiros {
  id: number;
  codParceiro: number;
  nome: string;
  tipoPessoa: string;
  TipoParceiro: string;
  nomeFantasia: string;
  cnpj_Cpf: string;
  email: string;
  fone: string;
  canal: string;
  classificacao: string;
  tamanhoLoja: string;
  endereco: string;
  bairro: string;
  municipio: string;
  uf: string;
  lat: string;
  long: string;
  status: string;
  semVisita: boolean;
  primeiraSem: boolean;
  segundaSem: boolean;
  terceiraSem: boolean;
  quartaSem: boolean;
  quintaSem: boolean;
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  sabado: boolean;
  tipoNegociacao: string;
  empresa: string;
  codVendedor: number;
  lc: number;
  sc: number;
  atualizadoEm: string;
  descTipoNegociacao: string;
  tabelaPrecoParceiro: [
    {
      id: number;
      empresaId: number;
      empresa: {
        id: number;
        descricao: string;
        atualizadoEm: string;
      };
      parceiroId: number;
      tabelaPrecoId: number;
      tabelaPreco: {
        id: number;
        codigo: number;
        descricao: string;
        dataInicial: string;
        dataFinal: string;
        itemTabela: [
          {
            id: number;
            tabelaPrecoId: number;
            idProd: number;
            preco: number;
            produtos: {
              id: number;
              nome: string;
              grupoProdutoId: number;
              grupoProduto: {
                id: number;
                nome: string;
                atualizadoEm: string;
              };
              atualizadoEm: string;
            };
            atualizadoEm: string;
          }
        ];
        atualizadoEm: string;
      };
      atualizadoEm: string;
    }
  ];
}

export interface iDocumento {
  id: number;
  usuarioId?: number | null;
  parceiroId?: number | null;
  nomeArquivo: string;
  contentType: string;
  tamanhoBytes: number;
  criadoEm: string;
  descricao?: string | null;
  urlArquivo: string;
}
export interface iVendedores {
  id: number;
  codVendedor: number;
  nome: string;
  status: string;
  regiao: string;
  email: string;
  tipo: string;
  atuaCompras: boolean;
  atualizadoEm: string;
}

export interface iRdvs {
  id: number;
  nomeCliente: string;
  observacao: string;
  municipio: string;
  uf: string;
  data: string;
  horaIni: string;
  horaFin: string;
  objetivo: string;
  vendedorId: string;
  km: string;
}


export interface iDataSelect {
  value?: string;
  label?: string;
}

export interface iProdutos {
  id: number;
  codigo: string;
  nome: string;
  grupoProdutoId: number;
  grupoProduto: {
    id: number;
    nome: string;
    atualizadoEm: string;
  };
  atualizadoEm: string;
  conv: number;
  tipoUnid: string;
  tipoUnid2: string;
}

export interface IFile {
  uploaded?: boolean;
  preview: string;
  name?: string;
  file: File | Blob | string;
  progress?: number;
  error?: boolean;
  url: string;
}

export interface ITabelaPreco {
  id: number;
  codigo: number;
  descricao: string;
  dataInicial: string;
  dataFinal: string;
  atualizadoEm: string;
  itemTabela: [
    {
      id: number;
      idTabelaPreco: number;
      idProd: number;
      atualizadoEm: string;
      produtos: {
        id: number;
        codigo: string;
        nome: string;
        idGrupo: string;
        nomeGrupo: string;
      };
      preco: number;
    }
  ];
}
export interface IItemTabelaPreco {
  id: number;
  idTabelaPreco: number;
  idProd: number;
  atualizadoEm: string;
  produtos: {
    id?: number;
    nome: string;
    tipoUnid: string;
    tipoUnid2: string;
    grupoProdutoId: number;
    conv: number;
    aliIpi: number;
  };
  preco: number;
}
export interface iEmpresa {
  id: number;
  descricao: string;
  atualizadoEm: string;
}
export interface iTabelaCliente {
  id: number;
  codEmpresa: number;
  codParceiro: number;
  atualizadoEm: string;
  parceiros: {
    id: number;
    nome: string;
  };
  codTabelaPreco: number;
  tabelaPreco: {
    id: number;
    codigo: number;
    descricao: string;
  };
}
export interface iPaginaBase {
  id: number;
  codigo: number;
  nome: string;
  url: string;
  icon: string;
}
export interface iMenu {
  id: number;
  codigo: number;
  ordem: number;
  nome: string;
  icon: string;
  subMenu: [
    {
      id: number;
      codigo: number;
      ordem: number;
      nome: string;
      icon: string;
      menuId: number;
      pagina: [
        {
          id: number;
          codigo: number;
          nome: string;
          url: string;
          icon: string;
          menuId: number;
          subMenuId: number;
        }
      ];
    }
  ];
  pagina: [
    {
      id: number;
      codigo: number;
      nome: string;
      url: string;
      icon: string;
      menuId: number;
      subMenuId: number;
    }
  ];
}
export interface iSubMenu {
  id: number;
  codigo: number;
  ordem: number;
  nome: string;
  icon: string;
  menuId: number;
  pagina: [
    {
      id: number;
      codigo: number;
      nome: string;
      url: string;
      icon: string;
      menuId: number;
      subMenuId: number;
    }
  ];
}
export interface iPaginas {
  id: number;
  codigo: number;
  nome: string;
  url: string;
  icon: string;
  menuId: number;
  subMenuId: number;
}

export interface IMenuPermissao {
  id: number;
  usuarioId: number;
  codigo: number;
  nome: string;
  subMenuPermissao: [
    {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      usuarioId: number;
      paginaPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          subMenuPermissaoId: number;
          usuarioId: number;
        }
      ];
    }
  ];
  paginaPermissao: [
    {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      subMenuPermissaoId: number;
      usuarioId: number;
    }
  ];
}
export interface iSubMenuPermissao {
  id: number;
  codigo: number;
  nome: string;
  menuPermissaoId: number;
  usuarioId: number;
  paginaPermissao: [
    {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      subMenuPermissaoId: number;
      usuarioId: number;
    }
  ];
}
export interface iPaginaPermissao {
  id: number;
  codigo: number;
  nome: string;
  menuPermissaoId: number;
  subMenuPermissaoId: number;
  usuarioId: number;
}
export interface iGrupoUsuario {
  id: number;
  nome: string;
  tempoSessao: number;
  menuPermissao: [
    {
      id: number;
      usuarioId: number;
      grupoUsuarioId: number;
      codigo: number;
      nome: string;
      subMenuPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          paginaPermissao: [
            {
              id: number;
              codigo: number;
              nome: string;
              menuPermissaoId: number;
              subMenuPermissaoId: number;
              usuarioId: number;
              grupoUsuarioId: number;
            }
          ];
          usuarioId: number;
          grupoUsuarioId: number;
        }
      ];
      paginaPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          subMenuPermissaoId: number;
          usuarioId: number;
          grupoUsuarioId: number;
        }
      ];
    }
  ];
  subMenuPermissao: [
    {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      paginaPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          subMenuPermissaoId: number;
          usuarioId: number;
          grupoUsuarioId: number;
        }
      ];
      usuarioId: number;
      grupoUsuarioId: number;
    }
  ];
  paginaPermissao: [
    {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      subMenuPermissaoId: number;
      usuarioId: number;
      grupoUsuarioId: number;
    }
  ];
}
export interface iTabelaParceiro {
  id: number;
  empresaId: number;
  empresa: {
    id: number;
    descricao: string;
    atualizadoEm: string;
  };
  parceiroId: number;
  tabelaPrecoId: number;
  tabelaPreco: {
    id: number;
    codigo: number;
    descricao: string;
    dataInicial: string;
    dataFinal: string;
    itemTabela: [
      {
        id: number;
        tabelaPrecoId: number;
        idProd: number;
        preco: number;
        produtos: {
          id: number;
          nome: string;
          grupoProdutoId: number;
          grupoProduto: {
            id: number;
            nome: string;
            atualizadoEm: string;
          };
          atualizadoEm: string;
        };
        atualizadoEm: string;
      }
    ];
    atualizadoEm: string;
  };
  atualizadoEm: string;
}

export interface iPedidoVenda {
  id: number;
  filial: string;
  lote: string;
  vendedorId: number;
  vendedor: {
    id: number;
    nome: string;
    status: string;
    regiao: string;
    email: string;
    tipo: string;
    atuaCompras: boolean;
    atualizadoEm: string;
  };
  parceiroId: number;
  parceiro: {
    id: number;
    codParceiro: number;
    nome: string;
    tipoPessoa: string;
    nomeFantasia: string;
    cnpj_Cpf: string;
    email: string;
    fone: string;
    canal: string;
    classificacao: string;
    tamanhoLoja: string;
    endereco: string;
  };
  palMPV: string;
  tipoNegociacaoId: number;
  tipoNegociacao: {
    id: number;
    codigo: number;
    descricao: string;
    atualizadoEm: string;
  };
  data: string;
  valor: number;
  dataEntrega: string;
  observacao: string;
  baixado: string;
  pedido: string;
  status: string;
}
export interface iItemPedidoVendaBD {
  descProduto: string;
  id: number;
  filial: string;
  vendedorId: number;
  palMPV: string;
  produtoId: number;
  grupoProdutoId: number;
  quant: number;
  valUnit: number;
  valTotal: number;
  baixado: string;
}
export interface iItemPedidoVenda {
  id: number;
  filial: string;
  vendedorId: number;
  palMPV: string;
  produtoId: number;
  produto: {
    id: number;
    nome: string;
    tipoUnid: string;
    tipoUnid2: string;
    conv: number;
    aliIpi: number;
  };
  grupoProdutoId: number;
  quant: number;
  valUnit: number;
  valTotal: number;
  baixado: string;
  inativo?: string;
}
export interface iTitulo {
  dataEmissao: string;
  dataVencim: string;
  empresaId: number;
  id: number;
  nuUnico: number;
  parceiroId: number;
  parcela: number;
  valor: number;
}
export interface iResponseBody {
  objeto: [
    {
      row: [];
    }
  ];
}
export interface Lista {
  0: string;
  1: number;
  2: string;
  3: string;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
  20: number;
}

export interface ResponseAPI {
  listas: Lista[][];
}
export interface ICabecalho2 {
  id: number;
  vendedorId: number;
  parceiroId: number;
  filial: string;
  palMPV: string;
  status: string;
  tipPed: string;
  tipoNegociacaoId: number;
  data: string;
  pedido: string;
  valor: number;
  dataEntrega: string;
  observacao: string;
  ativo: string;
  quant_Itens?: number | null;
  log_Envio?: string | null;
}
export interface ICabecalho {
  vendedorId: number;
  parceiroId: number;
  filial: string;
  palMPV: string;
  status: string;
  tipPed: string;
  tipoNegociacaoId: number;
  data: string;
  pedido: string;
  valor: number;
  dataEntrega: string;
  observacao: string;
  ativo: string;
  versao: string;
  quant_Itens?: number | null;
  log_Envio?: string | null;
}
export interface IItensArrayPedido {
  vendedorId: number;
  palMPV: string;
  produtoId: number;
  descProduto: string;
  produto: {
    nome: string;
    aliIpi: number;
    conv: number;
    tipoUnid: string;
    tipoUnid2: string;
  };
  quant: number;
  valUnit: number;
  valTotal: number;
  unidade: string;
  inativo?: string;
}
export interface IItenPedidoSalvar {
  vendedorId: number;
  palMPV: string;
  produtoId: number;
  quant: number;
  valUnit: number;
  valTotal: number;
  baixado: string;
  filial?: string;
  inativo?: string;
}

export interface IComunicado {
  id: number;
  titulo: string;
  texto: string;
}
export interface IPermissoesRH {
  id: number;
  grupoid: number;
}

export interface IComunicadocomercial {
  id: number;
  titulo: string;
  texto: string;
  grupoId: number;
  criadoEm: string;
}

export interface IColunasModulo {
  id?: number;
  nome: string;
  tipo: string;
  tipoInput: string;
  tabInput: string;
  valueTabInput: string;
  labelTabInput: string;
  chavePrimaria: boolean;
  automatico: boolean;
  expressao: string;
  opcaoCampo?: [
    {
      id: number;
      valor: string;
      opcao: string;
      nomeCampo: string;
      colunaModuloId: number;
    }
  ];
}

export interface IModulo {
  id: number;
  menuAdminId: number;
  subMenuAdminId: number;
  menuId: number;
  descricao: string;
  tabela: string;
  getSql: string;
  insert: boolean;
  update: boolean;
  delete: boolean;
  icone: string;
  filtro1: string;
  filtro2: string;
  filtro3: string;
}
export interface IOpcao {
  valor: string;
  opcao: string;
  nomeCampo: string;
  colunaModuloId?: number;
}

export interface DashGrafico {
  graficoTotal: [];
  valorAnterior: [];
  valorAtual: [];
  valorTotalAno: 0;
}
