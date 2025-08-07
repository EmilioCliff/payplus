import {
	fetchData,
	addDepartmentActionEvents,
} from "./tables-setups/departments-setup.js";
import {
	addCountyActionEvents,
	fetchCountyData,
} from "./tables-setups/counties-setup.js";
import {
	fetchPositionsData,
	addPositionsActionEvents,
} from "./tables-setups/positions.js";
import {
	fetchEmployeesDetailsData,
	addEmployeeDetailsActionEvents,
} from "./tables-setups/employee-details-setup.js";

export let tableSection = document.getElementById("js-table-section");

function displayDepartmentTable() {
	tableSection.innerHTML = `
        <div class="table-header">
            Department Setup
            <i class="ri-close-large-line"></i>
        </div>
			<div class="table-data">
				<div class="form-container">
					<form action="#" id="departmentForm" method="POST" autocomplete="off">
						<div class="mb-06">
							<label class="col-25" for="code">Code</label>
							<input
								type="number"
								required
								id="code"
								name="code"
								class="col-25 code"
								value=""
								disabled
							/>
						</div>
						<div class="description_selector">
							<label class="col-25" for="">Description</label>
							<input
								type="text"
								required
								id="description"
								class="col-50 description"
								value=""
							/>
						</div>
					</form>
				</div>
				<div class="action-container">
					<a href="" class="action-btn" id="js-action-btn" data-js-action="add">ADD</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="edit">EDIT</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="save">SAVE</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="delete">DELETE</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="clear">CLEAR</a>
				</div>
				<div class="table-container">
					<div class="description_container">
						<p class="error-info"></p>
						<p class="table-title">Click on Record To Select</p>
					</div>
					<div class="table-wrapper">
						<table class="department_table">
							<thead>
								<!-- <tr> -->
								<th></th>
								<th>Code</th>
								<th>Description</th>
								<!-- </tr> -->
							</thead>
							<tbody id="js-table-content">
								<!-- ================ TABLE ROWS =========== -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
    `;
	addDepartmentActionEvents();
	fetchData();
}

function displayCompanyDetails() {
	tableSection.innerHTML = `
    <div class="color-container">
        <div class="table-header">
				Company Details
				<i class="ri-close-large-line"></i>
			</div>
			<div class="info-table-data">
				<div class="form-container">
					<form action="#" method="POST" autocomplete="off">
						<div class="mb-06">
							<label class="col-25" for="company-name">Name</label>
							<input
								class="col-50 code"
								type="text"
								name="company-name"
								id="company-name"
								value="Laini Technologies"
							/>
						</div>
						<div class="mb-06">
							<label class="col-25" for="company-address">Address</label>
							<textarea
								name="company-address"
								id="company-address"
								class="col-50 description"
							>
 P.O Box
							</textarea
							>
						</div>
						<div class="mb-06">
							<label class="col-25" for="company-number">Mobile No.</label>
							<input
								class="col-50 description"
								type="text"
								name="company-number"
								id="company-number"
							/>
						</div>
						<div class="mb-06">
							<label class="col-25" for="company-email">Email</label>
							<input
								class="col-50 description"
								type="text"
								name="company-email"
								id="company-email"
							/>
						</div>
						<div class="header-overflow">
							<div class="header-overflow-title">KCB Bank Transfer Only</div>
							<div class="mb-06 two-col">
								<label class="" for="company-bank-code"
									>Company Bank Sort Code</label
								>
								<input
									class="description"
									type="text"
									name="company-bank-code"
									id="company-bank-code"
								/>
							</div>
							<div class="mb-06 two-col">
								<label class="" for="company-bank-no">Company Account No</label>
								<input
									class="description"
									type="text"
									name="company-bank-no"
									id="company-bank-no"
								/>
							</div>
						</div>
					</form>
					<div class="action-container">
						<a href="" class="action-btn">SAVE</a>
					</div>
				</div>
			</div>
        </div>
    `;
}

