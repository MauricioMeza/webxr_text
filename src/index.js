import * as THREE from 'three';
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import {VRButton} from 'three/examples/jsm/webxr/VRButton'
import World from './world';
import Camera from './camera';

import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";


/*************************
* Firebase Configuracion *
**************************/
/*
const firebaseConfig = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_APP_ID
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
*/

/*********************
* UI-HTML References *
**********************/
//const loadButton = document.getElementById("LoadButton");


/****************************
* Base Settings Boilerplate *
****************************/
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new Camera(scene);
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
const clock = new THREE.Clock();
renderer.setSize(camera.size.w, camera.size.h)
renderer.setPixelRatio(window.devicePixelRatio)


/*******************
* World and Player *
********************/
var world = new World(scene, renderer);
//world.downloadModel(storage)

//FPS-Controls
var controls = new FirstPersonControls(camera.cam, canvas);
controls.lookSpeed = 0.1;
controls.movementSpeed = 20;

//VR-Controls
renderer.xr.enabled = true;
const vrButton = VRButton.createButton(renderer)
vrButton.style.position = 'fixed';
document.body.appendChild(vrButton);
const controllerModelFactory = new XRControllerModelFactory();
const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0),  new THREE.Vector3(0, 0, -1)]);
const line = new THREE.Line(geometry);
line.scale.z = 10;
const controllers = [];
for (let i = 0; i < 2; i++) {
  const controller = renderer.xr.getController(i);
  controller.add(line.clone());
  controller.addEventListener('connected', (e) => {e.target.userData.gamepad = e.data.gamepad});
  controller.addEventListener('selectstart', (e) => {e.target.userData.selecting = true});
  controller.addEventListener('selectend', (e) => {e.target.userData.selecting = false});
  controller.userData.selecting = false;
  controller.userData.gamepad = null;
  controllers.push(controller);
  const grip = renderer.xr.getControllerGrip(i);
  grip.add(controllerModelFactory.createControllerModel(grip));
  camera.dolly.add(controller);
  camera.dolly.add(grip);
}

//Events-Actions
canvas.addEventListener('mousemove', (e) => {camera.updateMouse(e)});
window.addEventListener('resize', (e) => {camera.resize(renderer)})
vrButton.addEventListener('click', (e) => {controls.enabled = false; console.log(controllers);})
//loadButton.addEventListener('change', (e) => {world.loadFile(e.target.files[0], storage)});

/**********************
 * Animate Render Loop
 **********************/

renderer.setAnimationLoop(() => {
  camera.checkRay(scene);
  if(!controls.enabled){
    camera.moveDolly(clock.getDelta(), controllers);
  }
  camera.cam.position.setY(camera.initHeight);
  world.animate();
  renderer.render(scene, camera.cam)
  controls.update(clock.getDelta());
})
