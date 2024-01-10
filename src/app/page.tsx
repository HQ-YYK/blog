"use client"

import { useRef, useEffect } from 'react'
// 1. 导入three.js
import * as THREE from 'three'

import initFun from './hooks/init'
// import cubeFun from './hooks/cube'

export default function Home() {
  const { render, renderer, scene, camera } = initFun(THREE)
  // cubeFun(THREE, scene, camera)

  // 5. 初始化dom
  const containerRef = useRef<HTMLDivElement>(null); // 通过泛型指定 `containerRef` 是一个 `HTMLDivElement`
  // 6.挂载完毕后获取dom 
  useEffect(() => {
    if (!containerRef.current) {
      throw new Error("containerRef.current is not valid");
    }
    containerRef.current?.appendChild(renderer.domElement)

    // 8.调用渲染函数
    render()
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
