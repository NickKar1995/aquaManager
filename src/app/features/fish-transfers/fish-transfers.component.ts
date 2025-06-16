import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { DataService } from 'app/core/services/data/data.service';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { DataGridComponent } from 'app/shared/data-grid/data-grid.component';
import { DateBoxComponent } from 'app/shared/date-box/date-box.component';
import { DxButtonModule } from 'devextreme-angular';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { Transfer } from '@models';

@Component({
  selector: 'app-fish-transfers',
  imports: [DateBoxComponent, DxButtonModule, DataGridComponent, TransferFormComponent],
  templateUrl: './fish-transfers.component.html',
  styleUrl: './fish-transfers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FishTransfersComponent implements OnInit {
  gridData!: any[];
  columnsStructureInput = [
    {
      dataField: 'name',
      caption: 'Destination Cage',
      allowEditing: false,
      alignment: 'left',
    },
    {
      dataField: 'quantity',
      caption: 'Transfered',
      dataType: 'number',
      alignment: 'left',
    },
  ];
  columnsStructure = [
    {
      dataField: 'sourceCageName',
      caption: 'Source Cage',
      allowEditing: false,
      alignment: 'left',
    },
    {
      dataField: 'destinationCagesInfo',
      caption: 'Destination Cages',
      allowEditing: false,
      alignment: 'left',
    },
    {
      dataField: 'totalQuantity',
      caption: 'Transfered',
      dataType: 'number',
      alignment: 'left',
    },
  ];
  isPopupVisible = false;

  private dataService = inject(DataService);
  private notificationsService = inject(NotificationsService);
  selectedDate: Date = new Date();
  ngOnInit() {
    this.loadTransfersData();
  }
  onDateChange(event: any) {
    this.selectedDate = event;
    this.loadTransfersData();
  }
  addTransfer() {
    this.isPopupVisible = true;
  }
  onPopupVisibilityChanged(isVisible: boolean) {
    this.isPopupVisible = isVisible;
  }
  onTransferAdded($event: boolean) {
    this.loadTransfersData();
  }

  loadTransfersData() {
    const transfers = this.dataService.getTransfersByDate(this.selectedDate);

    this.gridData = this.groupedTransfersForGrid(transfers);
  }

  private flattenTransfersForGrid(transfers: any): any[] {
    const gridData: any[] = [];

    transfers.forEach((transfer: any) => {
      const sourceCage = this.dataService.getCageById(transfer.sourceCageId);

      transfer.destinations.forEach((destination: any) => {
        const destinationCage = this.dataService.getCageById(destination.destinationCageId);

        gridData.push({
          transferId: transfer.id,
          sourceCageName: sourceCage?.name || 'Unknown',
          destinationCageName: destinationCage?.name || 'Unknown',
          quantity: destination.quantity,
          date: transfer.date,
        });
      });
    });

    return gridData;
  }

  private groupedTransfersForGrid(transfers: Transfer[]): any[] {
    return transfers.map((transfer) => {
      const sourceCage = this.dataService.getCageById(transfer.sourceCageId);
      const destinationNames = transfer.destinations
        .map((dest) => {
          const cage = this.dataService.getCageById(dest.destinationCageId);
          return `${cage?.name || 'Unknown'} (${dest.quantity})`;
        })
        .join(', ');

      const totalQuantity = transfer.destinations.reduce((sum, dest) => sum + dest.quantity, 0);

      return {
        transferId: transfer.id,
        sourceCageName: sourceCage?.name || 'Unknown',
        destinationCagesInfo: destinationNames,
        totalQuantity: totalQuantity,
        date: transfer.date,
      };
    });
  }
}
