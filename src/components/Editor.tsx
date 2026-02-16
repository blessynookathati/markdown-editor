import { useStore } from "../store"
import ReactMarkdown from "react-markdown"
import { useEffect, useRef, useState } from "react"

export default function Editor() {
  const { files, activeFileId, updateFileContent } = useStore()
  const currentFile = files[activeFileId]

  const [localContent, setLocalContent] = useState(
    currentFile?.content || ""
  )

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Update local state when file changes
  useEffect(() => {
    setLocalContent(currentFile?.content || "")
  }, [activeFileId])

  // 🔥 Debounce save (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFileContent(localContent)
    }, 500)

    return () => clearTimeout(timer)
  }, [localContent])

  // 🔥 Bold Function
  const handleBold = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = localContent.substring(start, end)

    const newText = selectedText
      ? `**${selectedText}**`
      : "**bold text**"

    const updated =
      localContent.substring(0, start) +
      newText +
      localContent.substring(end)

    setLocalContent(updated)
  }

  // 🔥 Italic Function
  const handleItalic = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = localContent.substring(start, end)

    const newText = selectedText
      ? `*${selectedText}*`
      : "*italic text*"

    const updated =
      localContent.substring(0, start) +
      newText +
      localContent.substring(end)

    setLocalContent(updated)
  }
  // Word count
const wordCount = localContent.trim()
  ? localContent.trim().split(/\s+/).length
  : 0


  return (
    <div className="flex flex-1 flex-col">
      {/* 🔥 Toolbar */}
      <div className="p-2 border-b flex gap-2 items-center">
  <button
    data-testid="toolbar-bold-button"
    onClick={handleBold}
    className="px-3 py-1 bg-gray-300 rounded"
  >
    Bold
  </button>

  <button
    data-testid="toolbar-italic-button"
    onClick={handleItalic}
    className="px-3 py-1 bg-gray-300 rounded"
  >
    Italic
  </button>

  <div
    data-testid="word-count-display"
    className="ml-auto text-sm text-gray-600"
  >
    Words: {wordCount}
  </div>
</div>


      {/* Editor + Preview */}
      <div className="flex flex-1">
        <textarea
          ref={textareaRef}
          data-testid="markdown-editor"
          className="w-1/2 p-4 border-r outline-none"
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
        />

        <div
          data-testid="markdown-preview"
          className="w-1/2 p-4 prose"
        >
          <ReactMarkdown>{localContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
