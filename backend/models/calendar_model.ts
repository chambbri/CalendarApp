import mongoose, { Schema, model, Document } from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/calendar_db')
    .then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

interface IEvent extends Document {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
}

const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

const Event = model<IEvent>('Event', eventSchema);

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
