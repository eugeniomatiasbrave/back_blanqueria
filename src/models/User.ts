import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

// Definición de la interfaz para los atributos del usuario
interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

// Interfaz para la instancia del modelo
interface UserInstance extends Model<UserAttributes, Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>>, UserAttributes {
  comparePassword(password: string): Promise<boolean>;
}

// Definición del modelo
const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: UserInstance) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user: UserInstance) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// Método para verificar la contraseña
(User.prototype as any).comparePassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default User; 