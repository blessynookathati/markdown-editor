import { useStore } from "../store"
import { useNavigate } from "react-router-dom"

export default function FileBrowser() {
  const { files, createFile, setActiveFile } = useStore()
  const navigate = useNavigate()

  return (
    <div data-testid="file-browser" className="p-4">
      <p className="font-bold mb-4">Files</p>

      {Object.values(files).map((file) => (
        <div
          key={file.id}
          data-testid={`file-item-${file.id}`}
          className="cursor-pointer mb-2"
          onClick={() => {
            setActiveFile(file.id)
            navigate(`/editor/${file.id}`)
          }}
        >
          {file.name}
        </div>
      ))}

      <button
        data-testid="create-file-button"
        onClick={createFile}
        className="mt-4 px-3 py-1 bg-green-600 text-white rounded"
      >
        + New File
      </button>
    </div>
  )
}
