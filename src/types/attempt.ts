import {User} from './user'

export interface Attempt {
    id:number;
    userId:number;
    user: User;
    word: string;
    similarity: number;
    rank: number;
    createdAt: Date;
}