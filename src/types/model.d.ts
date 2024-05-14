// 定义一个新的接口，扩展 Object3D 类型
export interface ExtendedObject3D extends THREE.Object3D {
  idleStartPosition?: { x: number; z: number }
  wireframeAt?: number
  originalMaterial?: Material
}

export interface CharacterModel {
  shirtMaterial: Material
  skinMaterial: Material
  pantsMaterial: Material
  whiteMaterial: Material
  bakedMaterial: Material
  wireframeMaterial?: Material
}

export interface Actions {
  [key: string]: any
}
