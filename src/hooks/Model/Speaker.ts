const SpeakerFun = (
  THREE: typeof import("three"),
  speakerModel: { hoverIcon: string }
) => {
  speakerModel.hoverIcon = "pointer"
  // speakerModel.onClick = () => clickEvent()

  // window.requestAnimationFrame(() => {
  //   const e = this.experience.ui.menu.main;
  //   e.on("open", () => {
  //     speakerModel.hoverIcon = null
  //     speakerModel.onClick = null
  //   }
  //   )
  //   e.on("hide", () => {
  //     speakerModel.hoverIcon = "pointer"
  //     speakerModel.onClick = () => clickEvent()
  //   }
  //   )
  // })

  // const clickEvent = () => {
  //   if (!this.experience.ui.intro.clickCTAVisible) {
  //     const e = this.experience.ui.soundButton
  //     e.active ? e.deactivate() : e.activate()
  //     this.sounds.play("buttonClick")
  //   }
  // }
}

export default SpeakerFun