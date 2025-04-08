const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const validarCampos = require('../middlewares/validacaoMiddleware');

// Validações
const validarRegistro = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  validarCampos
];

const validarAtualizacao = [
  body('nome').optional().notEmpty().withMessage('Nome não pode ser vazio'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('senha').optional().isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  validarCampos
];

const validarId = [
  param('id').isInt().withMessage('ID inválido'),
  validarCampos
];

// Rotas públicas
router.post('/auth/registrar', validarRegistro, usuarioController.registrar);
router.post('/auth/login', usuarioController.login);

// Rotas protegidas
router.get('/usuarios', authMiddleware, usuarioController.listar);
router.get('/usuarios/me', authMiddleware, usuarioController.buscarMe);
router.get('/usuarios/:id', authMiddleware, validarId, usuarioController.buscarPorId);
router.put('/usuarios/:id', authMiddleware, validarId.concat(validarAtualizacao), usuarioController.atualizar);
router.delete('/usuarios/:id', authMiddleware, validarId, usuarioController.deletar);

module.exports = router;
