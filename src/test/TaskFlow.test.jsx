import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PriorityBadge from '../components/PriorityBadge';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';

describe('TaskFlow UI Components', () => {
  describe('PriorityBadge Component', () => {
    it('renders High priority badge with correct text', () => {
      render(<PriorityBadge priority="High" />);
      expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('renders Medium priority badge with correct text', () => {
      render(<PriorityBadge priority="Medium" />);
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });

    it('renders Low priority badge with correct text', () => {
      render(<PriorityBadge priority="Low" />);
      expect(screen.getByText('Low')).toBeInTheDocument();
    });
  });

  describe('StatCard Component', () => {
    it('renders stat title, value, and subtitle', () => {
      render(
        <StatCard
          title="Total Tasks"
          value={12}
          subtitle="All sprint tasks"
          trend="+15%"
        />
      );

      expect(screen.getByText('Total Tasks')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('All sprint tasks')).toBeInTheDocument();
      expect(screen.getByText('+15%')).toBeInTheDocument();
    });
  });

  describe('TaskCard Component', () => {
    const mockTask = {
      id: 'test-1',
      title: 'Setup Vitest Environment',
      description: 'Configure JSDOM and Testing Library assertions',
      category: 'DevOps',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2026-11-20',
      assignee: { name: 'Elena Rostova', initials: 'ER', color: '#10b981' }
    };

    it('renders task title, category, and assignee', () => {
      render(
        <TaskCard
          task={mockTask}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onStatusChange={vi.fn()}
        />
      );

      expect(screen.getByText('Setup Vitest Environment')).toBeInTheDocument();
      expect(screen.getByText('DevOps')).toBeInTheDocument();
      expect(screen.getByText('ER')).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('triggers status change callback when status dropdown is changed', () => {
      const handleStatusChange = vi.fn();
      render(
        <TaskCard
          task={mockTask}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onStatusChange={handleStatusChange}
        />
      );

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'Completed' } });

      expect(handleStatusChange).toHaveBeenCalledWith('test-1', 'Completed');
    });

    it('triggers edit callback when edit button is clicked', () => {
      const handleEdit = vi.fn();
      render(
        <TaskCard
          task={mockTask}
          onEdit={handleEdit}
          onDelete={vi.fn()}
          onStatusChange={vi.fn()}
        />
      );

      const editBtn = screen.getByLabelText('Edit task');
      fireEvent.click(editBtn);

      expect(handleEdit).toHaveBeenCalledWith(mockTask);
    });
  });
});
