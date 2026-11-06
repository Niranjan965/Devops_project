import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../utils/sampleData';

const ASSIGNEE_OPTIONS = [
  { name: 'Alex Rivera', initials: 'AR', color: '#06b6d4' },
  { name: 'Sophia Chen', initials: 'SC', color: '#8b5cf6' },
  { name: 'Marcus Miller', initials: 'MM', color: '#3b82f6' },
  { name: 'Elena Rostova', initials: 'ER', color: '#10b981' },
  { name: 'Devon Reed', initials: 'DR', color: '#f59e0b' },
  { name: 'Sarah Jenkins', initials: 'SJ', color: '#ec4899' }
];

export default function TaskModal({ isOpen, onClose, onSave, task = null, initialStatus = 'To Do' }) {
  const isEditing = !!task;

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Engineering',
    priority: 'Medium',
    status: initialStatus,
    dueDate: '',
    assignee: ASSIGNEE_OPTIONS[0]
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'Engineering',
        priority: task.priority || 'Medium',
        status: task.status || 'To Do',
        dueDate: task.dueDate || '',
        assignee: task.assignee || ASSIGNEE_OPTIONS[0]
      });
    } else {
      // Set default due date to 3 days from now
      const d = new Date();
      d.setDate(d.getDate() + 3);
      const defaultDate = d.toISOString().split('T')[0];

      setFormData({
        title: '',
        description: '',
        category: 'Engineering',
        priority: 'Medium',
        status: initialStatus || 'To Do',
        dueDate: defaultDate,
        assignee: ASSIGNEE_OPTIONS[Math.floor(Math.random() * ASSIGNEE_OPTIONS.length)]
      });
    }
    setErrors({});
    setTouched({});
  }, [task, initialStatus, isOpen]);

  // Handle key press (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'title' && !formData.title.trim()) {
      setErrors((prev) => ({ ...prev, title: 'Task title is required.' }));
    }
    if (field === 'dueDate' && !formData.dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: 'Due date is required.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...(task || {}),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      assignee: formData.assignee,
      updatedAt: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h3>
            <p className="modal-subtitle">
              {isEditing
                ? 'Update task details and assignments below.'
                : 'Fill in the information to organize a new task.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title Field */}
          <div className="form-group">
            <label className="form-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.title && touched.title ? 'input-error' : ''}`}
              placeholder="e.g. Implement Responsive Kanban Board"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              autoFocus
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Provide context, acceptance criteria, or relevant links..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          {/* Grid row: Category & Priority */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                {PRIORITIES.filter((p) => p !== 'All Priorities').map((prio) => (
                  <option key={prio} value={prio}>
                    {prio}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid row: Status & Due Date */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Due Date <span className="required-star">*</span>
              </label>
              <input
                type="date"
                className={`form-input ${errors.dueDate && touched.dueDate ? 'input-error' : ''}`}
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                onBlur={() => handleBlur('dueDate')}
              />
              {errors.dueDate && touched.dueDate && (
                <span className="error-message">{errors.dueDate}</span>
              )}
            </div>
          </div>

          {/* Assignee Selection */}
          <div className="form-group">
            <label className="form-label">Assigned Member</label>
            <div className="assignee-picker-list">
              {ASSIGNEE_OPTIONS.map((person) => {
                const isSelected = formData.assignee?.name === person.name;
                return (
                  <button
                    key={person.name}
                    type="button"
                    className={`assignee-chip ${isSelected ? 'chip-active' : ''}`}
                    onClick={() => handleChange('assignee', person)}
                  >
                    <span
                      className="assignee-avatar-sm"
                      style={{ backgroundColor: person.color }}
                    >
                      {person.initials}
                    </span>
                    <span className="assignee-chip-name">{person.name}</span>
                    {isSelected && <CheckCircle size={14} className="chip-check" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Footer / Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
