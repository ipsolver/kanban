import { ColumnType } from './column';

export type Task = {
  id: string;
  title: string;
  description: string;
  position: number;
  type: ColumnType;
  boardId: string;
};
