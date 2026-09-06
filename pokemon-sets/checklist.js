"use strict";
const query=document.getElementById("query"),kind=document.getElementById("filter");
const rows=Array.from(document.querySelectorAll("tbody tr"));
function filterCards(){
 const terms=query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);let visible=0;
 for(const row of rows){const tokens=row.dataset.tags.split(" ");const show=terms.every(t=>row.textContent.toLocaleLowerCase().includes(t))&&(!kind.value||tokens.includes(kind.value));row.hidden=!show;if(show)visible++;}
 document.getElementById("count").textContent=visible+" of "+rows.length+" cards";
 document.getElementById("empty").hidden=visible>0;
}
query.addEventListener("input",filterCards);kind.addEventListener("change",filterCards);
document.getElementById("reset").addEventListener("click",()=>{query.value="";kind.value="";filterCards();query.focus();});
document.getElementById("controls").hidden=false;
