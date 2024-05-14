import Experience from '@/hooks/Experience'
import gsap from 'gsap'

export default class Transition {
  isShowing: boolean
  duration: number
  domElements: { container: HTMLElement | null; logo: HTMLElement | null }
  experience: Experience
  sounds: any

  constructor() {
    this.isShowing = false
    this.duration = 0.6
    this.domElements = {
      container: document.getElementById('transition-container'),
      logo: document.getElementById('loadig-animation-container'),
    }
    this.experience = new Experience()
    this.sounds = this.experience.sounds
  }
  show() {
    this.domElements.container?.classList.remove('hide')
    this.isShowing = true
    this.domElements.container?.classList.remove('hideTopTransition')
    this.domElements.container?.classList.remove('hideIntroTransition')
    this.domElements.container?.classList.add('showTransition')
    gsap.delayedCall(0.3, () => this.sounds.play('transition0'))
  }
  hide() {
    gsap.delayedCall(0.15, () => {
      this.domElements.container?.classList.remove('showTransition')
      this.domElements.container?.classList.add('hideTopTransition')
      gsap.delayedCall(this.duration, () => (this.isShowing = !1))
      gsap.delayedCall(0.2, () => this.sounds.play('transition1'))
    })
  }
}
