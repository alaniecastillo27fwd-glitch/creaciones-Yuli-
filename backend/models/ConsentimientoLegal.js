import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ConsentimientoLegal = sequelize.define(
  'ConsentimientoLegal',
  {
    id_consentimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    version_politica: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    finalidad_tratamiento: {
      type: DataTypes.ENUM('gestion_pedidos', 'notificaciones_whatsapp', 'uso_imagenes_portafolio'),
      allowNull: false
    },
    aceptado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ip_hash_auditoria: {
      type: DataTypes.CHAR(64),
      allowNull: false
    }
  },
  {
    tableName: 'consentimientos_legales',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  }
);

export default ConsentimientoLegal;
