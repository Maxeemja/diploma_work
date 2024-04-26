import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Dialog } from '@angular/cdk/dialog';
import { ModalAssignmentDetailsComponent } from '../modal-assignment-details/modal-assignment-details.component';
import {
  Assignment,
  Priority,
  Status,
} from '../../shared/interfaces/Assignment';
import { displayedColumns } from '../../shared/constants';
import { AuthService } from '../../services/auth.service';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';
import { ModalDeleteConfirmationComponent } from '../modal-delete-confirmation/modal-delete-confirmation.component';
import { DeleteModalData } from '../../shared/interfaces/DeleteModalData';
import { FiltersGroupComponent } from '../../shared/components/filters-group/filters-group.component';

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
    FiltersGroupComponent,
  ],
})
export class HomeComponent {
  // ін"єкція
  public dialog = inject(Dialog);
  private service = inject(ApiService);
  public authService = inject(AuthService);

  // селектори
  public currentProject = this.service.currentProject;
  public projects = this.service.projects;
  public assignments = this.service.assignments;
  // список стовпців які відображатиме таблиця
  displayedColumns = displayedColumns;

  public status = Status;
  public priority = Priority;

  ngOnInit() {
    this.authService.getCurrentUser();
  }

  onDelete(id: number, event: Event) {
    event.stopPropagation();
    this.dialog.open<{ data: DeleteModalData }>(
      ModalDeleteConfirmationComponent,
      {
        data: { id, text: 'це завдання', entity: 'assignment' },
      }
    );
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
    this.dialog.open(ModalAssignmentDetailsComponent, {
      data: assignment,
    });
  }
}
