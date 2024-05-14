/**
 * 光线投影
 */
import * as THREE from 'three'
import Experience from '@/hooks/Experience'

export default class Raycaster {
  objects: any[]
  pointer: { x: number; y: number }
  experience: Experience
  resources: any
  camera: any
  scene: any
  instance: any
  hoverIcon: any
  positionTriggered: boolean = false
  triggerClick: boolean = false
  intersect: any = null
  isHovering: boolean = false

  constructor() {
    this.objects = []
    this.pointer = {
      x: 0,
      y: 0,
    }
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.scene = this.experience.scene
    this.resources.on('ready', () => {
      this.instance = new THREE.Raycaster()
      this.hoverIcon = this.experience.ui.hoverIcon
      this.scene.traverse((child: any) => {
        if (child.onHover || child.onClick) this.objects.push(child)
      })
      this.hoverIcon.on('move', (event: MouseEvent) => {
        this.positionTriggered = false
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
      })
      window.addEventListener('click', () => {
        this.positionTriggered = false
        this.triggerClick = true
      })
    })
  }
  update() {
    if (
      this.instance &&
      this.hoverIcon &&
      this.pointer.x != 0 &&
      !this.positionTriggered
    ) {
      this.positionTriggered = true
      this.instance.setFromCamera(this.pointer, this.camera.instance)
      const objects = this.instance.intersectObjects(this.objects)
      if (objects.length == 0) {
        this.hoverIcon.setupDefault()
        this.intersect = null
        this.isHovering = false
        this.triggerClick = false
      } else {
        this.intersect = objects[0]
        if (!this.intersect) return
        this.intersect.object.onHover && this.intersect.object.onHover()
        this.isHovering = this.intersect.object.hoverIcon
        this.intersect.object.hoverIcon &&
          this.intersect.object.hoverIcon == 'pointer' &&
          this.hoverIcon.setupPointer()
        this.triggerClick &&
          this.intersect.object.onClick &&
          this.intersect.object.onClick()
        this.triggerClick = false
      }
    }
  }
}
