// App.js
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { useStore } from "./Global";
import styles from "./styles";

import Floor from "./components/Floor";
import Player from "./components/Player";
import { EnemyData } from "./components/Enemy";

/*
 * 1. 表示される入り口
 */
const App = () => {
  const tapTrue = useStore((state) => state.tapTrue);
  return (
    <View style={styles.app}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          near: 0.1,
          far: 500
        }}
        onClick={(e) => {
          tapTrue();
        }}
        // onCreated={({ camera }) => {
        //   console.log(camera);
        //   camera.lookAt(900, 90, 0);
        //   // camera.updateProjectionMatrix();
        // }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls />
        <Physics
          gravity={[0, -30, 0]}
          defaultContactMaterial={{ restitution: 0 }}
        >
          <Player />
          <EnemyData number={10} />
          <Floor position={[0, -1, 0]} args={[1500, 0.5, 3]} />
        </Physics>
      </Canvas>
    </View>
  );
};
export default App;
