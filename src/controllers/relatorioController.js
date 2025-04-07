const { MovimentacaoEstoque, Produto } = require('../models');
const { Op } = require('sequelize');

async function gerarRelatorio(req, res) {
  const { produto_id, dataInicial, dataFinal } = req.query;

  try {
    const where = {};

    if (produto_id) {
      where.produto_id = produto_id;
    }

    if (dataInicial || dataFinal) {
      where.data = {};
      if (dataInicial) {
        where.data[Op.gte] = new Date(dataInicial);
      }
      if (dataFinal) {
        where.data[Op.lte] = new Date(dataFinal);
      }
    }

    const movimentacoes = await MovimentacaoEstoque.findAll({
      where,
      include: {
        model: Produto,
        as: 'produto', // <- adiciona o alias aqui!
        attributes: ['nome']
      },
      order: [['data', 'DESC']]
    });

    res.json(movimentacoes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao gerar relatório', detalhe: erro.message });
  }
}

module.exports = { gerarRelatorio };
