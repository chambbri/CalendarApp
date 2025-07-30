import request from 'supertest';
import express from 'express';

// Mock the database pool FIRST
jest.mock('../db/db', () => {
  return {
    __esModule: true,
    default: {
      query: jest.fn()
    }
  };
});

// Now import everything that depends on the mock
import eventRoutes from '../routes/eventRoutes';
import pool from '../db/db';

// Get reference to the mocked query function
const mockQuery = pool.query as jest.MockedFunction<any>;

// Create test app
const app = express();
app.use(express.json());
app.use('/api', eventRoutes);

describe('Event Routes', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  describe('POST /api/events', () => {
    it('should create a new event', async () => {
      const newEvent = {
        title: 'Test Event',
        description: 'Test Description',
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2025-01-02T00:00:00.000Z',
        location: 'Test Location'
      };

      const mockCreatedEvent = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2025-01-02T00:00:00.000Z',
        location: 'Test Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockCreatedEvent],
        command: 'INSERT',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .post('/api/events')
        .send(newEvent)
        .expect(201);

      expect(response.body).toEqual({
        status: 'ok',
        event: mockCreatedEvent
      });

      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO events'),
        expect.arrayContaining(['Test Event', 'Test Description'])
      );
    });

    it('should return 500 when database fails', async () => {
      const newEvent = {
        // fail due to no id
        title: 'Test Event',
        description: 'Test Description',
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2025-01-02T00:00:00.000Z',
        location: 'Test Location'
      };

      mockQuery.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/api/events')
        .send(newEvent)
        .expect(500);

      expect(response.body).toEqual({
        error: 'Failed to create event'
      });
    });
  });

  describe('GET /api/events', () => {
    it('should return all events', async () => {
      const mockEvents = [
        { id: 1, title: 'Event 1', description: 'Desc 1', startDate: '2025-01-01T00:00:00.000Z', endDate: '2025-01-02T00:00:00.000Z', location: 'Loc 1' },
        { id: 2, title: 'Event 2', description: 'Desc 2', startDate: '2025-01-01T00:00:00.000Z', endDate: '2025-01-02T00:00:00.000Z', location: 'Loc 2' }
      ];

      mockQuery.mockResolvedValueOnce({
        rows: mockEvents,
        command: 'SELECT',
        rowCount: 2,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .get('/api/events')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        events: mockEvents
      });
    });

    it('should return empty array when no events exist', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'SELECT',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .get('/api/events')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        events: []
      });
    });
  });

  describe('GET /api/events/:id', () => {
    it('should return a specific event', async () => {
      const mockEvent = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2025-01-02T00:00:00.000Z',
        location: 'Test Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockEvent],
        command: 'SELECT',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .get('/api/events/1')
        .expect(200);

      expect(response.body).toEqual(mockEvent);
    });

    it('should return 404 when event not found', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'SELECT',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .get('/api/events/999')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Event not found'
      });
    });
  });

  describe('PUT /api/events/:id', () => {
    it('should update an event', async () => {
      const updateData = {
        title: 'Updated Event',
        description: 'Updated Description',
        startDate: '2025-02-01T00:00:00.000Z',
        endDate: '2025-02-02T00:00:00.000Z',
        location: 'Updated Location'
      };

      const mockUpdatedEvent = {
        id: 1,
        title: 'Updated Event',
        description: 'Updated Description',
        startDate: '2025-02-01T00:00:00.000Z',
        endDate: '2025-02-02T00:00:00.000Z',
        location: 'Updated Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockUpdatedEvent],
        command: 'UPDATE',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .put('/api/events/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        event: mockUpdatedEvent
      });
    });

    it('should return 404 when event to update not found', async () => {
      const updateData = {
        title: 'Updated Event',
        description: 'Updated Description',
        startDate: '2025-02-01T00:00:00.000Z',
        endDate: '2025-02-02T00:00:00.000Z',
        location: 'Updated Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'UPDATE',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .put('/api/events/999')
        .send(updateData)
        .expect(404);

      expect(response.body).toEqual({
        error: 'Event not found'
      });
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should delete an event', async () => {
      const mockDeletedEvent = {
        id: 1,
        title: 'Deleted Event',
        description: 'Test Description',
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2025-01-02T00:00:00.000Z',
        location: 'Test Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockDeletedEvent],
        command: 'DELETE',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .delete('/api/events/1')
        .expect(200);

      expect(response.body).toEqual({
        message: 'Event deleted successfully'
      });
    });

    it('should return 404 when event to delete not found', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'DELETE',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const response = await request(app)
        .delete('/api/events/999')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Event not found'
      });
    });
  });
});