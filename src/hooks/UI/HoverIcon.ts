import EventBus from '@/hooks/Utils/EventBus'
import Experience from '../Experience'
import { gsap, Power3 } from 'gsap'
import { hoverElementsData } from '@/data/Hover'

export default class HoverIcon extends EventBus {
  domElements: {
    icon: HTMLElement | null
    content: HTMLElement | null
    colorSwitchContainer: HTMLElement | null
    aboutSection: HTMLElement | null
  }
  hoverElements: { class: string; type: string; color: string }[]
  currentBaseColor: string
  cursorIsInsideDoc: boolean
  experience: Experience
  sizes: any
  scroll: any
  landingPage: any
  intro: any
  isHoveringCursorElement: boolean
  currentIcon: string

  constructor() {
    super()
    this.domElements = {
      icon: document.getElementById('hover-icon'),
      content: document.getElementById('hover-content'),
      colorSwitchContainer: document.getElementById('hover-icon-color-switch'),
      aboutSection: document.getElementById('about-section'),
    }
    this.hoverElements = hoverElementsData
    this.currentBaseColor = '#FF923E'
    this.cursorIsInsideDoc = true
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scroll = this.experience.ui.scroll
    this.landingPage = this.experience.ui.landingPage
    this.intro = this.experience.ui.intro
    this.isHoveringCursorElement = false
    this.currentIcon = 'pointer'
    this.setupDefault()
    this.setCursorLeavesDoc()
    this.setHoverColorSwitchHeight()
    this.applyEventListeners()
    this.applyColorSwitchEventListeners()
    if (!this.domElements.icon) return
    this.sizes.touch
      ? this.domElements.icon.classList.add('hide')
      : this.domElements.icon.classList.remove('hide')
    this.sizes.on(
      'touch',
      () => this.domElements.icon && this.domElements.icon.classList.add('hide')
    )
    this.sizes.on(
      'no-touch',
      () =>
        this.domElements.icon && this.domElements.icon.classList.remove('hide')
    )
    document.addEventListener('visibilitychange', () => {
      this.updateBaseColor('#FF923E', true)
    })
  }
  applyEventListeners() {
    this.hoverElements.forEach((hoverElement) => {
      const doms = document.querySelectorAll(hoverElement.class)
      for (let i = 0; i < doms.length; i++) {
        const dom = doms[i]
        dom.addEventListener('mouseenter', () => {
          if (!this.sizes.touch) {
            hoverElement.type == 'pointer'
              ? this.setupPointer(hoverElement, dom)
              : this.setupCircle(hoverElement, dom)
            this.isHoveringCursorElement = true
          }
        })
        dom.addEventListener('mouseleave', () => {
          if (!this.sizes.touch) {
            this.setupDefault()
            this.isHoveringCursorElement = false
          }
        })
      }
    })
    window.addEventListener('mousemove', (event: MouseEvent) => {
      if (!this.domElements.icon) return
      this.domElements.icon.style.opacity = '1'
      this.updatePosition(event)
      this.trigger('move', [], event)
      !this.isHoveringCursorElement &&
        !this.experience.raycaster.isHovering &&
        this.setupDefault()
    })
  }
  updatePosition(event: MouseEvent) {
    this.sizes.touch ||
      gsap.to(this.domElements.icon, {
        x: event.pageX,
        y: event.pageY,
        duration: 0.4,
        ease: Power3.easeOut,
      })
  }
  setCursorLeavesDoc() {
    document.addEventListener(
      'mouseleave',
      () => (this.cursorIsInsideDoc = false)
    ),
      document.addEventListener(
        'mouseenter',
        () => (this.cursorIsInsideDoc = true)
      )
  }
  applyColorSwitchEventListeners() {
    const handleColorSwitchEnter = () => {
        this.updateBaseColor('#34bfff')
      },
      handleColorSwitchLeave = () => {
        this.updateBaseColor('#FF923E')
      }
    if (!this.domElements.colorSwitchContainer) return
    this.domElements.colorSwitchContainer.addEventListener('mousemove', () =>
      handleColorSwitchEnter()
    )
    this.domElements.colorSwitchContainer.addEventListener('mousenter', () =>
      handleColorSwitchEnter()
    )
    if (!this.domElements.aboutSection) return
    this.domElements.aboutSection.addEventListener('mousemove', () =>
      handleColorSwitchEnter()
    )
    this.domElements.aboutSection.addEventListener('mouseenter', () =>
      handleColorSwitchEnter()
    )
    this.domElements.colorSwitchContainer.addEventListener('mouseleave', () =>
      handleColorSwitchLeave()
    )
    this.domElements.aboutSection.addEventListener('mouseleave', () =>
      handleColorSwitchLeave()
    )
  }
  updateBaseColor(color: string, isVisible?: boolean) {
    setTimeout(() => {
      const hidden = document.hidden
      const landingPageVisible = this.landingPage.visible

      if (
        isVisible ||
        (!hidden &&
          (this.cursorIsInsideDoc || landingPageVisible) &&
          this.currentBaseColor !== color &&
          this.experience.raycaster.isHovering)
      ) {
        this.currentBaseColor = color
        if (!this.domElements.icon) return
        this.domElements.icon.style.borderColor = color
      }
    })
  }
  setupDefault() {
    if (
      this.currentIcon != 'default' &&
      !this.isHoveringCursorElement &&
      !this.experience.raycaster.isHovering
    ) {
      this.currentIcon = 'default'
      if (!this.domElements.icon) return
      this.domElements.icon.style.borderWidth = '7px'
      this.domElements.icon.style.height = '0'
      this.domElements.icon.style.width = '0'
      this.domElements.icon.style.borderColor = this.currentBaseColor
      if (!this.domElements.content) return
      this.domElements.content.classList.add('hide')

      const bodyDom = document.querySelector('body')
      if (!this.sizes.touch && bodyDom) {
        bodyDom.style.cursor = ''
      }
    }
  }
  setupPointer(target?: any, element?: any) {
    if (this.currentIcon != 'pointer') {
      const isWorkItemContainer =
        target && target.className === '.work-item-container'
          ? element?.classList.contains('work-inactive-item-container')
          : true

      const isWorkDisabledNavigationButton = element
        ? !element.classList.contains('work-disabled-navigation-button')
        : true

      const isWorkItemGrayButton =
        target && target.className === '.work-item-gray-button'
          ? element?.classList.contains('gray-hover')
          : true

      if (
        isWorkItemContainer &&
        isWorkDisabledNavigationButton &&
        isWorkItemGrayButton
      ) {
        setTimeout(() => {
          if (!this.domElements.icon) return
          this.currentIcon = 'pointer'
          this.domElements.icon.style.borderWidth = '5px'
          this.domElements.icon.style.height = '18px'
          this.domElements.icon.style.width = '18px'
          this.domElements.icon.style.borderColor =
            target && target.color ? target.color : '#091434'

          this.domElements.icon.style.background = 'transparent'
          if (!this.domElements.content) return
          this.domElements.content.classList.add('hide')

          const bodyDom = document.querySelector('body')
          if (!this.sizes.touch && bodyDom) {
            bodyDom.style.cursor = 'pointer'
          }
        })
      }
    }
  }
  setupCircle(target: { type: string; color?: string }, element: any) {
    if (this.currentIcon !== 'circle') {
      const { type, color } = target
      const isForce = type === 'force'
      const isActiveMenuItem = element
        ? element.classList.contains('active-menu-item')
        : false

      if (isForce || !isActiveMenuItem) {
        this.currentIcon = 'circle'
        if (!this.domElements.icon) return
        this.domElements.icon.style.borderWidth = '0'
        this.domElements.icon.style.height = '55px'
        this.domElements.icon.style.width = '55px'
        this.domElements.icon.style.background = isForce
          ? '#FF923E'
          : color
          ? color
          : ''

        if (!this.domElements.content) return
        this.domElements.content.classList.remove('hide')

        const bodyDom = document.querySelector('body')
        if (this.intro.clickCTAVisbile && bodyDom) {
          bodyDom.style.cursor = ''
        }
      }
    }
  }
  setHoverColorSwitchHeight() {
    if (this.domElements.colorSwitchContainer) {
      this.domElements.colorSwitchContainer.style.height =
        this.scroll.aboutContainer.height +
        window.innerHeight * (this.sizes.portrait ? 0.03 : 0.15) +
        'px'
    }
  }
  resize() {
    this.setHoverColorSwitchHeight()
  }
}
