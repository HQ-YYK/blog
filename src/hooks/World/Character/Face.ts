import Experience from '@/hooks/Experience'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default class Face {
  experience: Experience
  character: any
  resources: any
  model: any
  textures: { default: any; scared: any; sleepy: any; hurt: any }
  material: any
  faceTransitions: any
  landingPage: any
  faceCall: any

  constructor() {
    this.experience = new Experience()
    this.character = this.experience.world.character
    this.resources = this.experience.resources

    // setFace
    this.model = this.character.body.armature.children.find(
      (child: { name: string }) => child.name === 'face'
    )
    this.model.wireframeAt = '-11.5'
    this.textures = {
      default: this.resources.items.characterDefaultFace,
      scared: this.resources.items.characterScaredFace,
      sleepy: this.resources.items.characterSleepyFace,
      hurt: this.resources.items.characterHurtFace,
    }
    this.material = new THREE.MeshBasicMaterial({
      map: this.textures.default,
      transparent: true,
      fog: false,
    })
    this.model.material = this.material

    //defineFaceTransitions
    this.faceTransitions = {
      smile: {
        allowedOutsideLanding: false,
        faces: [
          this.resources.items.characterSmile0Face,
          this.resources.items.characterSmile1Face,
          this.resources.items.characterSmile2Face,
        ],
      },
      contact: {
        allowedOutsideLanding: true,
        faces: [
          this.resources.items.characterScaredFace,
          this.resources.items.characterContact1Face,
          this.resources.items.characterContact2Face,
        ],
      },
      count: 0,
    }
  }
  updateFace(option: string) {
    this.landingPage = this.experience.ui.landingPage
    if (option == 'default') {
      if (!this.faceTransitions.current) return

      this.faceTransitions.count = this.faceTransitions.current.faces.length - 1

      const transition = () => {
        this.faceCall = gsap.delayedCall(0.03, () => {
          if (
            this.faceTransitions.current &&
            (this.landingPage.visible ||
              this.faceTransitions.current.allowedOutsideLanding ||
              this.landingPage.isAnimating)
          ) {
            this.model.material.map =
              this.faceTransitions.current.faces[this.faceTransitions.count]
            this.faceTransitions.count--
            this.faceTransitions.count == -1
              ? (this.model.material.map = this.textures.default)
              : transition()
          }
        })
      }
      transition()
    } else {
      this.faceTransitions.current = this.faceTransitions[option]
      this.faceTransitions.count = 0

      const transition = () => {
        this.faceCall = gsap.delayedCall(0.033, () => {
          if (
            this.landingPage.visible ||
            this.faceTransitions.current.allowedOutsideLanding
          ) {
            this.model.material.map =
              this.faceTransitions[option].faces[this.faceTransitions.count]
            this.faceTransitions.count--
            if (this.faceTransitions.count == -1) {
              this.model.material.map = this.textures.default
            } else {
              transition()
            }
          }
        })
      }
      transition()
    }
  }
}
