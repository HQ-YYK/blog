import * as THREE from 'three'
import { gsap, Back, Power2 } from 'gsap'
import Experience from '@/hooks/Experience'

export default class Room {
  experience: Experience
  scene: any
  resources: any
  time: any
  shadow: any
  sounds: any
  desktopLayers: {}
  model: any
  baseModel: any
  shelving: any
  picture: any
  blackboard: any
  plant: any
  chair: any
  speaker: any
  penguin: any
  deskopPlane0: any
  deskopPlane1: any
  texture: any
  material: any

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.shadow = this.experience.world.landingPage.roomShadow
    this.sounds = this.experience.sounds
    this.desktopLayers = {}

    //setModel
    this.model = this.resources.items.roomModel.scene
    this.baseModel = this.model.children.find(
      (child: { name: string }) => child.name === 'room-base'
    )
    this.shelving = this.model.children.find(
      (child: { name: string }) => child.name === 'shelving'
    )
    this.picture = this.model.children.find(
      (child: { name: string }) => child.name === 'picture'
    )
    this.blackboard = this.model.children.find(
      (child: { name: string }) => child.name === 'blackboard'
    )
    this.plant = this.model.children.find(
      (child: { name: string }) => child.name === 'plant'
    )
    this.chair = this.model.children.find(
      (child: { name: string }) => child.name === 'chair'
    )
    this.speaker = this.model.children.find(
      (child: { name: string }) => child.name === 'speaker'
    )
    this.penguin = this.model.children.find(
      (child: { name: string }) => child.name === 'penguin'
    )
    this.baseModel.add(this.speaker)
    this.baseModel.add(this.penguin)
    this.baseModel.add(this.speaker)
    this.baseModel.add(this.chair)
    this.deskopPlane0 = this.model.children.find(
      (child: { name: string }) => child.name === 'desktop-plane-0'
    )
    this.deskopPlane1 = this.model.children.find(
      (child: { name: string }) => child.name === 'desktop-plane-1'
    )
    this.baseModel.add(this.deskopPlane0)
    this.baseModel.add(this.deskopPlane1)
    this.model.rotation.y = -Math.PI / 2
    this.model.position.y -= 5.7
    this.scene.add(this.model)

    //setMaterial
    this.texture = this.resources.items.bakedRoomTexture
    this.texture.flipY = true
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: false,
      fog: true,
    })
    this.model.traverse((child: { material: any }) => {
      child.material = this.material
    })

    this.addShadow()
  }

  addShadow() {
    this.model.add(this.shadow.model)
  }
  bounceIn(delay: number = 0, withShelving: boolean = false) {
    gsap.fromTo(
      this.baseModel.scale,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: Back.easeOut.config(1.5),
        delay,
      }
    )
    gsap.fromTo(
      this.shadow.material.uniforms.uOpacity,
      {
        value: 0,
      },
      {
        value: 1,
        duration: 0.4,
        delay: delay + (withShelving ? 0.5 : 0.23),
        ease: Power2.easeOut,
      }
    )
    if (withShelving) {
      gsap.fromTo(
        this.shelving.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Back.easeOut.config(1.5),
          delay: delay + 0.25,
        }
      )
      gsap.fromTo(
        this.picture.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Back.easeOut.config(1.5),
          delay: delay + 0.32,
        }
      )
      gsap.fromTo(
        this.blackboard.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Back.easeOut.config(1.5),
          delay: delay + 0.39,
        }
      )
      gsap.fromTo(
        this.plant.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: Back.easeOut.config(1.5),
          delay: delay + 0.46,
        }
      )
    }
  }
  bounceOut(delay: number = 0) {
    gsap.fromTo(
      this.baseModel.scale,
      {
        x: 1,
        y: 1,
        z: 1,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: Back.easeIn.config(1.5),
        delay,
      }
    )
    gsap.fromTo(
      this.shadow.material.uniforms.uOpacity,
      {
        value: 1,
      },
      {
        value: 0,
        duration: 0.15,
        delay: delay + 0.25,
      }
    )
  }
}
