import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button ,Alert  } from 'react-native';
import DatePicker from 'react-native-date-picker';
import useTasks from '../coustom_hooks/TaskManagementHooks';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { Task } from '../models/Task_types';

const data = [
  { label: 'To Do', value: 'To Do' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Done', value: 'Done' },
];

interface ValidationError {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}

const AddTask: React.FC = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ValidationError>({});
  const navigation = useNavigation();

  const validation = (): ValidationError => {
    let error: ValidationError = {};
    if (!title) error.title = "Title is required";
    if (!description) error.description = "Description is required";
    if (!status) error.status = "Status is required";
    if (!dueDate) error.dueDate = "Due date is required";
    return error;
  };

  const handleAddTask = () => {
    const validationErrors = validation();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      addTask({
        id: Date.now(), // Generate a unique id based on the current timestamp
        title,
        description,
        dueDate,
        status,
      });
      
      setTitle('');
      setDescription('');
      setDueDate(new Date());
      setStatus('');
      Alert.alert('The task was successfully Added')
      navigation.goBack();
    } else {
      console.log(validationErrors);
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Title</Text>
        <TextInput
          placeholder="Title"
          style={errors.title ? styles.error_input : styles.input}
          value={title}
          onChangeText={setTitle}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>
      <View>
        <Text style={styles.heading}>Description</Text>
        <TextInput
          placeholder="Description"
          style={errors.description ? styles.error_input : styles.input}
          value={description}
          onChangeText={setDescription}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>
      <View>
        <Text style={styles.heading}>Status</Text>
        <Dropdown
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          style={errors.status ? styles.error_input : styles.input}
          value={status}
          onChange={item => {
            setStatus(item.value);
            setErrors(prevErrors => ({ ...prevErrors, status: undefined }));
          }}
        />
        {errors.status && <Text style={styles.errorText}>{errors.status}</Text>}
      </View>
      <View>
        <Text style={styles.heading}>Due Date</Text>
        <DatePicker
          modal
          open={open}
          date={dueDate}
          mode="date"
          onConfirm={(date) => {
            setOpen(false);
            setDueDate(date);
            setErrors(prevErrors => ({ ...prevErrors, dueDate: undefined }));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Text onPress={() => setOpen(true)} style={errors.dueDate ? styles.error_input : styles.input}>
          {dueDate.toLocaleDateString()}
        </Text>
        {errors.dueDate && <Text style={styles.errorText}>{errors.dueDate}</Text>}
      </View>
      <View style={styles.button}>
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 20,
    shadowColor: '#52006A',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 20,
    borderColor: 'lightblue',
    fontSize: 16,
  },
  error_input: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 20,
    borderColor: 'red',
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    padding: 10,
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
});
