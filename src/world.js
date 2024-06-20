import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/Addons.js';


import {ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default class World{
 
    constructor(scene, renderer){
        this.loadHDRI(scene, renderer);
        this.createFloor(scene);
        this.lighting(scene);
        this.scene = scene;
    }


    /****************
    *** Lighting ****
    *****************/

    //--Load HDRI image background
    loadHDRI(scene, renderer){
        const pmremGenerator = new THREE.PMREMGenerator( renderer );
        pmremGenerator.compileEquirectangularShader();
        new THREE.TextureLoader()
            .load( "./assets/HDRI4k.jpg", function ( texture ) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.background = texture;
                texture.dispose();
            });
    }

    //--Load lights
    lighting(scene){
        const light = new THREE.AmbientLight( 0x404040 );
        scene.add( light );
    }

    /*************************
    *** Models / Geometry ****
    **************************/

    //--Load floor plane
    createFloor(scene){
        //load floor texture
        const tex = new THREE.TextureLoader().load( "./assets/floor.jpg");
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set( 2, 2);

        //create bottom plane
        const planeGeometry = new THREE.PlaneGeometry(140, 140, 10, 10);
        const planeMaterial = new THREE.MeshStandardMaterial(
            {map:tex,
            side:THREE.DoubleSide, 
            opacity:0.8, 
            transparent:true});
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.name = "floor";

        //position bottom plane
        planeMesh.rotation.x = Math.PI / 2;
        planeMesh.position.y = -5;
        scene.add(planeMesh) 
    }

    //--Load plane from local file
    async loadFile(file, storage){
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            const arrayBuffer = new Uint8Array(contents).buffer;
            this.loadModel(file, arrayBuffer, storage);
        }
        reader.readAsArrayBuffer(file);
    }

    async loadModel(file, arrayBuffer, storage){
        const loader = new FBXLoader();
        const model = loader.parse(arrayBuffer, '');
        model.scale.set(0.1,0.1,0.1);
        this.scene.add(model);
        if(file != null){
            this.uploadFile(file, arrayBuffer, storage);
        }
    }

    animate(){

    }

    /*******************************
    *** Firebase Upload/Dowload ****
    ********************************/

    async uploadFile(file, arrayBuffer, storage){
        const storageRef = ref(storage, 'Models/' + file.name);
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).catch((error) => {
            console.error('Upload failed:', error);
        });
    }

    //--Load plane from storage
    async downloadModel(storage){
        const storageRef = ref(storage, 'Models/Mesa.fbx');
        getDownloadURL(storageRef).then((url) => {
            fetch(url)
                .then((response) => response.arrayBuffer())
                .then((arrayBuffer) => this.loadModel(null, arrayBuffer, storage))
                .catch(error => console.error('Error fetching FBX from Firebase:', error));
        }).catch((error) => {
            console.error('Error getting download URL:', error);
        });
    }
}