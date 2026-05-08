const tabs = Array.from(document.querySelectorAll('.tab-dock [role="tab"]'));
const panels = Array.from(document.querySelectorAll('.tab-panels > [role="tabpanel"]'));
const buffetTabs = Array.from(document.querySelectorAll('.buffet-tab'));
const buffetPanels = Array.from(document.querySelectorAll('.buffet-panel'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.menu-item img, .section-hero img').forEach((img) => {
  img.loading = 'lazy';
  img.decoding = 'async';
});

function activateTab(tab) {
  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === tab.getAttribute('aria-controls');
    panel.classList.toggle('is-active', isTarget);
    panel.hidden = !isTarget;
  });

  tab.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'nearest',
    inline: 'center'
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));
});

function activateBuffetTab(tab) {
  const target = tab.dataset.buffetTarget;

  buffetTabs.forEach((item) => {
    item.classList.toggle('is-active', item === tab);
  });

  buffetPanels.forEach((panel) => {
    const isTarget = panel.id === target;
    panel.classList.toggle('is-active', isTarget);
    panel.hidden = !isTarget;
  });
}

buffetTabs.forEach((tab) => {
  tab.addEventListener('click', () => activateBuffetTab(tab));
});
