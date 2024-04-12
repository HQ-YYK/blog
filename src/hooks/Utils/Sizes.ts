import EventBus from './EventBus'

const sizesFun = () => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    touch: false,
    portrait: false
  }

  const checkTouchDevice = () => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice !== sizes.touch) {
      sizes.touch = isTouchDevice;
      setTimeout(() => {
        new EventBus().trigger(sizes.touch ? "touch" : "no-touch");
      });
    }
  }

  const checkPortrait = () => {
    const isPortraitOrientation = window.innerWidth / window.innerHeight <= 1.2;
    if (isPortraitOrientation !== sizes.portrait) {
      sizes.portrait = isPortraitOrientation;
      setTimeout(() => {
        new EventBus().trigger(sizes.portrait ? "portrait" : "landscape");
      });
    }
  }

  const getAbsoluteHeight = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const margin = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
    return Math.ceil(element.offsetHeight + margin);
  }

  const getTopMargin = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    return Math.ceil(parseFloat(computedStyle.marginTop));
  }

  const resize = () => {
    checkTouchDevice()
    checkPortrait()
  }

  resize()

  return {
    sizes,
    getAbsoluteHeight,
    getTopMargin,
  }
}

export default sizesFun