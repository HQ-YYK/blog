import { forwardRef, useEffect, useRef, useState } from 'react';
import './index.css'

interface FristPageProps {
  loadingManager: any;
}

const Index = forwardRef<HTMLDivElement, FristPageProps>(({ loadingManager }, ref) => {
  return (
    <div id="landing-page" className="content-container landing-slow-transition">
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

// 👇️ set display name
Index.displayName = 'FristPage';

export default Index;