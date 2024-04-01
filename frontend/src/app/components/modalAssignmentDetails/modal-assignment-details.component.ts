import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Assignment } from '../../interfaces/Assignment';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAssignmentDetailsComponent implements OnInit {
  constructor(
    @Inject(DIALOG_DATA) public data: { assignment: Assignment },
    public dialogRef: DialogRef,
    private router: Router
  ) {}

  goToEdit(id?: string) {
    if (!id) return;
    this.router.navigate(['edit', id]);
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
