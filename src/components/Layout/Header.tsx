import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">MOODY'S</div>
        <nav className="header-nav">
          <a href="#" className="nav-link active">Reports</a>
          <a href="#" className="nav-link">User management</a>
        </nav>
        <div className="header-user">
          <div className="user-icon">👤</div>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>
    </header>
  );
}

