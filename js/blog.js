(() => {
  const articles = Array.isArray(window.JIB_BLOG_ARTICLES)
    ? [...window.JIB_BLOG_ARTICLES].sort((a, b) => b.date.localeCompare(a.date))
    : [];

  const state = {
    category: "ทั้งหมด",
    query: "",
    visible: 9
  };

  const featured = document.getElementById("blog-featured");
  const grid = document.getElementById("blog-grid");
  const categoryBox = document.getElementById("blog-categories");
  const count = document.getElementById("blog-result-count");
  const empty = document.getElementById("blog-empty");
  const loadMore = document.getElementById("blog-load-more");
  const queryInput = document.getElementById("blog-query");
  const headerQuery = document.getElementById("blog-header-query");

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const formatDate = (date) => new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));

  const filteredArticles = () => {
    const keyword = state.query.trim().toLocaleLowerCase("th");
    return articles.filter((article) => {
      const matchesCategory = state.category === "ทั้งหมด" || article.category === state.category;
      const matchesQuery = !keyword || `${article.title} ${article.category}`.toLocaleLowerCase("th").includes(keyword);
      return matchesCategory && matchesQuery;
    });
  };

  const featureCard = (article, index) => {
    const titleTag = index === 0 ? "h2" : "h3";
    return `
      <a class="blog-feature-card" href="${escapeHtml(article.url)}" target="_blank" rel="noopener">
        <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" loading="${index === 0 ? "eager" : "lazy"}">
        <div class="blog-feature-content">
          <span class="blog-feature-badge">${escapeHtml(article.category)}</span>
          <${titleTag}>${escapeHtml(article.title)}</${titleTag}>
          <div class="blog-feature-meta"><span>${formatDate(article.date)}</span><span>JIB Online</span></div>
        </div>
      </a>`;
  };

  const articleCard = (article) => `
    <a class="blog-card" href="${escapeHtml(article.url)}" target="_blank" rel="noopener">
      <div class="blog-card-image"><img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" loading="lazy"></div>
      <div class="blog-card-body">
        <span class="blog-card-category">${escapeHtml(article.category)}</span>
        <h3>${escapeHtml(article.title)}</h3>
        <div class="blog-card-footer"><span>${formatDate(article.date)} · JIB Online</span><span class="blog-card-arrow" aria-hidden="true">›</span></div>
      </div>
    </a>`;

  const renderCategories = () => {
    const categories = ["ทั้งหมด", ...new Set(articles.map((article) => article.category))];
    categoryBox.innerHTML = categories.map((category) => `
      <button class="blog-category-button${category === state.category ? " is-active" : ""}" type="button" data-category="${escapeHtml(category)}" aria-pressed="${category === state.category}">${escapeHtml(category)}</button>
    `).join("");
  };

  const render = () => {
    const matches = filteredArticles();
    const topStories = matches.slice(0, 3);
    const remaining = matches.slice(3);
    const visibleStories = remaining.slice(0, state.visible);

    featured.innerHTML = topStories.map(featureCard).join("");
    featured.hidden = topStories.length === 0;
    grid.innerHTML = visibleStories.map(articleCard).join("");
    count.textContent = `${matches.length} บทความ`;
    empty.hidden = matches.length !== 0;
    loadMore.hidden = visibleStories.length >= remaining.length || remaining.length === 0;
  };

  const setQuery = (value) => {
    state.query = value.trim();
    state.category = "ทั้งหมด";
    state.visible = 9;
    queryInput.value = value;
    headerQuery.value = value;
    renderCategories();
    render();
  };

  categoryBox.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    state.visible = 9;
    renderCategories();
    render();
  });

  document.getElementById("blog-search").addEventListener("submit", (event) => {
    event.preventDefault();
    setQuery(queryInput.value);
  });

  document.getElementById("blog-header-search").addEventListener("submit", (event) => {
    event.preventDefault();
    setQuery(headerQuery.value);
    document.querySelector(".blog-intro").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  loadMore.addEventListener("click", () => {
    state.visible += 6;
    render();
  });

  const categoryToggle = document.getElementById("sets-category-toggle");
  const categoryMenu = document.getElementById("sets-category-menu");
  categoryToggle?.addEventListener("click", () => {
    const expanded = categoryToggle.getAttribute("aria-expanded") === "true";
    categoryToggle.setAttribute("aria-expanded", String(!expanded));
    categoryMenu.hidden = expanded;
  });
  document.addEventListener("click", (event) => {
    if (!categoryToggle?.contains(event.target) && !categoryMenu?.contains(event.target)) {
      categoryToggle?.setAttribute("aria-expanded", "false");
      if (categoryMenu) categoryMenu.hidden = true;
    }
  });

  renderCategories();
  render();
})();
