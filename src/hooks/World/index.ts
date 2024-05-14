import Experience from '@/hooks/Experience'
import Fog from './Fog'
import Background from './Background'

import RoomShadow from './LandingPage/RoomShadow'
import Room from './LandingPage/Room'
import Desktops from './LandingPage/Desktops'
import Mouse from './LandingPage/Mouse'
import MessagePopUp from './LandingPage/MessagePopUp'
import Tones from './LandingPage/Tones'
import Speaker from './LandingPage/Speaker'
import Penguin from './LandingPage/Penguin'

// import Model from './Lab/Model'

import Body from './Character/Body'
import Face from './Character/Face'
import Animations from './Character/Animations'
import Intervals from './Character/Intervals'

export default class World {
  experience: Experience
  resources: any
  fog: any
  background: any
  landingPage: any
  lab: any
  contact: any
  character: any

  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.resources.on('ready', () => {
      this.fog = new Fog()
      this.background = new Background()

      this.landingPage = {}
      this.landingPage.roomShadow = new RoomShadow()
      this.landingPage.room = new Room()
      this.landingPage.desktops = new Desktops()
      this.landingPage.mouse = new Mouse()
      this.landingPage.messagePopUp = new MessagePopUp()
      this.landingPage.tones = new Tones()
      this.landingPage.speaker = new Speaker()
      this.landingPage.penguin = new Penguin()

      // this.lab = {
      //   model: new Model(),
      //   shadow: new Shadow(),
      //   tube: new Tube(),
      //   screen: new Screen(),
      //   drop: new Drop(),
      //   bubbles: new Bubbles(),
      //   testTubes: new TestTubes(),
      // }

      // this.contact = {
      //   scene: new Scene(),
      //   shadow = new Shadow(),
      //   david = new David(),
      //  animation: new Animation(),
      // }

      this.character = {}
      this.character.body = new Body()
      this.character.face = new Face()
      this.character.animations = new Animations()
      this.character.intervals = new Intervals()
    })
  }
  update() {
    if (this.character) {
      this.character.animations && this.character.animations.update()
      this.character.intervals && this.character.intervals.update()
      this.character.body && this.character.body.update()
    }
    // this.lab && this.lab.screen && this.lab.screen.update()
  }
}
