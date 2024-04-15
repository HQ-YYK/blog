import { ExtendedObject3D } from "@/types/model";


const MouseFun = (
  baseModel: { add: any },
  roomModel: { children: any[]; }
) => {
  const mouseModel = roomModel.children.find((e: { name: string; }) => e.name === "mouse") as ExtendedObject3D;
  baseModel.add(mouseModel)
  mouseModel.position.x += .15
  mouseModel.position.z += .07

  const setIdleStartPosition = () => {
    mouseModel.idleStartPosition = {
      x: mouseModel.position.x,
      z: mouseModel.position.z
    }
  }

  setIdleStartPosition()

  const moveToIdleStartPositon = () => {
    if (mouseModel.idleStartPosition) {
      mouseModel.position.x = mouseModel.idleStartPosition.x;
      mouseModel.position.z = mouseModel.idleStartPosition.z;
    }
  }

  const updateMouseSync = () => {
    // const targetPosition = worldExperience.character.body.model.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0].getWorldPosition(new C);
    // if (
    //   targetPosition.y < 1.63 - 5.7 &&
    //   targetPosition.y > 1.58 - 5.7 &&
    //   targetPosition.x > .2 &&
    //   targetPosition.x < .6
    // ) {
    //   mouseModel.position.z = -targetPosition.x - 1.849;
    //   mouseModel.position.x = targetPosition.z + 0.92;
    // }
  }

  return {
    moveToIdleStartPositon,
    updateMouseSync
  }
}

export default MouseFun