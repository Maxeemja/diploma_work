import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalAssignmentDetailsComponent } from '../modal-assignment-details/modal-assignment-details.component';
import {
  Assignment,
  Priority,
  Status,
} from '../../shared/interfaces/Assignment';
import { displayedColumns } from '../../shared/constants';
import { AuthService } from '../../services/auth.service';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';

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
  private router = inject(Router);
  authService = inject(AuthService);

  // selectors
  public currentProject = this.service.currentProject;
  public projects = this.service.projects;
  public assignments = this.service.assignments;
  // table dispayed columns
  displayedColumns = displayedColumns;
  // import enums
  public status = Status;
  public priority = Priority;
  public isUserAdmin = false;

  ngOnInit() {
    if (!this.authService.getToken()) {
      this.router.navigate(['login']);
    } else {
      this.service.getInitialData();
    }
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

  onAddProject() {
    this.dialog.open(ModalCreateProjectComponent);
  }

  onItemClick(assignment: Assignment) {
    this.dialog.open<string>(ModalAssignmentDetailsComponent, {
      data: assignment,
    });
  }
}
