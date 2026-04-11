export const smoothScrollTo = (target, options = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const lenis = window.__lenis;

  if (lenis) {
    lenis.scrollTo(target, options);
    return;
  }

  const element =
    typeof target === 'string' ? document.querySelector(target) : target;

  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
