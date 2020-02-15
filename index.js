const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

// Connect to database
mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to database'))
  .catch(() =>
    console.log('There has been an error trying to connect to database')
  );

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Working');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
