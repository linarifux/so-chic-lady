import bcrypt from 'bcryptjs';

// Pre-hash the password '123456' for development
const password = await bcrypt.hash('123456', 10);

const users = [
  {
    name: 'Admin So Chic',
    email: 'admin@sochiclady.com',
    password: password,
    isAdmin: true,
  },
  {
    name: 'Client Test',
    email: 'client@example.com',
    password: password,
    isAdmin: false,
  }
];

export default users;