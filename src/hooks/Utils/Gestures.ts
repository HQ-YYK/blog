import EventBus from './EventBus'
import Experience from '@/hooks/Experience'

export default class Gestures extends EventBus {
  experience: any
  currentHoveringElement: any
  mTouchStartY: number = 0
  mTouchStartX: number = 0
  touchStartTime: any
  mTouchEndY: number = 0
  mTouchEndX: number = 0
  touchDistanceY: number = 0
  touchDistanceX: number = 0

  constructor() {
    super()
    this.experience = new Experience()
  }

  init() {
    this.applyEventListeners()
    this.defineCurrentHoverElement()
  }

  applyEventListeners() {
    this.mousewheelOrKey = this.mousewheelOrKey.bind(this)
    this.touchStart = this.touchStart.bind(this)
    this.touchEnd = this.touchEnd.bind(this)

    document.addEventListener('touchstart', this.touchStart)
    document.addEventListener('touchend', this.touchEnd)
    document.addEventListener(
      'mousewheel',
      this.mousewheelOrKey as EventListener
    )
    document.addEventListener('wheel', this.mousewheelOrKey as EventListener)
    window.addEventListener('keydown', this.mousewheelOrKey as EventListener)
  }

  defineCurrentHoverElement() {
    window.addEventListener('mouseover', (event: MouseEvent) => {
      // if (event.path) {
      //   this.currentHoveringElement = event.path[0]
      // }

      const path = event.composedPath()
      if (path && path.length > 0) {
        this.currentHoveringElement = path[0]
      }
    })
  }

  mousewheelOrKey(event: WheelEvent | KeyboardEvent) {
    if (event instanceof WheelEvent) {
      if (event.deltaY > 0) {
        this.trigger('scroll-down')
      } else if (event.deltaY < 0) {
        this.trigger('scroll-up')
      }
    } else if (event instanceof KeyboardEvent) {
      if (event.keyCode == 40) {
        this.trigger('scroll-down')
      } else if (event.keyCode == 38) {
        this.trigger('scroll-up')
      }
    }
    this.trigger('scroll')
  }

  touchStart(event: TouchEvent) {
    this.mTouchStartY = event.changedTouches[0].clientY
    this.mTouchStartX = event.changedTouches[0].clientX
    this.trigger('touch-start')
    this.touchStartTime = this.experience.time.current
  }

  touchEnd(event: TouchEvent) {
    this.mTouchEndY = event.changedTouches[0].clientY
    this.mTouchEndX = event.changedTouches[0].clientX
    this.touchDistanceY = this.mTouchEndY - this.mTouchStartY
    this.touchDistanceX = this.mTouchEndX - this.mTouchStartX

    const e = 10
    const t = 80

    if (
      this.touchDistanceX < -t ||
      (this.touchDistanceX > t &&
        this.experience.ui.work.cards.isCurrentSwipeElement)
    ) {
      if (this.mTouchEndX < this.mTouchStartX) {
        this.trigger('swipe-right')
      } else if (this.mTouchEndX > this.mTouchStartX) {
        this.trigger('swipe-left')
      }
    } else if (this.touchDistanceY < -e || this.touchDistanceY > e) {
      if (this.mTouchEndY < this.mTouchStartY) {
        this.trigger('touch-down')
      } else if (this.mTouchEndY > this.mTouchStartY) {
        this.trigger('touch-up')
      }
    }
  }
}
