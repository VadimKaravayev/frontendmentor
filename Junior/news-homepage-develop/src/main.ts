import './less/main.less';

const burger = document.querySelector('.mobile-nav-toggle');
const primaryNavigation = document.querySelector(
  '.primary-navigation'
) as HTMLElement;

burger?.addEventListener('click', () => {
  const isVisibile = String(!(primaryNavigation.dataset.visible === 'true'));
  primaryNavigation.dataset.visible = isVisibile;
  burger.setAttribute('aria-expanded', isVisibile);
});
