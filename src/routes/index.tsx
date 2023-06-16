import { component$, Resource, useResource$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { AddIcon } from '~/components/icons/icons';
import { Pagination } from '~/components/pagination';
import { PostList } from '~/components/post-list';
import { getPostPage } from '~/queries/posts';
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const postsResource = useResource$(() => getPostPage({ paginate: { limit: 20 }}));
  return <>
    <nav role="searchbox">
      <Link href="/search" class="search">Search</Link>
      <Link href="/post/create" class="btn-icon tooltip" aria-label="Create a post">
        <AddIcon />
      </Link>
    </nav>
    <main class="post-list-page">
      <Resource value={postsResource}
        onResolved={(page) => <>
          <PostList posts={page.data}/>
          <Pagination page={page} baseUrl="/search"/>
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
