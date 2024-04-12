import { LoadingManager, Scene } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { RoomShadowFun, RoomFun } from "./Model/index";

import { resourcesData } from '@/data/Model'


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
  const roomShadowSet = await RoomShadowFun(THREE, scene, gltfLoader, resources)

  // 加载room模型文件
  await RoomFun(THREE, scene, gltfLoader, resources, roomShadowSet)



}


export default modelFun