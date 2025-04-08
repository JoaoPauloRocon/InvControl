const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer <token>"

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      console.error('Erro ao verificar token:', err); // 👈 ADICIONE ISSO PRA VER O MOTIVO DO ERRO
      return res.status(403).json({ erro: 'Token inválido' });
    }

    req.usuario = usuario; // Usuário decodificado vai pro request
    next();
  });
}

module.exports = autenticarToken;
