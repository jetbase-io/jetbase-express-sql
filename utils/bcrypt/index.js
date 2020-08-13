import bcrypt from 'bcrypt';

export const bcryptHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
};
