import * as THREE from 'three'


export default class World{
 
    constructor(scene, renderer){
        this.loadHDRI(scene, renderer);
        this.createFloor(scene);
        this.createBlocks(scene);
    }

    //Load HDRI image background
    loadHDRI(scene, renderer){
        const pmremGenerator = new THREE.PMREMGenerator( renderer );
        pmremGenerator.compileEquirectangularShader();
        new THREE.TextureLoader()
            .load( "./assets/sky/HDRI.jpg", function ( texture ) {
                var exrCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
                var exrBackground = exrCubeRenderTarget.texture;
                scene.background = exrBackground;
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

    //Block Doors
    createBlocks(scene){
        //create and postion  in ring formation;
        const dist = 50;
        const nums = 5;
        const degs = 360 / nums;
        const titulos = ['Metaverse University', 'Metaverse World', 'Metaverse Development', 'Metaverse People','Metaverse Network square'];
        const descs = [ 'Es el square de la Universidad. La proyección del concepto de la Metaverse University futura. Desde este espacio proyectamos e ilusionamos.', 
                        'Los mundos virtuales que configurarán de forma definitiva el concepto del Metaverso solo ha hecho que comenzar. Meta, Nike, Adidas, Decentraladand, SandBox y otros ya ofrecen elementos de participación, comercialización, consumo e interacción en los mundos virtuales centralizados. Es necesaria y obligada la interoperabilidad entre todos ellos para la promoción de la libertad de las personas y la entrada de las empresas, bien sean grandes, mediana o pequeñas.',
                        'El Metaverso y el conjunto de los mundos virtuales que sustentarán su éxito está en su etapa más inicial. La falta de capacitación profesional, la complejidad de la tecnología, la poca oferta empresarial de desarrollo, la inexistente regulación en valores, ética y convivencia nos invitan a trabajar duro en un desarrollo justo, igualitario y equitativo.', 
                        'Las personas son el sujeto del Metaverso, el destino y su experimentación vital. La igualdad como valor transversal el valor predominante. La interacción en el marco de la descentralización será la justicia del motivo de su creación. Nadie puede quedar atrás nuestra misión.', 
                        'Es el espacio de encuentro de freelance, empresas y profesionales con clientes para la creación de redes de colaboración y suma.']

        const urls = [  'https://newrona.net/', 
                        'https://newrona.net/', 
                        'https://newrona.net/', 
                        'https://newrona.net/', 
                        'https://newrona.net/'];

        for(var i=0; i<=4; i++){
            var active;
            (i==0) ? active=true : active=false;
            const circleMesh = this.createBlock(active);
            const x = Math.sin(degs*i*Math.PI/180)*(-dist);
            const y = Math.cos(degs*i*Math.PI/180)*(-dist);
            circleMesh.position.set(x, 12, y);
            circleMesh.rotateY(degs*i*Math.PI/180);
            circleMesh.userData.active = active;
            circleMesh.userData.titl = titulos[i];
            circleMesh.userData.desc = descs[i];
            circleMesh.userData.url = urls[i];
            circleMesh.userData.num = (i==0)? 0 : 1-(i/nums);
            scene.add(circleMesh);
        }
    }
    createBlock(active){
        const portalTex = new THREE.TextureLoader().load( './assets/Portal.png' );
        const portalOff = new THREE.TextureLoader().load( './assets/Portal_off.png' );
        const ringTex = new THREE.TextureLoader().load( './assets/Ring.png' );
        const circleGeometry = new THREE.CircleGeometry(10, 32);
        var circleMaterial;
        if(active){
            circleMaterial = new THREE.MeshBasicMaterial(
                {map:portalTex, transparent:true, opacity:0.6} );
        }else{
            circleMaterial = new THREE.MeshBasicMaterial(
                {map:portalOff, transparent:true, opacity:0.6} );    
        }
        const circleMesh = new THREE.Mesh( circleGeometry, circleMaterial );
        circleMesh.name = "door";  
        const circleGeo = new THREE.EdgesGeometry( circleGeometry );
        const circleMat = new THREE.LineBasicMaterial( { color: 0xffffff } );
        const circleWire = new THREE.LineSegments( circleGeo, circleMat );        
        circleMesh.add( circleWire );

        const ringGeometry = new THREE.RingGeometry(10,16, 32);
        const ringMaterial = new THREE.MeshBasicMaterial(
            {map:ringTex, transparent:true, opacity:0.6} );
        const ringMesh = new THREE.Mesh( ringGeometry, ringMaterial );
        circleMesh.add(ringMesh);
        return circleMesh;
    }

}