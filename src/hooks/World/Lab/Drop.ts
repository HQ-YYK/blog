import Experience from '@/hooks/Experience'
import { gsap, Power3 } from 'gsap'

export default class Drop {
  experience: Experience
  lab: any
  model: any

  constructor() {
    this.experience = new Experience()
    this.lab = this.experience.world.lab.model
    this.setModel()
    this.dropInterval()
  }
  setModel() {
    this.model = this.lab.model.children.find(
      (child: { name: string }) => child.name === 'drop'
    )
    this.model.material = this.lab.material
    this.model.position.x -= 0.055
    this.model.position.y = -0.035
  }
  dropInterval() {
    gsap.delayedCall(4, () => {
      gsap.fromTo(
        this.model.position,
        {
          y: 2.1,
        },
        {
          y: -0.02,
          duration: 1.7,
          ease: Power3.easeIn,
        }
      )
      gsap.fromTo(
        this.model.scale,
        {
          y: 0,
        },
        {
          y: 1,
          duration: 0.6,
          delay: 0.1,
        }
      )
      gsap.to(this.model.scale, {
        y: 0,
        duration: 0.05,
        delay: 1.65,
      })
      this.dropInterval()
    })
  }
}
