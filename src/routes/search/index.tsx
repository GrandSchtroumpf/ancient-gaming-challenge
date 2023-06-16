import type { QwikSubmitEvent} from "@builder.io/qwik";
import { component$, event$, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { BackIcon, SearchIcon } from "~/components/icons/icons";
import { getSearchParams, Pagination } from "~/components/pagination";
import { PostList } from "~/components/post-list";
import type { PostsPage } from "~/queries/posts";
import { getPostPage } from "~/queries/posts";
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const nav = useNavigate();
  const { url } = useLocation();
  const page = useSignal<PostsPage>();

  // Trigger on the browser because SSG do not see a difference of pages with searchParams
  useVisibleTask$(async () => {
    const search = url.searchParams.get('search') ?? '{}';
    page.value = await getPostPage(JSON.parse(search));
  })

  const search = event$((event: QwikSubmitEvent<HTMLFormElement>, form: HTMLFormElement) => {
    const data = new FormData(form);
    const q = data.get('q')?.toString() ?? '';
    nav(getSearchParams(url, { search: { q } }));
  });

  if (!page.value) return <></>;
  return <>
    <form role="searchbox" preventdefault:submit onSubmit$={search}>
      <a href="/" class="btn-icon">
        <BackIcon/>
      </a>
      <input autoFocus class="search" type="search" name="q" aria-label="Search" placeholder="Search"/>
      <button type="submit" class="btn-icon">
        <SearchIcon/>
      </button>
    </form>
    <main class="search-page">
      <PostList posts={page.value.data}/>
      <Pagination page={page.value} baseUrl="/search"/>
    </main>
  </>
});


export const head: DocumentHead = {
  title: 'Search a post',
  meta: [
    {
      name: 'description',
      content: 'Search for your favorite post',
    },
  ],
};
