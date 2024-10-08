// Testing Github for Toro

import { updateForm, setInfoMessage } from "../table.js";

export const listDepartmentsUrl = "http://localhost:8080/departments";
// const getDepartmentUrl = "http://localhost:8080/department";
// const deleteDepartmentUrl = "http://localhost:8080/department";
// const createDepartmentUrl = "http://localhost:8080/departments";
// const updateDepartmentUrl = "http://localhost:8080/department";

export const departmentsUrl =
	"http://localhost:3000/../../frontEnd/php/departments.php";
// const getDepartmentUrl = "../../php/departments.php";
// const deleteDepartmentUrl = "../../php/departments.php";
// const createDepartmentUrl = "../../php/departments.php";
// const updateDepartmentUrl = "../../php/departments.php";

let departments;

function findDepartment(code) {
	for (let i = 0; i <= departments.length - 1; i++) {
		if (departments[i].code === code) {
			return departments[i];
		}
	}
}

// entry point of departments setup, fetches data save to localStorage then
// calls the populate table to add the table rows(departments data)
export function fetchData() {
	let sendData = {
		action: "list",
	};
	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(sendData),
	};
	fetch(departmentsUrl, body)
		.then((response) => response.json())
		.then((data) => {
			departments = data;
			localStorage.setItem("departments", JSON.stringify(data));
			populateTable(data);
		})
		.catch((error) => {
			console.log(error);
			// console.error("Error fetching departments:", error);
			setInfoMessage([false, `Error listing counties: ${error}`]);
		});
}

// loops through the departments and add the rows for each department
// for each row add a listener when clicked changes the show icon position
// then updates the form with selected row data(updateForm)
export function populateTable(dataList) {
	// departments = JSON.parse(localStorage.getItem("departments"));
	let tbody = document.getElementById("js-table-content");
	tbody.innerHTML = "";
	dataList.forEach((data) => {
		tbody.innerHTML += `
        <tr class="js-department-list">
			<td><i class="ri-arrow-right-s-fill" style="visibility: hidden;"></i></td>
			<td>${data.code}</td>
			<td>${data.description}</td>
	    </tr>
    `;
	});

	const rowsData = document.querySelectorAll(".js-department-list");
	rowsData.forEach((row) => {
		row.addEventListener("click", () => {
			let active = document.querySelector(".show-icon");
			if (active) {
				active.classList.remove("show-icon");
				active.style.visibility = "hidden";
			}

			row.querySelector("td:first-child i").classList.add("show-icon");
			row.querySelector("td:first-child i").style.visibility = "visible";
			updateForm(
				row.querySelector("td:nth-child(2)").innerText,
				row.querySelector("td:nth-child(3)").innerText
			);
		});
	});
}

// gets the action buttons (save, edit, add...etc) add event listener
// when an action is clicked it retrieves the code and description values
// check the code is never empty then pass the data to action related to each action
export function addDepartmentActionEvents() {
	const actionBtns = document.querySelectorAll("#js-action-btn");
	actionBtns.forEach((action) => {
		action.addEventListener("click", (e) => {
			e.preventDefault();
			let code = "";
			if (action.dataset.jsAction === "add") {
				// check if codes exist
				let exist = findDepartment(
					String(document.getElementById("code").value)
				);
				if (exist) {
					setInfoMessage([false, "code already exists"]);
					return;
				}
				let codes = extractCodes(departments);
				code = autoIncrementCode(codes);
			} else if (action.dataset.jsAction === "clear") {
				document.getElementById("departmentForm").reset();
				let active = document.querySelector(".show-icon");
				if (active) {
					active.classList.remove("show-icon");
					active.style.visibility = "hidden";
				}
				return;
			} else {
				code = String(document.getElementById("code").value);
				if (!code) {
					setInfoMessage([false, "code cannot be empty"]);
					return;
				}
			}
			const department = document.getElementById("description").value;
			if (!department) {
				setInfoMessage([false, "description cannot be empty"]);
				return;
			}
			actionToDo(action.dataset.jsAction, code, department);
		});
	});
}

export function extractCodes(departments) {
	return departments.map((department) => department.code);
}

export function getHighestCode(codes) {
	let highest = 0;

	codes.forEach((code) => {
		let numericPart = code.match(/\d+/);

		if (numericPart) {
			let num = parseInt(numericPart[0], 10);
			if (num > highest) {
				highest = num;
			}
		}
	});

	return highest;
}

export function autoIncrementCode(codes) {
	let highestCode = getHighestCode(codes);
	let newCode = highestCode + 1;
	let maxLength = Math.max(...codes.map((code) => code.length));
	let incrementedCode = newCode.toString().padStart(maxLength, "0");

	return incrementedCode;
}

// switch from the actions passed checking for required data for each action and setting
// messages after task execution or if error occurs with false = error and true = success with
// setInfoMessage()
function actionToDo(action, code, department) {
	let foundDepartment;
	switch (action) {
		case "add":
			if (!department) {
				setInfoMessage([false, "department cannot be empty"]);
			}
			foundDepartment = findDepartment(code);
			if (foundDepartment) {
				setInfoMessage([false, "Code already exists"]);
				return;
			}
			addDepartment(code, department);
			break;

		case "edit":
			if (!department) {
				setInfoMessage([false, "department cannot be empty"]);
			}
			foundDepartment = findDepartment(code);
			if (foundDepartment) {
				saveDepartment(code, department);
				return;
			}

			setInfoMessage([false, "sorry cant edit code"]);
			break;

		case "save":
			if (!department) {
				setInfoMessage([false, "department cannot be empty"]);
			}
			foundDepartment = findDepartment(code);
			if (foundDepartment) {
				saveDepartment(code, department);
				return;
			}

			addDepartment(code, department);
			break;

		case "delete":
			foundDepartment = findDepartment(code);
			if (foundDepartment) {
				deleteDepartment(code);
				return;
			}

			setInfoMessage([false, "Code does not exists"]);
			break;

		// case "clear":
		// 	document.getElementById("departmentForm").reset();
		// 	let active = document.querySelector(".show-icon");
		// 	if (active) {
		// 		active.classList.remove("show-icon");
		// 		active.style.visibility = "hidden";
		// 	}
		// 	break;

		default:
			setInfoMessage([false, "do not recognize action"]);
	}
}

function addDepartment(code, department) {
	const data = {
		action: "create",
		code: code,
		description: department,
	};

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(departmentsUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([
						false,
						`Department Added Unsuccessful: ${errorData}`,
					]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			updateForm("", "");
			fetchData();
			setInfoMessage([true, "Department Added Successful"]);
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating departments: ${error}`]);
		});
}

function saveDepartment(code, department) {
	const data = {
		action: "update",
		code: code,
		description: department,
	};

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(departmentsUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, `Department Edit Unsuccessful: ${errorData}`]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			updateForm("", "");
			fetchData();
			setInfoMessage([true, "Department Edited Successful"]);
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating departments: ${error}`]);
		});
}

function deleteDepartment(code) {
	const data = {
		action: "delete",
		code: code,
	};
	let body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};
	fetch(departmentsUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([
						false,
						`Department Delete Unsuccessful: ${errorData}`,
					]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			setInfoMessage([true, "Department Deleted Successful "]);
			updateForm("", "");
			fetchData();
		})
		.catch((error) => {
			setInfoMessage([false, `Error deleting departments: ${error}`]);
		});
}
