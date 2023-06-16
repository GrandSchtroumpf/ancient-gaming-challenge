import { component$, event$, useStyles$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { FormField, Label } from "~/components/form/form-field/form-field";
import { Input } from "~/components/form/input/input";
import { Textarea } from "~/components/form/textarea/textarea";
import { BackIcon } from "~/components/icons/icons";
import { useToaster } from "~/components/toaster/toaster";
import type { CreatePostInput } from "~/queries/posts";
import { createPost } from "~/queries/posts";
import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);
  const toaster = useToaster();
  const create = event$(async (_: any, form: HTMLFormElement) => {
    const data = new FormData(form);
    // Force cast type because fromEntries is wrongly strongly typed
    const post = Object.fromEntries(data.entries()) as any as CreatePostInput;
    try {
      await createPost(post);
      form.reset();
      toaster.add('Your Post has been created 🎊');
    } catch(err) {
      console.error(err);
      toaster.add('Something wrong happened 😕');
    }
  });
  return <>
    <header class="view-header">
      <Link href="/" class="btn-icon">
        <BackIcon />
      </Link>
      <h1>Create a new Post</h1>
    </header>
    <main class="create-post-page">
      <form class="surface" preventdefault:submit onSubmit$={create}>
        <FormField>
          <Label>Title*</Label>
          <Input type="text" name="title" required placeholder="How to build a Qwik app in 24h"/>
        </FormField>
        <FormField>
          <Label>Body*</Label>
          <Textarea name="body" required placeholder="Let's build a Qwik app qwikly 😉" />
        </FormField>
        <footer>
          <button class="btn" type="reset">Cancel</button>
          <button class="btn-fill primary" type="submit">Create Post</button>
        </footer>
      </form>
    </main>
  </>
})