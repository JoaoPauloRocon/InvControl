const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// GET - Listar todos os produtos
router.get('/', produtoController.listarProdutos);

// GET - Buscar produto por ID
router.get('/:id', produtoController.buscarPorId);

// POST - Criar novo produto
router.post('/', produtoController.criarProduto);

// PUT - Atualizar produto
router.put('/:id', produtoController.atualizarProduto);

// DELETE - Remover produto
router.delete('/:id', produtoController.deletarProduto);

module.exports = router;
