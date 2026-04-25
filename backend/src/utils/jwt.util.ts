import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const signToken = (payload: object, expiresIn: number) => {
      const options: SignOptions = { expiresIn };
      return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
      return jwt.verify(token, JWT_SECRET);
};