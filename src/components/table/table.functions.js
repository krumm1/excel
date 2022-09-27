import { range } from "@core/utils";

export function shouldResize(event) {
	return Boolean(event.target.dataset.resize);
}

export function isCell(event) {
	return event.target.dataset.type === "cell";
}

export function parseId(id) {
	const parsedId = id.split(":");

	return {
		row: +parsedId[0],
		col: +parsedId[1],
	};
}

export function matrix($current, $target) {
	const currentId = parseId($current.data.id);
	const targetId = parseId($target.data.id);
	const rows = range(currentId.row, targetId.row);
	const cols = range(currentId.col, targetId.col);
	const ids = cols.reduce((acc, col) => {
		rows.forEach((row) => acc.push(`${row}:${col}`));

		return acc;
	}, []);

	return ids;
}

export function nextSelector(key, { row, col }) {
	switch (key) {
		case "ArrowRight":
		case "Tab":
			col++;
			break;
		case "ArrowDown":
		case "Enter":
			row++;
			break;
		case "ArrowUp":
			row = row > 0 ? row - 1 : row;
			break;
		case "ArrowLeft":
			col = col > 0 ? col - 1 : col;
			break;
	}

	return `[data-id="${row}:${col}"]`;
}
