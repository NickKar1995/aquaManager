import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonOptions, MENU_ITEMS, MenuItem } from '@models';
import { DxToolbarModule, DxTextBoxModule, DxListModule, DxDrawerModule } from 'devextreme-angular';

@Component({
  selector: 'app-drawer',
  imports: [DxDrawerModule, DxListModule, DxToolbarModule, DxTextBoxModule, RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  private readonly MOBILE_BREAKPOINT = 768;
  menuItems: MenuItem[] = MENU_ITEMS;
  isDrawerOpen = true;
  buttonOptions: ButtonOptions = {
    icon: 'menu',
    onClick: () => {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const target = event.target as Window;
    if (target.innerWidth <= this.MOBILE_BREAKPOINT) {
      this.isDrawerOpen = false;
    }
  }
}
