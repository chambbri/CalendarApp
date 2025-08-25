import pool from '../db/db';
import { IEvent } from '../types/event';

// add event to database
export const createEvent = async (
    title: string, 
    description: string, 
    startDate: Date, 
    endDate: Date, 
    location: string,
    createdBy: number
): Promise<IEvent> => {
    try {
        // insert new event into events table
        const eventQuery = `
            INSERT INTO events (title, description, start_date, end_date, location, created_by)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, title, description, start_date as "startDate", end_date as "endDate", location
        `;
        const values = [title, description || null, startDate, endDate, location || null, createdBy];
        const result = await pool.query(eventQuery, values);
        const newEvent = result.rows[0];

        // insert new event into user_events table with user creating event as host with RSVP 'Yes'
        const userEventQuery = `
            INSERT INTO event_users (user_id, event_id, rsvp, role, invited_at, responded_at)
            values ($1, $2, 'Yes', 'Host', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
        await pool.query(userEventQuery, [createdBy, newEvent.id]);
        
        return newEvent
    } catch (error) {
        console.error('Error creating event: ', error);
        throw error;
    }
};

//update event
export const updateEvent = async (
    id: string, 
    title: string, 
    description: string, 
    startDate: Date, 
    endDate: Date, 
    location: string
): Promise<IEvent | null> => {
    try {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format');
        }

        const query = `
            UPDATE events 
            SET title = $1, description = $2, start_date = $3, end_date = $4, location = $5
            WHERE id = $6
            RETURNING id, title, description, start_date as "startDate", end_date as "endDate", location
        `;
        
        const values = [title, description, startDate, endDate, location, numericId];
        const result = await pool.query(query, values);
        
        // If no rows were updated (id doesn't exist), return null
        if (result.rows.length === 0) {
            return null;
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Error updating event: ', error);
        throw error;
    }
};

// delete event
export const deleteEvent = async (id: string): Promise<IEvent | null> => {
    try {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format');
        }

        const query = `
            DELETE FROM events 
            WHERE id = $1
            RETURNING id, title, description, start_date as "startDate", end_date as "endDate", location
        `;
        
        const result = await pool.query(query, [numericId]);
        
        // If no rows were deleted (id doesn't exist), return null
        if (result.rows.length === 0) {
            return null;
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting event: ', error);
        throw error;
    }
};


// Get all events that the user is invited to (or created by)
export const getAllEvents = async (userId: number): Promise<IEvent[]> => {
    try {
        const query = `
            SELECT 
                e.id, e.title, e.description, e.start_date as "startDate", 
                e.end_date as "endDate", e.location,
                eu.role, eu.rsvp
            FROM events e
            JOIN event_users eu ON e.id = eu.event_id
            WHERE eu.user_id = $1
            ORDER BY e.start_date ASC;
        `;
        
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error finding events: ', error);
        throw error;
    }
};

// Get event by ID
export const getEventById = async (id: string): Promise<IEvent | null> => {
    try {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format');
        }

        const query = `
            SELECT id, title, description, start_date as "startDate", end_date as "endDate", location
            FROM events
            WHERE id = $1
        `;
        
        const result = await pool.query(query, [numericId]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Error finding event by ID: ', error);
        throw error;
    }
};