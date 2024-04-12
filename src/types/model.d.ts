// 定义一个新的接口，扩展 Object3D 类型
export interface ExtendedObject3D extends THREE.Object3D {
  idleStartPosition?: { x: number; z: number };
}