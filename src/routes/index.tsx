import { component$, Resource, useResource$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { Pagination } from '~/components/paginator';
import type { Post} from '~/queries/posts';
import { getPostPage, PostsPage } from '~/queries/posts';
import styles from './index.scss?inline';


interface PostsPageProps {
  page: PostsPage,
}
const PostsPage = component$(({ page }: PostsPageProps) => {
  return <>
    <PostList posts={page.data} />
    <Pagination page={page}/>
  </>
})




interface PostListProps {
  posts: Post[];
}
const PostList = component$(({ posts }: PostListProps) => {
  if (!posts.length) return <p>There is no post matching your request 😥.</p>
  // Force role for Safari
  return <ul class="post-list" role="list">
    {posts.map(post => (
    <li key={post.id}>
      <Link href={'post/' + post.id} class="surface">
        <h3>{post.title}</h3>
        <p class="secondary">{post.user.username}</p>
      </Link>
    </li>
    ))}
  </ul>
});




export default component$(() => {
  useStyles$(styles);
  const postsResource = useResource$(() => getPostPage({ paginate: { limit: 5  }}));
  return <>
    <header role="searchbox">
      <Link class="search">Search</Link>
    </header>
    <main class="page">
      <Resource value={postsResource}
        onRejected={(err) => <p class="warn">{err}</p>}
        onResolved={(page) => <PostsPage page={page} />} />
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
