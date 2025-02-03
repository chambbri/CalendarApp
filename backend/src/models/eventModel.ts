import mongoose, { Schema, model, Document } from 'mongoose';

// create interface for events to be added by user
interface IEvent extends Document {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
}

// create schema for events
const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

const Event = model<IEvent>('Event', eventSchema);

// add necessary CRUD functionality for database
const createEvent = async (title: string, description: string, startDate: Date, endDate: Date): Promise<IEvent> => {
    try {
        const event = new Event({ title, description, startDate, endDate });
        return await event.save();
    } catch (error) {
        console.error('Error creating event: ', error);
        throw error;
    }
};

const updateEvent = async (_id: string, title: string, description: string, startDate: Date, endDate: Date): Promise<IEvent | null> => {
    try {
        const result = await Event.findByIdAndUpdate(
            _id,
            { title, description, startDate, endDate },
            {new: true}
        );
        return result;
    } catch (error) {
        console.error('Error updating event: ', error);
        throw error;
    }
};

const deleteEvent = async (_id: string): Promise<IEvent | null> => {
    try {
        const result = await Event.findByIdAndDelete(
            _id
        )
        return result;
    } catch (error) {
        console.error('Error deleting event: ', error);
        throw error;
    }
};

const findEvent = async (filters = {}, projection = '', limit = 0): Promise<IEvent[] | null> => {
    try {
        const query = await Event.find(filters)
            .select(projection)
            .limit(limit);
        return query;
    } catch (error) {
        console.error('Error finding events: ', error);
        throw error;
    }
};

export {Event, createEvent, updateEvent, deleteEvent, findEvent};