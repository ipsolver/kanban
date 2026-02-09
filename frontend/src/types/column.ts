export const ColumnType = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

export type ColumnType = typeof ColumnType[keyof typeof ColumnType];
