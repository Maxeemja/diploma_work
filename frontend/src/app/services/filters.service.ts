import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  constructor() {}

  public assignee = signal('all');
  public project = signal('all');
  public status = signal<number | string>('all');
  public priority = signal<number | string>('all');

  public queryParamsSignal = computed(() => {
    const queryParams: Record<string, string> = {};

    const project = this.project();
    if (project !== 'all') {
      queryParams['project'] = project;
    }

    const assignee = this.assignee();
    if (assignee !== 'all') {
      queryParams['assignee'] = assignee;
    }

    const status = this.status();
    if (status !== 'all') {
      queryParams['status'] = status.toString();
    }

    const priority = this.priority();
    if (priority !== 'all') {
      queryParams['priority'] = priority.toString();
    }

    return new URLSearchParams(queryParams).toString();
  });
}
