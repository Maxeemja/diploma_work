import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { API_URL } from '../shared/constants';
import { Project } from '../interfaces/Project';
import { Member } from '../interfaces/Member';
import { Assignment } from '../interfaces/Assignment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const assignmentsEndpointUrl = `${API_URL}/assignments`;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public currentProject = signal('all');
  public projects$ = new BehaviorSubject<Project[]>([]);
  public members$ = new BehaviorSubject<Member[]>([]);
  public assignments$ = new BehaviorSubject<Assignment[]>([]);
  private destroy$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getAssignmentsList(this.currentProject() === 'all' ? undefined : this.currentProject());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

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
  }

  public getAssignmentsList(id?: string) {
    this.http
      .get<Assignment[]>(`${assignmentsEndpointUrl}${id ? `/of/${id}` : ''}`)
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
    this.http
      .post<Assignment>(`${assignmentsEndpointUrl}`, payload)
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
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
