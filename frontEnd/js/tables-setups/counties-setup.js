import { populateTable } from "./departments-setup.js";
import { updateForm, setInfoMessage } from "../table.js";

const listCountyUrl = "http://localhost:8080/counties";
const getCountyUrl = "http://localhost:8080/county";
const deleteCountyUrl = "http://localhost:8080/county";
const createCountyUrl = "http://localhost:8080/counties";
const updateCountyUrl = "http://localhost:8080/county";

let counties;

function findCounty(code) {
	for (let i = 0; i <= counties.length - 1; i++) {
		if (counties[i].code === code) {
			return counties[i];
		}
	}
}

export function fetchCountyData() {
	fetch(listCountyUrl)
		.then((response) => response.json())
		.then((data) => {
			counties = data;
			localStorage.setItem("counties", JSON.stringify(data));
			populateTable(data);
		})
		.catch((error) => {
			// console.error("Error fetching counties:", error);
			setInfoMessage([false, `Error fetching counties: ${error}`]);
		});
}

export function addCountyActionEvents() {
	const actionBtns = document.querySelectorAll("#js-action-btn");
	actionBtns.forEach((action) => {
		action.addEventListener("click", (e) => {
			e.preventDefault();
			const code = String(document.getElementById("code").value);
			if (!code) {
				setInfoMessage([false, "code cannot be empty"]);
				return;
			}
			const county = document.getElementById("description").value;
			countyActionToDo(action.dataset.jsAction, code, county);
		});
	});
}

function countyActionToDo(action, code, county) {
	let foundCounty;
	switch (action) {
		case "add":
			if (!county) {
				setInfoMessage([false, "county cannot be empty"]);
			}
			foundCounty = findCounty(code);
			if (foundCounty) {
				setInfoMessage([false, "Code already exists"]);
				return;
			}
			addCounty(code, county);
			break;

		case "edit":
			if (!county) {
				setInfoMessage([false, "county cannot be empty"]);
			}
			foundCounty = findCounty(code);
			if (foundCounty) {
				saveCounty(code, county);
				return;
			}

			setInfoMessage([false, "sorry cant edit code"]);
			break;

		case "save":
			if (!county) {
				setInfoMessage([false, "county cannot be empty"]);
			}
			foundCounty = findCounty(code);
			if (foundCounty) {
				saveCounty(code, county);
				return;
			}

			addCounty(code, county);
			break;

		case "delete":
			foundCounty = findCounty(code);
			if (foundCounty) {
				deleteCounty(code);
				return;
			}

			setInfoMessage([false, "Code does not exists"]);
			break;

		default:
			setInfoMessage([false, "do not recognize action"]);
	}
}

function addCounty(code, county) {
	const data = {
		code: code,
		description: county,
	};

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(createCountyUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, `County Added Unsuccessful: ${errorData}`]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			setInfoMessage([true, "County Added Successful"]);
			updateForm("", "");
			fetchCountyData();
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating County: ${error}`]);
			// console.error("Error creating county:", error);
		});
}

function saveCounty(code, county) {
	const updateUrl = updateCountyUrl + `/${code}`;
	const data = {
		description: county,
	};

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(updateUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, `County Edit Unsuccessful: ${errorData}`]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			setInfoMessage([true, "County Edited Successful"]);
			updateForm("", "");
			fetchCountyData();
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating county: ${error}`]);
			// console.error("Error editing county:", error);
		});
}

function deleteCounty(code) {
	let deleteUrl = deleteCountyUrl + `/${code}`;
	let body = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	};
	fetch(deleteUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, `County Delete Unsuccessful: ${errorData}`]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			setInfoMessage([true, "County Deleted Successful "]);
			updateForm("", "");
			fetchCountyData();
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating county: ${error}`]);
			// console.error("Error deleting county:", error);
		});
}
