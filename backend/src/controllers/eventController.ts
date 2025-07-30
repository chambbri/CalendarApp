import { Request, Response } from 'express';
import { createEvent, updateEvent, deleteEvent, getAllEvents, getEventById} from '../services/eventService';

export const createEventHandler = async (req: Request, res: Response) => {
    try {
        const { title, description, startDate, endDate, location } = req.body;
        const event = await createEvent(title, description, startDate, endDate, location);
        res.status(201).json({ status: 'ok', event });
    } catch (error) {
        console.error('Error creating event: ', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

export const updateEventHandler = async (req: Request, res: Response) => {
    try {
        const event = await updateEvent(
            req.params.id, 
            req.body.title, 
            req.body.description, 
            req.body.startDate, 
            req.body.endDate, 
            req.body.location
        );
        
        if (event) {
            res.status(200).json({ status: 'ok', event });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
};

export const deleteEventHandler = async (req: Request, res: Response) => {
    try{
        const event = await deleteEvent(req.params.id);
        if (event) {
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        console.error('Error deleting event: ', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

export const getEventsHandler = async (req: Request, res: Response) => {
    try {
        const events = await getAllEvents();
        res.status(200).json({ status: 'ok', events });
    } catch (error) {
        console.error('Error fetching events: ', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

export const getEventByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await getEventById(id);
        
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event: ', error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};
