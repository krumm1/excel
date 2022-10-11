import { storage } from "@core/utils";

function toHTML(param) {
	const model = storage(param);
	const id = param.split(":")[1];

	return `
    <li class="dashboard__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>
			${new Date(model.openedDate).toLocaleDateString()}
			${new Date(model.openedDate).toLocaleTimeString()}
		</strong>
    </li>
    `;
}

function getAllKeys() {
	const keys = [];

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.includes("excel")) continue;
		keys.push(key);
	}

	return keys;
}

export function createRecordsTable() {
	const keys = getAllKeys();

	if (!keys.length) {
		return "<p>There are no records</p>";
	}

	return `
    <div class="dashboard__list-header">
        <span>Table name</span>
        <span>Last opened</span>
    </div>
    <ul class="dashboard__list">
        ${keys.map(toHTML).join("")}
    </ul>
    `;
}
