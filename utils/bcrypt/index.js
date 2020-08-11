import bcrypt from 'bcrypt';

export const bcryptHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
