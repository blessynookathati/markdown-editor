import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div
      data-testid="home-page"
      className="min-h-screen flex items-center justify-center"
    >
      <button
        onClick={() => navigate("/editor/welcome.md")}
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Open Editor
      </button>
    </div>
  )
}
