export interface directionalLightType {
  color: any;
  intensity: any;
  position: {
    x: number;
    y: number;
    z: number;
  };
  castShadow: any;
  shadow: {
    camera: {
      near: number;
      far: number;
      right: number;
      left: number;
      top: number;
      bottom: number;
      width: number;
      height: number;
      radius: number;
      bias: number;
    };
  };
}