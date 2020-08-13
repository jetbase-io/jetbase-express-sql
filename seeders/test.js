const bcrypt = require('bcrypt');

const roles = [
  { id: 1, role_name: 'admin' },
  { id: 2, role_name: 'user' },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const role of roles) {
      await queryInterface.bulkInsert('roles', [
        {
          id: role.id,
          role_name: role.role_name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('jetbaseadmin', salt);

    await await queryInterface.bulkInsert('users', [
      {
        email: 'jetbaseadmin@jetbase.com',
        password,
        first_name: 'Admin',
        last_name: 'JetBase',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jetbaseuser@jetbase.com',
        password,
        first_name: 'User',
        last_name: 'JetBase',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};
