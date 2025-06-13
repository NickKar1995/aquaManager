import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Cage } from '@models';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() data: any;
  @Output() edit = new EventEmitter<Cage>();
  @Output() delete = new EventEmitter<Cage>();
  onCardClick() {
    this.edit.emit(this.data);
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation(); // 📌 μπλοκάρει το bubbling
    this.delete.emit(this.data);
  }
}
