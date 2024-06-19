import {
	fetchData,
	addDepartmentActionEvents,
} from "./tables-setups/departments-setup.js";
import {
	addCountyActionEvents,
	fetchCountyData,
} from "./tables-setups/counties-setup.js";

let tableSection = document.getElementById("js-table-section");

function displayDepartmentTable() {
	tableSection.innerHTML = `
        <div class="table-header">
            Department Setup
            <i class="ri-close-large-line"></i>
        </div>
			<div class="table-data">
				<div class="form-container">
					<form action="#" method="POST" autocomplete="off">
						<div class="mb-06">
							<label class="col-25" for="code">Code</label>
							<input
								type="number"
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
