import { gsap } from 'gsap'
import Experience from '../Experience'

export default class SoundButton {
  domElements: {
    body: HTMLElement | null
    volume0: HTMLElement | null
    volume1: HTMLElement | null
    button: HTMLElement | null
  }
  experience: Experience
  sounds: any
  landingPage: any
  transition: any
  tweens: never[]
  active: any
  constructor() {
    this.domElements = {
      body: document.getElementById('sound-body-path'),
      volume0: document.getElementById('sound-volume-0-path'),
      volume1: document.getElementById('sound-volume-1-path'),
      button: document.getElementById('sound-button'),
    }
    this.experience = new Experience()
    this.sounds = this.experience.sounds
    this.landingPage = this.experience.ui.landingPage
    this.transition = this.experience.ui.transition
    this.tweens = []
    this.deactivate(false)
    this.domElements.button &&
      this.domElements.button.addEventListener('click', () => {
        if (!this.transition.isShowing) {
          this.active ? this.deactivate() : this.activate()
          this.sounds.play('buttonClick')
        }
      })
    window.addEventListener('keydown', (event) => {
      if (event.key === 'm' && !this.transition.isShowing) {
        this.active ? this.deactivate() : this.activate()
      }
    })
  }
  killTweens() {
    gsap.killTweensOf(this.domElements.body)
    gsap.killTweensOf(this.domElements.volume0)
    gsap.killTweensOf(this.domElements.volume1)
  }
  deactivate(flag: boolean = true) {
    this.active = false
    this.sounds.mute(true)
    this.killTweens()
    gsap.to(this.domElements.body, {
      x: 2,
      duration: 0.2,
    })
    gsap.to(this.domElements.volume0, {
      opacity: 0,
      duration: 0,
    })
    gsap.to(this.domElements.volume1, {
      opacity: 0,
      duration: 0,
    })
    this.domElements.button &&
      this.domElements.button.classList.add('gray-hover'),
      this.domElements.button &&
        this.domElements.button.classList.remove('orange-hover'),
      this.sounds.muteGroup(
        this.landingPage.visible ? 'lab' : 'landing',
        true,
        0
      )
    this.sounds.muteGroup(
      this.landingPage.visible ? 'landing' : 'lab',
      false,
      0
    )
    flag && this.updateLocalStorage()
  }
  activate(flag: boolean = true) {
    this.active = true
    this.sounds.mute(false)
    this.killTweens()
    gsap.to(this.domElements.body, {
      x: 0,
      duration: 0.2,
    })
    gsap.to(this.domElements.volume0, {
      opacity: 1,
      duration: 0,
    })
    gsap.to(this.domElements.volume1, {
      opacity: 1,
      duration: 0,
      delay: 0.1,
    })
    this.domElements.button &&
      this.domElements.button.classList.remove('gray-hover')
    this.domElements.button &&
      this.domElements.button.classList.add('orange-hover')
    this.landingPage.visible || this.sounds.labAmbienceScroll('recent')
    this.experience.ui.scroll.performScroll()
    flag && this.updateLocalStorage()
    this.sounds.playRoomAmbience()
  }
  updateLocalStorage() {
    localStorage.setItem('soundActive', this.active)
  }
}
