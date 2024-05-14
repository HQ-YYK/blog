import Experience from '@/hooks/Experience'

export default class ScrollController {
  experience: any
  scroll: any
  sizes: any
  element: any
  direction: any
  callback: any
  offset: any
  reset: any
  repeats: any
  constructor(options: any) {
    this.experience = new Experience()
    this.scroll = this.experience.ui.scroll
    this.sizes = this.experience.sizes

    if (options.setup && !this.sizes.touch) {
      options.setup()
    }

    this.element = options.element
    this.direction = options.direction ? options.direction : 'down'
    this.callback = options.callback ? options.callback : () => {}
    this.offset = options.offset ? options.offset : 0
    this.reset = options.reset ? options.reset : () => {}
    this.repeats = options.repeats ? options.repeats : false

    this.initEvent()
  }
  initEvent() {
    let offsetY = this.element && this.getY(this.element) + this.offset
    if (this.direction == 'up') {
      offsetY += window.innerHeight
    }
    this.scroll.addEvent(offsetY, this.direction, this.callback, this.repeats)
  }
  getY(element: HTMLElement) {
    if (!element) return
    let offsetY = 0
    offsetY += element.offsetTop
    let currentElement: HTMLElement | null = element
    let parentId: string | null = null
    while (currentElement) {
      parentId = currentElement.offsetParent
        ? currentElement.offsetParent.id
        : null
      if (parentId && parentId !== 'scroll-container') {
        currentElement = currentElement.offsetParent as HTMLElement
        offsetY += currentElement.offsetTop
      } else {
        break
      }
    }
    return offsetY - element.scrollTop + element.clientTop - window.innerHeight
  }
}
