import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { API_URL } from '../shared/constants';
import { Project } from '../shared/interfaces/Project';
import { Member } from '../shared/interfaces/Member';
import { Assignment } from '../shared/interfaces/Assignment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  public projects$ = new BehaviorSubject<Project[]>([]);
  public members$ = new BehaviorSubject<Member[]>([]);
  public assignments$ = new BehaviorSubject<Assignment[]>([]);

  public getInitialData() {
    this.http
      .get<Project[]>(`${API_URL}/projects`)
      .pipe(
        take(1),
        map((data) => {
          const payload = data.map((item) => ({ ...item, id: item._id }));
          this.projects$.next(payload);
        })
      )
      .subscribe();

    this.getAssignmentsList();
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
          const payload = data.map((item) => ({ ...item, id: item._id }));
          this.assignments$.next(payload);
        })
      )
      .subscribe();
  }

  public getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${assignmentsEndpointUrl}/${id}`);
  }

  public createAssignment(payload: any) {
    console.log(payload);
    this.http
      .post<Assignment>(`${assignmentsEndpointUrl}`, payload)
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.assignments$.next;
          this.toastr.success('Assignment was successfully created', 'Done');
          this.router.navigate(['/']);
        }
      });
  }

  public updateAssignment(payload: any) {
    this.http
      .patch<Assignment>(
        `${assignmentsEndpointUrl}/update/${payload.id}`,
        payload
      )
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.toastr.success('Assignment was successfully updated', 'Done');
          this.router.navigate(['/']);
        }
      });
  }

  public deleteAssignment(id: number) {
    if (confirm('Do u wanna delete this item?')) {
      this.http
        .delete<Assignment[]>(`${assignmentsEndpointUrl}/delete/${id}`, {
          body: { currProjId: this.currentProject() },
        })
        .pipe(take(1))
        .subscribe((data: Assignment[]) => {
          this.assignments$.next(data);
          this.toastr.success(
            `Assignment with ID ${id} was successfully deleted`,
            'Done'
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
          const payload = data.map((item) => ({ ...item, id: item._id }));
          this.projects$.next(payload);
        })
      )
      .subscribe();
  }

  public getMembers() {
    this.http
      .get<Member[]>(`${API_URL}/members`)
      .pipe(
        take(1),
        map((data) => {
          const payload = data.map((item) => ({ ...item, id: item._id }));
          this.members$.next(payload);
        })
      )
      .subscribe();
  }
}
