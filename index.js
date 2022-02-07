import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
const LiquidProgress = ({
  frontWaveColor,
  backgroundColor,
  size,
  fill,
  children,
}) => {
  const SIZE = size;
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const progress = useRef(new Animated.Value(0)).current;
  const fillAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 2,
        duration: 5000,
        useNativeDriver: true,
      }),
      {
        resetBeforeIteration: true,
      }
    ).start();
  }, []);

  useEffect(() => {
    Animated.spring(fillAnim, {
      toValue: fill,
      useNativeDriver: true,
      tension: 20,
    }).start();
  }, [fill]);

  const px = (number) => {
    return number;
  };
  const ProgressBar = () => {
    return (
      <View
        style={{
          position: "absolute",
          width: SIZE,
          height: SIZE,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          zIndex: px(20),
          right: SIZE / 1.17,
        }}
      >
        {children}
      </View>
    );
  };
  return (
    <View
      style={{
        width: SIZE,
        height: SIZE,
      }}
    >
      <ProgressBar />
      <MaskedView
        maskElement={
          <View
            style={{
              backgroundColor: "black",
              width: px(SIZE),
              height: px(SIZE),
            }}
          />
        }
      >
        <View
          style={{
            backgroundColor,
            width: px(SIZE),
            height: px(SIZE),
          }}
        >
          <Animated.View
            style={{
              opacity: fill == 0 ? 0 : 1,
              transform: [
                {
                  translateY: fillAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [SIZE / 2, -SIZE / 2],
                  }),
                },
              ],
            }}
          >
            <AnimatedSvg
              width={px(SIZE * 3)}
              height={px(SIZE)}
              style={{
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: [0, (px(-600) * SIZE) / 280, px(0)],
                      extrapolate: "clamp",
                    }),
                  },
                  { scale: 1.2 },
                ],
                backgroundColor: "transparent",
                position: "absolute",
              }}
              viewBox={`0 0 560 20`}
            >
              <Path
                d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
                fill={frontWaveColor}
              ></Path>
              <Path
                d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
                fill={frontWaveColor}
              ></Path>
              <Path
                d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
                fill={frontWaveColor}
              ></Path>
              <Path
                d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
                fill={frontWaveColor}
              ></Path>
            </AnimatedSvg>
            <AnimatedSvg
              width={px(SIZE * 3)}
              height={px(SIZE * 2)}
              style={{
                transform: [
                  { translateY: (SIZE / 280) * px(-110) },
                  { scale: 1 },
                ],
                backgroundColor: "transparent",
                position: "absolute",
              }}
              viewBox={`0 0 560 20`}
            >
              <Rect width={`180%`} height={`180%`} fill={frontWaveColor} />
            </AnimatedSvg>
          </Animated.View>
        </View>
      </MaskedView>
    </View>
  );
};

LiquidProgress.propTypes = {
  backWaveColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.element,
  fill: PropTypes.number,
  frontWaveColor: PropTypes.string,
  size: PropTypes.number,
};

export default LiquidProgress;
