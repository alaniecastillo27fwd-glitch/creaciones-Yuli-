-- =============================================================================
-- PROYECTO: Plataforma Full Stack "Creaciones Yuli"
-- ARCHIVO:  database/02_seed.sql
-- PROPÓSITO: Datos semilla (Seed) realistas compatibles con 01_schema.sql
-- =============================================================================

USE creaciones_yuli;

-- =============================================================================
-- 1. ROLES OBLIGATORIOS (4 Roles)
-- =============================================================================
INSERT INTO roles (id_rol, nombre, descripcion) VALUES
  (1, 'Administrador', 'Acceso total al sistema, finanzas, usuarios, inventario y gobernanza Ley 8968.'),
  (2, 'Colaborador', 'Gestión operativa del taller: producción de pedidos, cotizaciones e inventario de insumos.'),
  (3, 'Cliente', 'Consulta de catálogo, solicitud de cotizaciones personalizadas y seguimiento de pedidos.'),
  (4, 'Auditor', 'Acceso de solo lectura a bitácoras de IA, cumplimiento legal ARCO y trazabilidad contable.');

-- =============================================================================
-- 2. USUARIOS DE PRUEBA (4 Usuarios, uno por cada rol)
-- NOTA DE SEGURIDAD:
-- El hash bcrypt ($2b$10$...) corresponde a la contraseña de prueba: "Yuli2026*"
-- (Para pruebas reales de login desde el backend, generar o validar con bcrypt.hash('Yuli2026*', 10))
-- =============================================================================
INSERT INTO usuarios (id_usuario, nombre_completo, email, telefono, password_hash, activo) VALUES
  (1, 'Yuliana Morales (Admin)', 'admin@creacionesyuli.cr', '+506 8811-2233', '$2b$10$wT8f5k9v3mX1qP7zL2nR4eK6jH0gD9sF3aV5bN8cM1xZ4yW7uE2qO', TRUE),
  (2, 'Valeria Solís (Colaboradora)', 'colaborador@creacionesyuli.cr', '+506 8722-3344', '$2b$10$wT8f5k9v3mX1qP7zL2nR4eK6jH0gD9sF3aV5bN8cM1xZ4yW7uE2qO', TRUE),
  (3, 'Carlos Méndez Rojas (Cliente)', 'cliente@correo.cr', '+506 8633-4455', '$2b$10$wT8f5k9v3mX1qP7zL2nR4eK6jH0gD9sF3aV5bN8cM1xZ4yW7uE2qO', TRUE),
  (4, 'Marco Vargas Castro (Auditor)', 'auditor@creacionesyuli.cr', '+506 8544-5566', '$2b$10$wT8f5k9v3mX1qP7zL2nR4eK6jH0gD9sF3aV5bN8cM1xZ4yW7uE2qO', TRUE);

-- =============================================================================
-- 3. ASIGNACIÓN DE ROLES (usuario_roles)
-- =============================================================================
INSERT INTO usuario_roles (id_usuario, id_rol) VALUES
  (1, 1), -- Yuliana -> Administrador
  (2, 2), -- Valeria -> Colaborador
  (3, 3), -- Carlos  -> Cliente
  (4, 4); -- Marco   -> Auditor

