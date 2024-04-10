import { Scene } from "three"

const fogFun = (THREE: typeof import("three"), scene: Scene) => {
  // setFog
  scene.fog = new THREE.Fog("#002C6A", 10, 17);

  //onOrientationChange
  // scene.fog.near

}