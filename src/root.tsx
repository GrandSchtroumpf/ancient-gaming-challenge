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
    const hue = JSON.parse(sessionStorage.getItem('hue') || '{}');
    hueState.value = hue.value ? Number(hue.value) : 250;
    hueState.enabled = !!hue.enabled;
  })

  // Just for fun: Change global color every second
  useVisibleTask$(({ track }) => {
    track(() => hueState.enabled);
    sessionStorage.setItem('hue', JSON.stringify(hueState));
    if (!hueState.enabled) return;
    const setHue = () => {
      const nextHue = (hueState.value + 1) % 360;
      document.documentElement.style.setProperty('--hue', `${nextHue}`);
      hueState.value = nextHue;
      sessionStorage.setItem('hue', JSON.stringify(hueState));
    }
    const interval = setInterval(() => setHue, 1000);
    return () => clearInterval(interval);
  });

  const setHueScript = `
    const hue = JSON.parse(sessionStorage.getItem('hue') || '{}');
    document.documentElement.style.setProperty('--hue', hue.value || '250');
  `;

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        {/* Avoid flash */}
        <script dangerouslySetInnerHTML={setHueScript}></script>
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
        <Toaster />
      </body>
    </QwikCityProvider>
  );
});
