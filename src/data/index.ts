import * as THREE from 'three';

import { Resources } from '@/types/init'

export const resourcesData: Resources[] = [{
  name: "roomModel",
  type: "gltfModel",
  path: "models/room/model.glb"
}, {
  name: "roomShadowModel",
  type: "gltfModel",
  path: "models/room/shadow-model.glb"
}, {
  name: "bakedRoomTexture",
  type: "texture",
  path: "models/room/baked.jpg"
}, {
  name: "bakedShadowRoomTexture",
  type: "texture",
  path: "models/room/shadow-baked.jpg"
}, {
  name: "tone0Texture",
  type: "texture",
  path: "textures/sprites/tone-0.png"
}, {
  name: "tone1Texture",
  type: "texture",
  path: "textures/sprites/tone-1.png"
}, {
  name: "tone2Texture",
  type: "texture",
  path: "textures/sprites/tone-2.png"
}, {
  name: "heartTexture",
  type: "texture",
  path: "textures/sprites/heart.png"
}, {
  name: "characterModel",
  type: "gltfModel",
  path: "models/character/model.glb"
}, {
  name: "shirtMatcap",
  type: "texture",
  path: "textures/matcaps/shirt.jpg"
}, {
  name: "skinMatcap",
  type: "texture",
  path: "textures/matcaps/skin.jpg"
}, {
  name: "pantsMatcap",
  type: "texture",
  path: "textures/matcaps/pants.jpg"
}, {
  name: "whiteMatcap",
  type: "texture",
  path: "textures/matcaps/white.jpg"
}, {
  name: "bakedCharacterHeadTexture",
  type: "texture",
  path: "models/character/head-baked.jpg"
}, {
  name: "characterDefaultFace",
  type: "texture",
  path: "models/character/faces/default.png"
}, {
  name: "characterBlink0Face",
  type: "texture",
  path: "models/character/faces/blink-0.png"
}, {
  name: "characterBlink1Face",
  type: "texture",
  path: "models/character/faces/blink-1.png"
}, {
  name: "characterSmile0Face",
  type: "texture",
  path: "models/character/faces/smile/0.png"
}, {
  name: "characterSmile1Face",
  type: "texture",
  path: "models/character/faces/smile/1.png"
}, {
  name: "characterSmile2Face",
  type: "texture",
  path: "models/character/faces/smile/2.png"
}, {
  name: "characterScaredFace",
  type: "texture",
  path: "models/character/faces/scared.png"
}, {
  name: "characterSleepyFace",
  type: "texture",
  path: "models/character/faces/sleepy.png"
}, {
  name: "characterContact1Face",
  type: "texture",
  path: "models/character/faces/contact/1.png"
}, {
  name: "characterContact2Face",
  type: "texture",
  path: "models/character/faces/contact/2.png"
}, {
  name: "desktop0",
  type: "texture",
  path: "models/room/desktops/0.png"
}, {
  name: "desktop1",
  type: "texture",
  path: "models/room/desktops/1.png"
}, {
  name: "newMessageSprite",
  type: "texture",
  path: "textures/sprites/new-message.png"
}, {
  name: "desktop1Notification",
  type: "texture",
  path: "models/room/desktops/1-notification.png"
}, {
  name: "labModel",
  type: "gltfModel",
  path: "models/lab/model.glb"
}, {
  name: "labShadowModel",
  type: "gltfModel",
  path: "models/lab/shadow-model.glb"
}, {
  name: "bakedShadowLabTexture",
  type: "texture",
  path: "models/lab/shadow-baked.jpg"
}, {
  name: "bakedLabTexture",
  type: "texture",
  path: "models/lab/baked.jpg"
}, {
  name: "labScreenGraph",
  type: "texture",
  path: "models/lab/screen-graph.jpg"
}, {
  name: "labScreenOffline",
  type: "texture",
  path: "models/lab/screen-offline.jpg"
}, {
  name: "bubbleSprite",
  type: "texture",
  path: "textures/sprites/bubble.png"
}, {
  name: "bubblePopSprite",
  type: "texture",
  path: "textures/sprites/bubble-pop.png"
}, {
  name: "contactSceneModel",
  type: "gltfModel",
  path: "models/contact/model.glb"
}, {
  name: "bakedContactTexture",
  type: "texture",
  path: "models/contact/baked.jpg"
}, {
  name: "contactShadowModel",
  type: "gltfModel",
  path: "models/contact/shadow-model.glb"
}, {
  name: "bakedShadowContactTexture",
  type: "texture",
  path: "models/contact/shadow-baked.jpg"
}, {
  name: "davidImage",
  type: "texture",
  path: "images/david.png"
}];

export const Hc = `
varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`
  , Uc = `
uniform sampler2D alphaMask;
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;

void main()
{
    float alpha = texture2D(alphaMask, vUv).r;

    alpha = (1.0 - alpha) * uOpacity;

    gl_FragColor = vec4(uColor, alpha);
}`;


export const bgColors = {
  topLeft: {
    value: "#000e2e",
    instance: new THREE.Color("#000e2e")
  },
  topRight: {
    value: "#002757",
    instance: new THREE.Color("#002757")
  },
  bottomLeft: {
    value: "#004db3",
    instance: new THREE.Color("#004db3")
  },
  bottomRight: {
    value: "#009dff",
    instance: new THREE.Color("#009dff")
  }
}

export const rw = `
varying vec3 vColor;

uniform float uOffset;

void main()
{
    gl_Position = vec4(position.x, position.y + uOffset, position.z, 1.0);

    vColor = color;
}`
  , ow = `varying vec3 vColor;

void main()
{
    gl_FragColor = vec4(vColor, 1.0);
}`;