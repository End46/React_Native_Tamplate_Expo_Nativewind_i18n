import { Pressable, View } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ThemeMode = 'system' | 'light' | 'dark';

const options: ThemeMode[] = ['system', 'light', 'dark'];

export function ThemeModeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { t } = useTranslation();
  const [selectedMode, setSelectedMode] = useState<ThemeMode>('system');

  function selectMode(mode: ThemeMode) {
    setSelectedMode(mode);
    setColorScheme(mode);
  }

  return (
    <View className="gap-3 rounded-lg border border-border bg-card p-3">
      <View>
        <ThemedText type="defaultSemiBold">{t('theme.title')}</ThemedText>
        <ThemedText className="text-sm text-muted">
          {t('theme.current')}: {t(`theme.${colorScheme ?? 'system'}`)}
        </ThemedText>
      </View>

      <View className="flex-row rounded-md bg-surface p-1">
        {options.map((option) => {
          const isSelected = selectedMode === option;

          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={[
                'min-h-10 flex-1 items-center justify-center rounded px-3',
                isSelected ? 'bg-primary' : 'bg-transparent',
              ].join(' ')}
              onPress={() => selectMode(option)}>
              <ThemedText
                className={[
                  'text-center text-sm font-semibold',
                  isSelected ? 'text-primary-foreground' : 'text-muted',
                ].join(' ')}>
                {t(`theme.${option}`)}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
