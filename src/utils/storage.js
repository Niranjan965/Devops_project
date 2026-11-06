import { SAMPLE_TASKS } from './sampleData';

const STORAGE_KEY = 'taskflow_tasks_v1';
const FIRST_VISIT_KEY = 'taskflow_initialized_v1';

/**
 * Loads tasks from localStorage.
 * If this is the user's first visit, seeds sample tasks without overwriting on subsequent visits.
 */
export function getStoredTasks() {
  try {
    const initialized = localStorage.getItem(FIRST_VISIT_KEY);
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!initialized || storedData === null) {
      // First visit: save initial sample tasks
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TASKS));
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
      return SAMPLE_TASKS;
    }

    const parsed = JSON.parse(storedData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return SAMPLE_TASKS;
  } catch (err) {
    console.error('Failed to read tasks from localStorage:', err);
    return SAMPLE_TASKS;
  }
}

/**
 * Persists tasks array to localStorage.
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
  } catch (err) {
    console.error('Failed to save tasks to localStorage:', err);
  }
}

/**
 * Resets tasks to sample dataset.
 */
export function resetToSampleTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TASKS));
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
    return SAMPLE_TASKS;
  } catch (err) {
    console.error('Failed to reset tasks:', err);
    return SAMPLE_TASKS;
  }
}

/**
 * Helper to generate a random unique ID for newly created tasks.
 */
export function generateTaskId() {
  return 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
}
