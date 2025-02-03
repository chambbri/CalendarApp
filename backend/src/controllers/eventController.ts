import { Request, Response } from 'express';
import { Event, createEvent, updateEvent, deleteEvent, findEvent} from '../models/eventModel';

const createEventHandler = async (req: Request, res: Response) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const event = await createEvent(title, description, startDate, endDate);
        res.status(201).json({ status: 'ok', event });
    } catch (error) {
        console.error('Error creating event: ', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

const updateEventHandler = async (req: Request, res: Response) => {
    try {
        const event = await updateEvent(req.params.id, req.body.title, req.body.description, req.body.startDate, req.body.endDate);
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

const getEventsHandler = async (req: Request, res: Response) => {
    try {
        const filter = req.query;
        const events = await findEvent(filter, '', 0);
        res.status(200).json({ status: 'ok', events });
    } catch (error) {
        console.error('Error fetching events: ', error);
        res.status(500).json({ error: 'Failed to fetch events' })
    }
};

const deleteEventHandler = async (req: Request, res: Response) => {
    try{
        const event = await deleteEvent(req.params.id);
        if (event) {
            res.status(200).json({ message: 'Event deleted succesfully' });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        console.error('Error deleting event: ', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

export {createEventHandler, updateEventHandler, getEventsHandler, deleteEventHandler};