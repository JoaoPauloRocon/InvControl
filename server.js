// Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const produtoRoutes = require('./src/routes/produtoRoutes');
const movimentacaoRoutes = require('./src/routes/movimentacaoRoutes');
const relatorioRoutes = require('./src/routes/relatorioRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Helmet para segurança de headers
app.use(helmet());

// CORS - ajuste os domínios permitidos conforme necessário
const allowedOrigins = ['http://localhost:3000']; // Adicione aqui os domínios confiáveis
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  }
}));

// Middlewares
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
