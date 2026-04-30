import Animated from 'react-native-reanimated';

const waveAnimationStyle = {
  fontSize: 28,
  lineHeight: 32,
  marginTop: -6,
  animationName: {
    '50%': { transform: [{ rotate: '25deg' }] },
  },
  animationIterationCount: 4,
  animationDuration: '300ms',
};

export function HelloWave() {
  return <Animated.Text style={waveAnimationStyle}>👋</Animated.Text>;
}
