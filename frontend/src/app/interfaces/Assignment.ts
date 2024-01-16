import { Member } from './Member';

export interface Assignment {
  id?: number;
  name: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline: Date;
  projectId: number;
  memberId: number;
  member?: Member;
}

export enum Status {
  ToDo = 0,
  InProgress = 1,
  Done = 2,
}
export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
}
