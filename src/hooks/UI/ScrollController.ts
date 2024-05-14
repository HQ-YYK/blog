import Experience from '@/hooks/Experience'
import EventBus from '@/hooks/Utils/EventBus'

export default class ScrollController extends EventBus {
  parameters: {
    multiplyTouchStrengthBy: () => number
    scrollDuration: () => 0.6 | 0.8
    scrollEase: () => any
    verticalSwipeMaximumSinceStart: number
  }
  sizes: any
  scrollY: number
  events: any[]
  domElements: {
    scrollContainer: HTMLElement | null
    logoWhiteBackground: HTMLElement | null
  }
  experience: Experience
  camera: any
  landingPage: any
  time: any
  background: any
  gestures: any
  transition: any
  sounds: any
  waypoints: any
  scrollIcon: any
  contactScene: any
  previousTouchDistance: number
  lastWheelUp: any
  contentScrollTo: any
  aboutContainer: any
  cameraRange: any
  actualScroll: any

  constructor() {
    super()
    this.parameters = {
      multiplyTouchStrengthBy: () => (this.sizes.portrait, 2),
      scrollDuration: () => (this.sizes.touch ? 0.6 : 0.8),
      scrollEase: () => (this.sizes.touch, Power2.easeOut),
      verticalSwipeMaximumSinceStart: 250,
    }
    this.scrollY = 0
    this.events = []
    this.domElements = {
      scrollContainer: document.getElementById('scroll-container'),
      logoWhiteBackground: document.getElementById('logo-white-background'),
    }

    this.experience = new Experience()
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.landingPage = this.experience.ui.landingPage
    this.time = this.experience.time
    this.background = this.experience.world.background
    this.gestures = this.experience.gestures
    this.transition = this.experience.ui.transition
    this.sounds = this.experience.sounds
    this.waypoints = this.experience.waypoints
    this.scrollIcon = this.experience.ui.scrollScrollIcon
    // this.contactScene = this.experience.world.contact.scene
    this.time = this.experience.time
    if (this.domElements.scrollContainer) {
      this.domElements.scrollContainer.style.top = '100%'
      setTimeout(() => {
        if (this.domElements.scrollContainer) {
          this.domElements.scrollContainer.classList.add(
            'scroll-container-transitions'
          )
        }
      })
    }
    this.setCameraRange()
    this.setAboutContainerDetails()
    this.setLogoOverlayHeight()
    this.gestures.on('scroll-down', () => this.attemptScroll(1))
    this.gestures.on('scroll-up', () => this.attemptScroll(-1))
    this.gestures.on('touch-down', () => {
      if (
        this.experience.time.current - this.gestures.touchStartTime <
        this.parameters.verticalSwipeMaximumSinceStart
      ) {
        /**
         *  this.gestures.touchDistanceY *
            this.parameters.multiplyTouchStrengthBy()
         */
        this.attemptScroll(1)
      }
    })
    this.gestures.on('touch-up', () => {
      if (
        this.experience.time.current - this.gestures.touchStartTime <
        this.parameters.verticalSwipeMaximumSinceStart
      ) {
        /**
         *  this.gestures.touchDistanceY *
            this.parameters.multiplyTouchStrengthBy()
         */
        this.attemptScroll(-1)
      }
    })
    this.landingPage.on('hide', () => {
      this.scrollY != 0 && (this.scrollY = 0)
    })
    this.sizes.on('portrait', () => this.onOrientationChange())
    this.sizes.on('landscape', () => this.onOrientationChange())
    this.previousTouchDistance = 0
    window.addEventListener('touchmove', (event) => {
      if (
        !(
          Math.abs(
            this.gestures.mTouchStartY - event.changedTouches[0].clientY
          ) <
            Math.abs(
              this.gestures.mTouchStartX - event.changedTouches[0].clientX
            ) && this.experience.ui.work.cards.isCurrentSwipeElement
        )
      ) {
        const mTouchY =
          this.gestures.mTouchStartY -
          event.changedTouches[0].clientY -
          this.previousTouchDistance
        this.previousTouchDistance += mTouchY
        this.attemptScroll(Math.sign(mTouchY))
      }
    })
    window.addEventListener('touchend', () => (this.previousTouchDistance = 0))
    this.stopScrollOnTouchStart()
  }
  attemptScroll(delta: number, event?: WheelEvent) {
    const normalizedDelta: number =
      delta * ((event?.deltaY ? event.deltaY : 100 * delta) * 0.9)
    if (this.scrollAllowed()) {
      if (delta === -1 && this.scrollY <= 20) {
        this.checkLandingPageOpening()
      } else if (this.scrollY !== 0 || delta === 1) {
        if (
          this.scrollY <
            this.sizes.getAbsoluteHeight(this.domElements.scrollContainer) -
              window.innerHeight ||
          delta === -1
        ) {
          this.scrollY += delta * normalizedDelta
          if (delta === -1) {
            this.lastWheelUp = this.time.current
          }
          this.performScroll()
          if (this.scrollIcon.visible) {
            this.scrollIcon.kill()
          }
        }
      }
      this.trigger(delta === -1 ? 'scroll-up' : 'scroll-down')
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
  }
  preventFromScrollingBottom() {
    return this.scrollY >=
      this.sizes.getAbsoluteHeight(this.domElements.scrollContainer) -
        window.innerHeight
      ? this.sizes.getAbsoluteHeight(this.domElements.scrollContainer) -
          window.innerHeight
      : this.scrollY
  }
  performScroll(
    duration: number = this.parameters.scrollDuration(),
    force: boolean = false
  ) {
    if (this.scrollAllowed() || force) {
      this.contentScrollTo = this.preventFromScrollingBottom()
      let scrollProgress = 0
      if (this.scrollY > this.aboutContainer.offset || this.sizes.portrait) {
        if (this.sizes.portrait) {
          scrollProgress =
            this.contentScrollTo /
            this.sizes.getAbsoluteHeight(this.domElements.scrollContainer)
          this.sounds.labAmbienceScroll(
            this.scrollY / this.aboutContainer.height
          )
        } else {
          scrollProgress =
            (this.contentScrollTo - this.aboutContainer.offset) /
            (this.sizes.getAbsoluteHeight(this.domElements.scrollContainer) -
              this.aboutContainer.height)
          this.sounds.labAmbienceScroll(
            (this.contentScrollTo - this.aboutContainer.offset) /
              (this.sizes.getAbsoluteHeight(this.domElements.scrollContainer) *
                0.7 -
                this.aboutContainer.height)
          )
        }
      } else {
        this.sounds.labAmbienceScroll(0)
      }
      this.contentScrollTo = this.contentScrollTo < 0 ? 0 : this.contentScrollTo
      scrollProgress = scrollProgress < 0 ? 0 : scrollProgress
      scrollProgress = scrollProgress > 1 ? 1 : scrollProgress

      gsap.to(this.domElements.scrollContainer, {
        y: -this.contentScrollTo,
        duration: duration,
        ease: this.parameters.scrollEase(),
      })

      if (scrollProgress >= 0) {
        gsap.to(this.background.material.uniforms.uOffset, {
          value: this.background.height * 1.9 * scrollProgress - 0.75,
          duration: duration,
          ease: this.parameters.scrollEase(),
        })
        gsap.to(this.camera.instance.position, {
          y:
            (this.cameraRange.bottom - this.cameraRange.top) * scrollProgress +
            this.cameraRange.top,
          duration: duration,
          ease: this.parameters.scrollEase(),
        })
        gsap.to(this.domElements.logoWhiteBackground, {
          y: -this.contentScrollTo - window.innerHeight,
          duration: duration,
          ease: this.parameters.scrollEase(),
        })
      }
    }
  }
  stopScrollOnTouchStart() {
    this.gestures.on('touch-start', () => {
      if (
        !this.landingPage.isAnimating &&
        !this.landingPage.visible &&
        !this.experience.ui.menu.main.visible &&
        !this.experience.ui.menu.main.isAnimating &&
        !this.transition.isShowing
      ) {
        gsap.killTweensOf(this.domElements.scrollContainer)
        gsap.killTweensOf(this.domElements.logoWhiteBackground)
        gsap.killTweensOf(this.camera.instance.position)
        gsap.killTweensOf(this.background.material.uniforms.uOffset)
        this.scrollY = this.actualScroll
      }
    })
  }
  onOrientationChange() {
    this.landingPage.visible || this.moveToTop()
  }
  moveToTop() {
    this.waypoints.moveToWaypoint(
      this.sizes.portrait ? 'scroll-start-portrait' : 'scroll-start',
      !1
    ),
      (this.scrollY = 0),
      this.performScroll(0),
      this.experience.ui.header.show(),
      this.experience.ui.about.animations.playHologramAnimation(),
      this.experience.ui.about.animations.resetCharacterToPosition()
  }
  setCameraRange() {
    this.cameraRange = {}
    const targetWaypoint = this.waypoints.waypoints.find(
      (waypoint: { name: string }) =>
        waypoint.name ===
        (this.sizes.portrait ? 'scroll-start-portrait' : 'scroll-start')
    )

    this.cameraRange.top = targetWaypoint.position.y

    this.cameraRange.bottom = this.sizes.portrait
      ? -54
      : -17 -
        ((this.sizes.getAbsoluteHeight(this.domElements.scrollContainer) -
          this.sizes.getAbsoluteHeight(
            document.getElementById('about-section')
          )) /
          window.innerHeight) *
          5
    // this.contactScene.setYPosition(
    //   this.cameraRange.bottom + (this.sizes.portrait ? 0.5 : 0)
    // )
  }
  setAboutContainerDetails() {
    this.aboutContainer = {}
    this.aboutContainer.domElement = document.getElementById('about-section')
    this.aboutContainer.offset =
      this.aboutContainer.domElement.clientHeight - window.innerHeight
    this.aboutContainer.height = this.aboutContainer.domElement.clientHeight
  }
  addEvent(
    height: number,
    direction: string,
    task: () => void,
    played: boolean = false
  ) {
    let executed = false
    this.events.push({
      height: height,
      direction: direction,
      task: task,
      check: () => {
        if (!executed) {
          if (
            (direction === 'up'
              ? height >= this.actualScroll && this.actualScroll !== 0
              : height <= this.actualScroll) &&
            !played
          ) {
            task()
            if (!played) {
              executed = true
            }
          }
        }
      },
    })
  }

  resetAllEvents() {
    this.events.forEach((event) => (event.played = false))
  }

  scrollAllowed() {
    return (
      !this.landingPage.isAnimating &&
      !this.landingPage.visible &&
      !this.experience.ui.menu.main.visible &&
      !this.experience.ui.menu.main.isAnimating &&
      !this.transition.isShowing
    )
  }
  checkLandingPageOpening() {
    ;(!this.lastWheelUp || this.time.current - this.lastWheelUp > 200) &&
      this.landingPage.show()
  }
  setLogoOverlayHeight() {
    const logoBackground = document.getElementById('logo-white-background')
    if (!logoBackground) return
    logoBackground.style.height = this.aboutContainer.height + 'px'
    logoBackground.style.marginTop = window.innerHeight - 15 + 'px'
  }

  resize() {
    this.events = []
    this.setAboutContainerDetails()
    this.setLogoOverlayHeight()
    this.setCameraRange()
    this.performScroll(0)
    setTimeout(() => {
      this.events.forEach((event) => {
        event.check()
      })
    }, 10)
  }

  update() {
    if (!this.domElements.scrollContainer) return
    const scrollContainerStyle = window.getComputedStyle(
      this.domElements.scrollContainer
    )
    const matrix = new WebKitCSSMatrix(scrollContainerStyle.transform)
    this.actualScroll = -matrix.m42
    this.events.forEach((event) => {
      if (this.scrollY !== this.actualScroll) {
        event.check()
      }
    })
  }
}
