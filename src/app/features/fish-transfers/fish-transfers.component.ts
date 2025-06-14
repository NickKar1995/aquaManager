import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataService } from 'app/core/services/data/data.service';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { DateBoxComponent } from 'app/shared/date-box/date-box.component';

@Component({
  selector: 'app-fish-transfers',
  imports: [DateBoxComponent],
  templateUrl: './fish-transfers.component.html',
  styleUrl: './fish-transfers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FishTransfersComponent {
  private dataService = inject(DataService);
  private notificationsService = inject(NotificationsService);
  selectedDate: Date = new Date();

  onDateChange(event: any) {
    this.selectedDate = event;
    this.loadData();
  }

  loadData() {}
}
