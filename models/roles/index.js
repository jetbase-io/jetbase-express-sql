import Sequelize from 'sequelize';
import db from '../index';

export const Role = db.sequelize.define('roles', {
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
