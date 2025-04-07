const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models').Usuario;

const segredo = 'seuSegredoJWT'; // depois podemos colocar em variáveis de ambiente

module.exports = {
  async registrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const novoUsuario = await Usuario.create({ nome, email, senha });
      res.status(201).json({ mensagem: 'Usuário registrado com sucesso', usuario: novoUsuario });
    } catch (erro) {
      res.status(400).json({ erro: 'Erro ao registrar usuário', detalhe: erro.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({ erro: 'Usuário não encontrado' });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ erro: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, segredo, { expiresIn: '1d' });
      res.json({ mensagem: 'Login bem-sucedido', token });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao fazer login', detalhe: erro.message });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: erro.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
      res.json(usuario);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
      await usuario.update(req.body);
      res.json({ mensagem: 'Usuário atualizado com sucesso', usuario });
    } catch (erro) {
      res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhe: erro.message });
    }
  },

  async deletar(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
      await usuario.destroy();
      res.json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao deletar usuário', detalhe: erro.message });
    }
  }
};
