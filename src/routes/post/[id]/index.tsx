import { component$, event$, Resource, useResource$, useStyles$ } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";
import { FormField, Label } from "~/components/form/form-field/form-field";
import { Input } from "~/components/form/input/input";
import { Textarea } from "~/components/form/textarea/textarea";
import { AddIcon } from "~/components/icons/icons";
import { Comment, createComment, CreateCommentInput, deletePost, Post} from "~/queries/posts";
import { getPost } from "~/queries/posts";
import style from './index.scss?inline';

interface CommentListProps {
  comments: Comment[]
}
const CommentList = component$(({ comments }: CommentListProps) => {
  if (!comments.length) return <></>;
  
  return <details>
    <summary>See comments ({comments.length})</summary>
    <ul class="comment-list" role="list">
    {comments.map((comment, i) => <>
      <li key={comment.id} id={comment.id}>
        <h3>{comment.name}</h3>
        <Link href={'mailto:'+comment.email}>{comment.email}</Link>
        <p>{comment.body}</p>
      </li>
      {i !== comments.length - 1 && <hr/>}
    </>
    )}
    </ul>
  </details>
});


const CommentForm = component$(() => {
  const create = event$(async (_: any, form: HTMLFormElement) => {
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries()) as any as CreateCommentInput;
    try {
      await createComment(value);
      form.reset();
    } catch(err) {
      console.error(err);
    }
  });
  return <form class="comment-form" preventdefault:submit onSubmit$={create}>
    <FormField>
      <Label>Name*</Label>
      <Input name="name" required/>
    </FormField>
    <FormField>
      <Label>Email*</Label>
      <Input name="email" type="email" required/>
    </FormField>
    <FormField>
      <Label>Body*</Label>
      <Textarea name="body" required/>
    </FormField>
    <footer>
      <button class="btn" type="reset">Cancel</button>
      <button class="btn-fill primary" type="submit">Create</button>
    </footer>
  </form>
})

interface PostViewProps {
  post: Post;
}
const PostView = component$(({ post }: PostViewProps) => {
  const nav = useNavigate();
  if (!post) return <p>We couldn't find a post for this identifier, sorry 😥</p>;

  const remove = event$(async () => {
    try {
      await deletePost(post.id);
      nav('/');
    } catch(err) {
      console.error(err);
    }
  })

  return <>
    <article class="post surface" id={post.id}>
      <h1>{post.title}</h1>
      <a href={'mailto:' + post.user.email}>{post.user.username} ({post.user.email})</a>
      <p>{post.body}</p>
      <footer>
        <button class="btn-outline warn" onClick$={remove}>Delete</button>
      </footer>
    </article>
    <article class="surface" id="comments">
      <h2>Add a comment</h2>
      <CommentForm/>
      <CommentList comments={post.comments.data}/>
    </article>
  </>
})

export default component$(() => {
  useStyles$(style);
  const { params } = useLocation();
  const postResource = useResource$(() => getPost(params.id));
  return <>
    <nav role="searchbox">
      <Link class="btn-icon" href="/">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </Link>
      <Link href="/search" class="search">Search</Link>
      <Link href="/post/create" class="btn-icon tooltip-left" aria-label="create a post">
        <AddIcon/>
      </Link>
    </nav>
    <main class="post-page">
      <Resource value={postResource} onResolved={(post) => <PostView post={post}/>}/>
    </main>
  </>
})