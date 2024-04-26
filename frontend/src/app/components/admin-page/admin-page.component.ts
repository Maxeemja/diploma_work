import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GoBackLinkComponent } from '../../shared/components/go-back-link/go-back-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Roles, RolesUI } from '../../shared/interfaces/Member';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Project } from '../../shared/interfaces/Project';
import { ModalDeleteConfirmationComponent } from '../modal-delete-confirmation/modal-delete-confirmation.component';
import { DeleteModalData } from '../../shared/interfaces/DeleteModalData';
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
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class AdminPageComponent {
  public dialog = inject(MatDialog);
  private service = inject(ApiService);

  public projectName = '';
  public selectedCardIndex: any = null;

  public projects = this.service.projects;
  public members = this.service.members;
  public roles = Object.values(Roles);
  public rolesUI = RolesUI;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  ngOnInit() {}

  ngAfterViewChecked() {
    if (this.inputRef && this.projectName.length === 0) {
      this.inputRef.nativeElement.focus();

      console.log(this.inputRef);
    }
  }

  onInputBlur(event: any) {
    if (event?.relatedTarget?.nodeName !== 'BUTTON') {
      this.projectName = '';
      this.selectedCardIndex = null;
    }
  }

  onChangeName(idx: number, project: Project) {
    if (this.selectedCardIndex && this.projectName.length) {
      this.selectedCardIndex = null;
      const payload = { ...project, name: this.projectName };
      this.service.updateProject(payload);
      this.projectName = '';
      return;
    }
    this.selectedCardIndex = idx;
  }

  onUpdateUserRole(value: Roles, id: string) {
    const user = this.members().find((user) => user._id === id)!;
    this.service.updateMember({
      ...user,
      role: Roles[value],
    });
  }

  onDeleteUser(id: string) {
    this.dialog.open<{ data: DeleteModalData }>(
      ModalDeleteConfirmationComponent,
      {
        data: { id, text: 'цього користувача', entity: 'member' },
      }
    );
  }

  onDeleteProject(id: string) {
    this.dialog.open<{ data: DeleteModalData }>(
      ModalDeleteConfirmationComponent,
      {
        data: { id, text: 'цей проект', entity: 'project' },
      }
    );
  }
}
