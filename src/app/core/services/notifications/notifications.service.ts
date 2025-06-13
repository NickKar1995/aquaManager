// services/notification.service.ts
import { Injectable } from '@angular/core';
import { PositionConfig } from 'devextreme/common/core/animation';
import notify from 'devextreme/ui/notify';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  show(message: string, type: NotificationType = 'info', duration: number = 3000): void {
    const defaultPosition: PositionConfig = {
      at: 'right top',
      offset: { x: 0, y: 30 },
    };
    notify({
      message,
      type,
      duration,
      position: defaultPosition,
    });
  }

  showSuccess(message: string): void {
    this.show(message, 'success');
  }

  showError(message: string): void {
    this.show(message, 'error', 5000); // Longer duration for errors
  }

  showWarning(message: string): void {
    this.show(message, 'warning');
  }

  showInfo(message: string): void {
    this.show(message, 'info');
  }
}
