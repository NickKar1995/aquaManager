import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from 'app/shared/card/card.component';
import { CageFormComponent } from './cage-form/cage-form.component';
import { DxButtonModule, DxTileViewModule, DxBoxModule } from 'devextreme-angular';
import { DataService } from 'app/core/services/data/data.service';
import { Mode } from './models/Mode';
import { Cage } from '@models';

@Component({
  selector: 'app-cages',
  imports: [DxTileViewModule, DxBoxModule, CardComponent, CageFormComponent, DxButtonModule],
  templateUrl: './cages.component.html',
  styleUrl: './cages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CagesComponent {
  mode: Mode = 'create';
  selectedData: Cage | null = null;
  isPopupVisible = false;
  private dataService = inject(DataService);

  cages = this.dataService.cages;

  createCage() {
    this.mode = 'create';
    this.selectedData = null;
    this.isPopupVisible = true;
  }
  onPopupVisibilityChanged(isVisible: boolean) {
    this.isPopupVisible = isVisible;
  }

  editCage(data: Cage) {
    this.mode = 'edit';
    this.selectedData = data;
    this.isPopupVisible = true;
  }

  deleteCage(id: number) {
    this.dataService.deleteCage(id);
  }
}
