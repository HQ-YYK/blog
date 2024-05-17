import Experience from '@/hooks/Experience'
import { gsap, Power1 } from 'gsap'

export default class ScrollIcon {
  visible: boolean = true
  scrollIcon: any
  scrollBorder: any
  scrollWheel: any
  touchIcon: any
  experience: Experience
  sizes: any

  constructor(index: number) {
    this.scrollIcon = document.querySelectorAll('.scroll-container')[index]
    this.scrollBorder = document.querySelectorAll('.scroll-border-container')[
      index
    ]
    this.scrollWheel = document.querySelectorAll('.scroll-wheel')[index]
    this.touchIcon = document.querySelectorAll('.scroll-touch-icon')[index]
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.sizes.on('touch', () => this.setupTouchIcon())
    this.sizes.on('no-touch', () => this.setupScrollIcon())
    this.sizes.touch ? this.setupTouchIcon() : this.setupScrollIcon()
  }

  setupTouchIcon() {
    if (!this.scrollBorder) return
    this.scrollBorder.classList.add('hide')
    this.touchIcon.classList.remove('hide')
    gsap.killTweensOf(this.scrollWheel)
    gsap.fromTo(
      this.touchIcon,
      { y: 0 },
      {
        y: 6,
        duration: 1,
        ease: Power1.easeOut,
        repeat: -1,
        yoyo: true,
      }
    )
  }

  setupScrollIcon() {
    if (this.scrollBorder && this.touchIcon) {
      this.scrollBorder.classList.remove('hide')
      this.touchIcon.classList.add('hide')
      gsap.killTweensOf(this.touchIcon)
      gsap.fromTo(
        this.scrollWheel,
        { y: 0 },
        {
          y: 6,
          duration: 1,
          ease: Power1.easeIn,
          repeat: -1,
          yoyo: true,
        }
      )
    }
  }

  fade(show: boolean) {
    if (this.visible) {
      gsap.to(this.scrollIcon, {
        opacity: show ? 1 : 0,
        duration: 0.3,
      })
    }
  }

  kill() {
    if (this.visible) {
      this.fade(false)
      this.visible = false
      gsap.delayedCall(0.3, () => {
        gsap.killTweensOf(this.scrollWheel)
        this.scrollIcon.classList.add('hide')
      })
    }
  }
}
