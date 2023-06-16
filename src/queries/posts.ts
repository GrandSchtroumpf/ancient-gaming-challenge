import type { Page, PageQueryOptions } from "./types";
import type { User } from "./user";
import { get } from "./utils";

export type PostsPage = Page<PostItem>;

export interface PostItem {
  id: string;
  title: string;
  body: string;
  user: User;
}

export interface Post extends PostItem {
  comments: CommentsPage;
}

export type CommentsPage = Page<Comment>;

export interface Comment {
  id: string;
  name: string
  email: string
  body: string
}

export async function getPostPage(options?: PageQueryOptions) {
  const query = `
  query PagePosts($options: PageQueryOptions) {
    posts(options: $options) {
      meta {
        totalCount
      }
      links {
        first { ...pageLimit }
        prev { ...pageLimit }
        next { ...pageLimit }
        last { ...pageLimit }
      }
      data {
        id
        title
        body
        user {
          id
          username
        }
      }
    }
  }
  fragment pageLimit on PageLimitPair {
    page
    limit
  }
  `;
  const { posts } = await get<{ posts: PostsPage }>(query, { options });
  return posts;
}


export async function getPost(id: string) {
  const query = `
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        username
        email
        website
        company {
          name
        }
      }
      comments {
        meta {
          totalCount
        }
        data {
          id
          name
          email
          body
        }
      }
    }
  }`;
  const { post } = await get<{ post: Post }>(query, { id });
  return post;
}