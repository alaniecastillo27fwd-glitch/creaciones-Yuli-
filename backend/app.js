import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import productoRoutes from './routes/productoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de seguridad CORS leyendo la URL del frontend desde .env
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());

// Montaje de rutas siguiendo el flujo models -> controllers -> routes -> app.js
app.use('/api/productos', productoRoutes);

// Middleware centralizado de errores
app.use(errorHandler);

// Arranque del servidor
if (process.env.NODE_ENV !== 'test') {
  sequelize
    .authenticate()
    .then(() => console.log('Conexión a MySQL establecida correctamente.'))
    .catch((err) => console.warn('Aviso MySQL (verifica tu archivo .env):', err.message))
    .finally(() => {
      app.listen(PORT, () => {
        console.log(`Servidor de Creaciones Yuli activo en puerto ${PORT}`);
      });
    });
}

export default app;
