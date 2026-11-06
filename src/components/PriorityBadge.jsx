import { AlertCircle, AlertTriangle, ArrowDown } from 'lucide-react';

export default function PriorityBadge({ priority, showIcon = true, size = 'md' }) {
  const normalized = (priority || 'Low').toLowerCase();

  const config = {
    high: {
      label: 'High',
      className: 'badge-priority-high',
      icon: AlertCircle
    },
    medium: {
      label: 'Medium',
      className: 'badge-priority-medium',
      icon: AlertTriangle
    },
    low: {
      label: 'Low',
      className: 'badge-priority-low',
      icon: ArrowDown
    }
  };

  const item = config[normalized] || config.low;
  const Icon = item.icon;

  return (
    <span className={`priority-badge ${item.className} badge-${size}`}>
      {showIcon && <Icon className="badge-icon" size={size === 'sm' ? 12 : 14} />}
      <span>{item.label}</span>
    </span>
  );
}
