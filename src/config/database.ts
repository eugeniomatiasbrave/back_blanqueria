import { Sequelize } from 'sequelize';
import config from './config';

// Configuración de la conexión a la base de datos MySQL usando Sequelize

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '-03:00', // Timezone para Argentina
  }
);

export default sequelize; 