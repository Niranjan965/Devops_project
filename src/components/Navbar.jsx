import { useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Bell,
  Menu,
  LayoutDashboard,
  Kanban
} from 'lucide-react';

export default function Navbar({
  onOpenSidebar,
  currentView,
  onNavigate,
  onOpenNewTaskModal,
  searchQuery,
  onSearchChange,
  pendingCount = 0,
  overdueCount = 0
}) {
  const searchInputRef = useRef(null);

  // Keyboard shortcut Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Top Search Input (matching Ref 1 & 2) */}
        <div className="navbar-search-wrapper">
          <Search size={16} className="navbar-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="navbar-search-input"
            placeholder="Search tasks, categories, or tags... (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <kbd className="kbd-shortcut">Ctrl K</kbd>
        </div>
      </div>

      <div className="navbar-right">
        {/* View Switcher Tabs (Dashboard / Board) */}
        <div className="navbar-view-switcher">
          <button
            type="button"
            className={`navbar-tab-btn ${currentView === 'dashboard' ? 'tab-active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            className={`navbar-tab-btn ${currentView === 'board' ? 'tab-active' : ''}`}
            onClick={() => onNavigate('board')}
          >
            <Kanban size={15} />
            <span>Board</span>
          </button>
        </div>

        {/* Notifications Button */}
        <div className="navbar-notification-box" title={`${overdueCount} overdue, ${pendingCount} pending`}>
          <button type="button" className="notification-btn" aria-label="Notifications">
            <Bell size={18} />
            {(overdueCount > 0 || pendingCount > 0) && (
              <span className="notification-badge">
                {overdueCount > 0 ? `${overdueCount}!` : pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* Role Pill */}
        <div className="navbar-role-pill">
          <span className="role-avatar-tiny">H</span>
          <span className="role-text">Role: <strong>Manager</strong></span>
        </div>

        {/* New Task Action Button */}
        <button
          type="button"
          className="btn-create-task"
          onClick={() => onOpenNewTaskModal()}
        >
          <Plus size={17} strokeWidth={2.5} />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
}
