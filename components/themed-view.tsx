import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({ className, style, ...otherProps }: ThemedViewProps) {
  return (
    <View
      className={['bg-background', className].filter(Boolean).join(' ')}
      style={style}
      {...otherProps}
    />
  );
}
