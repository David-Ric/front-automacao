import { openDB, DBSchema } from 'idb';

interface PgamobileDB extends DBSchema {
  usuario: {
    key: number;
    value: {
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
    };
  };
  usuarioPermissaoMenu: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
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
      usuarioId: number;
    };
  };
  usuarioPermissaoPagina: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      subMenuPermissaoId: number;
      usuarioId: number;
    };
  };
  grupoPermissaoMenu: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
      paginaPermissao: [
        {
          id: number;
          codigo: number;
          nome: string;
          menuPermissaoId: number;
          subMenuPermissaoId: number;
          grupoUsuarioId: number;
        }
      ];
      grupoUsuarioId: number;
    };
  };
  grupoPermissaoPagina: {
    key: number;
    value: {
      id: number;
      codigo: number;
      nome: string;
      menuPermissaoId: number;
      subMenuPermissaoId: number;
      grupoUsuarioId: number;
    };
  };
  grafico: {
    key: number;
    value: {
      id: number;
      Mes: string;
      AnoAtual: number;
      AnoAnterior: number;
    };
  };
  vendaMeta: {
    key: number;
    value: {
      id: number;
      month: string;
      meta: number;
      actual: number;
      color: string;
    };
  };
  valorAnterior: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorAtual: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  metaMes: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  vendaMes: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  quantFaturar: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorFaturar: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  quantPedidoOrcamento: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorPedidoOrcamento: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  quantPedidos: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorTotalAno: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  valorPedidos: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  clienteSemVenda: {
    key: number;
    value: {
      id: number;
      valor: number;
    };
  };
  vendedor: {
    key: number;
    value: {
      id: number;
      codVendedor: number;
      nome: string;
      status: string;
      regiao: string;
      email: string;
      tipo: string;
      atuaCompras: boolean;
      atualizadoEm: string;
    };
  };
  tipoNegociacao: {
    key: number;
    value: {
      id: number;
      descricao: string;
      atualizadoEm: string;
      Natureza: string;
    };
  };
  parceiro: {
    key: number;
    value: {
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
      bairro: string;
      municipio: string;
      uf: string;
      lat: string;
      long: string;
      lc: number;
      sc: number;
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
                  tipoUnid: string;
                  tipoUnid2: string;
                  conv: number;
                  grupoProdutoId: number;
                  ipi: number;
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
      titulo: [
        {
          id: number;
          empresaId: number;
          parceiroId: number;
          nuUnico: number;
          parcela: number;
          dataEmissao: string;
          dataVencim: string;
          valor: number;
        }
      ];
      atualizadoEm: string;
    };
  };
  grupoProduto: {
    key: number;
    value: {
      id: number;
      nome: string;
      atualizadoEm: string;
    };
  };
  produto: {
    key: number;
    value: {
      id: number;
      codigo: string;
      nome: string;
      grupoProdutoId: number;
      ipi: number;
      grupoProduto: {
        id: number;
        nome: string;
        atualizadoEm: string;
      };
      atualizadoEm: string;
      conv: number;
      tipoUnid: string;
      tipoUnid2: string;
    };
  };
  tabelaPreco: {
    key: number;
    value: {
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
    };
  };
  itemTabela: {
    key: number;
    value: {
      id: number;
      tabelaPrecoId: number;
      idProd: number;
      preco: number;
      produtos: {
        id: number;
        nome: string;
        tipoUnid: string;
        tipoUnid2: string;
        conv: number;
        grupoProdutoId: number;
        ipi: number;
        grupoProduto: {
          id: number;
          nome: string;
          atualizadoEm: string;
        };
        atualizadoEm: string;
      };
      atualizadoEm: string;
    };
  };
  tabelaPrecoParceiro: {
    key: number;
    value: {
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
              tipoUnid: string;
              tipoUnid2: string;
              conv: number;
              grupoProdutoId: number;
              ipi: number;
              grupoProduto: {
                id: number;
                nome: string;
                atualizadoEm?: string;
              };
              atualizadoEm?: string;
            };
            atualizadoEm?: string;
          }
        ];
        atualizadoEm?: string;
      };
      atualizadoEm?: string;
    };
  };
  titulo: {
    key: number;
    value: {
      dataEmissao: string;
      dataVencim: string;
      empresaId: number;
      id: number;
      nuUnico: number;
      parceiroId: number;
      parcela: number;
      valor: number;
    };
  };
  cabecalhoPedidoVenda: {
    key: number;
    value: {
      id: number;
      filial: string;
      lote: string;
      vendedorId: number;
      palMPV: string;
      tipoNegociacaoId: number;
      parceiroId: number;
      data: string;
      valor: number;
      dataEntrega: string;
      observacao: string;
      ativo: string;
      baixado: string;
      pedido: string;
      status: string;
      tipPed: string;
      sincronizado?: string;
      quant_Itens?: number | null;
      log_Envio?: string | null;
    };
  };
  itemPedidoVenda: {
    key: number;
    indexes: { palMPV: string };
    value: {
      id: number;
      vendedorId: number;
      palMPV: string;
      produtoId: number;
      descProduto: string;
      quant: number;
      valUnit: number;
      valTotal: number;
      unidade: string;
      sincronizado?: string;
      inativo?: string;
    };
  };
  tabelaPrecoAdicional: {
    key: number;
    value: {
      id: number;
      empresaId: number;
      idProd: number;
      produtos: {
        id: number;
        codigo: string;
        nome: string;
        idGrupo: string;
        nomeGrupo: string;
      };
      parceiroId: number;
      preco: number;
      atualizadoem: string;
    };
  };
  deleteList: {
    key: number;
    value: {
      id: number;
      palMPV: string;
      excluido: string;
    };
  };
}

