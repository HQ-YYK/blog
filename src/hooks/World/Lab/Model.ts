import Experience from '@/hooks/Experience'
import * as THREE from 'three'

export default class Model {
  experience: Experience
  scene: any
  resources: any
  desktopLayers: {}
  model: any
  texture: any
  material: any
  bottom: any
  bottomMaterial: any

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.desktopLayers = {}
    this.setModel()
    this.setMaterial()
    this.setBottomMaterial()
    setTimeout(() => this.setPosition())
  }
  setModel() {
    this.model = this.resources.items.labModel.scene
    this.model.rotation.y = -Math.PI / 2
    this.scene.add(this.model)
  }
  setPosition() {
    this.model.position.y -= 19.9
    this.model.scale.set(0.97, 0.97, 0.97)
  }
  setMaterial() {
    this.texture = this.resources.items.bakedLabTexture
    this.texture.flipY = false
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    })
    const mergedScene = this.model.children.find(
      (child: { name: string }) => child.name === 'merged-scene'
    )
    mergedScene.material = this.material
  }
  setBottomMaterial() {
    this.bottom = this.model.children.find(
      (child: { name: string }) => child.name === 'bottom'
    )
    this.bottomMaterial = new THREE.MeshBasicMaterial({
      color: 'gray',
    })
    this.bottom.material = this.bottomMaterial
    this.bottom.position.y -= 0.005
  }
}
