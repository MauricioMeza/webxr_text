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

        this.navs = document.querySelectorAll(".num-btn");
        for(var btn of this.navs){
            btn.addEventListener('click', (e) => {this.rotateTo(e.target.getAttribute('nump'))})
        }
        
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

    /*********************
    * Object Selection
    **********************/
    //Update mouse position on Camera
    updateMouse(e){
        this.mouseNormal.x = ( e.clientX / this.size.w ) * 2 - 1;
        this.mouseNormal.y = - ( e.clientY / this.size.h ) * 2 + 1;  
    }

    //Send Ray from camera to mouse position
    checkRay(scene, dialog, title){
        this.ray.setFromCamera(this.mouseNormal, this.cam);
        //What happens on intersecting an object
        var intersect = this.ray.intersectObject(scene);
        if(intersect.length > 0){
            //if object is a Door
            if(intersect[0].object.name == "door"){
                //check change in intersection
                if(this.intersect != null && intersect[0].object != this.intersect){
                    this.defaultSelection(dialog, title);
                }
                this.intersect = intersect[0].object;
                this.doorSelection(dialog, title);                
            }else{
                document.body.style.cursor = "default";  
                if(this.intersect != null){
                    this.defaultSelection(dialog, title);                 
                }
            }
        }else{
            if(this.intersect != null){
                this.defaultSelection(dialog, title);                 
            }
        }
    }
    doorSelection(dialog, title){
        //change pointer, rotate outer ring, scale inner circle, 
        this.intersect.material.opacity=0.8;
        this.intersect.scale.set(1.05, 1.05, 1.05);
        this.intersect.children[1].rotateZ(0.005);
        //change info on dialog
        dialog.style.visibility = 'visible';
        dialog.style.opacity = 1;
        title.style.visibility = 'visible';
        title.style.opacity = 1;
        dialog.innerHTML = `<h3>${this.intersect.userData.titl}</h3> <p>${this.intersect.userData.desc}</p>`;
        title.innerHTML = `<h2>${this.intersect.userData.titl}</h2>`;
        //Different action for active and inactve portals
        if(this.intersect.userData.active){
            document.body.style.cursor = "pointer"; 
            this.intersect.rotateZ(0.002);
        }else{
            title.innerHTML += "<h4><u>(en desarrollo)</u></h4>"
        }
        
        //force rotation
        //this.rotateTo(this.intersect.userData.num);
    }
    defaultSelection(dialog, title){
        //return all values to non-selected normal
        this.intersect.material.opacity=0.6;
        this.intersect.scale.set(0.95, 0.95, 0.95);
        this.intersect = null;
        dialog.style.visibility = 'hidden';
        dialog.style.opacity = 0;
        title.style.visibility = 'hidden';
        title.style.opacity = 0;
    }
    goToLink(e){
        e.preventDefault();
        if(this.intersect != null && this.intersect.userData.active){
            window.open(this.intersect.userData.url);
        }
    }
    rotateTo(num){
        const scrollAmount = num * document.documentElement.scrollHeight * 1.135;
        gsap.to(document.documentElement,{
            duration: 0.5,
            //duration: 5*Math.abs((document.documentElement.scrollTop-scrollAmount)/document.documentElement.scrollHeight),
            scrollTop: scrollAmount
        });
    }

    /*********************
    * Scroll Movement
    **********************/
   //camera movement on scroll
    camScroll(btn){
        if(!this.freeControls){
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollPos = document.documentElement.scrollTop;
            const scrollRatio = scrollPos/scrollHeight
            this.cam.rotation.y = (-(1.76) * Math.PI * (scrollRatio))
            
            //highlight nav button if currently on section
            for(var nav of this.navs){
                var nump = parseFloat(nav.getAttribute('nump'));
                if(scrollRatio >= nump-0.05 && scrollRatio < nump+0.15){
                    nav.style.backgroundColor = "white";
                }else{
                    nav.style.backgroundColor = "transparent"
                }
            }

            //only change camera on top of scroll
            if(scrollPos > 100){
                btn.parentElement.style.display = 'none';
            }else{
                btn.parentElement.style.display = '';
            }
        }
    }

    //change beetwen FPS and Scroll
    changeControls(ctrls){
        if(ctrls.enabled  == false){
            document.body.style.overflow = 'hidden';
            this.mouseNormal.w = 0;
            this.mouseNormal.h = 0;
            this.cam.rotation.set(0, 0, 0);
            this.cam.position.set(0, 10, 0);
            for(var btn of this.navs){
                btn.style.display = 'none'
            }
            ctrls.enabled = true;
        }else{
            ctrls.enabled = false;
            this.cam.rotation.set(0, 0, 0);
            this.cam.position.set(0, 10, 0);
            document.body.style.overflow = '';
            for(var btn of this.navs){
                btn.style.display = ''
            }
        }
        
    }
}