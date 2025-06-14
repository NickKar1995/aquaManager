import { Component, HostListener } from '@angular/core';
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
  private readonly MOBILE_BREAKPOINT = 768;
  isDrawerOpen = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= this.MOBILE_BREAKPOINT) {
      this.isDrawerOpen = false;
    }
  }

  menuItems = [
    { text: 'Cages', icon: 'home', route: '/cages' },
    { text: 'Fish Stocking', icon: 'box', route: '/fish-stocking' },
    { text: 'Mortalities', icon: 'preferences', route: '/mortalities' },
  ];

  buttonOptions: any = {
    icon: 'menu',
    onClick: () => {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  };

  onNavigationItemClick($event: ItemClickEvent) {
    throw new Error('Method not implemented.');
  }
}
