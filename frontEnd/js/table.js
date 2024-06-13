const listDepartmentsUrl = "http://localhost:8080/departments";
const getDepartmentUrl = "http://localhost:8080/department";
const deleteDepartmentUrl = "http://localhost:8080/department";
const createDepartmentUrl = "http://localhost:8080/departments";
const updateDepartmentUrl = "http://localhost:8080/department";

let departments;
function findDepartment(code) {
	for (let i = 0; i <= departments.length - 1; i++) {
		if (departments[i].code === code) {
			return departments[i];
		}
	}
}
function populateTable() {
	departments = JSON.parse(localStorage.getItem("departments"));
	let tbody = document.getElementById("js-table-content");
	tbody.innerHTML = "";
	departments.forEach((department) => {
		tbody.innerHTML += `
        <tr class="js-department-list">
			<td><i class="ri-arrow-right-s-fill" style="visibility: hidden;"></i></td>
			<td>${department.code}</td>
			<td>${department.description}</td>
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

function fetchData() {
	fetch(listDepartmentsUrl)
		.then((response) => response.json())
		.then((data) => {
			localStorage.setItem("departments", JSON.stringify(data));
			populateTable();
		})
		.catch((error) => {
			console.error("Error fetching departments:", error);
		});
}

function updateForm(code, description) {
	document.getElementById("code").value = code;
	document.getElementById("description").value = description;
}

const actionBtns = document.querySelectorAll(".action-btn");
actionBtns.forEach((action) => {
	action.addEventListener("click", (e) => {
		e.preventDefault();
		const code = String(document.getElementById("code").value);
		if (!code) {
			setInfoMessage([false, "code cannot be empty"]);
			return;
		}
		const department = document.getElementById("description").value;
		console.log(action.dataset.jsAction, code, department);
		actionToDo(action.dataset.jsAction, code, department);
	});
});

function setInfoMessage(status) {
	let statusInfo = document.querySelector(".error-info");
	if (status[0]) {
		statusInfo.classList.add("success");
		statusInfo.innerHTML = `<span>Success</span>: ${status[1]}`;
	} else {
		statusInfo.classList.add("fail");
		statusInfo.innerHTML = `<span>Error</span>: ${status[1]}`;
	}

	setTimeout(() => {
		statusInfo.innerHTML = "";
		statusInfo.classList.remove("success");
		statusInfo.classList.remove("fail");
	}, 3000);
}

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

			setInfoMessage([false, "sorry cannot edit code"]);
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

		default:
			setInfoMessage([false, "do not recognize action"]);
	}
}

function addDepartment(code, department) {
	const data = {
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

	fetch(createDepartmentUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, "Department Add Unsuccessful: "]);
					return;
				});
			}
			return response.json();
		})
		.then((data) => {
			setInfoMessage([true, "Department Added Successful"]);
			updateForm("", "");
			fetchData();
		})
		.catch((error) => {
			console.error("Error creating departments:", error);
		});
}

function saveDepartment(code, department) {
	const updateUrl = updateDepartmentUrl + `/${code}`;
	const data = {
		description: department,
	};
	console.log(updateUrl);

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
					setInfoMessage([false, "Department Edit Unsuccessful: "]);
					return;
				});
			}
			return response.json();
		})
		.then((data) => {
			setInfoMessage([true, "Department Edited Successful"]);
			updateForm("", "");
			fetchData();
		})
		.catch((error) => {
			console.error("Error editing departments:", error);
		});
}

function deleteDepartment(code) {
	let deleteUrl = deleteDepartmentUrl + `/${code}`;
	body = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	};
	fetch(deleteUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, "Department Delete Unsuccessful: "]);
					return;
				});
			}
			return response.json();
		})
		.then((data) => {
			setInfoMessage([true, "Department Deleted Successful "]);
			updateForm("", "");
			fetchData();
		})
		.catch((error) => {
			console.error("Error deleting departments:", error);
		});
}

fetchData();
