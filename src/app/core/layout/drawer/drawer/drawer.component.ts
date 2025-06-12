import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DxDrawerModule } from 'devextreme-angular';
import { DxToolbarModule, DxTextBoxModule, DxListModule } from 'devextreme-angular';
import { ItemClickEvent } from 'devextreme/ui/list';

@Component({
  selector: 'app-drawer',
  imports: [DxDrawerModule, DxListModule, DxToolbarModule, DxTextBoxModule, RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {


  onNavigationItemClick($event: ItemClickEvent) {
    throw new Error('Method not implemented.');
  }
  isDrawerOpen = true;

  menuItems = [
    { text: 'Cages', icon: 'home', route: '/cages' },
    { text: 'Fish Stocking', icon: 'box', route: '/fish-stocking' },
    { text: 'Settings', icon: 'preferences', route: '/settings' },
  ];
  buttonOptions: any = {
    icon: 'menu',
    onClick: () => {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  };
}
