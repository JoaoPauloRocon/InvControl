const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas (não exigem token)
router.post('/auth/registrar', usuarioController.registrar);
router.post('/auth/login', usuarioController.login);

// Rotas protegidas (exigem token)
router.get('/usuarios', authMiddleware, usuarioController.listar);
router.get('/usuarios/me', authMiddleware, usuarioController.buscarMe);
router.get('/usuarios/:id', authMiddleware, usuarioController.buscarPorId);
router.put('/usuarios/:id', authMiddleware, usuarioController.atualizar);
router.delete('/usuarios/:id', authMiddleware, usuarioController.deletar);

module.exports = router;
