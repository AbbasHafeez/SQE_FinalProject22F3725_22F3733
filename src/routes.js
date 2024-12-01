const express = require('express');
const noteService = require('./noteService');

const router = express.Router();

router.get('/notes', (req, res) => {
  const notes = noteService.getAllNotes();
  res.json(notes);
});

router.get('/notes/:id', (req, res) => {
  const note = noteService.getNoteById(parseInt(req.params.id, 10));
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

router.post('/notes', (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = noteService.createNote(title, content);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/notes/:id', (req, res) => {
  const updatedNote = noteService.updateNote(parseInt(req.params.id, 10), req.body);
  if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
  res.json(updatedNote);
});

router.delete('/notes/:id', (req, res) => {
  const success = noteService.deleteNote(parseInt(req.params.id, 10));
  if (!success) return res.status(404).json({ error: 'Note not found' });
  res.status(204).send();
});

module.exports = router;
