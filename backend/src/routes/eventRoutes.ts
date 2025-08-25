import express from 'express';
import { createEventHandler, updateEventHandler, getEventsHandler, deleteEventHandler, getEventByIdHandler } from '../controllers/eventController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/events', authenticateToken, createEventHandler);
router.put('/events/:id', updateEventHandler);
router.delete('/events/:id', deleteEventHandler);
router.get('/events', authenticateToken, getEventsHandler);
router.get('/events/:id', getEventByIdHandler);

export default router;