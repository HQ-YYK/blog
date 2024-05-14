import EventBus from './EventBus'
import Experience from '@/hooks/Experience'

export default class Sizes extends EventBus {
  touch: boolean
  portrait: boolean
  experience: any
  width: number
  height: number
  pixelRatio: number

  constructor() {
    super()
    this.touch = false
    this.portrait = false
    this.experience = new Experience()

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
      setTimeout(() => this.trigger('resize'))
    })
  }

  resize(): void {
    this.checkTouchDevice()
    this.checkPortrait()
  }

  checkPortrait(): void {
    const isPortrait = window.innerWidth / window.innerHeight <= 1.2
    if (isPortrait !== this.portrait) {
      this.portrait = isPortrait
      setTimeout(() => this.trigger(this.portrait ? 'portrait' : 'landscape'))
    }
  }

  checkTouchDevice(): void {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouchDevice !== this.touch) {
      this.touch = isTouchDevice
      setTimeout(() => this.trigger(this.touch ? 'touch' : 'no-touch'))
    }
  }

  getAbsoluteHeight(element: HTMLElement): number {
    if (!element) return 0
    const styles = window.getComputedStyle(element)
    const margin =
      parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)
    return Math.ceil(element.offsetHeight + margin)
  }

  getMarginTop(element: HTMLElement): number {
    if (!element) return 0
    const styles = window.getComputedStyle(element)
    return Math.ceil(parseFloat(styles.marginTop))
  }
}
