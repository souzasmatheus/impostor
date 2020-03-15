const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

// Cors middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('Working');
});

app.use('/api/admin', require('./routes/admin'));
app.use('/api/product', require('./routes/product'));
app.use('/api/page', require('./routes/page'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
