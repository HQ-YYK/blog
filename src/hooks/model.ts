import { LoadingManager, Scene } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { RoomShadowFun, RoomFun } from "./Model/LandingPage/index";
import { BodyFun, FaceFun, AnimationsFun, IntervalsFun } from "./Model/Character/index";

import { resourcesData } from '@/data/Model'

let roomShadowSet: any,
  roomSet: any,
  faceSet: any,
  bodySet: any,
  intervalsSet: any,
  animationsSet: any


const modelFun = async (THREE: typeof import("three"), scene: Scene, loadingManager: LoadingManager | undefined) => {
  const gltfLoader = new GLTFLoader(loadingManager);

  const resourcesFun = () => {
    const transformedData: Record<string, string> = {};
    for (const item of resourcesData) {
      transformedData[item.name] = item.path;
    }
    return transformedData;
  }


  const resources = resourcesFun();

  // 加载roomShadow模型文件
  roomShadowSet = await RoomShadowFun(THREE, gltfLoader, resources)

  // 加载room模型文件
  roomSet = await RoomFun(THREE, scene, gltfLoader, resources, roomShadowSet)

  // 加载character模型文件
  bodySet = await BodyFun(THREE, scene, gltfLoader, resources)
  faceSet = await FaceFun(THREE, resources, bodySet)
  animationsSet = await AnimationsFun(THREE, gltfLoader, resources, faceSet, roomSet, intervalsSet)
  intervalsSet = await IntervalsFun(THREE, resources, roomSet, faceSet, animationsSet)

}


export default modelFun