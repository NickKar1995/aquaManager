import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from 'app/core/services/data/data.service';
import {
  DxChartComponent,
  DxChartModule,
  DxPivotGridComponent,
  DxPivotGridModule,
} from 'devextreme-angular';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { PivotRow } from './models/PivotRow';
import { CellInfo } from './models/CellInfo';


@Component({
  selector: 'app-pivot-analysis',
  imports: [DxPivotGridModule, DxChartModule],
  templateUrl: './pivot-analysis.component.html',
  styleUrl: './pivot-analysis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PivotAnalysisComponent implements OnInit, AfterViewInit {
  private dataService = inject(DataService);
  pivotGridDataSource!: PivotGridDataSource;

  @ViewChild(DxPivotGridComponent, { static: false }) pivotGrid!: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;

  ngOnInit() {
    this.configurePivotGrid();
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {});
  }

  private configurePivotGrid() {
    // Προετοιμασία δεδομένων για το pivot grid
    const mortalityData = this.prepareDataForPivot();

    this.pivotGridDataSource = new PivotGridDataSource({
      fields: [
        {
          caption: 'Cage',
          dataField: 'cageName',
          area: 'row',
        },
        {
          caption: 'Year',
          dataField: 'year',
          area: 'column',
        },
        {
          caption: 'Month',
          dataField: 'month',
          area: 'column',
          customizeText: (cellInfo: CellInfo) => {
            const monthNames = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ];

            if (cellInfo.value && typeof cellInfo.value === 'number') {
              return monthNames[cellInfo.value - 1] || cellInfo.value.toString();
            }

            return cellInfo.valueText || '';
          },
        },
        {
          caption: 'Total Mortalities',
          dataField: 'mortality',
          dataType: 'number',
          summaryType: 'sum',
          area: 'data',
        },
      ],
      store: mortalityData,
    });
  }

  private prepareDataForPivot(): PivotRow[] {
    // Λήψη όλων των δεδομένων θνησιμότητας
    const mortalities = this.dataService.mortalities();
    const cages = this.dataService.cages();

    // Μετατροπή των δεδομένων σε κατάλληλη μορφή για το pivot
    return mortalities.map((mortality) => {
      const date = new Date(mortality.date);
      const cage = cages.find((c) => c.id === mortality.cageId);

      return {
        date: mortality.date,
        year: date.getFullYear(),
        month: date.getMonth() + 1, // JavaScript months are 0-based
        cageId: mortality.cageId,
        cageName: cage ? cage.name : 'Unknown',
        mortality: mortality.mortality,
      };
    });
  }
}
