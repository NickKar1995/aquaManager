import { Component } from '@angular/core';
import { DxTileViewModule } from 'devextreme-angular';

@Component({
  selector: 'app-cages',
  imports: [DxTileViewModule],
  templateUrl: './cages.component.html',
  styleUrl: './cages.component.scss',
})
export class CagesComponent {
  tileViewData = [
    { text: 'Alabama' },
    { text: 'Alaska' },
    { text: 'Arizona' },
  ];
}
