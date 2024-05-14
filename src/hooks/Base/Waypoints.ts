import Experience from '@/hooks/Experience'

import { waypoints } from '@/data/Camera'

export default class Waypoints {
  waypoints: {
    name: string
    position: { x: number; y: number; z: number }
    lookAt: { x: number; y: number; z: number }
    rotation: { x: number; y: number; z: number }
  }[]
  experience: Experience
  camera: any
  time: any
  sizes: any
  tweens: any[]

  constructor() {
    this.waypoints = waypoints

    this.experience = new Experience()
    this.camera = this.experience.camera.instance
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.tweens = []
    this.setupWaypoints()
    this.sizes.on('portrait', () => this.onOrientationChange())
    this.sizes.on('landscape', () => this.onOrientationChange())
  }
  onOrientationChange() {
    this.tweens.forEach((tween) => {
      tween.kill()
    })
  }

  setupWaypoints() {
    waypoints.forEach((waypoint) => {
      this.camera.position.set(
        waypoint.position.x,
        waypoint.position.y,
        waypoint.position.z
      )
      this.camera.lookAt(
        waypoint.lookAt.x,
        waypoint.lookAt.y,
        waypoint.lookAt.z
      )
      waypoint.rotation.x = this.camera.rotation.x
      waypoint.rotation.y = this.camera.rotation.y
      waypoint.rotation.z = this.camera.rotation.z
    })
  }

  moveToWaypoint(
    waypointName: string,
    animate: boolean = true,
    duration: number = 0.8
  ) {
    const targetWaypoint = waypoints.find(
      (waypoint) => waypoint.name === waypointName
    )
    if (!targetWaypoint) return
    if (animate) {
      gsap.to(this.camera.position, {
        x: targetWaypoint.position.x,
        y: targetWaypoint.position.y,
        z: targetWaypoint.position.z,
        duration,
        ease: Power1.easeInOut,
      })

      gsap.to(this.camera.rotation, {
        x: targetWaypoint.rotation.x,
        y: targetWaypoint.rotation.y,
        z: targetWaypoint.rotation.z,
        duration,
        ease: Power1.easeInOut,
      })
    } else {
      this.camera.position.set(
        targetWaypoint.position.x,
        targetWaypoint.position.y,
        targetWaypoint.position.z
      )
      this.camera.rotation.set(
        targetWaypoint.rotation.x,
        targetWaypoint.rotation.y,
        targetWaypoint.rotation.z
      )
    }
  }
}
