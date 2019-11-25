import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/shared/types/photo';

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.scss']
})
export class FeedHeaderComponent {
  @Input() searchQuery: string;
  @Input() perPage: number;
  @Input() photos: Photo[];
  @Output() clearEmitter: EventEmitter<any> = new EventEmitter();
  @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
  @Output() perPageEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  search(searchQuery: string, perPage: number): void {
    if (!searchQuery) {
      return;
    }

    this.searchEmitter.emit({
      searchQuery,
      perPage
    });
  }

  clear() {
    this.clearEmitter.emit(true);
  }

  perPageChange(perPage: number) {
    this.perPageEmitter.emit(perPage);
  }
}
