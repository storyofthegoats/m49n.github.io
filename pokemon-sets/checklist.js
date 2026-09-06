"use strict";
const query = document.getElementById("query");
const finish = document.getElementById("finish");
const rarity = document.getElementById("rarity");
const kind = document.getElementById("filter");
const cards = Array.from(document.querySelectorAll("tbody tr"), row => ({
  row,
  text: row.textContent.toLocaleLowerCase(),
  finish: row.querySelector(".foil").textContent.trim(),
  rarity: row.querySelector(".badge").textContent.trim(),
  kind: row.querySelector(".kind").textContent.trim()
}));
function populateOptions(select, key) {
  const values = [...new Set(cards.map(card => card[key]))];
  values.sort((a, b) => a.localeCompare(b));
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
}
populateOptions(finish, "finish");
populateOptions(rarity, "rarity");
populateOptions(kind, "kind");
function filterCards() {
  const terms = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const card of cards) {
    const show = terms.every(term => card.text.includes(term))
      && (!finish.value || card.finish === finish.value)
      && (!rarity.value || card.rarity === rarity.value)
      && (!kind.value || card.kind === kind.value);
    card.row.hidden = !show;
    if (show) visible++;
  }
  document.getElementById("count").textContent = visible + " of " + cards.length + " cards";
  document.getElementById("empty").hidden = visible > 0;
}
query.addEventListener("input", filterCards);
for (const select of [finish, rarity, kind]) select.addEventListener("change", filterCards);
document.getElementById("reset").addEventListener("click", () => {
  query.value = "";
  finish.value = "";
  rarity.value = "";
  kind.value = "";
  filterCards();
  query.focus();
});
document.getElementById("controls").hidden = false;
filterCards();
