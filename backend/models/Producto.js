import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Producto = sequelize.define(
  'Producto',
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio_base_crc: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tiempo_elaboracion_dias: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    personalizable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: 'productos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  }
);

export default Producto;
