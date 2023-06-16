export type Controller = HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement;

export function disableForm(form: HTMLFormElement) {
  const controllers = form.querySelectorAll<Controller>('input, button, textarea');
  for (const controller of controllers) {
    controller.disabled = true;
  }
}

export function enableForm(form: HTMLFormElement) {
  const controllers = form.querySelectorAll<Controller>('input, button, textarea');
  for (const controller of controllers) {
    controller.disabled = false;
  }
}