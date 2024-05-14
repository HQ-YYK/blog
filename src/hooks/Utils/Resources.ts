import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { gsap } from 'gsap'

import EventBus from './EventBus'
import Experience from '@/hooks/Experience'

export default class Resources extends EventBus {
  loadingAnimation: HTMLElement | null
  loadingRect: HTMLElement | null
  experience: Experience
  sources: any
  items: { [key: string]: any }
  toLoad: any
  loaded: number
  textures: any[]
  loaders: {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader
    fontLoader: FontLoader
  }

  constructor(sources: any) {
    super()

    this.loadingAnimation = document.getElementById('loading-animation')
    this.loadingRect = document.getElementById('loading-rect')

    this.experience = new Experience()
    this.sources = sources

    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0
    this.textures = []
    gsap.to(this.loadingRect, {
      y: 61,
      duration: 0,
    })

    // setLoaders
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      fontLoader: new FontLoader(),
    }

    this.startLoading()
  }

  startLoading(): void {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (model) => {
          this.sourceLoaded(source, model)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (texture) => {
          this.sourceLoaded(source, texture)
          texture.colorSpace = THREE.SRGBColorSpace
          this.textures.push(texture)
        })
      }
    }
  }

  sourceLoaded(source: any, item: any): void {
    this.items[source.name] = item
    this.loaded++
    this.updateLoadingAnimation()
    if (this.loaded === this.toLoad) {
      this.trigger('ready')
      this.initTextures()
    }
  }

  updateLoadingAnimation() {
    gsap.to(this.loadingRect, {
      y: 61 - 61 * (this.loaded / this.toLoad),
    })
  }
  initTextures() {
    this.textures.forEach((t) => {
      this.experience.renderer.instance.initTexture(t)
    })
  }
}