function displaySectionSetup() {
	tableSection.innerHTML = `
    <div class="color-container">
        <div class="table-header">
				Section Setup
				<i class="ri-close-large-line"></i>
			</div>
			<div class="table-data">
				<div class="form-container">
					<form action="#" method="POST" autocomplete="off">
						<div class="mb-06">
							<label class="col-25" for="sections-code">Code</label>
							<input
								type="number"
								required
								id="sections-code"
								name="sections-code"
								class="col-25 code"
								value=""
							/>
						</div>
						<div class="description_selector">
							<label class="col-25" for="sections-description"
								>Description</label
							>
							<input
								type="text"
								required
								id="sections-description"
								name="sections-description"
								class="col-50 description"
								value=""
							/>
						</div>
					</form>
				</div>
				<div class="action-container">
					<a href="" class="action-btn" data-js-action="add">ADD</a>
					<a href="" class="action-btn" data-js-action="edit">EDIT</a>
					<a href="" class="action-btn" data-js-action="save">SAVE</a>
					<a href="" class="action-btn" data-js-action="delete">DELETE</a>
				</div>
				<div class="table-container">
					<div class="description_container">
						<p class="error-info"></p>
						<p class="table-title">Click on Record To Select</p>
					</div>
					<div class="table-wrapper">
						<table class="department_table">
							<thead>
								<th></th>
								<th>Code</th>
								<th>Description</th>
							</thead>
							<tbody id="js-table-content">
								<!-- ================ TABLE ROWS =========== -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
        </div>
    `;
}

function displayJobTitlesSetup() {
	tableSection.innerHTML = `
    <div class="color-container">
        <div class="table-header">
				Job Titles Setup
				<i class="ri-close-large-line"></i>
			</div>
			<div class="table-data">
				<div class="form-container">
					<form action="#" id="positionForm" method="POST" autocomplete="off">
						<div class="mb-06">
							<label class="col-25" for="job-titles-code">Code</label>
							<input
								type="number"
								required
								id="code"
								name="code"
								class="col-25 code"
								value=""
								disabled
							/>
						</div>
						<div class="description_selector">
							<label class="col-25" for="job-titles-description"
								>Description</label
							>
							<input
								type="text"
								required
								id="description"
								name="description"
								class="col-50 description"
								value=""
							/>
						</div>
					</form>
				</div>
				<div class="action-container">
					<a href="" class="action-btn" id="js-action-btn" data-js-action="add">ADD</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="edit">EDIT</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="save">SAVE</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="delete">DELETE</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="clear">CLEAR</a>
				</div>
				<div class="table-container">
					<div class="description_container">
						<p class="error-info"></p>
						<p class="table-title">Click on Record To Select</p>
					</div>
					<div class="table-wrapper">
						<table class="department_table">
							<thead>
								<th></th>
								<th>Code</th>
								<th>Description</th>
							</thead>
							<tbody id="js-table-content">
								<!-- ================ TABLE ROWS =========== -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
        </div>
    `;
	addPositionsActionEvents();
	fetchPositionsData();
}

function displayGradesSetup() {
	tableSection.innerHTML = `
        <div class="color-container">
				<div class="table-header">
					Job Titles Setup
					<i class="ri-close-large-line"></i>
				</div>
				<div class="table-data">
					<div class="form-container">
						<form action="#" method="POST" autocomplete="off">
							<div class="mb-06">
								<label class="col-25" for="job-titles-code">Code</label>
								<input
									type="number"
									required
									id="job-titles-code"
									name="job-titles-code"
									class="col-25 code"
									value=""
								/>
							</div>
							<div class="description_selector">
								<label class="col-25" for="job-titles-description"
									>Description</label
								>
								<input
									type="text"
									required
									id="job-titles-description"
									name="job-titles-description"
									class="col-50 description"
									value=""
								/>
							</div>
							<div class="col-2-container">
								<div class="description_selector col-2-field">
									<label class="" for="job-titles-description"
										>Lower Basic Pay Limit</label
									>
									<input
										type="text"
										required
										id="job-titles-description"
										name="job-titles-description"
										class="col-25 description"
										value=""
									/>
								</div>
								<div class="description_selector col-2-field">
									<label class="" for="job-titles-description"
										>Upper Basic Pay Limit</label
									>
									<input
										type="text"
										required
										id="job-titles-description"
										name="job-titles-description"
										class="col-25 description"
										value=""
									/>
								</div>
							</div>
						</form>
					</div>
					<div class="action-container">
						<a href="" class="action-btn" data-js-action="add">ADD</a>
						<a href="" class="action-btn" data-js-action="edit">EDIT</a>
						<a href="" class="action-btn" data-js-action="save">SAVE</a>
						<a href="" class="action-btn" data-js-action="delete">DELETE</a>
					</div>
					<div class="table-container">
						<div class="description_container">
							<p class="error-info"></p>
							<p class="table-title">Click on Record To Select</p>
						</div>
						<div class="table-wrapper">
							<table class="department_table">
								<thead>
									<th></th>
									<th>Code</th>
									<th>Description</th>
									<th>LowerBasic</th>
									<th>UpperBasic</th>
								</thead>
								<tbody id="js-table-content">
									<!-- ================ TABLE ROWS =========== -->
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
    `;
}

