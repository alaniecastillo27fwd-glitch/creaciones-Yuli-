import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { sequelize, testConnection } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import productoRoutes, { categoriaRouter } from './routes/productoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import inventarioRoutes from './routes/inventarioRoutes.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) });

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// 1. Seguridad CORS restringida exclusivamente a FRONTEND_URL definida en .env
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// 2. Parseo de payloads JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Ruta de verificación de estado (/api/health)
app.get('/api/health', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({
      ok: true,
      servicio: 'Creaciones Yuli API',
      estado: 'activo',
      base_datos: 'conectada',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    error.statusCode = 503;
    error.message = 'Servicio degradado: sin conexión a MySQL';
    next(error);
  }
});

// 4. Montaje de rutas siguiendo el flujo models -> controllers -> routes -> app.js
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRouter);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/inventario', inventarioRoutes);

// 5. Manejo de rutas inexistentes (404) y middleware centralizado de errores
app.use(notFoundHandler);
app.use(errorHandler);

// 6. Arranque del servidor validando primero la conexión a MySQL
const startServer = async () => {
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.warn('[AVISO] El servidor iniciará, pero verifica la conexión a MySQL en tu archivo .env');
  }

  app.listen(PORT, () => {
    console.log(`[OK] Servidor Express de Creaciones Yuli ejecutándose en http://localhost:${PORT}`);
    console.log(`[OK] Healthcheck disponible en http://localhost:${PORT}/api/health`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
