import { Member } from './Member';
import { Project } from './Project';

export interface Assignment {
  id?: string;
  _id: string;
  name: string;
  description: string;
  number: string;
  status: Status;
  priority: Priority;
  deadline: Date;
  project?: Project;
  assignee?: Member;
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
