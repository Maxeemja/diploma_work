import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalWindowComponent {
  @Input() title: string = '';
}
