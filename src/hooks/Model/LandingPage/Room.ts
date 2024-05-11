import { Scene, Mesh, Group, Object3DEventMap, ShaderMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap, Power4 } from 'gsap'

import { DB } from '@/hooks/Utils'

import { ExtendedObject3D } from '@/types/model'

import DBData from '@/data/DB'

import DesktopsFun from './Desktops'
import MouseFun from './Mouse'
import MessagePopUpFun from './MessagePopUp'
import TonesFun from './Tones'
import SpeakerFun from './Speaker'
import PenguinFun from './Penguin'

let baseModel: any,
  shelvingModel: any,
  pictureModel: any,
  blackboardModel: any,
  plantModel: any

const RoomFun = async (
  THREE: typeof import('three'),
  scene: Scene,
  gltfLoader: GLTFLoader,
  resources: Record<string, string>,
  roomShadowSet: any,
  soundsFun: any,
  modelDB: IDBDatabase
) => {
  /**
   * 加载desktops
   * @param baseModel
   * @returns
   */
  const desktopsFun = (baseModel: {
    children: any[]
    add: (arg0: Mesh<any, any, any>) => void
  }) => {
    return DesktopsFun(THREE, baseModel, resources)
  }

  /**
   * 加载mouse
   * @param baseModel
   * @param roomModel
   */
  const mouseFun = (
    THREE: typeof import('three'),
    baseModel: { add: (arg0: ExtendedObject3D) => void },
    roomModel: { children: any[] }
  ) => {
    return MouseFun(THREE, baseModel, roomModel)
  }

  /**
   * 加载messagePopUp
   * @param roomModel
   */
  const messagePopUpFun = (roomModel: any, desktops: any) => {
    return MessagePopUpFun(THREE, roomModel, resources, desktops)
  }

  /**
   * 加载tones
   * @param roomModel
   */
  const tonesFun = (roomModel: any) => {
    return TonesFun(THREE, roomModel, resources)
  }

  const speakerFun = (speakerModel: any) => {
    return SpeakerFun(THREE, speakerModel)
  }

  const penguinFun = (penguinModel: any, roomModel: any) => {
    return PenguinFun(THREE, resources, penguinModel, roomModel)
  }

  const getBodyModel = await DB().getDataByKey(
    modelDB,
    DBData.storeNameList[0].name,
    DBData.storeNameList[0].uuidList[1].uuid
  )
  const objectLoader = new THREE.ObjectLoader()
  const model = await gltfLoader.loadAsync(resources.roomModel)
  const roomModel = getBodyModel
    ? objectLoader.parse(getBodyModel.data)
    : model.scene

  // 模型
  if (!roomModel) return
  baseModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'room-base'
  )
  shelvingModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'shelving'
  )
  pictureModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'picture'
  )
  blackboardModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'blackboard'
  )
  plantModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'plant'
  )
  const chairModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'chair'
  )
  const speakerModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'speaker'
  )
  const penguinModel = roomModel.children.find(
    (child: { name: string }) => child.name === 'penguin'
  )

  const desktopPlane0 = roomModel.children.find(
    (child: { name: string }) => child.name === 'desktop-plane-0'
  )
  const desktopPlane1 = roomModel.children.find(
    (child: { name: string }) => child.name === 'desktop-plane-1'
  )

  if (speakerModel) baseModel.add(speakerModel)
  if (penguinModel) baseModel.add(penguinModel)
  if (chairModel) baseModel.add(chairModel)
  if (desktopPlane0) baseModel.add(desktopPlane0)
  if (desktopPlane1) baseModel.add(desktopPlane1)

  roomModel.rotation.y = -Math.PI / 2
  roomModel.position.y -= 5.7

  scene.add(roomModel)

  // 纹理
  const texture = new THREE.TextureLoader().load(resources.bakedRoomTexture)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = false
  // Materials
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    fog: false,
  })
  roomModel.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material
    }
  })

  roomShadowSet && roomModel.add(roomShadowSet.roomShadowModel)

  const bounceIn = (delay: number = 0, withShelving: boolean = false) => {
    gsap.fromTo(
      baseModel.scale,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: Power4.easeOut,
        delay: delay,
      }
    )

    roomShadowSet &&
      gsap.fromTo(
        roomShadowSet.material.uniforms.uOpacity,
        {
          value: 0,
        },
        {
          value: 1,
          duration: 0.4,
          delay: delay + (withShelving ? 0.5 : 0.23),
          ease: Expo.easeOut,
        }
      )

    if (withShelving) {
      gsap.fromTo(
        shelvingModel.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Power4.easeOut,
          delay: delay + 0.25,
        }
      )

      gsap.fromTo(
        pictureModel.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Power4.easeOut,
          delay: delay + 0.32,
        }
      )

      gsap.fromTo(
        blackboardModel.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Power4.easeOut,
          delay: delay + 0.39,
        }
      )

      gsap.fromTo(
        plantModel.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Power4.easeOut,
          delay: delay + 0.46,
        }
      )
    }
  }

  const bounceOut = (delay: number = 0) => {
    gsap.fromTo(
      baseModel.scale,
      {
        x: 1,
        y: 1,
        z: 1,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: Power4.easeIn,
        delay: delay,
      }
    )

    roomShadowSet &&
      gsap.fromTo(
        roomShadowSet.material.uniforms.uOpacity,
        {
          value: 1,
        },
        {
          value: 0,
          duration: 0.15,
          delay: delay + 0.25,
        }
      )
  }

  const desktops = desktopsFun(baseModel)

  const mouse = mouseFun(THREE, baseModel, roomModel)

  const messagePopUp = messagePopUpFun(roomModel, desktops)

  const tones = tonesFun(roomModel)

  const speaker = speakerFun(speakerModel)

  const penguin = penguinFun(penguinModel, roomModel)

  const scrollDesktop0 = () => {
    const randomSpeed = Math.random() * -0.5 + 0.25

    gsap.to(new THREE.TextureLoader().load(resources.desktop0).offset, {
      y: randomSpeed, // 在 y 方向上滚动
      duration: 1, // 滚动持续时间为 1 秒
    })

    soundsFun.play('mouseWheel')
  }

  !getBodyModel &&
    (await DB().addData(modelDB, 'model', {
      uuid: DBData.storeNameList[0].uuidList[1].uuid,
      name: DBData.storeNameList[0].uuidList[1].name,
      data: roomModel.toJSON(),
    }))

  return {
    roomModel,
    desktops,
    mouse,
    messagePopUp,
    tones,
    speaker,
    penguin,

    bounceIn,
    bounceOut,
    scrollDesktop0,
  }
}

export default RoomFun
