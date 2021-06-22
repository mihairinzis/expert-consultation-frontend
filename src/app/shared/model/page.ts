export class Pageable {
  pageSize: number;
  pageNumber: number;
}

export class Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
}
