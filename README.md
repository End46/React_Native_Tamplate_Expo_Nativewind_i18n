# Expo + NativeWind

Plantilla base de React Native con Expo Router y NativeWind lista para trabajar con estilos por clases, modo claro/oscuro y una paleta centralizada desde `constants/palette.js`.

## Iniciar

Instala dependencias:

```bash
npm install
```

Levanta Expo:

```bash
npm run start
```

Tambien puedes usar:

```bash
npm run android
npm run ios
npm run web
```

## Que trae esta plantilla

- Expo Router con tabs en `app/(tabs)`.
- NativeWind configurado con `tailwind.config.js`, `babel.config.js` y `metro.config.js`.
- Paleta semantica centralizada desde `constants/palette.js`.
- Soporte de tema claro, oscuro y sistema con `darkMode: "class"`.
- Toggle manual en `components/theme-mode-toggle.tsx`.
- i18n con diccionarios locales para español e inglés.
- Toggle manual de idioma en `components/language-toggle.tsx`.
- Componentes base `ThemedText` y `ThemedView` usando `className`.
- Wrapper `NativeWindImage` para usar `className` con `expo-image`.
- Ejemplos de estilos con NativeWind y con `style` nativo de React Native.

## Paleta centralizada

La fuente unica de colores vive en `constants/palette.js`:

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

Las variables `--color-*` se agregan con un plugin dentro de `tailwind.config.js`, usando los valores de `constants/palette.js`. Luego se consumen como clases semanticas:

```tsx
<View className="bg-background">
  <Text className="text-text">Texto principal</Text>
  <View className="bg-primary" />
</View>
```

Para agregar un color nuevo:

1. Agregalo en `palette.light` y `palette.dark`.
2. Si quieres usarlo como clase de NativeWind, agregalo tambien en `cssVariableNames`.
3. Si lo necesitas en APIs nativas, consumelo desde `constants/theme.ts` o desde `palette`.

Tambien puedes separar todo si prefieres menos automatizacion: definir variables manuales en `constants/global.css` para NativeWind y mantener `constants/theme.ts` por separado para React Native. Esa forma es mas simple de leer al inicio, pero obliga a cambiar colores en dos lugares.

## Por que hay tema para NativeWind y tema para React Native

NativeWind y React Native no consumen los estilos de la misma forma.

NativeWind trabaja con clases:

```tsx
<View className="bg-card border-border" />
```

React Navigation, iconos, `StatusBar` y algunas librerias nativas esperan valores JavaScript directos:

```tsx
tabBarActiveTintColor: palette.tint,
tabBarStyle: {
  backgroundColor: palette.card,
}
```

Por eso esta plantilla tiene una sola paleta, pero dos salidas:

- `tailwind.config.js` genera variables CSS para clases NativeWind.
- `constants/theme.ts` adapta esos mismos colores a objetos JS para React Native y React Navigation.

La paleta no esta duplicada; lo que cambia es el formato que cada herramienta necesita.

## Toggle claro, oscuro y sistema

El toggle esta en `components/theme-mode-toggle.tsx`.

Usa el hook de NativeWind:

```tsx
const { colorScheme, setColorScheme } = useColorScheme();
```

Y cambia el modo asi:

```tsx
setColorScheme("system");
setColorScheme("light");
setColorScheme("dark");
```

Para que esto funcione, `tailwind.config.js` debe tener:

```js
darkMode: "class";
```

Cuando el usuario elige `Claro` u `Oscuro`, NativeWind fuerza ese modo. Cuando elige `Sistema`, vuelve a seguir la configuracion del dispositivo o navegador.

## i18n

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

## Toggle de idioma

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

## Agregar más idiomas

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

## Tabs

Los tabs estan definidos en `app/(tabs)/_layout.tsx` con Expo Router:

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

## Estilos con NativeWind

Esta es la via recomendada para la mayoria de estilos visuales:

```tsx
<ThemedView className="gap-4 rounded-lg border border-border bg-card p-4">
  <ThemedText className="text-muted">Contenido</ThemedText>
</ThemedView>
```

Usa NativeWind para:

- Layout: `flex-1`, `flex-row`, `items-center`, `gap-4`.
- Espaciado: `p-4`, `mt-2`, `px-3`.
- Color: `bg-background`, `text-text`, `border-border`.
- Tipografia: `text-xl`, `font-semibold`, `leading-6`.
- Bordes: `rounded-lg`, `border`.
- Estados simples con clases condicionales.

`ThemedText` conserva variantes utiles:

```tsx
<ThemedText type="title">Titulo</ThemedText>
<ThemedText type="subtitle">Subtitulo</ThemedText>
<ThemedText type="defaultSemiBold">Texto destacado</ThemedText>
<ThemedText type="link">Link</ThemedText>
```

Internamente esas variantes tambien son clases NativeWind. Sirven para no repetir las mismas clases en muchos lugares.

## Estilos con `style` de React Native

`style` sigue siendo necesario y valido. Conviene usarlo cuando el valor es dinamico, calculado o cuando una libreria espera un objeto de estilo.

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
- Transformaciones dinamicas.
- Colores que una API exige como prop, por ejemplo iconos o React Navigation.
- Medidas calculadas en tiempo de ejecucion.
- Integracion con librerias que no aceptan `className`.

Tambien puedes combinar ambas vias:

```tsx
<View
  className="rounded-lg bg-card p-4"
  style={{ opacity: isDisabled ? 0.5 : 1 }}
/>
```

La regla practica: usa `className` para estilos declarativos y repetibles; usa `style` para valores dinamicos, animados o requeridos por APIs nativas.

## Imagenes con NativeWind

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

## Archivos importantes

- `constants/palette.js`: fuente unica de colores claros y oscuros.
- `constants/palette.d.ts`: tipos TypeScript para la paleta JS.
- `constants/global.css`: capas base de Tailwind.
- `tailwind.config.js`: rutas de contenido, preset de NativeWind, variables CSS y colores semanticos.
- `app/_layout.tsx`: tema global de React Navigation, `StatusBar` e import del CSS global.
- `app/(tabs)/_layout.tsx`: navegacion por tabs.
- `components/theme-mode-toggle.tsx`: selector Sistema/Claro/Oscuro.
- `components/language-toggle.tsx`: selector Español/Inglés.
- `i18n/index.ts`: inicialización de i18next.
- `i18n/locales/es.json`: diccionario en español.
- `i18n/locales/en.json`: diccionario en inglés.
- `components/themed-text.tsx`: texto base con variantes.
- `components/themed-view.tsx`: contenedor base con `bg-background`.
- `components/nativewind-image.ts`: compatibilidad de `className` con `expo-image`.

## Verificacion

Comandos utiles:

```bash
npx tsc --noEmit
npm run lint
```
