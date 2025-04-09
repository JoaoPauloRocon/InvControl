const jwt = require('jsonwebtoken');
const segredo = process.env.JWT_SECRET;

// Simulando armazenamento em memória (ou futuro armazenamento em banco)
const tokenStore = {
  tokens: {},
  salvar(id, token) {
    this.tokens[id] = token;
  },
  obter(id) {
    return this.tokens[id];
  }
};

async function renovarToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ erro: 'Refresh token não fornecido' });

  try {
    const payload = jwt.verify(refreshToken, segredo);

    const tokenArmazenado = tokenStore.obter(payload.id);
    if (tokenArmazenado !== refreshToken) {
      return res.status(403).json({ erro: 'Refresh token inválido' });
    }

    const novoAccessToken = jwt.sign(
      { id: payload.id, email: payload.email, admin: payload.admin },
      segredo,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: novoAccessToken });
  } catch (erro) {
    res.status(403).json({ erro: 'Token inválido ou expirado', detalhe: erro.message });
  }
}

module.exports = {
  renovarToken,
  tokenStore
};
