import * as THREE from 'three'
import Experience from '@/hooks/Experience'

import { cursor, parallax } from '@/data/Camera'

export default class Camera {
  parallax: { intensity: number; speed: number; enabled: boolean }
  experience: Experience
  sizes: any
  scene: any
  time: any
  instance: THREE.PerspectiveCamera
  cameraParallaxGroup: THREE.Group<THREE.Object3DEventMap>
  cursor: {
    x: number
    y: number
  }
  canvas: any

  constructor() {
    this.parallax = parallax
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.time = this.experience.time
    // setInstance
    this.instance = new THREE.PerspectiveCamera(
      38,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    this.cameraParallaxGroup = new THREE.Group()
    this.cameraParallaxGroup.add(this.instance)
    this.scene.add(this.cameraParallaxGroup)

    this.cursor = cursor
    this.setCursor()
  }

  setCursor() {
    window.addEventListener('mousemove', (e) => {
      this.cursor.x = e.clientX / this.sizes.width - 0.5
      this.cursor.y = e.clientY / this.sizes.height - 0.5
    })
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }
  update() {
    !this.sizes.touch && this.parallax.enabled && this.updateParallax()
  }

  updateParallax() {
    const dx = this.cursor.x * this.parallax.intensity
    const dy = -this.cursor.y * this.parallax.intensity

    const timeDelta = this.time.delta / 1000

    const deltaX =
      (dx - this.cameraParallaxGroup.position.x) * parallax.speed * timeDelta
    const deltaY =
      (dy - this.cameraParallaxGroup.position.y) * parallax.speed * timeDelta

    if (deltaX < 0.05 && deltaX > -0.05) {
      this.cameraParallaxGroup.position.x += deltaX
    }
    if (deltaY < 0.05 && deltaY > -0.05) {
      this.cameraParallaxGroup.position.y += deltaY
    }
  }
}
