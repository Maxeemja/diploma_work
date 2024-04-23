import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { API_URL } from '../shared/constants';
import { Project } from '../shared/interfaces/Project';
import { Member } from '../shared/interfaces/Member';
import { Assignment } from '../shared/interfaces/Assignment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

const assignmentsEndpointUrl = `${API_URL}/assignments`;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // injecting dependencies
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  public currentProject = signal('all');
  public projects = signal<Project[]>([]);
  public members = signal<Member[]>([]);
  public assignments = signal<Assignment[]>([]);

  public getInitialData() {
    this.getAssignmentsList();
    this.getProjectsList();
    this.getMembersList();
  }

  public getAssignmentsList() {
    const isAllSelected = this.currentProject() === 'all';
    this.http
      .get<Assignment[]>(
        `${assignmentsEndpointUrl}${
          !isAllSelected ? `/of/${this.currentProject()}` : ''
        }`
      )
      .pipe(
        take(1),
        map((data) => {
          this.assignments.set(data);
        })
      )
      .subscribe();
  }

  public getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${assignmentsEndpointUrl}/${id}`);
  }

  public createAssignment(payload: any) {
    this.http
      .post<Assignment>(`${assignmentsEndpointUrl}`, payload)
      .pipe(take(1))
      .subscribe(() => {
        this.getAssignmentsList();
        this.toastr.success('Завдання було успішно створено', 'Готово');
        this.router.navigate(['/']);
      });
  }

  public updateAssignment(payload: any) {
    this.http
      .patch<Assignment[]>(
        `${assignmentsEndpointUrl}/update/${payload._id}`,
        payload
      )
      .pipe(take(1))
      .subscribe(() => {
        this.getAssignmentsList();
        this.toastr.success('Завдання було успішно оновлено', 'Готово');
        this.router.navigate(['/']);
      });
  }

  public deleteAssignment(id: number) {
    if (confirm('Ви бажаєте видалити це завдання?')) {
      this.http
        .delete(`${assignmentsEndpointUrl}/delete/${id}`)
        .pipe(take(1))
        .subscribe(() => {
          this.getAssignmentsList();
          this.toastr.success(
            `Завдання з ID ${id} було успішно видалено!`,
            'Готово'
          );
        });
    } else return;
  }

  public getProjectsList() {
    this.http
      .get<Project[]>(`${API_URL}/projects`)
      .pipe(
        take(1),
        map((data) => {
          this.projects.set(data);
        })
      )
      .subscribe();
  }

  public createProject(name: string) {
    if (
      this.projects().filter(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      ).length
    ) {
      this.toastr.error('Проект з такою назвою вже існує', 'Помилка');
      return;
    }
    this.http
      .post<Project>(`${API_URL}/projects`, { name })
      .pipe(take(1))
      .subscribe(() => {
        this.getProjectsList();
        this.toastr.success('Проект було успішно створено', 'Готово');
      });
  }

  public getMembersList() {
    this.http
      .get<Member[]>(`${API_URL}/members`)
      .pipe(
        take(1),
        map((data) => {
          this.members.set(data);
        })
      )
      .subscribe();
  }

  public updateMember(payload: Member) {
    this.http
      .patch<Member>(`${API_URL}/members/${payload._id}`, payload)
      .pipe(take(1))
      .subscribe();
  }

  public updateProject(payload: Project) {
    this.http
      .patch<Member>(`${API_URL}/projects/${payload._id}`, payload)
      .pipe(take(1))
      .subscribe();
  }

  public deleteMember(id: string) {
    if (confirm('Ви бажаєте видалити цього користувача?')) {
      this.http
        .delete(`${API_URL}/members/${id}`)
        .pipe(take(1))
        .subscribe(() => {
          this.getMembersList();
          this.toastr.success(
            `Користувача з ID ${id} було успішно видалено!`,
            'Готово'
          );
        });
    } else return;
  }

  public deleteProject(id: string) {
    if (confirm('Ви бажаєте видалити цей проект?')) {
      this.http
        .delete(`${API_URL}/projects/${id}`)
        .pipe(take(1))
        .subscribe(() => {
          this.getProjectsList();
          this.toastr.success(
            `Проект з ID ${id} було успішно видалено!`,
            'Готово'
          );
        });
    } else return;
  }
}
