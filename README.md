# Expo + NativeWind

## English

Base React Native template with Expo Router and NativeWind, ready to work with class-based styling, light/dark mode, and a centralized palette from `constants/palette.js`.

### Getting Started

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npm run start
```

You can also use:

```bash
npm run android
npm run ios
npm run web
```

### What This Template Includes

- Expo Router with tabs in `app/(tabs)`.
- NativeWind configured with `tailwind.config.js`, `babel.config.js`, and `metro.config.js`.
- Centralized semantic palette from `constants/palette.js`.
- Light, dark, and system theme support with `darkMode: "class"`.
- Manual theme toggle in `components/theme-mode-toggle.tsx`.
- i18n with local dictionaries for Spanish and English.
- Manual language toggle in `components/language-toggle.tsx`.
- Base `ThemedText` and `ThemedView` components using `className`.
- `NativeWindImage` wrapper to use `className` with `expo-image`.
- Styling examples with NativeWind and native React Native `style`.

### Centralized Palette

The single source of truth for colors lives in `constants/palette.js`:

```js
const palette = {
  light: {
    background: "#ffffff",
    text: "#1e293b",
    primary: "#3b82f6",
  },
  dark: {
    background: "#0f172a",
    text: "#f8fafc",
    primary: "#60a5fa",
  },
};
```

That file feeds two paths:

- NativeWind receives CSS variables generated in `tailwind.config.js`.
- React Native and React Navigation receive JS colors from `constants/theme.ts`.

`constants/global.css` only imports the Tailwind layers:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

The `--color-*` variables are added with a plugin inside `tailwind.config.js`, using the values from `constants/palette.js`. Then they are consumed as semantic classes:

```tsx
<View className="bg-background">
  <Text className="text-text">Main text</Text>
  <View className="bg-primary" />
</View>
```

To add a new color:

1. Add it to `palette.light` and `palette.dark`.
2. If you want to use it as a NativeWind class, also add it to `cssVariableNames`.
3. If you need it in native APIs, consume it from `constants/theme.ts` or directly from `palette`.

You can also separate everything if you prefer less automation: define manual variables in `constants/global.css` for NativeWind and keep `constants/theme.ts` separate for React Native. That approach is easier to read at first, but it forces you to change colors in two places.

### Why There Is a NativeWind Theme and a React Native Theme

NativeWind and React Native do not consume styles in the same way.

NativeWind works with classes:

```tsx
<View className="bg-card border-border" />
```

React Navigation, icons, `StatusBar`, and some native libraries expect direct JavaScript values:

```tsx
tabBarActiveTintColor: palette.tint,
tabBarStyle: {
  backgroundColor: palette.card,
}
```

That is why this template has one palette, but two outputs:

- `tailwind.config.js` generates CSS variables for NativeWind classes.
- `constants/theme.ts` adapts those same colors into JS objects for React Native and React Navigation.

The palette is not duplicated; only the format changes for each tool.

### Light, Dark, and System Toggle

The toggle is in `components/theme-mode-toggle.tsx`.

It uses NativeWind's hook:

```tsx
const { colorScheme, setColorScheme } = useColorScheme();
```

And changes the mode like this:

```tsx
setColorScheme("system");
setColorScheme("light");
setColorScheme("dark");
```

For this to work, `tailwind.config.js` must have:

```js
darkMode: "class";
```

When the user chooses `Light` or `Dark`, NativeWind forces that mode. When the user chooses `System`, it follows the device or browser configuration again.

### i18n

The template is ready to handle languages with `i18next`, `react-i18next`, and `expo-localization`.

Run these installations:

```bash
npx expo install expo-localization
yarn add i18next react-i18next
```

If you prefer installing everything in a single command:

```bash
npx expo install expo-localization i18next react-i18next
```

The dictionaries live in:

- `i18n/locales/es.json`
- `i18n/locales/en.json`

The main configuration is in `i18n/index.ts`. That file:

- imports the dictionaries;
- detects the initial language with `expo-localization`;
- uses Spanish as the fallback language;
- registers `i18next` with `react-i18next`.

The `app/_layout.tsx` file imports `@/i18n` once to initialize i18n before rendering the app.

Usage inside components:

```tsx
import { useTranslation } from "react-i18next";

