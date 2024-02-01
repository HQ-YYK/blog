"use client"

import { useRef, useEffect } from 'react'
// 1. 导入three.js
import * as THREE from 'three'

import initFun from './hooks/init'
import bgFun from './hooks/bg'

import './globals.css'

export default function Home() {
  const { render, renderer, scene, camera, controls, stats, onResize } = initFun(THREE)
  bgFun(THREE, renderer, scene, camera, controls)

  // 5. 初始化dom
  const containerRef = useRef<HTMLDivElement>(null); // 通过泛型指定 `containerRef` 是一个 `HTMLDivElement`
  // 6.挂载完毕后获取dom 
  useEffect(() => {
    if (!containerRef.current) {
      throw new Error("containerRef.current is not valid");
    }
    containerRef.current?.appendChild(renderer.domElement)
    containerRef.current?.appendChild(stats.dom)

    // 8.调用渲染函数
    render()

    // 监听窗口大小变化事件
    window.addEventListener('resize', onResize);

    // 在此处执行其他渲染逻辑

    return () => {
      // 组件卸载时移除事件监听器
      window.removeEventListener('resize', onResize);
    };
  }, [])

  return (
    <>
      <div>
        {/* 5.初始化dom */}
        <div className="container" ref={containerRef}></div>
      </div>
    </>
  )
}
