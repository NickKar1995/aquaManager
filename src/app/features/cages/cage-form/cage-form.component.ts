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
  }

  private initForm() {
    this.formSub = this.formBuilder.group({
      name: [''],
      depth: [''],
      diameter: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.initialData) {
      this.formSub.patchValue(this.initialData);
    }
    if (this.mode === 'create' && this.formSub) {
      this.formSub.reset();
    }
  }

  onSubmit() {
    if (this.formSub.invalid) return;
    const payload = this.formSub.value;
    if (this.mode === 'create') {
      this.dataService.addCage(payload);
    } else {
      payload.id = this.initialData!.id;
      this.dataService.updateCage(payload);
    }
    this.closePopup();
  }

  closePopup() {
    this.popupVisibilityChanged.emit(false);
  }
}
