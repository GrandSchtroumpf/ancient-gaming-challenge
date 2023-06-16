import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getPost } from "~/queries/posts";

export const usePost = routeLoader$((req) => getPost(req.params.id));
export default component$(() => {
  return <Slot/>
});