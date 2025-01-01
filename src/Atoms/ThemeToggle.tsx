const ThemeToggle = () => {

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-blue-700"
    >
      Toggle Dark Mode
    </button>
  )
}

export default ThemeToggle;