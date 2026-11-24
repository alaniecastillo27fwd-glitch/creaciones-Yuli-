import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `[OK] Conexión exitosa a MySQL -> Base de datos: "${process.env.DB_NAME}" en ${process.env.DB_HOST}:${process.env.DB_PORT}`
    );
    return true;
  } catch (error) {
    console.error('[ERROR] No se pudo conectar a la base de datos MySQL.');
    if (error.original?.code === 'ECONNREFUSED') {
      console.error('Causa: El servicio de MySQL parece estar apagado o el puerto es incorrecto.');
    } else if (error.original?.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Causa: Credenciales inválidas (revisa DB_USER y DB_PASSWORD en tu archivo .env).');
    } else if (error.original?.code === 'ER_BAD_DB_ERROR') {
      console.error(`Causa: La base de datos "${process.env.DB_NAME}" aún no existe. Ejecuta primero database/01_schema.sql.`);
    } else {
      console.error('Detalle técnico:', error.message);
    }
    return false;
  }
};

// Permite ejecutar directamente: node config/database.js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  testConnection().finally(() => sequelize.close());
}
