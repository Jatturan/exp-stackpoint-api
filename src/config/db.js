import mongoose from 'mongoose';
import colors from 'colors';
import { MONGO_URI } from './index.js';

const connDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connDB;
