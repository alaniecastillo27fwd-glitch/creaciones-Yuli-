import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Cotizacion = sequelize.define(
  'Cotizacion',
  {
    id_cotizacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    especificaciones_personalizadas: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_evento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    monto_estimado_crc: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'enviada', 'aprobada', 'rechazada', 'vencida'),
      allowNull: false,
      defaultValue: 'pendiente'
    }
  },
  {
    tableName: 'cotizaciones',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  }
);

export default Cotizacion;
