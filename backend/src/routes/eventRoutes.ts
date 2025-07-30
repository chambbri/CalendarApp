import express from 'express';
import { createEventHandler, updateEventHandler, getEventsHandler, deleteEventHandler, getEventByIdHandler } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventHandler);
router.put('/events/:id', updateEventHandler);
router.delete('/events/:id', deleteEventHandler);
router.get('/events', getEventsHandler);
router.get('/events/:id', getEventByIdHandler);

export default router;