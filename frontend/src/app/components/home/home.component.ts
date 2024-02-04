import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GroupPipe } from '../../pipes/group.pipe';
import { MatSelectModule } from '@angular/material/select';
import { take } from 'rxjs';
import { Project } from '../../interfaces/Project';

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
  public projects$ = this.service.projects$;
  public assignments$ = this.service.assignments$;
  public currentProject$ = this.service.currentProject$;

  displayedColumns: string[] = [
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
    this.service
      .getProjectsList()
      .pipe(take(1))
      .subscribe((projects: Project[]) => {
        this.service.getProjectAssignments(projects[0]?._id);
      });
  }

  onDelete(id: number) {
    this.service.delete(id);
  }

  onSelectChange(id: string) {
    this.service.currentProject$.next(id);
    if (id !== 'all') {
      this.service.getProjectAssignments(id);
    } else {
      this.service.getAssignmentsList();
    }
  }
}
