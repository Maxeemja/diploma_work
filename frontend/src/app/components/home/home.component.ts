import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GroupPipe } from '../../pipes/group.pipe';
import { MatSelectModule } from '@angular/material/select';
import { Observable, combineLatest } from 'rxjs';
import { HomePageData } from '../../interfaces/HomePageData';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
  public data$: Observable<HomePageData> = combineLatest({
    projects: this.service.projects$,
    assignments: this.service.assignments$,
    currentProject: this.service.currentProject$,
  });

  public displayedColumns = [
    'projectName',
    'name',
    'description',
    'status',
    'priority',
    'assignee',
    'deadline',
    'actions',
  ];

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.service.getInitialData();
  }

  onDelete(id: number) {
    this.service.deleteAssignment(id);
  }

  onSelectChange(id: string) {
    this.service.currentProject$.next(id);
    if (id === 'all') {
      this.displayedColumns = ['projectName', ...this.displayedColumns];
    } else {
      this.displayedColumns = this.displayedColumns.filter(
        (col) => col !== 'projectName'
      );
    }
  }
}
