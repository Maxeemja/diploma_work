import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Assignment } from '../../shared/interfaces/Assignment';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Status, Priority } from '../../shared/interfaces/Assignment';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'modal-assignment-details',
  templateUrl: './modal-assignment-details.component.html',
  styleUrl: './modal-assignment-details.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    RouterModule,
    MatSelectModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAssignmentDetailsComponent {
  // injection
  public data: Record<'assignment', Assignment> = inject(DIALOG_DATA);
  public dialogRef = inject(DialogRef);
  private router = inject(Router);
  private service = inject(ApiService);
  public utilsService = inject(UtilsService);

  // import enums
  public status = Status;
  public priority = Priority;

  goToEdit(id?: string) {
    if (!id) return;
    this.router.navigate(['edit', id]);
    this.dialogRef.close();
  }

  onStatusChange(value: number) {
    console.log(value);
    this.service.updateAssignment({ ...this.data.assignment, status: value });
  }

  ngOnDestroy() {
    this.service.getAssignmentsList();
  }
}
