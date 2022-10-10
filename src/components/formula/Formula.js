import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/Dom";

export class Formula extends ExcelComponent {
	constructor($root, options) {
		super($root, {
			name: "Formula",
			listeners: ["input", "keydown"],
			subscribe: ["currentText"],
			...options,
		});
	}

	static className = "excel__formula";

	init() {
		super.init();

		this.$formula = this.$root.find("[contenteditable]");

		this.$on("Table:select", ($cell) => this.$formula.text($cell.data.value));
	}

	toHTML() {
		return `
            <div class="info">fx</div>
            <div class="input" contenteditable="true" spellcheck="false"></div>
        `;
	}

	storeChanged({ currentText }) {
		this.$formula.text(currentText);
	}

	onInput(e) {
		const text = $(e.target).text();
		this.$emit("Formula:input", text);
	}

	onKeydown(e) {
		const { key } = e;
		const keys = ["Enter", "Tab"];

		if (keys.includes(key)) {
			e.preventDefault();
			this.$emit("Formula:enter");
		}
	}
}
