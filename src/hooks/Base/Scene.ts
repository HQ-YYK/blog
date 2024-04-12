import { Sizes } from '@/types/init'

const SceneFun = (
  THREE: typeof import("three"),
  sizes: Sizes,
) => {
  const scene = new THREE.Scene()
  const fog = new THREE.Fog("#002C6A", 10, 17);
  fog.near = sizes.portrait ? 18 : 10
  fog.far = sizes.portrait ? 23 : 17
  fog.color = new THREE.Color(sizes.portrait ? "#001945" : "#002C6A")
  scene.fog = fog;

  const onOrientationChange = () => {
    fog.near = sizes.portrait ? 18 : 10
    fog.far = sizes.portrait ? 23 : 17
    fog.color = new THREE.Color(sizes.portrait ? "#001945" : "#002C6A")
  }


  return {
    scene,

    onOrientationChange
  }
}
export default SceneFun