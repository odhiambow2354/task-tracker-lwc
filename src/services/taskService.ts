
import { Task } from "@/types";
import { toast } from "sonner";

// Mock REST API endpoint for Task__c
const STORAGE_KEY = "sf_tasks";

// Helper to format dates consistently
export const formatDate = (date: Date | null): string => {
  if (!date) return "No due date";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

// Get all tasks
export const getTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (!storedTasks) return [];
  
  const parsedTasks = JSON.parse(storedTasks);
  
  return parsedTasks.map((task: any) => ({
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate) : null,
    createdAt: new Date(task.createdAt)
  }));
};

// Add a new task
export const addTask = (task: Omit<Task, "id" | "createdAt">): Task => {
  const tasks = getTasks();
  
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...tasks, newTask]));
  
  toast.success("Task created successfully");
  return newTask;
};

// Update a task
export const updateTask = (id: string, updates: Partial<Task>): Task | null => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    toast.error("Task not found");
    return null;
  }
  
  const updatedTask = { ...tasks[taskIndex], ...updates };
  tasks[taskIndex] = updatedTask;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  
  if (updates.completed !== undefined) {
    toast.success(updates.completed ? "Task completed" : "Task marked incomplete");
  } else {
    toast.success("Task updated successfully");
  }
  
  return updatedTask;
};

// Delete a task
export const deleteTask = (id: string): boolean => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== id);
  
  if (updatedTasks.length === tasks.length) {
    toast.error("Task not found");
    return false;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  toast.success("Task deleted successfully");
  return true;
};

// Process overdue tasks (simulating batch/queueable job)
export const processOverdueTasks = (): number => {
  const tasks = getTasks();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let updatedCount = 0;
  
  const updatedTasks = tasks.map(task => {
    if (task.dueDate && !task.completed && new Date(task.dueDate) < today) {
      updatedCount++;
      return { ...task, completed: true };
    }
    return task;
  });
  
  if (updatedCount > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    toast.info(`${updatedCount} overdue ${updatedCount === 1 ? 'task' : 'tasks'} marked as completed`);
  }
  
  return updatedCount;
};

// Get tasks via REST API (simulated endpoint)
export const fetchTasksViaREST = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(getTasks());
    }, 300);
  });
};
