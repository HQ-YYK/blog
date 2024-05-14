'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import Experience from '@/hooks/Experience'

import './globals.css'

export default function Home() {
  useEffect(() => {
    new Experience(document.getElementById('main-canvas'))
  }, [])

  return (
    <>
      {/* Canvas */}
      <canvas id="main-canvas"></canvas>

      {/* Intro */}
      <div id="intro-container" className="center column">
        <svg
          id="intro-svg"
          viewBox="0 0 56 61"
          xmlns="http://www.w3.org/2000/svg"
          height="120"
          width="120">
          <mask id="intro-mask">
            <rect fill="black" height="61" width="61"></rect>
            <rect fill="white" height="61" width="61" id="loading-rect"></rect>
          </mask>
          <use href="#logo-path" fill="#091434" opacity=".1"></use>
          <use href="#logo-path" fill="#091434" mask="url(#intro-mask)"></use>
        </svg>
      </div>

      {/* Loading Container */}
      <div id="transition-container" className="hide">
        <svg
          id="transition-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320">
          <defs>
            <path
              fill="#FF923E"
              id="transition-wave-path"
              d="M0,128L21.8,138.7C43.6,149,87,171,131,154.7C174.5,139,218,85,262,69.3C305.5,53,349,75,393,101.3C436.4,128,480,160,524,186.7C567.3,213,611,235,655,213.3C698.2,192,742,128,785,122.7C829.1,117,873,171,916,186.7C960,203,1004,181,1047,160C1090.9,139,1135,117,1178,96C1221.8,75,1265,53,1309,53.3C1352.7,53,1396,75,1418,85.3L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
          </defs>
          <use href="#transition-wave-path"></use>
        </svg>

        <div id="transition-push"></div>

        <svg
          id="transition-wave-svg-bottom"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320">
          <use href="#transition-wave-path"></use>
        </svg>
      </div>

      <div id="overlay-container" className="content-width">
        <header id="header-container">
          <svg
            id="header-logo-svg"
            viewBox="0 0 56 61"
            xmlns="http://www.w3.org/2000/svg"
            height="60"
            width="56">
            <defs>
              <path
                id="logo-path"
                d="M3 14 24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14M28 4 5 17 28 28 51 17 28 4M53 20 30 31 30 56 53 44 53 20M40 42 33 35C33 35 32 34 33 33 34 32 35 33 36 34L36 34 43 41C44 42 44 42 43 43L35 51C35 51 34 52 33 51 32 50 33 49 33 49L40 42M16 42 23 35C23 35 24 34 23 33 22 32 21 33 20 34L13 41C12 42 12 42 13 43L21 51C21 51 22 52 23 51 24 50 23 49 23 49L16 42"></path>

              <clipPath id="logo-clip-path">
                <use
                  fill="white"
                  href="#logo-path"
                  transform="scale(0.87)"></use>
              </clipPath>
            </defs>
          </svg>

          <div id="logo-dark-background">
            <div id="logo-white-background"></div>
          </div>

          <div id="logo-click-container"></div>

          <div id="sound-button-scale-container">
            <div id="sound-button" className="center overlay-button">
              <svg
                id="header-sound-svg"
                viewBox="0 0 18 9"
                xmlns="http://www.w3.org/2000/svg">
                <g fill="white">
                  <path
                    id="sound-body-path"
                    d="M 0 4 C 0 4 0 3 1 3 L 2 3 L 3 2 C 5 0 5 1 5 2 L 5 7 C 5 8 5 9 3 7 L 2 6 L 1 6 C 0 6 0 5 0 5 L 0 4"></path>
                  <path
                    id="sound-volume-0-path"
                    d="M 7 4 C 8 4 8 5 7 5 C 6 5 6 6 7 6 C 9 6 9 3 7 3 C 6 3 6 4 7 4"></path>
                  <path
                    id="sound-volume-1-path"
                    d="M 7 2 C 10 2 10 7 7 7 C 6 7 6 8 7 8 C 11 8 11 1 7 1 C 6 1 6 2 7 2"></path>
                </g>
              </svg>
            </div>
          </div>

          <div id="menu-button-scale-container">
            <div
              id="menu-button"
              className="center column overlay-button orange-hover">
              <div id="menu-button-bar-0" className="menu-button-bar"></div>
              <div id="menu-button-bar-1" className="menu-button-bar"></div>
              <div id="menu-button-bar-2" className="menu-button-bar"></div>
            </div>
          </div>
        </header>

        <div className="scroll-container">
          <div className="scroll-border-container">
            <div className="scroll-wheel"></div>
          </div>
          <Image
            className="scroll-touch-icon hide"
            src="/touch-icon.png"
            alt="scroll mouse icon wheel"
            width={38}
            height={38}
          />
        </div>

        <div className="scroll-container" style={{ opacity: 0 }}>
          <div
            className="scroll-border-container"
            style={{ borderColor: 'rgb(255, 255, 255)' }}>
            <div
              className="scroll-wheel"
              style={{ background: 'rgb(255, 255, 255)' }}></div>
          </div>
          <Image
            className="scroll-touch-icon hide"
            src="/touch-icon.png"
            style={{ filter: 'brightness(100)' }}
            width={38}
            height={38}
            alt="scroll mouse icon wheel"
          />
        </div>
      </div>

      <div id="menu-container" className="column">
        <div id="menu-content-container" className="column">
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

          <div id="menu-social-container" className="row">
            <a
              tabIndex={-1}
              target="_blank"
              href="https://twitter.com/DavidHckh">
              <Image
                className="social-icon"
                src="/icons/twitter-icon.png"
                alt="Twitter Menu Icon"
                height="28"
                width="28"></Image>
            </a>
            <a
              tabIndex={-1}
              target="_blank"
              href="https://github.com/davidhckh">
              <Image
                className="social-icon"
                alt="Github Menu Icon"
                height="28"
                width="28"
                src="/icons/github-icon.png"></Image>
            </a>
            <a
              tabIndex={-1}
              target="_blank"
              href="https://www.linkedin.com/in/david-heckhoff-1ba8a622a/">
              <Image
                className="social-icon "
                alt="Linkedin Menu Icon"
                height="28"
                width="28"
                src="/icons/linkedin-icon.png"></Image>
            </a>
            <a tabIndex={-1} href="mailto:david.heckhoff@gmail.com">
              <Image
                className="social-icon"
                alt="Email Menu Icon"
                height="28"
                width="28"
                src="/icons/mail-icon.png"></Image>
            </a>
          </div>
          <hr />
          <div id="music-credit-container" className="row">
            <span>
              Music produced by
              <a
                tabIndex={-1}
                href="https://soundcloud.com/hmsurf"
                target="_blank">
                HM Surf
              </a>
            </span>
          </div>
        </div>
      </div>

      <div id="hover-icon">
        <svg
          id="hover-content"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="30"
          fill="white">
          <path
            id="arrow-path"
            d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z"
          />
        </svg>
        <div className="hover-spread"></div>
        <div className="hover-spread"></div>
      </div>

      <div
        id="landing-page"
        className="content-container landing-slow-transition">
        <section
          id="landing-page-section"
          className="content-width slide-out-left-transition">
          <svg
            id="landing-content-svg"
            viewBox="0 0 500 310"
            xmlns="http://www.w3.org/2000/svg">
            <text className="landing-headline" y="60" x="5">
              Hi, my
            </text>
            <text className="landing-headline" y="135" x="5">
              name is L.
            </text>
            <text className="landing-subheading" x="10" y="185">
              I love creating beautiful user experiences.
            </text>

            <foreignObject
              x="8"
              y="250"
              height="100"
              width="300"
              requiredExtensions="http://www.w3.org/1999/xhtml">
              <div id="landing-cta-button" className="big-button orange-hover">
                Get in touch
              </div>
            </foreignObject>
          </svg>
        </section>
      </div>

      <div id="scroll-container" className="center column">
        <section id="about-section" className="content-width">
          {/* About Container */}
          <div id="about-content-container">
            {/* Header Container SVG */}
            <svg
              id="skills-svg"
              viewBox="-2 -2 506 815"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMid">
              {/* Defs */}
              <defs>
                {/* Profile picture aniamtion line gradient */}
                <linearGradient
                  id="about-profile-picture-mask-gradient"
                  gradientTransform="rotate(90)">
                  <stop offset="5%" stopColor="#60CAFF" />
                  <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                </linearGradient>

                {/* Background Gradient */}
                <linearGradient
                  id="about-background-gradient"
                  gradientTransform="rotate(90)">
                  <stop offset="30%" stopColor="rgba(0, 88, 165, .15)" />
                  <stop offset="95%" stopColor="rgba(0, 132, 255, .3)" />
                </linearGradient>

                {/* Icon Template */}
                <polyline
                  id="about-icon-background"
                  fill="#00b7ff18"
                  points="0,10 10,0 65,0 75,10 75,65 65,75 10,75 0,65"
                />
              </defs>

              {/* Header */}
              <g id="about-svg-header">
                {/* Profile Picture Background */}
                <polyline
                  id="about-profile-background"
                  className="about-box-background"
                  points="65,170 145,170 145,50 135,40 135,10 125,0 70,0 10,0 0,10 0,160 10,170"
                />

                {/* Header Content Background */}
                <polyline
                  id="about-header-background"
                  className="about-box-background"
                  points="145,85 250,85 260,95 490,95 500,105 500,135 500,150 490,160 200,160 190,170 145,170"
                />

                {/* Profile Picture Mask */}
                {/* Mask Definition */}
                <defs>
                  <mask id="about-profile-picture-mask">
                    {/* Black Background */}
                    <rect fill="black" x="0" y="0" width="145" height="170" />
                    {/* White Background */}
                    <polygon
                      fill="white"
                      points="65,170 145,170 145,50 135,40 135,10 125,0 70,0 10,0 0,10 0,160 10,170"
                    />
                    {/* Rect to make white background visible */}
                    <rect
                      id="about-profile-picture-mask-rect"
                      fill="black"
                      width="145"
                      height="170"
                      style={{ transition: '1.2s' }}
                      x="0"
                      y="-0"
                    />
                  </mask>
                </defs>

                {/* Profile Picture */}
                <image
                  href="/skills-profile-picture.png"
                  opacity="1"
                  height="170"
                  width="145"
                  x="2"
                  mask="url(#about-profile-picture-mask)"
                  imageRendering="optimizeSpeed"
                />

                {/* Profile Picture line that moves up on animation */}
                <g mask="url(#about-profile-picture-mask)">
                  <rect
                    fill="url(#about-profile-picture-mask-gradient)"
                    height="35"
                    width="155"
                    y="170"
                    id="about-profile-picture-gradient"
                    style={{ transition: '1.2s' }}
                  />
                </g>

                {/* Profile Picture Borders */}
                <polyline
                  className="about-box-line"
                  points="65,170 10,170 0,160 0,10 10,0 70,0"
                />
                <polyline
                  className="about-box-line"
                  points="65,170 145,170 145,50 135,40 135,10 125,0 70,0"
                />

                {/* Header Content Borders */}
                <polyline
                  className="about-box-line"
                  points="145,85 250,85 260,95 490,95 500,105 500,135"
                />
                <polyline
                  className="about-box-line"
                  points="145,170 190,170 200,160 490,160 500,150 500,135"
                />

                {/* Header Content */}
                <g
                  transform="translate(170 118)"
                  fill="#34bfff"
                  fontWeight="bold">
                  <text
                    x="0"
                    y="0"
                    fontSize="12"
                    className="about-header-upper-text">
                    Name :
                  </text>
                  <text
                    x="0"
                    y="20"
                    fontSize="18"
                    className="about-header-lower-text">
                    L
                  </text>
                  <text
                    x="110"
                    y="0"
                    fontSize="12"
                    className="about-header-upper-text">
                    Age :
                  </text>
                  <text
                    x="110"
                    y="20"
                    fontSize="18"
                    className="about-header-lower-text">
                    23
                  </text>
                  <text
                    x="200"
                    y="0"
                    fontSize="12"
                    className="about-header-upper-text">
                    From :
                  </text>
                  <text
                    x="200"
                    y="20"
                    fontSize="18"
                    className="about-header-lower-text">
                    Germany
                  </text>
                </g>
              </g>

              {/* Skills */}
              <g transform="translate(0 188)" id="about-svg-skills">
                {/* Background */}
                <polyline
                  id="about-skills-background"
                  className="about-box-background"
                  points="250,35 200,35 200,10 190,0 10,0 0,10 0,245 10,255 197,255 215,273 215,290 250,290 400,290 410,280 490,280 500,270 500,55 490,45 310,45 300,35"
                />

                {/* Lines */}
                <polyline
                  className="about-box-line"
                  points="250,35 200,35 200,10 190,0 10,0 0,10 0,245 10,255 197,255 215,273 215,290 250,290"
                />
                <polyline
                  className="about-box-line"
                  points="250,35 300,35 310,45 490,45 500,55 500,270 490,280 410,280 400,290 250,290"
                />

                {/* Header Mask */}
                <mask id="skills-header-mask">
                  <polyline
                    fill="white"
                    points="0,37 0,10 10,0 190,0 200,10 200,37"></polyline>
                  <rect
                    fill="white"
                    x="0"
                    y="210"
                    width="500"
                    height="6"></rect>
                </mask>

                {/* Header Box */}
                <rect
                  id="skills-header-rect"
                  x="0"
                  y="0"
                  height="47"
                  width="500"
                  fill="#00b7ff"
                  opacity=".15"
                  mask="url(#skills-header-mask)"></rect>

                {/* Header Text */}
                <text
                  x="71"
                  y="25"
                  className="about-header"
                  fontSize="18"
                  fontWeight="bold">
                  SKILLS
                </text>

                <foreignObject x="0" y="60" width="506" height="340">
                  {/* Skills Content */}
                  <div id="about-skills-container" className="about-container">
                    {/* Main Render Container */}
                    <div id="about-skills-render-container"></div>
                    {/* Others Render Container */}
                    <div id="about-others-render-container"></div>
                  </div>
                </foreignObject>
              </g>

              {/* About */}
              <g transform="translate(0 459)" id="about-svg-about">
                {/* Background */}
                <polyline
                  id="about-about-background"
                  className="about-box-background"
                  points="250,35 200,35 200,10 190,0 10,0 0,10 0,35 0,315 10,325 100,325 110,335 250,335 490,335 500,325 500,55 490,45 410,45 400,35"
                />

                {/* Lines */}
                <polyline
                  className="about-box-line"
                  points="250,35 200,35 200,10 190,0 10,0 0,10 0,35 0,315 10,325 100,325 110,335 250,335"
                />
                <polyline
                  className="about-box-line"
                  points="250,35 400,35 410,45 490,45 500,55 500,325 490,335 250,335"
                />

                {/* Header Mask */}
                <mask id="about-header-mask">
                  <polyline
                    fill="white"
                    points="0,37 0,10 10,0 190,0 200,10 200,37"></polyline>
                  <rect
                    fill="white"
                    x="0"
                    y="210"
                    width="500"
                    height="6"></rect>
                </mask>

                {/* Header Box */}
                <rect
                  id="about-header-rect"
                  x="0"
                  y="0"
                  height="47"
                  width="500"
                  fill="#00b7ff"
                  opacity=".15"
                  mask="url(#about-header-mask)"></rect>

                {/* Header Text */}
                <text
                  x="73"
                  y="25"
                  className="about-header"
                  fontSize="18"
                  fontWeight="bold">
                  ABOUT
                </text>

                {/* First Content */}
                <g transform="translate(10 65)">
                  <use
                    className="about-icon"
                    href="#about-icon-background"></use>

                  <mask id="about-pixel-mask-0">
                    <rect
                      className="about-pixel-mask-rect"
                      x="6"
                      y="7"
                      height="20"
                      width="64"
                      fill="white"
                    />
                  </mask>
                  <image
                    mask="url(#about-pixel-mask-0)"
                    className="about-pixel-image"
                    height="64"
                    width="64"
                    href="/icons/baby-pixel.png"
                    x="6"
                    y="7"
                  />

                  {/* First Text */}
                  <text x="88" y="33" className="about-text">
                    At the age of 15, David first came in touch with UX
                  </text>
                  <text x="88" y="50" className="about-text">
                    Design and app development.
                  </text>
                </g>

                {/* Second Content */}
                <g transform="translate(10 145)">
                  <use
                    className="about-icon"
                    href="#about-icon-background"
                    x="405"></use>

                  <mask id="about-pixel-mask-1">
                    <rect
                      className="about-pixel-mask-rect"
                      x="413"
                      y="6"
                      height="20"
                      width="64"
                      fill="white"
                    />
                  </mask>
                  <image
                    mask="url(#about-pixel-mask-1)"
                    className="about-pixel-image"
                    height="64"
                    width="64"
                    href="/icons/heart-pixel.png"
                    x="413"
                    y="6"
                  />

                  {/* Second Icon Render Container */}
                  <g id="about-icon-1" transform="translate(417 5) scale(0.8)">
                    {' '}
                  </g>

                  {/* Second Text */}
                  <text x="5" y="33" className="about-text">
                    During his 4 years of military service, programming
                  </text>
                  <text x="5" y="50" className="about-text">
                    has always been a passion of his.
                  </text>
                </g>

                {/* Third Content */}
                <g transform="translate(10 225)">
                  <use
                    className="about-icon"
                    href="#about-icon-background"></use>

                  {/* Third Icon Render Container */}
                  <g id="about-icon-2" transform="translate(5 5) scale(0.8)">
                    {' '}
                  </g>

                  <mask id="about-pixel-mask-2">
                    <rect
                      className="about-pixel-mask-rect"
                      x="6"
                      y="7"
                      height="20"
                      width="64"
                      fill="white"
                    />
                  </mask>
                  <image
                    mask="url(#about-pixel-mask-2)"
                    className="about-pixel-image"
                    height="64"
                    width="64"
                    href="/icons/rocket-pixel.png"
                    x="6"
                    y="7"
                  />

                  {/* Third Text */}
                  <text x="88" y="33" className="about-text">
                    Now, after professional coaching, David is looking for
                  </text>
                  <text x="88" y="50" className="about-text">
                    new challenges to work as a web developer.
                  </text>
                </g>
              </g>

              {/* Down Animation Lines */}
              <g transform="translate(145 76)">
                <polyline
                  className="about-down-animation-line"
                  points="0,0 110,0 120,10 325,10 333,18"
                />
              </g>
              <g transform="translate(195 192)">
                <polyline
                  className="about-down-animation-line"
                  points="0,0 8,0 13,5 13,22 110,22 120,32 275,32 283,40"
                />
              </g>
              <g transform="translate(403 496)">
                <polyline
                  className="about-down-animation-line"
                  points="0,0 70,0 78,8"
                />
              </g>

              {/* Up Animation Lines */}
              <g transform="translate(193 160)">
                <polyline
                  className="about-up-animation-line"
                  points="0,7 275,7 282,0"
                />
              </g>
              <g transform="translate(403 468)">
                <polyline
                  className="about-up-animation-line"
                  points="0,8 70,8 78,0"
                />
              </g>
              <g transform="translate(20 784)">
                <polyline
                  className="about-up-animation-line"
                  points="0,0 9,9 74,9 84,19 450,19 458,11"
                />
              </g>
            </svg>
          </div>
        </section>
      </div>
    </>
  )
}
