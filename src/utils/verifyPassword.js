import bcrypt from 'bcryptjs';

const verifyPassword = async (password, hashedPassword) => {
  const isVerified = await bcrypt.compare(password, hashedPassword);
  return isVerified;
};

export default verifyPassword;
