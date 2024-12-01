const mockDb = require('./mockDB');

const noteService = {
  getAllNotes: () => mockDb.getAll(),
  getNoteById: (id) => mockDb.getById(id),
  createNote: (title, content) => {
    if (!title || !content) throw new Error('Title and content are required');
    return mockDb.create({ title, content });
  },
  updateNote: (id, updatedFields) => mockDb.update(id, updatedFields),
  deleteNote: (id) => mockDb.delete(id),
  searchNotes: (keyword) => mockDb.search(keyword),
};

module.exports = noteService;
