import { listDepartmentsUrl } from "../tables-setups/departments-setup.js";
import { setInfoMessage } from "../table.js";
import { generateReportUrl } from "../report.js";
// else if (event.target.classList.contains("show-export") && document.querySelector(".report-export-tooltip").classList.contains("show-toolkit")) {
//     event.target.classList.add("show-export");
//     document
//         .querySelector(".report-export-tooltip")
//         .classList.remove("show-toolkit");

function addExportActionEvent() {
	let exportBtns = document.querySelectorAll("#js-report_export-action");
	exportBtns.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			const reportKey = btn.dataset.reportKeyGen;
			sendGenerateReport(reportKey);
			document
				.querySelector(".report-export-tooltip")
				.classList.add("show-toolkit");
			document
				.querySelector(".report-export-in")
				.classList.remove("show-export");
		});
	});
}

function sendGenerateReport(reportKey) {
	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: reportKey,
		}),
	};

	fetch(generateReportUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, `Generate report unsuccessful: ${errorData}`]);
					return;
				});
			}
			return response.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = "department-list.pdf";
			document.body.appendChild(a);
			a.click();

			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating departments: ${error}`]);
		});
}

export function fetchDepartmentReportData() {
	fetch(listDepartmentsUrl)
		.then((response) => response.json())
		.then((data) => {
			// departments = data;
			// localStorage.setItem("departments", JSON.stringify(data));
			populateReport(data);
		})
		.catch((error) => {
			setInfoMessage([false, `Error getting report data: ${error}`]);
		});

	addExportActionEvent();
}

function populateReport(dataList) {
	// departments = JSON.parse(localStorage.getItem("departments"));
	let tbody = document.getElementById("js-report-data");
	tbody.innerHTML = "";
	dataList.forEach((data) => {
		tbody.innerHTML += `
        <tr>
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
