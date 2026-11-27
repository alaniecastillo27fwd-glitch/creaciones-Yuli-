import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Rol = sequelize.define(
  'Rol',
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  }
);

export default Rol;
