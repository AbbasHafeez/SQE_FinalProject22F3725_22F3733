let notes = []; // In-memory mock database
let nextId = 1; // Auto-increment ID for notes

const mockDb = {
  getAll: () => notes,
  getById: (id) => notes.find((note) => note.id === id),
  create: (note) => {
    const newNote = { id: nextId++, ...note };
    notes.push(newNote);
    return newNote;
  },
  update: (id, updatedFields) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) return null;

    notes[noteIndex] = { ...notes[noteIndex], ...updatedFields };
    return notes[noteIndex];
  },
  delete: (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) return false;

    notes.splice(noteIndex, 1);
    return true;
  },
  search: (keyword) => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.content.toLowerCase().includes(keyword.toLowerCase())
    );
  },
  reset: () => {
    notes = [];
    nextId = 1;
  },
};

module.exports = mockDb;
