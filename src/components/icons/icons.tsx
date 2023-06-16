import type { QwikJSX } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export const SearchIcon = component$(() => {
  return <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
</svg>;
})
export const BackIcon = component$(() => {
  return <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>;
})
export const AddIcon = component$(() => {
  return <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>;
})

export const Logo = component$((props: QwikJSX.IntrinsicElements['svg']) => {
  return <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
  <circle cx="12" cy="12" fill="none" stroke="var(--surface)" stroke-width="2" r="11" />
  <circle cx="12" cy="12" fill="var(--primary)" r="7" />
  <circle r="2" fill="var(--on-primary)" cx="9" cy="11" />
  <circle r="2" fill="var(--on-primary)" cx="15" cy="11" />
</svg>
})