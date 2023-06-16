import type { QwikJSX } from "@builder.io/qwik";
import { component$, useContext, useStyles$ } from "@builder.io/qwik";
import { FormFieldContext } from "../form-field/form-field";
import styles from './textarea.scss?inline';

type TextareaAttributes = QwikJSX.IntrinsicElements['textarea'];

export const Textarea = component$((props: TextareaAttributes) => {
  useStyles$(styles);
  const { id } = useContext(FormFieldContext);

  return <textarea {...props} id={id} class="field"/>
});