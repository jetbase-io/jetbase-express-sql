const Sequelize = require('sequelize');

const Op = Sequelize.Op;

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
