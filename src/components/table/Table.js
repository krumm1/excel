import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resize } from "./table.resize";
import {
	shouldResize,
	isCell,
	matrix,
	parseId,
	nextSelector,
} from "./table.functions";
import { TableSelection } from "./TableSelection";
import { $ } from "@core/Dom";

export class Table extends ExcelComponent {
	static className = "excel__table";

	constructor($root, options) {
		super($root, {
			name: "Table",
			listeners: ["mousedown", "keydown", "input"],
			...options,
		});
	}

	init() {
		super.init();

		const $cell = this.$root.find('[data-id="0:0"]');
		this.selectCell($cell);

		this.$on("Formula:input", (text) => {
			this.selection.current.text(text);
		});

		this.$on("Formula:enter", () => {
			this.selection.current.focus();
		});
	}

	prepare() {
		this.selection = new TableSelection();
	}

	toHTML() {
		return createTable(100);
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit("Table:select", $cell);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resize(this.$root, event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix(this.selection.current, $target).map((id) =>
					this.$root.find(`[data-id="${id}"]`)
				);

				this.selection.selectGroup($cells);
			} else {
				this.selection.select($target);
			}
		}
	}

	onKeydown(event) {
		const { key } = event;
		const keys = [
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
			"Enter",
			"Tab",
		];

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = parseId($(event.target).data.id);
			const $nextCell = this.$root.find(nextSelector(key, id));
			this.selectCell($nextCell);
		}
	}

	onInput(event) {
		this.$emit("Table:input", $(event.target));
	}
}
