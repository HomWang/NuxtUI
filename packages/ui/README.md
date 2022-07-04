# Nuxt UI Components

<a href="https://www.npmjs.com/package/nuxt-ui"><img src="https://flat.badgen.net/npm/v/nuxt-ui"></a>

The framework originally came from the UI toolkit for the nuxt 3 example and the internal tool UI.
Source: https://github.com/nuxt/ui

> Note: this library is undergoing a lot of work and will not be used as a general UI library for the time being. It is not recommended to use in production.

🏀 [Online Playground](https://components.ui.nuxtjs.org)

## Install

```ts
// nuxt.config.ts or nuxt.config.js
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    'nuxt-ui'
  ]
})
```

## Usage

Nuxt UI is an unbundled component library powered by [UnoCSS](https://github.com/antfu/unocss) and [VueUse](https://vueuse.org/).

In Nuxt UI, we introduced the `n` attribute for every component to customize the styles and variations. For example, to make a red button:

```html
<NButton n="red" />
```

to make it larger, add the size specifier (`sm`, `md`, `lg` or `xl`) the `n` attribute:

```html
<NButton n="red xl" />
```

You can apply the same specifiers to any other component, for example:

```html
<NCheckbox n="red xl" />
```

Apply it to parent components could make a local theme scope

```html
<NCard n="green-500">
  <!-- both of them are themed green -->
  <NCheckbox>i accept the terms & conditions</NCheckbox>
  <NButton>Submit</NButton>
</NCard>
```

## Icons

[Icon address](https://icon-sets.iconify.design)
```html
<!-- carbon:*** -->
<div class="carbon:checkmark-outline" />
```

## Theming

Powered by [UnoCSS](https://github.com/antfu/unocss), you can use Tailwind/Windi CSS utilities to quickly customize the look and feel of components.

It's also possible to override the default theme globally, for example:

```ts
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    // '@unocss/nuxt',
    // '@vueuse/nuxt',
    // '@nuxtjs/color-mode',
    'nuxt-ui'
  ],
  unocss: {
    shortcuts: {
      'n-button-base': 'border n-border-base rounded shadow-sm op80 !outline-none',
      'n-button-hover': 'op100 !border-context text-context',
      'n-button-active': 'n-active-base bg-context/5',
    }
  }
})
```
and 
```ts
// unocss.config.ts
import type { Preset } from '@unocss/core'
import type { Theme } from '@unocss/preset-uno'

const NuxtUIPreset: Preset<Theme> = {
  name: 'nuxt-ui',
  shortcuts: {
    // Customize and override
    'n-button-base': 'bg-blue dark:bg-black',
  }
}

export default {
  presets: [
    NuxtUIPreset as Preset<Theme>
  ]
}
```

You can find all the default values and available entries in [src/unocss/index.ts](./src/unocss/index.ts).
