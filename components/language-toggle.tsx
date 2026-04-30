import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { supportedLanguages, type Language } from '@/i18n';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language) as Language;

  return (
    <View className="gap-3 rounded-lg border border-border bg-card p-3">
      <View>
        <ThemedText type="defaultSemiBold">{t('language.title')}</ThemedText>
        <ThemedText className="text-sm text-muted">{t('language.current')}</ThemedText>
      </View>

      <View className="flex-row rounded-md bg-surface p-1">
        {supportedLanguages.map((option) => {
          const isSelected = currentLanguage === option;

          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={[
                'min-h-10 flex-1 items-center justify-center rounded px-3',
                isSelected ? 'bg-primary' : 'bg-transparent',
              ].join(' ')}
              onPress={() => i18n.changeLanguage(option)}>
              <ThemedText
                className={[
                  'text-center text-sm font-semibold',
                  isSelected ? 'text-primary-foreground' : 'text-muted',
                ].join(' ')}>
                {t(`language.${option}`)}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
