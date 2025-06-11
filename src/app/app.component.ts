import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DxButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'aquaManager';
}
