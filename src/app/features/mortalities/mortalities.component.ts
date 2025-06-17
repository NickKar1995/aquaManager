import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DateBoxComponent } from '../../shared/date-box/date-box.component';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';
import { DataService } from 'app/core/services/data/data.service';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { Mortality } from '@models';
import { MortalityGridRow } from './models/MortalityGridRow';
import { EventChanged } from 'app/shared/date-box/models/EventChanged';
import { RowUpdatedEvent, RowUpdatingEvent } from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-mortalities',
  imports: [DateBoxComponent, DataGridComponent],
  templateUrl: './mortalities.component.html',
  styleUrl: './mortalities.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MortalitiesComponent implements OnInit {
  private dataService = inject(DataService);
  private notificationsService = inject(NotificationsService);
  selectedDate: Date = new Date();
  gridData: MortalityGridRow[] = [];
  columnsStructure = [
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
    // Get all cages that have fish on the selected date
    const cagesWithStock = this.dataService.getCagesWithStock(this.selectedDate);

    // Get existing mortalities for the selected date
    const existingMortalities = this.dataService.getMortalitiesByDate(this.selectedDate);

    // Build grid data
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
    if ($event instanceof Date) this.selectedDate =$event;
    this.loadData();
  }

  onGridRowUpdating($event: RowUpdatingEvent): void {
    // Validate mortality
    if (
      $event.newData.mortality !== undefined &&
      ($event.newData.mortality <= 0 || isNaN($event.newData.mortality))
    ) {
      $event.cancel = true;
      this.notificationsService.showError('Mortality must be a positive number');
    }
  }
  onGridRowUpdated($event: RowUpdatedEvent): void {
    const rowData = $event.data; // Complete row data with changes

    try {
      // This logic now ALWAYS creates a new stocking transaction.
      const newMortality: Mortality = {
        id: 0, // Let the service generate the ID
        cageId: rowData.cageId,
        date: this.selectedDate,
        mortality: rowData.mortality,
      };

      this.dataService.addMortality(newMortality);
      // Important: After adding, you must refresh the data to see the change.
      this.loadData();
    } catch (error) {
      console.error('Error saving stocking:', error);
      this.notificationsService.showError('Failed to save stocking');
      // It's good practice to reload data even on failure to reset the grid state.
      this.loadData();
    }
  }
}
