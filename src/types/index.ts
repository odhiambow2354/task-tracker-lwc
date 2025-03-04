
export interface Task {
  id: string;
  name: string;
  dueDate: Date | null;
  completed: boolean;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
