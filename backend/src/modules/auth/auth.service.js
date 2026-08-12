import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../users/user.model.js';
import { env } from '../../config/env.js';

function signToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      isAdmin: user.isAdmin,
    },
    env.jwtSecret,
    {
      expiresIn: '7d',
    }
  );
}

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  return { user, token: signToken(user) };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  return { user, token: signToken(user) };
}
