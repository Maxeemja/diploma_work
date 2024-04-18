import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GoBackLinkComponent } from '../../shared/components/go-back-link/go-back-link.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  imports: [GoBackLinkComponent],
})
export class AdminPageComponent {
  private service = inject(ApiService);
  private authService = inject(AuthService);

  projects = this.service.projects;

  ngOnInit() {
    this.authService.getCurrentUser();
  }
}
