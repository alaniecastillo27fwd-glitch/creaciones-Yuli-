import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Rol } from './Rol.js';
import { Usuario } from './Usuario.js';
import { ConsentimientoLegal } from './ConsentimientoLegal.js';
import { Categoria } from './Categoria.js';
import { Producto } from './Producto.js';
import { Cotizacion } from './Cotizacion.js';
import { Pedido } from './Pedido.js';
import { DetallePedido } from './DetallePedido.js';
import { InsumoInventario } from './InsumoInventario.js';

// Tabla intermedia explícita para relación N:M Usuario <-> Rol
export const UsuarioRol = sequelize.define(
  'UsuarioRol',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },
  {
    tableName: 'usuario_roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  }
);

// =============================================================================
// 1. RELACIÓN N:M -> Usuario <-> Rol (a través de usuario_roles)
// =============================================================================
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: 'id_usuario',
  otherKey: 'id_rol',
  as: 'roles'
});

Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: 'id_rol',
  otherKey: 'id_usuario',
  as: 'usuarios'
});

// =============================================================================
// 2. RELACIÓN 1:N -> Usuario -> ConsentimientoLegal (Ley N.º 8968 CR)
// =============================================================================
Usuario.hasMany(ConsentimientoLegal, {
  foreignKey: 'id_usuario',
  as: 'consentimientos'
});

ConsentimientoLegal.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario'
});

// =============================================================================
// 3. RELACIÓN 1:N -> Categoria -> Producto
// =============================================================================
Categoria.hasMany(Producto, {
  foreignKey: 'id_categoria',
  as: 'productos'
});

Producto.belongsTo(Categoria, {
  foreignKey: 'id_categoria',
  as: 'categoria'
});

// =============================================================================
// 4. RELACIÓN 1:N -> Usuario -> Cotizacion y Producto -> Cotizacion
// =============================================================================
Usuario.hasMany(Cotizacion, {
  foreignKey: 'id_usuario',
  as: 'cotizaciones'
});

Cotizacion.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'cliente'
});

Producto.hasMany(Cotizacion, {
  foreignKey: 'id_producto',
  as: 'cotizaciones'
});

Cotizacion.belongsTo(Producto, {
  foreignKey: 'id_producto',
  as: 'producto_base'
});

// =============================================================================
// 5. RELACIÓN 1:N -> Usuario -> Pedido y 1:1 -> Cotizacion <-> Pedido
// =============================================================================
Usuario.hasMany(Pedido, {
  foreignKey: 'id_usuario',
  as: 'pedidos'
});

Pedido.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'cliente'
});

Cotizacion.hasOne(Pedido, {
  foreignKey: 'id_cotizacion',
  as: 'pedido'
});

Pedido.belongsTo(Cotizacion, {
  foreignKey: 'id_cotizacion',
  as: 'cotizacion'
});

// =============================================================================
// 6. RELACIÓN 1:N -> Pedido -> DetallePedido y Producto -> DetallePedido
// =============================================================================
Pedido.hasMany(DetallePedido, {
  foreignKey: 'id_pedido',
  as: 'detalles'
});

DetallePedido.belongsTo(Pedido, {
  foreignKey: 'id_pedido',
  as: 'pedido'
});

Producto.hasMany(DetallePedido, {
  foreignKey: 'id_producto',
  as: 'detalles_pedido'
});

DetallePedido.belongsTo(Producto, {
  foreignKey: 'id_producto',
  as: 'producto'
});

export {
  sequelize,
  Rol,
  Usuario,
  ConsentimientoLegal,
  Categoria,
  Producto,
  Cotizacion,
  Pedido,
  DetallePedido,
  InsumoInventario
};
