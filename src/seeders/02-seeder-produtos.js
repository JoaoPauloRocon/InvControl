'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [usuarios] = await queryInterface.sequelize.query(
      `SELECT id FROM Usuarios WHERE isAdmin = false LIMIT 1;`
    );

    const usuarioId = usuarios[0]?.id;

    if (!usuarioId) {
      throw new Error('Nenhum usuário comum encontrado para associar aos produtos.');
    }

    return queryInterface.bulkInsert('Produtos', [
      {
        nome: 'Arroz 5kg',
        descricao: 'Pacote de arroz tipo 1',
        preco: 25.90,
        usuario_id: usuarioId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Feijão Carioca 1kg',
        descricao: 'Feijão tipo 1',
        preco: 8.75,
        usuario_id: usuarioId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Óleo de Soja 900ml',
        descricao: 'Óleo vegetal',
        preco: 6.50,
        usuario_id: usuarioId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Produtos', null, {});
  }
};
