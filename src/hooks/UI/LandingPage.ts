import { gsap, Back, Power2 } from 'gsap'

import EventBus from '@/hooks/Utils/EventBus'
import Experience from '@/hooks/Experience'

export default class LandingPage extends EventBus {
  scrollAnimationDuration: number
  visible: boolean
  isAnimating: boolean
  reopeningEnabled: boolean
  domElements: {
    landingPage: HTMLElement | null
    scrollContainer: HTMLElement | null
    logoWhiteBackground: HTMLElement | null
    contentSvg: HTMLElement | null
    heading0: Element
    heading1: Element
    subheading: Element | null
    button: HTMLElement | null
    aboutMeButton: HTMLElement | null
  }
  experience: Experience
  gestures: any
  room: any
  background: any
  renderer: any
  character: any
  scrollIcon: any
  transiton: any
  sounds: any
  sizes: any
  waypoints: any
  // contactAnimation: any
  intervals: any

  constructor() {
    super()
    this.scrollAnimationDuration = 0.7
    this.visible = true
    this.isAnimating = false
    this.reopeningEnabled = true
    this.domElements = {
      landingPage: document.getElementById('landing-page'),
      scrollContainer: document.getElementById('scroll-container'),
      logoWhiteBackground: document.getElementById('logo-white-background'),
      contentSvg: document.getElementById('landing-content-svg'),
      heading0: document.querySelectorAll('.landing-headline')[0],
      heading1: document.querySelectorAll('.landing-headline')[1],
      subheading: document.querySelector('.landing-subheading'),
      button: document.getElementById('landing-cta-button'),
      aboutMeButton: document.getElementById('landing-more-about-me'),
    }

    this.experience = new Experience()
    this.gestures = this.experience.gestures
    this.room = this.experience.world.landingPage.room
    this.background = this.experience.world.background
    this.renderer = this.experience.renderer
    this.character = this.experience.world.character
    this.scrollIcon = this.experience.ui.scrollIcon
    this.transiton = this.experience.ui.transition
    this.sounds = this.experience.sounds
    this.sizes = this.experience.sizes
    this.waypoints = this.experience.waypoints
    // this.contactAnimation = this.experience.world.contact.animation
    this.intervals = this.experience.world.character.intervals
    this.gestures.on('scroll-down', () => this.hide())
    this.gestures.on('touch-down', () => this.hide())
    this.waypoints.moveToWaypoint(
      this.sizes.portrait ? 'landing-page-portrait' : 'landing-page',
      false
    ),
      this.sizes.on('portrait', () => this.onOrientationChange())
    this.sizes.on('landscape', () => this.onOrientationChange())
  }
  onOrientationChange() {
    this.visible &&
      this.waypoints.moveToWaypoint(
        this.sizes.portrait ? 'landing-page-portrait' : 'landing-page',
        false
      )
  }
  playOpeningAnimation(delay = 0) {
    if (!this.domElements.contentSvg) return
    gsap.fromTo(
      this.domElements.contentSvg,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay,
        duration: 0.4,
      }
    )

