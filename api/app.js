const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   res.json({
//     requesData: {
//       username,
//       password,
//     },
//   });
// });

app.use('/', userRouter);

module.exports = app;
