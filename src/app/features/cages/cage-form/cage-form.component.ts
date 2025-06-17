import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cage } from '@models';
import { DataService } from 'app/core/services/data/data.service';
import { DxPopupModule, DxTextBoxModule, DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-cage-form',
  imports: [DxPopupModule, ReactiveFormsModule, DxTextBoxModule, DxButtonModule],
  templateUrl: './cage-form.component.html',
  styleUrl: './cage-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CageFormComponent implements OnInit, OnChanges {
  @Input() isPopupVisible = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() initialData: Cage | null = null;
  @Output() popupVisibilityChanged = new EventEmitter<boolean>();

  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);

  formSub!: FormGroup;

  ngOnInit() {
    this.initForm();
    console.log(this.initialData);
  }

  private initForm() {
    this.formSub = this.formBuilder.group({
      name: [''],
      depth: [''],
      diameter: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.initialData);
    // Ελέγχουμε αν το isPopupVisible έχει αλλάξε
    // Όταν ανοίγει το popup με δεδομένα edit, γεμίζουμε το form
    if (changes['initialData'] && this.initialData) {
      this.formSub.patchValue(this.initialData);
    }
    // Αν είναι create, κάνουμε reset
    if (this.mode === 'create' && this.formSub) {
      this.formSub.reset();
    }
  }

  onSubmit() {
    if (this.formSub.invalid) return;
    const payload = this.formSub.value;
    if (this.mode === 'create') {
      this.dataService.addCage(payload);
      // κλήση Create API
    } else {
      payload.id = this.initialData!.id; // Προσθήκη του id στο payload για ενημέρωση
      this.dataService.updateCage(payload);
      // κλήση Update API με this.initialData.id
    }
    this.closePopup();
  }

  closePopup() {
    this.popupVisibilityChanged.emit(false);
  }
}
