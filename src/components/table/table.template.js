const CODES = {
	A: 65,
	Z: 90,
};

function createCell() {
	return `<div class="cell" contenteditable></div>`;
}

function createColumn(col) {
	return `<div class="column">${col}</div>`;
}

function createRow(content, index = "") {
	return `
        <div class="row">
            <div class="row-info">${index}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}
createCell();
function toChar(i) {
	return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 100) {
	const rows = [];
	const columnsCount = CODES.Z - CODES.A + 1;
	const columns = [];
	const cells = [];

	for (let i = 0; i < columnsCount; i++) {
		columns.push(createColumn(toChar(i)));
		cells.push(createCell());
	}

	rows.push(createRow(columns.join("")));

	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(cells.join(""), i + 1));
	}

	return rows.join("");
}
