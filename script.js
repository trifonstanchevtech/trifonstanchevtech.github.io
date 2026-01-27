/* =========================
   Portfolio JavaScript
   Author: Trifon Stanchev
   ========================= */

// ===== Safe Smooth Scrolling (anchors only) =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== Theme Toggle (Light/Dark) =====
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(mode) {
  const isDark = mode === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeIcon) themeIcon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", mode);
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    setTheme(saved);
    return;
  }
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(prefersDark ? "dark" : "light");
})();

themeToggleBtn?.addEventListener("click", () => {
  const isDarkNow = document.body.classList.contains("dark");
  setTheme(isDarkNow ? "light" : "dark");
});

// ===== Projects Search + Filter =====
const searchInput = document.getElementById("projectSearch");
const chipsContainer = document.getElementById("filterChips");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const noResults = document.getElementById("noResults");

let activeFilter = "all";

function normalize(str) {
  return (str || "").toLowerCase().trim();
}

function matchesFilter(card, filter) {
  if (filter === "all") return true;
  const tags = normalize(card.getAttribute("data-tags"));
  return tags.split(/\s+/).includes(filter);
}

function matchesSearch(card, query) {
  if (!query) return true;
  const text = normalize(card.innerText);
  return text.includes(query);
}

function applyProjectsView({ scrollToFirstMatch = false } = {}) {
  const q = normalize(searchInput?.value);
  const visibleCards = [];

  projectCards.forEach((card) => {
    const ok = matchesFilter(card, activeFilter) && matchesSearch(card, q);
    card.style.display = ok ? "block" : "none";
    if (ok) visibleCards.push(card);
  });

  if (noResults) {
    noResults.style.display = visibleCards.length === 0 ? "block" : "none";
  }

  if (scrollToFirstMatch && visibleCards.length > 0) {
    visibleCards[0].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

searchInput?.addEventListener("input", () => applyProjectsView());

chipsContainer?.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;

  // Update active chip UI
  chipsContainer.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");

  // Set filter
  activeFilter = btn.dataset.filter || "all";
  applyProjectsView({ scrollToFirstMatch: activeFilter !== "all" });
});

// Initial render (in case there is pre-filled search/filter)
applyProjectsView();

console.log("🚀 Portfolio script loaded successfully");
