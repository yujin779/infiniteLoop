import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
// import { createGlobalState } from "react-hooks-global-state";

/*
 * 1. 表示される入り口
 */
const Floor = ({ position, args, color }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    mass: 0,
    args: args,
    position: position,
    name: "floor"
  }));
  return (
    <mesh ref={ref} name="floor">
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={"hotpink"} />
    </mesh>
  );
};
export default Floor;
