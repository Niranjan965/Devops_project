import { useState } from 'react';
import {
  Plus,
  CircleDot,
  Clock,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import PriorityBadge from '../components/PriorityBadge';

export default function Board({
  tasks = [],
  onOpenNewTaskModal,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChangeFilter,
  sortBy,
  onSortChange,
  onResetFilters
}) {
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'list'
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  // 1. Filter tasks
  const filteredTasks = tasks.filter((task) => {
    // Search query filter (matches title, description, category, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title?.toLowerCase().includes(q);
      const matchDesc = task.description?.toLowerCase().includes(q);
      const matchCat = task.category?.toLowerCase().includes(q);
      const matchTags = task.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchTags) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Categories') {
      if (task.category !== selectedCategory) return false;
    }

    // Priority filter
    if (selectedPriority && selectedPriority !== 'All Priorities') {
      if (task.priority !== selectedPriority) return false;
    }

    // Status filter
    if (selectedStatus && selectedStatus !== 'All Statuses') {
      if (task.status !== selectedStatus) return false;
    }

    return true;
  });

  // 2. Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate-asc':
        return (a.dueDate || '').localeCompare(b.dueDate || '');
      case 'dueDate-desc':
        return (b.dueDate || '').localeCompare(a.dueDate || '');
      case 'createdAt-desc':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'createdAt-asc':
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case 'priority-desc': {
        const pOrder = { High: 3, Medium: 2, Low: 1 };
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
      }
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Drag and Drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== status) {
      setDragOverColumn(status);
    }
  };

  const handleDragLeave = (e, status) => {
    if (dragOverColumn === status) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      onStatusChange(taskId, targetStatus);
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  // Columns definition (matching Reference 2 & 3)
  const columns = [
    {
      id: 'To Do',
      title: 'To Do',
      dotColor: '#3b82f6',
      icon: CircleDot,
      badgeClass: 'badge-col-todo'
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      dotColor: '#f59e0b',
      icon: Clock,
      badgeClass: 'badge-col-progress'
    },
    {
      id: 'Completed',
      title: 'Completed',
      dotColor: '#10b981',
      icon: CheckCircle2,
      badgeClass: 'badge-col-completed'
    }
  ];

  return (
    <div className="board-page">
      {/* Board Page Header */}
      <div className="board-header">
        <div>
          <h1 className="board-main-title">Task Management Board</h1>
          <p className="board-sub-title">
            Organize, track progress, and transition tasks seamlessly across workflow stages.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onOpenNewTaskModal('To Do')}
        >
          <Plus size={16} />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        selectedPriority={selectedPriority}
        onPriorityChange={onPriorityChange}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChangeFilter}
        sortBy={sortBy}
        onSortChange={onSortChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetFilters={onResetFilters}
        totalTasks={tasks.length}
        filteredCount={sortedTasks.length}
      />

      {/* No results empty state */}
      {sortedTasks.length === 0 && (
        <div className="empty-results-box">
          <FolderOpen size={48} className="empty-results-icon" />
          <h3>No tasks match your criteria</h3>
          <p>Try adjusting your search query or reset the active filters.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onResetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Kanban Board View */}
      {viewMode === 'board' && sortedTasks.length > 0 && (
        <div className="kanban-grid">
          {columns.map((col) => {
            const colTasks = sortedTasks.filter((t) => t.status === col.id);
            const isTarget = dragOverColumn === col.id;

            return (
              <div
                key={col.id}
                className={`kanban-column ${isTarget ? 'column-drag-over' : ''}`}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={(e) => handleDragLeave(e, col.id)}
                onDrop={(e) => handleDrop(e, col.id)}
                data-testid={`column-${col.id}`}
              >
                {/* Column Header */}
                <div className="column-header">
                  <div className="column-title-group">
                    <span
                      className="column-dot"
                      style={{ backgroundColor: col.dotColor }}
                    />
                    <h3 className="column-title">{col.title}</h3>
                    <span className="column-counter">{colTasks.length}</span>
                  </div>

                  <button
                    type="button"
                    className="col-add-btn"
                    onClick={() => onOpenNewTaskModal(col.id)}
                    title={`Add task to ${col.title}`}
                    aria-label={`Add task to ${col.title}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Cards Container */}
                <div className="column-cards-list">
                  {colTasks.length === 0 ? (
                    <div className="column-empty-placeholder">
                      <p>No tasks in {col.title}</p>
                      <button
                        type="button"
                        className="col-placeholder-add"
                        onClick={() => onOpenNewTaskModal(col.id)}
                      >
                        <Plus size={14} />
                        <span>Add Task</span>
                      </button>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onStatusChange={onStatusChange}
                        isDragging={draggedTaskId === task.id}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    ))
                  )}
                </div>

                {/* Column Bottom Quick Add Button */}
                <button
                  type="button"
                  className="column-footer-add-btn"
                  onClick={() => onOpenNewTaskModal(col.id)}
                >
                  <Plus size={15} />
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && sortedTasks.length > 0 && (
        <div className="card list-view-card">
          <div className="table-responsive">
            <table className="recent-tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Assignee</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="task-name-cell">
                      <strong>{task.title}</strong>
                      {task.description && (
                        <span className="task-desc-subtext">{task.description}</span>
                      )}
                    </td>
                    <td>
                      <span className="table-cat-badge">{task.category}</span>
                    </td>
                    <td>
                      <PriorityBadge priority={task.priority} size="sm" />
                    </td>
                    <td>
                      <span className="table-date">{task.dueDate}</span>
                    </td>
                    <td>
                      <select
                        className="table-status-select"
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        aria-label={`Status for ${task.title}`}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      {task.assignee && (
                        <div className="table-assignee">
                          <span
                            className="assignee-avatar-xs"
                            style={{ backgroundColor: task.assignee.color || '#3b82f6' }}
                          >
                            {task.assignee.initials}
                          </span>
                          <span>{task.assignee.name}</span>
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="table-btn-edit"
                          onClick={() => onEditTask(task)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="table-btn-delete"
                          onClick={() => onDeleteTask(task)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
