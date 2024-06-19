import * as THREE from 'three';
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls'
import {VRButton} from 'three/examples/jsm/webxr/VRButton'
import World from './world';
import Camera from './camera';

/*********************
* UI-HTML References *
**********************/
const loadButton = document.getElementById("LoadButton");


/****************************
* Base Settings Boilerplate *
****************************/
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new Camera(scene);
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
renderer.setSize(camera.size.w, camera.size.h)
renderer.setPixelRatio(window.devicePixelRatio)


/*******************
* World and Player *
********************/
var world = new World(scene, renderer);

//FPS-Controls
var controls = new FirstPersonControls(camera.cam, canvas);
controls.lookSpeed = 0.1;
controls.movementSpeed = 20;

//VR-Controls
renderer.xr.enabled = true;
var vrButton = VRButton.createButton(renderer)
vrButton.style.position = 'fixed';
document.body.appendChild(vrButton);

//Events-Actions
canvas.addEventListener('mousemove', (e) => {camera.updateMouse(e)});
window.addEventListener('resize', (e) => {camera.resize(renderer)})
loadButton.addEventListener('change', (e) => {world.loadFile(e.target.files[0])});


/**********************
 * Animate Render Loop
 **********************/
var clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  camera.checkRay(scene)
  world.animate();
  renderer.render(scene, camera.cam)
  controls.update(clock.getDelta());
  camera.cam.position.setY(10);
})
