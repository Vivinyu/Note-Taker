// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

// // API Routes
// app.get('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     res.json(JSON.parse(data));
//   });
// });

// // Create new note
// app.post('/api/notes', (req, res) => {
//   const newNote = { ...req.body, id: uuidv4() };
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     const notes = JSON.parse(data);
//     notes.push(newNote);
//     fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
//       if (err) throw err;
//       res.json(newNote);
//     });
//   });
// });

// // Delete note
// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     let notes = JSON.parse(data);
//     notes = notes.filter(note => note.id !== noteId);
//     fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
//       if (err) throw err;
//       res.json({ message: 'Note deleted' });
//     });
//   });
// });

// // HTML Routes
// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/notes.html'));
// });

// // Default route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

// //  Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  
  fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    
    const notes = JSON.parse(data);
    notes.push(newNote);
    
    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error saving note' });
      }
      res.json(newNote);
    });
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