function displayCountySetup() {
	tableSection.innerHTML = `
		 <div class="table-header">
            County Setup
            <i class="ri-close-large-line"></i>
        </div>
			<div class="table-data">
				<div class="form-container">
					<form action="#" method="POST" autocomplete="off">
						<div class="mb-06">
							<label class="col-25" for="code">Code</label>
							<input
								type="text"
								required
								id="code"
								name="code"
								class="col-25 code"
								value=""
							/>
						</div>
						<div class="description_selector">
							<label class="col-25" for="">Description</label>
							<input
								type="text"
								required
								id="description"
								class="col-50 description"
								value=""
							/>
						</div>
					</form>
				</div>
				<div class="action-container">
					<a href="" class="action-btn" id="js-action-btn" data-js-action="add">ADD</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="edit">EDIT</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="save">SAVE</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="delete">DELETE</a>
				</div>
				<div class="table-container">
					<div class="description_container">
						<p class="error-info"></p>
						<p class="table-title">Click on Record To Select</p>
					</div>
					<div class="table-wrapper">
						<table class="department_table">
							<thead>
								<th></th>
								<th>Code</th>
								<th>Description</th>
							</thead>
							<tbody id="js-table-content">
								<!-- ================ TABLE ROWS =========== -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
	`;
	addCountyActionEvents();
	fetchCountyData();
}

function displayEthincGroupEtup() {
	tableSection.innerHTML = `
		 <div class="table-header">
            Ethnic Groups Setup
            <i class="ri-close-large-line"></i>
        </div>
			<div class="table-data">
				<div class="form-container">
					<form action="#" method="POST" autocomplete="off">
						<div class="mb-06">
							<label class="col-25" for="code">Code</label>
							<input
								type="text"
								required
								id="code"
								name="code"
								class="col-25 code"
								value=""
							/>
						</div>
						<div class="description_selector">
							<label class="col-25" for="">Description</label>
							<input
								type="text"
								required
								id="description"
								class="col-50 description"
								value=""
							/>
						</div>
					</form>
				</div>
				<div class="action-container">
					<a href="" class="action-btn" id="js-action-btn" data-js-action="add">ADD</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="edit">EDIT</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="save">SAVE</a>
					<a href="" class="action-btn" id="js-action-btn" data-js-action="delete">DELETE</a>
				</div>
				<div class="table-container">
					<div class="description_container">
						<p class="error-info"></p>
						<p class="table-title">Click on Record To Select</p>
					</div>
					<div class="table-wrapper">
						<table class="department_table">
							<thead>
								<th></th>
								<th>Code</th>
								<th>Description</th>
							</thead>
							<tbody id="js-table-content">
								<!-- ================ TABLE ROWS =========== -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
	`;
}

function displayEmployeeDetails() {
	tableSection.innerHTML = `
	<div class="list-table__section" style="background-color: white;" >
		<div class="table-header list-header">Employee Details</div>
			<div class="list-setup">
				<div class="list-headings">
					<div class="list-actions">
						<div class="report_action" id="add-employee__details">Add New</div>
						<div class="report_action">Import</div>
					</div>
					<div class="list-actions">
						<div class="list-action-search">
							<form action="">
								<label for="search">Search By:</label>
								<input
									name="search"
									id="search"
									type="text"
									placeholder="Employee Name Or Employee Code"
								/>
								<button type="submit" class="search-submit">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path
											d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
										></path>
									</svg>
								</button>
							</form>
						</div>
					</div>
				</div>
				<p class="error-info" style="margin-left: 1rem"></p>
				<div class="list-table">
					<table class="list_table">
						<thead>
							<th>Emply Code</th>
							<th>Name</th>
							<th>Department</th>
							<th>Position</th>
							<th>Emplymnt Date</th>
							<th>Action</th>
						</thead>
						<tbody id="js-table-content">
							
						</tbody>
					</table>
				</div>
			</div>
			<div class="overflow-container"></div>
			<div class="overlay" id="add-employee__overlay">
				<div class="list-modal">
					<div class="title-list-modal">
						<div class="close-btn" id="close-btn__overlay">
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
						<form
							id="employeeForm"
						>
							<input type="hidden" name="action" value="create" id="" />
							<div>
								<label for="code">Employee Code:<sup>&#42;</sup></label>
								<input type="text" name="code" required />
							</div>
							<div>
								<label for="first_name">First Name:<sup>&#42;</sup></label>
								<input type="text" name="first_name" required />
							</div>
							<div>
								<label for="middle_name">Middle Name:<sup>&#42;</sup></label>
								<input type="text" name="middle_name" required />
							</div>
							<div>
								<label for="last_name">Last Name:<sup>&#42;</sup></label>
								<input
									type="text"
									name="last_name"
									class="some-text"
									required
								/>
							</div>
							<div>
								<label for="department">Department:<sup>&#42;</sup></label>
								<select name="department"  id="select-administrations" required>

								</select>
							</div>
							<div>
								<label for="position">Position:<sup>&#42;</sup></label>
								<select name="position" id="select-positions" required>

								</select>
							</div>
							<div>
								<label for="date_of_employment">Date of Employment</label>
								<input type="date" name="date_of_employment" id="date_of_employment" required />
							</div>
							<div class="form-submit-btns">
								<button type="button" class="form-submit" id="employee__add-btn">SAVE</button>
								<button type="button" class="form-submit" id="employee__clear-btn" >CLEAR</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			</div>
	`;
	fetchEmployeesDetailsData();
	addEmployeeDetailsActionEvents();
}

