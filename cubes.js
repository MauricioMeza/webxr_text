import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

class Cubes{
    constructor(vecs){
        this.cubes = null;
        this.colors = [];
        this.cubeMats=[ new THREE.MeshBasicMaterial({color:0xFFFFFF, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFFEBEB, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFFD3D3, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 1}),				
                        new THREE.MeshBasicMaterial({color:0xFFC6C6, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 3, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFFB2B2, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 4, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFF9C9C, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 5, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFF6E6E, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 6, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFF8A8A, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 7, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFF5959, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 8, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFF3333, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 9, polygonOffsetUnits: 1}),
                        new THREE.MeshBasicMaterial({color:0xFF0000, transparent:true, opacity:.75, polygonOffset: true, polygonOffsetFactor: 10, polygonOffsetUnits: 1})];
        this.lineMat = new THREE.LineBasicMaterial( { color:0xffffff } );
    }

    renderCubes(filter, vecs, scene, empresas){
        var sumVard = vecs.vard.reduce(this.sum, 0);
        var sumNcsd = vecs.ncsd.reduce(this.sum, 0);
        var sumCanl = vecs.canl.reduce(this.sum, 0);
        this.makeColors(vecs, empresas);
        var i=0;
        if(sumVard==100 && sumNcsd==100 && sumCanl==100){
            this.cubes = new THREE.Object3D();
            this.cubes.name = "loscubitosdubidu"
            for (var v = 0; v<vecs.vard.length; v++) {
                for (var n = 0; n<vecs.ncsd.length; n++) {
                    for (var c = 0; c<vecs.canl.length; c++) {
                        var cf, nf, vf, color;
                        (isNaN(filter[0])) ? cf=c: cf=filter[0];
                        (isNaN(filter[1])) ? nf=n: nf=filter[1];
                        (isNaN(filter[2])) ? vf=v: vf=filter[2]; 
                        (isNaN(filter[3])) ? color=this.colors[i].percentage: color=filter[3]; 
                        if(c == cf && n == nf && v==vf && this.colors[i].percentage==color){
                            const cubeGeometry = new THREE.BoxGeometry(vecs.canl[c], vecs.ncsd[n], vecs.vard[v]);
                            const cubeMesh = new THREE.Mesh(cubeGeometry, this.cubeMats[this.colors[i].percentage]);
                            const pos = new THREE.Vector3(0,0,0);
                            (c > 0) ? pos.x = vecs.canl[0]/2 + vecs.canl.slice(1, c).reduce(this.sum, 0) + vecs.canl[c]/2 : pos.x;
                            (n > 0) ? pos.y = vecs.ncsd[0]/2 + vecs.ncsd.slice(1, n).reduce(this.sum, 0) + vecs.ncsd[n]/2 : pos.y;
                            (v > 0) ? pos.z = vecs.vard[0]/2 + vecs.vard.slice(1, v).reduce(this.sum, 0) + vecs.vard[v]/2 : pos.z;
                            cubeMesh.position.set(pos.x, pos.y, pos.z);
                            cubeMesh.name = "cubitodubidu"
                            this.cubes.add(cubeMesh)
                            const cubeGeo = new THREE.EdgesGeometry( cubeGeometry );
                            const cubeWire = new THREE.LineSegments( cubeGeo, this.lineMat);
                            cubeMesh.add(cubeWire);
                            cubeMesh.userData={ orglMat: this.cubeMats[this.colors[i].percentage], 
                                                n:(n+1), v:(v+1), c:(c+1), empresas: this.colors[i].empresas};
                        }		
                        i++;
                    }
                }	
            }
            this.cubes.position.set((vecs.canl[0]/2)-50, (vecs.ncsd[0]/2)-50, (vecs.vard[0]/2)-50);
            scene.add(this.cubes)
        }else{
            throw "Sumatoria no es exacta";
        }	
    }
    sum(sum, a){
        return sum + a;
    }

    //Count all cubes were the three vectors are true
    makeColors(vecs, empresas){
        var i = 0;
        this.colors = [];
        for (var v = 0; v<vecs.vard.length; v++) {
            for (var n = 0; n<vecs.ncsd.length; n++) {
                for (var c = 0; c<vecs.canl.length; c++) {
                    this.colors[i] = {percentage: 0, empresas: []}
                    for(const empresa of empresas){
                        if(empresa.vecs[0][n] && empresa.vecs[1][v] && empresa.vecs[2][c]){
                            this.colors[i].percentage += 1;
                            this.colors[i].empresas.push(empresa.name)
                        }
                    }	
                    i++;
                }
            }	
        }
        for(var i=0; i<this.colors.length; i++) {
            this.colors[i].percentage = parseInt((this.colors[i].percentage/empresas.length) * 10);
        }
        console.log(this.colors)
    }

}export default Cubes