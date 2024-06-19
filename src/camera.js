import * as THREE from 'three';
import gsap from 'gsap'

export default class Camera{
    constructor(scene){
        this.size = {w: window.innerWidth, h: window.innerHeight}       //window size
        this.mouseNormal = new THREE.Vector2(this.size.w, this.size.h); //mouse position
        this.ray = new THREE.Raycaster();                               //raycaster
        this.intersect = null;                                          //last intersected obj     

        this.cam = new THREE.PerspectiveCamera(55, this.size.w / this.size.h, 0.001, 200);
        this.cam.position.set(0, 10, 0);
        scene.add(this.cam);
    }

    //Function for responsive Canvas
    resize(renderer){
        this.size.h = window.innerHeight;
        this.size.w = window.innerWidth;
        this.cam.aspect = this.size.w / this.size.h;
        this.cam.updateProjectionMatrix();
        renderer.setSize(this.size.w, this.size.h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    /*******************
    * Object Selection *
    ********************/

    //--Update mouse position on Camera
    updateMouse(e){
        if(!this.touch){
            this.mouseNormal.x = ( e.clientX / this.size.w ) * 2 - 1;
            this.mouseNormal.y = - ( e.clientY / this.size.h ) * 2 + 1;
        }else{
            this.mouseNormal.x = 0;
            this.mouseNormal.y = 0.42;
        }
    }

    //--Send Ray from camera to mouse position
    checkRay(intersectedObjects){
        this.ray.setFromCamera(this.mouseNormal, this.cam);
        //What happens on intersecting an object
        var intersect = this.ray.intersectObject(intersectedObjects);
        if(intersect.length > 0){
            //if object is a Door
            if(intersect[0].object.name == "door"){
                //check change in intersection
                if(this.intersect != null && intersect[0].object != this.intersect){
                    this.defaultSelection();
                }
                this.intersect = intersect[0].object;
                console.log(this.intersect);
                this.doorSelection();                
            }
            else{  
                if(this.intersect != null){
                    this.defaultSelection();                 
                }
            }
        }else{
            if(this.intersect != null){
                this.defaultSelection();                 
            }
        }
    }
    doorSelection(){
    }
    defaultSelection(){

    }

}