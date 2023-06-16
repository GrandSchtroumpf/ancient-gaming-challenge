import { component$, event$, useStyles$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { BackIcon } from "~/components/icons/icons";
import type { CreatePostInput } from "~/queries/posts";
import { createPost } from "~/queries/posts";
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const create = event$(async (_: any, form: HTMLFormElement) => {
    const data = new FormData(form);
    // Force cast type because fromEntries is wrongly strongly typed
    const post = Object.fromEntries(data.entries()) as any as CreatePostInput;
    console.log(post);
    try {
      const { id } = await createPost(post);
      console.log(id);
    } catch(err) {
      console.error(err);
    }
  })
  return <>
    <header class="view-header">
      <Link href="/" class="btn-icon">
        <BackIcon />
      </Link>
      <h1>Create a new Post</h1>
    </header>
    <main class="create-post-page">
      <form class="surface" preventdefault:submit onSubmit$={create}>
        <input type="text" name="title" required/>
        <textarea name="body" required></textarea>
        <footer>
          <button class="btn" type="reset">Cancel</button>
          <button class="btn-fill primary" type="submit">Create Post</button>
        </footer>
      </form>
    </main>
  </>
})