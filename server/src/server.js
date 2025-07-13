const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const matchingRoutes = require('./routes/matching');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SESSION_SECRET || 'vibentribe-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/api/auth', authRoutes);
app.use('/api/match', matchingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
