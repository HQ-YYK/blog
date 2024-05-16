import * as THREE from 'three'
import { gsap, Power4 } from 'gsap'
import Experience from '@/hooks/Experience'

export default class MessagePopUp {
  experience: Experience
  resources: any
  room: any
  desktops: any
  sounds: any
  material: any
  sprite: any

  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.room = this.experience.world.landingPage.room
    this.desktops = this.experience.world.landingPage.desktops
    this.sounds = this.experience.sounds
    this.setSprite()
  }
  setSprite() {
    this.material = new THREE.SpriteMaterial({
      map: this.resources.items.newMessageSprite,
      alphaTest: 0.1,
      opacity: 0,
      fog: false,
    })
    this.sprite = new THREE.Sprite(this.material)
    this.room.model.add(this.sprite)
    this.sprite.position.set(-1.75, 3.5, 1.8)
    this.sprite.scale.set(0.35, 0.35, 0.35)
  }
  show() {
    this.sounds.play('notification')
    gsap.fromTo(
      this.sprite.position,
      {
        y: 3.3,
      },
      {
        y: 4,
        duration: 2,
        ease: Power4.easeOut,
      }
    )
    gsap.fromTo(
      this.material,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
      }
    )
    gsap.fromTo(
      this.material,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.5,
        delay: 1.3,
      }
    )
    gsap.fromTo(
      this.desktops.notification.material,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
      }
    )
    gsap.fromTo(
      this.desktops.notification.material,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 1,
        delay: 2,
      }
    )
  }
}
