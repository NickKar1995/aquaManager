import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from 'app/shared/card/card.component';
import { DxTileViewModule } from 'devextreme-angular';
import { DxBoxModule } from 'devextreme-angular';
import { CageFormComponent } from './cage-form/cage-form.component';
import { DxButtonModule } from 'devextreme-angular';
import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'app-cages',
  imports: [DxTileViewModule, DxBoxModule, CardComponent, CageFormComponent, DxButtonModule],
  templateUrl: './cages.component.html',
  styleUrl: './cages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CagesComponent {
  mode: 'create' | 'edit' = 'create';
  selectedData: any = null;
  isPopupVisible = false;
  private dataService = inject(DataService);

  cages = this.dataService.cages;

  createCage() {
    this.mode = 'create';
    this.selectedData = null;
    this.isPopupVisible = true;
  }
  onPopupVisibilityChanged(isVisible: boolean) {
    console.log('Popup visibility changed to:', isVisible);
    this.isPopupVisible = isVisible;
  }

  editCage(data: any) {
    console.log(data);
    this.mode = 'edit';
    this.selectedData = data;
    this.isPopupVisible = true;
  }

  deleteCage(id: number) {
    this.dataService.deleteCage(id);
  }
}
