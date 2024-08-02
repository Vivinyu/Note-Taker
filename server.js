// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// // app.use(express.static('public'));

// // HTML Routes
// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/notes.html'));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../public/index.html'));
// // });

// // API Routes
// app.get('/api/notes', (req, res) => {
//   fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Error reading notes' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.post('/api/notes', (req, res) => {
//   const newNote = { ...req.body, id: uuidv4() };
  
//   fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Error reading notes' });
//     }
    
//     const notes = JSON.parse(data);
//     notes.push(newNote);
    
//     fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Error saving note' });
//       }
//       res.json(newNote);
//     });
//   });
// });

// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Error reading notes' });
//     }
//     let notes = JSON.parse(data);
//     notes = notes.filter(note => note.id !== noteId);
//     fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Error deleting note' });
//       }
//       res.json({ message: 'Note deleted successfully' });
//     });
//   });
// });

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  console.log('GET /api/notes route hit');
  fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  console.log('POST /api/notes route hit', req.body);
  const newNote = { ...req.body, id: uuidv4() };
  
  fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    
    const notes = JSON.parse(data);
    notes.push(newNote);
    
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error saving note' });
      }
      res.json(newNote);
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  console.log('DELETE /api/notes/:id route hit', req.params.id);
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== noteId);
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting note' });
      }
      res.json({ message: 'Note deleted successfully' });
    });
  });
});

// Wildcard route to direct users to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));