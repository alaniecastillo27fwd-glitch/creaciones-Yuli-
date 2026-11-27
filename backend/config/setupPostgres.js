import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PG_BIN_DIR = path.resolve(
  __dirname,
  '../node_modules/@embedded-postgres/windows-x64/native/bin'
);
const PG_DATA_DIR = path.join(os.homedir(), 'pgdata_creaciones_yuli');
const PG_LOG_FILE = path.join(PG_DATA_DIR, 'postgres.log');
const PG_PORT = Number(process.env.PG_PORT) || 5432;
const PG_USER = process.env.PG_USER || 'postgres';
const PG_PASSWORD = process.env.PG_PASSWORD || '1234';
const PG_DB = process.env.DB_NAME || 'creaciones_yuli';

export const startAndSeedPostgres = async () => {
  const initdbExe = path.join(PG_BIN_DIR, 'initdb.exe');
  const pgCtlExe = path.join(PG_BIN_DIR, 'pg_ctl.exe');

  console.log('==========================================================');
  console.log('Configurando servidor PostgreSQL local (puerto 5432)...');
  console.log('==========================================================');

  // 1. Inicializar clúster si no existe
  if (!fs.existsSync(path.join(PG_DATA_DIR, 'PG_VERSION'))) {
    console.log(`[1/4] Inicializando clúster PostgreSQL en ${PG_DATA_DIR}...`);
    fs.mkdirSync(PG_DATA_DIR, { recursive: true });
    execFileSync(
      initdbExe,
      ['-D', PG_DATA_DIR, '-U', PG_USER, '-E', 'UTF8', '--no-locale', '-A', 'trust'],
      { stdio: 'inherit' }
    );
  }

  // 2. Verificar si ya está corriendo o iniciarlo en segundo plano persistente
  let running = false;
  try {
    execFileSync(pgCtlExe, ['-D', PG_DATA_DIR, 'status'], { stdio: 'ignore' });
    running = true;
    console.log(`[2/4] El servidor PostgreSQL ya está activo en 127.0.0.1:${PG_PORT}.`);
  } catch {
    running = false;
  }

  if (!running) {
    console.log(`[2/4] Iniciando servicio PostgreSQL en 127.0.0.1:${PG_PORT}...`);
    execFileSync(
      pgCtlExe,
      ['-D', PG_DATA_DIR, '-l', PG_LOG_FILE, '-o', `-p ${PG_PORT}`, 'start'],
      { stdio: 'inherit' }
    );
  }

  // 3. Configurar contraseña y crear la base de datos creaciones_yuli
  const adminClient = new pg.Client({
    host: '127.0.0.1',
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: 'postgres'
  });

  await adminClient.connect();
  await adminClient.query(`ALTER USER ${PG_USER} WITH PASSWORD '${PG_PASSWORD}';`);

  const dbCheck = await adminClient.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [PG_DB]
  );

  if (dbCheck.rowCount === 0) {
    console.log(`[3/4] Creando base de datos "${PG_DB}" en PostgreSQL...`);
    await adminClient.query(`CREATE DATABASE ${PG_DB} ENCODING 'UTF8'`);
  } else {
    console.log(`[3/4] La base de datos "${PG_DB}" ya existe en PostgreSQL.`);
  }
  await adminClient.end();

  // 4. Poblar las 15 tablas y datos semilla
  const appClient = new pg.Client({
    host: '127.0.0.1',
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB
  });

  await appClient.connect();
  console.log(`[4/4] Ejecutando 01_schema_postgres.sql y 02_seed_postgres.sql...`);

  const schemaSql = fs.readFileSync(
    path.resolve(__dirname, '../../database/01_schema_postgres.sql'),
    'utf8'
  );
  const seedSql = fs.readFileSync(
    path.resolve(__dirname, '../../database/02_seed_postgres.sql'),
    'utf8'
  );

  await appClient.query(schemaSql);
  await appClient.query(seedSql);

  const tablesRes = await appClient.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);

  console.log(`\n[OK] Base de datos PostgreSQL "${PG_DB}" lista (${tablesRes.rowCount} tablas):`);
  console.log(tablesRes.rows.map((r) => `  - ${r.table_name}`).join('\n'));

  await appClient.end();
};

if (process.argv[1] === __filename) {
  startAndSeedPostgres().catch((err) => {
    console.error('[ERROR PostgreSQL]:', err);
    process.exit(1);
  });
}
