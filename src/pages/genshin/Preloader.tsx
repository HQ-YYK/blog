"use client"

import * as THREE from 'three'
import { useState, useRef, useEffect } from "react"
import "./Preloader.css";
import { PreloaderProps } from '../../types/preloader'

export const initLoadingManager = (progress?: number | undefined, setProgress?: React.Dispatch<React.SetStateAction<number>>) => {
  // 模型加载进度管理
  const loadingManager = new THREE.LoadingManager();
  let loadingProcessTimeout: any = null;

  const updateProgress = (loaded: number, total: number) => {
    // console.log('模型进度百分比', progress, parseFloat(((loaded / total) * 100).toFixed(2)) + '%', Math.floor(loaded / total * 100));
    if (Math.floor(loaded / total * 100) === 100) {
      loadingProcessTimeout && clearTimeout(loadingProcessTimeout);
      loadingProcessTimeout = setTimeout(() => {
        setProgress && setProgress(Math.floor(loaded / total * 100));
      }, 800);
    } else {
      console.log(Math.floor(loaded / total * 100));

      setProgress && setProgress(Math.floor(loaded / total * 100));
    }
  };

  loadingManager.onProgress = (url, loaded, total) => {
    updateProgress(loaded, total);
  };

  return {
    loadingManager,
    updateProgress
  };
};

export const Preloader = ({ visible, setVisible }: PreloaderProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if (progress >= 1) {
      setVisible(false);
    }
    console.log(progress);

    initLoadingManager(progress, setProgress)
  }, [progress, setVisible, setProgress]);

  return (
    <div className="progress-container" style={{ opacity: visible ? "1" : "0" }}>
      <div className="progress-content" >
        <img className="Genshin" src={"img/genshin/Genshin.png"} alt="图片" style={{ opacity: visible ? "1" : "0" }} />
        <div className="LoadingBar" style={{ opacity: visible ? "1" : "0" }}>
          <div className="progress-bar">
            <div ref={progressRef} className="progress" style={{ width: progress * 100 + "%" }}></div>
          </div>
          <div className="ball" style={{ left: "-2vmin" }}></div>
          <div className="ball" style={{ left: "40.8vmin", top: "-2.4vmin" }}></div>
          <div style={{ fontSize: "1.4vmin", position: "relative" }}>{progress * 100 + "%"}</div>
        </div>
      </div>
    </div>
  )
}