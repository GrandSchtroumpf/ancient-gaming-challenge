import type { Page, PageQueryOptions } from "./types";
import type { User } from "./user";
import { graphql } from "./utils";

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

export interface CreatePostInput {
  title: string;
  body: string;
}

export type CommentsPage = Page<Comment>;

export interface Comment {
  id: string;
  name: string
  email: string
  body: string
}

export interface CreateCommentInput {
  name: string;
  email: string;
  body: string;
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
  const { posts } = await graphql<{ posts: PostsPage }>(query, { options });
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
  const { post } = await graphql<{ post: Post }>(query, { id });
  return post;
}


export async function createPost(input: CreatePostInput) {
  const mutation = `
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }`;
  const { createPost } = await graphql<{createPost: Omit<PostItem, 'user'>}>(mutation, { input });
  return createPost;
}
export async function deletePost(id: string) {
  const mutation = `
  mutation ($id: ID!) {
    deletePost(id: $id)
  }`;
  const { deletePost } = await graphql<{deletePost: boolean}>(mutation, { id });
  return deletePost;
}

export async function createComment(input: CreateCommentInput) {
  const mutation = `
  mutation (
    $input: CreateCommentInput!
  ) {
    createComment(input: $input) {
      id
      name
      email
      body
    }
  }`;
  const { createComment } = await graphql<{createComment: Comment}>(mutation, { input });
  return createComment;
}