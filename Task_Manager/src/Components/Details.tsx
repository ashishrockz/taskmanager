import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Edit from './Edit';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../models/types';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

const Details: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {taskId, title, description, dueDate, status} = route.params;
  const task = {id: taskId, title, description, dueDate, status};

  return (
    <View style={styles.container}>
      <Text style={styles.main_heading}>Task Details</Text>
      <View style={styles.text_container}>
        <Text style={styles.heading}>Title:-</Text>
        <Text style={styles.inner_text}>{title}</Text>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.heading}>Description:-</Text>
        <Text style={styles.inner_text}>{description}</Text>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.heading}>Status:-</Text>
        <Text style={styles.inner_text}>{status}</Text>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.heading}>Due Date:-</Text>
        <Text style={styles.inner_text}>
          {new Date(dueDate).toLocaleDateString()}
        </Text>
      </View>
      <Edit task={task} />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text_container: {
    padding: 10,
    },
  main_heading: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
  },
  inner_text: {
    fontSize: 18,
    fontWeight: '400',
  },
});
