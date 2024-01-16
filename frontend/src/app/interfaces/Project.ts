import { Assignment } from "./Assignment";

export interface Project {
  id: number,
  name: string,
  assignments: Assignment[]
}