const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

router.get('/relatorio-movimentacoes', relatorioController.gerarRelatorio);

module.exports = router;
