import Experience from '@/hooks/Experience'
import * as THREE from 'three'
import { Hc, Uc } from '@/data/Background'

export default class Shadow {
  parameters: { color: string }
  experience: Experience
  scene: any
  resources: any
  time: any
  lab: any
  resource: any
  model: any
  shadowTexture: any
  material: any

  constructor() {
    this.parameters = {
      color: '#00204d',
    }
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.lab = this.experience.world.lab.model
    this.resource = this.resources.items.labShadowModel
    this.setModel()
    this.setMaterial()
  }
  setModel() {
    this.model = this.resource.scene
    this.model.position.y = 0.003
    this.lab.model.add(this.model)
  }
  setMaterial() {
    this.shadowTexture = this.resources.items.bakedShadowLabTexture
    this.shadowTexture.flipY = false
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        alphaMask: {
          value: this.shadowTexture,
        },
        uColor: {
          value: new THREE.Color(this.parameters.color),
        },
        uOpacity: {
          value: 1,
        },
      },
      vertexShader: Hc,
      fragmentShader: Uc,
    })
    this.model.children.find(
      (child: { name: string }) => child.name === 'shadowCatcher'
    ).material = this.material
  }
}
