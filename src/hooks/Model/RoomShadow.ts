import { Scene, ShaderMaterial } from "three"
import { Hc, Uc } from '@/data/Model'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const RoomShadowFun = async (
  THREE: typeof import("three"),
  scene: Scene,
  gltfLoader: GLTFLoader,
  resources: Record<string, string>,
) => {
  const model = await gltfLoader.loadAsync(resources.roomShadowModel)
  const roomShadowModel = model.scene
  if (!roomShadowModel) return
  // 纹理
  const shadowTexture = new THREE.TextureLoader().load(resources.bakedShadowRoomTexture)
  shadowTexture.colorSpace = THREE.SRGBColorSpace;
  shadowTexture.flipY = false

  // 材质
  const material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      alphaMask: {
        value: shadowTexture
      },
      uColor: {
        value: new THREE.Color("#c4a37e")
      },
      uOpacity: {
        value: 1
      }
    },
    vertexShader: Hc, // 顶点着色器
    fragmentShader: Uc, // 片元着色器
  });

  roomShadowModel.traverse((child) => {
    if (child.name === "shadowCatcher") {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    }
  })

  return {
    roomShadowModel,
    material
  }
}

export default RoomShadowFun