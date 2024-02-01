import { Camera, Event, Object3D, Scene, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { directionalLightType } from "../types/bg";

const bgFun = (THREE: typeof import("three"), renderer: WebGLRenderer, scene: Scene, camera: Camera, controls: OrbitControls) => {
  // 创建一个加载器
  const loader = new GLTFLoader();

  // 加载模型文件
  loader.load(
    '/glb/bg.glb',
    (gltf) => {
      // 获取场景中的第一个模型对象
      const model = gltf.scene;

      // 将模型放置在场景中
      scene.add(model);

      // 创建灯光
      setDirectionalLight()
    },
    (xhr) => {
      // 加载过程中的回调函数
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      // 加载错误的回调函数
      console.log('An error happened', error);
    }
  );


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
      color: '0xffffff',
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