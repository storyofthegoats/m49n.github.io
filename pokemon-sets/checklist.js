"use strict";
const query = document.getElementById("query");
const rows = Array.from(document.querySelectorAll("tbody tr"));
function searchCards() {
  const terms = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const row of rows) {
    const show = terms.every(term => row.textContent.toLocaleLowerCase().includes(term));
    row.hidden = !show;
    if (show) visible++;
  }
  document.getElementById("count").textContent = visible + " of " + rows.length + " cards";
  document.getElementById("empty").hidden = visible > 0;
}
query.addEventListener("input", searchCards);
document.getElementById("reset").addEventListener("click", () => {
  query.value = "";
  searchCards();
  query.focus();
});
document.getElementById("controls").hidden = false;
searchCards();
