import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DxDateBoxModule } from 'devextreme-angular';
import { LabelMode } from 'devextreme/common';
import { DateType } from 'devextreme/ui/date_box';
import { EventChanged } from './models/EventChanged';

@Component({
  selector: 'app-date-box',
  imports: [DxDateBoxModule],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateBoxComponent {
  @Input() selectedDate: Date = new Date();
  @Input() label!: string;
  @Input() labelMode!: LabelMode;
  @Input() type!: DateType;
  @Output() dateChange = new EventEmitter<EventChanged>();

  onDateChange($event: EventChanged) {
    this.dateChange.emit($event);
  }
}
