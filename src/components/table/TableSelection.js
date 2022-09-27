export class TableSelection {
	static className = "selected";

	constructor() {
		this.selection = [];
		this.current = null;
	}

	clear() {
		this.selection.forEach(($el) => $el.removeClass(TableSelection.className));
		this.selection = [];
	}

	select($el) {
		this.clear();
		this.selection.push($el);
		this.current = $el;
		$el.focus().addClass(TableSelection.className);
	}

	selectGroup($group = []) {
		this.clear();
		this.selection = $group;
		$group.forEach(($el) => $el.addClass(TableSelection.className));
	}
}
