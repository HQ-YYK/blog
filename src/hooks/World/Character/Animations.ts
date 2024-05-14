import * as THREE from 'three'
import { gsap, Power2, Power1 } from 'gsap'

import Experience from '@/hooks/Experience'

export default class Animations {
  experience: Experience
  resources: any
  time: any
  chair: any
  resource: any
  model: any
  face: any
  sounds: any
  mixer: any
  actions: any

  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.chair = this.experience.world.landingPage.room.chair
    this.resource = this.resources.items.characterModel
    this.model = this.resource.scene
    this.face = this.experience.world.character.face
    this.sounds = this.experience.sounds
    this.setAnimations()
  }
  setAnimations() {
    this.mixer = new THREE.AnimationMixer(this.model)
    this.defineActions()
    this.actions.current = this.actions.idle
  }
  defineActions() {
    this.actions = {}
    this.actions.leftDesktopAction = this.mixer.clipAction(
      this.resource.animations.find(
        (animation: { name: string }) =>
          animation.name === 'left-desktop-action'
      )
    )
    this.actions.leftDesktopAction.repetitions = 1
    this.actions.leftDesktopAction.clampWhenFinished = true
    this.actions.leftDesktopAction.allowedOutsideLanding = false
    this.actions.idle = this.mixer.clipAction(
      this.resource.animations.find(
        (animation: { name: string }) => animation.name === 'idle'
      )
    )
    this.actions.idle.loop = THREE.LoopOnce
    this.actions.idle.allowedOutsideLanding = false
    this.actions.wave = this.mixer.clipAction(
      this.resource.animations.find(
        (animation: { name: string }) => animation.name === 'wave'
      )
    )
    this.actions.wave.repetitions = 1
    this.actions.wave.clampWhenFinished = true
    this.actions.wave.allowedOutsideLanding = false
    this.actions.fallDown = this.mixer.clipAction(
      this.resource.animations.find(
        (animation: { name: string }) => animation.name === 'fall-down'
      )
    )
    this.actions.fallDown.repetitions = 1
    this.actions.fallDown.clampWhenFinished = true
    this.actions.fallDown.allowedOutsideLanding = true
    this.actions.waterIdle = this.mixer.clipAction(
      this.resource.animations.find(
        (animation: { name: string }) => animation.name === 'water-idle'
      )
    )
    this.actions.waterIdle.loop = THREE.LoopOnce
    this.actions.waterIdle.allowedOutsideLanding = true
    this.actions.contact = this.mixer.clipAction(
      this.resource.animations.find(
        (animation: { name: string }) => animation.name === 'contact-animation'
      )
    )
    this.actions.contact.repetitions = 1
    this.actions.contact.clampWhenFinished = true
    this.actions.contact.allowedOutsideLanding = true
    this.actions.standingIdle = this.mixer.clipAction(
      this.resource.animations.find(
        (animation: { name: string }) => animation.name === 'standing-idle'
      )
    )
    this.actions.standingIdle.loop = THREE.LoopOnce
    this.actions.standingIdle.allowedOutsideLanding = true
    this.actions.standingIdle.timeScale = 0.5
  }
  play(actionName: string, crossFadeDuration: number = 0.5) {
    const clipsAreDifferent =
      this.actions[actionName]._clip.name !== this.actions.current._clip.name
    const allowedOutsideLanding = this.actions[actionName].allowedOutsideLanding

    if (
      clipsAreDifferent &&
      (allowedOutsideLanding || this.experience.ui.landingPage.visible)
    ) {
      this.actions[actionName].reset().play()
      this.actions.current.crossFadeTo(
        this.actions[actionName],
        crossFadeDuration
      )
      this.actions.current = this.actions[actionName]
    }
  }
  playIntroAnimation() {
    gsap.fromTo(
      this.model.position,
      {
        y: 2,
      },
      {
        y: -5.7,
        duration: 1.1,
        ease: Power2.easeIn,
        onComplete: () => {
          ;(this.face.material.map = this.face.textures.default),
            this.sounds.play('chairImpact'),
            gsap.delayedCall(0.2, () => this.sounds.play('chairDown')),
            gsap.to(this.chair.rotation, {
              x: 0.12,
              z: -0.12,
              ease: Power1.easeOut,
              duration: 0.16,
              yoyo: true,
              repeat: 1,
            })
        },
      }
    )
    this.face.material.map = this.face.textures.scared
    gsap.delayedCall(1, () => {
      gsap.delayedCall(0.37, () => {
        this.face.updateFace('smile')
        this.experience.world.character.intervals.initBlink()
      }),
        gsap.delayedCall(this.actions.wave._clip.duration - 1.7, () => {
          this.experience.ui.landingPage.visible &&
            this.face.updateFace('default')
        })
    })
    gsap.delayedCall(0, () => this.play('wave'))
    gsap.delayedCall(this.actions.wave._clip.duration, () =>
      this.experience.world.character.intervals.idle()
    )
  }
  update() {
    this.mixer &&
      this.time.delta < 50 &&
      this.mixer.update(this.time.delta * 0.001)
  }
}
