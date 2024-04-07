import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalAssignmentDetailsComponent } from '../modalAssignmentDetails/modal-assignment-details.component';
import {
  Assignment,
  Priority,
  Status,
} from '../../shared/interfaces/Assignment';
import { displayedColumns } from '../../shared/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    RouterLink,
    MatSelectModule,
    DialogModule,
  ],
})
export class HomeComponent {
  // injection
  private service = inject(ApiService);
  public dialog = inject(Dialog);

  // selectors
  public currentProject = this.service.currentProject;
  public projects = this.service.projects;
  public assignments = this.service.assignments;
  // table dispayed columns
  displayedColumns = displayedColumns;
  // import enums
  public status = Status;
  public priority = Priority;

  ngOnInit() {
    this.service.getInitialData();
  }

  onDelete(id: number, event: Event) {
    this.service.deleteAssignment(id);
    console.log(id);
    event.stopPropagation();
  }

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

  onItemClick(assignment: Assignment) {
    this.dialog.open<string>(ModalAssignmentDetailsComponent, {
      data: assignment,
    });
  }
}
