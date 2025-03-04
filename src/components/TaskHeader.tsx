
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { processOverdueTasks } from "@/services/taskService";
import { motion } from "framer-motion";
import { ArrowDownToLine, ClipboardList } from "lucide-react";

interface TaskHeaderProps {
  taskCount: number;
  completedCount: number;
}

const TaskHeader = ({ taskCount, completedCount }: TaskHeaderProps) => {
  const handleProcessOverdue = () => {
    processOverdueTasks();
  };

  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center space-y-2 py-8"
      >
        <div className="flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
          <ClipboardList className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-medium tracking-tight">Task Manager</h1>
        <p className="text-muted-foreground text-center max-w-md">
          A Lightning Web Component for managing your Salesforce tasks
        </p>
      </motion.div>

      <Separator className="my-4" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <span className="text-3xl font-medium">{taskCount}</span>
            <span className="text-muted-foreground text-sm">Total Tasks</span>
          </div>
          <Separator orientation="vertical" className="h-auto" />
          <div className="flex flex-col">
            <span className="text-3xl font-medium">{completedCount}</span>
            <span className="text-muted-foreground text-sm">Completed</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 group"
          onClick={handleProcessOverdue}
        >
          <ArrowDownToLine className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Process Overdue</span>
        </Button>
      </div>
    </div>
  );
};

export default TaskHeader;
