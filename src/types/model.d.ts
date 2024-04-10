export interface directionalLightType {
  color: any;
  intensity: any;
  position: {
    x: number;
    y: number;
    z: number;
  };
  castShadow: any;
  shadow: {
    camera: {
      near: number;
      far: number;
      right: number;
      left: number;
      top: number;
      bottom: number;
      width: number;
      height: number;
      radius: number;
      bias: number;
    };
  };
}

// 定义一个新的接口，扩展 Object3D 类型
export interface ExtendedObject3D extends THREE.Object3D {
  idleStartPosition?: { x: number; z: number };
}