import * as THREE from 'three'
import Experience from '@/hooks/Experience'

export default class Fog {
  experience: Experience
  scene: any
  sizes: any
  fog: any

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.setFog()
    this.onOrientationChange()
    this.sizes.on('portrait', () => this.onOrientationChange())
    this.sizes.on('landscape', () => this.onOrientationChange())
  }
  onOrientationChange() {
    this.fog.near = this.sizes.portrait ? 18 : 10
    this.fog.far = this.sizes.portrait ? 23 : 17
    this.fog.color = new THREE.Color(
      this.sizes.portrait ? '#001945' : '#002C6A'
    )
  }
  setFog() {
    this.fog = new THREE.Fog('#002C6A', 10, 17)
    this.scene.fog = this.fog
  }
}
