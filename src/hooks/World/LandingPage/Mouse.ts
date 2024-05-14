import Experience from '@/hooks/Experience'
import * as THREE from 'three'

export default class Mouse {
  parameters: { leftBorder: number; rightBorder: number }
  experience: any
  room: any
  model: any

  constructor() {
    this.parameters = {
      leftBorder: 0.2,
      rightBorder: 0.6,
    }
    this.experience = new Experience()
    this.room = this.experience.world.landingPage.room
    this.setModel()
    this.setIdleStartPosition()
  }
  setModel() {
    this.model = this.room.model.children.find(
      (child: { name: string }) => child.name === 'mouse'
    )
    this.room.baseModel.add(this.model)
    this.model.position.x += 0.15
    this.model.position.z += 0.07
  }
  setIdleStartPosition() {
    this.model.idleStartPosition = {
      x: this.model.position.x,
      z: this.model.position.z,
    }
  }
  moveToIdleStartPositon() {
    this.model.position.x = this.model.idleStartPosition.x
    this.model.position.z = this.model.idleStartPosition.z
  }
  updateMouseSync() {
    const worldPosition = new THREE.Vector3()
    const target =
      this.experience.world.character.body.model.children[0].children[20]
        .children[0].children[0].children[0].children[2].children[0].children[0]
        .children[0].children[0]

    const targetPosition = target.getWorldPosition(worldPosition)

    if (
      targetPosition.y < 1.63 - 5.7 &&
      targetPosition.y > 1.58 - 5.7 &&
      targetPosition.x > 0.2 &&
      targetPosition.x < 0.6
    ) {
      this.model.position.z = -targetPosition.x - 1.849
      this.model.position.x = targetPosition.z + 0.92
    }
  }
}
