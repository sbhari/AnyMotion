import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

import {Logo} from '@assets';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ANIMATION_DELAY = 600;
const ANIMATION_DURATION = 600;
const SCREEN_TOLERANCE = 50;
const SCREEN_DIAGONAL =
  Math.sqrt(Math.pow(screenHeight, 2) + Math.pow(screenWidth, 2)) +
  SCREEN_TOLERANCE;

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

const circleRadius = 1;

const SplashScreen = () => {
  const rxEllipseAnimation = useSharedValue(0);
  const ryEllipseAnimation = useSharedValue(0);
  const logoOpacityAnimation = useSharedValue(0);

  useEffect(() => {
    ryEllipseAnimation.value = withSequence(
      withDelay(
        ANIMATION_DELAY,
        withTiming(circleRadius, {
          duration: ANIMATION_DURATION / 2,
        }),
      ),
      withDelay(
        ANIMATION_DELAY / 2,
        withTiming(0, {
          duration: ANIMATION_DURATION / 3,
        }),
      ),
      withTiming(circleRadius, {
        duration: ANIMATION_DURATION / 2,
      }),
    );
    rxEllipseAnimation.value = withDelay(
      ANIMATION_DELAY,
      withTiming(circleRadius, {
        duration: ANIMATION_DURATION / 2,
      }),
    );
    logoOpacityAnimation.value = withDelay(
      ANIMATION_DELAY * 2.5,
      withSequence(
        withTiming(1, {duration: ANIMATION_DURATION / 2}),
        withDelay(
          ANIMATION_DELAY * 2,
          withTiming(0, {duration: ANIMATION_DURATION}, () =>
            console.log('animation Completed'),
          ),
        ),
      ),
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacityAnimation.value,
  }));

  const animatedProps = useAnimatedProps(() => ({
    rx: rxEllipseAnimation.value,
    ry: ryEllipseAnimation.value,
  }));

  return (
    <View style={[StyleSheet.absoluteFill, , styles.container]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <Svg
        height={SCREEN_DIAGONAL}
        width={SCREEN_DIAGONAL}
        viewBox={`0 0 ${circleRadius * 2} ${circleRadius * 2}`}
        style={{backgroundColor: '#0000FF'}}>
        <AnimatedEllipse
          cx={circleRadius}
          cy={circleRadius}
          animatedProps={animatedProps}
          fill={'#F3F5F8'}
        />
      </Svg>
      <Animated.View style={[styles.logo, logoStyle]}>
        <Logo width={194} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
  },
});

export default SplashScreen;
