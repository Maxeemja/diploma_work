import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../services/api.service';
import { take } from 'rxjs';

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
  ],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss',
})
export class CreateEditComponent {
  public projectId: number = +this.route.snapshot.params['id'];
  public members$ = this.service.members$;
  public isEdit = this.router.url.includes('edit') || false;
  assignmentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
  ) {}

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(8)]],
    status: [0, Validators.required],
    priority: [0, Validators.required],
    deadline: ['', Validators.required],
    projectId: [this.projectId, Validators.required],
    memberId: [0, Validators.required],
  });

  ngOnInit() {
    this.service.getMembers();
    if (this.isEdit) {
      this.service
        .getAssignment(+this.route.snapshot.params['id'])
        .pipe(take(1))
        .subscribe((data) => {
          this.myForm.setValue({
            name: data?.name,
            description: data?.description,
            status: data?.status,
            priority: data?.priority,
            deadline: data?.deadline.toString(),
            projectId: data?.projectId,
            memberId: data?.assignee?.id!,
          });
          this.projectId = data.projectId;
          this.assignmentId = data.id!;
        });
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.isEdit) {
        return this.service.updateAssignment({
          id: this.assignmentId,
          ...this.myForm.value,
        });
      }
      this.service.createAssignment(this.myForm.value);
    }
  }
}
