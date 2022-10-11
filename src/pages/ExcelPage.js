import { Page } from "@core/Page";
import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";
import { Store } from "@core/Store";
import { rootReducer } from "@/store/rootReducer";
import { debounce, storage } from "@core/utils";

function storageName(param) {
	return `excel:${param}`;
}

export class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString();
		const initialState = storage(storageName(params));
		const store = new Store(rootReducer, initialState);

		const stateListener = debounce((state) => {
			storage(storageName(params), state);
		}, 300);

		store.subscribe(stateListener);

		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			topComponents: [Header, Toolbar, Formula],
			store,
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
	}
}
