import jwt from 'jsonwebtoken';

export const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Acceso no autorizado: Token Bearer no proporcionado.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Se inyecta únicamente id_usuario y rol según la política de seguridad
    req.usuario = {
      id_usuario: decoded.id_usuario,
      rol: decoded.rol
    };

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token inválido o expirado. Inicie sesión nuevamente.'
    });
  }
};

export default authJWT;
