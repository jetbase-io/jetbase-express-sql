import { Role } from '../../models/roles';
import { User } from '../../models/user';

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
      await User.create({
        email: 'jetbaseadmin@jetbase.com',
        password: 'jetbaseadmin',
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