function dispayIDoNO() {
	tableSection = `
		<div class="color-container">
				<div class="table-header">
					Job Titles Setup
					<i class="ri-close-large-line"></i>
				</div>
				<div class="table-data">
					<div class="form-container">
						<form action="#" method="POST" autocomplete="off">
							<div class="mb-06">
								<label class="col-25" for="job-titles-code">Code</label>
								<input
									type="number"
									required
									id="job-titles-code"
									name="job-titles-code"
									class="col-25 code"
									value=""
								/>
							</div>
							<div class="description_selector">
								<label class="col-25" for="job-titles-description"
									>Description</label
								>
								<input
									type="text"
									required
									id="job-titles-description"
									name="job-titles-description"
									class="col-50 description"
									value=""
								/>
							</div>
							<div class="col-2-container">
								<div class="description_selector col-2-field">
									<label class="" for="job-titles-description"
										>Lower Basic Pay Limit</label
									>
									<input
										type="text"
										required
										id="job-titles-description"
										name="job-titles-description"
										class="col-25 description"
										value=""
									/>
								</div>
								<div class="description_selector col-2-field">
									<label class="" for="job-titles-description"
										>Upper Basic Pay Limit</label
									>
									<input
										type="text"
										required
										id="job-titles-description"
										name="job-titles-description"
										class="col-25 description"
										value=""
									/>
								</div>
							</div>
						</form>
					</div>
					<div class="header-overflow">
						<div class="header-overflow-title">KCB Bank Transfer Only</div>
						<div class="mb-06 two-col">
							<label class="" for="company-bank-code"
								>Company Bank Sort Code</label
							>
							<input
								class="description"
								type="text"
								name="company-bank-code"
								id="company-bank-code"
							/>
						</div>
						<div class="mb-06 two-col">
							<label class="" for="company-bank-no">Company Account No</label>
							<input
								class="description"
								type="text"
								name="company-bank-no"
								id="company-bank-no"
							/>
						</div>
					</div>
				</div>
			</div>
	`;
}

// a lookup table with table keys and switches over it displaying them
export function showTable(table) {
	localStorage.setItem("activeTable", table);

	tableSection.innerHTML = "";

	switch (table) {
		case "departmentSetup":
			displayDepartmentTable();
			break;

		case "companyDetails":
			displayCompanyDetails();
			break;

		case "sectionSetup":
			displaySectionSetup();
			break;

		case "jobTitleSetup":
			displayJobTitlesSetup();
			break;

		case "gradeSetup":
			displayGradesSetup();
			break;

		case "countySetup":
			displayCountySetup();
			break;

		case "ethnicGroupSetup":
			displayEthincGroupEtup();
			break;

		case "employeeDetailsSetup":
			displayEmployeeDetails();
			break;
	}
}

export function loadActiveTable() {
	const activeTable = localStorage.getItem("activeTable");
	if (activeTable) {
		showTable(activeTable);
	}
}

// takes the code and description and updates the field forms
export function updateForm(code, description) {
	document.getElementById("code").value = code;
	document.getElementById("description").value = description;
}

// adds messages/feedback to the user receives list where index 0 is boolean
// true - success and false - failed index 1 is the message to output
// the output only shows for three seconds
export function setInfoMessage(status) {
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
