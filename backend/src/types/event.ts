// create interface for events to be added by user
export interface IEvent {
    id: number;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    location?: string;
}
