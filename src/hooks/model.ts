import { LoadingManager, Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { RoomShadowFun, RoomFun } from './Model/LandingPage/index'
import {
  BodyFun,
  FaceFun,
  AnimationsFun,
  IntervalsFun,
} from './Model/Character/index'
import { DB } from '@/hooks/Utils'

import { resourcesData } from '@/data/Model'
import DBData from '@/data/DB'

let roomShadowSet: any,
  roomSet: any,
  faceSet: any,
  bodySet: any,
  intervalsSet: any,
  animationsSet: any

const modelFun = async (
  THREE: typeof import('three'),
  scene: Scene,
  loadingManager: LoadingManager | undefined,
  soundsFun: any
) => {
  const gltfLoader = new GLTFLoader(loadingManager)

  const resourcesFun = () => {
    const transformedData: Record<string, string> = {}
    for (const item of resourcesData) {
      transformedData[item.name] = item.path
    }
    return transformedData
  }

  const resources = resourcesFun()

  const modelDB = await DB().openDB(DBData.dbName, DBData.storeNameList[0].name)

  // 加载roomShadow模型文件
  roomShadowSet = await RoomShadowFun(THREE, gltfLoader, resources, modelDB)

  // 加载room模型文件
  roomSet = await RoomFun(
    THREE,
    scene,
    gltfLoader,
    resources,
    roomShadowSet,
    soundsFun,
    modelDB
  )

  // 加载character模型文件
  bodySet = await BodyFun(THREE, scene, gltfLoader, resources, modelDB)

  faceSet = await FaceFun(THREE, resources, bodySet)
  animationsSet = await AnimationsFun(
    THREE,
    gltfLoader,
    resources,
    faceSet,
    roomSet,
    intervalsSet
  )
  intervalsSet = await IntervalsFun(
    THREE,
    resources,
    roomSet,
    faceSet,
    animationsSet,
    soundsFun,
    modelDB
  )

  const update = () => {
    animationsSet && animationsSet.update()
    intervalsSet && intervalsSet.update()
    bodySet && bodySet.update()

    // lab && this.lab.screen && this.lab.screen.update()
  }

  return {
    modelDB,
    update,

    roomSet,
    intervalsSet,
    animationsSet,
  }
}

export default modelFun
