
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
// app.get('/vehicle', (req, res) => {
//   db.query('SELECT * FROM vehicle', (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// app.post('/vehicle', upload.single('vehicle_image'), (req, res) => {
//   const { vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status } = req.body;
//   const vehicle_image = req.file ? `/uploads/${req.file.filename}` : null;

//   const sql = 'INSERT INTO vehicle (vehicle_image,vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status) VALUES (?, ?, ?, ? ,?)';
//   db.query(sql, [vehicle_image, vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status], (err, result) => {
//     if (err) throw err;
//     res.status(201).send('vehicle added successfully');
//   });
// });

// app.delete('/vehicle/:id', (req, res) => {
//   const { id } = req.params;
//   db.query('DELETE FROM vehicle WHERE vehicle_id = ?', [id], (err, result) => {
//     if (err) throw err;
//     res.send('vehicle deleted successfully');
//   });
// });

// app.put('/vehicle/:id', upload.single('vehicle_image'), (req, res) => {
//   const { id } = req.params;
//   const { vehicle_name, vehicle_base_fare,vehicle_traveled_miles, status } = req.body;

//   // Check if a new image was uploaded
//   const vehicle_image = req.file ? `/uploads/${req.file.filename}` : null; // Get new image path if uploaded

//   // If no new image is uploaded, keep the existing image
//   const sql = 'UPDATE vehicle SET vehicle_name = ?, vehicle_base_fare = ?, vehicle_traveled_miles = ?, status = ?, vehicle_image = COALESCE(?, vehicle_image) WHERE vehicle_id = ?';
//   db.query(sql, [vehicle_name, vehicle_base_fare, vehicle_traveled_miles, status, vehicle_image, id], (err, result) => {
//       if (err) throw err;
//       res.send('vehicle updated successfully');
//   });
// });

//for manage vehicle type

app.get('/vehicle_type', (req, res) => {
  db.query('SELECT * FROM vehicle_type', (err, results) => {
if (err) throw err;
res.json(results);
});
});

app.post('/vehicle_type',upload.single
  ('vehicle_image'), (req, res) => {
    const { vehicle_name, vehicle_base_fare, vehicle_charges,
      vehicle_description, status } = req.body;
      const vehicle_image = req.file ? `/uploads/${req.file.filename}` : null;

      const sql = 'INSERT INTO vehicle_type (vehicle_image,vehicle_name, vehicle_base_fare, vehicle_charges, vehicle_description, status) VALUES (?, ?, ?, ? ,?, ?)';
      db.query(sql, [vehicle_image, vehicle_name, vehicle_base_fare, vehicle_charges, vehicle_description, status],
        (err, result) => {
          if (err) throw err;
          res.status(201).send('vehicle type added successfully');
          });
        });


app.delete('/vehicle_type/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM vehicle_type WHERE vehicle_id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send('vehicle type deleted successfully');
  });
});


app.put('/vehicle_type/:id', upload.single('vehicle_image'), (req, res) => {
  const { id } = req.params;
  const { vehicle_name, vehicle_base_fare, vehicle_charges, vehicle_description, status } = req.body;

  const vehicle_image = req.file ? `/uploads/{req.file.filename}` : null; 

const sql = 'UPDATE vehicle_type SET vehicle_name = ?, vehicle_base_fare = ?, vehicle_charges = ?, vehicle_description = ?, status = ?, vehicle_image = COALESCE(?, vehicle_image) WHERE vehicle_id = ?';

db.query(sql, [vehicle_name, vehicle_base_fare, vehicle_charges, vehicle_description,
  status, vehicle_image, id], (err, result) => {
    if (err) throw err;
    res.send('vehicle type updated successfully');
    });
    });



// for manage vehicle list

app.get('/vehicle_list', (req, res) => {

  const sql = `
  SELECT v.*, d.driver_name, d.driver_image
  FROM vehicle_list v
  LEFT JOIN assigndriver a ON v.vehicle_name = a.vehicle_name AND v.vehicle_type = a.vehicle_type
  LEFT JOIN driver_list d ON a.driver_id = d.driver_id
`;

  db.query('SELECT * FROM vehicle_list', (err, results) => {
if (err) throw err;
res.json(results);
});
});

