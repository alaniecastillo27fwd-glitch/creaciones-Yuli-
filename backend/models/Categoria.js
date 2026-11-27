import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Categoria = sequelize.define(
  'Categoria',
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: 'categorias',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  }
);

export default Categoria;
