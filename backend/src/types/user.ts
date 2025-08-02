export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
};

// Safe interface to pass to frontend
export interface IPublicUser {
    id: number;
    firstName: string;
    lastName: string;
};