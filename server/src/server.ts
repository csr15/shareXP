import app from './app';
import { config } from './config';
import { connectDatabase } from './config/database';
import { logger } from './utils/logger';

const start = async () => {
  await connectDatabase();

  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });
};

start().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
