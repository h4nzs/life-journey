import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import prisma from '../config/db.js';
import { HttpException } from '../utils/HttpException.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          tokoh: {
            select: {
              id: true,
            }
          }
        }
      });

      if (!req.user) {
        return next(new HttpException(401, 'Not authorized, user not found'));
      }

      next();
    } catch (error) {
      console.error(error);
      return next(new HttpException(401, 'Not authorized, token failed'));
    }
  }

  if (!token) {
    return next(new HttpException(401, 'Not authorized, no token'));
  }
});