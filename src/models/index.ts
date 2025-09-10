import sequelize from '../config/database';
import config from '../config/config';

// Importar todos los modelos
import './Contact';
import User from './User';
// Importar aquí otros modelos cuando se creen

// Inicializar la conexión
export const initDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    // Sincronizar modelos con la base de datos
    // En producción, se recomienda usar migrations en lugar de sync
    if (config.server.nodeEnv === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Modelos sincronizados con la base de datos.');
    }
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    throw error;
  }
};

// Exportar los modelos
export { User };

export { sequelize };
export default sequelize; 