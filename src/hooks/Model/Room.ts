import { MeshBasicMaterial, Scene, Mesh, Group, Object3DEventMap, Object3D, ShaderMaterial } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";

import { ExtendedObject3D } from "@/types/model";

let baseModel: any,
  shelvingModel: any,
  pictureModel: any,
  blackboardModel: any,
  plantModel: any


const RoomFun = async (
  THREE: typeof import("three"),
  scene: Scene,
  gltfLoader: GLTFLoader,
  resources: Record<string, string>,
  roomShadowSet: { roomShadowModel: Group<Object3DEventMap>; material: ShaderMaterial; } | undefined
) => {

  /**
   * 加载desktops
   * @param baseModel 
   * @returns 
   */
  const desktopsFun = (baseModel: { children: any[]; add: (arg0: Mesh<any, any, any>) => void; }) => {
    let desktop0,
      desktop1,
      notification;

    // 加载desktops1
    desktop1 = baseModel.children.find(e => e.name === "desktop-plane-1")
    // 材质
    const desktop1PlaneMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(resources.desktop1),
      fog: false
    })
    if (desktop1 instanceof THREE.Mesh) {
      desktop1.material = desktop1PlaneMaterial
      desktop1.scale.x = 1.01

      notification = desktop1.clone()
      notification.material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(resources.desktop1Notification),
        transparent: true,
        fog: false,
        opacity: 0
      })
      notification.position.x += .01
      baseModel.add(notification)
    }


    // 加载desktops0
    desktop0 = baseModel.children.find(e => e.name === "desktop-plane-0")
    // 材质
    const desktop0Layer0Material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(resources.desktop0),
      fog: false
    })
    if (desktop0 instanceof THREE.Mesh) {
      desktop0.material = desktop0Layer0Material
    }

    return {
      desktop0,
      desktop1,
      notification,
    }
  }

  /**
   * 加载mouse
   * @param baseModel 
   * @param roomModel 
   */
  const mouseFun = (baseModel: { add: (arg0: ExtendedObject3D) => void; }, roomModel: { children: any[]; }) => {
    const mouseModel = roomModel.children.find(e => e.name === "mouse") as ExtendedObject3D;
    if (mouseModel) {
      mouseModel.position.x += .15
      mouseModel.position.z += .07
      baseModel.add(mouseModel)

      mouseModel.idleStartPosition = {
        x: mouseModel.position.x,
        z: mouseModel.position.z
      }
    }
  }

  /**
   * 加载messagePopUp
   * @param roomModel 
   */
  const messagePopUpFun = (roomModel: Group<Object3DEventMap>) => {
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
  }

  /**
   * 加载tones
   * @param roomModel 
   */
  const tonesFun = (roomModel: Group<Object3DEventMap>) => {
    const materials = [
      new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load(resources.tone0Texture),
        alphaTest: .1,
        opacity: 0,
        fog: false
      }),
      new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load(resources.tone1Texture),
        alphaTest: .1,
        opacity: 0,
        fog: false
      }),
      new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load(resources.tone2Texture),
        alphaTest: .1,
        opacity: 0,
        fog: false
      })
    ]

    const sprites = [new THREE.Sprite(materials[0]), new THREE.Sprite(materials[1]), new THREE.Sprite(materials[2])]
    sprites.forEach(sprite => {
      sprite.scale.set(.3, .3, .3)
      sprite.position.set(-1.2, 2, -1.9),
        roomModel.add(sprite)
    })
  }

  const speakerFun = (speakerModel: any) => {
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

  const penguinFun = (penguinModel: any, roomModel: Group<Object3DEventMap>) => {
    const heartMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(resources.heartTexture),
      alphaTest: .1,
      opacity: 0,
      fog: false,
      rotation: .2
    })
    const heart = new THREE.Sprite(heartMaterial)
    heart.position.set(penguinModel.x + .07, 2.2, penguinModel.z + .07)
    heart.scale.set(.25, .25, .25)
    roomModel.add(heart)

    penguinModel.hoverIcon = "pointer",
      penguinModel.onClick = () => jump()

    const jump = () => {
      // this.isJumping || (this.isJumping = !0,
      //   P.delayedCall(.8, () => this.isJumping = !1),
      //   P.to(this.model.position, {
      //       y: 2,
      //       yoyo: !0,
      //       repeat: 1,
      //       duration: .4
      //   }),
      //   P.to(this.wings[0].rotation, {
      //       x: .4,
      //       duration: .1,
      //       repeat: 7,
      //       yoyo: !0
      //   }),
      //   P.to(this.wings[1].rotation, {
      //       x: -.4,
      //       duration: .1,
      //       repeat: 7,
      //       yoyo: !0
      //   }),
      //   this.sounds.play("bird"),
      //   this.animateHeart())
    }
  }

  const model = await gltfLoader.loadAsync(resources.roomModel)
  const roomModel = model.scene

  // 模型
  if (!roomModel) return
  baseModel = roomModel.children.find((child: { name: string; }) => child.name === 'roomModel-base')
  shelvingModel = roomModel.children.find((child: { name: string; }) => child.name === "shelving")
  pictureModel = roomModel.children.find((child: { name: string; }) => child.name === "picture")
  blackboardModel = roomModel.children.find((child: { name: string; }) => child.name === "blackboard")
  plantModel = roomModel.children.find((child: { name: string; }) => child.name === "plant")
  const chairModel = roomModel.children.find((child: { name: string; }) => child.name === 'chair');
  const speakerModel = roomModel.children.find((child: { name: string; }) => child.name === 'speaker');
  const penguinModel = roomModel.children.find((child: { name: string; }) => child.name === 'penguin');

  const desktopPlane0 = roomModel.children.find((child: { name: string; }) => child.name === 'desktop-plane-0');
  const desktopPlane1 = roomModel.children.find((child: { name: string; }) => child.name === 'desktop-plane-1');

  if (baseModel) {
    if (speakerModel) baseModel.add(speakerModel);
    if (penguinModel) baseModel.add(penguinModel);
    if (chairModel) baseModel.add(chairModel);
    if (desktopPlane0) baseModel.add(desktopPlane0);
    if (desktopPlane1) baseModel.add(desktopPlane1);

    roomModel.rotation.y = -Math.PI / 2;
    roomModel.position.y -= 5.7;

    const desktops = desktopsFun(baseModel)

    const mouse = mouseFun(baseModel, roomModel)

    const messagePopUp = messagePopUpFun(roomModel)

    const tones = tonesFun(roomModel)

    const speaker = speakerFun(speakerModel)

    const penguin = penguinFun(penguinModel, roomModel)
  }


  scene.add(roomModel);

  // 纹理
  const texture = new THREE.TextureLoader().load(resources.bakedRoomTexture)
  texture.flipY = false
  // 材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    fog: false
  })
  roomModel.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material
    }
  })

  roomShadowSet && roomModel.add(roomShadowSet.roomShadowModel)


  const bounceInAnimation = (delay: number = 0, withShelving: boolean = false) => {
    gsap.fromTo(baseModel.scale, {
      x: 0,
      y: 0,
      z: 0
    }, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      ease: Power4.easeOut,
      delay: delay
    });

    roomShadowSet && gsap.fromTo(roomShadowSet.material.uniforms.uOpacity, {
      value: 0
    }, {
      value: 1,
      duration: 0.4,
      delay: delay + (withShelving ? 0.5 : 0.23),
      ease: Expo.easeOut
    });

    if (withShelving) {
      gsap.fromTo(shelvingModel.scale, {
        x: 0,
        y: 0,
        z: 0
      }, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: Power4.easeOut,
        delay: delay + 0.25
      });

      gsap.fromTo(pictureModel.scale, {
        x: 0,
        y: 0,
        z: 0
      }, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: Power4.easeOut,
        delay: delay + 0.32
      });

      gsap.fromTo(blackboardModel.scale, {
        x: 0,
        y: 0,
        z: 0
      }, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: Power4.easeOut,
        delay: delay + 0.39
      });

      gsap.fromTo(plantModel.scale, {
        x: 0,
        y: 0,
        z: 0
      }, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: Power4.easeOut,
        delay: delay + 0.46
      });
    }
  };

  const bounceOutAnimation = (delay: number = 0) => {
    gsap.fromTo(baseModel.scale, {
      x: 1,
      y: 1,
      z: 1
    }, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.5,
      ease: Power4.easeIn,
      delay: delay
    });


    roomShadowSet && gsap.fromTo(roomShadowSet.material.uniforms.uOpacity, {
      value: 1
    }, {
      value: 0,
      duration: 0.15,
      delay: delay + 0.25
    });
  }

  return {
    roomModel,

    bounceInAnimation,
    bounceOutAnimation,
  }
}

export default RoomFun