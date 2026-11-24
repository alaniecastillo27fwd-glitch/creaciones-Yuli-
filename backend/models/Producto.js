import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Producto = sequelize.define(
  'Producto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    categoria: {
      type: DataTypes.ENUM('pinatas', 'decoraciones', 'toppers', 'centros_mesa', 'manualidades', 'maquetas'),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: 'productos'
  }
);
