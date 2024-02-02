"use client"

import { useRef, useEffect, useState } from 'react'
// 1. 导入three.js
import * as THREE from 'three'

import initFun from './hooks/init'
import bgFun from './hooks/bg'

// import { Preloader, initLoadingManager } from '../pages/genshin/Preloader'
// import { PreloaderProps } from '../types/preloader'

import './globals.css'
import "../pages/genshin/Preloader.css";

export default function Home() {
  // 5. 初始化dom
  const containerRef = useRef<HTMLDivElement>(null); // 通过泛型指定 `containerRef` 是一个 `HTMLDivElement`


  // 模型加载进度管理
  const loadingManager = new THREE.LoadingManager();

  // 6.挂载完毕后获取dom 
  useEffect(() => {
    if (containerRef.current) {
      const { render, renderer, scene, stats, onResize } = initFun(THREE)
      bgFun(THREE, scene, loadingManager)

      containerRef.current?.appendChild(renderer.domElement)
      containerRef.current?.appendChild(stats.dom)

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

  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(progress);
    const updateProgress = (loaded: number, total: number) => {
      // console.log('模型进度百分比', progress, parseFloat(((loaded / total) * 100).toFixed(2)) + '%', Math.floor(loaded / total * 100));
      if (Math.floor(loaded / total * 100) === 100) {
        // loadingProcessTimeout && clearTimeout(loadingProcessTimeout);
        // loadingProcessTimeout = setTimeout(() => {
        setProgress && setProgress(Math.floor(loaded / total * 100));
        // }, 800);
      } else {
        console.log(Math.floor(loaded / total * 100));
        setProgress && setProgress(Math.floor(loaded / total * 100));
      }
    };

    loadingManager.onProgress = (url, loaded, total) => {
      updateProgress(loaded, total);
    };
  }, [progress]);




  return (
    <>
      <div>
        {progress === 100 ? '' :
          (
            <div className="progress-container" style={{ opacity: progress != 100 ? "1" : "0" }}>
              <div className="progress-content" >
                <img className="Genshin" src={"img/genshin/Genshin.png"} alt="图片" style={{ opacity: progress != 100 ? "1" : "0" }} />
                <div className="LoadingBar" style={{ opacity: progress != 100 ? "1" : "0" }}>
                  <div className="progress-bar">
                    <div ref={progressRef} className="progress" style={{ width: progress + "%" }}></div>
                  </div>
                  <div className="ball" style={{ left: "-2vmin" }}></div>
                  <div className="ball" style={{ left: "40.8vmin", top: "-2.4vmin" }}></div>
                  <div style={{ fontSize: "1.4vmin", position: "relative", left: "42.8vmin", top: "-4.0vmin" }}>{progress + "%"}</div>
                </div>
              </div>
            </div>
          )}
        {/* 初始化 DOM */}
        <div className="container" ref={containerRef}></div>
      </div>
    </>
  );
}
