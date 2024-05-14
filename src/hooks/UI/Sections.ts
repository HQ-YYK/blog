import Experience from '../Experience'

export default class Sections {
  domElements: {
    aboutContainer: HTMLElement | null
    workContainer: HTMLElement | null
  }
  sections: {
    name: string
    y: number
    container: HTMLElement | null
    offset: () => number
  }[]
  sizes: any
  experience: Experience
  scroll: any
  gestures: any

  constructor() {
    this.domElements = {
      aboutContainer: document.getElementById('about-section'),
      workContainer: document.getElementById('work-section'),
    }

    this.sections = [
      {
        name: 'about',
        y: 0,
        container: document.getElementById('about-section'),
        offset: () => 0,
      },
      {
        name: 'work',
        y: 0,
        container: document.getElementById('work-section'),
        offset: () => 20,
      },
      {
        name: 'contact',
        y: 0,
        container: document.getElementById('contact-section'),
        offset: () => (this.sizes.portrait ? -100 : 0),
      },
    ]
    this.experience = new Experience()
    this.scroll = this.experience.ui.scroll
    this.gestures = this.experience.gestures
    this.sizes = this.experience.sizes
    this.setSectionsY()
  }
  setSectionsY() {
    this.sections.forEach((section) => {
      section.y = 0
      for (let i = 0; i < this.sections.length; i++) {
        if (i < this.sections.indexOf(section)) {
          section.y +=
            this.sections[i].container &&
            this.sizes.getAbsoluteHeight(this.sections[i].container)
        }
      }

      section.y +=
        section.container && this.sizes.getMarginTop(section.container)
      section.y += section.offset()
    })
  }
  resize() {
    this.setSectionsY()
  }
}
