import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GroupPipe } from '../../pipes/group.pipe';
import { MatSelectModule } from '@angular/material/select';
import { Observable, combineLatest, map, withLatestFrom } from 'rxjs';
import { displayedColumns } from '../../shared/constants';
import { HomePageData } from '../../interfaces/HomePageData';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    RouterLink,
    GroupPipe,
    MatSelectModule,
  ],
})
export class HomeComponent {
  public data$ = new Observable<HomePageData>();

  public displayedColumns: string[] = displayedColumns;

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.service.getInitialData();
    this.data$ = combineLatest([
      this.service.projects$,
      this.service.assignments$,
      this.service.currentProject$,
    ]).pipe(
      map(([projects, assignments, currentProject]) => ({
        projects,
        assignments,
        currentProject,
      }))
    );
  }

  onDelete(id: number) {
    this.service.deleteAssignment(id);
  }

  onSelectChange(id: string) {
    this.service.currentProject$.next(id);
  }
}
