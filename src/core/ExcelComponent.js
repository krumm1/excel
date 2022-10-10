import { DOMListener } from "./DOMListener";

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || "";
		this.emitter = options.emitter;
		this.subscribe = options.subscribe || [];
		this.store = options.store;
		this.unsubscribers = [];

		this.prepare();
	}

	toHTML() {
		return "";
	}

	prepare() {}

	init() {
		this.initDOMListeners();
	}

	$on(event, fn) {
		const unsub = this.emitter.on(event, fn);
		this.unsubscribers.push(unsub);
	}

	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	storeChanged() {}

	isWatching(key) {
		return this.subscribe.includes(key);
	}

	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach((unsub) => unsub());
	}
}
