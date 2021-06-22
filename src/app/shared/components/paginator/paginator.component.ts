import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ec-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  Infinity = Infinity;

  @Input() totalPages: number;
  @Input() pageNumber: number;

  @Output() pageNumberChanged = new EventEmitter<number>();

  get pages(): number[] {
    if (!this.totalPages || !this.pageNumber) {
      return [];
    }
    const pages = [1]; // first page
    if (this.pageNumber - 2 > 1) {
      pages.push(Infinity); // dots
    }
    if (this.pageNumber - 1 > 1 && !pages.includes(this.pageNumber - 1)) {
      pages.push(this.pageNumber - 1); // previous page
    }
    if (!pages.includes(this.pageNumber)) {
      pages.push(this.pageNumber); // current page
    }
    if (this.pageNumber + 1 < this.totalPages && !pages.includes(this.pageNumber + 1)) {
      pages.push(this.pageNumber + 1); // next page
    }
    if (this.pageNumber + 2 < this.totalPages) {
      pages.push(Infinity); // dots
    }
    if (!pages.includes(this.totalPages)) {
      pages.push(this.totalPages); // last page
    }
    return pages;
  }
}
