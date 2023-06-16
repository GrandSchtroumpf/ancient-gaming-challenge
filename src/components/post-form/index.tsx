import { component$, event$, useStyles$ } from "@builder.io/qwik";
import type { QRL} from "@builder.io/qwik";
import { FormField, Label } from "../form/form-field/form-field";
import { Input } from "../form/input/input";
import { Textarea } from "../form/textarea/textarea";
import { disableForm, enableForm } from "../form/utils";
import { useToaster } from "../toaster/toaster";
import type { CreatePostInput, Post } from "~/queries/posts";
import styles from './index.scss?inline';

interface PostFormProps {
  value?: Post;
  onSubmit: QRL<(input: CreatePostInput) => Promise<any>>
}

export const PostForm = component$(({ value, onSubmit }: PostFormProps) => {
  useStyles$(styles);
  const toaster = useToaster();
  const create = event$(async (_: any, form: HTMLFormElement) => {
    const data = new FormData(form);
    // Force cast type because fromEntries is wrongly strongly typed
    const post = Object.fromEntries(data.entries()) as any as CreatePostInput;
    try {
      disableForm(form);
      await onSubmit(post);
      form.reset();
    } catch(err) {
      console.error(err);
      toaster.add('Something wrong happened 😕');
    } finally {
      enableForm(form);
    }
  });
  return <form class="post-form surface" preventdefault:submit onSubmit$={create}>
    <FormField>
      <Label>Title*</Label>
      <Input value={value?.title} type="text" name="title" required placeholder="How to build a Qwik app in 24h"/>
    </FormField>
    <FormField>
      <Label>Body*</Label>
      <Textarea value={value?.body} name="body" required placeholder="Let's build a Qwik app qwikly 😉" />
    </FormField>
    <footer>
      <button class="btn" type="reset">Cancel</button>
      <button class="btn-fill primary" type="submit">Submit</button>
    </footer>
  </form>
})