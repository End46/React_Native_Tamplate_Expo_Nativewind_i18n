export type ColorSchemeName = 'light' | 'dark';

export type PaletteColorName =
  | 'background'
  | 'surface'
  | 'card'
  | 'text'
  | 'muted'
  | 'border'
  | 'primary'
  | 'primaryForeground'
  | 'accent'
  | 'header'
  | 'icon';

export declare const palette: Record<ColorSchemeName, Record<PaletteColorName, string>>;

export declare const cssVariableNames: Record<
  Exclude<PaletteColorName, 'icon'>,
  string
>;
