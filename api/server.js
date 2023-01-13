const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../config.env' });

const app = require('./app');

const DB = process.env.DB_URI.replace('<password>', process.env.DB_PW);
mongoose.set('strictQuery', false); // in order to remove Deprecationwarning about strictQuery
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the DB succesully');
  });

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
