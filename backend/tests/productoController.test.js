import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { Producto } from '../models/index.js';
import { listarProductos } from '../controllers/productoController.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Suite Unitaria de Controlador: productoController (sin conexión real a MySQL)', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('listarProductos debe responder con HTTP 200 y la lista de productos simulada', async () => {
    const productosSimulados = [
      {
        id_producto: 1,
        id_categoria: 1,
        nombre: 'Piñata 3D Temática Infantil (75 cm)',
        precio_base_crc: 14500.0,
        disponible: true
      },
      {
        id_producto: 2,
        id_categoria: 2,
        nombre: 'Cake Topper Shaker Personalizado con Luz LED',
        precio_base_crc: 5800.0,
        disponible: true
      }
    ];

    // Simulación (Mock) del método Producto.findAll sin tocar MySQL
    const findAllMock = jest.spyOn(Producto, 'findAll').mockResolvedValue(productosSimulados);

    const req = { query: {} };
    const res = createMockRes();
    const next = jest.fn();

    await listarProductos(req, res, next);

    expect(findAllMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      data: productosSimulados
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('listarProductos debe capturar fallos de consulta y delegar al errorHandler con HTTP 500', async () => {
    const errorSimulado = new Error('Fallo simulado de lectura en tabla productos');
    jest.spyOn(Producto, 'findAll').mockRejectedValue(errorSimulado);

    const req = { query: {} };
    const res = createMockRes();
    const next = jest.fn();

    await listarProductos(req, res, next);

    // El controlador delega el error a next(error)
    expect(next).toHaveBeenCalledWith(errorSimulado);

    // Al pasar por el middleware centralizado errorHandler responde con HTTP 500
    errorHandler(errorSimulado, req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: false,
        status: 500,
        mensaje: 'Fallo simulado de lectura en tabla productos'
      })
    );
  });
});
