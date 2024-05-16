import Experience from '@/hooks/Experience'
import { gsap } from 'gsap'

export default class Intervals {
  leftDesktopIntervalDuration: number
  experience: Experience
  resources: any
  mouse: any
  messagePopUp: any
  desktops: any
  sounds: any
  face: any
  animations: any
  blink: {
    intervalDuration: number
    phases: any[]
    allowedMaps: any[]
    currentMap?: any
    interval?: gsap.core.Tween
  }
  animation: any
  scrollIntervalCall: any
  isLeft: any
  leftDesktopIntervalCall: any
  leftDesktopIntervals: any[]

  constructor() {
    this.leftDesktopIntervalDuration = 12
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.mouse = this.experience.world.landingPage.mouse
    this.messagePopUp = this.experience.world.landingPage.messagePopUp
    this.desktops = this.experience.world.landingPage.desktops
    this.sounds = this.experience.sounds
    this.face = this.experience.world.character.face
    this.animations = this.experience.world.character.animations
    this.leftDesktopIntervals = []
    this.blink = {
      intervalDuration: 0,
      phases: [],
      allowedMaps: [],
    }
  }
  initBlink() {
    const interval = () =>
      gsap.delayedCall(this.blink.intervalDuration, () => {
        this.blink.currentMap = this.face.material.map
        if (this.blink.allowedMaps.includes(this.blink.currentMap)) {
          for (let i = 0; i < this.blink.phases.length + 1; i++) {
            gsap.delayedCall((i * 60) / 1000, () => {
              if (
                this.face.material.map === this.blink.phases[i - 1] ||
                i === 0
              ) {
                this.face.material.map =
                  i < this.blink.phases.length - 1
                    ? this.blink.phases[i]
                    : this.blink.currentMap
              }
            })
          }
          interval()
        }
      })

    interval()

    this.blink = {
      intervalDuration: 5,
      phases: [
        this.resources.items.characterBlink0Face,
        this.resources.items.characterBlink1Face,
        this.resources.items.characterBlink0Face,
      ],
      allowedMaps: [this.face.textures.default, this.face.textures.sleepy],
      interval: interval(),
    }
  }
  idle() {
    this.animation = this.experience.world.character.animations
    this.animation.actions.current._clip.name === 'wave' &&
      this.animation.play('idle', 0.4)
    this.scrollInterval()
    this.leftDesktopInterval()
  }
  scrollInterval() {
    this.scrollIntervalCall = gsap.delayedCall(Math.random() * 2 + 3, () => {
      if (
        this.experience.ui.landingPage.visible &&
        this.animation.actions.current._clip.name == 'idle'
      ) {
        this.desktops.scrollDesktop0()

        if (Math.random() <= 0.33) {
          gsap.delayedCall(0.7, () => {
            if (!this.isLeft && !this.experience.ui.landingPage.isAnimating) {
              this.desktops.scrollDesktop0()
            }
          })
        }
      }
      this.scrollInterval()
    })
  }
  leftDesktopInterval() {
    this.leftDesktopIntervalCall = gsap.delayedCall(
      this.leftDesktopIntervalDuration +
        this.animation.actions.leftDesktopAction._clip.duration +
        Math.random() * 4,
      () => {
        if (
          this.experience.ui.landingPage.visible &&
          !this.experience.ui.landingPage.isAnimating
        ) {
          this.leftDesktopIntervals = []
          this.isLeft = true
        }

        this.leftDesktopIntervals.push(
          gsap.delayedCall(0.18, () =>
            this.animation.play('leftDesktopAction', 0.3)
          )
        )
        this.messagePopUp.show()
        this.leftDesktopIntervals.push(
          gsap.delayedCall(1.7, () => {
            this.experience.ui.landingPage.isAnimating ||
              this.sounds.play('longKeyboard')
          })
        )
        this.leftDesktopIntervals.push(
          gsap.delayedCall(
            this.animation.actions.leftDesktopAction._clip.duration,
            () => {
              this.experience.ui.landingPage.isAnimating ||
                ((this.isLeft = false), this.animation.play('idle', 0.35))
            }
          )
        )
        this.leftDesktopInterval()
      }
    )
  }
  killLeftDesktopIntervals() {
    if (this.leftDesktopIntervals) {
      this.leftDesktopIntervals.forEach((leftDesktopInterval) =>
        leftDesktopInterval.kill(true)
      )
      this.leftDesktopIntervals = []
    }
  }
  update() {
    if (
      this.experience.ui.landingPage.visible &&
      (this.animations.actions.current._clip.name === 'idle' ||
        this.animations.actions.current._clip.name === 'left-desktop-action')
    ) {
      this.mouse.updateMouseSync()
    }
  }
}
