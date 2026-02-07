import type {Task} from './task';

export type Board = {
    id: string;
    name: string;
    tasks?: Task[];
};