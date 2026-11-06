import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendDirection = 'up',
  icon: Icon,
  variant = 'blue',
  progress
}) {
  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className={`stat-icon-wrapper icon-wrapper-${variant}`}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="stat-card-body">
        <div className="stat-value">{value}</div>

        {(trend || subtitle) && (
          <div className="stat-meta">
            {trend && (
              <span className={`trend-badge trend-${trendDirection}`}>
                {trendDirection === 'up' ? (
                  <TrendingUp size={13} />
                ) : (
                  <TrendingDown size={13} />
                )}
                <span>{trend}</span>
              </span>
            )}
            {subtitle && <span className="stat-subtitle">{subtitle}</span>}
          </div>
        )}

        {typeof progress === 'number' && (
          <div className="stat-progress-bar-container">
            <div className="stat-progress-bar-track">
              <div
                className={`stat-progress-bar-fill fill-${variant}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <div className="stat-progress-label">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
