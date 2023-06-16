import { createContextId, useContextProvider, useStore } from "@builder.io/qwik";

export const HueContext = createContextId<{ enabled: boolean }>('HueContext');
export function useHueProvider() {
  const state = useStore({
    enabled: true,
    value: 250
  });
  useContextProvider(HueContext, state);
  return state;
}
