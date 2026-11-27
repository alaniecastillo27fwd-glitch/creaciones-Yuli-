import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const DetallePedido = sequelize.define(
  'DetallePedido',
  {
    id_detalle_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    precio_unitario_crc: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    nota_personalizacion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    tableName: 'detalle_pedidos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  }
);

export default DetallePedido;
