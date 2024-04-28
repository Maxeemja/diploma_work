import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../services/api.service';
import { displayedColumns } from '../../constants';
import { FiltersService } from '../../../services/filters.service';
import { Priority, Status } from '../../interfaces/Assignment';

@Component({
  selector: 'app-filters-group',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './filters-group.component.html',
  styleUrl: './filters-group.component.scss',
})
export class FiltersGroupComponent {
  private service = inject(ApiService);
  private filterService = inject(FiltersService);

  public projects = this.service.projects;
  public members = this.service.members;
  public userFilter = this.filterService.assignee;
  public projectFilter = this.filterService.project;
  public statusFilter = this.filterService.status;
  public priorityFilter = this.filterService.priority;

  public statuses = Status;
  public priorities = Priority;
  public displayedColumns = displayedColumns;

  onProjectChange(id: string) {
    this.projectFilter.set(id);
    this.service.getAssignmentsList();
    if (id === 'all') {
      this.displayedColumns = ['projectName', ...this.displayedColumns];
    } else {
      this.displayedColumns = this.displayedColumns.filter((col) => {
        return col !== 'projectName';
      });
    }
  }

  onUserChange(id: string) {
    this.userFilter.set(id);
    this.service.getAssignmentsList();
  }
  onStatusChange(status: string) {
    this.statusFilter.set(status);
    this.service.getAssignmentsList();
  }
  onPriorityChange(priority: string) {
    this.priorityFilter.set(priority);
    this.service.getAssignmentsList();
  }
}