app.post('/vehicle_list', upload.single('vehicle_image'), (req, res) => {
  const { vehicle_name, vehicle_type,  vehicle_registration_number, vehicle_model, 
    vehicle_driver_details, vehicle_brand, status } =req.body;
    const vehicle_image = req.file ? `/uploads/${req.file.filename}` : null;

   const sql = 'INSERT INTO vehicle_list (vehicle_name, vehicle_type, vehicle_registration_number, vehicle_model, vehicle_driver_details, vehicle_brand,  status,vehicle_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [vehicle_name, vehicle_type, vehicle_registration_number, vehicle_model,
      vehicle_driver_details, vehicle_brand, status, vehicle_image], (err, result) => {
        if(err) throw err;
        res.status(201).
        send('vehicle list created successfully');
        });
        });
    


  app.put('/vehicle_list/:id',
    upload.single('vehicle_image'), (req, res) => {
      const { id } = req.params;
      const { vehicle_name, vehicle_type, vehicle_registration_number, vehicle_model,
        vehicle_driver_details, vehicle_brand, status } = req.body;

        const vehicle_image = req.file ? `/uploads/${req.file.filename}` : null;

const sql ='UPDATE vehicle_list SET vehicle_name = ?, vehicle_type = ?, vehicle_registration_number = ?, vehicle_model = ?, vehicle_driver_details = ?, vehicle_brand = ?, status = ?, vehicle_image = COALESCE(?, vehicle_image) WHERE vehicle_id = ?';
db.query(sql, [vehicle_name, vehicle_type, vehicle_registration_number, vehicle_model,
  vehicle_driver_details, vehicle_brand, status, vehicle_image, id], (err, result) => {
    if (err) throw err;
    res.send('vehicle list updated successfully');
  });
});
 
  
app.delete('/vehicle_list/:id',(req, res) => {
    const { id } = req.params;
 db.query('DELETE FROM vehicle_list WHERE vehicle_id = ?', [id], (err, result) => {
      if (err) throw err;
      res.send('vehicle list deleted successfully');
    });

});


//for manage driver list

app.get('/driver_list', (req, res) => {
  db.query('SELECT * FROM driver_list', (err, result) => {
    if (err) throw err;
    res.send(result);
    });
});

app.get('/driver_doc/:id', (req, res) => {
  const { id } = req.params;
  console.log("Received ID for driver_doc:", id);
  db.query('SELECT * FROM driver_doc WHERE driver_id = ?', [id], (err, result) => {
    if (err) throw err;
    console.log("Driver Document Query Result:", result); 
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send('Driver doc not found');
    }
  });
});


// Get a specific driver by ID
app.get('/driver_list/:id', (req, res) => {
  const { id } = req.params;
  console.log("Received ID for driver_list:", id); 
  db.query('SELECT * FROM driver_list WHERE driver_id = ?', [id], (err, result) => {
      if (err) throw err;
      console.log("Driver List Query Result:", result);
      if (result.length > 0) {
          res.send(result[0]);
      } else {
          res.status(404).send('Driverrrr not found');
      }
  });
});

