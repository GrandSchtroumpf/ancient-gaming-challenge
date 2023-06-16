import type { QwikJSX } from "@builder.io/qwik";
import { component$, Slot, useContext, useStyles$ } from "@builder.io/qwik";
import { FormFieldContext } from "../form-field/form-field";
import styles from './input.scss?inline';

type InputAttributes = Omit<QwikJSX.IntrinsicElements['input'], 'children'>;

export const Input = component$((props: InputAttributes) => {
  useStyles$(styles);
  const { id } = useContext(FormFieldContext);

  return <div class="field">
    <Slot name="prefix"/>
    <input id={id} {...props}/>
    <Slot name="suffix"/>
  </div>
})