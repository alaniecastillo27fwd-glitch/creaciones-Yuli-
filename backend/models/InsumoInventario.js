import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const InsumoInventario = sequelize.define(
  'InsumoInventario',
  {
    id_insumo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre_insumo: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    unidad_medida: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    stock_actual: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0
    },
    stock_minimo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 5.0
    },
    costo_unitario_crc: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    tableName: 'insumos_inventario',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at',
    underscored: true
  }
);

export default InsumoInventario;
