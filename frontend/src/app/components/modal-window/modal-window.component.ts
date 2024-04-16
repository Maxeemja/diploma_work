import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss',
  standalone: true,
  imports: [CommonModule, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWindowComponent {
  @Input() title: string = '';
}
