const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models').Usuario;
const segredo = process.env.JWT_SECRET;

module.exports = {
    async registrar(req, res) {
        try {
            const { nome, email, senha, isAdmin } = req.body;

            const novoUsuario = await Usuario.create({ nome, email, senha, isAdmin });
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

            // Corrigido aqui: usando isAdmin no payload do token
            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    isAdmin: usuario.isAdmin
                },
                segredo,
                { expiresIn: '1d' }
            );

            res.json({ mensagem: 'Login bem-sucedido', token });
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao fazer login', detalhe: erro.message });
        }
    },

    async listar(req, res) {
        try {
            if (!req.usuario.isAdmin) {
                return res.status(403).json({ erro: 'Acesso negado. Apenas administradores podem ver todos os usuários.' });
            }

            const usuarios = await Usuario.findAll({ attributes: { exclude: ['senha'] } });
            res.json(usuarios);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: erro.message });
        }
    },

    async buscarPorId(req, res) {
        try {
            const idSolicitado = parseInt(req.params.id);
            const idLogado = req.usuario.id;
            const isAdmin = req.usuario.isAdmin;

            if (!isAdmin && idSolicitado !== idLogado) {
                return res.status(403).json({ erro: 'Acesso negado' });
            }

            const usuario = await Usuario.findByPk(idSolicitado);
            if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

            res.json(usuario);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: erro.message });
        }
    },

    async buscarMe(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.usuario.id);
            if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json(usuario);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao buscar seus dados', detalhe: erro.message });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;

            if (!req.usuario.isAdmin && req.usuario.id != id) {
                return res.status(403).json({ erro: 'Acesso negado.' });
            }

            const usuario = await Usuario.findByPk(id);
            if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

            await usuario.update(req.body);
            res.json({ mensagem: 'Usuário atualizado com sucesso', usuario });
        } catch (erro) {
            res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhe: erro.message });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;

            if (!req.usuario.isAdmin && req.usuario.id != id) {
                return res.status(403).json({ erro: 'Acesso negado.' });
            }

            const usuario = await Usuario.findByPk(id);
            if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

            await usuario.destroy();
            res.json({ mensagem: 'Usuário deletado com sucesso' });
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao deletar usuário', detalhe: erro.message });
        }
    }
};
