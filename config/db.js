import mysql from 'mysql';
import { config } from 'dotenv';

// Cargar variables de entorno (si usas .env local)
config();

// Obtener la URL pública de MySQL desde las variables de entorno
const mysqlUrl = process.env.MYSQL_PUBLIC_URL;

if (!mysqlUrl) {
  console.error('MYSQL_PUBLIC_URL no está definida. Verifica tu configuración.');
  process.exit(1);
}

// Crear la conexión utilizando la URL
const db = mysql.createConnection(mysqlUrl);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Database connected');
});

export default db;
