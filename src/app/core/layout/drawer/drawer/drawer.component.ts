import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DxDrawerModule } from 'devextreme-angular';
import { DxToolbarModule, DxTextBoxModule, DxListModule } from 'devextreme-angular';
import { ItemClickEvent } from 'devextreme/ui/list';

@Component({
  selector: 'app-drawer',
  imports: [DxDrawerModule, DxListModule, DxToolbarModule, DxTextBoxModule,RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {

  onNavigationItemClick($event: ItemClickEvent) {
    throw new Error('Method not implemented.');
  }
  private router = inject(Router);
  isDrawerOpen = true;

  menuItems = [
    { text: 'Cages', icon: 'home', route: '/cages' },
    { text: 'Products', icon: 'box', route: '/products' },
    { text: 'Settings', icon: 'preferences', route: '/settings' },
  ];
  buttonOptions: any = {
    icon: 'menu',
    onClick: () => {
      console.log('Button clicked', this.isDrawerOpen);
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  };
}
