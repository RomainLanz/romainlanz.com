import {
  presetUno,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
  mergeConfigs,
  type UserConfig,
} from "unocss";

export default (config: UserConfig = {}) =>
  mergeConfigs([
    config,
    {
      theme: {
        boxShadow: {
          tiny: "2px 2px 0 #1e293b",
          small: "4px 4px 0 #1e293b",
          medium: "8px 8px 0 #1e293b",
          large: "12px 12px 0 #1e293b",
        },

        borderRadius: {
          ms: "0.25rem",
        },

        breakpoints: {
          xs: "375px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },

      presets: [
        presetUno(),
        presetWebFonts({
          provider: "bunny",

          fonts: {
            sans: ["Atkinson Hyperlegible"],
            mono: ["Fira Mono"],
          },
        }),
        presetIcons({
          cdn: "https://esm.sh/",
        }),
      ],

      transformers: [transformerDirectives()],
    },
  ]);
