export type RootStackParamList = {
  Home: { refresh: boolean }; // Home screen with a refresh parameter
    AddTask:undefined;
    TaskDetails :{ taskId: number; title: string; description: string; dueDate: Date; status: string };
 
  };
  