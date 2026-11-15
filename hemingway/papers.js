(() => {
  const archive = document.querySelector('#archive');
  const reader = document.querySelector('#reader');
  const cover = document.querySelector('.cover');
  const tools = document.querySelector('#archive-tools');
  const search = document.querySelector('#paper-search');
  const year = document.querySelector('#paper-year');
  const topic = document.querySelector('#paper-topic');
  const random = document.querySelector('#paper-random');
  const savedFilter = document.querySelector('#paper-saved');
  const status = document.querySelector('#paper-status');
  const groups = [...document.querySelectorAll('.year')];
  const papers = new Map([...reader.querySelectorAll('.paper')].map(paper => [paper.id, paper]));
  const entries = [...archive.querySelectorAll('.entry')].map(link => {
    const id = link.hash.slice(1);
    const paper = papers.get(id);
    const text = paper.querySelector('.paper-body').textContent;
    return {
      id,
      row: link.closest('li'),
      year: paper.dataset.year,
      topic: paper.dataset.topic,
      search: normalize(link.textContent + ' ' + text),
    };
  });

  const storageKey = 'm49n-hemingway-shortlist';
  let saved = new Set();
  let canSave = true;
  try {
    const previous = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(previous)) saved = new Set(previous.filter(id => papers.has(id)));
  } catch {
    canSave = false;
  }

  function normalize(value) {
    return value.toLowerCase().replace(/[‘’]/g, "'");
  }

  function refreshArchive() {
    const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    const onlySaved = savedFilter.getAttribute('aria-pressed') === 'true';
    const matches = entries.filter(entry => {
      const visible = (!year.value || entry.year === year.value)
        && (!topic.value || entry.topic === topic.value)
        && (!onlySaved || saved.has(entry.id))
        && words.every(word => entry.search.includes(word));
      entry.row.hidden = !visible;
      return visible;
    });

    groups.forEach(group => {
      group.hidden = !group.querySelector('li:not([hidden])');
    });
    status.textContent = matches.length === 0
      ? (onlySaved && saved.size === 0 ? 'Your shortlist is empty.' : 'No papers match these filters.')
      : matches.length + (matches.length === 1 ? ' paper' : ' papers');
    return matches;
  }

  function route(focus) {
    const id = location.hash.slice(1);
    const paper = papers.get(id);
    cover.hidden = archive.hidden = Boolean(paper);
    reader.hidden = !paper;
    papers.forEach(item => { item.hidden = item !== paper; });

    if (paper) {
      const heading = paper.querySelector('h2');
      const save = paper.querySelector('[data-save]');
      save.hidden = !canSave;
      save.setAttribute('aria-pressed', String(saved.has(id)));
      save.textContent = saved.has(id) ? 'Shortlisted' : 'Add to shortlist';
      document.title = heading.textContent + ' · The Hemingway Papers · m49n';
      if (focus) {
        heading.focus({ preventScroll: true });
        window.scrollTo(0, 0);
      }
      return;
    }

    document.title = 'The Hemingway Papers · m49n';
    if (focus && id === 'contents') {
      const heading = document.querySelector('#contents');
      heading.focus({ preventScroll: true });
      heading.scrollIntoView();
    }
  }

  reader.addEventListener('click', event => {
    const save = event.target.closest('[data-save]');
    if (!save) return;

    const id = save.closest('.paper').id;
    const next = new Set(saved);
    if (next.has(id)) next.delete(id);
    else next.add(id);

    try {
      localStorage.setItem(storageKey, JSON.stringify([...next]));
    } catch {
      save.disabled = true;
      save.textContent = 'Shortlist unavailable';
      return;
    }

    saved = next;
    refreshArchive();
    route(false);
  });

  search.addEventListener('input', refreshArchive);
  year.addEventListener('change', refreshArchive);
  topic.addEventListener('change', refreshArchive);
  savedFilter.addEventListener('click', () => {
    const pressed = savedFilter.getAttribute('aria-pressed') === 'true';
    savedFilter.setAttribute('aria-pressed', String(!pressed));
    refreshArchive();
  });
  savedFilter.hidden = !canSave;

  random.addEventListener('click', () => {
    const matches = refreshArchive();
    if (matches.length) location.hash = matches[Math.floor(Math.random() * matches.length)].id;
  });
  tools.addEventListener('submit', event => {
    event.preventDefault();
    refreshArchive();
  });

  document.documentElement.classList.add('enhanced');
  tools.hidden = false;
  status.hidden = false;
  refreshArchive();
  route(true);
  window.addEventListener('hashchange', () => route(true));
})();