export function Example() {
  const { t } = useTranslation();

  return <ThemedText>{t("home.title")}</ThemedText>;
}
```

### Language Toggle

The selector is in `components/language-toggle.tsx`.

Internally it uses:

```tsx
const { i18n, t } = useTranslation();
```

And changes the language like this:

```tsx
i18n.changeLanguage("es");
i18n.changeLanguage("en");
```

For now it supports:

- `es`: Spanish.
- `en`: English.

Spanish texts keep their accents and language-specific characters.

### Add More Languages

To add another language, for example French:

1. Create an `i18n/locales/fr.json` file.
2. Copy the same keys from `es.json`.
3. Translate the values.
4. Import the new dictionary in `i18n/index.ts`.
5. Add it to `resources`.

Example:

```ts
import fr from "@/i18n/locales/fr.json";

export const resources = {
  es: { translation: es },
  en: { translation: en },
  fr: { translation: fr },
} as const;
```

Since `supportedLanguages` comes from `resources`, the toggle can automatically list the new language if you also add its UI labels, for example `language.fr`, to every dictionary.

The practical recommendation is to avoid writing direct text in screens. Create a key in each dictionary and consume that key with `t('key')`.

### Tabs

The tabs are defined in `app/(tabs)/_layout.tsx` with Expo Router:

```tsx
<Tabs.Screen name="index" />
<Tabs.Screen name="explore" />
```

Each file inside `app/(tabs)` represents a screen. For example:

- `app/(tabs)/index.tsx` is the Home screen.
- `app/(tabs)/explore.tsx` is the Explore screen.

The tab bar uses colors from `constants/theme.ts` because React Navigation expects direct colors in `style` objects, not NativeWind classes:

```tsx
tabBarStyle: {
  backgroundColor: palette.card,
  borderTopColor: palette.border,
}
```

### Styling with NativeWind

This is the recommended path for most visual styles:

```tsx
<ThemedView className="gap-4 rounded-lg border border-border bg-card p-4">
  <ThemedText className="text-muted">Content</ThemedText>
</ThemedView>
```

Use NativeWind for:

- Layout: `flex-1`, `flex-row`, `items-center`, `gap-4`.
- Spacing: `p-4`, `mt-2`, `px-3`.
- Color: `bg-background`, `text-text`, `border-border`.
- Typography: `text-xl`, `font-semibold`, `leading-6`.
- Borders: `rounded-lg`, `border`.
- Simple states with conditional classes.

`ThemedText` keeps useful variants:

```tsx
<ThemedText type="title">Title</ThemedText>
<ThemedText type="subtitle">Subtitle</ThemedText>
<ThemedText type="defaultSemiBold">Highlighted text</ThemedText>
<ThemedText type="link">Link</ThemedText>
```

Internally, those variants are also NativeWind classes. They help avoid repeating the same classes in many places.

### Styling with React Native `style`

`style` is still necessary and valid. It is useful when a value is dynamic, calculated, or when a library expects a style object.

Common examples:

```tsx
<IconSymbol
  color={palette.icon}
  style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
/>
```

```tsx
<Animated.View style={headerAnimatedStyle} />
```

Use `style` for:

- Animations with Reanimated.
- Dynamic transformations.
- Colors that an API requires as a prop, for example icons or React Navigation.
- Runtime-calculated measurements.
- Integration with libraries that do not accept `className`.

You can also combine both paths:

```tsx
<View
  className="rounded-lg bg-card p-4"
  style={{ opacity: isDisabled ? 0.5 : 1 }}
/>
```

The practical rule: use `className` for declarative and repeatable styles; use `style` for dynamic, animated, or native-API-required values.

### Images with NativeWind

`expo-image` does not receive `className` directly in every case. That is why this exists:

```tsx
import { NativeWindImage } from "@/components/nativewind-image";
```

Usage:

```tsx
<NativeWindImage
  source={require("@/assets/images/react-logo.png")}
  className="h-[100px] w-[100px] self-center"
/>
```

### Important Files

- `constants/palette.js`: single source of truth for light and dark colors.
- `constants/palette.d.ts`: TypeScript types for the JS palette.
- `constants/global.css`: Tailwind base layers.
- `tailwind.config.js`: content paths, NativeWind preset, CSS variables, and semantic colors.
- `app/_layout.tsx`: global React Navigation theme, `StatusBar`, and global CSS import.
- `app/(tabs)/_layout.tsx`: tab navigation.
- `components/theme-mode-toggle.tsx`: System/Light/Dark selector.
- `components/language-toggle.tsx`: Spanish/English selector.
- `i18n/index.ts`: i18next initialization.
- `i18n/locales/es.json`: Spanish dictionary.
- `i18n/locales/en.json`: English dictionary.
- `components/themed-text.tsx`: base text with variants.
- `components/themed-view.tsx`: base container with `bg-background`.
- `components/nativewind-image.ts`: `className` compatibility with `expo-image`.

### Verification

Useful commands:

```bash
npx tsc --noEmit
npm run lint
```

## Español

Plantilla base de React Native con Expo Router y NativeWind lista para trabajar con estilos por clases, modo claro/oscuro y una paleta centralizada desde `constants/palette.js`.

### Iniciar

Instala dependencias:

```bash
npm install
```

Levanta Expo:

```bash
npm run start
```

También puedes usar:

```bash
npm run android
npm run ios
npm run web
```

### Qué Trae Esta Plantilla

- Expo Router con tabs en `app/(tabs)`.
- NativeWind configurado con `tailwind.config.js`, `babel.config.js` y `metro.config.js`.
- Paleta semántica centralizada desde `constants/palette.js`.
- Soporte de tema claro, oscuro y sistema con `darkMode: "class"`.
- Toggle manual en `components/theme-mode-toggle.tsx`.
- i18n con diccionarios locales para español e inglés.
- Toggle manual de idioma en `components/language-toggle.tsx`.
- Componentes base `ThemedText` y `ThemedView` usando `className`.
- Wrapper `NativeWindImage` para usar `className` con `expo-image`.
- Ejemplos de estilos con NativeWind y con `style` nativo de React Native.

### Paleta Centralizada

La fuente única de colores vive en `constants/palette.js`:

```js
const palette = {
  light: {
    background: "#ffffff",
    text: "#1e293b",
    primary: "#3b82f6",
  },
  dark: {
    background: "#0f172a",
    text: "#f8fafc",
    primary: "#60a5fa",
  },
};
```

Desde ese archivo salen dos caminos:

- NativeWind recibe variables CSS generadas en `tailwind.config.js`.
- React Native y React Navigation reciben colores JS desde `constants/theme.ts`.

`constants/global.css` solo importa las capas de Tailwind:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Las variables `--color-*` se agregan con un plugin dentro de `tailwind.config.js`, usando los valores de `constants/palette.js`. Luego se consumen como clases semánticas:

```tsx
<View className="bg-background">
  <Text className="text-text">Texto principal</Text>
  <View className="bg-primary" />
