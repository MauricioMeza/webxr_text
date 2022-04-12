<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Metaverse University</title>
	<link rel="stylesheet" href="./assets/lib/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="./assets/lib/fontawesome/css/all.css">
	<link rel="stylesheet" href="./assets/css/index.css">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Tomorrow:wght@300&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Armata&display=swap" rel="stylesheet">
	<!-- panellum css -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
	<!-- panellum js -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
</head>

<body>
	<!-- intro -->
	<div id="hide-menu" style="width: 100%; height: 100%;">
		<div id="menu" class="menu contentFirst bg-black" style="z-index: 1000">
			<div class="content">
				<!-- <img class="wolf-gif mb-5" src="./assets/img/logo2.png"> -->
				<div class="full-width">
					<button id="hide-button">Ingresar</button>
				</div>
			</div>
		</div>
	</div>
	<!-- video -->
	<div class="container-section contentVideo" id="hide-video">
		<div id="menu" class="menu">
			<div class="content">
				<video src="./assets/video/Comp.mp4" id="video" width="100%" style="height: 100vh" autoplay controls>
					Video no soportado por tu navegador
				</video>
			</div>
		</div>
	</div>
	<!-- 360 -->
	<div id="panorama">
		<!-- <?php
				include "./components/navbar.php";
				?> -->
		<a href="./3.0.html" class="btn btn-secondary btn-20">3.0</a>
	</div>
	<!-- modals -->
	<div id="popup1window" class="popup">
		<div class="popupcontainer">
			<h1 class="pb-3">Viaje a un pasado en cambio</h1>
			<button class="absolute-button" onclick="closePopUp()">X</button>
			<a href="./viajeUnPasadoEnCambio.php" class="redirPage">Visitar Página</a>
		</div>
	</div>
	<div id="popup2window" class="popup">
		<div class="popupcontainer">
			<h1 class="pb-3">Viaje al centro de la cordillera</h1>
			<button class="absolute-button" onclick="closePopUp2()">X</button>
			<a href="./viajeAlCentroDeLaCordillera.php" class="redirPage">Visitar Página</a>
		</div>
	</div>
	<div id="popup3window" class="popup">
		<div class="popupcontainer">
			<h1 class="pb-3">Mundo esmeraldero</h1>
			<button class="absolute-button" onclick="closePopUp3()">X</button>
			<a href="./mundoEsmeraldero.php" class="redirPage">Visitar Página</a>
		</div>
	</div>

	<!-- awesome font bootstrap -->
	<script src="./assets/lib/fontawesome/js/all.js"></script>
	<!-- jQuery library -->
	<script src="./assets/lib/jquery/jquery.min.js"></script>
	<!-- Latest compiled JavaScript -->
	<script src="./assets/lib/bootstrap/js/bootstrap.min.js"></script>
	<!-- index.js -->
	<script type="text/javascript" src="./assets/js/index.js"></script>

</body>

</html>