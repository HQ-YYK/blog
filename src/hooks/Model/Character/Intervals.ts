import { FunSerialization } from '@/hooks/Utils'

import { gsap } from "gsap"


const IntervalsFun = async (
  THREE: typeof import("three"),
  resources: Record<string, string>,
  roomSet: any,
  faceSet: any,
  animationsSet: any,
  soundsFun: any,
  modelDB: IDBDatabase,
) => {
  const blink = {
    intervalDuration: 5,
    phases: [
      new THREE.TextureLoader().load(resources.characterBlink0Face),
      new THREE.TextureLoader().load(resources.characterBlink1Face),
      new THREE.TextureLoader().load(resources.characterBlink0Face)],
    allowedMaps: [faceSet.textures.default, faceSet.textures.sleepy],
    currentMap: null,
  }
  const blinkIntervalHandler = gsap.delayedCall(blink.intervalDuration, () => {
    if (
      blink.currentMap = faceSet.material.map &&
      blink.allowedMaps.includes(blink.currentMap)
    ) {
      for (let i = 0; i < blink.phases.length + 1; i++) {
        gsap.delayedCall(i * 60 / 1000, () => {
          if (faceSet.material.map === blink.phases[i - 1] || i === 0) {
            faceSet.material.map =
              i < blink.phases.length - 1
                ? blink.phases[i]
                : blink.currentMap;
          }
        });
      }
    }
  });

  const startBlinking = () => {
    blinkIntervalHandler.play();
  };
  startBlinking()

  let isLeft = true

  const scrollIntervalCall = gsap.delayedCall(Math.random() * 2 + 3, () => {
    const landingPageFunString = sessionStorage.getItem('landingPageFun')
    const landingPageFun = landingPageFunString && JSON.parse(landingPageFunString, FunSerialization().funReviver)

    const isLandingPageVisible = landingPageFun.visible;
    const isIdleAnimationPlaying = animationsSet.actions.current._clip.name === "idle";
    const isLandingAnimating = landingPageFun.isAnimating

    if (isLandingPageVisible && isIdleAnimationPlaying) {
      // 如果满足条件，则滚动桌面
      roomSet.scrollDesktop0();

      // 以33%的概率再次触发滚动
      if (Math.random() <= 0.33) {
        // 创建稍后的滚动调用
        const delayedScrollCall = gsap.delayedCall(.7, () => {
          // 检查是否可以再次滚动
          const shouldScroll = !isLeft && !isLandingAnimating;
          if (shouldScroll) {
            roomSet.scrollDesktop0();
          }
        });
        delayedScrollCall.play()
      }
    }
  });

  const scrollInterval = () => {
    scrollIntervalCall.play()
  }
  scrollInterval()

  let leftDesktopIntervals: any[] = []

  const leftDesktopIntervalCall = gsap.delayedCall(12 + animationsSet.actions.leftDesktopAction._clip.duration + Math.random() * 4, () => {
    const landingPageFunString = sessionStorage.getItem('landingPageFun')
    const landingPageFun = landingPageFunString && JSON.parse(landingPageFunString, FunSerialization().funReviver)

    const isLandingPageVisible = landingPageFun.visible;
    const isLandingAnimating = landingPageFun.isAnimating;

    if (isLandingPageVisible && !isLandingAnimating) {
      isLeft = true
      leftDesktopIntervals.push(gsap.delayedCall(.18, () => animationsSet.play("leftDesktopAction", .3)))
      roomSet.messagePopUp.show()
      leftDesktopIntervals.push(gsap.delayedCall(1.7, () => {
        if (!isLandingAnimating) soundsFun.play("longKeyboard")
      }))
    }
    leftDesktopIntervals.push(gsap.delayedCall(animationsSet.actions.leftDesktopAction._clip.duration, () => {
      isLandingAnimating || (isLeft = false,
        animationsSet.play("idle", .35))
    }))
  })

  const leftDesktopInterval = () => {
    leftDesktopIntervalCall.play()
  }

  const idle = () => {
    animationsSet.actions.current._clip.name === "wave" && animationsSet.play("idle", .4)

    scrollInterval()
    leftDesktopInterval()
  }

  const killLeftDesktopIntervals = () => {
    if (leftDesktopIntervals) {
      leftDesktopIntervals.forEach(leftDesktopInterval => leftDesktopInterval.kill(true))
      leftDesktopIntervals = []
    }
  }
  const update = () => {
    const landingPageFunString = sessionStorage.getItem('landingPageFun')
    const landingPageFun = landingPageFunString && JSON.parse(landingPageFunString, FunSerialization().funReviver)

    const isLandingPageVisible = landingPageFun.visible;
    const isIdleAnimationPlaying = animationsSet.actions.current._clip.name === "idle";
    const leftDesktopAction = animationsSet.actions.current._clip.name === "left-desktop-action"
    if (isLandingPageVisible && (isIdleAnimationPlaying || leftDesktopAction)) {
      roomSet.mouse.updateMouseSync(modelDB)
    }
  }


  return {
    idle,
    killLeftDesktopIntervals,
    update
  }
}

export default IntervalsFun