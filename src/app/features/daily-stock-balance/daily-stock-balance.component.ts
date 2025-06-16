import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DataService } from 'app/core/services/data/data.service';
import { DataGridComponent } from 'app/shared/data-grid/data-grid.component';
import { DateBoxComponent } from 'app/shared/date-box/date-box.component';

@Component({
  selector: 'app-daily-stock-balance',
  imports: [DateBoxComponent, DataGridComponent],
  templateUrl: './daily-stock-balance.component.html',
  styleUrl: './daily-stock-balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyStockBalanceComponent {
  private dataService = inject(DataService);
  // selectedDate: Date = new Date();
  selectedDate = signal<Date>(new Date()); // Signal!
  gridData = computed(() => {
    const date = this.selectedDate(); // Παίρνει την τρέχουσα ημερομηνία
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

  onDateChange($event: string | number | Date | null) {
    this.selectedDate.set($event as Date);
  }
}
