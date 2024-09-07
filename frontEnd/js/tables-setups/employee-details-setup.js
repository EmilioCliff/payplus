import { updateForm, setInfoMessage } from "../table.js";
import { departmentsUrl } from "./departments-setup.js";
import { positionUrl } from "./positions.js";

export const employeesDetailsUrl =
	"http://localhost:3000/../../frontEnd/php/employees-details.php";

let employees;

function findEmployee(code) {
	for (let i = 0; i <= employees.length - 1; i++) {
		if (employees[i].code === code) {
			return employees[i];
		}
	}
}

export function fetchEmployeesDetailsData() {
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

	fetch(employeesDetailsUrl, body)
		.then((response) => response.json())
		.then((data) => {
			employees = data;
			localStorage.setItem("employees", JSON.stringify(data));
			populateEmployeeDetailsTable(data);
		})
		.catch((error) => {
			console.log(error);
			setInfoMessage([false, `Error listing employees: ${error}`]);
		});
}

export function populateEmployeeDetailsTable(dataList) {
	let tbody = document.getElementById("js-table-content");
	tbody.innerHTML = "";
	let overflowContainer = document.querySelector(".overflow-container");
	overflowContainer.innerHTML = "";
	dataList.forEach((data) => {
		let date = new Date(data["date_employed"]);
		let formattedDate = date.toISOString().split("T")[0];
		tbody.innerHTML += `
        <tr class="list-table-rows">
            <td>${data["code"]}</td>
            <td>${data["first_name"]} ${data["middle_name"]} ${data["last_name"]}</td>
            <td>${data["employee_department"]}</td>
            <td>${data["employee_position"]}</td>
            <td>${data["date_employed"]}</td>
            <td><button data-employee-code="${data["code"]}" id="add-empolyee__details-action">Action</button></td>
        </tr>`;

		overflowContainer.innerHTML += `
        <div id="department-data-carry-${data["code"]}" data-department-code="${data["department_code"]}" data-position-code="${data["position_code"]}"></div>
        <div class="overlay" id="add-employee__overlay-${data["code"]}">
				<div class="list-modal">
					<div class="title-list-modal">
						<div class="close-btn" id="close-btn__overlay-mod" data-code="${data["code"]}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
								></path>
							</svg>
						</div>
					</div>
                    <p class="error-info" style="margin-left: 1rem"></p>
					<div class="content-employees">
						<div class="image-container">
							<img src="./images/user-profile.jpg" alt="" />
							<div>
								<p>Browse</p>
								<p>Clear</p>
							</div>
						</div>
						<form id="employeeForm-${data["code"]}">
							<input type="hidden" name="action" value="update" id="" />
							<div>
								<label for="code">Employee Code:<sup>&#42;</sup></label>
								<input type="text" name="code" value="${data["code"]}" required />
							</div>
							<div>
								<label for="first_name">First Name:<sup>&#42;</sup></label>
								<input type="text" name="first_name" value="${data["first_name"]}" required />
							</div>
							<div>
								<label for="middle_name">Middle Name:<sup>&#42;</sup></label>
								<input type="text" name="middle_name" value="${data["middle_name"]}" required />
							</div>
							<div>
								<label for="last_name">Last Name:<sup>&#42;</sup></label>
								<input
									type="text"
									name="last_name"
									class="some-text"
                                    value="${data["last_name"]}"
									required
								/>
							</div>
							<div>
								<label for="department">Department:<sup>&#42;</sup></label>
								<select name="department" id="select-administrations-${data["code"]}" required>

								</select>
							</div>
							<div>
								<label for="position">Position:<sup>&#42;</sup></label>
								<select name="position" id="select-positions-${data["code"]}" required>

								</select>
							</div>
							<div>
								<label for="date_of_employment">Date of Employment</label>
								<input type="date" name="date_of_employment" value="${formattedDate}" id="" required />
							</div>
							<div class="form-submit-btns">
								<button type="button" class="form-submit" id="employee__update-btn" data-code="${data["code"]}">UPDATE</button>
								<button type="button" class="form-submit" id="employee__inactivate-btn" data-code="${data["code"]}">INACTIVATE</button>
							</div>
						</form>
					</div>
				</div>
			</div>
    `;
	});

	// add click event for the close modal
	let closeBtnsOverlay = document.querySelectorAll("#close-btn__overlay-mod");
	closeBtnsOverlay.forEach((btn) => {
		btn.addEventListener("click", () => {
			const code = btn.dataset.code;
			document.getElementById(`add-employee__overlay-${code}`).style.top =
				"-150%";
		});
	});

	// add click event for the update button
	let updateEmployeeBtns = document.querySelectorAll("#employee__update-btn");
	updateEmployeeBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const code = btn.dataset.code;
			document.getElementById(`employeeForm-${code}`).preventDefault;
			saveEmployeeDetails(code);
		});
	});

	// add click event for the deleting button
	let inactivateEmployeeBtns = document.querySelectorAll(
		"#employee__inactivate-btn"
	);
	inactivateEmployeeBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const code = btn.dataset.code;
			document.getElementById(`employeeForm-${code}`).preventDefault;
			deleteEmployee(code);
		});
	});

	// add click events for all the action buttons and displays the relative modal
	let actionBtns = document.querySelectorAll("#add-empolyee__details-action");
	actionBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			let employeeCode = btn.dataset.employeeCode;
			document.getElementById(
				`add-employee__overlay-${employeeCode}`
			).style.top = "0";
			const divDataHolder = document.getElementById(
				`department-data-carry-${employeeCode}`
			);

			fetchDeparmentDataForSelect(
				`select-administrations-${employeeCode}`,
				divDataHolder.dataset.departmentCode
			);
			fetchPositionsDataForSelect(
				`select-positions-${employeeCode}`,
				divDataHolder.dataset.positionCode
			);
		});
	});
}

