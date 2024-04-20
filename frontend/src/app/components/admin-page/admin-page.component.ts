import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GoBackLinkComponent } from '../../shared/components/go-back-link/go-back-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ModalWindowComponent } from '../../shared/components/modal-window/modal-window.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Roles, RolesUI } from '../../shared/interfaces/Member';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-page',
  standalone: true,
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  imports: [
    CommonModule,
    GoBackLinkComponent,
    MatButtonModule,
    MatCardModule,
    ModalWindowComponent,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
})
export class AdminPageComponent {
  public dialog = inject(MatDialog);
  private service = inject(ApiService);

  public projects = this.service.projects;
  public members = this.service.members;
  public roles = Object.values(Roles);
  public rolesUI = RolesUI;

  ngOnInit() {}

  onUpdateUserRole(value: Roles, id: string) {
    const user = this.members().find((user) => user._id === id)!;
    this.service.updateMember({
      ...user,
      role: Roles[value],
    });
  }

  onDeleteUser(id: string) {
    this.service.deleteMember(id);
  }
}
