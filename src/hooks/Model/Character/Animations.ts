import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { gsap, Power2, Power1 } from "gsap"

import { TimeFun } from "@/hooks/Utils";
import { Actions } from "@/types/model"

let leftDesktopAction: any,
  idle: any,
  wave: any,
  fallDown: any,
  waterIdle: any,
  contact: any,
  standingIdle: any

const AnimationsFun = async (
  THREE: typeof import("three"),
  gltfLoader: GLTFLoader,
  resources: Record<string, string>,
  faceSet: any,
  roomSet: any,
  intervalsSet: any
) => {
  const model = await gltfLoader.loadAsync(resources.characterModel)
  const animationsModel = model.scene

  const mixer = new THREE.AnimationMixer(animationsModel)

  // defineActions
  // left-desktop-action
  const leftDesktopActionAnimation = model.animations.find(e => e.name === "left-desktop-action");
  if (leftDesktopActionAnimation) leftDesktopAction = mixer.clipAction(leftDesktopActionAnimation)
  // idle
  const idleAnimation = model.animations.find(e => e.name === "idle");
  if (idleAnimation) idle = mixer.clipAction(idleAnimation)
  // wave 
  const waveAnimation = model.animations.find(e => e.name === "wave");
  if (waveAnimation) wave = mixer.clipAction(waveAnimation)
  // fall-down
  const fallDownAnimation = model.animations.find(e => e.name === "fall-down");
  if (fallDownAnimation) fallDown = mixer.clipAction(fallDownAnimation)
  // water-idle
  const waterIdleAnimation = model.animations.find(e => e.name === "water-idle");
  if (waterIdleAnimation) waterIdle = mixer.clipAction(waterIdleAnimation)
  // contact-animation
  const contactAnimation = model.animations.find(e => e.name === "contact-animation");
  if (contactAnimation) contact = mixer.clipAction(contactAnimation)
  // standing-idle
  const standingIdleAnimation = model.animations.find(e => e.name === "standing-idle");
  if (standingIdleAnimation) standingIdle = mixer.clipAction(standingIdleAnimation)


  const actions: Actions = {
    leftDesktopAction,
    idle,
    wave,
    fallDown,
    waterIdle,
    contact,
    standingIdle,
    current: idle,
  }

  actions.leftDesktopAction.repetitions = 1
  actions.leftDesktopAction.clampWhenFinished = true
  actions.leftDesktopAction.allowedOutsideLanding = false

  actions.idle.loop = false;
  actions.idle.allowedOutsideLanding = false;

  actions.wave.repetitions = 1;
  actions.wave.clampWhenFinished = true;
  actions.wave.allowedOutsideLanding = false;

  actions.fallDown.repetitions = 1;
  actions.fallDown.clampWhenFinished = true;
  actions.fallDown.allowedOutsideLanding = true;

  actions.waterIdle.loop = false;
  actions.waterIdle.allowedOutsideLanding = true;

  actions.contact.repetitions = 1;
  actions.contact.clampWhenFinished = true;
  actions.contact.allowedOutsideLanding = true;

  actions.standingIdle.loop = false;
  actions.standingIdle.allowedOutsideLanding = true;
  actions.standingIdle.timeScale = 0.5; // 时间缩放，控制动画播放速度

  const play = (actionName: string, crossFadeDuration: number = 0.5): void => {
    const currentAction = actions[actionName];
    const previousAction = actions.current;

    const clipsAreDifferent = currentAction._clip.name !== previousAction._clip.name;
    const allowedOutsideLanding = currentAction.allowedOutsideLanding;
    const landingPageVisible = null
    // const landingPageVisible = this.experience.ui.landingPage.visible;

    if (clipsAreDifferent && (allowedOutsideLanding || landingPageVisible)) {

      currentAction.reset().play();
      previousAction.crossFadeTo(currentAction, crossFadeDuration);
      actions.current = currentAction;
    }
  };
  const playIntroAnimation = () => {
    gsap.fromTo(animationsModel.position,
      {
        y: 2
      },
      {
        y: -5.7,
        duration: 1.1,
        ease: Power2.easeIn,
        onComplete: () => {
          faceSet.material.map = faceSet.textures.default
          // this.sounds.play("chairImpact")
          // gsap.delayedCall(.2, () => this.sounds.play("chairDown"))
          gsap.to(roomSet.roomModel.rotation, {
            x: .12,
            z: -.12,
            ease: Power1.easeOut,
            duration: .16,
            yoyo: !0,
            repeat: 1
          })
        }
      }),
      faceSet.material.map = faceSet.textures.scared,
      gsap.delayedCall(1, () => {
        gsap.delayedCall(.37, () => {
          faceSet.updateFace("smile")
          intervalsSet.intervals.initBlink()
        }
        )
        gsap.delayedCall(actions.wave._clip.duration - 1.7, () => {
          // this.experience.ui.landingPage.visible && faceSet.updateFace("default")
        }
        )
      }
      )
    gsap.delayedCall(0, () => play("wave"))
    gsap.delayedCall(actions.wave._clip.duration, () => intervalsSet.intervals.idle())
  }

  const { timeData } = TimeFun()
  const updateAnimation = () => {
    mixer && timeData.delta < 50 && mixer.update(timeData.delta * .001)
  }

  return {
    animationsModel,
    actions,

    play,
    playIntroAnimation,
    updateAnimation
  }
}

export default AnimationsFun