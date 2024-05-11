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
  rendererFun: any;
  sceneFun: any;
  cameraFun: any;
  raycasterFun: any;
  soundsFun: any;
  sizes: any;
}