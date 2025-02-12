import express from 'express';
import { createEventHandler, updateEventHandler, getEventsHandler, deleteEventHandler } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventHandler);
router.put('/events/:id', updateEventHandler);
router.get('/events', getEventsHandler);
router.delete('/events/:id', deleteEventHandler);

export default router;