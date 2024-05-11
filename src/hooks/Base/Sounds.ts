import { Howl, Howler } from "howler";
import { gsap } from "gsap";

import { soundsData } from '@/data/Sounds'

let active = false,
  masterVolume = .5,
  roomAmbience: Howl,
  labAmbience: Howl

const SoundsFun = (sizes: { touch: any; }) => {
  const setMute = () => {
    const handleVisibilityChange = () => {
      if (active && document.hidden) {
        Howler.mute(true);
      } else if (active && !document.hidden) {
        Howler.mute(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
  }


  const setMasterVolume = () => {
    Howler.volume(masterVolume)
    window.requestAnimationFrame(() => {
      Howler.volume(masterVolume)
    })
  }

  const setupSounds = () => {
    soundsData.forEach(sound => {
      sound.howls = []
      sound.files.forEach(file => {
        const options: Howl = new Howl({
          src: file,
          volume: sound.volume,
          html5: sound.html5 ? sound.html5 : false
        })
        sound.howls.push(options)
      })
    })
  }

  const pauseAll = (hidden: boolean) => {
    soundsData.forEach(sound => {
      sound.howls.forEach(howl => {
        if (sound.name != "labAmbience" && sound.name != "roomAmbience") {
          if (hidden) {
            howl.pause()
          } else if (howl.seek() != 0 && howl.seek() != howl.duration()) {
            howl.play()
          }
        }
      })
    })
  }

  const setRoomAmbience = () => {
    const roomAmbienceItem = soundsData.find(sound => sound.name === "roomAmbience")
    if (roomAmbienceItem) {
      roomAmbience = roomAmbienceItem.howls[0];
      roomAmbience.loop(true);
      roomAmbience.name = "roomAmbience";
    }
  }

  const setLabAmbience = () => {
    const labAmbienceItem = soundsData.find(sound => sound.name === "labAmbience")
    if (labAmbienceItem) {
      labAmbience = labAmbienceItem.howls[0];
      labAmbience.loop(true);
      labAmbience.volume(0)
      labAmbience.name = "labAmbience"
      labAmbience.play()
    }
  }

  setMute()
  setMasterVolume()
  setupSounds()

  document.addEventListener("visibilitychange", () => pauseAll(document.hidden))

  setRoomAmbience()
  setLabAmbience()

  const playRoomAmbience = () => {
    if (roomAmbience) {
      roomAmbience.play()
    }
  }

  const labAmbienceScroll = (scrollAmountOrRecent: number | string): void => {
    if (active) {
      let scrollPercentage: number;
      if (typeof scrollAmountOrRecent === "number") {
        scrollPercentage = scrollAmountOrRecent;
      } else if (scrollAmountOrRecent === "recent") {
        scrollPercentage = labAmbience.recentVolumePercentage;
      } else {
        return; // 如果传入的参数既不是数字也不是 "recent" 字符串，则退出函数
      }

      scrollPercentage = Math.max(0, scrollPercentage); // 确保滚动百分比不小于 0

      labAmbience.recentVolumePercentage = scrollPercentage;

      soundsData.forEach(sound => {
        if (sound.group === "lab") {
          sound.howls.forEach(sound => {
            const newVolume = sound.volume * scrollPercentage;
            // 使用 TweenMax 库来平滑过渡音量
            gsap.to(sound, {
              volume: newVolume,
              duration: 0.2
            });
          });
        }
      });
    }
  }

  const muteGroup = (group: string, isMuted: boolean): void => {
    soundsData.forEach(sound => {
      if (sound.group === group) {
        sound.howls.forEach(howl => {
          gsap.to(howl, {
            volume: isMuted ? false : sound.volume,
            duration: 1
          })
          howl.name === "roomAmbience"

          if (isMuted) {
            gsap.delayedCall(1, () => {
              if (howl.name !== "labAmbience" && howl.name !== "roomAmbience") {
                howl.stop()
              }
            })
          }
        })
      }
    })
  }

  const play = (soundName: string): void => {
    if (active && (!sizes.touch || soundName !== "buttonClick")) {
      const sound = soundsData.find(sound => sound.name === soundName);
      if (sound) {
        const randomIndex = Math.floor(Math.random() * sound.howls.length);
        sound.howls[randomIndex].play();
      }
    }
  }

  const mute = (isMuted: boolean): void => {
    active = !isMuted;
    localStorage.setItem("soundActive", active.toString())
    Howler.mute(isMuted)
  }

  return {
    active,

    playRoomAmbience,
    labAmbienceScroll,
    muteGroup,
    play,
    mute,
  }
}

export default SoundsFun