export function addEmployeeDetailsActionEvents() {
	// add click events for when creating a new employee and displays the create employee modal
	let addEmployeeBtn = document.getElementById("add-employee__details");
	let overlay = document.getElementById("add-employee__overlay");
	addEmployeeBtn.addEventListener("click", () => {
		overlay.style.top = "0";
		fetchDeparmentDataForSelect("select-administrations");
		fetchPositionsDataForSelect("select-positions");
	});

	// add click events for closing the new employee modal
	let closeBtnOverlay = document.getElementById("close-btn__overlay");
	closeBtnOverlay.addEventListener("click", () => {
		overlay.style.top = "-150%";
		document.getElementById("employeeForm").reset();
	});

	// add click events for creating a new employee when the add btn is clicked
	let createEmployeeBtn = document.getElementById("employee__add-btn");
	createEmployeeBtn.addEventListener("click", () => {
		document.getElementById("employeeForm").preventDefault;
		createEmployee();
	});

	// add click event for clearing the input fields
	document
		.getElementById("employee__clear-btn")
		.addEventListener("click", function () {
			document.getElementById("employeeForm").reset();
		});
}

// fetches the department list
function fetchDeparmentDataForSelect(selectName, code = "") {
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
		.then((dataList) => {
			let departmentSelect = document.getElementById(selectName);
			departmentSelect.innerHTML = "";
			dataList.forEach((data) => {
				console.log(data["code"], code);
				departmentSelect.innerHTML += `
                    <option value="${data["code"]}" ${
					data["code"] === code ? "selected" : ""
				}>${data["description"]}</option>
                `;
			});
		})
		.catch((error) => {
			console.log(error);
		});
}

// fetches the positions list
function fetchPositionsDataForSelect(selectName, code) {
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
	fetch(positionUrl, body)
		.then((response) => response.json())
		.then((dataList) => {
			let positionSelect = document.getElementById(selectName);
			positionSelect.innerHTML = "";
			dataList.forEach((data) => {
				positionSelect.innerHTML += `
                    <option value="${data["code"]}" ${
					data["code"] === code ? "selected" : ""
				}>${data["description"]}</option>
                `;
			});
		})
		.catch((error) => {
			console.log(error);
		});
}

function createEmployee() {
	const form = document.getElementById("employeeForm");
	const formData = new FormData(form);

	let data = {};
	let error = false;
	for (const [key, value] of formData.entries()) {
		if (!value) {
			error = true;
			alert(`Please fill all required field: ${key}`);
			return;
		}
		data[key] = value;
	}

	if (error) return;

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(employeesDetailsUrl, body)
		.then((response) => {
			return response.json().then((jsonData) => {
				document.getElementById("add-employee__overlay").style.top = "-150%";
				document.getElementById("employeeForm").reset();
				if (!response.ok) {
					setInfoMessage([
						false,
						`Employee Creation Unsuccessful: ${JSON.stringify(jsonData)}`,
					]);
					throw new Error(
						`Employee Creation Unsuccessful: ${JSON.stringify(jsonData)}`
					);
				}

				return jsonData;
			});
		})
		.then((data) => {
			fetchEmployeesDetailsData();
			setInfoMessage([true, "Employee Created Successful"]);
		})
		.catch((error) => {
			console.log("Error:", error);
			setInfoMessage([false, `Error creating employee: ${error}`]);
		});
}

function saveEmployeeDetails(code) {
	const formData = new FormData(
		document.getElementById(`employeeForm-${code}`)
	);

	let data = {};
	let error = false;
	for (const [key, value] of formData.entries()) {
		if (!value) {
			error = true;
			alert(`Please fill all required field: ${key}`);
			return;
		}
		data[key] = value;
	}

	if (error) return;

	data["previous"] = code;

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(employeesDetailsUrl, body)
		.then((response) => {
			return response.json().then((jsonData) => {
				document.getElementById(`add-employee__overlay-${code}`).style.top =
					"-150%";
				document.getElementById(`employeeForm-${code}`).reset();
				if (!response.ok) {
					setInfoMessage([
						false,
						`Employee Updating Unsuccessful: ${JSON.stringify(jsonData)}`,
					]);
					throw new Error(
						`Employee Updating Unsuccessful: ${JSON.stringify(jsonData)}`
					);
				}

				return jsonData;
			});
		})
		.then((data) => {
			fetchEmployeesDetailsData();
			setInfoMessage([true, "Employee Updated Successful"]);
		})
		.catch((error) => {
			console.error("Error:", error);
			setInfoMessage([false, `Error updating employee: ${error}`]);
		});
}

function deleteEmployee(code) {
	let data = {
		action: "delete",
		code: code,
	};

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(employeesDetailsUrl, body)
		.then((response) => {
			return response.json().then((jsonData) => {
				document.getElementById(`add-employee__overlay-${code}`).style.top =
					"-150%";
				document.getElementById(`employeeForm-${code}`).reset();
				if (!response.ok) {
					setInfoMessage([
						false,
						`Employee Deleted Unsuccessful: ${JSON.stringify(jsonData)}`,
					]);
					throw new Error(
						`Employee Deleted Unsuccessful: ${JSON.stringify(jsonData)}`
					);
				}

				return jsonData;
			});
		})
		.then((data) => {
			console.log("Success:", data);
			fetchEmployeesDetailsData();
			setInfoMessage([true, "Employee Deleted Successful"]);
		})
		.catch((error) => {
			console.error("Error:", error);
			setInfoMessage([false, `Error deleting employee: ${error}`]);
		});
}
