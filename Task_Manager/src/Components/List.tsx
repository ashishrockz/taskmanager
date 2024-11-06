import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem, RefreshControl } from 'react-native';
import useTasks from '../coustom_hooks/TaskManagementHooks';
import { Task } from '../models/Task_types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface TableProps {
  filter: string; 
  fromDate: Date | null |undefined;
  toDate: Date | null|undefined;
  statusFilter: string[];
}

const Table: React.FC<TableProps> = ({ filter,  fromDate, toDate, statusFilter }) => {
  const navigation = useNavigation<HeaderNavigationProp>();
  const { tasks } = useTasks(); 
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filter.toLowerCase());
    const matchesFromDate = fromDate ? new Date(task.dueDate) >= fromDate : true;
    const matchesToDate = toDate ? new Date(task.dueDate) <= toDate : true;
    const matchesStatus = statusFilter.length >0 ? statusFilter.includes(task.status) : true;
    return matchesSearch && matchesFromDate && matchesToDate && matchesStatus;
  });
  console.log('Filtered Tasks:', filteredTasks);

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={tableStyles.row}>
      <Text
        style={tableStyles.cell}
        onPress={() =>
          navigation.navigate('TaskDetails', {
            taskId: item.id,
            title: item.title,
            description: item.description,
            dueDate: item.dueDate,
            status: item.status,
          })
        }>
        {item.title}
      </Text>
      <Text style={tableStyles.cell}>{item.description}</Text>
      <Text style={tableStyles.cell}>{item.status}</Text>
      <Text style={tableStyles.cell}>
        {new Date(item.dueDate).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={tableStyles.container}>
      <View style={tableStyles.headerRow}>
        <Text style={tableStyles.cellHeader}>Title</Text>
        <Text style={tableStyles.cellHeader}>Description</Text>
        <Text style={tableStyles.cellHeader}>Status</Text>
        <Text style={tableStyles.cellHeader}>Due Date</Text>
      </View>
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={tableStyles.emptyText}>No tasks available. Add tasks to see them listed here.</Text>
      )}
    </View>
  );
};

export default Table;

const tableStyles = StyleSheet.create({
  container: {
    flex:0,
    height:"90%",
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#52006A',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 17,
    color: 'black',
    fontWeight:'500'
  },
});
