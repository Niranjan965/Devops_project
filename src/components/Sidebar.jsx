import {
  LayoutDashboard,
  Kanban,
  CheckCircle2,
  Clock,
  Layers,
  RefreshCw,
  ChevronDown,
  X
} from 'lucide-react';

export default function Sidebar({
  currentView,
  onNavigate,
  taskStats,
  onResetData,
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory
}) {
  const categories = ['Engineering', 'Design', 'DevOps', 'Marketing', 'Product'];

  const categoryColorMap = {
    Engineering: '#3b82f6',
    Design: '#8b5cf6',
    DevOps: '#10b981',
    Marketing: '#ec4899',
    Product: '#f59e0b'
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Sidebar Header / Brand */}
        <div className="sidebar-brand-wrapper">
          <div className="brand-logo">
            <div className="brand-icon-box">
              <Layers size={22} className="brand-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-title">TaskFlow</span>
              <span className="brand-badge">SaaS v1.0</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-close-sidebar-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Workspace Card (Inspired by Ref 1) */}
        <div className="workspace-pill">
          <div className="workspace-avatar">A</div>
          <div className="workspace-info">
            <span className="workspace-name">Acme Studio</span>
            <span className="workspace-role">Team Command</span>
          </div>
          <ChevronDown size={14} className="workspace-caret" />
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-group-label">OVERVIEW</div>

          <button
            type="button"
            className={`nav-item ${currentView === 'dashboard' ? 'nav-item-active' : ''}`}
            onClick={() => {
              onNavigate('dashboard');
              onClose && onClose();
            }}
          >
            <LayoutDashboard size={18} className="nav-icon" />
            <span className="nav-label">Dashboard</span>
          </button>

          <button
            type="button"
            className={`nav-item ${currentView === 'board' ? 'nav-item-active' : ''}`}
            onClick={() => {
              onNavigate('board');
              onClose && onClose();
            }}
          >
            <Kanban size={18} className="nav-icon" />
            <span className="nav-label">Task Board</span>
            {taskStats.total > 0 && (
              <span className="nav-counter">{taskStats.total}</span>
            )}
          </button>

          <button
            type="button"
            className={`nav-item ${currentView === 'in-progress' ? 'nav-item-active' : ''}`}
            onClick={() => {
              onNavigate('board', { status: 'In Progress' });
              onClose && onClose();
            }}
          >
            <Clock size={18} className="nav-icon" />
            <span className="nav-label">In Progress</span>
            {taskStats.inProgress > 0 && (
              <span className="nav-counter counter-amber">{taskStats.inProgress}</span>
            )}
          </button>

          <button
            type="button"
            className={`nav-item ${currentView === 'completed' ? 'nav-item-active' : ''}`}
            onClick={() => {
              onNavigate('board', { status: 'Completed' });
              onClose && onClose();
            }}
          >
            <CheckCircle2 size={18} className="nav-icon" />
            <span className="nav-label">Completed</span>
            {taskStats.completed > 0 && (
              <span className="nav-counter counter-green">{taskStats.completed}</span>
            )}
          </button>

          {/* Categories / Workspaces */}
          <div className="nav-group-label" style={{ marginTop: '24px' }}>
            PROJECT CATEGORIES
          </div>

          <div className="sidebar-categories-list">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-nav-item ${isSelected ? 'cat-item-active' : ''}`}
                  onClick={() => {
                    onSelectCategory(isSelected ? 'All Categories' : cat);
                    onNavigate('board');
                    onClose && onClose();
                  }}
                >
                  <span
                    className="category-dot"
                    style={{ backgroundColor: categoryColorMap[cat] || '#94a3b8' }}
                  />
                  <span className="category-label">{cat}</span>
                  {isSelected && <span className="cat-active-pill">Filter</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {/* Reset Demo Data Button */}
          <button
            type="button"
            className="sidebar-reset-btn"
            onClick={onResetData}
            title="Reset to initial sample tasks"
          >
            <RefreshCw size={15} />
            <span>Reset Demo Data</span>
          </button>

          {/* User Profile Card */}
          <div className="sidebar-user-card">
            <div className="user-avatar-wrapper">
              <div className="user-avatar">HV</div>
              <span className="user-status-dot" />
            </div>
            <div className="user-info">
              <span className="user-name">Herry Vance</span>
              <span className="user-role">Lead Manager</span>
            </div>
            <div className="user-badge-pro">PRO</div>
          </div>
        </div>
      </aside>
    </>
  );
}
