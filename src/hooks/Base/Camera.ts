import { Scene } from "three"
import EventBus from '@/hooks/Utils/EventBus';
import { Sizes } from '@/types/init'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { gsap } from "gsap";
import { cursor, parallax, waypoints } from '@/data/Camera'

const tweens: any[] = []

const CameraFun = (
  THREE: typeof import("three"),
  scene: Scene,
  sizes: Sizes,
  timeData: any,
  controls?: OrbitControls,
) => {

  // init camera
  const camera = new THREE.PerspectiveCamera(
    38,
    sizes.width / sizes.height,
    .1,
    100
  )
  const cameraParallaxGroup = new THREE.Group()
  cameraParallaxGroup.add(camera);
  scene.add(cameraParallaxGroup);

  // set cursor
  const setCursor = () => {
    window.addEventListener("mousemove", event => {
      cursor.x = event.clientX / sizes.width - .5
      cursor.y = event.clientY / sizes.height - .5
    })
  }
  setCursor()

  const cameraResize = () => {
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  }

  const cameraUpdate = () => {
    controls && controls.update()
    !sizes.touch && parallax.enabled && cameraUpdateParallax()
  }

  const cameraUpdateParallax = () => {
    const dx = cursor.x * parallax.intensity;
    const dy = -cursor.y * parallax.intensity;

    const timeDelta = timeData.delta / 1000;

    const deltaX = (dx - cameraParallaxGroup.position.x) * parallax.speed * timeDelta;
    const deltaY = (dy - cameraParallaxGroup.position.y) * parallax.speed * timeDelta;

    if (Math.abs(deltaX) > 0.05) cameraParallaxGroup.position.x += deltaX;
    if (Math.abs(deltaY) > 0.05) cameraParallaxGroup.position.y += deltaY;
  }

  const setupWaypoints = () => {
    waypoints.forEach(waypoint => {
      camera.position.set(waypoint.position.x, waypoint.position.y, waypoint.position.z)
      camera.lookAt(waypoint.lookAt.x, waypoint.lookAt.y, waypoint.lookAt.z)
      waypoint.rotation.x = camera.rotation.x
      waypoint.rotation.y = camera.rotation.y
      waypoint.rotation.z = camera.rotation.z
    })
  }
  setupWaypoints()

  const onOrientationChange = () => {
    tweens.forEach(tween => tween.kill())
  }
  new EventBus().on("portrait", onOrientationChange);
  new EventBus().on("landscape", onOrientationChange);

  const moveToWaypoint = (waypointName: string, animate: boolean = true, duration: number = 0.8) => {
    const targetWaypoint = waypoints.find(waypoint => waypoint.name === waypointName);
    if (!targetWaypoint) return;
    if (animate) {
      gsap.to(camera.position, {
        x: targetWaypoint.position.x,
        y: targetWaypoint.position.y,
        z: targetWaypoint.position.z,
        duration,
        ease: Power1.easeInOut
      })

      gsap.to(camera.position, {
        x: targetWaypoint.rotation.x,
        y: targetWaypoint.rotation.y,
        z: targetWaypoint.rotation.z,
        duration,
        ease: Power1.easeInOut
      })
    } else {
      camera.position.set(targetWaypoint.position.x, targetWaypoint.position.y, targetWaypoint.position.z);
      camera.rotation.set(targetWaypoint.rotation.x, targetWaypoint.rotation.y, targetWaypoint.rotation.z);
    }
  }


  return {
    camera,
    cameraResize,
    cameraUpdate,


    waypoints,
    moveToWaypoint,
  }
}

export default CameraFun