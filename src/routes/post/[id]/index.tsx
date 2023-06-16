import { component$, Resource, useResource$, useStyles$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { Comment} from "~/queries/posts";
import { getPost } from "~/queries/posts";
import style from './index.scss?inline';

interface CommentListProps {
  comments: Comment[]
}
const CommentList = component$(({ comments }: CommentListProps) => {
  if (!comments.length) return <></>;
  return <ul class="comment-list" role="list">
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
})

export default component$(() => {
  useStyles$(style);
  const { params } = useLocation();
  const postResource = useResource$(() => getPost(params.id));
  return <>
      <header role="searchbox">
      <Link class="btn-icon" href="/">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </Link>
      <Link class="search">Search</Link>
    </header>
    <main class="post-page">

      <Resource value={postResource} onResolved={(post) => <>
        <article class="post surface" id={post.id}>
          <h1>{post.title}</h1>
          <Link>{post.user.username}</Link>
          <p>{post.body}</p>
        </article>
        <article class="surface" id="comments">
          <form>
            
          </form>
          <CommentList comments={post.comments.data}/>
        </article>
      </>}/>
    </main>
  </>
})