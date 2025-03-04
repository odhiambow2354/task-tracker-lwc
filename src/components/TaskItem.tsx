
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate, updateTask } from "@/services/taskService";
import { Task } from "@/types";
import { CalendarClock, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
}

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  
  const handleToggleComplete = () => {
    const updatedTask = updateTask(task.id, { completed: !task.completed });
    if (updatedTask) {
      onTaskUpdated(updatedTask);
    }
  };
  
  const handleDelete = () => {
    onTaskDeleted(task.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className={cn(
        "group flex items-center justify-between p-4 rounded-lg border bg-card transition-all duration-200",
        task.completed ? "bg-muted/50" : "",
        isOverdue ? "border-destructive/30" : ""
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
          className={cn(
            "h-5 w-5 rounded-md transition-all duration-300",
            task.completed ? "bg-primary border-primary" : "",
            isOverdue ? "border-destructive" : ""
          )}
        />
        
        <div className="flex flex-col">
          <span className={cn(
            "font-medium task-stroke transition-all duration-300",
            task.completed ? "text-muted-foreground completed" : "",
            isOverdue && !task.completed ? "text-destructive" : ""
          )}>
            {task.name}
          </span>
          
          <div className="flex items-center gap-1 mt-0.5">
            <CalendarClock className="h-3 w-3 text-muted-foreground" />
            <span className={cn(
              "text-xs text-muted-foreground",
              isOverdue && !task.completed ? "text-destructive/80" : ""
            )}>
              {formatDate(task.dueDate)}
              {isOverdue && !task.completed && " (Overdue)"}
            </span>
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
      </Button>
    </motion.div>
  );
};

export default TaskItem;
