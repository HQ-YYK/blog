import { forwardRef, useEffect, useRef, useState } from 'react';

import * as THREE from 'three'

import initFun from '../../hooks/init'
import bgFun from '../../hooks/bg'
import modelFun from '../../hooks/model'

import './index.css'

interface FristPageProps {
  loadingManager: any;
}

const Index = forwardRef<HTMLDivElement, FristPageProps>(({ loadingManager }, ref) => {
  const fristPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fristPageRef.current) {
      const { renderer, render, scene, onResize } = initFun(THREE)
      bgFun(THREE, scene, loadingManager)
      // modelFun(THREE, scene)

      fristPageRef.current?.appendChild(renderer.domElement)

      // 8.调用渲染函数
      render()

      // 监听窗口大小变化事件
      window.addEventListener('resize', onResize);
      return () => {
        // 组件卸载时移除事件监听器
        window.removeEventListener('resize', onResize);
      };
    }
  })

  return (
    <div id="landing-page" ref={fristPageRef} className="content-container landing-slow-transition">

      <section id="landing-page-section" className="content-width slide-out-left-transition">
        <svg id="landing-content-svg" viewBox="0 0 500 310" xmlns="http://www.w3.org/2000/svg">
          <text className="landing-headline" y="60" x="5">Hi, my</text>
          <text className="landing-headline" y="135" x="5">name is David.</text>
          <text className="landing-subheading" x="10" y="185">
            I love creating beautiful user experiences.
          </text>

          <foreignObject x="8" y="250" height="100" width="300" requiredExtensions="http://www.w3.org/1999/xhtml">
            <div id="landing-cta-button" className="big-button orange-hover">Get in touch</div>
          </foreignObject>
        </svg>
      </section>

    </div>
  );
})

export default Index;