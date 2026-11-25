(() => {
  const categoryToggle = document.getElementById("sets-category-toggle");
  const categoryMenu = document.getElementById("sets-category-menu");

  categoryToggle?.addEventListener("click", () => {
    const expanded = categoryToggle.getAttribute("aria-expanded") === "true";
    categoryToggle.setAttribute("aria-expanded", String(!expanded));
    if (categoryMenu) categoryMenu.hidden = expanded;
  });

  document.addEventListener("click", (event) => {
    if (!categoryToggle?.contains(event.target) && !categoryMenu?.contains(event.target)) {
      categoryToggle?.setAttribute("aria-expanded", "false");
      if (categoryMenu) categoryMenu.hidden = true;
    }
  });
})();
