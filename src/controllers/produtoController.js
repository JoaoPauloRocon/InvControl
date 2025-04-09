const { Produto } = require('../models');

// Listar produtos
const listarProdutos = async (req, res) => {
  try {
    let produtos;
    if (req.usuario.isAdmin) {
      produtos = await Produto.findAll(); // Admin vê todos
    } else {
      produtos = await Produto.findAll({
        where: { usuario_id: req.usuario.id }
      });
    }
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos', detalhe: error.message });
  }
};

// Criar produto
const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade } = req.body;
    const novoProduto = await Produto.create({
      nome,
      descricao,
      preco,
      quantidade,
      usuario_id: req.usuario.id
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar produto', detalhe: error.message });
  }
};

// Buscar produto por ID
const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    if (!req.usuario.isAdmin && produto.usuario_id !== req.usuario.id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produto', detalhe: error.message });
  }
};

// Atualizar produto
const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade } = req.body;

    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    if (!req.usuario.isAdmin && produto.usuario_id !== req.usuario.id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    await produto.update({ nome, descricao, preco, quantidade });
    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar produto', detalhe: error.message });
  }
};

// Deletar produto
const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    if (!req.usuario.isAdmin && produto.usuario_id !== req.usuario.id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    await produto.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar produto', detalhe: error.message });
  }
};

module.exports = {
  listarProdutos,
  criarProduto,
  buscarPorId,
  atualizarProduto,
  deletarProduto
};
