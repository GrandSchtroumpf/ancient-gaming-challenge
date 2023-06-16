import { component$, event$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { BackIcon } from "~/components/icons/icons";
import { PostForm } from "~/components/post-form";
import { useToaster } from "~/components/toaster/toaster";
import type { CreatePostInput } from "~/queries/posts";
import { createPost } from "~/queries/posts";
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const toaster = useToaster();
  const create = event$(async (input: CreatePostInput) => {
    await createPost(input);
    toaster.add('Your Post has been created 🎊');
  });
  return <>
    <header class="view-header">
      <Link href="/" class="btn-icon">
        <BackIcon />
      </Link>
      <h1>Create a new Post</h1>
    </header>
    <main class="create-post-page">
      <PostForm onSubmit={create}/>
    </main>
  </>
})

export const head: DocumentHead = {
  title: 'Create a post',
  meta: [
    {
      name: 'description',
      content: 'On this page you can create a brand new post',
    },
  ],
};
