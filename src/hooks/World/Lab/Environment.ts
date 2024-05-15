import Experience from '@/hooks/Experience'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default class Environment {
  parameters: { speed: number }
  active: boolean
  experience: Experience
  resources: any
  lab: any
  sounds: any
  model: any
  texture: any
  material: any
  background: any
  button: any

  constructor() {
    this.parameters = {
      speed: 5e-4,
    }
    this.active = true
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.lab = this.experience.world.lab.model
    this.sounds = this.experience.sounds
    this.setModel()
    this.setMaterial()
    this.setBackground()
    this.setButton()
  }
  setModel() {
    this.model = this.lab.model.children.find(
      (child: { name: string }) => child.name === 'desktop'
    )
  }
  setMaterial() {
    this.texture = this.resources.items.labScreenGraph
    this.texture.wrapS = THREE.RepeatWrapping
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
    })
    this.model.material = this.material
  }
  setBackground() {
    this.background = {
      geometry: this.model.geometry.clone(),
      material: new THREE.MeshBasicMaterial({
        map: this.resources.items.labScreenOffline,
      }),
    }
    this.background.mesh = new THREE.Mesh(
      this.background.geometry,
      this.background.material
    )
    this.background.mesh.position.set(
      this.model.position.x - 0.001,
      this.model.position.y,
      this.model.position.z
    )
    this.lab.model.add(this.background.mesh)
  }
  setButton() {
    this.button = this.lab.model.children.find(
      (child: { name: string }) => child.name === 'pc-button'
    )
    this.button.material = this.lab.material
    this.button.hoverIcon = 'pointer'
    this.button.onClick = () => {
      this.sounds.play('buttonClick')
      this.switchActivity()
    }
  }
  switchActivity() {
    this.active = !this.active
    gsap.to(this.material, {
      opacity: this.active ? 1 : 0,
      duration: 0.2,
    })
  }
  update() {
    this.active && (this.texture.offset.x -= this.parameters.speed)
  }
}
