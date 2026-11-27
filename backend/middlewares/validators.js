const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const validateRegister = (req, res, next) => {
  const {
    nombre_completo,
    email,
    password,
    acepta_terminos,
    acepta_privacidad
  } = req.body;

  const errores = [];

  if (!nombre_completo || typeof nombre_completo !== 'string' || nombre_completo.trim().length < 3) {
    errores.push('El nombre completo es obligatorio y debe tener al menos 3 caracteres.');
  }

  if (!email || !EMAIL_REGEX.test(String(email).trim())) {
    errores.push('Debe proporcionar un correo electrónico válido.');
  }

  if (!password || !PASSWORD_REGEX.test(String(password))) {
    errores.push(
      'La contraseña debe tener mínimo 8 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.'
    );
  }

  // Gobernanza Ley N.º 8968 CR: Consentimiento informado expreso obligatorio
  if (acepta_terminos !== true || acepta_privacidad !== true) {
    errores.push(
      'Cumplimiento Ley N.º 8968: Es obligatorio aceptar explícitamente los términos y la política de privacidad (acepta_terminos: true, acepta_privacidad: true).'
    );
  }

  if (errores.length > 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos de registro inválidos.',
      errores
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errores = [];

  if (!email || !EMAIL_REGEX.test(String(email).trim())) {
    errores.push('Debe proporcionar un correo electrónico válido.');
  }

  if (!password || typeof password !== 'string' || password.trim().length === 0) {
    errores.push('La contraseña es obligatoria.');
  }

  if (errores.length > 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos de inicio de sesión inválidos.',
      errores
    });
  }

  next();
};

export const validateProducto = (req, res, next) => {
  const { id_categoria, nombre, descripcion, precio_base_crc } = req.body;
  const errores = [];

  if (!id_categoria || Number.isNaN(Number(id_categoria))) {
    errores.push('El campo id_categoria es obligatorio y debe ser numérico.');
  }

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3) {
    errores.push('El nombre del producto es obligatorio (mínimo 3 caracteres).');
  }

  if (!descripcion || typeof descripcion !== 'string' || descripcion.trim().length < 5) {
    errores.push('La descripción del producto es obligatoria.');
  }

  if (precio_base_crc === undefined || Number.isNaN(Number(precio_base_crc)) || Number(precio_base_crc) < 0) {
    errores.push('El precio_base_crc debe ser un número mayor o igual a 0.');
  }

  if (errores.length > 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos del producto inválidos.',
      errores
    });
  }

  next();
};

export const validateCategoria = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El nombre de la categoría es obligatorio (mínimo 3 caracteres).'
    });
  }

  next();
};

export const validatePedido = (req, res, next) => {
  const {
    tematica,
    especificaciones,
    especificaciones_personalizadas,
    fecha_deseada,
    fecha_entrega_comprometida
  } = req.body;

  const detalleTexto = especificaciones_personalizadas || especificaciones || tematica;
  const fechaObjetivo = fecha_entrega_comprometida || fecha_deseada;
  const errores = [];

  if (!detalleTexto || typeof detalleTexto !== 'string' || detalleTexto.trim().length < 5) {
    errores.push('Debe indicar la temática y especificaciones personalizadas del pedido.');
  }

  if (!fechaObjetivo || Number.isNaN(Date.parse(fechaObjetivo))) {
    errores.push('Debe indicar una fecha deseada o fecha de entrega válida (YYYY-MM-DD).');
  }

  if (errores.length > 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos del pedido personalizado inválidos.',
      errores
    });
  }

  next();
};

export const validateEstadoPedido = (req, res, next) => {
  const { estado_pedido } = req.body;
  const estadosValidos = [
    'Pendiente de cotización',
    'pendiente_adelanto',
    'en_produccion',
    'listo_entrega',
    'entregado',
    'cancelado'
  ];

  if (!estado_pedido || !estadosValidos.includes(estado_pedido)) {
    return res.status(400).json({
      ok: false,
      mensaje: `Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}.`
    });
  }

  next();
};

export const validateInsumo = (req, res, next) => {
  const { id_proveedor, nombre_insumo, unidad_medida, stock_actual, stock_minimo, costo_unitario_crc } = req.body;
  const errores = [];

  if (!id_proveedor || Number.isNaN(Number(id_proveedor))) {
    errores.push('El campo id_proveedor es obligatorio.');
  }

  if (!nombre_insumo || typeof nombre_insumo !== 'string' || nombre_insumo.trim().length < 2) {
    errores.push('El nombre_insumo es obligatorio.');
  }

  if (!unidad_medida || typeof unidad_medida !== 'string') {
    errores.push('La unidad_medida es obligatoria (ej. pliego, paquete, unidad).');
  }

  if (stock_actual !== undefined && (Number.isNaN(Number(stock_actual)) || Number(stock_actual) < 0)) {
    errores.push('El stock_actual debe ser un número mayor o igual a 0.');
  }

  if (stock_minimo !== undefined && (Number.isNaN(Number(stock_minimo)) || Number(stock_minimo) < 0)) {
    errores.push('El stock_minimo debe ser un número mayor o igual a 0.');
  }

  if (costo_unitario_crc === undefined || Number.isNaN(Number(costo_unitario_crc)) || Number(costo_unitario_crc) < 0) {
    errores.push('El costo_unitario_crc es obligatorio y debe ser mayor o igual a 0.');
  }

  if (errores.length > 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos de insumo inválidos.',
      errores
    });
  }

  next();
};
