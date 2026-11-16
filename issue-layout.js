(() => {
  const menu = document.querySelector('.issue-menu');
  const sidebar = document.querySelector('.issue-sidebar');
  const scrim = document.querySelector('.issue-scrim');
  const mobile = matchMedia('(max-width: 760px)');

  function setOpen(open, returnFocus = false) {
    sidebar.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    scrim.hidden = !open;
    if (returnFocus) menu.focus();
  }

  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
    if (open) sidebar.querySelector('nav a[href], nav button')?.focus();
  });
  scrim.addEventListener('click', () => setOpen(false, true));
  sidebar.addEventListener('click', event => {
    const item = event.target.closest('a[href], nav button');
    if (mobile.matches && item) setOpen(false, item.matches('button'));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  mobile.addEventListener('change', () => setOpen(false));
  document.documentElement.classList.add('issue-menu-ready');
})();
