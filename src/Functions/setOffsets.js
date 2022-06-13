const setOffsetY = (element) => {
  let offsetY = window.pageYOffset;
  element.style.top = `${offsetY}px`;
};

export { setOffsetY };
