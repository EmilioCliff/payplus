import { tableSection } from "./table.js";
import { fetchDepartmentReportData } from "./reports-setups/department-list.js";

export const generateReportPDFUrl = "http://localhost:8080/reports";
export const generateReportExcelUrl = "http://localhost:8080/excels";

function addReportActionsEvents() {
	let exportReport = document.querySelector(".report-export-in");
	exportReport.addEventListener("click", (event) => {
		if (event.target.classList.contains("show-export")) {
			event.target.classList.remove("show-export");
			document
				.querySelector(".report-export-tooltip")
				.classList.add("show-toolkit");
		} else {
			event.target.classList.add("show-export");
			document
				.querySelector(".report-export-tooltip")
				.classList.remove("show-toolkit");
		}
	});

	let print = document.querySelector(".report_action");
	let printTimeOut;
	print.addEventListener("click", (event) => {
		event.target.classList.add("show-export");

		clearTimeout(printTimeOut);
		printTimeOut = setTimeout(function () {
			event.target.classList.remove("show-export");
		}, 2000);
	});
}

function displayDepartmentReport() {
	tableSection.innerHTML = `
		<div class="report-container">
				<div class="report-heading"></div>
				<p class="report__title">Department Reports</p>
				<div class="report_actions">
					<div class="report_action">
						<i class="ri-printer-line"></i>
						Print
					</div>
					<div class="report-export">
						<div class="report-export-in">
							<i class="ri-upload-2-line"></i>
							Export Data Table
						</div>
						<ul class="report-export-tooltip show-toolkit">
							<li class="report_export-action">
								<div id="js-report_export-action" data-report-key-gen="department-lists">
									<i class="ri-file-excel-line"></i>
									Export to PDF
								</div>
							</li>
							<li class="report_export-action">
								<div id="js-report_export-action" data-report-key-gen="department-lists">
									<i class="ri-file-pdf-2-line"> </i>
									Export to Excel
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="description_container">
						<p class="error-info" style="margin-left: 1rem;"></p>
				</div>
				<div class="report-table-container">
					<table class="report-table">
						<thead class="report-header">
							<tr>
								<th>Code</th>
								<th>Department</th>
							</tr>
						</thead>
						<tbody id="js-report-data">
						</tbody>
					</table>
				</div>
			</div>
	`;
	addReportActionsEvents();
	fetchDepartmentReportData();
}

export function showReport(report) {
	tableSection.innerHTML = "";

	switch (report) {
		case "departmentReports":
			displayDepartmentReport();
			break;
	}
}

// href="http://localhost:3000/../../frontEnd/php/reports/pdf/departments-list.php" download
