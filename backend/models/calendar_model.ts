import mongoose, { Schema, model } from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/calendar_db')
    .then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

interface Event {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
}

const eventSchema = new Schema<Event>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

const Event = model<Event>('Event', eventSchema);