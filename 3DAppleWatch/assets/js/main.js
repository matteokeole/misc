const watch = document.querySelector(".object"),
shade = document.querySelector(".shade"),
screen = document.querySelector(".screen"),
time = document.querySelector(".time"),
date = document.querySelector(".date"),
setDate = function() {
	// Set the current date and time on the watch
	let D = new Date(),
	d = D.getDay(), // Day name
	n = D.getDate(), // Day index in the month
	h = D.getHours(), // Hour
	m = D.getMinutes(); // Minute
	// Day
	switch (d) {
		case 1:
			d = "MON";
		break;
		case 2:
			d = "TUE";
		break;
		case 3:
			d = "WED";
		break;
		case 4:
			d = "THU";
		break;
		case 5:
			d = "FRI";
		break;
		case 6:
			d = "SAT";
		break;
		default:
			// Case 0, Sunday
			d = "SUN"
	}
	// Hour
	(h < 10) ? h = `0${h}` : h;
	// Minute
	(m < 10) ? m = `0${m}` : m;
	// Append date & time to elements
	date.textContent = `${d} ${n}`;
	time.textContent = `${h}:${m}`
},
// Movement
R = {
	x: 0,
	nowX: 0,
	onX: 0,
	oldX: 0
},
w2 = window.innerWidth / 2, // Window width / 2
h2 = window.innerHeight / 2, // Window height / 2
// Parameters
S = 2, // Sensitivity (higher number = lower sens)
P = 2, // Smooth motion (higher number = smoother motion)
// Mouse events
M = {
	down: function(e) {
		if (!e.clientX) {
			// Touch screen
			R.onX = -w2 + e.touches[0].clientX
		} else R.onX = -w2 + e.clientX;
		R.oldX = R.x;
		document.addEventListener("mousemove", M.move);
		document.addEventListener("touchmove", M.move)
	},
	move: function(e) {
		if (!e.clientX) {
			// Touch screen
			R.nowX = -w2 + e.touches[0].clientX
		} else R.nowX = -w2 + e.clientX;
		R.x = ((R.nowX - R.onX) / S) + R.oldX;
		if (R.x < -60) R.x = -60;
		if (R.x > 60) R.x = 60;
		let transform = `rotateY(${R.x.toFixed(P)}deg)`;
		// Object motion
		watch.style["-webkit-transform"] = transform;
		watch.style.transform = transform;
		// Shade rotation
		shade.style.width = `${(48 - (Math.abs(R.x) / 60) * 44)}mm`;
		shade.style.height = `${(48 - (Math.abs(R.x) / 60) * 4)}mm`;
		shade.style.right = `${((R.x + 60) / 60 * 100 - 100)}%`;
		shade.style.borderRadius = (R.x > 0) ? "20px 0 0 20px" : "0 20px 20px 0";
		shade.style.opacity = Math.abs(R.x / 60)
	},
	up: function() {
		document.removeEventListener("mousemove", M.move);
		document.removeEventListener("touchmove", M.move)
	}
};

// Event listeners
addEventListener("mousedown", M.down);
addEventListener("touchstart", M.down);
addEventListener("mouseup", M.up);
addEventListener("touchend", M.up);

// Turn on watch and update time
setTimeout(function() {
	screen.style["-webkit-filter"] = "brightness(100%)";
	screen.style.filter = "brightness(100%)"
	setDate();
	setInterval(setDate, 1000)
}, 500)