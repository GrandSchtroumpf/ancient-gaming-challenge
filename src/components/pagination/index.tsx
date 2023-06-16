import { component$, useStyles$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { Page, PageLimitPair, PageQueryOptions } from "~/queries/types";
import styles from './index.scss?inline';


export function getSearchParams(url: URL, updates: PageQueryOptions) {
  const search = url.searchParams.get('search') ?? '{}';
  const queryParams = JSON.stringify({ ...JSON.parse(search), ...updates });
  return `?search=${encodeURIComponent(queryParams)}`;
}

interface PaginationProps {
  page: Page<any>;
  baseUrl: string;
}
export const Pagination = component$(({ page, baseUrl }: PaginationProps) => {
  useStyles$(styles);
  const { url } = useLocation();
  const size = page.data.length;
  const { totalCount } = page.meta;

  // If totalCount is 0, links will be null, so we want to return before using
  if (!totalCount) return <></>;

  const { first, prev, next, last } = page.links;
  const prevClass = ['btn-icon', 'tooltip', prev?.page ? '': 'disabled'];
  const nextClass = ['btn-icon', 'tooltip', next?.page ? '': 'disabled'];
  const currentPage = next?.page ? next?.page - 1 : last.page;

  const getUrl = (paginate: PageLimitPair | null) => {
    if (!paginate) return;
    return `${baseUrl}/${getSearchParams(url, {paginate})}`;
  }

  return <nav aria-label="pagination" class="pagination">
    <p>{(currentPage - 1) * size} - {currentPage * size} / {totalCount}</p>
    
    <div class="links">
      {/* First */}
      <Link href={getUrl(first)} class={prevClass} aria-label="First Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
          <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
        </svg>
      </Link>
      {/* Previous */}
      <Link href={getUrl(prev)} class={prevClass} aria-label="Previous Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
        </svg>
      </Link>
      {/* Next */}
      <Link href={getUrl(next)} class={nextClass} aria-label="Next Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
      </Link>
      {/* Last */}
      <Link href={getUrl(last)} class={nextClass} aria-label="Last Page">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
          <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
        </svg>
      </Link>
    </div>
  </nav>
})