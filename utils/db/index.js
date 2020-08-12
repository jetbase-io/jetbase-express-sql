import { Role } from '../../models/roles';
import { User } from '../../models/user';
import { bcryptHash } from '../bcrypt';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const roles = [
  { id: 1, role_name: 'admin' },
  { id: 2, role_name: 'user' },
];

export const initialCreate = async () => {
  try {
    for (const role of roles) {
      const candidate = await Role.findOne({ where: { role_name: role.role_name } });
      if (!candidate) {
        await Role.create({ role_name: role.role_name, id: role.id });
      }
    }
    const user = await User.findOne({ where: { email: 'jetbaseadmin@jetbase.com' } });
    if (!user) {
      const password = await bcryptHash('jetbaseadmin');
      await User.create({
        email: 'jetbaseadmin@jetbase.com',
        password,
        first_name: 'Admin',
        last_name: 'JetBase',
        roleId: 1,
      });
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const findAllUsersQuery = ({ email, offset, limit }) => {
  let query = { attributes: ['id', 'first_name', 'last_name', 'email', ['roleId', 'role_id']] };
  if (email) {
    query = {
      ...query,
      where: {
        email: {
          [Op.like]: `%${email}%`,
        },
      },
    };
  }
  if (limit) {
    query = { ...query, limit };
  }
  if (offset) {
    query = { ...query, offset };
  }
  return query;
};
