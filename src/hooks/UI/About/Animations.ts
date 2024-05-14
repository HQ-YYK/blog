import Experience from '@/hooks/Experience'
import ScrollController from '@/hooks/Utils/ScrollController'

export default class Animations {
  hologramPlayed: boolean
  parameters: { skillsAdditionalDelay: number; aboutAdditionalDelay: number }
  domElements: {
    infoBackground: HTMLElement | null
    profilePictureMaskRect: HTMLElement | null
    profilePictureGradient: HTMLElement | null
    skillsSvg: HTMLElement | null
    headerGroup: HTMLElement | null
    skillsGroup: HTMLElement | null
    aboutGroup: HTMLElement | null
    skillsHeaderRect: HTMLElement | null
    aboutHeaderRect: HTMLElement | null
    aboutSection: HTMLElement | null
  }
  experience: Experience
  skills: any
  scroll: any
  sounds: any
  character: any
  lines: any[]
  isAnimating: boolean

  constructor() {
    this.hologramPlayed = false
    this.parameters = {
      skillsAdditionalDelay: 0.2,
      aboutAdditionalDelay: 0.45,
    }
    this.domElements = {
      infoBackground: document.getElementById('about-info-background'),
      profilePictureMaskRect: document.getElementById(
        'about-profile-picture-mask-rect'
      ),
      profilePictureGradient: document.getElementById(
        'about-profile-picture-gradient'
      ),
      skillsSvg: document.getElementById('skills-svg'),
      headerGroup: document.getElementById('about-svg-header'),
      skillsGroup: document.getElementById('about-svg-skills'),
      aboutGroup: document.getElementById('about-svg-about'),
      skillsHeaderRect: document.getElementById('skills-header-rect'),
      aboutHeaderRect: document.getElementById('about-header-rect'),
      aboutSection: document.getElementById('about-section'),
    }
    this.experience = new Experience()
    this.skills = this.experience.ui.about.render.skills
    this.scroll = this.experience.ui.scroll
    this.sounds = this.experience.sounds
    this.character = this.experience.world.character
    this.isAnimating = false
    this.addScrollEvents()
    this.lines = []
    this.setupLines()
  }
  setupLines() {
    const linesElements = document.querySelectorAll('.about-box-line')
    for (let i = 0; i < linesElements.length; i++) {
      const lineElement = linesElements[i] as SVGPathElement
      const length = lineElement.getTotalLength()
      this.lines.push({
        line: lineElement,
        length: length,
      })
      lineElement.style.strokeDasharray = length.toString()
    }
  }
  playHologramAnimation(delay: number = 0) {
    if (!this.hologramPlayed) {
      this.hologramPlayed = true
      this.isAnimating = true
      gsap.delayedCall(0.9, () => (this.isAnimating = false))
      gsap.delayedCall(0.3, () => this.sounds.play('hologram'))
      this.fadeInHologramUI(delay)
      if (!this.domElements.profilePictureMaskRect) return
      this.domElements.profilePictureMaskRect.classList.add('no-transition')
      this.domElements.profilePictureMaskRect.style.transform = 'translateY(0)'

      if (!this.domElements.profilePictureGradient) return
      this.domElements.profilePictureGradient.classList.add('no-transition')
      this.domElements.profilePictureGradient.style.transform = 'translateY(0)'
      gsap.delayedCall(delay, () => {
        this.animateHeaderBox()
        gsap.delayedCall(this.parameters.skillsAdditionalDelay, () =>
          this.animateSkillsBox()
        )
        gsap.delayedCall(this.parameters.aboutAdditionalDelay, () =>
          this.animateAboutBox()
        )
      })
    }
  }
  animateHeaderBox() {
    this.fillLine(0, 0.25)
    this.fillLine(1, 0.25)
    this.fillLine(2, 0.45)
    this.fillLine(3, 0.45)
    const upperTextDom = document.querySelectorAll('.about-header-upper-text'),
      lowerTextDom = document.querySelectorAll('.about-header-lower-text')
    for (let n = 0; n < upperTextDom.length; n++) {
      gsap.fromTo(
        upperTextDom[n],
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
          delay: 0.4 + n / 10,
        }
      ),
        gsap.fromTo(
          lowerTextDom[n],
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4,
            delay: 0.4 + n / 10,
          }
        )
    }
    gsap.fromTo(
      document.getElementById('about-header-background'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.7,
        ease: Power2.easeIn,
        delay: 0.35,
      }
    )
    gsap.fromTo(
      document.getElementById('about-profile-background'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.7,
        ease: Power2.easeIn,
      }
    )
    if (!this.domElements.profilePictureMaskRect) return
    this.domElements.profilePictureMaskRect.classList.remove('no-transition')
    this.domElements.profilePictureMaskRect.style.transform =
      'translateY(-205px)'
    if (!this.domElements.profilePictureGradient) return
    this.domElements.profilePictureGradient.classList.remove('no-transition')
    this.domElements.profilePictureGradient.style.transform =
      'translateY(-205px)'
  }
  animateSkillsBox() {
    this.fillLine(4, 0)
    this.fillLine(5, 0)
    for (let e = 0; e < this.skills.length; e++) {
      gsap.fromTo(
        document.getElementById('about-skill-container-' + e),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
          delay: e / 10,
        }
      )
      const skillBarElement = document.getElementById('about-skill-bar-' + e)

      if (skillBarElement && skillBarElement.style) {
        gsap.fromTo(
          skillBarElement.style,
          {
            width: '0%',
          },
          {
            width: this.skills[e].width,
            duration: 0.3,
            delay: e / 10,
          }
        )
      }
    }
    gsap.fromTo(
      document.getElementById('about-skills-background'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.7,
        ease: Power2.easeIn,
      }
    )
    gsap.fromTo(
      this.domElements.skillsHeaderRect,
      {
        width: 0,
      },
      {
        width: 500,
        duration: 0.5,
        ease: Power2.easeIn,
      }
    )
  }
  animateAboutBox() {
    this.fillLine(6, 0)
    this.fillLine(7, 0)
    gsap.fromTo(
      document.getElementById('about-about-background'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.7,
        ease: Power2.easeIn,
      }
    )
    gsap.fromTo(
      this.domElements.aboutHeaderRect,
      {
        width: 0,
      },
      {
        width: 500,
        duration: 0.5,
        ease: Power2.easeIn,
      }
    )
    const e = document.querySelectorAll('.about-icon')
    for (let i = 0; i < e.length; i++) {
      gsap.fromTo(
        e[i],
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          delay: i / 10,
        }
      )
    }

    const t = document.querySelectorAll('.about-text')
    for (let i = 0; i < t.length; i++) {
      gsap.fromTo(
        t[i],
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          delay: i / 10,
        }
      )
    }

    const n = document.querySelectorAll('.about-pixel-mask-rect')
    for (let i = 0; i < n.length; i++) {
      gsap.fromTo(
        n[i],
        {
          height: 0,
        },
        {
          height: 64,
          delay: i / 10,
        }
      )
    }
  }
  addScrollEvents() {
    new ScrollController({
      element: document.getElementById('work-section'),
      direction: 'up',
      callback: () => {
        this.playHologramAnimation(0.1), this.resetCharacterToPosition()
      },
      repeats: true,
    })
  }
  resetCharacterToPosition() {
    if (
      !this.experience.ui.landingPage.visible &&
      this.character.bodyModel.position.y !== -18.95 &&
      !this.experience.ui.landingPage.isAnimating
    ) {
      if (
        this.character.animations.actions.current._clip.name !== 'water-idle'
      ) {
        this.character.animations.play('waterIdle', 0)
      }

      this.character.bodyModel.position.y = -18.95
      this.character.body.updateWireframe('down')
      this.character.bodyModel.scale.set(1, 1, 1)
    }
  }
  fadeInHologramUI(delay: number) {
    gsap.fromTo(
      this.domElements.headerGroup,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
        delay,
      }
    )
    gsap.fromTo(
      this.domElements.skillsGroup,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
        delay: delay + this.parameters.skillsAdditionalDelay,
      }
    )
    gsap.fromTo(
      this.domElements.aboutGroup,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
        delay: delay + this.parameters.aboutAdditionalDelay,
      }
    )
  }
  fillLine(index: number, delay: number = 0) {
    const line = this.lines[index]
    gsap.fromTo(
      line.line,
      {
        strokeDashoffset: line.length,
      },
      {
        strokeDashoffset: 0,
        duration: 0.6,
        delay: delay,
      }
    )
  }
  resize() {
    this.addScrollEvents()
  }
}
