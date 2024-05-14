import * as THREE from 'three'
import Experience from '@/hooks/Experience'

export default class Renderer {
  experience: any
  sizes: any
  scene: any
  camera: any
  instance: any

  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      antialias: true, // 开启锯齿
    })
    // 包含颜色信息（.map、.emissiveMap 和 .specularMap）的纹理在 glTF 中始终使用 sRGB 颜色空间，而顶点颜色和材质属性（.color、.emissive、.specular）使用线性颜色空间。在典型的渲染工作流程中，渲染器将纹理转换为线性色彩空间，进行光照计算，然后将最终输出转换回 sRGB 并显示在屏幕上。除非您需要在线性色彩空间中进行后期处理，否则在使用 glTF 时始终按如下方式配置 WebGLRenderer
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.setClearColor('#F5EFE6')
    this.resize()
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }
  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}
