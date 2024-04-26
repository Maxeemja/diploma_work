import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ModalWindowComponent } from '../../shared/components/modal-window/modal-window.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ApiService } from '../../services/api.service';
import { Entity } from '../../shared/types';
import { DeleteModalData } from '../../shared/interfaces/DeleteModalData';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-delete-confirmation',
  standalone: true,
  imports: [CommonModule, ModalWindowComponent, MatButtonModule],
  templateUrl: './modal-delete-confirmation.component.html',
  styleUrl: './modal-delete-confirmation.component.scss',
})
export class ModalDeleteConfirmationComponent {
  public data: DeleteModalData = inject(DIALOG_DATA);
  public dialogRef = inject(DialogRef);
  private service = inject(ApiService);

  public title = '';

  ngOnInit() {
    this.title = `Ви дійсно хочете видалити ${this.data.text}?`;
  }

  onConfirm() {
    const id = this.data.id;
    const entity = this.data.entity;

    switch (entity) {
      case 'assignment': {
        this.service.deleteAssignment(id);
        break;
      }
      case 'project': {
        this.service.deleteProject(id);
        break;
      }
      case 'member': {
        this.service.deleteMember(id);
        break;
      }
    }
    this.dialogRef.close();
  }
}
