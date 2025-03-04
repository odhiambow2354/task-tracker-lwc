
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { addTask } from "@/services/taskService";
import { Task } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  dueDate: z.date().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const TaskForm = ({ onTaskAdded }: { onTaskAdded: (task: Task) => void }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dueDate: null,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const newTask = addTask({
      name: values.name,
      dueDate: values.dueDate,
      completed: false,
    });
    
    form.reset();
    onTaskAdded(newTask);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-card rounded-lg border shadow-sm p-4"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Plus className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-medium">Add New Task</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task name..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal flex justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="group transition-all"
            >
              <span>Create Task</span>
              <Plus className="ml-1 h-4 w-4 transition-transform group-hover:rotate-90" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default TaskForm;
