import { Group, LoadingManager, Mesh, Object3D, Object3DEventMap, Scene, Sprite } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { resourcesData, Hc, Uc } from '@/data/index'
import { directionalLightType, ExtendedObject3D } from "@/types/model";

let roomShadow: any

const modelFun = (THREE: typeof import("three"), scene: Scene, loadingManager: LoadingManager | undefined) => {
  const gltfLoader = new GLTFLoader(loadingManager);

  const resourcesFun = () => {
    const transformedData: Record<string, string> = {};
    for (const item of resourcesData) {
      transformedData[item.name] = item.path;
    }
    return transformedData;
  }


  const resources = resourcesFun();


  // 加载roomShadow模型文件
  gltfLoader.load(resources.roomShadowModel, (gltf) => {
    const model = gltf.scene;

    if (!model) return
    // 纹理
    const shadowTexture = new THREE.TextureLoader().load(resources.bakedShadowRoomTexture)
    shadowTexture.flipY = false

    // 材质
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        alphaMask: {
          value: shadowTexture
        },
        uColor: {
          value: new THREE.Color("#c4a37e")
        },
        uOpacity: {
          value: 1
        }
      },
      vertexShader: Hc, // 顶点着色器
      fragmentShader: Uc, // 片元着色器
    });

    model.children.forEach(child => {
      if (child.name === "shadowCatcher") {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      }
    })

    roomShadow = model
  });

  // 加载room模型文件
  gltfLoader.load(resources.roomModel, (gltf) => {
    const room = gltf.scene;

    // 模型
    if (!room) return
    const baseModel = room.children.find(e => e.name === 'room-base');
    const chairModel = room.children.find(e => e.name === 'chair');
    const speakerModel = room.children.find(e => e.name === 'speaker');
    const penguinModel = room.children.find(e => e.name === 'penguin');

    const desktopPlane0 = room.children.find(e => e.name === 'desktop-plane-0');
    const desktopPlane1 = room.children.find(e => e.name === 'desktop-plane-1');

    if (baseModel) {
      if (speakerModel) baseModel.add(speakerModel);
      if (penguinModel) baseModel.add(penguinModel);
      if (chairModel) baseModel.add(chairModel);
      if (desktopPlane0) baseModel.add(desktopPlane0);
      if (desktopPlane1) baseModel.add(desktopPlane1);

      room.rotation.y = -Math.PI / 2;
      room.position.y -= 5.7;

      const desktops = desktopsFun(baseModel)

      const mouse = mouseFun(baseModel, room)

      const messagePopUp = messagePopUpFun(room)

      const tones = tonesFun(room)

      const speaker = speakerFun(speakerModel)

      const penguin = penguinFun(penguinModel, room)

    }

    scene.add(room);

    // 纹理
    const texture = new THREE.TextureLoader().load(resources.bakedRoomTexture)
    texture.flipY = false
    // 材质
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      fog: false
    })
    room.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = material
      }
    })

    // shadow
    room.add(roomShadow)
    scene.add(roomShadow);


    // 创建灯光
    // setDirectionalLight()
  });


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
   * @param room 
   */
  const mouseFun = (baseModel: { add: (arg0: ExtendedObject3D) => void; }, room: { children: any[]; }) => {
    const mouseModel = room.children.find(e => e.name === "mouse") as ExtendedObject3D;
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
   * @param room 
   */
  const messagePopUpFun = (room: Group<Object3DEventMap>) => {
    const material = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(resources.newMessageSprite),
      alphaTest: .1,
      opacity: 0,
      fog: false
    })
    const sprite = new THREE.Sprite(material);
    room.add(sprite),
      sprite.position.set(-1.75, 3.5, 1.8)
    sprite.scale.set(.35, .35, .35)
  }

  /**
   * 加载tones
   * @param room 
   */
  const tonesFun = (room: Group<Object3DEventMap>) => {
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
        room.add(sprite)
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

  const penguinFun = (penguinModel: any, room: Group<Object3DEventMap>) => {
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
    room.add(heart)

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





  const createDirectionalLight = (light: directionalLightType) => {
    const {
      color,
      intensity,
      position,
      castShadow,
      shadow
    } = light

    const { x, y, z } = position
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    directionalLight.castShadow = castShadow;

    const { camera } = shadow
    const {
      near,
      far,
      right,
      left,
      top,
      bottom,
      width,
      height,
      radius,
      bias
    } = camera
    directionalLight.shadow.camera.near = near;
    directionalLight.shadow.camera.far = far;
    directionalLight.shadow.camera.right = right;
    directionalLight.shadow.camera.left = left;
    directionalLight.shadow.camera.top = top;
    directionalLight.shadow.camera.bottom = bottom;
    directionalLight.shadow.mapSize.width = width;
    directionalLight.shadow.mapSize.height = height;
    directionalLight.shadow.radius = radius;
    directionalLight.shadow.bias = bias;

    scene.add(directionalLight);
  }

  const setDirectionalLight = () => {
    // 创建方向光
    const light = {
      color: '#ffffff',
      intensity: 2.5,
      position: {
        x: -5,
        y: 25,
        z: -1
      },
      castShadow: true,
      shadow: {
        camera: {
          near: 0.01,
          far: 500,
          right: 30,
          left: -30,
          top: 30,
          bottom: -30,
          width: 1024,
          height: 1024,
          radius: 4,
          bias: -0.00006
        }
      }
    }
    const directionalLight1 = light
    createDirectionalLight(directionalLight1);

    const directionalLight2 = light
    directionalLight2.position.x = 5
    createDirectionalLight(directionalLight2);

    // 创建半球光
    const hemisphereLight = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
    hemisphereLight.position.set(2, 1, 1)
    scene.add(hemisphereLight)
  }
}


export default modelFun