import { component$, useStyles$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { PostItem } from "~/queries/posts";
import styles from './index.scss?inline';

interface PostListProps {
  posts: PostItem[];
}
export const PostList = component$(({ posts }: PostListProps) => {
  useStyles$(styles);
  if (!posts.length) return <p>There is no post matching your request 😥.</p>
  // Force role for Safari
  return <ul class="post-list" role="list">
    {posts.map(post => (
    <li key={post.id} id={post.id}>
      <Link href={'/post/' + post.id} class="surface">
        <h3>{post.title}</h3>
        <p>By <span class="secondary">{post.user.username}</span></p>
      </Link>
    </li>
    ))}
  </ul>
});
