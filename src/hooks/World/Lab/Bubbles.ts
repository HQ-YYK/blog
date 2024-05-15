import Experience from '@/hooks/Experience'
import { gsap, Back, Power0 } from 'gsap'
import * as THREE from 'three'

export default class Bubbles {
  parameters: { count: number; maxMovementDuration: number }
  experience: Experience
  resources: any
  lab: any
  sounds: any
  sprites: any[]
  availableSprites: any[]

  constructor() {
    this.parameters = {
      count: 11,
      maxMovementDuration: 3,
    }
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.lab = this.experience.world.lab.model
    this.sounds = this.experience.sounds
    this.sprites = []
    this.availableSprites = []
    this.setSprite()
    this.startInterval()
  }
  setSprite() {
    for (let i = 0; i < this.parameters.count; i++) {
      this.sprites.push(
        new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: this.resources.items.bubbleSprite,
            depthTest: false,
            opacity: 0,
          })
        )
      )
      this.availableSprites.push(this.sprites[i])
      this.sprites[i].position.x = Math.sin(i) * 1.1
      this.sprites[i].position.z = Math.cos(i) * 1.1 - 0.15
      this.lab.model.add(this.sprites[i])
      this.addOnHover(this.sprites[i])
    }
  }
  addOnHover(event: { onHover: () => void; popped: any }) {
    event.onHover = () => {
      event.popped || this.popBubble(event)
    }
  }
  popBubble(event: {
    onHover?: () => void
    popped: any
    material?: any
    scale?: any
  }) {
    this.sounds.play('bubble')
    event.popped = true
    event.material.map = this.resources.items.bubblePopSprite
    gsap.to(event.material, {
      opacity: 0,
      duration: 0.2,
    })
    const t = event.scale.x + 0.1
    gsap.to(event.scale, {
      x: t,
      y: t,
      duration: 0.2,
    })
  }
  getAvailableSprite() {
    if (this.availableSprites.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * this.availableSprites.length
      )
      const selectedSprite = this.availableSprites[randomIndex]
      this.availableSprites.splice(randomIndex, 1)
      return selectedSprite
    }
    return undefined
  }
  spawnBubble(
    easingFactor = Math.random() * 1.1,
    direction?: 'back' | 'forward'
  ) {
    if (this.availableSprites.length != 0) {
      const selectedBubble = this.getAvailableSprite()
      const movementDuration =
        direction === 'back' ? 4 : this.parameters.maxMovementDuration
      const easingFunction =
        direction === 'back' ? Back.easeIn.config(2.5) : Power0.easeNone
      const adjustedDuration =
        movementDuration - movementDuration * (easingFactor / 3.9)

      easingFactor += 0.8
      gsap.fromTo(
        selectedBubble.position,
        {
          y: easingFactor,
        },
        {
          y: 4.7,
          duration: adjustedDuration,
          ease: easingFunction,
          onComplete: () => {
            this.availableSprites.push(selectedBubble)
          },
        }
      )
      selectedBubble.material.opacity = Math.random() * 0.5 + 0.5
      selectedBubble.popped = false
      selectedBubble.material.map = this.resources.items.bubbleSprite
      const a = Math.random() * 0.12 + 0.2
      gsap.fromTo(
        selectedBubble.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: a,
          y: a,
          z: a,
          duration: 0.5,
          ease: Back.easeIn.config(1.5),
        }
      )
      gsap.to(selectedBubble.material, {
        opacity: 0,
        duration: 0.2,
        delay: adjustedDuration - 0.2,
        ease: easingFunction,
      })
    }
  }
  startInterval() {
    gsap.delayedCall(Math.random() * 0.3 + 0.25, () => {
      this.spawnBubble()
      this.startInterval()
    })
  }
}
