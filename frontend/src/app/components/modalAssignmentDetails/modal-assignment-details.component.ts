import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'modal-assignment-details',
  templateUrl: './modal-assignment-details.component.html',
  styleUrl: './modal-assignment-details.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class ModalAssignmentDetailsComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: { id: string },
    public dialogRef: DialogRef
  ) {}
}
