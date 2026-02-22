import request from 'supertest';
import app from '../app';

jest.mock('../config/database', () => ({
  connectDatabase: jest.fn().mockResolvedValue(undefined),
}));

describe('Express App', () => {
  describe('GET /', () => {
    it('should return health check status', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('404 handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/v1/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Resource not found');
    });

    it('should return 404 for random paths', async () => {
      const response = await request(app).get('/random/path/that/does/not/exist');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('API routes', () => {
    it('should reach sharexp route', async () => {
      const response = await request(app).get('/api/v1/sharexp');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello shareXP');
    });
  });
});
