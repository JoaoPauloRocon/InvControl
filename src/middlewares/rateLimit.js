const rateLimit = require('express-rate-limit');

// Limita a 5 requisições por 15 minutos por IP
const limiterLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: { erro: 'Muitas tentativas. Tente novamente após alguns minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const limiterRegistro = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10,
    message: { erro: 'Muitas tentativas de registro. Tente novamente mais tarde.' }
  });
  

module.exports = {
  limiterLogin,
  limiterRegistro
};
