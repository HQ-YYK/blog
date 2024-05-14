import Experience from '../Experience'
import { gsap, Back } from 'gsap'

export default class Intro {
  parameters: { timeTillFinish: number }
  domElements: {
    container: HTMLElement | null
    overlay: HTMLElement | null
    landingPage: HTMLElement | null
    logo: HTMLElement | null
    scrollIcon: Element | null
  }
  experience: Experience
  resources: any
  resourcesReady: boolean
  room: any
  landingPage: any
  gestures: any
  character: any
  sounds: any
  tones: any
  hoverIcon: any
  soundButton: any
  clicked: boolean
  clickCTAVisible: boolean
  animationElements: NodeListOf<Element>
  closed: boolean

  constructor() {
    this.parameters = {
      timeTillFinish: 1.2,
    }
    this.domElements = {
      container: document.getElementById('intro-container'),
      overlay: document.getElementById('overlay-container'),
      landingPage: document.getElementById('landing-page'),
      logo: document.getElementById('intro-svg'),
      scrollIcon: document.querySelector('.scroll-icon'),
    }
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.resourcesReady = false
    this.clicked = false
    this.clickCTAVisible = false
    this.animationElements = document.querySelectorAll('.hover-spread')
    this.closed = false
    this.resources.on('ready', () => {
      this.resourcesReady = true
      this.room = this.experience.world.landingPage.room
      this.landingPage = this.experience.ui.landingPage
      this.gestures = this.experience.gestures
      this.character = this.experience.world.character
      this.sounds = this.experience.sounds
      this.tones = this.experience.world.landingPage.tones
      this.hoverIcon = this.experience.ui.hoverIcon
      this.soundButton = this.experience.ui.soundButton
      gsap.delayedCall(1.2, () => {
        this.close(),
          this.clicked &&
            localStorage.getItem('soundActive') != 'false' &&
            this.soundButton.activate(false)
      })
    }),
      localStorage.getItem('soundActive') != 'false'
        ? this.setupClickCTA()
        : this.killAnimation(),
      this.onWindowClick()
  }
  onWindowClick() {
    window.addEventListener('click', (event) => {
      if (!this.clicked) {
        this.clicked = true
        this.closeClickCTA()
        this.resourcesReady &&
          this.clicked &&
          localStorage.getItem('soundActive') != 'false' &&
          this.soundButton.activate(false)
        event.preventDefault()
        this.sounds && this.sounds.playRoomAmbience()
      }
    })
  }
  setupClickCTA() {
    const bodyDom = document.querySelector('body')
    const hoverIconDom = document.getElementById('hover-icon')
    if (!this.experience.sizes.touch && bodyDom && hoverIconDom) {
      bodyDom.classList.add('pointer')
      hoverIconDom.classList.add('clickCTA')
      this.clickCTAVisible = true
      this.startAnimation()
    }
  }
  startAnimation() {
    this.animationElements = document.querySelectorAll('.hover-spread')
    for (let e = 0; e < this.animationElements.length; e++) {
      gsap.fromTo(
        this.animationElements[e],
        {
          scale: 1,
        },
        {
          scale: 5,
          repeat: -1,
          duration: 1.5,
          delay: (e * 1.5) / 2,
          ease: Linear.easeNone,
        }
      )
      gsap.fromTo(
        this.animationElements[e],
        {
          opacity: 0.175,
        },
        {
          opacity: 0,
          repeat: -1,
          duration: 1.5,
          delay: (e * 1.5) / 2,
          ease: Power4.easeIn,
        }
      )
    }
  }
  killAnimation() {
    this.animationElements = document.querySelectorAll('.hover-spread')
    this.animationElements.forEach((animationElement) => {
      gsap.killTweensOf(animationElement)
      gsap.to(animationElement, {
        opacity: 0,
      })
      gsap.to(animationElement, {
        scale: 0,
      })
    })
  }
  closeClickCTA() {
    setTimeout(() => (this.clickCTAVisible = false))
    const bodyDom = document.querySelector('body')
    const hoverIconDom = document.getElementById('hover-icon')
    if (this.experience.sizes.touch && bodyDom) {
      bodyDom.classList.remove('pointer')
    }
    hoverIconDom && hoverIconDom.classList.remove('clickCTA')
    this.killAnimation()
  }
  close() {
    if (!this.closed) {
      this.closed = true
      if (!this.experience.sizes.touch && this.domElements.container) {
        this.domElements.container.style.cursor = 'unset'
      }
      gsap.to(this.hoverIcon.domElements.icon, {
        scale: 1,
        duration: 0.3,
        delay: 0.5,
      })
      this.hoverIcon.setupDefault()
      this.playIntro()
    }
  }
  playIntro() {
    gsap.delayedCall(0.1, () => {
      if (!this.domElements.container) return
      this.domElements.container.style.backgroundColor = 'transparent'
    })
    gsap.to(this.domElements.logo, {
      scale: 0,
      duration: 0.6,
      ease: Back.easeIn.config(2.5),
    })
    this.landingPage.playOpeningAnimation(0.62)
    this.room.bounceIn(0.45, true)
    this.character.animations.playIntroAnimation()
    gsap.delayedCall(this.parameters.timeTillFinish, () => this.finish())
    this.clicked && this.sounds.playRoomAmbience()
  }
  finish() {
    gsap.fromTo(
      this.domElements.overlay,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    )
    if (!this.domElements.container) return
    this.domElements.container.classList.add('hide')
    this.gestures.init()
  }
}
