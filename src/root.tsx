import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.scss';

export default component$(() => {

  // Just for fun: Change global color every second
  useVisibleTask$(() => {
    const interval = setInterval(() => {
      const initial = '250';
      const hue = document.documentElement.style.getPropertyValue('--hue') || initial;
      const nextHue = (Number(hue) + 1) % 360;
      document.documentElement.style.setProperty('--hue', `${nextHue}`);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
