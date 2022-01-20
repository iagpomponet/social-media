/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.socialMediaTokenLogin || '';
    const tokenSecret = process.env.JWT_SECRET || '';
    const isTokenValid = jwt.verify(token, tokenSecret);

    if (isTokenValid) {
      return next();
    }
  } catch (err) {
    if (err instanceof Error && err?.name === 'TokenExpiredError') {
      return res
        .cookie('socialMediaIsLogged', 'false', {
          expires: new Date(Date.now() + 900),
          secure: false,
          httpOnly: false,
        })
        .status(500).json({
          error_message: 'Invalid auth token',
          error_data: err,
        });
    }

    return res.status(500).json({
      error_message: 'Invalid auth token',
      error_data: err,
    });
  }
};

export default checkAuth;
