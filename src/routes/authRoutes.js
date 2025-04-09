const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

// Middleware de validação
const validarRegistro = [
  body('nome').notEmpty().withMessage('O nome é obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

const validarLogin = [
  body('email').isEmail().withMessage('E-mail inválido'),
  body('senha').notEmpty().withMessage('A senha é obrigatória')
];

// Rotas de autenticação com validação
router.post('/register', validarRegistro, usuarioController.registrar);
router.post('/login', validarLogin, usuarioController.login);
router.post('/auth/refresh', authController.renovarToken);

module.exports = router;

