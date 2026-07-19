const themeStorageKey = "theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  return savedTheme || (systemTheme.matches ? "dark" : "light");
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  const isDark = theme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;
  toggle.textContent = isDark ? "☀" : "☾";
  toggle.setAttribute("aria-label", label);
  toggle.title = label;
}

applyTheme(getPreferredTheme());

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getPreferredTheme());

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(themeStorageKey, theme);
    applyTheme(theme);
  });
});
