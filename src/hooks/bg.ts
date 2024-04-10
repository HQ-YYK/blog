import { LoadingManager, Scene } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { directionalLightType } from "../types/bg";

import { resourcesData, Hc, Uc } from '@/data/index'

const bgFun = (THREE: typeof import("three"), scene: Scene, loadingManager: LoadingManager | undefined) => {
  const gltfLoader = new GLTFLoader(loadingManager);


  const resourcesFun = () => {
    const transformedData: Record<string, string> = {};
    for (const item of resourcesData) {
      transformedData[item.name] = item.path;
    }
    return transformedData;
  }


  const resources = resourcesFun();


  // 加载模型文件
  gltfLoader.load('/models/room/shadow-model.glb', (gltf) => {
    const model = gltf.scene;

    const shadowModel = model.children.find(e => e.name === "shadowCatcher")
    console.log(shadowModel, model);


    // const shadowTexture = resources.bakedShadowRoomTexture
    // if (shadowModel) {
    //   shadowModel.material = new THREE.RawShaderMaterial({
    //     transparent: true,
    //     uniforms: {
    //       alphaMask: {
    //         value: shadowTexture
    //       },
    //       uColor: {
    //         value: "#c4a37e"
    //       },
    //       uOpacity: {
    //         value: 1
    //       }
    //     },
    //     vertexShader: Hc,
    //     fragmentShader: Uc
    //   });
    // }

    // 将模型放置在场景中
    scene.add(model);

    // 创建灯光
    setDirectionalLight()
  });

  const createDirectionalLight = (light: directionalLightType) => {
    const {
      color,
      intensity,
      position,
      castShadow,
      shadow
    } = light

    const { x, y, z } = position
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    directionalLight.castShadow = castShadow;

    const { camera } = shadow
    const {
      near,
      far,
      right,
      left,
      top,
      bottom,
      width,
      height,
      radius,
      bias
    } = camera
    directionalLight.shadow.camera.near = near;
    directionalLight.shadow.camera.far = far;
    directionalLight.shadow.camera.right = right;
    directionalLight.shadow.camera.left = left;
    directionalLight.shadow.camera.top = top;
    directionalLight.shadow.camera.bottom = bottom;
    directionalLight.shadow.mapSize.width = width;
    directionalLight.shadow.mapSize.height = height;
    directionalLight.shadow.radius = radius;
    directionalLight.shadow.bias = bias;

    scene.add(directionalLight);
  }

  const setDirectionalLight = () => {
    // 创建方向光
    const light = {
      color: '#ffffff',
      intensity: 2.5,
      position: {
        x: -5,
        y: 25,
        z: -1
      },
      castShadow: true,
      shadow: {
        camera: {
          near: 0.01,
          far: 500,
          right: 30,
          left: -30,
          top: 30,
          bottom: -30,
          width: 1024,
          height: 1024,
          radius: 4,
          bias: -0.00006
        }
      }
    }
    const directionalLight1 = light
    createDirectionalLight(directionalLight1);

    const directionalLight2 = light
    directionalLight2.position.x = 5
    createDirectionalLight(directionalLight2);

    // 创建半球光
    const hemisphereLight = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
    hemisphereLight.position.set(2, 1, 1)
    scene.add(hemisphereLight)
  }


  return {

  }
}


export default bgFun