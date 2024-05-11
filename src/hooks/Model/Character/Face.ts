const FaceFun = async (
  THREE: typeof import("three"),
  resources: Record<string, string>,
  bodySet: any
) => {
  const faceModel = bodySet.armature.children.find((child: { name: string }) => child.name === "face")
  faceModel.wireframeAt = "-11.5"
  const textures = {
    default: new THREE.TextureLoader().load(resources.characterDefaultFace),
    scared: new THREE.TextureLoader().load(resources.characterScaredFace),
    sleepy: new THREE.TextureLoader().load(resources.characterSleepyFace),
  }
  const material = new THREE.MeshBasicMaterial({
    map: textures.default,
    transparent: true,
    fog: false
  })
  faceModel.material = material


  const faceTransitions = {
    smile: {
      allowedOutsideLanding: false,
      faces: [
        new THREE.TextureLoader().load(resources.characterSmile0Face),
        new THREE.TextureLoader().load(resources.characterSmile1Face),
        new THREE.TextureLoader().load(resources.characterSmile2Face)
      ]
    },
    contact: {
      allowedOutsideLanding: false,
      faces: [
        new THREE.TextureLoader().load(resources.characterScaredFace),
        new THREE.TextureLoader().load(resources.characterContact1Face),
        new THREE.TextureLoader().load(resources.characterContact2Face)
      ]
    }
  }

  const updateFace = (option: string) => {
    // const landingPage = this.experience.ui.landingPage;

    // if (option === "default") {
    //   faceTransitions.currentIndex = faceTransitions.faces.length - 1;
    //   const transition = () => {
    //     this.faceCall = gsap.delayedCall(.03, () => {
    //       if (landingPage.visible || faceTransitions.allowedOutsideLanding || this.landingPage.isAnimating) {
    //         faceModel.material.map = faceTransitions.faces[faceTransitions.currentIndex];
    //         faceTransitions.currentIndex--;
    //         if (faceTransitions.currentIndex === -1) {
    //           faceModel.material.map = textures.default;
    //         } else {
    //           transition();
    //         }
    //       }
    //     });
    //   };
    //   transition();
    // } else {
    //   faceTransitions.current = faceTransitions[option];
    //   faceTransitions.currentIndex = 0;
    //   const transition = () => {
    //     this.faceCall = gsap.delayedCall(.033, () => {
    //       if (landingPage.visible || faceTransitions.current.allowedOutsideLanding) {
    //         faceModel.material.map = faceTransitions[option].faces[faceTransitions.currentIndex];
    //         faceTransitions.currentIndex++;
    //         if (faceTransitions.currentIndex !== faceTransitions[option].faces.length) {
    //           transition();
    //         }
    //       }
    //     });
    //   };
    //   transition();
    // }
  }

  return {
    faceModel,
    material,
    textures,

    updateFace
  }

}

export default FaceFun