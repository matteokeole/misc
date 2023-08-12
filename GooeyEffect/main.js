const gooey = document.querySelector(".gooey"),
setPos = function(i) {
	// Set the position of an element by using its dataset (top/left)
	// i = element node
	i.style.left = `${i.dataset.left}px`;
	i.style.top = `${i.dataset.top}px`
},
setSize = function(i) {
	// Set the size of an element by using a random size variable
	// i = element node
	let size = Math.floor(100 * Math.random() + 50);
	i.style.width = `${size}px`;
	i.style.height = `${size}px`
};

// Create bubbles
for (let i = 0; i < 30; i++) {
	let bubble = document.createElement("div");
	bubble.className = "bubble";
	// Element initial position
	bubble.dataset.left = Math.floor(window.innerWidth * Math.random());
	bubble.dataset.top = Math.floor(window.innerHeight * Math.random());
	// Set the initial size and position
	setSize(bubble);
	setPos(bubble);
	gooey.appendChild(bubble) // Append the element to the container
};

const bubbles = gooey.childNodes; // Get the bubble number
setInterval(function() {
	// Animate each bubble
	for (let i of bubbles) {
		// New position
		let pos = {
			x: Number(i.dataset.left) + Math.floor(Math.random() * 50 - 25),
			y: Number(i.dataset.top) + Math.floor(Math.random() * 50 - 25)
		};
		i.dataset.left = pos.x;
		i.dataset.top = pos.y;
		// Set the new size and position
		setSize(i);
		setPos(i)
	}
}, 100)