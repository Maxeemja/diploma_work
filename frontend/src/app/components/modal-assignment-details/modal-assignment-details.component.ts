import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Assignment } from '../../shared/interfaces/Assignment';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Status, Priority } from '../../shared/interfaces/Assignment';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { UtilsService } from '../../services/utils.service';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
  selector: 'modal-assignment-details',
  templateUrl: './modal-assignment-details.component.html',
  styleUrl: './modal-assignment-details.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ModalWindowComponent,
    MatButtonModule,
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
  public data: Assignment = inject(DIALOG_DATA);
  public dialogRef = inject(DialogRef);
  private router = inject(Router);
  private service = inject(ApiService);
  public utilsService = inject(UtilsService);

  public title = `${this.data.project?.name?.replace(' ', '_')}-${
    this.data.number
  }`;

  // import enums
  public status = Status;
  public priority = Priority;

  goToEdit(id?: string) {
    if (!id) return;
    this.router.navigate(['edit', id]);
    this.dialogRef.close();
  }

  onStatusChange(value: number) {
    this.service.updateAssignment({ ...this.data, status: value });
  }
}
