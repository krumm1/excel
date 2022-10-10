import { $ } from "@core/Dom";

export function resize($root, event) {
	return new Promise((resolve) => {
		const resizeType = event.target.dataset.resize;
		const $resizer = $(event.target);
		const $parent = $resizer.closest("[data-type]");
		const coords = $parent.getCoords();
		const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
		let value = 0;

		$root.addClass("resizing");

		document.onmousemove = (e) => {
			$resizer.addClass("active");

			if (resizeType === "col") {
				const deltaX = e.pageX - coords.right;
				value = coords.width + deltaX;

				$resizer.css({
					height: window.outerHeight + "px",
					right: -deltaX + "px",
				});
			} else if (resizeType === "row") {
				const deltaY = e.pageY - coords.bottom;
				value = coords.height + deltaY;

				$resizer.css({
					width: window.outerWidth + "px",
					bottom: -deltaY + "px",
				});
			}
		};

		document.onmouseup = () => {
			document.onmousemove = null;
			document.onmouseup = null;

			if (resizeType === "col") {
				cells.forEach((el) => {
					$(el).css({ width: value + "px" });
				});

				$resizer.css({ right: 0, height: null });
			} else if (resizeType === "row") {
				$parent.css({ height: value + "px" });
				$resizer.css({ bottom: 0, width: null });
			}

			resolve({
				id: $parent.data[resizeType],
				type: resizeType,
				value,
			});

			$resizer.removeClass("active");
			$root.removeClass("resizing");
		};
	});
}
