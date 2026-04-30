import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import { NativeWindImage } from '@/components/nativewind-image';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const headerIconStyle = {
  bottom: -90,
  left: -35,
  position: 'absolute' as const,
};

export default function TabTwoScreen() {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const scheme = colorScheme ?? 'light';

  return (
    <ParallaxScrollView
      headerImage={
        <IconSymbol
          size={310}
          color={Colors[scheme].icon}
          name="chevron.left.forwardslash.chevron.right"
          style={headerIconStyle}
        />
      }>
      <ThemedView className="flex-row gap-2">
        <ThemedText type="title">{t('explore.title')}</ThemedText>
      </ThemedView>

      <ThemedText className="text-muted">{t('explore.description')}</ThemedText>

      <Collapsible title={t('explore.routingTitle')}>
        <ThemedText>
          {t('explore.routingScreens')}{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
          {t('common.and')}{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          {t('explore.routingLayout')}{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          {t('explore.routingLayoutSuffix')}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{t('common.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.platformTitle')}>
        <ThemedText>
          {t('explore.platformDescription')}{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText>{' '}
          {t('explore.platformDescriptionSuffix')}
        </ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.imagesTitle')}>
        <ThemedText>
          {t('explore.imagesDescriptionPrefix')}{' '}
          <ThemedText type="defaultSemiBold">@2x</ThemedText> {t('common.and')}{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText>{' '}
          {t('explore.imagesDescriptionSuffix')}
        </ThemedText>
        <NativeWindImage
          source={require('@/assets/images/react-logo.png')}
          className="h-[100px] w-[100px] self-center"
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{t('common.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.themeTitle')}>
        <ThemedText>
          {t('explore.themeDescription')}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{t('common.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.i18nTitle')}>
        <ThemedText>{t('explore.i18nDescription')}</ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.animationsTitle')}>
        <ThemedText>
          {t('explore.animationsDescriptionPrefix')}{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText>{' '}
          {t('explore.animationsDescriptionMiddle')}{' '}
          <ThemedText type="defaultSemiBold" className="font-mono">
            react-native-reanimated
          </ThemedText>{' '}
          {t('explore.animationsDescriptionSuffix')}
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              {t('explore.iosParallaxPrefix')}{' '}
              <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              {t('explore.iosParallaxSuffix')}
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}
