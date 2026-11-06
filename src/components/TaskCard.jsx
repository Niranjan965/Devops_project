import {
  Calendar,
  Edit2,
  Trash2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import PriorityBadge from './PriorityBadge';

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  isDragging = false,
  onDragStart,
  onDragEnd
}) {
  const isCompleted = task.status === 'Completed';

  // Check if task is overdue
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = task.dueDate && task.dueDate < today && !isCompleted;

  // Format date display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Category color mapper
  const getCategoryClass = (cat) => {
    const map = {
      Engineering: 'cat-engineering',
      Design: 'cat-design',
      DevOps: 'cat-devops',
      Marketing: 'cat-marketing',
      Product: 'cat-product'
    };
    return map[cat] || 'cat-default';
  };

  // Status transition helpers
  const getNextStatus = (current) => {
    if (current === 'To Do') return 'In Progress';
    if (current === 'In Progress') return 'Completed';
    return null;
  };

  const getPrevStatus = (current) => {
    if (current === 'Completed') return 'In Progress';
    if (current === 'In Progress') return 'To Do';
    return null;
  };

  const nextStatus = getNextStatus(task.status);
  const prevStatus = getPrevStatus(task.status);

  return (
    <div
      className={`task-card ${isCompleted ? 'task-card-completed' : ''} ${
        isDragging ? 'is-dragging' : ''
      }`}
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, task.id)}
      onDragEnd={(e) => onDragEnd && onDragEnd(e)}
      data-testid={`task-card-${task.id}`}
    >
      {/* Top Bar: Category & Priority */}
      <div className="task-card-top">
        <div className="task-card-tags">
          <span className={`category-tag ${getCategoryClass(task.category)}`}>
            {task.category || 'General'}
          </span>
          <PriorityBadge priority={task.priority} size="sm" />
        </div>

        <div className="task-card-actions">
          <button
            type="button"
            className="action-btn-icon edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 size={14} />
          </button>
          <button
            type="button"
            className="action-btn-icon delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Task Title */}
      <h4 className="task-card-title" title={task.title}>
        {task.title}
      </h4>

      {/* Description Snippet */}
      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}

      {/* Task Meta / Footer */}
      <div className="task-card-footer">
        <div className="task-date-group">
          <Calendar size={13} className="date-icon" />
          <span className={`task-due-date ${isOverdue ? 'date-overdue' : ''}`}>
            {formatDate(task.dueDate)}
            {isOverdue && <span className="overdue-tag">Overdue</span>}
          </span>
        </div>

        <div className="task-footer-right">
          {/* Quick status cycle button */}
          <div className="status-quick-switch">
            {prevStatus && (
              <button
                type="button"
                className="step-btn step-prev"
                onClick={() => onStatusChange(task.id, prevStatus)}
                title={`Move back to ${prevStatus}`}
              >
                <ArrowLeft size={12} />
              </button>
            )}

            <select
              className="task-status-select"
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              title="Change status"
              aria-label="Task Status"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {nextStatus && (
              <button
                type="button"
                className="step-btn step-next"
                onClick={() => onStatusChange(task.id, nextStatus)}
                title={`Move forward to ${nextStatus}`}
              >
                <ArrowRight size={12} />
              </button>
            )}
          </div>

          {/* Assignee Avatar */}
          {task.assignee && (
            <div
              className="task-assignee-avatar"
              style={{ backgroundColor: task.assignee.color || '#3b82f6' }}
              title={task.assignee.name}
            >
              {task.assignee.initials || task.assignee.name?.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
