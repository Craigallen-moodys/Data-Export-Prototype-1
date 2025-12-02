import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-heading">DASHBOARDS</div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link">Account heat map</a>
          <a href="#" className="sidebar-link">Account stats</a>
          <a href="#" className="sidebar-link">Open items</a>
          <a href="#" className="sidebar-link">Operational dashboard - review</a>
          <a href="#" className="sidebar-link">Operational dashboard - users</a>
          <a href="#" className="sidebar-link">Pep heatmap</a>
        </nav>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-heading">TOOLS</div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link active">Data export</a>
          <a href="#" className="sidebar-link">Data export history</a>
        </nav>
      </div>
    </aside>
  );
}

