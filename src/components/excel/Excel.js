import { $ } from "@core/Dom";
import { Emitter } from "@core/Emitter";
import { StoreSubscriber } from "@core/StoreSubscriber";
import { updateDate } from "@/store/actions";
import { preventDefault } from "@core/utils";
export class Excel {
	constructor(options) {
		this.components = options.components || [];
		this.topComponents = options.topComponents || [];
		this.emitter = new Emitter();
		this.store = options.store;
		this.subscriber = new StoreSubscriber(this.store);
	}

	getRoot() {
		const $root = $.create("div", "excel");
		const $rootTop = $.create("div", "excel__top");
		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
		};

		$root.append($rootTop);

		this.components = this.components.map((Component) => {
			const inHeader = this.topComponents.includes(Component);
			const $componentRoot = $.create("div", Component.className);

			const component = new Component($componentRoot, componentOptions);
			$componentRoot.html(component.toHTML());

			if (inHeader) {
				$rootTop.append($componentRoot);
			} else {
				$root.append($componentRoot);
			}

			return component;
		});

		return $root;
	}

	init() {
		if (process.env.NODE_ENV === "production") {
			document.addEventListener("contextmenu", preventDefault);
		}

		this.store.dispatch(updateDate());
		this.subscriber.subscribeComponents(this.components);
		this.components.forEach((component) => component.init());
	}

	destroy() {
		this.subscriber.unsubscribeFromStore();
		this.components.forEach((component) => component.destroy());
		document.removeEventListener("contextmenu", preventDefault);
	}
}