export const versao = 9;
export const versaoFront = '1.1.056';

let criarBancoDadosPromise: Promise<void> | null = null;
export async function criarBancoDados() {
  if (criarBancoDadosPromise) return criarBancoDadosPromise;

  criarBancoDadosPromise = (async () => {
    const db = await openDB<PgamobileDB>('pgamobile', versao, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('usuario')) {
          db.createObjectStore('usuario', { keyPath: 'id' });
        }
        if (db.objectStoreNames.contains('grafico')) {
          db.deleteObjectStore('grafico');
        }
        if (db.objectStoreNames.contains('vendaMeta')) {
          db.deleteObjectStore('vendaMeta');
        }
        if (!db.objectStoreNames.contains('usuarioPermissaoMenu')) {
          db.createObjectStore('usuarioPermissaoMenu', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains('usuarioPermissaoPagina')) {
          db.createObjectStore('usuarioPermissaoPagina', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains('grupoPermissaoMenu')) {
          db.createObjectStore('grupoPermissaoMenu', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains('grupoPermissaoPagina')) {
          db.createObjectStore('grupoPermissaoPagina', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (db.objectStoreNames.contains('valorAnterior')) {
          db.deleteObjectStore('valorAnterior');
        }
        if (db.objectStoreNames.contains('valorAtual')) {
          db.deleteObjectStore('valorAtual');
        }
        if (db.objectStoreNames.contains('metaMes')) {
          db.deleteObjectStore('metaMes');
        }
        if (db.objectStoreNames.contains('vendaMes')) {
          db.deleteObjectStore('vendaMes');
        }
        if (db.objectStoreNames.contains('quantFaturar')) {
          db.deleteObjectStore('quantFaturar');
        }
        if (db.objectStoreNames.contains('valorFaturar')) {
          db.deleteObjectStore('valorFaturar');
        }
        if (db.objectStoreNames.contains('quantPedidoOrcamento')) {
          db.deleteObjectStore('quantPedidoOrcamento');
        }
        if (db.objectStoreNames.contains('valorPedidoOrcamento')) {
          db.deleteObjectStore('valorPedidoOrcamento');
        }
        if (db.objectStoreNames.contains('quantPedidos')) {
          db.deleteObjectStore('quantPedidos');
        }
        if (db.objectStoreNames.contains('valorPedidos')) {
          db.deleteObjectStore('valorPedidos');
        }
        if (db.objectStoreNames.contains('valorTotalAno')) {
          db.deleteObjectStore('valorTotalAno');
        }
        if (db.objectStoreNames.contains('clienteSemVenda')) {
          db.deleteObjectStore('clienteSemVenda');
        }
        if (!db.objectStoreNames.contains('parceiro')) {
          db.createObjectStore('parceiro', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('grupoProduto')) {
          db.createObjectStore('grupoProduto', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('produto')) {
          db.createObjectStore('produto', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('titulo')) {
          db.createObjectStore('titulo', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains('tabelaPreco')) {
          db.createObjectStore('tabelaPreco', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('itemTabela')) {
          db.createObjectStore('itemTabela', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tabelaPrecoParceiro')) {
          db.createObjectStore('tabelaPrecoParceiro', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tipoNegociacao')) {
          db.createObjectStore('tipoNegociacao', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('cabecalhoPedidoVenda')) {
          db.createObjectStore('cabecalhoPedidoVenda', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains('itemPedidoVenda')) {
          db.createObjectStore('itemPedidoVenda', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains('tabelaPrecoAdicional')) {
          db.createObjectStore('tabelaPrecoAdicional', { keyPath: 'id' });
        }
      },
    });

    try {
      db.close();
    } catch {}
  })();

  try {
    await criarBancoDadosPromise;
  } catch (e) {
    criarBancoDadosPromise = null;
    throw e;
  }
}
