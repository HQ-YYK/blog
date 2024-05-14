import * as THREE from 'three'
import { CharacterModel, ExtendedObject3D } from '@/types/model'
import Experience from '@/hooks/Experience'

export default class Body {
  experience: Experience
  resources: any
  scene: any
  model: any
  armature: any
  armLeft: any
  armRight: any
  legRight: any
  legLeft: any
  shoeRight: any
  shoeLeft: any
  shoeWhiteRight: any
  shoeWhiteLeft: any
  sockRight: any
  sockLeft: any
  pantsBottomRight: any
  pantsBottomLeft: any
  pantsRight: any
  pantsLeft: any
  chest: any
  shoulderRight: any
  shoulderLeft: any
  throat: any
  head: any
  materials: CharacterModel
  bakedTexture: any
  wireframeParameters: { color: string }
  checkForWireframe: any

  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.scene = this.experience.scene
    this.checkForWireframe
    this.setModel()
    this.defineBodyParts()
    // defineMaterials
    const shirtMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.resources.items.shirtMatcap,
      transparent: true,
      fog: false,
    })
    const skinMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.resources.items.skinMatcap,
      transparent: true,
      fog: false,
    })
    const pantsMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.resources.items.pantsMatcap,
      transparent: true,
      fog: false,
    })
    const whiteMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.resources.items.whiteMatcap,
      transparent: true,
      fog: false,
    })

    this.bakedTexture = this.resources.items.bakedCharacterHeadTexture
    this.bakedTexture.flipY = false

    const bakedMaterial = new THREE.MeshBasicMaterial({
      map: this.bakedTexture,
      fog: false,
    })

    this.materials = {
      shirtMaterial,
      skinMaterial,
      pantsMaterial,
      whiteMaterial,
      bakedMaterial,
    }

    this.applyMaterials()
    this.deactiveFrustumCulling()

    //defineWireframe
    this.wireframeParameters = {
      color: '#009dff',
    }
    this.materials.wireframeMaterial = new THREE.MeshBasicMaterial({
      color: this.wireframeParameters.color,
      wireframe: true,
      opacity: 0.24,
      blending: 2,
      wireframeLinewidth: 0.01,
      fog: false,
    })

    this.defineWireframeAt()
    this.preloadWireframe()
  }
  setModel() {
    this.model = this.resources.items.characterModel.scene
    this.model.position.y = 2
    this.model.rotation.y = -Math.PI / 2
    this.scene.add(this.model)
  }
  defineBodyParts() {
    this.armature = this.model.children.find(
      (child: { name: string }) => child.name === 'armature'
    )
    this.armLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'arm-left'
    )
    this.armRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'arm-right'
    )
    this.legRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'leg-right'
    )
    this.legLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'leg-left'
    )
    this.shoeRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'shoe-right'
    )
    this.shoeLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'shoe-left'
    )
    this.shoeWhiteRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'shoe-white-right'
    )
    this.shoeWhiteLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'shoe-white-left'
    )
    this.sockRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'sock-right'
    )
    this.sockLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'sock-left'
    )
    this.pantsBottomRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'pants-bottom-right'
    )
    this.pantsBottomLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'pants-bottom-left'
    )
    this.pantsRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'pants-right'
    )
    this.pantsLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'pants-left'
    )
    this.chest = this.armature.children.find(
      (child: { name: string }) => child.name === 'chest'
    )
    this.shoulderRight = this.armature.children.find(
      (child: { name: string }) => child.name === 'shoulder-right'
    )
    this.shoulderLeft = this.armature.children.find(
      (child: { name: string }) => child.name === 'shoulder-left'
    )
    this.throat = this.armature.children.find(
      (child: { name: string }) => child.name === 'throat'
    )
    this.chest = this.armature.children.find(
      (child: { name: string }) => child.name === 'chest'
    )
    this.head = this.armature.children.find(
      (child: { name: string }) => child.name === 'head'
    )
  }
  deactiveFrustumCulling() {
    this.armature.traverse(
      (child: { type: string; frustumCulled: boolean }) => {
        child.type === 'SkinnedMesh' && (child.frustumCulled = !1)
      }
    )
  }
  applyMaterials() {
    this.armRight.material = this.materials.skinMaterial
    this.armLeft.material = this.materials.skinMaterial
    this.legRight.material = this.materials.skinMaterial
    this.legLeft.material = this.materials.skinMaterial
    this.shoeRight.material = this.materials.shirtMaterial
    this.shoeLeft.material = this.materials.shirtMaterial
    this.shoeWhiteRight.material = this.materials.whiteMaterial
    this.shoeWhiteLeft.material = this.materials.whiteMaterial
    this.sockRight.material = this.materials.whiteMaterial
    this.sockLeft.material = this.materials.whiteMaterial
    this.pantsBottomRight.material = this.materials.shirtMaterial
    this.pantsBottomLeft.material = this.materials.shirtMaterial
    this.pantsRight.material = this.materials.pantsMaterial
    this.pantsLeft.material = this.materials.pantsMaterial
    this.chest.material = this.materials.shirtMaterial
    this.shoulderRight.material = this.materials.shirtMaterial
    this.shoulderLeft.material = this.materials.shirtMaterial
    this.throat.material = this.materials.skinMaterial
    this.head.material = this.materials.bakedMaterial
  }
  defineWireframeAt() {
    this.legRight.wireframeAt = '-9.1'
    this.legLeft.wireframeAt = '-9.1'
    this.shoeRight.wireframeAt = '-9'
    this.shoeLeft.wireframeAt = '-9'
    this.shoeWhiteRight.wireframeAt = '-9'
    this.shoeWhiteLeft.wireframeAt = '-9'
    this.sockRight.wireframeAt = '-9'
    this.sockLeft.wireframeAt = '-9'
    this.pantsBottomRight.wireframeAt = '-9.2'
    this.pantsBottomLeft.wireframeAt = '-9.2'
    this.pantsRight.wireframeAt = '-10'
    this.pantsLeft.wireframeAt = '-10'
    this.chest.wireframeAt = '-11'
    this.shoulderRight.wireframeAt = '-11'
    this.shoulderLeft.wireframeAt = '-11'
    this.throat.wireframeAt = '-11.2'
    this.head.wireframeAt = '-11.5'
    this.armRight.wireframeAt = '-11.55'
    this.armLeft.wireframeAt = '-11.5'
  }
  preloadWireframe() {
    this.setAllToWireframe()
    setTimeout(() => this.setAllToOriginal())
  }
  setAllToOriginal() {
    this.model.children[0].traverse(
      (child: {
        name: string
        visible: boolean
        originalMaterial: any
        material: any
      }) => {
        child.name === 'face' && (child.visible = !0)
        child.originalMaterial && (child.material = child.originalMaterial)
      }
    )
  }
  setAllToWireframe() {
    this.model.children[0].traverse(
      (child: { name: string; originalMaterial: any; material: any }) => {
        if (child.name != 'face') {
          if (!child.originalMaterial) child.originalMaterial = child.material
          child.material = this.materials.wireframeMaterial
        }
      }
    )
  }
  update() {
    this.checkForWireframe && this.updateWireframe(this.checkForWireframe)
  }

  updateWireframe(direction: 'up' | 'down') {
    this.model.children[0].traverse(
      (child: THREE.Object3D & ExtendedObject3D) => {
        if (child.wireframeAt) {
          if (
            direction == 'up' &&
            this.model.position.y > child.wireframeAt - 5.7
          ) {
            this.updateToOriginalMaterial(child as THREE.Mesh)
          } else if (this.model.position.y < child.wireframeAt - 5.7) {
            this.updateToWireframeMaterial(child as THREE.Mesh)
          }
        }
      }
    )
  }
  updateToOriginalMaterial(child: THREE.Mesh & ExtendedObject3D) {
    child.name === 'face'
      ? (child.visible = !0)
      : (child.material = child.originalMaterial)
  }
  updateToWireframeMaterial(child: THREE.Mesh & ExtendedObject3D) {
    {
      child.name === 'face'
        ? (child.visible = !1)
        : (child.originalMaterial || (child.originalMaterial = child.material),
          (child.material = this.materials.wireframeMaterial))
    }
  }
}
