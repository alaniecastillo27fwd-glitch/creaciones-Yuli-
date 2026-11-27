export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let mensaje = err.message || 'Error interno del servidor';

  // Mapeo de errores comunes de Sequelize y validación a códigos HTTP claros
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    mensaje = err.errors.map((e) => e.message).join(', ');
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    mensaje = 'El registro ya existe (conflicto de valor único).';
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    mensaje = 'Referencia inválida a un registro relacionado (llave foránea).';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    mensaje = 'Token de autenticación inválido o expirado.';
  }

  return res.status(statusCode).json({
    ok: false,
    status: statusCode,
    mensaje,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
