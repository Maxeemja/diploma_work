import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { API_URL } from '../shared/constants';
import { Project } from '../interfaces/Project';
import { Member } from '../interfaces/Member';
import { Assignment } from '../interfaces/Assignment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public projects$ = new BehaviorSubject<Project[]>([]);
  public members$ = new BehaviorSubject<Member[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

  public getAssignmentsList() {}

  public getInitialData() {
    this.http
      .get<Project[]>(`${API_URL}/all`)
      .pipe(
        take(1),
        map((data) => {
          this.projects$.next(data);
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
