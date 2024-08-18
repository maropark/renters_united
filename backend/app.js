const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'app_user',
  host: 'localhost',
  database: 'renters_united',
  password: 'secure_password',
  port: 5432,
});

// Add your routes and handlers here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
