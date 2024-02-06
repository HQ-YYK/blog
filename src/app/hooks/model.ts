import { Scene } from "three"
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';

const modelFun = (THREE: typeof import("three"), scene: Scene) => {
  // 创建一个加载器
  const loader = new MMDLoader();


  // 加载模型文件
  loader.load('/pmx/yinyue.pmx', (mesh) => {
    const model = mesh;

    // 缩小模型
    model.scale.set(0.1, 0.1, 0.1);

    // 将模型放置在场景中
    scene.add(model);
  });
}


export default modelFun