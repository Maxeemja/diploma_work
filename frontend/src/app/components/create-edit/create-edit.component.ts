import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../services/api.service';
import { take } from 'rxjs';
import {
  Assignment,
  Priority,
  Status,
} from '../../shared/interfaces/Assignment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss',
})
export class CreateEditComponent {
  // injections
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private service = inject(ApiService);

  // sources
  public members = this.service.members;
  public projects = this.service.projects;
  public isEdit = !!this.route.snapshot.params['id'];

  private assignmentId: string = '';

  // import enums
  public status = Status;
  public priority = Priority;

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(8)]],
    status: [0, Validators.required],
    priority: [0, Validators.required],
    deadline: ['', Validators.required],
    project: ['', Validators.required],
    assignee: ['', Validators.required],
  });

  ngOnInit() {
    if (this.isEdit) {
      this.service
        .getAssignment(this.route.snapshot.params['id'])
        .pipe(take(1))
        .subscribe((data: Assignment) => {
          this.myForm.setValue({
            name: data?.name,
            description: data?.description,
            status: data?.status,
            priority: data?.priority,
            deadline: data?.deadline.toString(),
            project: data?.project?._id || '',
            assignee: data?.assignee?._id || '',
          });
          this.assignmentId = data._id || '';
        });
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.isEdit) {
        return this.service.updateAssignment({
          _id: this.assignmentId,
          ...this.myForm.value,
        });
      }
      this.service.createAssignment(this.myForm.value);
    }
  }
}
