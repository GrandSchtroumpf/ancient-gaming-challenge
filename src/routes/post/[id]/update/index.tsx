import { component$, event$, Resource, useResource$, useStyles$ } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";
import { BackIcon } from "~/components/icons/icons";
import { PostForm } from "~/components/post-form";
import { useToaster } from "~/components/toaster/toaster";
import type { CreatePostInput} from "~/queries/posts";
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
      <Link href="../view" class="btn-icon">
        <BackIcon />
      </Link>
      <h1>{post.title}</h1>
    </header>
    <main class="create-post-page">
      <PostForm value={post} onSubmit={update}/>
    </main>
  </>)} />
})