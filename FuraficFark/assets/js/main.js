const
	DELAYS = [0, 300, 800, 1300],
	DELAYS_LENGTH = DELAYS.length,
	SOUNDS_PATH = "assets/sounds/",
	SOUNDS = [
		new Audio(`${SOUNDS_PATH}cash.mp3`),
		new Audio(`${SOUNDS_PATH}fart.mp3`),
		new Audio(`${SOUNDS_PATH}tada.mp3`),
	],
	SOUNDS_LENGTH = SOUNDS.length,
	/**
	 * @callback randomSound
	 */
	randomSoundDelay = function() {
		// Pick a random delay
		i = Math.floor(DELAYS_LENGTH * Math.random());

		setTimeout(randomSound, DELAYS[i]);
	},
	/**
	 * @callback animateButton
	 */
	randomSound = function() {
		// Pick a random sound
		i = Math.floor(SOUNDS_LENGTH * Math.random());

		const sound = SOUNDS[i];
		sound.currentTime = 0;
		sound.play();

		animateButton();
	},
	animateButton = function() {
		button.classList.add("shaking");

		setTimeout(() => button.classList.remove("shaking"), 600);
	};
let i;

button.onclick = randomSoundDelay;