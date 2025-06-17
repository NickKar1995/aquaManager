export interface ColumnConfig {
  dataField: string;
  caption: string;
  alignment: 'left' | 'center' | 'right';
  dataType?: 'string' | 'number' | 'date' | 'boolean';
  allowEditing?: boolean;
}
