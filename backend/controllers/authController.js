import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
  sequelize,
  Usuario,
  Rol,
  UsuarioRol,
  ConsentimientoLegal
} from '../models/index.js';

const SALT_ROUNDS = 10;

// Genera hash SHA-256 de la IP para trazabilidad legal sin exponer el dato en texto plano
const hashClientIp = (req) => {
  const rawIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  return crypto.createHash('sha256').update(String(rawIp)).digest('hex');
};

export const register = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      nombre_completo,
      email,
      telefono,
      password,
      acepta_terminos,
      acepta_privacidad,
      version_politica = 'v1.0-2026'
    } = req.body;

    const emailNormalizado = email.trim().toLowerCase();

    const usuarioExistente = await Usuario.findOne({
      where: { email: emailNormalizado },
      transaction
    });

    if (usuarioExistente) {
      await transaction.rollback();
      return res.status(400).json({
        ok: false,
        mensaje: 'El correo electrónico ya está registrado.'
      });
    }

    // 1. Encriptar contraseña con bcrypt (10 rondas)
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // 2. Crear usuario
    const nuevoUsuario = await Usuario.create(
      {
        nombre_completo: nombre_completo.trim(),
        email: emailNormalizado,
        telefono: telefono ? telefono.trim() : null,
        password_hash,
        activo: true
      },
      { transaction }
    );

    // 3. Asignar rol 'Cliente' por defecto en registro público
    const rolCliente = await Rol.findOne({
      where: { nombre: 'Cliente' },
      transaction
    });

    const idRolAsignado = rolCliente ? rolCliente.id_rol : 3;

    await UsuarioRol.create(
      {
        id_usuario: nuevoUsuario.id_usuario,
        id_rol: idRolAsignado
      },
      { transaction }
    );

    // 4. Registrar evidencia de consentimiento informado (Ley N.º 8968 CR)
    const ipHash = hashClientIp(req);

    await ConsentimientoLegal.create(
      {
        id_usuario: nuevoUsuario.id_usuario,
        version_politica,
        finalidad_tratamiento: 'gestion_pedidos',
        aceptado: Boolean(acepta_terminos && acepta_privacidad),
        ip_hash_auditoria: ipHash
      },
      { transaction }
    );

    await transaction.commit();

    // Respuesta limpia SIN password_hash
    return res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado exitosamente con consentimiento legal Ley N.º 8968.',
      data: {
        id_usuario: nuevoUsuario.id_usuario,
        nombre_completo: nuevoUsuario.nombre_completo,
        email: nuevoUsuario.email,
        telefono: nuevoUsuario.telefono,
        rol: 'Cliente',
        activo: nuevoUsuario.activo
      }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailNormalizado = email.trim().toLowerCase();

    const usuario = await Usuario.findOne({
      where: { email: emailNormalizado },
      include: [
        {
          model: Rol,
          as: 'roles',
          attributes: ['id_rol', 'nombre'],
          through: { attributes: [] }
        }
      ]
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales inválidas o cuenta inactiva.'
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales inválidas o cuenta inactiva.'
      });
    }

    const rolPrincipal = usuario.roles?.[0]?.nombre || 'Cliente';

    // El payload del JWT contiene ÚNICAMENTE id_usuario y rol
    const payload = {
      id_usuario: usuario.id_usuario,
      rol: rolPrincipal
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h'
    });

    // Respuesta limpia SIN password_hash
    return res.status(200).json({
      ok: true,
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre_completo: usuario.nombre_completo,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: rolPrincipal
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id_usuario, {
      attributes: { exclude: ['password_hash'] },
      include: [
        {
          model: Rol,
          as: 'roles',
          attributes: ['id_rol', 'nombre', 'descripcion'],
          through: { attributes: [] }
        },
        {
          model: ConsentimientoLegal,
          as: 'consentimientos',
          attributes: ['id_consentimiento', 'version_politica', 'finalidad_tratamiento', 'aceptado', 'created_at']
        }
      ]
    });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado.'
      });
    }

    return res.status(200).json({
      ok: true,
      data: {
        ...usuario.toJSON(),
        rol_activo: req.usuario.rol
      }
    });
  } catch (error) {
    next(error);
  }
};
