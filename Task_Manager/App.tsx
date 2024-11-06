import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Home'; // Import the Home screen
import AddTask from './src/Components/AddTask';
import Header from './src/Components/Header';
import {RootStackParamList} from './src/models/types';
import Detail from './src/Components/Details';
import {TasksProvider} from './src/coustom_hooks/TaskManagementHooks';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // AsyncStorage.removeItem('tasks') # This used to remove the all the existing data from the storage
  return (

      <TasksProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: () => <Header />,
              }}
            />
            <Stack.Screen name="AddTask" component={AddTask} />
            <Stack.Screen name="TaskDetails" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </TasksProvider>
  );
}
