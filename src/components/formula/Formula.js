import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/Dom";

export class Formula extends ExcelComponent {
	constructor($root, options) {
		super($root, {
			name: "Formula",
			listeners: ["input", "keydown"],
			...options,
		});
	}

	static className = "excel__formula";

	init() {
		super.init();

		this.$formula = this.$root.find("[contenteditable]");

		this.$on("Table:input", ($cell) => this.$formula.text($cell.text()));

		this.$on("Table:select", ($cell) => this.$formula.text($cell.text()));
	}

	toHTML() {
		return `
            <div class="info">fx</div>
            <div class="input" contenteditable="true" spellcheck="false"></div>
        `;
	}

	onInput(e) {
		const text = $(e.target).text();
		this.$emit("Formula:input", text);
	}

	onKeydown(e) {
		const { key } = e;
		const keys = ["Enter", "Tab"];

		if (keys.incluldes(key)) {
			e.preventDefault();
			this.$emit("Formula:enter");
		}
	}
}
