"use client"
import { useRef, useEffect, useState } from 'react'
// 1. 导入three.js
import * as THREE from 'three'

import Header from '../components/Header'
import Menu from '../components/Menu'
import HoverIcon from '../components/HoverIcon'

import FristPage from './fristPage'
import SecondPage from './secondPage'
import ThirdPage from './thirdPage'

import Preloader from '../pages/loading/Preloader'

import initFun from '../hooks/init'
import { BgFun } from '../hooks/Base'
import { LandingPageFun } from '../hooks/UI'
import { FunSerialization } from '../hooks/Utils'
import ModelFun from '../hooks/model'

import './globals.css'
import './index.css'

let landingPageFun: any;

export default function Home() {
  const webGlRef = useRef<HTMLDivElement>(null);
  const HoverIconRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const fristPageRef = useRef<HTMLDivElement>(null);

  // 模型加载进度管理
  const loadingManager = new THREE.LoadingManager();
  let loadingProcessTimeout: any = null;

  const [progress, setProgress] = useState(0);
  const [raycaster, setRaycaster] = useState({})
  const [sounds, setSounds] = useState({})

  const handleProgressUpdate = (loaded: number, total: number) => {
    if (Math.floor(loaded / total * 100) === 100) {
      loadingProcessTimeout && clearTimeout(loadingProcessTimeout);
      loadingProcessTimeout = setTimeout(() => {
        setProgress(parseFloat(((loaded / total) * 100).toFixed(2)));
      }, 800);
    } else {
      setProgress(parseFloat(((loaded / total) * 100).toFixed(2)));
    }
  };

  const setupThreeScene = async () => {
    const {
      sizes,
      rendererFun,
      sceneFun,
      raycasterFun,
      soundsFun,
      cameraFun
    } = initFun(
      THREE,
      {
        HoverIconRef: HoverIconRef
      }
    )
    const bgFun = BgFun(THREE, sceneFun.scene)
    const modelFun = await ModelFun(
      THREE,
      sceneFun.scene,
      loadingManager,
      soundsFun
    )


    landingPageFun = LandingPageFun(
      cameraFun,
      sizes,
      modelFun,
      soundsFun,
      bgFun,
      rendererFun
    )

    sessionStorage.setItem('landingPageFun', JSON.stringify(landingPageFun, FunSerialization().funSerializer))

    setRaycaster(raycasterFun)
    setSounds(soundsFun)

    return {
      renderer: rendererFun.renderer,
      cameraFun,
      rendererFun,
      raycasterFun,
      modelFun,
      landingPageFun
    }
  }

  // 6.挂载完毕后获取dom 
  useEffect(() => {
    loadingManager.onProgress = (url, loaded, total) => {
      handleProgressUpdate(loaded, total);
    };

    if (webGlRef.current) {
      const fetchData = async () => {
        const {
          renderer,
          cameraFun,
          rendererFun,
          raycasterFun,
          modelFun,
          landingPageFun
        } = await setupThreeScene()

        webGlRef.current?.appendChild(renderer.domElement)

        landingPageFun && landingPageFun.init()

        // 7.定义一个渲染函数
        const render = () => {
          cameraFun.update()
          rendererFun.update()
          raycasterFun.update()
          modelFun.update()

          requestAnimationFrame(render)
        }

        const onResize = () => {
          cameraFun.resize()
          rendererFun.resize()
        }
        // 8.调用渲染函数
        render()

        // 监听窗口大小变化事件
        window.addEventListener('resize', onResize);
        return () => {
          // 组件卸载时移除事件监听器
          window.removeEventListener('resize', onResize);
        };
      }

      fetchData()
    }
  }, [])



  return (
    <>
      <div>
        {/* {progress === 100.00 ? '' : <Preloader progress={progress} />} */}
        {/* 初始化 DOM */}
        <div className="container">
          <div
            ref={webGlRef}
            className='main-webGl'
          />

          <Header
            ref={headerRef}
            sounds={sounds}
          />
          {/* <Menu /> */}
          <HoverIcon
            ref={HoverIconRef}
            sounds={sounds}
            raycaster={raycaster}
          />
          <FristPage />
          <div id="scroll-container" className="center column">
            <SecondPage />
            <div id="hover-icon-color-switch" />
            {/* <ThirdPage /> */}
          </div>
        </div>
      </div>
    </>
  );
}
