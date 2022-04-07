import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'
import Vectores from './vectors.js';
import Cubes from './cubes.js';
import Empresa from './empresa.js'

/*---------------------
//Boilerplate Settings
----------------------*/
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth/canvas.clientHeight, 0.001, 1000);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: false})
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

const ray = new THREE.Raycaster();
const rect = canvas.getBoundingClientRect();
var objSelected = null;
var selectMat = new THREE.MeshBasicMaterial({color:0x00FF00})
document.addEventListener('mousemove', (e) =>{
	const mouse3D = new THREE.Vector2(0,0);
	mouse3D.x = (e.clientX / canvas.clientWidth) * 2 - 1;
	mouse3D.y = -(e.clientY / canvas.clientHeight) * 2 + 1 ;
	if(mouse3D.x <= 1 && mouse3D.y <=1){
		ray.setFromCamera(mouse3D, camera);
		var intersect = ray.intersectObjects(cubes.cubes.children);
		if(intersect.length > 0 && intersect[0].object.name=="cubitodubidu"){
			if(objSelected !== null){
				if(intersect[0].object !== objSelected){
					objSelected.material = objSelected.userData.orglMat;	
				}
			}
			objSelected = intersect[0].object;
			objSelected.material = selectMat;
			info_slc.innerHTML = `	Necesidad:${objSelected.userData.n}, 
									Variedad:${objSelected.userData.v}, 
									Canal:${objSelected.userData.n}`
		}else if((intersect.length == 0 && objSelected != null)){
			objSelected.material = objSelected.userData.orglMat;
			objSelected = null;
			info_slc.innerHTML = "Necesidad:x, Variedad:x, Canal:x"
		}
	}
})

//Animation Loop
renderer.setAnimationLoop(() => {
	controls.update();
	renderer.render(scene, camera)	
})

/*---------------------
//Scene World Definition
----------------------*/
//Creating the initial wireframe CUBE
const cubeGeometry = new THREE.BoxGeometry(101, 101, 101);
const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); 
const lineMat = new THREE.LineBasicMaterial( { color:0x0000ff } );
const cubeWire = new THREE.LineSegments( cubeGeo, lineMat);
cubeWire.name = "lineasCubo"
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
	textCMesh.name = "Canales";
	textCMesh.name = "Variedades";
	textCMesh.name = "Necesidades";
	textNMesh.rotation.set(0, 0, Math.PI/2);
	textNMesh.position.set(-55, -45, -55 )
	textVMesh.rotation.set(-Math.PI/2, 0, -Math.PI/2);
	textVMesh.position.set(-65, -55, -44)
	textCMesh.position.set(-30, 55, -55);
	scene.add(textNMesh);
	scene.add(textVMesh);
	scene.add(textCMesh);
});


/*----------------------------
//Arrays Empresas and Parameters
------------------------------*/
//Arrays
var vecs = new Vectores();
var cubes = new Cubes(vecs);
var empresas = []



//------------------------------------
//UI Prototipo, Slices, InputLists y +,- Buttons
//------------------------------------
//HTML Dom Getters
const ncsd_list = document.getElementById("nsc-cont");
const vard_list = document.getElementById("vrd-cont");
const canl_list = document.getElementById("cnl-cont");
const canl_slc = document.getElementById("top-slices");
const vard_slc = document.getElementById("right-slices");
const nscd_slc = document.getElementById("left-slices");
const color_slc = document.getElementById("color");
const info_slc = document.getElementById("info");
const mas_n = document.getElementById("+n");
const mas_c = document.getElementById("+c");
const mas_v = document.getElementById("+v");
const mns_n = document.getElementById("-n");
const mns_c = document.getElementById("-c");
const mns_v = document.getElementById("-v");
const empresas_num = document.getElementById("empresas-num");
const empresas_cont = document.getElementById("empresas-container");
const render_button = document.getElementById("render-btn");
const update_button = document.getElementById("updt-btn");
const opacity_slider = document.getElementById("opacity-slider");
opacity_slider.value = 75;

//Add input lists and buttons for slices and color filters
addList(vecs.ncsd, ncsd_list, nscd_slc, "N");
addList(vecs.vard, vard_list, vard_slc,  "V");
addList(vecs.canl, canl_list, canl_slc, "C");
addColorFilter();
randomEmpresas();

//Sums
const ncsd_sum = document.getElementById("sum-n");
const vard_sum = document.getElementById("sum-v");
const canl_sum = document.getElementById("sum-c");
makeSum(vecs.ncsd, ncsd_sum);
makeSum(vecs.canl, canl_sum);
makeSum(vecs.vard, vard_sum);

