import { useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import useCustomPubSub from './useCustomPubSub'

const useLoader = () => {
  const loaders = [];
  let loaded = 0
  let items = {}
  let toLoad = 0


  /**
   * Set loaders
   */
  const setLoaders = () => {
    //Images
    loaders.push({
      extensions: ['jpg', 'png'],
      action: (_resource: any) => {
        const image = new Image()

        image.addEventListener('load', () => {
          fileLoadEnd(_resource, image)
        })

        image.addEventListener('error', () => {
          fileLoadEnd(_resource, image)
        })

        image.src = _resource.source
      }
    })

    // Basis images

    // Draco
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })

    loaders.push({
      extensions: ['drc'],
      action: (_resource: { source?: any; name?: string | number }) => {
        dracoLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)

          dracoLoader.dispose()
        })
      }
    })


    // GLTF
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    loaders.push({
      extensions: ['glb', 'gltf'],
      action: (_resource: { source: string }) => {
        gltfLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)
        })
      }
    })

    // FBX
    const fbxLoader = new FBXLoader()

    loaders.push({
      extensions: ['fbx'],
      action: (_resource: { source?: any; name?: string | number }) => {
        fbxLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)
        })
      }
    })

    // RGBE | HDR
    const rgbeLoader = new RGBELoader()

    loaders.push({
      extensions: ['hdr'],
      action: (_resource: { source?: any; name?: string | number }) => {
        rgbeLoader.load(_resource.source, (_data) => {
          fileLoadEnd(_resource, _data)
        })
      }
    })


  }

  /**
 * File load end
 */
  const fileLoadEnd = (_resource: { name: string | number }, _data: HTMLImageElement) => {
    loaded++
    items[_resource.name] = _data

    useCustomPubSub().trigger('fileEnd', [_resource, _data])

    if (loaded === toLoad) {
      useCustomPubSub().trigger('end')
    }
  }

  useEffect(() => {
    setLoaders()
  }, []);
}

export default useLoader