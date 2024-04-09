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

import './globals.css'
import "../pages/loading/Preloader.css";

export default function Home() {
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
  }, [])



  return (
    <>
      <div>
        {/* {progress === 100.00 ? '' : <Preloader progress={progress} />} */}
        {/* 初始化 DOM */}
        <div className="container">
          <Header />
          {/* <Menu /> */}
          <HoverIcon />
          <FristPage loadingManager={loadingManager} />
          {/* <SecondPage /> */}
          {/* <ThirdPage /> */}
        </div>
      </div>
    </>
  );
}
