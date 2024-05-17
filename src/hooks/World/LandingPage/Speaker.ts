import Experience from '@/hooks/Experience'

export default class Speaker {
  experience: Experience
  room: any
  sounds: any
  model: any

  constructor() {
    this.experience = new Experience()
    this.room = this.experience.world.landingPage.room
    this.sounds = this.experience.sounds
    this.model = this.room.speaker
    this.model.hoverIcon = 'pointer'
    this.model.onClick = () => this.clickEvent()
    window.requestAnimationFrame(() => {
      if (this.experience.ui && this.experience.ui.menu) {
        const menu = this.experience.ui.menu.main
        menu.on('open', () => {
          this.model.hoverIcon = null
          this.model.onClick = null
        })
        menu.on('hide', () => {
          this.model.hoverIcon = 'pointer'
          this.model.onClick = () => this.clickEvent()
        })
      }
    })
  }
  clickEvent() {
    if (!this.experience.ui.intro.clickCTAVisible) {
      const soundButton = this.experience.ui.soundButton
      soundButton.active ? soundButton.deactivate() : soundButton.activate()
      this.sounds.play('buttonClick')
    }
  }
}
