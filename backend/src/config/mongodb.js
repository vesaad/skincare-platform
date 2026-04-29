const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB u lidh me sukses');
  } catch (error) {
    console.error('MongoDB gabim:', error.message);
    process.exit(1);
  }
};

module.exports = connectMongo;