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
  'Не почато',
  'В процесі',
  'Виконано',
}
export enum Priority {
  'Низький',
  'Звичайний',
  'Високий',
}
