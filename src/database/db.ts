import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/brisk');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1);
    }
  };