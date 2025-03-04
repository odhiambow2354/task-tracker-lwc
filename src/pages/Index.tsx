
import TaskForm from "@/components/TaskForm";
import TaskHeader from "@/components/TaskHeader";
import TaskList from "@/components/TaskList";
import { deleteTask, getTasks } from "@/services/taskService";
import { Task } from "@/types";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load tasks from localStorage (simulating API call)
    const loadTasks = () => {
      try {
        const loadedTasks = getTasks();
        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTasks();
  }, []);
  
  const handleTaskAdded = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };
  
  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };
  
  const handleTaskDeleted = (id: string) => {
    const success = deleteTask(id);
    if (success) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };
  
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[40vh]"
            >
              <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
              <p className="mt-4 text-muted-foreground">Loading tasks...</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <TaskHeader taskCount={tasks.length} completedCount={completedCount} />
              <TaskForm onTaskAdded={handleTaskAdded} />
              <TaskList 
                tasks={tasks}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
              
              <footer className="text-center text-sm text-muted-foreground mt-12">
                <p>Task Manager — Lightning Web Component (Demo)</p>
                <p className="mt-1">
                  <a 
                    href="https://github.com/yourusername/task-tracker-lwc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-primary transition-colors"
                  >
                    GitHub Repository
                  </a>
                </p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
