/**
 * 光线投影
 */
import { Camera, Object3D, Object3DEventMap, Scene } from "three";
import { EventBus } from '@/hooks/Utils'
import { PageEleProps } from '@/types/page'

let objects: any,
  positionTriggered: boolean,
  triggerClick: boolean,
  hoverIconElements: any,
  intersect: any = null,
  isHovering = false

const RaycasterFun = (
  THREE: typeof import("three"),
  scene: Scene,
  camera: Camera,
  { HoverIconRef }: PageEleProps
) => {

  const sceneObjects: Object3D<Object3DEventMap>[] = [];
  hoverIconElements = HoverIconRef?.current

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();


  const update = () => {
    scene.traverse((child: any) => {
      if (child.onHover || child.onClick) sceneObjects.push(child);
    })

    objects = sceneObjects;

    if (raycaster && hoverIconElements && pointer.x != 0 && !positionTriggered) {
      positionTriggered = true
      raycaster.setFromCamera(pointer, camera)
      // 计算物体和射线的焦点
      const intersects = raycaster.intersectObjects(objects);

      if (intersects.length == 0) {
        hoverIconElements.setupDefault()
        intersect = null
        isHovering = false
        triggerClick = false
      } else {
        intersect = intersects[0]
        intersect.object.onHover && intersect.object.onHover()
        isHovering = intersect.object.hoverIcon
        intersect.object.hoverIcon && intersect.object.hoverIcon == "pointer" && hoverIconElements.setupPointer()
        triggerClick && intersect.object.onClick && intersect.object.onClick()
        triggerClick = false
      }
    }
  }

  const onMouseMove = (event: MouseEvent) => {
    positionTriggered = false
    const { clientX, clientY } = event;
    pointer.x = (clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (clientY / window.innerHeight) * 2 + 1;
  };
  EventBus.on("move", onMouseMove)
  EventBus.off("move", onMouseMove);

  const onClick = () => {
    positionTriggered = false
    triggerClick = true
  };

  return {
    isHovering,

    update,
    onClick
  }
}

export default RaycasterFun