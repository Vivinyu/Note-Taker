const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../db/db.json');

// GET /api/notes
router.get('/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    res.json(JSON.parse(data));
  });
});

// POST /api/notes
router.post('/notes', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    
    const notes = JSON.parse(data);
    notes.push(newNote);
    
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error saving note' });
      }
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }
    
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== noteId);
    
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting note' });
      }
      res.json({ message: 'Note deleted successfully' });
    });
  });
});

module.exports = router;