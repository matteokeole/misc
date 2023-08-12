const I = 12; // Number of iterations
const H = .7; // Height multiplier
let A = .4; // Base angle

const ctx = C.getContext("2d");
C.width = C.height = 600;

function oninput() {
	A = this.value;

	draw();
}

function draw() {
	ctx.resetTransform();
	ctx.clearRect(0, 0, C.width, C.height);
	ctx.translate(C.width / 2, C.height);

	drawBranch(I, 200);
}

function drawBranch(i, h) {
	i--;
	h *= H;

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -h);
	ctx.stroke();

	ctx.translate(0, -h);

	ctx.save();

	ctx.rotate(A);
	i && drawBranch(i, h);

	ctx.restore();
	ctx.save();

	ctx.rotate(-A);
	i && drawBranch(i, h);

	ctx.restore();
}

angle.max = Math.PI * 2;
angle.value = A;
angle.oninput = oninput;

iterations.textContent = I;

draw();