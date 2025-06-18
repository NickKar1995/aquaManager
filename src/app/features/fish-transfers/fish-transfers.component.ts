import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { DataService } from 'app/core/services/data/data.service';
import { DataGridComponent } from 'app/shared/data-grid/data-grid.component';
import { DxButtonModule } from 'devextreme-angular';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { ColumnConfig, Transfer } from '@models';
import { TransferGridRow } from './models/TransferGridRow';
import { EventChanged } from 'app/shared/date-box/models/EventChanged';
import { GridDateLayoutComponent } from '../../shared/grid-date-layout/grid-date-layout.component';

@Component({
  selector: 'app-fish-transfers',
  imports: [DxButtonModule, DataGridComponent, TransferFormComponent, GridDateLayoutComponent],
  templateUrl: './fish-transfers.component.html',
  styleUrl: './fish-transfers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FishTransfersComponent implements OnInit {
  headerTitle = 'Select date for transfers';
  columnsStructureInput: ColumnConfig[] = [
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

  columnsStructure: ColumnConfig[] = [
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

  gridData!: TransferGridRow[];
  isPopupVisible = false;

  private dataService = inject(DataService);
  selectedDate: Date = new Date();
  ngOnInit() {
    this.loadTransfersData();
  }
  onDateChange($event: EventChanged) {
    if ($event instanceof Date) this.selectedDate = $event;
    this.loadTransfersData();
  }

  addTransfer() {
    this.isPopupVisible = true;
  }

  onPopupVisibilityChanged(isVisible: boolean) {
    this.isPopupVisible = isVisible;
  }

  onTransferAdded() {
    this.loadTransfersData();
  }

  loadTransfersData() {
    const transfers = this.dataService.getTransfersByDate(this.selectedDate);
    this.gridData = this.groupedTransfersForGrid(transfers);
  }

  private groupedTransfersForGrid(transfers: Transfer[]): TransferGridRow[] {
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
