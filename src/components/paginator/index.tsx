import { component$, useStyles$ } from "@builder.io/qwik";
import type { Page } from "~/queries/types";
import styles from './index.scss?inline';

interface PaginationProps {
  page: Page<any>
}
export const Pagination = component$(({ page }: PaginationProps) => {
  useStyles$(styles);
  const size = page.data?.length ?? 0;
  const { totalCount } = page.meta;
  const { prev, next, first, last } = page.links;

  return <nav aria-label="pagination" class="pagination">
    <p>{size} / {totalCount}</p>
    
    <div class="links">
      <button class="btn-icon first tooltip" disabled={!prev?.page} aria-label="First Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
        <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
        </svg>
      </button>
      <button class="btn-icon previous tooltip" disabled={!prev?.page} aria-label="Previous Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
        </svg>
      </button>
      <button class="btn-icon next tooltip" disabled={!next?.page} aria-label="Next Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
      </button>
      <button class="btn-icon last tooltip" disabled={!next?.page} aria-label="Last Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
          <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
        </svg>
      </button>
    </div>
  </nav>
})