app.post('/driver_list', upload.fields([{ name: 'driver_image', maxCount: 1 }, { name: 'dlimage', maxCount: 1 }, { name: 'image_nplate', maxCount: 1 }, { name: 'other_doc', maxCount: 1 }]),
(req, res) => {
  const { driver_name, driver_email , driver_mobile,driver_address, is_vehicle, is_verified , status} =req.body;
  // const { driver_image, dlimage, image_nplate, other_doc } = req.files;
  const driver_image = req.files.driver_image ? `/uploads/${req.files.driver_image[0].filename}` : null;
  const dlimage = req.files.dlimage ? `/uploads/${req.files.dlimage[0].filename}` : null;
  const image_nplate = req.files.image_nplate ? `/uploads/${req.files.image_nplate[0].filename}` : null;
  const other_doc = req.files.other_doc ? `/uploads/${req.files.other_doc[0].filename}` : null;

  const sql = 'INSERT INTO driver_list (driver_name, driver_email , driver_mobile,driver_address, is_vehicle, is_verified, status, driver_image ) VALUES (?,?,?,?,?,?,?,?)';

  db.query(sql, [driver_name, driver_email , driver_mobile,driver_address, is_vehicle, is_verified, status, driver_image],(err, result) => {
    if (err) throw err;
    const driver_id = result.insertId;


    const sql2 = 'INSERT INTO driver_doc (driver_id, driver_dlnumber, dlimage, vehicle_number_plate, image_nplate, other_doc, driver_vtype) VALUES (?,?,?,?,?,?,?)';

    db.query(sql2, [driver_id, req.body.driver_dlnumber, dlimage, req.body.vehicle_number_plate, image_nplate, other_doc, req.body.driver_vtype], (err, result) => {
      if (err) throw err;
    res.status(201).
    send('driver list added successfully');
    });
  });
  });

  app.put('/driver_list/:id', upload.fields([{ name: 'driver_image', maxCount: 1 }, { name: 'dlimage', maxCount: 1 }, { name: 'image_nplate', maxCount: 1 }, { name: 'other_doc', maxCount: 1 }]),
   (req, res) => {
    const { id } = req.params;
    const { driver_name, driver_email , driver_mobile,driver_address, is_vehicle, is_verified, status} =req.body;

    const driver_image = req.files.driver_image ? `/uploads/${req.files.driver_image[0].filename}` : null;
  const dlimage = req.files.dlimage ? `/uploads/${req.files.dlimage[0].filename}` : null;
  const image_nplate = req.files.image_nplate ? `/uploads/${req.files.image_nplate[0].filename}` : null;
  const other_doc = req.files.other_doc ? `/uploads/${req.files.other_doc[0].filename}` : null;

    const sql ='UPDATE driver_list SET driver_name = ?, driver_email = ?, driver_mobile = ?, driver_address = ?, is_vehicle = ?, is_verified = ?, status = ?,  driver_image = COALESCE(?,driver_image) WHERE driver_id = ?';
    db.query(sql, [driver_name, driver_email , driver_mobile,driver_address, is_vehicle, is_verified, status,
      driver_image, id], (err, result) => {
        if (err) throw err;

        // Get the existing driver document
      db.query('SELECT * FROM driver_doc WHERE driver_id = ?', [id], (err, result) => {
        if (err) throw err;
        const existingDoc = result[0];

        const sql2 = 'UPDATE driver_doc SET driver_dlnumber = ?, dlimage = COALESCE(?, dlimage), vehicle_number_plate = ?, image_nplate = COALESCE(?, image_nplate), other_doc = COALESCE(?, other_doc), driver_vtype = ? WHERE driver_id = ?';

        db.query(sql2, [req.body.driver_dlnumber, dlimage, req.body.vehicle_number_plate, image_nplate, other_doc, req.body.driver_vtype, id], (err, result) => {
          if (err) throw err;
        res.send('driver list updated successfully');
        });
  });
  });
  });



  app.delete('/driver_list/:id', (req, res) => {
    const { id } = req.params;
    db.beginTransaction((err) => {
      if (err) throw err;
      db.query('DELETE FROM driver_doc WHERE driver_id = ?', [id], (err, result) => {
        if (err) {
          db.rollback(() => {
            throw err;
          });
        }
        db.query('DELETE FROM driver_list WHERE driver_id = ?', [id], (err, result) => {
          if (err) {
            db.rollback(() => {
              throw err;
            });
          }
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
            res.send('driver list deleted successfully');
          });
        });
      });
    });
  });

///////////////////////////////////////////////

app.post('/assigndriver', (req, res) => {
  const { driver_id, vehicle_type, vehicle_name } = req.body;

  const sql = 'INSERT INTO assigndriver (driver_id, vehicle_type, vehicle_name) VALUES (?, ?, ?)';
  db.query(sql, [driver_id, vehicle_type, vehicle_name], (err, result) => {
    if (err) {
      console.error("Error inserting assigned driver:", err);
      return res.status(500).send('Server error');
    }
    
    res.status(201).send('Driver assigned successfully');
  });
});

// Add this block in your server.js file
app.get('/assigndriver', (req, res) => {
  const sql = `
    SELECT a.assignment_id, a.driver_id, a.vehicle_type, a.vehicle_name, d.driver_name
    FROM assigndriver a
    JOIN driver_list d ON a.driver_id = d.driver_id
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching assigned drivers:", err);
      return res.status(500).send('Server error');
    }
    
    res.json(results);
  });
});


////////////////////////////////////////////////

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
