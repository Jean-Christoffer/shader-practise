import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { shaders } from "./shaders/shaders";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

shaders.forEach((s, i) => {
    const { geometry, material } = s;
    const mesh = new THREE.Mesh(geometry, material);

    const itemsPerRow = 3;

    const row = Math.floor(i / itemsPerRow);
    const col = i % itemsPerRow;

    mesh.position.x = col - 1;
    mesh.position.y = -row;
    scene.add(mesh);
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100,
);
camera.position.set(0, 0, 1);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    shaders.forEach((s) => (s.material.uniforms.u_time.value = elapsedTime));

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
