import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../services/api.service';
import { displayedColumns } from '../../constants';

@Component({
  selector: 'app-filters-group',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './filters-group.component.html',
  styleUrl: './filters-group.component.scss',
})
export class FiltersGroupComponent {
  private service = inject(ApiService);

  public currentProject = this.service.currentProject;
  public projects = this.service.projects;
  public assigneeFilter = signal(null);

  public displayedColumns = displayedColumns;

  onSelectChange(id: string) {
    this.currentProject.set(id);
    this.service.getAssignmentsList();
    if (id === 'all') {
      this.displayedColumns = ['projectName', ...this.displayedColumns];
    } else {
      this.displayedColumns = this.displayedColumns.filter((col) => {
        return col !== 'projectName';
      });
    }
  }
}
