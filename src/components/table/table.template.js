import { toInlineStyles } from "@core/utils";
import { defaultStyles } from "@/constants";
import { parse } from "@core/utils";

const CODES = {
	A: 65,
	Z: 90,
};

function getSize(id, state) {
	return state[id] ? state[id] + "px" : "";
}

function createCell(col, row, state = {}) {
	const width = getSize(col, state.colState);
	const id = `${row}:${col}`;
	const data = state.dataState[id] || "";
	const styles = toInlineStyles({
		...defaultStyles,
		...state.stylesState[id],
	});

	return `<div class="cell" contenteditable 
	data-col="${col}" 
	data-id="${id}"
	data-type="cell"
	data-value="${data || ""}"
	style="${styles}; width: ${width}"
	>${parse(data)}</div>`;
}

function createColumn(col, colIndex, state = {}) {
	const width = getSize(colIndex, state);

	return `<div 
		class="column" 
		data-type="resizeble" 
		data-col="${colIndex}"
		${width ? 'style="width:' + width + '"' : ""}
		>
		${col}
		<div class="column-resize" data-resize="col"></div>
	</div>`;
}

function createRow(content, index = "", state = {}) {
	const height = getSize(index, state);
	return `
        <div class="row" 
		data-type="resizeble" 
		data-row="${index}"
		${height ? 'style="height:' + height + '"' : ""}
		>
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

export function createTable(rowsCount = 100, state) {
	const rows = [];
	const columnsCount = CODES.Z - CODES.A + 1;
	const columns = [];

	for (let row = 0; row < rowsCount; row++) {
		const cells = [];
		for (let col = 0; col < columnsCount; col++) {
			columns.push(createColumn(toChar(col), col, state.colState));
			cells.push(createCell(col, row, state));
		}
		if (row === 0) {
			rows.push(createRow(columns.join("")));
		}
		rows.push(createRow(cells.join(""), row + 1, state.rowState));
	}

	return rows.join("");
}
