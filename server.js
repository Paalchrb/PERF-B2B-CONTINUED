const express = require('express');
const connectDB = require('./config/database');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//log requests during development:
app.use('/', (req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
})

// Define Routes
app.use('/api/companies', require('./routes/api/companies'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/products', require('./routes/api/products'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder(public folder)
  app.use(express.static('client/build'));

  // Loads the static index.html file on all request not going to our defined apis
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
