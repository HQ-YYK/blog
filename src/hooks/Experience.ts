import * as THREE from 'three'

import Gestures from './Utils/Gestures'
import Sounds from './Base/Sounds'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Resources from './Utils/Resources'
import Camera from './Base/Camera'
import Waypoints from './Base/Waypoints'
import Renderer from './Base/Renderer'
import World from './World'
import UI from './UI'
import Raycaster from './Base/Raycaster'

import { resourcesData } from '@/data/Resources'

export default class Experience {
  static instance: Experience
  canvas: any
  gestures: any
  sounds: any
  sizes: any
  time: any
  scene: any
  resources: any
  camera: any
  waypoints: any
  renderer: any
  world: any
  ui: any
  raycaster: any

  constructor(targetElement?: any) {
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this
    this.canvas = targetElement

    this.gestures = new Gestures()
    this.sounds = new Sounds()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(resourcesData)
    this.camera = new Camera()
    this.waypoints = new Waypoints()
    this.renderer = new Renderer()
    this.world = new World()
    this.ui = new UI()
    this.raycaster = new Raycaster()
    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize(): void {
    this.camera.resize()
    this.renderer.resize()
    this.ui.resize()
  }

  update(): void {
    this.camera.update()
    this.world.update()
    this.renderer.update()
    this.raycaster.update()
    this.ui.update()
  }
}
