import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const typeClasses = {
  default: 'text-base leading-6 text-text',
  defaultSemiBold: 'text-base font-semibold leading-6 text-text',
  title: 'text-3xl font-bold leading-9 text-text',
  subtitle: 'text-xl font-bold text-text',
  link: 'text-base leading-7 text-primary',
};

export function ThemedText({
  className,
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={[typeClasses[type], className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    />
  );
}
