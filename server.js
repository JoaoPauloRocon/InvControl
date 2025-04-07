// Imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const produtoRoutes = require('./src/routes/produtoRoutes');
const movimentacaoRoutes = require('./src/routes/movimentacaoRoutes');
const relatorioRoutes = require('./src/routes/relatorioRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota base
app.get('/', (req, res) => {
  res.send('🚀 InvControl API rodando com sucesso!');
});

// Registro das rotas
app.use('/produtos', produtoRoutes);
app.use(movimentacaoRoutes);
app.use(relatorioRoutes);
app.use(authRoutes);      // rotas /auth/registrar e /auth/login
app.use(usuarioRoutes);   // rotas /usuarios etc.

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
