import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { DxDateBoxModule } from 'devextreme-angular';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { DataService } from 'app/core/services/data/data.service';
import { Cage, ColumnConfig, Stocking } from '@models';
import { RowUpdatedEvent, RowUpdatingEvent } from 'devextreme/ui/data_grid';
import { CageGridRow } from './models/CageGridRow';
import { EventChanged } from 'app/shared/date-box/models/EventChanged';
import { GridDateLayoutComponent } from '../../shared/grid-date-layout/grid-date-layout.component';

@Component({
  imports: [DxDateBoxModule, DataGridComponent, DataGridComponent, GridDateLayoutComponent],
  templateUrl: './fish-stocking.component.html',
  styleUrl: './fish-stocking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FishStockingComponent implements OnInit {
  private dataService = inject(DataService);
  private notificationsService = inject(NotificationsService);
  headerTitle = 'Select date for stocking';
  selectedDate: Date = new Date();
  gridData: CageGridRow[] = [];
  emptyCages: Cage[] = [];
  todaysTransactions: Stocking[] = [];
  columnsStructure: ColumnConfig[] = [
    {
      dataField: 'cageName',
      caption: 'Cage',
      allowEditing: false,
      alignment: 'left',
    },
    {
      dataField: 'quantity',
      caption: 'Quantity',
      dataType: 'number',
      alignment: 'left',
    },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  onDateChange($event: EventChanged) {
    if ($event instanceof Date) this.selectedDate = $event;
    this.loadData();
  }

  loadData() {
    this.todaysTransactions = this.dataService.getStockingsByDate(this.selectedDate);
    const allEmptyCages = this.dataService.getEmptyCagesOnDate(this.selectedDate);
    const stockedCageIds = this.todaysTransactions.map((t) => t.cageId);
    const cagesWithStockingsToday = this.dataService
      .cages()
      .filter((cage) => stockedCageIds.includes(cage.id));
    const allRelevantCages = [
      ...allEmptyCages,
      ...cagesWithStockingsToday.filter(
        (cage) => !allEmptyCages.some((emptyCage) => emptyCage.id === cage.id),
      ),
    ];
    const todaysStockingMap = new Map<number, number>();
    this.todaysTransactions.forEach((stocking) => {
      const currentQty = todaysStockingMap.get(stocking.cageId) || 0;
      todaysStockingMap.set(stocking.cageId, currentQty + stocking.quantity);
    });
    this.gridData = allRelevantCages.map((cage) => {
      const todaysStockingQty = todaysStockingMap.get(cage.id) || 0;

      return {
        cageId: cage.id,
        cageName: cage.name,
        quantity: todaysStockingQty,
      };
    });
  }
  onGridRowUpdating($event: RowUpdatingEvent): void {
    if (
      $event.newData.quantity !== undefined &&
      ($event.newData.quantity <= 0 || isNaN($event.newData.quantity))
    ) {
      $event.cancel = true;
      this.notificationsService.showError('Quantity must be a positive number');
    }
  }
  onGridRowUpdated($event: RowUpdatedEvent): void {
    const rowData = $event.data;
    if (rowData.quantity > 0) {
      try {
        const newStocking: Stocking = {
          id: 0,
          cageId: rowData.cageId,
          date: this.selectedDate,
          quantity: rowData.quantity,
        };

        this.dataService.addStocking(newStocking);
        this.loadData();
      } catch (error) {
        console.error('Error saving stocking:', error);
        this.notificationsService.showError('Failed to save stocking');
        this.loadData();
      }
    }
  }
}
