// Model rotation values
const R = {
	x: 0,
	y: 90,
	now: {x: 0, y: 0},
	on: {x: 0, y: 0},
	old: {x: 0, y: 0}
},
w2 = window.innerWidth / 2, // Window width / 2
h2 = window.innerHeight / 2, // Window height / 2
// Parameters
S = 6, // Sensitivity (higher number = lower sens)
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
		if (R.y < 0) R.y = 0;
		if (R.y > 180) R.y = 180;
		// Model motion
		let transform = `rotateX(${R.y.toFixed(P)}deg) rotateZ(${-R.x.toFixed(P)}deg)`;
		model.style["-webkit-transform"] = transform;
		model.style.transform = transform
	},
	up: function() {
		document.removeEventListener("mousemove", M.move);
		document.removeEventListener("touchmove", M.move)
	}
},
// Model & faces selectors
model = document.querySelector("#model");
let facesDisplayed = false;

// Model initial rotation angle
let transform = `rotateX(${R.y.toFixed(P)}deg) rotateY(${R.x.toFixed(P)}deg)`;
model.style["-webkit-transform"] = transform;
model.style.transform = transform;
// Event listeners
addEventListener("mousedown", M.down);
addEventListener("touchstart", M.down);
addEventListener("mouseup", M.up);
addEventListener("touchend", M.up)