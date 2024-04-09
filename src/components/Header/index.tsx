import './index.css'

const Index: React.FC = () => {
  return (
    <div id="overlay-container" className="content-width">
      <header id="header-container">
        {/* Logo */}
        <svg id="header-logo-svg" viewBox="0 0 56 61" xmlns="http://www.w3.org/2000/svg" height="60" width="56">
          <defs>
            <path id="logo-path"
              d="M3 14 24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14M28 4 5 17 28 28 51 17 28 4M53 20 30 31 30 56 53 44 53 20M40 42 33 35C33 35 32 34 33 33 34 32 35 33 36 34L36 34 43 41C44 42 44 42 43 43L35 51C35 51 34 52 33 51 32 50 33 49 33 49L40 42M16 42 23 35C23 35 24 34 23 33 22 32 21 33 20 34L13 41C12 42 12 42 13 43L21 51C21 51 22 52 23 51 24 50 23 49 23 49L16 42">
            </path>

            <clipPath id="logo-clip-path">
              <use fill="white" href="#logo-path" transform="scale(0.87)"></use>
            </clipPath>
          </defs>
        </svg>

        <div id="logo-dark-background">
          <div id="logo-white-background"></div>
        </div>

        <div id="logo-click-container"></div>

        {/* Sound Button */}
        <div id="sound-button-scale-container">
          <div id="sound-button" className="overlay-button gray-hover">
            <svg id="header-sound-svg" viewBox="0 0 18 9" xmlns="http://www.w3.org/2000/svg">
              <g fill="white">
                <path id="sound-body-path"
                  d="M 0 4 C 0 4 0 3 1 3 L 2 3 L 3 2 C 5 0 5 1 5 2 L 5 7 C 5 8 5 9 3 7 L 2 6 L 1 6 C 0 6 0 5 0 5 L 0 4">
                </path>
                <path id="sound-volume-0-path"
                  d="M 7 4 C 8 4 8 5 7 5 C 6 5 6 6 7 6 C 9 6 9 3 7 3 C 6 3 6 4 7 4">
                </path>
                <path id="sound-volume-1-path"
                  d="M 7 2 C 10 2 10 7 7 7 C 6 7 6 8 7 8 C 11 8 11 1 7 1 C 6 1 6 2 7 2">
                </path>
              </g>
            </svg>
          </div>
        </div>

        {/* Menu Button */}
        <div id="menu-button-scale-container">
          <div id="menu-button" className="overlay-button orange-hover flex flex-col justify-center">
            <div id="menu-button-bar-0" className="menu-button-bar"></div>
            <div id="menu-button-bar-1" className="menu-button-bar"></div>
            <div id="menu-button-bar-2" className="menu-button-bar"></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Index;