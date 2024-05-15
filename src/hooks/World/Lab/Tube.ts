import Experience from '@/hooks/Experience'
import * as THREE from 'three'
import { $b, Qb } from '@/data/Background'

export default class Tube {
  parameters: { uColorTop: string; uColorBottom: string; uOpacity: number }
  experience: Experience
  lab: any
  material: any
  geometry: any
  model: any

  constructor() {
    this.parameters = {
      uColorTop: '#0047d6',
      uColorBottom: '#70ffff',
      uOpacity: 0.25,
    }
    this.experience = new Experience()
    this.lab = this.experience.world.lab.model
    this.setMaterial()
    this.setModel()
  }
  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: {
          value: new THREE.Color(this.parameters.uColorTop),
        },
        uColorBottom: {
          value: new THREE.Color(this.parameters.uColorBottom),
        },
        uOpacity: {
          value: this.parameters.uOpacity,
        },
      },
      vertexShader: Qb,
      fragmentShader: $b,
      transparent: !0,
    })
  }
  setModel() {
    this.geometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32, 1, !0)
    this.model = new THREE.Mesh(this.geometry, this.material)
    this.model.position.set(-0.08, 2.9, -0.12)
    this.model.scale.set(0.92, 1.55, 0.92)
    this.lab.model.add(this.model)
  }
}
