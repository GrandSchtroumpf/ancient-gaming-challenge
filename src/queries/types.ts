export interface Page<T> {
  data: T[];
  links: PaginationLinks;
  meta: PageMetadata;
}

export interface PageMetadata {
  totalCount: number
}

export interface PageLimitPair {
  page: number;
  limit: number;
}

export interface PaginationLinks {
  first: PageLimitPair;
  prev: PageLimitPair | null;
  next: PageLimitPair | null;
  last: PageLimitPair;
}

export interface PageQueryOptions {
  paginate?: PaginateOptions;
  slice?: SliceOptions;
  sort?: SortOptions[];
  operators?: OperatorOptions[];
  search?: SearchOptions;
}



export interface PaginateOptions {
  page?: number;
  limit?: number;
}

export interface SliceOptions {
  start?: number;
  end?: number;
  limit?: number;
}

export interface SortOptions {
  field?: string;
  order?: SortOrderEnum;
}

export interface OperatorOptions {
  kind?: OperatorKindEnum;
  field?: string;
  value?: string;
}

export interface SearchOptions {
  q: string;
}

export type SortOrderEnum = 'ASC' | 'DESC';
export type OperatorKindEnum = 'GTE' | 'LTE' | 'NE' | 'LIKE';