import {
	populateTable,
	extractCodes,
	autoIncrementCode,
} from "./departments-setup.js";
import { updateForm, setInfoMessage } from "../table.js";

export const positionUrl =
	"http://localhost:3000/../../frontEnd/php/positions.php";

let positions;

function findPosition(code) {
	for (let i = 0; i <= positions.length - 1; i++) {
		if (positions[i].code === code) {
			return positions[i];
		}
	}
}

export function fetchPositionsData() {
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
		.then((data) => {
			positions = data;
			localStorage.setItem("positions", JSON.stringify(data));
			populateTable(data);
		})
		.catch((error) => {
			console.log(error);
			setInfoMessage([false, `Error listing positions: ${error}`]);
		});
}

export function addPositionsActionEvents() {
	const actionBtns = document.querySelectorAll("#js-action-btn");
	actionBtns.forEach((action) => {
		action.addEventListener("click", (e) => {
			e.preventDefault();
			let code = "";
			if (action.dataset.jsAction === "add") {
				let exist = findPosition(String(document.getElementById("code").value));
				if (exist) {
					setInfoMessage([false, "code already exists"]);
					return;
				}

				let codes = extractCodes(positions);
				code = autoIncrementCode(codes);
			} else if (action.dataset.jsAction === "clear") {
				document.getElementById("positionForm").reset();
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
			const position = document.getElementById("description").value;
			if (!position) {
				setInfoMessage([false, "description cannot be empty"]);
				return;
			}
			positionsActionToDo(action.dataset.jsAction, code, position);
		});
	});
}

function positionsActionToDo(action, code, position) {
	let foundPosition;
	switch (action) {
		case "add":
			if (!position) {
				setInfoMessage([false, "position cannot be empty"]);
			}
			foundPosition = findPosition(code);
			if (foundPosition) {
				setInfoMessage([false, "Code already exists"]);
				return;
			}
			addPosition(code, position);
			break;

		case "edit":
			if (!position) {
				setInfoMessage([false, "position cannot be empty"]);
			}
			foundPosition = findPosition(code);
			if (foundPosition) {
				savePosition(code, position);
				return;
			}

			setInfoMessage([false, "sorry cant edit code"]);
			break;

		case "save":
			if (!position) {
				setInfoMessage([false, "position cannot be empty"]);
			}
			foundPosition = findPosition(code);
			if (foundPosition) {
				savePosition(code, position);
				return;
			}

			addPosition(code, position);
			break;

		case "delete":
			foundPosition = findPosition(code);
			if (foundPosition) {
				deletePosition(code);
				return;
			}

			setInfoMessage([false, "Code does not exists"]);
			break;

		default:
			setInfoMessage([false, "do not recognize action"]);
	}
}

function addPosition(code, position) {
	const data = {
		action: "create",
		code: code,
		description: position,
	};

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(positionUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, `Position Added Unsuccessful: ${errorData}`]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			updateForm("", "");
			fetchPositionsData();
			setInfoMessage([true, "Position Added Successful"]);
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating Position: ${error}`]);
		});
}

function savePosition(code, position) {
	const data = {
		action: "update",
		code: code,
		description: position,
	};

	const body = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	fetch(positionUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([false, `Position Edit Unsuccessful: ${errorData}`]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			fetchPositionsData();
			updateForm("", "");
			setInfoMessage([true, "Position Edited Successful"]);
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating position: ${error}`]);
		});
}

function deletePosition(code) {
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

	fetch(positionUrl, body)
		.then((response) => {
			if (!response.ok) {
				response.json().then((errorData) => {
					setInfoMessage([
						false,
						`Position Delete Unsuccessful: ${JSON.stringify(errorData)}`,
					]);
					return;
				});
			}
			return response.json();
		})
		.then(() => {
			setInfoMessage([true, "Position Deleted Successful "]);
			updateForm("", "");
			fetchPositionsData();
		})
		.catch((error) => {
			setInfoMessage([false, `Error creating Position: ${error}`]);
		});
}
