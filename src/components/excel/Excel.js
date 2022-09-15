import { $ } from "@core/Dom";

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || [];
		this.topComponents = options.topComponents || [];
	}

	getRoot() {
		const $root = $.create("div", "excel");
		const $rootTop = $.create("div", "excel__top");

		$root.append($rootTop);

		this.components = this.components.map((Component) => {
			const inHeader = this.topComponents.includes(Component);
			const $componentRoot = $.create("div", Component.className);

			const component = new Component($componentRoot);
			$componentRoot.html(component.toHTML());

			// debug
			// window["c" + component.name] = component;
			// debug

			if (inHeader) {
				$rootTop.append($componentRoot);
			} else {
				$root.append($componentRoot);
			}

			return component;
		});

		return $root;
	}

	render() {
		this.$el.append(this.getRoot());
		this.components.forEach((component) => component.init());
	}
}
