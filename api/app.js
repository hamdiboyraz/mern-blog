const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

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
