require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth-route');
const todoRoutes = require('./routes/todo-route');
const PORT = process.env.PORT;
const db = require('./db/config');
const cors = require('cors');

//APP INITIALIZATION
const app = express();

//DATABASE CONNECTION
db();

//CORS
app.use(cors());

//APP CONFIG
app.use(express.static(__dirname + '/public/'));
app.use(express.json());

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
