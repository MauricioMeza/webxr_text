import * as THREE from 'three'


export default class World{
 
    constructor(scene, renderer){
        this.loadHDRI(scene, renderer);
        this.createFloor(scene);
        this.lighting(scene);
    }

    //Load HDRI image background
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

    lighting(scene){
        const light = new THREE.AmbientLight( 0x404040 );
        scene.add( light );
    }

    //Load floor plane
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

    
    animate(){

    }

}