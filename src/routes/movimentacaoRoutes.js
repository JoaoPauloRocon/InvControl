const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const movimentacaoController = require('../controllers/movimentacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const validarCampos = require('../middlewares/validacaoMiddleware');

// Validações
const validarMovimentacao = [
  body('tipo')
    .isIn(['entrada', 'saida'])
    .withMessage('Tipo deve ser "entrada" ou "saida"'),
  body('quantidade')
    .isInt({ min: 1 })
    .withMessage('Quantidade deve ser um número inteiro positivo'),
  body('produto_id')
    .isInt()
    .withMessage('ID do produto deve ser um número inteiro'),
  validarCampos
];

// Rotas protegidas
router.post('/movimentacoes', authMiddleware, validarMovimentacao, movimentacaoController.criarMovimentacao);
router.get('/movimentacoes', authMiddleware, movimentacaoController.listarMovimentacoes);

module.exports = router;
