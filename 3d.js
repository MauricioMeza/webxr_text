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
window.addEventListener('resize', (e) => {
	e.preventDefault();
	camera.aspect = canvas.parentElement.clientWidth/canvas.parentElement.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( canvas.parentElement.clientWidth, canvas.clientHeight);
}, false);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 200, 200);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


//Creating the wireframe initial CUBE
const cubeGeometry = new THREE.BoxGeometry(101, 101, 101);
const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); 
const lineMat = new THREE.LineBasicMaterial( { color:0x0000ff } );
const lineMat2 = new THREE.LineBasicMaterial( { color:0xffffff } );
const cubeMats = [	new THREE.MeshBasicMaterial({color:0xFFFFFF, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFFEBEB, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFFD3D3, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),				
					new THREE.MeshBasicMaterial({color:0xFFC6C6, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFFB2B2, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFF9C9C, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFF6E6E, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFF8A8A, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFF5959, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFF3333, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
					new THREE.MeshBasicMaterial({color:0xFF0000, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1})]
const cubeWire = new THREE.LineSegments( cubeGeo, lineMat);
scene.add(cubeWire) 
//3D Text Axis
const loader = new THREE.FontLoader();
loader.load( './Roboto_Regular.json', function ( font ) {
	const properties = {font: font, size: 10, height: 2, curveSegments: 12}
	const textNGeometry = new THREE.TextGeometry( 'NECESIDADES',  properties);
	const textVGeometry = new THREE.TextGeometry( 'VARIEDADES', properties);
	const textCGeometry = new THREE.TextGeometry( 'CANALES', properties);
	const textMaterial = new THREE.MeshBasicMaterial({color:0xFFFFFF});
	const textNMesh = new THREE.Mesh(textNGeometry, textMaterial);
	const textVMesh = new THREE.Mesh(textVGeometry, textMaterial);
	const textCMesh = new THREE.Mesh(textCGeometry, textMaterial);
	textNMesh.rotation.set(0, 0, Math.PI/2);
	textNMesh.position.set(-55, -45, -55 )
	textVMesh.rotation.set(-Math.PI/2, 0, -Math.PI/2);
	textVMesh.position.set(-65, -55, -44)
	textCMesh.position.set(-30, 55, -55);
	scene.add(textNMesh);
	scene.add(textVMesh);
	scene.add(textCMesh);
});



//Arrays

var canl = [33, 11, 15, 21, 20]; //x
var ncsd = [12, 20, 12,	13,	12,	12, 19]; //y
var vard = [40, 18, 6, 16, 20]; //z

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
/*
var canl = [100]; //x
var ncsd = [100]; //y
var vard = [100]; //z
*/

var colors = [];
function randomColors(){
	for(var i=0; i<=(canl.length*ncsd.length*vard.length); i++){
		colors.push(Math.floor(Math.random()*cubeMats.length));
	}
}

//------------------------------------
//Inputs iniciales y botomos de slice
//------------------------------------
const ncsd_list = document.getElementById("nsc-cont");
const vard_list = document.getElementById("vrd-cont");
const canl_list = document.getElementById("cnl-cont");
const canl_slc = document.getElementById("top-slices");
const vard_slc = document.getElementById("right-slices");
const nscd_slc = document.getElementById("left-slices");
const color_slc = document.getElementById("color");
//Add input lists and buttons for slices 
addList(ncsd, ncsd_list, nscd_slc, "N");
addList(vard, vard_list, vard_slc,  "V");
addList(canl, canl_list, canl_slc, "C");
addColorFilter();
//Sums
const ncsd_sum = document.getElementById("sum-n");
const vard_sum = document.getElementById("sum-v");
const canl_sum = document.getElementById("sum-c");

//Por cada Necesidad, Canal, Variedad crear un input field
makeSum(ncsd, ncsd_sum);
makeSum(canl, canl_sum);
makeSum(vard, vard_sum);
function addList(list, container, buttons, letter){
	var i = 0;
	container.innerHTML = "";
	buttons.innerHTML = "";
	for(const n of list){
		//Input field
		container.innerHTML+=`<div class="row m-1">
								<div class="col-sm-4 p-0">${letter + (i+1)}</div>
								<div class="col-sm-8 p-0">
									<input class="${letter}-inner-inpt" name="valor" type="number" min="1" max="100" step="1" placeholder="%" value="${n}">
								</div>
							</div>`;

		//Filter Button
		var btn = document.createElement('button');
		btn.innerHTML = letter + (i+1);
		(letter == "C") ? btn.setAttribute("c",i) : btn.setAttribute("c",null);  
		(letter == "N") ? btn.setAttribute("n",i) : btn.setAttribute("n",null);  
		(letter == "V") ? btn.setAttribute("v",i) : btn.setAttribute("v",null);  
		btn.addEventListener('click', (e)=>{e.preventDefault();
											var cFilter = parseInt(e.target.getAttribute('c'));
											var nFilter = parseInt(e.target.getAttribute('n'));
											var vFilter = parseInt(e.target.getAttribute('v'));
											renderNew([cFilter, nFilter, vFilter])});
		buttons.appendChild(btn)
		i++;
	}
}
function addColorFilter(){
	for(var i=0; i<=cubeMats.length-1; i++){
		var btn = document.createElement('button');
		const total = 100/(cubeMats.length-1)
		btn.innerHTML = (i*total) + "%";
		btn.style.width = "8%"
		btn.setAttribute("color", i);
		btn.addEventListener('click', (e) =>{e.preventDefault();
											var colorFilter = parseInt(e.target.getAttribute('color'));
											console.log(colorFilter)
											renderNew([NaN, NaN, NaN, colorFilter])
											})
		color_slc.appendChild(btn);
	}
}
function makeSum(list, container){
	const suma = list.reduce(sum, 0);
	container.innerHTML=`<p>Total:${suma}</p>`
}

//--------------------------------------------------------
//Render cubes a partir de la informacion en los arreglos.
//--------------------------------------------------------
var cubes;
function renderCubes(filter){
	var sumVard = vard.reduce(sum, 0);
	var sumNcsd = ncsd.reduce(sum, 0);
	var sumCanl = canl.reduce(sum, 0);
	randomColors();
	var i=0;
	if(sumVard==100 && sumNcsd==100 && sumCanl==100){
		cubes = new THREE.Object3D();
		for (var v = 0; v<vard.length; v++) {
			for (var n = 0; n<ncsd.length; n++) {
				for (var c = 0; c<canl.length; c++) {
					var cf, nf, vf, color;
					(isNaN(filter[0])) ? cf=c: cf=filter[0];
					(isNaN(filter[1])) ? nf=n: nf=filter[1];
					(isNaN(filter[2])) ? vf=v: vf=filter[2]; 
					(isNaN(filter[3])) ? color=colors[i]: color=filter[3]; 
					if(c == cf && n == nf && v==vf && colors[i]==color){
						const cubeGeometry = new THREE.BoxGeometry(canl[c], ncsd[n], vard[v]);
						const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMats[colors[i]]);
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
					i++;
				}
			}	
		}
		cubes.position.set((canl[0]/2)-50, (ncsd[0]/2)-50, (vard[0]/2)-50);
		scene.add(cubes)
		console.log(cubes)
	}else{
		throw "Sumatoria no es exacta";
	}	
}
function sum(sum, a){
	return sum + a;
}
renderCubes([NaN, NaN, NaN, NaN]);


//-----------------------------------------------------
//Botones de interaccion para nuevos inputs y opacidad
//-----------------------------------------------------
const opacity_slider = document.getElementById("opacity-slider");
opacity_slider.value = 75;
const render_button = document.getElementById("render-btn");
const update_button = document.getElementById("updt-btn")
const mas_n = document.getElementById("+n");
const mas_c = document.getElementById("+c");
const mas_v = document.getElementById("+v");
const mns_n = document.getElementById("-n");
const mns_c = document.getElementById("-c");
const mns_v = document.getElementById("-v");

render_button.addEventListener('click', () => {renderNew([NaN, NaN, NaN])})
update_button.addEventListener('click', () => {getNewValues()})
opacity_slider.addEventListener('input', (e) => {
	for(var mat of cubeMats){
		mat.opacity = e.target.value/100
	}
})
mas_n.addEventListener('click', (e) => {
	ncsd.push(0); 
	addList(ncsd, ncsd_list, nscd_slc, "N"); 
	makeSum(ncsd, ncsd_sum)
})
mas_c.addEventListener('click', (e) => {
	canl.push(0); 
	addList(canl, canl_list, canl_slc, "C")
	makeSum(canl, canl_sum);
})
mas_v.addEventListener('click', (e) => {
	vard.push(0); 
	addList(vard,vard_list, vard_slc, "V")
	makeSum(vard,vard_sum);
})
mns_n.addEventListener('click', (e) => {
	ncsd.pop(); 
	addList(ncsd,ncsd_list, nscd_slc,"N")
	makeSum(ncsd, ncsd_sum)
})
mns_c.addEventListener('click', (e) => {
	canl.pop(); 
	addList(canl,canl_list, vard_slc, "C")
	makeSum(canl, canl_sum);
})
mns_v.addEventListener('click', (e) => {
	vard.pop(); 
	addList(vard,vard_list, vard_slc, "V")
	makeSum(vard,vard_sum);
})
	

function getNewValues(){
	ncsd = getValue("N-inner-inpt");
	canl = getValue("C-inner-inpt");
	vard = getValue("V-inner-inpt");
	makeSum(ncsd, ncsd_sum);
	makeSum(canl, canl_sum);
	makeSum(vard, vard_sum);
	renderNew([NaN, NaN, NaN]);
}
function getValue(clas){
	var htmls = document.getElementsByClassName(clas);
	var arr = [];
	for(const v of htmls){
		arr.push(parseInt(v.value));
	}
	return arr;
}
function renderNew(filter){
	scene.remove(cubes); 
	renderCubes(filter);
}


scene.add(new THREE.AmbientLight(0xffffff))

renderer.setAnimationLoop(() => {
	controls.update();
	renderer.render(scene, camera)	
})