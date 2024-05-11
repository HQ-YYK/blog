import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { DB } from '@/hooks/Utils'

import { Hc, Uc } from '@/data/Model'
import DBData from '@/data/DB'

const RoomShadowFun = async (
  THREE: typeof import('three'),
  gltfLoader: GLTFLoader,
  resources: Record<string, string>,
  modelDB: IDBDatabase
) => {
  const getBodyModel = await DB().getDataByKey(
    modelDB,
    DBData.storeNameList[0].name,
    DBData.storeNameList[0].uuidList[0].uuid
  )
  const objectLoader = new THREE.ObjectLoader()

  const model = await gltfLoader.loadAsync(resources.roomShadowModel)
  const roomShadowModel = getBodyModel
    ? objectLoader.parse(getBodyModel.data)
    : model.scene
  if (!roomShadowModel) return
  // 纹理
  const shadowTexture = new THREE.TextureLoader().load(
    resources.bakedShadowRoomTexture
  )
  shadowTexture.colorSpace = THREE.SRGBColorSpace
  shadowTexture.flipY = false

  // 材质
  const material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      alphaMask: {
        value: shadowTexture,
      },
      uColor: {
        value: new THREE.Color('#c4a37e'),
      },
      uOpacity: {
        value: 1,
      },
    },
    vertexShader: Hc, // 顶点着色器
    fragmentShader: Uc, // 片元着色器
  })

  roomShadowModel.traverse((child) => {
    if (child.name === 'shadowCatcher') {
      if (child instanceof THREE.Mesh) {
        child.material = material
      }
    }
  })

  !getBodyModel &&
    (await DB().addData(modelDB, 'model', {
      uuid: DBData.storeNameList[0].uuidList[0].uuid,
      name: DBData.storeNameList[0].uuidList[0].name,
      data: roomShadowModel.toJSON(),
    }))

  return {
    roomShadowModel,
    material,
  }
}

export default RoomShadowFun
