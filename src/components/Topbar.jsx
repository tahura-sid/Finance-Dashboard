function Topbar({ role, setRole, onToggleSidebar }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button type="button" className="hamburger-button" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <h1 className="topbar-title">Finance App</h1>
        <div className="role-switcher">
          <button
            type="button"
            className={`role-button ${role === "viewer" ? "active" : ""}`}
            onClick={() => setRole("viewer")}
          >
            Viewer
          </button>
          <button
            type="button"
            className={`role-button ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Topbar;