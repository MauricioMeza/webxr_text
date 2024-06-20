import * as THREE from 'three';
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls'
import {VRButton} from 'three/examples/jsm/webxr/VRButton'
import World from './world';
import Camera from './camera';

import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";


/*************************
* Firebase Configuracion *
**************************/

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


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
world.downloadModel(storage)

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
loadButton.addEventListener('change', (e) => {world.loadFile(e.target.files[0], storage)});


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