    if (this.sizes.portrait) {
      gsap.fromTo(
        this.domElements.contentSvg,
        {
          y: this.domElements.contentSvg.clientWidth * 0.6,
          scale: 0.6,
        },
        {
          y: 0,
          scale: 1,
          delay,
          duration: 0.6,
          ease: Back.easeOut.config(1.4),
        }
      )
    } else {
      gsap.fromTo(
        this.domElements.contentSvg,
        {
          x: this.domElements.contentSvg.clientWidth * 0.6,
          scale: 0.6,
        },
        {
          x: 0,
          scale: 1,
          delay,
          duration: 0.6,
          ease: Back.easeOut.config(1.4),
        }
      )
    }
  }
  hide() {
    if (
      this.visible &&
      !this.isAnimating &&
      !this.experience.ui.menu.main.visible &&
      !this.experience.ui.menu.main.isAnimating &&
      !this.transiton.isShowing &&
      this.reopeningEnabled
    ) {
      this.visible = true
      this.scrollIcon.kill()
      this.intervals.killLeftDesktopIntervals()
      this.lockScrolling()
      this.sounds.muteGroup('landing', true)
      this.sounds.muteGroup('lab', false)
      this.room.bounceOut()

      gsap.delayedCall(0.2, () => {
        if (this.domElements.landingPage && this.domElements.scrollContainer) {
          this.domElements.landingPage.style.top = '-100%'
          this.domElements.scrollContainer.style.top = '0'
          this.waypoints.moveToWaypoint(
            this.sizes.portrait ? 'scroll-start-portrait' : 'scroll-start',
            true,
            this.scrollAnimationDuration
          )
          gsap.to(this.background.material.uniforms.uOffset, {
            value: -0.75,
            ease: Power2.easeInOut,
            duration: this.scrollAnimationDuration,
          })
          gsap.to(this.domElements.logoWhiteBackground, {
            y: -window.innerHeight,
            ease: Power2.easeInOut,
            duration: this.scrollAnimationDuration,
          })
          gsap.delayedCall(0.7, () =>
            this.experience.ui.scrollScrollIcon.fade(true)
          )
          gsap.delayedCall(0.7, () =>
            this.renderer.instance.setClearColor('#EFE7DC')
          )
          this.experience.ui.about.animations.hologramPlayed = false
          this.experience.ui.about.animations.playHologramAnimation(0.5)
          this.character.animations.play('fallDown', 0.35)
          gsap.to(this.character.body.model.position, {
            y: -18.95,
            duration: this.scrollAnimationDuration,
            ease: Power2.easeInOut,
          })
          gsap.delayedCall(0.05, () => this.sounds.play('waterSplash'))
          this.character.face.material.map = this.character.face.textures.scared
          gsap.delayedCall(0.65, () =>
            this.character.animations.play('waterIdle', 1)
          )
          gsap.delayedCall(0.05, () => {
            for (let n = 0; n < 5; n++)
              this.experience.world.lab.bubbles.spawnBubble(
                Math.random() * 1.8 + 1.2,
                'back'
              )
          })
          this.character.body.checkForWireframe = 'down'
          gsap.delayedCall(
            this.scrollAnimationDuration,
            () => (this.character.body.checkForWireframe = null)
          )
          this.trigger('hide')
          this.lockReopening()
        }
      })
    }
  }
  show() {
    if (
      !this.visible &&
      !this.isAnimating &&
      !this.transiton.isShowing &&
      this.reopeningEnabled &&
      this.domElements.landingPage &&
      this.domElements.scrollContainer
    ) {
      this.visible = true
      this.intervals.killLeftDesktopIntervals()
      this.sounds.muteGroup('landing', false, 1)
      this.sounds.muteGroup('lab', true, 1)
      this.lockScrolling()
      this.experience.ui.scrollScrollIcon.fade(false)
      this.room.bounceIn(0.5)
      this.domElements.landingPage.style.top = '0'
      this.domElements.scrollContainer.style.top = '100%'
      this.waypoints.moveToWaypoint(
        this.sizes.portrait ? 'landing-page-portrait' : 'landing-page',
        !0,
        this.scrollAnimationDuration
      )

      gsap.to(this.background.material.uniforms.uOffset, {
        value: -2.75,
        duration: this.scrollAnimationDuration,
        ease: Power2.easeInOut,
      })
      gsap.to(this.domElements.logoWhiteBackground, {
        y: 0,
        ease: Power2.easeInOut,
        duration: this.scrollAnimationDuration,
      })
      this.renderer.instance.setClearColor('#F5EFE6')
      gsap.to(this.character.body.model.position, {
        y: -5.7,
        duration: this.scrollAnimationDuration,
        ease: Power2.easeInOut,
      })
      this.character.animations.play('idle', 0.7)
      this.experience.world.landingPage.mouse.moveToIdleStartPositon()
      this.character.face.material.map = this.character.face.textures.default
      this.character.body.checkForWireframe = 'up'
      gsap.delayedCall(
        this.scrollAnimationDuration,
        () => (this.character.body.checkForWireframe = null)
      )
      // this.contactAnimation.resetCharacter()
      this.sounds.play('waterUp')
      this.trigger('show')
      this.lockReopening()
    }
  }
  lockScrolling() {
    if (!this.isAnimating) {
      gsap.delayedCall(
        this.scrollAnimationDuration + 0.2,
        () => (this.isAnimating = false)
      )
    }
  }
  lockReopening() {
    if (this.reopeningEnabled) {
      gsap.delayedCall(
        this.scrollAnimationDuration + 0.5,
        () => (this.reopeningEnabled = true)
      )
    }
  }
}
