const CODES = {
	A: 65,
	Z: 90,
};

function createCell(col, row) {
	return `<div class="cell" contenteditable 
	data-col="${col}" 
	data-id="${row}:${col}"
	data-type="cell"
	>${row}:${col}</div>`;
}

function createColumn(col, colIndex) {
	return `<div class="column" data-type="resizeble" data-col="${colIndex}">
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

function toChar(i) {
	return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 100) {
	const rows = [];
	const columnsCount = CODES.Z - CODES.A + 1;
	const columns = [];

	for (let row = 0; row < rowsCount; row++) {
		const cells = [];
		for (let col = 0; col < columnsCount; col++) {
			columns.push(createColumn(toChar(col), col));
			cells.push(createCell(col, row));
		}
		if (row === 0) {
			rows.push(createRow(columns.join("")));
		}
		rows.push(createRow(cells.join(""), row + 1));
	}

	return rows.join("");
}
