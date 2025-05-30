import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-panel-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-header.component.html',
  styleUrl: './panel-header.component.scss',
})
export class PanelHeaderComponent {
  label = input<string>('');
  icon = input<string>('');
}
