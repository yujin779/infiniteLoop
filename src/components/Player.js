import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
// import * as CANNON from "cannon";
// import { createGlobalState } from "react-hooks-global-state";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useGlobalState } from "../Global";
import { useStore } from "../Global";
import { useLoader } from "react-three-fiber";
import dino from "../assets/gltf/dino.glb";

/*
 * タップするとジャンプするプレイヤー
 */
const Player = () => {
  const args = [1, 2.5, 1];
  const gltf = useLoader(GLTFLoader, dino);
  // console.log(gltf);
  const tapFalse = useStore((state) => state.tapFalse);
  const tap = useStore((state) => state.tap);

  const [landing, setLanding] = useState(false);
  const [ref, api] = useBox(() => ({
    // type: "Static",
    fixedRotation: true,
    mass: 1,
    args: args,
    position: [0, 3, 0],
    onCollide: (obj) => {
      if (obj.body.name === "floor") setLanding(true);
      if (obj.body.name === "enemy") {
        console.log("gameover");
      }
    }
  }));
  useFrame((state) => {
    if (tap && landing) {
      api.applyImpulse([0, 20, 0], [0, 0, 0]);
      tapFalse();
      setLanding(false);
    }
  });
  return (
    <group ref={ref}>
      <mesh name="player">
        <boxBufferGeometry attach="geometry" args={args} />
        <meshStandardMaterial
          attach="material"
          color={"orange"}
          transparent
          opacity={0.3}
        />
      </mesh>
      <primitive object={gltf.scene} position={[-0.4, -1, 0]} />
    </group>
  );
};
export default Player;
