import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DxDateBoxModule } from 'devextreme-angular';
import { LabelMode } from 'devextreme/common';
import { DateType } from 'devextreme/ui/date_box';

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
  @Output() dateChange = new EventEmitter<string | number | Date | null>();

  onDateChange($event: string | number | Date | null) {
    this.dateChange.emit($event);
  }
}
