const { connect } = require('mongoose');

const dbConnection = async () => {
  try {
    await connect(
      process.env.NODE_ENV === 'development'
        ? process.env.DB_URL_DEVELOPMENT
        : process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );

    console.log('DB connected');
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};

module.exports = dbConnection;
