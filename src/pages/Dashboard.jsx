import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Layers,
  Flame,
  ArrowRight,
  Plus,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import StatCard from '../components/StatCard';
import PriorityBadge from '../components/PriorityBadge';

export default function Dashboard({
  tasks = [],
  onNavigate,
  onOpenNewTaskModal,
  onEditTask,
  onDeleteTask,
  onStatusChange
}) {
  // Compute metrics
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const pending = tasks.filter((t) => t.status === 'To Do').length;

  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  // Overdue calculation
  const today = new Date().toISOString().split('T')[0];
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && t.dueDate < today && t.status !== 'Completed'
  );

  // Priority Breakdown
  const highPriority = tasks.filter((t) => t.priority === 'High').length;
  const medPriority = tasks.filter((t) => t.priority === 'Medium').length;
  const lowPriority = tasks.filter((t) => t.priority === 'Low').length;

  // Category Breakdown
  const categoryCounts = tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  // Recent tasks (sorted by createdAt or id descending)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="dashboard-page">
      {/* Welcome / Hero Banner */}
      <div className="dashboard-hero">
        <div className="hero-text">
          <div className="hero-title-row">
            <h1 className="hero-heading">Good morning, Herry</h1>
            <span className="hero-greeting-badge">
              <Sparkles size={14} /> Team Lead
            </span>
          </div>
          <p className="hero-subheading">
            Team command center • Active sprint metrics, blockers, and workload balance across your workspace.
          </p>
        </div>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onNavigate('board')}
          >
            <span>View Kanban Board</span>
            <ArrowRight size={15} />
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenNewTaskModal()}
          >
            <Plus size={16} />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Primary Metric Statistics Cards (Matching Ref 1) */}
      <div className="stats-grid">
        <StatCard
          title="Total Tasks"
          value={total}
          subtitle="Across all project sprints"
          trend="+14.2%"
          trendDirection="up"
          icon={Layers}
          variant="blue"
        />

        <StatCard
          title="Overdue / Pending"
          value={overdueTasks.length > 0 ? overdueTasks.length : pending}
          subtitle={overdueTasks.length > 0 ? `${overdueTasks.length} overdue tasks require action` : 'To Do backlog tasks'}
          trend={overdueTasks.length > 0 ? 'Needs Attention' : 'On Track'}
          trendDirection={overdueTasks.length > 0 ? 'down' : 'up'}
          icon={AlertCircle}
          variant={overdueTasks.length > 0 ? 'rose' : 'purple'}
        />

        <StatCard
          title="In Progress"
          value={inProgress}
          subtitle="Currently active tasks"
          trend={`${Math.round((inProgress / (total || 1)) * 100)}% workload`}
          trendDirection="up"
          icon={Clock}
          variant="amber"
        />

        <StatCard
          title="Completed"
          value={completed}
          subtitle="Delivered & verified"
          trend="+8.5% this week"
          trendDirection="up"
          icon={CheckCircle2}
          variant="green"
        />

        <StatCard
          title="Completion Rate"
          value={`${completionRate.toFixed(1)}%`}
          subtitle={`${completed} of ${total} closed`}
          progress={completionRate}
          icon={TrendingUp}
          variant="indigo"
        />
      </div>

      {/* Analytics & Priority Section */}
      <div className="analytics-section-grid">
        {/* Priority Breakdown Card */}
        <div className="card dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Task Priority Distribution</h3>
              <p className="card-subtitle">Breakdown of active workloads by urgency</p>
            </div>
            <div className="card-icon-pill">
              <Flame size={16} className="text-amber-500" />
            </div>
          </div>

          <div className="priority-bars-container">
            {/* High Priority Bar */}
            <div className="priority-bar-item">
              <div className="priority-bar-label">
                <span className="prio-title">
                  <span className="dot dot-high" /> High Priority
                </span>
                <span className="prio-count">
                  <strong>{highPriority}</strong> tasks ({total ? Math.round((highPriority / total) * 100) : 0}%)
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-high"
                  style={{ width: `${total ? (highPriority / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Medium Priority Bar */}
            <div className="priority-bar-item">
              <div className="priority-bar-label">
                <span className="prio-title">
                  <span className="dot dot-medium" /> Medium Priority
                </span>
                <span className="prio-count">
                  <strong>{medPriority}</strong> tasks ({total ? Math.round((medPriority / total) * 100) : 0}%)
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-medium"
                  style={{ width: `${total ? (medPriority / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Low Priority Bar */}
            <div className="priority-bar-item">
              <div className="priority-bar-label">
                <span className="prio-title">
                  <span className="dot dot-low" /> Low Priority
                </span>
                <span className="prio-count">
                  <strong>{lowPriority}</strong> tasks ({total ? Math.round((lowPriority / total) * 100) : 0}%)
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-low"
                  style={{ width: `${total ? (lowPriority / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Category Chips Distribution */}
          <div className="category-chips-overview">
            <h4 className="chips-title">Tasks by Department</h4>
            <div className="chips-flex">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className="dept-chip">
                  <span className="dept-name">{cat}</span>
                  <span className="dept-badge">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Activity Stream (Inspired by Ref 1) */}
        <div className="card dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Recent Activity</h3>
              <p className="card-subtitle">Real-time team collaboration log</p>
            </div>
            <span className="live-status-pill">
              <span className="live-pulse" /> LIVE
            </span>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-avatar" style={{ backgroundColor: '#8b5cf6' }}>SC</div>
              <div className="activity-details">
                <p className="activity-text">
                  <strong>Sophia Chen</strong> created task <em>"Design new design system"</em>
                </p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-avatar" style={{ backgroundColor: '#10b981' }}>ER</div>
              <div className="activity-details">
                <p className="activity-text">
                  <strong>Elena Rostova</strong> completed <em>"Configure multi-stage Docker build"</em>
                </p>
                <span className="activity-time">4 hours ago</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-avatar" style={{ backgroundColor: '#3b82f6' }}>MM</div>
              <div className="activity-details">
                <p className="activity-text">
                  <strong>Marcus Miller</strong> updated status to <em>In Progress</em>
                </p>
                <span className="activity-time">Yesterday</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-avatar" style={{ backgroundColor: '#f59e0b' }}>DR</div>
              <div className="activity-details">
                <p className="activity-text">
                  <strong>Devon Reed</strong> added Jenkins pipeline declarative test stages
                </p>
                <span className="activity-time">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Created Tasks Table Card */}
      <div className="card dashboard-card recent-tasks-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Recent Tasks Overview</h3>
            <p className="card-subtitle">Quick view of the most recent assignments</p>
          </div>
          <button
            type="button"
            className="link-btn"
            onClick={() => onNavigate('board')}
          >
            <span>See full board</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {recentTasks.length === 0 ? (
          <div className="empty-state-box">
            <Layers size={40} className="empty-icon" />
            <h4>No tasks created yet</h4>
            <p>Get started by creating your first task or resetting sample data.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenNewTaskModal()}
            >
              <Plus size={16} />
              <span>Create First Task</span>
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="recent-tasks-table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Assignee</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="task-name-cell">
                      <strong>{task.title}</strong>
                      {task.description && (
                        <span className="task-desc-subtext">
                          {task.description.length > 55
                            ? `${task.description.substring(0, 55)}...`
                            : task.description}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="table-cat-badge">{task.category}</span>
                    </td>
                    <td>
                      <PriorityBadge priority={task.priority} size="sm" />
                    </td>
                    <td>
                      <span className="table-date">{formatDate(task.dueDate)}</span>
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
                          title="Edit task"
                          aria-label="Edit task"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="table-btn-delete"
                          onClick={() => onDeleteTask(task)}
                          title="Delete task"
                          aria-label="Delete task"
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
        )}
      </div>
    </div>
  );
}
