module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      hooks: {
        beforeCreate: async (usuario) => {
          const salt = await require('bcrypt').genSalt(10);
          usuario.senha = await require('bcrypt').hash(usuario.senha, salt);
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed('senha')) {
            const salt = await require('bcrypt').genSalt(10);
            usuario.senha = await require('bcrypt').hash(usuario.senha, salt);
          }
        }
      }
    });
  
    return Usuario;
  };
  