function updateTime() {
	const now = new Date();
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const dayName = days[now.getDay()];

	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");
	const timeString = `${hours}:${minutes}:${seconds}`;

	document.getElementById(
		"time-display"
	).innerHTML = `${dayName} : ${timeString}`;
}

updateTime();
setInterval(updateTime, 1000);

const scrollContent = document.getElementById("scrollContent");
const scrollThumb = document.getElementById("scrollThumb");

const updateScrollbar = () => {
	const contentHeight = scrollContent.scrollHeight;
	const visibleHeight = scrollContent.clientHeight;
	const scrollRatio = visibleHeight / contentHeight;
	const thumbHeight = visibleHeight * scrollRatio;

	scrollThumb.style.height = `${thumbHeight}px`;
	scrollThumb.style.top = `${scrollContent.scrollTop * scrollRatio}px`;
};

scrollThumb.addEventListener("mousedown", (event) => {
	const initialY = event.clientY;
	const initialScrollTop = scrollContent.scrollTop;

	const onMouseMove = (moveEvent) => {
		const deltaY = moveEvent.clientY - initialY;
		const scrollRatio = scrollContent.scrollHeight / scrollContent.clientHeight;
		scrollContent.scrollTop = initialScrollTop + deltaY * scrollRatio;
	};

	const onMouseUp = () => {
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
	};

	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("mouseup", onMouseUp);
});

scrollContent.addEventListener("scroll", updateScrollbar);

window.addEventListener("resize", updateScrollbar);

document.addEventListener("DOMContentLoaded", updateScrollbar);
