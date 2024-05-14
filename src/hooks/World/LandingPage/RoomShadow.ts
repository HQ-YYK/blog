import * as THREE from 'three'
import Experience from '@/hooks/Experience'
import { Hc, Uc } from '@/data/Background'

export default class RoomShadow {
  parameters: { color: string }
  experience: Experience
  scene: any
  resources: any
  time: any
  resource: any
  model: any
  shadowTexture: any
  material: any

  constructor() {
    this.parameters = {
      color: '#c4a37e',
    }
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.resource = this.resources.items.roomShadowModel

    // setModel
    this.model = this.resource.scene

    // setMaterial
    this.shadowTexture = this.resources.items.bakedShadowRoomTexture
    this.shadowTexture.flipY = false
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        alphaMask: {
          value: this.shadowTexture,
        },
        uColor: {
          value: new THREE.Color('#c4a37e'),
        },
        uOpacity: {
          value: 1,
        },
      },
      vertexShader: Hc, // 顶点着色器
      fragmentShader: Uc, // 片元着色器
    })

    this.model.traverse((child: { name: string }) => {
      if (child.name === 'shadowCatcher') {
        if (child instanceof THREE.Mesh) {
          child.material = this.material
        }
      }
    })
  }
}
