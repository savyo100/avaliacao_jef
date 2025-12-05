import { Attempt } from './attempt';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role?: 'USER' | 'ADMIN';
    attempts: Attempt[];
}