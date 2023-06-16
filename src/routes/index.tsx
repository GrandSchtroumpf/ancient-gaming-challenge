import { component$, Resource, useContext, useResource$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { HueContext } from '~/components/hue';
import { AddIcon, Logo } from '~/components/icons/icons';
import { Pagination } from '~/components/pagination';
import { PostList } from '~/components/post-list';
import { getPostPage } from '~/queries/posts';
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const hueState = useContext(HueContext);
  const postsResource = useResource$(() => getPostPage({ paginate: { limit: 10 } }));
  return <>
    <nav role="searchbox">
      <button class="btn-icon logo" onClick$={() => hueState.enabled = !hueState.enabled}>
        <Logo class={hueState.enabled ? 'enabled' : 'disabled'} />
      </button>
      <Link href="/search" class="search">Search</Link>
      <Link href="/post/create" class="btn-icon tooltip-left" aria-label="Create a post">
        <AddIcon />
      </Link>
    </nav>
    <main class="post-list-page">
      <article class="welcome theme">
        <h1>Ancient Gaming Challenge</h1>
        <p>
          Welcome on my challenge. I hope you'll appreciate the experience<br/>
          I use this opportunity to play a little with CSS color spaces.<br/>
          This is a new CSS feature, and some browser (Firefox mobile for example) do not support it...
        </p>
        <p>
          The background will change over time. To disable to feature you can click on the logo above: 
        </p>
        <ul role="list">
          <li class="logo">
            <Logo class="enabled"/> : The background will change
          </li>
          <li class="logo">
            <Logo class="disabled"/> : The background won't change
          </li>
        </ul>
      </article>
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
