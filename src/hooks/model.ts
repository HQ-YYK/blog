import { Scene } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const modelFun = (THREE: typeof import("three"), scene: Scene) => {
  // 创建一个加载器
  const loader = new GLTFLoader();


  // 加载模型文件
  loader.load('/glb/model.glb', (gltf) => {
    const model = gltf.scene;

    // 将模型放置在场景中
    scene.add(model);
  });
}


export default modelFun