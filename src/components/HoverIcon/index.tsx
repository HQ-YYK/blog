import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { gsap, Linear, Power4, Power3 } from 'gsap';

import { SizesFun, EventBus } from '@/hooks/Utils'
import { hoverElementsData } from '@/data/Hover'

import './index.css'

let sizes: any,
  bodyElements: any,
  hoverIconElements: any,
  animationElements: any,
  overlayElements: any,
  contentElements: any,
  colorSwitchContainerElements: any,
  aboutSectionElements: any,
  currentIcon: any,
  cursorIsInsideDoc: boolean = false,
  currentBaseColor = '#FF923E'

const Index = forwardRef(
  ({ isHovering }: { isHovering: boolean },
    ref: React.Ref<any>
  ) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [clickCTAVisible, setClickCTAVisible] = useState(false)
    const [closed, setClosed] = useState(false)
    const [isHoveringCursorElement, setIsHoveringCursorElement] = useState(false)


    const onWindowClick = () => {
      if (!clicked) {
        setClicked(true)
        closeClickCTA()
      }
    }

    const setupClickCTA = () => {
      if (sizes.touch && bodyElements) {
        bodyElements.classList.remove("pointer")
      }
      hoverIconElements && hoverIconElements.classList.add("clickCTA")
      startAnimation()
    }

    const startAnimation = () => {
      for (let i = 0; i < animationElements.length; i++) {
        gsap.fromTo(animationElements[i],
          {
            scale: 1
          },
          {
            scale: 5,
            repeat: -1,
            duration: 1.5,
            delay: i * 1.5 / 2,
            ease: Linear.easeNone
          })
        gsap.fromTo(animationElements[i],
          {
            opacity: .175
          },
          {
            opacity: 0,
            repeat: -1,
            duration: 1.5,
            delay: i * 1.5 / 2,
            ease: Power4.easeIn
          })
      }
    }

    const killAnimation = () => {
      for (let i = 0; i < animationElements.length; i++) {
        gsap.fromTo(animationElements[i],
          {
            scale: 1
          },
          {
            scale: 5,
            repeat: -1,
            duration: 1.5,
            delay: i * 1.5 / 2,
            ease: Linear.easeNone
          })
        gsap.fromTo(animationElements[i],
          {
            opacity: .175
          },
          {
            opacity: 0,
            repeat: -1,
            duration: 1.5,
            delay: i * 1.5 / 2,
            ease: Power4.easeIn
          })
      }
    }
    const closeClickCTA = () => {
      setTimeout(() => setClickCTAVisible(false))
      if (!sizes.touch && bodyElements) {
        bodyElements.classList.remove("pointer")
      }
      hoverIconElements && hoverIconElements.classList.remove("clickCTA")
      killAnimation()
    }
    const close = () => {
      if (!closed) {
        setClosed(true)
        gsap.to(hoverIconElements, {
          scale: 1,
          duration: .3,
          delay: .5
        })
      }

      playIntro()
    }

    const playIntro = () => {
      // this.landingPage.playOpeningAnimation(.62)
      // this.room.bounceIn(.45, !0)
      // this.character.animations.playIntroAnimation()
      gsap.delayedCall(1.2, () => finish())
      // clicked && this.sounds.playRoomAmbience()
    }

    const finish = () => {
      gsap.fromTo(overlayElements,
        {
          opacity: 0
        }, {
        opacity: 1,
        duration: 1
      })
      // this.gestures.init()
    }

    useEffect(() => {
      const sizesFun = SizesFun()
      sizes = sizesFun.sizes
      bodyElements = bodyElements
      hoverIconElements = document.getElementById("hover-icon")
      animationElements = document.querySelectorAll(".hover-spread");
      overlayElements = document.getElementById("overlay-container")
      contentElements = document.getElementById("hover-content")
      colorSwitchContainerElements = document.getElementById("hover-icon-color-switch")
      aboutSectionElements = document.getElementById("about-section")

      setupDefault()
      setCursorLeavesDoc()
      setHoverColorSwitchHeight()
      applyEventListeners()
      applyColorSwitchEventListeners()


      gsap.delayedCall(1.2, () => {
        close()
        if (clicked && localStorage.getItem("soundActive") != "false") {
          // this.soundButton.activate(!1)
        }
      })

      localStorage.getItem("soundActive") != "false" ? setupClickCTA() : killAnimation()

      const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', onWindowClick);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', onWindowClick);
      };
    }, []);

    const setupDefault = () => {
      // if (currentIcon != "default" && !isHoveringCursorElement && !isHovering) {
      //   currentIcon = "default"
      //   hoverIconElements.style.borderWidth = "7px"
      //   hoverIconElements.style.height = "0"
      //   hoverIconElements.style.width = "0"
      //   hoverIconElements.style.borderColor = currentBaseColor
      //   contentElements.classList.add("hide")

      //   if (!sizes.touch && bodyElements) {
      //     bodyElements.style.cursor = ""
      //   }
      // }
    }

    const setCursorLeavesDoc = () => {
      document.addEventListener("mouseleave", () => cursorIsInsideDoc = true)
      document.addEventListener("mouseenter", () => cursorIsInsideDoc = false)
    }

    const setupPointer = (target?: any, element?: any) => {
      if (currentIcon != "pointer" && target) {
        const isWorkItemContainer = target.className === ".work-item-container" ?
          element?.classList.contains("work-inactive-item-container") : true

        const isWorkDisabledNavigationButton = element ?
          !element.classList.contains("work-disabled-navigation-button") : true;

        const isWorkItemGrayButton = target.className === ".work-item-gray-button" ?
          element?.classList.contains("gray-hover") : true;

        if (isWorkItemContainer && isWorkDisabledNavigationButton && isWorkItemGrayButton) {
          setTimeout(() => {
            currentIcon = "pointer"
            hoverIconElements.style.borderWidth = "5px"
            hoverIconElements.style.height = "18px"
            hoverIconElements.style.width = "18px"
            hoverIconElements.style.borderColor = target.color ? target.color : "#091434"
            hoverIconElements.style.background = "transparent"
            contentElements.classList.add("hide")
            if (!sizes.touch && bodyElements) {
              bodyElements.style.cursor = "pointer"
            }
          })
        }
      }
    }

    const setupCircle = (target: { type: string, color?: string }, element: any) => {
      if (currentIcon !== "circle") {
        const { type, color } = target;
        const isForce = type === "force";
        const isActiveMenuItem = element ? element.classList.contains("active-menu-item") : false;

        if (isForce || !isActiveMenuItem) {
          currentIcon = "circle";
          hoverIconElements.style.borderWidth = "0";
          hoverIconElements.style.height = "55px";
          hoverIconElements.style.width = "55px";
          hoverIconElements.style.background = isForce ? "#FF923E" : color ? color : "";
          contentElements.classList.remove("hide");
          if (!sizes.touch && bodyElements) {
            bodyElements.style.cursor = "";
          }
        }
      }
    }

    const applyEventListeners = () => {
      hoverElementsData.forEach(hoverElement => {
        const elements = document.querySelectorAll(hoverElement.class)
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i]
          element.addEventListener("mouseenter", () => {
            if (!sizes.touch) {
              hoverElement.type == "pointer" ? setupPointer(hoverElement, element) : setupCircle(hoverElement, element)
              setIsHoveringCursorElement(true)
            }
          })

          element.addEventListener("mouseleave", () => {
            if (!sizes.touch) {
              setupDefault()
              setIsHoveringCursorElement(false)
            }
          })

        }
      })

      window.addEventListener("mousemove", (event) => {
        hoverIconElements.style.opacity = 1
        updatePosition(event)
        EventBus.emit("move")
        !isHoveringCursorElement && !isHovering && setupDefault()
      })
    }

    const updatePosition = (event: MouseEvent) => {
      if (!sizes.touch) {
        const { pageX, pageY } = event
        gsap.to(hoverIconElements, {
          x: pageX,
          y: pageY,
          duration: .4,
          ease: Power3.easeOut
        })
      }
    }

    const updateBaseColor = (color: string, isVisible?: boolean) => {
      setTimeout(() => {
        const hidden = document.hidden
        // const landingPageVisible = landingPage.visible
        const landingPageVisible = true
        if (
          isVisible ||
          (!hidden && (cursorIsInsideDoc || landingPageVisible) && currentBaseColor !== color) && isHovering
        ) {
          currentBaseColor = color;
          hoverIconElements.style.borderColor = color;
        }
      });
    };

    const applyColorSwitchEventListeners = () => {
      const handleColorSwitchEnter = () => {
        updateBaseColor("#34bfff");
      };

      const handleColorSwitchLeave = () => {
        updateBaseColor("#FF923E");
      };

      colorSwitchContainerElements.addEventListener("mousemove", () => handleColorSwitchEnter()),
        colorSwitchContainerElements.addEventListener("mousenter", () => handleColorSwitchEnter()),
        aboutSectionElements.addEventListener("mousemove", () => handleColorSwitchEnter()),
        aboutSectionElements.addEventListener("mouseenter", () => handleColorSwitchEnter()),
        colorSwitchContainerElements.addEventListener("mouseleave", () => handleColorSwitchLeave()),
        aboutSectionElements.addEventListener("mouseleave", () => handleColorSwitchLeave())
    }

    const setHoverColorSwitchHeight = () => {
      // colorSwitchContainerElements.style.height = this.scroll.aboutContainer.height + window.innerHeight * (sizes.portrait ? .03 : .15) + "px"
    }

    const resize = () => {
      setHoverColorSwitchHeight()
    }

    // 暴露给父组件的属性---ref是必须项
    useImperativeHandle(ref, () => ({
      setupDefault,
      setupPointer,
    }))


    return (
      <div
        ref={ref}
        id="hover-icon"
        className='hover-icon'
        style={{ transform: `translate(-50%, -50%) translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        <svg id="hover-content" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" height="30" width="30"
          fill="white">
          <path id="arrow-path"
            d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z" />
        </svg>
        <div className="hover-spread"></div>
        <div className="hover-spread"></div>
      </div>
    );
  })

Index.displayName = 'HoverIcon';

export default Index;