import { gsap } from 'gsap'
import Experience from '@/hooks/Experience'

export default class Items {
  domElements: {
    scrollContainer: HTMLElement | null
    landingPage: HTMLElement | null
    landingPageContent: HTMLElement | null
    menuContainer: HTMLElement | null
    logoWhiteBackground: HTMLElement | null
    profilePictureMaskRect: HTMLElement | null
  }
  items: (
    | { name: string; elements: (Element | null)[]; onOpen?: undefined }
    | { name: string; elements: Element[]; onOpen: () => any }
  )[]
  experience: any
  transition: any
  scrollIcon: any
  landingPage: any
  scroll: any
  renderer: any
  waypoints: any
  character: any
  menu: any
  background: any
  room: any
  sections: any
  sounds: any
  sizes: any
  contactAnimation: any
  cards: any

  constructor() {
    this.domElements = {
      scrollContainer: document.getElementById('scroll-container'),
      landingPage: document.getElementById('landing-page'),
      landingPageContent: document.getElementById('landing-page-section'),
      menuContainer: document.getElementById('menu-container'),
      logoWhiteBackground: document.getElementById('logo-white-background'),
      profilePictureMaskRect: document.getElementById(
        'about-profile-picture-mask-rect'
      ),
    }

    this.items = [
      {
        name: 'home',
        elements: [
          document.querySelectorAll('.menu-item')[0],
          document.getElementById('logo-click-container'),
        ],
      },
      {
        name: 'about',
        elements: [document.querySelectorAll('.menu-item')[1]],
        onOpen: () =>
          this.experience.ui.about.animations.playHologramAnimation(0.1),
      },
      {
        name: 'work',
        elements: [document.querySelectorAll('.menu-item')[2]],
      },
      {
        name: 'contact',
        elements: [
          document.querySelectorAll('.menu-item')[3],
          document.getElementById('landing-cta-button'),
        ],
      },
    ]
    this.experience = new Experience()
    this.transition = this.experience.ui.transition
    this.scrollIcon = this.experience.ui.scrollIcon
    this.landingPage = this.experience.ui.landingPage
    this.scroll = this.experience.ui.scroll
    this.renderer = this.experience.renderer
    this.waypoints = this.experience.waypoints
    this.character = this.experience.world.character
    this.menu = this.experience.ui.menu.main
    this.background = this.experience.world.background
    this.room = this.experience.world.landingPage.room
    this.sections = this.experience.ui.sections
    this.sounds = this.experience.sounds
    this.sizes = this.experience.sizes
    // this.contactAnimation = this.experience.world.contact.animation
    this.menu.on('open', () => this.updateActiveItem())
    this.addClickEventListeners()
  }
  addClickEventListeners() {
    this.items.forEach((item) => {
      item.elements.forEach((element) => {
        element &&
          element.addEventListener('click', () => {
            this.sounds.play('buttonClick')
            this.openItem(item)
          })
      })
    })
  }
  updateActiveItem() {
    if (this.landingPage.visible) {
      this.clearAllActiveItems()
      document
        .querySelectorAll('.menu-item')[0]
        .classList.add('active-menu-item')
    } else {
      this.items.forEach((item) => {
        if (item.name !== 'home') {
          const section = this.sections.sections.find(
            (section: { name: string }) => section.name === item.name
          ).y
          if (this.scroll.scrollY + window.innerHeight / 2 >= section) {
            this.clearAllActiveItems()
            document
              .querySelectorAll('.menu-item')
              [this.items.indexOf(item)].classList.add('active-menu-item')
            return
          }
        }
      })
    }
  }
  clearAllActiveItems() {
    document
      .querySelectorAll('.menu-item')
      .forEach((t) => t.classList.remove('active-menu-item'))
  }
  openItem(item: any) {
    if (!this.menu.visible) {
      this.clearAllActiveItems()
      const targetElement = item.elements[0] as HTMLElement
      if (
        !this.transition.isShowing &&
        !targetElement.classList.contains('active-menu-item') &&
        !(this.landingPage.visible && item.name == 'home')
      ) {
        this.transition.show()
        gsap.delayedCall(0.7, () => {
          this.transition.hide()
          this.setupItem(item)
        })
      }
    }
  }
  setupItem(item: any) {
    this.scrollIcon.kill()
    const itemName = item.name
    if (itemName !== 'about' && itemName !== 'home') {
      this.cards = this.experience.ui.work.cards
      this.cards.currentItemIndex = 2
      this.cards.updatePositions()
    }
    this.experience.ui.hoverIcon.setupDefault()
    this.experience.ui.hoverIcon.updateBaseColor('#FF923E')
    if (item.onOpen) {
      item.onOpen()
    }
    if (itemName !== 'home') {
      this.setupScrollContainerItem(item)
    } else {
      this.setupLandingPage()
    }
  }
  setupLandingPage() {
    this.landingPage.visible = true
    this.waypoints.moveToWaypoint(
      this.sizes.portrait ? 'landing-page-portrait' : 'landing-page',
      false
    )
    // TODO: fix this
    // this.contactAnimation.resetCharacter()
    this.sounds.muteGroup('landing', false)
    this.sounds.muteGroup('lab', true)
    this.room.baseModel.scale.set(1, 1, 1)
    this.room.shadow.material.uniforms.uOpacity.value = 1
    this.character.body.model.position.y = -5.7
    this.character.animations.play('idle', 0)
    this.character.body.updateWireframe('up')
    this.character.face.material.map = this.character.face.textures.default
    this.character.intervals.scrollIntervalCall &&
      this.character.intervals.scrollIntervalCall.restart(true)
    this.character.intervals.killLeftDesktopIntervals()
    this.experience.world.landingPage.mouse.moveToIdleStartPositon()
    this.domElements.landingPage &&
      this.moveWithoutTransition(this.domElements.landingPage, 'top', '0')
    this.domElements.scrollContainer &&
      this.moveWithoutTransition(
        this.domElements.scrollContainer,
        'top',
        '100%'
      )
    gsap.to(this.domElements.scrollContainer, {
      y: 0,
      duration: 0,
    })
    this.renderer.instance.setClearColor('#F5EFE6')
    this.background.material.uniforms.uOffset.value = -this.background.height
    gsap.to(this.domElements.logoWhiteBackground, {
      y: 0,
      duration: 0,
    })
    this.instantHideMenu()
    this.scroll.scrollY = 0
  }
  setupScrollContainerItem(item: any) {
    const section = this.sections.sections.find(
      (section: { name: any }) => section.name === item.name
    )
    this.landingPage.visible = false
    const scrollStartWaypoint = this.sizes.portrait
      ? 'scroll-start-portrait'
      : 'scroll-start'
    this.waypoints.moveToWaypoint(scrollStartWaypoint, false)
    // TODO: fix this
    // this.contactAnimation.resetCharacter()
    if (item.name !== 'about') {
      this.experience.ui.scrollScrollIcon.kill()
    } else {
      this.experience.ui.scrollScrollIcon.fade(true)
    }
    this.sounds.muteGroup('landing', true)
    if (item.name === 'contact') {
      if (!this.sizes.portrait) {
        // TODO: fix this
        // this.contactAnimation.playIdle()
        // gsap.delayedCall(1, () => this.contactAnimation.playTransition())
      }
      this.experience.ui.contact.animationEvents.resetPositions()
      this.experience.ui.work.scrollEvents.resetPositions()
    } else if (item.name === 'work') {
      // TODO: fix this
      // this.contactAnimation.playIdle()
      this.experience.ui.work.scrollEvents.resetPositions()
    } else {
      this.experience.ui.about.animations.resetCharacterToPosition()
    }
    this.scroll.resetAllEvents()
    this.domElements.landingPage &&
      this.moveWithoutTransition(this.domElements.landingPage, 'top', '-100%')
    this.domElements.scrollContainer &&
      this.moveWithoutTransition(this.domElements.scrollContainer, 'top', '0')
    this.renderer.instance.setClearColor('#EFE7DC')
    this.instantHideMenu()
    this.scroll.scrollY = section.y
    this.scroll.performScroll(0, 'force')
  }
  instantHideMenu() {
    this.menu.visible = false
    this.menu.resetMenuButton()
    this.domElements.scrollContainer &&
      this.moveWithoutTransition(this.domElements.scrollContainer, 'left', '0')
    this.domElements.landingPageContent &&
      this.moveWithoutTransition(
        this.domElements.landingPageContent,
        'left',
        '0'
      )
    this.domElements.menuContainer &&
      this.moveWithoutTransition(
        this.domElements.menuContainer,
        'right',
        `-${this.domElements.menuContainer.clientWidth}px`
      )
    gsap.to(this.domElements.logoWhiteBackground, {
      opacity: 1,
      duration: 0,
    })
  }
  moveWithoutTransition(
    element: HTMLElement,
    property: any,
    value: string
  ): void {
    element.classList.add('no-transition')
    element.style[property] = value
    element.offsetHeight // 触发重绘，以使样式立即生效
    setTimeout(() => {
      element.classList.remove('no-transition')
    })
  }
}
