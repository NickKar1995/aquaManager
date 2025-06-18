import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DateBoxComponent } from '../date-box/date-box.component';
import { EventChanged } from '../date-box/models/EventChanged';

@Component({
  selector: 'app-grid-date-layout',
  imports: [DateBoxComponent],
  templateUrl: './grid-date-layout.component.html',
  styleUrl: './grid-date-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDateLayoutComponent {
  @Input() headerTitle!: string;
  @Output() dateChanged = new EventEmitter<EventChanged>();
  selectedDate: Date = new Date();

  onDateChange($event: EventChanged) {
    this.dateChanged.emit($event);
  }
}
