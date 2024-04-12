export interface Sizes {
  width: number;
  height: number;
  pixelRatio: number;
  touch: boolean;
  portrait: boolean,
}


export interface ParallaxOptions {
  intensity: number;
  speed: number;
  enabled: boolean;
}

export interface Resources {
  name: string;
  type: string;
  path: string;
}

export interface InitFunResult {
  renderer: THREE.WebGLRenderer;
  render: () => void;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  onResize: () => void;
}