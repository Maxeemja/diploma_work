import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, MatButtonModule, MatTableModule, RouterLink],
})
export class HomeComponent {
  public projects$ = this.service.projects$;

  displayedColumns: string[] = [
    'number',
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
    this.service.delete(id);
  }
}
