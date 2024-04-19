import { Camera, Scene } from 'three';
import { Sizes } from '@/types/init'


const RendererFun = (
  THREE: typeof import("three"),
  scene: Scene,
  camera: Camera,
  sizes: Sizes
) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true }); // 开启锯齿
  // 包含颜色信息（.map、.emissiveMap 和 .specularMap）的纹理在 glTF 中始终使用 sRGB 颜色空间，而顶点颜色和材质属性（.color、.emissive、.specular）使用线性颜色空间。在典型的渲染工作流程中，渲染器将纹理转换为线性色彩空间，进行光照计算，然后将最终输出转换回 sRGB 并显示在屏幕上。除非您需要在线性色彩空间中进行后期处理，否则在使用 glTF 时始终按如下方式配置 WebGLRenderer 
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor("#F5EFE6")

  const resize = () => {
    renderer.setPixelRatio(Math.min(sizes.pixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height)
  }
  resize()

  const update = () => {
    renderer.render(scene, camera)
  }

  return {
    renderer,
    update,
    resize
  }

}

export default RendererFun