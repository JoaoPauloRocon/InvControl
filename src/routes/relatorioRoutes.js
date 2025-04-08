const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota protegida
router.get('/relatorio-movimentacoes', authMiddleware, relatorioController.gerarRelatorio);

module.exports = router;
