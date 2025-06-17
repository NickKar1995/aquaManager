import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnConfig } from '@models';
import { DxDataGridModule } from 'devextreme-angular';
import { RowUpdatedEvent, RowUpdatingEvent } from 'devextreme/ui/data_grid';
import { GridDataModel } from './models/GridDataModel';

@Component({
  selector: 'app-data-grid',
  imports: [DxDataGridModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent {
  @Input() data: GridDataModel = [];
  @Input() columnsStructure: ColumnConfig[] = [];
  @Output() rowUpdating = new EventEmitter<RowUpdatingEvent>();
  @Output() rowUpdated = new EventEmitter<RowUpdatedEvent>();

  onRowUpdating($event: RowUpdatingEvent): void {
    this.rowUpdating.emit($event);
  }
  onRowUpdated($event: RowUpdatedEvent) {
    this.rowUpdated.emit($event);
  }
}
