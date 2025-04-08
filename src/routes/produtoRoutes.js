const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');
const validarCampos = require('../middlewares/validacaoMiddleware');

// Validações
const validarProduto = [
  body('nome').notEmpty().withMessage('Nome do produto é obrigatório'),
  body('quantidade').isInt({ min: 0 }).withMessage('Quantidade deve ser um número inteiro positivo'),
  body('preco').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
  validarCampos
];

const validarId = [
  param('id').isInt().withMessage('ID inválido'),
  validarCampos
];

// Rotas protegidas
router.get('/', authMiddleware, produtoController.listarProdutos);
router.get('/:id', authMiddleware, validarId, produtoController.buscarPorId);
router.post('/', authMiddleware, validarProduto, produtoController.criarProduto);
router.put('/:id', authMiddleware, validarId.concat(validarProduto), produtoController.atualizarProduto);
router.delete('/:id', authMiddleware, validarId, produtoController.deletarProduto);

module.exports = router;
