import { Component } from '@angular/core';
import { CardComponent } from 'app/shared/card/card.component';
import { DxTileViewModule } from 'devextreme-angular';
import { DxBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-cages',
  imports: [DxTileViewModule, DxBoxModule, CardComponent],
  templateUrl: './cages.component.html',
  styleUrl: './cages.component.scss',
})
export class CagesComponent {
  tileViewData = [
    { text: 'Alabama', widthRatio: 2, heightRatio: 2 },
    { text: 'Alabama', widthRatio: 2, heightRatio: 2 },
    { text: 'Alabama', widthRatio: 2, heightRatio: 2 },
    // { text: 'Alabama' },
    // { text: 'Alabama' },
    // { text: 'Alaska' },
    // { text: 'Arizona' },
  ];
}
