import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'

//Boilerplate Settings
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth/canvas.clientHeight, 0.001, 1000);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 200, 200);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


//Creating the wireframe world
const cubeGeometry = new THREE.BoxGeometry(101, 101, 101);
const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); 
const lineMat = new THREE.LineBasicMaterial( { color:0x0000ff } );
const lineMat2 = new THREE.LineBasicMaterial( { color:0xffffff } );
const cubeMat = new THREE.MeshBasicMaterial( 
	{color:0xaaaaaa, transparent:true, opacity:.5,  
	polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1});
const cubeWire = new THREE.LineSegments( cubeGeo, lineMat);
scene.add(cubeWire) 


//Arrays
var canl = [100]; //x
var ncsd = [100]; //y
var vard = [100]; //z

/*
var canl = [33, 11, 15, 21, 20]; //x
var ncsd = [12, 20, 3, 12,	13,	12,	12, 16]; //y
var vard = [40, 18, 6, 16, 20]; //z
*/
/*
var canl = [50, 50]; //x
var ncsd = [70, 30]; //y
var vard = [20, 80]; //z
*/
/*
var canl = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]; //x
var ncsd = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]; //y
var vard = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]; //z
*/
/*
var canl = [8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8]; //x
var ncsd = [8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8]; //y
var vard = [8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8]; //z
*/

const sumVard = vard.reduce(sum, 0);
const sumNcsd = ncsd.reduce(sum, 0);
const sumCanl = canl.reduce(sum, 0);
function sum(sum, a){
	return sum + a;
}


if(sumVard == 100 && sumNcsd == 100 && sumCanl==100){
	const cubes = new THREE.Object3D();
	for (var v = 0; v<vard.length; v++) {
		for (var n = 0; n<ncsd.length; n++) {
			for (var c = 0; c<canl.length; c++) {
				if(v<21 && n<21 && c<21){
					const cubeGeometry = new THREE.BoxGeometry(canl[c], ncsd[n], vard[v]);
					const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMat);
					const pos = new THREE.Vector3(0,0,0);
					(c > 0) ? pos.x = canl[0]/2 + canl.slice(1, c).reduce(sum, 0) + canl[c]/2 : pos.x;
					(n > 0) ? pos.y = ncsd[0]/2 + ncsd.slice(1, n).reduce(sum, 0) + ncsd[n]/2 : pos.y;
					(v > 0) ? pos.z = vard[0]/2 + vard.slice(1, v).reduce(sum, 0) + vard[v]/2 : pos.z;
					cubeMesh.position.set(pos.x, pos.y, pos.z);
					cubes.add(cubeMesh)
					const cubeGeo = new THREE.EdgesGeometry( cubeGeometry );
					const cubeWire = new THREE.LineSegments( cubeGeo, lineMat2);
					cubeMesh.add(cubeWire);
				}		
			}
		}	
	}
	cubes.position.set((canl[0]/2)-50, (ncsd[0]/2)-50, (vard[0]/2)-50);
	scene.add(cubes)
}else{
	throw "Sumatoria no es exacta";
}

const opacity_slider = document.getElementById("opacity_slider");
opacity_slider.addEventListener('input', (e) => {cubeMat.opacity = e.target.value/100 })

scene.add(new THREE.AmbientLight(0xffffff))

renderer.setAnimationLoop(() => {
	controls.update();
	renderer.render(scene, camera)	
})