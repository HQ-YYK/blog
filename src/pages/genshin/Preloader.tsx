"use client"
import { useRef } from 'react'
import "./Preloader.css";

const Preloader = ({ progress }: { progress: number }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  return (
    <div className="progress-container" style={{ opacity: progress != 100.00 ? "1" : "0" }}>
      <div className="progress-content" >
        <img className="Genshin" src={"img/genshin/Genshin.png"} alt="图片" style={{ opacity: progress != 100.00 ? "1" : "0" }} />
        <div className="LoadingBar" style={{ opacity: progress != 100.00 ? "1" : "0" }}>
          <div className="progress-bar">
            <div ref={progressRef} className="progress" style={{ width: progress + "%" }}></div>
          </div>
          <div className="ball" style={{ left: "-2vmin" }}></div>
          <div className="ball" style={{ left: "40.8vmin", top: "-2.4vmin" }}></div>
          <div style={{ fontSize: "1.4vmin", position: "relative", left: "42.8vmin", top: "-4.0vmin" }}>{progress + "%"}</div>
        </div>
      </div>
    </div>
  )
}
export default Preloader