/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(500).json({
      error_message: 'Auth header is missing',
    });
  }

  try {
    const token = authHeader.split(' ')[1];
    const tokenSecret = process.env.JWT_SECRET || '';
    const isTokenValid = jwt.verify(token, tokenSecret);

    if (isTokenValid) {
      return next();
    }
  } catch (err) {
    return res.status(500).json({
      error_message: 'Invalid auth token',
    });
  }
};

export default checkAuth;
