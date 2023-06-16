import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { useHueProvider } from './components/hue';
import { RouterHead } from './components/router-head/router-head';
import { Toaster, useToasterProvider } from './components/toaster/toaster';

import './global.scss';


export default component$(() => {
  useToasterProvider();
  const hueState = useHueProvider();

  useVisibleTask$(() => {
    const hue = sessionStorage.getItem('hue') ?? '250';
    hueState.value = Number(hue);
  })

  // Just for fun: Change global color every second
  useVisibleTask$(({ track }) => {
    track(() => hueState.enabled);
    if (!hueState.enabled) return;
    const interval = setInterval(() => {
      const nextHue = (hueState.value + 1) % 360;
      document.documentElement.style.setProperty('--hue', `${nextHue}`);
      hueState.value = nextHue;
      sessionStorage.setItem('hue', `${nextHue}`);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        {/* Avoid flash */}
        <script>
          const hue = sessionStorage.getItem('hue') ?? '250';
          document.documentElement.style.setProperty('--hue', hue);
        </script>
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
        <Toaster />
      </body>
    </QwikCityProvider>
  );
});
