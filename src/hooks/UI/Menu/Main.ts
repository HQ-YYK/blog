import { gsap } from 'gsap'
import Experience from '@/hooks/Experience'
import EventBus from '@/hooks/Utils/EventBus'

export default class Main extends EventBus {
  visible: boolean
  initials: {
    cameraY: number
    scrollY: number
    logoBackgroundY: number
    backgroundY: number
  }
  isAnimating: boolean
  domElements: {
    menuButton: HTMLElement | null
    menuContainer: HTMLElement | null
    menuButtonBar0: HTMLElement | null
    menuButtonBar1: HTMLElement | null
    menuButtonBar2: HTMLElement | null
    landingPageContent: HTMLElement | null
    aboutSection: HTMLElement | null
    scrollContainer: HTMLElement | null
    logoWhiteBackground: HTMLElement | null
    workSection: HTMLElement | null
  }
  experience: Experience
  landingPage: any
  waypoints: any
  scroll: any
  labBackground: any
  camera: any
  gestures: any
  transition: any
  sounds: any
  sizes: any
  contactAnimation: any
  character: any
  yTween: any

  constructor() {
    super()
    this.visible = false
    this.initials = {
      cameraY: 0,
      scrollY: 0,
      logoBackgroundY: 0,
      backgroundY: 0,
    }
    this.isAnimating = false
    this.domElements = {
      menuButton: document.getElementById('menu-button'),
      menuContainer: document.getElementById('menu-container'),
      menuButtonBar0: document.getElementById('menu-button-bar-0'),
      menuButtonBar1: document.getElementById('menu-button-bar-1'),
      menuButtonBar2: document.getElementById('menu-button-bar-2'),
      landingPageContent: document.getElementById('landing-page-section'),
      aboutSection: document.getElementById('about-section'),
      scrollContainer: document.getElementById('scroll-container'),
      logoWhiteBackground: document.getElementById('logo-white-background'),
      workSection: document.getElementById('work-section'),
    }
    this.experience = new Experience()
    this.landingPage = this.experience.ui.landingPage
    this.waypoints = this.experience.waypoints
    this.scroll = this.experience.ui.scroll
    this.labBackground = this.experience.world.background
    this.camera = this.experience.camera
    this.gestures = this.experience.gestures
    this.transition = this.experience.ui.transition
    this.sounds = this.experience.sounds
    this.sizes = this.experience.sizes
    // TODO: fix this
    // this.contactAnimation = this.experience.world.contact.animation
    this.character = this.experience.world.character
    this.yTween = null
    this.setWidth()
    this.updatePositon()
    this.menuButtonClick()
    this.hideEvents()
    window.requestAnimationFrame(
      () =>
        this.domElements.menuContainer &&
        this.domElements.menuContainer.classList.add(
          'slide-out-left-transition'
        )
    )
    this.sizes.on('portrait', () => this.onOrientationChange())
    this.sizes.on('landscape', () => this.onOrientationChange())
  }
  onOrientationChange() {
    if (this.yTween) {
      this.yTween.kill()
      this.yTween = null
    }
  }
  menuButtonClick() {
    this.domElements.menuButton &&
      this.domElements.menuButton.addEventListener('click', () => {
        if (!this.isAnimating) {
          this.sounds.play('buttonClick')
          this.switchVisiblity()
        }
      })
  }
  switchVisiblity(isVisible = true, forceUpdate = false, transition = true) {
    if (
      (!this.isAnimating &&
        !this.landingPage.isAnimating &&
        !this.transition.isShowing) ||
      forceUpdate
    ) {
      this.visible = !this.visible
      this.updatePositon()
      if (this.sizes.portrait) {
        gsap.to(this.domElements.logoWhiteBackground, {
          opacity: this.visible ? 0 : 1,
          duration: 0.7,
        })
      }
      this.visible ? this.crossMenuButton() : this.resetMenuButton()
      if (isVisible && !this.sizes.portrait) {
        if (this.landingPage.visible) {
          this.landingPageTransition(transition)
        } else {
          this.scrollContainerTransition(transition)
        }
      }
      this.isAnimating = true
      gsap.delayedCall(0.9, () => (this.isAnimating = false))
      this.fadeScrollIcons(!this.visible)
    }
  }
  landingPageTransition(transition: boolean) {
    this.waypoints.moveToWaypoint(
      this.visible ? 'landing-menu' : 'landing-page',
      transition || this.isAnimating,
      0.9
    )
    if (this.domElements.landingPageContent) {
      this.domElements.landingPageContent.style.left = this.visible
        ? '-100%'
        : '0'
    }
  }
  scrollContainerTransition(transition: boolean) {
    if (this.visible) {
      if (
        this.scroll.scrollY + window.innerHeight / 2 <=
        this.sizes.getAbsoluteHeight(this.domElements.aboutSection) +
          this.sizes.getAbsoluteHeight(this.domElements.workSection) / 2
      ) {
        this.focusLabScene()
      } else {
        this.focusContactScene()
      }
      if (!this.domElements.scrollContainer) return
      this.domElements.scrollContainer.style.left = '-100%'
      this.setInitialPositions()
    } else {
      if (transition || this.isAnimating) {
        this.returnToInitialPosition()
      } else if (!this.sizes.portrait) {
        this.waypoints.moveToWaypoint(
          this.sizes.portrait ? 'scroll-start-portrait' : 'scroll-start'
        )
        this.yTween = gsap.to(this.camera.instance.position, {
          y: this.initials.cameraY,
          duration: 0.9,
          ease: Power2.easeInOut,
        })
      }
      if (!this.domElements.scrollContainer) return
      this.domElements.scrollContainer.style.left = '0'
    }
  }
  setInitialPositions() {
    this.initials.cameraY = this.camera.instance.position.y
    this.initials.scrollY = this.scroll.contentScrollTo
    this.initials.logoBackgroundY =
      -this.scroll.contentScrollTo - window.innerHeight
    this.initials.backgroundY =
      this.labBackground.material.uniforms.uOffset.value
  }
  returnToInitialPosition() {
    this.waypoints.moveToWaypoint(
      this.sizes.portrait ? 'scroll-start-portrait' : 'scroll-start'
    ),
      gsap.to(this.camera.instance.position, {
        y: this.initials.cameraY,
        duration: 0.9,
        ease: Power2.easeInOut,
      }),
      gsap.to(this.domElements.scrollContainer, {
        y: -this.initials.scrollY,
        duration: 0.9,
        ease: Power2.easeInOut,
      }),
      gsap.to(this.labBackground.material.uniforms.uOffset, {
        value: this.initials.backgroundY,
        duration: 0.9,
        ease: Power2.easeInOut,
      }),
      gsap.to(this.domElements.logoWhiteBackground, {
        y: this.initials.logoBackgroundY
          ? this.initials.logoBackgroundY
          : -window.innerHeight,
        duration: 0.9,
        ease: Power2.easeInOut,
      }),
      this.sounds.labAmbienceScroll('recent')
  }
  focusLabScene() {
    gsap.to(this.labBackground.material.uniforms.uOffset, {
      value: 0,
      duration: 0.9,
    })
    gsap.to(this.domElements.scrollContainer, {
      y: 0,
      duration: 0.9,
      ease: Power2.easeInOut,
    })
    gsap.to(this.domElements.logoWhiteBackground, {
      y: -window.innerHeight,
      duration: 0.9,
      ease: Power2.easeInOut,
    })
    this.waypoints.moveToWaypoint('lab-menu')
    this.sounds.muteGroup('lab', false, 0.4)
    this.character.body.model.position.y != -18.95 &&
      this.experience.ui.about.animations.resetCharacterToPosition()
  }
  focusContactScene() {
    gsap.to(this.labBackground.material.uniforms.uOffset, {
      value: this.labBackground.height,
      duration: 0.9,
    })
    if (!this.domElements.scrollContainer) return
    gsap.to(this.domElements.scrollContainer, {
      y: -this.domElements.scrollContainer.clientHeight + window.innerHeight,
      duration: 0.9,
      ease: Power2.easeInOut,
    })
    const contactWaypoint = this.waypoints.waypoints.find(
      (waypoint: { name: string }) => waypoint.name === 'contact-menu'
    )
    if (contactWaypoint) {
      contactWaypoint.position.y =
        this.experience.world.contact.scene.model.position.y + 5.8
    }
    this.waypoints.moveToWaypoint('contact-menu')
    // TODO: fix this
    // this.contactAnimation.playIdle()
    // gsap.delayedCall(1, () => this.contactAnimation.playTransition())
    window.requestAnimationFrame(() => {
      this.sounds.labAmbienceScroll(
        this.sizes.getAbsoluteHeight(this.domElements.scrollContainer)
      )
    })
  }
  hideEvents() {
    this.landingPage.on('hide', () => {
      this.visible && this.switchVisiblity(false)
    })
    this.landingPage.on('show', () => {
      this.visible && this.switchVisiblity(false)
    })
    this.gestures.on('scroll', () => {
      this.visible && this.switchVisiblity()
    })
  }
  fadeScrollIcons(isVisible: boolean) {
    const scrollContainers = document.querySelectorAll('.scroll-container')
    for (let i = 0; i < scrollContainers.length; i++) {
      const container = scrollContainers[i] as HTMLElement
      if (!(this.landingPage.visible && i === 1) || !this.landingPage.visible) {
        gsap.to(container, {
          opacity: isVisible ? 1 : 0,
        })
      }
    }
  }
  crossMenuButton() {
    gsap.to(this.domElements.menuButtonBar0, {
      rotation: 45,
      y: 9,
      duration: 0.1,
    }),
      gsap.to(this.domElements.menuButtonBar1, {
        opacity: 0,
        duration: 0.1,
      }),
      gsap.to(this.domElements.menuButtonBar2, {
        rotation: -45,
        y: -9,
        duration: 0.1,
      }),
      this.trigger('open')
  }
  resetMenuButton() {
    gsap.to(this.domElements.menuButtonBar0, {
      rotation: 0,
      y: 0,
      duration: 0.1,
    }),
      gsap.to(this.domElements.menuButtonBar1, {
        opacity: 1,
        duration: 0.1,
      }),
      gsap.to(this.domElements.menuButtonBar2, {
        rotation: 0,
        y: 0,
        duration: 0.1,
      }),
      this.trigger('hide')
  }
  setWidth() {
    if (this.domElements.menuContainer && this.domElements.aboutSection) {
      this.domElements.menuContainer.style.width =
        (window.innerWidth - this.domElements.aboutSection.clientWidth) / 2 +
        350 +
        'px'
    }
  }
  updatePositon() {
    if (this.domElements.menuContainer) {
      this.domElements.menuContainer.style.right = this.visible
        ? '0'
        : `-${this.domElements.menuContainer.clientWidth}px`
    }
  }
  resize() {
    this.setWidth(),
      this.updatePositon(),
      this.visible && this.switchVisiblity(true, true, false)
  }
}
