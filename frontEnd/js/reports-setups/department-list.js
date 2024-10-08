import { departmentsUrl } from "../tables-setups/departments-setup.js";
import { setInfoMessage } from "../table.js";
import { generateReportPDFUrl, generateReportExcelUrl } from "../report.js";

function addExportActionEvent() {
	const exportActions = document.querySelector(".report-export-tooltip");
	let pdfExport = exportActions
		.querySelector("li:nth-child(1)")
		.querySelector("#js-report_export-action");

	let excelExport = exportActions
		.querySelector("li:nth-child(2)")
		.querySelector("#js-report_export-action");

	pdfExport.addEventListener("click", (event) => {
		event.preventDefault();
		const reportKey = pdfExport.dataset.reportKeyGen;
		sendGeneratePDFReport(reportKey);
		document
			.querySelector(".report-export-tooltip")
			.classList.add("show-toolkit");
		document.querySelector(".report-export-in").classList.remove("show-export");
	});

	excelExport.addEventListener("click", (event) => {
		event.preventDefault();
		const reportKey = excelExport.dataset.reportKeyGen;
		sendGenerateExcelReport(reportKey);
		document
			.querySelector(".report-export-tooltip")
			.classList.add("show-toolkit");
		document.querySelector(".report-export-in").classList.remove("show-export");
	});
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
}

export function fetchDepartmentReportData() {
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
			populateReport(data);
		})
		.catch((error) => {
			setInfoMessage([false, `Error listing counties: ${error}`]);
		});

	addExportActionEvent();
}

function sendGeneratePDFReport(reportKey) {
	window.location.href =
		"http://localhost:3000/../../frontEnd/php/reports/pdf/departments-list.php";
	// fetch(
	// 	"http://localhost:3000/../../frontEnd/php/reports/pdf/departments-list.php"
	// )
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			console.log(response);
	// 			response.json().then((errorData) => {
	// 				setInfoMessage([false, `Generate report unsuccessful: ${errorData}`]);
	// 				return;
	// 			});
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		setInfoMessage([false, `Error generating PDF report: ${error}`]);
	// 	});
}

function sendGenerateExcelReport(reportKey) {
	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: reportKey,
		}),
	};

	fetch(generateReportExcelUrl, body)
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
			a.download = "department-list.xlsx";
			document.body.appendChild(a);
			a.click();

			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		})
		.catch((error) => {
			setInfoMessage([false, `Error generating Excel Report: ${error}`]);
		});
}
