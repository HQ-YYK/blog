import { Group, Object3DEventMap } from "three";
import { gsap } from "gsap";

const MessagePopUpFun = (
  THREE: typeof import("three"),
  roomModel: Group<Object3DEventMap>,
  resources: Record<string, string>,
  desktops: { notification: { material: gsap.TweenTarget; }; }
) => {
  const material = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load(resources.newMessageSprite),
    alphaTest: .1,
    opacity: 0,
    fog: false
  })
  const sprite = new THREE.Sprite(material);
  roomModel.add(sprite),
    sprite.position.set(-1.75, 3.5, 1.8)
  sprite.scale.set(.35, .35, .35)

  const messageshow = () => {
    // this.sounds.play("notification")
    gsap.fromTo(sprite.position, {
      y: 3.3
    }, {
      y: 4,
      duration: 2,
      ease: Power4.easeOut
    })

    gsap.fromTo(material, {
      opacity: 0
    }, {
      opacity: 1,
      duration: .5
    })

    gsap.fromTo(material, {
      opacity: 1
    }, {
      opacity: 0,
      duration: .5,
      delay: 1.3
    }),
      gsap.fromTo(desktops.notification.material, {
        opacity: 0
      }, {
        opacity: 1,
        duration: .2
      }),
      gsap.fromTo(desktops.notification.material, {
        opacity: 1
      }, {
        opacity: 0,
        duration: 1,
        delay: 2
      })
  }

  return {
    messageshow
  }
}

export default MessagePopUpFun