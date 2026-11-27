import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middlewares/validators.js';
import { authJWT } from '../middlewares/authJWT.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = Router();

// Rutas públicas con validación de entrada y cumplimiento Ley N.º 8968
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Ruta protegida para cualquiera de los 4 roles autenticados del sistema
router.get(
  '/profile',
  authJWT,
  checkRole(['Administrador', 'Colaborador', 'Cliente', 'Auditor']),
  getProfile
);

export default router;
