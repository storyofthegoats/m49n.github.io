"use strict";
const motionButton = document.getElementById("motion");
const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
function setPaused(paused) {
  document.body.classList.toggle("paused", paused);
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.textContent = paused ? "Resume motion" : "Pause motion";
}
setPaused(preference.matches);
motionButton.hidden = preference.matches;
motionButton.addEventListener("click", () => setPaused(!document.body.classList.contains("paused")));
preference.addEventListener("change", event => {
  setPaused(event.matches);
  motionButton.hidden = event.matches;
});
