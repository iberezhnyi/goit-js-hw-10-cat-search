export const isHiddenToggle = (...elemRefs) =>
  elemRefs.forEach(elem => elem.classList.toggle('is-hidden'));
