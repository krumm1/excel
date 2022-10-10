import { Excel } from "./components/excel/Excel";
import { Header } from "./components/header/Header";
import { Toolbar } from "./components/toolbar/Toolbar";
import { Formula } from "./components/formula/Formula";
import { Table } from "./components/table/Table";

import "./scss/index.scss";
import { Store } from "./core/Store";
import { rootReducer } from "./store/rootReducer";
import { debounce, storage } from "./core/utils";
import { initialState } from "./store/initialState";

const store = new Store(rootReducer, initialState);

const stateListener = debounce((state) => {
	console.log("App State", state);
	storage("excel-state", state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel("#app", {
	components: [Header, Toolbar, Formula, Table],
	topComponents: [Header, Toolbar, Formula],
	store,
});

excel.render();
