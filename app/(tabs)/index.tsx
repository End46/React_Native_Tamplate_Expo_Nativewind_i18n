import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

import { HelloWave } from '@/components/hello-wave';
import { LanguageToggle } from '@/components/language-toggle';
import { NativeWindImage } from '@/components/nativewind-image';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      headerImage={
        <NativeWindImage
          source={require('@/assets/images/partial-react-logo.png')}
          className="absolute bottom-0 left-0 h-[178px] w-[290px]"
        />
      }>
      <ThemedView className="flex-row items-center gap-2">
        <ThemedText type="title">{t('home.title')}</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemeModeToggle />
      <LanguageToggle />

      <ThemedView className="gap-2 rounded-lg border border-border bg-card p-4">
        <ThemedText type="subtitle">{t('home.paletteTitle')}</ThemedText>
        <ThemedText className="text-muted">
          {t('home.paletteDescription')}{' '}
          <ThemedText type="defaultSemiBold">bg-background</ThemedText>,{' '}
          <ThemedText type="defaultSemiBold">text-text</ThemedText> {t('common.and')}{' '}
          <ThemedText type="defaultSemiBold">bg-primary</ThemedText>.
        </ThemedText>
        <ThemedView className="mt-1 flex-row gap-2 bg-transparent">
          <ThemedView className="h-10 flex-1 rounded bg-primary" />
          <ThemedView className="h-10 flex-1 rounded bg-accent" />
          <ThemedView className="h-10 flex-1 rounded border border-border bg-surface" />
        </ThemedView>
      </ThemedView>

      <ThemedView className="gap-2">
        <ThemedText type="subtitle">{t('home.tryTitle')}</ThemedText>
        <ThemedText>
          {t('home.tryPrefix')}{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
          {t('home.tryMiddle')}{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          {t('home.trySuffix')}
        </ThemedText>
      </ThemedView>

      <ThemedView className="gap-2">
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">{t('home.exploreTitle')}</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title={t('home.menuAction')}
              icon="cube"
              onPress={() => alert(t('home.menuAction'))}
            />
            <Link.MenuAction
              title={t('home.menuShare')}
              icon="square.and.arrow.up"
              onPress={() => alert(t('home.menuShare'))}
            />
            <Link.Menu title={t('home.menuMore')} icon="ellipsis">
              <Link.MenuAction
                title={t('home.menuDelete')}
                icon="trash"
                destructive
                onPress={() => alert(t('home.menuDelete'))}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>{t('home.exploreDescription')}</ThemedText>
      </ThemedView>

      <ThemedView className="gap-2">
        <ThemedText type="subtitle">{t('home.cleanTitle')}</ThemedText>
        <ThemedText>
          {t('home.cleanPrefix')}{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{' '}
          {t('home.cleanMiddle')} <ThemedText type="defaultSemiBold">app</ThemedText>.{' '}
          {t('home.cleanSuffix')}{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
