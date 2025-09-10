import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Interfaz que define los atributos del modelo Contact
interface ContactAttributes {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definimos los atributos opcionales para la creación
interface ContactCreationAttributes extends Optional<ContactAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Clase modelo que extiende de Sequelize Model
class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public message!: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicialización del modelo
Contact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: true,
  }
);

export default Contact; 