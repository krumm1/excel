const CODES = {
	A: 65,
	Z: 90,
};

function createCell(index) {
	return `<div class="cell" contenteditable data-index="${index}"></div>`;
}

function createColumn(col, index) {
	return `<div class="column" data-type="resizeble" data-index="${index}">
		${col}
		<div class="column-resize" data-resize="col"></div>
	</div>`;
}

function createRow(content, index = "") {
	return `
        <div class="row" data-type="resizeble">
            <div class="row-info">
				${index}
				${index && '<div class="row-resize" data-resize="row"></div>'}
			</div>
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
		columns.push(createColumn(toChar(i), i));
		cells.push(createCell(i));
	}

	rows.push(createRow(columns.join("")));

	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(cells.join(""), i + 1));
	}

	return rows.join("");
}
