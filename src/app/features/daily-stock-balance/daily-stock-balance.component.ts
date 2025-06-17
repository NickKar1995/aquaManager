import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DataService } from 'app/core/services/data/data.service';
import { DataGridComponent } from 'app/shared/data-grid/data-grid.component';
import { DateBoxComponent } from 'app/shared/date-box/date-box.component';
import { EventChanged } from 'app/shared/date-box/models/EventChanged';

@Component({
  selector: 'app-daily-stock-balance',
  imports: [DateBoxComponent, DataGridComponent],
  templateUrl: './daily-stock-balance.component.html',
  styleUrl: './daily-stock-balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyStockBalanceComponent {
  private dataService = inject(DataService);
  selectedDate = signal<Date>(new Date());
  gridData = computed(() => {
    const date = this.selectedDate();
    return this.dataService.cages().map((cage) => ({
      ...cage,
      currentBalance: this.dataService.getStockBalance(cage.id, date),
    }));
  });
  columnsStructure = [
    {
      dataField: 'name',
      caption: 'Cage',
      allowEditing: false,
      alignment: 'left',
    },
    {
      dataField: 'currentBalance',
      caption: 'Balance',
      allowEditing: false,
      dataType: 'number',
      alignment: 'left',
    },
  ];

  onDateChange($event: EventChanged) {
    if ($event instanceof Date) this.selectedDate.set($event);
  }
}
