import Sequelize from 'sequelize';
import { sequelize } from '../../configs/db';

export const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});
