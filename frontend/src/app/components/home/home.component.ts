import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GroupPipe } from '../../pipes/group.pipe';
import { MatSelectModule } from '@angular/material/select';

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
    this.service.getInitialData();
  }

  onDelete(id: number) {
    this.service.deleteAssignment(id);
  }

  onSelectChange(id: string) {
    this.service.currentProject$.next(id);
  }
}
