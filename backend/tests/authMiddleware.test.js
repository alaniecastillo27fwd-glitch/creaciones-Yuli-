import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { authJWT } from '../middlewares/authJWT.js';
import { checkRole } from '../middlewares/checkRole.js';
import { validateRegister } from '../middlewares/validators.js';

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Suite de Seguridad y Gobernanza: authJWT, checkRole y validators', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test_secret_creaciones_yuli_2026';
    jest.restoreAllMocks();
  });

  // ===========================================================================
  // 1. Pruebas de middlewares/authJWT.js
  // ===========================================================================
  describe('Middleware authJWT', () => {
    test('Debe permitir el paso y asignar req.usuario cuando el token Bearer es válido', () => {
      const payload = { id_usuario: 1, rol: 'Administrador' };
      const tokenValido = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      const req = {
        headers: {
          authorization: `Bearer ${tokenValido}`
        }
      };
      const res = createMockRes();
      const next = jest.fn();

      authJWT(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.usuario).toEqual({
        id_usuario: 1,
        rol: 'Administrador'
      });
    });

    test('Debe retornar 401 si el header Authorization está ausente', () => {
      const req = { headers: {} };
      const res = createMockRes();
      const next = jest.fn();

      authJWT(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ok: false,
          mensaje: expect.stringContaining('Token Bearer no proporcionado')
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    test('Debe retornar 401 si el token es inválido o ha expirado', () => {
      const req = {
        headers: {
          authorization: 'Bearer token.invalido.manipulado'
        }
      };
      const res = createMockRes();
      const next = jest.fn();

      authJWT(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ok: false,
          mensaje: expect.stringContaining('Token inválido o expirado')
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // 2. Pruebas de middlewares/checkRole.js
  // ===========================================================================
  describe('Middleware checkRole', () => {
    test('Debe llamar a next() si el rol del usuario está dentro de los roles permitidos', () => {
      const req = {
        usuario: { id_usuario: 2, rol: 'Colaborador' }
      };
      const res = createMockRes();
      const next = jest.fn();

      const middleware = checkRole(['Administrador', 'Colaborador']);
      middleware(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    test('Debe retornar 403 Forbidden si el rol del usuario no está autorizado', () => {
      const req = {
        usuario: { id_usuario: 3, rol: 'Cliente' }
      };
      const res = createMockRes();
      const next = jest.fn();

      const middleware = checkRole(['Administrador', 'Colaborador']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ok: false,
          mensaje: expect.stringContaining('403 Forbidden')
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // 3. Pruebas de middlewares/validators.js (Ley N.º 8968 CR y formato)
  // ===========================================================================
  describe('Middleware validateRegister (Ley N.º 8968 CR)', () => {
    test('Debe rechazar con HTTP 400 el registro si no acepta la política de privacidad (Ley 8968)', () => {
      const req = {
        body: {
          nombre_completo: 'María Rodríguez',
          email: 'maria@correo.cr',
          password: 'Password123',
          acepta_terminos: true,
          acepta_privacidad: false
        }
      };
      const res = createMockRes();
      const next = jest.fn();

      validateRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ok: false,
          errores: expect.arrayContaining([
            expect.stringContaining('Ley N.º 8968')
          ])
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    test('Debe rechazar con HTTP 400 el registro si el correo electrónico tiene formato inválido', () => {
      const req = {
        body: {
          nombre_completo: 'María Rodríguez',
          email: 'correo-sin-arroba.cr',
          password: 'Password123',
          acepta_terminos: true,
          acepta_privacidad: true
        }
      };
      const res = createMockRes();
      const next = jest.fn();

      validateRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ok: false,
          errores: expect.arrayContaining([
            expect.stringContaining('correo electrónico válido')
          ])
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });
});
