export const checkRole = (rolesPermitidos = []) => {
  const listaRoles = Array.isArray(rolesPermitidos) ? rolesPermitidos : [rolesPermitidos];

  return (req, res, next) => {
    if (!req.usuario || !req.usuario.rol) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No se encontró sesión autenticada para verificar el rol.'
      });
    }

    if (!listaRoles.includes(req.usuario.rol)) {
      return res.status(403).json({
        ok: false,
        mensaje: `Acceso denegado (403 Forbidden): Se requiere uno de los siguientes roles: [${listaRoles.join(', ')}].`
      });
    }

    next();
  };
};

export default checkRole;
