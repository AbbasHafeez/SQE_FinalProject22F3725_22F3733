const request = require('supertest');
const app = require('../src/index');
const mockDb = require('../src/mockDB');

describe('Note-Taking App API', () => {
  beforeEach(() => {
    mockDb.reset(); // Reset the mock database before each test
  });

  test('should create a new note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({ title: 'Test Note', content: 'This is a test note' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Note');
  });

  test('should fetch all notes', async () => {
    mockDb.create({ title: 'Test Note 1', content: 'Content 1' });
    mockDb.create({ title: 'Test Note 2', content: 'Content 2' });

    const response = await request(app).get('/api/notes');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('should fetch a note by ID', async () => {
    const note = mockDb.create({ title: 'Test Note', content: 'Content' });

    const response = await request(app).get(`/api/notes/${note.id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Note');
  });

  test('should return 404 for non-existent note', async () => {
    const response = await request(app).get('/api/notes/999');

    expect(response.status).toBe(404);
  });

  test('should delete a note', async () => {
    const note = mockDb.create({ title: 'Test Note', content: 'Content' });

    const response = await request(app).delete(`/api/notes/${note.id}`);

    expect(response.status).toBe(204);
  });

  test('should return 404 when deleting non-existent note', async () => {
    const response = await request(app).delete('/api/notes/999');

    expect(response.status).toBe(404);
  });
});
