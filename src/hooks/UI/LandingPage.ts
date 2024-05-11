import { gsap, Back, Power2 } from 'gsap'

import EventBus from '@/hooks/Utils/EventBus'

let landingPageDom: any,
  scrollContainerDom: any,
  logoWhiteBackgroundDom: any,
  contentSvgDom: any,
  visible: boolean = true,
  isAnimating: boolean = false,
  reopeningEnabled: boolean = true

const scrollAnimationDuration = 0.7

const LandingPageFun = (
  cameraFun: any,
  sizes: any,
  modelFun: any,
  soundsFun: any,
  bgFun: any,
  rendererFun: any
) => {
  const onOrientationChange = () => {
    if (visible) {
      cameraFun.moveToWaypoint(
        sizes.portrait ? 'landing-page-portrait' : 'landing-page',
        false
      )
    }
  }

  const playOpeningAnimation = (delay: number = 0, gsap?: any) => {
    gsap.fromTo(
      contentSvgDom,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay,
        duration: 0.4,
      }
    )

    if (sizes.portrait) {
      gsap.fromTo(
        contentSvgDom,
        {
          y: contentSvgDom.clientWidth * 0.6,
          scale: 0.6,
        },
        {
          y: 0,
          scale: 1,
          delay,
          duration: 0.6,
          ease: Back.easeOut.config(1.4),
        }
      )
    } else {
      gsap.fromTo(
        contentSvgDom,
        {
          x: contentSvgDom.clientWidth * 0.6,
          scale: 0.6,
        },
        {
          x: 0,
          scale: 1,
          delay,
          duration: 0.6,
          ease: Back.easeOut.config(1.4),
        }
      )
    }
  }

  const lockScrolling = () => {
    reopeningEnabled = true
    gsap.delayedCall(
      scrollAnimationDuration + 0.2,
      () => (reopeningEnabled = false)
    )
  }

  const lockReopening = () => {
    reopeningEnabled = false
    gsap.delayedCall(
      scrollAnimationDuration + 0.5,
      () => (reopeningEnabled = true)
    )
  }

  const hide = () => {
    // const mainVisible = this.experience.ui.menu.main.visible
    const mainVisible = true
    // const mainIsAnimating = this.experience.ui.menu.main.isAnimating
    const mainIsAnimating = true
    // const isShowing = this.transiton.isShowing
    const isShowing = true

    if (
      visible &&
      !isAnimating &&
      !mainVisible &&
      !mainIsAnimating &&
      !isShowing &&
      reopeningEnabled
    ) {
      visible = false
      // this.scrollIcon.kill()
      modelFun.killLeftDesktopIntervals()
      lockScrolling()
      soundsFun.muteGroup('landing', true)
      soundsFun.muteGroup('lab', false)
      modelFun.room.bounceOut()

      gsap.delayedCall(0.2, () => {
        landingPageDom.style.top = '-100%'
        scrollContainerDom.style.top = '0'
        cameraFun.moveToWaypoint(
          sizes.portrait ? 'scroll-start-portrait' : 'scroll-start',
          true,
          scrollAnimationDuration
        )
        gsap.to(bgFun.material.uniforms.uOffset, {
          value: -0.75,
          ease: Power2.easeInOut,
          duration: scrollAnimationDuration,
        })
        gsap.to(logoWhiteBackgroundDom, {
          y: -window.innerHeight,
          ease: Power2.easeInOut,
          duration: scrollAnimationDuration,
        })
        // gsap.delayedCall(.7, () => this.experience.ui.scrollScrollIcon.fade(!0))
        gsap.delayedCall(0.7, () =>
          rendererFun.renderer.setClearColor('#EFE7DC')
        )
        // this.experience.ui.about.animations.hologramPlayed = false
        // this.experience.ui.about.animations.playHologramAnimation(.5)
        modelFun.animationsSet.play('fallDown', 0.35)
        gsap.to(modelFun.bodySet.model.position, {
          y: -18.95,
          duration: scrollAnimationDuration,
          ease: Power2.easeInOut,
        })
        gsap.delayedCall(0.05, () => soundsFun.play('waterSplash'))
        modelFun.faceSet.material.map = modelFun.faceSet.textures.scared
        gsap.delayedCall(0.65, () => modelFun.animations.play('waterIdle', 1))
        gsap.delayedCall(0.05, () => {
          for (let n = 0; n < 5; n++) {
            // this.experience.world.lab.bubbles.spawnBubble(Math.random() * 1.8 + 1.2, "back")
          }
        })
        modelFun.bodySet.checkForWireframe = 'down'
        gsap.delayedCall(
          scrollAnimationDuration,
          () => (modelFun.bodySet.checkForWireframe = null)
        )
        EventBus.emit('hide')
        lockReopening()
      })
    }
  }

  const show = () => {
    // const isShowing = this.transiton.isShowing
    const isShowing = true

    if (!visible && !isAnimating && !isShowing && reopeningEnabled) {
      visible = true
      modelFun.killLeftDesktopIntervals()
      soundsFun.muteGroup('landing', false, 1)
      soundsFun.muteGroup('lab', true, 1)
      lockScrolling()
      // this.experience.ui.scrollScrollIcon.fade(false)
      modelFun.room.bounceIn(0.5)
      landingPageDom.style.top = '0'
      scrollContainerDom.style.top = '100%'
      cameraFun.moveToWaypoint(
        sizes.portrait ? 'landing-page-portrait' : 'landing-page',
        true,
        scrollAnimationDuration
      )

      gsap.to(bgFun.material.uniforms.uOffset, {
        value: -2.75,
        duration: scrollAnimationDuration,
        ease: Power2.easeInOut,
      })
      gsap.to(logoWhiteBackgroundDom, {
        y: 0,
        ease: Power2.easeInOut,
        duration: scrollAnimationDuration,
      })
      rendererFun.renderer.setClearColor('#F5EFE6')
      gsap.to(modelFun.bodySet.model.position, {
        y: -5.7,
        duration: scrollAnimationDuration,
        ease: Power2.easeInOut,
      })
      modelFun.animations.play('idle', 0.7)
      // this.experience.world.landingPage.mouse.moveToIdleStartPositon()
      modelFun.face.material.map = modelFun.face.textures.default
      modelFun.bodySet.checkForWireframe = 'up'
      gsap.delayedCall(
        scrollAnimationDuration,
        () => (modelFun.bodySet.checkForWireframe = null)
      )
      // this.contactAnimation.resetCharacter()
      soundsFun.play('waterUp')
      EventBus.emit('show')
      lockReopening()
    }
  }

  const init = () => {
    landingPageDom = document.getElementById('landing-page')
    scrollContainerDom = document.getElementById('scroll-container')
    logoWhiteBackgroundDom = document.getElementById('logo-white-background')
    contentSvgDom = document.getElementById('landing-content-svg')

    cameraFun.moveToWaypoint(
      sizes.portrait ? 'landing-page-portrait' : 'landing-page',
      false
    )

    EventBus.on('portrait', onOrientationChange)
    EventBus.off('portrait', onOrientationChange)
    EventBus.on('landscape', onOrientationChange)
    EventBus.off('landscape', onOrientationChange)
  }

  return {
    init,
    hide,
    show,
    visible,
    playOpeningAnimation,
  }
}

export default LandingPageFun
