"use client"
import { SetStateAction, useRef, useState } from 'react'
import "./Preloader.css";

const Preloader = ({ progress }: { progress: number }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  // 用于判断是否正在拖动
  const [isDragging, setIsDragging] = useState(false);
  // 鼠标Y坐标
  const [initialY, setInitialY] = useState(0);
  // 旋转角度（Y轴）
  const [initialRotationY, setInitialRotationY] = useState(0);

  const handleMouseDown = (event: { clientY: SetStateAction<number>; }) => {
    setInitialY(event.clientY);
    const elem = progressRef.current;
    if (elem) {
      const computedStyle = window.getComputedStyle(elem);
      const transform = computedStyle.getPropertyValue('transform').replace(/[^0-9-.,]/g, '').split(',');
      setInitialRotationY(parseInt(transform[4]));
      setIsDragging(true);
    }
  };

  const handleMouseMove = (event: { clientY: any; }) => {
    const elem = progressRef.current;
    if (isDragging && elem) {
      const currentY = event.clientY;
      const dy = currentY - initialY;
      const newRotationY = initialRotationY + dy * -1;
      elem.style.transform = `rotateX(${newRotationY}deg)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="box">
      <div
        className="main1 flex"
        ref={progressRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="main2">
          <div className="firstCircle positon center"></div>
          {/* 最外层的圆环 */}
          <div className="secondCircle positon center"></div>
          {/* 第二层两段圆环 */}
          <div className="fourthCircle flex positon center">
            {/* 一堆圆环组成的圆环 */}
            <div className="annulusContent">
              <div className="annulus annulus1"></div>
              {/* 每一个小圆环 */}
              <div className="annulus annulus2"></div>
              <div className="annulus annulus3"></div>
              <div className="annulus annulus4"></div>
              <div className="annulus annulus5"></div>
              <div className="annulus annulus6"></div>
              <div className="annulus annulus7"></div>
              <div className="annulus annulus8"></div>
              <div className="annulus annulus9"></div>
              <div className="annulus annulus10"></div>
              <div className="annulus annulus11"></div>
              <div className="annulus annulus12"></div>
              <div className="annulus annulus13"></div>
              <div className="annulus annulus14"></div>
              <div className="annulus annulus15"></div>
              <div className="annulus annulus16"></div>
              <div className="annulus annulus17"></div>
              <div className="annulus annulus18"></div>
              <div className="annulus annulus19"></div>
              <div className="annulus annulus20"></div>
              <div className="annulus annulus21"></div>
              <div className="annulus annulus22"></div>
              <div className="annulus annulus23"></div>
              <div className="annulus annulus24"></div>
              <div className="annulus annulus25"></div>
              <div className="annulus annulus26"></div>
              <div className="annulus annulus27"></div>
              <div className="annulus annulus28"></div>
              <div className="annulus annulus29"></div>
              <div className="annulus annulus30"></div>
              <div className="annulus annulus31"></div>
              <div className="annulus annulus32"></div>
              <div className="annulus annulus33"></div>
              <div className="annulus annulus34"></div>
              <div className="annulus annulus35"></div>
              <div className="annulus annulus36"></div>
            </div>
          </div>
          <div className="fifthCircle positon center"></div>
          <div className="sixthCircle positon center"></div>
          <div className="seventhCircle positon center"></div>
        </div>

        <div className="main3">
          <div className='progress'>{progress}%</div>
        </div>
      </div>
    </div>
  )
}
export default Preloader