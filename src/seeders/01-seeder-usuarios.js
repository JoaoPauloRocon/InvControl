'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { Usuario } = require('../models'); // importa o model corretamente

    const senhaHash = await bcrypt.hash('Amanda@4321', 10);

    await Usuario.bulkCreate([
      {
        nome: 'Admin',
        email: 'admin@gmail.com',
        senha: senhaHash,
        isAdmin: true
      },
      {
        nome: 'João',
        email: 'joao@gmail.com',
        senha: senhaHash,
        isAdmin: false
      }
    ], {
      validate: true, // valida os campos
      hooks: false    // desativa os hooks
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
