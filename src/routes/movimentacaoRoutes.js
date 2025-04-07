const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');

router.post('/movimentacoes', movimentacaoController.criarMovimentacao);
router.get('/movimentacoes', movimentacaoController.listarMovimentacoes);

module.exports = router;