-- =============================================================================
-- 4. CONSENTIMIENTOS LEGALES INICIALES (Ley N.º 8968 Costa Rica)
-- =============================================================================
INSERT INTO consentimientos_legales (id_consentimiento, id_usuario, version_politica, finalidad_tratamiento, aceptado, ip_hash_auditoria) VALUES
  (1, 1, 'v1.0-2026', 'gestion_pedidos', TRUE, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'),
  (2, 2, 'v1.0-2026', 'gestion_pedidos', TRUE, '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'),
  (3, 3, 'v1.0-2026', 'gestion_pedidos', TRUE, '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'),
  (4, 3, 'v1.0-2026', 'notificaciones_whatsapp', TRUE, '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'),
  (5, 4, 'v1.0-2026', 'gestion_pedidos', TRUE, '49d180758e803b14275b5c0c04a7d5e87877d81020d878440e78f3c5c6a325c1');

-- =============================================================================
-- 5. CATEGORÍAS DE CREACIONES YULI (6 Categorías oficiales)
-- =============================================================================
INSERT INTO categorias (id_categoria, nombre, descripcion, activa) VALUES
  (1, 'Piñatas', 'Piñatas artesanales en tambor o 3D personalizadas por temática, edad y personaje.', TRUE),
  (2, 'Toppers', 'Cake toppers y adornos para queques en cartulina metalizada, capas 3D y shaker.', TRUE),
  (3, 'Centros de mesa', 'Arreglos temáticos para mesas de invitados en eventos infantiles, baby showers y graduaciones.', TRUE),
  (4, 'Decoraciones para fiestas', 'Guirnaldas, banderines, letras 3D, marcos selfie y fondos decorativos para eventos.', TRUE),
  (5, 'Maquetas escolares/universitarias', 'Maquetas didácticas, arquitectónicas, anatómicas y científicas elaboradas a escala.', TRUE),
  (6, 'Decoración para el hogar', 'Cuadros decorativos en relieve, flores de papel gigantes y organizadores artesanales.', TRUE);

-- =============================================================================
-- 6. PRODUCTOS DEL CATÁLOGO (6 Productos de ejemplo)
-- =============================================================================
INSERT INTO productos (id_producto, id_categoria, nombre, descripcion, precio_base_crc, tiempo_elaboracion_dias, imagen_url, personalizable, disponible) VALUES
  (1, 1, 'Piñata 3D Temática Infantil (75 cm)', 'Piñata estructurada en cartón reforzado y decorada en papel crepé con detalles en foamy escarchado.', 14500.00, 5, '/assets/productos/pinata-3d-tematica.jpg', TRUE, TRUE),
  (2, 2, 'Cake Topper Shaker Personalizado con Luz LED', 'Topper de 4 capas en cartulina espejo dorada, acetato con lentejuelas y nombre en relieve.', 5800.00, 2, '/assets/productos/topper-shaker-led.jpg', TRUE, TRUE),
  (3, 3, 'Pack de 6 Centros de Mesa Temáticos con Base', 'Bases decoradas en colores pastel con figura central de 30 cm, porta globos y nombre del festejado.', 16800.00, 4, '/assets/productos/centros-mesa-pack6.jpg', TRUE, TRUE),
  (4, 4, 'Kit Fiesta Completa (Banderín + Letras 3D + Marco Selfie)', 'Conjunto coordinado en paleta personalizada con 6 letras 3D de 20 cm, banderín de 2 metros y marco para fotos.', 22500.00, 5, '/assets/productos/kit-decoracion-fiesta.jpg', TRUE, TRUE),
  (5, 5, 'Maqueta Sistema Solar o Célula Animal a Escala (60x40 cm)', 'Base rígida en cartón presentación con esferas pintadas a mano en acrílico, rotulación técnica e iluminación opcional.', 18900.00, 4, '/assets/productos/maqueta-escolar-escala.jpg', TRUE, TRUE),
  (6, 6, 'Set de 3 Flores Gigantes de Papel para Pared', 'Rosas artesanales en cartulina de alto gramaje (45 cm, 35 cm y 25 cm) con hojas doradas caladas.', 13500.00, 3, '/assets/productos/flores-gigantes-hogar.jpg', TRUE, TRUE);

-- =============================================================================
-- 7. PROVEEDORES DE COSTA RICA (2 Proveedores)
-- =============================================================================
INSERT INTO proveedores (id_proveedor, nombre_comercial, cedula_juridica_fisica, telefono, email, activo) VALUES
  (1, 'Distribuidora Papelera Central S.A.', '3-101-654321', '+506 2221-8090', 'ventas@papeleracentral.co.cr', TRUE),
  (2, 'Suministros Artesanales El Taller CR', '3-102-789456', '+506 2253-4411', 'pedidos@eltallercr.com', TRUE);

-- =============================================================================
-- 8. INSUMOS DE INVENTARIO (5 Insumos obligatorios)
-- =============================================================================
INSERT INTO insumos_inventario (id_insumo, id_proveedor, nombre_insumo, unidad_medida, stock_actual, stock_minimo, costo_unitario_crc) VALUES
  (1, 1, 'Cartulina metalizada y opalina alto gramaje', 'pliego', 85.00, 20.00, 650.00),
  (2, 1, 'Papel crepé italiano alta resistencia', 'pliego', 140.00, 30.00, 320.00),
  (3, 2, 'Silicón en barra extra fuerte transparente', 'paquete', 18.00, 5.00, 2400.00),
  (4, 2, 'Pinturas acrílicas profesionales (set colores primarios y pastel)', 'unidad', 32.00, 8.00, 1350.00),
  (5, 1, 'Cartón presentación doble cara 3mm (75x100 cm)', 'lamina', 24.00, 6.00, 1950.00);

-- =============================================================================
-- 9. HISTORIAL DE TIPO DE CAMBIO (1 Registro oficial BCCR)
-- =============================================================================
INSERT INTO historial_tipo_cambio (id_tipo_cambio, fecha_consulta, compra_crc, venta_crc, fuente_api) VALUES
  (1, '2026-11-24', 508.50, 514.20, 'BCCR');

-- =============================================================================
-- 10. COTIZACIONES Y 2 PEDIDOS PERSONALIZADOS DE PRUEBA (con su detalle en 3FN)
-- =============================================================================

-- Cotizaciones previas aprobadas para el cliente Carlos Méndez (id_usuario = 3)
INSERT INTO cotizaciones (id_cotizacion, id_usuario, id_producto, especificaciones_personalizadas, fecha_evento, monto_estimado_crc, estado) VALUES
  (1, 3, 1, 'Piñata 3D temática Sirena Ariel en tonos turquesa y fucsia con el número 6 y nombre "Lucía".', '2026-12-05', 20300.00, 'aprobada'),
  (2, 3, 5, 'Maqueta universitaria de cuenca hidrográfica 80x60 cm con relieve topográfico y rotulación en español.', '2026-12-10', 18900.00, 'aprobada');

-- 2 Pedidos personalizados asociados al cliente (id_usuario = 3) y al tipo de cambio (id_tipo_cambio = 1)
INSERT INTO pedidos (id_pedido, id_usuario, id_cotizacion, id_tipo_cambio, fecha_entrega_comprometida, porcentaje_adelanto, estado_pedido, metodo_pago) VALUES
  (1, 3, 1, 1, '2026-12-04', 50.00, 'en_produccion', 'sinpe_movil'),
  (2, 3, 2, 1, '2026-12-09', 60.00, 'pendiente_adelanto', 'transferencia');

-- Líneas de detalle para los 2 pedidos personalizados
INSERT INTO detalle_pedidos (id_detalle_pedido, id_pedido, id_producto, cantidad, precio_unitario_crc, nota_personalizacion) VALUES
  (1, 1, 1, 1, 14500.00, 'Temática Sirena Ariel, colores turquesa/fucsia, altura 75 cm.'),
  (2, 1, 2, 1, 5800.00, 'Topper Shaker haciendo juego con leyenda: "Feliz Cumple Lucía - 6 años".'),
  (3, 2, 5, 1, 18900.00, 'Maqueta cuenca hidrográfica con escala 1:500 y tarjeta de leyenda.');
