import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredTasks,
  saveTasks,
  resetToSampleTasks,
  generateTaskId
} from '../utils/storage';
import { SAMPLE_TASKS } from '../utils/sampleData';

describe('TaskFlow Storage Utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should seed default sample tasks on first launch', () => {
    const tasks = getStoredTasks();
    expect(tasks).toBeDefined();
    expect(tasks.length).toBe(SAMPLE_TASKS.length);
    expect(tasks[0].title).toBe(SAMPLE_TASKS[0].title);
  });

  it('should not overwrite existing user tasks on subsequent visits', () => {
    // First load seeds data
    getStoredTasks();

    // Custom user task
    const customTasks = [
      {
        id: 'custom-1',
        title: 'User created task',
        category: 'Engineering',
        priority: 'High',
        status: 'To Do',
        dueDate: '2026-12-01'
      }
    ];

    saveTasks(customTasks);

    // Second call simulates user reopening browser
    const reloaded = getStoredTasks();
    expect(reloaded.length).toBe(1);
    expect(reloaded[0].title).toBe('User created task');
  });

  it('should reset tasks to sample data when requested', () => {
    saveTasks([]);
    expect(getStoredTasks().length).toBe(0);

    const resetData = resetToSampleTasks();
    expect(resetData.length).toBe(SAMPLE_TASKS.length);
    expect(getStoredTasks().length).toBe(SAMPLE_TASKS.length);
  });

  it('should generate a unique task ID string', () => {
    const id1 = generateTaskId();
    const id2 = generateTaskId();
    expect(id1).not.toBe(id2);
    expect(id1.startsWith('task-')).toBe(true);
  });
});

