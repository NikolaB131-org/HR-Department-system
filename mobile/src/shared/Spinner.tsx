import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';

import SpinnerSvg from '../assets/spinner.svg';

type Props = {
  style?: object;
};

function Spinner({ style }: Props) {
  const animationValue = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(animationValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 700,
      easing: Easing.linear,
    }),
  ).start();

  const rotateValue = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate: rotateValue }] }, style]}>
      <SpinnerSvg width={120} height={120} />
    </Animated.View>
  );
}

export default Spinner;
