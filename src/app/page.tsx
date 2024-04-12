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
import modelFun from '../hooks/model'

import './globals.css'
import "../pages/loading/Preloader.css";

export default function Home() {
  const webGlRef = useRef<HTMLDivElement>(null);
  // 模型加载进度管理
  const loadingManager = new THREE.LoadingManager();
  let loadingProcessTimeout: any = null;

  const [progress, setProgress] = useState(0);

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

  // 6.挂载完毕后获取dom 
  useEffect(() => {
    loadingManager.onProgress = (url, loaded, total) => {
      handleProgressUpdate(loaded, total);
    };

    if (webGlRef.current) {
      const { renderer, render, scene, onResize } = initFun(THREE)
      BgFun(THREE, scene)
      modelFun(THREE, scene, loadingManager)

      webGlRef.current?.appendChild(renderer.domElement)

      // 8.调用渲染函数
      render()

      // 监听窗口大小变化事件
      window.addEventListener('resize', onResize);
      return () => {
        // 组件卸载时移除事件监听器
        window.removeEventListener('resize', onResize);
      };
    }
  }, [])



  return (
    <>
      <div>
        {/* {progress === 100.00 ? '' : <Preloader progress={progress} />} */}
        {/* 初始化 DOM */}
        <div className="container">
          <div ref={webGlRef} className='main-webGl'></div>

          <Header />
          {/* <Menu /> */}
          <HoverIcon />
          <FristPage />
          {/* <SecondPage /> */}
          {/* <ThirdPage /> */}
        </div>
      </div>
    </>
  );
}
