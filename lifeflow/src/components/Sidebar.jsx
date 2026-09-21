function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">✦</div>

        <div>
          <h2>LifeFlow</h2>
          <span>Personal space</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <span>🏠</span>
          <span>Dashboard</span>
        </a>

        <a href="#" className="nav-item">
          <span>🎯</span>
          <span>Goals</span>
        </a>

        <a href="#" className="nav-item">
          <span>⏱️</span>
          <span>Focus</span>
        </a>

        <a href="#" className="nav-item">
          <span>💰</span>
          <span>Expenses</span>
        </a>

        <a href="#" className="nav-item">
          <span>📝</span>
          <span>Notes</span>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a href="#" className="nav-item">
          <span>⚙️</span>
          <span>Settings</span>
        </a>

        <div className="profile">
          <div className="profile-avatar">A</div>

          <div>
            <strong>Asmaa</strong>
            <span>Keep flowing ✨</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;