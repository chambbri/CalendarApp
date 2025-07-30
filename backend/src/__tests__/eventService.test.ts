// Mock the entire db module FIRST
jest.mock('../../db/db', () => {
  return {
    __esModule: true,
    default: {
      query: jest.fn()
    }
  };
});

// Now import everything
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../services/eventService';
import pool from '../../db/db';

// Get reference to the mocked query function
const mockQuery = pool.query as jest.MockedFunction<any>;

describe('Event Service', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  describe('updateEvent', () => {
    it('should update an event successfully', async () => {
      const mockUpdatedEvent = {
        id: 1,
        title: 'Updated Event',
        description: 'Updated Description',
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-02-02'),
        location: 'Updated Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockUpdatedEvent],
        command: 'UPDATE',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await updateEvent(
        '1',
        'Updated Event',
        'Updated Description',
        new Date('2025-02-01'),
        new Date('2025-02-02'),
        'Updated Location'
      );

      expect(result).toEqual(mockUpdatedEvent);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE events'),
        ['Updated Event', 'Updated Description', new Date('2025-02-01'), new Date('2025-02-02'), 'Updated Location', 1]
      );
    });

    it('should return null when event to update is not found', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'UPDATE',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const result = await updateEvent(
        '999',
        'Updated Event',
        'Updated Description',
        new Date('2025-02-01'),
        new Date('2025-02-02'),
        'Updated Location'
      );

      expect(result).toBeNull();
    });

    it('should handle update with null values', async () => {
      const mockUpdatedEvent = {
        id: 1,
        title: 'Updated Event',
        description: null,
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-02-02'),
        location: null
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockUpdatedEvent],
        command: 'UPDATE',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await updateEvent(
        '1',
        'Updated Event',
        '', // Empty description
        new Date('2025-02-01'),
        new Date('2025-02-02'),
        '' // Empty location
      );

      expect(result).toEqual(mockUpdatedEvent);
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event successfully', async () => {
      const mockDeletedEvent = {
        id: 1,
        title: 'Deleted Event',
        description: 'This will be deleted',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-02'),
        location: 'Test Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockDeletedEvent],
        command: 'DELETE',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await deleteEvent('1');

      expect(result).toEqual(mockDeletedEvent);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM events'),
        [1]
      );
    });

    it('should return null when event to delete is not found', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'DELETE',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const result = await deleteEvent('999');

      expect(result).toBeNull();
    });
  });

  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      // Mock database response
      const mockEvent = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-02'),
        location: 'Test Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockEvent],
        command: 'INSERT',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await createEvent(
        'Test Event',
        'Test Description',
        new Date('2025-01-01'),
        new Date('2025-01-02'),
        'Test Location'
      );

      expect(result).toEqual(mockEvent);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO events'),
        ['Test Event', 'Test Description', new Date('2025-01-01'), new Date('2025-01-02'), 'Test Location']
      );
    });

    it('should handle null description and location', async () => {
      const mockEvent = {
        id: 1,
        title: 'Test Event',
        description: null,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-02'),
        location: null
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockEvent],
        command: 'INSERT',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await createEvent(
        'Test Event',
        '', // Empty description
        new Date('2025-01-01'),
        new Date('2025-01-02'),
        '' // Empty location
      );

      expect(result).toEqual(mockEvent);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO events'),
        ['Test Event', null, new Date('2025-01-01'), new Date('2025-01-02'), null]
      );
    });

    it('should handle very long strings', async () => {
      const longTitle = 'A'.repeat(300); // 300 character title
      const longDescription = 'B'.repeat(1000); // 1000 character description
      
      const mockEvent = {
        id: 1,
        title: longTitle,
        description: longDescription,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-02'),
        location: 'Test Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockEvent],
        command: 'INSERT',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await createEvent(
        longTitle,
        longDescription,
        new Date('2025-01-01'),
        new Date('2025-01-02'),
        'Test Location'
      );

      expect(result).toEqual(mockEvent);
    });

    it('should throw an error when database fails', async () => {
      mockQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(
        createEvent('Test', 'Test', new Date(), new Date(), 'Test')
      ).rejects.toThrow('Database error');
    });

    it('should handle database constraint violations', async () => {
      mockQuery.mockRejectedValueOnce(new Error('violates check constraint "check_event_dates"'));

      await expect(
        createEvent('Test', 'Test', new Date('2025-01-02'), new Date('2025-01-01'), 'Test') // End before start
      ).rejects.toThrow('violates check constraint');
    });
  });

  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const mockEvents = [
        { id: 1, title: 'Event 1', description: 'Desc 1', startDate: new Date(), endDate: new Date(), location: 'Loc 1' },
        { id: 2, title: 'Event 2', description: 'Desc 2', startDate: new Date(), endDate: new Date(), location: 'Loc 2' }
      ];

      mockQuery.mockResolvedValueOnce({
        rows: mockEvents,
        command: 'SELECT',
        rowCount: 2,
        oid: 0,
        fields: []
      });

      const result = await getAllEvents();

      expect(result).toEqual(mockEvents);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('SELECT id, title, description')
      );
    });

    it('should return empty array when no events exist', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'SELECT',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const result = await getAllEvents();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle events with null values', async () => {
      const mockEvents = [
        { id: 1, title: 'Event 1', description: null, startDate: new Date(), endDate: new Date(), location: null }
      ];

      mockQuery.mockResolvedValueOnce({
        rows: mockEvents,
        command: 'SELECT',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await getAllEvents();

      expect(result).toEqual(mockEvents);
      expect(result[0].description).toBeNull();
      expect(result[0].location).toBeNull();
    });
  });

  describe('getEventById', () => {
    it('should return an event when found', async () => {
      const mockEvent = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Test Location'
      };

      mockQuery.mockResolvedValueOnce({
        rows: [mockEvent],
        command: 'SELECT',
        rowCount: 1,
        oid: 0,
        fields: []
      });

      const result = await getEventById('1');

      expect(result).toEqual(mockEvent);
    });

    it('should return null when event not found', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        command: 'SELECT',
        rowCount: 0,
        oid: 0,
        fields: []
      });

      const result = await getEventById('999');

      expect(result).toBeNull();
    });

    it('should throw error for invalid ID format', async () => {
      await expect(getEventById('not-a-number')).rejects.toThrow('Invalid ID format');
      
      // Verify database was never called for invalid ID
      expect(mockQuery).not.toHaveBeenCalled();
    });

    it('should throw error for empty ID', async () => {
      await expect(getEventById('')).rejects.toThrow('Invalid ID format');
      expect(mockQuery).not.toHaveBeenCalled();
    });


  });
});