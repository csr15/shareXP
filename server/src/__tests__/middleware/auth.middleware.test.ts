import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../middleware/auth.middleware';
import { UnauthorizedError } from '../../utils/errors';

jest.mock('jsonwebtoken');
jest.mock('../../config', () => ({
  config: { jwtSecret: 'test-secret' },
}));

describe('authMiddleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { cookies: {} };
    mockRes = {
      clearCookie: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('should call next() when valid token is provided', () => {
    mockReq.cookies = { token: 'valid-token' };
    (jwt.verify as jest.Mock).mockReturnValue({});

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should throw UnauthorizedError when no token is provided', () => {
    mockReq.cookies = {};

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow(UnauthorizedError);

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow('Authentication required');
  });

  it('should throw UnauthorizedError when token is undefined', () => {
    mockReq.cookies = { token: undefined };

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow(UnauthorizedError);
  });

  it('should clear cookie and throw UnauthorizedError when token is invalid', () => {
    mockReq.cookies = { token: 'invalid-token' };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('invalid token');
    });

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow(UnauthorizedError);

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow('Invalid or expired token');

    expect(mockRes.clearCookie).toHaveBeenCalledWith('token');
  });
});
