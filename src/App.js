import React, { useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default function App() {
  const animated = new Animated.Value(0);
  const duration = 5000;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animated, {
          toValue: 400,
          duration: duration,
          useNativeDriver: true
        }),
        Animated.timing(animated, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true
        })
      ])
    ).start();
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
        <View style={styles.circle} />
      </Animated.View>
      <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
        <View style={styles.circle2} />
      </Animated.View>
      <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
        <View style={styles.circle3} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
    alignItems: "baseline",
    justifyContent: "center"
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    backgroundColor: "#d9d8d6",
    margin: 40
  },
  circle2: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    backgroundColor: "#53b3d3",
    margin: 40
  },
  circle3: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    backgroundColor: "#3a82aa",
    margin: 40
  }
});
