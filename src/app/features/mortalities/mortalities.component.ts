import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';
import { DataService } from 'app/core/services/data/data.service';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { ColumnConfig, Mortality } from '@models';
import { MortalityGridRow } from './models/MortalityGridRow';
import { EventChanged } from 'app/shared/date-box/models/EventChanged';
import { RowUpdatedEvent, RowUpdatingEvent } from 'devextreme/ui/data_grid';
import { GridDateLayoutComponent } from '../../shared/grid-date-layout/grid-date-layout.component';

@Component({
  selector: 'app-mortalities',
  imports: [DataGridComponent, GridDateLayoutComponent],
  templateUrl: './mortalities.component.html',
  styleUrl: './mortalities.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MortalitiesComponent implements OnInit {
  private dataService = inject(DataService);
  private notificationsService = inject(NotificationsService);
  headerTitle = 'Select date for mortalities';
  selectedDate: Date = new Date();
  gridData: MortalityGridRow[] = [];
  columnsStructure: ColumnConfig[] = [
    {
      dataField: 'cageName',
      caption: 'Cage',
      allowEditing: false,
      alignment: 'left',
    },
    {
      dataField: 'mortality',
      caption: 'Mortality',
      dataType: 'number',
      alignment: 'left',
    },
  ];

  ngOnInit(): void {
    this.loadData();
  }
  private loadData() {
    const cagesWithStock = this.dataService.getCagesWithStock(this.selectedDate);
    const existingMortalities = this.dataService.getMortalitiesByDate(this.selectedDate);
    this.gridData = cagesWithStock.map((cage) => {
      const totalMortalities = existingMortalities
        .filter((m) => m.cageId === cage.id)
        .reduce((sum, m) => sum + m.mortality, 0);

      return {
        cageId: cage.id,
        cageName: cage.name,
        mortality: totalMortalities,
      };
    });
  }

  onDateChange($event: EventChanged) {
    if ($event instanceof Date) this.selectedDate = $event;
    this.loadData();
  }

  onGridRowUpdating($event: RowUpdatingEvent): void {
    if (
      $event.newData.mortality !== undefined &&
      ($event.newData.mortality <= 0 || isNaN($event.newData.mortality))
    ) {
      $event.cancel = true;
      this.notificationsService.showError('Mortality must be a positive number');
    }
  }
  onGridRowUpdated($event: RowUpdatedEvent): void {
    const rowData = $event.data;

    try {
      const newMortality: Mortality = {
        id: 0,
        cageId: rowData.cageId,
        date: this.selectedDate,
        mortality: rowData.mortality,
      };

      this.dataService.addMortality(newMortality);
      this.loadData();
    } catch (error) {
      console.error('Error saving stocking:', error);
      this.notificationsService.showError('Failed to save stocking');
      this.loadData();
    }
  }
}
