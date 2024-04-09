import { useState, useEffect } from 'react';
import './index.css'

const Index: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div
      id="hover-icon"
      className='hover-icon'
      style={{ transform: `translate(-50%, -50%) translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
    >
      <svg id="hover-content" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" height="30" width="30"
        fill="white">
        <path id="arrow-path"
          d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z" />
      </svg>
      <div className="hover-spread"></div>
      <div className="hover-spread"></div>
    </div>
  );
}

export default Index;