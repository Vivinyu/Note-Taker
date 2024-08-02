// const path = require('path');
// const router = require('express').Router();

// // GET / - Returns the index.html file
// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// // GET /notes - Returns the notes.html file
// router.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/notes.html'));
// });

// // Wildcard route to direct users to index.html
// router.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// module.exports = router;

const path = require('path');
const router = require('express').Router();

// GET / - Returns the index.html file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// GET /notes - Returns the notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Wildcard route to direct users to index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;