</View>
```

Para agregar un color nuevo:

1. Agrégalo en `palette.light` y `palette.dark`.
2. Si quieres usarlo como clase de NativeWind, agrégalo también en `cssVariableNames`.
3. Si lo necesitas en APIs nativas, consúmelo desde `constants/theme.ts` o desde `palette`.

También puedes separar todo si prefieres menos automatización: definir variables manuales en `constants/global.css` para NativeWind y mantener `constants/theme.ts` por separado para React Native. Esa forma es más simple de leer al inicio, pero obliga a cambiar colores en dos lugares.

### Por Qué Hay Tema Para NativeWind y Tema Para React Native

NativeWind y React Native no consumen los estilos de la misma forma.

NativeWind trabaja con clases:

```tsx
<View className="bg-card border-border" />
```

React Navigation, íconos, `StatusBar` y algunas librerías nativas esperan valores JavaScript directos:

```tsx
tabBarActiveTintColor: palette.tint,
tabBarStyle: {
  backgroundColor: palette.card,
}
```

Por eso esta plantilla tiene una sola paleta, pero dos salidas:

- `tailwind.config.js` genera variables CSS para clases NativeWind.
- `constants/theme.ts` adapta esos mismos colores a objetos JS para React Native y React Navigation.

La paleta no está duplicada; lo que cambia es el formato que cada herramienta necesita.

### Toggle Claro, Oscuro y Sistema

El toggle está en `components/theme-mode-toggle.tsx`.

Usa el hook de NativeWind:

```tsx
const { colorScheme, setColorScheme } = useColorScheme();
```

Y cambia el modo así:

```tsx
setColorScheme("system");
setColorScheme("light");
setColorScheme("dark");
```

Para que esto funcione, `tailwind.config.js` debe tener:

```js
darkMode: "class";
```

Cuando el usuario elige `Claro` u `Oscuro`, NativeWind fuerza ese modo. Cuando elige `Sistema`, vuelve a seguir la configuración del dispositivo o navegador.

### i18n

La plantilla queda preparada para manejar idiomas con `i18next`, `react-i18next` y `expo-localization`.

Ejecuta estas instalaciones:

```bash
npx expo install expo-localization
yarn add i18next react-i18next
```

Si prefieres instalar todo en un solo comando:

```bash
npx expo install expo-localization i18next react-i18next
```

Los diccionarios viven en:

- `i18n/locales/es.json`
- `i18n/locales/en.json`

La configuración principal está en `i18n/index.ts`. Ese archivo:

- importa los diccionarios;
- detecta el idioma inicial con `expo-localization`;
- usa español como idioma de respaldo;
- registra `i18next` con `react-i18next`.

El archivo `app/_layout.tsx` importa `@/i18n` una sola vez para inicializar i18n antes de renderizar la app.

Uso dentro de componentes:

```tsx
import { useTranslation } from "react-i18next";

export function Example() {
  const { t } = useTranslation();

  return <ThemedText>{t("home.title")}</ThemedText>;
}
```

### Toggle de Idioma

El selector está en `components/language-toggle.tsx`.

Internamente usa:

```tsx
const { i18n, t } = useTranslation();
```

Y cambia el idioma así:

```tsx
i18n.changeLanguage("es");
i18n.changeLanguage("en");
```

Por ahora soporta:

- `es`: español.
- `en`: inglés.

Los textos en español mantienen tildes y caracteres propios del idioma.

### Agregar Más Idiomas

Para agregar otro idioma, por ejemplo francés:

1. Crea un archivo `i18n/locales/fr.json`.
2. Copia las mismas claves de `es.json`.
3. Traduce los valores.
4. Importa el nuevo diccionario en `i18n/index.ts`.
5. Agrégalo a `resources`.

Ejemplo:

```ts
import fr from "@/i18n/locales/fr.json";

export const resources = {
  es: { translation: es },
  en: { translation: en },
  fr: { translation: fr },
} as const;
```

Como `supportedLanguages` sale de `resources`, el toggle puede listar automáticamente el nuevo idioma si agregas también sus etiquetas de UI, por ejemplo `language.fr`, en todos los diccionarios.

La recomendación práctica es no escribir textos directos en las pantallas. Crea una clave en cada diccionario y consume esa clave con `t('clave')`.

### Tabs

Los tabs están definidos en `app/(tabs)/_layout.tsx` con Expo Router:

```tsx
<Tabs.Screen name="index" />
<Tabs.Screen name="explore" />
```

Cada archivo dentro de `app/(tabs)` representa una pantalla. Por ejemplo:

- `app/(tabs)/index.tsx` es la pantalla Home.
- `app/(tabs)/explore.tsx` es la pantalla Explore.

El tab bar usa colores desde `constants/theme.ts` porque React Navigation espera colores directos en objetos `style`, no clases de NativeWind:

```tsx
tabBarStyle: {
  backgroundColor: palette.card,
  borderTopColor: palette.border,
}
```

### Estilos con NativeWind

Esta es la vía recomendada para la mayoría de estilos visuales:

```tsx
<ThemedView className="gap-4 rounded-lg border border-border bg-card p-4">
  <ThemedText className="text-muted">Contenido</ThemedText>
