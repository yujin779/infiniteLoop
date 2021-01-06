import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader
} from "react-three-fiber";
// import * as CANNON from "cannon";
// import { createGlobalState } from "react-hooks-global-state";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { useStore } from "../Global";
import { BoxBufferGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import littleCactus from "../assets/gltf/littleCactus.glb";
import bigCactus from "../assets/gltf/bigCactus.glb";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

const speed = 0.04;

const EnemisesObj = [littleCactus, bigCactus];

const TypesOfEnemies = [
  {
    obj: {
      name: "littleCactus",
      gltfNum: 0,
      position: { x: -2.6, y: -0.7 },
      rotation: { x: 1.5 }
    },
    colider: {
      args: [1.4, 1, 1],
      position: { y: -0.1 }
    }
  },
  {
    obj: {
      name: "bigCactus",
      gltfNum: 1,
      position: { x: -2.6, y: -0.7 },
      rotation: { x: 1.5 }
    },
    colider: {
      args: [1.4, 1, 1],
      position: { y: -0.1 }
    }
  }
];

const EnemyColider = ({ value, index }) => {
  // 物理演算させるボックスのサイズ
  const args = value.type.colider.args;
  const physicsBox = {
    type: "Static",
    fixedRotation: true,
    mass: 1,
    args: args,
    position: [value.positionX, value.type.colider.position.y, 0]
  };
  const [ref, api] = useBox(() => physicsBox);
  useFrame(() => {
    //ポジション修正要
    api.position.set(value.positionX, value.type.colider.position.y, 0);
  });
  return (
    <mesh ref={ref} key={index}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial
        attach="material"
        color={"orange"}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

export const createEnemysList = (number, startX, distance) => {
  const enemysList = [];
  for (let i = 0; i < number; i++) {
    let p = startX;
    console.log("sttx", p);
    if (i !== 0) p = enemysList[i - 1].positionX + distance;

    enemysList.push({ positionX: p, type: TypesOfEnemies[0] });
  }
  console.log("enemysList", enemysList);
  return enemysList;
};

const EnemyObj = ({ value, index }) => {
  // const [, setObj] = useState(nodes);
  const { nodes } = useGLTF(EnemisesObj[value.type.obj.gltfNum]);
  const [obj, setObj] = useState(nodes);
  console.log(obj);
  const ref = useRef();
  useFrame(() => {
    ref.current.position.x = value.positionX + value.type.obj.position.x;
    ref.current.rotation.x = value.type.obj.rotation.x;
    ref.current.position.y = value.type.obj.position.y;
  });
  return (
    <group>
      <mesh
        ref={ref}
        material={obj.ObjObject.material}
        geometry={obj.ObjObject.geometry}
      />
    </group>
  );
};

/*
 * 接触するとgameover
 */
export const EnemyData = ({ number = 10 }) => {
  // この値になったら位置を再設定
  const returnX = 0;
  const startX = 10;
  const distance = 3;
  const [groupA] = useState(createEnemysList(number, startX, distance));
  const [indexx, setIndexx] = useState("a");
  console.log("TypesOfEnemies[0]", TypesOfEnemies[0]);
  console.log("TypesOfEnemies[1]", TypesOfEnemies[1]);
  // setIndexx("b");
  // console.log(indexx);
  useFrame(() => {
    groupA.map((p) => {
      if (p.positionX < returnX) {
        p.positionX =
          Math.max.apply(
            null,
            groupA.map((o) => o.positionX)
          ) + distance;
        // { positionX: p, type: TypesOfEnemies[0] }
        p.type = TypesOfEnemies[1];
        // setIndexx("b");
      }
      return (p.positionX -= speed);
    });
  });

  return (
    <group>
      {groupA.map((value, index) => (
        <EnemyColider value={value} key={index} />
      ))}
      {groupA.map((value, index) => (
        <EnemyObj value={value} key={index} />
      ))}
    </group>
  );
};
