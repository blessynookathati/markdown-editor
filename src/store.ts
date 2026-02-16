import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FileType {
  id: string
  name: string
  content: string
}

interface StoreState {
  files: Record<string, FileType>
  activeFileId: string
  theme: "light" | "dark"

  createFile: () => void
  updateFileContent: (content: string) => void
  setActiveFile: (id: string) => void
  toggleTheme: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      files: {
        "welcome.md": {
          id: "welcome.md",
          name: "welcome.md",
          content: "# Welcome 🚀",
        },
      },
      activeFileId: "welcome.md",
      theme: "light",

      createFile: () => {
        const id = `untitled-${Date.now()}.md`

        set((state) => ({
          files: {
            ...state.files,
            [id]: {
              id,
              name: id,
              content: "",
            },
          },
          activeFileId: id,
        }))
      },

      updateFileContent: (content) => {
        const { activeFileId, files } = get()

        set({
          files: {
            ...files,
            [activeFileId]: {
              ...files[activeFileId],
              content,
            },
          },
        })
      },

      setActiveFile: (id) => set({ activeFileId: id }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "markdown-editor-storage",
    }
  )
)

// 🔥 Required for testing
if (typeof window !== "undefined") {
  // expose store
  // @ts-ignore
  window.zustandStore = useStore

  // expose localStorage getter
  // @ts-ignore
  window.getLocalStorageState = () =>
    JSON.parse(localStorage.getItem("markdown-editor-storage") || "{}")
}
