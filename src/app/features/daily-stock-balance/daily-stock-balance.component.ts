import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ColumnConfig } from '@models';
import { DataService } from 'app/core/services/data/data.service';
import { DataGridComponent } from 'app/shared/data-grid/data-grid.component';
import { EventChanged } from 'app/shared/date-box/models/EventChanged';
import { GridDateLayoutComponent } from '../../shared/grid-date-layout/grid-date-layout.component';

@Component({
  selector: 'app-daily-stock-balance',
  imports: [ DataGridComponent, GridDateLayoutComponent],
  templateUrl: './daily-stock-balance.component.html',
  styleUrl: './daily-stock-balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyStockBalanceComponent {
  private dataService = inject(DataService);
  headerTitle = 'Select date for balance snapshot';
  selectedDate = signal<Date>(new Date());
  gridData = computed(() => {
    const date = this.selectedDate();
    return this.dataService.cages().map((cage) => ({
      ...cage,
      currentBalance: this.dataService.getStockBalance(cage.id, date),
    }));
  });
  columnsStructure: ColumnConfig[] = [
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
