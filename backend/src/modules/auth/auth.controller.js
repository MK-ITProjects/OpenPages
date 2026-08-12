import { registerUser, loginUser } from './auth.service.js';
import { User } from '../users/user.model.js';

function toPublicUser(user) {
  const {
    _id,
    name,
    email,
    bio,
    avatarUrl,
    isAdmin,
  } = user;

  return {
    id: _id,
    name,
    email,
    bio,
    avatarUrl,
    isAdmin,
  };
}

export async function register(req, res, next) {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ user: toPublicUser(user), token });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { user, token } = await loginUser(req.body);
    res.json({ user: toPublicUser(user), token });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(toPublicUser(user));
  } catch (err) {
    next(err);
  }
}
