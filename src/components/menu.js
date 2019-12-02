const generateMenuMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      const isActive = item.value ? `trip-tabs__btn--active` : ``;
      return (
        `<a class="trip-tabs__btn  ${isActive}" href="#">${item.name}</a>`
      );
    }).join(`\n`);
};
export const createSiteMenuTemplate = (menu) => {
  const menuMArkup = generateMenuMarkup(menu);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuMArkup}
     </nav>`
  );
};
