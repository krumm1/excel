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
import { defaultStyles } from "@/constants";
import * as actions from "@/store/actions";
import { parse } from "@core/utils";

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

		this.$on("Formula:input", (value) => {
			this.selection.current.attr("data-value", value).text(parse(value));
			this.updateTextInStore(value);
		});

		this.$on("Formula:enter", () => {
			this.selection.current.focus();
		});

		this.$on("Toolbar:applyStyle", (value) => {
			this.selection.applyStyle(value);
			this.$dispatch(
				actions.applyStyle({
					value,
					ids: this.selection.selectedIds,
				})
			);
		});
	}

	prepare() {
		this.selection = new TableSelection();
	}

	toHTML() {
		const state = this.store.getState();
		return createTable(100, state);
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit("Table:select", $cell);
		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(actions.changeStyles(styles));
	}

	async resizeTable(event) {
		try {
			const data = await resize(this.$root, event);
			this.$dispatch(actions.tableResize(data));
		} catch (e) {
			console.error(e);
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix(this.selection.current, $target).map((id) =>
					this.$root.find(`[data-id="${id}"]`)
				);

				this.selection.selectGroup($cells);
			} else {
				this.selectCell($target);
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

	updateTextInStore(value) {
		this.$dispatch(
			actions.changeText({
				id: this.selection.current.data.id,
				value,
			})
		);
	}

	onInput(event) {
		this.updateTextInStore($(event.target).text());
	}
}
