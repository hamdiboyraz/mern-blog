const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(`${__dirname}/uploads`));
app.use('/uploads', express.static(`${__dirname}/uploads`));

// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   res.json({
//     requesData: {
//       username,
//       password,
//     },
//   });
// });

//app.post('/post', upload.single('files'), (req, res) => {});
app.use('/post', postRouter);
app.use('/', userRouter);

module.exports = app;
