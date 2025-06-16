// services/data.service.ts
import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Cage, Stocking, Mortality, Transfer } from '../../models';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private notificationsService = inject(NotificationsService);

  // Define signals for our data collections
  private cagesSignal = signal<Cage[]>([]);
  private stockingsSignal = signal<Stocking[]>([]);
  private mortalitiesSignal = signal<Mortality[]>([]);
  private transfersSignal = signal<Transfer[]>([]);

  // Expose read-only signals for components to consume
  public cages = this.cagesSignal.asReadonly();
  public stockings = this.stockingsSignal.asReadonly();
  public mortalities = this.mortalitiesSignal.asReadonly();
  public transfers = this.transfersSignal.asReadonly();

  constructor() {
    // Load initial data from localStorage
    this.loadFromLocalStorage();

    // Set up effects to save data whenever it changes
    effect(() => {
      localStorage.setItem('fish-farm-cages', JSON.stringify(this.cagesSignal()));
    });

    effect(() => {
      localStorage.setItem('fish-farm-stockings', JSON.stringify(this.stockingsSignal()));
    });

    effect(() => {
      localStorage.setItem('fish-farm-mortalities', JSON.stringify(this.mortalitiesSignal()));
    });

    effect(() => {
      localStorage.setItem('fish-farm-transfers', JSON.stringify(this.transfersSignal()));
    });
  }

  private loadFromLocalStorage(): void {
    try {
      // Load cages
      const cagesData = localStorage.getItem('fish-farm-cages');
      if (cagesData) {
        this.cagesSignal.set(JSON.parse(cagesData));
      }

      // Load stockings
      const stockingsData = localStorage.getItem('fish-farm-stockings');
      if (stockingsData) {
        this.stockingsSignal.set(JSON.parse(stockingsData));
      }

      // Load mortalities
      const mortalitiesData = localStorage.getItem('fish-farm-mortalities');
      if (mortalitiesData) {
        this.mortalitiesSignal.set(JSON.parse(mortalitiesData));
      }

      // Load transfers
      const transfersData = localStorage.getItem('fish-farm-transfers');
      if (transfersData) {
        this.transfersSignal.set(JSON.parse(transfersData));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      this.notificationsService.showError('Failed to load data from storage');
      // If there's an error, initialize with empty arrays
      this.cagesSignal.set([]);
      this.stockingsSignal.set([]);
      this.mortalitiesSignal.set([]);
      this.transfersSignal.set([]);
    }
  }

  // Helper method to reset all data (useful for testing)
  resetAllData(): void {
    try {
      this.cagesSignal.set([]);
      this.stockingsSignal.set([]);
      this.mortalitiesSignal.set([]);
      this.transfersSignal.set([]);

      localStorage.removeItem('fish-farm-cages');
      localStorage.removeItem('fish-farm-stockings');
      localStorage.removeItem('fish-farm-mortalities');
      localStorage.removeItem('fish-farm-transfers');

      this.notificationsService.showSuccess('All data has been reset');
    } catch (error) {
      console.error('Error resetting data:', error);
      this.notificationsService.showError('Failed to reset data');
    }
  }

  // CRUD operations for cages
  addCage(cage: Cage): void {
    try {
      const newCage = { ...cage, id: this.generateId() };
      this.cagesSignal.update((cages) => [...cages, newCage]);
      this.notificationsService.showSuccess(`Cage "${newCage.name}" added successfully`);
    } catch (error) {
      console.error('Error adding cage:', error);
      this.notificationsService.showError(`Failed to add cage`);
    }
  }

  updateCage(updatedCage: Cage, showNotification: boolean = true): void {
    try {
      this.cagesSignal.update((cages) =>
        cages.map((cage) => (cage.id === updatedCage.id ? updatedCage : cage)),
      );

      if (showNotification) {
        this.notificationsService.showSuccess(`Cage "${updatedCage.name}" updated successfully`);
      }
    } catch (error) {
      console.error('Error updating cage:', error);
      if (showNotification) {
        this.notificationsService.showError(`Failed to update cage`);
      }
    }
  }

  deleteCage(id: number): void {
    try {
      // Find the cage name before deleting
      const cage = this.cagesSignal().find((c) => c.id === id);
      if (!cage) {
        this.notificationsService.showError(`Cage not found`);
        return;
      }

      this.cagesSignal.update((cages) => cages.filter((c) => c.id !== id));
      this.notificationsService.showSuccess(`Cage "${cage.name}" deleted successfully`);
    } catch (error) {
      console.error('Error deleting cage:', error);
      this.notificationsService.showError(`Failed to delete cage`);
    }
  }

  getCageById(id: number): Cage | undefined {
    return this.cagesSignal().find((cage) => cage.id === id);
  }

  // CRUD operations for stockings
  getStockingsByDate(date: Date): Stocking[] {
    const sameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    return this.stockingsSignal().filter((s) => sameDay(new Date(s.date), date));
  }

  // getAllCages(): Cage[] {
  //   return this.cages();
  // }

  addStocking(stocking: Stocking): void {
    try {
      const newStocking = { ...stocking, id: this.generateId() };
      this.stockingsSignal.update((stockings) => [...stockings, newStocking]);

      // Update cage status to 'stocked'
      const cage = this.cagesSignal().find((c) => c.id === stocking.cageId);
      if (cage && cage.status === 'empty') {
        this.updateCage({ ...cage, status: 'stocked' }, false);
      }

      this.notificationsService.showSuccess(
        `${newStocking.quantity} fish stocked to cage "${cage?.name || 'Unknown'}"`,
      );
    } catch (error) {
      console.error('Error adding stocking:', error);
      this.notificationsService.showError(`Failed to add stocking`);
    }
  }

  updateStocking(updatedStocking: Stocking): void {
    try {
      this.stockingsSignal.update((stockings) =>
        stockings.map((stocking) =>
          stocking.id === updatedStocking.id ? updatedStocking : stocking,
        ),
      );

      const cage = this.cagesSignal().find((c) => c.id === updatedStocking.cageId);
      this.notificationsService.showSuccess(
        `Stocking updated for cage "${cage?.name || 'Unknown'}"`,
      );
    } catch (error) {
      console.error('Error updating stocking:', error);
      this.notificationsService.showError(`Failed to update stocking`);
    }
  }

  // Similar CRUD operations for mortalities
  getMortalitiesByDate(date: Date): Mortality[] {
    const sameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    return this.mortalitiesSignal().filter((m) => sameDay(new Date(m.date), date));
  }

  addMortality(mortality: Mortality): void {
    try {
      const newMortality = { ...mortality, id: this.generateId() };
      this.mortalitiesSignal.update((mortalities) => [...mortalities, newMortality]);

      const cage = this.cagesSignal().find((c) => c.id === mortality.cageId);
      this.notificationsService.showSuccess(
        `${newMortality.mortality} mortalities registered for cage "${cage?.name || 'Unknown'}"`,
      );

      // Check if the cage is now empty
      if (cage && this.getStockBalance(cage.id, new Date()) === 0) {
        this.updateCage({ ...cage, status: 'empty' }, false);
      }
    } catch (error) {
      console.error('Error adding mortality:', error);
      this.notificationsService.showError(`Failed to add mortality`);
    }
  }

  updateMortality(updatedMortality: Mortality): void {
    try {
      this.mortalitiesSignal.update((mortalities) =>
        mortalities.map((mortality) =>
          mortality.id === updatedMortality.id ? updatedMortality : mortality,
        ),
      );

      const cage = this.cagesSignal().find((c) => c.id === updatedMortality.cageId);
      this.notificationsService.showSuccess(
        `Mortality updated for cage "${cage?.name || 'Unknown'}"`,
      );

      // Check if the cage is now empty
      if (cage && this.getStockBalance(cage.id, new Date()) === 0) {
        this.updateCage({ ...cage, status: 'empty' }, false);
      }
    } catch (error) {
      console.error('Error updating mortality:', error);
      this.notificationsService.showError(`Failed to update mortality`);
    }
  }

  getCagesWithStock(date: Date): Cage[] {
    return this.cagesSignal().filter((cage) => {
      const stockBalance = this.getStockBalance(cage.id, date);
      return stockBalance > 0;
    });
  }

  // Similar CRUD operations for transfers
  getTransfersByDate(date: Date): Transfer[] {
    const sameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    return this.transfersSignal().filter((t) => sameDay(new Date(t.date), date));
  }

  addTransfer(transfer: Transfer): void {
    try {
      const newTransfer = { ...transfer, id: this.generateId() };
      this.transfersSignal.update((transfers) => [...transfers, newTransfer]);

      // Get source cage name
      const sourceCage = this.cagesSignal().find((c) => c.id === transfer.sourceCageId);

      // Get destination cage names
      const destinationCages = transfer.destinations.map((dest) => {
        const cage = this.cagesSignal().find((c) => c.id === dest.destinationCageId);
        return {
          name: cage?.name || 'Unknown',
          quantity: dest.quantity,
        };
      });

      // Update destination cages to 'stocked' if they were empty
      transfer.destinations.forEach((dest) => {
        const cage = this.cagesSignal().find((c) => c.id === dest.destinationCageId);
        if (cage && cage.status === 'empty') {
          this.updateCage({ ...cage, status: 'stocked' }, false);
        }
      });

      // Check if source cage is now empty and update status if needed
      const sourceBalance = this.getStockBalance(transfer.sourceCageId, new Date());
      if (sourceCage && sourceBalance === 0) {
        this.updateCage({ ...sourceCage, status: 'empty' }, false);
      }

      const totalTransferred = transfer.destinations.reduce((sum, dest) => sum + dest.quantity, 0);
      this.notificationsService.showSuccess(
        `${totalTransferred} fish transferred from "${sourceCage?.name || 'Unknown'}" to ${
          destinationCages.length
        } cages`,
      );
    } catch (error) {
      console.error('Error adding transfer:', error);
      this.notificationsService.showError(`Failed to add transfer`);
    }
  }

  updateTransfer(updatedTransfer: Transfer): void {
    try {
      this.transfersSignal.update((transfers) =>
        transfers.map((transfer) =>
          transfer.id === updatedTransfer.id ? updatedTransfer : transfer,
        ),
      );

      const sourceCage = this.cagesSignal().find((c) => c.id === updatedTransfer.sourceCageId);
      this.notificationsService.showSuccess(
        `Transfer from "${sourceCage?.name || 'Unknown'}" updated successfully`,
      );

      // Update cage statuses based on the updated transfer
      this.updateCageStatusesAfterTransfer(updatedTransfer);
    } catch (error) {
      console.error('Error updating transfer:', error);
      this.notificationsService.showError(`Failed to update transfer`);
    }
  }

  // deleteTransfer(id: number): void {
  //   try {
  //     const transfer = this.transfersSignal().find((t) => t.id === id);
  //     if (!transfer) {
  //       this.notificationsService.showError(`Transfer not found`);
  //       return;
  //     }

  //     const sourceCage = this.cagesSignal().find((c) => c.id === transfer.sourceCageId);

  //     this.transfersSignal.update((transfers) => transfers.filter((t) => t.id !== id));
  //     this.notificationsService.showSuccess(
  //       `Transfer from "${sourceCage?.name || 'Unknown'}" deleted successfully`,
  //     );

  //     // Update cage statuses after deletion
  //     this.updateAllCageStatuses();
  //   } catch (error) {
  //     console.error('Error deleting transfer:', error);
  //     this.notificationsService.showError(`Failed to delete transfer`);
  //   }
  // }

  // Helper method to update cage statuses after a transfer
  private updateCageStatusesAfterTransfer(transfer: Transfer): void {
    // Check source cage
    const sourceBalance = this.getStockBalance(transfer.sourceCageId, new Date());
    const sourceCage = this.cagesSignal().find((c) => c.id === transfer.sourceCageId);
    if (sourceCage) {
      if (sourceBalance === 0 && sourceCage.status === 'stocked') {
        this.updateCage({ ...sourceCage, status: 'empty' }, false);
      } else if (sourceBalance > 0 && sourceCage.status === 'empty') {
        this.updateCage({ ...sourceCage, status: 'stocked' }, false);
      }
    }

    // Check destination cages
    transfer.destinations.forEach((dest) => {
      const cage = this.cagesSignal().find((c) => c.id === dest.destinationCageId);
      if (cage) {
        const balance = this.getStockBalance(cage.id, new Date());
        if (balance === 0 && cage.status === 'stocked') {
          this.updateCage({ ...cage, status: 'empty' }, false);
        } else if (balance > 0 && cage.status === 'empty') {
          this.updateCage({ ...cage, status: 'stocked' }, false);
        }
      }
    });
  }

  // Helper method to update all cage statuses
  private updateAllCageStatuses(): void {
    const today = new Date();
    this.cagesSignal().forEach((cage) => {
      const balance = this.getStockBalance(cage.id, today);
      const newStatus = balance > 0 ? 'stocked' : 'empty';
      if (cage.status !== newStatus) {
        this.updateCage({ ...cage, status: newStatus }, false);
      }
    });
  }

  // Helper method to calculate stock balance for a cage on a specific date
  getStockBalance(cageId: number, date: Date): number {
    // Logic to calculate based on stockings, mortalities, and transfers
    const stockingsCount = this.stockingsSignal()
      .filter((s) => s.cageId === cageId && new Date(s.date) <= date)
      .reduce((sum, s) => sum + s.quantity, 0);

    const mortalitiesCount = this.mortalitiesSignal()
      .filter((m) => m.cageId === cageId && new Date(m.date) <= date)
      .reduce((sum, m) => sum + m.mortality, 0);

    // Calculate transfers in and out
    const transfersOut = this.calculateTransfersOut(cageId, date);
    const transfersIn = this.calculateTransfersIn(cageId, date);

    return stockingsCount - mortalitiesCount + transfersIn - transfersOut;
  }

  // Get all cages with their current stock balance
  getCagesWithBalance() {
    return computed(() => {
      const today = new Date();
      return this.cagesSignal().map((cage) => ({
        ...cage,
        currentBalance: this.getStockBalance(cage.id, today),
      }));
    });
  }

  // Get empty cages for a specific date
  getEmptyCagesOnDate(date: Date) {
    return this.cagesSignal().filter(
      (cage) => cage.status === 'empty' || this.getStockBalance(cage.id, date) === 0,
    );
  }

  // Get stocked cages for a specific date
  getStockedCages(date: Date) {
    return this.cagesSignal().filter(
      (cage) => cage.status === 'stocked' && this.getStockBalance(cage.id, date) > 0,
    );
  }

  private calculateTransfersOut(cageId: number, date: Date): number {
    return this.transfersSignal()
      .filter((t) => t.sourceCageId === cageId && new Date(t.date) <= date)
      .reduce((sum, t) => sum + t.destinations.reduce((s, d) => s + d.quantity, 0), 0);
  }

  private calculateTransfersIn(cageId: number, date: Date): number {
    let total = 0;
    this.transfersSignal()
      .filter((t) => new Date(t.date) <= date)
      .forEach((t) => {
        const destForCage = t.destinations.find((d) => d.destinationCageId === cageId);
        if (destForCage) {
          total += destForCage.quantity;
        }
      });
    return total;
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }
}
