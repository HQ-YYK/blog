import Experience from '@/hooks/Experience'
import * as THREE from 'three'

export default class TestTubes {
  parameters: { color: string; opacity: number }
  experience: Experience
  lab: any
  tubes: any
  material: THREE.MeshBasicMaterial

  constructor() {
    this.parameters = {
      color: '#004961',
      opacity: 0.05,
    }
    this.experience = new Experience()
    this.lab = this.experience.world.lab.model
    //setTubes
    this.tubes = this.lab.model.children.find(
      (child: { name: string }) => child.name === 'test-tubes'
    )
    this.material = new THREE.MeshBasicMaterial({
      color: this.parameters.color,
      transparent: true,
      opacity: this.parameters.opacity,
      blending: 5,
    })
    this.tubes.material = this.material
  }
}
