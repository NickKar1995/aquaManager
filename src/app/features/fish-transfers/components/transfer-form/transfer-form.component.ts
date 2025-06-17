import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cage, Stocking, Transfer } from '@models';
import { DataService } from 'app/core/services/data/data.service';
import {
  DxPopupModule,
  DxTextBoxModule,
  DxButtonModule,
  DxTagBoxModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { ValueChangedEvent } from 'devextreme/ui/select_box';
import { DataGridComponent } from 'app/shared/data-grid/data-grid.component';
import { RowUpdatedEvent, RowUpdatingEvent } from 'devextreme/ui/data_grid';
import { ColumnConfig } from '../../../../core/models/ColumnConfig';
import { DestinationCage } from '../../models/SelectedTargetCage';

@Component({
  selector: 'app-transfer-form',
  imports: [
    DxTextBoxModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    ReactiveFormsModule,
    DxPopupModule,
    DxNumberBoxModule,
    DataGridComponent,
  ],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferFormComponent implements OnInit {
  formSub!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);
  selectedDate: Date = new Date();
  filledCages = this.dataService.getCagesWithStock(this.selectedDate);
  availableTargetCages: Cage[] = [...this.filledCages];

  @Input() isPopupVisible!: boolean;
  @Input() columnsStructure!: ColumnConfig[];
  @Output() popupVisibilityChanged = new EventEmitter<boolean>();
  @Output() transferAdded = new EventEmitter<boolean>();

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.formSub.valid) {
      const formData = this.formSub.value;
      const sourceCageId = formData.cageSource;

      const selectedTargets = formData.targetCagesArray
        .filter((target: Stocking) => target.quantity > 0)
        .map((target: DestinationCage) => ({
          destinationCageId: target.destinationCageId,
          quantity: target.quantity,
        }));

      if (selectedTargets.length === 0) {
        alert('Please select at least one target cage with quantity greater than 0');
        return;
      }
      const transfer: Transfer = {
        id: 0,
        date: new Date(),
        sourceCageId: sourceCageId,
        destinations: selectedTargets,
      };
      this.dataService.addTransfer(transfer);
      this.closePopup();
      this.transferAdded.emit(true);
    } else {
      this.markFormGroupTouched(this.formSub);
    }
  }

  closePopup() {
    this.popupVisibilityChanged.emit(false);
  }

  onGridRowUpdated($event: RowUpdatedEvent) {
    console.log('Row updated:', $event);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          if (control.at(i) instanceof FormGroup) {
            this.markFormGroupTouched(control.at(i) as FormGroup);
          }
        }
      }
    });
  }
  onGridRowUpdating(event: RowUpdatingEvent) {
    const rowIndex = event.component.getRowIndexByKey(event.key);
    const targetCagesArray = this.formSub.get('targetCagesArray') as FormArray;
    if (event.newData.quantity !== undefined) {
      targetCagesArray.at(rowIndex).get('quantity')?.setValue(event.newData.quantity);
    }

    if (event.newData.selected !== undefined) {
      targetCagesArray.at(rowIndex).get('selected')?.setValue(event.newData.selected);
    }
  }

  onSourceCageChange(event: ValueChangedEvent) {
    const sourceId = event.value;
    this.updateAvailableTargetCages(sourceId);
    this.resetTargetCagesFormArray();
  }

  private resetTargetCagesFormArray() {
    const targetCagesArray = this.formSub.get('targetCagesArray') as FormArray;
    while (targetCagesArray.length) {
      targetCagesArray.removeAt(0);
    }
    this.availableTargetCages.forEach((cage) => {
      targetCagesArray.push(this.createTargetCageFormGroup(cage));
    });
  }
  private createTargetCageFormGroup(cage: Cage): FormGroup {
    return this.formBuilder.group({
      destinationCageId: [cage.id],
      name: [cage.name],
      quantity: [0, [Validators.min(0)]],
      selected: [false],
    });
  }
  private updateAvailableTargetCages(sourceId: number) {
    if (sourceId) {
      this.availableTargetCages = this.filledCages.filter((cage) => cage.id !== sourceId);
    } else {
      this.availableTargetCages = [...this.filledCages];
    }
  }

  private initForm() {
    this.formSub = this.formBuilder.group({
      cageSource: [''],
      targetCagesArray: this.formBuilder.array([]),
    });
  }
}
