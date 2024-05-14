import Experience from '@/hooks/Experience'
import Transitions from './Transitions'
import scrollIcon from './ScrollIcon'
import LandingPage from './LandingPage'
import ScrollController from './ScrollController'
import Sections from './Sections'
import SoundButton from './SoundButton'

import Main from './Menu/Main'
import Items from './Menu/Items'

import Render from './About/Render'
import Animations from './About/Animations'
import ScrollLines from './About/ScrollLines'

import Header from './Header'
import HoverIcon from './HoverIcon'

import Intro from './Intro'

export default class Ui {
  experience: Experience
  resources: any
  world: any
  sizes: any
  transition: any
  scrollIcon: any
  scrollScrollIcon: any
  landingPage: any
  scroll: any
  sections: any
  soundButton: any
  menu: any
  about: any
  work: any
  contact: any
  header: any
  hoverIcon: any
  intro: any
  scrollbar: any

  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.world = this.experience.world
    this.sizes = this.experience.sizes
    this.resources.on('ready', () => {
      this.transition = new Transitions()
      this.scrollIcon = new scrollIcon(0)
      this.scrollScrollIcon = new scrollIcon(1)
      this.landingPage = new LandingPage()
      this.scroll = new ScrollController()
      this.sections = new Sections()
      this.soundButton = new SoundButton()
      this.menu = {}
      this.menu.main = new Main()
      this.menu.items = new Items()

      this.about = {}
      this.about.render = new Render()
      this.about.animations = new Animations()
      this.about.scrollLines = new ScrollLines()

      // this.work = {}
      // this.work.render = new lM()
      // this.work.cards = new rM()
      // this.work.scrollEvents = new bM()
      // this.contact = {}
      // this.contact.form = new yM()
      // this.contact.animationEvents = new xM()
      this.header = new Header()
      this.hoverIcon = new HoverIcon()
    })
    this.intro = new Intro()
  }
  resize() {
    this.scroll && this.scroll.resize()
    this.scrollbar && this.scrollbar.resize()
    this.menu && this.menu.main && this.menu.main.resize()
    this.sections && this.sections.resize()
    this.about && this.about.animations && this.about.animations.resize()
    // this.contact &&
    //   this.contact.animationEvents &&
    //   this.contact.animationEvents.resize()
    this.hoverIcon && this.hoverIcon.resize()
    // this.work && this.work.scrollEvents && this.work.scrollEvents.resize()
  }
  update() {
    this.scroll && this.scroll.update()
  }
}
