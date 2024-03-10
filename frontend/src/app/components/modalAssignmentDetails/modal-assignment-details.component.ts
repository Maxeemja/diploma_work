import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Assignment } from '../../interfaces/Assignment';
@Component({
  selector: 'modal-assignment-details',
  templateUrl: './modal-assignment-details.component.html',
  styleUrl: './modal-assignment-details.component.scss',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAssignmentDetailsComponent implements OnInit {
  constructor(
    @Inject(DIALOG_DATA) public data: { assignment: Assignment },
    public dialogRef: DialogRef
  ) {}

  ngOnInit(): void {}
}
