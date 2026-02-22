import {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
} from '../../utils/errors';

describe('Custom Error Classes', () => {
  describe('AppError', () => {
    it('should create error with statusCode and message', () => {
      const error = new AppError(500, 'Something went wrong');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Something went wrong');
      expect(error.name).toBe('AppError');
    });
  });

  describe('NotFoundError', () => {
    it('should create error with default message', () => {
      const error = new NotFoundError();
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Resource not found');
      expect(error.name).toBe('NotFoundError');
    });

    it('should create error with custom message', () => {
      const error = new NotFoundError('User not found');
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('User not found');
    });
  });

  describe('ValidationError', () => {
    it('should create error with default message', () => {
      const error = new ValidationError();
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Validation failed');
      expect(error.name).toBe('ValidationError');
    });

    it('should create error with custom message', () => {
      const error = new ValidationError('Invalid email format');
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid email format');
    });
  });

  describe('UnauthorizedError', () => {
    it('should create error with default message', () => {
      const error = new UnauthorizedError();
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Unauthorized');
      expect(error.name).toBe('UnauthorizedError');
    });

    it('should create error with custom message', () => {
      const error = new UnauthorizedError('Authentication required');
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Authentication required');
    });
  });

  describe('ForbiddenError', () => {
    it('should create error with default message', () => {
      const error = new ForbiddenError();
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Forbidden');
      expect(error.name).toBe('ForbiddenError');
    });

    it('should create error with custom message', () => {
      const error = new ForbiddenError('Access denied');
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Access denied');
    });
  });
});
