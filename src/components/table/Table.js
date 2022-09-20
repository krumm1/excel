import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resize } from "./table.resize";
import { shouldResize } from "./table.functions";

export class Table extends ExcelComponent {
	static className = "excel__table";

	constructor($root) {
		super($root, {
			name: "Table",
			listeners: ["mousedown"],
		});
	}

	toHTML() {
		return createTable(100);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resize(this.$root, event);
		}
	}
}
