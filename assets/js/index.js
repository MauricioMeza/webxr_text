var video = document.getElementById('video');
document.onreadystatechange = function () {
    video.pause();
    video.currentTime = 0;
    video.load();
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#hide-menu").style.visibility = "visible"
    } else {
        document.querySelector("body").style.visibility = "visible"
    }
};
var openPopUp = function () {
    document.getElementById("popup1window").style.display = "inline";
    document.getElementById("popup2window").style.display = "none";
    document.getElementById("popup3window").style.display = "none";
};
var closePopUp = function () {
    document.getElementById("popup1window").style.display = "none"
};
var openPopUp2 = function () {
    document.getElementById("popup2window").style.display = "inline";
    document.getElementById("popup1window").style.display = "none";
    document.getElementById("popup3window").style.display = "none"
};
var closePopUp2 = function () {
    document.getElementById("popup2window").style.display = "none"
};
var openPopUp3 = function () {
    document.getElementById("popup3window").style.display = "inline";
    document.getElementById("popup2window").style.display = "none";
    document.getElementById("popup1window").style.display = "none"
};
var closePopUp3 = function () {
    document.getElementById("popup3window").style.display = "none"
};

$("#hide-button").click(function () {
    $("#hide-menu").slideUp("slow");
    $("#hide-video").show();
    $("#hide-video").fadeOut();
    // $("#hide-menu").slideUp("slow");
    // $("#hide-video").show();
    // video.play();
    // $("#video").on('ended', function () {
    //     $("#hide-video").fadeOut();
    //     video.pause();
    //     video.currentTime = 0;
    //     video.load()
    // })
});

// panellum
var sceneList = {
    "scene_1": {
        "title": "escena 1",
        "type": "equirectangular",
        "panorama": "assets/img/360/Panorama1.png",
        "pitch": 7,
        "yaw": -179,
        "hotSpots": [
            {
                "pitch": -10,
                "yaw": 0,
                "type": "scene",
                "text": "Camino",
                "cssClass": "flecha",
                "sceneId": "scene_2",
                "id": "scene-2"
            },
            {
                "pitch": 3,
                "yaw": -178,
                "type": "scene",
                "text": "Metaverse people",
                "cssClass": "popup-click",
                "id": "scene-2",
                "sceneId": "scene_2",
            },
            {
                "pitch": 3,
                "yaw": -91,
                "type": "scene",
                "text": "Metaverse Network Square",
                "cssClass": "popup-click",
                "id": "scene-2",
                "sceneId": "scene_2",
            },
            {
                "pitch": 4,
                "yaw": -2,
                "type": "scene",
                "text": "Metaverse University",
                "cssClass": "popup-click",
                "id": "scene-2",
                "sceneId": "scene_2",
            },
            {
                "pitch": 4,
                "yaw": 92,
                "type": "scene",
                "text": "Metaverse Development",
                "cssClass": "popup-click",
                "id": "scene-2",
                "sceneId": "scene_2",
            },
            {
                "pitch": 4,
                "yaw": 135,
                "type": "scene",
                "text": "Metaverse World",
                "cssClass": "popup-click",
                "id": "scene-2",
                "sceneId": "scene_2",
            },
        ]
    },
    "scene_2": {
        "title": "escena 2",
        "type": "equirectangular",
        "panorama": "assets/img/360/Panorama1.png",
        "pitch": 0,
        "yaw": 0,
        "hotSpots": [
            {
                "pitch": -10,
                "yaw": 0,
                "type": "scene",
                "text": "Camino",
                "cssClass": "flecha",
                "sceneId": "scene_1",
                "id": "scene_1"
            },
            {
                "pitch": 3,
                "yaw": -178,
                "type": "scene",
                "text": "Consejo cientifico",
                "cssClass": "popup-click",
                "id": "scene-1",
                "sceneId": "scene_1",
            },
            {
                "pitch": 3,
                "yaw": -91,
                "type": "scene",
                "text": "Consejo académico",
                "cssClass": "popup-click",
                "id": "scene-1",
                "sceneId": "scene_1",
            },
            {
                "pitch": 4,
                "yaw": -2,
                "type": "scene",
                "text": "Génesis plaza",
                "cssClass": "popup-click",
                "id": "scene-1",
                "sceneId": "scene_1",
            },
        ]
    },
}

var tour = pannellum.viewer('panorama', {
    "default": {
        "firstScene": "scene_1",
        "sceneFadeDuration": 500,
        "autoLoad": true
    },
    "scenes": sceneList
});