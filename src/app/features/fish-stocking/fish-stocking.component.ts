import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { DxDateBoxModule } from 'devextreme-angular';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { DataService } from 'app/core/services/data/data.service';
import { Cage, Stocking } from '@models';

@Component({
  imports: [DxDateBoxModule, DataGridComponent, DataGridComponent],
  templateUrl: './fish-stocking.component.html',
  styleUrl: './fish-stocking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FishStockingComponent implements OnInit {
  private dataService = inject(DataService);
  private notificationsService = inject(NotificationsService);
  selectedDate: Date = new Date();
  gridData: any[] = [];
  emptyCages: Cage[] = [];
  todaysTransactions: Stocking[] = [];
  columnsStructure = [
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

  onDateChange(event: any) {
    this.selectedDate = event;
    this.loadData();
  }

  loadData() {
    // 1. Get ALL transactions for the selected date
    this.todaysTransactions = this.dataService.getStockingsByDate(this.selectedDate);

    // 2. Get ALL empty cages (historically empty or currently with 0 fish)
    const allEmptyCages = this.dataService.getEmptyCagesOnDate(this.selectedDate);

    // 3. Get cages that have stockings today
    const stockedCageIds = this.todaysTransactions.map((t) => t.cageId);
    const cagesWithStockingsToday = this.dataService
      .cages()
      .filter((cage) => stockedCageIds.includes(cage.id));

    // 4. Combine both lists - empty cages + cages with today's stockings
    const allRelevantCages = [
      ...allEmptyCages,
      ...cagesWithStockingsToday.filter(
        (cage) => !allEmptyCages.some((emptyCage) => emptyCage.id === cage.id),
      ),
    ];

    // 5. Create a map of today's stockings by cageId for quick lookup
    const todaysStockingMap = new Map<number, number>();
    this.todaysTransactions.forEach((stocking) => {
      const currentQty = todaysStockingMap.get(stocking.cageId) || 0;
      todaysStockingMap.set(stocking.cageId, currentQty + stocking.quantity);
    });

    // 6. Prepare grid data
    this.gridData = allRelevantCages.map((cage) => {
      const todaysStockingQty = todaysStockingMap.get(cage.id) || 0;

      return {
        cageId: cage.id,
        cageName: cage.name,
        quantity: todaysStockingQty, // Show today's stocking quantity
        originalQuantity: todaysStockingQty, // Keep track of original for delta calculation
        hasExistingStocking: todaysStockingQty > 0,
      };
    });
  }

  // For validation
  onGridRowUpdating(e: any): void {
    // Validate quantity
    if (
      e.newData.quantity !== undefined &&
      (e.newData.quantity <= 0 || isNaN(e.newData.quantity))
    ) {
      e.cancel = true;
      this.notificationsService.showError('Quantity must be a positive number');
    }
  }

  // Corrected onGridRowUpdated Logic
  onGridRowUpdated(e: any): void {
    const rowData = e.data; // Complete row data with changes

    // We only care if the user entered a positive quantity.
    // We no longer check for "isExisting".
    if (rowData.quantity > 0) {
      try {
        // This logic now ALWAYS creates a new stocking transaction.
        const newStocking: Stocking = {
          id: 0, // Let the service generate the ID
          cageId: rowData.cageId,
          date: this.selectedDate,
          quantity: rowData.quantity,
        };

        this.dataService.addStocking(newStocking);

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
}