function randomEmpresas(){
	if(empresas.length == 0){
		for(var i=0; i<empresas_num.value; i++){
			empresas.push(new Empresa());
		}	
	}else{
		var num = empresas_num.value - empresas.length;
		console.log(num)
		if(num < 0){
			for(num; num<0; num++){
				empresas.pop()
			}		
		}else if(num > 0){
			for(num; num>0; num--){
				empresas.push(new Empresa());
			}		
		}
	}
	console.log(empresas)
	addEmpresasUI();	
}
//For every Necesidad, Canal, Variedad create an input field
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
//For every color create a filter button
function addColorFilter(){
	for(var i=0; i<=cubes.cubeMats.length-1; i++){
		var btn = document.createElement('button');
		const total = 100/(cubes.cubeMats.length-1)
		btn.innerHTML = (i*total) + "%";
		btn.style.width = "8%"
		btn.setAttribute("color", i);
		btn.addEventListener('click', (e) =>{e.preventDefault();
											var colorFilter = parseInt(e.target.getAttribute('color'));
											renderNew([NaN, NaN, NaN, colorFilter])
											})
		color_slc.appendChild(btn);
	}
}
//For every empresa add a UI checklist box
function addEmpresasUI(){
	empresas_cont.innerHTML = "";
	for(var i=0; i<empresas.length; i++){
		const empresaContainer = document.createElement("div")
		empresaContainer.className = "row empresa-container"
		const empresaTitle = document.createElement("div")
		empresaTitle.className = 'col-2 empresa-title';
		empresaTitle.innerHTML = "Empresa" + (i+1);
		empresaContainer.append(empresaTitle);
		const checksCol = document.createElement("div")
		checksCol.className = "col-10";
		checksCol.append(addCheck(vecs.ncsd, "N", i, 0));
		checksCol.append(addCheck(vecs.vard, "V", i, 1));
		checksCol.append(addCheck(vecs.canl, "C", i, 2));
		empresaContainer.append(checksCol);
		empresas_cont.append(empresaContainer);
	}
}
function addCheck(list, char, i, empresaVector){
	const checksRow = document.createElement("div")
	checksRow.className = "row empresa-checks-row"
	for(var j=0; j<list.length; j++){
		const checkContainer = document.createElement("span")
		checkContainer.className = "empresa-check";
		checkContainer.innerHTML = `<p class="empresa-label">${char + (j+1)}</p>`
		const check = document.createElement("input");
		check.type = "checkBox";
		check.checked = empresas[i].vecs[empresaVector][j]
		check.setAttribute("empresa", i)
		check.setAttribute("vector", empresaVector)
		check.setAttribute("vec-num", j)
		check.addEventListener("input", (e) =>{
			const emp = e.target.getAttribute("empresa");
			const vec = e.target.getAttribute("vector");
			const num = e.target.getAttribute("vec-num");
			empresas[emp].vecs[vec][num] = e.target.checked;	
		})
		checkContainer.append(check);
		checksRow.append(checkContainer)
	}
	return checksRow;
}
//Sums
function makeSum(list, container){
	const suma = list.reduce(cubes.sum, 0);
	container.innerHTML=`<p>Total:${suma}</p>`
}


//--------------------------------------------
//Render cubes from information on the arrays.
//--------------------------------------------
cubes.renderCubes([NaN, NaN, NaN, NaN], vecs, scene, empresas);


//-----------------------------------------------------
//Eventos de interaccion para nuevos inputs y opacidad
//-----------------------------------------------------
render_button.addEventListener('click', () => {renderNew([NaN, NaN, NaN])})
update_button.addEventListener('click', () => {getNewValues()})
empresas_num.addEventListener('input', randomEmpresas)
mas_n.addEventListener('click', (e) => {e.preventDefault(); changeList(vecs.ncsd, ncsd_list, nscd_slc, ncsd_sum, "N", true)})
mas_c.addEventListener('click', (e) => {e.preventDefault(); changeList(vecs.canl, canl_list, canl_slc, canl_sum, "C", true)})
mas_v.addEventListener('click', (e) => {e.preventDefault(); changeList(vecs.vard, vard_list, vard_slc, vard_sum, "V", true)})
mns_n.addEventListener('click', (e) => {e.preventDefault(); changeList(vecs.ncsd, ncsd_list, nscd_slc, ncsd_sum, "N", false)})
mns_c.addEventListener('click', (e) => {e.preventDefault(); changeList(vecs.canl, canl_list, canl_slc, canl_sum, "C", false)})
mns_v.addEventListener('click', (e) => {e.preventDefault(); changeList(vecs.vard, vard_list, vard_slc, vard_sum, "V", false)})
opacity_slider.addEventListener('input', (e) => {
	for(var mat of cubes.cubeMats){
		mat.opacity = e.target.value/100
	}
})
function changeList(vec, vec_list, vec_slc, vec_sum, char, add){
	if(add){
		vec.push(0);
	}else{
		vec.pop();
	}
	addList(vec, vec_list, vec_slc, char); 
	makeSum(vec, vec_sum)
	randomEmpresas();
}
//Render from values in vector input fields
function getNewValues(){
	vecs.ncsd = getValue("N-inner-inpt");
	vecs.canl = getValue("C-inner-inpt");
	vecs.vard = getValue("V-inner-inpt");
	makeSum(vecs.ncsd, ncsd_sum);
	makeSum(vecs.canl, canl_sum);
	makeSum(vecs.vard, vard_sum);
	renderNew([NaN, NaN, NaN]);
}
//Get values in vetor input fields
function getValue(clas){
	var htmls = document.getElementsByClassName(clas);
	var arr = [];
	for(const v of htmls){
		arr.push(parseInt(v.value));
	}
	return arr;
}
function renderNew(filter){
	scene.remove(cubes.cubes); 
	cubes.renderCubes(filter, vecs, scene, empresas);
}


