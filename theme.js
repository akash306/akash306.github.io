// Set the theme before styles load to avoid a flash of the wrong color scheme.
(() => {
  let savedTheme;
  try {
    savedTheme = localStorage.getItem('portfolio-theme');
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
  const theme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
})();