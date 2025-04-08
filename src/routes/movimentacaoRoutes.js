const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas protegidas
router.post('/movimentacoes', authMiddleware, movimentacaoController.criarMovimentacao);
router.get('/movimentacoes', authMiddleware, movimentacaoController.listarMovimentacoes);

module.exports = router;
