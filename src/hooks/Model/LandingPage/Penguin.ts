import { Group, Object3DEventMap } from "three"
import { gsap, Power2 } from "gsap";

const PenguinFun = (
  THREE: typeof import("three"),
  resources: Record<string, string>,
  penguinModel: any,
  roomModel: Group<Object3DEventMap>,
) => {
  const wings = [penguinModel.children[0], penguinModel.children[1]]

  const heartMaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load(resources.heartTexture),
    alphaTest: .1,
    opacity: 0,
    fog: false,
    rotation: .2
  })
  const heart = new THREE.Sprite(heartMaterial)
  heart.position.set(penguinModel.x + .07, 2.2, penguinModel.z + .07)
  heart.scale.set(.25, .25, .25)
  roomModel.add(heart)

  penguinModel.hoverIcon = "pointer"
  penguinModel.onClick = () => jump()

  const jump = () => {
    //   if (!isJumping) {
    //     isJumping = true
    //     gsap.delayedCall(.8, () => isJumping = false)
    //     gsap.to(penguinModel.position, {
    //       y: 2,
    //       yoyo: true,
    //       repeat: 1,
    //       duration: .4
    //     })
    //     gsap.to(wings[0].rotation, {
    //       x: .4,
    //       duration: .1,
    //       repeat: 7,
    //       yoyo: true
    //     })
    //     gsap.to(wings[1].rotation, {
    //       x: -.4,
    //       duration: .1,
    //       repeat: 7,
    //       yoyo: true
    //     })
    //     sounds.play("bird")
    //     animateHeart()
    //   }
    // }
  }

  const animateHeart = () => {
    gsap.fromTo(heart.position, {
      x: penguinModel.position.x + .03,
      y: 2.15,
      z: penguinModel.position.z + .03
    }, {
      x: penguinModel.position.x + .1,
      y: 2.7,
      z: penguinModel.position.z + .1,
      duration: .8,
      ease: Power2.easeOut
    })
    gsap.fromTo(heartMaterial, {
      opacity: 0
    }, {
      opacity: 1,
      duration: .3
    })
    gsap.fromTo(heartMaterial, {
      opacity: 1
    }, {
      opacity: 0,
      duration: .3,
      delay: .5
    })
  }

  return {

  }
}

export default PenguinFun