import Experience from '@/hooks/Experience'

export default class ScrollLines {
  downLines: NodeListOf<Element>
  upLines: NodeListOf<Element>
  experience: Experience
  scroll: any
  aboutAnimations: any

  constructor() {
    this.downLines = document.querySelectorAll('.about-down-animation-line')
    this.upLines = document.querySelectorAll('.about-up-animation-line')
    this.experience = new Experience()
    this.scroll = this.experience.ui.scroll
    this.aboutAnimations = this.experience.ui.about.animations
    this.scroll.on('scroll-down', () => this.showLines(this.downLines))
    this.scroll.on('scroll-up', () => this.showLines(this.upLines))
  }
  showLines(lines: any) {
    if (
      !this.aboutAnimations.isAnimating &&
      this.aboutAnimations.hologramPlayed
    ) {
      lines.forEach((line: gsap.TweenTarget) => {
        gsap.to(line, {
          opacity: 0.8,
          duration: 0.3,
          onComplete: () => {
            gsap.to(line, {
              opacity: 0,
              duration: 0.5,
            })
          },
        })
      })
    }
  }
}
