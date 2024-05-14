import * as THREE from 'three'
import { gsap, Power2 } from 'gsap'
import Experience from '@/hooks/Experience'

export default class Penguin {
  experience: any
  sounds: any
  resources: any
  room: any
  model: any
  wings: any[]
  heartMaterial: any
  heart: any
  isJumping: boolean

  constructor() {
    this.experience = new Experience()
    this.sounds = this.experience.sounds
    this.resources = this.experience.resources
    this.room = this.experience.world.landingPage.room
    this.model = this.experience.world.landingPage.room.penguin
    this.wings = [this.model.children[0], this.model.children[1]]
    this.setHeart()
    this.isJumping = false
    this.model.hoverIcon = 'pointer'
    this.model.onClick = () => this.jump()
  }
  setHeart() {
    this.heartMaterial = new THREE.SpriteMaterial({
      map: this.resources.items.heartTexture,
      alphaTest: 0.1,
      opacity: 0,
      fog: false,
      rotation: 0.2,
    })
    this.heart = new THREE.Sprite(this.heartMaterial)
    this.heart.position.set(
      this.model.position.x + 0.07,
      2.2,
      this.model.position.z + 0.07
    )
    this.heart.scale.set(0.25, 0.25, 0.25)
    this.room.model.add(this.heart)
  }
  jump() {
    if (!this.isJumping) {
      this.isJumping = true
      gsap.delayedCall(0.8, () => (this.isJumping = false))

      gsap.to(this.model.position, {
        y: 2,
        yoyo: !0,
        repeat: 1,
        duration: 0.4,
      })
      gsap.to(this.wings[0].rotation, {
        x: 0.4,
        duration: 0.1,
        repeat: 7,
        yoyo: !0,
      })
      gsap.to(this.wings[1].rotation, {
        x: -0.4,
        duration: 0.1,
        repeat: 7,
        yoyo: !0,
      })
      this.sounds.play('bird'), this.animateHeart()
    }
  }
  animateHeart() {
    gsap.fromTo(
      this.heart.position,
      {
        x: this.model.position.x + 0.03,
        y: 2.15,
        z: this.model.position.z + 0.03,
      },
      {
        x: this.model.position.x + 0.1,
        y: 2.7,
        z: this.model.position.z + 0.1,
        duration: 0.8,
        ease: Power2.easeOut,
      }
    )
    gsap.fromTo(
      this.heartMaterial,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.3,
      }
    )
    gsap.fromTo(
      this.heartMaterial,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.3,
        delay: 0.5,
      }
    )
  }
}
