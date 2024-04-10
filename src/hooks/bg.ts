import { Scene } from "three"
import { bgColors, rw, ow } from '@/data/index'


const bgFun = (THREE: typeof import("three"), scene: Scene) => {
  // 创建几何体
  const planeGeometry = new THREE.PlaneGeometry(2, 3.5, 1, 1)
  // 创建材料
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uOffset: {
        value: -2.75
      }
    },
    vertexColors: true,
    depthWrite: false,
    vertexShader: rw,
    fragmentShader: ow
  })
  // 创建 Mesh
  const mesh = new THREE.Mesh(planeGeometry, material);
  mesh.frustumCulled = false

  // 添加 Mesh 到场景中
  scene.add(mesh)


  const updateColors = () => {
    bgColors.topLeft.instance.set(bgColors.topLeft.value)
    bgColors.topRight.instance.set(bgColors.topRight.value)
    bgColors.bottomLeft.instance.set(bgColors.bottomLeft.value)
    bgColors.bottomRight.instance.set(bgColors.bottomRight.value)
    const array = new Float32Array(4 * 3);
    array[0] = bgColors.topLeft.instance.r
    array[1] = bgColors.topLeft.instance.g
    array[2] = bgColors.topLeft.instance.b
    array[3] = bgColors.topRight.instance.r
    array[4] = bgColors.topRight.instance.g
    array[5] = bgColors.topRight.instance.b
    array[6] = bgColors.bottomLeft.instance.r
    array[7] = bgColors.bottomLeft.instance.g
    array[8] = bgColors.bottomLeft.instance.b
    array[9] = bgColors.bottomRight.instance.r
    array[10] = bgColors.bottomRight.instance.g
    array[11] = bgColors.bottomRight.instance.b
    planeGeometry.setAttribute("color", new THREE.BufferAttribute(array, 3))
  }

  updateColors()

  return {

  }
}


export default bgFun