function disableScroll() {
  const appContentContainer = document.getElementById("app-content-container");
  appContentContainer.dataset.disableScroll = "true";
}

function enableScroll() {
  const appContentContainer = document.getElementById("app-content-container");
  appContentContainer.dataset.disableScroll = "false";
}

export { disableScroll, enableScroll };
