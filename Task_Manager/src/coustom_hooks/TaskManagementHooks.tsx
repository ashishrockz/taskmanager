import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../models/Task_types';

const TASKS_STORAGE_KEY = 'tasks';

type TasksContextType = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  editTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from AsyncStorage:', error);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (tasksToSave: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Failed to save tasks to AsyncStorage:', error);
    }
  };

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      saveTasks(updatedTasks); 
      return updatedTasks;
    });
  };

  const editTask = (id: number, updatedTask: Task) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
      saveTasks(updatedTasks); 
      return updatedTasks;
    });
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      saveTasks(updatedTasks); 
      return updatedTasks;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

export default useTasks;

