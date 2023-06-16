import type { Page, PageMetadata, PageQueryOptions, PaginationLinks } from "./types";
import type { User } from "./user";
import { get } from "./utils";

export type PostsPage = Page<Post>;

export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

export interface CommentsPage {
  data: Comment[];
  links: PaginationLinks;
  meta: PageMetadata;
}

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
        first {
          page
        }
        prev {
          page
        }
        next {
          page
        }
        last {
          page
        }
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
  }`;
  const { posts } = await get<{ posts: PostsPage }>(query, { options });
  return posts;
}


export async function getPost(id: string) {
  const query = `
  query Post($id: ID) {
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
    }
  }`;
  const { post } = await get<{ post: Post }>(query, { id });
  return post;
}