import { Scene, Mesh, Group, Object3DEventMap, ShaderMaterial } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";

import { ExtendedObject3D } from "@/types/model";

import DesktopsFun from "./Desktops"
import MouseFun from "./Mouse"
import MessagePopUpFun from "./MessagePopUp"
import TonesFun from "./Tones"
import SpeakerFun from "./Speaker"
import PenguinFun from "./Penguin";

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
    return DesktopsFun(THREE, baseModel, resources)
  }

  /**
   * 加载mouse
   * @param baseModel 
   * @param roomModel 
   */
  const mouseFun = (baseModel: { add: (arg0: ExtendedObject3D) => void; }, roomModel: { children: any[]; }) => {
    return MouseFun(baseModel, roomModel)
  }

  /**
   * 加载messagePopUp
   * @param roomModel 
   */
  const messagePopUpFun = (roomModel: Group<Object3DEventMap>, desktops: any) => {
    return MessagePopUpFun(THREE, roomModel, resources, desktops)
  }

  /**
   * 加载tones
   * @param roomModel 
   */
  const tonesFun = (roomModel: Group<Object3DEventMap>) => {
    return TonesFun(THREE, roomModel, resources)
  }

  const speakerFun = (speakerModel: any) => {
    return SpeakerFun(THREE, speakerModel)
  }

  const penguinFun = (penguinModel: any, roomModel: Group<Object3DEventMap>) => {
    return PenguinFun(THREE, resources, penguinModel, roomModel)
  }

  const model = await gltfLoader.loadAsync(resources.roomModel)
  const roomModel = model.scene

  // 模型
  if (!roomModel) return
  baseModel = roomModel.children.find((child: { name: string; }) => child.name === 'room-base')
  shelvingModel = roomModel.children.find((child: { name: string; }) => child.name === "shelving")
  pictureModel = roomModel.children.find((child: { name: string; }) => child.name === "picture")
  blackboardModel = roomModel.children.find((child: { name: string; }) => child.name === "blackboard")
  plantModel = roomModel.children.find((child: { name: string; }) => child.name === "plant")
  const chairModel = roomModel.children.find((child: { name: string; }) => child.name === 'chair');
  const speakerModel = roomModel.children.find((child: { name: string; }) => child.name === 'speaker');
  const penguinModel = roomModel.children.find((child: { name: string; }) => child.name === 'penguin');

  const desktopPlane0 = roomModel.children.find((child: { name: string; }) => child.name === 'desktop-plane-0');
  const desktopPlane1 = roomModel.children.find((child: { name: string; }) => child.name === 'desktop-plane-1');

  if (speakerModel) baseModel.add(speakerModel);
  if (penguinModel) baseModel.add(penguinModel);
  if (chairModel) baseModel.add(chairModel);
  if (desktopPlane0) baseModel.add(desktopPlane0);
  if (desktopPlane1) baseModel.add(desktopPlane1);

  roomModel.rotation.y = -Math.PI / 4 * 3
  roomModel.position.y -= 1.0;

  scene.add(roomModel);

  // 纹理
  const texture = new THREE.TextureLoader().load(resources.bakedRoomTexture)
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false
  // 材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    fog: false,
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

  const desktops = desktopsFun(baseModel)

  const mouse = mouseFun(baseModel, roomModel)

  const messagePopUp = messagePopUpFun(roomModel, desktops)

  const tones = tonesFun(roomModel)

  const speaker = speakerFun(speakerModel)

  const penguin = penguinFun(penguinModel, roomModel)

  return {
    roomModel,
    desktops,
    mouse,
    messagePopUp,
    tones,
    speaker,
    penguin,

    bounceInAnimation,
    bounceOutAnimation,
  }
}

export default RoomFun