import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { DrawerComponent } from './core/layout/drawer/drawer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DxButtonModule, DrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'aquaManager';
}
