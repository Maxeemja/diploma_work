import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GoBackLinkComponent } from '../../shared/components/go-back-link/go-back-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-emails',
  standalone: true,
  imports: [
    CommonModule,
    GoBackLinkComponent,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-emails.component.html',
  styleUrl: './admin-emails.component.scss',
})
export class AdminEmailsComponent {
  private service = inject(ApiService);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  public emails = this.service.allowedEmails;

  ngOnInit() {
    this.service.getAllowedEmails();
  }

  onAdd() {
    this.service.addAllowedEmail({
      email: this.emailFormControl.getRawValue() || '',
    });
    this.emailFormControl.reset();
  }
  onDelete(id: string) {
    this.service.deleteAllowedEmail(id);
  }
}
