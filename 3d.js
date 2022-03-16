import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.001, 500);
camera.position.set(0, 10, 0);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)


const cubeGeometry = new THREE.BoxGeometry(500, 500, 110);
const planeGeometry = new THREE.PlaneGeometry(500, 500, 25, 25);
const planeMaterial = new THREE.MeshBasicMaterial({color:0x222222, side:THREE.DoubleSide});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); 
const lineGeo = new THREE.WireframeGeometry( planeGeometry );
const lineMat = new THREE.LineBasicMaterial( { color: 0xffffff } );
const lineWire = new THREE.LineSegments( lineGeo, lineMat);
const cubeWire = new THREE.LineSegments( cubeGeo, lineMat);
cubeWire.position.z = -55;
planeMesh.add( lineWire );
planeMesh.add( cubeWire );
planeMesh.rotation.x = Math.PI / 2;
planeMesh.position.y = -5;
scene.add(planeMesh) 

scene.add(new THREE.AmbientLight(0xffffff))


var clock = new THREE.Clock();
const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick();