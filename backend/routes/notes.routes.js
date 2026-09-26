const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const auth = require('../middleware/auth');

router.get('/', auth, notesController.getNotes);
router.post('/', auth, notesController.createNote);
router.put('/:id', auth, notesController.updateNote);
router.delete('/:id', auth, notesController.deleteNote);

module.exports = router;
