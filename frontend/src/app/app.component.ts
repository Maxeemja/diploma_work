import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalAssignmentDetailsComponent } from './components/modalAssignmentDetails/modal-assignment-details.component';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    ModalAssignmentDetailsComponent,
    CreateEditComponent,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // inject main service
  service = inject(ApiService);

  title = 'TaskScheduler';

  ngOnInit() {
    this.service.getInitialData();
  }
}
