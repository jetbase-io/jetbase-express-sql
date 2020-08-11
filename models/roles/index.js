import Sequelize from 'sequelize';
import { sequelize } from '../../db';
import { User } from '../user';

export const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Role.hasMany(User);
