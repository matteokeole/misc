const word = prompt("Choose a 3-letter word:");
if (word === null || word.length === 0) {
	// error 1: the action has been cancelled or the word is empty
	alert("Please enter a word");
	window.location.reload()
} else if (word.length > 3) {
	// error 2: the word is too longer for the animated element
	alert("Please choose a shorter word");
	window.location.reload()
} else if (!/^\w{3}$/.test(word)) {
	// error 3: the word contains forbidden characters like blanks
	alert("Please choose another word");
	window.location.reload()
} else {
	// create the animated element & append it to body
	const e = document.createElement("div");
	e.className = "animated";
	e.innerText = word;
	document.body.appendChild(e)
}