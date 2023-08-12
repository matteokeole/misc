// Get scrollbar element
const scrollBar = document.querySelector("progress"),
// Scroll variables
S = {
	last: window.scrollY,
	curr: window.scrollY,
	diff: 0
};
// Scroll event listener
addEventListener("scroll", () => {
	S.last = S.curr;
	S.curr = window.scrollY;
	// Calc scroll diff
	S.diff = Math.abs(S.curr - S.last);
	// Render on the scroll bar
	scrollBar.value = S.diff
})
