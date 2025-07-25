import * as THREE from "three";

import vertex1 from "./shader1/vertex.glsl";
import frag1 from "./shader1/fragment.glsl";

import vertex2 from "./shader2/vertex.glsl";
import frag2 from "./shader2/fragment.glsl";

export const shaders = [
  {
    geometry: new THREE.PlaneGeometry(1, 1, 32, 32),
    material: new THREE.ShaderMaterial({
      vertexShader: vertex1,
      fragmentShader: frag1,
      side: THREE.DoubleSide,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    }),
  },
  {
    geometry: new THREE.PlaneGeometry(1, 1, 32, 32),
    material: new THREE.ShaderMaterial({
      vertexShader: vertex2,
      fragmentShader: frag2,
      side: THREE.DoubleSide,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    }),
  },
  {
    geometry: new THREE.PlaneGeometry(1, 1, 32, 32),
    material: new THREE.ShaderMaterial({
      vertexShader: vertex1,
      fragmentShader: frag1,
      side: THREE.DoubleSide,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    }),
  },
];
