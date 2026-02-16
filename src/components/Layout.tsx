import FileBrowser from "./FileBrowser"
import Editor from "./Editor"
import { useStore } from "../store"
import { useEffect } from "react"

export default function Layout() {
  const { theme, toggleTheme } = useStore()

  // Apply theme to html tag
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="w-1/4 border-r dark:border-gray-700">
        <FileBrowser />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-2 border-b dark:border-gray-700 flex justify-end">
          <button
            data-testid="theme-toggle-button"
            onClick={toggleTheme}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
          >
            Toggle Theme
          </button>
        </div>

        <Editor />
      </div>
    </div>
  )
}
