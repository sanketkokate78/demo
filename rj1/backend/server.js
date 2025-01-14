
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const { error } = require('console');
const path = require('path');

const app = express();
const port = 5000;
const JWT_SECRET = 'your_secret_key';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'S@nketmysql2',
  database: 'my_database',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});


// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

// API Endpoints
app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/categories', upload.single('category_image'), (req, res) => {
  const { category_name, category_colorcode, status } = req.body;
  const category_image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = 'INSERT INTO categories (category_image, category_name, category_colorcode, status) VALUES (?, ?, ?, ?)';
  db.query(sql, [category_image, category_name, category_colorcode, status], (err, result) => {
    if (err) throw err;
    res.status(201).send('Category added successfully');
  });
});

app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM categories WHERE category_id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send('Category deleted successfully');
  });
});

// app.put('/categories/:id', upload.single('category_image'), (req, res) => {
//   const { id } = req.params;
//   const { category_name, category_colorcode, status, existing_image } = req.body;
//   // Check if a new image was uploaded
//   const category_image = req.file ? `/uploads/${req.file.filename}` : existing_image; // Use existing image if no new image


//   const sql = 'UPDATE categories SET category_name = ?, category_colorcode = ?, status = ?, category_image = ? WHERE category_id = ?';
//   db.query(sql, [category_name, category_colorcode, status, category_image, id], (err, result) => {
//     if (err) throw err;
//     res.send('Category updated successfully');
//   });
//   });

app.put('/categories/:id', upload.single('category_image'), (req, res) => {
  const { id } = req.params;
  const { category_name, category_colorcode, status } = req.body;

  // Check if a new image was uploaded
  const category_image = req.file ? `/uploads/${req.file.filename}` : null; // Get new image path if uploaded

  // If no new image is uploaded, keep the existing image
  const sql = 'UPDATE categories SET category_name = ?, category_colorcode = ?, status = ?, category_image = COALESCE(?, category_image) WHERE category_id = ?';
  db.query(sql, [category_name, category_colorcode, status, category_image, id], (err, result) => {
      if (err) throw err;
      res.send('Category updated successfully');
  });
});



// for manage vehicle

// API Endpoints
app.get('/vehicle', (req, res) => {
  db.query('SELECT * FROM vehicle', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/vehicle', upload.single('vehicle_image'), (req, res) => {
  const { vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status } = req.body;
  const vehicle_image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = 'INSERT INTO vehicle (vehicle_image,vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status) VALUES (?, ?, ?, ? ,?)';
  db.query(sql, [vehicle_image, vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status], (err, result) => {
    if (err) throw err;
    res.status(201).send('vehicle added successfully');
  });
});

app.delete('/vehicle/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM vehicle WHERE vehicle_id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send('vehicle deleted successfully');
  });
});

app.put('/vehicle/:id', upload.single('vehicle_image'), (req, res) => {
  const { id } = req.params;
  const { vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status } = req.body;

  // Check if a new image was uploaded
  const vehicle_image = req.file ? `/uploads/${req.file.filename}` : null; // Get new image path if uploaded

  // If no new image is uploaded, keep the existing image
  const sql = 'UPDATE vehicle SET vehicle_name = ?, vehicle_base_fare = ?, vehicle_traveled_miles = ?, status = ?, vehicle_image = COALESCE(?, vehicle_image) WHERE vehicle_id = ?';
  db.query(sql, [vehicle_name, vehicle_base_fare, vehicle_traveled_miles, status, vehicle_image, id], (err, result) => {
      if (err) throw err;
      res.send('vehicle updated successfully');
  });
});





app.post('/admin/signin', async (req, res) => {
  try {
    const { admin_username, admin_password } = req.body;

    const [admins] = await db.promise().query('SELECT * FROM admin WHERE admin_username = ?', [admin_username]);
    if (!admins.length) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
 
    const isValidPassword = await bcrypt.compare(admin_password, admins[0].admin_password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   const token = jwt.sign({ id: admins[0].admin_id, role_id: admins[0].role_id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});





app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.promise().query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword]);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (!users.length) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, users[0].password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: users[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
