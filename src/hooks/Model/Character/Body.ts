import { Mesh, Scene } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

import { CharacterModel, ExtendedObject3D } from "@/types/model"

const BodyFun = async (
  THREE: typeof import("three"),
  scene: Scene,
  gltfLoader: GLTFLoader,
  resources: Record<string, string>,
  checkForWireframe?: "up" | "down"
) => {
  const model = await gltfLoader.loadAsync(resources.characterModel)
  const bodyModel = model.scene
  bodyModel.position.y = 2
  bodyModel.rotation.y = - Math.PI / 4
  scene.add(bodyModel)

  // BodyParts
  const armature = bodyModel.children.find(child => child.name === "armature")
  if (!armature) return
  const armLeft = armature.children.find(child => child.name === "arm-left") as Mesh & ExtendedObject3D;
  const armRight = armature.children.find(child => child.name === "arm-right") as Mesh & ExtendedObject3D;
  const legRight = armature.children.find(child => child.name === "leg-right") as Mesh & ExtendedObject3D;
  const legLeft = armature.children.find(child => child.name === "leg-left") as Mesh & ExtendedObject3D;
  const shoeRight = armature.children.find(child => child.name === "shoe-right") as Mesh & ExtendedObject3D;
  const shoeLeft = armature.children.find(child => child.name === "shoe-left") as Mesh & ExtendedObject3D;
  const shoeWhiteRight = armature.children.find(child => child.name === "shoe-white-right") as Mesh & ExtendedObject3D;
  const shoeWhiteLeft = armature.children.find(child => child.name === "shoe-white-left") as Mesh & ExtendedObject3D;
  const sockRight = armature.children.find(child => child.name === "sock-right") as Mesh & ExtendedObject3D;
  const sockLeft = armature.children.find(child => child.name === "sock-left") as Mesh & ExtendedObject3D;
  const pantsBottomRight = armature.children.find(child => child.name === "pants-bottom-right") as Mesh & ExtendedObject3D;
  const pantsBottomLeft = armature.children.find(child => child.name === "pants-bottom-left") as Mesh & ExtendedObject3D;
  const pantsRight = armature.children.find(child => child.name === "pants-right") as Mesh & ExtendedObject3D;
  const pantsLeft = armature.children.find(child => child.name === "pants-left") as Mesh & ExtendedObject3D;
  const chest = armature.children.find(child => child.name === "chest") as Mesh & ExtendedObject3D;
  const shoulderRight = armature.children.find(child => child.name === "shoulder-right") as Mesh & ExtendedObject3D;
  const shoulderLeft = armature.children.find(child => child.name === "shoulder-left") as Mesh & ExtendedObject3D;
  const throat = armature.children.find(child => child.name === "throat") as Mesh & ExtendedObject3D;
  const head = armature.children.find(child => child.name === "head") as Mesh & ExtendedObject3D;

  // Texture
  const texture = new THREE.TextureLoader().load(resources.bakedCharacterHeadTexture)
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false

  // Materials
  const shirtMaterial = new THREE.MeshMatcapMaterial({
    matcap: new THREE.TextureLoader().load(resources.shirtMatcap),
    transparent: true,
    fog: false
  })
  const skinMaterial = new THREE.MeshMatcapMaterial({
    matcap: new THREE.TextureLoader().load(resources.skinMatcap),
    transparent: true,
    fog: false
  })
  const pantsMaterial = new THREE.MeshMatcapMaterial({
    matcap: new THREE.TextureLoader().load(resources.pantsMatcap),
    transparent: true,
    fog: false
  })
  const whiteMaterial = new THREE.MeshMatcapMaterial({
    matcap: new THREE.TextureLoader().load(resources.whiteMatcap),
    transparent: true,
    fog: false
  })

  const bakedMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    fog: false
  })

  const materials: CharacterModel = {
    shirtMaterial,
    skinMaterial,
    pantsMaterial,
    whiteMaterial,
    bakedMaterial,
    wireframeMaterial: null
  }


  // applyMaterials
  if (armRight) armRight.material = materials.skinMaterial;
  if (armLeft) armLeft.material = materials.skinMaterial;
  if (legRight) legRight.material = materials.skinMaterial;
  if (legLeft) legLeft.material = materials.skinMaterial;
  if (shoeRight) shoeRight.material = materials.shirtMaterial;
  if (shoeLeft) shoeLeft.material = materials.shirtMaterial;
  if (shoeWhiteRight) shoeWhiteRight.material = materials.whiteMaterial;
  if (shoeWhiteLeft) shoeWhiteLeft.material = materials.whiteMaterial;
  if (sockRight) sockRight.material = materials.whiteMaterial;
  if (sockLeft) sockLeft.material = materials.whiteMaterial;
  if (pantsBottomRight) pantsBottomRight.material = materials.shirtMaterial;
  if (pantsBottomLeft) pantsBottomLeft.material = materials.shirtMaterial;
  if (pantsRight) pantsRight.material = materials.pantsMaterial;
  if (pantsLeft) pantsLeft.material = materials.pantsMaterial;
  if (chest) chest.material = materials.shirtMaterial;
  if (shoulderRight) shoulderRight.material = materials.shirtMaterial;
  if (shoulderLeft) shoulderLeft.material = materials.shirtMaterial;
  if (throat) throat.material = materials.skinMaterial;
  if (head) head.material = materials.bakedMaterial


  // deactiveFrustumCulling
  armature.traverse(child => { child.type === "SkinnedMesh" && (child.frustumCulled = false) })

  // Wireframe
  const wireframeParameters = {
    color: "#009dff"
  }
  materials.wireframeMaterial = new THREE.MeshBasicMaterial({
    color: wireframeParameters.color,
    wireframe: true,
    opacity: .24,
    blending: 2,
    wireframeLinewidth: .01,
    fog: false
  })

  // Wireframe at
  legRight.wireframeAt = -9.1
  legLeft.wireframeAt = -9.1
  shoeRight.wireframeAt = -9
  shoeLeft.wireframeAt = -9
  shoeWhiteRight.wireframeAt = -9
  shoeWhiteLeft.wireframeAt = -9
  sockRight.wireframeAt = -9
  sockLeft.wireframeAt = -9
  pantsBottomRight.wireframeAt = -9.2
  pantsBottomLeft.wireframeAt = -9.2
  pantsRight.wireframeAt = -10
  pantsLeft.wireframeAt = -10
  chest.wireframeAt = -11
  shoulderRight.wireframeAt = -11
  shoulderLeft.wireframeAt = -11
  throat.wireframeAt = -11.2
  head.wireframeAt = -11.5
  armRight.wireframeAt = -11.55
  armLeft.wireframeAt = -11.5

  const setAllToWireframe = () => {
    bodyModel.children[0].traverse(child => {
      if (child instanceof THREE.Mesh) {
        if (child.name !== "face" && !('originalMaterial' in child)) {
          (child as ExtendedObject3D).originalMaterial = child.material;
          child.material = materials.wireframeMaterial;
        }
      }
    })
  }
  const setAllToOriginal = () => {
    bodyModel.children[0].traverse(child => {
      if (child.name === "face") {
        child.visible = true;
      }
      if (child instanceof THREE.Mesh) {
        if ('originalMaterial' in child) {
          child.material = child.originalMaterial;
        }
      }
    })
  }
  const preloadWireframe = () => {
    setAllToWireframe()
    setTimeout(() => setAllToOriginal())
  }

  preloadWireframe()

  const updateToOriginalMaterial = (child: THREE.Mesh & ExtendedObject3D) => {
    if (child.name === "face") {
      child.visible = true;
    } else {
      child.material = child.originalMaterial;
    }
  }

  const updateToWireframeMaterial = (child: THREE.Mesh & ExtendedObject3D) => {
    if (child.name === "face") {
      child.visible = false;
    } else {
      if (!child.originalMaterial) {
        child.originalMaterial = child.material;
      }
      child.material = materials.wireframeMaterial;
    }
  }

  const updateWireframe = (direction: "up" | "down") => {
    bodyModel.children[0].traverse((child: THREE.Object3D & ExtendedObject3D) => {
      if (child.wireframeAt) {
        if (direction === "up" && bodyModel.position.y > child.wireframeAt - 5.7) {
          updateToOriginalMaterial((child as THREE.Mesh));
        } else if (direction === "down" && bodyModel.position.y < child.wireframeAt - 5.7) {
          updateToWireframeMaterial((child as THREE.Mesh));
        }
      }
    });
  }

  const bodyUpdate = () => {
    checkForWireframe && updateWireframe(checkForWireframe)
  }


  return {
    bodyModel,
    armature,

    bodyUpdate,
  }
}

export default BodyFun