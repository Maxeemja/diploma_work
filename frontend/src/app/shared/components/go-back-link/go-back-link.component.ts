import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-go-back-link',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="header-arrow">
      <a [routerLink]="path ?? '..'">
        <mat-icon aria-hidden="false" fontIcon="arrow_back"></mat-icon> Назад</a
      >
    </div>
  `,
  styleUrl: './go-back-link.component.scss',
})
export class GoBackLinkComponent {
  @Input() path?: string;
}
