-- =============================================================================
-- PROYECTO: Plataforma Full Stack "Creaciones Yuli"
-- ARCHIVO:  database/01_schema_postgres.sql
-- MOTOR:    PostgreSQL (Compatible con SQLPro for Postgres / pgAdmin / psql)
-- DISEÑO:   Normalizado hasta Tercera Forma Normal (3FN) - 15 Tablas
-- =============================================================================

-- =============================================================================
-- NIVEL 0: TABLAS MAESTRAS / CATÁLOGOS (SIN DEPENDENCIAS DE LLAVES FORÁNEAS)
-- =============================================================================

-- 1. [Seguridad] Tabla: roles
CREATE TABLE IF NOT EXISTS roles (
  id_rol SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. [Seguridad] Tabla: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(25),
  password_hash VARCHAR(255) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. [Negocio] Tabla: categorias
CREATE TABLE IF NOT EXISTS categorias (
  id_categoria SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. [Negocio] Tabla: proveedores
CREATE TABLE IF NOT EXISTS proveedores (
  id_proveedor SERIAL PRIMARY KEY,
  nombre_comercial VARCHAR(120) NOT NULL,
  cedula_juridica_fisica VARCHAR(25) NOT NULL UNIQUE,
  telefono VARCHAR(25),
  email VARCHAR(150),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. [IA e Integraciones] Tabla: historial_tipo_cambio
CREATE TABLE IF NOT EXISTS historial_tipo_cambio (
  id_tipo_cambio SERIAL PRIMARY KEY,
  fecha_consulta DATE NOT NULL UNIQUE,
  compra_crc DECIMAL(8, 2) NOT NULL,
  venta_crc DECIMAL(8, 2) NOT NULL,
  fuente_api VARCHAR(80) NOT NULL DEFAULT 'BCCR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_tasas_positivas CHECK (compra_crc > 0 AND venta_crc > 0)
);

-- =============================================================================
-- NIVEL 1: TABLAS CON DEPENDENCIA DIRECTA DE TABLAS MAESTRAS
-- =============================================================================

-- 6. [Seguridad] Tabla intermedia N:M: usuario_roles
CREATE TABLE IF NOT EXISTS usuario_roles (
  id_usuario INT NOT NULL,
  id_rol INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, id_rol),
  CONSTRAINT fk_usuario_roles_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_usuario_roles_rol
    FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 7. [Negocio] Tabla: productos
CREATE TABLE IF NOT EXISTS productos (
  id_producto SERIAL PRIMARY KEY,
  id_categoria INT NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  precio_base_crc DECIMAL(10, 2) NOT NULL,
  tiempo_elaboracion_dias SMALLINT NOT NULL DEFAULT 3,
  imagen_url VARCHAR(255),
  personalizable BOOLEAN NOT NULL DEFAULT TRUE,
  disponible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_producto_precio CHECK (precio_base_crc >= 0),
  CONSTRAINT chk_producto_dias CHECK (tiempo_elaboracion_dias >= 0),
  CONSTRAINT fk_productos_categoria
    FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 8. [Negocio] Tabla: insumos_inventario
CREATE TABLE IF NOT EXISTS insumos_inventario (
  id_insumo SERIAL PRIMARY KEY,
  id_proveedor INT NOT NULL,
  nombre_insumo VARCHAR(120) NOT NULL,
  unidad_medida VARCHAR(30) NOT NULL,
  stock_actual DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  stock_minimo DECIMAL(10, 2) NOT NULL DEFAULT 5.00,
  costo_unitario_crc DECIMAL(10, 2) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_insumo_stock CHECK (stock_actual >= 0 AND stock_minimo >= 0),
  CONSTRAINT chk_insumo_costo CHECK (costo_unitario_crc >= 0),
  CONSTRAINT fk_insumos_proveedor
    FOREIGN KEY (id_proveedor) REFERENCES proveedores (id_proveedor)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 9. [Negocio] Tabla: facturas_gastos (3FN: no almacena total redundante)
CREATE TABLE IF NOT EXISTS facturas_gastos (
  id_factura_gasto SERIAL PRIMARY KEY,
  id_proveedor INT NOT NULL,
  id_tipo_cambio INT NOT NULL,
  numero_comprobante VARCHAR(60) NOT NULL UNIQUE,
  fecha_emision DATE NOT NULL,
  moneda_original VARCHAR(10) NOT NULL DEFAULT 'CRC' CHECK (moneda_original IN ('CRC', 'USD')),
  monto_neto DECIMAL(12, 2) NOT NULL,
  monto_impuesto DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  concepto_gasto VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_gasto_montos CHECK (monto_neto >= 0 AND monto_impuesto >= 0),
  CONSTRAINT fk_gastos_proveedor
    FOREIGN KEY (id_proveedor) REFERENCES proveedores (id_proveedor)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_gastos_tipo_cambio
    FOREIGN KEY (id_tipo_cambio) REFERENCES historial_tipo_cambio (id_tipo_cambio)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 10. [IA e Integraciones] Tabla: bitacora_agentes_ia (Sin PII / Datos sensibles)
CREATE TABLE IF NOT EXISTS bitacora_agentes_ia (
  id_bitacora BIGSERIAL PRIMARY KEY,
  id_usuario INT NULL,
  nombre_agente VARCHAR(80) NOT NULL,
  accion_ejecutada VARCHAR(120) NOT NULL,
  hash_contexto_anonimo CHAR(64) NOT NULL,
  tokens_consumidos INT NOT NULL DEFAULT 0 CHECK (tokens_consumidos >= 0),
  tiempo_respuesta_ms INT NOT NULL CHECK (tiempo_respuesta_ms >= 0),
  estado_ejecucion VARCHAR(30) NOT NULL CHECK (estado_ejecucion IN ('exito', 'error_proveedor', 'bloqueo_seguridad')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bitacora_ia_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- 11. [Gobernanza - Ley N.º 8968 CR] Tabla: consentimientos_legales
CREATE TABLE IF NOT EXISTS consentimientos_legales (
  id_consentimiento SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  version_politica VARCHAR(20) NOT NULL,
  finalidad_tratamiento VARCHAR(40) NOT NULL CHECK (finalidad_tratamiento IN ('gestion_pedidos', 'notificaciones_whatsapp', 'uso_imagenes_portafolio')),
  aceptado BOOLEAN NOT NULL,
  ip_hash_auditoria CHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_consentimientos_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 12. [Gobernanza - Ley N.º 8968 CR] Tabla: solicitudes_eliminacion
CREATE TABLE IF NOT EXISTS solicitudes_eliminacion (
  id_solicitud SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  motivo_solicitud TEXT,
  estado_solicitud VARCHAR(40) NOT NULL DEFAULT 'recibida' CHECK (estado_solicitud IN ('recibida', 'en_revision', 'completada_anonimizada', 'rechazada_obligacion_fiscal')),
  fecha_resolucion TIMESTAMP NULL,
  resolucion_observacion VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_solicitudes_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- =============================================================================
-- NIVEL 2: PREVENTA Y PRESUPUESTOS
-- =============================================================================

-- 13. [Negocio] Tabla: cotizaciones
CREATE TABLE IF NOT EXISTS cotizaciones (
  id_cotizacion SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_producto INT NULL,
  especificaciones_personalizadas TEXT NOT NULL,
  fecha_evento DATE NOT NULL,
  monto_estimado_crc DECIMAL(10, 2) NULL,
  estado VARCHAR(30) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'enviada', 'aprobada', 'rechazada', 'vencida')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cotizaciones_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_cotizaciones_producto
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- =============================================================================
-- NIVEL 3: TRANSACCIONES DE PEDIDOS
-- =============================================================================

-- 14. [Negocio] Tabla: pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_cotizacion INT NULL UNIQUE,
  id_tipo_cambio INT NULL,
  fecha_entrega_comprometida DATE NOT NULL,
  porcentaje_adelanto DECIMAL(5, 2) NOT NULL DEFAULT 50.00,
  estado_pedido VARCHAR(30) NOT NULL DEFAULT 'pendiente_adelanto' CHECK (estado_pedido IN ('pendiente_adelanto', 'en_produccion', 'listo_entrega', 'entregado', 'cancelado')),
  metodo_pago VARCHAR(30) NOT NULL CHECK (metodo_pago IN ('sinpe_movil', 'transferencia', 'efectivo', 'tarjeta')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_porcentaje_adelanto CHECK (porcentaje_adelanto >= 0 AND porcentaje_adelanto <= 100),
  CONSTRAINT fk_pedidos_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_pedidos_cotizacion
    FOREIGN KEY (id_cotizacion) REFERENCES cotizaciones (id_cotizacion)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_pedidos_tipo_cambio
    FOREIGN KEY (id_tipo_cambio) REFERENCES historial_tipo_cambio (id_tipo_cambio)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- =============================================================================
-- NIVEL 4: LÍNEAS DE DETALLE DE PEDIDOS (3FN)
-- =============================================================================

-- 15. [Negocio] Tabla: detalle_pedidos (3FN: sin columna subtotal calculada)
CREATE TABLE IF NOT EXISTS detalle_pedidos (
  id_detalle_pedido SERIAL PRIMARY KEY,
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad SMALLINT NOT NULL,
  precio_unitario_crc DECIMAL(10, 2) NOT NULL,
  nota_personalizacion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_detalle_cantidad CHECK (cantidad > 0),
  CONSTRAINT chk_detalle_precio CHECK (precio_unitario_crc >= 0),
  CONSTRAINT fk_detalle_pedido
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_detalle_producto
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
    ON DELETE RESTRICT ON UPDATE CASCADE
);
