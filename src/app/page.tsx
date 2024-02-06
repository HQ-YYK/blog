"use client"

import { useRef, useEffect, useState } from 'react'
// 1. 导入three.js
import * as THREE from 'three'

import initFun from './hooks/init'
import bgFun from './hooks/bg'
import modelFun from './hooks/model'

import Preloader from '../pages/genshin/Preloader'

import './globals.css'
import "../pages/genshin/Preloader.css";

export default function Home() {
  // 5. 初始化dom
  const containerRef = useRef<HTMLDivElement>(null); // 通过泛型指定 `containerRef` 是一个 `HTMLDivElement`


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

    if (containerRef.current) {
      const { renderer, render, scene, stats, onResize } = initFun(THREE)
      bgFun(THREE, scene, loadingManager)
      modelFun(THREE, scene)

      containerRef.current?.appendChild(renderer.domElement)
      progress === 100.00 && containerRef.current?.appendChild(stats.dom)

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
        {progress === 100.00 ? '' : <Preloader progress={progress} />}
        {/* 初始化 DOM */}
        <div className="container" ref={containerRef}></div>
      </div>
    </>
  );
}
