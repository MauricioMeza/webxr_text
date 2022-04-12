var menu = document.getElementById('head-menu')
var menuBtn = document.getElementById('nav-btn')
var modal = document.getElementById('modal')
var modalContent = document.getElementById('modal-content')
var closeBtn = document.getElementById('close-btn')

var menuBtns = [document.getElementById("menu-1"),
                document.getElementById("menu-2"),
                document.getElementById("menu-3"),
                document.getElementById("menu-4")]

var menuContent = ["",
                    `<div class="row m-0">
                        <div class="col-md-6 p-0 center-col">
                            <span class="center-helper"></span>
                            <img id="ceo-img" src="./assets/ceo.png"></img>
                        </div>
                        <div class="col-md-6 p-0 center-col">
                            <div id="ceo-txt">
                                <h2>CEO</h2>
                                <a href="https://www.alexmoga.cat/"><h3><img class="ceo-icons" src="./assets/globe.svg"> www.alexmoga.cat</h3></a>
                                <a href="https://www.linkedin.com/in/alexmoga"><h3><img class="ceo-icons" src="./assets/linkedin.svg"> in/alexmoga</h3></a>    
                            </div>
                        </div>
                    </div>`,
                    "",
                    `<div class="row r-center justify-content-center">
                        <div class="col-md-2 col-sm-4 col-6 p-1">
                            <a target="_blank" href="https://www.jdviurisconsultants.com"><img class="pana-logo" src="./assets/partners (2).png"></a>
                            <h5 class="pana-text">PARTNER STRATEGIC</h5>
                        </div>
                        <div class="col-md-2 col-sm-4 col-6 p-1">
                            <a target="_blank" href="https://www.enchainte.com"><img class="pana-logo" src="./assets/partners (3).png"></a>
                            <h5 class="pana-text">PARTNER TECHNOLOGY</h5>
                        </div>
                        <div class="col-md-2 col-sm-4 col-6 p-1">
                            <a target="_blank" href="https://www.eternverse.es"><img class="pana-logo" src="./assets/partners (4).png"></a>
                            <h5 class="pana-text">PARTNER CONSULTANT</h5>
                        </div>
                        <div class="col-md-2 col-sm-4 col-6 p-1">
                            <a target="_blank" href="https://www.newrona.net"><img class="pana-logo" src="./assets/partners (5).png"></a>
                            <h5 class="pana-text">PARTNER WEB</h5>
                        </div>
                        <div class="col-md-2 col-sm-4 col-6 p-1">
                            <a target="_blank" href="https://veryrealhelp.com"><img class="pana-logo"src="./assets/partners (1).png"></a>
                            <h5 class="pana-text">PARTNER HEALTH</h5>
                        </div>
                    </div>
                    ` 
                ]
var menuAbierto = false;
var modalAbierto = false;
var modalNum = 0;
menu.style.display = 'none';
modal.style.display = 'none';

menuBtn.addEventListener('click', (e) => {e.preventDefault(); abrirMenu()});
closeBtn.addEventListener('click', (e) => {e.preventDefault(); cerraModal()});
menuBtns[0].addEventListener('click', (e) => {e.preventDefault(); cerraModal(); abrirMenu();});
menuBtns[1].addEventListener('click', (e) => {e.preventDefault(); abrirModal(1)});
menuBtns[3].addEventListener('click', (e) => {e.preventDefault(); abrirModal(3)});

//Abrir menu hamburguesa desde el boton de arriba
function abrirMenu(){
    if(menuAbierto==false){
        menuAbierto = true;
        menu.style.display = 'block'; 
        menuBtn.style.backgroundImage = 'url("./assets/menu-close.png")'  
    }else{
        menuAbierto = false;
        menu.style.display = 'none'; 
        menuBtn.style.backgroundImage = 'url("./assets/menu-open.png")'
        cerraModal();
    }
}

//Abrir modal a partir de botones en el hamburguesa
function abrirModal(n){
    console.log(n)
    if(modalAbierto==false){
        modalAbierto = true;
        modal.style.display = 'block'; 
        modalContent.innerHTML = menuContent[n];
    }else{
        modalContent.innerHTML = menuContent[n];
    }   
    (n==3) ? modal.style.width = '85vw' : modal.style.width = '65vw';
}
function cerraModal(){
    modalAbierto = false;
    modal.style.display = 'none';
}
