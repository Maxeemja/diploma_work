import { Assignment } from './Assignment';
import { Project } from './Project';

export interface HomePageData {
  projects: Project[];
  assignments: Assignment[];
}
