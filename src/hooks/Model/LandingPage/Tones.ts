import gsap from "gsap";

const TonesFun = (
  THREE: typeof import("three"),
  roomModel: { children: any; add: any; },
  resources: Record<string, string>
) => {
  const materials = [
    new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(resources.tone0Texture),
      alphaTest: .1,
      opacity: 0,
      fog: false
    }),
    new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(resources.tone1Texture),
      alphaTest: .1,
      opacity: 0,
      fog: false
    }),
    new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(resources.tone2Texture),
      alphaTest: .1,
      opacity: 0,
      fog: false
    })
  ]

  const sprites = [new THREE.Sprite(materials[0]), new THREE.Sprite(materials[1]), new THREE.Sprite(materials[2])]
  sprites.forEach(sprite => {
    sprite.scale.set(.3, .3, .3)
    sprite.position.set(-1.2, 2, -1.9),
      roomModel.add(sprite)
  })

  const moveSprite = (num: number) => {
    // if (sounds.active) {
    //   const sprite = sprites[num];
    //   gsap.fromTo(sprite.material, {
    //     opacity: 0
    //   }, {
    //     opacity: 1,
    //     duration: 1
    //   })

    //   gsap.fromTo(sprite.material, {
    //     opacity: 1
    //   }, {
    //     opacity: 0,
    //     duration: .5,
    //     delay: 2.5
    //   })
    //   gsap.fromTo(sprite.material, {
    //     rotation: -.15
    //   }, {
    //     rotation: .15,
    //     duration: 1,
    //     repeat: 4,
    //     yoyo: !0,
    //     ease: Power1.easeInOut
    //   })
    //   gsap.fromTo(sprite.position, {
    //     y: 2,
    //     x: -1.9
    //   }, {
    //     y: 3.5,
    //     x: -.9 - Math.random() * 2,
    //     duration: 3,
    //     ease: Power0.easeNone
    //   })
    // }
    // gsap.delayedCall(3, () => gsap.delayedCall(2, () => moveSprite(num)))
  }

  const startAnimations = () => {
    moveSprite(0)
    gsap.delayedCall(1.5, () => moveSprite(1))
    gsap.delayedCall(3, () => moveSprite(2))
  }


  gsap.delayedCall(2, () => startAnimations())
}

export default TonesFun