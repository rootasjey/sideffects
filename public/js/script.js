// -----------------------------
// WEB SITE APP - JS FILE (jquery)
// -----------------------------
// by Jeremie Corpinot
// jeremiecorpinot@outlook.com
// -----------------------------


// GLOBAL VARIABLES
// ----------------
// Tell if the user is in admin mode
var _ADMIN = false;


// Run when the page is loaded
// --------------------------
window.onload = function () {
	defaultLoad();
};

// Load defaults functions
function defaultLoad() {
	getProjects();
	getLessons();
}
