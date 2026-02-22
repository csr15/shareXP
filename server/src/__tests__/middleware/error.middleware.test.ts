import { Request, Response } from 'express';
import { errorMiddleware } from '../../middleware/error.middleware';
import { AppError, NotFoundError, ValidationError } from '../../utils/errors';

jest.mock('../../utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('errorMiddleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('should handle AppError with correct status and message', () => {
    const error = new AppError(418, 'I am a teapot');
    errorMiddleware(error as Error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(418);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'I am a teapot' });
  });

  it('should handle NotFoundError', () => {
    const error = new NotFoundError('Page not found');
    errorMiddleware(error as Error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Page not found' });
  });

  it('should handle ValidationError', () => {
    const error = new ValidationError('Invalid input');
    errorMiddleware(error as Error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid input' });
  });

  it('should handle generic Error with 500 and log it', async () => {
    const { logger } = await import('../../utils/logger');
    const error = new Error('Unexpected error');
    errorMiddleware(error, mockReq as Request, mockRes as Response, mockNext);

    expect(logger.error).toHaveBeenCalledWith({ err: error }, 'Unhandled error');
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
