import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { API_URL } from '../shared/constants';
import { Project } from '../interfaces/Project';
import { Member } from '../interfaces/Member';
import { Assignment } from '../interfaces/Assignment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public currentProject$ = new BehaviorSubject('');
  public projects$ = new BehaviorSubject<Project[]>([]);
  public members$ = new BehaviorSubject<Member[]>([]);
  public assignments$ = new BehaviorSubject<Assignment[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

  public getInitialData() {
    this.http
      .get<Project[]>(`${API_URL}/projects`)
      .pipe(
        take(1),
        map((data) => {
          const payload = data.map((item) => ({ ...item, id: item._id }));
          this.currentProject$.next(payload[0].id);
          console.log(this.currentProject$.getValue())
          this.projects$.next(payload);
          return payload[0].id;
        }),
        switchMap((id) => {
          return this.http
            .get<Assignment[]>(`${API_URL}/assignments/of/${id}`)
            .pipe(
              take(1),
              map((data) => {
                this.assignments$.next(data);
              })
            );
        })
      )
      .subscribe();
  }

  public getAssignmentsList() {
    this.http
      .get<Assignment[]>(`${API_URL}/assignments`)
      .pipe(
        take(1),
        map((data) => {
          this.assignments$.next(data);
        })
      )
      .subscribe();
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

  public getProjectAssignments(id: string) {
    this.http
      .get<Assignment[]>(`${API_URL}/assignments/of/${id}`)
      .pipe(
        take(1),
        map((data) => {
          this.assignments$.next(data);
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
          this.members$.next(data);
        })
      )
      .subscribe();
  }

  public getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${API_URL}/assignments/${id}`);
  }

  public createAssignment(payload: any) {
    this.http
      .post<Assignment>(`${API_URL}/create`, payload)
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['/']);
        }
      });
  }

  public updateAssignment(payload: any) {
    this.http
      .post<Assignment>(`${API_URL}/edit`, payload)
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['/']);
        }
      });
  }

  public delete(id: number) {
    if (confirm('Do u wanna delete this item?')) {
      this.http
        .delete<Project[]>(`${API_URL}/delete/${id}`)
        .pipe(take(1))
        .subscribe((data: Project[]) => this.projects$.next(data));
    } else return;
  }
}
