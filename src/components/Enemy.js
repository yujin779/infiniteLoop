import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "react-three-fiber";
import { useBox } from "use-cannon";
import littleCactus from "../assets/gltf/littleCactus.glb";
import bigCactus from "../assets/gltf/bigCactus.glb";
import { useGLTF } from "@react-three/drei";

// gltfの配列
const EnemisesObj = [littleCactus, bigCactus];

const TypesOfEnemies = [
  {
    // gltf
    obj: {
      name: "littleCactus",
      gltfNum: 0,
      // 位置修正
      position: { x: -2.6, y: -0.7, z: 0 },
      rotation: { x: 1.5 },
    },
    // 当たり判定ボックス
    colider: {
      args: [1.4, 1, 1],
      position: { y: -0.1 },
    },
  },
  {
    obj: {
      name: "bigCactus",
      gltfNum: 1,
      position: { x: -2.6, y: -1, z: 0 },
      rotation: { x: 1.5 },
    },
    colider: {
      args: [1.4, 1, 1],
      position: { y: -0.1 },
    },
  },
];

const EnemyColider = ({ value, index }) => {
  // 物理演算させるボックスのサイズ
  const args = value.type.colider.args;
  const physicsBox = {
    type: "Static",
    fixedRotation: true,
    mass: 1,
    args: args,
    position: [value.positionX, value.type.colider.position.y, 0],
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

/**
 * サボテンの位置データ
 * @param number 作成する個数
 * @param startX 最初に作成されるx座標
 * @param distance サボテンとサボテンの距離
 */
export const createEnemysList = (number, startX, distance) => {
  const enemysList = [];
  for (let i = 0; i < number; i++) {
    let p = startX;
    if (i !== 0) p = enemysList[i - 1].positionX + distance;

    enemysList.push({
      positionX: p,
      type: TypesOfEnemies[Math.floor(Math.random() * 2)],
    });
  }
  return enemysList;
};

/**
 * サボテン
 */
const EnemyObj = ({ value }) => {
  const { nodes } = useGLTF(EnemisesObj[value.type.obj.gltfNum]);
  const ref = useRef();
  useFrame(() => {
    ref.current.position.x = value.positionX + value.type.obj.position.x;
    ref.current.rotation.x = value.type.obj.rotation.x;
    ref.current.position.y = value.type.obj.position.y;
    ref.current.position.z = value.type.obj.position.z;
  });
  return (
    <group>
      <mesh
        ref={ref}
        material={nodes.ObjObject.material}
        geometry={nodes.ObjObject.geometry}
      />
    </group>
  );
};

/*
 * 各サボテンのデータ作成
 */
export const EnemyData = ({
  number = 10,
  returnX = -15,
  startX = 10,
  distance = 3,
  speed = 0.04,
}) => {
  const [groupA] = useState(createEnemysList(number, startX, distance));
  useFrame(() => {
    groupA.map((p) => {
      if (p.positionX < returnX) {
        p.positionX =
          Math.max.apply(
            null,
            groupA.map((o) => o.positionX)
          ) + distance;
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
