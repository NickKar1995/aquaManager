import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { RowUpdatedEvent, RowUpdatingEvent } from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-data-grid',
  imports: [DxDataGridModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columnsStructure: any[] = [];
  @Output() rowUpdating = new EventEmitter<RowUpdatingEvent>();
  @Output() rowUpdated = new EventEmitter<RowUpdatedEvent>();

  ngOnInit() {}

  private loadData() {}
  
  onRowUpdating(e: any): void {
    this.rowUpdating.emit(e);
  }
  onRowUpdated($event: RowUpdatedEvent) {
    this.rowUpdated.emit($event);
  }
}
