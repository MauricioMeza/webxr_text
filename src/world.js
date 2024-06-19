import * as THREE from 'three'


export default class World{
 
    constructor(scene, renderer){
        this.loadHDRI(scene, renderer);
        this.createFloor(scene);
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


    //Load floor plane
    createFloor(scene){
        //create bottom plane
        const planeGeometry = new THREE.PlaneGeometry(140, 140, 10, 10);
        const planeMaterial = new THREE.MeshBasicMaterial(
            {color:0x000000, 
            side:THREE.DoubleSide, 
            opacity:0.75, 
            transparent:true});
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.name = "floor";
        const lineGeo = new THREE.WireframeGeometry( planeGeometry );
        const lineMat = new THREE.LineBasicMaterial( { color: 0xffffff } );
        const lineWire = new THREE.LineSegments( lineGeo, lineMat);
        planeMesh.add( lineWire );
        
        //position bottom plane
        planeMesh.rotation.x = Math.PI / 2;
        planeMesh.position.y = -5;
        scene.add(planeMesh) 
    }

    
    animate(){

    }

}