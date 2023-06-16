import { component$, Resource, useResource$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { AddIcon } from '~/components/icons/icons';
import { Pagination } from '~/components/pagination';
import { PostList } from '~/components/post-list';
import { getPostPage } from '~/queries/posts';
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const postsResource = useResource$(() => getPostPage({ paginate: { limit: 20 } }));
  return <>
    <nav role="searchbox">
      <svg class="logo" viewBox="0 0 24 24" width="24" height="24" style="margin: 8px">
        <circle cx="12" cy="12" fill="none" stroke="var(--surface)" stroke-width="2" r="11" />
        <circle cx="12" cy="12" fill="var(--primary)" r="7" />
        <circle r="2" fill="var(--on-primary)" cx="9" cy="11" />
        <circle r="2" fill="var(--on-primary)" cx="15" cy="11" />
      </svg>
      <Link href="/search" class="search">Search</Link>
      <Link href="/post/create" class="btn-icon tooltip-left" aria-label="Create a post">
        <AddIcon />
      </Link>
    </nav>
    <main class="post-list-page">
      <Resource value={postsResource}
        onResolved={(page) => <>
          <PostList posts={page.data} />
          <Pagination page={page} baseUrl="/search" />
        </>}
      />
    </main>
  </>;
});

export const head: DocumentHead = {
  title: 'Ancient Gaming Challenge',
  meta: [
    {
      name: 'description',
      content: 'List of posts',
    },
  ],
};
