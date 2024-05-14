import * as THREE from 'three'
import gsap, { Power1, Power0 } from 'gsap'
import Experience from '@/hooks/Experience'

export default class Tones {
  experience: Experience
  room: any
  resources: any
  materials: any[]
  sprites: any[]

  constructor() {
    this.experience = new Experience()
    this.room = this.experience.world.landingPage.room
    this.resources = this.experience.resources

    //setSprites
    this.materials = [
      new THREE.SpriteMaterial({
        map: this.resources.items.tone0Texture,
        alphaTest: 0.1,
        opacity: 0,
        fog: false,
      }),
      new THREE.SpriteMaterial({
        map: this.resources.items.tone1Texture,
        alphaTest: 0.1,
        opacity: 0,
        fog: false,
      }),
      new THREE.SpriteMaterial({
        map: this.resources.items.tone2Texture,
        alphaTest: 0.1,
        opacity: 0,
        fog: false,
      }),
    ]

    this.sprites = [
      new THREE.Sprite(this.materials[0]),
      new THREE.Sprite(this.materials[1]),
      new THREE.Sprite(this.materials[2]),
    ]
    this.sprites.forEach((sprite) => {
      sprite.scale.set(0.3, 0.3, 0.3),
        sprite.position.set(-1.2, 2, -1.9),
        this.room.model.add(sprite)
    })

    gsap.delayedCall(2, () => this.startAnimations())
  }
  startAnimations() {
    this.moveSprite(0), gsap.delayedCall(1.5, () => this.moveSprite(1))
    gsap.delayedCall(3, () => this.moveSprite(2))
  }
  moveSprite(num: number) {
    if (this.experience.sounds.active) {
      const t = this.sprites[num]
      gsap.fromTo(
        t.material,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        }
      ),
        gsap.fromTo(
          t.material,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 0.5,
            delay: 2.5,
          }
        ),
        gsap.fromTo(
          t.material,
          {
            rotation: -0.15,
          },
          {
            rotation: 0.15,
            duration: 1,
            repeat: 4,
            yoyo: true,
            ease: Power1.easeInOut,
          }
        ),
        gsap.fromTo(
          t.position,
          {
            y: 2,
            x: -1.9,
          },
          {
            y: 3.5,
            x: -0.9 - Math.random() * 2,
            duration: 3,
            ease: Power0.easeNone,
          }
        )
    }
    gsap.delayedCall(3, () => gsap.delayedCall(2, () => this.moveSprite(num)))
  }
}
