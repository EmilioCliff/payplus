import { showTable, loadActiveTable } from "./table.js";

document.addEventListener("DOMContentLoaded", () => {
	let actions = document.querySelectorAll(".action");
	actions.forEach((action) => {
		action.addEventListener("click", () => {
			updateClickedAction(action);
		});
	});

	let subactions = document.querySelectorAll(".subaction");
	subactions.forEach((subaction) => {
		subaction.addEventListener("click", () => {
			updateClickedSubaction(subaction);
		});
	});

	let subSubactions = document.querySelectorAll(".sub-subaction");
	subSubactions.forEach((subSubaction) => {
		subSubaction.addEventListener("click", () => {
			updateClickedSubSubaction(subSubaction);
		});
	});

	// updates the user profile tooltip
	document.querySelector(".side-bar__user").addEventListener("click", () => {
		if (
			document.querySelector(".user-tooltip").style.visibility === "visible"
		) {
			document.querySelector(".user-tooltip").style.transform =
				"translateY(10rem)";
			document.querySelector(
				".user-more"
			).classList = `ri-arrow-down-s-fill user-more`;
			document.querySelector(".user-tooltip").style.visibility = "hidden";
		} else {
			document.querySelector(".user-tooltip").style.transform = "translateY(0)";
			document.querySelector(
				".user-more"
			).classList = `ri-arrow-up-s-fill user-more`;
			document.querySelector(".user-tooltip").style.visibility = "visible";
		}
	});

	// looks for the previous table before refresh and displays it
	// loadActiveTable();
});

// checks if the action is active if active remove class action-active
// and changes icon direction to close(right)
// if not active removes anycurrent active subaction, subsubactions and action then
// unlist its subactions sets class active and change icon direction to open(down)
function updateClickedAction(action) {
	if (action.classList.contains("action-active")) {
		action.classList.remove("action-active");
		if (action.querySelector("a i")) {
			action.querySelector("a i").classList =
				"ri-arrow-right-s-line chevron_right";
		}
		return;
	}

	removeActiveSubSubaction();
	removeActiveSubAction();
	let currentActive = document.querySelector(".action-active");
	if (currentActive) {
		currentActive.classList.remove("action-active");
		if (currentActive.querySelector("a i")) {
			document
				.querySelector(`#${currentActive.dataset.actionName}`)
				.classList.remove("show");
			currentActive.querySelector("a i").classList =
				"ri-arrow-right-s-line chevron_right";
		}
	}

	action.classList.add("action-active");
	if (action.querySelector("a i")) {
		action.querySelector("a i").classList =
			"ri-arrow-down-s-line chevron_right";
	}
}

// checks if the subaction is active if active removes class subaction-active
// and changes icon direction to close(right)
// if not active removes anycurrent active subaction and subsubactions then
// sets class active, unlist its subactions and change icon direction to open(down)
// if the subaction has a table linked it is displayed on the table section
function updateClickedSubaction(subaction) {
	if (subaction.classList.contains("subaction-active")) {
		subaction.classList.remove("subaction-active");
		if (subaction.querySelector("a i")) {
			subaction.querySelector("a i").classList = "ri-arrow-right-s-line";
		}
		return;
	}

	removeActiveSubAction();
	removeActiveSubSubaction();
	subaction.classList.add("subaction-active");
	if (subaction.querySelector("a i")) {
		subaction.querySelector("a i").classList = "ri-arrow-down-s-line";
	}

	// check if it has a table linked to it, if yes display the table
	const dataTableKey = subaction.dataset.tableKey;
	if (dataTableKey) {
		showTable(dataTableKey);
	}
}

// adds the sub-subaction-active class to the clicked subsubaction
function updateClickedSubSubaction(subSubaction) {
	removeActiveSubSubaction();
	subSubaction.classList.add("sub-subaction-active");

	// check if it has a table linked to it, if yes display the table
	const dataTableKey = subSubaction.dataset.tableKey;
	if (dataTableKey) {
		showTable(dataTableKey);
	}
}

// gets the active subaction and removes it checks if it has
// subsubactions and removes and collapse it changing the icon direction to close(right)
function removeActiveSubAction() {
	let currentActive = document.querySelector(".subaction-active");
	if (currentActive) {
		currentActive.classList.remove("subaction-active");
		if (currentActive.querySelector("a i")) {
			currentActive.querySelector("a i").classList = "ri-arrow-right-s-line";
			document
				.querySelector(`#${currentActive.dataset.actionName}`)
				.classList.remove("show");
		}
	}
}

// gets the active subsubaction and removes the active class sub-subaction-active
function removeActiveSubSubaction() {
	if (document.querySelector(".sub-subaction-active")) {
		document
			.querySelector(".sub-subaction-active")
			.classList.remove("sub-subaction-active");
	}
}
