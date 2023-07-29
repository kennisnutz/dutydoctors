import { log } from 'console';
import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    const connection = await mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    connection.on('error', (err) => {
      console.log(
        'MongoDB connection Error! Please make sure MongoDb is running' + err
      );
      process.exit();
    });
  } catch (error: any) {
    console.log('Something went Wrong!');
    console.log(error);
  }
}
