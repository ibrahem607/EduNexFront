import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css'],
})
export class CustomPaginationComponent implements OnChanges {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() lengthChanged: EventEmitter<number> = new EventEmitter();
  @Input() length!: number;
  @Input() itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsPerPage'] || changes['length']) {
      this.calculateTotalPages();
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil((this.length - 1) / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
