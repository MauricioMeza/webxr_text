import * as THREE from 'three';
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls'
import {VRButton} from 'three/examples/jsm/webxr/VRButton'
import World from './world';
import Camera from './camera';
import './hamburger'

/***************************
 * Base Settings Boilerplate
 ***************************/
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

//camera
const camera = new Camera(scene);

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
renderer.setSize(camera.size.w, camera.size.h)
renderer.setPixelRatio(window.devicePixelRatio)


/**************************
 * World and Player
 ***************************/
var world = new World(scene, renderer);

//FPS Controls
var controls = new FirstPersonControls(camera.cam, canvas);
controls.lookSpeed = 0.1;
controls.movementSpeed = 20;
controls.enabled = false;

//ScrollControls
var changeControls = document.getElementById("ctrl-btn");
var scroller = document.getElementById("scroller");
const dialog = document.getElementById("desc-box");
const title = document.getElementById("titl-box");
var string = "";

for(var i=0; i<300; i++){
  string += ".<br>";
}
scroller.innerHTML = string;

//VRControls
renderer.xr.enabled = true;
var vrButton = VRButton.createButton(renderer)
vrButton.style.position = 'fixed';
document.body.appendChild(vrButton);


//events and actions
canvas.addEventListener('mousemove', (e) => {camera.updateMouse(e)});
canvas.addEventListener('click', (e) => {camera.goToLink(e)});
window.addEventListener('resize', (e) => {camera.resize(renderer)})
document.addEventListener('scroll', () => {camera.camScroll(changeControls)})
changeControls.addEventListener('click', (e) => {camera.changeControls(controls, changeControls)})


/**********************
 * Animate Render Loop
 **********************/
var clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  camera.checkRay(scene, dialog, title)
  renderer.render(scene, camera.cam)
  if(controls.enabled){
    controls.update(clock.getDelta());
    camera.cam.position.setY(10);
  }
})