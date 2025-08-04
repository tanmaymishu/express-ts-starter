import { connect } from 'mongoose';
import { AppDataSource } from '@/database/sql/data-source';
import ServiceProvider from './service-provider';

export default class DatabaseServiceProvider extends ServiceProvider {
  async register() {
    // Only initialize if not already initialized
    if (!AppDataSource.isInitialized) {
      AppDataSource.initialize()
        .then(() => {
          if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'testing') {
            console.log('Data Source has been initialized!');
          }
        })
        .catch((err) => {
          console.error(
            'Error during Data Source initialization. Please make sure you have created the database defined in the .env file.',
            err
          );
        });
    }

    // Connect to MongoDB. Example DSN: mongodb://username:password@localhost:27017/my_collection
    process.env.MONGO_DSN && (await connect(process.env.MONGO_DSN));
  }
}
