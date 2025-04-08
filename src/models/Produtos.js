'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    quantidade: DataTypes.INTEGER,
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'produtos'
  });

  Produto.associate = (models) => {
    Produto.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    });
  };

  return Produto;
};
