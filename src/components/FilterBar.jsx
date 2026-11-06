import {
  Search,
  ArrowUpDown,
  RotateCcw,
  LayoutGrid,
  List,
  X
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../utils/sampleData';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  totalTasks,
  filteredCount
}) {
  const isFiltered =
    Boolean(searchQuery) ||
    selectedCategory !== 'All Categories' ||
    selectedPriority !== 'All Priorities' ||
    selectedStatus !== 'All Statuses';

  return (
    <div className="filter-bar-container">
      {/* Search Input */}
      <div className="filter-search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, description, or category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="filter-controls-group">
        {/* Category Filter */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All Categories' ? '🏷️ All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter by priority"
          >
            {PRIORITIES.map((prio) => (
              <option key={prio} value={prio}>
                {prio === 'All Priorities' ? '⚡ All Priorities' : `${prio} Priority`}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All Statuses">📌 All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="filter-select-wrapper sort-wrapper">
          <ArrowUpDown size={14} className="sort-icon-prefix" />
          <select
            className="filter-select sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort tasks by"
          >
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="createdAt-desc">Created (Newest First)</option>
            <option value="createdAt-asc">Created (Oldest First)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="title-asc">Title (A - Z)</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
            title="Reset all filters"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Right side: View Mode Toggle & Counter */}
      <div className="filter-bar-right">
        <span className="results-badge">
          Showing <strong>{filteredCount}</strong> of {totalTasks} tasks
        </span>

        <div className="view-mode-toggle" role="group" aria-label="View Mode">
          <button
            type="button"
            className={`toggle-btn ${viewMode === 'board' ? 'toggle-active' : ''}`}
            onClick={() => onViewModeChange('board')}
            title="Kanban Board view"
            aria-label="Kanban Board view"
          >
            <LayoutGrid size={15} />
            <span>Board</span>
          </button>
          <button
            type="button"
            className={`toggle-btn ${viewMode === 'list' ? 'toggle-active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List view"
            aria-label="List view"
          >
            <List size={15} />
            <span>List</span>
          </button>
        </div>
      </div>
    </div>
  );
}