</ThemedView>
```

Usa NativeWind para:

- Layout: `flex-1`, `flex-row`, `items-center`, `gap-4`.
- Espaciado: `p-4`, `mt-2`, `px-3`.
- Color: `bg-background`, `text-text`, `border-border`.
- Tipografía: `text-xl`, `font-semibold`, `leading-6`.
- Bordes: `rounded-lg`, `border`.
- Estados simples con clases condicionales.

`ThemedText` conserva variantes útiles:

```tsx
<ThemedText type="title">Título</ThemedText>
<ThemedText type="subtitle">Subtítulo</ThemedText>
<ThemedText type="defaultSemiBold">Texto destacado</ThemedText>
<ThemedText type="link">Link</ThemedText>
```

Internamente esas variantes también son clases NativeWind. Sirven para no repetir las mismas clases en muchos lugares.

### Estilos con `style` de React Native

`style` sigue siendo necesario y válido. Conviene usarlo cuando el valor es dinámico, calculado o cuando una librería espera un objeto de estilo.

Ejemplos comunes:

```tsx
<IconSymbol
  color={palette.icon}
  style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
/>
```

```tsx
<Animated.View style={headerAnimatedStyle} />
```

Usa `style` para:

- Animaciones con Reanimated.
- Transformaciones dinámicas.
- Colores que una API exige como prop, por ejemplo íconos o React Navigation.
- Medidas calculadas en tiempo de ejecución.
- Integración con librerías que no aceptan `className`.

También puedes combinar ambas vías:

```tsx
<View
  className="rounded-lg bg-card p-4"
  style={{ opacity: isDisabled ? 0.5 : 1 }}
/>
```

La regla práctica: usa `className` para estilos declarativos y repetibles; usa `style` para valores dinámicos, animados o requeridos por APIs nativas.

### Imágenes con NativeWind

`expo-image` no recibe `className` directamente en todos los casos. Por eso existe:

```tsx
import { NativeWindImage } from "@/components/nativewind-image";
```

Uso:

```tsx
<NativeWindImage
  source={require("@/assets/images/react-logo.png")}
  className="h-[100px] w-[100px] self-center"
/>
```

### Archivos Importantes

- `constants/palette.js`: fuente única de colores claros y oscuros.
- `constants/palette.d.ts`: tipos TypeScript para la paleta JS.
- `constants/global.css`: capas base de Tailwind.
- `tailwind.config.js`: rutas de contenido, preset de NativeWind, variables CSS y colores semánticos.
- `app/_layout.tsx`: tema global de React Navigation, `StatusBar` e import del CSS global.
- `app/(tabs)/_layout.tsx`: navegación por tabs.
- `components/theme-mode-toggle.tsx`: selector Sistema/Claro/Oscuro.
- `components/language-toggle.tsx`: selector Español/Inglés.
- `i18n/index.ts`: inicialización de i18next.
- `i18n/locales/es.json`: diccionario en español.
- `i18n/locales/en.json`: diccionario en inglés.
- `components/themed-text.tsx`: texto base con variantes.
- `components/themed-view.tsx`: contenedor base con `bg-background`.
- `components/nativewind-image.ts`: compatibilidad de `className` con `expo-image`.

### Verificación

Comandos útiles:

```bash
npx tsc --noEmit
npm run lint
```
