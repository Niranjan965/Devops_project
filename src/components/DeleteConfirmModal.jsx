import { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, task }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-simple">
          <div className="delete-icon-badge">
            <AlertTriangle size={24} className="text-red-500" />
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

        <div className="delete-modal-body">
          <h3 className="delete-modal-title">Delete Task?</h3>
          <p className="delete-modal-desc">
            Are you sure you want to permanently delete{' '}
            <strong className="delete-task-highlight">"{task.title}"</strong>?
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-actions delete-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onConfirm(task.id);
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Delete Permanently</span>
          </button>
        </div>
      </div>
    </div>
  );
}
