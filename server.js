const express = require('express');
const cors = require('cors');
require('dotenv').config();

const produtoRoutes = require('./src/routes/produtoRoutes');
const movimentacaoRoutes = require('./src/routes/movimentacaoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota básica para teste
app.get('/', (req, res) => {
  res.send('🚀 InvControl API rodando com sucesso!');
});

// Rotas de Produto
app.use('/produtos', produtoRoutes);
app.use(movimentacaoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
