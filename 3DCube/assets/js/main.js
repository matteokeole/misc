// Cube rotation values
const R = {
	x: 45,
	y: -22.5,
	now: {x: 0, y: 0},
	on: {x: 0, y: 0},
	old: {x: 0, y: 0}
},
w2 = window.innerWidth / 2, // Window width / 2
h2 = window.innerHeight / 2, // Window height / 2
// Parameters
S = 4, // Sensitivity (higher number = lower sens)
P = 2, // Smooth motion (higher number = smoother motion)
// Mouse events
M = {
	down: function(e) {
		if (!e.clientX) {
			// Touch screen
			R.on.x = -w2 + e.touches[0].clientX;
			R.on.y = h2 + -e.touches[0].clientY
		} else {
			R.on.x = -w2 + e.clientX;
			R.on.y = h2 + -e.clientY
		}
		R.old.x = R.x;
		R.old.y = R.y;
		document.addEventListener("mousemove", M.move);
		document.addEventListener("touchmove", M.move)
	},
	move: function(e) {
		if (!e.clientX) {
			// Touch screen
			R.now.x = -w2 + e.touches[0].clientX;
			R.now.y = h2 + -e.touches[0].clientY
		} else {
			R.now.x = -w2 + e.clientX;
			R.now.y = h2 + -e.clientY
		}
		R.x = ((R.now.x - R.on.x) / S) + R.old.x;
		R.y = ((R.now.y - R.on.y) / S) + R.old.y;
		if (R.x < -360) R.x += 360;
		if (R.x > 360) R.x -= 360;
		if (R.y < -90) R.y = -90;
		if (R.y > 90) R.y = 90;
		// Cube motion
		let transform = `rotateX(${R.y.toFixed(P)}deg) rotateY(${R.x.toFixed(P)}deg)`;
		cube.style["-webkit-transform"] = transform;
		cube.style["-ms-transform"] = transform;
		cube.style.transform = transform;
		shadowFacing(R.y)
	},
	up: function() {
		document.removeEventListener("mousemove", M.move);
		document.removeEventListener("touchmove", M.move)
	}
},
shadowFacing = function(ry) {
	// Apply a shadow to the faces
	cubeTop.style.boxShadow = "inset 0 0 0 100px rgba(255, 255, 255, " + (Math.abs((180 - Math.abs(ry)) / 180 - 0.5)) + ")";
	cubeBottom.style.boxShadow = "inset 0 0 0 100px rgba(0, 0, 0, " + (Math.abs((180 - Math.abs(ry)) / 180 - 0.5)) + ")";
	if (R.y >= 0) {
		cubeFront.style.boxShadow = "inset 0 0 0 100px rgba(255, 255, 255, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")";
		cubeBack.style.boxShadow = "inset 0 0 0 100px rgba(255, 255, 255, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")";
		cubeLeft.style.boxShadow = "inset 0 0 0 100px rgba(255, 255, 255, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")";
		cubeRight.style.boxShadow = "inset 0 0 0 100px rgba(255, 255, 255, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")"
	} else if (R.y < 0) {
		cubeFront.style.boxShadow = "inset 0 0 0 100px rgba(0, 0, 0, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")";
		cubeBack.style.boxShadow = "inset 0 0 0 100px rgba(0, 0, 0, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")";
		cubeLeft.style.boxShadow = "inset 0 0 0 100px rgba(0, 0, 0, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")";
		cubeRight.style.boxShadow = "inset 0 0 0 100px rgba(0, 0, 0, " + (Math.abs((90 - Math.abs(ry)) / 180 - 0.5)) + ")"
	}
},
toggleFaces = function() {
	if (facesDisplayed) {
		facesDisplayed = false;
		cube.style.color = "transparent"
	} else {
		facesDisplayed = true;
		cube.style.color = "#000"
	}
},
// Cube & faces selectors
cube = document.querySelector("#cube"),
cubeTop = cube.querySelector(".face#top"),
cubeBottom = cube.querySelector(".face#bottom"),
cubeFront = cube.querySelector(".face#front"),
cubeBack = cube.querySelector(".face#back"),
cubeLeft = cube.querySelector(".face#left"),
cubeRight = cube.querySelector(".face#right");
let facesDisplayed = false;

// Cube initial rotation angle
let transform = `rotateX(${R.y.toFixed(P)}deg) rotateY(${R.x.toFixed(P)}deg)`;
cube.style["-webkit-transform"] = transform;
cube.style["-ms-transform"] = transform;
cube.style.transform = transform;
shadowFacing(R.y); // Apply shadow
// Event listeners
addEventListener("mousedown", M.down);
addEventListener("touchstart", M.down);
addEventListener("mouseup", M.up);
addEventListener("touchend", M.up);
document.querySelector("#btn-toggle-faces").addEventListener("click", toggleFaces)