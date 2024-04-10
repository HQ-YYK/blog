import Image from 'next/image'

import './index.css'

const Index: React.FC = () => {
  return (
    <div id="menu-container" className="column">
      <div id="menu-content-container" className="column">
        {/* Menu Items */}
        <div id="menu-items-container">
          <div className="column menu-items-column-container">
            <span className="menu-item active-menu-item">Home</span>
            <span className="menu-item">About</span>
          </div>
          <div className="column menu-items-column-container">
            <span className="menu-item">Work</span>
            <span className="menu-item">Contact</span>
          </div>
        </div>
        {/* Social Link */}
        <div id="menu-social-container" className="row">
          <a tabIndex={-1} target="_blank" href="https://twitter.com/DavidHckh"><Image className="social-icon"
            src="/icons/twitter-icon.png" alt="Twitter Menu Icon" height="28" width="28"></Image></a>
          <a tabIndex={-1} target="_blank" href="https://github.com/davidhckh"><Image className="social-icon"
            alt="Github Menu Icon" height="28" width="28" src="/icons/github-icon.png"></Image></a>
          <a tabIndex={-1} target="_blank" href="https://www.linkedin.com/in/david-heckhoff-1ba8a622a/"> <Image
            className="social-icon " alt="Linkedin Menu Icon" height="28" width="28"
            src="/icons/linkedin-icon.png"></Image></a>
          <a tabIndex={-1} href="mailto:david.heckhoff@gmail.com"> <Image className="social-icon" alt="Email Menu Icon"
            height="28" width="28" src="/icons/mail-icon.png"></Image></a>
        </div>
        <hr />
        {/* -Music Credits */}
        <div id="music-credit-container" className="row">
          <span>
            Music produced by
            <a tabIndex={-1} href="https://soundcloud.com/hmsurf" target="_blank">HM Surf</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Index;