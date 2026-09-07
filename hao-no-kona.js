"use strict";
// Coordinates: percentages of the uncropped poster [left, top, width, height].
// Set href and a destination-specific label to enable each link.
// Empty hrefs create no clickable area or keyboard tab stop.
const posterLinks = [
  {
    "id": "title",
    "box": [
      1,
      1,
      23,
      39
    ],
    "label": "title",
    "href": ""
  },
  {
    "id": "tyranitar",
    "box": [
      30,
      8,
      45,
      32
    ],
    "label": "tyranitar",
    "href": ""
  },
  {
    "id": "mountain",
    "box": [
      68,
      7,
      17,
      14
    ],
    "label": "mountain",
    "href": ""
  },
  {
    "id": "no-limits",
    "box": [
      74,
      30,
      25,
      16
    ],
    "label": "no limits",
    "href": ""
  },
  {
    "id": "seal",
    "box": [
      2,
      46,
      9,
      8
    ],
    "label": "seal",
    "href": ""
  },
  {
    "id": "jar",
    "box": [
      40,
      41,
      33,
      22
    ],
    "label": "jar",
    "href": ""
  },
  {
    "id": "benefits",
    "box": [
      79,
      46,
      20,
      17
    ],
    "label": "benefits",
    "href": ""
  },
  {
    "id": "before",
    "box": [
      1,
      64,
      27,
      18
    ],
    "label": "before",
    "href": ""
  },
  {
    "id": "after",
    "box": [
      29,
      64,
      37,
      18
    ],
    "label": "after",
    "href": ""
  },
  {
    "id": "legacy",
    "box": [
      67,
      64,
      32,
      18
    ],
    "label": "legacy",
    "href": ""
  },
  {
    "id": "mineral",
    "box": [
      1,
      85,
      13,
      12
    ],
    "label": "mineral",
    "href": ""
  },
  {
    "id": "root",
    "box": [
      15,
      85,
      12,
      12
    ],
    "label": "root",
    "href": ""
  },
  {
    "id": "fungus",
    "box": [
      29,
      85,
      13,
      12
    ],
    "label": "fungus",
    "href": ""
  },
  {
    "id": "powder",
    "box": [
      43,
      85,
      17,
      12
    ],
    "label": "powder",
    "href": ""
  },
  {
    "id": "awaken",
    "box": [
      62,
      89,
      37,
      9
    ],
    "label": "awaken",
    "href": ""
  }
];
const layer = document.getElementById("hotspots");
for (const {id, box, label, href} of posterLinks) {
  if (!href) continue;
  const url = new URL(href, document.baseURI);
  if (!["http:", "https:"].includes(url.protocol)) continue;
  const link = document.createElement("a");
  link.className = "hotspot";
  link.dataset.region = id;
  link.href = href;
  link.setAttribute("aria-label", label);
  const [left, top, width, height] = box;
  Object.assign(link.style, {left:left+"%", top:top+"%", width:width+"%", height:height+"%"});
  layer.append(link);
}
