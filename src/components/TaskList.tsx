
import TaskItem from "@/components/TaskItem";
import { Task } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
}

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }: TaskListProps) => {
  const allTasks = tasks;
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  // Sort tasks by due date (null dates at the end)
  const sortTasks = (taskList: Task[]) => {
    return [...taskList].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full mt-6"
    >
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="all" className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>All ({allTasks.length})</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-1.5">
            <Circle className="h-4 w-4" />
            <span>Pending ({pendingTasks.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4" />
            <span>Completed ({completedTasks.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-3 min-h-[200px]">
          <AnimatePresence initial={false}>
            {sortTasks(allTasks).length > 0 ? (
              sortTasks(allTasks).map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                  onTaskDeleted={onTaskDeleted}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-8 text-center"
              >
                <Clock className="h-12 w-12 text-muted-foreground/40 mb-2" />
                <h3 className="text-lg font-medium">No tasks yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Create your first task above to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-3 min-h-[200px]">
          <AnimatePresence initial={false}>
            {sortTasks(pendingTasks).length > 0 ? (
              sortTasks(pendingTasks).map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                  onTaskDeleted={onTaskDeleted}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-8 text-center"
              >
                <CheckCircle className="h-12 w-12 text-muted-foreground/40 mb-2" />
                <h3 className="text-lg font-medium">No pending tasks</h3>
                <p className="text-muted-foreground max-w-md">
                  All your tasks are completed! Great job!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-3 min-h-[200px]">
          <AnimatePresence initial={false}>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                  onTaskDeleted={onTaskDeleted}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-8 text-center"
              >
                <Circle className="h-12 w-12 text-muted-foreground/40 mb-2" />
                <h3 className="text-lg font-medium">No completed tasks</h3>
                <p className="text-muted-foreground max-w-md">
                  Complete some tasks to see them here
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default TaskList;
