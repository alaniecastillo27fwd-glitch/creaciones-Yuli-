import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Pedido = sequelize.define(
  'Pedido',
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    id_tipo_cambio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_entrega_comprometida: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    porcentaje_adelanto: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 50.0
    },
    estado_pedido: {
      type: DataTypes.ENUM('pendiente_adelanto', 'en_produccion', 'listo_entrega', 'entregado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente_adelanto'
    },
    metodo_pago: {
      type: DataTypes.ENUM('sinpe_movil', 'transferencia', 'efectivo', 'tarjeta'),
      allowNull: false
    }
  },
  {
    tableName: 'pedidos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  }
);

export default Pedido;
