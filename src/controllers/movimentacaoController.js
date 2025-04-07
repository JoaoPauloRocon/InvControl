const { MovimentacaoEstoque, Produto } = require('../models');

const criarMovimentacao = async (req, res) => {
  try {
    const { tipo, quantidade, data, produto_id } = req.body;

    const produto = await Produto.findByPk(produto_id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

    // Atualiza o estoque
    if (tipo === 'entrada') {
      produto.quantidade += quantidade;
    } else if (tipo === 'saida') {
      if (produto.quantidade < quantidade) {
        return res.status(400).json({ erro: 'Quantidade insuficiente em estoque' });
      }
      produto.quantidade -= quantidade;
    } else {
      return res.status(400).json({ erro: 'Tipo inválido. Use "entrada" ou "saida".' });
    }

    await produto.save();

    // Cria movimentação
    const movimentacao = await MovimentacaoEstoque.create({
      tipo,
      quantidade,
      data,
      produto_id
    });

    res.status(201).json(movimentacao);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao registrar movimentação' });
  }
};

const listarMovimentacoes = async (req, res) => {
  try {
    const movimentacoes = await MovimentacaoEstoque.findAll();
    res.json(movimentacoes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar movimentações' });
  }
};

module.exports = {
  criarMovimentacao,
  listarMovimentacoes
};
