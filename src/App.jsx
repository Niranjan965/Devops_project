import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import {
  getStoredTasks,
  saveTasks,
  resetToSampleTasks,
  generateTaskId
} from './utils/storage';
import { Check, Info, AlertCircle, X } from 'lucide-react';
import './App.css';

export default function App() {
  // Tasks state initialized from localStorage
  const [tasks, setTasks] = useState(() => getStoredTasks());

  // Navigation view: 'dashboard' | 'board'
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalInitialStatus, setModalInitialStatus] = useState('To Do');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  // Global Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('dueDate-asc');

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Persist tasks whenever tasks state changes
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Task Stats computation
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    toDo: tasks.filter((t) => t.status === 'To Do').length
  };

  const today = new Date().toISOString().split('T')[0];
  const overdueCount = tasks.filter(
    (t) => t.dueDate && t.dueDate < today && t.status !== 'Completed'
  ).length;

  // Handlers
  const handleOpenNewTaskModal = (initialStatus = 'To Do') => {
    setEditingTask(null);
    setModalInitialStatus(initialStatus);
    setTaskModalOpen(true);
  };

  const handleOpenEditTaskModal = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleOpenDeleteConfirm = (task) => {
    setDeletingTask(task);
    setDeleteModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      // Editing existing task
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
      showToast(`Task "${taskData.title}" updated successfully!`, 'success');
    } else {
      // Creating new task
      const newTask = {
        ...taskData,
        id: generateTaskId(),
        createdAt: new Date().toISOString()
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast(`Task "${newTask.title}" created successfully!`, 'success');
    }
  };

  const handleConfirmDelete = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task deleted successfully.', 'info');
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      })
    );
    showToast(`Task moved to ${newStatus}`, 'success');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all tasks to sample default data?')) {
      const sample = resetToSampleTasks();
      setTasks(sample);
      showToast('TaskFlow restored to sample dataset!', 'info');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedPriority('All Priorities');
    setSelectedStatus('All Statuses');
    setSortBy('dueDate-asc');
  };

  const handleNavigate = (view, options = {}) => {
    setCurrentView(view);
    if (options.status) {
      setSelectedStatus(options.status);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="taskflow-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`} role="alert">
          <div className="toast-content">
            {toast.type === 'success' && <Check size={16} className="toast-icon" />}
            {toast.type === 'info' && <Info size={16} className="toast-icon" />}
            {toast.type === 'error' && <AlertCircle size={16} className="toast-icon" />}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToast(null)}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Dark Navy Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        taskStats={stats}
        onResetData={handleResetData}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Navigation Bar */}
        <Navbar
          onOpenSidebar={() => setSidebarOpen(true)}
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenNewTaskModal={() => handleOpenNewTaskModal('To Do')}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (currentView !== 'board' && q.trim()) {
              setCurrentView('board');
            }
          }}
          pendingCount={stats.toDo}
          overdueCount={overdueCount}
        />

        {/* View Routing */}
        <main className="content-container">
          {currentView === 'dashboard' ? (
            <Dashboard
              tasks={tasks}
              onNavigate={handleNavigate}
              onOpenNewTaskModal={handleOpenNewTaskModal}
              onEditTask={handleOpenEditTaskModal}
              onDeleteTask={handleOpenDeleteConfirm}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <Board
              tasks={tasks}
              onOpenNewTaskModal={handleOpenNewTaskModal}
              onEditTask={handleOpenEditTaskModal}
              onDeleteTask={handleOpenDeleteConfirm}
              onStatusChange={handleStatusChange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedStatus={selectedStatus}
              onStatusChangeFilter={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
            />
          )}
        </main>
      </div>

      {/* Task Create / Edit Modal */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        initialStatus={modalInitialStatus}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        task={deletingTask}
      />
    </div>
  );
}
