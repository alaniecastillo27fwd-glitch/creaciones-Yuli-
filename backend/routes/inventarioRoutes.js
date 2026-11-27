import { Router } from 'express';
import {
  listarInsumos,
  crearInsumo,
  actualizarInsumo
} from '../controllers/inventarioController.js';
import { authJWT } from '../middlewares/authJWT.js';
import { checkRole } from '../middlewares/checkRole.js';
import { validateInsumo } from '../middlewares/validators.js';

const router = Router();

// Todas las rutas de inventario están restringidas a Administrador y Colaborador
router.use(authJWT, checkRole(['Administrador', 'Colaborador']));

router.get('/', listarInsumos);
router.post('/', validateInsumo, crearInsumo);
router.put('/:id', validateInsumo, actualizarInsumo);

export default router;
