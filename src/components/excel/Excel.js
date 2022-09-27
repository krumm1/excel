import { $ } from "@core/Dom";
import { Emitter } from "@core/Emitter";

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || [];
		this.topComponents = options.topComponents || [];
		this.emitter = new Emitter();
	}

	getRoot() {
		const $root = $.create("div", "excel");
		const $rootTop = $.create("div", "excel__top");
		const componentOptions = {
			emitter: this.emitter,
		};

		$root.append($rootTop);

		this.components = this.components.map((Component) => {
			const inHeader = this.topComponents.includes(Component);
			const $componentRoot = $.create("div", Component.className);

			const component = new Component($componentRoot, componentOptions);
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
