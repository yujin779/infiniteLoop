import React from "react";
import { View } from "react-native";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "use-cannon";
import styles from "./styles";
// 床
import Floor from "./components/Floor";
// サボテンたち
import { EnemyData } from "./components/Enemy";

/*
 * 表示される入り口
 */
const App = () => {
  return (
    <View style={styles.app}>
      <Canvas
        shadowMap
        camera={{
          position: [0, 2, 10],
          near: 0.1,
          far: 50,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[-20, 30, 30]} intensity={0.4} castShadow />
        <OrbitControls />
        <Physics
          gravity={[0, -30, 0]}
          defaultContactMaterial={{ restitution: 0 }}
        >
          {/* 横に移動するサボテンたち */}
          <EnemyData number={10} />
          {/* 床 */}
          <Floor position={[0, -1, 0]} args={[100, 0.5, 100]} />
        </Physics>
      </Canvas>
    </View>
  );
};
export default App;
