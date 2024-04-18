import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalWindowComponent } from '../../shared/components/modal-window/modal-window.component';

@Component({
  selector: 'app-modal-create-project',
  templateUrl: './modal-create-project.component.html',
  styleUrl: './modal-create-project.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalWindowComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCreateProjectComponent {
  // injection
  public dialogRef = inject(DialogRef);
  private service = inject(ApiService);
  public projectName = '';

  onSubmit() {
    this.service.createProject(this.projectName);
    this.dialogRef.close();
  }
}
