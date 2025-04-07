module.exports = (sequelize, DataTypes) => {
    const MovimentacaoEstoque = sequelize.define('MovimentacaoEstoque', {
      tipo: {
        type: DataTypes.ENUM('entrada', 'saida'),
        allowNull: false
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    // Relacionamento com Produto
    MovimentacaoEstoque.associate = (models) => {
      MovimentacaoEstoque.belongsTo(models.Produto, {
        foreignKey: 'produto_id',
        as: 'produto',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    };
  
    return MovimentacaoEstoque;
  };
  