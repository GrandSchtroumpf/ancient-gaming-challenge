import { component$, event$, Resource, useResource$, useStyles$ } from "@builder.io/qwik";
import type { StaticGenerateHandler} from "@builder.io/qwik-city";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { BackIcon } from "~/components/icons/icons";
import { PostForm } from "~/components/post-form";
import { useToaster } from "~/components/toaster/toaster";
import type { CreatePostInput} from "~/queries/posts";
import { getPostPage} from "~/queries/posts";
import { getPost } from "~/queries/posts";
import { updatePost } from "~/queries/posts";
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const nav = useNavigate();
  const { params } = useLocation();
  const toaster = useToaster();
  const postResource = useResource$(() => getPost(params.id));
  const update = event$(async (input: CreatePostInput) => {
    await updatePost(params.id, input);
    toaster.add('Your Post has been updated 🎊');
    nav('../view');
  });
  return <Resource value={postResource} onResolved={(post => <>
    <header class="view-header">
      <a href={`/post/${post.id}/view`} class="btn-icon">
        <BackIcon />
      </a>
      <h1>{post.title}</h1>
    </header>
    <main class="create-post-page">
      <PostForm value={post} onSubmit={update}/>
    </main>
  </>)} />
})

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const {data} = await getPostPage();
  return {
    params: data.map((post) => ({ id: post.id })),
  };
}