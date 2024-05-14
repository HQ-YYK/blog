import { Howl, Howler } from 'howler'
import { gsap } from 'gsap'

import { soundsData } from '@/data/Sounds'

import Experience from '@/hooks/Experience'

export default class Sounds {
  items: any[]
  experience: Experience
  active: boolean
  roomAmbience: Howl & { name: string; recentVolumePercentage: number }
  roomAmbiencePlaying: boolean
  labAmbience: Howl & { name: string; recentVolumePercentage: number }
  masterVolume: number

  constructor() {
    this.items = soundsData
    this.experience = new Experience()
    this.active = false
    this.masterVolume = 0
    this.roomAmbiencePlaying = false
    this.setMute()
    this.setMasterVolume()
    this.setupSounds()
    document.addEventListener('visibilitychange', () =>
      this.pauseAll(document.hidden)
    )

    // setRoomAmbience
    this.roomAmbience = this.items.find(
      (item) => item.name === 'roomAmbience'
    ).howls[0]
    this.roomAmbience.loop(true)
    this.roomAmbience.name = 'roomAmbience'

    // setLabAmbience
    this.labAmbience = this.items.find(
      (item) => item.name === 'labAmbience'
    ).howls[0]
    this.labAmbience.loop(true)
    this.labAmbience.volume(0)
    this.labAmbience.name = 'labAmbience'
    this.labAmbience.play()
  }

  playRoomAmbience() {
    if (!this.roomAmbiencePlaying) {
      this.roomAmbiencePlaying = true
      this.roomAmbience.play()
    }
  }

  labAmbienceScroll(scrollAmountOrRecent: 'recent' | number) {
    if (this.active) {
      let volume =
        scrollAmountOrRecent === 'recent'
          ? this.labAmbience.recentVolumePercentage
          : 1 - scrollAmountOrRecent

      if (volume < 0) volume = 0

      this.labAmbience.recentVolumePercentage = volume
      this.items.forEach((item) => {
        if (item.group === 'lab') {
          item.howls.forEach((howl: any) => {
            gsap.to(howl, {
              volume: item.volume * volume,
              duration: 0.2,
            })
          })
        }
      })
    }
  }

  setupSounds() {
    this.items.forEach((item) => {
      item.howls = []
      item.files.forEach((file: any) => {
        item.howls.push(
          new Howl({
            src: file,
            volume: item.volume,
            html5: item.html5 ? item.html5 : false,
          })
        )
      })
    })
  }
  pauseAll(isPaused: boolean) {
    this.items.forEach((item) => {
      item.howls.forEach((howl: any) => {
        if (item.name !== 'labAmbience' && item.name !== 'roomAmbience') {
          if (isPaused) {
            howl.pause()
          } else if (howl.seek() !== 0 && howl.seek() !== howl.duration()) {
            howl.play()
          }
        }
      })
    })
  }
  muteGroup(groupName: string, isMuted: boolean) {
    this.items.forEach((item) => {
      if (item.group === groupName) {
        item.howls.forEach((howl: any) => {
          gsap.to(howl, {
            volume: isMuted ? 0 : item.volume,
            duration: 1,
          })

          if (isMuted) {
            gsap.delayedCall(1, () => {
              if (howl.name !== 'labAmbience' && howl.name !== 'roomAmbience') {
                howl.stop()
              }
            })
          }
        })
      }
    })
  }
  play(soundName: string) {
    const item = this.items.find((item) => item.name === soundName)
    if (
      this.active &&
      (!this.experience.sizes.touch || soundName !== 'buttonClick')
    ) {
      if (item) {
        const randomSound =
          item.howls[Math.floor(Math.random() * item.howls.length)]
        if (randomSound) {
          randomSound.play()
        }
      }
    }
  }
  mute(isMuted: boolean) {
    this.active = !isMuted
    Howler.mute(isMuted)
  }
  setMute() {
    document.addEventListener('visibilitychange', () => {
      if (this.active && document.hidden) {
        Howler.mute(true)
      } else if (this.active && !document.hidden) {
        Howler.mute(false)
      }
    })
  }
  setMasterVolume() {
    this.masterVolume = 0.5
    Howler.volume(this.masterVolume)
    window.requestAnimationFrame(() => {
      Howler.volume(this.masterVolume)
    })
  }
}
