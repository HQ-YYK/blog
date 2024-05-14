import * as THREE from 'three'

export const Hc = `
varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,
  Uc = `
uniform sampler2D alphaMask;
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;

void main()
{
    float alpha = texture2D(alphaMask, vUv).r;

    alpha = (1.0 - alpha) * uOpacity;

    gl_FragColor = vec4(uColor, alpha);
}`

export const bgColors = {
  topLeft: {
    value: '#000e2e',
    instance: new THREE.Color('#000e2e'),
  },
  topRight: {
    value: '#002757',
    instance: new THREE.Color('#002757'),
  },
  bottomLeft: {
    value: '#004db3',
    instance: new THREE.Color('#004db3'),
  },
  bottomRight: {
    value: '#009dff',
    instance: new THREE.Color('#009dff'),
  },
}

export const rw = `
varying vec3 vColor;

uniform float uOffset;

void main()
{
    gl_Position = vec4(position.x, position.y + uOffset, position.z, 1.0);

    vColor = color;
}`,
  ow = `varying vec3 vColor;

void main()
{
    gl_FragColor = vec4(vColor, 1.0);
}`
