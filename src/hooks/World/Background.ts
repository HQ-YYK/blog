import * as THREE from 'three'
import Experience from '@/hooks/Experience'
import { bgColors, rw, ow } from '@/data/Background'

export default class Background {
  height: number
  experience: Experience
  resources: any
  scene: any
  colors: any
  geometry: any
  material: any
  mesh: any
  updateColors: () => void

  constructor() {
    this.height = 3.5
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.scene = this.experience.scene

    this.colors = bgColors

    this.updateColors = () => {}

    this.setBackground()
  }
  setBackground() {
    this.geometry = new THREE.PlaneGeometry(2, this.height, 1, 1)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uOffset: {
          value: -2.75,
        },
      },
      vertexColors: true,
      depthWrite: false,
      vertexShader: rw,
      fragmentShader: ow,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.frustumCulled = false
    this.scene.add(this.mesh)

    this.updateColors = () => {
      this.colors.topLeft.instance.set(this.colors.topLeft.value)
      this.colors.topRight.instance.set(this.colors.topRight.value)
      this.colors.bottomLeft.instance.set(this.colors.bottomLeft.value)
      this.colors.bottomRight.instance.set(this.colors.bottomRight.value)

      const array = new Float32Array(4 * 3)
      array[0] = this.colors.topLeft.instance.r
      array[1] = this.colors.topLeft.instance.g
      array[2] = this.colors.topLeft.instance.b
      array[3] = this.colors.topRight.instance.r
      array[4] = this.colors.topRight.instance.g
      array[5] = this.colors.topRight.instance.b
      array[6] = this.colors.bottomLeft.instance.r
      array[7] = this.colors.bottomLeft.instance.g
      array[8] = this.colors.bottomLeft.instance.b
      array[9] = this.colors.bottomRight.instance.r
      array[10] = this.colors.bottomRight.instance.g
      array[11] = this.colors.bottomRight.instance.b
      this.geometry.setAttribute('color', new THREE.BufferAttribute(array, 3))
    }
    this.updateColors()
  }
}
