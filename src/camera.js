import * as THREE from 'three';
import gsap from 'gsap'

export default class Camera{
    constructor(scene){
        this.size = {w: window.innerWidth, h: window.innerHeight}       //window size
        this.mouseNormal = new THREE.Vector2(this.size.w, this.size.h); //mouse position
        this.ray = new THREE.Raycaster();                               //raycaster
        this.intersect = null;                                          //last intersected obj     
        this.initHeight = 5;

        this.cam = new THREE.PerspectiveCamera(55, this.size.w / this.size.h, 0.001, 200);
        this.cam.position.set(0, this.initHeight, 0);
        this.dolly = new THREE.Object3D();
        this.dolly.position.set(0,0,0);
        this.dolly.add(this.cam);
        this.dummyCam = new THREE.Object3D();
        this.cam.add(this.dummyCam);
        scene.add(this.dolly);
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

    /*************
    * VR Movement *
    **************/

    moveDolly(deltaTime, controllers){
        /*
        if(controllers[0].userData.selecting || controllers[1].userData.selecting){
            const speed = -5;
            const lookQuaternion = this.dolly.quaternion.clone();
            const worldQuaternion = new THREE.Quaternion();
            this.dolly.quaternion.copy(this.dummyCam.getWorldQuaternion(worldQuaternion));
            this.dolly.translateZ(speed * deltaTime);
            this.dolly.position.y = 0;
            this.dolly.quaternion.copy(lookQuaternion); 
        }*/
        var joystick0 = controllers[0].userData.gamepad;
        
        if(joystick0.axes[0] + joystick0.axes[1] > 0){
            /*
            const speed = 5;
            const lookQuaternion = this.dolly.quaternion.clone();
            const worldQuaternion = new THREE.Quaternion();
            this.dolly.quaternion.copy(this.dummyCam.getWorldQuaternion(worldQuaternion));
            this.dolly.translateZ(-joystick0.axes[1] * speed * deltaTime);
            this.dolly.translateX( joystick0.axes[0] * speed * deltaTime);
            this.dolly.position.y = 0;
            this.dolly.quaternion.copy(lookQuaternion); 
            */
        }
    }
}